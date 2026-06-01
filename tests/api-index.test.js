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

test('buildApiIndex publishes the machine API discovery contract', () => {
  const payload = buildApiIndex({ generated: '2026-05-29T00:00:00.000Z' });

  assertEq(payload.schema_version, 'anchorfact.api-index.v1');
  assertEq(payload.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(payload.read_only, true);
  assert(payload.recommended_sequence[0].includes('/api/context'), 'sequence should start with default context guidance');
  assert(payload.recommended_sequence[1].includes('/api/evidence'), 'sequence should put evidence second');
  assert(payload.recommended_sequence[2].includes('/api/plan') && payload.recommended_sequence[2].includes('only when coverage is uncertain'), 'sequence should reserve planning for uncertainty');
  assertEq(payload.primary_entrypoints.map(entrypoint => entrypoint.id), ['context', 'evidence', 'plan']);
  assertEq(payload.primary_entrypoints[0].path, '/api/context');
  assert(payload.primary_entrypoints[0].best_for.some(item => item.includes('one-call prompt')), 'context should be the default prompt path');
  assert(payload.primary_entrypoints[1].format_options.includes('markdown'), 'evidence should advertise markdown output');
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
  assert(payload.static_fallbacks.some(fallback => fallback.path === '/openapi.json'), 'api index should point to OpenAPI fallback');
  assert(payload.static_fallbacks.some(fallback => fallback.path === '/artifact-summary.json'), 'api index should point to artifact summary fallback');
  assert(payload.static_fallbacks.some(fallback => fallback.path === '/content-health.json'), 'api index should point to content health fallback');
  assert(payload.static_fallbacks.some(fallback => fallback.path === '/provenance.json'), 'api index should point to provenance fallback');
});

test('Pages Function returns CORS JSON for /api discovery', async () => {
  const response = await onRequestGet({
    request: new Request('https://anchorfact.org/api')
  });
  const payload = await response.json();

  assertEq(response.status, 200);
  assertEq(response.headers.get('Access-Control-Allow-Origin'), '*');
  assertEq(response.headers.get('Cache-Control'), 'public, max-age=300');
  assertEq(payload.schema_version, 'anchorfact.api-index.v1');
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
