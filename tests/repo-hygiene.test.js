#!/usr/bin/env node
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import {
  collectFunctionEdgeImportFailures,
  textHygieneFailures
} from '../scripts/check-repo-hygiene.js';

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

function fixtureRoot(name) {
  const root = mkdtempSync(join(tmpdir(), `anchorfact-hygiene-${name}-`));
  mkdirSync(join(root, 'functions', 'api'), { recursive: true });
  mkdirSync(join(root, 'src', 'lib'), { recursive: true });
  return root;
}

console.log('AnchorFact Repository Hygiene Tests\n');

test('collectFunctionEdgeImportFailures accepts edge-safe function imports', () => {
  const root = fixtureRoot('safe');
  try {
    writeFileSync(join(root, 'functions', 'api', 'search.js'), "import { search } from '../../src/lib/search-api.js';\nexport function onRequestGet() { return search(); }\n");
    writeFileSync(join(root, 'src', 'lib', 'search-api.js'), "export function search() { return new Response('{}'); }\n");

    const failures = collectFunctionEdgeImportFailures({ rootDir: root });
    assertEq(failures, []);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('collectFunctionEdgeImportFailures rejects transitive Node-only imports from functions', () => {
  const root = fixtureRoot('node');
  try {
    writeFileSync(join(root, 'functions', 'api', 'plan.js'), "import { plan } from '../../src/lib/plan-api.js';\nexport function onRequestGet() { return plan(); }\n");
    writeFileSync(join(root, 'src', 'lib', 'plan-api.js'), "import { artifact } from './build-metadata.js';\nexport function plan() { return artifact(); }\n");
    writeFileSync(join(root, 'src', 'lib', 'build-metadata.js'), "import { createHash } from 'crypto';\nexport function artifact() { return createHash('sha256').digest('hex'); }\n");

    const failures = collectFunctionEdgeImportFailures({ rootDir: root });
    assert(failures.length === 1, 'expected one edge import failure');
    assert(failures[0].includes('functions/api/plan.js'), 'failure should include function entrypoint');
    assert(failures[0].includes('src/lib/build-metadata.js'), 'failure should include transitive module');
    assert(failures[0].includes('crypto'), 'failure should name the Node-only module');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('textHygieneFailures catches stale production claim metrics', () => {
  const failures = textHygieneFailures(
    'docs/SITE_MODULE_QUALITY_AUDIT_2026-05-28.md',
    'Published claims surface | 1543 claims from production smoke | Stable'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'stale claim count should fail hygiene');
});

test('textHygieneFailures accepts current production claim metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 578 public / 422 draft / 1764 claims.'
  );
  assertEq(failures, []);
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
