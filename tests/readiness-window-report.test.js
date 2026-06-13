#!/usr/bin/env node
import {
  buildReadinessWindowReport,
  normalizeReadinessSnapshot,
  renderReadinessWindowMarkdown
} from '../scripts/readiness-window-report.js';

let passed = 0, failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  OK ${name}`);
  } catch (error) {
    failed++;
    console.log(`  FAIL ${name}: ${error.message}`);
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

function snapshot(day, overrides = {}) {
  const generated = `2026-06-${String(day).padStart(2, '0')}T00:00:00.000Z`;
  return {
    schema_version: 'anchorfact.readiness-snapshot.v1',
    generated,
    source: 'fixture',
    production_integrity_status: 'pass',
    public_audit_actionable_count: 0,
    api_context_ratio: 1,
    api_scorecard_failures: 0,
    adoption_ratio: 0.24,
    adoption_status: 'met',
    ...overrides
  };
}

console.log('AnchorFact Readiness Window Report Tests\n');

test('normalizeReadinessSnapshot extracts API readiness and content health signals', () => {
  const normalized = normalizeReadinessSnapshot({
    apiReadiness: {
      generated: '2026-06-08T00:00:00.000Z',
      production_health: { status: 'pass' },
      adoption_signal: {
        identified_ai_primary_to_discovery_current_ratio: 0.21,
        identified_ai_primary_to_discovery_target_status: 'met'
      },
      api_scorecard: { pass_ratio: 1, failures: [] }
    },
    contentHealth: {
      public_audit: { actionable_count: 0 },
      project_readiness: { next_focus: 'maintain_and_measure_ai_usage' }
    },
    source: 'current'
  });

  assertEq(normalized.date, '2026-06-08');
  assertEq(normalized.production_integrity_status, 'pass');
  assertEq(normalized.public_audit_actionable_count, 0);
  assertEq(normalized.api_context_ratio, 1);
  assertEq(normalized.adoption_ratio, 0.21);
  assertEq(normalized.adoption_status, 'met');
});

test('buildReadinessWindowReport marks gates met across required consecutive windows', () => {
  const snapshots = Array.from({ length: 14 }, (_, index) => snapshot(index + 1));
  const report = buildReadinessWindowReport({
    snapshots,
    generatedAt: '2026-06-14T12:00:00.000Z'
  });

  assertEq(report.gates.production_integrity_14_day.status, 'met');
  assertEq(report.gates.public_audit_14_day.status, 'met');
  assertEq(report.gates.ai_primary_discovery_ratio_7_day.status, 'met');
  assertEq(report.content_change_policy.status, 'measure_first');
  assertEq(report.content_change_policy.should_repair_content_now, false);
});

test('buildReadinessWindowReport treats missing current metrics as not measured', () => {
  const report = buildReadinessWindowReport({
    snapshots: [],
    generatedAt: '2026-06-13T12:00:00.000Z'
  });
  const markdown = renderReadinessWindowMarkdown(report);

  assertEq(report.current_snapshot.public_audit_actionable_count, null);
  assertEq(report.current_snapshot.api_context_ratio, null);
  assertEq(report.current_snapshot.api_scorecard_failures, null);
  assertEq(report.current_snapshot.adoption_ratio, null);
  assertEq(report.content_change_policy.status, 'measure_first');
  assertEq(report.content_change_policy.should_repair_content_now, false);
  assertEq(report.content_change_policy.triggers, []);
  assert(markdown.includes('public_audit_actionable_count: not_measured'), 'missing not_measured public audit count');
  assert(markdown.includes('api_context_ratio: not_measured'), 'missing not_measured API ratio');
  assert(markdown.includes('api_scorecard_failures: not_measured'), 'missing not_measured API failures');
  assert(markdown.includes('adoption_ratio: not_measured'), 'missing not_measured adoption ratio');
});

test('buildReadinessWindowReport blocks content expansion when audit or API signals fail', () => {
  const snapshots = Array.from({ length: 14 }, (_, index) => snapshot(index + 1));
  snapshots[13] = snapshot(14, {
    public_audit_actionable_count: 2,
    api_context_ratio: 0.88,
    api_scorecard_failures: 3
  });
  const report = buildReadinessWindowReport({
    snapshots,
    generatedAt: '2026-06-14T12:00:00.000Z'
  });

  assertEq(report.gates.public_audit_14_day.status, 'not_met');
  assertEq(report.content_change_policy.status, 'repair_metric_regression');
  assertEq(report.content_change_policy.should_repair_content_now, true);
  assert(report.content_change_policy.triggers.includes('public_audit_actionable'), 'missing public audit trigger');
  assert(report.content_change_policy.triggers.includes('api_scorecard_below_target'), 'missing API scorecard trigger');
});

test('renderReadinessWindowMarkdown summarizes gate status and content policy', () => {
  const report = buildReadinessWindowReport({
    snapshots: Array.from({ length: 3 }, (_, index) => snapshot(index + 1)),
    generatedAt: '2026-06-03T12:00:00.000Z'
  });
  const markdown = renderReadinessWindowMarkdown(report);

  assert(markdown.includes('## Readiness Gates'), 'missing gates section');
  assert(markdown.includes('production_integrity_14_day'), 'missing production gate');
  assert(markdown.includes('Content policy: measure_first'), 'missing content policy');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
