import {
  API_ACCESS_SCHEMA_VERSION,
  OFFICIAL_SITE,
  PROVENANCE_PATH,
  publicUrl
} from './build-metadata.js';

export function buildApiAccessPolicy({
  generated = new Date().toISOString(),
  site = OFFICIAL_SITE,
  publicResults = [],
  draftResults = [],
  claims = []
} = {}) {
  return {
    schema_version: API_ACCESS_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    name: 'AnchorFact API Access Policy',
    description: 'Machine-readable access policy and recommended call order for the public read-only AnchorFact API.',
    access_policy: {
      current_access: 'public_no_key',
      no_api_key_required: true,
      account_required: false,
      payment_required: false,
      subscription_required: false,
      read_only: true,
      future_paid_beta_requires_readiness_gates: true
    },
    counts: {
      public_articles: publicResults.length,
      draft_articles: draftResults.length,
      public_claims: claims.length
    },
    recommended_call_order: [
      {
        id: 'context',
        method: 'GET',
        path: '/api/context?q={query}',
        format_options: ['json', 'markdown'],
        use_when: 'Default answer assembly with answer policy, content health, evidence packs, and citation-ready claims.'
      },
      {
        id: 'evidence',
        method: 'GET',
        path: '/api/evidence?q={query}',
        format_options: ['json', 'markdown'],
        use_when: 'Source-grounded evidence packs when a concrete factual query is already known.'
      },
      {
        id: 'cite',
        method: 'GET',
        path: '/api/cite?id={claim_id}',
        format_options: ['json', 'markdown'],
        use_when: 'Citation-ready output for one public atomic claim.'
      },
      {
        id: 'plan',
        method: 'GET',
        path: '/api/plan?q={query}',
        format_options: ['json'],
        use_when: 'Coverage and fallback preflight only when AnchorFact coverage is uncertain.'
      }
    ],
    answer_policy_path: '/api/context?q={query}',
    unsupported_answer_mode: 'external_sources_required',
    trust_check: {
      path: PROVENANCE_PATH,
      signature_path: '/provenance.sig',
      require_trusted_signature: true,
      pinned_public_key_path: 'keys/provenance.pub.pem'
    },
    related_machine_contracts: [
      '/api',
      '/index.json',
      '/agent.json',
      '/openapi.json',
      '/api-readiness.json',
      '/artifact-summary.json',
      '/content-health.json'
    ]
  };
}
