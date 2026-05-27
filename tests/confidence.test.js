#!/usr/bin/env node
/**
 * AnchorFact 核心测试套件
 * 
 * 测试：computeConfidence 公式正确性、前端解析、编译流程
 */
import { computeConfidence, classifySourceTier, computeFreshnessScore } from '../src/lib/confidence.js';

let passed = 0, failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    failed++;
    console.log(`  ✗ ${name}: ${e.message}`);
  }
}

function assertEq(actual, expected, ctx = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${ctx} expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

console.log('AnchorFact Core Tests\n');

// ---- classifySourceTier ----
console.log('classifySourceTier:');
test('DOI source is S-tier', () => {
  assertEq(classifySourceTier({ doi: '10.1145/362384.362685' }), 'S');
});
test('Standard is S-tier', () => {
  assertEq(classifySourceTier({ type: 'standard' }), 'S');
});
test('RFC is S-tier', () => {
  assertEq(classifySourceTier({ type: 'rfc' }), 'S');
});
test('Academic paper is A-tier', () => {
  assertEq(classifySourceTier({ type: 'academic_paper' }), 'A');
});
test('Blog post is B-tier', () => {
  assertEq(classifySourceTier({ type: 'blog_post' }), 'B');
});
test('Unknown is C-tier', () => {
  assertEq(classifySourceTier({ type: 'unknown' }), 'C');
});

// ---- computeFreshnessScore ----
console.log('\ncomputeFreshnessScore:');
test('Current year = 1.0', () => {
  const score = computeFreshnessScore({ year: new Date().getFullYear() });
  assertEq(score, 1.0);
});
test('5 years ago = 0.7', () => {
  const score = computeFreshnessScore({ year: new Date().getFullYear() - 5 });
  assertEq(score, 0.7);
});
test('No year = 0.5', () => {
  assertEq(computeFreshnessScore({}), 0.5);
});

// ---- computeConfidence ----
console.log('\ncomputeConfidence:');
test('Empty sources → low/0', () => {
  const r = computeConfidence([]);
  assertEq(r.level, 'low');
  assertEq(r.score, 0);
});
test('Single S-tier DOI source → medium at minimum', () => {
  const r = computeConfidence([{ title: 'Test', type: 'academic_paper', doi: '10.1234/test', year: 2025 }], {});
  // source_tier=1.0, source_count=0.5, source_verified=1.0 (DOI), freshness=1.0
  // 0.35*1 + 0.20*0.5 + 0.25*1 + 0.10*1 = 0.35+0.10+0.25+0.10 = 0.80
  assertEq(r.score >= 0.75, true, 'score should be >=0.75');
});
test('3 S-tier DOI sources without verification → medium (estimated cannot be high)', () => {
  const sources = [
    { doi: '10.a/a', type: 'academic_paper', year: 2025 },
    { doi: '10.b/b', type: 'standard', year: 2025 },
    { doi: '10.c/c', type: 'rfc', year: 2025 },
  ];
  const r = computeConfidence(sources, {});
  assertEq(r.level, 'medium');
  assertEq(r.inputs.based_on, 'estimated');
  assertEq(r.score >= 0.85, true, 'score can be high while level is capped');
});
test('3 S-tier DOI sources with verification → high', () => {
  const sources = [
    { doi: '10.a/a', type: 'academic_paper', year: 2025 },
    { doi: '10.b/b', type: 'standard', year: 2025 },
    { doi: '10.c/c', type: 'rfc', year: 2025 },
  ];
  const vd = {
    sources_total: 3,
    sources_verified: 3,
    verification_results: [
      { results: [{ method: 'doi', verified: true }] },
      { results: [{ method: 'doi', verified: true }] },
      { results: [{ method: 'doi', verified: true }] }
    ]
  };
  const r = computeConfidence(sources, {}, vd);
  assertEq(r.level, 'high');
  assertEq(r.inputs.based_on, 'verified_sources');
});
test('High score with verified coverage below 50% is capped to medium', () => {
  const sources = [
    { doi: '10.a/a', type: 'academic_paper', year: 2025 },
    { doi: '10.b/b', type: 'standard', year: 2025 },
    { doi: '10.c/c', type: 'rfc', year: 2025 },
  ];
  const vd = {
    sources_total: 3,
    sources_verified: 1,
    verification_results: [
      { results: [{ method: 'doi', verified: true }] },
      { results: [{ method: 'doi', verified: false }] },
      { results: [{ method: 'doi', verified: false }] }
    ]
  };
  const r = computeConfidence(sources, {}, vd);
  assertEq(r.score >= 0.85, true, 'raw score should still expose formula output');
  assertEq(r.level, 'medium');
  assertEq(r.inputs.verified_coverage, 1 / 3);
});
test('High score with only one verified source is capped to medium', () => {
  const sources = [
    { doi: '10.a/a', type: 'academic_paper', year: 2025 },
    { doi: '10.b/b', type: 'standard', year: 2025 },
  ];
  const vd = {
    sources_total: 2,
    sources_verified: 1,
    verification_results: [
      { results: [{ method: 'doi', verified: true }] },
      { results: [{ method: 'doi', verified: false }] }
    ]
  };
  const r = computeConfidence(sources, {}, vd);
  assertEq(r.level, 'medium');
  assertEq(r.inputs.high_confidence_evidence_gap, true);
});
test('Editorial confidence caps computed confidence downward', () => {
  const sources = [
    { doi: '10.a/a', type: 'academic_paper', year: 2025 },
    { doi: '10.b/b', type: 'standard', year: 2025 },
    { doi: '10.c/c', type: 'rfc', year: 2025 },
  ];
  const vd = {
    sources_total: 3,
    sources_verified: 3,
    verification_results: [
      { results: [{ method: 'doi', verified: true }] },
      { results: [{ method: 'doi', verified: true }] },
      { results: [{ method: 'doi', verified: true }] }
    ]
  };
  const r = computeConfidence(sources, { confidence: 'medium' }, vd);
  assertEq(r.level, 'medium');
  assertEq(r.inputs.editorial_confidence, 'medium');
});
test('Disputed article gets decay penalty', () => {
  const sources = [
    { doi: '10.a/a', type: 'academic_paper', year: 2025 },
    { doi: '10.b/b', type: 'standard', year: 2025 },
    { doi: '10.c/c', type: 'rfc', year: 2025 },
  ];
  const without = computeConfidence(sources, {});
  const withPenalty = computeConfidence(sources, { disputed_statements: ['something'] });
  assertEq(withPenalty.score < without.score, true, 'disputed should lower score');
});
test('With real verification data', () => {
  const vd = { sources_total: 3, sources_verified: 3, verification_results: [{ results: [{ method: 'doi', verified: true }] }] };
  const r = computeConfidence([{ doi: '10.x/x', type: 'academic_paper', year: 2025 }], {}, vd);
  assertEq(r.inputs.based_on, 'verified_sources');
});
test('Blog source is lower tier than academic DOI source', () => {
  assertEq(classifySourceTier({ type: 'blog_post', url: 'https://example.com' }), 'B');
  assertEq(classifySourceTier({ type: 'academic_paper', doi: '10.1234/test' }), 'S');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
