#!/usr/bin/env node
import { existsSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import { performance } from 'perf_hooks';
import { pathToFileURL } from 'url';
import {
  buildContextApiPayload,
  renderContextMarkdown
} from '../src/lib/context-api.js';
import {
  buildEvidenceApiPayload,
  renderEvidenceMarkdown
} from '../src/lib/evidence-api.js';
import { buildPlanApiPayload } from '../src/lib/plan-api.js';
import { buildResolveBatchApiPayload } from '../src/lib/resolve-api.js';

export const DEFAULT_DIST_DIR = 'dist';
export const DEFAULT_RUNS = 30;
export const DEFAULT_WARMUPS = 5;

export const DEFAULT_ARTIFACT_SIZE_BUDGETS = [
  { path: 'graph.json', baseline_bytes: 2997236, max_bytes: 4850000, purpose: 'offline relationship graph' },
  { path: 'search-index.json', baseline_bytes: 1986169, max_bytes: 3150000, purpose: 'offline search fallback' },
  { path: 'claims.json', baseline_bytes: 1738706, max_bytes: 2780000, purpose: 'offline claim corpus' },
  { path: 'sources.json', baseline_bytes: 1175562, max_bytes: 1875000, purpose: 'offline source corpus' },
  { path: 'manifest.json', baseline_bytes: 693188, max_bytes: 1000000, purpose: 'public/draft article catalog' },
  { path: 'llms.txt', baseline_bytes: 253376, max_bytes: 375000, purpose: 'crawler-facing public index' },
  { path: 'openapi.json', baseline_bytes: 61580, max_bytes: 100000, purpose: 'machine contract schema' },
  { path: 'agent.json', baseline_bytes: 17157, max_bytes: 40000, purpose: 'agent discovery profile' },
  { path: 'artifact-summary.json', baseline_bytes: 0, max_bytes: 60000, purpose: 'artifact size discovery layer' }
];

export const DEFAULT_CASES = [
  {
    id: 'plan_gaussian_splatting',
    budget: { median_ms: 25, p95_ms: 75 },
    run: ({ searchIndex, topicsPayload, coveragePayload, capabilitiesPayload }) => buildPlanApiPayload({
      query: 'gaussian splatting',
      limit: 3,
      searchIndex,
      topicsPayload,
      coveragePayload,
      capabilitiesPayload
    })
  },
  {
    id: 'evidence_rlhf_json',
    budget: { median_ms: 25, p95_ms: 75 },
    run: ({ manifest, claimsPayload, sourcesPayload, searchIndex }) => buildEvidenceApiPayload({
      query: 'RLHF',
      limit: 3,
      manifest,
      claimsPayload,
      sourcesPayload,
      searchIndex
    }).payload
  },
  {
    id: 'evidence_gaussian_markdown',
    budget: { median_ms: 25, p95_ms: 75 },
    run: ({ manifest, claimsPayload, sourcesPayload, searchIndex }) => {
      const result = buildEvidenceApiPayload({
        query: 'gaussian splatting',
        limit: 1,
        manifest,
        claimsPayload,
        sourcesPayload,
        searchIndex
      });
      return renderEvidenceMarkdown(result.payload);
    }
  },
  {
    id: 'context_gaussian_json',
    budget: { median_ms: 25, p95_ms: 75 },
    run: allArtifacts => buildContextApiPayload({
      query: 'gaussian splatting',
      limit: 3,
      ...allArtifacts
    }).payload
  },
  {
    id: 'context_unsupported_json',
    budget: { median_ms: 25, p95_ms: 75 },
    run: allArtifacts => buildContextApiPayload({
      query: 'lunar dentistry',
      limit: 3,
      ...allArtifacts
    }).payload
  },
  {
    id: 'context_gaussian_markdown',
    budget: { median_ms: 25, p95_ms: 75 },
    run: allArtifacts => {
      const result = buildContextApiPayload({
        query: 'gaussian splatting',
        limit: 3,
        ...allArtifacts
      });
      return renderContextMarkdown(result.payload);
    }
  },
  {
    id: 'resolve_batch_claim_and_source',
    budget: { median_ms: 5, p95_ms: 20 },
    run: ({ manifest, claimsPayload, sourcesPayload, searchIndex }) => buildResolveBatchApiPayload({
      refs: ['f1', 'https://arxiv.org/abs/2308.04079'],
      manifest,
      claimsPayload,
      sourcesPayload,
      searchIndex
    }).payload
  }
];

function readJson(distDir, fileName) {
  const path = join(distDir, fileName);
  if (!existsSync(path)) {
    throw new Error(`Missing ${path}; run npm run build before npm run api:perf.`);
  }
  return JSON.parse(readFileSync(path, 'utf8'));
}

export function loadApiPerformanceArtifacts(distDir = DEFAULT_DIST_DIR) {
  return {
    manifest: readJson(distDir, 'manifest.json'),
    claimsPayload: readJson(distDir, 'claims.json'),
    sourcesPayload: readJson(distDir, 'sources.json'),
    searchIndex: readJson(distDir, 'search-index.json'),
    topicsPayload: readJson(distDir, 'topics.json'),
    coveragePayload: readJson(distDir, 'coverage.json'),
    capabilitiesPayload: readJson(distDir, 'capabilities.json'),
    contentHealthPayload: readJson(distDir, 'content-health.json')
  };
}

export function percentile(samples, percentileValue) {
  if (!Array.isArray(samples) || samples.length === 0) return 0;
  const sorted = [...samples].sort((a, b) => a - b);
  const index = Math.min(
    sorted.length - 1,
    Math.max(0, Math.ceil((percentileValue / 100) * sorted.length) - 1)
  );
  return sorted[index];
}

export function summarizeSamples(samples) {
  const sum = samples.reduce((total, value) => total + value, 0);
  return {
    min_ms: Math.min(...samples),
    median_ms: percentile(samples, 50),
    p95_ms: percentile(samples, 95),
    max_ms: Math.max(...samples),
    avg_ms: sum / samples.length
  };
}

export function evaluateBudget(summary, budget) {
  const failures = [];
  if (summary.median_ms > budget.median_ms) {
    failures.push(`median ${summary.median_ms.toFixed(2)}ms > budget ${budget.median_ms}ms`);
  }
  if (summary.p95_ms > budget.p95_ms) {
    failures.push(`p95 ${summary.p95_ms.toFixed(2)}ms > budget ${budget.p95_ms}ms`);
  }
  return failures;
}

export function loadArtifactSizes(distDir = DEFAULT_DIST_DIR, budgets = DEFAULT_ARTIFACT_SIZE_BUDGETS) {
  return Object.fromEntries(budgets.map(budget => {
    const path = join(distDir, budget.path);
    return [budget.path, existsSync(path) ? statSync(path).size : null];
  }));
}

export function evaluateArtifactSizeBudgets(
  sizes,
  budgets = DEFAULT_ARTIFACT_SIZE_BUDGETS
) {
  const artifacts = budgets.map(budget => {
    const bytes = sizes?.[budget.path];
    const ok = Number.isFinite(bytes) && bytes <= budget.max_bytes;
    const failures = [];
    if (!Number.isFinite(bytes)) {
      failures.push(`${budget.path}: missing artifact`);
    } else if (bytes > budget.max_bytes) {
      failures.push(`${budget.path}: ${bytes} bytes > budget ${budget.max_bytes} bytes`);
    }
    return {
      ...budget,
      bytes,
      headroom_bytes: Number.isFinite(bytes) ? budget.max_bytes - bytes : null,
      ok,
      failures
    };
  });
  const failures = artifacts.flatMap(artifact => artifact.failures);
  return {
    ok: failures.length === 0,
    budget_count: artifacts.length,
    artifacts,
    failures
  };
}

function measureCase(testCase, artifacts, { runs, warmups }) {
  for (let index = 0; index < warmups; index++) {
    testCase.run(artifacts);
  }

  const samples = [];
  let payloadBytes = 0;
  for (let index = 0; index < runs; index++) {
    const started = performance.now();
    const payload = testCase.run(artifacts);
    const serialized = typeof payload === 'string' ? payload : JSON.stringify(payload);
    samples.push(performance.now() - started);
    payloadBytes = Math.max(payloadBytes, Buffer.byteLength(serialized || '', 'utf8'));
  }

  const summary = summarizeSamples(samples);
  const failures = evaluateBudget(summary, testCase.budget);
  return {
    id: testCase.id,
    ok: failures.length === 0,
    runs,
    warmups,
    payload_bytes: payloadBytes,
    budget: testCase.budget,
    ...summary,
    failures
  };
}

export function buildApiPerformanceReport({
  artifacts,
  artifactSizeBudget = null,
  cases = DEFAULT_CASES,
  runs = DEFAULT_RUNS,
  warmups = DEFAULT_WARMUPS,
  generatedAt = new Date().toISOString()
}) {
  const results = cases.map(testCase => measureCase(testCase, artifacts, { runs, warmups }));
  const caseFailures = results.flatMap(result => result.failures.map(failure => `${result.id}: ${failure}`));
  const artifactFailures = (artifactSizeBudget?.failures || [])
    .map(failure => `artifact_size_budget: ${failure}`);
  const failures = [...caseFailures, ...artifactFailures];
  return {
    generated: generatedAt,
    ok: failures.length === 0,
    runs,
    warmups,
    case_count: results.length,
    passed: results.filter(result => result.ok).length,
    failed: results.filter(result => !result.ok).length,
    results,
    artifact_size_budget: artifactSizeBudget,
    failures
  };
}

function fmt(value) {
  return Number(value).toFixed(2);
}

export function renderApiPerformanceMarkdown(report) {
  const resultLines = report.results.map(result =>
    `- ${result.id}: ${result.ok ? 'pass' : 'fail'} median=${fmt(result.median_ms)}ms p95=${fmt(result.p95_ms)}ms budget=${result.budget.median_ms}/${result.budget.p95_ms}ms bytes=${result.payload_bytes}`
  ).join('\n') || '- none';
  const failures = report.failures.length
    ? report.failures.map(failure => `- ${failure}`).join('\n')
    : '- none';
  const artifactBudget = report.artifact_size_budget;
  const artifactLines = artifactBudget?.artifacts?.length
    ? artifactBudget.artifacts.map(artifact =>
      `- ${artifact.path}: ${artifact.ok ? 'pass' : 'fail'} bytes=${artifact.bytes ?? 'missing'} budget=${artifact.max_bytes} headroom=${artifact.headroom_bytes ?? 'n/a'}`
    ).join('\n')
    : '- not checked';

  return `# AnchorFact API Performance Budget - ${report.ok ? 'PASS' : 'FAIL'}

Generated: ${report.generated}

## Summary

- status: ${report.ok ? 'pass' : 'fail'}
- cases: ${report.case_count}
- passed: ${report.passed}
- failed: ${report.failed}
- runs: ${report.runs}
- warmups: ${report.warmups}

## Results

${resultLines}

## Artifact Size Budget

- status: ${artifactBudget ? (artifactBudget.ok ? 'pass' : 'fail') : 'not_checked'}
- budgets: ${artifactBudget?.budget_count ?? 0}

${artifactLines}

## Failures

${failures}
`;
}

function parseArgs(argv) {
  const options = {
    distDir: process.env.ANCHORFACT_DIST_DIR || DEFAULT_DIST_DIR,
    runs: DEFAULT_RUNS,
    warmups: DEFAULT_WARMUPS,
    json: false
  };

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === '--json') options.json = true;
    else if (arg === '--dist') options.distDir = argv[++index];
    else if (arg === '--runs') options.runs = Number.parseInt(argv[++index], 10);
    else if (arg === '--warmups') options.warmups = Number.parseInt(argv[++index], 10);
    else throw new Error(`Unknown option: ${arg}`);
  }

  if (!Number.isFinite(options.runs) || options.runs < 1) {
    throw new Error('--runs must be a positive integer');
  }
  if (!Number.isFinite(options.warmups) || options.warmups < 0) {
    throw new Error('--warmups must be a non-negative integer');
  }
  return options;
}

export function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const artifacts = loadApiPerformanceArtifacts(options.distDir);
  const artifactSizeBudget = evaluateArtifactSizeBudgets(loadArtifactSizes(options.distDir));
  const report = buildApiPerformanceReport({
    artifacts,
    artifactSizeBudget,
    runs: options.runs,
    warmups: options.warmups
  });

  console.log(options.json ? JSON.stringify(report, null, 2) : renderApiPerformanceMarkdown(report));
  if (!report.ok) process.exitCode = 1;
  return report;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    main();
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
