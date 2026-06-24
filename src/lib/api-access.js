import {
  API_ACCESS_SCHEMA_VERSION,
  OFFICIAL_SITE,
  PROVENANCE_PATH,
  publicUrl
} from './build-metadata.js';
import { API_CALL_GUIDANCE } from './artifact-summary.js';
import {
  buildReadinessRuntimeSignalSummary,
  copyReadinessBlockerEvidenceRequirements
} from './readiness-runtime-signals.js';

const FALLBACK_PAID_BETA_REQUIREMENTS = [
  'production_integrity_14_day',
  'public_audit_14_day',
  'ai_primary_discovery_ratio_7_day',
  'design_partners'
];
const FALLBACK_MANUAL_VALIDATION_REQUIRED = ['design_partners'];

function publicApiCall(call, site) {
  return {
    ...call,
    method: 'GET',
    url: publicUrl(call.path, site)
  };
}

export function buildApiAccessPolicy({
  generated = new Date().toISOString(),
  site = OFFICIAL_SITE,
  publicResults = [],
  draftResults = [],
  claims = [],
  apiReadinessPayload = null
} = {}) {
  const minimumValidPrimaryCalls = API_CALL_GUIDANCE.minimum_valid_primary_calls.map(call => publicApiCall(call, site));
  const byId = new Map(minimumValidPrimaryCalls.map(call => [call.id, call]));
  const paidBetaRequires = Array.isArray(apiReadinessPayload?.readiness_blockers?.gate_ids)
    ? [...apiReadinessPayload.readiness_blockers.gate_ids]
    : [...FALLBACK_PAID_BETA_REQUIREMENTS];
  const manualValidationRequired = Array.isArray(apiReadinessPayload?.readiness_blockers?.manual_gate_ids)
    ? [...apiReadinessPayload.readiness_blockers.manual_gate_ids]
    : [...FALLBACK_MANUAL_VALIDATION_REQUIRED];

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
    readiness_policy: {
      status_endpoint: '/api-readiness.json',
      current_mode: 'free_no_key_read_only',
      report_only_until_gates_met: true,
      paid_beta_requires: paidBetaRequires,
      blocker_source: '/api-readiness.json readiness_blockers',
      blocker_evidence_requirements: copyReadinessBlockerEvidenceRequirements(
        apiReadinessPayload?.readiness_blockers
      ),
      manual_validation_required: manualValidationRequired,
      runtime_signal_contract: buildReadinessRuntimeSignalSummary({
        contract: apiReadinessPayload?.runtime_signal_contract,
        site
      })
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
    primary_api_conversion: {
      target_ratio: 0.2,
      measured_as: 'identified AI primary API requests divided by identified AI discovery requests',
      developer_docs_signal: 'Use this policy page as a bridge to the next query-scoped primary API request, not as the terminal artifact.',
      next_request_after_policy: byId.get('context'),
      minimum_valid_primary_calls: minimumValidPrimaryCalls,
      parameter_error_prevention: {
        ...API_CALL_GUIDANCE.parameter_error_prevention
      }
    },
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
