#!/usr/bin/env node
import { buildCoverageIndex } from '../src/lib/coverage-index.js';
import { QUERY_BENCHMARK_CASES } from '../src/lib/query-benchmark.js';

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

console.log('AnchorFact Coverage Index Tests\n');

test('buildCoverageIndex summarizes public coverage and limits for AI routing', () => {
  const payload = buildCoverageIndex({
    generated: '2026-05-29T00:00:00.000Z',
    manifest: {
      public_article_count: 3,
      draft_article_count: 1,
      articles: [
        { status: 'public', is_draft: false, confidence_level: 'high', sources_verified: 2, sources_total: 2 },
        { status: 'public', is_draft: false, confidence_level: 'medium', sources_verified: 1, sources_total: 2 },
        { status: 'public', is_draft: false, confidence_level: 'low', sources_verified: 0, sources_total: 1 },
        { status: 'draft', is_draft: true, confidence_level: 'medium', sources_verified: 1, sources_total: 1 }
      ]
    },
    claimsPayload: { claim_count: 7 },
    topicsPayload: {
      topic_count: 2,
      topics: [
        { id: 'ai', title: 'AI', article_count: 2, claim_count: 5, source_count: 4, confidence_distribution: { high: 1, medium: 1, low: 0 } },
        { id: 'science', title: 'Science', article_count: 1, claim_count: 2, source_count: 2, confidence_distribution: { high: 0, medium: 0, low: 1 } }
      ]
    },
    sourcesPayload: {
      source_count: 6,
      tier_distribution: { S: 2, A: 3, B: 1, C: 0 },
      type_distribution: { academic_paper: 3, documentation: 2, book: 1 }
    }
  });

  assertEq(payload.schema_version, 'anchorfact.coverage.v1');
  assertEq(payload.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(payload.coverage_summary.public_articles, 3);
  assertEq(payload.coverage_summary.public_claims, 7);
  assertEq(payload.coverage_summary.confidence_distribution, { high: 1, medium: 1, low: 1 });
  assertEq(payload.coverage_summary.source_verification, {
    full: 1,
    partial: 1,
    none: 1,
    full_ratio: 0.333
  });
  assertEq(payload.coverage_summary.source_tier_distribution.S, 2);
  assertEq(payload.topic_coverage.map(topic => topic.id), ['ai', 'science']);
  assertEq(payload.query_benchmark.case_count, QUERY_BENCHMARK_CASES.length);
  assert(payload.query_benchmark.cases.some(item => item.expected_top_slug === 'ai/rlhf'), 'query benchmark should include high-intent AI routing cases');
  assert(payload.query_benchmark.pass_gate.includes('/evals.json'), 'query benchmark should point to executable evals');
  assert(payload.query_benchmark.usefulness_gate.includes('npm run benchmark:ai'), 'query benchmark should point to usefulness scoring before broad expansion');
  assert(payload.coverage_limits.some(limit => limit.id === 'not_general_web_search'), 'coverage limits should warn that AnchorFact is not a general web search engine');
  assertEq(payload.best_entrypoints.plan_query, '/api/plan?q={query}&limit=3');
  assert(payload.recommended_decision_flow.some(step => step.use === '/api/plan?q={query}&limit=3'), 'decision flow should point to plan API');
  assert(payload.recommended_decision_flow.some(step => step.use === '/api/evidence?q={query}&limit=3'), 'decision flow should point to evidence API');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
