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

function assertEq(actual, expected, ctx = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${ctx} expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

console.log('AnchorFact MCP Index Tests\n');

const root = resolve('tests/.tmp-mcp-index');
const distDir = join(root, 'dist');
const articleDir = join(distDir, 'ai', 'public-fixture');

rmSync(root, { recursive: true, force: true });
mkdirSync(articleDir, { recursive: true });

writeFileSync(join(distDir, 'manifest.json'), JSON.stringify({
  articles: [
    {
      id: 'https://anchorfact.org/kb/ai/public-fixture',
      canonical_slug: 'ai/public-fixture',
      canonical_url: 'https://anchorfact.org/ai/public-fixture/',
      title: 'Public Fixture',
      status: 'public',
      confidence_level: 'medium',
      confidence_score: 0.8,
      confidence_basis: 'verified_sources',
      is_draft: false
    },
    {
      id: 'https://anchorfact.org/kb/draft-fixture',
      canonical_slug: 'draft-fixture',
      canonical_url: 'https://anchorfact.org/draft-fixture/',
      title: 'Draft Fixture',
      status: 'draft',
      confidence_level: 'low',
      is_draft: true
    }
  ]
}, null, 2));

writeFileSync(join(articleDir, 'index.json'), JSON.stringify({
  '@context': 'https://schema.org',
  '@id': 'https://anchorfact.org/kb/ai/public-fixture',
  url: 'https://anchorfact.org/ai/public-fixture/',
  headline: 'Public Fixture',
  description: 'Public fixture summary.',
  'anchorfact:confidence': 'medium'
}, null, 2));

function pyPath(value) {
  return value.replace(/\\/g, '\\\\');
}

function runPython(code) {
  return JSON.parse(execFileSync('python', ['-c', code], {
    encoding: 'utf-8',
    env: { ...process.env, PYTHONPATH: resolve('src') }
  }));
}

test('public index is loaded from manifest and excludes drafts', () => {
  const result = runPython(`
import json
from pathlib import Path
from mcp_index import load_public_article_index
items = load_public_article_index(Path(r'''${pyPath(distDir)}'''))
print(json.dumps(items))
`);
  assertEq(result.length, 1);
  assertEq(result[0].id, 'ai/public-fixture');
  assertEq(result[0].jsonld_id, 'https://anchorfact.org/kb/ai/public-fixture');
});

test('article detail resolves slug, canonical URL, and JSON-LD id', () => {
  const result = runPython(`
import json
from pathlib import Path
from mcp_index import load_article_detail
dist = Path(r'''${pyPath(distDir)}''')
values = []
for ref in ['ai/public-fixture', 'https://anchorfact.org/ai/public-fixture/', 'https://anchorfact.org/kb/ai/public-fixture']:
    detail = load_article_detail(dist, ref)
    values.append(detail.get('headline') if detail else None)
print(json.dumps(values))
`);
  assertEq(result, ['Public Fixture', 'Public Fixture', 'Public Fixture']);
});

test('shared BM25 search orders and filters MCP results consistently', () => {
  const result = runPython(`
import json
from mcp_search import BM25Index
articles = [
    {"id": "low", "title": "Climate glossary", "description": "climate climate", "confidence": "low"},
    {"id": "medium", "title": "Climate model", "description": "climate model projections", "confidence": "medium"},
    {"id": "high", "title": "Climate model evidence", "description": "climate model model evidence", "confidence": "high"},
]
index = BM25Index()
index.build(articles)
print(json.dumps({
    "medium": [item["id"] for item in index.search("climate model", confidence_min="medium", limit=3)],
    "low": [item["id"] for item in index.search("climate", confidence_min="low", limit=3)],
}))
`);
  assertEq(result.medium, ['high', 'medium']);
  assertEq(result.low.includes('low'), true);
});

rmSync(root, { recursive: true, force: true });

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
