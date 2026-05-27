#!/usr/bin/env node
import { execFileSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
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

function assertEq(actual, expected, ctx = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${ctx} expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

console.log('AnchorFact Compile Tests\n');

const root = resolve('tests/.tmp-compile');
const contentDir = join(root, 'content');
const distDir = join(root, 'dist');
const reportPath = join(root, 'verification-report.json');

rmSync(root, { recursive: true, force: true });
mkdirSync(contentDir, { recursive: true });

const publicFile = join(contentDir, 'public.md');
const draftFile = join(contentDir, 'draft.md');

writeFileSync(publicFile, `---
id: public-fixture
slug: public-fixture
title: Public Fixture
schema_type: TechArticle
primary_sources:
  - title: Fixture Paper
    type: academic_paper
    year: 2026
    doi: 10.1234/fixture
atomic_facts:
  - id: fact-public-fixture-1
    statement: Public fixture claim.
    source_url: https://example.com/fixture
    confidence: high
---
## TL;DR
Public fixture summary.

## Detailed Analysis
Complete article body.
`);

writeFileSync(draftFile, `---
id: draft-fixture
slug: draft-fixture
title: Draft Fixture
schema_type: TechArticle
primary_sources:
  - title: Draft Source
    type: blog_post
    year: 2026
    url: https://example.com/draft
---
## TL;DR
Draft fixture summary.

## Detailed Analysis
[待后续补充。]
`);

writeFileSync(reportPath, JSON.stringify({
  summary: { generated: '2026-05-27T00:00:00.000Z' },
  articles: [
    {
      file: publicFile.replace(/\\/g, '/'),
      article_id: 'public-fixture',
      sources_total: 1,
      sources_verified: 1,
      sources_unreachable: 0,
      verification_results: [
        { results: [{ method: 'doi', verified: true }], all_verified: true }
      ]
    }
  ]
}, null, 2));

execFileSync('node', ['src/compile.js', contentDir, distDir, reportPath], { stdio: 'pipe' });

test('manifest contains structured article entries and status counts', () => {
  const manifest = JSON.parse(readFileSync(join(distDir, 'manifest.json'), 'utf-8'));
  assert(Array.isArray(manifest.articles), 'manifest.articles should be an array');
  assertEq(manifest.article_count, 2);
  assertEq(manifest.public_article_count, 1);
  assertEq(manifest.draft_article_count, 1);
  assertEq(manifest.articles.find(article => article.title === 'Public Fixture').status, 'public');
  assertEq(manifest.articles.find(article => article.title === 'Public Fixture').canonical_slug, 'public-fixture');
  assertEq(manifest.articles.find(article => article.title === 'Draft Fixture').status, 'draft');
});

test('public entrypoints exclude draft articles', () => {
  const indexHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');
  const llmsTxt = readFileSync(join(distDir, 'llms.txt'), 'utf-8');
  const sitemap = readFileSync(join(distDir, 'sitemap.xml'), 'utf-8');
  assert(indexHtml.includes('Public Fixture'), 'index should include public article');
  assert(!indexHtml.includes('Draft Fixture</a></span>'), 'index public list should exclude draft article');
  assert(llmsTxt.includes('Public Fixture'), 'llms.txt should include public article');
  assert(!llmsTxt.includes('Draft Fixture'), 'llms.txt should exclude draft article');
  assert(sitemap.includes('/public-fixture/'), 'sitemap should include public article');
  assert(!sitemap.includes('/draft-fixture/'), 'sitemap should exclude draft article');
});

test('draft page is generated with noindex and draft status', () => {
  const draftHtml = readFileSync(join(distDir, 'draft-fixture', 'index.html'), 'utf-8');
  const draftJson = JSON.parse(readFileSync(join(distDir, 'draft-fixture', 'index.json'), 'utf-8'));
  assert(draftHtml.includes('noindex'), 'draft html should include noindex');
  assertEq(draftJson['anchorfact:status'], 'draft');
});

test('claims.json includes only public atomic facts with evidence', () => {
  assert(existsSync(join(distDir, 'claims.json')), 'claims.json missing');
  const claims = JSON.parse(readFileSync(join(distDir, 'claims.json'), 'utf-8'));
  assertEq(claims.claim_count, 1);
  assertEq(claims.claims.length, 1);
  assertEq(claims.claims[0].statement, 'Public fixture claim.');
  assertEq(claims.claims[0].confidence, 'medium');
  assertEq(claims.claims[0].declared_confidence, 'high');
  assertEq(claims.claims[0].article_confidence, 'medium');
});

rmSync(root, { recursive: true, force: true });

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
