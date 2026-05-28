#!/usr/bin/env node
import { OFFICIAL_SITE } from '../src/lib/build-metadata.js';
import { verifyLiveProvenance } from '../src/lib/provenance-verify.js';

function usage() {
  return `Usage: node scripts/verify-live-provenance.js [base-url] [--allow-unofficial] [--skip-commit]

Verifies a live AnchorFact deployment by fetching /provenance.json, recomputing
core artifact checksums, checking public counts, and confirming the source commit.

Examples:
  npm run verify:provenance
  npm run verify:provenance -- https://anchorfact.org
  node scripts/verify-live-provenance.js https://example.com --allow-unofficial --skip-commit`;
}

function parseArgs(argv) {
  const options = {
    baseUrl: process.env.ANCHORFACT_BASE_URL || OFFICIAL_SITE,
    requireOfficial: true,
    verifyCommit: true
  };

  for (const arg of argv) {
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--allow-unofficial') {
      options.requireOfficial = false;
    } else if (arg === '--skip-commit') {
      options.verifyCommit = false;
    } else if (arg.startsWith('--')) {
      throw new Error(`Unknown option: ${arg}`);
    } else {
      options.baseUrl = arg;
    }
  }

  return options;
}

function printResult(result) {
  console.log(`AnchorFact provenance verification for ${result.baseUrl}`);
  console.log(`schema_version=${result.provenance.schema_version || '(missing)'}`);
  console.log(`official_build=${result.provenance.build?.official_build ?? '(missing)'}`);
  console.log(`builder=${result.provenance.build?.builder || '(missing)'}`);
  console.log(`commit_sha=${result.provenance.build?.commit_sha || '(missing)'}`);
  console.log(`public=${result.provenance.content_counts?.public ?? '(missing)'}`);
  console.log(`draft=${result.provenance.content_counts?.draft ?? '(missing)'}`);
  console.log(`claims=${result.provenance.content_counts?.claims ?? '(missing)'}`);

  for (const [key, artifact] of Object.entries(result.artifacts)) {
    console.log(`${key}=${artifact.ok ? 'ok' : 'fail'} ${artifact.path || ''} ${artifact.sha256 || ''}`.trim());
  }
  console.log(`commit=${result.commit.ok ? 'ok' : 'fail'}${result.commit.skipped ? ' skipped' : ''}`);
}

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error(usage());
    process.exitCode = 2;
    return;
  }

  if (options.help) {
    console.log(usage());
    return;
  }

  const result = await verifyLiveProvenance({
    baseUrl: options.baseUrl,
    requireOfficial: options.requireOfficial,
    verifyCommit: options.verifyCommit
  });

  printResult(result);
  if (!result.ok) {
    console.error('Provenance verification failed:');
    for (const failure of result.failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
