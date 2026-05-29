import {
  buildArticleApiPayload,
  normalizeArticleSlug
} from './article-api.js';
import {
  buildClaimApiPayload,
  normalizeClaimId
} from './claim-api.js';
import {
  buildSourceApiPayload,
  normalizeSourceId,
  normalizeSourceUrl
} from './source-api.js';

export const RESOLVE_API_SCHEMA_VERSION = 'anchorfact.resolve-api.v1';

const OFFICIAL_HOST = 'anchorfact.org';

function errorPayload(code, message, extra = {}) {
  return {
    schema_version: RESOLVE_API_SCHEMA_VERSION,
    error: {
      code,
      message
    },
    ...extra
  };
}

function rawResolveRef(url) {
  return url.searchParams.get('ref')
    || url.searchParams.get('id')
    || url.searchParams.get('url')
    || url.searchParams.get('claim_id')
    || url.searchParams.get('source_id')
    || url.searchParams.get('slug')
    || '';
}

export function parseResolveParams(url) {
  const ref = String(rawResolveRef(url)).trim();
  if (!ref) {
    return {
      ok: false,
      status: 400,
      payload: errorPayload(
        'missing_or_invalid_reference',
        'Provide a public AnchorFact reference with ?ref={claim_id|canonical_slug|source_id|source_url}.'
      )
    };
  }

  return { ok: true, ref };
}

function decoded(value) {
  try {
    return decodeURIComponent(String(value || '').trim());
  } catch {
    return String(value || '').trim();
  }
}

function parseUrl(value) {
  try {
    return new URL(decoded(value));
  } catch {
    return null;
  }
}

function isOfficialUrl(value) {
  const parsed = parseUrl(value);
  return parsed?.protocol === 'https:' && parsed.hostname.toLowerCase() === OFFICIAL_HOST;
}

function slugFromOfficialUrl(value) {
  const parsed = parseUrl(value);
  if (!parsed || parsed.hostname.toLowerCase() !== OFFICIAL_HOST) {
    return normalizeArticleSlug(value);
  }

  let path = parsed.pathname.replace(/^\/+/, '');
  if (path.toLowerCase().startsWith('kb/')) {
    path = path.slice(3);
  }
  return normalizeArticleSlug(path);
}

function classifyReference(ref) {
  const raw = decoded(ref);
  const sourceId = normalizeSourceId(raw);
  if (sourceId) {
    return {
      type: 'source',
      sourceId,
      sourceUrl: null,
      value: sourceId,
      route: `/api/source?id=${encodeURIComponent(sourceId)}`
    };
  }

  const claimId = normalizeClaimId(raw);
  if (claimId) {
    return {
      type: 'claim',
      value: claimId,
      route: `/api/claim?id=${encodeURIComponent(claimId)}`
    };
  }

  const parsed = parseUrl(raw);
  if (parsed && !isOfficialUrl(raw)) {
    const sourceUrl = normalizeSourceUrl(raw);
    if (sourceUrl) {
      return {
        type: 'source',
        sourceId: null,
        sourceUrl,
        value: sourceUrl,
        route: `/api/source?url=${encodeURIComponent(sourceUrl)}`
      };
    }
  }

  const slug = slugFromOfficialUrl(raw);
  if (slug) {
    return {
      type: 'article',
      value: slug,
      route: `/api/article?slug=${encodeURIComponent(slug)}`
    };
  }

  return null;
}

function linksFor(classified) {
  const links = {
    resolved_api: classified.route
  };
  if (classified.type === 'claim') {
    links.claim_api = classified.route;
    links.cite_api = `/api/cite?id=${encodeURIComponent(classified.value)}`;
  } else if (classified.type === 'article') {
    links.article_api = classified.route;
    links.article_jsonld = `/${classified.value}/index.json`;
  } else if (classified.type === 'source') {
    links.source_api = classified.route;
  }
  return links;
}

function wrapPayload({ ref, classified, generated, result }) {
  return {
    ok: true,
    status: 200,
    payload: {
      schema_version: RESOLVE_API_SCHEMA_VERSION,
      generated,
      ref,
      resolved_type: classified.type,
      canonical_ref: classified.value,
      provenance_url: result.payload.provenance_url || null,
      result_schema_version: result.payload.schema_version,
      links: linksFor(classified),
      result: result.payload
    }
  };
}

export function buildResolveApiPayload({
  ref,
  manifest,
  claimsPayload,
  sourcesPayload,
  searchIndex,
  generated = new Date().toISOString()
}) {
  const classified = classifyReference(ref);
  if (!classified) {
    return {
      ok: false,
      status: 400,
      payload: errorPayload(
        'missing_or_invalid_reference',
        'Provide a public AnchorFact reference with ?ref={claim_id|canonical_slug|source_id|source_url}.',
        { ref: ref || null }
      )
    };
  }

  let result;
  if (classified.type === 'claim') {
    result = buildClaimApiPayload({
      claimId: classified.value,
      manifest,
      claimsPayload,
      sourcesPayload,
      generated
    });
  } else if (classified.type === 'source') {
    result = buildSourceApiPayload({
      sourceId: classified.sourceId,
      sourceUrl: classified.sourceUrl,
      sourcesPayload,
      claimsPayload,
      generated
    });
  } else {
    result = buildArticleApiPayload({
      slug: classified.value,
      manifest,
      claimsPayload,
      sourcesPayload,
      searchIndex,
      generated
    });
  }

  if (!result.ok) {
    return {
      ok: false,
      status: result.status,
      payload: errorPayload(
        'reference_not_found',
        'The reference was syntactically valid but did not resolve to a public AnchorFact record.',
        {
          ref,
          resolved_type: classified.type,
          canonical_ref: classified.value,
          nested_error: result.payload.error || null
        }
      )
    };
  }

  return wrapPayload({ ref, classified, generated, result });
}
