import {
  CAPABILITIES_SCHEMA_VERSION,
  OFFICIAL_SITE,
  PROVENANCE_PATH,
  publicUrl
} from './build-metadata.js';

function call(path, site) {
  return {
    method: 'GET',
    path,
    url: publicUrl(path, site)
  };
}

function trustRequirements(extra = []) {
  return [
    'Use only public AnchorFact records returned by the endpoint.',
    'Verify /provenance.json and /provenance.sig with the pinned public key before treating artifact hashes as trusted.',
    ...extra
  ];
}

export function buildCapabilitiesIndex({
  generated,
  manifest,
  claimsPayload,
  topicsPayload,
  examplesPayload,
  evalsPayload,
  mcpPayload,
  site = OFFICIAL_SITE
} = {}) {
  const mcpToolNames = new Set((mcpPayload?.tools || []).map(tool => tool.name));
  const localMcpTool = (toolName, args, purpose) => (
    mcpToolNames.has(toolName)
      ? { tool: toolName, arguments: args, purpose }
      : null
  );
  const localMcpTools = (...tools) => tools.filter(Boolean);

  const capabilities = [
    {
      id: 'plan_query',
      intent: 'Decide whether AnchorFact has plausible public coverage for a natural-language question and choose the next endpoint.',
      use_when: [
        'The agent is not sure whether AnchorFact should be used for the question.',
        'The agent needs a machine-readable plan before fetching evidence or falling back to external sources.'
      ],
      input_patterns: ['natural_language_query'],
      primary_call: call('/api/plan?q={query}&limit=3', site),
      local_mcp_tools: localMcpTools(
        localMcpTool('anchorfact_plan_query', { query: '{query}', limit: 3 }, 'Plan whether local AnchorFact coverage is plausible before fetching evidence.')
      ),
      output_formats: ['application/json'],
      follow_up_calls: [
        call('/api/evidence?q={query}&limit=3', site),
        call('/api/search?q={query}&limit=5', site)
      ],
      fallback_artifacts: ['/coverage.json', '/content-health.json', '/capabilities.json', '/search-index.json'],
      trust_requirements: trustRequirements([
        'When coverage_status is unsupported, use external primary sources instead of citing AnchorFact.'
      ])
    },
    {
      id: 'answer_with_evidence',
      intent: 'Answer a natural-language question with public, source-grounded AnchorFact evidence packs.',
      use_when: [
        'The user asks a factual question and needs cited evidence.',
        'The agent needs search hits, article summaries, claims, sources, and citation exports in one call.'
      ],
      input_patterns: ['natural_language_query'],
      primary_call: call('/api/evidence?q={query}&limit=3', site),
      local_mcp_tools: localMcpTools(
        localMcpTool('anchorfact_search', { query: '{query}', confidence_min: 'low', limit: 3 }, 'Search local public records for candidate articles.'),
        localMcpTool('anchorfact_get_article', { article_id: '{canonical_slug}' }, 'Retrieve the selected local article with sources.'),
        localMcpTool('anchorfact_cite_claim', { claim_id: '{claim_id}' }, 'Export citation-ready text for a selected local claim.')
      ),
      output_formats: ['application/json', 'text/markdown'],
      follow_up_calls: [
        call('/api/cite?id={claim_id}', site),
        call('/api/article?slug={canonical_slug}', site)
      ],
      fallback_artifacts: ['/search-index.json', '/claims.json', '/sources.json'],
      trust_requirements: trustRequirements([
        'Do not cite a pack unless the selected claim is public and source-mapped.'
      ])
    },
    {
      id: 'assemble_prompt_context',
      intent: 'Fetch one AI prompt context pack with coverage status, content health, fallback guidance, evidence packs, and citation guardrails.',
      use_when: [
        'The agent wants one call before drafting an answer.',
        'The agent needs both supported/unsupported guidance and source-mapped evidence in the same payload.'
      ],
      input_patterns: ['natural_language_query'],
      primary_call: call('/api/context?q={query}&limit=3', site),
      local_mcp_tools: localMcpTools(
        localMcpTool('anchorfact_context', { query: '{query}', limit: 3, format: 'json' }, 'Assemble local planning guidance and public evidence packs in one MCP call.')
      ),
      output_formats: ['application/json', 'text/markdown'],
      follow_up_calls: [
        call('/api/cite?id={claim_id}', site),
        call('/api/resolve?ref={reference}', site)
      ],
      fallback_artifacts: ['/search-index.json', '/claims.json', '/sources.json', '/coverage.json', '/content-health.json'],
      trust_requirements: trustRequirements([
        'Do not draft a cited answer from the context payload unless evidence_pack_count is greater than zero.',
        'When coverage_status is unsupported, use external primary sources instead of citing AnchorFact.'
      ])
    },
    {
      id: 'inspect_corpus_health',
      intent: 'Inspect signed corpus health, public source coverage, trust boundaries, and the draft repair queue.',
      use_when: [
        'The agent needs the draft repair queue before planning content repair.',
        'The agent is checking public source coverage or content health before deciding whether to trust local artifacts.'
      ],
      input_patterns: ['content_health', 'draft_repair_queue', 'source_coverage'],
      primary_call: call('/content-health.json', site),
      local_mcp_tools: localMcpTools(
        localMcpTool('anchorfact_content_health', { format: 'json' }, 'Inspect local corpus health and the next draft repair batch.')
      ),
      output_formats: ['application/json', 'text/markdown'],
      follow_up_calls: [
        call('/provenance.json', site),
        call('/evals.json', site)
      ],
      fallback_artifacts: ['/content-health.json', '/manifest.json', '/coverage.json'],
      trust_requirements: trustRequirements([
        'Use draft repair queue entries only for maintenance planning; draft entries remain excluded from public AI answer entrypoints.'
      ])
    },
    {
      id: 'search_public_records',
      intent: 'Find candidate public AnchorFact records before fetching a full article or claim.',
      use_when: [
        'The agent only needs lightweight ranking metadata.',
        'The agent is narrowing a broad query before fetching larger payloads.'
      ],
      input_patterns: ['natural_language_query', 'topic_keyword'],
      primary_call: call('/api/search?q={query}&limit=5', site),
      local_mcp_tools: localMcpTools(
        localMcpTool('anchorfact_search', { query: '{query}', confidence_min: 'medium', limit: 5 }, 'Search the local public article index.')
      ),
      output_formats: ['application/json'],
      follow_up_calls: [
        call('/api/article?slug={canonical_slug}', site),
        call('/api/evidence?q={query}&limit=3', site)
      ],
      fallback_artifacts: ['/search-index.json', '/topics.json'],
      trust_requirements: trustRequirements()
    },
    {
      id: 'resolve_single_reference',
      intent: 'Turn one claim id, article slug or URL, source id, or source URL into the matching public payload.',
      use_when: [
        'The agent already has an AnchorFact reference.',
        'The agent extracted a source URL or claim shorthand from previous context.'
      ],
      input_patterns: ['claim_id', 'claim_url', 'article_slug', 'anchorfact_url', 'source_id', 'source_url'],
      primary_call: call('/api/resolve?ref={reference}', site),
      local_mcp_tools: localMcpTools(
        localMcpTool('anchorfact_resolve_reference', { reference: '{reference}' }, 'Resolve one local public claim, article, source, or URL reference.')
      ),
      output_formats: ['application/json'],
      follow_up_calls: [
        call('/api/cite?id={claim_id}', site)
      ],
      fallback_artifacts: ['/manifest.json', '/claims.json', '/sources.json'],
      trust_requirements: trustRequirements()
    },
    {
      id: 'resolve_many_references',
      intent: 'Resolve several mixed references in one round trip while preserving per-item errors.',
      use_when: [
        'The agent has multiple AnchorFact or source references.',
        'The agent needs to classify references before deciding which citation or article endpoint to call.'
      ],
      input_patterns: ['claim_id', 'article_slug', 'anchorfact_url', 'source_id', 'source_url'],
      primary_call: call('/api/resolve-batch?ref={reference}&ref={reference}', site),
      local_mcp_tools: localMcpTools(
        localMcpTool('anchorfact_resolve_references', { references: ['{reference}'], format: 'json' }, 'Resolve several local public references while preserving item-level errors.')
      ),
      output_formats: ['application/json', 'text/markdown'],
      follow_up_calls: [
        call('/api/cite?id={claim_id}', site),
        call('/api/source?url={source_url}', site)
      ],
      fallback_artifacts: ['/manifest.json', '/claims.json', '/sources.json'],
      trust_requirements: trustRequirements([
        'Inspect each result status because a batch can partially succeed.'
      ])
    },
    {
      id: 'cite_atomic_claim',
      intent: 'Return one citation-ready public atomic claim with article and source context.',
      use_when: [
        'The agent has selected the exact claim to cite.',
        'The final answer needs a compact citation payload or Markdown citation text.'
      ],
      input_patterns: ['claim_id', 'claim_url'],
      primary_call: call('/api/cite?id={claim_id}', site),
      local_mcp_tools: localMcpTools(
        localMcpTool('anchorfact_cite_claim', { claim_id: '{claim_id}', format: 'json' }, 'Export citation-ready local JSON or Markdown for one claim.')
      ),
      output_formats: ['application/json', 'text/markdown'],
      follow_up_calls: [
        call('/api/claim?id={claim_id}', site)
      ],
      fallback_artifacts: ['/claims.json'],
      trust_requirements: trustRequirements([
        'Include source URL or DOI, confidence, and provenance commit when presenting the citation.'
      ])
    },
    {
      id: 'inspect_source_reuse',
      intent: 'Inspect a public source and find mapped public claims and articles that reuse it.',
      use_when: [
        'The agent needs to audit whether a source supports multiple public claims.',
        'The agent has an original source URL and wants AnchorFact coverage around it.'
      ],
      input_patterns: ['source_id', 'source_url'],
      primary_call: call('/api/source?url={source_url}', site),
      local_mcp_tools: localMcpTools(
        localMcpTool('anchorfact_resolve_reference', { reference: '{source_url}' }, 'Resolve a local source reference and inspect mapped public claims.')
      ),
      output_formats: ['application/json'],
      follow_up_calls: [
        call('/api/resolve?ref={source_url}', site),
        call('/api/cite?id={claim_id}', site)
      ],
      fallback_artifacts: ['/sources.json', '/graph.json'],
      trust_requirements: trustRequirements()
    },
    {
      id: 'verify_official_build',
      intent: 'Confirm the current production build is the official signed AnchorFact artifact set.',
      use_when: [
        'The agent needs to decide whether to trust current static artifacts.',
        'The agent is comparing production with a fork, mirror, cache, or local clone.'
      ],
      input_patterns: ['base_url', 'provenance_url'],
      primary_call: call('/provenance.json', site),
      output_formats: ['application/json'],
      follow_up_calls: [
        call('/provenance.sig', site),
        call('/evals.json', site)
      ],
      fallback_artifacts: ['/agent.json', '/openapi.json'],
      trust_requirements: [
        'Verify /provenance.sig against /provenance.json with the pinned public key.',
        'Require official_build=true, canonical_site=https://anchorfact.org, branch=main, and a GitHub commit that exists in the official repository.'
      ]
    },
    {
      id: 'connect_local_mcp',
      intent: 'Install or inspect the local MCP wrapper for MCP-capable AI hosts.',
      use_when: [
        'The agent host can use Model Context Protocol tools.',
        'The user wants local search, article retrieval, reference resolution, and citation tools.'
      ],
      input_patterns: ['mcp_host', 'local_repository'],
      primary_call: call('/mcp.json', site),
      local_mcp_tools: localMcpTools(
        localMcpTool('anchorfact_plan_query', { query: '{query}', limit: 3 }, 'Plan local coverage.'),
        localMcpTool('anchorfact_content_health', { format: 'json' }, 'Inspect local corpus health and draft repair queue.'),
        localMcpTool('anchorfact_context', { query: '{query}', limit: 3, format: 'json' }, 'Assemble local answer context.'),
        localMcpTool('anchorfact_search', { query: '{query}', confidence_min: 'medium', limit: 5 }, 'Search local public records.'),
        localMcpTool('anchorfact_get_article', { article_id: '{canonical_slug}' }, 'Retrieve one local article.'),
        localMcpTool('anchorfact_resolve_reference', { reference: '{reference}' }, 'Resolve one local reference.'),
        localMcpTool('anchorfact_resolve_references', { references: ['{reference}'], format: 'json' }, 'Resolve several local references.'),
        localMcpTool('anchorfact_cite_claim', { claim_id: '{claim_id}', format: 'json' }, 'Export citation-ready local claim text.'),
        localMcpTool('anchorfact_list_categories', {}, 'List local public categories.')
      ),
      output_formats: ['application/json'],
      follow_up_calls: [
        call('/examples.json', site),
        call('/evals.json', site)
      ],
      fallback_artifacts: ['/agent.json', '/openapi.json'],
      trust_requirements: trustRequirements([
        'Run npm run build before starting the local stdio server so MCP reads the current dist artifacts.'
      ])
    }
  ];

  return {
    schema_version: CAPABILITIES_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    name: 'AnchorFact AI capability router',
    purpose: 'Help AI agents choose the smallest trustworthy AnchorFact endpoint or static artifact for a citation, retrieval, verification, or MCP task.',
    current_snapshot: {
      public_articles: manifest?.public_article_count ?? null,
      draft_articles: manifest?.draft_article_count ?? null,
      public_claims: claimsPayload?.claim_count ?? null,
      topics: topicsPayload?.topic_count ?? null,
      examples: examplesPayload?.example_count ?? null,
      evals: evalsPayload?.eval_count ?? null,
      mcp_tools: Array.isArray(mcpPayload?.tools) ? mcpPayload.tools.length : null
    },
    default_sequence: [
      'verify_official_build',
      'plan_query',
      'assemble_prompt_context',
      'cite_atomic_claim'
    ],
    selection_rules: [
      {
        when: 'You need to decide whether AnchorFact coverage is plausible before retrieving evidence.',
        use_capability: 'plan_query'
      },
      {
        when: 'You have a natural-language factual question.',
        use_capability: 'answer_with_evidence'
      },
      {
        when: 'You need one prompt-ready context pack before drafting an answer.',
        use_capability: 'assemble_prompt_context'
      },
      {
        when: 'You need corpus health, public source coverage, or draft repair queue state.',
        use_capability: 'inspect_corpus_health'
      },
      {
        when: 'You only need to shortlist public records.',
        use_capability: 'search_public_records'
      },
      {
        when: 'You have one known AnchorFact or source reference.',
        use_capability: 'resolve_single_reference'
      },
      {
        when: 'You have multiple mixed references.',
        use_capability: 'resolve_many_references'
      },
      {
        when: 'You are ready to cite a specific claim.',
        use_capability: 'cite_atomic_claim'
      },
      {
        when: 'You need to verify production authenticity.',
        use_capability: 'verify_official_build'
      },
      {
        when: 'Your host supports MCP tools.',
        use_capability: 'connect_local_mcp'
      }
    ],
    capability_count: capabilities.length,
    capabilities
  };
}
