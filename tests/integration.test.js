#!/usr/bin/env node
import { execFileSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { classifySourceTier, computeConfidence, computeFreshnessScore } from '../src/lib/confidence.js';

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

console.log('AnchorFact Integration Tests\n');

const root = resolve('tests/.tmp-integration');
const contentDir = join(root, 'content');
const distDir = join(root, 'dist');
const reportPath = join(root, 'verification-report.json');
const publicFile = join(contentDir, 'ai', 'public.md');

rmSync(root, { recursive: true, force: true });
mkdirSync(join(contentDir, 'ai'), { recursive: true });

writeFileSync(publicFile, `---
id: public-fixture
slug: ai/public-fixture
title: Public Fixture
schema_type: TechArticle
generation_method: ai_structured
primary_sources:
  - title: Fixture Paper
    type: academic_paper
    year: 2026
    doi: 10.1234/fixture
---
## TL;DR
Public fixture summary.

## Detailed Analysis
Complete article body.
`);

writeFileSync(join(contentDir, 'draft.md'), `---
id: draft-fixture
title: Draft Fixture
primary_sources:
  - title: Draft Source
    url: https://example.com/draft
---
## TL;DR
Draft fixture summary.

## Detailed Analysis
[待后续补充]
`);

writeFileSync(reportPath, JSON.stringify({
  summary: { generated: '2026-05-27T00:00:00.000Z' },
  articles: [{
    file: publicFile.replace(/\\/g, '/'),
    sources_total: 1,
    sources_verified: 1,
    sources_unreachable: 0,
    verification_results: [{ results: [{ method: 'doi', verified: true }] }]
  }]
}, null, 2));

execFileSync('node', ['src/compile.js', contentDir, distDir, reportPath], { stdio: 'pipe' });

console.log('Compiled output contract:');
test('manifest exists and has structured counts', () => {
  const manifest = JSON.parse(readFileSync(join(distDir, 'manifest.json'), 'utf-8'));
  assertEq(manifest.article_count, 2);
  assertEq(manifest.public_article_count, 1);
  assertEq(manifest.draft_article_count, 1);
  assert(Array.isArray(manifest.articles), 'manifest.articles missing');
  assertEq(manifest.articles[0].canonical_slug, 'ai/public-fixture');
});

test('nested route JSON-LD exists and has verification layer', () => {
  const jsonPath = join(distDir, 'ai', 'public-fixture', 'index.json');
  assert(existsSync(jsonPath), 'nested index.json missing');
  const article = JSON.parse(readFileSync(jsonPath, 'utf-8'));
  assertEq(article['@context'], 'https://schema.org');
  assertEq(article.url, 'https://anchorfact.org/ai/public-fixture/');
  assertEq(article['anchorfact:verification'].confidence_basis, 'verified_sources');
});

test('public machine entrypoints exclude drafts', () => {
  const agent = JSON.parse(readFileSync(join(distDir, 'agent.json'), 'utf-8'));
  const openapi = JSON.parse(readFileSync(join(distDir, 'openapi.json'), 'utf-8'));
  const topics = JSON.parse(readFileSync(join(distDir, 'topics.json'), 'utf-8'));
  const examples = JSON.parse(readFileSync(join(distDir, 'examples.json'), 'utf-8'));
  const search = JSON.parse(readFileSync(join(distDir, 'search-index.json'), 'utf-8'));
  const sources = JSON.parse(readFileSync(join(distDir, 'sources.json'), 'utf-8'));
  const llms = readFileSync(join(distDir, 'llms.txt'), 'utf-8');
  const sitemap = readFileSync(join(distDir, 'sitemap.xml'), 'utf-8');
  assertEq(agent.current_snapshot.public_articles, 1);
  assertEq(agent.endpoints.openapi.url, 'https://anchorfact.org/openapi.json');
  assertEq(agent.endpoints.evidence_api.path, '/api/evidence?q={query}');
  assertEq(agent.endpoints.search_api.path, '/api/search?q={query}');
  assertEq(agent.endpoints.article_api.path, '/api/article?slug={canonical_slug}');
  assertEq(agent.endpoints.claim_api.path, '/api/claim?id={claim_id}');
  assertEq(agent.endpoints.source_api.path, '/api/source?id={source_id}');
  assertEq(agent.endpoints.manifest.url, 'https://anchorfact.org/manifest.json');
  assertEq(agent.endpoints.topics.url, 'https://anchorfact.org/topics.json');
  assertEq(agent.endpoints.examples.url, 'https://anchorfact.org/examples.json');
  assertEq(agent.endpoints.search_index.url, 'https://anchorfact.org/search-index.json');
  assertEq(agent.endpoints.sources.url, 'https://anchorfact.org/sources.json');
  assertEq(agent.endpoints.article_jsonld_template.path_template, '/{canonical_slug}/index.json');
  assert(openapi.paths['/{canonical_slug}/index.json'], 'OpenAPI should expose article JSON-LD template');
  assert(openapi.paths['/api/evidence'], 'OpenAPI should expose evidence API endpoint');
  assert(openapi.paths['/api/search'], 'OpenAPI should expose search API endpoint');
  assert(openapi.paths['/api/article'], 'OpenAPI should expose article API endpoint');
  assert(openapi.paths['/api/claim'], 'OpenAPI should expose claim API endpoint');
  assert(openapi.paths['/api/source'], 'OpenAPI should expose source API endpoint');
  assert(openapi.paths['/topics.json'], 'OpenAPI should expose topics endpoint');
  assert(openapi.paths['/examples.json'], 'OpenAPI should expose examples endpoint');
  assert(openapi.paths['/search-index.json'], 'OpenAPI should expose search index endpoint');
  assertEq(topics.topic_count, 1);
  assert(topics.topics.some(topic => topic.id === 'ai'), 'topics index should include ai topic');
  assertEq(examples.example_count, 5);
  assert(examples.examples.some(example => example.id === 'one_call_evidence_pack'), 'examples index should include evidence pack workflow');
  assert(examples.examples.some(example => example.id === 'static_fallback'), 'examples index should include static fallback workflow');
  assertEq(search.article_count, 1);
  assert(search.records.some(record => record.canonical_slug === 'ai/public-fixture'), 'search index should link to public article');
  assert(!search.records.some(record => record.canonical_slug === 'draft-fixture'), 'search index should exclude draft article');
  assertEq(sources.public_article_count, 1);
  assert(sources.sources.some(source => source.articles.some(article => article.canonical_slug === 'ai/public-fixture')), 'source index should link to public article');
  assert(llms.includes('Public Fixture'), 'llms should include public fixture');
  assert(!llms.includes('Draft Fixture'), 'llms should exclude draft fixture');
  assert(sitemap.includes('/ai/public-fixture/'), 'sitemap should include nested public route');
  assert(!sitemap.includes('/draft-fixture/'), 'sitemap should exclude draft');
});

console.log('\nShared confidence logic:');
test('computeConfidence with empty sources returns low/0', () => {
  const result = computeConfidence([]);
  assertEq(result.level, 'low');
  assertEq(result.score, 0);
});

test('computeConfidence with null sources returns low/0', () => {
  const result = computeConfidence(null);
  assertEq(result.level, 'low');
  assertEq(result.score, 0);
});

test('Freshness with year 0 defaults to 0.5', () => {
  assertEq(computeFreshnessScore({ year: 0 }), 0.5);
});

test('classifySourceTier defaults to C for unknown type', () => {
  assertEq(classifySourceTier({}), 'C');
  assertEq(classifySourceTier({ type: 'unknown' }), 'C');
});

rmSync(root, { recursive: true, force: true });

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
