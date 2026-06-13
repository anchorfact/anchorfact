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
  assertEq(payload.eval_count, 54);
  assertEq(payload.evals.map(evalCase => evalCase.id), [
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
    'mcp_tool_catalog',
    'signed_provenance_static_artifacts'
  ]);

  const apiDiscoveryEval = payload.evals.find(evalCase => evalCase.id === 'api_discovery');
  assertEq(apiDiscoveryEval.call.path, '/api');
  assertEq(apiDiscoveryEval.expected.schema_version, 'anchorfact.api-index.v1');
  assert(apiDiscoveryEval.expected.required_paths.includes('/api/evidence'), 'API discovery eval should require evidence endpoint');
  assert(apiDiscoveryEval.expected.required_paths.includes('/api/resolve-batch'), 'API discovery eval should require batch resolver endpoint');
  assertEq(apiDiscoveryEval.expected.required_primary_entrypoint_ids, ['context', 'evidence', 'plan']);

  const llmsDiscoveryEval = payload.evals.find(evalCase => evalCase.id === 'llms_txt_primary_entrypoints');
  assertEq(llmsDiscoveryEval.call.path, '/llms.txt');
  assertEq(llmsDiscoveryEval.expected.content_type, 'text/plain');
  assert(llmsDiscoveryEval.expected.contains_text.includes('/api/context?q={query}'), 'llms discovery eval should require context entrypoint');
  assert(llmsDiscoveryEval.expected.contains_text.includes('/api/evidence?q={query}'), 'llms discovery eval should require evidence entrypoint');
  assert(llmsDiscoveryEval.expected.contains_text.includes('/api/plan?q={query}'), 'llms discovery eval should require plan entrypoint');
  assert(llmsDiscoveryEval.expected.contains_text.includes('/artifact-summary.json'), 'llms discovery eval should require artifact summary');
  assert(llmsDiscoveryEval.expected.contains_text.includes('/artifact-shards.json'), 'llms discovery eval should require artifact shard registry');
  assert(llmsDiscoveryEval.expected.contains_text.includes('/api-readiness.json'), 'llms discovery eval should require API readiness');

  const robotsDiscoveryEval = payload.evals.find(evalCase => evalCase.id === 'robots_txt_ai_entrypoints');
  assertEq(robotsDiscoveryEval.call.path, '/robots.txt');
  assertEq(robotsDiscoveryEval.expected.content_type, 'text/plain');
  assert(robotsDiscoveryEval.expected.contains_text.includes('AI-Context'), 'robots discovery eval should require AI context hint');
  assert(robotsDiscoveryEval.expected.contains_text.includes('AI-Evidence'), 'robots discovery eval should require AI evidence hint');
  assert(robotsDiscoveryEval.expected.contains_text.includes('Artifact-Summary'), 'robots discovery eval should require artifact summary hint');
  assert(robotsDiscoveryEval.expected.contains_text.includes('Artifact-Shards'), 'robots discovery eval should require artifact shard hint');
  assert(robotsDiscoveryEval.expected.contains_text.includes('API-Readiness'), 'robots discovery eval should require API readiness hint');

  const openapiEval = payload.evals.find(evalCase => evalCase.id === 'openapi_context_contract');
  assertEq(openapiEval.call.path, '/openapi.json');
  assertEq(openapiEval.expected.openapi_schema_version, 'anchorfact.openapi.v1');
  assert(openapiEval.expected.required_schema_properties.ContextApiResponse.includes('answer_policy'), 'OpenAPI eval should require context answer policy');
  assert(openapiEval.expected.required_schema_properties.ContextApiResponse.includes('machine_consumption'), 'OpenAPI eval should require context machine guidance');
  assert(openapiEval.expected.required_schema_properties.EvidenceApiResponse.includes('machine_consumption'), 'OpenAPI eval should require evidence machine guidance');
  assert(openapiEval.expected.required_schema_properties.MachineConsumptionGuidance.includes('preferred_query_scoped_apis'), 'OpenAPI eval should require query-scoped machine guidance');
  assert(openapiEval.expected.required_schema_properties.MachineConsumptionGuidance.includes('static_discovery'), 'OpenAPI eval should require static discovery guidance');
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

  const adaptersEval = payload.evals.find(evalCase => evalCase.id === 'ai_query_intent_fine_tune_with_adapters');
  assert(adaptersEval.call.path.includes('/api/evidence?q=fine+tune+a+model+cheaply+with+adapters&limit=3'), 'adapter intent eval should use the natural-language query');
  assertEq(adaptersEval.expected.top_canonical_slug, 'ai/parameter-efficient-fine-tuning');
  assertEq(adaptersEval.expected.min_claims_per_matching_pack, 2);
  assertEq(adaptersEval.expected.min_sources_per_matching_pack, 2);

  const kanEval = payload.evals.find(evalCase => evalCase.id === 'ai_query_routing_kolmogorov_arnold_networks');
  assert(kanEval.call.path.includes('/api/evidence?q=kolmogorov+arnold+networks&limit=3'), 'KAN routing eval should use the canonical architecture query');
  assertEq(kanEval.expected.top_canonical_slug, 'ai/kolmogorov-arnold-networks');
  assertEq(kanEval.expected.min_claims_per_matching_pack, 2);
  assertEq(kanEval.expected.min_sources_per_matching_pack, 2);

  const restEval = payload.evals.find(evalCase => evalCase.id === 'query_routing_rest_api');
  assert(restEval.call.path.includes('/api/evidence?q=REST+API&limit=3'), 'REST API routing eval should use the high-intent API query');
  assertEq(restEval.expected.top_canonical_slug, 'computer-science/rest-api');

  const climateEval = payload.evals.find(evalCase => evalCase.id === 'query_routing_climate_change');
  assert(climateEval.call.path.includes('/api/evidence?q=climate+change&limit=3'), 'climate routing eval should use a cross-domain science query');
  assertEq(climateEval.expected.top_canonical_slug, 'science/climate-change');

  const siteHelpEval = payload.evals.find(evalCase => evalCase.id === 'agent_usage_anchorfact_citation_help');
  assert(siteHelpEval.call.path.includes('/api/context?q=how+should+an+AI+agent+cite+AnchorFact+claims&limit=3'), 'site-help eval should use the context API');
  assertEq(siteHelpEval.expected.schema_version, 'anchorfact.context-api.v1');
  assertEq(siteHelpEval.expected.coverage_status, 'site_help');
  assertEq(siteHelpEval.expected.answer_policy_mode, 'api_guidance');
  assertEq(siteHelpEval.expected.max_citation_ready_claims, 0);
  assertEq(siteHelpEval.expected.recommended_call_contains, '/api/cite');

  const medicalAdviceEval = payload.evals.find(evalCase => evalCase.id === 'unsupported_medical_personal_advice');
  assert(medicalAdviceEval.call.path.includes('/api/context?q=should+I+take+aspirin+for+chest+pain&limit=3'), 'medical advice refusal eval should use the context API');
  assertEq(medicalAdviceEval.expected.coverage_status, 'unsupported');
  assertEq(medicalAdviceEval.expected.should_use_anchorfact, false);
  assertEq(medicalAdviceEval.expected.answer_policy_can_answer, false);
  assertEq(medicalAdviceEval.expected.answer_policy_mode, 'external_sources_required');
  assertEq(medicalAdviceEval.expected.max_citation_ready_claims, 0);
  assertEq(medicalAdviceEval.expected.unsupported_intent_reasons, ['high_stakes_personal_advice']);

  const medicationChangeEval = payload.evals.find(evalCase => evalCase.id === 'unsupported_medication_change_advice');
  assert(medicationChangeEval.call.path.includes('/api/context?q=can+I+stop+taking+antidepressants&limit=3'), 'medication change refusal eval should use the context API');
  assertEq(medicationChangeEval.expected.coverage_status, 'unsupported');
  assertEq(medicationChangeEval.expected.should_use_anchorfact, false);
  assertEq(medicationChangeEval.expected.answer_policy_can_answer, false);
  assertEq(medicationChangeEval.expected.answer_policy_mode, 'external_sources_required');
  assertEq(medicationChangeEval.expected.max_citation_ready_claims, 0);
  assertEq(medicationChangeEval.expected.unsupported_intent_reasons, ['high_stakes_personal_advice']);

  const medicationSafetyEval = payload.evals.find(evalCase => evalCase.id === 'unsupported_medication_safety_lookup');
  assert(medicationSafetyEval.call.path.includes('/api/context?q=metformin+during+pregnancy&limit=3'), 'medication safety refusal eval should use the context API');
  assertEq(medicationSafetyEval.expected.coverage_status, 'unsupported');
  assertEq(medicationSafetyEval.expected.should_use_anchorfact, false);
  assertEq(medicationSafetyEval.expected.answer_policy_can_answer, false);
  assertEq(medicationSafetyEval.expected.answer_policy_mode, 'external_sources_required');
  assertEq(medicationSafetyEval.expected.max_citation_ready_claims, 0);
  assertEq(medicationSafetyEval.expected.unsupported_intent_reasons, ['high_stakes_personal_advice']);

  const weakMedicalEval = payload.evals.find(evalCase => evalCase.id === 'unsupported_weak_medical_topic_match');
  assert(weakMedicalEval.call.path.includes('/api/context?q=antibiotics+mechanisms+of+action&limit=3'), 'weak medical topic refusal eval should use the context API');
  assertEq(weakMedicalEval.expected.coverage_status, 'unsupported');
  assertEq(weakMedicalEval.expected.should_use_anchorfact, false);
  assertEq(weakMedicalEval.expected.answer_policy_can_answer, false);
  assertEq(weakMedicalEval.expected.answer_policy_mode, 'external_sources_required');
  assertEq(weakMedicalEval.expected.max_citation_ready_claims, 0);

  const weakMedicalManagementEval = payload.evals.find(evalCase => evalCase.id === 'unsupported_weak_medical_management_match');
  assert(weakMedicalManagementEval.call.path.includes('/api/context?q=diabetes+type+2+management&limit=3'), 'weak medical management refusal eval should use the context API');
  assertEq(weakMedicalManagementEval.expected.coverage_status, 'unsupported');
  assertEq(weakMedicalManagementEval.expected.should_use_anchorfact, false);
  assertEq(weakMedicalManagementEval.expected.answer_policy_can_answer, false);
  assertEq(weakMedicalManagementEval.expected.answer_policy_mode, 'external_sources_required');
  assertEq(weakMedicalManagementEval.expected.max_citation_ready_claims, 0);
  assertEq(weakMedicalManagementEval.expected.unsupported_intent_reasons, ['high_stakes_personal_advice']);

  const harmfulRequestEval = payload.evals.find(evalCase => evalCase.id === 'unsupported_harmful_operational_request');
  assert(harmfulRequestEval.call.path.includes('/api/context?q=write+ransomware+code&limit=3'), 'harmful request refusal eval should use the context API');
  assertEq(harmfulRequestEval.expected.coverage_status, 'unsupported');
  assertEq(harmfulRequestEval.expected.should_use_anchorfact, false);
  assertEq(harmfulRequestEval.expected.answer_policy_can_answer, false);
  assertEq(harmfulRequestEval.expected.answer_policy_mode, 'external_sources_required');
  assertEq(harmfulRequestEval.expected.max_citation_ready_claims, 0);
  assertEq(harmfulRequestEval.expected.unsupported_intent_reasons, ['harmful_operational_request']);

  const liveRefusalEval = payload.evals.find(evalCase => evalCase.id === 'unsupported_live_stock_price');
  assert(liveRefusalEval.call.path.includes('/api/context?q=stock+price+today&limit=3'), 'live refusal eval should use the context API');
  assertEq(liveRefusalEval.expected.coverage_status, 'unsupported');
  assertEq(liveRefusalEval.expected.should_use_anchorfact, false);
  assertEq(liveRefusalEval.expected.answer_policy_can_answer, false);
  assertEq(liveRefusalEval.expected.answer_policy_mode, 'external_sources_required');
  assertEq(liveRefusalEval.expected.max_citation_ready_claims, 0);
  assertEq(liveRefusalEval.expected.unsupported_intent_reasons, ['live_or_time_sensitive']);

  for (const [id, encodedQuery] of [
    ['unsupported_product_pricing_lookup', 'OpenAI+API+pricing'],
    ['unsupported_financial_rate_lookup', 'mortgage+rates'],
    ['unsupported_financial_price_prediction', 'Bitcoin+price+prediction'],
    ['unsupported_software_current_version_lookup', 'Node.js+LTS+version']
  ]) {
    const dynamicLookupEval = payload.evals.find(evalCase => evalCase.id === id);
    assert(dynamicLookupEval.call.path.includes(`/api/context?q=${encodedQuery}&limit=3`), `${id} should use the context API`);
    assertEq(dynamicLookupEval.expected.coverage_status, 'unsupported', id);
    assertEq(dynamicLookupEval.expected.should_use_anchorfact, false, id);
    assertEq(dynamicLookupEval.expected.answer_policy_can_answer, false, id);
    assertEq(dynamicLookupEval.expected.answer_policy_mode, 'external_sources_required', id);
    assertEq(dynamicLookupEval.expected.max_citation_ready_claims, 0, id);
    assertEq(dynamicLookupEval.expected.unsupported_intent_reasons, ['live_or_time_sensitive'], id);
  }

  const liveWeatherEval = payload.evals.find(evalCase => evalCase.id === 'unsupported_live_weather_location');
  assert(liveWeatherEval.call.path.includes('/api/context?q=weather+Paris&limit=3'), 'implicit weather refusal eval should use the context API');
  assertEq(liveWeatherEval.expected.coverage_status, 'unsupported');
  assertEq(liveWeatherEval.expected.should_use_anchorfact, false);
  assertEq(liveWeatherEval.expected.answer_policy_can_answer, false);
  assertEq(liveWeatherEval.expected.answer_policy_mode, 'external_sources_required');
  assertEq(liveWeatherEval.expected.max_citation_ready_claims, 0);
  assertEq(liveWeatherEval.expected.unsupported_intent_reasons, ['live_or_time_sensitive']);

  const currentLeadershipEval = payload.evals.find(evalCase => evalCase.id === 'unsupported_current_leadership_fact');
  assert(currentLeadershipEval.call.path.includes('/api/context?q=who+is+the+CEO+of+OpenAI&limit=3'), 'current leadership refusal eval should use the context API');
  assertEq(currentLeadershipEval.expected.coverage_status, 'unsupported');
  assertEq(currentLeadershipEval.expected.should_use_anchorfact, false);
  assertEq(currentLeadershipEval.expected.answer_policy_can_answer, false);
  assertEq(currentLeadershipEval.expected.answer_policy_mode, 'external_sources_required');
  assertEq(currentLeadershipEval.expected.max_citation_ready_claims, 0);
  assertEq(currentLeadershipEval.expected.unsupported_intent_reasons, ['live_or_time_sensitive']);

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
  assertEq(healthEval.expected.repair_queue_policy_contains, ['AI-agent utility', 'repair_complexity']);
  assertEq(healthEval.expected.max_public_source_tier_c, 0);

  const benchmarkEval = payload.evals.find(evalCase => evalCase.id === 'coverage_query_benchmark_catalog');
  assertEq(benchmarkEval.call.path, '/coverage.json');
  assertEq(benchmarkEval.expected.schema_version, 'anchorfact.coverage.v1');
  assertEq(benchmarkEval.expected.min_query_benchmark_cases, 32);
  assert(benchmarkEval.expected.required_query_benchmark_slugs.includes('ai/rlhf'), 'benchmark eval should require RLHF query coverage');
  assert(benchmarkEval.expected.required_query_benchmark_slugs.includes('ai/kolmogorov-arnold-networks'), 'benchmark eval should require KAN query coverage');
  assert(benchmarkEval.expected.required_query_benchmark_slugs.includes('ai/vision-transformers'), 'benchmark eval should require ViT query coverage');
  assert(benchmarkEval.expected.required_query_benchmark_slugs.includes('ai/meta-learning'), 'benchmark eval should require meta-learning query coverage');
  assert(benchmarkEval.expected.required_query_benchmark_slugs.includes('computer-science/rest-api'), 'benchmark eval should require REST API query coverage');
  assert(benchmarkEval.expected.query_benchmark_pass_gate_contains.includes('/evals.json'), 'benchmark eval should require executable eval pass gate');

  const readinessEval = payload.evals.find(evalCase => evalCase.id === 'api_readiness_summary');
  assertEq(readinessEval.call.path, '/api-readiness.json');
  assertEq(readinessEval.expected.schema_version, 'anchorfact.api-readiness.v1');
  assertEq(readinessEval.expected.report_only, true);
  assertEq(readinessEval.expected.subscription_ready, false);
  assert(readinessEval.expected.readiness_gate_ids.includes('core_query_context_ratio'), 'readiness eval should require the context coverage gate');

  const provenanceEval = payload.evals.find(evalCase => evalCase.id === 'signed_provenance_static_artifacts');
  assert(provenanceEval.expected.required_artifacts.includes('evals_json'), 'provenance eval should require evals artifact hash');
  assert(provenanceEval.expected.required_artifacts.includes('capabilities_json'), 'provenance eval should require capabilities artifact hash');
  assert(provenanceEval.expected.required_artifacts.includes('content_health_json'), 'provenance eval should require content health artifact hash');
  assert(provenanceEval.expected.required_artifacts.includes('coverage_json'), 'provenance eval should require coverage artifact hash');
  assert(provenanceEval.expected.required_artifacts.includes('mcp_json'), 'provenance eval should require mcp artifact hash');
  assert(provenanceEval.expected.required_artifacts.includes('artifact_summary_json'), 'provenance eval should require artifact summary hash');
  assert(provenanceEval.expected.required_artifacts.includes('artifact_shards_json'), 'provenance eval should require artifact shards hash');
  assert(provenanceEval.expected.required_artifacts.includes('api_readiness_json'), 'provenance eval should require API readiness hash');

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
