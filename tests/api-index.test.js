#!/usr/bin/env node
import { buildApiIndex } from '../src/lib/api-index.js';
import { onRequestGet, onRequestOptions } from '../functions/api/index.js';

let passed = 0, failed = 0;
const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertEq(actual, expected, ctx = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${ctx} expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

console.log('AnchorFact API Index Tests\n');

const apiReadinessPayload = {
  runtime_signal_contract: {
    static_artifact: true,
    status_when_missing: 'not_provided',
    workflow: '.github/workflows/readiness-scorecard.yml',
    scorecard_command: 'npm run api:readiness -- --adoption-json reports/ai-adoption-scorecard.json',
    runtime_inputs: [
      { id: 'production_integrity' },
      { id: 'ai_adoption', preferred_measurement_scope: 'interactive_ai' },
      { id: 'design_partners' }
    ]
  },
  readiness_blockers: {
    gate_ids: [
      'production_integrity_14_day',
      'public_audit_14_day',
      'ai_primary_discovery_ratio_7_day',
      'design_partners'
    ],
    evidence_requirements: [
      {
        id: 'production_integrity_14_day',
        command: 'npm run production:integrity -- --write-json reports/production-integrity.json',
        required_fields: ['ok', 'checks', 'commit_sha', 'source_commit_sha']
      },
      {
        id: 'design_partners',
        command: 'npm run api:readiness -- --design-partners-json reports/design-partners.json',
        required_fields: ['external_design_partner_count', 'paid_intent_signal_count']
      }
    ]
  }
};

test('buildApiIndex publishes the machine API discovery contract', () => {
  const payload = buildApiIndex({
    generated: '2026-05-29T00:00:00.000Z',
    apiReadinessPayload
  });

  assertEq(payload.schema_version, 'anchorfact.api-index.v1');
  assertEq(payload.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(payload.read_only, true);
  assertEq(payload.quick_start.default_answer_path, '/api/context?q={query}');
  assertEq(payload.quick_start.next_request_after_discovery.path, '/api/context?q={query}&limit=3&format=markdown');
  assertEq(payload.quick_start.next_request_after_discovery.url, 'https://anchorfact.org/api/context?q={query}&limit=3&format=markdown');
  assert(payload.quick_start.minimum_valid_primary_calls.every(call => call.method === 'GET' && call.url.startsWith('https://anchorfact.org/')), 'quick start should expose copyable absolute GET calls');
  assertEq(payload.ai_adoption_guidance.primary_api_conversion_target, 0.2);
  assert(payload.ai_adoption_guidance.discovery_entrypoints.includes('/llms.txt'), 'AI adoption guidance should name crawler discovery entrypoints');
  assert(payload.ai_adoption_guidance.discovery_entrypoints.includes('/.well-known/anchorfact.json'), 'AI adoption guidance should name well-known agent alias discovery');
  assert(payload.ai_adoption_guidance.primary_api_entrypoints.includes('/api/evidence'), 'AI adoption guidance should name primary API entrypoints');
  assert(payload.ai_adoption_guidance.next_call_after_discovery.includes('/api/context'), 'AI adoption guidance should convert discovery to context');
  assert(payload.ai_adoption_guidance.minimum_valid_primary_calls.some(call => call.path === '/api/evidence?q={query}&limit=3&format=markdown'), 'AI adoption guidance should expose copyable evidence calls');
  assert(payload.ai_adoption_guidance.minimum_valid_primary_calls.every(call => call.method === 'GET' && call.url), 'AI adoption guidance should expose absolute GET calls');
  assert(payload.ai_adoption_guidance.parameter_error_prevention.bare_primary_paths_return_recoverable_400, 'AI adoption guidance should explain bare primary API 400s');
  assert(payload.ai_adoption_guidance.parameter_error_prevention.do_not_call_bare_paths.includes('/api/source'), 'AI adoption guidance should warn against bare source calls');
  assertEq(payload.error_recovery_guidance.recoverable_400_field, 'machine_recovery');
  assertEq(payload.error_recovery_guidance.default_recovery_path, '/api/context?q={query}&limit=3');
  assert(payload.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/context'), 'error recovery guidance should name observed recoverable context errors');
  assert(payload.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/evidence'), 'error recovery guidance should name observed recoverable evidence errors');
  assert(payload.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/source'), 'error recovery guidance should name observed recoverable source errors');
  assert(payload.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/resolve-batch'), 'error recovery guidance should name observed recoverable batch resolver errors');
  assert(payload.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/cite'), 'error recovery guidance should name observed recoverable citation errors');
  assert(payload.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/plan'), 'error recovery guidance should name observed recoverable plan errors');
  assert(payload.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/article'), 'error recovery guidance should name observed recoverable article errors');
  assert(payload.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/claim'), 'error recovery guidance should name observed recoverable claim errors');
  assert(payload.error_recovery_guidance.retry_example_paths.some(path => path.includes('/api/evidence?q=')), 'error recovery guidance should include an evidence retry template');
  assert(payload.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/resolve'), 'error recovery guidance should name observed recoverable resolver errors');
  assert(payload.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/search'), 'error recovery guidance should name observed recoverable search errors');
  assert(payload.error_recovery_guidance.retry_example_paths.some(path => path.includes('/api/cite?id=')), 'error recovery guidance should include a citation retry template');
  assert(payload.error_recovery_guidance.retry_example_paths.some(path => path.includes('/api/plan?q=')), 'error recovery guidance should include a plan retry template');
  assert(payload.error_recovery_guidance.retry_example_paths.includes('/api/search?q={query}&limit=5'), 'error recovery guidance should include a search retry template');
  assert(payload.error_recovery_guidance.retry_example_paths.includes('/api/article?slug={canonical_slug}'), 'error recovery guidance should include an article retry template');
  assert(payload.error_recovery_guidance.retry_example_paths.includes('/api/claim?id={claim_id}'), 'error recovery guidance should include a claim retry template');
  assert(payload.error_recovery_guidance.retry_example_paths.includes('/api/resolve?ref={claim_id_or_slug_or_source_id}'), 'error recovery guidance should include a resolver retry template');
  assertEq(payload.readiness_guidance.status_endpoint, '/api-readiness.json');
  assertEq(payload.readiness_guidance.default_access_until_ready, 'free_no_key_read_only');
  assertEq(payload.readiness_guidance.subscription_ready_requires, apiReadinessPayload.readiness_blockers.gate_ids);
  assert(!payload.readiness_guidance.subscription_ready_requires.includes('core_query_context_ratio'), 'readiness guidance should not publish stale resolved blockers');
  assert(payload.readiness_guidance.blocker_evidence_requirements.some(item =>
    item.id === 'production_integrity_14_day'
    && item.required_fields.includes('source_commit_sha')
  ), 'readiness guidance should expose production blocker evidence requirements');
  assert(payload.readiness_guidance.blocker_evidence_requirements.some(item =>
    item.id === 'design_partners'
    && item.required_fields.includes('paid_intent_signal_count')
  ), 'readiness guidance should expose manual blocker evidence requirements');
  assertEq(payload.readiness_guidance.report_only_until_gates_met, true);
  assertEq(payload.readiness_guidance.runtime_signal_contract.static_artifact, true);
  assertEq(payload.readiness_guidance.runtime_signal_contract.missing_runtime_status, 'not_provided');
  assert(payload.readiness_guidance.runtime_signal_contract.workflow.includes('readiness-scorecard.yml'), 'readiness guidance should expose runtime scorecard workflow');
  assert(payload.readiness_guidance.runtime_signal_contract.scorecard_command.includes('--adoption-json'), 'readiness guidance should expose adoption JSON scorecard command');
  assert(payload.readiness_guidance.runtime_signal_contract.runtime_input_ids.includes('ai_adoption'), 'readiness guidance should expose AI adoption runtime input');
  assertEq(payload.readiness_guidance.runtime_signal_contract.preferred_adoption_scope, 'interactive_ai');
  assert(payload.recommended_sequence[0].includes('/api/context'), 'sequence should start with default context guidance');
  assert(payload.recommended_sequence[1].includes('/api/evidence'), 'sequence should put evidence second');
  assert(payload.recommended_sequence[2].includes('/api/plan') && payload.recommended_sequence[2].includes('only when coverage is uncertain'), 'sequence should reserve planning for uncertainty');
  assert(payload.recommended_sequence.some(step => step.includes('/llms.txt') && step.includes('/api/context')), 'sequence should tell crawlers the next primary API call');
  assert(payload.recommended_sequence.some(step => step.includes('/.well-known/anchorfact.json') && step.includes('/api/context')), 'sequence should include well-known agent alias discovery');
  assertEq(payload.primary_entrypoints.map(entrypoint => entrypoint.id), ['context', 'evidence', 'plan']);
  assertEq(payload.primary_entrypoints[0].path, '/api/context');
  assertEq(payload.primary_entrypoints[0].minimum_valid_path, '/api/context?q={query}&limit=3&format=markdown');
  assert(payload.primary_entrypoints[0].best_for.some(item => item.includes('one-call prompt')), 'context should be the default prompt path');
  assert(payload.primary_entrypoints[1].format_options.includes('markdown'), 'evidence should advertise markdown output');
  assertEq(payload.primary_entrypoints[1].minimum_valid_path, '/api/evidence?q={query}&limit=3&format=markdown');
  assert(payload.primary_entrypoints[2].use_when.some(item => item.includes('not sure')), 'plan should remain the uncertainty preflight');

  const endpointPaths = payload.endpoints.map(endpoint => endpoint.path);
  for (const path of [
    '/api/plan',
    '/api/evidence',
    '/api/context',
    '/api/search',
    '/api/article',
    '/api/claim',
    '/api/cite',
    '/api/source',
    '/api/resolve',
    '/api/resolve-batch'
  ]) {
    assert(endpointPaths.includes(path), `api index should include ${path}`);
  }

  assert(payload.static_fallbacks.some(fallback => fallback.path === '/agent.json'), 'api index should point to agent profile fallback');
  const apiAccessFallback = payload.static_fallbacks.find(fallback => fallback.path === '/api-access/');
  assert(apiAccessFallback, 'api index should point to API access policy');
  assertEq(apiAccessFallback.media_type, 'application/json');
  assert(payload.static_fallbacks.some(fallback => fallback.path === '/openapi.json'), 'api index should point to OpenAPI fallback');
  assert(payload.static_fallbacks.some(fallback => fallback.path === '/artifact-summary.json'), 'api index should point to artifact summary fallback');
  assert(payload.static_fallbacks.some(fallback => fallback.path === '/artifact-shards.json'), 'api index should point to artifact shard fallback');
  assert(payload.static_fallbacks.some(fallback => fallback.path === '/api-readiness.json'), 'api index should point to API readiness fallback');
  const contentHealthFallback = payload.static_fallbacks.find(fallback => fallback.path === '/content-health.json');
  assert(contentHealthFallback, 'api index should point to content health fallback');
  assert(contentHealthFallback.description.includes('source-ready') && contentHealthFallback.description.includes('source acquisition'), 'api index content health fallback should describe repair queue phases');
  assert(payload.static_fallbacks.some(fallback => fallback.path === '/provenance.json'), 'api index should point to provenance fallback');

  const sourceEndpoint = payload.endpoints.find(endpoint => endpoint.path === '/api/source');
  assertEq(sourceEndpoint.minimum_valid_paths[0], '/api/source?id={source_id}');
  assert(sourceEndpoint.bare_path_returns_recoverable_400, 'source endpoint should explain bare-path recovery');
  const resolveBatchEndpoint = payload.endpoints.find(endpoint => endpoint.path === '/api/resolve-batch');
  assert(resolveBatchEndpoint.minimum_valid_paths.includes('/api/resolve-batch?ref={claim_id}&ref={source_id}'), 'batch resolver should include repeated ref example');
});

test('Pages Function returns CORS JSON for /api discovery', async () => {
  const response = await onRequestGet({
    request: new Request('https://anchorfact.org/api'),
    env: {
      ASSETS: {
        fetch: async (url) => {
          assertEq(new URL(url).pathname, '/api-readiness.json');
          return new Response(JSON.stringify(apiReadinessPayload), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    }
  });
  const payload = await response.json();

  assertEq(response.status, 200);
  assertEq(response.headers.get('Access-Control-Allow-Origin'), '*');
  assertEq(response.headers.get('Cache-Control'), 'public, max-age=300');
  assertEq(payload.schema_version, 'anchorfact.api-index.v1');
  assertEq(payload.readiness_guidance.status_endpoint, '/api-readiness.json');
  assertEq(payload.readiness_guidance.subscription_ready_requires, apiReadinessPayload.readiness_blockers.gate_ids);
  assert(payload.readiness_guidance.blocker_evidence_requirements.some(item => item.id === 'design_partners'), 'function payload should expose blocker evidence from api-readiness.json');
  assert(payload.readiness_guidance.runtime_signal_contract.runtime_input_ids.includes('ai_adoption'), 'function payload should expose readiness runtime inputs');
  assertEq(payload.error_recovery_guidance.recoverable_400_field, 'machine_recovery');
  assert(payload.endpoints.some(endpoint => endpoint.path === '/api/evidence'), 'payload should include evidence API');
});

test('Pages Function supports OPTIONS preflight', () => {
  const response = onRequestOptions();
  assertEq(response.status, 204);
  assertEq(response.headers.get('Access-Control-Allow-Methods'), 'GET, OPTIONS');
});

for (const { name, fn } of tests) {
  try {
    await fn();
    passed++;
    console.log(`  ok ${name}`);
  } catch (e) {
    failed++;
    console.log(`  fail ${name}: ${e.message}`);
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
