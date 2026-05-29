import { parseSearchParams, rankSearchRecords } from './search-api.js';

export const EVIDENCE_API_SCHEMA_VERSION = 'anchorfact.evidence-api.v1';

function errorPayload(code, message, extra = {}) {
  return {
    schema_version: EVIDENCE_API_SCHEMA_VERSION,
    error: {
      code,
      message
    },
    ...extra
  };
}

export function parseEvidenceParams(url) {
  const parsed = parseSearchParams(url);
  if (!parsed.ok) {
    return {
      ok: false,
      status: 400,
      payload: errorPayload(
        'missing_or_invalid_query',
        'Provide a natural-language query with ?q=... or ?query=....'
      )
    };
  }

  return {
    ok: true,
    query: parsed.query,
    limit: parsed.limit
  };
}

function publicArticle(articles, slug) {
  return (articles || []).find(article =>
    article?.canonical_slug === slug
    && article.status === 'public'
    && article.is_draft === false
  ) || null;
}

function articleSummary(article, result) {
  return {
    id: article.id || null,
    canonical_slug: article.canonical_slug,
    canonical_url: article.canonical_url || result.url || null,
    title: article.title || result.title,
    description: article.description || result.description || null,
    status: article.status,
    is_draft: article.is_draft === true,
    confidence_level: article.confidence_level || result.confidence_level || null,
    confidence_basis: article.confidence_basis || null,
    confidence_score: article.confidence_score ?? null,
    sources_verified: article.sources_verified ?? null,
    sources_total: article.sources_total ?? null
  };
}

function articleClaims(claimsPayload, slug) {
  return (claimsPayload?.claims || [])
    .filter(claim => claim?.canonical_slug === slug);
}

function articleSources(sourcesPayload, slug) {
  return (sourcesPayload?.sources || [])
    .filter(source => (source?.articles || []).some(article => article?.canonical_slug === slug));
}

function retrievalSummary(result) {
  return {
    score: result.score,
    matched_keywords: result.matched_keywords || [],
    source_coverage: result.source_coverage || null,
    claim_ids: result.claim_ids || [],
    routes: result.routes || {}
  };
}

function evidencePack({ result, article, claimsPayload, sourcesPayload }) {
  const claims = articleClaims(claimsPayload, result.canonical_slug);
  const sources = articleSources(sourcesPayload, result.canonical_slug);
  return {
    canonical_slug: result.canonical_slug,
    title: article.title || result.title,
    url: article.canonical_url || result.url,
    description: article.description || result.description || null,
    confidence_level: article.confidence_level || result.confidence_level || null,
    article: articleSummary(article, result),
    retrieval: retrievalSummary(result),
    claim_count: claims.length,
    claims,
    source_count: sources.length,
    sources
  };
}

export function buildEvidenceApiPayload({
  query,
  limit = 5,
  manifest,
  claimsPayload,
  sourcesPayload,
  searchIndex,
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

  const parsed = parseSearchParams(new URL(`https://anchorfact.org/api/evidence?q=${encodeURIComponent(normalizedQuery)}&limit=${encodeURIComponent(limit)}`));
  const normalizedLimit = parsed.ok ? parsed.limit : 5;
  const ranked = rankSearchRecords(searchIndex?.records || [], normalizedQuery, normalizedLimit);
  const packs = ranked
    .map(result => ({
      result,
      article: publicArticle(manifest?.articles, result.canonical_slug)
    }))
    .filter(entry => entry.article)
    .map(entry => evidencePack({
      result: entry.result,
      article: entry.article,
      claimsPayload,
      sourcesPayload
    }));

  return {
    ok: true,
    status: 200,
    payload: {
      schema_version: EVIDENCE_API_SCHEMA_VERSION,
      generated,
      query: normalizedQuery,
      limit: normalizedLimit,
      result_count: packs.length,
      provenance_url: searchIndex?.provenance_url || manifest?.provenance_url || claimsPayload?.provenance_url || sourcesPayload?.provenance_url || null,
      search_index_generated: searchIndex?.generated || null,
      search_index_schema_version: searchIndex?.schema_version || null,
      manifest_generated: manifest?.generated || null,
      claims_generated: claimsPayload?.generated || null,
      source_index_generated: sourcesPayload?.generated || null,
      packs
    }
  };
}
