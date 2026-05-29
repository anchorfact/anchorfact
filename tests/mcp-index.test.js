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
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
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

writeFileSync(join(distDir, 'claims.json'), JSON.stringify({
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  claims: [
    {
      id: 'https://anchorfact.org/fact/f1',
      canonical_slug: 'ai/public-fixture',
      statement: 'Public fixture claim.',
      confidence: 'medium',
      source_title: 'Fixture Paper',
      source_url: 'https://example.com/fixture'
    }
  ]
}, null, 2));

writeFileSync(join(distDir, 'sources.json'), JSON.stringify({
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  sources: [
    {
      id: 'source:fixture',
      title: 'Fixture Paper',
      url: 'https://example.com/fixture',
      tier: 'A',
      type: 'academic_paper',
      articles: [
        {
          canonical_slug: 'ai/public-fixture',
          title: 'Public Fixture'
        }
      ]
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

test('claim citation helper returns citation-ready JSON and Markdown', () => {
  const result = runPython(`
import json
from pathlib import Path
from mcp_claims import build_citation_payload, normalize_claim_id, render_citation_markdown
status, payload = build_citation_payload(Path(r'''${pyPath(distDir)}'''), 'f1')
missing_status, missing = build_citation_payload(Path(r'''${pyPath(distDir)}'''), 'missing')
markdown = render_citation_markdown(payload)
print(json.dumps({
    "normalized": normalize_claim_id('/fact/f1'),
    "status": status,
    "schema": payload.get("schema_version"),
    "claim_id": payload.get("claim_id"),
    "source_tier": payload.get("citation_export", {}).get("source_tier"),
    "inline": payload.get("citation_export", {}).get("inline"),
    "markdown_has_heading": "# AnchorFact Citation" in markdown,
    "missing_status": missing_status,
    "missing_code": missing.get("error", {}).get("code"),
}))
`);
  assertEq(result.normalized, 'https://anchorfact.org/fact/f1');
  assertEq(result.status, 200);
  assertEq(result.schema, 'anchorfact.cite-api.v1');
  assertEq(result.claim_id, 'https://anchorfact.org/fact/f1');
  assertEq(result.source_tier, 'A');
  assertEq(result.inline.includes('AnchorFact:'), true);
  assertEq(result.markdown_has_heading, true);
  assertEq(result.missing_status, 404);
  assertEq(result.missing_code, 'public_claim_not_found');
});

test('reference resolver returns local payloads for claims, articles, and sources', () => {
  const result = runPython(`
import json
from pathlib import Path
from mcp_resolve import build_reference_batch_payload, build_reference_payload, render_reference_batch_markdown
dist = Path(r'''${pyPath(distDir)}''')
refs = ['f1', 'ai/public-fixture', 'source:fixture', 'https://example.com/fixture', 'ai/missing']
resolved = {}
for ref in refs:
    status, payload = build_reference_payload(dist, ref)
    resolved[ref] = {
        "status": status,
        "schema": payload.get("schema_version"),
        "resolved_type": payload.get("resolved_type"),
        "canonical_ref": payload.get("canonical_ref"),
        "result_schema": payload.get("result_schema_version"),
        "error_code": (payload.get("error") or {}).get("code"),
        "source_id": (payload.get("result") or {}).get("source_id"),
    }
batch_status, batch = build_reference_batch_payload(dist, ['f1', 'source:fixture', 'ai/missing'])
markdown = render_reference_batch_markdown(batch)
resolved["batch"] = {
    "status": batch_status,
    "schema": batch.get("schema_version"),
    "reference_count": batch.get("reference_count"),
    "ok_count": batch.get("ok_count"),
    "error_count": batch.get("error_count"),
    "markdown_has_heading": "# AnchorFact Resolve Batch" in markdown,
}
print(json.dumps(resolved))
`);
  assertEq(result.f1.status, 200);
  assertEq(result.f1.schema, 'anchorfact.resolve-api.v1');
  assertEq(result.f1.resolved_type, 'claim');
  assertEq(result.f1.canonical_ref, 'https://anchorfact.org/fact/f1');
  assertEq(result.f1.result_schema, 'anchorfact.cite-api.v1');
  assertEq(result['ai/public-fixture'].status, 200);
  assertEq(result['ai/public-fixture'].resolved_type, 'article');
  assertEq(result['ai/public-fixture'].canonical_ref, 'ai/public-fixture');
  assertEq(result['source:fixture'].status, 200);
  assertEq(result['source:fixture'].resolved_type, 'source');
  assertEq(result['source:fixture'].source_id, 'source:fixture');
  assertEq(result['https://example.com/fixture'].status, 200);
  assertEq(result['https://example.com/fixture'].resolved_type, 'source');
  assertEq(result['ai/missing'].status, 404);
  assertEq(result['ai/missing'].error_code, 'reference_not_found');
  assertEq(result.batch.status, 200);
  assertEq(result.batch.schema, 'anchorfact.resolve-batch-api.v1');
  assertEq(result.batch.reference_count, 3);
  assertEq(result.batch.ok_count, 2);
  assertEq(result.batch.error_count, 1);
  assertEq(result.batch.markdown_has_heading, true);
});

rmSync(root, { recursive: true, force: true });

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
