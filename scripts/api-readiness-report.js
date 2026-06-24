#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import {
  buildApiReadinessReport,
  renderApiReadinessMarkdown
} from '../src/lib/api-readiness.js';
import { isDirectRun } from '../src/lib/cli-entrypoint.js';
import {
  buildApiPerformanceReport,
  evaluateArtifactSizeBudgets,
  loadApiPerformanceArtifacts,
  loadArtifactSizes
} from './check-api-performance.js';

const DEFAULT_DIST_DIR = 'dist';
const DEFAULT_RUNS = 10;
const DEFAULT_WARMUPS = 2;

function parseArgs(argv) {
  const options = {
    distDir: DEFAULT_DIST_DIR,
    json: false,
    write: null,
    writeJson: null,
    adoptionJson: null,
    productionIntegrityJson: null,
    designPartnersJson: null,
    runs: DEFAULT_RUNS,
    warmups: DEFAULT_WARMUPS,
    skipPerformance: false
  };

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === '--dist') {
      options.distDir = argv[++index] || options.distDir;
    } else if (arg === '--json') {
      options.json = true;
    } else if (arg === '--write') {
      options.write = argv[++index] || null;
    } else if (arg === '--write-json') {
      options.writeJson = argv[++index] || null;
    } else if (arg === '--adoption-json') {
      options.adoptionJson = argv[++index] || null;
    } else if (arg === '--production-integrity-json') {
      options.productionIntegrityJson = argv[++index] || null;
    } else if (arg === '--design-partners-json') {
      options.designPartnersJson = argv[++index] || null;
    } else if (arg === '--runs') {
      options.runs = Number.parseInt(argv[++index], 10);
    } else if (arg === '--warmups') {
      options.warmups = Number.parseInt(argv[++index], 10);
    } else if (arg === '--skip-performance') {
      options.skipPerformance = true;
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!Number.isInteger(options.runs) || options.runs < 1) {
    throw new Error('--runs must be a positive integer.');
  }
  if (!Number.isInteger(options.warmups) || options.warmups < 0) {
    throw new Error('--warmups must be a non-negative integer.');
  }
  return options;
}

function usage() {
  return `Usage: node scripts/api-readiness-report.js [--dist dist] [--json] [--write path] [--write-json path] [--adoption-json path] [--production-integrity-json path] [--design-partners-json path] [--runs n] [--warmups n] [--skip-performance]

Builds a report-only API subscription readiness scorecard. Low readiness does not fail CI; missing artifacts or invalid arguments still fail.
`;
}

function writeOutput(path, content) {
  const out = resolve(path);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, content);
}

function finiteNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function adoptionTargetStatus({ suppliedStatus, discoveryRequests, currentRatio, targetRatio }) {
  if (suppliedStatus) return suppliedStatus;
  if (Number(discoveryRequests || 0) === 0) return 'no_ai_discovery';
  return Number(currentRatio || 0) >= Number(targetRatio || 0) ? 'met' : 'below_target';
}

function readJsonFile(path, label) {
  try {
    return JSON.parse(readFileSync(resolve(path), 'utf-8'));
  } catch (error) {
    throw new Error(`Unable to read ${label} JSON from ${path}: ${error.message}`);
  }
}

export function readOptionalRuntimeJson(path, label) {
  if (!path || !existsSync(resolve(path))) return null;
  return readJsonFile(path, label);
}

export function normalizeAdoptionScorecard(payload) {
  if (!payload || typeof payload !== 'object') return null;
  const scorecard = payload.adoption_scorecard && typeof payload.adoption_scorecard === 'object'
    ? payload.adoption_scorecard
    : payload;
  const target = scorecard.identified_ai_primary_to_discovery_target || {};
  const currentRatio = finiteNumber(
    scorecard.identified_ai_primary_to_discovery_current_ratio
      ?? scorecard.identified_ai_primary_to_discovery_ratio
      ?? target.current_ratio
  );
  const targetRatio = finiteNumber(
    scorecard.identified_ai_primary_to_discovery_target_ratio
      ?? target.target_ratio,
    0.2
  );
  const gapToTarget = finiteNumber(
    scorecard.identified_ai_primary_to_discovery_gap_to_target
      ?? target.gap_to_target,
    Math.max(0, targetRatio - currentRatio)
  );
  const status = scorecard.identified_ai_primary_to_discovery_target_status
    || target.status
    || 'not_measured_in_this_report';
  const interactiveTarget = scorecard.interactive_ai_primary_to_discovery_target || {};
  const interactiveAiDiscoveryRequests = finiteNumber(scorecard.interactive_ai_discovery_requests);
  const interactiveAiPrimaryApiRequests = finiteNumber(scorecard.interactive_ai_primary_api_requests);
  const interactiveCurrentRatio = finiteNumber(
    scorecard.interactive_ai_primary_to_discovery_current_ratio
      ?? scorecard.interactive_ai_primary_to_discovery_ratio
      ?? interactiveTarget.current_ratio
  );
  const interactiveTargetRatio = finiteNumber(
    scorecard.interactive_ai_primary_to_discovery_target_ratio
      ?? interactiveTarget.target_ratio,
    targetRatio
  );
  const interactiveGapToTarget = finiteNumber(
    scorecard.interactive_ai_primary_to_discovery_gap_to_target
      ?? interactiveTarget.gap_to_target,
    Math.max(0, interactiveTargetRatio - interactiveCurrentRatio)
  );
  const hasInteractiveAiSignal = interactiveAiDiscoveryRequests > 0
    || interactiveAiPrimaryApiRequests > 0
    || scorecard.interactive_ai_primary_to_discovery_ratio !== undefined
    || scorecard.interactive_ai_primary_to_discovery_current_ratio !== undefined
    || interactiveTarget.status !== undefined;
  const interactiveStatus = adoptionTargetStatus({
    suppliedStatus: scorecard.interactive_ai_primary_to_discovery_target_status || interactiveTarget.status,
    discoveryRequests: interactiveAiDiscoveryRequests,
    currentRatio: interactiveCurrentRatio,
    targetRatio: interactiveTargetRatio
  });
  const crawlerAiDiscoveryRequests = finiteNumber(scorecard.crawler_ai_discovery_requests);
  const crawlerAiPrimaryApiRequests = finiteNumber(scorecard.crawler_ai_primary_api_requests);
  const crawlerCurrentRatio = finiteNumber(scorecard.crawler_ai_primary_to_discovery_ratio);
  const readinessScope = hasInteractiveAiSignal ? 'interactive_ai' : 'identified_ai';
  const readinessCurrentRatio = hasInteractiveAiSignal ? interactiveCurrentRatio : currentRatio;
  const readinessStatus = hasInteractiveAiSignal ? interactiveStatus : status;

  return {
    ...scorecard,
    status,
    window: scorecard.window || payload.window || null,
    source: scorecard.source || payload.source || null,
    discovery_entrypoint_requests: finiteNumber(scorecard.discovery_entrypoint_requests),
    primary_api_requests: finiteNumber(scorecard.primary_api_requests),
    identified_ai_requests: finiteNumber(scorecard.identified_ai_requests),
    identified_ai_discovery_requests: finiteNumber(scorecard.identified_ai_discovery_requests),
    identified_ai_primary_api_requests: finiteNumber(scorecard.identified_ai_primary_api_requests),
    identified_ai_api_access_page_requests: finiteNumber(scorecard.identified_ai_api_access_page_requests),
    identified_ai_developer_docs_requests: finiteNumber(scorecard.identified_ai_developer_docs_requests),
    identified_ai_core_api_requests: finiteNumber(scorecard.identified_ai_core_api_requests),
    identified_ai_primary_to_discovery_ratio: currentRatio,
    identified_ai_primary_to_discovery_target_ratio: targetRatio,
    identified_ai_primary_to_discovery_current_ratio: currentRatio,
    identified_ai_primary_to_discovery_gap_to_target: gapToTarget,
    identified_ai_primary_to_discovery_target_status: status,
    identified_ai_primary_to_discovery_target: {
      target_ratio: targetRatio,
      current_ratio: currentRatio,
      gap_to_target: gapToTarget,
      status
    },
    interactive_ai_discovery_requests: interactiveAiDiscoveryRequests,
    interactive_ai_primary_api_requests: interactiveAiPrimaryApiRequests,
    interactive_ai_api_access_page_requests: finiteNumber(scorecard.interactive_ai_api_access_page_requests),
    interactive_ai_developer_docs_requests: finiteNumber(scorecard.interactive_ai_developer_docs_requests),
    interactive_ai_core_api_requests: finiteNumber(scorecard.interactive_ai_core_api_requests),
    interactive_ai_primary_to_discovery_ratio: interactiveCurrentRatio,
    interactive_ai_primary_to_discovery_target_ratio: interactiveTargetRatio,
    interactive_ai_primary_to_discovery_current_ratio: interactiveCurrentRatio,
    interactive_ai_primary_to_discovery_gap_to_target: interactiveGapToTarget,
    interactive_ai_primary_to_discovery_target_status: interactiveStatus,
    interactive_ai_primary_to_discovery_target: {
      target_ratio: interactiveTargetRatio,
      current_ratio: interactiveCurrentRatio,
      gap_to_target: interactiveGapToTarget,
      status: interactiveStatus
    },
    crawler_ai_discovery_requests: crawlerAiDiscoveryRequests,
    crawler_ai_primary_api_requests: crawlerAiPrimaryApiRequests,
    crawler_ai_developer_docs_requests: finiteNumber(scorecard.crawler_ai_developer_docs_requests),
    crawler_ai_core_api_requests: finiteNumber(scorecard.crawler_ai_core_api_requests),
    crawler_ai_primary_to_discovery_ratio: crawlerCurrentRatio,
    readiness_ai_adoption_scope: readinessScope,
    readiness_ai_primary_to_discovery_current_ratio: readinessCurrentRatio,
    readiness_ai_primary_to_discovery_target_status: readinessStatus,
    bot_route_5xx_or_522_requests: finiteNumber(scorecard.bot_route_5xx_or_522_requests),
    scanner_or_probe_requests: finiteNumber(scorecard.scanner_or_probe_requests),
    scanner_or_probe_share: finiteNumber(scorecard.scanner_or_probe_share)
  };
}

export function normalizeProductionIntegrity(payload) {
  if (!payload || typeof payload !== 'object') return null;
  return {
    ...payload,
    status: payload.status || (payload.ok === true ? 'pass' : payload.ok === false ? 'fail' : 'not_measured_in_this_report')
  };
}

function countExternalDesignPartners(signal = {}) {
  if (!Array.isArray(signal.partners)) return null;
  return signal.partners.filter(partner => partner && partner.external !== false && partner.disqualified !== true).length;
}

function countPaidIntentSignals(signal = {}) {
  if (!Array.isArray(signal.paid_intent_signals)) return null;
  return signal.paid_intent_signals.filter(item => item && item.disqualified !== true).length;
}

export function normalizeDesignPartnerSignal(payload) {
  if (!payload || typeof payload !== 'object') return null;
  const signal = payload.design_partner_signal && typeof payload.design_partner_signal === 'object'
    ? payload.design_partner_signal
    : payload.designPartnerSignal && typeof payload.designPartnerSignal === 'object'
      ? payload.designPartnerSignal
      : payload;
  const requiredPartnerCount = Math.max(
    3,
    finiteNumber(
      signal.required_external_design_partner_count
        ?? signal.required_partner_count
        ?? signal.target_partner_count,
      3
    )
  );
  const requiredPaidIntentCount = Math.max(
    1,
    finiteNumber(
      signal.required_paid_intent_signal_count
        ?? signal.required_paid_intent_count
        ?? signal.target_paid_intent_count,
      1
    )
  );
  const externalDesignPartnerCount = finiteNumber(
    signal.external_design_partner_count
      ?? signal.external_design_partners
      ?? signal.partner_count
      ?? countExternalDesignPartners(signal)
  );
  const paidIntentSignalCount = finiteNumber(
    signal.paid_intent_signal_count
      ?? signal.paid_intent_signals_count
      ?? signal.paid_intent_count
      ?? countPaidIntentSignals(signal)
  );
  const countsMeetTarget = externalDesignPartnerCount >= requiredPartnerCount
    && paidIntentSignalCount >= requiredPaidIntentCount;
  const suppliedStatus = signal.status || null;
  const status = suppliedStatus === 'met' && !countsMeetTarget
    ? 'below_target'
    : suppliedStatus || (countsMeetTarget ? 'met' : 'below_target');

  return {
    status,
    external_design_partner_count: externalDesignPartnerCount,
    required_external_design_partner_count: requiredPartnerCount,
    paid_intent_signal_count: paidIntentSignalCount,
    required_paid_intent_signal_count: requiredPaidIntentCount
  };
}

export function buildLocalApiReadinessReport(options = {}) {
  const distDir = options.distDir || DEFAULT_DIST_DIR;
  const generatedAt = options.generatedAt || new Date().toISOString();
  const artifacts = loadApiPerformanceArtifacts(distDir);
  const artifactSizes = loadArtifactSizes(distDir);
  const artifactSizeBudget = evaluateArtifactSizeBudgets(artifactSizes);
  const apiPerformanceReport = options.skipPerformance
    ? null
    : buildApiPerformanceReport({
        artifacts,
        artifactSizeBudget,
        runs: options.runs || DEFAULT_RUNS,
        warmups: options.warmups ?? DEFAULT_WARMUPS,
        generatedAt
      });

  return buildApiReadinessReport({
    artifacts,
    apiPerformanceReport,
    generatedAt,
    adoptionScorecard: options.adoptionScorecard || null,
    productionIntegrity: options.productionIntegrity || null,
    designPartnerSignal: options.designPartnerSignal || null
  });
}

export function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  if (options.help) {
    process.stdout.write(usage());
    return;
  }

  const report = buildLocalApiReadinessReport({
    ...options,
    adoptionScorecard: options.adoptionJson
      ? normalizeAdoptionScorecard(readOptionalRuntimeJson(options.adoptionJson, 'adoption scorecard'))
      : normalizeAdoptionScorecard(options.adoptionScorecard) || null,
    productionIntegrity: options.productionIntegrityJson
      ? normalizeProductionIntegrity(readOptionalRuntimeJson(options.productionIntegrityJson, 'production integrity'))
      : normalizeProductionIntegrity(options.productionIntegrity) || null,
    designPartnerSignal: options.designPartnersJson
      ? normalizeDesignPartnerSignal(readOptionalRuntimeJson(options.designPartnersJson, 'design partners'))
      : normalizeDesignPartnerSignal(options.designPartnerSignal) || null
  });
  const json = `${JSON.stringify(report, null, 2)}\n`;
  const markdown = renderApiReadinessMarkdown(report);

  if (options.write) writeOutput(options.write, markdown);
  if (options.writeJson) writeOutput(options.writeJson, json);
  process.stdout.write(options.json ? json : markdown);
}

if (isDirectRun(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
