import {
  buildEvidenceApiPayload,
  renderEvidenceMarkdown
} from './evidence-api.js';
import { buildPlanApiPayload } from './plan-api.js';

export const CONTEXT_API_SCHEMA_VERSION = 'anchorfact.context-api.v1';

const MIN_LIMIT = 1;
const DEFAULT_LIMIT = 3;
const MAX_LIMIT = 20;

function errorPayload(code, message) {
  return {
    schema_version: CONTEXT_API_SCHEMA_VERSION,
    error: { code, message }
  };
}

function clampLimit(value) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return DEFAULT_LIMIT;
  return Math.min(MAX_LIMIT, Math.max(MIN_LIMIT, parsed));
}

export function parseContextParams(url) {
  const query = (url.searchParams.get('q') || url.searchParams.get('query') || '').trim();
  if (!query) {
    return {
      ok: false,
      status: 400,
      payload: errorPayload(
        'missing_or_invalid_query',
        'Provide a natural-language query with ?q=... or ?query=....'
      )
    };
  }

  const rawFormat = String(url.searchParams.get('format') || 'json').trim().toLowerCase();
  const format = rawFormat === 'md' ? 'markdown' : rawFormat;
  if (!['json', 'markdown'].includes(format)) {
    return {
      ok: false,
      status: 400,
      payload: errorPayload(
        'invalid_format',
        'Context format must be json, markdown, or md.'
      )
    };
  }

  return {
    ok: true,
    query,
    limit: clampLimit(url.searchParams.get('limit')),
    format
  };
}

export function buildContextApiPayload({
  query,
  limit = DEFAULT_LIMIT,
  manifest,
  claimsPayload,
  sourcesPayload,
  searchIndex,
  topicsPayload,
  coveragePayload,
  capabilitiesPayload,
  contentHealthPayload,
  generated = new Date().toISOString()
}) {
  const normalizedQuery = String(query || '').trim();
  if (!normalizedQuery) {
    return {
      ok: false,
      status: 400,
      payload: errorPayload(
        'missing_or_invalid_query',
        'Provide a natural-language query with ?q=... or ?query=....'
      )
    };
  }

  const normalizedLimit = clampLimit(limit);
  const plan = buildPlanApiPayload({
    query: normalizedQuery,
    limit: normalizedLimit,
    searchIndex,
    topicsPayload,
    coveragePayload,
    capabilitiesPayload,
    generated
  });
  const evidence = buildEvidenceApiPayload({
    query: normalizedQuery,
    limit: normalizedLimit,
    manifest,
    claimsPayload,
    sourcesPayload,
    searchIndex,
    generated
  });

  if (!evidence.ok) {
    return evidence;
  }

  return {
    ok: true,
    status: 200,
    payload: {
      schema_version: CONTEXT_API_SCHEMA_VERSION,
      generated,
      provenance_url: plan.provenance_url || evidence.payload.provenance_url || null,
      query: normalizedQuery,
      limit: normalizedLimit,
      coverage_status: plan.coverage_status,
      should_use_anchorfact: plan.should_use_anchorfact,
      confidence: plan.confidence,
      citation_contract: evidence.payload.citation_contract,
      content_health: compactContentHealth(contentHealthPayload),
      trust_requirements: plan.trust_requirements || [],
      fallback_guidance: plan.fallback_guidance || [],
      recommended_next_calls: plan.recommended_next_calls || [],
      matched_topics: plan.matched_topics || [],
      matched_articles: plan.matched_articles || [],
      evidence_pack_count: evidence.payload.result_count || 0,
      evidence_packs: evidence.payload.packs || [],
      source_index_generated: evidence.payload.source_index_generated || null,
      search_index_generated: evidence.payload.search_index_generated || null,
      manifest_generated: evidence.payload.manifest_generated || null,
      claims_generated: evidence.payload.claims_generated || null
    }
  };
}

function compactContentHealth(payload) {
  if (!payload || typeof payload !== 'object') return null;
  return {
    schema_version: payload.schema_version || null,
    generated: payload.generated || null,
    provenance_url: payload.provenance_url || null,
    url: 'https://anchorfact.org/content-health.json',
    snapshot: {
      public_articles: payload.snapshot?.public_articles ?? null,
      draft_articles: payload.snapshot?.draft_articles ?? null,
      public_claims: payload.snapshot?.public_claims ?? null,
      public_sources: payload.snapshot?.public_sources ?? null
    },
    public_source_coverage: payload.public?.source_coverage || null,
    public_claim_mapping: payload.public?.claim_mapping || null,
    trust_boundaries: payload.trust_boundaries || {},
    machine_guidance: Array.isArray(payload.machine_guidance)
      ? payload.machine_guidance.slice(0, 4)
      : []
  };
}

export function renderContextMarkdown(payload) {
  const lines = [
    `# AnchorFact Context: ${payload.query}`,
    '',
    `Generated: ${payload.generated || 'unknown'}`,
    `Provenance: ${payload.provenance_url || 'unavailable'}`,
    `Coverage status: ${payload.coverage_status || 'unknown'}`,
    `Should use AnchorFact: ${payload.should_use_anchorfact === true ? 'yes' : 'no'}`,
    `Evidence packs: ${payload.evidence_pack_count ?? 0}`,
    ''
  ];

  if (Array.isArray(payload.trust_requirements) && payload.trust_requirements.length > 0) {
    lines.push('## Trust Requirements', '');
    for (const item of payload.trust_requirements) {
      lines.push(`- ${item}`);
    }
    lines.push('');
  }

  if (payload.content_health) {
    const health = payload.content_health;
    lines.push('## Corpus Health', '');
    lines.push(`- Public articles: ${health.snapshot?.public_articles ?? 'unknown'}`);
    lines.push(`- Public claims: ${health.snapshot?.public_claims ?? 'unknown'}`);
    lines.push(`- Draft articles excluded: ${health.trust_boundaries?.draft_entries_excluded_from_ai_entrypoints === true ? 'yes' : 'unknown'}`);
    lines.push(`- Health artifact: ${health.url || '/content-health.json'}`);
    lines.push('');
  }

  if (Array.isArray(payload.fallback_guidance) && payload.fallback_guidance.length > 0) {
    lines.push('## Fallback Guidance', '');
    for (const item of payload.fallback_guidance) {
      lines.push(`- ${item}`);
    }
    lines.push('');
  }

  if (Array.isArray(payload.recommended_next_calls) && payload.recommended_next_calls.length > 0) {
    lines.push('## Recommended Next Calls', '');
    for (const call of payload.recommended_next_calls) {
      lines.push(`- ${call.method || 'GET'} ${call.path || call.url || ''}${call.purpose ? ` - ${call.purpose}` : ''}`);
    }
    lines.push('');
  }

  lines.push(renderEvidenceMarkdown({
    schema_version: 'anchorfact.evidence-api.v1',
    generated: payload.generated,
    provenance_url: payload.provenance_url,
    query: payload.query,
    result_count: payload.evidence_pack_count || 0,
    packs: payload.evidence_packs || []
  }).trimEnd());

  return `${lines.join('\n')}\n`;
}
