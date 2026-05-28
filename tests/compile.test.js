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
  - id: fact-public-fixture-broken
    statement: "\`\`\`markdown\n# leaked section"
    source_url: https://example.com/fixture
    confidence: high
  - id: fact-public-fixture-2
    statement: Second public fixture claim.
    source_url: https://example.com/fixture
    confidence: medium
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
  assertEq(manifest.schema_version, 'anchorfact.manifest.v1');
  assertEq(manifest.official_source_repository, 'https://github.com/anchorfact/anchorfact');
  assertEq(manifest.official_site, 'https://anchorfact.org');
  assertEq(manifest.provenance_url, 'https://anchorfact.org/provenance.json');
  assert(manifest.build && typeof manifest.build === 'object', 'manifest.build should describe the build environment');
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
  assertEq(claims.schema_version, 'anchorfact.claims.v1');
  assertEq(claims.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(claims.claim_count, 2);
  assertEq(claims.claims.length, 2);
  assertEq(claims.claims[0].statement, 'Public fixture claim.');
  assertEq(claims.claims[0].confidence, 'medium');
  assertEq(claims.claims[0].declared_confidence, 'high');
  assertEq(claims.claims[0].article_confidence, 'medium');
  assert(!claims.claims.some(claim => claim.id.endsWith('broken')), 'broken atomic facts should not be public claims');
});

test('provenance.json describes compiled artifacts', () => {
  assert(existsSync(join(distDir, 'provenance.json')), 'provenance.json missing');
  const provenance = JSON.parse(readFileSync(join(distDir, 'provenance.json'), 'utf-8'));
  assertEq(provenance.schema_version, 'anchorfact.provenance.v1');
  assertEq(provenance.official_site, 'https://anchorfact.org');
  assertEq(provenance.content_counts, {
    articles: 2,
    public: 1,
    draft: 1,
    claims: 2
  });
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.manifest_json.sha256), 'manifest checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.claims_json.sha256), 'claims checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.llms_txt.sha256), 'llms checksum should be sha256 hex');
  assert(provenance.artifacts.manifest_json.bytes > 0, 'manifest artifact should include byte size');
  assert(provenance.artifacts.claims_json.bytes > 0, 'claims artifact should include byte size');
  assert(provenance.artifacts.llms_txt.bytes > 0, 'llms artifact should include byte size');
});

test('_headers is generated for Cloudflare Pages static output', () => {
  const headers = readFileSync(join(distDir, '_headers'), 'utf-8');
  assert(headers.includes('/*\n  X-Content-Type-Options: nosniff'), '_headers should include global security headers');
  assert(headers.includes('/manifest.json\n  Access-Control-Allow-Origin: *'), '_headers should expose manifest CORS');
  assert(headers.includes('/provenance.json\n  Access-Control-Allow-Origin: *'), '_headers should expose provenance CORS');
  assert(headers.includes('/*/index.json\n  Access-Control-Allow-Origin: *'), '_headers should expose article JSON-LD CORS');
  assert(headers.includes('/drafts\n  X-Robots-Tag: noindex, nofollow'), '_headers should noindex extensionless drafts route');
  assert(headers.includes('/drafts.html\n  X-Robots-Tag: noindex, nofollow'), '_headers should noindex drafts.html route');
});

rmSync(root, { recursive: true, force: true });

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
