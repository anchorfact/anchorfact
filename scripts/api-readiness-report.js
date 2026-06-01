#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'fs';
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
  return `Usage: node scripts/api-readiness-report.js [--dist dist] [--json] [--write path] [--write-json path] [--runs n] [--warmups n] [--skip-performance]

Builds a report-only API subscription readiness scorecard. Low readiness does not fail CI; missing artifacts or invalid arguments still fail.
`;
}

function writeOutput(path, content) {
  const out = resolve(path);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, content);
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

  const report = buildLocalApiReadinessReport(options);
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
