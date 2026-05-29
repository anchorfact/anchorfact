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

writeFileSync(join(distDir, 'search-index.json'), JSON.stringify({
  schema_version: 'anchorfact.search-index.v1',
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  article_count: 1,
  records: [
    {
      canonical_slug: 'ai/public-fixture',
      title: 'Public Fixture Evidence',
      url: 'https://anchorfact.org/ai/public-fixture/',
      description: 'Fixture evidence for local planner tests.',
      confidence_level: 'medium',
      source_coverage: { verified: 1, total: 1, ratio: 1 },
      claim_count: 1,
      claim_ids: ['https://anchorfact.org/fact/f1'],
      keywords: ['fixture', 'evidence', 'planner'],
      search_text: 'ai public fixture evidence local planner claim source',
      routes: {
        html: 'https://anchorfact.org/ai/public-fixture/',
        markdown: 'https://anchorfact.org/ai/public-fixture/index.md',
        jsonld: 'https://anchorfact.org/ai/public-fixture/index.json'
      }
    }
  ]
}, null, 2));

writeFileSync(join(distDir, 'coverage.json'), JSON.stringify({
  schema_version: 'anchorfact.coverage.v1',
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  topic_coverage: [
    {
      id: 'ai',
      title: 'AI',
      article_count: 1,
      claim_count: 1,
      source_count: 1,
      best_entrypoint: '/api/evidence?q=AI&limit=3',
      top_articles: [
        {
          canonical_slug: 'ai/public-fixture',
          title: 'Public Fixture Evidence'
        }
      ]
    }
  ]
}, null, 2));

writeFileSync(join(distDir, 'topics.json'), JSON.stringify({
  schema_version: 'anchorfact.topics.v1',
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  topics: []
}, null, 2));

writeFileSync(join(distDir, 'capabilities.json'), JSON.stringify({
  schema_version: 'anchorfact.capabilities.v1',
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json'
}, null, 2));

writeFileSync(join(distDir, 'content-health.json'), JSON.stringify({
  schema_version: 'anchorfact.content-health.v1',
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  snapshot: {
    public_articles: 1,
    draft_articles: 1,
    public_claims: 1,
    public_sources: 1
  },
  public: {
    source_coverage: { full: 1, partial: 0, zero: 0 },
    claim_mapping: { total: 1, mapped: 1, ratio: 1 }
  },
  draft: {
    repair_queue: {
      candidate_count: 1,
      excluded_count: 1,
      next_batch_size: 1,
      next_batch: [
        {
          canonical_slug: 'ai/draft-fixture',
          title: 'Draft Fixture',
          confidence_level: 'low',
          sources_verified: 0,
          sources_total: 1,
          quality_reasons: ['no_verified_sources'],
          repair_complexity: 1
        }
      ],
      selection_policy: ['Prioritize lower repair_complexity values first.'],
      exclusion_reason_distribution: [
        { name: 'placeholder_content', count: 1 }
      ]
    }
  },
  machine_guidance: ['Use local MCP context for prompt assembly.'],
  trust_boundaries: {
    draft_entries_excluded_from_ai_entrypoints: true,
    original_sources_remain_authoritative: true
  }
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

test('local query planner returns MCP-native next steps', () => {
  const result = runPython(`
import json
from pathlib import Path
from mcp_plan import build_plan_payload
dist = Path(r'''${pyPath(distDir)}''')
status, payload = build_plan_payload(dist, 'fixture evidence', 2)
unsupported_status, unsupported = build_plan_payload(dist, 'lunar dentistry', 2)
missing_status, missing = build_plan_payload(dist, '', 2)
print(json.dumps({
    "status": status,
    "schema": payload.get("schema_version"),
    "coverage_status": payload.get("coverage_status"),
    "should_use": payload.get("should_use_anchorfact"),
    "top_slug": payload.get("matched_articles", [{}])[0].get("canonical_slug"),
    "tool_names": [item.get("tool") for item in payload.get("local_mcp_next_tools", [])],
    "local_http_paths": [item.get("path") for item in payload.get("local_http_next_calls", [])],
    "public_paths": [item.get("path") for item in payload.get("recommended_next_calls", [])],
    "unsupported_status": unsupported_status,
    "unsupported_coverage": unsupported.get("coverage_status"),
    "unsupported_should_use": unsupported.get("should_use_anchorfact"),
    "unsupported_guidance": unsupported.get("fallback_guidance", []),
    "missing_status": missing_status,
    "missing_code": missing.get("error", {}).get("code"),
}))
`);
  assertEq(result.status, 200);
  assertEq(result.schema, 'anchorfact.plan-api.v1');
  assertEq(result.coverage_status, 'supported');
  assertEq(result.should_use, true);
  assertEq(result.top_slug, 'ai/public-fixture');
  assertEq(result.tool_names.includes('anchorfact_search'), true);
  assertEq(result.tool_names.includes('anchorfact_get_article'), true);
  assertEq(result.tool_names.includes('anchorfact_cite_claim'), true);
  assertEq(result.local_http_paths[0].startsWith('/search?'), true);
  assertEq(result.public_paths[0].startsWith('/api/evidence?'), true);
  assertEq(result.unsupported_status, 200);
  assertEq(result.unsupported_coverage, 'unsupported');
  assertEq(result.unsupported_should_use, false);
  assertEq(result.unsupported_guidance.some(item => item.includes('external primary')), true);
  assertEq(result.missing_status, 400);
  assertEq(result.missing_code, 'missing_or_invalid_query');
});

test('local context builder returns prompt context and excludes drafts', () => {
  const result = runPython(`
import json
from pathlib import Path
from mcp_context import build_context_payload, render_context_markdown
dist = Path(r'''${pyPath(distDir)}''')
status, payload = build_context_payload(dist, 'fixture evidence', 2)
unsupported_status, unsupported = build_context_payload(dist, 'lunar dentistry', 2)
missing_status, missing = build_context_payload(dist, '', 2)
markdown = render_context_markdown(payload)
print(json.dumps({
    "status": status,
    "schema": payload.get("schema_version"),
    "coverage_status": payload.get("coverage_status"),
    "should_use": payload.get("should_use_anchorfact"),
    "evidence_pack_count": payload.get("evidence_pack_count"),
    "top_slug": payload.get("evidence_packs", [{}])[0].get("canonical_slug"),
    "citation_contract": payload.get("citation_contract", {}).get("include_anchorfact_claim_url"),
    "content_health_public": payload.get("content_health", {}).get("snapshot", {}).get("public_articles"),
    "content_health_mapping": payload.get("content_health", {}).get("public_claim_mapping", {}).get("mapped"),
    "content_health_trust": payload.get("content_health", {}).get("trust_boundaries", {}).get("draft_entries_excluded_from_ai_entrypoints"),
    "has_draft_claim": "Draft facts" in json.dumps(payload),
    "markdown_has_heading": "# AnchorFact Local Context" in markdown,
    "markdown_has_health": "Corpus Health" in markdown,
    "markdown_has_claim": "Public fixture claim." in markdown,
    "unsupported_status": unsupported_status,
    "unsupported_coverage": unsupported.get("coverage_status"),
    "unsupported_count": unsupported.get("evidence_pack_count"),
    "missing_status": missing_status,
    "missing_code": missing.get("error", {}).get("code"),
}))
`);
  assertEq(result.status, 200);
  assertEq(result.schema, 'anchorfact.context-api.v1');
  assertEq(result.coverage_status, 'supported');
  assertEq(result.should_use, true);
  assertEq(result.evidence_pack_count, 1);
  assertEq(result.top_slug, 'ai/public-fixture');
  assertEq(result.citation_contract, true);
  assertEq(result.content_health_public, 1);
  assertEq(result.content_health_mapping, 1);
  assertEq(result.content_health_trust, true);
  assertEq(result.has_draft_claim, false);
  assertEq(result.markdown_has_heading, true);
  assertEq(result.markdown_has_health, true);
  assertEq(result.markdown_has_claim, true);
  assertEq(result.unsupported_status, 200);
  assertEq(result.unsupported_coverage, 'unsupported');
  assertEq(result.unsupported_count, 0);
  assertEq(result.missing_status, 400);
  assertEq(result.missing_code, 'missing_or_invalid_query');
});

test('local corpus health helper exposes draft repair queue', () => {
  const result = runPython(`
import json
from pathlib import Path
from mcp_health import build_health_payload, render_health_markdown
status, payload = build_health_payload(Path(r'''${pyPath(distDir)}'''))
markdown = render_health_markdown(payload)
print(json.dumps({
    "status": status,
    "schema": payload.get("schema_version"),
    "public_articles": payload.get("snapshot", {}).get("public_articles"),
    "repair_candidate_count": payload.get("draft", {}).get("repair_queue", {}).get("candidate_count"),
    "repair_excluded_count": payload.get("draft", {}).get("repair_queue", {}).get("excluded_count"),
    "next_slug": payload.get("draft", {}).get("repair_queue", {}).get("next_batch", [{}])[0].get("canonical_slug"),
    "policy": payload.get("draft", {}).get("repair_queue", {}).get("selection_policy", []),
    "markdown_has_heading": "# AnchorFact Local Corpus Health" in markdown,
    "markdown_has_queue": "Draft Repair Queue" in markdown,
    "markdown_has_exclusions": "Automatic repair exclusions: 1" in markdown,
    "markdown_has_exclusion_reason": "placeholder_content: 1" in markdown,
}))
`);
  assertEq(result.status, 200);
  assertEq(result.schema, 'anchorfact.content-health.v1');
  assertEq(result.public_articles, 1);
  assertEq(result.repair_candidate_count, 1);
  assertEq(result.repair_excluded_count, 1);
  assertEq(result.next_slug, 'ai/draft-fixture');
  assertEq(result.policy.some(item => item.includes('repair_complexity')), true);
  assertEq(result.markdown_has_heading, true);
  assertEq(result.markdown_has_queue, true);
  assertEq(result.markdown_has_exclusions, true);
  assertEq(result.markdown_has_exclusion_reason, true);
});

test('local HTTP wrapper exposes corpus health JSON and Markdown routes', () => {
  const result = runPython(`
import json
from pathlib import Path
import mcp_http

mcp_http.DIST_DIR = Path(r'''${pyPath(distDir)}''')
route_paths = [getattr(route, "path", None) for route in mcp_http.app.routes]
json_response = mcp_http.api_corpus_health(format="json")
markdown_response = mcp_http.api_corpus_health(format="markdown")
payload = json.loads(json_response.body.decode("utf-8"))
markdown = markdown_response.body.decode("utf-8")
print(json.dumps({
    "has_route": "/corpus-health" in route_paths,
    "json_status": json_response.status_code,
    "json_schema": payload.get("schema_version"),
    "json_next_slug": payload.get("draft", {}).get("repair_queue", {}).get("next_batch", [{}])[0].get("canonical_slug"),
    "json_excluded_count": payload.get("draft", {}).get("repair_queue", {}).get("excluded_count"),
    "markdown_status": markdown_response.status_code,
    "markdown_media_type": markdown_response.media_type,
    "markdown_has_queue": "Draft Repair Queue" in markdown,
    "markdown_has_exclusions": "Automatic repair exclusions: 1" in markdown,
}))
`);
  assertEq(result.has_route, true);
  assertEq(result.json_status, 200);
  assertEq(result.json_schema, 'anchorfact.content-health.v1');
  assertEq(result.json_next_slug, 'ai/draft-fixture');
  assertEq(result.json_excluded_count, 1);
  assertEq(result.markdown_status, 200);
  assertEq(result.markdown_media_type, 'text/markdown');
  assertEq(result.markdown_has_queue, true);
  assertEq(result.markdown_has_exclusions, true);
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
