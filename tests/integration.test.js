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
  const capabilities = JSON.parse(readFileSync(join(distDir, 'capabilities.json'), 'utf-8'));
  const health = JSON.parse(readFileSync(join(distDir, 'content-health.json'), 'utf-8'));
  const coverage = JSON.parse(readFileSync(join(distDir, 'coverage.json'), 'utf-8'));
  const topics = JSON.parse(readFileSync(join(distDir, 'topics.json'), 'utf-8'));
  const examples = JSON.parse(readFileSync(join(distDir, 'examples.json'), 'utf-8'));
  const graph = JSON.parse(readFileSync(join(distDir, 'graph.json'), 'utf-8'));
  const evals = JSON.parse(readFileSync(join(distDir, 'evals.json'), 'utf-8'));
  const mcp = JSON.parse(readFileSync(join(distDir, 'mcp.json'), 'utf-8'));
  const apiReadiness = JSON.parse(readFileSync(join(distDir, 'api-readiness.json'), 'utf-8'));
  const search = JSON.parse(readFileSync(join(distDir, 'search-index.json'), 'utf-8'));
  const sources = JSON.parse(readFileSync(join(distDir, 'sources.json'), 'utf-8'));
  const llms = readFileSync(join(distDir, 'llms.txt'), 'utf-8');
  const sitemap = readFileSync(join(distDir, 'sitemap.xml'), 'utf-8');
  assertEq(agent.current_snapshot.public_articles, 1);
  assertEq(agent.endpoints.openapi.url, 'https://anchorfact.org/openapi.json');
  assertEq(agent.endpoints.api_access.path, '/api-access/');
  assertEq(agent.endpoints.capabilities.url, 'https://anchorfact.org/capabilities.json');
  assertEq(agent.endpoints.content_health.url, 'https://anchorfact.org/content-health.json');
  assertEq(agent.endpoints.coverage.url, 'https://anchorfact.org/coverage.json');
  assertEq(agent.endpoints.plan_api.path, '/api/plan?q={query}');
  assertEq(agent.endpoints.evidence_api.path, '/api/evidence?q={query}');
  assertEq(agent.endpoints.context_api.path, '/api/context?q={query}');
  assertEq(agent.endpoints.resolve_api.path, '/api/resolve?ref={reference}');
  assertEq(agent.endpoints.resolve_batch_api.path, '/api/resolve-batch?ref={reference}&ref={reference}');
  assertEq(agent.endpoints.search_api.path, '/api/search?q={query}');
  assertEq(agent.endpoints.article_api.path, '/api/article?slug={canonical_slug}');
  assertEq(agent.endpoints.cite_api.path, '/api/cite?id={claim_id}');
  assertEq(agent.endpoints.claim_api.path, '/api/claim?id={claim_id}');
  assertEq(agent.endpoints.source_api.path, '/api/source?id={source_id}');
  assertEq(agent.endpoints.manifest.url, 'https://anchorfact.org/manifest.json');
  assertEq(agent.endpoints.topics.url, 'https://anchorfact.org/topics.json');
  assertEq(agent.endpoints.examples.url, 'https://anchorfact.org/examples.json');
  assertEq(agent.endpoints.graph.url, 'https://anchorfact.org/graph.json');
  assertEq(agent.endpoints.evals.url, 'https://anchorfact.org/evals.json');
  assertEq(agent.endpoints.mcp.url, 'https://anchorfact.org/mcp.json');
  assertEq(agent.endpoints.api_readiness.url, 'https://anchorfact.org/api-readiness.json');
  assertEq(agent.endpoints.search_index.url, 'https://anchorfact.org/search-index.json');
  assertEq(agent.endpoints.sources.url, 'https://anchorfact.org/sources.json');
  assertEq(agent.endpoints.article_jsonld_template.path_template, '/{canonical_slug}/index.json');
  assert(openapi.paths['/{canonical_slug}/index.json'], 'OpenAPI should expose article JSON-LD template');
  assert(openapi.paths['/capabilities.json'], 'OpenAPI should expose capabilities endpoint');
  assert(openapi.paths['/content-health.json'], 'OpenAPI should expose content health endpoint');
  assert(openapi.paths['/coverage.json'], 'OpenAPI should expose coverage endpoint');
  assert(openapi.paths['/api/plan'], 'OpenAPI should expose plan API endpoint');
  assert(openapi.paths['/api/evidence'], 'OpenAPI should expose evidence API endpoint');
  assert(openapi.paths['/api/context'], 'OpenAPI should expose context API endpoint');
  assert(openapi.paths['/api/resolve'], 'OpenAPI should expose resolve API endpoint');
  assert(openapi.paths['/api/resolve-batch'], 'OpenAPI should expose resolve batch API endpoint');
  assert(openapi.paths['/api/search'], 'OpenAPI should expose search API endpoint');
  assert(openapi.paths['/api/article'], 'OpenAPI should expose article API endpoint');
  assert(openapi.paths['/api/cite'], 'OpenAPI should expose citation API endpoint');
  assert(openapi.paths['/api/claim'], 'OpenAPI should expose claim API endpoint');
  assert(openapi.paths['/api/source'], 'OpenAPI should expose source API endpoint');
  assert(openapi.paths['/topics.json'], 'OpenAPI should expose topics endpoint');
  assertEq(capabilities.schema_version, 'anchorfact.capabilities.v1');
  assertEq(capabilities.capability_count, 11);
  const planner = capabilities.capabilities.find(capability => capability.id === 'plan_query');
  assert(planner, 'capabilities should include query planning');
  assert(planner.local_mcp_tools.some(tool => tool.tool === 'anchorfact_plan_query'), 'capabilities should map query planning to MCP');
  assert(capabilities.capabilities.some(capability => capability.id === 'answer_with_evidence'), 'capabilities should include evidence routing');
  assert(capabilities.capabilities.some(capability => capability.id === 'assemble_prompt_context'), 'capabilities should include context routing');
  assert(capabilities.capabilities.some(capability => capability.id === 'inspect_corpus_health'), 'capabilities should include corpus health routing');
  assert(capabilities.capabilities.some(capability => capability.id === 'resolve_many_references'), 'capabilities should include batch resolver routing');
  assertEq(health.schema_version, 'anchorfact.content-health.v1');
  assertEq(health.snapshot.public_articles, 1);
  assertEq(health.trust_boundaries.draft_entries_excluded_from_ai_entrypoints, true);
  assertEq(coverage.schema_version, 'anchorfact.coverage.v1');
  assertEq(coverage.coverage_summary.public_articles, 1);
  assert(coverage.topic_coverage.some(topic => topic.id === 'ai'), 'coverage should include ai topic');
  assert(openapi.paths['/examples.json'], 'OpenAPI should expose examples endpoint');
  assert(openapi.paths['/graph.json'], 'OpenAPI should expose graph endpoint');
  assert(openapi.paths['/evals.json'], 'OpenAPI should expose evals endpoint');
  assert(openapi.paths['/mcp.json'], 'OpenAPI should expose MCP endpoint');
  assert(openapi.paths['/api-readiness.json'], 'OpenAPI should expose API readiness endpoint');
  assert(openapi.paths['/search-index.json'], 'OpenAPI should expose search index endpoint');
  assertEq(topics.topic_count, 1);
  assert(topics.topics.some(topic => topic.id === 'ai'), 'topics index should include ai topic');
  assertEq(examples.example_count, 7);
  assert(examples.examples.some(example => example.id === 'local_mcp_planning_and_citation'), 'examples index should include local MCP workflow');
  assert(examples.examples.some(example => example.id === 'one_call_evidence_pack'), 'examples index should include evidence pack workflow');
  assert(examples.examples.some(example => example.id === 'mixed_reference_resolution'), 'examples index should include mixed reference workflow');
  assert(examples.examples.some(example => example.id === 'static_fallback'), 'examples index should include static fallback workflow');
  assertEq(apiReadiness.schema_version, 'anchorfact.api-readiness.v1');
  assertEq(apiReadiness.report_only, true);
  assertEq(apiReadiness.subscription_ready, false);
  assertEq(evals.eval_count, 54);
  assert(evals.evals.some(evalCase => evalCase.id === 'llms_txt_primary_entrypoints'), 'evals index should include llms.txt discovery contract check');
  assert(evals.evals.some(evalCase => evalCase.id === 'robots_txt_ai_entrypoints'), 'evals index should include robots.txt AI hint contract check');
  assert(evals.evals.some(evalCase => evalCase.id === 'openapi_context_contract'), 'evals index should include OpenAPI context contract check');
  assert(evals.evals.some(evalCase => evalCase.id === 'ai_query_intent_fine_tune_with_adapters'), 'evals index should include natural-language AI intent routing check');
  assert(evals.evals.some(evalCase => evalCase.id === 'ai_query_routing_rlhf'), 'evals index should include high-intent AI query routing check');
  assert(evals.evals.some(evalCase => evalCase.id === 'ai_query_routing_kolmogorov_arnold_networks'), 'evals index should include KAN routing checks');
  assert(evals.evals.some(evalCase => evalCase.id === 'ai_query_routing_vision_transformers'), 'evals index should include vision transformer routing checks');
  assert(evals.evals.some(evalCase => evalCase.id === 'ai_query_routing_meta_learning'), 'evals index should include meta-learning routing checks');
  assert(evals.evals.some(evalCase => evalCase.id === 'query_routing_rest_api'), 'evals index should include API fundamentals routing check');
  assert(evals.evals.some(evalCase => evalCase.id === 'query_routing_climate_change'), 'evals index should include cross-domain query routing check');
  assert(evals.evals.some(evalCase => evalCase.id === 'agent_usage_anchorfact_citation_help'), 'evals index should include AnchorFact usage guidance check');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_medical_personal_advice'), 'evals index should include high-stakes personal advice refusal check');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_medication_change_advice'), 'evals index should include medication-change refusal check');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_medication_safety_lookup'), 'evals index should include medication-safety refusal check');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_weak_medical_topic_match'), 'evals index should include weak medical-topic match refusal check');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_weak_medical_management_match'), 'evals index should include weak medical-management match refusal check');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_harmful_operational_request'), 'evals index should include harmful operational request refusal check');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_live_stock_price'), 'evals index should include live/time-sensitive refusal check');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_product_pricing_lookup'), 'evals index should include product-pricing refusal check');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_financial_rate_lookup'), 'evals index should include financial-rate refusal check');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_financial_price_prediction'), 'evals index should include price-prediction refusal check');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_software_current_version_lookup'), 'evals index should include current software-version refusal check');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_live_weather_location'), 'evals index should include implicit live weather refusal check');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_current_leadership_fact'), 'evals index should include current leadership refusal check');
  assert(evals.evals.some(evalCase => evalCase.id === 'query_plan'), 'evals index should include query planning check');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_query_plan'), 'evals index should include unsupported planning check');
  assert(evals.evals.some(evalCase => evalCase.id === 'evidence_pack_json'), 'evals index should include evidence pack check');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_query_evidence'), 'evals index should include unsupported evidence check');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_context_pack_json'), 'evals index should include unsupported context policy check');
  assert(evals.evals.some(evalCase => evalCase.id === 'reference_resolver'), 'evals index should include resolve API check');
  assert(evals.evals.some(evalCase => evalCase.id === 'batch_reference_resolver'), 'evals index should include resolve batch API check');
  assert(evals.evals.some(evalCase => evalCase.id === 'citation_export'), 'evals index should include citation API check');
  assert(evals.evals.some(evalCase => evalCase.id === 'content_health_summary'), 'evals index should include content health check');
  assert(evals.evals.some(evalCase => evalCase.id === 'coverage_query_benchmark_catalog'), 'evals index should include query benchmark catalog check');
  assert(evals.evals.some(evalCase => evalCase.id === 'api_readiness_summary'), 'evals index should include API readiness check');
  assert(evals.evals.some(evalCase => evalCase.id === 'mcp_tool_catalog'), 'evals index should include MCP tool catalog check');
  assert(evals.evals.some(evalCase => evalCase.id === 'signed_provenance_static_artifacts'), 'evals index should include provenance artifact check');
  assertEq(mcp.schema_version, 'anchorfact.mcp.v1');
  assert(mcp.tools.some(tool => tool.name === 'anchorfact_plan_query'), 'MCP profile should include query planner tool metadata');
  assert(mcp.tools.some(tool => tool.name === 'anchorfact_search'), 'MCP profile should include search tool metadata');
  assert(mcp.tools.some(tool => tool.name === 'anchorfact_context'), 'MCP profile should include context tool metadata');
  assert(mcp.tools.some(tool => tool.name === 'anchorfact_content_health'), 'MCP profile should include corpus health tool metadata');
  assert(mcp.tools.some(tool => tool.name === 'anchorfact_resolve_reference'), 'MCP profile should include resolver tool metadata');
  assert(mcp.tools.some(tool => tool.name === 'anchorfact_resolve_references'), 'MCP profile should include batch resolver tool metadata');
  assert(mcp.tools.some(tool => tool.name === 'anchorfact_cite_claim'), 'MCP profile should include citation tool metadata');
  assertEq(graph.public_article_count, 1);
  assert(graph.nodes.some(node => node.id === 'article:ai/public-fixture'), 'graph should link to public article');
  assert(!graph.nodes.some(node => node.id === 'article:draft-fixture'), 'graph should exclude draft article');
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
