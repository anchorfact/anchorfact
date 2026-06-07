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
