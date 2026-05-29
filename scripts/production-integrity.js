#!/usr/bin/env node
import { execFileSync } from 'child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { pathToFileURL } from 'url';
import { OFFICIAL_SITE } from '../src/lib/build-metadata.js';
import { verifyLiveProvenance } from '../src/lib/provenance-verify.js';
import { runAiEvals } from './run-ai-evals.js';

export const DEFAULT_EXPECTED_COUNTS = {
  public: 588,
  draft: 412,
  claims: 1804
};

export const DEFAULT_PUBLIC_KEY_PATH = 'keys/provenance.pub.pem';

function isoNow() {
  return new Date().toISOString();
}

function commandOutput(error, field) {
  const value = error?.[field];
  return Buffer.isBuffer(value) ? value.toString('utf8') : String(value || '');
}

export function runProductionSmoke({
  baseUrl = OFFICIAL_SITE,
  expectedCounts = DEFAULT_EXPECTED_COUNTS,
  execFile = execFileSync,
  env = process.env
} = {}) {
  const commandEnv = {
    ...env,
    ANCHORFACT_BASE_URL: baseUrl,
    EXPECTED_PUBLIC_ARTICLES: String(expectedCounts.public),
    EXPECTED_DRAFT_ARTICLES: String(expectedCounts.draft),
    EXPECTED_CLAIMS: String(expectedCounts.claims)
  };

  try {
    const stdout = execFile(process.execPath, ['src/smoke-production.js'], {
      encoding: 'utf8',
      env: commandEnv
    });
    return { ok: true, stdout, stderr: '' };
  } catch (error) {
    return {
      ok: false,
      stdout: commandOutput(error, 'stdout'),
      stderr: commandOutput(error, 'stderr') || error.message
    };
  }
}

export function buildIntegrityReport({
  generatedAt = isoNow(),
  baseUrl = OFFICIAL_SITE,
  expectedCounts = DEFAULT_EXPECTED_COUNTS,
  smoke,
  provenance,
  aiEvals
}) {
  const failures = [];
  if (!smoke?.ok) failures.push('Production smoke failed');
  if (!provenance?.ok) failures.push('Signed provenance verification failed');
  if (!aiEvals?.ok) failures.push('AI evals failed');
  for (const failure of provenance?.failures || []) failures.push(failure);
  for (const failure of aiEvals?.failures || []) failures.push(failure);
  for (const result of aiEvals?.results || []) {
    for (const failure of result.failures || []) failures.push(`${result.id}: ${failure}`);
  }

  const artifactHashes = {};
  for (const [key, artifact] of Object.entries(provenance?.artifacts || {})) {
    artifactHashes[key] = artifact.sha256 || null;
  }

  return {
    generated: generatedAt,
    ok: failures.length === 0,
    base_url: baseUrl,
    expected_counts: expectedCounts,
    counts: {
      public: provenance?.provenance?.content_counts?.public ?? null,
      draft: provenance?.provenance?.content_counts?.draft ?? null,
      claims: provenance?.provenance?.content_counts?.claims ?? null
    },
    commit_sha: provenance?.provenance?.build?.commit_sha || null,
    signature: {
      status: provenance?.signature?.status || null,
      ok: provenance?.signature?.ok === true,
      trusted: provenance?.signature?.trusted === true,
      key_id: provenance?.signature?.key_id || provenance?.provenance?.signature?.key_id || null,
      public_key_sha256: provenance?.signature?.public_key_sha256 || provenance?.provenance?.signature?.public_key_sha256 || null
    },
    artifacts: artifactHashes,
    checks: {
      smoke: smoke?.ok === true,
      ai_evals: aiEvals?.ok === true,
      signed_provenance: provenance?.ok === true,
      commit: provenance?.commit?.ok === true
    },
    ai_evals: {
      eval_count: aiEvals?.eval_count ?? null,
      passed: aiEvals?.passed ?? null,
      failed: aiEvals?.failed ?? null
    },
    failures,
    smoke_stdout: smoke?.ok ? '' : (smoke?.stdout || ''),
    smoke_stderr: smoke?.ok ? '' : (smoke?.stderr || '')
  };
}

export function renderIntegrityMarkdown(report) {
  const artifacts = Object.entries(report.artifacts || {})
    .map(([name, sha]) => `- ${name}: ${sha || '(missing)'}`)
    .join('\n') || '- none';
  const failures = report.failures.length
    ? report.failures.map(failure => `- ${failure}`).join('\n')
    : '- none';

  return `# AnchorFact Production Integrity - ${report.ok ? 'PASS' : 'FAIL'}

Generated: ${report.generated}

Base URL: ${report.base_url}

## Summary

- status: ${report.ok ? 'pass' : 'fail'}
- commit: ${report.commit_sha || '(missing)'}
- counts: ${report.counts.public} public / ${report.counts.draft} draft / ${report.counts.claims} claims
- expected: ${report.expected_counts.public} public / ${report.expected_counts.draft} draft / ${report.expected_counts.claims} claims
- signature: status=${report.signature.status || '(missing)'}, ok=${report.signature.ok}, trusted=${report.signature.trusted}
- public key sha256: ${report.signature.public_key_sha256 || '(missing)'}

## Checks

- smoke: ${report.checks.smoke ? 'pass' : 'fail'}
- AI evals: ${report.checks.ai_evals ? 'pass' : 'fail'} (${report.ai_evals.passed ?? 0}/${report.ai_evals.eval_count ?? 0})
- signed provenance: ${report.checks.signed_provenance ? 'pass' : 'fail'}
- source commit: ${report.checks.commit ? 'pass' : 'fail'}

## Artifact Hashes

${artifacts}

## Failures

${failures}
`;
}

function parseArgs(argv) {
  const options = {
    baseUrl: process.env.ANCHORFACT_BASE_URL || OFFICIAL_SITE,
    publicKeyPath: DEFAULT_PUBLIC_KEY_PATH,
    expectedCounts: { ...DEFAULT_EXPECTED_COUNTS },
    json: false,
    write: null,
    writeJson: null
  };

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === '--json') options.json = true;
    else if (arg === '--base-url') options.baseUrl = argv[++index];
    else if (arg === '--public-key') options.publicKeyPath = argv[++index];
    else if (arg === '--write') options.write = argv[++index];
    else if (arg === '--write-json') options.writeJson = argv[++index];
    else if (arg === '--expected-public') options.expectedCounts.public = Number.parseInt(argv[++index], 10);
    else if (arg === '--expected-draft') options.expectedCounts.draft = Number.parseInt(argv[++index], 10);
    else if (arg === '--expected-claims') options.expectedCounts.claims = Number.parseInt(argv[++index], 10);
    else throw new Error(`Unknown option: ${arg}`);
  }

  return options;
}

function writeReport(path, content) {
  const outputPath = resolve(path);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, content);
}

export async function runProductionIntegrity({
  baseUrl = OFFICIAL_SITE,
  publicKeyPath = DEFAULT_PUBLIC_KEY_PATH,
  expectedCounts = DEFAULT_EXPECTED_COUNTS,
  smokeRunner = runProductionSmoke,
  evalRunner = runAiEvals,
  verifier = verifyLiveProvenance,
  generatedAt = isoNow()
} = {}) {
  const smoke = smokeRunner({ baseUrl, expectedCounts });
  const aiEvals = await evalRunner({ baseUrl });
  const trustedPublicKeys = [readFileSync(publicKeyPath, 'utf8')];
  const provenance = await verifier({
    baseUrl,
    requireSignature: true,
    requireTrustedSignature: true,
    trustedPublicKeys
  });

  return buildIntegrityReport({
    generatedAt,
    baseUrl,
    expectedCounts,
    smoke,
    provenance,
    aiEvals
  });
}

export async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const report = await runProductionIntegrity(options);
  const markdown = renderIntegrityMarkdown(report);
  const json = JSON.stringify(report, null, 2);

  if (options.write) writeReport(options.write, markdown);
  if (options.writeJson) writeReport(options.writeJson, json);

  console.log(options.json ? json : markdown);
  if (!report.ok) process.exitCode = 1;
  return report;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
