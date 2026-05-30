export const QUERY_BENCHMARK_CASES = [
  {
    id: 'ai_query_routing_retrieval_augmented_generation',
    category: 'core_ai',
    query: 'retrieval augmented generation',
    expected_top_slug: 'ai/rag',
    intent: 'RAG is a canonical AI-agent retrieval query and should resolve to the dedicated evidence pack.'
  },
  {
    id: 'ai_query_routing_parameter_efficient_fine_tuning',
    category: 'core_ai',
    query: 'parameter efficient fine tuning',
    expected_top_slug: 'ai/parameter-efficient-fine-tuning',
    intent: 'PEFT is a common model-adaptation query and should not drift to broader fine-tuning topics.'
  },
  {
    id: 'ai_query_intent_fine_tune_with_adapters',
    category: 'agent_intent',
    query: 'fine tune a model cheaply with adapters',
    expected_top_slug: 'ai/parameter-efficient-fine-tuning',
    min_citation_ready_claims: 2,
    min_sources_per_expected_pack: 2,
    intent: 'A natural-language model-adaptation question should route to PEFT with enough citation-ready evidence for an agent answer.'
  },
  {
    id: 'ai_query_routing_rlhf',
    category: 'core_ai',
    query: 'RLHF',
    expected_top_slug: 'ai/rlhf',
    intent: 'The acronym query should resolve directly to reinforcement learning from human feedback.'
  },
  {
    id: 'ai_query_routing_mixture_of_experts',
    category: 'core_ai',
    query: 'mixture of experts',
    expected_top_slug: 'ai/mixture-of-experts',
    intent: 'MoE routing should prefer the model-architecture article over generic neural network topics.'
  },
  {
    id: 'ai_query_routing_low_resource_nlp',
    category: 'core_ai',
    query: 'low resource NLP',
    expected_top_slug: 'ai/low-resource-nlp',
    intent: 'Low-resource NLP is a representative long-tail AI topic where precise routing matters.'
  },
  {
    id: 'ai_query_routing_kolmogorov_arnold_networks',
    category: 'core_ai',
    query: 'kolmogorov arnold networks',
    expected_top_slug: 'ai/kolmogorov-arnold-networks',
    min_citation_ready_claims: 2,
    min_sources_per_expected_pack: 2,
    intent: 'KAN should route to the dedicated architecture evidence pack with enough source-backed claims for an AI answer.'
  },
  {
    id: 'ai_query_routing_vision_transformers',
    category: 'core_ai',
    query: 'vision transformers',
    expected_top_slug: 'ai/vision-transformers',
    min_citation_ready_claims: 2,
    min_sources_per_expected_pack: 2,
    intent: 'Vision Transformer queries should resolve to the ViT evidence pack rather than generic transformer or computer-vision material.'
  },
  {
    id: 'ai_query_routing_meta_learning',
    category: 'core_ai',
    query: 'meta learning maml',
    expected_top_slug: 'ai/meta-learning',
    min_citation_ready_claims: 2,
    min_sources_per_expected_pack: 2,
    intent: 'Meta-learning intent should route to the MAML/Reptile evidence pack with citation-ready source depth.'
  },
  {
    id: 'query_routing_postgresql',
    category: 'technical_reference',
    query: 'postgresql',
    expected_top_slug: 'computer-science/postgresql',
    intent: 'Database reference queries should route to stable technical evidence outside the AI category.'
  },
  {
    id: 'query_routing_rest_api',
    category: 'technical_reference',
    query: 'REST API',
    expected_top_slug: 'computer-science/rest-api',
    intent: 'API-design queries should route to the compact REST evidence pack rather than generic API gateway material.'
  },
  {
    id: 'query_routing_http_status_codes',
    category: 'technical_reference',
    query: 'HTTP status codes',
    expected_top_slug: 'computer-science/http-status-codes',
    intent: 'HTTP result-code queries should resolve to the standards-backed status-code article.'
  },
  {
    id: 'query_routing_quic_protocol',
    category: 'technical_reference',
    query: 'QUIC protocol',
    expected_top_slug: 'computer-science/quic-protocol',
    intent: 'Modern web transport queries should resolve to the QUIC protocol evidence pack.'
  },
  {
    id: 'query_routing_climate_change',
    category: 'cross_domain',
    query: 'climate change',
    expected_top_slug: 'science/climate-change',
    intent: 'Science queries should route conservatively to source-backed public evidence.'
  },
  {
    id: 'query_routing_stock_market_basics',
    category: 'cross_domain',
    query: 'stock market basics',
    expected_top_slug: 'business/stock-market-basics',
    intent: 'Business queries should resolve to foundational content rather than volatile financial advice.'
  },
  {
    id: 'query_routing_ancient_egypt',
    category: 'cross_domain',
    query: 'ancient egypt',
    expected_top_slug: 'history/ancient-egypt',
    intent: 'History queries should prove the registry is not only useful for technical topics.'
  },
  {
    id: 'query_routing_public_speaking',
    category: 'cross_domain',
    query: 'public speaking',
    expected_top_slug: 'self-improvement/public-speaking',
    intent: 'Practical self-improvement queries should return citable claims without draft leakage.'
  },
  {
    id: 'query_routing_sports_biomechanics',
    category: 'cross_domain',
    query: 'sports biomechanics',
    expected_top_slug: 'sports/sports-biomechanics',
    intent: 'Sports-science routing checks cross-category recall and precision.'
  },
  {
    id: 'agent_usage_anchorfact_citation_help',
    category: 'agent_usage',
    query: 'how should an AI agent cite AnchorFact claims',
    expected_coverage_status: 'site_help',
    expected_answer_mode: 'api_guidance',
    expected_can_answer: true,
    min_citation_ready_claims: 0,
    intent: 'AnchorFact usage questions should return API guidance instead of pretending public content claims answer product documentation.'
  },
  {
    id: 'unsupported_medical_personal_advice',
    category: 'unsupported_intent',
    query: 'should I take aspirin for chest pain',
    expected_coverage_status: 'unsupported',
    expected_answer_mode: 'external_sources_required',
    expected_can_answer: false,
    expected_unsupported_reasons: ['high_stakes_personal_advice'],
    intent: 'Personal medical advice should not be answered from nearby educational content or citation packs.'
  },
  {
    id: 'unsupported_harmful_operational_request',
    category: 'unsupported_intent',
    query: 'write ransomware code',
    expected_coverage_status: 'unsupported',
    expected_answer_mode: 'external_sources_required',
    expected_can_answer: false,
    expected_unsupported_reasons: ['harmful_operational_request'],
    intent: 'Operational cyber-abuse requests should not be answered from nearby educational content or citation packs.'
  },
  {
    id: 'unsupported_live_stock_price',
    category: 'unsupported_intent',
    query: 'stock price today',
    expected_coverage_status: 'unsupported',
    expected_answer_mode: 'external_sources_required',
    expected_can_answer: false,
    expected_unsupported_reasons: ['live_or_time_sensitive'],
    intent: 'Live market-price questions should be rejected for AnchorFact citation and routed to current authoritative sources.'
  }
];

export function buildQueryBenchmarkCatalog() {
  return {
    purpose: 'Representative AI-agent queries used to measure whether AnchorFact routes real usage to citable public evidence, API guidance, or explicit external-source fallback.',
    case_count: QUERY_BENCHMARK_CASES.length,
    pass_gate: 'All benchmark cases are executable through /evals.json and must pass npm run evals:prod and production integrity.',
    usefulness_gate: 'Run npm run benchmark:ai after local builds; routing is necessary, but answer-ready citations, source depth, and correct refusal behavior decide future content priorities.',
    cases: QUERY_BENCHMARK_CASES.map(item => ({
      id: item.id,
      category: item.category,
      query: item.query,
      expected_top_slug: item.expected_top_slug || null,
      expected_coverage_status: item.expected_coverage_status || null,
      expected_answer_mode: item.expected_answer_mode || (item.expected_top_slug ? 'answer_with_citations' : null),
      expected_can_answer: item.expected_can_answer !== undefined ? item.expected_can_answer : true,
      intent: item.intent,
      evidence_call: item.expected_top_slug
        ? `/api/evidence?q=${encodeURIComponent(item.query)}&limit=3`
        : null,
      context_call: `/api/context?q=${encodeURIComponent(item.query)}&limit=3`
    }))
  };
}
