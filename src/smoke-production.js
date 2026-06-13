#!/usr/bin/env node
import { createHash } from 'crypto';
import { pathToFileURL } from 'url';
import { mapWithConcurrency, positiveInteger } from './lib/concurrency.js';
import { fetchLiveText } from './lib/live-http.js';

const DEFAULT_BASE_URL = 'https://anchorfact.org/';
const DEFAULT_ROUTE_RETRIES = 2;
const DEFAULT_ROUTE_RETRY_DELAY_MS = 250;
const DEFAULT_ROUTE_CONCURRENCY = 4;
const DEFAULT_JSON_RETRIES = 2;
const DEFAULT_JSON_RETRY_DELAY_MS = 250;

export const REQUIRED_SECURITY_HEADERS = [
  { route: '/', name: 'X-Content-Type-Options', expected: 'nosniff' },
  { route: '/', name: 'X-Frame-Options', expected: 'DENY' },
  { route: '/', name: 'Referrer-Policy', expected: 'strict-origin-when-cross-origin' },
  { route: '/', name: 'Permissions-Policy', expected: 'camera=()' }
];

function readExpectedInt(name) {
  if (!process.env[name]) {
    return null;
  }

  const parsed = Number.parseInt(process.env[name], 10);
  if (!Number.isFinite(parsed)) {
    throw new Error(`${name} must be an integer when set.`);
  }
  return parsed;
}

function countClaims(payload) {
  if (Array.isArray(payload)) {
    return payload.length;
  }
  if (Array.isArray(payload.claims)) {
    return payload.claims.length;
  }
  return 0;
}

function countArticles(articles, predicate) {
  if (!Array.isArray(articles)) {
    return 0;
  }
  return articles.filter(predicate).length;
}

function sha256Text(text) {
  return createHash('sha256').update(Buffer.from(text, 'utf8')).digest('hex');
}

function sleep(ms) {
  return ms > 0 ? new Promise(resolve => setTimeout(resolve, ms)) : Promise.resolve();
}

export async function fetchRoute(baseUrl, route, options = {}) {
  const url = new URL(route, baseUrl);
  const routeRetries = Number.isFinite(options.routeRetries) ? options.routeRetries : DEFAULT_ROUTE_RETRIES;
  const routeRetryDelayMs = Number.isFinite(options.routeRetryDelayMs) ? options.routeRetryDelayMs : DEFAULT_ROUTE_RETRY_DELAY_MS;
  const fetchImpl = typeof options.fetchImpl === 'function' ? options.fetchImpl : fetch;
  const maxAttempts = Math.max(1, routeRetries + 1);
  let result = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const response = await fetchLiveText(fetchImpl, url, {
      retries: routeRetries,
      retryDelayMs: routeRetryDelayMs
    });
    result = {
      route,
      url: url.href,
      finalUrl: response.finalUrl,
      status: response.status,
      contentType: response.contentType || '',
      headers: response.headers || {},
      body: response.text,
    };

    const shouldRetry = result.status === 0 || !String(result.body || '').trim();
    if (!shouldRetry || attempt === maxAttempts) {
      return result;
    }

    await sleep(routeRetryDelayMs * attempt);
  }

  return result;
}

export async function fetchRoutes(baseUrl, routes, options = {}) {
  const routeConcurrency = positiveInteger(options.routeConcurrency, DEFAULT_ROUTE_CONCURRENCY);
  const fetchedRoutes = await mapWithConcurrency(routes, routeConcurrency, async (route) => fetchRoute(baseUrl, route, options));
  const results = {};
  for (let index = 0; index < routes.length; index++) {
    results[routes[index]] = fetchedRoutes[index];
  }
  return results;
}

export async function readJsonRoute(baseUrl, route, results, options = {}) {
  const retries = Number.isFinite(options.retries) ? options.retries : DEFAULT_JSON_RETRIES;
  const retryDelayMs = Number.isFinite(options.retryDelayMs) ? options.retryDelayMs : DEFAULT_JSON_RETRY_DELAY_MS;
  const maxAttempts = Math.max(1, retries + 1);
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (attempt > 1 || !results[route]) {
      results[route] = await fetchRoute(baseUrl, route);
    }

    try {
      const body = String(results[route]?.body || '');
      if (!body.trim()) {
        throw new Error('empty response body');
      }
      return JSON.parse(body);
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        await sleep(retryDelayMs * attempt);
      }
    }
  }

  throw new Error(`${route} returned invalid JSON after ${maxAttempts} attempts: ${lastError?.message || String(lastError)}`);
}

function assertOk(condition, message, failures) {
  if (!condition) {
    failures.push(message);
  }
}

function assertExpected(actual, expected, label, failures) {
  if (expected === null) {
    return;
  }
  assertOk(actual === expected, `${label} expected ${expected}, got ${actual}`, failures);
}

export function hasCanonicalSlug(items, slug) {
  return Array.isArray(items) && items.some(item => item?.canonical_slug === slug);
}

export function repairQueueBatchFailures(repairQueue = {}) {
  const failures = [];
  const candidateCount = repairQueue.candidate_count;
  const nextBatchSize = repairQueue.next_batch_size;
  const nextBatch = repairQueue.next_batch;

  if (!Number.isInteger(candidateCount) || candidateCount < 0) {
    failures.push('content-health repair queue candidate count is missing');
  }
  if (!Array.isArray(nextBatch)) {
    failures.push('content-health repair queue next batch is missing');
  }

  const expectedBatchSize = Math.min(2, Math.max(0, Number.isInteger(candidateCount) ? candidateCount : 0));
  if (!Number.isInteger(nextBatchSize) || nextBatchSize !== expectedBatchSize) {
    failures.push(`content-health repair queue next batch size expected ${expectedBatchSize}, got ${nextBatchSize ?? '(missing)'}`);
  }
  if (Array.isArray(nextBatch) && Number.isInteger(nextBatchSize) && nextBatch.length !== nextBatchSize) {
    failures.push(`content-health repair queue next batch length expected ${nextBatchSize}, got ${nextBatch.length}`);
  }

  return failures;
}

function headerIncludes(result, name, expected, failures) {
  const actual = result.headers[name.toLowerCase()] || '';
  assertOk(actual.toLowerCase().includes(expected.toLowerCase()), `${result.route} header ${name} expected to include ${expected}, got ${actual || '(missing)'}`, failures);
}

function isSafeExampleRoute(path) {
  const pathname = typeof path === 'string' ? path.split(/[?#]/)[0] : '';
  return typeof path === 'string'
    && path.startsWith('/')
    && !path.startsWith('//')
    && !path.includes('\\')
    && !pathname.split('/').includes('..');
}

export function exampleWorkflowRoutes(examplesPayload, limit = 24) {
  const routes = [];
  for (const example of examplesPayload?.examples || []) {
    for (const step of example.workflow || []) {
      const method = step.call?.method || 'GET';
      const path = step.call?.path;
      if (method !== 'GET' || !isSafeExampleRoute(path) || routes.includes(path)) {
        continue;
      }
      routes.push(path);
      if (routes.length >= limit) return routes;
    }
  }
  return routes;
}

export function evalCallRoutes(evalsPayload, limit = 24) {
  const routes = [];
  for (const evalCase of evalsPayload?.evals || []) {
    const method = evalCase.call?.method || 'GET';
    const path = evalCase.call?.path;
    if (method !== 'GET' || !isSafeExampleRoute(path) || routes.includes(path)) {
      continue;
    }
    routes.push(path);
    if (routes.length >= limit) return routes;
  }
  return routes;
}

export async function main() {
  const baseUrl = new URL(process.argv[2] || process.env.ANCHORFACT_BASE_URL || DEFAULT_BASE_URL);
  const failures = [];

  const expectedPublic = readExpectedInt('EXPECTED_PUBLIC_ARTICLES');
  const expectedDraft = readExpectedInt('EXPECTED_DRAFT_ARTICLES');
  const expectedClaims = readExpectedInt('EXPECTED_CLAIMS');

  const routes = ['/', '/index.json', '/api-access/', '/robots.txt', '/sitemap.xml', '/agent.json', '/.well-known/anchorfact.json', '/openapi.json', '/artifact-summary.json', '/artifact-shards.json', '/api-readiness.json', '/manifest.json', '/llms.txt', '/claims.json', '/topics.json', '/capabilities.json', '/content-health.json', '/coverage.json', '/examples.json', '/graph.json', '/evals.json', '/mcp.json', '/api', '/api/plan?q=gaussian&limit=2', '/api/evidence?q=gaussian&limit=2', '/api/evidence?q=gaussian&limit=1&format=markdown', '/api/context?q=gaussian&limit=2', '/api/context?q=gaussian&limit=1&format=markdown', '/api/resolve?ref=f1', '/api/resolve-batch?ref=f1&ref=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079', '/api/resolve-batch?ref=f1&ref=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079&format=markdown', '/api/search?q=gaussian&limit=2', '/api/article?slug=ai/3d-generation-gaussian-splatting', '/api/claim?id=f1', '/api/cite?id=f1', '/api/cite?id=f1&format=markdown', '/api/source?url=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079', '/search-index.json', '/sources.json', '/provenance.json', '/provenance.sig', '/drafts.html', '/dashboard.html'];
  const results = {};

  Object.assign(results, await fetchRoutes(baseUrl, routes));
  for (const route of routes) {
    assertOk(results[route].status === 200, `${route} returned ${results[route].status}`, failures);
  }

  const rootAlias = await readJsonRoute(baseUrl, '/', results);
  const rootIndex = await readJsonRoute(baseUrl, '/index.json', results);
  const agentProfile = await readJsonRoute(baseUrl, '/agent.json', results);
  const wellKnownAgentProfile = await readJsonRoute(baseUrl, '/.well-known/anchorfact.json', results);
  const openapi = await readJsonRoute(baseUrl, '/openapi.json', results);
  const artifactSummary = await readJsonRoute(baseUrl, '/artifact-summary.json', results);
  const artifactShards = await readJsonRoute(baseUrl, '/artifact-shards.json', results);
  const apiReadiness = await readJsonRoute(baseUrl, '/api-readiness.json', results);
  const manifest = await readJsonRoute(baseUrl, '/manifest.json', results);
  const claims = await readJsonRoute(baseUrl, '/claims.json', results);
  const topics = await readJsonRoute(baseUrl, '/topics.json', results);
  const capabilities = await readJsonRoute(baseUrl, '/capabilities.json', results);
  const contentHealth = await readJsonRoute(baseUrl, '/content-health.json', results);
  const coverage = await readJsonRoute(baseUrl, '/coverage.json', results);
  const examples = await readJsonRoute(baseUrl, '/examples.json', results);
  const graph = await readJsonRoute(baseUrl, '/graph.json', results);
  const evals = await readJsonRoute(baseUrl, '/evals.json', results);
  const mcp = await readJsonRoute(baseUrl, '/mcp.json', results);
  const apiIndex = await readJsonRoute(baseUrl, '/api', results);
  const planApi = await readJsonRoute(baseUrl, '/api/plan?q=gaussian&limit=2', results);
  const evidenceApi = await readJsonRoute(baseUrl, '/api/evidence?q=gaussian&limit=2', results);
  const evidenceMarkdown = results['/api/evidence?q=gaussian&limit=1&format=markdown'].body;
  const contextApi = await readJsonRoute(baseUrl, '/api/context?q=gaussian&limit=2', results);
  const contextMarkdown = results['/api/context?q=gaussian&limit=1&format=markdown'].body;
  const resolveApi = await readJsonRoute(baseUrl, '/api/resolve?ref=f1', results);
  const resolveBatchApi = await readJsonRoute(baseUrl, '/api/resolve-batch?ref=f1&ref=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079', results);
  const resolveBatchMarkdown = results['/api/resolve-batch?ref=f1&ref=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079&format=markdown'].body;
  const searchApi = await readJsonRoute(baseUrl, '/api/search?q=gaussian&limit=2', results);
  const articleApi = await readJsonRoute(baseUrl, '/api/article?slug=ai/3d-generation-gaussian-splatting', results);
  const claimApi = await readJsonRoute(baseUrl, '/api/claim?id=f1', results);
  const citeApi = await readJsonRoute(baseUrl, '/api/cite?id=f1', results);
  const citeMarkdown = results['/api/cite?id=f1&format=markdown'].body;
  const sourceApi = await readJsonRoute(baseUrl, '/api/source?url=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079', results);
  const searchIndex = await readJsonRoute(baseUrl, '/search-index.json', results);
  const sources = await readJsonRoute(baseUrl, '/sources.json', results);
  const provenance = await readJsonRoute(baseUrl, '/provenance.json', results);
  const apiAccessPolicy = await readJsonRoute(baseUrl, '/api-access/', results);
  const draftsIndex = await readJsonRoute(baseUrl, '/drafts.html', results);
  const dashboard = await readJsonRoute(baseUrl, '/dashboard.html', results);
  const robotsText = results['/robots.txt'].body;
  const sitemapText = results['/sitemap.xml'].body;
  const llmsText = results['/llms.txt'].body;
  const exampleRoutes = exampleWorkflowRoutes(examples);
  assertOk(exampleRoutes.length >= 4, '/examples.json exposes too few executable workflow calls', failures);
  Object.assign(results, await fetchRoutes(baseUrl, exampleRoutes.filter(route => !results[route])));
  for (const route of exampleRoutes) {
    assertOk(results[route].status === 200, `example workflow route ${route} returned ${results[route].status}`, failures);
  }
  const evalRoutes = evalCallRoutes(evals);
  assertOk(evalRoutes.length >= 4, '/evals.json exposes too few executable checks', failures);
  Object.assign(results, await fetchRoutes(baseUrl, evalRoutes.filter(route => !results[route])));
  for (const route of evalRoutes) {
    assertOk(results[route].status === 200, `eval route ${route} returned ${results[route].status}`, failures);
  }

  const publicArticles = countArticles(
    manifest.articles,
    (article) => article.status === 'public' && article.is_draft === false,
  );
  const draftArticles = countArticles(
    manifest.articles,
    (article) => article.status === 'draft' || article.is_draft === true,
  );
  const claimCount = countClaims(claims);

  assertOk(rootIndex.schema_version === 'anchorfact.root-index.v1', `root index schema_version expected anchorfact.root-index.v1, got ${rootIndex.schema_version || '(missing)'}`, failures);
  assertOk(rootIndex.provenance_url === new URL('/provenance.json', baseUrl).href, `root index provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${rootIndex.provenance_url || '(missing)'}`, failures);
  assertOk(rootIndex.default_answer_path === '/api/context?q={query}', 'root index default answer path is missing', failures);
  assertOk(Array.isArray(rootIndex.preferred_machine_entrypoints) && rootIndex.preferred_machine_entrypoints.some(entry => entry.path === '/api/context?q={query}'), 'root index is missing default context entrypoint', failures);
  assertOk(rootIndex.discovery?.openapi === '/openapi.json', 'root index is missing OpenAPI discovery path', failures);
  assertOk(rootIndex.discovery?.api_readiness === '/api-readiness.json', 'root index is missing API readiness discovery path', failures);
  assertOk(rootIndex.counts?.public_articles === publicArticles, 'root index public article count does not match manifest', failures);
  assertOk(rootIndex.counts?.draft_articles === draftArticles, 'root index draft article count does not match manifest', failures);
  assertOk(rootIndex.counts?.public_claims === claimCount, 'root index public claim count does not match claims.json', failures);
  assertOk(rootIndex.trust_policy?.public_only_entrypoints_exclude_drafts === true, 'root index trust policy does not exclude drafts', failures);
  assertOk(rootIndex.trust_policy?.default_answer_requires_can_answer_with_anchorfact === true, 'root index trust policy does not require answer policy checks', failures);
  assertOk(rootAlias.schema_version === rootIndex.schema_version, 'root slash JSON alias schema does not match /index.json', failures);
  assertOk(rootAlias.default_answer_path === rootIndex.default_answer_path, 'root slash JSON alias default answer path does not match /index.json', failures);
  assertOk(rootAlias.counts?.public_articles === rootIndex.counts?.public_articles, 'root slash JSON alias public count does not match /index.json', failures);
  assertOk(agentProfile.schema_version === 'anchorfact.agent.v1', `agent schema_version expected anchorfact.agent.v1, got ${agentProfile.schema_version || '(missing)'}`, failures);
  assertOk(wellKnownAgentProfile.schema_version === agentProfile.schema_version, 'well-known agent profile schema does not match /agent.json', failures);
  assertOk(wellKnownAgentProfile.generated === agentProfile.generated, 'well-known agent profile generated timestamp does not match /agent.json', failures);
  assertOk(agentProfile.endpoints?.root_index?.url === new URL('/index.json', baseUrl).href, 'agent profile root index endpoint does not match base URL', failures);
  assertOk(agentProfile.endpoints?.openapi?.url === new URL('/openapi.json', baseUrl).href, 'agent profile OpenAPI endpoint does not match base URL', failures);
  assertOk(agentProfile.endpoints?.api_access?.url === new URL('/api-access/', baseUrl).href, 'agent profile API access endpoint does not match base URL', failures);
  assertOk(agentProfile.endpoints?.api_access?.media_type === 'application/json', 'agent profile API access endpoint should be JSON', failures);
  assertOk(agentProfile.endpoints?.artifact_summary?.url === new URL('/artifact-summary.json', baseUrl).href, 'agent profile artifact summary endpoint does not match base URL', failures);
  assertOk(agentProfile.endpoints?.api_readiness?.url === new URL('/api-readiness.json', baseUrl).href, 'agent profile API readiness endpoint does not match base URL', failures);
  assertOk(agentProfile.endpoints?.capabilities?.url === new URL('/capabilities.json', baseUrl).href, 'agent profile capabilities endpoint does not match base URL', failures);
  assertOk(agentProfile.endpoints?.content_health?.url === new URL('/content-health.json', baseUrl).href, 'agent profile content health endpoint does not match base URL', failures);
  assertOk(agentProfile.endpoints?.coverage?.url === new URL('/coverage.json', baseUrl).href, 'agent profile coverage endpoint does not match base URL', failures);
  assertOk(agentProfile.endpoints?.evidence_api?.path === '/api/evidence?q={query}', 'agent profile evidence API endpoint template is missing', failures);
  assertOk(agentProfile.endpoints?.context_api?.path === '/api/context?q={query}', 'agent profile context API endpoint template is missing', failures);
  assertOk(agentProfile.endpoints?.resolve_api?.path === '/api/resolve?ref={reference}', 'agent profile resolve API endpoint template is missing', failures);
  assertOk(agentProfile.endpoints?.resolve_batch_api?.path === '/api/resolve-batch?ref={reference}&ref={reference}', 'agent profile resolve batch API endpoint template is missing', failures);
  assertOk(agentProfile.endpoints?.plan_api?.path === '/api/plan?q={query}', 'agent profile plan API endpoint template is missing', failures);
  assertOk(agentProfile.endpoints?.search_api?.path === '/api/search?q={query}', 'agent profile search API endpoint template is missing', failures);
  assertOk(agentProfile.endpoints?.article_api?.path === '/api/article?slug={canonical_slug}', 'agent profile article API endpoint template is missing', failures);
  assertOk(agentProfile.endpoints?.cite_api?.path === '/api/cite?id={claim_id}', 'agent profile cite API endpoint template is missing', failures);
  assertOk(agentProfile.endpoints?.claim_api?.path === '/api/claim?id={claim_id}', 'agent profile claim API endpoint template is missing', failures);
  assertOk(agentProfile.endpoints?.source_api?.path === '/api/source?id={source_id}', 'agent profile source API endpoint template is missing', failures);
  assertOk(agentProfile.quick_start?.default_answer_path === '/api/context?q={query}', 'agent profile quick start default answer path is missing', failures);
  assertOk(agentProfile.quick_start?.free_api_access_path === '/api-access/', 'agent profile quick start API access path is missing', failures);
  assertOk(agentProfile.quick_start?.local_mcp_answer_tool === 'anchorfact_context', 'agent profile quick start MCP answer tool is missing', failures);
  assertOk(agentProfile.quick_start?.fallback_policy?.unsupported_answer_mode === 'external_sources_required', 'agent profile quick start fallback policy is missing', failures);
  assertOk(agentProfile.quick_start?.trust_check?.path === '/provenance.json', 'agent profile quick start provenance path is missing', failures);
  assertOk(agentProfile.endpoints?.graph?.url === new URL('/graph.json', baseUrl).href, 'agent profile graph endpoint does not match base URL', failures);
  assertOk(agentProfile.endpoints?.evals?.url === new URL('/evals.json', baseUrl).href, 'agent profile evals endpoint does not match base URL', failures);
  assertOk(agentProfile.endpoints?.mcp?.url === new URL('/mcp.json', baseUrl).href, 'agent profile mcp endpoint does not match base URL', failures);
  assertOk(agentProfile.endpoints?.provenance?.url === new URL('/provenance.json', baseUrl).href, 'agent profile provenance endpoint does not match base URL', failures);
  assertOk(openapi.openapi === '3.1.0', `openapi version expected 3.1.0, got ${openapi.openapi || '(missing)'}`, failures);
  assertOk(openapi['x-anchorfact-schema-version'] === 'anchorfact.openapi.v1', `openapi AnchorFact schema expected anchorfact.openapi.v1, got ${openapi['x-anchorfact-schema-version'] || '(missing)'}`, failures);
  assertOk(openapi['x-provenance-url'] === new URL('/provenance.json', baseUrl).href, `openapi provenance url expected ${new URL('/provenance.json', baseUrl).href}, got ${openapi['x-provenance-url'] || '(missing)'}`, failures);
  assertOk(openapi.paths?.['/index.json'], 'openapi is missing /index.json path', failures);
  assertOk(openapi.paths?.['/api-access/'], 'openapi is missing /api-access/ path', failures);
  assertOk(openapi.paths?.['/api/evidence'], 'openapi is missing /api/evidence path', failures);
  assertOk(openapi.paths?.['/api/context'], 'openapi is missing /api/context path', failures);
  assertOk(openapi.components?.schemas?.MachineConsumptionGuidance, 'openapi is missing MachineConsumptionGuidance schema', failures);
  assertOk(openapi.paths?.['/api/resolve'], 'openapi is missing /api/resolve path', failures);
  assertOk(openapi.paths?.['/api/resolve-batch'], 'openapi is missing /api/resolve-batch path', failures);
  assertOk(openapi.paths?.['/api/plan'], 'openapi is missing /api/plan path', failures);
  assertOk(openapi.paths?.['/api/search'], 'openapi is missing /api/search path', failures);
  assertOk(openapi.paths?.['/api/article'], 'openapi is missing /api/article path', failures);
  assertOk(openapi.paths?.['/api/claim'], 'openapi is missing /api/claim path', failures);
  assertOk(openapi.paths?.['/api/cite'], 'openapi is missing /api/cite path', failures);
  assertOk(openapi.paths?.['/api/source'], 'openapi is missing /api/source path', failures);
  assertOk(openapi.paths?.['/topics.json'], 'openapi is missing /topics.json path', failures);
  assertOk(openapi.paths?.['/capabilities.json'], 'openapi is missing /capabilities.json path', failures);
  assertOk(openapi.paths?.['/content-health.json'], 'openapi is missing /content-health.json path', failures);
  assertOk(openapi.paths?.['/coverage.json'], 'openapi is missing /coverage.json path', failures);
  assertOk(openapi.paths?.['/examples.json'], 'openapi is missing /examples.json path', failures);
  assertOk(openapi.paths?.['/graph.json'], 'openapi is missing /graph.json path', failures);
  assertOk(openapi.paths?.['/evals.json'], 'openapi is missing /evals.json path', failures);
  assertOk(openapi.paths?.['/mcp.json'], 'openapi is missing /mcp.json path', failures);
  assertOk(openapi.paths?.['/artifact-summary.json'], 'openapi is missing /artifact-summary.json path', failures);
  assertOk(openapi.paths?.['/artifact-shards.json'], 'openapi is missing /artifact-shards.json path', failures);
  assertOk(openapi.paths?.['/api-readiness.json'], 'openapi is missing /api-readiness.json path', failures);
  assertOk(openapi.paths?.['/api'], 'openapi is missing /api path', failures);
  assertOk(openapi.paths?.['/search-index.json'], 'openapi is missing /search-index.json path', failures);
  assertOk(openapi.paths?.['/{canonical_slug}/index.json'], 'openapi is missing article JSON-LD path template', failures);
  assertOk(openapi.components?.schemas?.RootIndex, 'openapi is missing RootIndex schema', failures);
  assertOk(openapi.components?.schemas?.ContentHealth, 'openapi is missing ContentHealth schema', failures);
  assertOk(openapi.components?.schemas?.ArtifactSummary, 'openapi is missing ArtifactSummary schema', failures);
  assertOk(openapi.components?.schemas?.ApiReadiness, 'openapi is missing ApiReadiness schema', failures);
  assertOk(artifactSummary.schema_version === 'anchorfact.artifact-summary.v1', `artifact summary schema_version expected anchorfact.artifact-summary.v1, got ${artifactSummary.schema_version || '(missing)'}`, failures);
  assertOk(artifactSummary.provenance_url === new URL('/provenance.json', baseUrl).href, `artifact summary provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${artifactSummary.provenance_url || '(missing)'}`, failures);
  assertOk(Array.isArray(artifactSummary.recommended_default_calls) && artifactSummary.recommended_default_calls.some(call => call.path === '/api/context?q={query}'), '/artifact-summary.json is missing default context call', failures);
  assertOk(Array.isArray(artifactSummary.artifacts) && artifactSummary.artifacts.some(artifact => artifact.path === '/index.json'), '/artifact-summary.json is missing root machine index artifact', failures);
  assertOk(Array.isArray(artifactSummary.artifacts) && artifactSummary.artifacts.some(artifact => artifact.path === '/graph.json'), '/artifact-summary.json is missing graph artifact', failures);
  assertOk(artifactSummary.artifacts.some(artifact => artifact.path === '/artifact-shards.json'), '/artifact-summary.json is missing artifact-shards artifact', failures);
  assertOk(artifactSummary.artifacts.some(artifact => artifact.path === '/api-readiness.json'), '/artifact-summary.json is missing api-readiness artifact', failures);
  assertOk(artifactSummary.artifacts.some(artifact => artifact.path === '/graph.json' && artifact.shard_registry_path === '/artifact-shards.json'), '/artifact-summary.json does not link graph to shard registry', failures);
  assertOk(artifactShards.schema_version === 'anchorfact.artifact-shards.v1', `artifact shards schema_version expected anchorfact.artifact-shards.v1, got ${artifactShards.schema_version || '(missing)'}`, failures);
  assertOk(artifactShards.provenance_url === new URL('/provenance.json', baseUrl).href, `artifact shards provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${artifactShards.provenance_url || '(missing)'}`, failures);
  assertOk(Array.isArray(artifactShards.artifacts) && artifactShards.artifacts.some(artifact => artifact.source_path === '/claims.json'), '/artifact-shards.json is missing claims shards', failures);
  assertOk(Array.isArray(artifactShards.artifacts) && artifactShards.artifacts.some(artifact => artifact.source_path === '/graph.json' && artifact.collection === 'nodes'), '/artifact-shards.json is missing graph node shards', failures);
  assertOk(apiReadiness.schema_version === 'anchorfact.api-readiness.v1', `api readiness schema_version expected anchorfact.api-readiness.v1, got ${apiReadiness.schema_version || '(missing)'}`, failures);
  assertOk(apiReadiness.provenance_url === new URL('/provenance.json', baseUrl).href, `api readiness provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${apiReadiness.provenance_url || '(missing)'}`, failures);
  assertOk(apiReadiness.report_only === true, '/api-readiness.json should remain report-only until readiness gates pass', failures);
  assertOk(apiReadiness.subscription_ready === false, '/api-readiness.json should not mark subscription_ready before external readiness gates pass', failures);
  assertOk(apiReadiness.build_should_fail === false, '/api-readiness.json should not fail production builds while in report-only mode', failures);
  const readinessGateIds = new Set((apiReadiness.readiness_gates || []).map(gate => gate?.id));
  for (const gateId of ['core_query_context_ratio', 'production_integrity_14_day', 'ai_primary_discovery_ratio_7_day']) {
    assertOk(readinessGateIds.has(gateId), `/api-readiness.json is missing readiness gate ${gateId}`, failures);
  }
  assertOk(apiReadiness.api_scorecard?.fallback?.ok === true, '/api-readiness.json fallback guardrail is not passing', failures);
  assertOk(apiAccessPolicy.schema_version === 'anchorfact.api-access.v1', `api access schema_version expected anchorfact.api-access.v1, got ${apiAccessPolicy.schema_version || '(missing)'}`, failures);
  assertOk(apiAccessPolicy.access_policy?.no_api_key_required === true, '/api-access/ should state that no API key is required today', failures);
  assertOk(apiAccessPolicy.access_policy?.payment_required === false, '/api-access/ should state payment is not required today', failures);
  assertOk(apiAccessPolicy.access_policy?.read_only === true, '/api-access/ should state the API is read-only', failures);
  assertOk(Array.isArray(apiAccessPolicy.recommended_call_order) && apiAccessPolicy.recommended_call_order[0]?.path === '/api/context?q={query}', '/api-access/ should put context first', failures);
  assertOk(apiAccessPolicy.recommended_call_order?.some(call => call.path === '/api/evidence?q={query}'), '/api-access/ should list evidence API', failures);
  assertOk(apiAccessPolicy.recommended_call_order?.some(call => call.path === '/api/cite?id={claim_id}'), '/api-access/ should list citation API', failures);
  assertOk(apiAccessPolicy.trust_check?.path === '/provenance.json', '/api-access/ should include provenance verification', failures);
  assertOk(robotsText.includes('Sitemap: https://anchorfact.org/sitemap.xml'), '/robots.txt does not advertise sitemap.xml', failures);
  assertOk(robotsText.includes('Machine-Index: https://anchorfact.org/index.json'), '/robots.txt does not advertise index.json', failures);
  assertOk(robotsText.includes('LLMs: https://anchorfact.org/llms.txt'), '/robots.txt does not advertise llms.txt', failures);
  assertOk(robotsText.includes('Agent: https://anchorfact.org/agent.json'), '/robots.txt does not advertise agent.json', failures);
  assertOk(robotsText.includes('OpenAPI: https://anchorfact.org/openapi.json'), '/robots.txt does not advertise openapi.json', failures);
  assertOk(robotsText.includes('API: https://anchorfact.org/api'), '/robots.txt does not advertise API index', failures);
  assertOk(robotsText.includes('API-Access: https://anchorfact.org/api-access/'), '/robots.txt does not advertise /api-access/', failures);
  assertOk(robotsText.includes('Artifact-Summary: https://anchorfact.org/artifact-summary.json'), '/robots.txt does not advertise artifact-summary.json', failures);
  assertOk(robotsText.includes('Artifact-Shards: https://anchorfact.org/artifact-shards.json'), '/robots.txt does not advertise artifact-shards.json', failures);
  assertOk(robotsText.includes('API-Readiness: https://anchorfact.org/api-readiness.json'), '/robots.txt does not advertise api-readiness.json', failures);
  assertOk(robotsText.includes('Large-Artifact-Policy: prefer_api_context_or_evidence'), '/robots.txt does not advertise large artifact API preference', failures);
  assertOk(robotsText.includes('MCP: https://anchorfact.org/mcp.json'), '/robots.txt does not advertise mcp.json', failures);
  assertOk(robotsText.includes('Provenance: https://anchorfact.org/provenance.json'), '/robots.txt does not advertise provenance.json', failures);
  assertOk(robotsText.includes('Health: https://anchorfact.org/content-health.json'), '/robots.txt does not advertise content-health.json', failures);
  assertOk(sitemapText.includes('https://anchorfact.org/index.json'), '/sitemap.xml does not include index.json', failures);
  assertOk(sitemapText.includes('https://anchorfact.org/agent.json'), '/sitemap.xml does not include agent.json', failures);
  assertOk(sitemapText.includes('https://anchorfact.org/llms.txt'), '/sitemap.xml does not include llms.txt', failures);
  assertOk(sitemapText.includes('https://anchorfact.org/api'), '/sitemap.xml does not include API index', failures);
  assertOk(sitemapText.includes('https://anchorfact.org/api-access/'), '/sitemap.xml does not include /api-access/', failures);
  assertOk(sitemapText.includes('https://anchorfact.org/artifact-summary.json'), '/sitemap.xml does not include artifact-summary.json', failures);
  assertOk(sitemapText.includes('https://anchorfact.org/artifact-shards.json'), '/sitemap.xml does not include artifact-shards.json', failures);
  assertOk(sitemapText.includes('https://anchorfact.org/api-readiness.json'), '/sitemap.xml does not include api-readiness.json', failures);
  assertOk(sitemapText.includes('https://anchorfact.org/mcp.json'), '/sitemap.xml does not include mcp.json', failures);
  assertOk(sitemapText.includes('https://anchorfact.org/provenance.json'), '/sitemap.xml does not include provenance.json', failures);
  assertOk(sitemapText.includes('https://anchorfact.org/content-health.json'), '/sitemap.xml does not include content-health.json', failures);
  assertOk(agentProfile.current_snapshot?.public_articles === manifest.public_article_count, 'agent profile public count does not match manifest', failures);
  assertOk(agentProfile.current_snapshot?.draft_articles === manifest.draft_article_count, 'agent profile draft count does not match manifest', failures);
  assertOk(agentProfile.current_snapshot?.public_claims === claimCount, 'agent profile claim count does not match claims.json', failures);
  assertOk(agentProfile.current_snapshot?.content_health_public_articles === contentHealth.snapshot?.public_articles, 'agent profile content health public count does not match content-health.json', failures);
  assertOk(agentProfile.current_snapshot?.content_health_draft_articles === contentHealth.snapshot?.draft_articles, 'agent profile content health draft count does not match content-health.json', failures);
  assertOk(agentProfile.current_snapshot?.api_readiness_status === apiReadiness.status, 'agent profile API readiness status does not match api-readiness.json', failures);
  assertOk(agentProfile.current_snapshot?.api_readiness_subscription_ready === apiReadiness.subscription_ready, 'agent profile API readiness subscription flag does not match api-readiness.json', failures);
  assertOk(agentProfile.current_snapshot?.api_readiness_context_ratio === apiReadiness.api_scorecard?.pass_ratio, 'agent profile API readiness context ratio does not match api-readiness.json', failures);
  assertOk(agentProfile.endpoints?.api_index?.path === '/api', 'agent profile API index endpoint is missing', failures);
  assertOk(apiIndex.schema_version === 'anchorfact.api-index.v1', `api index schema_version expected anchorfact.api-index.v1, got ${apiIndex.schema_version || '(missing)'}`, failures);
  assertOk(Array.isArray(apiIndex.static_fallbacks) && apiIndex.static_fallbacks.some(fallback => fallback.path === '/index.json'), '/api static fallbacks are missing /index.json', failures);
  assertOk(Array.isArray(apiIndex.static_fallbacks) && apiIndex.static_fallbacks.some(fallback => fallback.path === '/content-health.json'), '/api static fallbacks are missing /content-health.json', failures);
  assertOk(Array.isArray(apiIndex.static_fallbacks) && apiIndex.static_fallbacks.some(fallback => fallback.path === '/api-access/'), '/api static fallbacks are missing /api-access/', failures);
  assertOk(Array.isArray(apiIndex.static_fallbacks) && apiIndex.static_fallbacks.some(fallback => fallback.path === '/artifact-summary.json'), '/api static fallbacks are missing /artifact-summary.json', failures);
  assertOk(Array.isArray(apiIndex.static_fallbacks) && apiIndex.static_fallbacks.some(fallback => fallback.path === '/artifact-shards.json'), '/api static fallbacks are missing /artifact-shards.json', failures);
  assertOk(Array.isArray(apiIndex.static_fallbacks) && apiIndex.static_fallbacks.some(fallback => fallback.path === '/api-readiness.json'), '/api static fallbacks are missing /api-readiness.json', failures);
  const apiIndexPaths = new Set((apiIndex.endpoints || []).map(endpoint => endpoint?.path));
  for (const path of ['/api/plan', '/api/evidence', '/api/context', '/api/resolve', '/api/resolve-batch', '/api/search', '/api/article', '/api/claim', '/api/cite', '/api/source']) {
    assertOk(apiIndexPaths.has(path), `/api is missing ${path}`, failures);
  }
  assertOk(agentProfile.current_snapshot?.topics === topics.topic_count, 'agent profile topic count does not match topics.json', failures);
  assertOk(agentProfile.current_snapshot?.capabilities === capabilities.capability_count, 'agent profile capability count does not match capabilities.json', failures);
  assertOk(agentProfile.current_snapshot?.examples === examples.example_count, 'agent profile example count does not match examples.json', failures);
  assertOk(agentProfile.current_snapshot?.graph_nodes === graph.node_count, 'agent profile graph node count does not match graph.json', failures);
  assertOk(agentProfile.current_snapshot?.graph_edges === graph.edge_count, 'agent profile graph edge count does not match graph.json', failures);
  assertOk(agentProfile.current_snapshot?.evals === evals.eval_count, 'agent profile eval count does not match evals.json', failures);
  assertOk(agentProfile.current_snapshot?.mcp_tools === mcp.tools.length, 'agent profile MCP tool count does not match mcp.json', failures);
  assertOk(agentProfile.current_snapshot?.searchable_records === searchIndex.article_count, 'agent profile searchable record count does not match search-index.json', failures);
  assertOk(agentProfile.current_snapshot?.unique_sources === sources.source_count, 'agent profile source count does not match sources.json', failures);
  assertOk(manifest.public_article_count === publicArticles, `manifest public_article_count ${manifest.public_article_count} does not match articles[] count ${publicArticles}`, failures);
  assertOk(manifest.draft_article_count === draftArticles, `manifest draft_article_count ${manifest.draft_article_count} does not match articles[] count ${draftArticles}`, failures);
  assertOk(manifest.claim_count === claimCount, `manifest claim_count ${manifest.claim_count} does not match claims.json count ${claimCount}`, failures);
  assertOk(manifest.schema_version === 'anchorfact.manifest.v1', `manifest schema_version expected anchorfact.manifest.v1, got ${manifest.schema_version || '(missing)'}`, failures);
  assertOk(manifest.provenance_url === new URL('/provenance.json', baseUrl).href, `manifest provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${manifest.provenance_url || '(missing)'}`, failures);
  assertOk(claims.schema_version === 'anchorfact.claims.v1', `claims schema_version expected anchorfact.claims.v1, got ${claims.schema_version || '(missing)'}`, failures);
  assertOk(claims.provenance_url === new URL('/provenance.json', baseUrl).href, `claims provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${claims.provenance_url || '(missing)'}`, failures);
  assertOk(topics.schema_version === 'anchorfact.topics.v1', `topics schema_version expected anchorfact.topics.v1, got ${topics.schema_version || '(missing)'}`, failures);
  assertOk(topics.provenance_url === new URL('/provenance.json', baseUrl).href, `topics provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${topics.provenance_url || '(missing)'}`, failures);
  assertOk(topics.public_article_count === manifest.public_article_count, 'topics public count does not match manifest', failures);
  assertOk(topics.public_claim_count === claimCount, 'topics claim count does not match claims.json', failures);
  assertOk(Array.isArray(topics.topics) && topics.topics.some(topic => topic.id === 'ai'), '/topics.json is missing ai topic', failures);
  assertOk(capabilities.schema_version === 'anchorfact.capabilities.v1', `capabilities schema_version expected anchorfact.capabilities.v1, got ${capabilities.schema_version || '(missing)'}`, failures);
  assertOk(capabilities.provenance_url === new URL('/provenance.json', baseUrl).href, `capabilities provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${capabilities.provenance_url || '(missing)'}`, failures);
  assertOk(capabilities.capability_count === (Array.isArray(capabilities.capabilities) ? capabilities.capabilities.length : 0), 'capabilities capability_count does not match capabilities[] length', failures);
  const planCapability = Array.isArray(capabilities.capabilities)
    ? capabilities.capabilities.find(capability => capability.id === 'plan_query')
    : null;
  assertOk(!!planCapability, '/capabilities.json is missing plan_query', failures);
  assertOk(Array.isArray(planCapability?.local_mcp_tools) && planCapability.local_mcp_tools.some(tool => tool.tool === 'anchorfact_plan_query'), '/capabilities.json plan_query is missing MCP planner mapping', failures);
  assertOk(Array.isArray(capabilities.capabilities) && capabilities.capabilities.some(capability => capability.id === 'answer_with_evidence'), '/capabilities.json is missing answer_with_evidence', failures);
  assertOk(Array.isArray(capabilities.capabilities) && capabilities.capabilities.some(capability => capability.id === 'resolve_many_references'), '/capabilities.json is missing resolve_many_references', failures);
  assertOk(Array.isArray(capabilities.capabilities) && capabilities.capabilities.some(capability => capability.id === 'verify_official_build'), '/capabilities.json is missing verify_official_build', failures);
  assertOk(contentHealth.schema_version === 'anchorfact.content-health.v1', `content-health schema_version expected anchorfact.content-health.v1, got ${contentHealth.schema_version || '(missing)'}`, failures);
  assertOk(contentHealth.provenance_url === new URL('/provenance.json', baseUrl).href, `content-health provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${contentHealth.provenance_url || '(missing)'}`, failures);
  assertOk(contentHealth.snapshot?.public_articles === manifest.public_article_count, 'content-health public count does not match manifest', failures);
  assertOk(contentHealth.snapshot?.draft_articles === manifest.draft_article_count, 'content-health draft count does not match manifest', failures);
  assertOk(contentHealth.snapshot?.public_claims === claimCount, 'content-health claim count does not match claims.json', failures);
  assertOk(contentHealth.public?.claim_mapping?.total === claimCount, 'content-health claim mapping total does not match claims.json', failures);
  assertOk(contentHealth.public?.claim_mapping?.mapped === claimCount, 'content-health mapped claim count does not match claims.json', failures);
  const sourceCoverage = contentHealth.public?.source_coverage || {};
  assertOk(
    (sourceCoverage.full || 0) + (sourceCoverage.partial || 0) + (sourceCoverage.zero || 0) === manifest.public_article_count,
    'content-health source coverage buckets do not sum to public article count',
    failures,
  );
  const repairQueue = contentHealth.draft?.repair_queue || {};
  failures.push(...repairQueueBatchFailures(repairQueue));
  assertOk(
    Array.isArray(repairQueue.selection_policy)
      && repairQueue.selection_policy.some(policy => String(policy).includes('repair_complexity')),
    'content-health repair queue selection policy is missing priority guidance',
    failures,
  );
  assertOk(contentHealth.trust_boundaries?.draft_entries_excluded_from_ai_entrypoints === true, 'content-health trust boundary does not exclude draft entries from AI entrypoints', failures);
  assertOk(Array.isArray(contentHealth.machine_guidance) && contentHealth.machine_guidance.some(guidance => String(guidance).includes('/api/context')), 'content-health machine guidance does not advertise /api/context', failures);
  assertOk(coverage.schema_version === 'anchorfact.coverage.v1', `coverage schema_version expected anchorfact.coverage.v1, got ${coverage.schema_version || '(missing)'}`, failures);
  assertOk(coverage.provenance_url === new URL('/provenance.json', baseUrl).href, `coverage provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${coverage.provenance_url || '(missing)'}`, failures);
  assertOk(coverage.coverage_summary?.public_articles === manifest.public_article_count, 'coverage public count does not match manifest', failures);
  assertOk(coverage.coverage_summary?.public_claims === claimCount, 'coverage claim count does not match claims.json', failures);
  assertOk(Array.isArray(coverage.topic_coverage) && coverage.topic_coverage.some(topic => topic.id === 'ai'), '/coverage.json is missing ai topic coverage', failures);
  assertOk(Array.isArray(coverage.coverage_limits) && coverage.coverage_limits.some(limit => limit.id === 'not_general_web_search'), '/coverage.json is missing coverage limits', failures);
  assertOk(examples.schema_version === 'anchorfact.examples.v1', `examples schema_version expected anchorfact.examples.v1, got ${examples.schema_version || '(missing)'}`, failures);
  assertOk(examples.provenance_url === new URL('/provenance.json', baseUrl).href, `examples provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${examples.provenance_url || '(missing)'}`, failures);
  assertOk(examples.example_count === (Array.isArray(examples.examples) ? examples.examples.length : 0), 'examples example_count does not match examples[] length', failures);
  assertOk(Array.isArray(examples.examples) && examples.examples.some(example => example.id === 'local_mcp_planning_and_citation'), '/examples.json is missing local_mcp_planning_and_citation example', failures);
  assertOk(Array.isArray(examples.examples) && examples.examples.some(example => example.id === 'one_call_evidence_pack'), '/examples.json is missing one_call_evidence_pack example', failures);
  assertOk(Array.isArray(examples.examples) && examples.examples.some(example => example.id === 'search_to_article_evidence'), '/examples.json is missing search_to_article_evidence example', failures);
  assertOk(Array.isArray(examples.examples) && examples.examples.some(example => example.id === 'mixed_reference_resolution'), '/examples.json is missing mixed_reference_resolution example', failures);
  assertOk(graph.schema_version === 'anchorfact.graph.v1', `graph schema_version expected anchorfact.graph.v1, got ${graph.schema_version || '(missing)'}`, failures);
  assertOk(graph.provenance_url === new URL('/provenance.json', baseUrl).href, `graph provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${graph.provenance_url || '(missing)'}`, failures);
  assertOk(graph.public_article_count === manifest.public_article_count, 'graph public_article_count does not match manifest', failures);
  assertOk(graph.public_claim_count === claimCount, 'graph public_claim_count does not match claims.json', failures);
  assertOk(graph.node_count === (Array.isArray(graph.nodes) ? graph.nodes.length : 0), 'graph node_count does not match nodes[] length', failures);
  assertOk(graph.edge_count === (Array.isArray(graph.edges) ? graph.edges.length : 0), 'graph edge_count does not match edges[] length', failures);
  assertOk(Array.isArray(graph.edges) && graph.edges.some(edge => edge.type === 'claim_supported_by_source'), '/graph.json is missing claim-to-source edges', failures);
  assertOk(evals.schema_version === 'anchorfact.evals.v1', `evals schema_version expected anchorfact.evals.v1, got ${evals.schema_version || '(missing)'}`, failures);
  assertOk(evals.provenance_url === new URL('/provenance.json', baseUrl).href, `evals provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${evals.provenance_url || '(missing)'}`, failures);
  assertOk(evals.eval_count === (Array.isArray(evals.evals) ? evals.evals.length : 0), 'evals eval_count does not match evals[] length', failures);
  assertOk(Array.isArray(evals.evals) && evals.evals.some(evalCase => evalCase.id === 'query_plan'), '/evals.json is missing query_plan check', failures);
  assertOk(Array.isArray(evals.evals) && evals.evals.some(evalCase => evalCase.id === 'evidence_pack_json'), '/evals.json is missing evidence_pack_json check', failures);
  assertOk(Array.isArray(evals.evals) && evals.evals.some(evalCase => evalCase.id === 'reference_resolver'), '/evals.json is missing reference_resolver check', failures);
  assertOk(Array.isArray(evals.evals) && evals.evals.some(evalCase => evalCase.id === 'batch_reference_resolver'), '/evals.json is missing batch_reference_resolver check', failures);
  assertOk(Array.isArray(evals.evals) && evals.evals.some(evalCase => evalCase.id === 'citation_export'), '/evals.json is missing citation_export check', failures);
  assertOk(Array.isArray(evals.evals) && evals.evals.some(evalCase => evalCase.id === 'graph_relationships'), '/evals.json is missing graph_relationships check', failures);
  assertOk(Array.isArray(evals.evals) && evals.evals.some(evalCase => evalCase.id === 'content_health_summary'), '/evals.json is missing content health summary check', failures);
  assertOk(Array.isArray(evals.evals) && evals.evals.some(evalCase => evalCase.id === 'mcp_tool_catalog'), '/evals.json is missing MCP tool catalog check', failures);
  assertOk(Array.isArray(evals.evals) && evals.evals.some(evalCase => evalCase.id === 'signed_provenance_static_artifacts'), '/evals.json is missing signed provenance check', failures);
  assertOk(mcp.schema_version === 'anchorfact.mcp.v1', `mcp schema_version expected anchorfact.mcp.v1, got ${mcp.schema_version || '(missing)'}`, failures);
  assertOk(mcp.provenance_url === new URL('/provenance.json', baseUrl).href, `mcp provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${mcp.provenance_url || '(missing)'}`, failures);
  assertOk(mcp.installation?.stdio?.config_snippet?.mcpServers?.anchorfact?.command === 'python', '/mcp.json is missing stdio MCP config snippet', failures);
  assertOk(Array.isArray(mcp.tools) && mcp.tools.some(tool => tool.name === 'anchorfact_plan_query'), '/mcp.json is missing anchorfact_plan_query tool metadata', failures);
  assertOk(Array.isArray(mcp.tools) && mcp.tools.some(tool => tool.name === 'anchorfact_search'), '/mcp.json is missing anchorfact_search tool metadata', failures);
  assertOk(Array.isArray(mcp.tools) && mcp.tools.some(tool => tool.name === 'anchorfact_content_health'), '/mcp.json is missing anchorfact_content_health tool metadata', failures);
  assertOk(Array.isArray(mcp.tools) && mcp.tools.some(tool => tool.name === 'anchorfact_resolve_reference'), '/mcp.json is missing anchorfact_resolve_reference tool metadata', failures);
  assertOk(Array.isArray(mcp.tools) && mcp.tools.some(tool => tool.name === 'anchorfact_resolve_references'), '/mcp.json is missing anchorfact_resolve_references tool metadata', failures);
  assertOk(Array.isArray(mcp.tools) && mcp.tools.some(tool => tool.name === 'anchorfact_cite_claim'), '/mcp.json is missing anchorfact_cite_claim tool metadata', failures);
  assertOk(planApi.schema_version === 'anchorfact.plan-api.v1', `plan api schema_version expected anchorfact.plan-api.v1, got ${planApi.schema_version || '(missing)'}`, failures);
  assertOk(planApi.provenance_url === new URL('/provenance.json', baseUrl).href, `plan api provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${planApi.provenance_url || '(missing)'}`, failures);
  assertOk(planApi.query === 'gaussian', `plan api query expected gaussian, got ${planApi.query || '(missing)'}`, failures);
  assertOk(planApi.should_use_anchorfact === true, '/api/plan did not recommend AnchorFact for gaussian', failures);
  assertOk(Array.isArray(planApi.matched_articles) && planApi.matched_articles.some(result => result.canonical_slug === 'ai/3d-generation-gaussian-splatting'), '/api/plan did not return expected gaussian article', failures);
  assertOk(Array.isArray(planApi.recommended_next_calls) && planApi.recommended_next_calls.some(item => String(item.path || '').includes('/api/evidence')), '/api/plan did not recommend evidence API', failures);
  assertOk(evidenceApi.schema_version === 'anchorfact.evidence-api.v1', `evidence api schema_version expected anchorfact.evidence-api.v1, got ${evidenceApi.schema_version || '(missing)'}`, failures);
  assertOk(evidenceApi.provenance_url === new URL('/provenance.json', baseUrl).href, `evidence api provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${evidenceApi.provenance_url || '(missing)'}`, failures);
  assertOk(evidenceApi.query === 'gaussian', `evidence api query expected gaussian, got ${evidenceApi.query || '(missing)'}`, failures);
  assertOk(Array.isArray(evidenceApi.packs) && evidenceApi.packs.length > 0, '/api/evidence returned no packs', failures);
  assertOk(hasCanonicalSlug(evidenceApi.packs, 'ai/3d-generation-gaussian-splatting'), '/api/evidence did not return expected gaussian pack', failures);
  const gaussianEvidencePack = Array.isArray(evidenceApi.packs)
    ? evidenceApi.packs.find(pack => pack.canonical_slug === 'ai/3d-generation-gaussian-splatting')
    : null;
  assertOk(gaussianEvidencePack?.article?.status === 'public' && gaussianEvidencePack?.article?.is_draft === false, '/api/evidence did not return a public article summary', failures);
  assertOk(Array.isArray(gaussianEvidencePack?.claims) && gaussianEvidencePack.claims.length >= 1, '/api/evidence returned no claims for expected pack', failures);
  assertOk(Array.isArray(gaussianEvidencePack?.citation_exports) && gaussianEvidencePack.citation_exports.length >= 1, '/api/evidence returned no citation exports for expected pack', failures);
  assertOk(Array.isArray(gaussianEvidencePack?.sources) && gaussianEvidencePack.sources.length >= 1, '/api/evidence returned no sources for expected pack', failures);
  assertOk(evidenceApi.machine_consumption?.large_artifact_policy === 'prefer_query_scoped_apis', '/api/evidence is missing machine consumption guidance', failures);
  assertOk(Array.isArray(evidenceApi.machine_consumption?.static_discovery) && evidenceApi.machine_consumption.static_discovery.some(call => call.path === '/artifact-shards.json'), '/api/evidence does not advertise artifact shards for bulk sync', failures);
  assertOk(evidenceMarkdown.includes('# AnchorFact Evidence Pack: gaussian'), '/api/evidence markdown response is missing heading', failures);
  assertOk(evidenceMarkdown.includes('Citation contract:'), '/api/evidence markdown response is missing citation contract', failures);
  assertOk(evidenceMarkdown.includes('/artifact-shards.json'), '/api/evidence markdown response is missing artifact shard guidance', failures);
  assertOk(evidenceMarkdown.includes('3D Gaussian Splatting'), '/api/evidence markdown response is missing expected evidence text', failures);
  assertOk(contextApi.schema_version === 'anchorfact.context-api.v1', `context api schema_version expected anchorfact.context-api.v1, got ${contextApi.schema_version || '(missing)'}`, failures);
  assertOk(contextApi.coverage_status !== 'unsupported', '/api/context unexpectedly marked gaussian query unsupported', failures);
  assertOk(contextApi.evidence_pack_count > 0, '/api/context returned no evidence packs', failures);
  assertOk(hasCanonicalSlug(contextApi.evidence_packs, 'ai/3d-generation-gaussian-splatting'), '/api/context did not return expected gaussian pack', failures);
  assertOk(contextApi.content_health?.snapshot?.public_articles === contentHealth.snapshot?.public_articles, '/api/context content health public count does not match /content-health.json', failures);
  assertOk(contextApi.content_health?.trust_boundaries?.draft_entries_excluded_from_ai_entrypoints === true, '/api/context content health trust boundary is missing', failures);
  assertOk(contextApi.machine_consumption?.large_artifact_policy === 'prefer_query_scoped_apis', '/api/context is missing machine consumption guidance', failures);
  assertOk(Array.isArray(contextApi.machine_consumption?.avoid_for_single_query) && contextApi.machine_consumption.avoid_for_single_query.includes('/graph.json'), '/api/context does not discourage single-query graph downloads', failures);
  assertOk(contextMarkdown.includes('# AnchorFact Context: gaussian'), '/api/context markdown response is missing heading', failures);
  assertOk(contextMarkdown.includes('Corpus Health'), '/api/context markdown response is missing corpus health summary', failures);
  assertOk(contextMarkdown.includes('/artifact-shards.json'), '/api/context markdown response is missing artifact shard guidance', failures);
  assertOk(contextMarkdown.includes('Citation contract:'), '/api/context markdown response is missing citation contract', failures);
  assertOk(contextMarkdown.includes('3D Gaussian Splatting'), '/api/context markdown response is missing expected evidence text', failures);
  assertOk(resolveApi.schema_version === 'anchorfact.resolve-api.v1', `resolve api schema_version expected anchorfact.resolve-api.v1, got ${resolveApi.schema_version || '(missing)'}`, failures);
  assertOk(resolveApi.resolved_type === 'claim', `resolve api resolved_type expected claim, got ${resolveApi.resolved_type || '(missing)'}`, failures);
  assertOk(resolveApi.canonical_ref === 'https://anchorfact.org/fact/f1', `resolve api canonical_ref expected https://anchorfact.org/fact/f1, got ${resolveApi.canonical_ref || '(missing)'}`, failures);
  assertOk(resolveApi.result_schema_version === 'anchorfact.claim-api.v1', '/api/resolve did not wrap the claim API payload', failures);
  assertOk(resolveApi.result?.claim_id === 'https://anchorfact.org/fact/f1', '/api/resolve returned the wrong claim payload', failures);
  assertOk(resolveBatchApi.schema_version === 'anchorfact.resolve-batch-api.v1', `resolve batch api schema_version expected anchorfact.resolve-batch-api.v1, got ${resolveBatchApi.schema_version || '(missing)'}`, failures);
  assertOk(resolveBatchApi.reference_count === 2, `resolve batch api reference_count expected 2, got ${resolveBatchApi.reference_count ?? '(missing)'}`, failures);
  assertOk(resolveBatchApi.ok_count === 2, `resolve batch api ok_count expected 2, got ${resolveBatchApi.ok_count ?? '(missing)'}`, failures);
  assertOk(Array.isArray(resolveBatchApi.results) && resolveBatchApi.results.some(item => item.resolved_type === 'claim'), '/api/resolve-batch did not include a claim result', failures);
  assertOk(Array.isArray(resolveBatchApi.results) && resolveBatchApi.results.some(item => item.resolved_type === 'source'), '/api/resolve-batch did not include a source result', failures);
  assertOk(resolveBatchMarkdown.includes('# AnchorFact Resolve Batch'), '/api/resolve-batch markdown response is missing heading', failures);
  assertOk(searchApi.schema_version === 'anchorfact.search-api.v1', `search api schema_version expected anchorfact.search-api.v1, got ${searchApi.schema_version || '(missing)'}`, failures);
  assertOk(searchApi.provenance_url === new URL('/provenance.json', baseUrl).href, `search api provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${searchApi.provenance_url || '(missing)'}`, failures);
  assertOk(searchApi.query === 'gaussian', `search api query expected gaussian, got ${searchApi.query || '(missing)'}`, failures);
  assertOk(Array.isArray(searchApi.results) && searchApi.results.length > 0, '/api/search returned no results', failures);
  assertOk(hasCanonicalSlug(searchApi.results, 'ai/3d-generation-gaussian-splatting'), '/api/search did not return expected gaussian result', failures);
  assertOk(articleApi.schema_version === 'anchorfact.article-api.v1', `article api schema_version expected anchorfact.article-api.v1, got ${articleApi.schema_version || '(missing)'}`, failures);
  assertOk(articleApi.canonical_slug === 'ai/3d-generation-gaussian-splatting', `article api slug expected ai/3d-generation-gaussian-splatting, got ${articleApi.canonical_slug || '(missing)'}`, failures);
  assertOk(articleApi.article?.status === 'public' && articleApi.article?.is_draft === false, '/api/article did not return a public article', failures);
  assertOk(Array.isArray(articleApi.claims) && articleApi.claims.length >= 1, '/api/article returned no claims', failures);
  assertOk(Array.isArray(articleApi.citation_exports) && articleApi.citation_exports.length >= 1, '/api/article returned no citation exports', failures);
  assertOk(Array.isArray(articleApi.sources) && articleApi.sources.length >= 1, '/api/article returned no sources', failures);
  assertOk(claimApi.schema_version === 'anchorfact.claim-api.v1', `claim api schema_version expected anchorfact.claim-api.v1, got ${claimApi.schema_version || '(missing)'}`, failures);
  assertOk(claimApi.claim_id === 'https://anchorfact.org/fact/f1', `claim api id expected https://anchorfact.org/fact/f1, got ${claimApi.claim_id || '(missing)'}`, failures);
  assertOk(claimApi.claim?.canonical_slug === 'ai/3d-generation-gaussian-splatting', '/api/claim returned the wrong claim slug', failures);
  assertOk(typeof claimApi.citation_export?.inline === 'string' && claimApi.citation_export.inline.includes('AnchorFact:'), '/api/claim returned no citation export', failures);
  assertOk(claimApi.article?.status === 'public' && claimApi.article?.is_draft === false, '/api/claim did not return a public article', failures);
  assertOk(Array.isArray(claimApi.sources) && claimApi.sources.length >= 1, '/api/claim returned no matching sources', failures);
  assertOk(citeApi.schema_version === 'anchorfact.cite-api.v1', `cite api schema_version expected anchorfact.cite-api.v1, got ${citeApi.schema_version || '(missing)'}`, failures);
  assertOk(citeApi.claim_id === 'https://anchorfact.org/fact/f1', `cite api id expected https://anchorfact.org/fact/f1, got ${citeApi.claim_id || '(missing)'}`, failures);
  assertOk(citeApi.claim?.canonical_slug === 'ai/3d-generation-gaussian-splatting', '/api/cite returned the wrong claim slug', failures);
  assertOk(typeof citeApi.citation_export?.markdown === 'string' && citeApi.citation_export.markdown.includes('AnchorFact:'), '/api/cite returned no citation markdown', failures);
  assertOk(citeApi.source?.url === 'https://arxiv.org/abs/2308.04079', '/api/cite did not return the expected source', failures);
  assertOk(citeMarkdown.includes('# AnchorFact Citation'), '/api/cite markdown response is missing heading', failures);
  assertOk(citeMarkdown.includes('https://anchorfact.org/fact/f1'), '/api/cite markdown response is missing claim id', failures);
  assertOk(citeMarkdown.includes('https://arxiv.org/abs/2308.04079'), '/api/cite markdown response is missing source URL', failures);
  assertOk(sourceApi.schema_version === 'anchorfact.source-api.v1', `source api schema_version expected anchorfact.source-api.v1, got ${sourceApi.schema_version || '(missing)'}`, failures);
  assertOk(sourceApi.source_url === 'https://arxiv.org/abs/2308.04079', `source api URL expected https://arxiv.org/abs/2308.04079, got ${sourceApi.source_url || '(missing)'}`, failures);
  assertOk(sourceApi.source?.title === '3D Gaussian Splatting for Real-Time Radiance Field Rendering', '/api/source returned the wrong source', failures);
  assertOk(Array.isArray(sourceApi.claims) && sourceApi.claims.some(claim => claim.id === 'https://anchorfact.org/fact/f1'), '/api/source did not return expected mapped claim', failures);
  assertOk(searchIndex.schema_version === 'anchorfact.search-index.v1', `search-index schema_version expected anchorfact.search-index.v1, got ${searchIndex.schema_version || '(missing)'}`, failures);
  assertOk(searchIndex.provenance_url === new URL('/provenance.json', baseUrl).href, `search-index provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${searchIndex.provenance_url || '(missing)'}`, failures);
  assertOk(searchIndex.article_count === manifest.public_article_count, 'search index article count does not match manifest', failures);
  assertOk(searchIndex.public_claim_count === claimCount, 'search index claim count does not match claims.json', failures);
  assertOk(Array.isArray(searchIndex.records) && searchIndex.records.length > 0, '/search-index.json has no records', failures);
  assertOk(sources.schema_version === 'anchorfact.sources.v1', `sources schema_version expected anchorfact.sources.v1, got ${sources.schema_version || '(missing)'}`, failures);
  assertOk(sources.provenance_url === new URL('/provenance.json', baseUrl).href, `sources provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${sources.provenance_url || '(missing)'}`, failures);
  assertOk(sources.public_article_count === manifest.public_article_count, 'sources public count does not match manifest', failures);
  assertOk(sources.public_claim_count === claimCount, 'sources claim count does not match claims.json', failures);
  assertOk(Array.isArray(sources.sources) && sources.sources.length > 0, '/sources.json has no sources', failures);
  assertOk(provenance.schema_version === 'anchorfact.provenance.v1', `provenance schema_version expected anchorfact.provenance.v1, got ${provenance.schema_version || '(missing)'}`, failures);
  assertOk(provenance.content_counts?.public === manifest.public_article_count, 'provenance public count does not match manifest', failures);
  assertOk(provenance.content_counts?.draft === manifest.draft_article_count, 'provenance draft count does not match manifest', failures);
  assertOk(provenance.content_counts?.claims === claimCount, 'provenance claim count does not match claims.json', failures);
  assertOk(provenance.artifacts?.agent_json?.sha256 === sha256Text(results['/agent.json'].body), 'provenance agent hash does not match /agent.json', failures);
  assertOk(provenance.artifacts?.openapi_json?.sha256 === sha256Text(results['/openapi.json'].body), 'provenance OpenAPI hash does not match /openapi.json', failures);
  assertOk(provenance.artifacts?.manifest_json?.sha256 === sha256Text(results['/manifest.json'].body), 'provenance manifest hash does not match /manifest.json', failures);
  assertOk(provenance.artifacts?.claims_json?.sha256 === sha256Text(results['/claims.json'].body), 'provenance claims hash does not match /claims.json', failures);
  assertOk(provenance.artifacts?.topics_json?.sha256 === sha256Text(results['/topics.json'].body), 'provenance topics hash does not match /topics.json', failures);
  assertOk(provenance.artifacts?.capabilities_json?.sha256 === sha256Text(results['/capabilities.json'].body), 'provenance capabilities hash does not match /capabilities.json', failures);
  assertOk(provenance.artifacts?.content_health_json?.sha256 === sha256Text(results['/content-health.json'].body), 'provenance content health hash does not match /content-health.json', failures);
  assertOk(provenance.artifacts?.coverage_json?.sha256 === sha256Text(results['/coverage.json'].body), 'provenance coverage hash does not match /coverage.json', failures);
  assertOk(provenance.artifacts?.examples_json?.sha256 === sha256Text(results['/examples.json'].body), 'provenance examples hash does not match /examples.json', failures);
  assertOk(provenance.artifacts?.root_index_json?.sha256 === sha256Text(results['/index.json'].body), 'provenance root index hash does not match /index.json', failures);
  assertOk(provenance.artifacts?.graph_json?.sha256 === sha256Text(results['/graph.json'].body), 'provenance graph hash does not match /graph.json', failures);
  assertOk(provenance.artifacts?.evals_json?.sha256 === sha256Text(results['/evals.json'].body), 'provenance evals hash does not match /evals.json', failures);
  assertOk(provenance.artifacts?.mcp_json?.sha256 === sha256Text(results['/mcp.json'].body), 'provenance mcp hash does not match /mcp.json', failures);
  assertOk(provenance.artifacts?.artifact_summary_json?.sha256 === sha256Text(results['/artifact-summary.json'].body), 'provenance artifact summary hash does not match /artifact-summary.json', failures);
  assertOk(provenance.artifacts?.artifact_shards_json?.sha256 === sha256Text(results['/artifact-shards.json'].body), 'provenance artifact shards hash does not match /artifact-shards.json', failures);
  assertOk(provenance.artifacts?.api_readiness_json?.sha256 === sha256Text(results['/api-readiness.json'].body), 'provenance API readiness hash does not match /api-readiness.json', failures);
  assertOk(provenance.artifacts?.search_index_json?.sha256 === sha256Text(results['/search-index.json'].body), 'provenance search index hash does not match /search-index.json', failures);
  assertOk(provenance.artifacts?.sources_json?.sha256 === sha256Text(results['/sources.json'].body), 'provenance sources hash does not match /sources.json', failures);
  assertOk(provenance.artifacts?.llms_txt?.sha256 === sha256Text(results['/llms.txt'].body), 'provenance llms hash does not match /llms.txt', failures);
  assertOk(['signed', 'unsigned'].includes(provenance.signature?.status), `provenance signature status expected signed or unsigned, got ${provenance.signature?.status || '(missing)'}`, failures);
  assertOk(llmsText.trim().length > 0, '/llms.txt is empty', failures);
  assertOk(draftsIndex.schema_version === 'anchorfact.drafts-index.v1', `drafts schema_version expected anchorfact.drafts-index.v1, got ${draftsIndex.schema_version || '(missing)'}`, failures);
  assertOk(draftsIndex.indexing?.noindex === true, '/drafts.html is missing noindex policy', failures);
  assertOk(Array.isArray(draftsIndex.drafts), '/drafts.html drafts list should be an array', failures);
  assertOk(dashboard.schema_version === 'anchorfact.dashboard.v1', `dashboard schema_version expected anchorfact.dashboard.v1, got ${dashboard.schema_version || '(missing)'}`, failures);
  assertOk(dashboard.indexing?.noindex === true, '/dashboard.html is missing noindex policy', failures);
  assertOk(typeof dashboard.counts?.public_articles === 'number', '/dashboard.html should expose public article count', failures);
  for (const header of REQUIRED_SECURITY_HEADERS) {
    headerIncludes(results[header.route], header.name, header.expected, failures);
  }
  headerIncludes(results['/'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/'], 'Content-Type', 'application/json', failures);
  headerIncludes(results['/index.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/agent.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/.well-known/anchorfact.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/openapi.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/api-access/'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/api-access/'], 'Content-Type', 'application/json', failures);
  for (const route of ['/drafts.html', '/dashboard.html']) {
    headerIncludes(results[route], 'Access-Control-Allow-Origin', '*', failures);
    headerIncludes(results[route], 'Content-Type', 'application/json', failures);
    headerIncludes(results[route], 'X-Robots-Tag', 'noindex', failures);
  }
  headerIncludes(results['/manifest.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/artifact-summary.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/artifact-shards.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/api-readiness.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/claims.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/topics.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/capabilities.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/content-health.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/coverage.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/examples.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/graph.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/evals.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/mcp.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/api'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/api/evidence?q=gaussian&limit=2'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/api/evidence?q=gaussian&limit=1&format=markdown'], 'Content-Type', 'text/markdown', failures);
  headerIncludes(results['/api/evidence?q=gaussian&limit=1&format=markdown'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/api/context?q=gaussian&limit=2'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/api/context?q=gaussian&limit=1&format=markdown'], 'Content-Type', 'text/markdown', failures);
  headerIncludes(results['/api/context?q=gaussian&limit=1&format=markdown'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/api/resolve?ref=f1'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/api/resolve-batch?ref=f1&ref=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/api/resolve-batch?ref=f1&ref=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079&format=markdown'], 'Content-Type', 'text/markdown', failures);
  headerIncludes(results['/api/resolve-batch?ref=f1&ref=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079&format=markdown'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/api/plan?q=gaussian&limit=2'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/api/search?q=gaussian&limit=2'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/api/article?slug=ai/3d-generation-gaussian-splatting'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/api/claim?id=f1'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/api/cite?id=f1'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/api/cite?id=f1&format=markdown'], 'Content-Type', 'text/markdown', failures);
  headerIncludes(results['/api/cite?id=f1&format=markdown'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/api/source?url=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/search-index.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/sources.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/provenance.json'], 'Access-Control-Allow-Origin', '*', failures);
  for (const route of [
    '/',
    '/api-access/',
    '/index.json',
    '/agent.json',
    '/.well-known/anchorfact.json',
    '/openapi.json',
    '/artifact-summary.json',
    '/artifact-shards.json',
    '/api-readiness.json',
    '/manifest.json',
    '/llms.txt',
    '/claims.json',
    '/topics.json',
    '/capabilities.json',
    '/content-health.json',
    '/coverage.json',
    '/examples.json',
    '/graph.json',
    '/evals.json',
    '/mcp.json',
    '/search-index.json',
    '/sources.json',
    '/provenance.json',
    '/provenance.sig'
  ]) {
    headerIncludes(results[route], 'Cache-Control', 'max-age=0, must-revalidate', failures);
  }
  const firstPublicArticle = Array.isArray(manifest.articles)
    ? manifest.articles.find(article => article.status === 'public' && article.is_draft === false && article.canonical_slug)
    : null;
  if (firstPublicArticle) {
    const articleRoute = `/${firstPublicArticle.canonical_slug}/index.json`;
    results[articleRoute] = await fetchRoute(baseUrl, articleRoute);
    assertOk(results[articleRoute].status === 200, `${articleRoute} returned ${results[articleRoute].status}`, failures);
    headerIncludes(results[articleRoute], 'Access-Control-Allow-Origin', '*', failures);
    headerIncludes(results[articleRoute], 'Content-Type', 'application/ld+json', failures);
    const articleHtmlAliasRoute = `/${firstPublicArticle.canonical_slug}/index.html`;
    results[articleHtmlAliasRoute] = await fetchRoute(baseUrl, articleHtmlAliasRoute);
    const articleJson = await readJsonRoute(baseUrl, articleRoute, results);
    const articleHtmlAlias = await readJsonRoute(baseUrl, articleHtmlAliasRoute, results);
    assertOk(results[articleHtmlAliasRoute].status === 200, `${articleHtmlAliasRoute} returned ${results[articleHtmlAliasRoute].status}`, failures);
    assertOk(articleHtmlAlias['@id'] === articleJson['@id'], `${articleHtmlAliasRoute} should alias article JSON-LD`, failures);
    headerIncludes(results[articleHtmlAliasRoute], 'Access-Control-Allow-Origin', '*', failures);
    headerIncludes(results[articleHtmlAliasRoute], 'Content-Type', 'application/ld+json', failures);
    headerIncludes(results[articleHtmlAliasRoute], 'X-Robots-Tag', 'noindex', failures);
  }

  assertExpected(manifest.public_article_count, expectedPublic, 'public_article_count', failures);
  assertExpected(manifest.draft_article_count, expectedDraft, 'draft_article_count', failures);
  assertExpected(manifest.claim_count, expectedClaims, 'claim_count', failures);

  console.log(`Production smoke test for ${baseUrl.href}`);
  for (const route of routes) {
    const result = results[route];
    console.log(`${route} ${result.status} ${result.contentType} ${result.finalUrl}`);
  }
  console.log(`public_article_count=${manifest.public_article_count}`);
  console.log(`draft_article_count=${manifest.draft_article_count}`);
  console.log(`claim_count=${manifest.claim_count}`);
  console.log(`provenance_builder=${provenance.build?.builder || 'unknown'}`);
  console.log(`provenance_commit_sha=${provenance.build?.commit_sha || 'unknown'}`);
  console.log(`provenance_signature=${provenance.signature?.status || 'unknown'}`);

  if (failures.length > 0) {
    console.error('Smoke test failed:');
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
