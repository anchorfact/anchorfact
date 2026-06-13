#!/usr/bin/env node
import { execFileSync } from 'child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import {
  collectFunctionEdgeImportFailures,
  collectUnsafeCliEntrypointFailures,
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

test('CLI modules can be imported from inline module tools', () => {
  const importableCliModules = [
    './scripts/api-readiness-report.js',
    './scripts/audit-public-sample.js',
    './scripts/check-api-performance.js',
    './scripts/check-mcp-local.js',
    './scripts/check-public-audit.js',
    './scripts/check-repo-hygiene.js',
    './scripts/cloudflare-usage-report.js',
    './scripts/content-health-report.js',
    './scripts/production-integrity.js',
    './scripts/readiness-window-report.js',
    './scripts/run-ai-evals.js',
    './scripts/run-ai-usefulness-benchmark.js',
    './src/smoke-production.js'
  ];
  const inlineScript = `
    const modules = ${JSON.stringify(importableCliModules)};
    for (const modulePath of modules) {
      await import(modulePath);
    }
    console.log('cli imports ok');
  `;
  const output = execFileSync('node', ['--input-type=module', '-e', inlineScript], { encoding: 'utf8' });
  assert(output.includes('cli imports ok'), 'inline CLI module imports should complete');
});

test('collectUnsafeCliEntrypointFailures rejects unsafe process argv direct-run guards', () => {
  const root = fixtureRoot('cli-entrypoint');
  try {
    mkdirSync(join(root, 'scripts'), { recursive: true });
    writeFileSync(join(root, 'scripts', 'unsafe.js'), [
      "import { pathToFileURL } from 'url';",
      "if (import.meta.url === pathToFileURL(process.argv[1]).href) main();"
    ].join('\n'));
    writeFileSync(join(root, 'scripts', 'safe.js'), [
      "import { isDirectRun } from '../src/lib/cli-entrypoint.js';",
      "if (isDirectRun(import.meta.url)) main();"
    ].join('\n'));

    const failures = collectUnsafeCliEntrypointFailures({ rootDir: root });
    assert(failures.length === 1, 'expected one unsafe CLI entrypoint failure');
    assert(failures[0].includes('scripts/unsafe.js'), 'failure should include unsafe script path');
    assert(failures[0].includes('isDirectRun(import.meta.url)'), 'failure should name the safe helper');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

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
    'Snapshot: 1329 public / 299 draft / 4226 claims.'
  );
  assertEq(failures, []);
});

test('textHygieneFailures catches previous greek-mythology repair snapshot metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 1328 public / 300 draft / 4224 claims.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'previous production snapshot should fail hygiene');
});

test('textHygieneFailures catches previous kubernetes-oauth-snowflake snapshot metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 1265 public / 300 draft / 3955 claims.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'previous production snapshot should fail hygiene');
});

test('textHygieneFailures catches previous object-storage-and-spark snapshot metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 1261 public / 300 draft / 3943 claims.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'previous production snapshot should fail hygiene');
});

test('textHygieneFailures catches previous api-rate-limit and edge snapshot metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 1257 public / 300 draft / 3931 claims.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'previous production snapshot should fail hygiene');
});

test('textHygieneFailures catches previous agent-command-and-dbt snapshot metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 1253 public / 300 draft / 3919 claims.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'previous production snapshot should fail hygiene');
});

test('textHygieneFailures catches previous agent-runtime diagnostics snapshot metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 1249 public / 300 draft / 3907 claims.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'previous production snapshot should fail hygiene');
});

test('textHygieneFailures catches previous agent-browser snapshot metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 1243 public / 300 draft / 3889 claims.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'previous production snapshot should fail hygiene');
});

test('textHygieneFailures catches previous agent-readiness snapshot metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 1235 public / 300 draft / 3865 claims.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'previous production snapshot should fail hygiene');
});

test('textHygieneFailures catches previous agent-data snapshot metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 1229 public / 300 draft / 3847 claims.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'previous production snapshot should fail hygiene');
});

test('textHygieneFailures catches prior tool-output snapshot metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 1223 public / 300 draft / 3829 claims.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'prior production snapshot should fail hygiene');
});

test('textHygieneFailures catches prior agent-runtime retrieval snapshot metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 1202 public / 300 draft / 3766 claims.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'prior production snapshot should fail hygiene');
});

test('textHygieneFailures catches prior agent-retrieval snapshot metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 1194 public / 300 draft / 3742 claims.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'prior production snapshot should fail hygiene');
});

test('textHygieneFailures catches prior retrieval-data snapshot metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 1184 public / 300 draft / 3708 claims.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'prior production snapshot should fail hygiene');
});

test('textHygieneFailures catches prior code-intelligence snapshot metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 1174 public / 300 draft / 3678 claims.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'prior production snapshot should fail hygiene');
});

test('textHygieneFailures catches prior agent-corpus snapshot metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 696 public / 310 draft / 2224 claims.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'prior production snapshot should fail hygiene');
});

test('textHygieneFailures catches older agent-corpus snapshot metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 690 public / 310 draft / 2205 claims.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'prior agent-corpus snapshot should fail hygiene');
});

test('textHygieneFailures ignores historical repair log metrics', () => {
  const failures = textHygieneFailures(
    'docs/PUBLIC_CONTENT_REPAIR_2026-06-01-77.md',
    'Local rebuilt counts: 633 public / 367 draft / 1948 claims.'
  );
  assertEq(failures, []);
});

test('textHygieneFailures catches previous production snapshot metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 688 public / 312 draft / 2201 claims.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'previous snapshot should fail hygiene');
});

test('textHygieneFailures catches older production snapshot metrics', () => {
  const failures = textHygieneFailures(
    'docs/LAUNCH_READINESS_2026-05-27.md',
    'Snapshot: 648 public / 352 draft / 2001 claims.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'previous snapshot should fail hygiene');
});

test('textHygieneFailures catches stale MCP tool-count narrative', () => {
  const failures = textHygieneFailures(
    'docs/TECHNICAL_BLOG.md',
    'The server provides four tools:'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'stale MCP tool count should fail hygiene');
});

test('textHygieneFailures catches stale AI benchmark case counts', () => {
  const failures = textHygieneFailures(
    'docs/SITE_MODULE_QUALITY_AUDIT_2026-05-28.md',
    'The current benchmark passes at 100/100 across 14 representative queries.'
  );
  assert(failures.some(failure => failure.includes('stale launch metrics')), 'stale benchmark case count should fail hygiene');
});

test('textHygieneFailures catches README docs missing the machine JSON 404 artifact', () => {
  const failures = textHygieneFailures(
    'README.md',
    [
      'The smoke test checks `/index.json`, `/provenance.json`, and `/dashboard.html` against production.',
      '## Build Outputs',
      '| Output | Purpose |',
      '| `/provenance.json` | Build identity. |'
    ].join('\n')
  );
  assert(failures.some(failure => failure.includes('smoke route documentation')), 'README smoke docs should mention /404.html');
  assert(failures.some(failure => failure.includes('build outputs table')), 'README build outputs should mention /404.html');
});

test('textHygieneFailures accepts README docs covering the machine JSON 404 artifact', () => {
  const failures = textHygieneFailures(
    'README.md',
    [
      'The smoke test checks `/index.json`, `/404.html`, `/provenance.json`, and `/dashboard.html` against production.',
      '## Build Outputs',
      '| Output | Purpose |',
      '| `/404.html` | Machine-readable JSON 404 fallback. |',
      '| `/provenance.json` | Build identity. |'
    ].join('\n')
  );
  assertEq(failures, []);
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
