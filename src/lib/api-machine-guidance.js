const OFFICIAL_SITE = 'https://anchorfact.org';

function publicUrl(path, site = OFFICIAL_SITE) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${String(site || OFFICIAL_SITE).replace(/\/+$/, '')}${normalizedPath}`;
}

function queryPath(path, query, limit) {
  const params = new URLSearchParams();
  params.set('q', String(query || '').trim());
  params.set('limit', String(limit || 3));
  return `${path}?${params.toString()}`;
}

function apiCall(id, path, purpose, site) {
  return {
    id,
    method: 'GET',
    path,
    url: publicUrl(path, site),
    purpose
  };
}

function templatedApiCall(id, path, purpose, site) {
  return {
    id,
    method: 'GET',
    path,
    url: publicUrl(path, site),
    templated: true,
    purpose
  };
}

export function buildMachineConsumptionGuidance({
  query,
  limit,
  currentEndpoint,
  site = OFFICIAL_SITE
}) {
  const contextPath = queryPath('/api/context', query, limit);
  const evidencePath = queryPath('/api/evidence', query, limit);

  return {
    large_artifact_policy: 'prefer_query_scoped_apis',
    current_endpoint: currentEndpoint || null,
    preferred_query_scoped_apis: [
      apiCall('context', contextPath, 'Default one-call prompt context with answer policy and citations.', site),
      apiCall('evidence', evidencePath, 'Source-mapped evidence packs for the current query.', site)
    ],
    static_discovery: [
      apiCall('artifact_summary', '/artifact-summary.json', 'Sizes, cache posture, and API alternatives for machine artifacts.', site),
      apiCall('artifact_shards', '/artifact-shards.json', 'Versioned shard registry for bulk sync of large artifacts.', site)
    ],
    avoid_for_single_query: [
      '/graph.json',
      '/search-index.json',
      '/claims.json',
      '/llms.txt'
    ],
    bulk_sync_policy: 'Use /artifact-shards.json versioned shard URLs when a full graph, search, claims, or llms sync is required.'
  };
}

export function buildMachineRecoveryGuidance({
  currentEndpoint,
  reason = 'missing_required_parameters',
  exampleQuery = 'retrieval augmented generation',
  limit = 3,
  site = OFFICIAL_SITE
} = {}) {
  const contextPath = queryPath('/api/context', exampleQuery, limit);
  const evidencePath = queryPath('/api/evidence', exampleQuery, limit);
  const common = {
    recoverable: true,
    current_endpoint: currentEndpoint || null,
    reason,
    first_step: 'Call /api/context with a natural-language q value to discover matching public claims, source ids, and resolvable references.',
    next_request: apiCall(
      'context_discovery',
      contextPath,
      'Executable recovery call for agents that reached an API endpoint without enough parameters.',
      site
    )
  };

  if (currentEndpoint === 'evidence') {
    return {
      ...common,
      valid_parameters: ['q', 'query', 'limit', 'format'],
      retry_examples: [
        apiCall('evidence_json', evidencePath, 'Return source-mapped evidence packs for the query.', site),
        apiCall('evidence_markdown', `${evidencePath}&format=markdown`, 'Return answer-ready evidence packs as Markdown.', site)
      ]
    };
  }

  if (currentEndpoint === 'context') {
    return {
      ...common,
      valid_parameters: ['q', 'query', 'limit', 'format'],
      retry_examples: [
        apiCall('context_json', contextPath, 'Return the default prompt context with answer policy and citation-ready claims.', site),
        apiCall('context_markdown', `${contextPath}&format=markdown`, 'Return prompt context as Markdown for direct answer assembly.', site),
        apiCall('evidence', evidencePath, 'Return source-mapped evidence packs for the query.', site)
      ]
    };
  }

  if (currentEndpoint === 'plan') {
    return {
      ...common,
      valid_parameters: ['q', 'query', 'limit'],
      retry_examples: [
        apiCall('plan_json', queryPath('/api/plan', exampleQuery, limit), 'Return coverage and fallback preflight guidance for the query.', site),
        apiCall('context', contextPath, 'Return the default answer-ready context when coverage is likely known.', site),
        apiCall('evidence', evidencePath, 'Return source-mapped evidence packs for the query.', site)
      ]
    };
  }

  if (currentEndpoint === 'article') {
    return {
      ...common,
      valid_parameters: ['slug', 'canonical_slug', 'url'],
      retry_examples: [
        templatedApiCall('article_by_slug', '/api/article?slug={canonical_slug}', 'Fetch one public article evidence bundle after discovering its canonical slug.', site),
        templatedApiCall('resolve_article', '/api/resolve?ref={canonical_slug}', 'Resolve an article slug or AnchorFact article URL before fetching the article bundle.', site),
        apiCall('context_discovery', contextPath, 'Discover matching public article slugs from a natural-language query.', site)
      ]
    };
  }

  if (currentEndpoint === 'source') {
    return {
      ...common,
      valid_parameters: ['id', 'source_id', 'url', 'source_url'],
      retry_examples: [
        templatedApiCall('source_by_id', '/api/source?id={source_id}', 'Look up a source id returned by /api/context or /api/evidence.', site),
        templatedApiCall('source_by_url', '/api/source?url={source_url}', 'Look up a normalized http(s) source URL.', site)
      ]
    };
  }

  if (currentEndpoint === 'cite') {
    return {
      ...common,
      valid_parameters: ['id', 'claim_id', 'claim', 'format'],
      retry_examples: [
        templatedApiCall('cite_by_claim_id', '/api/cite?id={claim_id}', 'Return citation-ready JSON for one public AnchorFact claim.', site),
        templatedApiCall('cite_markdown', '/api/cite?id={claim_id}&format=markdown', 'Return citation-ready Markdown for one public AnchorFact claim.', site)
      ]
    };
  }

  if (currentEndpoint === 'resolve-batch') {
    return {
      ...common,
      valid_parameters: ['ref', 'id', 'url', 'claim_id', 'source_id', 'slug', 'refs', 'ids', 'urls', 'format'],
      retry_examples: [
        templatedApiCall('resolve_batch_refs', '/api/resolve-batch?ref={claim_id}&ref={source_id}', 'Resolve repeated claim/source/article references in one request.', site),
        templatedApiCall('resolve_batch_markdown', '/api/resolve-batch?ref={claim_id}&format=markdown', 'Return batch resolution as Markdown.', site)
      ]
    };
  }

  if (currentEndpoint === 'resolve') {
    return {
      ...common,
      valid_parameters: ['ref', 'id', 'url', 'claim_id', 'source_id', 'slug'],
      retry_examples: [
        templatedApiCall('resolve_ref', '/api/resolve?ref={claim_id_or_slug_or_source_id}', 'Resolve one public AnchorFact reference.', site),
        templatedApiCall('resolve_url', '/api/resolve?url={source_url}', 'Resolve a source URL to its public AnchorFact source bundle when available.', site)
      ]
    };
  }

  return {
    ...common,
    valid_parameters: ['q', 'query', 'limit'],
    retry_examples: [
      apiCall('context', contextPath, 'Default recovery call for query-scoped context.', site),
      apiCall('evidence', evidencePath, 'Source-mapped evidence packs for the query.', site)
    ]
  };
}

export function buildErrorRecoveryDiscoveryGuidance({ site = OFFICIAL_SITE } = {}) {
  return {
    recoverable_400_field: 'machine_recovery',
    default_recovery_path: '/api/context?q={query}&limit=3',
    default_recovery_url: publicUrl('/api/context?q={query}&limit=3', site),
    observed_recoverable_endpoints: [
      '/api/context',
      '/api/evidence',
      '/api/plan',
      '/api/article',
      '/api/source',
      '/api/resolve-batch',
      '/api/cite'
    ],
    retry_example_paths: [
      '/api/context?q={query}&limit=3',
      '/api/evidence?q={query}&limit=3',
      '/api/plan?q={query}&limit=3',
      '/api/article?slug={canonical_slug}',
      '/api/source?id={source_id}',
      '/api/resolve-batch?ref={claim_id}&ref={source_id}',
      '/api/cite?id={claim_id}'
    ],
    policy: 'If an API request returns a recoverable 400, inspect machine_recovery.next_request first, then use retry_examples for endpoint-specific parameters.'
  };
}
