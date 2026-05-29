#!/usr/bin/env node
import { buildCapabilitiesIndex } from '../src/lib/capabilities-index.js';

let passed = 0, failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ok ${name}`);
  } catch (e) {
    failed++;
    console.log(`  fail ${name}: ${e.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertEq(actual, expected, ctx = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${ctx} expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

console.log('AnchorFact Capabilities Index Tests\n');

test('buildCapabilitiesIndex publishes AI endpoint selection rules', () => {
  const payload = buildCapabilitiesIndex({
    generated: '2026-05-29T00:00:00.000Z',
    manifest: { public_article_count: 555, draft_article_count: 445 },
    claimsPayload: { claim_count: 1685 },
    topicsPayload: { topic_count: 17 },
    examplesPayload: { example_count: 6 },
    evalsPayload: { eval_count: 9 },
    mcpPayload: { tools: [{ name: 'anchorfact_search' }, { name: 'anchorfact_cite_claim' }] }
  });

  assertEq(payload.schema_version, 'anchorfact.capabilities.v1');
  assertEq(payload.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(payload.current_snapshot.public_articles, 555);
  assertEq(payload.current_snapshot.public_claims, 1685);
  assertEq(payload.current_snapshot.mcp_tools, 2);
  assertEq(payload.capability_count, 8);
  assertEq(payload.capabilities.map(capability => capability.id), [
    'answer_with_evidence',
    'search_public_records',
    'resolve_single_reference',
    'resolve_many_references',
    'cite_atomic_claim',
    'inspect_source_reuse',
    'verify_official_build',
    'connect_local_mcp'
  ]);

  const evidence = payload.capabilities.find(capability => capability.id === 'answer_with_evidence');
  assertEq(evidence.primary_call.path, '/api/evidence?q={query}&limit=3');
  assert(evidence.output_formats.includes('text/markdown'), 'evidence capability should advertise markdown output');
  assert(evidence.follow_up_calls.some(call => call.path === '/api/cite?id={claim_id}'), 'evidence capability should point to citation export');
  assert(evidence.fallback_artifacts.includes('/search-index.json'), 'evidence capability should name static fallback artifacts');

  const batch = payload.capabilities.find(capability => capability.id === 'resolve_many_references');
  assertEq(batch.primary_call.path, '/api/resolve-batch?ref={reference}&ref={reference}');
  assert(batch.input_patterns.includes('source_url'), 'batch resolver should accept source URLs');

  const provenance = payload.capabilities.find(capability => capability.id === 'verify_official_build');
  assert(provenance.trust_requirements.some(requirement => requirement.includes('pinned public key')), 'provenance capability should require pinned key verification');

  assertEq(payload.default_sequence, [
    'verify_official_build',
    'answer_with_evidence',
    'cite_atomic_claim'
  ]);
  assert(payload.selection_rules.some(rule => rule.use_capability === 'resolve_many_references'), 'selection rules should include batch resolution');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
