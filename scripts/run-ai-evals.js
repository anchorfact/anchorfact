#!/usr/bin/env node
import { pathToFileURL } from 'url';
import { OFFICIAL_SITE } from '../src/lib/build-metadata.js';
import { fetchLiveText } from '../src/lib/live-http.js';

const DEFAULT_ROUTE_RETRIES = 2;
const DEFAULT_ROUTE_RETRY_DELAY_MS = 250;

function sleep(ms) {
  return ms > 0 ? new Promise(resolve => setTimeout(resolve, ms)) : Promise.resolve();
}

function isSafeRoute(path) {
  const pathname = typeof path === 'string' ? path.split(/[?#]/)[0] : '';
  return typeof path === 'string'
    && path.startsWith('/')
    && !path.startsWith('//')
    && !path.includes('\\')
    && !pathname.split('/').includes('..');
}

function jsonIncludes(payload, value) {
  return value === null || value === undefined || JSON.stringify(payload).includes(String(value));
}

function check(condition, failures, message) {
  if (!condition) failures.push(message);
}

function numberAt(payload, field, fallbackArrayField = null) {
  if (Number.isFinite(payload?.[field])) return payload[field];
  if (fallbackArrayField && Array.isArray(payload?.[fallbackArrayField])) return payload[fallbackArrayField].length;
  return null;
}

function matchingPack(payload, slug) {
  return (payload?.packs || []).find(pack => pack?.canonical_slug === slug) || null;
}

function firstCanonicalSlug(payload) {
  const candidates = [
    payload?.packs,
    payload?.results,
    payload?.evidence_packs,
    payload?.matched_articles
  ];
  for (const list of candidates) {
    if (Array.isArray(list) && list[0]?.canonical_slug) return list[0].canonical_slug;
  }
  return null;
}

function evaluateJsonExpected(payload, expected, failures) {
  if (expected.schema_version) {
    check(payload?.schema_version === expected.schema_version, failures, `schema_version expected ${expected.schema_version}, got ${payload?.schema_version || '(missing)'}`);
  }
  if (expected.openapi_schema_version) {
    check(
      payload?.['x-anchorfact-schema-version'] === expected.openapi_schema_version,
      failures,
      `x-anchorfact-schema-version expected ${expected.openapi_schema_version}, got ${payload?.['x-anchorfact-schema-version'] || '(missing)'}`
    );
  }
  if (expected.coverage_status) {
    check(payload?.coverage_status === expected.coverage_status, failures, `coverage_status expected ${expected.coverage_status}, got ${payload?.coverage_status || '(missing)'}`);
  }
  if (expected.should_use_anchorfact !== undefined) {
    check(payload?.should_use_anchorfact === expected.should_use_anchorfact, failures, `should_use_anchorfact expected ${expected.should_use_anchorfact}`);
  }
  if (expected.answer_policy_can_answer !== undefined) {
    check(
      payload?.answer_policy?.can_answer_with_anchorfact === expected.answer_policy_can_answer,
      failures,
      `answer_policy.can_answer_with_anchorfact expected ${expected.answer_policy_can_answer}`
    );
  }
  if (expected.min_citation_ready_claims !== undefined) {
    const count = Array.isArray(payload?.citation_ready_claims) ? payload.citation_ready_claims.length : 0;
    check(count >= expected.min_citation_ready_claims, failures, `citation_ready_claims expected at least ${expected.min_citation_ready_claims}, got ${count}`);
  }
  if (expected.max_citation_ready_claims !== undefined) {
    const count = Array.isArray(payload?.citation_ready_claims) ? payload.citation_ready_claims.length : 0;
    check(count <= expected.max_citation_ready_claims, failures, `citation_ready_claims expected at most ${expected.max_citation_ready_claims}, got ${count}`);
  }
  if (expected.recommended_call_contains) {
    const calls = payload?.recommended_next_calls || [];
    check(calls.some(call => String(call?.path || call?.url || '').includes(expected.recommended_call_contains)), failures, `recommended_next_calls should include ${expected.recommended_call_contains}`);
  }
  if (expected.fallback_guidance_contains) {
    const guidance = (payload?.fallback_guidance || []).join(' ');
    check(guidance.includes(expected.fallback_guidance_contains), failures, `fallback_guidance should include ${expected.fallback_guidance_contains}`);
  }
  if (expected.result_count !== undefined) {
    check(payload?.result_count === expected.result_count, failures, `result_count expected ${expected.result_count}, got ${payload?.result_count}`);
  }
  if (expected.contains_canonical_slug) {
    check(jsonIncludes(payload, expected.contains_canonical_slug), failures, `payload should include canonical slug ${expected.contains_canonical_slug}`);
  }
  if (expected.top_canonical_slug) {
    const actual = firstCanonicalSlug(payload);
    check(actual === expected.top_canonical_slug, failures, `top canonical slug expected ${expected.top_canonical_slug}, got ${actual || '(missing)'}`);
  }
  if (expected.claim_id) {
    check(jsonIncludes(payload, expected.claim_id), failures, `payload should include claim ${expected.claim_id}`);
  }
  if (expected.canonical_slug) {
    check(jsonIncludes(payload, expected.canonical_slug), failures, `payload should include article ${expected.canonical_slug}`);
  }
  if (expected.resolved_type) {
    check(payload?.resolved_type === expected.resolved_type, failures, `resolved_type expected ${expected.resolved_type}, got ${payload?.resolved_type || '(missing)'}`);
  }
  if (expected.canonical_ref) {
    check(payload?.canonical_ref === expected.canonical_ref, failures, `canonical_ref expected ${expected.canonical_ref}, got ${payload?.canonical_ref || '(missing)'}`);
  }
  if (expected.result_schema_version) {
    check(payload?.result_schema_version === expected.result_schema_version, failures, `result_schema_version expected ${expected.result_schema_version}, got ${payload?.result_schema_version || '(missing)'}`);
  }
  if (expected.reference_count !== undefined) {
    check(payload?.reference_count === expected.reference_count, failures, `reference_count expected ${expected.reference_count}, got ${payload?.reference_count}`);
  }
  if (expected.ok_count_min !== undefined) {
    check((payload?.ok_count ?? 0) >= expected.ok_count_min, failures, `ok_count expected at least ${expected.ok_count_min}, got ${payload?.ok_count}`);
  }
  if (expected.error_count !== undefined) {
    check(payload?.error_count === expected.error_count, failures, `error_count expected ${expected.error_count}, got ${payload?.error_count}`);
  }
  if (expected.source_id) {
    check(jsonIncludes(payload, expected.source_id), failures, `payload should include source ${expected.source_id}`);
  }
  if (expected.contains_claim_id) {
    check(jsonIncludes(payload, expected.contains_claim_id), failures, `payload should include claim ${expected.contains_claim_id}`);
  }
  if (expected.min_packs !== undefined) {
    const count = numberAt(payload, 'result_count', 'packs') ?? 0;
    check(count >= expected.min_packs, failures, `pack count expected at least ${expected.min_packs}, got ${count}`);
  }
  if (expected.min_claims_per_matching_pack !== undefined && expected.contains_canonical_slug) {
    const pack = matchingPack(payload, expected.contains_canonical_slug);
    const count = pack?.claim_count ?? pack?.claims?.length ?? 0;
    check(count >= expected.min_claims_per_matching_pack, failures, `matching pack claim count expected at least ${expected.min_claims_per_matching_pack}, got ${count}`);
  }
  if (expected.min_sources_per_matching_pack !== undefined && expected.contains_canonical_slug) {
    const pack = matchingPack(payload, expected.contains_canonical_slug);
    const count = pack?.source_count ?? pack?.sources?.length ?? 0;
    check(count >= expected.min_sources_per_matching_pack, failures, `matching pack source count expected at least ${expected.min_sources_per_matching_pack}, got ${count}`);
  }
  if (expected.min_sources !== undefined) {
    const count = numberAt(payload, 'source_count', 'sources') ?? 0;
    check(count >= expected.min_sources, failures, `source count expected at least ${expected.min_sources}, got ${count}`);
  }
  if (expected.min_claims !== undefined) {
    const count = numberAt(payload, 'claim_count', 'claims') ?? 0;
    check(count >= expected.min_claims, failures, `claim count expected at least ${expected.min_claims}, got ${count}`);
  }
  if (expected.min_public_articles !== undefined) {
    const count = payload?.snapshot?.public_articles ?? payload?.public_article_count ?? 0;
    check(count >= expected.min_public_articles, failures, `public article count expected at least ${expected.min_public_articles}, got ${count}`);
  }
  if (expected.min_public_claims !== undefined) {
    const count = payload?.snapshot?.public_claims ?? payload?.public_claim_count ?? 0;
    check(count >= expected.min_public_claims, failures, `public claim count expected at least ${expected.min_public_claims}, got ${count}`);
  }
  if (expected.min_repair_queue_candidates !== undefined) {
    const count = payload?.draft?.repair_queue?.candidate_count ?? 0;
    check(count >= expected.min_repair_queue_candidates, failures, `draft repair queue candidate count expected at least ${expected.min_repair_queue_candidates}, got ${count}`);
  }
  if (expected.min_repair_queue_next_batch !== undefined) {
    const count = Array.isArray(payload?.draft?.repair_queue?.next_batch)
      ? payload.draft.repair_queue.next_batch.length
      : 0;
    check(count >= expected.min_repair_queue_next_batch, failures, `draft repair queue next batch expected at least ${expected.min_repair_queue_next_batch}, got ${count}`);
  }
  if (expected.repair_queue_policy_contains) {
    const policy = Array.isArray(payload?.draft?.repair_queue?.selection_policy)
      ? payload.draft.repair_queue.selection_policy.join(' ')
      : '';
    check(policy.includes(expected.repair_queue_policy_contains), failures, `draft repair queue selection_policy should include ${expected.repair_queue_policy_contains}`);
  }
  if (expected.max_public_source_tier_c !== undefined) {
    const count = payload?.public?.sources?.tier_distribution?.C ?? 0;
    check(count <= expected.max_public_source_tier_c, failures, `public C-tier source count expected at most ${expected.max_public_source_tier_c}, got ${count}`);
  }
  if (expected.min_content_health_public_articles !== undefined) {
    const count = payload?.content_health?.snapshot?.public_articles ?? 0;
    check(count >= expected.min_content_health_public_articles, failures, `context content health public article count expected at least ${expected.min_content_health_public_articles}, got ${count}`);
  }
  if (expected.machine_guidance_contains) {
    const guidance = (payload?.machine_guidance || []).join(' ');
    check(guidance.includes(expected.machine_guidance_contains), failures, `machine_guidance should include ${expected.machine_guidance_contains}`);
  }
  if (expected.trust_boundary) {
    check(payload?.trust_boundaries?.[expected.trust_boundary] === true, failures, `trust_boundaries.${expected.trust_boundary} should be true`);
  }
  if (expected.content_health_trust_boundary) {
    check(payload?.content_health?.trust_boundaries?.[expected.content_health_trust_boundary] === true, failures, `content_health.trust_boundaries.${expected.content_health_trust_boundary} should be true`);
  }
  if (expected.min_nodes !== undefined) {
    const count = numberAt(payload, 'node_count', 'nodes') ?? 0;
    check(count >= expected.min_nodes, failures, `node count expected at least ${expected.min_nodes}, got ${count}`);
  }
  if (expected.min_edges !== undefined) {
    const count = numberAt(payload, 'edge_count', 'edges') ?? 0;
    check(count >= expected.min_edges, failures, `edge count expected at least ${expected.min_edges}, got ${count}`);
  }
  if (Array.isArray(expected.required_edge_types)) {
    const edgeTypes = new Set((payload?.edges || []).map(edge => edge?.type));
    for (const edgeType of expected.required_edge_types) {
      check(edgeTypes.has(edgeType), failures, `graph should include edge type ${edgeType}`);
    }
  }
  if (Array.isArray(expected.required_artifacts)) {
    for (const artifact of expected.required_artifacts) {
      check(payload?.artifacts?.[artifact], failures, `provenance should include artifact ${artifact}`);
    }
  }
  if (Array.isArray(expected.required_tools)) {
    const tools = new Set((payload?.tools || []).map(tool => tool?.name));
    for (const tool of expected.required_tools) {
      check(tools.has(tool), failures, `MCP profile should include tool ${tool}`);
    }
  }
  if (Array.isArray(expected.required_paths)) {
    const paths = new Set((payload?.endpoints || []).map(endpoint => endpoint?.path));
    for (const path of expected.required_paths) {
      check(paths.has(path), failures, `payload should include endpoint path ${path}`);
    }
  }
  if (expected.required_schema_properties && typeof expected.required_schema_properties === 'object') {
    for (const [schemaName, properties] of Object.entries(expected.required_schema_properties)) {
      const schemaProperties = payload?.components?.schemas?.[schemaName]?.properties || {};
      for (const property of properties || []) {
        check(
          Object.prototype.hasOwnProperty.call(schemaProperties, property),
          failures,
          `OpenAPI schema ${schemaName} should include property ${property}`
        );
      }
    }
  }
  if (Array.isArray(expected.citation_export_contains)) {
    for (const text of expected.citation_export_contains) {
      check(jsonIncludes(payload, text), failures, `citation export should include ${text}`);
    }
  }
}

function evaluateTextExpected(body, expected, failures) {
  for (const text of expected.contains_text || []) {
    check(body.includes(text), failures, `body should include ${text}`);
  }
}

export async function fetchEvalRoute(baseUrl, route, fetchImpl = globalThis.fetch, options = {}) {
  const retries = Number.isFinite(options.retries) ? options.retries : DEFAULT_ROUTE_RETRIES;
  const retryDelayMs = Number.isFinite(options.retryDelayMs) ? options.retryDelayMs : DEFAULT_ROUTE_RETRY_DELAY_MS;
  const maxAttempts = Math.max(1, retries + 1);
  let result = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const response = await fetchLiveText(fetchImpl, new URL(route, baseUrl));
    result = {
      route,
      status: response.status,
      contentType: response.contentType || '',
      body: response.text,
      error: response.error || null
    };

    const shouldRetry = result.status === 0 || !String(result.body || '').trim();
    if (!shouldRetry || attempt === maxAttempts) {
      return result;
    }

    await sleep(retryDelayMs * attempt);
  }

  return result;
}

export async function runAiEvals({
  baseUrl = OFFICIAL_SITE,
  fetchImpl = globalThis.fetch,
  generatedAt = new Date().toISOString(),
  routeRetries = DEFAULT_ROUTE_RETRIES,
  routeRetryDelayMs = DEFAULT_ROUTE_RETRY_DELAY_MS
} = {}) {
  const normalizedBaseUrl = new URL(baseUrl);
  const routeFetchOptions = { retries: routeRetries, retryDelayMs: routeRetryDelayMs };
  const evalsResponse = await fetchEvalRoute(normalizedBaseUrl, '/evals.json', fetchImpl, routeFetchOptions);
  const failures = [];
  check(evalsResponse.status === 200, failures, `/evals.json returned ${evalsResponse.status}`);

  let evalsPayload = { evals: [] };
  try {
    evalsPayload = JSON.parse(evalsResponse.body);
  } catch (error) {
    failures.push(`/evals.json is not valid JSON: ${error.message}`);
  }

  const results = [];
  for (const evalCase of evalsPayload.evals || []) {
    const expected = evalCase.expected || {};
    const routeFailures = [];
    const path = evalCase.call?.path;
    const method = evalCase.call?.method || 'GET';
    if (method !== 'GET' || !isSafeRoute(path)) {
      routeFailures.push(`unsafe or unsupported eval route: ${path || '(missing)'}`);
      results.push({ id: evalCase.id, route: path || null, ok: false, failures: routeFailures });
      continue;
    }

    const response = await fetchEvalRoute(normalizedBaseUrl, path, fetchImpl, routeFetchOptions);
    check(response.status === expected.status, routeFailures, `${path} status expected ${expected.status}, got ${response.status}`);
    if (expected.content_type) {
      check(response.contentType.toLowerCase().includes(expected.content_type.toLowerCase()), routeFailures, `${path} content-type expected ${expected.content_type}, got ${response.contentType || '(missing)'}`);
    }

    if (expected.content_type?.includes('json')) {
      try {
        evaluateJsonExpected(JSON.parse(response.body), expected, routeFailures);
      } catch (error) {
        routeFailures.push(`${path} JSON parse failed: ${error.message}`);
      }
    } else {
      evaluateTextExpected(response.body, expected, routeFailures);
    }

    results.push({ id: evalCase.id, route: path, ok: routeFailures.length === 0, failures: routeFailures });
  }

  const failed = results.filter(result => !result.ok);
  return {
    generated: generatedAt,
    base_url: normalizedBaseUrl.href.replace(/\/+$/, ''),
    ok: failures.length === 0 && failed.length === 0,
    eval_count: results.length,
    passed: results.length - failed.length,
    failed: failed.length,
    failures,
    results
  };
}

export function renderAiEvalsMarkdown(report) {
  const resultLines = (report.results || [])
    .map(result => `- ${result.id}: ${result.ok ? 'pass' : `fail (${result.failures.join('; ')})`}`)
    .join('\n') || '- none';
  const failures = report.failures.length
    ? report.failures.map(failure => `- ${failure}`).join('\n')
    : '- none';

  return `# AnchorFact AI Evals - ${report.ok ? 'PASS' : 'FAIL'}

Generated: ${report.generated}

Base URL: ${report.base_url}

## Summary

- status: ${report.ok ? 'pass' : 'fail'}
- evals: ${report.eval_count}
- passed: ${report.passed}
- failed: ${report.failed}

## Results

${resultLines}

## Failures

${failures}
`;
}

function parseArgs(argv) {
  const options = {
    baseUrl: process.env.ANCHORFACT_BASE_URL || OFFICIAL_SITE,
    json: false
  };
  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === '--json') options.json = true;
    else if (arg === '--base-url') options.baseUrl = argv[++index];
    else throw new Error(`Unknown option: ${arg}`);
  }
  return options;
}

export async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const report = await runAiEvals(options);
  console.log(options.json ? JSON.stringify(report, null, 2) : renderAiEvalsMarkdown(report));
  if (!report.ok) process.exitCode = 1;
  return report;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
