#!/usr/bin/env node
import { execFileSync } from 'child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { pathToFileURL } from 'url';
import { OFFICIAL_SITE } from '../src/lib/build-metadata.js';
import { mapWithConcurrency, positiveInteger } from '../src/lib/concurrency.js';
import { fetchLiveText } from '../src/lib/live-http.js';
import { verifyLiveProvenance } from '../src/lib/provenance-verify.js';
import { runAiEvals } from './run-ai-evals.js';

export const DEFAULT_EXPECTED_COUNTS = {
  public: 1217,
  draft: 300,
  claims: 3811
};

export const DEFAULT_PUBLIC_KEY_PATH = 'keys/provenance.pub.pem';
export const DEFAULT_AFTER_SMOKE_DELAY_MS = 5000;
export const DEFAULT_AI_EVAL_RETRY_DELAY_MS = 15000;
export const DEFAULT_AI_EVAL_ATTEMPTS = 2;
export const SIGNED_MACHINE_ARTIFACT_PATHS = [
  '/graph.json',
  '/search-index.json',
  '/claims.json',
  '/agent.json',
  '/openapi.json',
  '/manifest.json',
  '/topics.json',
  '/capabilities.json',
  '/content-health.json',
  '/coverage.json',
  '/examples.json',
  '/evals.json',
  '/mcp.json',
  '/artifact-summary.json',
  '/sources.json',
  '/llms.txt',
  '/provenance.json',
  '/provenance.sig'
];
export const DEFAULT_EDGE_CACHE_API_CONTROLS = [
  '/api',
  '/api/context?q=gaussian&limit=1',
  '/api/evidence?q=gaussian&limit=1',
  '/api/plan?q=gaussian&limit=1'
];
export const DEFAULT_EDGE_CACHE_STATIC_ARTIFACTS = [];
export const DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS = [
  ...DEFAULT_EDGE_CACHE_API_CONTROLS,
  ...SIGNED_MACHINE_ARTIFACT_PATHS
];
export const DEFAULT_EDGE_CACHE_ROUTE_RETRIES = 4;
export const DEFAULT_EDGE_CACHE_RETRY_DELAY_MS = 500;
export const DEFAULT_EDGE_CACHE_REQUEST_TIMEOUT_MS = 5000;
export const DEFAULT_EDGE_CACHE_DYNAMIC_CONCURRENCY = 4;
export const DEFAULT_DISCOVERY_ROUTES = [
  '/robots.txt',
  '/llms.txt',
  '/agent.json',
  '/api'
];
export const DEFAULT_DISCOVERY_USER_AGENT_PROFILES = [
  {
    name: 'browser_monitor',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
  },
  {
    name: 'openai_searchbot',
    userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)'
  }
];
export const DEFAULT_DISCOVERY_CONCURRENCY = 4;
export const DEFAULT_INTEGRITY_EVAL_OPTIONS = {
  routeRetries: 4,
  routeRetryDelayMs: 750,
  routeIntervalMs: 150
};

const EDGE_CACHE_HIT_STATUSES = new Set(['HIT', 'REVALIDATED', 'STALE', 'UPDATING']);

function isoNow() {
  return new Date().toISOString();
}

function sleep(ms) {
  return ms > 0 ? new Promise(resolve => setTimeout(resolve, ms)) : Promise.resolve();
}

function commandOutput(error, field) {
  const value = error?.[field];
  return Buffer.isBuffer(value) ? value.toString('utf8') : String(value || '');
}

function failedEvalResults(aiEvals) {
  return (aiEvals?.results || [])
    .filter(result => result && result.ok !== true)
    .map(result => ({
      id: result.id || null,
      route: result.route || null,
      failures: result.failures || []
    }));
}

function summarizeAiEvalAttempt(aiEvals, attempt) {
  return {
    attempt,
    ok: aiEvals?.ok === true,
    eval_count: aiEvals?.eval_count ?? null,
    passed: aiEvals?.passed ?? null,
    failed: aiEvals?.failed ?? null,
    failures: aiEvals?.failures || [],
    failed_results: failedEvalResults(aiEvals)
  };
}

function routeUrl(baseUrl, route) {
  return new URL(route, baseUrl).toString();
}

function headerValue(headers, name) {
  if (!headers) return '';
  if (typeof headers.get === 'function') {
    const direct = headers.get(name);
    if (direct) return direct;
  }
  const wanted = name.toLowerCase();
  const entries = typeof headers.entries === 'function' ? headers.entries() : Object.entries(headers);
  for (const [key, value] of entries) {
    if (key.toLowerCase() === wanted) return String(value || '');
  }
  return '';
}

function normalizeCacheStatus(value) {
  return String(value || '').trim().toUpperCase();
}

function cacheAttempt(route, response) {
  return {
    status: response.status,
    ok: response.ok === true,
    cf_cache_status: normalizeCacheStatus(headerValue(response.headers, 'cf-cache-status')) || null,
    age: headerValue(response.headers, 'age') || null,
    cache_control: headerValue(response.headers, 'cache-control') || null
  };
}

function cacheStatusList(attempts) {
  return attempts
    .map(attempt => attempt.cf_cache_status || 'missing')
    .join(' -> ');
}

function isRevalidatedCacheControl(value) {
  const normalized = String(value || '').toLowerCase();
  return normalized.includes('no-store')
    || normalized.includes('no-cache')
    || normalized.includes('max-age=0')
    || normalized.includes('must-revalidate');
}

function maxAgeSeconds(value) {
  const match = String(value || '').toLowerCase().match(/(?:^|,)\s*max-age\s*=\s*(\d+)/);
  return match ? Number.parseInt(match[1], 10) : null;
}

function isApiControl(route) {
  return new URL(route, OFFICIAL_SITE).pathname.startsWith('/api');
}

function dynamicControlRequestMethod(route) {
  return isApiControl(route) ? 'GET' : 'HEAD';
}

function isApiClientCacheControlAllowed(value) {
  if (isRevalidatedCacheControl(value)) return true;
  const maxAge = maxAgeSeconds(value);
  return Number.isFinite(maxAge) && maxAge <= 300;
}

function requiresRecommendedEntrypoints(route) {
  const pathname = new URL(route, OFFICIAL_SITE).pathname;
  return pathname === '/robots.txt' || pathname === '/llms.txt';
}

function missingRecommendedEntrypoints(text) {
  const body = String(text || '');
  return ['/api/context', '/api/evidence', '/api/plan']
    .filter(entrypoint => !body.includes(entrypoint));
}

export async function checkProductionEdgeCache({
  baseUrl = OFFICIAL_SITE,
  staticArtifacts = DEFAULT_EDGE_CACHE_STATIC_ARTIFACTS,
  dynamicControls = DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS,
  fetchImpl = globalThis.fetch,
  staticAttempts = 2,
  routeRetries = DEFAULT_EDGE_CACHE_ROUTE_RETRIES,
  routeRetryDelayMs = DEFAULT_EDGE_CACHE_RETRY_DELAY_MS,
  requestTimeoutMs = DEFAULT_EDGE_CACHE_REQUEST_TIMEOUT_MS,
  dynamicConcurrency = DEFAULT_EDGE_CACHE_DYNAMIC_CONCURRENCY
} = {}) {
  const failures = [];
  const staticResults = [];
  const maxStaticAttempts = Math.max(1, Number(staticAttempts) || 1);
  const maxDynamicConcurrency = positiveInteger(dynamicConcurrency, DEFAULT_EDGE_CACHE_DYNAMIC_CONCURRENCY);

  for (const path of staticArtifacts) {
    const attempts = [];
    for (let attempt = 1; attempt <= maxStaticAttempts; attempt++) {
      const response = await fetchLiveText(fetchImpl, routeUrl(baseUrl, path), {
        method: 'HEAD',
        retries: routeRetries,
        retryDelayMs: routeRetryDelayMs,
        timeoutMs: requestTimeoutMs
      });
      attempts.push(cacheAttempt(path, response));
      const cacheStatus = attempts[attempts.length - 1].cf_cache_status;
      if (response.ok && EDGE_CACHE_HIT_STATUSES.has(cacheStatus)) break;
    }

    const reachedHit = attempts.some(attempt => attempt.ok && EDGE_CACHE_HIT_STATUSES.has(attempt.cf_cache_status));
    if (!reachedHit) {
      failures.push(`${path} never reached an edge cache hit status (saw ${cacheStatusList(attempts)})`);
    }
    staticResults.push({
      path,
      ok: reachedHit,
      attempts
    });
  }

  const dynamicChecks = await mapWithConcurrency(dynamicControls, maxDynamicConcurrency, async (path) => {
    const apiControl = isApiControl(path);
    const method = dynamicControlRequestMethod(path);
    const response = await fetchLiveText(fetchImpl, routeUrl(baseUrl, path), {
      method,
      retries: routeRetries,
      retryDelayMs: routeRetryDelayMs,
      timeoutMs: requestTimeoutMs
    });
    const result = {
      path,
      method,
      contract: apiControl ? 'api_get' : 'signed_artifact_head',
      ...cacheAttempt(path, response)
    };
    const resultFailures = [];
    if (!result.ok) {
      resultFailures.push(`${path} returned status ${result.status}; expected a successful dynamic control response`);
    }
    if (!result.cf_cache_status) {
      resultFailures.push(`${path} did not return a cf-cache-status header`);
    } else if (EDGE_CACHE_HIT_STATUSES.has(result.cf_cache_status)) {
      resultFailures.push(`${path} returned cache status ${result.cf_cache_status}; dynamic controls must remain uncached`);
    }
    const cacheControlOk = apiControl
      ? isApiClientCacheControlAllowed(result.cache_control)
      : isRevalidatedCacheControl(result.cache_control);
    if (!cacheControlOk && apiControl) {
      resultFailures.push(`${path} API cache-control must be revalidated or no more than max-age=300, got ${result.cache_control || '(missing)'}`);
    } else if (!cacheControlOk) {
      resultFailures.push(`${path} cache-control must be revalidated by clients, got ${result.cache_control || '(missing)'}`);
    }
    result.ok = result.ok
      && Boolean(result.cf_cache_status)
      && !EDGE_CACHE_HIT_STATUSES.has(result.cf_cache_status)
      && cacheControlOk;
    return { result, failures: resultFailures };
  });

  const dynamicResults = [];
  for (const check of dynamicChecks) {
    dynamicResults.push(check.result);
    failures.push(...check.failures);
  }

  return {
    ok: failures.length === 0,
    static_artifacts: staticResults,
    dynamic_controls: dynamicResults,
    failures
  };
}

export async function checkProductionDiscovery({
  baseUrl = OFFICIAL_SITE,
  routes = DEFAULT_DISCOVERY_ROUTES,
  userAgentProfiles = DEFAULT_DISCOVERY_USER_AGENT_PROFILES,
  fetchImpl = globalThis.fetch,
  routeRetries = DEFAULT_EDGE_CACHE_ROUTE_RETRIES,
  routeRetryDelayMs = DEFAULT_EDGE_CACHE_RETRY_DELAY_MS,
  requestTimeoutMs = DEFAULT_EDGE_CACHE_REQUEST_TIMEOUT_MS,
  concurrency = DEFAULT_DISCOVERY_CONCURRENCY
} = {}) {
  const checksToRun = [];
  for (const profile of userAgentProfiles) {
    for (const route of routes) {
      checksToRun.push({ profile, route });
    }
  }

  const maxConcurrency = positiveInteger(concurrency, DEFAULT_DISCOVERY_CONCURRENCY);
  const checkResults = await mapWithConcurrency(checksToRun, maxConcurrency, async ({ profile, route }) => {
    const response = await fetchLiveText(fetchImpl, routeUrl(baseUrl, route), {
      method: 'GET',
      retries: routeRetries,
      retryDelayMs: routeRetryDelayMs,
      timeoutMs: requestTimeoutMs,
      headers: {
        'User-Agent': profile.userAgent,
        Accept: 'application/json,text/plain,text/html;q=0.9,*/*;q=0.8'
      }
    });
    const result = {
      route,
      user_agent_profile: profile.name,
      method: 'GET',
      status: response.status,
      ok: response.ok === true,
      content_type: response.contentType || headerValue(response.headers, 'content-type') || null,
      cache_control: headerValue(response.headers, 'cache-control') || null,
      cf_cache_status: normalizeCacheStatus(headerValue(response.headers, 'cf-cache-status')) || null
    };
    const failures = [];
    if (!result.ok) {
      failures.push(`${profile.name} ${route} returned status ${result.status}; expected 200`);
    }
    if (result.ok && requiresRecommendedEntrypoints(route)) {
      for (const missing of missingRecommendedEntrypoints(response.text)) {
        failures.push(`${profile.name} ${route} is missing recommended entrypoint ${missing}`);
      }
    }
    result.ok = result.ok && failures.length === 0;
    return { result, failures };
  });

  const checks = [];
  const failures = [];
  for (const check of checkResults) {
    checks.push(check.result);
    failures.push(...check.failures);
  }

  return {
    ok: failures.length === 0,
    checks,
    failures
  };
}

export function runProductionSmoke({
  baseUrl = OFFICIAL_SITE,
  expectedCounts = DEFAULT_EXPECTED_COUNTS,
  execFile = execFileSync,
  env = process.env
} = {}) {
  const commandEnv = {
    ...env,
    ANCHORFACT_BASE_URL: baseUrl,
    EXPECTED_PUBLIC_ARTICLES: String(expectedCounts.public),
    EXPECTED_DRAFT_ARTICLES: String(expectedCounts.draft),
    EXPECTED_CLAIMS: String(expectedCounts.claims)
  };

  try {
    const stdout = execFile(process.execPath, ['src/smoke-production.js'], {
      encoding: 'utf8',
      env: commandEnv
    });
    return { ok: true, stdout, stderr: '' };
  } catch (error) {
    return {
      ok: false,
      stdout: commandOutput(error, 'stdout'),
      stderr: commandOutput(error, 'stderr') || error.message
    };
  }
}

export function buildIntegrityReport({
  generatedAt = isoNow(),
  baseUrl = OFFICIAL_SITE,
  expectedCounts = DEFAULT_EXPECTED_COUNTS,
  smoke,
  provenance,
  aiEvals,
  edgeCache,
  discovery
}) {
  const failures = [];
  if (!smoke?.ok) failures.push('Production smoke failed');
  if (!provenance?.ok) failures.push('Signed provenance verification failed');
  if (!aiEvals?.ok) failures.push('AI evals failed');
  if (edgeCache?.ok === false) failures.push('Edge cache verification failed');
  if (discovery?.ok === false) failures.push('AI discovery verification failed');
  for (const failure of provenance?.failures || []) failures.push(failure);
  for (const failure of aiEvals?.failures || []) failures.push(failure);
  for (const failure of edgeCache?.failures || []) failures.push(failure);
  for (const failure of discovery?.failures || []) failures.push(failure);
  for (const result of aiEvals?.results || []) {
    for (const failure of result.failures || []) failures.push(`${result.id}: ${failure}`);
  }

  const artifactHashes = {};
  for (const [key, artifact] of Object.entries(provenance?.artifacts || {})) {
    artifactHashes[key] = artifact.sha256 || null;
  }

  return {
    generated: generatedAt,
    ok: failures.length === 0,
    base_url: baseUrl,
    expected_counts: expectedCounts,
    counts: {
      public: provenance?.provenance?.content_counts?.public ?? null,
      draft: provenance?.provenance?.content_counts?.draft ?? null,
      claims: provenance?.provenance?.content_counts?.claims ?? null
    },
    commit_sha: provenance?.provenance?.build?.commit_sha || null,
    signature: {
      status: provenance?.signature?.status || null,
      ok: provenance?.signature?.ok === true,
      trusted: provenance?.signature?.trusted === true,
      key_id: provenance?.signature?.key_id || provenance?.provenance?.signature?.key_id || null,
      public_key_sha256: provenance?.signature?.public_key_sha256 || provenance?.provenance?.signature?.public_key_sha256 || null
    },
    artifacts: artifactHashes,
    checks: {
      smoke: smoke?.ok === true,
      ai_evals: aiEvals?.ok === true,
      signed_provenance: provenance?.ok === true,
      commit: provenance?.commit?.ok === true,
      edge_cache: edgeCache?.ok !== false,
      discovery: discovery?.ok !== false
    },
    edge_cache: {
      ok: edgeCache?.ok !== false,
      static_artifacts: edgeCache?.static_artifacts || [],
      dynamic_controls: edgeCache?.dynamic_controls || [],
      failures: edgeCache?.failures || []
    },
    discovery: {
      ok: discovery?.ok !== false,
      checks: discovery?.checks || [],
      failures: discovery?.failures || []
    },
    ai_evals: {
      eval_count: aiEvals?.eval_count ?? null,
      passed: aiEvals?.passed ?? null,
      failed: aiEvals?.failed ?? null,
      attempts: aiEvals?.attempts ?? null,
      attempt_history: aiEvals?.attempt_history || []
    },
    failures,
    smoke_stdout: smoke?.ok ? '' : (smoke?.stdout || ''),
    smoke_stderr: smoke?.ok ? '' : (smoke?.stderr || '')
  };
}

export function renderIntegrityMarkdown(report) {
  const artifacts = Object.entries(report.artifacts || {})
    .map(([name, sha]) => `- ${name}: ${sha || '(missing)'}`)
    .join('\n') || '- none';
  const failures = report.failures.length
    ? report.failures.map(failure => `- ${failure}`).join('\n')
    : '- none';
  const attemptHistory = report.ai_evals?.attempt_history || [];
  const attemptLines = attemptHistory.length
    ? attemptHistory
        .map((attempt) => {
          const failedIds = (attempt.failed_results || [])
            .map(result => result.id)
            .filter(Boolean)
            .join(', ');
          const failedSuffix = failedIds ? `; failed: ${failedIds}` : '';
          return `- attempt ${attempt.attempt}: ${attempt.ok ? 'pass' : 'fail'} (${attempt.passed ?? 0}/${attempt.eval_count ?? 0})${failedSuffix}`;
        })
        .join('\n')
    : '- none';
  const staticCacheLines = (report.edge_cache?.static_artifacts || []).length
    ? report.edge_cache.static_artifacts
        .map(result => {
          const statuses = cacheStatusList(result.attempts || []);
          return `- ${result.path}: ${result.ok ? 'pass' : 'fail'} (${statuses})`;
        })
        .join('\n')
    : '- none';
  const dynamicCacheLines = (report.edge_cache?.dynamic_controls || []).length
    ? report.edge_cache.dynamic_controls
        .map(result => `- ${result.path}: ${result.ok ? 'pass' : 'fail'} (${result.method || 'GET'}, ${result.cf_cache_status || 'missing'}, ${result.cache_control || 'missing'})`)
        .join('\n')
    : '- none';
  const discoveryLines = (report.discovery?.checks || []).length
    ? report.discovery.checks
        .map(result => `- ${result.user_agent_profile} ${result.route}: ${result.ok ? 'pass' : 'fail'} (${result.status})`)
        .join('\n')
    : '- none';

  return `# AnchorFact Production Integrity - ${report.ok ? 'PASS' : 'FAIL'}

Generated: ${report.generated}

Base URL: ${report.base_url}

## Summary

- status: ${report.ok ? 'pass' : 'fail'}
- commit: ${report.commit_sha || '(missing)'}
- counts: ${report.counts.public} public / ${report.counts.draft} draft / ${report.counts.claims} claims
- expected: ${report.expected_counts.public} public / ${report.expected_counts.draft} draft / ${report.expected_counts.claims} claims
- signature: status=${report.signature.status || '(missing)'}, ok=${report.signature.ok}, trusted=${report.signature.trusted}
- public key sha256: ${report.signature.public_key_sha256 || '(missing)'}

## Checks

- smoke: ${report.checks.smoke ? 'pass' : 'fail'}
- AI evals: ${report.checks.ai_evals ? 'pass' : 'fail'} (${report.ai_evals.passed ?? 0}/${report.ai_evals.eval_count ?? 0}, attempts=${report.ai_evals.attempts ?? 1})
- signed provenance: ${report.checks.signed_provenance ? 'pass' : 'fail'}
- source commit: ${report.checks.commit ? 'pass' : 'fail'}
- edge cache: ${report.checks.edge_cache ? 'pass' : 'fail'}
- discovery: ${report.checks.discovery ? 'pass' : 'fail'}

## Artifact Hashes

${artifacts}

## Edge Cache

Static artifacts:

${staticCacheLines}

Dynamic controls:

${dynamicCacheLines}

## AI Discovery

${discoveryLines}

## AI Eval Attempts

${attemptLines}

## Failures

${failures}
`;
}

function parseArgs(argv) {
  const options = {
    baseUrl: process.env.ANCHORFACT_BASE_URL || OFFICIAL_SITE,
    publicKeyPath: DEFAULT_PUBLIC_KEY_PATH,
    expectedCounts: { ...DEFAULT_EXPECTED_COUNTS },
    json: false,
    write: null,
    writeJson: null
  };

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === '--json') options.json = true;
    else if (arg === '--base-url') options.baseUrl = argv[++index];
    else if (arg === '--public-key') options.publicKeyPath = argv[++index];
    else if (arg === '--write') options.write = argv[++index];
    else if (arg === '--write-json') options.writeJson = argv[++index];
    else if (arg === '--expected-public') options.expectedCounts.public = Number.parseInt(argv[++index], 10);
    else if (arg === '--expected-draft') options.expectedCounts.draft = Number.parseInt(argv[++index], 10);
    else if (arg === '--expected-claims') options.expectedCounts.claims = Number.parseInt(argv[++index], 10);
    else throw new Error(`Unknown option: ${arg}`);
  }

  return options;
}

function writeReport(path, content) {
  const outputPath = resolve(path);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, content);
}

export async function runProductionIntegrity({
  baseUrl = OFFICIAL_SITE,
  publicKeyPath = DEFAULT_PUBLIC_KEY_PATH,
  expectedCounts = DEFAULT_EXPECTED_COUNTS,
  smokeRunner = runProductionSmoke,
  evalRunner = runAiEvals,
  evalOptions = DEFAULT_INTEGRITY_EVAL_OPTIONS,
  verifier = verifyLiveProvenance,
  edgeCacheChecker = checkProductionEdgeCache,
  discoveryChecker = checkProductionDiscovery,
  generatedAt = isoNow(),
  afterSmokeDelayMs = DEFAULT_AFTER_SMOKE_DELAY_MS,
  aiEvalRetryDelayMs = DEFAULT_AI_EVAL_RETRY_DELAY_MS,
  aiEvalAttempts = DEFAULT_AI_EVAL_ATTEMPTS,
  sleepImpl = sleep
} = {}) {
  const smoke = smokeRunner({ baseUrl, expectedCounts });
  const edgeCache = await edgeCacheChecker({ baseUrl });
  const discovery = await discoveryChecker({ baseUrl });
  const wait = typeof sleepImpl === 'function' ? sleepImpl : sleep;
  if (afterSmokeDelayMs > 0) await wait(afterSmokeDelayMs);

  let aiEvals = null;
  const attemptHistory = [];
  const maxAiEvalAttempts = Math.max(1, Number(aiEvalAttempts) || 1);
  for (let attempt = 1; attempt <= maxAiEvalAttempts; attempt++) {
    const evalReport = await evalRunner({ baseUrl, ...evalOptions });
    attemptHistory.push(summarizeAiEvalAttempt(evalReport, attempt));
    aiEvals = { ...evalReport, attempts: attempt, attempt_history: [...attemptHistory] };
    if (aiEvals.ok || attempt === maxAiEvalAttempts) break;
    if (aiEvalRetryDelayMs > 0) await wait(aiEvalRetryDelayMs);
  }

  const trustedPublicKeys = [readFileSync(publicKeyPath, 'utf8')];
  const provenance = await verifier({
    baseUrl,
    requireSignature: true,
    requireTrustedSignature: true,
    trustedPublicKeys
  });

  return buildIntegrityReport({
    generatedAt,
    baseUrl,
    expectedCounts,
    smoke,
    provenance,
    aiEvals,
    edgeCache,
    discovery
  });
}

export async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const report = await runProductionIntegrity(options);
  const markdown = renderIntegrityMarkdown(report);
  const json = JSON.stringify(report, null, 2);

  if (options.write) writeReport(options.write, markdown);
  if (options.writeJson) writeReport(options.writeJson, json);

  console.log(options.json ? json : markdown);
  if (!report.ok) process.exitCode = 1;
  return report;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
