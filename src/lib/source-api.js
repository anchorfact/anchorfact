export const SOURCE_API_SCHEMA_VERSION = 'anchorfact.source-api.v1';

function errorPayload(code, message, extra = {}) {
  return {
    schema_version: SOURCE_API_SCHEMA_VERSION,
    error: {
      code,
      message
    },
    ...extra
  };
}

export function normalizeSourceId(value) {
  const raw = String(value || '').trim();
  if (!raw) return null;
  if (!/^source:[A-Za-z0-9._:-]+$/.test(raw)) return null;
  return raw;
}

export function normalizeSourceUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) return null;
  try {
    const parsed = new URL(decodeURIComponent(raw));
    if (!/^https?:$/i.test(parsed.protocol)) return null;
    parsed.hash = '';
    parsed.search = '';
    return parsed.href.replace(/\/+$/, '');
  } catch {
    return null;
  }
}

export function parseSourceParams(url) {
  const sourceId = normalizeSourceId(url.searchParams.get('id') || url.searchParams.get('source_id'));
  const sourceUrl = normalizeSourceUrl(url.searchParams.get('url') || url.searchParams.get('source_url'));

  if (!sourceId && !sourceUrl) {
    return {
      ok: false,
      status: 400,
      payload: errorPayload(
        'missing_or_invalid_source_lookup',
        'Provide a source id with ?id=source:{id} or a source URL with ?url=https://example.com/source.'
      )
    };
  }

  return { ok: true, sourceId, sourceUrl };
}

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function sourceByLookup(sources, { sourceId, sourceUrl }) {
  return (sources || []).find(source => {
    const idMatches = sourceId && source?.id === sourceId;
    const urlMatches = sourceUrl && normalizeSourceUrl(source?.url) === sourceUrl;
    return idMatches || urlMatches;
  }) || null;
}

function sourceArticleSlugs(source) {
  return new Set((source?.articles || []).map(article => article?.canonical_slug).filter(Boolean));
}

function claimsForSource(claimsPayload, source) {
  const url = normalizeSourceUrl(source?.url);
  const title = normalizeText(source?.title);
  const slugs = sourceArticleSlugs(source);

  return (claimsPayload?.claims || []).filter(claim => {
    if (!slugs.has(claim?.canonical_slug)) return false;
    const claimUrl = normalizeSourceUrl(claim?.source_url || claim?.citation?.sameAs);
    const claimTitle = normalizeText(claim?.source_title);
    return (url && claimUrl === url) || (title && claimTitle === title);
  });
}

export function buildSourceApiPayload({
  sourceId,
  sourceUrl,
  sourcesPayload,
  claimsPayload,
  generated = new Date().toISOString()
}) {
  const normalizedId = normalizeSourceId(sourceId);
  const normalizedUrl = normalizeSourceUrl(sourceUrl);
  if (!normalizedId && !normalizedUrl) {
    return {
      ok: false,
      status: 400,
      payload: errorPayload(
        'missing_or_invalid_source_lookup',
        'Provide a source id with ?id=source:{id} or a source URL with ?url=https://example.com/source.'
      )
    };
  }

  const source = sourceByLookup(sourcesPayload?.sources, {
    sourceId: normalizedId,
    sourceUrl: normalizedUrl
  });

  if (!source) {
    return {
      ok: false,
      status: 404,
      payload: errorPayload(
        'public_source_not_found',
        'No public AnchorFact source was found for the requested id or URL.',
        {
          source_id: normalizedId,
          source_url: normalizedUrl
        }
      )
    };
  }

  const claims = claimsForSource(claimsPayload, source);
  return {
    ok: true,
    status: 200,
    payload: {
      schema_version: SOURCE_API_SCHEMA_VERSION,
      generated,
      source_id: source.id,
      source_url: source.url || null,
      provenance_url: sourcesPayload?.provenance_url || claimsPayload?.provenance_url || null,
      source_index_generated: sourcesPayload?.generated || null,
      claims_generated: claimsPayload?.generated || null,
      source,
      claim_count: claims.length,
      claims
    }
  };
}
