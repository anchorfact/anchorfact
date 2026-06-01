#!/usr/bin/env node
import { execFileSync } from 'child_process';
import { generateKeyPairSync } from 'crypto';
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
const signedDistDir = join(root, 'signed-dist');
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
  const robotsTxt = readFileSync(join(distDir, 'robots.txt'), 'utf-8');
  assert(indexHtml.includes('/agent.json'), 'index should link to agent profile');
  assert(indexHtml.includes('/openapi.json'), 'index should link to OpenAPI contract');
  assert(indexHtml.includes('/api'), 'index should link to API index');
  assert(indexHtml.includes('/artifact-summary.json'), 'index should link to artifact summary');
  assert(indexHtml.includes('Default AI calls'), 'index should put machine-first calls near the top');
  assert(indexHtml.indexOf('/api/context?q=') < indexHtml.indexOf('Full machine artifact catalog'), 'index should show context before the full artifact catalog');
  assert(indexHtml.indexOf('/api/evidence?q=') < indexHtml.indexOf('Full machine artifact catalog'), 'index should show evidence before the full artifact catalog');
  assert(indexHtml.indexOf('/api/cite?id=') < indexHtml.indexOf('Full machine artifact catalog'), 'index should show citation before the full artifact catalog');
  assert(indexHtml.includes('/capabilities.json'), 'index should link to capabilities router');
  assert(indexHtml.includes('/content-health.json'), 'index should link to content health');
  assert(indexHtml.includes('/coverage.json'), 'index should link to coverage guide');
  assert(indexHtml.includes('/topics.json'), 'index should link to topics index');
  assert(indexHtml.includes('/examples.json'), 'index should link to examples index');
  assert(indexHtml.includes('/graph.json'), 'index should link to graph index');
  assert(indexHtml.includes('/evals.json'), 'index should link to evals index');
  assert(indexHtml.includes('/mcp.json'), 'index should link to MCP profile');
  assert(indexHtml.includes('/search-index.json'), 'index should link to search index');
  assert(indexHtml.includes('/api/plan?q='), 'index should link to plan API example');
  assert(indexHtml.includes('/api/evidence?q='), 'index should link to evidence API example');
  assert(indexHtml.includes('/api/context?q='), 'index should link to context API example');
  assert(indexHtml.includes('/api/resolve?ref='), 'index should link to resolve API example');
  assert(indexHtml.includes('/api/resolve-batch?ref='), 'index should link to resolve batch API example');
  assert(indexHtml.includes('/api/article?slug='), 'index should link to article API example');
  assert(indexHtml.includes('/api/cite?id='), 'index should link to citation API example');
  assert(indexHtml.includes('/api/claim?id='), 'index should link to claim API example');
  assert(indexHtml.includes('/api/source?url='), 'index should link to source API example');
  assert(llmsTxt.includes('Agent Profile'), 'llms.txt should include agent profile');
  assert(llmsTxt.includes('OpenAPI'), 'llms.txt should include OpenAPI contract');
  assert(llmsTxt.includes('API Index'), 'llms.txt should include API index');
  assert(llmsTxt.includes('Artifact Summary'), 'llms.txt should include artifact summary');
  assert(llmsTxt.includes('Capabilities'), 'llms.txt should include capabilities router');
  assert(llmsTxt.includes('Content Health'), 'llms.txt should include content health');
  assert(llmsTxt.includes('Coverage'), 'llms.txt should include coverage guide');
  assert(llmsTxt.includes('Topics'), 'llms.txt should include topics index');
  assert(llmsTxt.includes('Examples'), 'llms.txt should include examples index');
  assert(llmsTxt.includes('Graph'), 'llms.txt should include graph index');
  assert(llmsTxt.includes('Evals'), 'llms.txt should include evals index');
  assert(llmsTxt.includes('MCP'), 'llms.txt should include MCP profile');
  assert(llmsTxt.includes('Search Index'), 'llms.txt should include search index');
  assert(llmsTxt.includes('Plan API'), 'llms.txt should include plan API');
  assert(llmsTxt.includes('Evidence API'), 'llms.txt should include evidence API');
  assert(llmsTxt.includes('Context API'), 'llms.txt should include context API');
  assert(llmsTxt.includes('Resolve API'), 'llms.txt should include resolve API');
  assert(llmsTxt.includes('Resolve Batch API'), 'llms.txt should include resolve batch API');
  assert(llmsTxt.includes('Article API'), 'llms.txt should include article API');
  assert(llmsTxt.includes('Citation API'), 'llms.txt should include citation API');
  assert(llmsTxt.includes('Claim API'), 'llms.txt should include claim API');
  assert(llmsTxt.includes('Source API'), 'llms.txt should include source API');
  assert(llmsTxt.includes('## Recommended AI Entry Points'), 'llms.txt should lead with recommended AI entry points');
  assert(llmsTxt.includes('/api/context?q={query}'), 'llms.txt should advertise the default context entrypoint');
  assert(llmsTxt.includes('/api/evidence?q={query}'), 'llms.txt should advertise the evidence entrypoint');
  assert(llmsTxt.includes('/api/plan?q={query}'), 'llms.txt should advertise the coverage planning entrypoint');
  assert(llmsTxt.includes('/api/cite?id={claim_id}'), 'llms.txt should advertise the citation entrypoint');
  assert(llmsTxt.includes('/artifact-summary.json'), 'llms.txt should advertise artifact summary');
  assert(llmsTxt.includes('GET https://anchorfact.org/api/context?q=gaussian%20splatting&limit=3&format=markdown'), 'llms.txt should give AI crawlers an executable default context example');
  assert(llmsTxt.includes('GET https://anchorfact.org/api/evidence?q=RLHF&limit=3&format=markdown'), 'llms.txt should give AI crawlers an executable evidence example');
  assert(llmsTxt.indexOf('## Recommended AI Entry Points') < llmsTxt.indexOf('## Public Knowledge Base'), 'llms.txt should show recommended AI entry points before the article index');
  assert(sitemap.includes('/agent.json'), 'sitemap should include agent profile');
  assert(sitemap.includes('/openapi.json'), 'sitemap should include OpenAPI contract');
  assert(sitemap.includes('/api'), 'sitemap should include API index');
  assert(sitemap.includes('/artifact-summary.json'), 'sitemap should include artifact summary');
  assert(sitemap.includes('/capabilities.json'), 'sitemap should include capabilities router');
  assert(sitemap.includes('/content-health.json'), 'sitemap should include content health');
  assert(sitemap.includes('/coverage.json'), 'sitemap should include coverage guide');
  assert(sitemap.includes('/topics.json'), 'sitemap should include topics index');
  assert(sitemap.includes('/examples.json'), 'sitemap should include examples index');
  assert(sitemap.includes('/graph.json'), 'sitemap should include graph index');
  assert(sitemap.includes('/evals.json'), 'sitemap should include evals index');
  assert(sitemap.includes('/mcp.json'), 'sitemap should include MCP profile');
  assert(sitemap.includes('/search-index.json'), 'sitemap should include search index');
  assert(robotsTxt.includes('Sitemap: https://anchorfact.org/sitemap.xml'), 'robots.txt should include sitemap');
  assert(robotsTxt.includes('LLMs: https://anchorfact.org/llms.txt'), 'robots.txt should advertise llms.txt');
  assert(robotsTxt.includes('Agent: https://anchorfact.org/agent.json'), 'robots.txt should advertise agent profile');
  assert(robotsTxt.includes('OpenAPI: https://anchorfact.org/openapi.json'), 'robots.txt should advertise OpenAPI contract');
  assert(robotsTxt.includes('API: https://anchorfact.org/api'), 'robots.txt should advertise API index');
  assert(robotsTxt.includes('Artifact-Summary: https://anchorfact.org/artifact-summary.json'), 'robots.txt should advertise artifact summary');
  assert(robotsTxt.includes('Health: https://anchorfact.org/content-health.json'), 'robots.txt should advertise content health');
  assert(robotsTxt.includes('MCP: https://anchorfact.org/mcp.json'), 'robots.txt should advertise MCP manifest');
  assert(robotsTxt.includes('Provenance: https://anchorfact.org/provenance.json'), 'robots.txt should advertise provenance');
  assert(robotsTxt.includes('AI-Context: https://anchorfact.org/api/context?q={query}'), 'robots.txt should advertise AI context hint');
  assert(robotsTxt.includes('AI-Evidence: https://anchorfact.org/api/evidence?q={query}'), 'robots.txt should advertise AI evidence hint');
  assert(robotsTxt.includes('AI-Plan: https://anchorfact.org/api/plan?q={query}'), 'robots.txt should advertise AI planning hint');
  assert(robotsTxt.includes('AI-Plan-Use: coverage_uncertain_only'), 'robots.txt should reserve planning for uncertain coverage');
  assert(robotsTxt.includes('AI-Cite: https://anchorfact.org/api/cite?id={claim_id}'), 'robots.txt should advertise AI citation hint');
  assert(indexHtml.includes('Public Fixture'), 'index should include public article');
  assert(!indexHtml.includes('Draft Fixture</a></span>'), 'index public list should exclude draft article');
  assert(llmsTxt.includes('Public Fixture'), 'llms.txt should include public article');
  assert(!llmsTxt.includes('Draft Fixture'), 'llms.txt should exclude draft article');
  assert(sitemap.includes('/public-fixture/'), 'sitemap should include public article');
  assert(!sitemap.includes('/draft-fixture/'), 'sitemap should exclude draft article');
  assert(!robotsTxt.includes('draft'), 'robots.txt should not expose draft routes');
});

test('agent profile describes the machine contract', () => {
  assert(existsSync(join(distDir, 'agent.json')), 'agent.json missing');
  assert(existsSync(join(distDir, '.well-known', 'anchorfact.json')), 'well-known agent profile missing');
  const agent = JSON.parse(readFileSync(join(distDir, 'agent.json'), 'utf-8'));
  const wellKnown = JSON.parse(readFileSync(join(distDir, '.well-known', 'anchorfact.json'), 'utf-8'));
  assertEq(agent.schema_version, 'anchorfact.agent.v1');
  assertEq(agent.official_site, 'https://anchorfact.org');
  assertEq(agent.current_snapshot.public_articles, 1);
  assertEq(agent.current_snapshot.draft_articles, 1);
  assertEq(agent.current_snapshot.public_claims, 2);
  assertEq(agent.current_snapshot.topics, 1);
  assertEq(agent.current_snapshot.capabilities, 11);
  assertEq(agent.current_snapshot.content_health_public_articles, 1);
  assertEq(agent.current_snapshot.content_health_draft_articles, 1);
  assertEq(agent.current_snapshot.examples, 7);
  assert(agent.current_snapshot.graph_nodes >= 1, 'agent profile should expose graph node count');
  assert(agent.current_snapshot.graph_edges >= 1, 'agent profile should expose graph edge count');
  assertEq(agent.current_snapshot.evals, 53);
  assertEq(agent.current_snapshot.mcp_tools, 9);
  assert(agent.current_snapshot.unique_sources >= 1, 'agent profile should expose source count');
  assertEq(agent.endpoints.claims.url, 'https://anchorfact.org/claims.json');
  assertEq(agent.schemas.artifact_summary, 'anchorfact.artifact-summary.v1');
  assertEq(agent.endpoints.topics.url, 'https://anchorfact.org/topics.json');
  assertEq(agent.endpoints.capabilities.url, 'https://anchorfact.org/capabilities.json');
  assertEq(agent.endpoints.content_health.url, 'https://anchorfact.org/content-health.json');
  assertEq(agent.endpoints.coverage.url, 'https://anchorfact.org/coverage.json');
  assertEq(agent.endpoints.examples.url, 'https://anchorfact.org/examples.json');
  assertEq(agent.endpoints.graph.url, 'https://anchorfact.org/graph.json');
  assertEq(agent.endpoints.evals.url, 'https://anchorfact.org/evals.json');
  assertEq(agent.endpoints.mcp.url, 'https://anchorfact.org/mcp.json');
  assertEq(agent.endpoints.openapi.url, 'https://anchorfact.org/openapi.json');
  assertEq(agent.endpoints.api_index.path, '/api');
  assertEq(agent.endpoints.artifact_summary.url, 'https://anchorfact.org/artifact-summary.json');
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
  assertEq(agent.endpoints.sources.url, 'https://anchorfact.org/sources.json');
  assertEq(agent.endpoints.search_index.url, 'https://anchorfact.org/search-index.json');
  assertEq(agent.quick_start.default_answer_path, '/api/context?q={query}');
  assertEq(agent.quick_start.default_answer_mode, 'answer_with_citations');
  assertEq(agent.quick_start.local_mcp_answer_tool, 'anchorfact_context');
  assertEq(agent.quick_start.citation_path, '/api/cite?id={claim_id}');
  assert(agent.quick_start.example_calls.some(example => example.path === '/api/context?q=gaussian%20splatting&limit=3&format=markdown'), 'agent profile should expose an executable default context example');
  assert(agent.quick_start.example_calls.some(example => example.path === '/api/evidence?q=RLHF&limit=3&format=markdown'), 'agent profile should expose an executable evidence example');
  assertEq(agent.quick_start.trust_check.path, '/provenance.json');
  assertEq(agent.quick_start.fallback_policy.unsupported_answer_mode, 'external_sources_required');
  assert(agent.quick_start.do_not_use.includes('draft entries'), 'quick start should warn against draft citation');
  assert(agent.quick_start.steps.some(step => step.id === 'assemble_context' && step.path === '/api/context?q={query}'), 'quick start should make context the default answer path');
  assert(agent.quick_start.steps.some(step => step.id === 'verify_provenance' && step.path === '/provenance.json'), 'quick start should make provenance verification explicit');
  assert(agent.recommended_workflow.some(step => step.includes('/openapi.json')), 'agent workflow should mention OpenAPI');
  assert(agent.recommended_workflow.some(step => step.includes('/artifact-summary.json')), 'agent workflow should mention artifact summary');
  assert(agent.recommended_workflow.some(step => step.includes('/provenance.json')), 'agent workflow should mention provenance');
  assert(agent.recommended_workflow.some(step => step.includes('/topics.json')), 'agent workflow should mention topics index');
  assert(agent.recommended_workflow.some(step => step.includes('/capabilities.json')), 'agent workflow should mention capabilities router');
  assert(agent.recommended_workflow.some(step => step.includes('/content-health.json')), 'agent workflow should mention content health');
  assert(agent.recommended_workflow.some(step => step.includes('/coverage.json')), 'agent workflow should mention coverage guide');
  assert(agent.recommended_workflow.some(step => step.includes('/examples.json')), 'agent workflow should mention examples index');
  assert(agent.recommended_workflow.some(step => step.includes('/graph.json')), 'agent workflow should mention graph index');
  assert(agent.recommended_workflow.some(step => step.includes('/evals.json')), 'agent workflow should mention evals index');
  assert(agent.recommended_workflow.some(step => step.includes('/mcp.json')), 'agent workflow should mention MCP profile');
  assert(agent.recommended_workflow.some(step => step.includes('/search-index.json')), 'agent workflow should mention search index');
  assert(agent.recommended_workflow.some(step => step.includes('/api as a compact API index')), 'agent workflow should mention API index');
  assert(agent.recommended_workflow.some(step => step.includes('/api/plan')), 'agent workflow should mention plan API');
  assert(agent.recommended_workflow.some(step => step.includes('/api/evidence')), 'agent workflow should mention evidence API');
  assert(agent.recommended_workflow.some(step => step.includes('/api/context')), 'agent workflow should mention context API');
  assert(agent.recommended_workflow.some(step => step.includes('/api/resolve')), 'agent workflow should mention resolve API');
  assert(agent.recommended_workflow.some(step => step.includes('/api/resolve-batch')), 'agent workflow should mention resolve batch API');
  assert(agent.recommended_workflow.some(step => step.includes('/api/article')), 'agent workflow should mention article API');
  assert(agent.recommended_workflow.some(step => step.includes('/api/cite')), 'agent workflow should mention citation API');
  assert(agent.recommended_workflow.some(step => step.includes('/api/claim')), 'agent workflow should mention claim API');
  assert(agent.recommended_workflow.some(step => step.includes('/api/source')), 'agent workflow should mention source API');
  assert(agent.recommended_workflow.some(step => step.includes('/sources.json')), 'agent workflow should mention source index');
  const provenanceWorkflowIndex = agent.recommended_workflow.findIndex(step => step.includes('/provenance.json'));
  const contextWorkflowIndex = agent.recommended_workflow.findIndex(step => step.includes('/api/context'));
  const evidenceWorkflowIndex = agent.recommended_workflow.findIndex(step => step.includes('/api/evidence'));
  const planWorkflowIndex = agent.recommended_workflow.findIndex(step => step.includes('/api/plan'));
  const citeWorkflowIndex = agent.recommended_workflow.findIndex(step => step.includes('/api/cite'));
  const resolveWorkflowIndex = agent.recommended_workflow.findIndex(step => step.includes('/api/resolve?'));
  assert(provenanceWorkflowIndex > -1, 'agent workflow should include provenance verification');
  assert(contextWorkflowIndex > provenanceWorkflowIndex, 'agent workflow should verify provenance before default context retrieval');
  assert(evidenceWorkflowIndex > contextWorkflowIndex, 'agent workflow should make context the default before evidence packs');
  assert(planWorkflowIndex > evidenceWorkflowIndex, 'agent workflow should place plan after context and evidence');
  assert(agent.recommended_workflow[planWorkflowIndex].includes('not sure'), 'agent workflow should reserve plan for uncertain coverage decisions');
  assert(citeWorkflowIndex > planWorkflowIndex, 'agent workflow should put citation follow-ups after primary entrypoints');
  assert(resolveWorkflowIndex > planWorkflowIndex, 'agent workflow should put resolve follow-ups after primary entrypoints');
  assertEq(wellKnown, agent, 'well-known alias should match agent.json');
});

test('openapi.json describes the static AI contract', () => {
  assert(existsSync(join(distDir, 'openapi.json')), 'openapi.json missing');
  const openapi = JSON.parse(readFileSync(join(distDir, 'openapi.json'), 'utf-8'));
  assertEq(openapi.openapi, '3.1.0');
  assertEq(openapi.info.title, 'AnchorFact Machine API');
  assertEq(openapi['x-anchorfact-schema-version'], 'anchorfact.openapi.v1');
  assertEq(openapi['x-provenance-url'], 'https://anchorfact.org/provenance.json');
  assertEq(openapi.servers[0].url, 'https://anchorfact.org');
  assert(openapi.paths['/agent.json'], 'OpenAPI should describe agent profile');
  assert(openapi.paths['/artifact-summary.json'], 'OpenAPI should describe artifact summary');
  assert(openapi.paths['/claims.json'], 'OpenAPI should describe claims endpoint');
  assert(openapi.paths['/capabilities.json'], 'OpenAPI should describe capabilities endpoint');
  assert(openapi.paths['/content-health.json'], 'OpenAPI should describe content health endpoint');
  assert(openapi.paths['/coverage.json'], 'OpenAPI should describe coverage endpoint');
  assert(openapi.paths['/topics.json'], 'OpenAPI should describe topics endpoint');
  assert(openapi.paths['/examples.json'], 'OpenAPI should describe examples endpoint');
  assert(openapi.paths['/graph.json'], 'OpenAPI should describe graph endpoint');
  assert(openapi.paths['/evals.json'], 'OpenAPI should describe evals endpoint');
  assert(openapi.paths['/mcp.json'], 'OpenAPI should describe MCP endpoint');
  assert(openapi.paths['/api'], 'OpenAPI should describe API index');
  assert(openapi.paths['/api/plan'], 'OpenAPI should describe plan API');
  assert(openapi.paths['/api/evidence'], 'OpenAPI should describe evidence API');
  assert(openapi.paths['/api/context'], 'OpenAPI should describe context API');
  assert(openapi.paths['/api/resolve'], 'OpenAPI should describe resolve API');
  assert(openapi.paths['/api/resolve-batch'], 'OpenAPI should describe resolve batch API');
  assert(openapi.paths['/api/search'], 'OpenAPI should describe search API');
  assert(openapi.paths['/api/article'], 'OpenAPI should describe article API');
  assert(openapi.paths['/api/cite'], 'OpenAPI should describe citation API');
  assert(openapi.paths['/api/claim'], 'OpenAPI should describe claim API');
  assert(openapi.paths['/api/source'], 'OpenAPI should describe source API');
  assert(openapi.paths['/search-index.json'], 'OpenAPI should describe search index endpoint');
  assert(openapi.paths['/sources.json'], 'OpenAPI should describe sources endpoint');
  assert(openapi.paths['/{canonical_slug}/index.json'], 'OpenAPI should describe article JSON-LD template');
  assert(openapi.components.schemas.AgentProfile.properties.quick_start, 'OpenAPI should describe agent quick-start guidance');
  assert(openapi.components.schemas.AgentQuickStart.properties.default_answer_path, 'OpenAPI should define default answer path guidance');
  assert(openapi.components.schemas.AgentQuickStart.properties.fallback_policy, 'OpenAPI should define fallback policy guidance');
  assert(openapi.components.schemas.Topics, 'OpenAPI should define Topics schema');
  assert(openapi.components.schemas.Capabilities, 'OpenAPI should define Capabilities schema');
  assert(openapi.components.schemas.ContentHealth, 'OpenAPI should define ContentHealth schema');
  assert(openapi.components.schemas.Coverage, 'OpenAPI should define Coverage schema');
  assert(openapi.components.schemas.Examples, 'OpenAPI should define Examples schema');
  assert(openapi.components.schemas.Graph, 'OpenAPI should define Graph schema');
  assert(openapi.components.schemas.Evals, 'OpenAPI should define Evals schema');
  assert(openapi.components.schemas.ApiIndex, 'OpenAPI should define API index schema');
  assert(openapi.components.schemas.ArtifactSummary, 'OpenAPI should define artifact summary schema');
  assert(openapi.components.schemas.McpProfile, 'OpenAPI should define MCP schema');
  assert(openapi.components.schemas.SearchIndex, 'OpenAPI should define SearchIndex schema');
  assert(openapi.components.schemas.EvidenceApiResponse, 'OpenAPI should define EvidenceApiResponse schema');
  assert(openapi.components.schemas.ContextApiResponse, 'OpenAPI should define ContextApiResponse schema');
  assert(openapi.components.schemas.ContextApiResponse.properties.content_health, 'OpenAPI context schema should include content health summary');
  assert(openapi.components.schemas.ContextApiResponse.properties.answer_policy, 'OpenAPI context schema should include answer policy');
  assert(openapi.components.schemas.ContextApiResponse.properties.citation_ready_claims, 'OpenAPI context schema should include citation-ready claims');
  assert(openapi.components.schemas.AnswerPolicy.properties.can_answer_with_anchorfact, 'OpenAPI should define AnswerPolicy fields');
  assert(openapi.components.schemas.CitationReadyClaim.properties.cite_api_path, 'OpenAPI should define CitationReadyClaim fields');
  assert(openapi.components.schemas.ResolveApiResponse, 'OpenAPI should define ResolveApiResponse schema');
  assert(openapi.components.schemas.ResolveBatchApiResponse, 'OpenAPI should define ResolveBatchApiResponse schema');
  assert(openapi.components.schemas.ArticleApiResponse, 'OpenAPI should define ArticleApiResponse schema');
  assert(openapi.components.schemas.CiteApiResponse, 'OpenAPI should define CiteApiResponse schema');
  assert(openapi.components.schemas.ClaimApiResponse, 'OpenAPI should define ClaimApiResponse schema');
  assert(openapi.components.schemas.SourceApiResponse, 'OpenAPI should define SourceApiResponse schema');
});

test('artifact-summary.json describes large machine artifacts and lightweight alternatives', () => {
  assert(existsSync(join(distDir, 'artifact-summary.json')), 'artifact-summary.json missing');
  const summary = JSON.parse(readFileSync(join(distDir, 'artifact-summary.json'), 'utf-8'));
  assertEq(summary.schema_version, 'anchorfact.artifact-summary.v1');
  assertEq(summary.provenance_url, 'https://anchorfact.org/provenance.json');
  assert(summary.total_bytes > 0, 'artifact summary should include total bytes');
  assert(summary.recommended_default_calls.some(call => call.path === '/api/context?q={query}'), 'artifact summary should recommend context first');
  assert(summary.recommended_default_calls.some(call => call.path === '/api/evidence?q={query}'), 'artifact summary should recommend evidence second');
  const graph = summary.artifacts.find(artifact => artifact.path === '/graph.json');
  assert(graph, 'artifact summary should include graph.json');
  assert(graph.bytes > 0, 'graph summary should include byte size');
  assertEq(graph.recommended_alternative, '/api/context?q={query}');
  assertEq(graph.cache_posture, 'public, max-age=0, must-revalidate');
  const search = summary.artifacts.find(artifact => artifact.path === '/search-index.json');
  assert(search, 'artifact summary should include search-index.json');
  assertEq(search.recommended_alternative, '/api/evidence?q={query}');
});

test('search-index.json exposes compact public retrieval records', () => {
  assert(existsSync(join(distDir, 'search-index.json')), 'search-index.json missing');
  const search = JSON.parse(readFileSync(join(distDir, 'search-index.json'), 'utf-8'));
  assertEq(search.schema_version, 'anchorfact.search-index.v1');
  assertEq(search.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(search.article_count, 1);
  assertEq(search.public_claim_count, 2);
  assertEq(search.records.length, 1);
  const record = search.records[0];
  assertEq(record.canonical_slug, 'public-fixture');
  assertEq(record.title, 'Public Fixture');
  assertEq(record.url, 'https://anchorfact.org/public-fixture/');
  assertEq(record.confidence_level, 'medium');
  assertEq(record.claim_count, 2);
  assertEq(record.source_count, 1);
  assertEq(record.source_coverage, { verified: 1, total: 1, ratio: 1 });
  assert(record.source_tiers.includes('S'), 'record should include S source tier');
  assert(record.claim_ids.includes('https://anchorfact.org/fact/fact-public-fixture-1'), 'record should expose claim ids');
  assert(record.keywords.includes('fixture'), 'record should include stable keywords');
  assert(record.search_text.includes('public fixture claim'), 'search text should include public claims');
  assert(!record.search_text.includes('draft fixture'), 'search text should exclude drafts');
});

test('topics.json describes public topic coverage', () => {
  assert(existsSync(join(distDir, 'topics.json')), 'topics.json missing');
  const topics = JSON.parse(readFileSync(join(distDir, 'topics.json'), 'utf-8'));
  assertEq(topics.schema_version, 'anchorfact.topics.v1');
  assertEq(topics.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(topics.topic_count, 1);
  assertEq(topics.public_article_count, 1);
  assertEq(topics.public_claim_count, 2);
  assertEq(topics.topics[0].id, 'public-fixture');
  assertEq(topics.topics[0].article_count, 1);
  assertEq(topics.topics[0].claim_count, 2);
  assertEq(topics.topics[0].top_articles[0].canonical_slug, 'public-fixture');
});

test('capabilities.json describes AI endpoint routing', () => {
  assert(existsSync(join(distDir, 'capabilities.json')), 'capabilities.json missing');
  const capabilities = JSON.parse(readFileSync(join(distDir, 'capabilities.json'), 'utf-8'));
  assertEq(capabilities.schema_version, 'anchorfact.capabilities.v1');
  assertEq(capabilities.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(capabilities.capability_count, 11);
  const planner = capabilities.capabilities.find(capability => capability.id === 'plan_query');
  assert(planner, 'capabilities should include query planning workflow');
  assert(planner.local_mcp_tools.some(tool => tool.tool === 'anchorfact_plan_query'), 'plan capability should include local MCP planner mapping');
  assert(capabilities.capabilities.some(capability => capability.id === 'answer_with_evidence'), 'capabilities should include evidence workflow');
  assert(capabilities.capabilities.some(capability => capability.id === 'inspect_corpus_health'), 'capabilities should include corpus health workflow');
  assert(capabilities.capabilities.some(capability => capability.id === 'resolve_many_references'), 'capabilities should include batch resolver workflow');
  assert(capabilities.capabilities.some(capability => capability.id === 'verify_official_build'), 'capabilities should include provenance verification workflow');
  assert(capabilities.default_sequence.includes('verify_official_build'), 'capabilities should put provenance in the default sequence');
});

test('content-health.json describes machine-readable corpus health', () => {
  assert(existsSync(join(distDir, 'content-health.json')), 'content-health.json missing');
  const health = JSON.parse(readFileSync(join(distDir, 'content-health.json'), 'utf-8'));
  assertEq(health.schema_version, 'anchorfact.content-health.v1');
  assertEq(health.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(health.snapshot.public_articles, 1);
  assertEq(health.snapshot.draft_articles, 1);
  assertEq(health.snapshot.public_claims, 2);
  assertEq(health.public.source_coverage.full, 1);
  assertEq(health.public.claim_mapping.total, 2);
  assertEq(health.public.claim_mapping.mapped, 2);
  assert(health.machine_guidance.some(item => item.includes('/api/context')), 'health guidance should mention context API');
  assertEq(health.trust_boundaries.draft_entries_excluded_from_ai_entrypoints, true);
});

test('coverage.json describes public coverage and limits', () => {
  assert(existsSync(join(distDir, 'coverage.json')), 'coverage.json missing');
  const coverage = JSON.parse(readFileSync(join(distDir, 'coverage.json'), 'utf-8'));
  assertEq(coverage.schema_version, 'anchorfact.coverage.v1');
  assertEq(coverage.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(coverage.coverage_summary.public_articles, 1);
  assertEq(coverage.coverage_summary.public_claims, 2);
  assertEq(coverage.coverage_summary.confidence_distribution.medium, 1);
  assert(coverage.query_benchmark.cases.some(item => item.expected_top_slug === 'ai/rlhf'), 'coverage should expose the representative query benchmark');
  assert(coverage.query_benchmark.pass_gate.includes('/evals.json'), 'coverage benchmark should point to executable evals');
  assert(coverage.topic_coverage.some(topic => topic.id === 'public-fixture'), 'coverage should include fixture topic');
  assert(coverage.coverage_limits.some(limit => limit.id === 'not_general_web_search'), 'coverage should describe limits');
});

test('examples.json describes executable AI usage examples', () => {
  assert(existsSync(join(distDir, 'examples.json')), 'examples.json missing');
  const examples = JSON.parse(readFileSync(join(distDir, 'examples.json'), 'utf-8'));
  assertEq(examples.schema_version, 'anchorfact.examples.v1');
  assertEq(examples.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(examples.example_count, 7);
  assertEq(examples.examples.map(example => example.id), [
    'local_mcp_planning_and_citation',
    'one_call_evidence_pack',
    'search_to_article_evidence',
    'claim_dereference',
    'mixed_reference_resolution',
    'source_reuse_lookup',
    'static_fallback'
  ]);
  const mcpExample = examples.examples[0];
  assert(mcpExample.workflow.some(step => step.mcp_tool?.tool === 'anchorfact_plan_query'), 'examples should show MCP planner usage');
  assert(mcpExample.workflow.some(step => step.mcp_tool?.tool === 'anchorfact_context'), 'examples should show MCP context usage');
  assert(mcpExample.workflow.some(step => step.mcp_tool?.tool === 'anchorfact_cite_claim'), 'examples should show MCP citation usage');
  const evidenceExample = examples.examples[1];
  assert(evidenceExample.workflow.some(step => step.call.path.includes('/api/evidence?')), 'examples should show evidence API usage');
  const claimExample = examples.examples.find(example => example.id === 'claim_dereference');
  assert(claimExample.workflow.some(step => step.call.path.includes('/api/resolve?')), 'examples should show resolve API usage');
  assert(claimExample.workflow.some(step => step.call.path.includes('/api/cite?')), 'examples should show citation API usage');
  const mixedExample = examples.examples.find(example => example.id === 'mixed_reference_resolution');
  assert(mixedExample.workflow.some(step => step.call.path.includes('/api/resolve-batch?')), 'examples should show resolve batch API usage');
  const searchExample = examples.examples[2];
  assert(searchExample.workflow.some(step => step.call.path.includes('/api/search?')), 'examples should show search API usage');
  assert(searchExample.workflow.some(step => step.call.path.includes('/api/article?')), 'examples should show article API usage');
  assertEq(searchExample.expected_anchor.article.canonical_slug, 'public-fixture');
});

test('graph.json describes public relationship graph', () => {
  assert(existsSync(join(distDir, 'graph.json')), 'graph.json missing');
  const graph = JSON.parse(readFileSync(join(distDir, 'graph.json'), 'utf-8'));
  assertEq(graph.schema_version, 'anchorfact.graph.v1');
  assertEq(graph.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(graph.public_article_count, 1);
  assertEq(graph.public_claim_count, 2);
  assert(graph.nodes.some(node => node.id === 'article:public-fixture'), 'graph should include public article node');
  assert(graph.nodes.some(node => node.type === 'claim'), 'graph should include claim nodes');
  assert(graph.nodes.some(node => node.type === 'source'), 'graph should include source nodes');
  assert(graph.edges.some(edge => edge.type === 'article_has_claim'), 'graph should link public articles to claims');
  assert(!graph.nodes.some(node => String(node.id).includes('draft-fixture')), 'graph should exclude draft article nodes');
  assertEq(graph.node_count, graph.nodes.length);
  assertEq(graph.edge_count, graph.edges.length);
});

test('evals.json describes executable AI integration checks', () => {
  assert(existsSync(join(distDir, 'evals.json')), 'evals.json missing');
  const evals = JSON.parse(readFileSync(join(distDir, 'evals.json'), 'utf-8'));
  assertEq(evals.schema_version, 'anchorfact.evals.v1');
  assertEq(evals.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(evals.eval_count, 53);
  assertEq(evals.evals.map(evalCase => evalCase.id), [
    'api_discovery',
    'llms_txt_primary_entrypoints',
    'robots_txt_ai_entrypoints',
    'openapi_context_contract',
    'query_plan',
    'unsupported_query_plan',
    'evidence_pack_json',
    'ai_query_routing_retrieval_augmented_generation',
    'ai_query_routing_parameter_efficient_fine_tuning',
    'ai_query_intent_fine_tune_with_adapters',
    'ai_query_routing_rlhf',
    'ai_query_routing_mixture_of_experts',
    'ai_query_routing_low_resource_nlp',
    'ai_query_routing_kolmogorov_arnold_networks',
    'ai_query_routing_vision_transformers',
    'ai_query_routing_meta_learning',
    'query_routing_postgresql',
    'query_routing_rest_api',
    'query_routing_http_status_codes',
    'query_routing_quic_protocol',
    'query_routing_climate_change',
    'query_routing_stock_market_basics',
    'query_routing_ancient_egypt',
    'query_routing_public_speaking',
    'query_routing_sports_biomechanics',
    'agent_usage_anchorfact_citation_help',
    'unsupported_medical_personal_advice',
    'unsupported_medication_change_advice',
    'unsupported_medication_safety_lookup',
    'unsupported_weak_medical_topic_match',
    'unsupported_weak_medical_management_match',
    'unsupported_harmful_operational_request',
    'unsupported_live_stock_price',
    'unsupported_product_pricing_lookup',
    'unsupported_financial_rate_lookup',
    'unsupported_financial_price_prediction',
    'unsupported_software_current_version_lookup',
    'unsupported_live_weather_location',
    'unsupported_current_leadership_fact',
    'context_pack_json',
    'unsupported_query_evidence',
    'unsupported_context_pack_json',
    'evidence_pack_markdown',
    'claim_dereference',
    'reference_resolver',
    'batch_reference_resolver',
    'citation_export',
    'source_reuse_lookup',
    'graph_relationships',
    'content_health_summary',
    'coverage_query_benchmark_catalog',
    'mcp_tool_catalog',
    'signed_provenance_static_artifacts'
  ]);
  assert(evals.evals.some(evalCase => evalCase.call.path === '/api'), 'evals should include API discovery checks');
  const llmsDiscoveryEval = evals.evals.find(evalCase => evalCase.id === 'llms_txt_primary_entrypoints');
  assertEq(llmsDiscoveryEval.call.path, '/llms.txt');
  assert(llmsDiscoveryEval.expected.contains_text.includes('/api/context?q={query}'), 'llms discovery eval should require context entrypoint');
  assert(llmsDiscoveryEval.expected.contains_text.includes('/api/evidence?q={query}'), 'llms discovery eval should require evidence entrypoint');
  assert(llmsDiscoveryEval.expected.contains_text.includes('/api/plan?q={query}'), 'llms discovery eval should require plan entrypoint');
  assert(llmsDiscoveryEval.expected.contains_text.includes('/artifact-summary.json'), 'llms discovery eval should require artifact summary');
  const robotsDiscoveryEval = evals.evals.find(evalCase => evalCase.id === 'robots_txt_ai_entrypoints');
  assertEq(robotsDiscoveryEval.call.path, '/robots.txt');
  assert(robotsDiscoveryEval.expected.contains_text.includes('AI-Context'), 'robots discovery eval should require AI context hint');
  assert(robotsDiscoveryEval.expected.contains_text.includes('AI-Evidence'), 'robots discovery eval should require AI evidence hint');
  assert(robotsDiscoveryEval.expected.contains_text.includes('Artifact-Summary'), 'robots discovery eval should require artifact summary hint');
  assert(evals.evals.some(evalCase => evalCase.id === 'openapi_context_contract'), 'evals should include OpenAPI context contract check');
  assert(evals.evals.some(evalCase => evalCase.id === 'ai_query_routing_rlhf'), 'evals should include high-intent AI query routing checks');
  assert(evals.evals.some(evalCase => evalCase.id === 'query_routing_climate_change'), 'evals should include cross-domain query routing checks');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_medical_personal_advice'), 'evals should include high-stakes personal advice refusal checks');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_medication_change_advice'), 'evals should include medication-change refusal checks');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_medication_safety_lookup'), 'evals should include medication-safety refusal checks');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_weak_medical_topic_match'), 'evals should include weak medical-topic match refusal checks');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_weak_medical_management_match'), 'evals should include weak medical-management match refusal checks');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_harmful_operational_request'), 'evals should include harmful operational request refusal checks');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_product_pricing_lookup'), 'evals should include product-pricing refusal checks');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_financial_rate_lookup'), 'evals should include financial-rate refusal checks');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_financial_price_prediction'), 'evals should include price-prediction refusal checks');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_software_current_version_lookup'), 'evals should include current software-version refusal checks');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_live_weather_location'), 'evals should include implicit live weather refusal checks');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_current_leadership_fact'), 'evals should include current leadership refusal checks');
  assert(evals.evals.some(evalCase => evalCase.call.path.includes('/api/plan?')), 'evals should include plan API checks');
  assert(evals.evals.some(evalCase => evalCase.call.path.includes('/api/evidence?')), 'evals should include evidence API checks');
  assert(evals.evals.some(evalCase => evalCase.call.path.includes('/api/context?')), 'evals should include context API checks');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_query_plan'), 'evals should include unsupported plan check');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_query_evidence'), 'evals should include unsupported evidence check');
  assert(evals.evals.some(evalCase => evalCase.id === 'unsupported_context_pack_json'), 'evals should include unsupported context policy check');
  assert(evals.evals.some(evalCase => evalCase.call.path.includes('/api/resolve?')), 'evals should include resolve API checks');
  assert(evals.evals.some(evalCase => evalCase.call.path.includes('/api/resolve-batch?')), 'evals should include resolve batch API checks');
  assert(evals.evals.some(evalCase => evalCase.call.path.includes('/api/claim?')), 'evals should include claim API checks');
  assert(evals.evals.some(evalCase => evalCase.call.path.includes('/api/cite?')), 'evals should include citation API checks');
  assert(evals.evals.some(evalCase => evalCase.call.path === '/graph.json'), 'evals should include graph checks');
  assert(evals.evals.some(evalCase => evalCase.call.path === '/content-health.json'), 'evals should include content health checks');
  const mcpEval = evals.evals.find(evalCase => evalCase.id === 'mcp_tool_catalog');
  assert(mcpEval.expected.required_tools.includes('anchorfact_plan_query'), 'evals should include MCP planner metadata check');
  assert(mcpEval.expected.required_tools.includes('anchorfact_context'), 'evals should include MCP context metadata check');
  assert(mcpEval.expected.required_tools.includes('anchorfact_content_health'), 'evals should include MCP corpus health metadata check');
  const provenanceEval = evals.evals.find(evalCase => evalCase.id === 'signed_provenance_static_artifacts');
  assert(provenanceEval.expected.required_artifacts.includes('evals_json'), 'evals should require self hash in provenance');
  assert(provenanceEval.expected.required_artifacts.includes('mcp_json'), 'evals should require MCP hash in provenance');
  assert(provenanceEval.expected.required_artifacts.includes('artifact_summary_json'), 'evals should require artifact summary hash in provenance');
  assert(provenanceEval.expected.required_artifacts.includes('capabilities_json'), 'evals should require capabilities hash in provenance');
  assert(provenanceEval.expected.required_artifacts.includes('content_health_json'), 'evals should require content health hash in provenance');
  assert(provenanceEval.expected.required_artifacts.includes('coverage_json'), 'evals should require coverage hash in provenance');
});

test('mcp.json describes local MCP installation and tools', () => {
  assert(existsSync(join(distDir, 'mcp.json')), 'mcp.json missing');
  const mcp = JSON.parse(readFileSync(join(distDir, 'mcp.json'), 'utf-8'));
  assertEq(mcp.schema_version, 'anchorfact.mcp.v1');
  assertEq(mcp.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(mcp.installation.stdio.config_snippet.mcpServers.anchorfact.command, 'python');
  assertEq(mcp.installation.stdio.config_snippet.mcpServers.anchorfact.args, ['src/mcp_server.py']);
  assertEq(mcp.installation.local_http_wrapper.endpoints.corpus_health, 'http://127.0.0.1:8000/corpus-health');
  assertEq(mcp.tools.map(tool => tool.name), [
    'anchorfact_plan_query',
    'anchorfact_search',
    'anchorfact_context',
    'anchorfact_content_health',
    'anchorfact_get_article',
    'anchorfact_resolve_reference',
    'anchorfact_resolve_references',
    'anchorfact_cite_claim',
    'anchorfact_list_categories'
  ]);
  assert(mcp.related_public_artifacts.includes('/evals.json'), 'MCP profile should link evals');
  assert(mcp.related_public_artifacts.includes('/capabilities.json'), 'MCP profile should link capabilities');
  assert(mcp.related_public_artifacts.includes('/coverage.json'), 'MCP profile should link coverage');
});

test('sources.json describes deduplicated public evidence sources', () => {
  assert(existsSync(join(distDir, 'sources.json')), 'sources.json missing');
  const sources = JSON.parse(readFileSync(join(distDir, 'sources.json'), 'utf-8'));
  assertEq(sources.schema_version, 'anchorfact.sources.v1');
  assertEq(sources.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(sources.public_article_count, 1);
  assertEq(sources.public_claim_count, 2);
  assert(sources.source_count >= 1, 'sources should include at least one source');
  assert(sources.tier_distribution.S >= 1, 'DOI source should be S-tier');
  const fixtureSource = sources.sources.find(source => source.title === 'Fixture Paper');
  assert(fixtureSource, 'fixture source missing');
  assertEq(fixtureSource.type, 'academic_paper');
  assertEq(fixtureSource.tier, 'S');
  assertEq(fixtureSource.article_count, 1);
  assertEq(fixtureSource.claim_count, 0);
  assertEq(fixtureSource.articles[0].canonical_slug, 'public-fixture');
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
  assertEq(provenance.signature.status, 'unsigned');
  assert(!existsSync(join(distDir, 'provenance.sig')), 'provenance.sig should only be generated when a signing key is configured');
  assertEq(provenance.content_counts, {
    articles: 2,
    public: 1,
    draft: 1,
    claims: 2
  });
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.manifest_json.sha256), 'manifest checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.agent_json.sha256), 'agent checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.openapi_json.sha256), 'OpenAPI checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.claims_json.sha256), 'claims checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.topics_json.sha256), 'topics checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.capabilities_json.sha256), 'capabilities checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.content_health_json.sha256), 'content health checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.coverage_json.sha256), 'coverage checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.examples_json.sha256), 'examples checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.graph_json.sha256), 'graph checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.evals_json.sha256), 'evals checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.mcp_json.sha256), 'mcp checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.artifact_summary_json.sha256), 'artifact summary checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.search_index_json.sha256), 'search index checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.sources_json.sha256), 'sources checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.llms_txt.sha256), 'llms checksum should be sha256 hex');
  assert(provenance.artifacts.manifest_json.bytes > 0, 'manifest artifact should include byte size');
  assert(provenance.artifacts.agent_json.bytes > 0, 'agent artifact should include byte size');
  assert(provenance.artifacts.openapi_json.bytes > 0, 'OpenAPI artifact should include byte size');
  assert(provenance.artifacts.claims_json.bytes > 0, 'claims artifact should include byte size');
  assert(provenance.artifacts.topics_json.bytes > 0, 'topics artifact should include byte size');
  assert(provenance.artifacts.capabilities_json.bytes > 0, 'capabilities artifact should include byte size');
  assert(provenance.artifacts.content_health_json.bytes > 0, 'content health artifact should include byte size');
  assert(provenance.artifacts.coverage_json.bytes > 0, 'coverage artifact should include byte size');
  assert(provenance.artifacts.examples_json.bytes > 0, 'examples artifact should include byte size');
  assert(provenance.artifacts.graph_json.bytes > 0, 'graph artifact should include byte size');
  assert(provenance.artifacts.evals_json.bytes > 0, 'evals artifact should include byte size');
  assert(provenance.artifacts.mcp_json.bytes > 0, 'mcp artifact should include byte size');
  assert(provenance.artifacts.artifact_summary_json.bytes > 0, 'artifact summary artifact should include byte size');
  assert(provenance.artifacts.search_index_json.bytes > 0, 'search index artifact should include byte size');
  assert(provenance.artifacts.sources_json.bytes > 0, 'sources artifact should include byte size');
  assert(provenance.artifacts.llms_txt.bytes > 0, 'llms artifact should include byte size');
});

test('provenance.sig is generated when a signing key is configured', () => {
  const { privateKey } = generateKeyPairSync('ed25519');
  const privateKeyPem = privateKey.export({ type: 'pkcs8', format: 'pem' }).toString();
  execFileSync('node', ['src/compile.js', contentDir, signedDistDir, reportPath], {
    stdio: 'pipe',
    env: {
      ...process.env,
      ANCHORFACT_PROVENANCE_PRIVATE_KEY_PEM: privateKeyPem
    }
  });

  const provenance = JSON.parse(readFileSync(join(signedDistDir, 'provenance.json'), 'utf-8'));
  const signature = JSON.parse(readFileSync(join(signedDistDir, 'provenance.sig'), 'utf-8'));
  assertEq(provenance.signature.status, 'signed');
  assertEq(provenance.signature.algorithm, 'Ed25519');
  assertEq(signature.schema_version, 'anchorfact.provenance-signature.v1');
  assertEq(signature.signed_artifact, '/provenance.json');
  assert(signature.public_key_pem.includes('BEGIN PUBLIC KEY'), 'signature should include public key PEM');
  assert(/^[a-f0-9]{64}$/.test(signature.payload_sha256), 'signature should include payload sha256');
});

test('_headers is generated for Cloudflare Pages static output', () => {
  const headers = readFileSync(join(distDir, '_headers'), 'utf-8');
  const revalidatedMachineArtifacts = [
    '/agent.json',
    '/.well-known/anchorfact.json',
    '/openapi.json',
    '/artifact-summary.json',
    '/manifest.json',
    '/claims.json',
    '/topics.json',
    '/capabilities.json',
    '/content-health.json',
    '/coverage.json',
    '/examples.json',
    '/graph.json',
    '/evals.json',
    '/mcp.json',
    '/search-index.json',
    '/sources.json',
    '/llms.txt',
    '/provenance.json',
    '/provenance.sig'
  ];
  assert(headers.includes('/*\n  X-Content-Type-Options: nosniff'), '_headers should include global security headers');
  assert(headers.includes('/agent.json\n  Access-Control-Allow-Origin: *'), '_headers should expose agent profile CORS');
  assert(headers.includes('/.well-known/anchorfact.json\n  Access-Control-Allow-Origin: *'), '_headers should expose well-known agent profile CORS');
  assert(headers.includes('/openapi.json\n  Access-Control-Allow-Origin: *'), '_headers should expose OpenAPI CORS');
  assert(headers.includes('/artifact-summary.json\n  Access-Control-Allow-Origin: *'), '_headers should expose artifact summary CORS');
  assert(headers.includes('/manifest.json\n  Access-Control-Allow-Origin: *'), '_headers should expose manifest CORS');
  assert(headers.includes('/topics.json\n  Access-Control-Allow-Origin: *'), '_headers should expose topics CORS');
  assert(headers.includes('/capabilities.json\n  Access-Control-Allow-Origin: *'), '_headers should expose capabilities CORS');
  assert(headers.includes('/content-health.json\n  Access-Control-Allow-Origin: *'), '_headers should expose content health CORS');
  assert(headers.includes('/coverage.json\n  Access-Control-Allow-Origin: *'), '_headers should expose coverage CORS');
  assert(headers.includes('/examples.json\n  Access-Control-Allow-Origin: *'), '_headers should expose examples CORS');
  assert(headers.includes('/graph.json\n  Access-Control-Allow-Origin: *'), '_headers should expose graph CORS');
  assert(headers.includes('/evals.json\n  Access-Control-Allow-Origin: *'), '_headers should expose evals CORS');
  assert(headers.includes('/mcp.json\n  Access-Control-Allow-Origin: *'), '_headers should expose MCP CORS');
  assert(headers.includes('/search-index.json\n  Access-Control-Allow-Origin: *'), '_headers should expose search index CORS');
  assert(headers.includes('/sources.json\n  Access-Control-Allow-Origin: *'), '_headers should expose sources CORS');
  assert(headers.includes('/provenance.json\n  Access-Control-Allow-Origin: *'), '_headers should expose provenance CORS');
  assert(headers.includes('/provenance.sig\n  Access-Control-Allow-Origin: *'), '_headers should expose provenance signature CORS');
  for (const path of revalidatedMachineArtifacts) {
    assert(headers.includes(`${path}\n  Access-Control-Allow-Origin: *`), `_headers should expose ${path} CORS`);
    assert(headers.includes(`${path}\n  Access-Control-Allow-Origin: *\n  Content-Type:`), `_headers should set ${path} content type`);
    assert(headers.includes(`${path}\n  Access-Control-Allow-Origin: *\n  Content-Type: ${path.endsWith('.txt') ? 'text/plain' : 'application/json'}; charset=utf-8\n  Cache-Control: public, max-age=0, must-revalidate`), `_headers should keep ${path} revalidated`);
  }
  assert(headers.includes('/*/index.json\n  Access-Control-Allow-Origin: *'), '_headers should expose article JSON-LD CORS');
  assert(headers.includes('/drafts\n  X-Robots-Tag: noindex, nofollow'), '_headers should noindex extensionless drafts route');
  assert(headers.includes('/drafts.html\n  X-Robots-Tag: noindex, nofollow'), '_headers should noindex drafts.html route');
});

rmSync(root, { recursive: true, force: true });

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
