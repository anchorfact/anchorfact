import { CITATION_CONTRACT, buildClaimCitationExports } from './citation-export.js';

export const ARTICLE_API_SCHEMA_VERSION = 'anchorfact.article-api.v1';

function errorPayload(code, message, extra = {}) {
  return {
    schema_version: ARTICLE_API_SCHEMA_VERSION,
    error: {
      code,
      message
    },
    ...extra
  };
}

export function normalizeArticleSlug(value) {
  let raw = String(value || '').trim();
  if (!raw) return null;

  if (/^https?:\/\//i.test(raw)) {
    try {
      raw = new URL(raw).pathname;
    } catch {
      return null;
    }
  }

  try {
    raw = decodeURIComponent(raw);
  } catch {
    return null;
  }

  raw = raw
    .replace(/^\/+/, '')
    .replace(/\/+$/, '')
    .replace(/\/index\.(json|html|md|txt|ttl)$/i, '')
    .replace(/\/+$/, '')
    .toLowerCase();

  if (
    !raw
    || raw.includes('..')
    || raw.includes('\\')
    || raw.includes('//')
    || !/^[a-z0-9][a-z0-9/-]*$/.test(raw)
  ) {
    return null;
  }

  return raw;
}

export function parseArticleParams(url) {
  const slug = normalizeArticleSlug(
    url.searchParams.get('slug')
    || url.searchParams.get('canonical_slug')
    || url.searchParams.get('url')
  );

  if (!slug) {
    return {
      ok: false,
      status: 400,
      payload: errorPayload(
        'missing_or_invalid_slug',
        'Provide a public canonical article slug with ?slug=category/article-slug.'
      )
    };
  }

  return { ok: true, slug };
}

function publicArticle(articles, slug) {
  return (articles || []).find(article =>
    article?.canonical_slug === slug
    && article.status === 'public'
    && article.is_draft === false
  ) || null;
}

function articleClaims(claimsPayload, slug) {
  return (claimsPayload?.claims || [])
    .filter(claim => claim?.canonical_slug === slug);
}

function articleSources(sourcesPayload, slug) {
  return (sourcesPayload?.sources || [])
    .filter(source => (source?.articles || []).some(article => article?.canonical_slug === slug));
}

function articleSearchRecord(searchIndex, slug) {
  return (searchIndex?.records || []).find(record => record?.canonical_slug === slug) || null;
}

function retrievalSummary(record) {
  if (!record) return null;
  return {
    description: record.description,
    url: record.url,
    source_coverage: record.source_coverage,
    source_tiers: record.source_tiers || [],
    source_titles: record.source_titles || [],
    claim_ids: record.claim_ids || [],
    claim_count: record.claim_count || 0,
    keywords: record.keywords || [],
    routes: record.routes || {}
  };
}

export function buildArticleApiPayload({
  slug,
  manifest,
  claimsPayload,
  sourcesPayload,
  searchIndex,
  generated = new Date().toISOString()
}) {
  const canonicalSlug = normalizeArticleSlug(slug);
  if (!canonicalSlug) {
    return {
      ok: false,
      status: 400,
      payload: errorPayload(
        'missing_or_invalid_slug',
        'Provide a public canonical article slug with ?slug=category/article-slug.'
      )
    };
  }

  const article = publicArticle(manifest?.articles, canonicalSlug);
  if (!article) {
    return {
      ok: false,
      status: 404,
      payload: errorPayload(
        'public_article_not_found',
        'No public AnchorFact article was found for the requested slug.',
        { canonical_slug: canonicalSlug }
      )
    };
  }

  const claims = articleClaims(claimsPayload, canonicalSlug);
  const sources = articleSources(sourcesPayload, canonicalSlug);
  const retrieval = retrievalSummary(articleSearchRecord(searchIndex, canonicalSlug));
  const citationExports = buildClaimCitationExports({ claims, article, sources });

  return {
    ok: true,
    status: 200,
    payload: {
      schema_version: ARTICLE_API_SCHEMA_VERSION,
      generated,
      canonical_slug: canonicalSlug,
      provenance_url: manifest?.provenance_url || claimsPayload?.provenance_url || sourcesPayload?.provenance_url || null,
      manifest_generated: manifest?.generated || null,
      claims_generated: claimsPayload?.generated || null,
      source_index_generated: sourcesPayload?.generated || null,
      search_index_generated: searchIndex?.generated || null,
      article,
      retrieval,
      citation_contract: CITATION_CONTRACT,
      claim_count: claims.length,
      claims,
      citation_exports: citationExports,
      source_count: sources.length,
      sources
    }
  };
}
