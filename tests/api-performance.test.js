#!/usr/bin/env node
import {
  DEFAULT_ARTIFACT_SIZE_BUDGETS,
  buildApiPerformanceReport,
  evaluateArtifactSizeBudgets,
  evaluateBudget,
  percentile,
  renderApiPerformanceMarkdown,
  summarizeSamples
} from '../scripts/check-api-performance.js';

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

console.log('AnchorFact API Performance Budget Tests\n');

test('percentile and sample summaries are stable for small sample sets', () => {
  const samples = [5, 1, 3, 2, 4];
  assertEq(percentile(samples, 50), 3);
  assertEq(percentile(samples, 95), 5);
  assertEq(summarizeSamples(samples), {
    min_ms: 1,
    median_ms: 3,
    p95_ms: 5,
    max_ms: 5,
    avg_ms: 3
  });
});

test('evaluateBudget fails median and p95 regressions explicitly', () => {
  const failures = evaluateBudget(
    { median_ms: 26.5, p95_ms: 80.25 },
    { median_ms: 25, p95_ms: 75 }
  );
  assertEq(failures.length, 2);
  assert(failures[0].includes('median'), 'first failure should mention median budget');
  assert(failures[1].includes('p95'), 'second failure should mention p95 budget');
});

test('buildApiPerformanceReport renders passing and failing budget reports', () => {
  let calls = 0;
  const cases = [
    {
      id: 'fast_case',
      budget: { median_ms: 1000, p95_ms: 1000 },
      run: () => ({ ok: true })
    },
    {
      id: 'impossible_budget',
      budget: { median_ms: 0, p95_ms: 0 },
      run: () => {
        calls++;
        return { ok: true, calls };
      }
    }
  ];
  const report = buildApiPerformanceReport({
    artifacts: {},
    cases,
    runs: 2,
    warmups: 1,
    generatedAt: '2026-05-30T00:00:00.000Z'
  });

  assertEq(report.case_count, 2);
  assertEq(report.ok, false);
  assertEq(report.failed, 1);
  assert(report.failures.some(failure => failure.includes('impossible_budget')), 'budget failure should name the case');

  const markdown = renderApiPerformanceMarkdown(report);
  assert(markdown.includes('AnchorFact API Performance Budget - FAIL'), 'markdown should expose failure status');
  assert(markdown.includes('fast_case'), 'markdown should include passing cases');
  assert(markdown.includes('impossible_budget'), 'markdown should include failing cases');
});

test('artifact size budget passes current baseline headroom', () => {
  const budget = [
    { path: 'graph.json', baseline_bytes: 2997236, max_bytes: 4500000, purpose: 'offline graph' },
    { path: 'artifact-summary.json', baseline_bytes: 0, max_bytes: 60000, purpose: 'summary' }
  ];
  const report = evaluateArtifactSizeBudgets({
    'graph.json': 2997236,
    'artifact-summary.json': 12000
  }, budget);

  assertEq(report.ok, true);
  assertEq(report.failures, []);
  assert(report.artifacts[0].headroom_bytes > 0, 'baseline should have regression headroom');
});

test('default artifact budget includes versioned shard registry headroom', () => {
  const shardBudget = DEFAULT_ARTIFACT_SIZE_BUDGETS.find(item => item.path === 'artifact-shards.json');
  assert(shardBudget, 'default artifact budget should include artifact-shards.json');
  assertEq(shardBudget.max_bytes, 250000);
});

test('artifact size budget fails an oversized fixture without affecting case reporting', () => {
  const artifactSizeBudget = evaluateArtifactSizeBudgets({
    'graph.json': 4500001
  }, [
    { path: 'graph.json', baseline_bytes: 2997236, max_bytes: 4500000, purpose: 'offline graph' }
  ]);
  const report = buildApiPerformanceReport({
    artifacts: {},
    artifactSizeBudget,
    cases: [
      {
        id: 'fast_case',
        budget: { median_ms: 1000, p95_ms: 1000 },
        run: () => ({ ok: true })
      }
    ],
    runs: 1,
    warmups: 0,
    generatedAt: '2026-05-30T00:00:00.000Z'
  });

  assertEq(report.ok, false);
  assertEq(report.failed, 0);
  assert(report.failures.some(failure => failure.includes('artifact_size_budget')), 'artifact failure should be reported separately');
  const markdown = renderApiPerformanceMarkdown(report);
  assert(markdown.includes('## Artifact Size Budget'), 'markdown should include artifact budget section');
  assert(markdown.includes('graph.json: fail'), 'markdown should show oversized artifact failure');
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
process.exit(failed > 0 ? 1 : 0);
