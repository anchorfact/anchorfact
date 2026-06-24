import {
  OFFICIAL_SITE,
  PROVENANCE_PATH,
  ROOT_INDEX_SCHEMA_VERSION,
  publicUrl
} from './build-metadata.js';
import { buildErrorRecoveryDiscoveryGuidance } from './api-machine-guidance.js';
import { buildReadinessRuntimeSignalSummary } from './readiness-runtime-signals.js';

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
    quick_start: {
      purpose: 'Smallest root-level contract for AI consumers that reached / or /index.json and need the next query-scoped API call.',
      default_answer_path: ROOT_INDEX_DEFAULT_ANSWER_PATH,
      default_answer_mode: 'answer_with_citations',
      citation_path: '/api/cite?id={claim_id}',
      primary_api_conversion: {
        target_ratio: 0.2,
        measured_as: 'identified AI primary API requests divided by identified AI discovery requests',
        discovery_entrypoints: ['/', '/robots.txt', '/llms.txt', '/index.json', '/agent.json', '/.well-known/anchorfact.json', '/api'],
        primary_entrypoints: ['/api/context', '/api/evidence', '/api/cite', '/api/resolve-batch'],
        next_call_after_discovery: '/api/context?q={query}&limit=3&format=markdown',
        minimum_valid_primary_calls: [
          { id: 'context', path: '/api/context?q={query}&limit=3&format=markdown', required_parameter: 'q' },
          { id: 'evidence', path: '/api/evidence?q={query}&limit=3&format=markdown', required_parameter: 'q' },
          { id: 'cite', path: '/api/cite?id={claim_id}&format=markdown', required_parameter: 'id' },
          { id: 'resolve_batch', path: '/api/resolve-batch?ref={claim_id}&ref={source_id}&format=markdown', required_parameter: 'ref' }
        ],
        parameter_error_prevention: {
          bare_primary_paths_return_recoverable_400: true,
          do_not_call_bare_paths: ['/api/context', '/api/evidence', '/api/cite', '/api/source', '/api/resolve-batch'],
          copy_minimum_valid_primary_calls_first: true,
          recovery_field_on_400: 'machine_recovery'
        }
      },
      example_calls: [
        {
          purpose: 'default_prompt_context',
          method: 'GET',
          path: '/api/context?q=gaussian%20splatting&limit=3&format=markdown'
        },
        {
          purpose: 'raw_evidence_pack',
          method: 'GET',
          path: '/api/evidence?q=RLHF&limit=3&format=markdown'
        }
      ],
      trust_check: {
        path: PROVENANCE_PATH,
        signature_path: '/provenance.sig',
        require_trusted_signature: true
      },
      fallback_policy: {
        unsupported_answer_mode: 'external_sources_required',
        use_external_sources_when: [
          'answer_policy.can_answer_with_anchorfact is false',
          'coverage_status is unsupported',
          'the query asks for live, local, personalized, or time-sensitive facts'
        ]
      }
    },
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
      manual_blocker_ids: apiReadinessPayload?.readiness_blockers?.manual_gate_ids || [],
      runtime_signal_contract: buildReadinessRuntimeSignalSummary({
        contract: apiReadinessPayload?.runtime_signal_contract,
        site
      })
    },
    error_recovery_guidance: buildErrorRecoveryDiscoveryGuidance({ site }),
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
