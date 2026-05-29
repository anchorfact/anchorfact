import { CITATION_CONTRACT, buildClaimCitationExport } from './citation-export.js';

export const CLAIM_API_SCHEMA_VERSION = 'anchorfact.claim-api.v1';

const OFFICIAL_SITE = 'https://anchorfact.org';

function errorPayload(code, message, extra = {}) {
  return {
    schema_version: CLAIM_API_SCHEMA_VERSION,
    error: {
      code,
      message
    },
    ...extra
  };
}

export function normalizeClaimId(value) {
  let raw = String(value || '').trim();
  if (!raw) return null;

  try {
    raw = decodeURIComponent(raw);
  } catch {
    return null;
  }

  if (/^\/?fact\//i.test(raw)) {
    raw = `${OFFICIAL_SITE}/${raw.replace(/^\/+/, '')}`;
  } else if (/^[A-Za-z0-9][A-Za-z0-9._:-]*$/.test(raw)) {
    raw = `${OFFICIAL_SITE}/fact/${raw}`;
  }

  try {
    const parsed = new URL(raw);
    parsed.hash = '';
    parsed.search = '';
    raw = parsed.href.replace(/\/+$/, '');
  } catch {
    return null;
  }

  if (!/^https:\/\/anchorfact\.org\/fact\/[A-Za-z0-9._:-]+$/.test(raw)) {
    return null;
  }

  return raw;
}

export function parseClaimParams(url) {
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

  return { ok: true, claimId };
}

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function publicArticle(articles, slug) {
  return (articles || []).find(article =>
    article?.canonical_slug === slug
    && article.status === 'public'
    && article.is_draft === false
  ) || null;
}

function matchingSources(sourcesPayload, claim) {
  const sourceUrl = normalizeText(claim?.source_url || claim?.citation?.sameAs);
  const sourceTitle = normalizeText(claim?.source_title);

  return (sourcesPayload?.sources || []).filter(source => {
    const sameArticle = (source?.articles || []).some(article => article?.canonical_slug === claim?.canonical_slug);
    if (!sameArticle) return false;

    const urlMatches = sourceUrl && normalizeText(source.url) === sourceUrl;
    const titleMatches = sourceTitle && normalizeText(source.title) === sourceTitle;
    return urlMatches || titleMatches;
  });
}

export function buildClaimApiPayload({
  claimId,
  manifest,
  claimsPayload,
  sourcesPayload,
  generated = new Date().toISOString()
}) {
  const normalizedId = normalizeClaimId(claimId);
  if (!normalizedId) {
    return {
      ok: false,
      status: 400,
      payload: errorPayload(
        'missing_or_invalid_claim_id',
        'Provide a public claim id with ?id=https://anchorfact.org/fact/{id}.'
      )
    };
  }

  const claim = (claimsPayload?.claims || []).find(entry => entry?.id === normalizedId) || null;
  if (!claim) {
    return {
      ok: false,
      status: 404,
      payload: errorPayload(
        'public_claim_not_found',
        'No public AnchorFact claim was found for the requested id.',
        { claim_id: normalizedId }
      )
    };
  }

  const article = publicArticle(manifest?.articles, claim.canonical_slug);
  if (!article) {
    return {
      ok: false,
      status: 404,
      payload: errorPayload(
        'public_article_not_found',
        'The requested claim does not resolve to a public AnchorFact article.',
        { claim_id: normalizedId, canonical_slug: claim.canonical_slug || null }
      )
    };
  }

  const sources = matchingSources(sourcesPayload, claim);
  const citationExport = buildClaimCitationExport({
    claim,
    article,
    source: sources[0] || null
  });
  return {
    ok: true,
    status: 200,
    payload: {
      schema_version: CLAIM_API_SCHEMA_VERSION,
      generated,
      claim_id: normalizedId,
      canonical_slug: claim.canonical_slug,
      provenance_url: claimsPayload?.provenance_url || manifest?.provenance_url || sourcesPayload?.provenance_url || null,
      manifest_generated: manifest?.generated || null,
      claims_generated: claimsPayload?.generated || null,
      source_index_generated: sourcesPayload?.generated || null,
      citation_contract: CITATION_CONTRACT,
      claim,
      citation_export: citationExport,
      article,
      source_count: sources.length,
      sources
    }
  };
}
