#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { pathToFileURL } from 'url';
import {
  buildApiReadinessReport,
  renderApiReadinessMarkdown
} from '../src/lib/api-readiness.js';
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
  return `Usage: node scripts/api-readiness-report.js [--dist dist] [--json] [--write path] [--write-json path] [--adoption-json path] [--production-integrity-json path] [--runs n] [--warmups n] [--skip-performance]

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
    productionIntegrity: options.productionIntegrity || null
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
      : normalizeProductionIntegrity(options.productionIntegrity) || null
  });
  const json = `${JSON.stringify(report, null, 2)}\n`;
  const markdown = renderApiReadinessMarkdown(report);

  if (options.write) writeOutput(options.write, markdown);
  if (options.writeJson) writeOutput(options.writeJson, json);
  process.stdout.write(options.json ? json : markdown);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
