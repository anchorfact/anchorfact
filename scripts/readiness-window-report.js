#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { pathToFileURL } from 'url';

export const READINESS_SNAPSHOT_SCHEMA_VERSION = 'anchorfact.readiness-snapshot.v1';
export const READINESS_WINDOW_SCHEMA_VERSION = 'anchorfact.readiness-window.v1';

const DEFAULT_API_TARGET_RATIO = 0.9;
const DEFAULT_ADOPTION_TARGET_RATIO = 0.2;
const DAY_MS = 24 * 60 * 60 * 1000;

function finiteNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function optionalFiniteNumber(value) {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function generatedDate(value) {
  const date = new Date(value || Date.now());
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
}

function dateOffset(dateText, offsetDays) {
  const date = new Date(`${dateText}T00:00:00.000Z`);
  return new Date(date.getTime() + offsetDays * DAY_MS).toISOString().slice(0, 10);
}

function readJson(path, label = 'JSON') {
  try {
    return JSON.parse(readFileSync(resolve(path), 'utf-8'));
  } catch (error) {
    throw new Error(`Unable to read ${label} from ${path}: ${error.message}`);
  }
}

function writeText(path, text) {
  const outputPath = resolve(path);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, text);
}

function defaultCurrentInputPaths(root = process.cwd()) {
  const apiReadinessJson = resolve(root, 'dist/api-readiness.json');
  const contentHealthJson = resolve(root, 'dist/content-health.json');
  return {
    apiReadinessJson: existsSync(apiReadinessJson) ? apiReadinessJson : null,
    contentHealthJson: existsSync(contentHealthJson) ? contentHealthJson : null
  };
}

function defaultHistoryDir(root = process.cwd()) {
  const historyDir = resolve(root, 'reports/readiness-history');
  return existsSync(historyDir) ? historyDir : null;
}

function currentAdoptionRatio(adoption = {}) {
  return optionalFiniteNumber(
    adoption.identified_ai_primary_to_discovery_current_ratio
      ?? adoption.identified_ai_primary_to_discovery_ratio
      ?? adoption.identified_ai_primary_to_discovery_target?.current_ratio
  );
}

function currentAdoptionStatus(adoption = {}) {
  return adoption.identified_ai_primary_to_discovery_target_status
    || adoption.identified_ai_primary_to_discovery_target?.status
    || adoption.status
    || 'not_measured';
}

function readinessGateById(apiReadiness = {}, id) {
  const gates = Array.isArray(apiReadiness.readiness_gates) ? apiReadiness.readiness_gates : [];
  return gates.find(gate => gate?.id === id) || null;
}

function publicAuditActionableFromApiReadiness(apiReadiness = {}) {
  const value = readinessGateById(apiReadiness, 'public_audit_14_day')?.current_actionable_count;
  return value === null || value === undefined ? null : optionalFiniteNumber(value);
}

function currentDesignPartnerStatus(apiReadiness = {}) {
  return apiReadiness.design_partner_signal?.status
    || readinessGateById(apiReadiness, 'design_partners')?.status
    || 'not_measured';
}

function currentExternalDesignPartnerCount(apiReadiness = {}) {
  const value = apiReadiness.design_partner_signal?.external_design_partner_count
    ?? readinessGateById(apiReadiness, 'design_partners')?.current_partner_count;
  return value === null || value === undefined ? null : optionalFiniteNumber(value);
}

function currentPaidIntentSignalCount(apiReadiness = {}) {
  const value = apiReadiness.design_partner_signal?.paid_intent_signal_count
    ?? readinessGateById(apiReadiness, 'design_partners')?.current_paid_intent_count;
  return value === null || value === undefined ? null : optionalFiniteNumber(value);
}

export function normalizeReadinessSnapshot(input = {}) {
  if (input.schema_version === READINESS_SNAPSHOT_SCHEMA_VERSION || input.production_integrity_status) {
    const generated = input.generated || new Date().toISOString();
    return {
      schema_version: READINESS_SNAPSHOT_SCHEMA_VERSION,
      generated,
      date: input.date || generatedDate(generated),
      source: input.source || 'history',
      production_integrity_status: input.production_integrity_status || 'not_measured',
      public_audit_actionable_count: optionalFiniteNumber(input.public_audit_actionable_count),
      api_context_ratio: optionalFiniteNumber(input.api_context_ratio),
      api_scorecard_failures: optionalFiniteNumber(input.api_scorecard_failures),
      adoption_ratio: optionalFiniteNumber(input.adoption_ratio),
      adoption_status: input.adoption_status || 'not_measured',
      design_partner_status: input.design_partner_status || 'not_measured',
      external_design_partner_count: optionalFiniteNumber(input.external_design_partner_count),
      paid_intent_signal_count: optionalFiniteNumber(input.paid_intent_signal_count),
      content_next_focus: input.content_next_focus || null
    };
  }

  const apiReadiness = input.apiReadiness || input.api_readiness || {};
  const contentHealth = input.contentHealth || input.content_health || {};
  const generated = apiReadiness.generated || contentHealth.generated || input.generated || new Date().toISOString();
  const adoption = apiReadiness.adoption_signal || {};
  const apiScorecard = apiReadiness.api_scorecard || {};

  return {
    schema_version: READINESS_SNAPSHOT_SCHEMA_VERSION,
    generated,
    date: generatedDate(generated),
    source: input.source || 'current',
    production_integrity_status: apiReadiness.production_health?.status || 'not_measured',
    public_audit_actionable_count: optionalFiniteNumber(
      contentHealth.public_audit?.actionable_count
        ?? contentHealth.project_readiness?.signals?.public_audit_actionable_count
        ?? publicAuditActionableFromApiReadiness(apiReadiness)
    ),
    api_context_ratio: optionalFiniteNumber(apiScorecard.pass_ratio),
    api_scorecard_failures: Array.isArray(apiScorecard.failures)
      ? apiScorecard.failures.length
      : optionalFiniteNumber(apiScorecard.failed),
    adoption_ratio: currentAdoptionRatio(adoption),
    adoption_status: currentAdoptionStatus(adoption),
    design_partner_status: currentDesignPartnerStatus(apiReadiness),
    external_design_partner_count: currentExternalDesignPartnerCount(apiReadiness),
    paid_intent_signal_count: currentPaidIntentSignalCount(apiReadiness),
    content_next_focus: contentHealth.project_readiness?.next_focus || null
  };
}

function walkJsonFiles(dir, files = []) {
  if (!dir || !existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) walkJsonFiles(fullPath, files);
    else if (/\.json$/i.test(entry)) files.push(fullPath);
  }
  return files;
}

export function loadReadinessSnapshotsFromDir(dir) {
  return walkJsonFiles(dir)
    .map(path => normalizeReadinessSnapshot({ ...readJson(path, 'readiness snapshot'), source: path.replace(/\\/g, '/') }));
}

function latestSnapshotByDate(snapshots) {
  const byDate = new Map();
  for (const snapshot of snapshots.map(item => normalizeReadinessSnapshot(item))) {
    const existing = byDate.get(snapshot.date);
    if (!existing || String(snapshot.generated).localeCompare(String(existing.generated)) >= 0) {
      byDate.set(snapshot.date, snapshot);
    }
  }
  return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
}

function evaluateConsecutiveWindow({ snapshots, requiredDays, predicate, latestDate = null }) {
  const byDate = new Map(latestSnapshotByDate(snapshots).map(snapshot => [snapshot.date, snapshot]));
  const latest = latestDate || [...byDate.keys()].sort().at(-1) || generatedDate();
  const failures = [];
  const days = [];

  for (let offset = requiredDays - 1; offset >= 0; offset--) {
    const date = dateOffset(latest, -offset);
    const snapshot = byDate.get(date) || null;
    const ok = Boolean(snapshot && predicate(snapshot));
    days.push({ date, ok });
    if (!ok) failures.push(date);
  }

  return {
    status: failures.length === 0 ? 'met' : 'not_met',
    required_days: requiredDays,
    observed_days: days.filter(day => day.ok).length,
    latest_date: latest,
    failures
  };
}

function adoptionWindowPredicate(targetRatio) {
  return snapshot => {
    const adoptionRatio = optionalFiniteNumber(snapshot.adoption_ratio);
    return adoptionRatio !== null
      && adoptionRatio >= targetRatio
      && !['below_target', 'fail', 'not_measured'].includes(snapshot.adoption_status);
  };
}

function contentChangePolicy(current, apiTargetRatio) {
  const triggers = [];
  const publicAuditActionableCount = optionalFiniteNumber(current.public_audit_actionable_count);
  if (publicAuditActionableCount !== null && publicAuditActionableCount > 0) {
    triggers.push('public_audit_actionable');
  }
  const apiScorecardFailures = optionalFiniteNumber(current.api_scorecard_failures);
  const apiContextRatio = optionalFiniteNumber(current.api_context_ratio);
  if ((apiScorecardFailures !== null && apiScorecardFailures > 0)
    || (apiContextRatio !== null && apiContextRatio < apiTargetRatio)) {
    triggers.push('api_scorecard_below_target');
  }
  if (current.content_next_focus === 'prioritize_draft_repair_queue') {
    triggers.push('content_health_draft_repair_queue');
  }

  if (triggers.some(trigger => ['public_audit_actionable', 'api_scorecard_below_target'].includes(trigger))) {
    return {
      status: 'repair_metric_regression',
      should_repair_content_now: true,
      triggers,
      guidance: 'Repair only the public audit or API readiness regression before expanding draft content.'
    };
  }

  if (triggers.includes('content_health_draft_repair_queue')) {
    return {
      status: 'targeted_content_repair',
      should_repair_content_now: true,
      triggers,
      guidance: 'Repair one or two low-risk drafts from the measured queue, then re-run public audit and readiness checks.'
    };
  }

  return {
    status: 'measure_first',
    should_repair_content_now: false,
    triggers,
    guidance: 'Do not expand the corpus by default; wait for eval, routing, production, or usage signals to identify a concrete gap.'
  };
}

function manualDesignPartnerGate(current) {
  const partnerCount = optionalFiniteNumber(current.external_design_partner_count);
  const paidIntentCount = optionalFiniteNumber(current.paid_intent_signal_count);
  return {
    target: '>=3 real external design partners and >=1 paid-intent signal',
    status: current.design_partner_status || 'not_measured',
    ...(partnerCount === null ? {} : { current_partner_count: partnerCount }),
    ...(paidIntentCount === null ? {} : { current_paid_intent_count: paidIntentCount })
  };
}

export function buildReadinessWindowReport({
  snapshots = [],
  generatedAt = new Date().toISOString(),
  productionIntegrityDays = 14,
  publicAuditDays = 14,
  adoptionDays = 7,
  apiTargetRatio = DEFAULT_API_TARGET_RATIO,
  adoptionTargetRatio = DEFAULT_ADOPTION_TARGET_RATIO
} = {}) {
  const normalized = latestSnapshotByDate(snapshots);
  const current = normalized.at(-1) || normalizeReadinessSnapshot({ generated: generatedAt });
  const latestDate = current.date;
  const gates = {
    production_integrity_14_day: evaluateConsecutiveWindow({
      snapshots: normalized,
      requiredDays: productionIntegrityDays,
      latestDate,
      predicate: snapshot => snapshot.production_integrity_status === 'pass'
    }),
    public_audit_14_day: evaluateConsecutiveWindow({
      snapshots: normalized,
      requiredDays: publicAuditDays,
      latestDate,
      predicate: snapshot => optionalFiniteNumber(snapshot.public_audit_actionable_count) === 0
    }),
    ai_primary_discovery_ratio_7_day: evaluateConsecutiveWindow({
      snapshots: normalized,
      requiredDays: adoptionDays,
      latestDate,
      predicate: adoptionWindowPredicate(adoptionTargetRatio)
    })
  };
  const manualGates = {
    design_partners: manualDesignPartnerGate(current)
  };

  return {
    schema_version: READINESS_WINDOW_SCHEMA_VERSION,
    generated: generatedAt,
    targets: {
      api_context_ratio: apiTargetRatio,
      ai_primary_discovery_ratio: adoptionTargetRatio,
      production_integrity_days: productionIntegrityDays,
      public_audit_days: publicAuditDays,
      adoption_days: adoptionDays
    },
    snapshot_count: normalized.length,
    current_snapshot: current,
    gates,
    manual_gates: manualGates,
    automated_gates_met: Object.values(gates).every(gate => gate.status === 'met'),
    content_change_policy: contentChangePolicy(current, apiTargetRatio),
    snapshots: normalized
  };
}

function signalText(value) {
  return value === null || value === undefined ? 'not_measured' : value;
}

function manualGateCurrentText(gate) {
  const parts = [];
  if (gate.current_partner_count !== undefined && gate.current_partner_count !== null) {
    parts.push(`current_partners=${gate.current_partner_count}`);
  }
  if (gate.current_paid_intent_count !== undefined && gate.current_paid_intent_count !== null) {
    parts.push(`current_paid_intent=${gate.current_paid_intent_count}`);
  }
  return parts.length ? `; ${parts.join('; ')}` : '';
}

export function renderReadinessWindowMarkdown(report) {
  const lines = [];
  lines.push('# AnchorFact Readiness Window Report');
  lines.push('');
  lines.push(`Generated: ${report.generated}`);
  lines.push(`Snapshots: ${report.snapshot_count}`);
  lines.push(`Current date: ${report.current_snapshot.date}`);
  lines.push('');
  lines.push('## Readiness Gates');
  lines.push('');
  for (const [id, gate] of Object.entries(report.gates)) {
    lines.push(`- ${id}: ${gate.status} (${gate.observed_days}/${gate.required_days} days, latest=${gate.latest_date})`);
  }
  lines.push('');
  lines.push('## Manual Gates');
  lines.push('');
  for (const [id, gate] of Object.entries(report.manual_gates || {})) {
    lines.push(`- ${id}: ${gate.status} (${gate.target}${manualGateCurrentText(gate)})`);
  }
  lines.push('');
  lines.push('## Current Signals');
  lines.push('');
  lines.push(`- production_integrity_status: ${report.current_snapshot.production_integrity_status}`);
  lines.push(`- public_audit_actionable_count: ${signalText(report.current_snapshot.public_audit_actionable_count)}`);
  lines.push(`- api_context_ratio: ${signalText(report.current_snapshot.api_context_ratio)}`);
  lines.push(`- api_scorecard_failures: ${signalText(report.current_snapshot.api_scorecard_failures)}`);
  lines.push(`- adoption_ratio: ${signalText(report.current_snapshot.adoption_ratio)}`);
  lines.push(`- adoption_status: ${report.current_snapshot.adoption_status}`);
  lines.push(`- design_partner_status: ${report.current_snapshot.design_partner_status}`);
  lines.push(`- external_design_partner_count: ${signalText(report.current_snapshot.external_design_partner_count)}`);
  lines.push(`- paid_intent_signal_count: ${signalText(report.current_snapshot.paid_intent_signal_count)}`);
  lines.push('');
  lines.push('## Content Change Policy');
  lines.push('');
  lines.push(`Content policy: ${report.content_change_policy.status}`);
  lines.push(`Should repair content now: ${report.content_change_policy.should_repair_content_now}`);
  lines.push(`Triggers: ${report.content_change_policy.triggers.join(', ') || 'none'}`);
  lines.push(report.content_change_policy.guidance);
  lines.push('');
  return `${lines.join('\n')}\n`;
}

function parseArgs(argv) {
  const options = {
    historyDir: null,
    apiReadinessJson: null,
    contentHealthJson: null,
    snapshotJson: null,
    saveCurrent: false,
    saveCurrentPath: null,
    write: null,
    writeJson: null,
    json: false,
    help: false
  };

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === '--history-dir') options.historyDir = argv[++index] || null;
    else if (arg === '--api-readiness-json') options.apiReadinessJson = argv[++index] || null;
    else if (arg === '--content-health-json') options.contentHealthJson = argv[++index] || null;
    else if (arg === '--snapshot-json') options.snapshotJson = argv[++index] || null;
    else if (arg === '--save-current') {
      options.saveCurrent = true;
      const next = argv[index + 1];
      if (next && !next.startsWith('--')) options.saveCurrentPath = argv[++index];
    } else if (arg === '--write') options.write = argv[++index] || null;
    else if (arg === '--write-json') options.writeJson = argv[++index] || null;
    else if (arg === '--json') options.json = true;
    else if (arg === '--help' || arg === '-h') options.help = true;
    else throw new Error(`Unknown option: ${arg}`);
  }
  return options;
}

function usage() {
  return `Usage: node scripts/readiness-window-report.js [--history-dir reports/readiness-history] [--api-readiness-json reports/api-readiness.json] [--content-health-json reports/content-health.json] [--snapshot-json path] [--save-current [path]] [--write path] [--write-json path] [--json]

Builds a report-only readiness window summary from daily readiness snapshots.
If no current snapshot or report paths are provided, dist/api-readiness.json and dist/content-health.json are used when present.
If no history directory is provided, reports/readiness-history is used when present.
`;
}

export function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  if (options.help) {
    process.stdout.write(usage());
    return null;
  }

  const activeHistoryDir = options.historyDir ? resolve(options.historyDir) : defaultHistoryDir();
  const snapshots = activeHistoryDir ? loadReadinessSnapshotsFromDir(activeHistoryDir) : [];
  let current = null;
  if (options.snapshotJson) current = normalizeReadinessSnapshot(readJson(options.snapshotJson, 'readiness snapshot'));
  else if (options.apiReadinessJson || options.contentHealthJson) {
    current = normalizeReadinessSnapshot({
      apiReadiness: options.apiReadinessJson ? readJson(options.apiReadinessJson, 'API readiness report') : {},
      contentHealth: options.contentHealthJson ? readJson(options.contentHealthJson, 'content health report') : {},
      source: 'current'
    });
  } else {
    const defaultInputs = defaultCurrentInputPaths();
    if (defaultInputs.apiReadinessJson || defaultInputs.contentHealthJson) {
      current = normalizeReadinessSnapshot({
        apiReadiness: defaultInputs.apiReadinessJson ? readJson(defaultInputs.apiReadinessJson, 'API readiness report') : {},
        contentHealth: defaultInputs.contentHealthJson ? readJson(defaultInputs.contentHealthJson, 'content health report') : {},
        source: 'dist'
      });
    }
  }

  if (current) {
    snapshots.push(current);
    if (options.saveCurrent) {
      const savePath = options.saveCurrentPath
        || join(activeHistoryDir || 'reports/readiness-history', `${current.date}.json`);
      writeText(savePath, `${JSON.stringify(current, null, 2)}\n`);
    }
  }

  const report = buildReadinessWindowReport({ snapshots });
  const json = `${JSON.stringify(report, null, 2)}\n`;
  const markdown = renderReadinessWindowMarkdown(report);
  if (options.write) writeText(options.write, markdown);
  if (options.writeJson) writeText(options.writeJson, json);
  process.stdout.write(options.json ? json : markdown);
  return report;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
