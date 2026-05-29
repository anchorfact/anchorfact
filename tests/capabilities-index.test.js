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
    evalsPayload: { eval_count: 10 },
    mcpPayload: {
      tools: [
        { name: 'anchorfact_plan_query' },
        { name: 'anchorfact_search' },
        { name: 'anchorfact_context' },
        { name: 'anchorfact_get_article' },
        { name: 'anchorfact_resolve_reference' },
        { name: 'anchorfact_resolve_references' },
        { name: 'anchorfact_cite_claim' },
        { name: 'anchorfact_list_categories' }
      ]
    }
  });

  assertEq(payload.schema_version, 'anchorfact.capabilities.v1');
  assertEq(payload.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(payload.current_snapshot.public_articles, 555);
  assertEq(payload.current_snapshot.public_claims, 1685);
  assertEq(payload.current_snapshot.mcp_tools, 8);
  assertEq(payload.capability_count, 10);
  assertEq(payload.capabilities.map(capability => capability.id), [
    'plan_query',
    'answer_with_evidence',
    'assemble_prompt_context',
    'search_public_records',
    'resolve_single_reference',
    'resolve_many_references',
    'cite_atomic_claim',
    'inspect_source_reuse',
    'verify_official_build',
    'connect_local_mcp'
  ]);

  const planner = payload.capabilities.find(capability => capability.id === 'plan_query');
  assertEq(planner.primary_call.path, '/api/plan?q={query}&limit=3');
  assertEq(planner.local_mcp_tools[0].tool, 'anchorfact_plan_query');
  assert(planner.fallback_artifacts.includes('/coverage.json'), 'plan capability should name coverage fallback');

  const evidence = payload.capabilities.find(capability => capability.id === 'answer_with_evidence');
  assertEq(evidence.primary_call.path, '/api/evidence?q={query}&limit=3');
  assert(evidence.local_mcp_tools.some(tool => tool.tool === 'anchorfact_search'), 'evidence capability should name local search fallback');
  assert(evidence.local_mcp_tools.some(tool => tool.tool === 'anchorfact_cite_claim'), 'evidence capability should name local citation fallback');
  assert(evidence.output_formats.includes('text/markdown'), 'evidence capability should advertise markdown output');
  assert(evidence.follow_up_calls.some(call => call.path === '/api/cite?id={claim_id}'), 'evidence capability should point to citation export');
  assert(evidence.fallback_artifacts.includes('/search-index.json'), 'evidence capability should name static fallback artifacts');

  const context = payload.capabilities.find(capability => capability.id === 'assemble_prompt_context');
  assertEq(context.primary_call.path, '/api/context?q={query}&limit=3');
  assertEq(context.local_mcp_tools[0].tool, 'anchorfact_context');
  assert(context.trust_requirements.some(requirement => requirement.includes('evidence_pack_count')), 'context capability should guard unsupported payloads');

  const batch = payload.capabilities.find(capability => capability.id === 'resolve_many_references');
  assertEq(batch.primary_call.path, '/api/resolve-batch?ref={reference}&ref={reference}');
  assertEq(batch.local_mcp_tools[0].tool, 'anchorfact_resolve_references');
  assert(batch.input_patterns.includes('source_url'), 'batch resolver should accept source URLs');

  const provenance = payload.capabilities.find(capability => capability.id === 'verify_official_build');
  assert(provenance.trust_requirements.some(requirement => requirement.includes('pinned public key')), 'provenance capability should require pinned key verification');

  const mcp = payload.capabilities.find(capability => capability.id === 'connect_local_mcp');
  assertEq(mcp.local_mcp_tools.map(tool => tool.tool), [
    'anchorfact_plan_query',
    'anchorfact_context',
    'anchorfact_search',
    'anchorfact_get_article',
    'anchorfact_resolve_reference',
    'anchorfact_resolve_references',
    'anchorfact_cite_claim',
    'anchorfact_list_categories'
  ]);

  assertEq(payload.default_sequence, [
    'verify_official_build',
    'plan_query',
    'assemble_prompt_context',
    'cite_atomic_claim'
  ]);
  assert(payload.selection_rules.some(rule => rule.use_capability === 'plan_query'), 'selection rules should include query planning');
  assert(payload.selection_rules.some(rule => rule.use_capability === 'assemble_prompt_context'), 'selection rules should include prompt context');
  assert(payload.selection_rules.some(rule => rule.use_capability === 'resolve_many_references'), 'selection rules should include batch resolution');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
