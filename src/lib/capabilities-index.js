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
  const capabilities = [
    {
      id: 'answer_with_evidence',
      intent: 'Answer a natural-language question with public, source-grounded AnchorFact evidence packs.',
      use_when: [
        'The user asks a factual question and needs cited evidence.',
        'The agent needs search hits, article summaries, claims, sources, and citation exports in one call.'
      ],
      input_patterns: ['natural_language_query'],
      primary_call: call('/api/evidence?q={query}&limit=3', site),
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
      id: 'search_public_records',
      intent: 'Find candidate public AnchorFact records before fetching a full article or claim.',
      use_when: [
        'The agent only needs lightweight ranking metadata.',
        'The agent is narrowing a broad query before fetching larger payloads.'
      ],
      input_patterns: ['natural_language_query', 'topic_keyword'],
      primary_call: call('/api/search?q={query}&limit=5', site),
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
      'answer_with_evidence',
      'cite_atomic_claim'
    ],
    selection_rules: [
      {
        when: 'You have a natural-language factual question.',
        use_capability: 'answer_with_evidence'
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
