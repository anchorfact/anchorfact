import { CITATION_CONTRACT } from './citation-export.js';
import { buildClaimApiPayload, normalizeClaimId } from './claim-api.js';

export const CITE_API_SCHEMA_VERSION = 'anchorfact.cite-api.v1';

function errorPayload(code, message, extra = {}) {
  return {
    schema_version: CITE_API_SCHEMA_VERSION,
    error: {
      code,
      message
    },
    ...extra
  };
}

export function parseCiteParams(url) {
  const claimId = normalizeClaimId(
    url.searchParams.get('id')
    || url.searchParams.get('claim_id')
    || url.searchParams.get('claim')
  );

  if (!claimId) {
    return {
      ok: false,
      status: 400,
      payload: errorPayload(
        'missing_or_invalid_claim_id',
        'Provide a public claim id with ?id=https://anchorfact.org/fact/{id}.'
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
        'Citation format must be json, markdown, or md.'
      )
    };
  }

  return { ok: true, claimId, format };
}

export function buildCiteApiPayload({
  claimId,
  manifest,
  claimsPayload,
  sourcesPayload,
  generated = new Date().toISOString()
}) {
  const claimResult = buildClaimApiPayload({
    claimId,
    manifest,
    claimsPayload,
    sourcesPayload,
    generated
  });

  if (!claimResult.ok) {
    return {
      ok: false,
      status: claimResult.status,
      payload: errorPayload(
        claimResult.payload.error?.code || 'citation_lookup_failed',
        claimResult.payload.error?.message || 'No public AnchorFact citation was found.',
        {
          claim_id: claimResult.payload.claim_id || normalizeClaimId(claimId) || null,
          canonical_slug: claimResult.payload.canonical_slug || null
        }
      )
    };
  }

  const source = claimResult.payload.sources?.[0] || null;
  return {
    ok: true,
    status: 200,
    payload: {
      schema_version: CITE_API_SCHEMA_VERSION,
      generated,
      claim_id: claimResult.payload.claim_id,
      canonical_slug: claimResult.payload.canonical_slug,
      provenance_url: claimResult.payload.provenance_url,
      citation_contract: CITATION_CONTRACT,
      citation_export: claimResult.payload.citation_export,
      claim: claimResult.payload.claim,
      article: claimResult.payload.article,
      source
    }
  };
}

export function renderCitationMarkdown(payload) {
  const citation = payload?.citation_export;
  const lines = [
    '# AnchorFact Citation',
    '',
    `Generated: ${payload?.generated || 'unknown'}`,
    `Provenance: ${payload?.provenance_url || 'unavailable'}`,
    `Claim: ${payload?.claim_id || 'unavailable'}`,
    '',
    citation?.markdown || '- Citation unavailable.'
  ];

  if (citation?.source_url) {
    lines.push('', `Source: ${citation.source_url}`);
  }

  return `${lines.join('\n')}\n`;
}
