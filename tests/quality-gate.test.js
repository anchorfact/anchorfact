#!/usr/bin/env node
import { execFileSync } from 'child_process';
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

let passed = 0, failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    failed++;
    console.log(`  ✗ ${name}: ${e.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

console.log('AnchorFact Quality Gate Tests\n');

const root = resolve('tests/.tmp-quality');

function reset(name) {
  const dir = join(root, name);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(join(dir, 'content'), { recursive: true });
  return dir;
}

function runGate(dir) {
  execFileSync('node', ['src/quality-gate.js', join(dir, 'content'), join(dir, 'verification-report.json')], { stdio: 'pipe' });
}

function writeArticle(dir, fileName, frontmatter, body = '## TL;DR\nBody.') {
  writeFileSync(join(dir, 'content', fileName), `---
${frontmatter}
---
${body}
`);
}

test('ordinary draft content does not fail the gate', () => {
  const dir = reset('draft-pass');
  writeArticle(dir, 'draft.md', `id: draft
title: Draft
primary_sources:
  - title: Source
    url: https://example.com`, '## TL;DR\nDraft.\n\n[待后续补充。]');
  runGate(dir);
});

test('duplicate canonical slugs fail the gate', () => {
  const dir = reset('duplicate-fail');
  writeArticle(dir, 'a.md', `id: a
slug: same
title: A
primary_sources:
  - title: Source
    url: https://example.com`);
  writeArticle(dir, 'b.md', `id: b
slug: same
title: B
primary_sources:
  - title: Source
    url: https://example.com`);

  let failedAsExpected = false;
  try {
    runGate(dir);
  } catch {
    failedAsExpected = true;
  }
  assert(failedAsExpected, 'quality gate should fail duplicate slugs');
});

test('published article without verification fails the gate', () => {
  const dir = reset('published-fail');
  writeArticle(dir, 'published.md', `id: published
status: published
title: Published
primary_sources:
  - title: Source
    url: https://example.com`);

  let failedAsExpected = false;
  try {
    runGate(dir);
  } catch {
    failedAsExpected = true;
  }
  assert(failedAsExpected, 'quality gate should fail unverified published articles');
});

test('low verified coverage is reported without failing the gate', () => {
  const dir = reset('low-coverage-pass');
  const articlePath = join(dir, 'content', 'low-coverage.md');
  writeArticle(dir, 'low-coverage.md', `id: low-coverage
title: Low Coverage
primary_sources:
  - title: Source A
    doi: 10.1234/a
  - title: Source B
    doi: 10.1234/b
  - title: Source C
    doi: 10.1234/c`);
  writeFileSync(join(dir, 'verification-report.json'), JSON.stringify({
    articles: [{
      file: articlePath.replace(/\\/g, '/'),
      sources_total: 3,
      sources_verified: 1,
      sources_unreachable: 2,
      verification_results: [
        { results: [{ method: 'doi', verified: true }] },
        { results: [{ method: 'doi', verified: false }] },
        { results: [{ method: 'doi', verified: false }] }
      ]
    }]
  }, null, 2));
  runGate(dir);
});

rmSync(root, { recursive: true, force: true });

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
