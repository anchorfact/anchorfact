#!/usr/bin/env node
import { readFileSync } from 'fs';
import { OFFICIAL_SITE } from '../src/lib/build-metadata.js';
import { verifyLiveProvenance } from '../src/lib/provenance-verify.js';
import { trustedPublicKeysFromEnv } from '../src/lib/provenance-signature.js';

function usage() {
  return `Usage: node scripts/verify-live-provenance.js [base-url] [--allow-unofficial] [--skip-commit]
                                             [--require-signature] [--require-trusted-signature]
                                             [--public-key path]

Verifies a live AnchorFact deployment by fetching /provenance.json, recomputing
core artifact checksums, checking public counts, and confirming the source commit.

Examples:
  npm run verify:provenance
  npm run verify:provenance -- https://anchorfact.org
  node scripts/verify-live-provenance.js https://example.com --allow-unofficial --skip-commit
  node scripts/verify-live-provenance.js --require-trusted-signature --public-key keys/provenance.pub.pem`;
}

function parseArgs(argv) {
  const options = {
    baseUrl: process.env.ANCHORFACT_BASE_URL || OFFICIAL_SITE,
    requireOfficial: true,
    verifyCommit: true,
    requireSignature: false,
    requireTrustedSignature: false,
    publicKeyPaths: []
  };

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--allow-unofficial') {
      options.requireOfficial = false;
    } else if (arg === '--skip-commit') {
      options.verifyCommit = false;
    } else if (arg === '--require-signature') {
      options.requireSignature = true;
    } else if (arg === '--require-trusted-signature') {
      options.requireSignature = true;
      options.requireTrustedSignature = true;
    } else if (arg === '--public-key') {
      const path = argv[index + 1];
      if (!path || path.startsWith('--')) {
        throw new Error('--public-key requires a path argument');
      }
      options.publicKeyPaths.push(path);
      index++;
    } else if (arg.startsWith('--')) {
      throw new Error(`Unknown option: ${arg}`);
    } else {
      options.baseUrl = arg;
    }
  }

  return options;
}

function loadTrustedPublicKeys(options) {
  return [
    ...trustedPublicKeysFromEnv(process.env),
    ...options.publicKeyPaths.map(path => readFileSync(path, 'utf8'))
  ];
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
  console.log(`signature=${result.signature.ok ? 'ok' : 'fail'} status=${result.signature.status || 'unknown'} trusted=${result.signature.trusted === true}`);

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
    verifyCommit: options.verifyCommit,
    requireSignature: options.requireSignature,
    requireTrustedSignature: options.requireTrustedSignature,
    trustedPublicKeys: loadTrustedPublicKeys(options)
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
