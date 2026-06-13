import {
  AGENT_PROFILE_SCHEMA_VERSION,
  API_INDEX_SCHEMA_VERSION,
  API_READINESS_SCHEMA_VERSION,
  ARTIFACT_SHARDS_SCHEMA_VERSION,
  ARTIFACT_SUMMARY_SCHEMA_VERSION,
  ARTICLE_API_SCHEMA_VERSION,
  CAPABILITIES_SCHEMA_VERSION,
  CITE_API_SCHEMA_VERSION,
  CLAIM_API_SCHEMA_VERSION,
  CLAIMS_SCHEMA_VERSION,
  CONTEXT_API_SCHEMA_VERSION,
  CONTENT_HEALTH_SCHEMA_VERSION,
  COVERAGE_SCHEMA_VERSION,
  EVALS_SCHEMA_VERSION,
  EVIDENCE_API_SCHEMA_VERSION,
  EXAMPLES_SCHEMA_VERSION,
  GRAPH_SCHEMA_VERSION,
  MANIFEST_SCHEMA_VERSION,
  MCP_SCHEMA_VERSION,
  OFFICIAL_SOURCE_REPOSITORY,
  OFFICIAL_SITE,
  OPENAPI_SCHEMA_VERSION,
  PLAN_API_SCHEMA_VERSION,
  PROVENANCE_SCHEMA_VERSION,
  RESOLVE_BATCH_API_SCHEMA_VERSION,
  RESOLVE_API_SCHEMA_VERSION,
  ROOT_INDEX_SCHEMA_VERSION,
  SEARCH_API_SCHEMA_VERSION,
  SEARCH_INDEX_SCHEMA_VERSION,
  SOURCE_API_SCHEMA_VERSION,
  SOURCES_SCHEMA_VERSION,
  TOPICS_SCHEMA_VERSION,
  publicUrl
} from './build-metadata.js';

function endpoint(path, description, mediaType = 'application/json') {
  return {
    path,
    url: publicUrl(path),
    media_type: mediaType,
    description
  };
}

export function buildAgentProfile({
  generated,
  manifest,
  claimsPayload,
  searchIndexPayload,
  sourcesPayload,
  topicsPayload,
  capabilitiesPayload,
  contentHealthPayload,
  examplesPayload,
  graphPayload,
  evalsPayload,
  mcpPayload,
  apiReadinessPayload,
  publicResults,
  draftResults,
  verificationTimestamp
}) {
  return {
    schema_version: AGENT_PROFILE_SCHEMA_VERSION,
    generated,
    name: 'AnchorFact',
    official_site: OFFICIAL_SITE,
    official_source_repository: OFFICIAL_SOURCE_REPOSITORY,
    purpose: 'Machine-readable verified claims and source-grounded article records for AI citation and retrieval workflows.',
    audience: ['llm', 'agent', 'crawler', 'retrieval_system'],
    trust_contract: {
      public_entries_are_verified: true,
      draft_entries_are_excluded_from_ai_entrypoints: true,
      provenance_is_signed_when_official_key_is_available: true,
      consumers_should_cross_check_original_sources: true
    },
    current_snapshot: {
      public_articles: publicResults.length,
      draft_articles: draftResults.length,
      public_claims: claimsPayload.claim_count,
      topics: topicsPayload?.topic_count ?? null,
      capabilities: capabilitiesPayload?.capability_count ?? null,
      content_health_public_articles: contentHealthPayload?.snapshot?.public_articles ?? null,
      content_health_draft_articles: contentHealthPayload?.snapshot?.draft_articles ?? null,
      examples: examplesPayload?.example_count ?? null,
      graph_nodes: graphPayload?.node_count ?? null,
      graph_edges: graphPayload?.edge_count ?? null,
      evals: evalsPayload?.eval_count ?? null,
      mcp_tools: Array.isArray(mcpPayload?.tools) ? mcpPayload.tools.length : null,
      api_readiness_status: apiReadinessPayload?.status || null,
      api_readiness_subscription_ready: apiReadinessPayload?.subscription_ready ?? null,
      api_readiness_core_query_ratio: apiReadinessPayload?.core_corpus?.pass_ratio ?? null,
      api_readiness_context_ratio: apiReadinessPayload?.api_scorecard?.pass_ratio ?? null,
      searchable_records: searchIndexPayload?.article_count ?? null,
      unique_sources: sourcesPayload?.source_count ?? null,
      verification_report: verificationTimestamp || null,
      build_commit_sha: manifest.build?.commit_sha || null
    },
    schemas: {
      root_index: ROOT_INDEX_SCHEMA_VERSION,
      manifest: MANIFEST_SCHEMA_VERSION,
      openapi: OPENAPI_SCHEMA_VERSION,
      api_index: API_INDEX_SCHEMA_VERSION,
      api_readiness: API_READINESS_SCHEMA_VERSION,
      artifact_summary: ARTIFACT_SUMMARY_SCHEMA_VERSION,
      artifact_shards: ARTIFACT_SHARDS_SCHEMA_VERSION,
      article_api: ARTICLE_API_SCHEMA_VERSION,
      cite_api: CITE_API_SCHEMA_VERSION,
      claim_api: CLAIM_API_SCHEMA_VERSION,
      source_api: SOURCE_API_SCHEMA_VERSION,
      context_api: CONTEXT_API_SCHEMA_VERSION,
      resolve_api: RESOLVE_API_SCHEMA_VERSION,
      resolve_batch_api: RESOLVE_BATCH_API_SCHEMA_VERSION,
      evidence_api: EVIDENCE_API_SCHEMA_VERSION,
      claims: CLAIMS_SCHEMA_VERSION,
      topics: TOPICS_SCHEMA_VERSION,
      capabilities: CAPABILITIES_SCHEMA_VERSION,
      content_health: CONTENT_HEALTH_SCHEMA_VERSION,
      coverage: COVERAGE_SCHEMA_VERSION,
      examples: EXAMPLES_SCHEMA_VERSION,
      graph: GRAPH_SCHEMA_VERSION,
      evals: EVALS_SCHEMA_VERSION,
      mcp: MCP_SCHEMA_VERSION,
      plan_api: PLAN_API_SCHEMA_VERSION,
      search_api: SEARCH_API_SCHEMA_VERSION,
      search_index: SEARCH_INDEX_SCHEMA_VERSION,
      sources: SOURCES_SCHEMA_VERSION,
      provenance: PROVENANCE_SCHEMA_VERSION
    },
    quick_start: {
      purpose: 'Smallest stable decision contract for AI consumers that need answer-ready, citable AnchorFact context without reading the full endpoint catalog.',
      default_answer_path: '/api/context?q={query}',
      default_answer_mode: 'answer_with_citations',
      local_mcp_answer_tool: 'anchorfact_context',
      free_api_access_path: '/api-access/',
      citation_path: '/api/cite?id={claim_id}',
      primary_api_conversion: {
        target_ratio: 0.2,
        measured_as: 'identified AI primary API requests divided by identified AI discovery requests',
        discovery_entrypoints: ['/robots.txt', '/llms.txt', '/index.json', '/agent.json', '/api'],
        primary_entrypoints: ['/api/context', '/api/evidence', '/api/cite', '/api/resolve-batch'],
        next_call_after_discovery: '/api/context?q={query}&limit=3&format=markdown',
        guidance: 'After crawler discovery, make a query-scoped primary API call before downloading large static artifacts.'
      },
      example_calls: [
        {
          purpose: 'default_prompt_context',
          method: 'GET',
          path: '/api/context?q=gaussian%20splatting&limit=3&format=markdown',
          use_when: 'Use first for normal answer assembly when AnchorFact may cover the topic.'
        },
        {
          purpose: 'raw_evidence_pack',
          method: 'GET',
          path: '/api/evidence?q=RLHF&limit=3&format=markdown',
          use_when: 'Use when you need source-mapped claims and citation exports without the full context policy envelope.'
        },
        {
          purpose: 'coverage_check',
          method: 'GET',
          path: '/api/plan?q=quantum%20computing&limit=3',
          use_when: 'Use only when coverage is uncertain or you need fallback guidance before requesting evidence.'
        }
      ],
      trust_check: {
        path: '/provenance.json',
        signature_path: '/provenance.sig',
        require_trusted_signature: true,
        pinned_public_key_path: 'keys/provenance.pub.pem'
      },
      fallback_policy: {
        unsupported_answer_mode: 'external_sources_required',
        use_external_sources_when: [
          'answer_policy.can_answer_with_anchorfact is false',
          'answer_policy.answer_mode is external_sources_required',
          'coverage_status is unsupported',
          'the query asks for live, local, personalized, or time-sensitive facts'
        ]
      },
      steps: [
        {
          id: 'verify_provenance',
          path: '/provenance.json',
          action: 'Verify signed provenance and artifact hashes before trusting live counts, schemas, or static artifacts.'
        },
        {
          id: 'assemble_context',
          path: '/api/context?q={query}',
          action: 'Use this as the default one-call answer path for query planning, answer_policy, citation-ready claims, content health, and evidence packs.'
        },
        {
          id: 'cite_claims',
          path: '/api/cite?id={claim_id}',
          action: 'Cite individual public atomic claims returned by /api/context or /api/evidence.'
        },
        {
          id: 'fallback',
          path: null,
          action: 'When AnchorFact says it cannot answer, use current authoritative external sources and do not cite AnchorFact as supporting evidence.'
        }
      ],
      do_not_use: [
        'draft entries',
        'unverified mirrors or forks without their own trusted provenance',
        'AnchorFact citations for live prices, current events, local conditions, or personalized advice'
      ]
    },
    recommended_workflow: [
      'Fetch /provenance.json and /provenance.sig, then verify the pinned public key before trusting counts or hashes.',
      'Use /api/context?q={query} when you want answer_policy, citation_ready_claims, planning status, content health, fallback guidance, and evidence packs in one prompt-assembly payload.',
      'Use /api/evidence?q={query} for one-call public evidence packs that combine search hits, article summaries, claims, sources, and citation_exports; add format=markdown for answer-ready context.',
      'Use /api/plan?q={query} only when you are not sure whether AnchorFact has coverage, which endpoint to call next, or when to fall back to external sources.',
      'Use /api/cite?id={claim_id} to return one citation-ready public atomic claim; add format=markdown for answer-ready citation text.',
      'Use /api/resolve?ref={reference} when you have an AnchorFact claim id, article slug, source id, or source URL and need the matching public payload.',
      'Use /api/resolve-batch?ref={reference}&ref={reference} when you need to dereference several mixed AnchorFact references in one call.',
      'Fetch /api as a compact API index when you need the smallest live endpoint discovery payload.',
      'Fetch /index.json as the compact root machine directory for preferred entrypoints, trust policy, and signed static artifact discovery.',
      'After crawler discovery through /robots.txt, /llms.txt, /index.json, /agent.json, or /api, convert to /api/context?q={query}&limit=3&format=markdown or /api/evidence?q={query}&limit=3&format=markdown for a concrete user question.',
      'Fetch /api-access/ for free API usage examples, current no-key access policy, limits, and provenance verification steps.',
      'Fetch /agent.json to discover the current machine contract.',
      'Fetch /openapi.json when integrating with tools that prefer a standard endpoint contract.',
      'Fetch /artifact-summary.json before downloading large static artifacts; prefer /api/context and /api/evidence for normal agent answer paths.',
      'Fetch /artifact-shards.json before bulk reads of graph, search, claims, or llms artifacts; prefer versioned shards over repeated full downloads.',
      'Fetch /api-readiness.json to inspect readiness gates, core corpus coverage, API citation scorecards, and subscription-readiness status.',
      'Use /api/search?q={query} for lightweight public record lookup when a live HTTP call is available.',
      'Use /api/article?slug={canonical_slug} to fetch a public article evidence bundle with claims, sources, and citation_exports.',
      'Use /api/claim?id={claim_id} to dereference one public atomic claim with its article, matching source, and citation_export.',
      'Use /api/source?id={source_id} or /api/source?url={source_url} to inspect a public source and mapped claims.',
      'Fetch /topics.json to inspect topic-level public coverage before selecting a query strategy.',
      'Fetch /capabilities.json to map an AI task to the smallest trustworthy endpoint, output format, and fallback artifacts.',
      'Fetch /content-health.json to inspect signed corpus health, draft risk, public source coverage, and trust boundaries.',
      'Fetch /coverage.json to inspect topic coverage, confidence distribution, source coverage, and known limits before relying on AnchorFact.',
      'Fetch /examples.json for executable usage examples that chain evidence, search, article, claim, source, and signed static artifacts.',
      'Fetch /graph.json for signed offline traversal of public topic, article, claim, and source relationships.',
      'Fetch /evals.json to run executable golden checks against the current AI integration contract.',
      'Fetch /mcp.json for local MCP stdio configuration and tool metadata when connecting MCP-capable hosts.',
      'Fetch /search-index.json to shortlist public records by title, keywords, claims, source coverage, and route templates.',
      'Fetch /manifest.json to select public articles by canonical_slug, status, confidence_level, and source coverage.',
      'Fetch /sources.json to inspect source tier, source type, article reuse, and claim reuse.',
      'Fetch /claims.json for atomic public claims with evidence links.',
      'Fetch /{canonical_slug}/index.json for JSON-LD article context before citing a claim.',
      'Do not cite draft entries or entries whose status is not public.'
    ],
    endpoints: {
      root_index: endpoint('/index.json', 'Compact root machine directory for preferred entrypoints, trust policy, and signed static artifacts.'),
      agent_profile: endpoint('/agent.json', 'This discovery document for AI agents and crawlers.'),
      well_known_agent_profile: endpoint('/.well-known/anchorfact.json', 'Stable well-known alias for the agent discovery document.'),
      openapi: endpoint('/openapi.json', 'OpenAPI 3.1 description of the static read-only machine contract.'),
      api_index: endpoint('/api', 'Compact live API discovery index for AI agents.'),
      api_access: endpoint('/api-access/', 'Free API access guide with recommended call order, examples, limits, and provenance verification.', 'text/html'),
      artifact_summary: endpoint('/artifact-summary.json', 'Lightweight size, purpose, cache posture, and default-call alternatives for major static machine artifacts.'),
      artifact_shards: endpoint('/artifact-shards.json', 'Signed registry of versioned shards for large static artifacts.'),
      api_readiness: endpoint('/api-readiness.json', 'Machine-readable readiness gates, core corpus scorecard, API citation readiness, and subscription-readiness status.'),
      llms_txt: endpoint('/llms.txt', 'Public verified article index optimized for LLM crawlers.', 'text/plain'),
      manifest: endpoint('/manifest.json', 'Full article index with public/draft status, confidence, and verification metadata.'),
      claims: endpoint('/claims.json', 'Public verified atomic claims with evidence links.'),
      topics: endpoint('/topics.json', 'Compact public topic coverage map with article, claim, and source counts.'),
      capabilities: endpoint('/capabilities.json', 'AI task-to-endpoint routing guide with trust requirements and fallback artifacts.'),
      content_health: endpoint('/content-health.json', 'Signed corpus health summary for AI trust decisions, draft triage, and source coverage inspection.'),
      coverage: endpoint('/coverage.json', 'AI coverage and limits guide with confidence, source verification, and topic distributions.'),
      examples: endpoint('/examples.json', 'Executable AI usage examples for dynamic API calls and signed static fallback workflows.'),
      graph: endpoint('/graph.json', 'Signed public graph of topic, article, claim, and source relationships.'),
      evals: endpoint('/evals.json', 'Executable golden integration checks for AI consumers and production smoke.'),
      mcp: endpoint('/mcp.json', 'Signed local MCP installation manifest and tool metadata.'),
      plan_api: endpoint('/api/plan?q={query}', 'Read-only query planner that recommends AnchorFact calls or external-source fallback.'),
      evidence_api: endpoint('/api/evidence?q={query}', 'Read-only query evidence pack backed by signed static artifacts; supports format=json or format=markdown.'),
      context_api: endpoint('/api/context?q={query}', 'Read-only prompt context assembler that combines answer policy, citation-ready claims, planning status, content health, fallback guidance, and evidence packs; supports format=json or format=markdown.'),
      resolve_api: endpoint('/api/resolve?ref={reference}', 'Read-only resolver for public AnchorFact claim ids, article slugs, source ids, and source URLs.'),
      resolve_batch_api: endpoint('/api/resolve-batch?ref={reference}&ref={reference}', 'Read-only batch resolver for mixed public AnchorFact references; supports format=json or format=markdown.'),
      search_api: endpoint('/api/search?q={query}', 'Read-only search API backed by the signed static search index.'),
      article_api: endpoint('/api/article?slug={canonical_slug}', 'Read-only public article evidence bundle with claims, sources, and retrieval metadata.'),
      cite_api: endpoint('/api/cite?id={claim_id}', 'Read-only citation export for one public atomic claim; supports format=json or format=markdown.'),
      claim_api: endpoint('/api/claim?id={claim_id}', 'Read-only public atomic claim lookup with article and matching source metadata.'),
      source_api: endpoint('/api/source?id={source_id}', 'Read-only public source lookup with reuse and mapped claim metadata.'),
      search_index: endpoint('/search-index.json', 'Compact public retrieval index with keywords, claim ids, source coverage, and article routes.'),
      sources: endpoint('/sources.json', 'Deduplicated public source index with tier, type, article reuse, and claim reuse.'),
      provenance: endpoint('/provenance.json', 'Build identity, official-site metadata, content counts, and artifact checksums.'),
      provenance_signature: endpoint('/provenance.sig', 'Detached Ed25519 signature for /provenance.json.'),
      article_jsonld_template: {
        path_template: '/{canonical_slug}/index.json',
        url_template: `${OFFICIAL_SITE}/{canonical_slug}/index.json`,
        media_type: 'application/ld+json',
        description: 'Per-article JSON-LD with confidence and verification metadata.'
      },
      article_markdown_template: {
        path_template: '/{canonical_slug}/index.md',
        url_template: `${OFFICIAL_SITE}/{canonical_slug}/index.md`,
        media_type: 'text/markdown',
        description: 'Original article Markdown for public and draft records.'
      }
    },
    citation_policy: {
      cite_only_public_records: true,
      prefer_atomic_claims: true,
      include_source_urls_or_dois: true,
      include_confidence_level: true,
      include_provenance_commit_when_available: true
    }
  };
}
