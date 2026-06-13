import {
  OFFICIAL_SITE,
  PROVENANCE_PATH,
  ROOT_INDEX_SCHEMA_VERSION,
  publicUrl
} from './build-metadata.js';

export const ROOT_INDEX_DEFAULT_ANSWER_PATH = '/api/context?q={query}';

export const ROOT_INDEX_STATIC_ARTIFACTS = [
  '/index.json',
  '/agent.json',
  '/.well-known/anchorfact.json',
  '/openapi.json',
  '/api-access/',
  '/artifact-summary.json',
  '/artifact-shards.json',
  '/api-readiness.json',
  '/manifest.json',
  '/claims.json',
  '/topics.json',
  '/capabilities.json',
  '/content-health.json',
  '/coverage.json',
  '/examples.json',
  '/graph.json',
  '/evals.json',
  '/mcp.json',
  '/search-index.json',
  '/sources.json',
  '/llms.txt',
  '/provenance.json',
  '/provenance.sig'
];

export function buildRootIndex({
  generated = new Date().toISOString(),
  site = OFFICIAL_SITE,
  publicResults = [],
  draftResults = [],
  claims = [],
  apiReadinessPayload = null
} = {}) {
  return {
    schema_version: ROOT_INDEX_SCHEMA_VERSION,
    generated,
    official_site: OFFICIAL_SITE,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    default_answer_path: ROOT_INDEX_DEFAULT_ANSWER_PATH,
    preferred_machine_entrypoints: [
      {
        id: 'context',
        method: 'GET',
        path: ROOT_INDEX_DEFAULT_ANSWER_PATH,
        use_when: 'Default answer assembly with answer policy, citation-ready claims, content health, and evidence packs.'
      },
      {
        id: 'evidence',
        method: 'GET',
        path: '/api/evidence?q={query}',
        use_when: 'Source-grounded evidence packs when you already have a factual query.'
      },
      {
        id: 'cite',
        method: 'GET',
        path: '/api/cite?id={claim_id}',
        use_when: 'Citation-ready text for a specific public atomic claim.'
      },
      {
        id: 'plan',
        method: 'GET',
        path: '/api/plan?q={query}',
        use_when: 'Coverage decision only when you are unsure whether AnchorFact can answer.'
      }
    ],
    discovery: {
      root_alias: '/',
      root_index: '/index.json',
      api_index: '/api',
      api_access: '/api-access/',
      agent_profile: '/agent.json',
      well_known_agent_profile: '/.well-known/anchorfact.json',
      openapi: '/openapi.json',
      mcp: '/mcp.json',
      provenance: PROVENANCE_PATH,
      signature: '/provenance.sig',
      artifact_summary: '/artifact-summary.json',
      artifact_shards: '/artifact-shards.json',
      api_readiness: '/api-readiness.json',
      llms: '/llms.txt'
    },
    counts: {
      public_articles: publicResults.length,
      draft_articles: draftResults.length,
      public_claims: claims.length
    },
    api_readiness_summary: {
      path: '/api-readiness.json',
      status: apiReadinessPayload?.status || null,
      subscription_ready: apiReadinessPayload?.subscription_ready ?? null,
      report_only: apiReadinessPayload?.report_only ?? null,
      blocker_ids: apiReadinessPayload?.readiness_blockers?.gate_ids || [],
      automated_blocker_ids: apiReadinessPayload?.readiness_blockers?.automated_gate_ids || [],
      manual_blocker_ids: apiReadinessPayload?.readiness_blockers?.manual_gate_ids || []
    },
    trust_policy: {
      public_only_entrypoints_exclude_drafts: true,
      default_answer_requires_can_answer_with_anchorfact: true,
      unsupported_answer_mode: 'external_sources_required',
      verify_provenance_before_trusting_static_artifacts: true,
      cite_only_public_atomic_claims: true
    },
    bulk_sync_policy: {
      prefer_query_scoped_apis: true,
      default_for_single_query: ROOT_INDEX_DEFAULT_ANSWER_PATH,
      avoid_for_single_query: ['/graph.json', '/search-index.json', '/claims.json', '/llms.txt'],
      shard_registry: '/artifact-shards.json'
    },
    static_artifacts: ROOT_INDEX_STATIC_ARTIFACTS
  };
}
