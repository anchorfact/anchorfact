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
export const RESOLVE_BATCH_API_SCHEMA_VERSION = 'anchorfact.resolve-batch-api.v1';

const MAX_BATCH_REFS = 20;

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

function batchErrorPayload(code, message, extra = {}) {
  return {
    schema_version: RESOLVE_BATCH_API_SCHEMA_VERSION,
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

function collectBatchRefs(url) {
  const refs = [];
  for (const param of ['ref', 'id', 'url', 'claim_id', 'source_id', 'slug']) {
    for (const value of url.searchParams.getAll(param)) {
      const trimmed = String(value || '').trim();
      if (trimmed) refs.push(trimmed);
    }
  }
  for (const param of ['refs', 'ids', 'urls']) {
    for (const value of url.searchParams.getAll(param)) {
      for (const item of String(value || '').split(/[\n,]+/)) {
        const trimmed = item.trim();
        if (trimmed) refs.push(trimmed);
      }
    }
  }
  return refs;
}

export function parseResolveBatchParams(url) {
  const refs = collectBatchRefs(url);
  if (refs.length === 0) {
    return {
      ok: false,
      status: 400,
      payload: batchErrorPayload(
        'missing_or_invalid_references',
        'Provide one or more public AnchorFact references with repeated ?ref=... parameters.'
      )
    };
  }

  if (refs.length > MAX_BATCH_REFS) {
    return {
      ok: false,
      status: 400,
      payload: batchErrorPayload(
        'too_many_references',
        `Resolve batch accepts at most ${MAX_BATCH_REFS} references per request.`,
        { max_references: MAX_BATCH_REFS, requested_references: refs.length }
      )
    };
  }

  const rawFormat = String(url.searchParams.get('format') || 'json').trim().toLowerCase();
  if (!['json', 'markdown', 'md'].includes(rawFormat)) {
    return {
      ok: false,
      status: 400,
      payload: batchErrorPayload(
        'unsupported_format',
        'Resolve batch supports format=json or format=markdown.'
      )
    };
  }

  return {
    ok: true,
    refs,
    format: rawFormat === 'md' ? 'markdown' : rawFormat
  };
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

function batchResultItem(outcome) {
  return {
    ok: outcome.ok,
    status: outcome.status,
    ...outcome.payload
  };
}

export function buildResolveBatchApiPayload({
  refs,
  manifest,
  claimsPayload,
  sourcesPayload,
  searchIndex,
  generated = new Date().toISOString()
}) {
  const results = refs.map(ref => batchResultItem(buildResolveApiPayload({
    ref,
    manifest,
    claimsPayload,
    sourcesPayload,
    searchIndex,
    generated
  })));
  const okCount = results.filter(result => result.ok).length;
  const provenanceUrl = results.find(result => result.provenance_url)?.provenance_url
    || manifest?.provenance_url
    || claimsPayload?.provenance_url
    || sourcesPayload?.provenance_url
    || searchIndex?.provenance_url
    || null;

  return {
    ok: true,
    status: 200,
    payload: {
      schema_version: RESOLVE_BATCH_API_SCHEMA_VERSION,
      generated,
      provenance_url: provenanceUrl,
      reference_count: refs.length,
      ok_count: okCount,
      error_count: results.length - okCount,
      results
    }
  };
}

function lineForResult(item) {
  if (!item.ok) {
    return `- ${item.ref || 'unknown'}: ${item.status} ${item.error?.code || 'error'}`;
  }
  const claimStatement = item.result?.claim?.statement;
  const articleTitle = item.result?.article?.title || item.result?.article?.headline;
  const sourceTitle = item.result?.source?.title;
  const label = claimStatement || articleTitle || sourceTitle || item.canonical_ref;
  return `- ${item.ref}: ${item.resolved_type} -> ${item.canonical_ref} (${item.result_schema_version})${label ? ` - ${label}` : ''}`;
}

export function renderResolveBatchMarkdown(payload) {
  const lines = [
    '# AnchorFact Resolve Batch',
    '',
    `Generated: ${payload.generated || 'unknown'}`,
    `Provenance: ${payload.provenance_url || 'unavailable'}`,
    `Results: ${payload.ok_count || 0} resolved / ${payload.error_count || 0} errors`,
    '',
    ...payload.results.map(lineForResult)
  ];
  return `${lines.join('\n')}\n`;
}
