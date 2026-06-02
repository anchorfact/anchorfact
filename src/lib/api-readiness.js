import { buildCiteApiPayload } from './cite-api.js';
import { buildContextApiPayload } from './context-api.js';
import { buildEvidenceApiPayload } from './evidence-api.js';

export const API_READINESS_SCHEMA_VERSION = 'anchorfact.api-readiness.v1';
export const API_READINESS_TARGET_RATIO = 0.9;

export const CORE_CORPUS_QUERIES = [
  ['agent_execution_sources', 'ai/agent-execution-knowledge-sources', 'Agent Execution Knowledge Sources: What AI Agents Need to Look Up'],

  ['agent_rag', 'ai/advanced-rag-techniques', 'Advanced RAG: From Naive Retrieval to Agentic RAG'],
  ['agent_rag', 'ai/rag', 'Retrieval-Augmented Generation (RAG)'],
  ['agent_rag', 'ai/rag-evaluation', 'RAG Evaluation'],
  ['agent_rag', 'ai/hybrid-retrieval-and-reranking', 'Hybrid Retrieval and Reranking'],
  ['agent_rag', 'ai/rag-chunking-and-context-window-management', 'RAG Chunking and Context Window Management'],
  ['agent_rag', 'ai/retrieval-query-rewriting', 'Retrieval Query Rewriting'],
  ['agent_rag', 'ai/embedding-model-selection-and-vector-distance', 'Embedding Model Selection and Vector Distance'],
  ['agent_rag', 'ai/graphrag', 'GraphRAG'],
  ['agent_rag', 'ai/vector-databases', 'Vector Databases: Approximate Nearest Neighbor Search, Embedding Storage, and Retrieval at Scale'],
  ['agent_rag', 'ai/multimodal-search', 'Multimodal Search: Cross-Modal Retrieval, Product Search, and Multimodal Embeddings'],
  ['agent_rag', 'ai/semantic-web-ontology', 'Semantic Web and Ontologies: Knowledge Representation, OWL Reasoning, and Linked Data'],
  ['agent_rag', 'ai/graph-neural-networks', 'Graph Neural Networks: Message Passing and Applications'],
  ['agent_rag', 'ai/information-extraction', 'Information Extraction: NER, Relation Extraction, and LLM-Powered IE'],
  ['agent_rag', 'ai/knowledge-distillation', 'Knowledge Distillation'],
  ['agent_rag', 'ai/neurosymbolic-ai', 'Neuro-Symbolic AI: Bridging Learning and Reasoning'],

  ['api_mcp', 'ai/mcp', 'Model Context Protocol (MCP)'],
  ['api_mcp', 'ai/ai-tool-use-and-function-calling', 'AI Tool Use and Function Calling'],
  ['api_mcp', 'ai/agent-memory-and-session-state', 'Agent Memory and Session State'],
  ['api_mcp', 'ai/agent-observability-and-tracing', 'Agent Observability and Tracing'],
  ['api_mcp', 'ai/agent-planning-and-task-decomposition', 'Agent Planning and Task Decomposition'],
  ['api_mcp', 'ai/agent-tool-schema-validation', 'Agent Tool Schema Validation'],
  ['api_mcp', 'ai/agent-tool-authorization-and-permissions', 'Agent Tool Authorization and Permissions'],
  ['api_mcp', 'computer-science/openapi-for-agent-tools', 'OpenAPI for Agent Tools'],
  ['api_mcp', 'ai/ai-agents', 'AI Agents: Tool-Using Model Systems'],
  ['api_mcp', 'ai/agentic-ai', 'Agentic AI: Autonomous Agent Architectures, Planning, and Tool-Integrated Reasoning'],
  ['api_mcp', 'ai/ai-agent-frameworks', 'AI Agent Frameworks: LangChain, AutoGen, and CrewAI'],
  ['api_mcp', 'ai/ai-personal-assistants', 'AI Personal Assistants: Tool Use, Memory Boundaries, and Safe Task Automation'],
  ['api_mcp', 'ai/ai-customer-service', 'AI for Customer Service: Conversational Agents, Retrieval Grounding, and Agent Assist'],
  ['api_mcp', 'ai/ai-team-collaboration', 'AI for Team Collaboration: Meeting Recaps, Shared Context, and Knowledge Workflows'],
  ['api_mcp', 'ai/ai-remote-work', 'AI for Remote Work: Meeting Recaps, Workspace Search, and Async Coordination'],
  ['api_mcp', 'ai/ai-coding-assistants', 'AI Coding Assistants: Copilot, SWE-bench, and Agentic Tools'],
  ['api_mcp', 'ai/ai-static-analysis', 'AI for Static Analysis: Automated Bug Detection, Code Review, and Vulnerability Scanning'],

  ['security_governance', 'ai/ai-red-teaming-and-safety', 'AI Red Teaming: Security Testing for Language Models'],
  ['security_governance', 'ai/ai-governance-and-policy', 'AI Governance: Risk Frameworks, Audits, and International Cooperation'],
  ['security_governance', 'ai/ai-in-cybersecurity', 'AI in Cybersecurity: Threat Detection and LLM-Powered Defense'],
  ['security_governance', 'ai/ai-for-network-security', 'AI for Network Security: Intelligent Firewalls, DDoS Mitigation, and Zero-Trust Architectures'],
  ['security_governance', 'ai/adversarial-machine-learning', 'Adversarial Machine Learning'],
  ['security_governance', 'ai/ai-content-moderation-platforms', 'AI Content Moderation Platforms: Large-Scale Safety Systems, Policy Engines, and Multilingual Review'],
  ['security_governance', 'ai/ai-content-authenticity', 'AI Content Authenticity: Watermarking and Detection'],
  ['security_governance', 'ai/ai-identity-verification', 'AI Identity Verification: Document Authentication, Liveness Detection, and KYC Compliance'],
  ['security_governance', 'ai/ai-smart-contract-audit', 'AI Smart Contract Auditing: Vulnerability Detection, Formal Verification, and Blockchain Security'],
  ['security_governance', 'ai/ai-for-fraud-detection', 'AI for Fraud Detection: Graph Neural Networks, Anti-Money Laundering, and Financial Crime'],

  ['data_infrastructure', 'ai/data-centric-ai', 'Data-Centric AI: The Systematic Engineering of Training Data'],
  ['data_infrastructure', 'ai/data-governance', 'AI Data Governance: Metadata Management, Data Catalogs, and AI-Ready Data Quality'],
  ['data_infrastructure', 'computer-science/data-catalogs-and-metadata-lineage', 'Data Catalogs and Metadata Lineage'],
  ['data_infrastructure', 'computer-science/lakehouse-table-formats', 'Lakehouse Table Formats'],
  ['data_infrastructure', 'computer-science/schema-evolution-for-data-pipelines', 'Schema Evolution for Data Pipelines'],
  ['data_infrastructure', 'ai/data-preprocessing', 'Data Preprocessing'],
  ['data_infrastructure', 'ai/ai-for-data-curation', 'AI for Data Curation: Web-Scale Filtering, Deduplication, and Quality Scoring for LLM Training'],
  ['data_infrastructure', 'ai/ai-training-data-curation', 'AI Training Data Curation: Quality at Scale'],
  ['data_infrastructure', 'ai/synthetic-data-training', 'Synthetic Data in AI Training'],
  ['data_infrastructure', 'ai/ai-for-tabular-data', 'AI for Tabular Data: Synthetic Generation, Diffusion Models, and Privacy-Preserving Structured Data'],
  ['data_infrastructure', 'ai/learned-database-systems', 'Learned Database Systems: AI-Driven Query Optimization, Learned Indexes, and Cardinality Estimation'],
  ['data_infrastructure', 'ai/text-to-sql', 'Text-to-SQL: Natural Language Database Querying with Large Language Models'],
  ['data_infrastructure', 'ai/federated-learning', 'Federated Learning'],

  ['llm_evaluation', 'ai/ai-benchmarks-and-evaluation', 'AI Benchmarks: MMLU, SWE-bench, and How We Measure Intelligence'],
  ['llm_evaluation', 'ai/llm-as-judge-evaluation', 'LLM-as-Judge Evaluation'],
  ['llm_evaluation', 'ai/agent-benchmarks', 'Agent Benchmarks'],
  ['llm_evaluation', 'ai/evaluation-datasets-and-golden-tests-for-llms', 'Evaluation Datasets and Golden Tests for LLMs'],
  ['llm_evaluation', 'ai/evaluation-rubrics-and-grader-design', 'Evaluation Rubrics and Grader Design'],
  ['llm_evaluation', 'ai/model-evaluation-metrics', 'Model Evaluation Metrics'],
  ['llm_evaluation', 'ai/long-context-models', 'Long-Context Language Models: Memory, Retrieval, and Evaluation'],
  ['llm_evaluation', 'ai/reasoning-models', 'AI Reasoning Models: Test-Time Compute and RL Training'],
  ['llm_evaluation', 'ai/test-time-compute-scaling', 'Test-Time Compute Scaling: Spending More Inference on Harder Reasoning'],
  ['llm_evaluation', 'ai/program-synthesis-verification', 'Program Synthesis and Formal Verification: Neural Theorem Proving with LLMs'],
  ['llm_evaluation', 'ai/causal-inference-ai', 'Causal AI: From Correlation to Causation with do-Calculus'],
  ['llm_evaluation', 'ai/few-shot-learning', 'Few-Shot Learning: Prototypical Networks, MAML, and In-Context Adaptation'],
  ['llm_evaluation', 'ai/cognitive-architectures', 'Cognitive Architectures: ACT-R, Soar, and Computational Models of Human-Like Reasoning'],
  ['llm_evaluation', 'ai/language-modeling-theory', 'Language Modeling Theory: Prediction, Perplexity, and Scaling Laws'],

  ['llm_platform', 'ai/llms', 'Large Language Models (LLMs)'],
  ['llm_platform', 'ai/gpt-models', 'GPT (Generative Pre-trained Transformer) Model Family'],
  ['llm_platform', 'ai/large-language-model-training-scaling-laws-data-curation-and-compute', 'Large Language Model Training: Scaling Laws, Data Curation, and Compute'],
  ['llm_platform', 'ai/llm-inference-optimization', 'LLM Inference Optimization: From FlashAttention to Speculative Decoding'],
  ['llm_platform', 'ai/mlops-llmops', 'MLOps and LLMOps: Production AI Engineering, Observability, and Platform Architecture'],
  ['llm_platform', 'ai/transformer', 'Transformer Architecture: Attention, Parallel Sequence Modeling, and LLM Foundations'],
  ['llm_platform', 'ai/transformer-architecture-variants', 'Transformer Variants: From Encoder-Decoder to State Space Models'],
  ['llm_platform', 'ai/attention-mechanisms-deep-dive', 'Attention Mechanisms: Scaled Dot-Product to FlashAttention'],
  ['llm_platform', 'ai/tokenization-in-nlp', 'Tokenization in NLP'],
  ['llm_platform', 'ai/prompt-engineering', 'Prompt Engineering and Chain-of-Thought Prompting'],

  ['llm_training', 'ai/post-training-alignment', 'Post-Training Alignment: RLHF, DPO, and Constitutional AI'],
  ['llm_training', 'ai/rlhf', 'Reinforcement Learning from Human Feedback (RLHF)'],
  ['llm_training', 'ai/parameter-efficient-fine-tuning', 'Parameter-Efficient Fine-Tuning for Language Models (PEFT)'],
  ['llm_training', 'ai/lora', 'LoRA (Low-Rank Adaptation)'],
  ['llm_training', 'ai/lora-low-rank-adaptation-of-large-language-models', 'LoRA: Low-Rank Adaptation of Large Language Models'],
  ['llm_training', 'ai/model-compression', 'Model Compression: Pruning, Quantization, and Distillation'],
  ['llm_training', 'ai/distributed-training-systems', 'Distributed Training: FSDP, DeepSpeed, and Scaling Laws'],
  ['llm_training', 'ai/activation-functions', 'Activation Functions in Neural Networks'],
  ['llm_training', 'ai/loss-functions', 'Loss Functions in Machine Learning'],
  ['llm_training', 'ai/backpropagation', 'Backpropagation: The Engine of Neural Network Learning'],

  ['developer_workflows', 'ai/ai-for-software-testing', 'AI for Software Testing: Automated Test Generation, Fuzzing, and Quality Assurance'],
  ['developer_workflows', 'ai/ai-code-translation', 'AI for Code Translation: Language Migration, Legacy Modernization, and Transpilation'],
  ['developer_workflows', 'ai/ai-document-understanding', 'AI Document Understanding: Layout Parsing, Structured Extraction, and Intelligent Document Processing'],
  ['developer_workflows', 'ai/ai-document-digitization', 'AI for Document Digitization: Historical Archives, Handwriting Recognition, and Mass Digitization'],
  ['developer_workflows', 'ai/ai-for-hyperautomation', 'AI for Hyperautomation: RPA, Process Mining, and Workflow Automation'],
  ['developer_workflows', 'ai/ai-for-legal', 'AI for Legal: Contract Analysis, Legal Reasoning, and Regulatory Compliance'],
  ['developer_workflows', 'ai/ai-ip-patents', 'AI for Intellectual Property: Patent Search, Prior Art Analysis, and Trademark Intelligence'],
  ['developer_workflows', 'ai/ai-call-center', 'AI for Call Centers: Speech Analytics, Agent Assist, and Quality Review'],
  ['developer_workflows', 'ai/ai-employee-experience', 'AI for Employee Experience: HRM Workflows, Learning Support, and Governance'],
  ['developer_workflows', 'ai/ai-for-iot', 'AI for the Internet of Things: Federated Learning, TinyML, and Intelligent Edge Devices'],
  ['developer_workflows', 'computer-science/api-pagination-and-rate-limits', 'API Pagination and Rate Limits'],

  ['code_intelligence', 'computer-science/code-graphs-and-code-intelligence', 'Code Graphs and Code Intelligence'],
  ['code_intelligence', 'computer-science/program-symbols-definitions-and-references', 'Program Symbols, Definitions, and References'],
  ['code_intelligence', 'computer-science/abstract-syntax-trees-and-code-navigation', 'Abstract Syntax Trees and Code Navigation'],
  ['code_intelligence', 'computer-science/control-flow-and-data-flow-analysis', 'Control-Flow and Data-Flow Analysis'],
  ['code_intelligence', 'computer-science/call-graphs-and-impact-analysis', 'Call Graphs and Impact Analysis'],
  ['code_intelligence', 'computer-science/language-server-protocol-for-code-agents', 'Language Server Protocol for Code Agents'],
  ['code_intelligence', 'computer-science/software-bill-of-materials-and-dependency-graphs', 'Software Bill of Materials and Dependency Graphs'],

  ['retrieval_search', 'ai/ai-search-engines', 'AI-Powered Search: Perplexity, Google AI Overviews, and the Future'],
  ['retrieval_search', 'ai/ai-search-recommendation', 'AI for Search and Recommendation: Semantic Search, Collaborative Filtering, and Personalization Engines'],
  ['retrieval_search', 'ai/recommender-systems', 'Recommender Systems: Graph Neural Collaborative Filtering and LLM-Based Recommendation'],
  ['retrieval_search', 'ai/text-classification', 'Text Classification: Zero-Shot, Few-Shot, and LLM-Based Document Categorization'],
  ['retrieval_search', 'ai/text-summarization', 'Text Summarization: From Extractive Methods to Abstractive LLM-Based Summarization'],
  ['retrieval_search', 'ai/nlp-advanced-techniques', 'Advanced NLP: Tokenization, Embeddings, and Decoding'],
  ['retrieval_search', 'ai/bert', 'BERT (Bidirectional Encoder Representations from Transformers)'],
  ['retrieval_search', 'ai/machine-translation', 'Machine Translation: Neural MT, LLM-Based Translation, and Multilingual Quality at Scale'],
  ['retrieval_search', 'ai/ai-language-translation-interpretation', 'AI Language Translation and Interpretation: LLM-Based Translation, Simultaneous Interpretation, and Quality Estimation'],
  ['retrieval_search', 'ai/clip-contrastive-language-image-pre-training', 'CLIP: Contrastive Language-Image Pre-Training'],

  ['foundation_models', 'ai/multimodal-ai-vision-language-models-from-clip-to-gpt-4v', 'Multimodal AI: Vision-Language Models from CLIP to GPT-4V'],
  ['foundation_models', 'ai/ai-content-creation', 'AI for Content Creation: Generative Writing, Image Synthesis, and Video Workflows'],
  ['foundation_models', 'ai/ai-for-visualization', 'AI for Data Visualization'],
  ['foundation_models', 'ai/vision-transformers', 'Vision Transformers: ViT, Swin, and DINOv2'],
  ['foundation_models', 'ai/video-understanding', 'Video Understanding: Action Recognition, Temporal Action Detection, and Video-Language Models'],
  ['foundation_models', 'ai/visual-question-answering', 'Visual Question Answering: Vision-Language Models for Image Understanding and Reasoning'],
  ['foundation_models', 'ai/world-models-video-prediction', 'World Models: Video Prediction, Physical Reasoning, and Interactive AI'],
  ['foundation_models', 'ai/ai-for-science', 'AI for Science: AlphaFold and AI-Driven Discovery'],
  ['foundation_models', 'ai/ai-for-weather-forecasting', 'AI for Weather Forecasting: Data-Driven Numerical Weather Prediction and Nowcasting'],
  ['foundation_models', 'ai/ai-hardware-accelerators', 'AI Hardware: NVIDIA H100/B200, TPUs, and Cerebras']
].map(([category, expected_slug, query], index) => ({
  id: `core_${String(index + 1).padStart(3, '0')}`,
  category,
  expected_slug,
  query
}));

export const UNSUPPORTED_FALLBACK_QUERY = 'What is the live stock price of OpenAI today?';

const BLOCKED_QUALITY_REASONS = new Set([
  'generic_source_homepage',
  'placeholder_content',
  'broken_atomic_fact',
  'claim_evidence_weak',
  'missing_source_url',
  'missing_atomic_facts'
]);

const HIGH_RISK_UNSUPPORTED_CLAIM_PATTERN = /\b(?:price|pricing|market share|revenue|latest|today|currently|as of|announced|released)\b/i;

function ratio(part, total, digits = 4) {
  if (!total) return 0;
  return Number((Number(part || 0) / Number(total || 0)).toFixed(digits));
}

function articleBySlug(manifest, slug) {
  return (manifest?.articles || []).find(article => article?.canonical_slug === slug) || null;
}

function claimsForSlug(claimsPayload, slug) {
  return (claimsPayload?.claims || []).filter(claim => claim?.canonical_slug === slug);
}

function sourcesForSlug(sourcesPayload, slug) {
  return (sourcesPayload?.sources || []).filter(source =>
    (source?.articles || []).some(article => article?.canonical_slug === slug)
  );
}

function queryDefinitions(querySet = CORE_CORPUS_QUERIES) {
  return querySet.map((item, index) => ({
    id: item.id || `query_${String(index + 1).padStart(3, '0')}`,
    category: item.category || 'custom',
    expected_slug: item.expected_slug || item.slug || null,
    query: item.query || item.title || String(item.expected_slug || item.slug || '')
  }));
}

function hasExpectedSlug(payload, expectedSlug) {
  if (!expectedSlug) return true;
  const matchedSlugs = [
    ...(payload?.matched_articles || []).map(article => article?.canonical_slug),
    ...(payload?.evidence_packs || []).map(pack => pack?.canonical_slug),
    ...(payload?.packs || []).map(pack => pack?.canonical_slug)
  ].filter(Boolean);
  return matchedSlugs.includes(expectedSlug);
}

function firstSourceMappedCitationFromEvidence(payload) {
  for (const pack of payload?.packs || []) {
    for (const citation of pack?.citation_exports || []) {
      if (citation?.claim_id && citation?.source_url) return citation;
    }
  }
  return null;
}

function firstSourceMappedCitationFromContext(payload) {
  return (payload?.citation_ready_claims || []).find(citation =>
    citation?.claim_id && citation?.source_url
  ) || null;
}

function summarizeRows(rows) {
  const passed = rows.filter(row => row.ok).length;
  return {
    count: rows.length,
    passed,
    failed: rows.length - passed,
    pass_ratio: ratio(passed, rows.length)
  };
}

export function evaluateCoreCorpus({
  manifest,
  claimsPayload,
  sourcesPayload = null,
  querySet = CORE_CORPUS_QUERIES
} = {}) {
  const rows = queryDefinitions(querySet).map(query => {
    const article = articleBySlug(manifest, query.expected_slug);
    const claims = claimsForSlug(claimsPayload, query.expected_slug);
    const mappedSources = sourcesForSlug(sourcesPayload, query.expected_slug);
    const qualityReasons = article?.quality_reasons || [];
    const blockedReasons = qualityReasons.filter(reason => BLOCKED_QUALITY_REASONS.has(reason));
    const unsupportedClaimFlags = claims.filter(claim =>
      HIGH_RISK_UNSUPPORTED_CLAIM_PATTERN.test(claim?.statement || '')
      && !claim?.source_url
    );
    const verifiedSources = Number(article?.sources_verified ?? mappedSources.length ?? 0);
    const failures = [
      !article ? 'missing_public_article' : null,
      article && article.status !== 'public' ? `status_${article.status || 'unknown'}` : null,
      article && article.is_draft === true ? 'is_draft' : null,
      verifiedSources < 2 ? `verified_sources_${verifiedSources}_below_2` : null,
      claims.length < 3 ? `source_mapped_claims_${claims.length}_below_3` : null,
      blockedReasons.length > 0 ? `blocked_quality_reasons:${blockedReasons.join(',')}` : null,
      unsupportedClaimFlags.length > 0 ? `unsupported_current_or_pricing_claims:${unsupportedClaimFlags.length}` : null
    ].filter(Boolean);

    return {
      id: query.id,
      category: query.category,
      query: query.query,
      expected_slug: query.expected_slug,
      title: article?.title || null,
      ok: failures.length === 0,
      status: article?.status || 'missing',
      verified_sources: verifiedSources,
      source_mapped_claims: claims.length,
      mapped_sources: mappedSources.length,
      failures
    };
  });

  const summary = summarizeRows(rows);
  return {
    ...summary,
    target_ratio: API_READINESS_TARGET_RATIO,
    status: summary.pass_ratio >= API_READINESS_TARGET_RATIO ? 'met' : 'below_target',
    rows,
    failures: rows.filter(row => !row.ok)
  };
}

export function evaluateReadinessQuery({ query, artifacts, generated }) {
  const failures = [];
  const contextResult = buildContextApiPayload({
    query: query.query,
    limit: 3,
    generated,
    ...artifacts
  });
  const contextPayload = contextResult.payload || {};
  const contextCitation = firstSourceMappedCitationFromContext(contextPayload);

  if (!contextResult.ok || contextResult.status !== 200) failures.push('context_non_200');
  if (contextPayload.answer_policy?.can_answer_with_anchorfact !== true) failures.push('context_cannot_answer');
  if (!contextCitation) failures.push('context_missing_source_mapped_citation');
  if (!hasExpectedSlug(contextPayload, query.expected_slug)) failures.push('context_expected_slug_not_matched');

  const evidenceResult = buildEvidenceApiPayload({
    query: query.query,
    limit: 3,
    generated,
    manifest: artifacts.manifest,
    claimsPayload: artifacts.claimsPayload,
    sourcesPayload: artifacts.sourcesPayload,
    searchIndex: artifacts.searchIndex,
    rankedResults: contextPayload.matched_articles || null
  });
  const evidencePayload = evidenceResult.payload || {};
  const evidenceCitation = firstSourceMappedCitationFromEvidence(evidencePayload);
  if (!evidenceResult.ok || evidenceResult.status !== 200) failures.push('evidence_non_200');
  if (!Array.isArray(evidencePayload.packs) || evidencePayload.packs.length === 0) failures.push('evidence_no_packs');
  if (!evidenceCitation) failures.push('evidence_missing_source_mapped_citation');
  if (!hasExpectedSlug(evidencePayload, query.expected_slug)) failures.push('evidence_expected_slug_not_matched');

  const claimId = contextCitation?.claim_id || evidenceCitation?.claim_id || null;
  const citeResult = claimId
    ? buildCiteApiPayload({
        claimId,
        generated,
        manifest: artifacts.manifest,
        claimsPayload: artifacts.claimsPayload,
        sourcesPayload: artifacts.sourcesPayload
      })
    : null;
  const citePayload = citeResult?.payload || {};
  const citeSourceUrl = citePayload.citation_export?.source_url || citePayload.source?.url || null;
  if (!claimId) failures.push('cite_no_claim_id_from_context_or_evidence');
  if (claimId && (!citeResult?.ok || citeResult.status !== 200)) failures.push('cite_non_200');
  if (claimId && !citeSourceUrl) failures.push('cite_missing_source_url');

  return {
    id: query.id,
    category: query.category,
    query: query.query,
    expected_slug: query.expected_slug,
    ok: failures.length === 0,
    context: {
      status: contextResult.status,
      coverage_status: contextPayload.coverage_status || null,
      can_answer_with_anchorfact: contextPayload.answer_policy?.can_answer_with_anchorfact ?? null,
      citation_ready_claims: Array.isArray(contextPayload.citation_ready_claims)
        ? contextPayload.citation_ready_claims.length
        : 0,
      top_slug: contextPayload.matched_articles?.[0]?.canonical_slug || contextPayload.evidence_packs?.[0]?.canonical_slug || null
    },
    evidence: {
      status: evidenceResult.status,
      packs: Array.isArray(evidencePayload.packs) ? evidencePayload.packs.length : 0,
      has_source_mapped_citation: Boolean(evidenceCitation),
      top_slug: evidencePayload.packs?.[0]?.canonical_slug || null
    },
    cite: {
      status: citeResult?.status || null,
      claim_id: claimId,
      has_source_url: Boolean(citeSourceUrl)
    },
    failures
  };
}

export function evaluateUnsupportedFallback({
  artifacts,
  query = UNSUPPORTED_FALLBACK_QUERY,
  generated = new Date().toISOString()
} = {}) {
  const result = buildContextApiPayload({
    query,
    limit: 3,
    generated,
    ...artifacts
  });
  const payload = result.payload || {};
  const canAnswer = payload.answer_policy?.can_answer_with_anchorfact === true;
  const mode = payload.answer_policy?.answer_mode || null;
  const ok = result.status === 200
    && canAnswer === false
    && mode === 'external_sources_required';
  return {
    query,
    ok,
    status: result.status,
    coverage_status: payload.coverage_status || null,
    answer_mode: mode,
    can_answer_with_anchorfact: canAnswer,
    failures: ok ? [] : ['unsupported_query_did_not_require_external_sources']
  };
}

export function evaluateContextReadiness({
  artifacts,
  querySet = CORE_CORPUS_QUERIES,
  generated = new Date().toISOString(),
  targetRatio = API_READINESS_TARGET_RATIO
} = {}) {
  const rows = queryDefinitions(querySet).map(query => evaluateReadinessQuery({
    query,
    artifacts,
    generated
  }));
  const summary = summarizeRows(rows);
  const fallback = evaluateUnsupportedFallback({ artifacts, generated });
  return {
    ...summary,
    target_ratio: targetRatio,
    status: summary.pass_ratio >= targetRatio && fallback.ok ? 'met' : 'below_target',
    rows,
    fallback,
    failures: rows.filter(row => !row.ok)
  };
}

export function buildApiReadinessReport({
  artifacts,
  querySet = CORE_CORPUS_QUERIES,
  generatedAt = new Date().toISOString(),
  apiPerformanceReport = null,
  adoptionScorecard = null,
  productionIntegrity = null,
  targetRatio = API_READINESS_TARGET_RATIO
} = {}) {
  const coreCorpus = evaluateCoreCorpus({
    manifest: artifacts?.manifest,
    claimsPayload: artifacts?.claimsPayload,
    sourcesPayload: artifacts?.sourcesPayload,
    querySet
  });
  const contextScorecard = evaluateContextReadiness({
    artifacts,
    querySet,
    generated: generatedAt,
    targetRatio
  });
  const localReady = coreCorpus.pass_ratio >= targetRatio
    && contextScorecard.pass_ratio >= targetRatio
    && contextScorecard.fallback.ok === true;
  const performanceOk = apiPerformanceReport ? apiPerformanceReport.ok === true : null;
  const artifactBudgetOk = apiPerformanceReport?.artifact_size_budget
    ? apiPerformanceReport.artifact_size_budget.ok === true
    : null;

  return {
    schema_version: API_READINESS_SCHEMA_VERSION,
    generated: generatedAt,
    report_only: true,
    build_should_fail: false,
    target_ratio: targetRatio,
    status: localReady
      ? 'foundation_ready_pending_14_day_and_partner_signals'
      : 'building_foundation',
    subscription_ready: false,
    readiness_gates: [
      {
        id: 'production_integrity_14_day',
        target: '14 consecutive days production:integrity passing and AI eval 100%',
        status: productionIntegrity?.status || 'not_measured_in_this_report'
      },
      {
        id: 'public_audit_14_day',
        target: '14 consecutive days with 0 move_to_draft / repair_sources public audit findings',
        status: 'not_measured_in_this_report'
      },
      {
        id: 'core_query_context_ratio',
        target: `>=${targetRatio} /api/context citation-ready coverage`,
        status: contextScorecard.pass_ratio >= targetRatio ? 'met' : 'below_target',
        current_ratio: contextScorecard.pass_ratio
      },
      {
        id: 'ai_primary_discovery_ratio_7_day',
        target: '>=0.2 AI primary/discovery ratio for 7 consecutive days',
        status: adoptionScorecard?.identified_ai_primary_to_discovery_target_status || 'not_measured_in_this_report',
        current_ratio: adoptionScorecard?.identified_ai_primary_to_discovery_current_ratio ?? null
      },
      {
        id: 'design_partners',
        target: '>=3 real external design partners and >=1 paid-intent signal',
        status: 'manual_validation_required'
      }
    ],
    core_corpus: coreCorpus,
    api_scorecard: contextScorecard,
    api_performance: apiPerformanceReport
      ? {
          ok: apiPerformanceReport.ok,
          case_count: apiPerformanceReport.case_count,
          passed: apiPerformanceReport.passed,
          failed: apiPerformanceReport.failed,
          artifact_size_budget_ok: artifactBudgetOk,
          failures: apiPerformanceReport.failures || []
        }
      : { status: 'not_provided' },
    production_health: productionIntegrity || { status: 'not_provided' },
    adoption_signal: adoptionScorecard || { status: 'not_provided' },
    next_actions: [
      'Repair core corpus rows whose failures mention missing_public_article, low verified_sources, or low source_mapped_claims.',
      'For API rows below target, tune article titles/keywords only after confirming source-mapped claims are correct.',
      'Keep the free API and no-key public discovery surface until all readiness gates are met for the defined windows.',
      'Start paid beta work only after design partner and paid-intent signals are real, not inferred from crawler traffic.'
    ]
  };
}

export function renderApiReadinessMarkdown(report) {
  const lines = [];
  lines.push(`# AnchorFact API Readiness Report`);
  lines.push('');
  lines.push(`Generated: ${report.generated}`);
  lines.push(`Schema: ${report.schema_version}`);
  lines.push(`Status: ${report.status}`);
  lines.push(`Report-only: ${report.report_only}`);
  lines.push(`Build should fail: ${report.build_should_fail}`);
  lines.push('');
  lines.push(`## Scorecard`);
  lines.push('');
  lines.push(`- Target ratio: ${report.target_ratio}`);
  lines.push(`- Core corpus: ${report.core_corpus.passed}/${report.core_corpus.count} (${report.core_corpus.pass_ratio})`);
  lines.push(`- API citation readiness: ${report.api_scorecard.passed}/${report.api_scorecard.count} (${report.api_scorecard.pass_ratio})`);
  lines.push(`- Unsupported fallback: ${report.api_scorecard.fallback.ok ? 'pass' : 'fail'} (${report.api_scorecard.fallback.answer_mode || 'unknown'})`);
  lines.push(`- API performance: ${report.api_performance.status || (report.api_performance.ok ? 'pass' : 'fail')}`);
  lines.push(`- Artifact budget: ${report.api_performance.artifact_size_budget_ok ?? 'not_provided'}`);
  lines.push(`- Production health: ${report.production_health.status || 'not_provided'}`);
  lines.push(`- Adoption signal: ${report.adoption_signal.status || report.adoption_signal.identified_ai_primary_to_discovery_target_status || 'not_provided'}`);
  lines.push('');
  lines.push(`## Readiness Gates`);
  lines.push('');
  for (const gate of report.readiness_gates) {
    const current = gate.current_ratio === undefined ? '' : `; current=${gate.current_ratio}`;
    lines.push(`- ${gate.id}: ${gate.status} (${gate.target}${current})`);
  }
  lines.push('');
  lines.push(`## Core Corpus Failures`);
  lines.push('');
  const coreFailures = report.core_corpus.failures.slice(0, 20);
  if (coreFailures.length === 0) {
    lines.push('- None.');
  } else {
    for (const row of coreFailures) {
      lines.push(`- ${row.expected_slug}: ${row.failures.join(', ')}`);
    }
  }
  lines.push('');
  lines.push(`## API Query Failures`);
  lines.push('');
  const apiFailures = report.api_scorecard.failures.slice(0, 20);
  if (apiFailures.length === 0) {
    lines.push('- None.');
  } else {
    for (const row of apiFailures) {
      lines.push(`- ${row.expected_slug}: ${row.failures.join(', ')} (top context=${row.context.top_slug || 'none'}, top evidence=${row.evidence.top_slug || 'none'})`);
    }
  }
  lines.push('');
  lines.push(`## Next Actions`);
  lines.push('');
  for (const action of report.next_actions) lines.push(`- ${action}`);
  lines.push('');
  return `${lines.join('\n')}\n`;
}
