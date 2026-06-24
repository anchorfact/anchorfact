#!/usr/bin/env node
import { execFileSync } from 'child_process';
import { generateKeyPairSync } from 'crypto';
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { DEFAULT_ARTIFACT_SIZE_BUDGETS } from '../scripts/check-api-performance.js';

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
  const rootAlias = JSON.parse(readFileSync(join(distDir, 'index.html'), 'utf-8'));
  const rootIndex = JSON.parse(readFileSync(join(distDir, 'index.json'), 'utf-8'));
  const claimsJson = JSON.parse(readFileSync(join(distDir, 'claims.json'), 'utf-8'));
  const llmsTxt = readFileSync(join(distDir, 'llms.txt'), 'utf-8');
  const sitemap = readFileSync(join(distDir, 'sitemap.xml'), 'utf-8');
  const robotsTxt = readFileSync(join(distDir, 'robots.txt'), 'utf-8');
  const apiAccessText = readFileSync(join(distDir, 'api-access', 'index.html'), 'utf-8');
  const apiAccess = JSON.parse(apiAccessText);
  const draftsText = readFileSync(join(distDir, 'drafts.html'), 'utf-8');
  const draftsIndex = JSON.parse(draftsText);
  const dashboardText = readFileSync(join(distDir, 'dashboard.html'), 'utf-8');
  const dashboard = JSON.parse(dashboardText);
  assertEq(rootIndex.schema_version, 'anchorfact.root-index.v1');
  assertEq(rootIndex.official_site, 'https://anchorfact.org');
  assertEq(rootIndex.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(rootIndex.default_answer_path, '/api/context?q={query}');
  assert(rootIndex.preferred_machine_entrypoints.some(entry => entry.path === '/api/context?q={query}'), 'root index should prefer context API');
  assert(rootIndex.preferred_machine_entrypoints.some(entry => entry.path === '/api/evidence?q={query}'), 'root index should include evidence API');
  assertEq(rootIndex.quick_start.default_answer_path, '/api/context?q={query}');
  assertEq(rootIndex.quick_start.primary_api_conversion.next_call_after_discovery, '/api/context?q={query}&limit=3&format=markdown');
  assert(rootIndex.quick_start.primary_api_conversion.minimum_valid_primary_calls.some(call => call.path === '/api/context?q={query}&limit=3&format=markdown'), 'root quick start should expose copyable context call');
  assert(rootIndex.quick_start.primary_api_conversion.minimum_valid_primary_calls.some(call => call.path === '/api/evidence?q={query}&limit=3&format=markdown'), 'root quick start should expose copyable evidence call');
  assert(rootIndex.quick_start.example_calls.some(call => call.path === '/api/context?q=gaussian%20splatting&limit=3&format=markdown'), 'root quick start should include executable context example');
  assertEq(rootIndex.discovery.root_alias, '/');
  assertEq(rootIndex.discovery.openapi, '/openapi.json');
  assertEq(rootIndex.discovery.agent_profile, '/agent.json');
  assertEq(rootIndex.discovery.api_readiness, '/api-readiness.json');
  assertEq(rootIndex.api_readiness_summary.status, 'building_foundation');
  assertEq(rootIndex.api_readiness_summary.subscription_ready, false);
  assertEq(rootIndex.api_readiness_summary.path, '/api-readiness.json');
  assert(rootIndex.api_readiness_summary.blocker_ids.includes('core_query_context_ratio'), 'root index should expose API readiness blockers');
  assertEq(rootIndex.api_readiness_summary.runtime_signal_contract.static_artifact, true);
  assertEq(rootIndex.api_readiness_summary.runtime_signal_contract.missing_runtime_status, 'not_provided');
  assert(rootIndex.api_readiness_summary.runtime_signal_contract.workflow.includes('readiness-scorecard.yml'), 'root index should expose readiness runtime workflow');
  assert(rootIndex.api_readiness_summary.runtime_signal_contract.runtime_input_ids.includes('ai_adoption'), 'root index should expose runtime adoption input id');
  assertEq(rootIndex.api_readiness_summary.runtime_signal_contract.preferred_adoption_scope, 'interactive_ai');
  assertEq(rootIndex.error_recovery_guidance.recoverable_400_field, 'machine_recovery');
  assertEq(rootIndex.error_recovery_guidance.default_recovery_path, '/api/context?q={query}&limit=3');
  assertEq(rootIndex.error_recovery_guidance.default_recovery_url, 'https://anchorfact.org/api/context?q={query}&limit=3');
  assert(rootIndex.quick_start.primary_api_conversion.discovery_entrypoints.includes('/.well-known/anchorfact.json'), 'root index should identify well-known agent alias discovery');
  assert(rootIndex.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/context'), 'root index should expose context recovery guidance');
  assert(rootIndex.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/evidence'), 'root index should expose evidence recovery guidance');
  assert(rootIndex.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/source'), 'root index should expose source recovery guidance');
  assert(rootIndex.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/resolve-batch'), 'root index should expose batch resolver recovery guidance');
  assert(rootIndex.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/cite'), 'root index should expose citation recovery guidance');
  assert(rootIndex.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/plan'), 'root index should expose plan recovery guidance');
  assert(rootIndex.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/article'), 'root index should expose article recovery guidance');
  assert(rootIndex.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/claim'), 'root index should expose claim recovery guidance');
  assert(rootIndex.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/resolve'), 'root index should expose resolver recovery guidance');
  assert(rootIndex.error_recovery_guidance.observed_recoverable_endpoints.includes('/api/search'), 'root index should expose search recovery guidance');
  assert(rootIndex.error_recovery_guidance.retry_example_paths.includes('/api/cite?id={claim_id}'), 'root index should expose citation retry guidance');
  assert(rootIndex.error_recovery_guidance.retry_example_paths.includes('/api/plan?q={query}&limit=3'), 'root index should expose plan retry guidance');
  assert(rootIndex.error_recovery_guidance.retry_example_paths.includes('/api/search?q={query}&limit=5'), 'root index should expose search retry guidance');
  assert(rootIndex.error_recovery_guidance.retry_example_paths.includes('/api/article?slug={canonical_slug}'), 'root index should expose article retry guidance');
  assert(rootIndex.error_recovery_guidance.retry_example_paths.includes('/api/claim?id={claim_id}'), 'root index should expose claim retry guidance');
  assert(rootIndex.error_recovery_guidance.retry_example_paths.includes('/api/resolve?ref={claim_id_or_slug_or_source_id}'), 'root index should expose resolver retry guidance');
  assertEq(rootIndex.counts.public_articles, 1);
  assertEq(rootIndex.counts.draft_articles, 1);
  assertEq(rootIndex.counts.public_claims, claimsJson.claim_count);
  assertEq(rootIndex.trust_policy.public_only_entrypoints_exclude_drafts, true);
  assertEq(rootIndex.trust_policy.default_answer_requires_can_answer_with_anchorfact, true);
  assert(rootIndex.static_artifacts.includes('/artifact-summary.json'), 'root index should advertise artifact summary');
  assert(rootIndex.static_artifacts.includes('/api-access/'), 'root index should advertise API access policy');
  assert(rootIndex.static_artifacts.includes('/provenance.json'), 'root index should advertise provenance');
  assert(rootIndex.bulk_sync_policy.avoid_for_single_query.includes('/graph.json'), 'root index should steer single queries away from bulk graph downloads');
  assertEq(rootAlias, rootIndex, 'root slash alias should return the same machine JSON as /index.json');
  assert(llmsTxt.includes('Agent Profile'), 'llms.txt should include agent profile');
  assert(llmsTxt.includes('OpenAPI'), 'llms.txt should include OpenAPI contract');
  assert(llmsTxt.includes('API Index'), 'llms.txt should include API index');
  assert(llmsTxt.includes('API Access'), 'llms.txt should include API access policy');
  assert(llmsTxt.includes('Artifact Summary'), 'llms.txt should include artifact summary');
  assert(llmsTxt.includes('Artifact Shards'), 'llms.txt should include artifact shard registry');
  assert(llmsTxt.includes('API Readiness'), 'llms.txt should include API readiness artifact');
  assert(llmsTxt.includes('Capabilities'), 'llms.txt should include capabilities router');
  assert(llmsTxt.includes('Content Health'), 'llms.txt should include content health');
  assert(llmsTxt.includes('source-ready/source acquisition repair queues'), 'llms.txt should describe content health repair queue phases');
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
  assert(llmsTxt.includes('/index.json'), 'llms.txt should advertise root machine index');
  assert(llmsTxt.includes('/api/context?q={query}'), 'llms.txt should advertise the default context entrypoint');
  assert(llmsTxt.includes('/api/evidence?q={query}'), 'llms.txt should advertise the evidence entrypoint');
  assert(llmsTxt.includes('/api/plan?q={query}'), 'llms.txt should advertise the coverage planning entrypoint');
  assert(llmsTxt.includes('/api/cite?id={claim_id}'), 'llms.txt should advertise the citation entrypoint');
  assert(llmsTxt.includes('https://anchorfact.org/api-access/'), 'llms.txt should advertise API access policy');
  assert(llmsTxt.includes('/artifact-summary.json'), 'llms.txt should advertise artifact summary');
  assert(llmsTxt.includes('/artifact-shards.json'), 'llms.txt should advertise artifact shards');
  assert(llmsTxt.includes('/api-readiness.json'), 'llms.txt should advertise API readiness');
  assert(llmsTxt.includes('After reading this discovery file, make the next request: GET https://anchorfact.org/api/context?q={query}&limit=3&format=markdown'), 'llms.txt should convert discovery readers to the primary context API');
  assert(llmsTxt.includes('AI primary/discovery conversion target'), 'llms.txt should expose the AI primary/discovery conversion target');
  assert(llmsTxt.includes('Prefer /api/context'), 'llms.txt should steer crawlers toward query-scoped APIs before large artifacts');
  assert(llmsTxt.includes('Do not copy bare primary API paths such as /api/evidence, /api/source, or /api/resolve-batch'), 'llms.txt should prevent parameter-only primary API 400s');
  assert(llmsTxt.includes('Copy minimum valid calls with required parameters first'), 'llms.txt should tell agents to copy valid parameterized calls');
  assert(llmsTxt.includes('GET https://anchorfact.org/api/context?q=gaussian%20splatting&limit=3&format=markdown'), 'llms.txt should give AI crawlers an executable default context example');
  assert(llmsTxt.includes('GET https://anchorfact.org/api/evidence?q=RLHF&limit=3&format=markdown'), 'llms.txt should give AI crawlers an executable evidence example');
  assert(llmsTxt.indexOf('## Recommended AI Entry Points') < llmsTxt.indexOf('## Public Knowledge Base'), 'llms.txt should show recommended AI entry points before the article index');
  assert(sitemap.includes('/agent.json'), 'sitemap should include agent profile');
  assert(sitemap.includes('/.well-known/anchorfact.json'), 'sitemap should include well-known agent profile alias');
  assert(sitemap.includes('/index.json'), 'sitemap should include root machine index');
  assert(sitemap.includes('/openapi.json'), 'sitemap should include OpenAPI contract');
  assert(sitemap.includes('/api'), 'sitemap should include API index');
  assert(sitemap.includes('/api-access/'), 'sitemap should include API access policy');
  assert(sitemap.includes('/artifact-summary.json'), 'sitemap should include artifact summary');
  assert(sitemap.includes('/artifact-shards.json'), 'sitemap should include artifact shard registry');
  assert(sitemap.includes('/api-readiness.json'), 'sitemap should include API readiness');
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
  assert(robotsTxt.includes('Machine-Index: https://anchorfact.org/index.json'), 'robots.txt should advertise root machine index');
  assert(robotsTxt.includes('LLMs: https://anchorfact.org/llms.txt'), 'robots.txt should advertise llms.txt');
  assert(robotsTxt.includes('Agent: https://anchorfact.org/agent.json'), 'robots.txt should advertise agent profile');
  assert(robotsTxt.includes('Well-Known-Agent: https://anchorfact.org/.well-known/anchorfact.json'), 'robots.txt should advertise well-known agent profile alias');
  assert(robotsTxt.includes('OpenAPI: https://anchorfact.org/openapi.json'), 'robots.txt should advertise OpenAPI contract');
  assert(robotsTxt.includes('API: https://anchorfact.org/api'), 'robots.txt should advertise API index');
  assert(robotsTxt.includes('API-Access: https://anchorfact.org/api-access/'), 'robots.txt should advertise API access policy');
  assert(robotsTxt.includes('Artifact-Summary: https://anchorfact.org/artifact-summary.json'), 'robots.txt should advertise artifact summary');
  assert(robotsTxt.includes('Artifact-Shards: https://anchorfact.org/artifact-shards.json'), 'robots.txt should advertise artifact shards');
  assert(robotsTxt.includes('API-Readiness: https://anchorfact.org/api-readiness.json'), 'robots.txt should advertise API readiness');
  assert(robotsTxt.includes('Large-Artifact-Policy: prefer_api_context_or_evidence'), 'robots.txt should steer crawlers away from full large artifact downloads');
  assert(robotsTxt.includes('Health: https://anchorfact.org/content-health.json'), 'robots.txt should advertise content health');
  assert(robotsTxt.includes('MCP: https://anchorfact.org/mcp.json'), 'robots.txt should advertise MCP manifest');
  assert(robotsTxt.includes('Provenance: https://anchorfact.org/provenance.json'), 'robots.txt should advertise provenance');
  assert(robotsTxt.includes('AI-Context: https://anchorfact.org/api/context?q={query}'), 'robots.txt should advertise AI context hint');
  assert(robotsTxt.includes('AI-Evidence: https://anchorfact.org/api/evidence?q={query}'), 'robots.txt should advertise AI evidence hint');
  assert(robotsTxt.includes('AI-Plan: https://anchorfact.org/api/plan?q={query}'), 'robots.txt should advertise AI planning hint');
  assert(robotsTxt.includes('AI-Plan-Use: coverage_uncertain_only'), 'robots.txt should reserve planning for uncertain coverage');
  assert(robotsTxt.includes('AI-Next-After-Discovery: https://anchorfact.org/api/context?q={query}&limit=3&format=markdown'), 'robots.txt should tell AI crawlers the next primary API request after discovery');
  assert(robotsTxt.includes('AI-Primary-Conversion-Target: 0.2'), 'robots.txt should expose the measured AI primary/discovery target');
  assert(robotsTxt.includes('AI-Minimum-Valid-Context: https://anchorfact.org/api/context?q={query}&limit=3&format=markdown'), 'robots.txt should expose a minimum valid context call');
  assert(robotsTxt.includes('AI-Minimum-Valid-Evidence: https://anchorfact.org/api/evidence?q={query}&limit=3&format=markdown'), 'robots.txt should expose a minimum valid evidence call');
  assert(robotsTxt.includes('AI-Minimum-Valid-Resolve-Batch: https://anchorfact.org/api/resolve-batch?ref={claim_id}&ref={source_id}&format=markdown'), 'robots.txt should expose a minimum valid batch resolver call');
  assert(robotsTxt.includes('AI-Do-Not-Call-Bare: /api/evidence,/api/source,/api/resolve-batch'), 'robots.txt should warn against bare primary API calls');
  assert(robotsTxt.includes('AI-Recoverable-400-Field: machine_recovery'), 'robots.txt should name the recovery field for recoverable API 400s');
  assert(robotsTxt.includes('AI-Recovery-Guide: https://anchorfact.org/api'), 'robots.txt should point AI crawlers to API recovery guidance');
  assert(robotsTxt.includes('AI-Cite: https://anchorfact.org/api/cite?id={claim_id}'), 'robots.txt should advertise AI citation hint');
  assertEq(apiAccess.schema_version, 'anchorfact.api-access.v1');
  assertEq(apiAccess.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(apiAccess.access_policy.no_api_key_required, true);
  assertEq(apiAccess.access_policy.account_required, false);
  assertEq(apiAccess.access_policy.payment_required, false);
  assertEq(apiAccess.access_policy.read_only, true);
  assertEq(apiAccess.readiness_policy.status_endpoint, '/api-readiness.json');
  assertEq(apiAccess.readiness_policy.current_mode, 'free_no_key_read_only');
  assert(apiAccess.readiness_policy.paid_beta_requires.includes('design_partners'), 'api access policy should list manual readiness gate');
  assertEq(apiAccess.readiness_policy.report_only_until_gates_met, true);
  assertEq(apiAccess.readiness_policy.runtime_signal_contract.static_artifact, true);
  assert(apiAccess.readiness_policy.runtime_signal_contract.scorecard_command.includes('--adoption-json'), 'api access policy should expose runtime scorecard command');
  assert(apiAccess.readiness_policy.runtime_signal_contract.runtime_input_ids.includes('design_partners'), 'api access policy should expose design partner runtime input id');
  assertEq(apiAccess.counts.public_articles, 1);
  assertEq(apiAccess.counts.draft_articles, 1);
  assertEq(apiAccess.counts.public_claims, claimsJson.claim_count);
  assertEq(apiAccess.recommended_call_order.map(call => call.path), [
    '/api/context?q={query}',
    '/api/evidence?q={query}',
    '/api/cite?id={claim_id}',
    '/api/plan?q={query}'
  ]);
  assertEq(apiAccess.primary_api_conversion.target_ratio, 0.2);
  assertEq(apiAccess.primary_api_conversion.next_request_after_policy.path, '/api/context?q={query}&limit=3&format=markdown');
  assertEq(apiAccess.primary_api_conversion.next_request_after_policy.url, 'https://anchorfact.org/api/context?q={query}&limit=3&format=markdown');
  assert(apiAccess.primary_api_conversion.minimum_valid_primary_calls.some(call => call.path === '/api/evidence?q={query}&limit=3&format=markdown'), 'api access policy should expose minimum valid evidence calls');
  assert(apiAccess.primary_api_conversion.parameter_error_prevention.copy_minimum_valid_primary_calls_first, 'api access policy should tell agents to copy minimum valid calls');
  assertEq(apiAccess.trust_check.path, '/provenance.json');
  assertEq(apiAccess.trust_check.signature_path, '/provenance.sig');
  assertEq(apiAccess.answer_policy_path, '/api/context?q={query}');
  assertEq(apiAccess.unsupported_answer_mode, 'external_sources_required');
  assert(!apiAccessText.trimStart().startsWith('<'), 'api access machine endpoint should not emit HTML');
  assertEq(draftsIndex.schema_version, 'anchorfact.drafts-index.v1');
  assertEq(draftsIndex.indexing.noindex, true);
  assertEq(draftsIndex.counts.draft_articles, 1);
  assertEq(draftsIndex.drafts[0].canonical_slug, 'draft-fixture');
  assert(draftsIndex.drafts[0].machine_artifacts.jsonld.endsWith('/draft-fixture/index.json'), 'draft index should point to draft JSON-LD artifact');
  assert(!draftsText.trimStart().startsWith('<'), 'drafts endpoint should not emit HTML');
  assertEq(dashboard.schema_version, 'anchorfact.dashboard.v1');
  assertEq(dashboard.indexing.noindex, true);
  assertEq(dashboard.counts.total_articles, 2);
  assertEq(dashboard.counts.public_articles, 1);
  assertEq(dashboard.counts.draft_articles, 1);
  assertEq(dashboard.counts.public_claims, claimsJson.claim_count);
  assertEq(dashboard.entrypoints.root_index, '/index.json');
  assert(!dashboardText.trimStart().startsWith('<'), 'dashboard endpoint should not emit HTML');
  assert(llmsTxt.includes('Public Fixture'), 'llms.txt should include public article');
  assert(!llmsTxt.includes('Draft Fixture'), 'llms.txt should exclude draft article');
  assert(sitemap.includes('/public-fixture/index.json'), 'sitemap should include public article JSON-LD route');
  assert(!sitemap.includes('/public-fixture/</loc>'), 'sitemap should not expose directory-style article pages');
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
  assertEq(agent.current_snapshot.evals, 56);
  assertEq(agent.current_snapshot.mcp_tools, 9);
  assertEq(agent.current_snapshot.api_readiness_status, 'building_foundation');
  assertEq(agent.current_snapshot.api_readiness_subscription_ready, false);
  assertEq(agent.current_snapshot.api_readiness_core_query_ratio, 0);
  assertEq(agent.current_snapshot.api_readiness_context_ratio, 0);
  assert(agent.current_snapshot.api_readiness_blocker_ids.includes('core_query_context_ratio'), 'agent profile should expose API readiness blockers');
  assert(agent.current_snapshot.api_readiness_manual_blocker_ids.includes('design_partners'), 'agent profile should expose manual readiness blockers');
  assertEq(agent.readiness_runtime_signals.static_artifact, true);
  assertEq(agent.readiness_runtime_signals.missing_runtime_status, 'not_provided');
  assert(agent.readiness_runtime_signals.runtime_input_ids.includes('production_integrity'), 'agent profile should expose runtime production input id');
  assertEq(agent.readiness_runtime_signals.preferred_adoption_scope, 'interactive_ai');
  assert(agent.current_snapshot.unique_sources >= 1, 'agent profile should expose source count');
  assertEq(agent.endpoints.claims.url, 'https://anchorfact.org/claims.json');
  assertEq(agent.schemas.root_index, 'anchorfact.root-index.v1');
  assertEq(agent.schemas.api_access, 'anchorfact.api-access.v1');
  assertEq(agent.schemas.artifact_summary, 'anchorfact.artifact-summary.v1');
  assertEq(agent.schemas.api_readiness, 'anchorfact.api-readiness.v1');
  assertEq(agent.endpoints.topics.url, 'https://anchorfact.org/topics.json');
  assertEq(agent.endpoints.capabilities.url, 'https://anchorfact.org/capabilities.json');
  assertEq(agent.endpoints.content_health.url, 'https://anchorfact.org/content-health.json');
  assert(agent.endpoints.content_health.description.includes('source-ready') && agent.endpoints.content_health.description.includes('source acquisition'), 'agent content-health endpoint should describe source-ready and source acquisition queues');
  assertEq(agent.endpoints.coverage.url, 'https://anchorfact.org/coverage.json');
  assertEq(agent.endpoints.examples.url, 'https://anchorfact.org/examples.json');
  assertEq(agent.endpoints.graph.url, 'https://anchorfact.org/graph.json');
  assertEq(agent.endpoints.evals.url, 'https://anchorfact.org/evals.json');
  assertEq(agent.endpoints.mcp.url, 'https://anchorfact.org/mcp.json');
  assertEq(agent.endpoints.openapi.url, 'https://anchorfact.org/openapi.json');
  assertEq(agent.endpoints.root_index.url, 'https://anchorfact.org/index.json');
  assertEq(agent.endpoints.root_alias.url, 'https://anchorfact.org/');
  assertEq(agent.endpoints.api_index.path, '/api');
  assertEq(agent.endpoints.api_access.path, '/api-access/');
  assertEq(agent.endpoints.api_access.media_type, 'application/json');
  assertEq(agent.endpoints.artifact_summary.url, 'https://anchorfact.org/artifact-summary.json');
  assertEq(agent.endpoints.api_readiness.url, 'https://anchorfact.org/api-readiness.json');
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
  assertEq(agent.quick_start.free_api_access_path, '/api-access/');
  assertEq(agent.quick_start.citation_path, '/api/cite?id={claim_id}');
  assertEq(agent.quick_start.primary_api_conversion.target_ratio, 0.2);
  assert(agent.quick_start.primary_api_conversion.discovery_entrypoints.includes('/llms.txt'), 'agent profile should identify AI discovery entrypoints');
  assert(agent.quick_start.primary_api_conversion.discovery_entrypoints.includes('/index.json'), 'agent profile should identify root machine index discovery');
  assert(agent.quick_start.primary_api_conversion.discovery_entrypoints.includes('/'), 'agent profile should identify root slash machine alias discovery');
  assert(agent.quick_start.primary_api_conversion.discovery_entrypoints.includes('/.well-known/anchorfact.json'), 'agent profile should identify well-known agent alias discovery');
  assert(agent.quick_start.primary_api_conversion.primary_entrypoints.includes('/api/evidence'), 'agent profile should identify primary API entrypoints');
  assert(agent.quick_start.primary_api_conversion.next_call_after_discovery.includes('/api/context'), 'agent profile should convert discovery to context');
  assert(agent.quick_start.primary_api_conversion.minimum_valid_primary_calls.some(call => call.path === '/api/evidence?q={query}&limit=3&format=markdown'), 'agent profile should expose copyable minimum evidence calls');
  assert(agent.quick_start.primary_api_conversion.parameter_error_prevention.bare_primary_paths_return_recoverable_400, 'agent profile should explain bare primary API 400s');
  assert(agent.quick_start.primary_api_conversion.parameter_error_prevention.do_not_call_bare_paths.includes('/api/resolve-batch'), 'agent profile should warn against bare batch resolver calls');
  assert(agent.quick_start.example_calls.some(example => example.path === '/api/context?q=gaussian%20splatting&limit=3&format=markdown'), 'agent profile should expose an executable default context example');
  assert(agent.quick_start.example_calls.some(example => example.path === '/api/evidence?q=RLHF&limit=3&format=markdown'), 'agent profile should expose an executable evidence example');
  assertEq(agent.quick_start.trust_check.path, '/provenance.json');
  assertEq(agent.quick_start.fallback_policy.unsupported_answer_mode, 'external_sources_required');
  assert(agent.quick_start.do_not_use.includes('draft entries'), 'quick start should warn against draft citation');
  assert(agent.quick_start.steps.some(step => step.id === 'assemble_context' && step.path === '/api/context?q={query}'), 'quick start should make context the default answer path');
  assert(agent.quick_start.steps.some(step => step.id === 'verify_provenance' && step.path === '/provenance.json'), 'quick start should make provenance verification explicit');
  assert(agent.recommended_workflow.some(step => step.includes('/openapi.json')), 'agent workflow should mention OpenAPI');
  assert(agent.recommended_workflow.some(step => step.includes('/api-access/') && step.includes('policy')), 'agent workflow should mention API access policy');
  assert(agent.recommended_workflow.some(step => step.includes('/index.json')), 'agent workflow should mention root machine index');
  assert(agent.recommended_workflow.some(step => step.includes('/.well-known/anchorfact.json') && step.includes('/api/context')), 'agent workflow should convert well-known agent discovery to primary API calls');
  assert(agent.recommended_workflow.some(step => step.includes('/artifact-summary.json')), 'agent workflow should mention artifact summary');
  assert(agent.recommended_workflow.some(step => step.includes('/api-readiness.json')), 'agent workflow should mention API readiness');
  assert(agent.recommended_workflow.some(step => step.includes('/provenance.json')), 'agent workflow should mention provenance');
  assert(agent.recommended_workflow.some(step => step.includes('/topics.json')), 'agent workflow should mention topics index');
  assert(agent.recommended_workflow.some(step => step.includes('/capabilities.json')), 'agent workflow should mention capabilities router');
  assert(agent.recommended_workflow.some(step => step.includes('/content-health.json')), 'agent workflow should mention content health');
  assert(agent.recommended_workflow.some(step => step.includes('/content-health.json') && step.includes('source-ready') && step.includes('source acquisition')), 'agent workflow should mention source-ready and source acquisition repair queues');
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
  const openapiPath = join(distDir, 'openapi.json');
  assert(existsSync(openapiPath), 'openapi.json missing');
  const openapiBudget = DEFAULT_ARTIFACT_SIZE_BUDGETS.find(item => item.path === 'openapi.json');
  assert(openapiBudget, 'OpenAPI artifact budget missing');
  assert(statSync(openapiPath).size <= openapiBudget.max_bytes, 'OpenAPI contract should stay within the machine artifact size budget');
  const openapi = JSON.parse(readFileSync(openapiPath, 'utf-8'));
  assertEq(openapi.openapi, '3.1.0');
  assertEq(openapi.info.title, 'AnchorFact Machine API');
  assertEq(openapi['x-anchorfact-schema-version'], 'anchorfact.openapi.v1');
  assertEq(openapi['x-provenance-url'], 'https://anchorfact.org/provenance.json');
  assertEq(openapi.servers[0].url, 'https://anchorfact.org');
  assert(openapi.paths['/agent.json'], 'OpenAPI should describe agent profile');
  assert(openapi.paths['/'], 'OpenAPI should describe root slash machine index alias');
  assert(openapi.paths['/index.json'], 'OpenAPI should describe root machine index');
  assert(openapi.paths['/api-access/'], 'OpenAPI should describe API access policy');
  assert(openapi.paths['/drafts.html'], 'OpenAPI should describe drafts machine index');
  assert(openapi.paths['/dashboard.html'], 'OpenAPI should describe dashboard machine artifact');
  assert(openapi.paths['/artifact-summary.json'], 'OpenAPI should describe artifact summary');
  assert(openapi.paths['/api-readiness.json'], 'OpenAPI should describe API readiness');
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
  assert(openapi.paths['/404.html'], 'OpenAPI should describe the machine JSON 404 fallback');
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
  assert(openapi.paths['/{canonical_slug}/index.html'], 'OpenAPI should describe article JSON-LD HTML alias template');
  assert(openapi.components.schemas.RootIndex.properties.api_readiness_summary, 'OpenAPI should define root readiness summary');
  assert(openapi.components.schemas.RootIndex.properties.error_recovery_guidance, 'OpenAPI should define root error recovery guidance');
  assert(openapi.components.schemas.AgentProfile.properties.current_snapshot, 'OpenAPI should define agent current snapshot');
  assert(openapi.components.schemas.AgentProfile.properties.quick_start, 'OpenAPI should describe agent quick-start guidance');
  assert(openapi.components.schemas.RootIndex, 'OpenAPI should define root machine index schema');
  assert(openapi.components.schemas.ApiAccess, 'OpenAPI should define API access schema');
  assert(openapi.components.schemas.ApiAccess.properties.access_policy, 'OpenAPI should define API access policy fields');
  assert(openapi.components.schemas.ApiAccess.properties.readiness_policy, 'OpenAPI should define API access readiness policy');
  assert(openapi.components.schemas.DraftsIndex, 'OpenAPI should define drafts index schema');
  assert(openapi.components.schemas.Dashboard, 'OpenAPI should define dashboard schema');
  assert(openapi.components.schemas.RootIndex.properties.default_answer_path, 'OpenAPI should define root default answer path');
  assert(openapi.components.schemas.AgentQuickStart.properties.default_answer_path, 'OpenAPI should define default answer path guidance');
  assert(openapi.components.schemas.AgentQuickStart.properties.primary_api_conversion, 'OpenAPI should define primary API conversion guidance');
  assert(openapi.components.schemas.AgentQuickStart.properties.primary_api_conversion.properties.minimum_valid_primary_calls, 'OpenAPI should define agent minimum valid primary calls');
  assert(openapi.components.schemas.AgentQuickStart.properties.primary_api_conversion.properties.parameter_error_prevention, 'OpenAPI should define agent parameter error prevention');
  assert(openapi.components.schemas.AgentQuickStart.properties.fallback_policy, 'OpenAPI should define fallback policy guidance');
  assert(openapi.components.schemas.Topics, 'OpenAPI should define Topics schema');
  assert(openapi.components.schemas.Capabilities, 'OpenAPI should define Capabilities schema');
  assert(openapi.components.schemas.ContentHealth, 'OpenAPI should define ContentHealth schema');
  const contentHealthDraft = openapi.components.schemas.ContentHealth.properties.draft;
  const contentHealthRepairQueue = contentHealthDraft.properties.repair_queue;
  assert(contentHealthRepairQueue.properties.candidate_count, 'OpenAPI content health schema should define repair queue candidate count');
  assert(contentHealthRepairQueue.properties.next_batch, 'OpenAPI content health schema should define repair queue next batch');
  assert(contentHealthRepairQueue.properties.source_ready_candidate_count, 'OpenAPI content health schema should define source-ready repair count');
  assert(contentHealthRepairQueue.properties.source_ready_next_batch, 'OpenAPI content health schema should define source-ready repair batch');
  assert(contentHealthRepairQueue.properties.source_acquisition_candidate_count, 'OpenAPI content health schema should define source acquisition repair count');
  assert(contentHealthRepairQueue.properties.source_acquisition_next_batch, 'OpenAPI content health schema should define source acquisition repair batch');
  assert(contentHealthRepairQueue.properties.selection_policy, 'OpenAPI content health schema should define repair queue selection policy');
  assert(openapi.components.schemas.Coverage, 'OpenAPI should define Coverage schema');
  assert(openapi.components.schemas.Examples, 'OpenAPI should define Examples schema');
  assert(openapi.components.schemas.Graph, 'OpenAPI should define Graph schema');
  assert(openapi.components.schemas.Evals, 'OpenAPI should define Evals schema');
  assert(openapi.components.schemas.ApiIndex, 'OpenAPI should define API index schema');
  assert(openapi.components.schemas.NotFoundResponse, 'OpenAPI should define machine JSON 404 schema');
  assertEq(openapi.components.schemas.NotFoundResponse.properties.schema_version.const, 'anchorfact.not-found.v1');
  assertEq(openapi.components.schemas.NotFoundResponse.properties.status.const, 404);
  assertEq(openapi.components.schemas.NotFoundResponse.properties.error.properties.code.const, 'not_found');
  assertEq(openapi.components.schemas.NotFoundResponse.properties.fallback_policy.properties.no_spa_fallback.const, true);
  assert(openapi.components.schemas.ApiIndex.properties.ai_adoption_guidance, 'OpenAPI should define AI adoption guidance');
  assert(openapi.components.schemas.ApiIndex.properties.ai_adoption_guidance.properties.minimum_valid_primary_calls, 'OpenAPI should define minimum valid primary calls');
  assert(openapi.components.schemas.ApiIndex.properties.ai_adoption_guidance.properties.parameter_error_prevention, 'OpenAPI should define parameter error prevention guidance');
  assert(openapi.components.schemas.ApiIndex.properties.primary_entrypoints.items.properties.minimum_valid_path, 'OpenAPI should define primary entrypoint minimum valid path');
  assert(openapi.components.schemas.ApiIndex.properties.endpoints.items.properties.minimum_valid_paths, 'OpenAPI should define endpoint minimum valid paths');
  assert(openapi.components.schemas.ApiIndex.properties.endpoints.items.properties.bare_path_returns_recoverable_400, 'OpenAPI should define bare-path 400 recovery marker');
  assert(openapi.components.schemas.ApiIndex.properties.error_recovery_guidance, 'OpenAPI should define API error recovery guidance');
  assert(openapi.components.schemas.ApiIndex.properties.readiness_guidance, 'OpenAPI should define API readiness guidance');
  assert(openapi.components.schemas.ApiIndex.properties.readiness_guidance.properties.runtime_signal_contract, 'OpenAPI should define API runtime signal guidance');
  assert(openapi.components.schemas.ApiAccess.properties.primary_api_conversion, 'OpenAPI should define API access conversion guidance');
  assert(openapi.components.schemas.ApiAccess.properties.readiness_policy.properties.runtime_signal_contract, 'OpenAPI should define API access runtime signal guidance');
  assert(openapi.components.schemas.ApiAccess.properties.primary_api_conversion.properties.next_request_after_policy, 'OpenAPI should define the API access next request');
  assert(openapi.components.schemas.ArtifactSummary, 'OpenAPI should define artifact summary schema');
  assert(openapi.components.schemas.ArtifactSummary.properties.artifact_growth_policy, 'OpenAPI should define artifact growth policy');
  assert(openapi.components.schemas.ArtifactSummary.properties.api_call_guidance, 'OpenAPI should define artifact summary API call guidance');
  assert(openapi.components.schemas.McpProfile.properties.public_http_api_guidance, 'OpenAPI should define MCP public HTTP API guidance');
  assert(openapi.components.schemas.ApiReadiness, 'OpenAPI should define API readiness schema');
  assert(openapi.components.schemas.ApiReadiness.properties.readiness_gates, 'OpenAPI should define API readiness gates');
  assert(openapi.components.schemas.ApiReadiness.properties.readiness_blockers, 'OpenAPI should define API readiness blockers');
  assert(openapi.components.schemas.ApiReadiness.properties.runtime_signal_contract, 'OpenAPI should define API readiness runtime signal contract');
  assert(openapi.components.schemas.RootIndex.properties.api_readiness_summary.properties.runtime_signal_contract, 'OpenAPI should define root readiness runtime signal summary');
  assert(openapi.components.schemas.AgentProfile.properties.readiness_runtime_signals, 'OpenAPI should define agent readiness runtime signals');
  assert(openapi.components.schemas.McpProfile, 'OpenAPI should define MCP schema');
  assert(openapi.components.schemas.SearchIndex, 'OpenAPI should define SearchIndex schema');
  assert(openapi.components.schemas.EvidenceApiResponse, 'OpenAPI should define EvidenceApiResponse schema');
  assert(openapi.components.schemas.ContextApiResponse, 'OpenAPI should define ContextApiResponse schema');
  assert(openapi.components.schemas.MachineConsumptionGuidance, 'OpenAPI should define MachineConsumptionGuidance schema');
  assert(openapi.components.schemas.MachineRecoveryGuidance, 'OpenAPI should define MachineRecoveryGuidance schema');
  assert(openapi.components.schemas.ApiError.properties.machine_recovery, 'OpenAPI API errors should describe machine recovery guidance');
  assertEq(openapi.components.schemas.ApiError.properties.machine_recovery.$ref, '#/components/schemas/MachineRecoveryGuidance');
  assert(openapi.components.schemas.MachineRecoveryGuidance.properties.next_request, 'OpenAPI machine recovery should define the next request');
  assert(openapi.components.schemas.MachineRecoveryGuidance.properties.retry_examples, 'OpenAPI machine recovery should define retry examples');
  assert(openapi.components.schemas.EvidenceApiResponse.properties.machine_consumption, 'OpenAPI evidence schema should include machine consumption guidance');
  assert(openapi.components.schemas.ContextApiResponse.properties.content_health, 'OpenAPI context schema should include content health summary');
  assert(openapi.components.schemas.ContextApiContentHealth.properties.draft_repair_queue, 'OpenAPI context content health schema should define draft repair queue summary');
  assert(openapi.components.schemas.ContextApiResponse.properties.answer_policy, 'OpenAPI context schema should include answer policy');
  assert(openapi.components.schemas.ContextApiResponse.properties.machine_consumption, 'OpenAPI context schema should include machine consumption guidance');
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
  assertEq(summary.artifact_growth_policy.default_for_agents, '/api/context?q={query}');
  assertEq(summary.artifact_growth_policy.prefer_primary_apis, true);
  assertEq(summary.artifact_growth_policy.large_artifact_threshold_bytes, 1048576);
  assert(summary.api_call_guidance.minimum_valid_primary_calls.some(call => call.path === '/api/context?q={query}&limit=3&format=markdown'), 'artifact summary should expose minimum valid context calls');
  assert(summary.api_call_guidance.minimum_valid_primary_calls.some(call => call.path === '/api/evidence?q={query}&limit=3&format=markdown'), 'artifact summary should expose minimum valid evidence calls');
  assert(summary.api_call_guidance.parameter_error_prevention.do_not_call_bare_paths.includes('/api/source'), 'artifact summary should warn against bare source calls');
  assertEq(summary.api_call_guidance.parameter_error_prevention.recovery_field_on_400, 'machine_recovery');
  assert(summary.recommended_default_calls.some(call => call.path === '/api/context?q={query}'), 'artifact summary should recommend context first');
  assert(summary.recommended_default_calls.some(call => call.path === '/api/evidence?q={query}'), 'artifact summary should recommend evidence second');
  const graph = summary.artifacts.find(artifact => artifact.path === '/graph.json');
  assert(graph, 'artifact summary should include graph.json');
  assert(graph.bytes > 0, 'graph summary should include byte size');
  assertEq(graph.recommended_alternative, '/api/context?q={query}');
  assertEq(graph.cache_posture, 'public, max-age=0, must-revalidate');
  assert(graph.budget_bytes > 0, 'graph summary should expose its size budget');
  assert(Number.isFinite(graph.budget_headroom_bytes), 'graph summary should expose budget headroom');
  assert(['within_budget', 'near_budget', 'over_budget'].includes(graph.budget_status), 'graph summary should classify budget status');
  assert(graph.download_guidance.includes('/api/context'), 'graph summary should route normal agent calls to context');
  const search = summary.artifacts.find(artifact => artifact.path === '/search-index.json');
  assert(search, 'artifact summary should include search-index.json');
  assertEq(search.recommended_alternative, '/api/evidence?q={query}');
  const shardRegistry = summary.artifacts.find(artifact => artifact.path === '/artifact-shards.json');
  assert(shardRegistry, 'artifact summary should include artifact-shards.json');
  assertEq(shardRegistry.category, 'shard_registry');
  assertEq(shardRegistry.recommended_alternative, '/api/context?q={query}');
  const readiness = summary.artifacts.find(artifact => artifact.path === '/api-readiness.json');
  assert(readiness, 'artifact summary should include api-readiness.json');
  assertEq(readiness.category, 'readiness');
  assertEq(readiness.recommended_alternative, '/api/context?q={query}');
  assert(readiness.budget_bytes > 0, 'readiness summary should expose its size budget');
  const notFound = summary.artifacts.find(artifact => artifact.path === '/404.html');
  assert(notFound, 'artifact summary should include machine JSON 404 fallback');
  assertEq(notFound.category, 'routing_guard');
  assertEq(notFound.recommended_alternative, '/openapi.json');
  const contentHealth = summary.artifacts.find(artifact => artifact.path === '/content-health.json');
  assert(contentHealth, 'artifact summary should include content-health.json');
  assert(contentHealth.use_when.includes('source-ready') && contentHealth.use_when.includes('source acquisition'), 'artifact summary should describe content-health repair queue phases');
  const rootIndex = summary.artifacts.find(artifact => artifact.path === '/index.json');
  assert(rootIndex, 'artifact summary should include root index');
  assertEq(rootIndex.category, 'discovery');
  assertEq(rootIndex.recommended_alternative, '/api/context?q={query}');
  assertEq(graph.shard_registry_path, '/artifact-shards.json');
  assertEq(search.shard_registry_path, '/artifact-shards.json');
});

test('api-readiness.json publishes machine-readable readiness gates', () => {
  assert(existsSync(join(distDir, 'api-readiness.json')), 'api-readiness.json missing');
  const readiness = JSON.parse(readFileSync(join(distDir, 'api-readiness.json'), 'utf-8'));
  assertEq(readiness.schema_version, 'anchorfact.api-readiness.v1');
  assertEq(readiness.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(readiness.report_only, true);
  assertEq(readiness.build_should_fail, false);
  assertEq(readiness.status, 'building_foundation');
  assertEq(readiness.subscription_ready, false);
  assert(readiness.core_corpus.count >= 100, 'readiness should evaluate the core corpus query set');
  assert(readiness.api_scorecard.count >= 100, 'readiness should evaluate the API citation scorecard');
  assertEq(readiness.core_corpus.pass_ratio, 0);
  assertEq(readiness.api_scorecard.pass_ratio, 0);
  assertEq(readiness.api_scorecard.fallback.ok, true);
  assert(readiness.readiness_gates.some(gate => gate.id === 'production_integrity_14_day'), 'readiness should include production integrity gate');
  assert(readiness.readiness_gates.some(gate => gate.id === 'core_query_context_ratio'), 'readiness should include context coverage gate');
  assert(Array.isArray(readiness.readiness_blockers.gate_ids), 'readiness should publish blocker gate ids');
  assert(readiness.readiness_blockers.gate_ids.includes('design_partners'), 'readiness should identify manual design partner blocker');
  assertEq(readiness.runtime_signal_contract.static_artifact, true);
  assertEq(readiness.runtime_signal_contract.status_when_missing, 'not_provided');
  assert(readiness.runtime_signal_contract.scorecard_command.includes('--adoption-json'), 'readiness should explain runtime adoption input command');
  assert(readiness.runtime_signal_contract.workflow.includes('readiness-scorecard.yml'), 'readiness should point to the scorecard workflow');
  assert(readiness.runtime_signal_contract.runtime_inputs.some(input =>
    input.id === 'ai_adoption'
    && input.preferred_measurement_scope === 'interactive_ai'
    && input.required_fields.includes('interactive_ai_primary_to_discovery_ratio')
    && input.required_fields.includes('crawler_ai_primary_to_discovery_ratio')
  ), 'readiness should publish interactive/crawler AI runtime input requirements');
  assert(readiness.next_actions.some(action => action.includes('free API')), 'readiness should keep paid-beta work behind readiness gates');
});

test('artifact-shards.json publishes versioned shard manifests for large artifacts', () => {
  assert(existsSync(join(distDir, 'artifact-shards.json')), 'artifact-shards.json missing');
  const registry = JSON.parse(readFileSync(join(distDir, 'artifact-shards.json'), 'utf-8'));
  assertEq(registry.schema_version, 'anchorfact.artifact-shards.v1');
  assertEq(registry.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(registry.default_for_agents, '/api/context?q={query}');
  assertEq(registry.compatibility.full_artifacts_remain_available, true);
  assert(registry.artifacts.some(artifact => artifact.source_path === '/claims.json'), 'registry should include claims shard set');
  assert(registry.artifacts.some(artifact => artifact.source_path === '/search-index.json'), 'registry should include search index shard set');
  assert(registry.artifacts.some(artifact => artifact.source_path === '/graph.json' && artifact.collection === 'nodes'), 'registry should include graph node shard set');
  assert(registry.artifacts.some(artifact => artifact.source_path === '/graph.json' && artifact.collection === 'edges'), 'registry should include graph edge shard set');
  assert(registry.artifacts.some(artifact => artifact.source_path === '/llms.txt'), 'registry should include llms shard set');

  const claims = registry.artifacts.find(artifact => artifact.id === 'claims');
  assert(claims.shard_count >= 1, 'claims should have at least one shard');
  assertEq(claims.item_count, 2);
  assertEq(claims.recommended_api, '/api/cite?id={claim_id}');
  const firstShard = claims.shards[0];
  assert(firstShard.path.startsWith('/artifacts/v1/'), 'shard paths should be versioned');
  assert(/^[a-f0-9]{64}$/.test(firstShard.sha256), 'shards should include sha256');
  assert(firstShard.bytes > 0, 'shards should include byte size');
  const shardPayload = JSON.parse(readFileSync(join(distDir, ...firstShard.path.replace(/^\//, '').split('/')), 'utf-8'));
  assertEq(shardPayload.schema_version, 'anchorfact.artifact-shard.v1');
  assertEq(shardPayload.artifact_id, 'claims');
  assertEq(shardPayload.source_path, '/claims.json');
  assertEq(shardPayload.item_kind, 'claim');
  assertEq(shardPayload.claims.length, 2);
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
  assertEq(record.url, 'https://anchorfact.org/public-fixture/index.json');
  assertEq(record.routes.jsonld, 'https://anchorfact.org/public-fixture/index.json');
  assertEq(record.routes.html_alias, 'https://anchorfact.org/public-fixture/index.html');
  assert(!Object.prototype.hasOwnProperty.call(record.routes, 'html'), 'search records should not expose directory-style html routes');
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
  const healthCapability = capabilities.capabilities.find(capability => capability.id === 'inspect_corpus_health');
  assert(healthCapability, 'capabilities should include corpus health workflow');
  assert(healthCapability.intent.includes('source-ready') && healthCapability.intent.includes('source acquisition'), 'corpus health capability should describe repair queue phases');
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
  assertEq(evals.eval_count, 56);
  assertEq(evals.evals.map(evalCase => evalCase.id), [
    'root_machine_index',
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
    'api_readiness_summary',
    'not_found_json_guard',
    'mcp_tool_catalog',
    'signed_provenance_static_artifacts'
  ]);
  const rootIndexEval = evals.evals.find(evalCase => evalCase.id === 'root_machine_index');
  assertEq(rootIndexEval.call.path, '/index.json');
  assert(rootIndexEval.expected.required_top_level_fields.includes('error_recovery_guidance'), 'root index eval should require error recovery guidance');
  assert(evals.evals.some(evalCase => evalCase.call.path === '/api'), 'evals should include API discovery checks');
  const apiDiscoveryEval = evals.evals.find(evalCase => evalCase.id === 'api_discovery');
  assert(apiDiscoveryEval.expected.required_top_level_fields.includes('error_recovery_guidance'), 'API discovery eval should require error recovery guidance');
  const llmsDiscoveryEval = evals.evals.find(evalCase => evalCase.id === 'llms_txt_primary_entrypoints');
  assertEq(llmsDiscoveryEval.call.path, '/llms.txt');
  assert(llmsDiscoveryEval.expected.contains_text.includes('/api/context?q={query}'), 'llms discovery eval should require context entrypoint');
  assert(llmsDiscoveryEval.expected.contains_text.includes('/api/evidence?q={query}'), 'llms discovery eval should require evidence entrypoint');
  assert(llmsDiscoveryEval.expected.contains_text.includes('/api/plan?q={query}'), 'llms discovery eval should require plan entrypoint');
  assert(llmsDiscoveryEval.expected.contains_text.includes('/index.json'), 'llms discovery eval should require root machine index');
  assert(llmsDiscoveryEval.expected.contains_text.includes('/artifact-summary.json'), 'llms discovery eval should require artifact summary');
  assert(llmsDiscoveryEval.expected.contains_text.includes('/artifact-shards.json'), 'llms discovery eval should require artifact shard registry');
  assert(llmsDiscoveryEval.expected.contains_text.includes('/api-readiness.json'), 'llms discovery eval should require API readiness');
  const robotsDiscoveryEval = evals.evals.find(evalCase => evalCase.id === 'robots_txt_ai_entrypoints');
  assertEq(robotsDiscoveryEval.call.path, '/robots.txt');
  assert(robotsDiscoveryEval.expected.contains_text.includes('AI-Context'), 'robots discovery eval should require AI context hint');
  assert(robotsDiscoveryEval.expected.contains_text.includes('AI-Evidence'), 'robots discovery eval should require AI evidence hint');
  assert(robotsDiscoveryEval.expected.contains_text.includes('AI-Next-After-Discovery'), 'robots discovery eval should require discovery-to-context conversion hint');
  assert(robotsDiscoveryEval.expected.contains_text.includes('Machine-Index'), 'robots discovery eval should require root machine index hint');
  assert(robotsDiscoveryEval.expected.contains_text.includes('Artifact-Summary'), 'robots discovery eval should require artifact summary hint');
  assert(robotsDiscoveryEval.expected.contains_text.includes('Artifact-Shards'), 'robots discovery eval should require artifact shard hint');
  assert(robotsDiscoveryEval.expected.contains_text.includes('API-Readiness'), 'robots discovery eval should require API readiness hint');
  assert(evals.evals.some(evalCase => evalCase.id === 'openapi_context_contract'), 'evals should include OpenAPI context contract check');
  const openapiEval = evals.evals.find(evalCase => evalCase.id === 'openapi_context_contract');
  assert(openapiEval.expected.required_schema_properties.ContextApiResponse.includes('machine_consumption'), 'OpenAPI eval should require context machine guidance');
  assert(openapiEval.expected.required_schema_properties.EvidenceApiResponse.includes('machine_consumption'), 'OpenAPI eval should require evidence machine guidance');
  assert(openapiEval.expected.required_schema_properties.MachineConsumptionGuidance.includes('preferred_query_scoped_apis'), 'OpenAPI eval should require query-scoped machine guidance');
  assert(openapiEval.expected.required_schema_properties.ApiError.includes('machine_recovery'), 'OpenAPI eval should require machine-recoverable API errors');
  assert(openapiEval.expected.required_schema_properties.MachineRecoveryGuidance.includes('retry_examples'), 'OpenAPI eval should require recovery retry examples');
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
  const apiReadinessEval = evals.evals.find(evalCase => evalCase.id === 'api_readiness_summary');
  assertEq(apiReadinessEval.call.path, '/api-readiness.json');
  assertEq(apiReadinessEval.expected.schema_version, 'anchorfact.api-readiness.v1');
  assert(apiReadinessEval.expected.readiness_gate_ids.includes('core_query_context_ratio'), 'evals should require readiness gate ids');
  const notFoundEval = evals.evals.find(evalCase => evalCase.id === 'not_found_json_guard');
  assertEq(notFoundEval.call.path, '/__anchorfact-routing-guard-check.json');
  assertEq(notFoundEval.expected.status, 404);
  assertEq(notFoundEval.expected.schema_version, 'anchorfact.not-found.v1');
  assertEq(notFoundEval.expected.error_code, 'not_found');
  assertEq(notFoundEval.expected.fallback_policy_no_spa_fallback, true);
  const mcpEval = evals.evals.find(evalCase => evalCase.id === 'mcp_tool_catalog');
  assert(mcpEval.expected.required_tools.includes('anchorfact_plan_query'), 'evals should include MCP planner metadata check');
  assert(mcpEval.expected.required_tools.includes('anchorfact_context'), 'evals should include MCP context metadata check');
  assert(mcpEval.expected.required_tools.includes('anchorfact_content_health'), 'evals should include MCP corpus health metadata check');
  const provenanceEval = evals.evals.find(evalCase => evalCase.id === 'signed_provenance_static_artifacts');
  assert(provenanceEval.expected.required_artifacts.includes('root_index_json'), 'evals should require root index hash in provenance');
  assert(provenanceEval.expected.required_artifacts.includes('well_known_agent_json'), 'evals should require well-known agent hash in provenance');
  assert(provenanceEval.expected.required_artifacts.includes('evals_json'), 'evals should require self hash in provenance');
  assert(provenanceEval.expected.required_artifacts.includes('mcp_json'), 'evals should require MCP hash in provenance');
  assert(provenanceEval.expected.required_artifacts.includes('artifact_summary_json'), 'evals should require artifact summary hash in provenance');
  assert(provenanceEval.expected.required_artifacts.includes('artifact_shards_json'), 'evals should require artifact shards hash in provenance');
  assert(provenanceEval.expected.required_artifacts.includes('api_readiness_json'), 'evals should require API readiness hash in provenance');
  assert(provenanceEval.expected.required_artifacts.includes('not_found_html'), 'evals should require machine 404 hash in provenance');
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
  assertEq(mcp.public_http_api_guidance.access_policy_path, '/api-access/');
  assertEq(mcp.public_http_api_guidance.next_request_after_discovery.path, '/api/context?q={query}&limit=3&format=markdown');
  assert(mcp.public_http_api_guidance.minimum_valid_primary_calls.some(call => call.url === 'https://anchorfact.org/api/evidence?q={query}&limit=3&format=markdown'), 'MCP profile should expose minimum valid evidence API calls');
  assert(mcp.public_http_api_guidance.parameter_error_prevention.do_not_call_bare_paths.includes('/api/source'), 'MCP profile should warn against bare source calls');
  assertEq(mcp.public_http_api_guidance.parameter_error_prevention.recovery_field_on_400, 'machine_recovery');
  assert(mcp.public_http_api_guidance.local_to_public_tool_mapping.some(mapping => mapping.tool === 'anchorfact_context' && mapping.public_path === '/api/context?q={query}&limit=3&format=markdown'), 'MCP profile should map local context tool to public API');
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
  assert(mcp.related_public_artifacts.includes('/index.json'), 'MCP profile should link root machine index');
  assert(mcp.related_public_artifacts.includes('/api-readiness.json'), 'MCP profile should link API readiness');
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

test('article index.html is generated as a machine JSON-LD alias', () => {
  const publicHtmlAliasText = readFileSync(join(distDir, 'public-fixture', 'index.html'), 'utf-8');
  const publicJson = JSON.parse(readFileSync(join(distDir, 'public-fixture', 'index.json'), 'utf-8'));
  const publicHtmlAlias = JSON.parse(publicHtmlAliasText);
  const draftHtmlAliasText = readFileSync(join(distDir, 'draft-fixture', 'index.html'), 'utf-8');
  const draftHtmlAlias = JSON.parse(draftHtmlAliasText);
  const draftJson = JSON.parse(readFileSync(join(distDir, 'draft-fixture', 'index.json'), 'utf-8'));
  assertEq(publicHtmlAlias, publicJson, 'public index.html should alias index.json JSON-LD');
  assert(!publicHtmlAliasText.trimStart().startsWith('<'), 'public index.html alias should not emit HTML');
  assert(!draftHtmlAliasText.trimStart().startsWith('<'), 'draft index.html alias should not emit HTML');
  assertEq(draftHtmlAlias, draftJson, 'draft index.html should alias draft index.json JSON-LD');
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

test('large machine artifacts use compact JSON serialization', () => {
  for (const artifact of ['index.json', 'manifest.json', 'claims.json', 'search-index.json', 'sources.json', 'graph.json', 'api-readiness.json']) {
    const text = readFileSync(join(distDir, artifact), 'utf-8');
    JSON.parse(text);
    assert(!text.includes('\n  '), `${artifact} should be minified to preserve artifact budget`);
  }
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
  assertEq(provenance.verification_success_next_request.path, '/api/context?q={query}&limit=3&format=markdown');
  assertEq(provenance.verification_success_next_request.url, 'https://anchorfact.org/api/context?q={query}&limit=3&format=markdown');
  assertEq(provenance.primary_api_conversion.next_call_after_verification, '/api/context?q={query}&limit=3&format=markdown');
  assertEq(provenance.primary_api_conversion.next_call_after_discovery, '/api/context?q={query}&limit=3&format=markdown');
  assert(provenance.primary_api_conversion.minimum_valid_primary_calls.some(call => call.path === '/api/evidence?q={query}&limit=3&format=markdown'), 'provenance should expose copyable evidence calls after verification');
  assert(provenance.primary_api_conversion.parameter_error_prevention.do_not_call_bare_paths.includes('/api/source'), 'provenance should warn against bare source calls');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.root_index_json.sha256), 'root index checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.manifest_json.sha256), 'manifest checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.agent_json.sha256), 'agent checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.well_known_agent_json.sha256), 'well-known agent checksum should be sha256 hex');
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
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.artifact_shards_json.sha256), 'artifact shards checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.api_readiness_json.sha256), 'API readiness checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.not_found_html.sha256), 'machine 404 checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.search_index_json.sha256), 'search index checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.sources_json.sha256), 'sources checksum should be sha256 hex');
  assert(/^[a-f0-9]{64}$/.test(provenance.artifacts.llms_txt.sha256), 'llms checksum should be sha256 hex');
  assert(provenance.artifacts.root_index_json.bytes > 0, 'root index artifact should include byte size');
  assert(provenance.artifacts.manifest_json.bytes > 0, 'manifest artifact should include byte size');
  assert(provenance.artifacts.agent_json.bytes > 0, 'agent artifact should include byte size');
  assertEq(provenance.artifacts.well_known_agent_json.path, '/.well-known/anchorfact.json');
  assert(provenance.artifacts.well_known_agent_json.bytes > 0, 'well-known agent artifact should include byte size');
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
  assert(provenance.artifacts.artifact_shards_json.bytes > 0, 'artifact shards artifact should include byte size');
  assert(provenance.artifacts.api_readiness_json.bytes > 0, 'API readiness artifact should include byte size');
  assertEq(provenance.artifacts.not_found_html.path, '/404.html');
  assert(provenance.artifacts.not_found_html.bytes > 0, 'machine 404 artifact should include byte size');
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

test('Cloudflare Pages routing guard artifacts are generated', () => {
  assert(existsSync(join(distDir, '_routes.json')), '_routes.json missing');
  assert(existsSync(join(distDir, '404.html')), '404.html missing');

  const routes = JSON.parse(readFileSync(join(distDir, '_routes.json'), 'utf-8'));
  assertEq(routes.version, 1);
  assertEq(routes.include, ['/api', '/api/*', '/robots.txt']);
  assertEq(routes.exclude, []);

  const notFoundText = readFileSync(join(distDir, '404.html'), 'utf-8');
  const notFound = JSON.parse(notFoundText);
  assertEq(notFound.schema_version, 'anchorfact.not-found.v1');
  assertEq(notFound.status, 404);
  assertEq(notFound.error.code, 'not_found');
  assertEq(notFound.fallback_policy.no_spa_fallback, true);
  assert(notFound.machine_entrypoints.includes('/index.json'), '404 payload should point machines to root index');
  assert(notFound.machine_entrypoints.includes('/api/context?q={query}'), '404 payload should point machines to context API');
  assert(!notFoundText.trimStart().startsWith('<'), '404 endpoint should not emit an HTML shell');
});

test('_headers is generated for Cloudflare Pages static output', () => {
  const headers = readFileSync(join(distDir, '_headers'), 'utf-8');
  const revalidatedMachineArtifacts = [
    '/',
    '/api-access/',
    '/index.json',
    '/agent.json',
    '/.well-known/anchorfact.json',
    '/openapi.json',
    '/artifact-summary.json',
    '/artifact-shards.json',
    '/api-readiness.json',
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
  assert(headers.includes('/\n  Access-Control-Allow-Origin: *'), '_headers should expose root slash machine JSON CORS');
  assert(headers.includes('/api-access/\n  Access-Control-Allow-Origin: *'), '_headers should expose API access policy CORS');
  assert(headers.includes('/index.json\n  Access-Control-Allow-Origin: *'), '_headers should expose root machine index CORS');
  assert(headers.includes('/agent.json\n  Access-Control-Allow-Origin: *'), '_headers should expose agent profile CORS');
  assert(headers.includes('/.well-known/anchorfact.json\n  Access-Control-Allow-Origin: *'), '_headers should expose well-known agent profile CORS');
  assert(headers.includes('/openapi.json\n  Access-Control-Allow-Origin: *'), '_headers should expose OpenAPI CORS');
  assert(headers.includes('/artifact-summary.json\n  Access-Control-Allow-Origin: *'), '_headers should expose artifact summary CORS');
  assert(headers.includes('/artifact-shards.json\n  Access-Control-Allow-Origin: *'), '_headers should expose artifact shards CORS');
  assert(headers.includes('/api-readiness.json\n  Access-Control-Allow-Origin: *'), '_headers should expose API readiness CORS');
  assert(headers.includes('/artifacts/v1/*\n  Access-Control-Allow-Origin: *'), '_headers should expose versioned artifact shards CORS');
  assert(headers.includes('/artifacts/v1/*\n  Access-Control-Allow-Origin: *\n  Content-Type: application/json; charset=utf-8\n  Cache-Control: public, max-age=31536000, immutable'), '_headers should make versioned shard files immutable');
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
  assert(headers.includes('/robots.txt\n  Content-Type: text/plain; charset=utf-8\n  Cache-Control: no-store, max-age=0, must-revalidate\n  CDN-Cache-Control: no-store\n  Cloudflare-CDN-Cache-Control: no-store'), '_headers should keep robots.txt uncached for bot discovery reliability');
  assert(headers.includes('/sitemap.xml\n  Content-Type: application/xml; charset=utf-8\n  Cache-Control: public, max-age=3600, stale-while-revalidate=86400'), '_headers should short-cache sitemap.xml for bot discovery reliability');
  for (const path of revalidatedMachineArtifacts) {
    assert(headers.includes(`${path}\n  Access-Control-Allow-Origin: *`), `_headers should expose ${path} CORS`);
    assert(headers.includes(`${path}\n  Access-Control-Allow-Origin: *\n  Content-Type:`), `_headers should set ${path} content type`);
    assert(headers.includes(`${path}\n  Access-Control-Allow-Origin: *\n  Content-Type: ${path.endsWith('.txt') ? 'text/plain' : 'application/json'}; charset=utf-8\n  Cache-Control: public, max-age=0, must-revalidate`), `_headers should keep ${path} revalidated`);
  }
  assert(headers.includes('/*/index.json\n  Access-Control-Allow-Origin: *'), '_headers should expose article JSON-LD CORS');
  for (const path of ['/*/index.html', '/*/index', '/:category/:article/']) {
    assert(headers.includes(`${path}\n  Access-Control-Allow-Origin: *\n  Content-Type: application/ld+json; charset=utf-8\n  Cache-Control: public, max-age=86400`), `_headers should expose article ${path} aliases as JSON-LD`);
    assert(headers.includes(`${path}\n  Access-Control-Allow-Origin: *\n  Content-Type: application/ld+json; charset=utf-8\n  Cache-Control: public, max-age=86400\n  X-Robots-Tag: noindex, nofollow`), `_headers should noindex article ${path} aliases`);
  }
  for (const path of ['/drafts', '/drafts.html', '/dashboard', '/dashboard.html', '/404', '/404.html', '/__anchorfact-routing-guard-check.json']) {
    assert(headers.includes(`${path}\n  Access-Control-Allow-Origin: *\n  Content-Type: application/json; charset=utf-8\n  Cache-Control: public, max-age=0, must-revalidate\n  X-Robots-Tag: noindex, nofollow`), `_headers should expose ${path} as noindex JSON`);
  }
});

rmSync(root, { recursive: true, force: true });

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
