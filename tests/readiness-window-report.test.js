#!/usr/bin/env node
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import {
  buildReadinessWindowReport,
  main,
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
      design_partner_signal: {
        status: 'met',
        external_design_partner_count: 3,
        paid_intent_signal_count: 1
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
  assertEq(normalized.design_partner_status, 'met');
  assertEq(normalized.external_design_partner_count, 3);
  assertEq(normalized.paid_intent_signal_count, 1);
});

test('normalizeReadinessSnapshot extracts public audit signal from API readiness gate fallback', () => {
  const normalized = normalizeReadinessSnapshot({
    apiReadiness: {
      generated: '2026-06-13T00:00:00.000Z',
      production_health: { status: 'not_provided' },
      api_scorecard: { pass_ratio: 1, failures: [] },
      adoption_signal: { status: 'not_provided' },
      readiness_gates: [
        {
          id: 'public_audit_14_day',
          status: 'not_measured_in_this_report',
          current_actionable_count: 0
        }
      ]
    }
  });

  assertEq(normalized.public_audit_actionable_count, 0);
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
  assertEq(report.automated_gates_met, true);
  assertEq(report.manual_gates_met, false);
  assertEq(report.paid_beta_ready, false);
  assertEq(report.readiness_blockers.automated_gate_ids, []);
  assertEq(report.readiness_blockers.manual_gate_ids, ['design_partners']);
  assertEq(report.content_change_policy.status, 'measure_first');
  assertEq(report.content_change_policy.should_repair_content_now, false);
});

test('buildReadinessWindowReport surfaces manual design partner gate separately from automated windows', () => {
  const snapshots = Array.from({ length: 14 }, (_, index) => snapshot(index + 1));
  snapshots[13] = snapshot(14, {
    design_partner_status: 'met',
    external_design_partner_count: 3,
    paid_intent_signal_count: 1
  });
  const report = buildReadinessWindowReport({
    snapshots,
    generatedAt: '2026-06-14T12:00:00.000Z'
  });
  const markdown = renderReadinessWindowMarkdown(report);

  assertEq(report.automated_gates_met, true);
  assertEq(report.manual_gates_met, true);
  assertEq(report.paid_beta_ready, true);
  assertEq(report.readiness_blockers.automated_gate_ids, []);
  assertEq(report.readiness_blockers.manual_gate_ids, []);
  assertEq(report.manual_gates.design_partners.status, 'met');
  assertEq(report.manual_gates.design_partners.current_partner_count, 3);
  assertEq(report.manual_gates.design_partners.current_paid_intent_count, 1);
  assert(markdown.includes('Readiness blockers: none'), 'missing empty blocker summary');
  assert(markdown.includes('Paid beta ready: true'), 'missing paid beta readiness summary');
  assert(markdown.includes('## Manual Gates'), 'missing manual gates section');
  assert(markdown.includes('design_partners: met'), 'missing design partner manual gate');
  assert(markdown.includes('current_partners=3'), 'missing current partner count');
  assert(markdown.includes('current_paid_intent=1'), 'missing current paid intent count');
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
  assertEq(report.manual_gates_met, false);
  assertEq(report.paid_beta_ready, false);
  assert(report.readiness_blockers.automated_gate_ids.includes('production_integrity_14_day'), 'missing production blocker');
  assert(report.readiness_blockers.manual_gate_ids.includes('design_partners'), 'missing manual design partner blocker');
  assertEq(report.manual_gates.design_partners.status, 'not_measured');
  assert(markdown.includes('Readiness blockers: production_integrity_14_day'), 'missing blocker summary');
  assert(markdown.includes('Paid beta ready: false'), 'missing false paid beta readiness summary');
  assert(markdown.includes('public_audit_actionable_count: not_measured'), 'missing not_measured public audit count');
  assert(markdown.includes('api_context_ratio: not_measured'), 'missing not_measured API ratio');
  assert(markdown.includes('api_scorecard_failures: not_measured'), 'missing not_measured API failures');
  assert(markdown.includes('adoption_ratio: not_measured'), 'missing not_measured adoption ratio');
  assert(markdown.includes('design_partner_status: not_measured'), 'missing not_measured design partner status');
  assert(markdown.includes('external_design_partner_count: not_measured'), 'missing not_measured design partner count');
  assert(markdown.includes('paid_intent_signal_count: not_measured'), 'missing not_measured paid intent count');
});

test('main loads current dist readiness artifacts by default when present', () => {
  const root = mkdtempSync(join(tmpdir(), 'anchorfact-readiness-'));
  const originalCwd = process.cwd();
  const originalWrite = process.stdout.write;
  let output = '';

  mkdirSync(join(root, 'dist'), { recursive: true });
  writeFileSync(join(root, 'dist', 'api-readiness.json'), JSON.stringify({
    generated: '2026-06-13T00:00:00.000Z',
    production_health: { status: 'not_provided' },
    api_scorecard: { pass_ratio: 1, failures: [] },
    adoption_signal: { status: 'not_provided' }
  }));
  writeFileSync(join(root, 'dist', 'content-health.json'), JSON.stringify({
    generated: '2026-06-13T00:00:00.000Z',
    project_readiness: {
      next_focus: 'maintain_and_measure_ai_usage',
      signals: { public_audit_actionable_count: 0 }
    }
  }));

  try {
    process.chdir(root);
    process.stdout.write = (chunk, encoding, callback) => {
      output += String(chunk);
      if (typeof encoding === 'function') encoding();
      if (typeof callback === 'function') callback();
      return true;
    };
    const report = main([]);

    assertEq(report.snapshot_count, 1);
    assertEq(report.current_snapshot.source, 'dist');
    assertEq(report.current_snapshot.public_audit_actionable_count, 0);
    assertEq(report.current_snapshot.api_context_ratio, 1);
    assertEq(report.current_snapshot.api_scorecard_failures, 0);
    assert(output.includes('api_context_ratio: 1'), 'missing auto-loaded API ratio in output');
  } finally {
    process.stdout.write = originalWrite;
    process.chdir(originalCwd);
    rmSync(root, { recursive: true, force: true });
  }
});

test('main loads default readiness history directory when present', () => {
  const root = mkdtempSync(join(tmpdir(), 'anchorfact-readiness-'));
  const originalCwd = process.cwd();
  const originalWrite = process.stdout.write;

  mkdirSync(join(root, 'reports', 'readiness-history'), { recursive: true });
  mkdirSync(join(root, 'dist'), { recursive: true });
  writeFileSync(join(root, 'reports', 'readiness-history', '2026-06-12.json'), JSON.stringify(snapshot(12)));
  writeFileSync(join(root, 'dist', 'api-readiness.json'), JSON.stringify({
    generated: '2026-06-13T00:00:00.000Z',
    production_health: { status: 'not_provided' },
    api_scorecard: { pass_ratio: 1, failures: [] },
    adoption_signal: { status: 'not_provided' }
  }));
  writeFileSync(join(root, 'dist', 'content-health.json'), JSON.stringify({
    generated: '2026-06-13T00:00:00.000Z',
    project_readiness: {
      next_focus: 'maintain_and_measure_ai_usage',
      signals: { public_audit_actionable_count: 0 }
    }
  }));

  try {
    process.chdir(root);
    process.stdout.write = (chunk, encoding, callback) => {
      if (typeof encoding === 'function') encoding();
      if (typeof callback === 'function') callback();
      return true;
    };
    const report = main([]);

    assertEq(report.snapshot_count, 2);
    assertEq(report.current_snapshot.date, '2026-06-13');
    assertEq(report.gates.public_audit_14_day.observed_days, 2);
    assert(report.snapshots.some(item => item.source.endsWith('reports/readiness-history/2026-06-12.json')), 'missing history snapshot source');
  } finally {
    process.stdout.write = originalWrite;
    process.chdir(originalCwd);
    rmSync(root, { recursive: true, force: true });
  }
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
