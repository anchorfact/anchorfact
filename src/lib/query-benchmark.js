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
    id: 'query_routing_postgresql',
    category: 'technical_reference',
    query: 'postgresql',
    expected_top_slug: 'computer-science/postgresql',
    intent: 'Database reference queries should route to stable technical evidence outside the AI category.'
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
  }
];

export function buildQueryBenchmarkCatalog() {
  return {
    purpose: 'Representative AI-agent queries used to measure whether AnchorFact routes real usage to citable public evidence.',
    case_count: QUERY_BENCHMARK_CASES.length,
    pass_gate: 'All benchmark cases are executable through /evals.json and must pass npm run evals:prod and production integrity.',
    usefulness_gate: 'Run npm run benchmark:ai after local builds; routing is necessary, but answer-ready citations and source depth decide future content priorities.',
    cases: QUERY_BENCHMARK_CASES.map(item => ({
      id: item.id,
      category: item.category,
      query: item.query,
      expected_top_slug: item.expected_top_slug,
      intent: item.intent,
      evidence_call: `/api/evidence?q=${encodeURIComponent(item.query)}&limit=3`
    }))
  };
}
