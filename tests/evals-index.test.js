#!/usr/bin/env node
import { buildEvalsIndex } from '../src/lib/evals-index.js';

let passed = 0, failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ok ${name}`);
  } catch (e) {
    failed++;
    console.log(`  fail ${name}: ${e.message}`);
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

const searchIndexPayload = {
  records: [
    {
      canonical_slug: 'ai/3d-generation-gaussian-splatting',
      title: 'Gaussian Splatting',
      confidence_level: 'medium',
      claim_count: 2,
      source_count: 2,
      claim_ids: [
        'https://anchorfact.org/fact/f1',
        'https://anchorfact.org/fact/f2'
      ],
      keywords: ['gaussian', 'splatting', 'nerf']
    }
  ]
};

const claimsPayload = {
  claims: [
    {
      id: 'https://anchorfact.org/fact/f1',
      canonical_slug: 'ai/3d-generation-gaussian-splatting',
      statement: '3D Gaussian Splatting represents scenes as optimized 3D Gaussian primitives.',
      confidence: 'medium',
      source_url: 'https://arxiv.org/abs/2308.04079',
      source_title: '3D Gaussian Splatting for Real-Time Radiance Field Rendering'
    }
  ]
};

const sourcesPayload = {
  sources: [
    {
      id: 'source:gaussian',
      title: '3D Gaussian Splatting for Real-Time Radiance Field Rendering',
      url: 'https://arxiv.org/abs/2308.04079',
      tier: 'A',
      type: 'academic_paper',
      article_count: 1,
      claim_count: 1,
      articles: [
        {
          canonical_slug: 'ai/3d-generation-gaussian-splatting',
          title: 'Gaussian Splatting'
        }
      ]
    }
  ]
};

const graphPayload = {
  node_count: 4,
  edge_count: 3,
  edges: [
    {
      type: 'article_has_claim',
      from: 'article:ai/3d-generation-gaussian-splatting',
      to: 'https://anchorfact.org/fact/f1'
    },
    {
      type: 'claim_supported_by_source',
      from: 'https://anchorfact.org/fact/f1',
      to: 'source:gaussian'
    }
  ]
};

console.log('AnchorFact Evals Index Tests\n');

test('buildEvalsIndex produces executable AI integration checks', () => {
  const payload = buildEvalsIndex({
    generated: '2026-05-29T00:00:00.000Z',
    searchIndexPayload,
    claimsPayload,
    sourcesPayload,
    graphPayload
  });

  assertEq(payload.schema_version, 'anchorfact.evals.v1');
  assertEq(payload.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(payload.eval_count, 29);
  assertEq(payload.evals.map(evalCase => evalCase.id), [
    'api_discovery',
    'openapi_context_contract',
    'query_plan',
    'unsupported_query_plan',
    'evidence_pack_json',
    'ai_query_routing_retrieval_augmented_generation',
    'ai_query_routing_parameter_efficient_fine_tuning',
    'ai_query_routing_rlhf',
    'ai_query_routing_mixture_of_experts',
    'ai_query_routing_low_resource_nlp',
    'query_routing_postgresql',
    'query_routing_climate_change',
    'query_routing_stock_market_basics',
    'query_routing_ancient_egypt',
    'query_routing_public_speaking',
    'query_routing_sports_biomechanics',
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
    'mcp_tool_catalog',
    'signed_provenance_static_artifacts'
  ]);

  const apiDiscoveryEval = payload.evals.find(evalCase => evalCase.id === 'api_discovery');
  assertEq(apiDiscoveryEval.call.path, '/api');
  assertEq(apiDiscoveryEval.expected.schema_version, 'anchorfact.api-index.v1');
  assert(apiDiscoveryEval.expected.required_paths.includes('/api/evidence'), 'API discovery eval should require evidence endpoint');
  assert(apiDiscoveryEval.expected.required_paths.includes('/api/resolve-batch'), 'API discovery eval should require batch resolver endpoint');

  const openapiEval = payload.evals.find(evalCase => evalCase.id === 'openapi_context_contract');
  assertEq(openapiEval.call.path, '/openapi.json');
  assertEq(openapiEval.expected.openapi_schema_version, 'anchorfact.openapi.v1');
  assert(openapiEval.expected.required_schema_properties.ContextApiResponse.includes('answer_policy'), 'OpenAPI eval should require context answer policy');
  assert(openapiEval.expected.required_schema_properties.AnswerPolicy.includes('can_answer_with_anchorfact'), 'OpenAPI eval should require answer policy fields');
  assert(openapiEval.expected.required_schema_properties.CitationReadyClaim.includes('cite_api_path'), 'OpenAPI eval should require citation claim fields');

  const planEval = payload.evals.find(evalCase => evalCase.id === 'query_plan');
  assert(planEval.call.path.includes('/api/plan?q=gaussian+splatting&limit=3'), 'plan eval should include encoded query path');
  assertEq(planEval.expected.schema_version, 'anchorfact.plan-api.v1');
  assertEq(planEval.expected.should_use_anchorfact, true);
  assertEq(planEval.expected.recommended_call_contains, '/api/evidence');

  const unsupportedPlanEval = payload.evals.find(evalCase => evalCase.id === 'unsupported_query_plan');
  assert(unsupportedPlanEval.call.path.includes('/api/plan?q=lunar+dentistry&limit=3'), 'unsupported plan eval should use a fixed no-coverage query');
  assertEq(unsupportedPlanEval.expected.coverage_status, 'unsupported');
  assertEq(unsupportedPlanEval.expected.should_use_anchorfact, false);
  assertEq(unsupportedPlanEval.expected.recommended_call_contains, '/coverage.json');
  assertEq(unsupportedPlanEval.expected.fallback_guidance_contains, 'external primary');

  const evidenceEval = payload.evals.find(evalCase => evalCase.id === 'evidence_pack_json');
  assert(evidenceEval.call.path.includes('/api/evidence?q=gaussian+splatting&limit=3'), 'evidence eval should include encoded query path');
  assertEq(evidenceEval.expected.schema_version, 'anchorfact.evidence-api.v1');
  assertEq(evidenceEval.expected.contains_canonical_slug, 'ai/3d-generation-gaussian-splatting');

  const rlhfEval = payload.evals.find(evalCase => evalCase.id === 'ai_query_routing_rlhf');
  assert(rlhfEval.call.path.includes('/api/evidence?q=RLHF&limit=3'), 'RLHF routing eval should use the high-intent acronym query');
  assertEq(rlhfEval.expected.top_canonical_slug, 'ai/rlhf');
  assertEq(rlhfEval.expected.contains_canonical_slug, 'ai/rlhf');

  const climateEval = payload.evals.find(evalCase => evalCase.id === 'query_routing_climate_change');
  assert(climateEval.call.path.includes('/api/evidence?q=climate+change&limit=3'), 'climate routing eval should use a cross-domain science query');
  assertEq(climateEval.expected.top_canonical_slug, 'science/climate-change');

  const contextEval = payload.evals.find(evalCase => evalCase.id === 'context_pack_json');
  assert(contextEval.call.path.includes('/api/context?q=gaussian+splatting&limit=3'), 'context eval should include encoded query path');
  assertEq(contextEval.expected.schema_version, 'anchorfact.context-api.v1');
  assertEq(contextEval.expected.should_use_anchorfact, true);
  assertEq(contextEval.expected.answer_policy_can_answer, true);
  assertEq(contextEval.expected.min_citation_ready_claims, 1);
  assertEq(contextEval.expected.min_content_health_public_articles, 1);
  assertEq(contextEval.expected.content_health_trust_boundary, 'draft_entries_excluded_from_ai_entrypoints');

  const unsupportedEvidenceEval = payload.evals.find(evalCase => evalCase.id === 'unsupported_query_evidence');
  assert(unsupportedEvidenceEval.call.path.includes('/api/evidence?q=lunar+dentistry&limit=3'), 'unsupported evidence eval should use the same fixed no-coverage query');
  assertEq(unsupportedEvidenceEval.expected.schema_version, 'anchorfact.evidence-api.v1');
  assertEq(unsupportedEvidenceEval.expected.result_count, 0);

  const unsupportedContextEval = payload.evals.find(evalCase => evalCase.id === 'unsupported_context_pack_json');
  assert(unsupportedContextEval.call.path.includes('/api/context?q=lunar+dentistry&limit=3'), 'unsupported context eval should use the same fixed no-coverage query');
  assertEq(unsupportedContextEval.expected.schema_version, 'anchorfact.context-api.v1');
  assertEq(unsupportedContextEval.expected.should_use_anchorfact, false);
  assertEq(unsupportedContextEval.expected.answer_policy_can_answer, false);
  assertEq(unsupportedContextEval.expected.max_citation_ready_claims, 0);

  const markdownEval = payload.evals.find(evalCase => evalCase.id === 'evidence_pack_markdown');
  assert(markdownEval.call.path.includes('format=markdown'), 'markdown eval should request markdown format');
  assert(markdownEval.expected.contains_text.includes('Citation contract:'), 'markdown eval should assert citation contract text');

  const claimEval = payload.evals.find(evalCase => evalCase.id === 'claim_dereference');
  assert(claimEval.call.path.includes('/api/claim?id=f1'), 'claim eval should use shorthand claim id');
  assertEq(claimEval.expected.claim_id, 'https://anchorfact.org/fact/f1');

  const resolverEval = payload.evals.find(evalCase => evalCase.id === 'reference_resolver');
  assert(resolverEval.call.path.includes('/api/resolve?ref=f1'), 'resolver eval should use reference resolver');
  assertEq(resolverEval.expected.schema_version, 'anchorfact.resolve-api.v1');
  assertEq(resolverEval.expected.resolved_type, 'claim');

  const batchResolverEval = payload.evals.find(evalCase => evalCase.id === 'batch_reference_resolver');
  assert(batchResolverEval.call.path.includes('/api/resolve-batch?'), 'batch resolver eval should use batch reference resolver');
  assert(batchResolverEval.call.path.includes('ref=f1'), 'batch resolver eval should include claim shorthand');
  assertEq(batchResolverEval.expected.schema_version, 'anchorfact.resolve-batch-api.v1');
  assertEq(batchResolverEval.expected.reference_count, 2);
  assertEq(batchResolverEval.expected.error_count, 0);

  const citationEval = payload.evals.find(evalCase => evalCase.id === 'citation_export');
  assert(citationEval.call.path.includes('/api/cite?id=f1'), 'citation eval should use citation API shorthand claim id');
  assertEq(citationEval.expected.schema_version, 'anchorfact.cite-api.v1');
  assert(citationEval.expected.citation_export_contains.includes('AnchorFact:'), 'citation eval should assert AnchorFact citation text');

  const sourceEval = payload.evals.find(evalCase => evalCase.id === 'source_reuse_lookup');
  assert(sourceEval.call.path.includes('/api/source?url=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079'), 'source eval should use source URL lookup');
  assertEq(sourceEval.expected.contains_claim_id, 'https://anchorfact.org/fact/f1');

  const healthEval = payload.evals.find(evalCase => evalCase.id === 'content_health_summary');
  assertEq(healthEval.call.path, '/content-health.json');
  assertEq(healthEval.expected.schema_version, 'anchorfact.content-health.v1');
  assertEq(healthEval.expected.machine_guidance_contains, '/api/context');
  assertEq(healthEval.expected.trust_boundary, 'draft_entries_excluded_from_ai_entrypoints');
  assertEq(healthEval.expected.min_repair_queue_candidates, 1);
  assertEq(healthEval.expected.min_repair_queue_next_batch, 1);
  assertEq(healthEval.expected.repair_queue_policy_contains, 'repair_complexity');
  assertEq(healthEval.expected.max_public_source_tier_c, 0);

  const provenanceEval = payload.evals.find(evalCase => evalCase.id === 'signed_provenance_static_artifacts');
  assert(provenanceEval.expected.required_artifacts.includes('evals_json'), 'provenance eval should require evals artifact hash');
  assert(provenanceEval.expected.required_artifacts.includes('capabilities_json'), 'provenance eval should require capabilities artifact hash');
  assert(provenanceEval.expected.required_artifacts.includes('content_health_json'), 'provenance eval should require content health artifact hash');
  assert(provenanceEval.expected.required_artifacts.includes('coverage_json'), 'provenance eval should require coverage artifact hash');
  assert(provenanceEval.expected.required_artifacts.includes('mcp_json'), 'provenance eval should require mcp artifact hash');

  const mcpEval = payload.evals.find(evalCase => evalCase.id === 'mcp_tool_catalog');
  assertEq(mcpEval.call.path, '/mcp.json');
  assertEq(mcpEval.expected.schema_version, 'anchorfact.mcp.v1');
  assert(mcpEval.expected.required_tools.includes('anchorfact_plan_query'), 'MCP eval should require query planner tool metadata');
  assert(mcpEval.expected.required_tools.includes('anchorfact_context'), 'MCP eval should require context tool metadata');
  assert(mcpEval.expected.required_tools.includes('anchorfact_content_health'), 'MCP eval should require corpus health tool metadata');
  assert(mcpEval.expected.required_tools.includes('anchorfact_cite_claim'), 'MCP eval should require citation tool metadata');
});

test('buildEvalsIndex returns an empty contract when no public records exist', () => {
  const payload = buildEvalsIndex({
    generated: '2026-05-29T00:00:00.000Z',
    searchIndexPayload: { records: [] },
    claimsPayload: { claims: [] },
    sourcesPayload: { sources: [] },
    graphPayload: { nodes: [], edges: [] }
  });

  assertEq(payload.schema_version, 'anchorfact.evals.v1');
  assertEq(payload.eval_count, 0);
  assertEq(payload.evals, []);
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
