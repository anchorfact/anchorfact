#!/usr/bin/env node
import { mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import {
  OFFICIAL_SITE,
  OFFICIAL_SOURCE_REPOSITORY,
  artifactInfo,
  buildMetadataFromEnv
} from '../src/lib/build-metadata.js';

let passed = 0, failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ok ${name}`);
  } catch (e) {
    failed++;
    console.log(`  fail ${name}: ${e.message}`);
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

console.log('AnchorFact Build Metadata Tests\n');

test('local builds are not official by default', () => {
  const build = buildMetadataFromEnv({});
  assertEq(build.builder, 'local');
  assertEq(build.official_build, false);
  assertEq(build.canonical_site, OFFICIAL_SITE);
  assertEq(build.source_repository, OFFICIAL_SOURCE_REPOSITORY);
});

test('official builds require explicit canonical identity', () => {
  const official = buildMetadataFromEnv({
    ANCHORFACT_OFFICIAL_BUILD: 'true',
    ANCHORFACT_CANONICAL_SITE: OFFICIAL_SITE,
    ANCHORFACT_SOURCE_REPOSITORY: OFFICIAL_SOURCE_REPOSITORY,
    ANCHORFACT_COMMIT_SHA: 'abc123',
    ANCHORFACT_BRANCH: 'main'
  });
  assertEq(official.official_build, true);
  assertEq(official.commit_sha, 'abc123');
  assertEq(official.branch, 'main');

  const fork = buildMetadataFromEnv({
    ANCHORFACT_OFFICIAL_BUILD: 'true',
    ANCHORFACT_CANONICAL_SITE: 'https://example.com',
    ANCHORFACT_SOURCE_REPOSITORY: 'https://github.com/example/anchorfact'
  });
  assertEq(fork.official_build, false);
});

test('official Cloudflare Pages channel is recognized on main', () => {
  const build = buildMetadataFromEnv({
    CF_PAGES: '1',
    CF_PAGES_BRANCH: 'main',
    CF_PAGES_URL: 'https://6d75e698.anchorfact.pages.dev'
  });
  assertEq(build.builder, 'cloudflare-pages');
  assertEq(build.official_build, true);
  assertEq(build.build_id, 'https://6d75e698.anchorfact.pages.dev');

  const preview = buildMetadataFromEnv({
    CF_PAGES: '1',
    CF_PAGES_BRANCH: 'feature-branch',
    CF_PAGES_URL: 'https://preview.anchorfact.pages.dev'
  });
  assertEq(preview.official_build, false);

  const fork = buildMetadataFromEnv({
    CF_PAGES: '1',
    CF_PAGES_BRANCH: 'main',
    CF_PAGES_URL: 'https://hash.example.pages.dev'
  });
  assertEq(fork.official_build, false);
});

test('github repository shorthand is normalized', () => {
  const build = buildMetadataFromEnv({
    GITHUB_ACTIONS: 'true',
    GITHUB_REPOSITORY: 'example/anchorfact'
  });
  assertEq(build.builder, 'github-actions');
  assertEq(build.source_repository, 'https://github.com/example/anchorfact');
});

test('artifactInfo records checksum and byte size', () => {
  const dir = mkdtempSync(join(tmpdir(), 'anchorfact-provenance-'));
  try {
    writeFileSync(join(dir, 'artifact.txt'), 'AnchorFact\n');
    const artifact = artifactInfo(dir, 'artifact.txt');
    assertEq(artifact.path, '/artifact.txt');
    assert(/^[a-f0-9]{64}$/.test(artifact.sha256), 'sha256 should be hex');
    assert(artifact.bytes > 0, 'artifact should include bytes');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
