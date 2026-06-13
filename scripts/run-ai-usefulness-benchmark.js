#!/usr/bin/env node
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import {
  buildAiUsefulnessBenchmarkReport,
  renderAiUsefulnessBenchmarkMarkdown
} from '../src/lib/ai-usefulness-benchmark.js';
import { isDirectRun } from '../src/lib/cli-entrypoint.js';

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function requiredJson(distDir, fileName) {
  const path = resolve(distDir, fileName);
  if (!existsSync(path)) {
    throw new Error(`Missing ${fileName}; run npm run build before npm run benchmark:ai.`);
  }
  return readJson(path);
}

function loadArtifacts(distDir) {
  return {
    manifest: requiredJson(distDir, 'manifest.json'),
    claimsPayload: requiredJson(distDir, 'claims.json'),
    sourcesPayload: requiredJson(distDir, 'sources.json'),
    searchIndex: requiredJson(distDir, 'search-index.json'),
    topicsPayload: requiredJson(distDir, 'topics.json'),
    coveragePayload: requiredJson(distDir, 'coverage.json'),
    capabilitiesPayload: requiredJson(distDir, 'capabilities.json'),
    contentHealthPayload: requiredJson(distDir, 'content-health.json')
  };
}

function parseArgs(argv) {
  const options = {
    dist: 'dist',
    json: false,
    minScore: undefined
  };

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === '--json') options.json = true;
    else if (arg === '--dist') options.dist = argv[++index];
    else if (arg === '--min-score') options.minScore = Number(argv[++index]);
    else throw new Error(`Unknown option: ${arg}`);
  }

  return options;
}

export function runAiUsefulnessBenchmark(options = {}) {
  const distDir = resolve(options.dist || 'dist');
  return buildAiUsefulnessBenchmarkReport({
    artifacts: loadArtifacts(distDir),
    minScore: Number.isFinite(options.minScore) ? options.minScore : undefined
  });
}

export function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const report = runAiUsefulnessBenchmark(options);
  console.log(options.json ? JSON.stringify(report, null, 2) : renderAiUsefulnessBenchmarkMarkdown(report));
  if (!report.ok) process.exitCode = 1;
  return report;
}

if (isDirectRun(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
