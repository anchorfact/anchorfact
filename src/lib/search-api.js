import {
  hasStrongMatchedToken,
  normalizeQueryText,
  queryTokens,
  textTokens
} from './query-text.js';

export const SEARCH_API_SCHEMA_VERSION = 'anchorfact.search-api.v1';
const MIN_LIMIT = 1;
const DEFAULT_LIMIT = 5;
const MAX_LIMIT = 20;
const SHORT_TOKEN_BOOST_SKIP = new Set(['ai']);

function clampLimit(value) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return DEFAULT_LIMIT;
  return Math.min(MAX_LIMIT, Math.max(MIN_LIMIT, parsed));
}

export function parseSearchParams(url) {
  const query = (url.searchParams.get('q') || url.searchParams.get('query') || '').trim();
  if (!query) {
    return {
      ok: false,
      status: 400,
      error: 'Missing required q query parameter.'
    };
  }
  return {
    ok: true,
    query,
    limit: clampLimit(url.searchParams.get('limit'))
  };
}

function containsPhrase(text, phrase) {
  if (!phrase) return false;
  return ` ${text} `.includes(` ${phrase} `);
}

function containsToken(text, token) {
  return ` ${text} `.includes(` ${token} `);
}

function countToken(text, token, max = Infinity) {
  let count = 0;
  let offset = 0;
  const haystack = ` ${text} `;
  const needle = ` ${token} `;
  while (count < max) {
    const index = haystack.indexOf(needle, offset);
    if (index < 0) return count;
    count++;
    offset = index + needle.length - 1;
  }
  return count;
}

function isShortExactToken(token) {
  return token.length >= 2 && token.length <= 5 && !SHORT_TOKEN_BOOST_SKIP.has(token);
}

function scoreRecord(record, query, tokens) {
  const titleText = normalizeQueryText(record.title);
  const slugText = normalizeQueryText(record.canonical_slug);
  const descriptionText = normalizeQueryText(record.description);
  const searchText = record.search_text
    ? String(record.search_text)
    : normalizeQueryText([
        record.canonical_slug,
        record.title,
        record.description,
        ...(record.keywords || [])
      ].filter(Boolean).join(' '));
  const keywordTokens = (record.keywords || []).flatMap(textTokens);
  const keywordSet = new Set(keywordTokens);
  const phrase = normalizeQueryText(query);
  const matchedKeywords = new Set();
  const matchedQueryTokens = new Set();
  let score = 0;

  if (titleText === phrase) score += 20;
  if (containsPhrase(titleText, phrase)) score += 16;
  if (containsPhrase(searchText, phrase)) score += 8;
  if (containsPhrase(descriptionText, phrase)) score += 4;

  for (const token of tokens) {
    const exactTitle = containsToken(titleText, token);
    const exactSlug = containsToken(slugText, token);
    const exactKeyword = keywordSet.has(token);

    if (exactSlug) {
      score += 10;
      matchedKeywords.add(token);
      matchedQueryTokens.add(token);
    }
    if (exactTitle) {
      score += 8;
      matchedKeywords.add(token);
      matchedQueryTokens.add(token);
    }
    if (exactKeyword) {
      score += 6;
      matchedKeywords.add(token);
      matchedQueryTokens.add(token);
    }
    if ((exactSlug || exactTitle || exactKeyword) && isShortExactToken(token)) {
      score += 8;
    }

    const descriptionOccurrences = countToken(descriptionText, token, 2);
    if (descriptionOccurrences > 0) {
      score += descriptionOccurrences * 2;
      matchedKeywords.add(token);
      matchedQueryTokens.add(token);
    }
  }

  return {
    score,
    matched_keywords: [...matchedKeywords].sort(),
    matched_query_tokens: matchedQueryTokens
  };
}

function hasStrongQueryMatch(score, tokens) {
  return hasStrongMatchedToken(tokens, score.matched_query_tokens);
}

function resultRecord(record, score) {
  return {
    canonical_slug: record.canonical_slug,
    title: record.title,
    url: record.url,
    description: record.description,
    confidence_level: record.confidence_level,
    source_coverage: record.source_coverage,
    claim_count: record.claim_count,
    claim_ids: record.claim_ids || [],
    routes: record.routes || {},
    score: Number(score.score.toFixed(3)),
    matched_keywords: score.matched_keywords
  };
}

export function rankSearchRecords(records, query, limit = DEFAULT_LIMIT) {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return [];

  return (records || [])
    .map(record => ({ record, score: scoreRecord(record, query, tokens) }))
    .filter(result => result.score.score > 0 && hasStrongQueryMatch(result.score, tokens))
    .sort((a, b) =>
      b.score.score - a.score.score
      || (b.record.claim_count || 0) - (a.record.claim_count || 0)
      || String(a.record.canonical_slug).localeCompare(String(b.record.canonical_slug))
    )
    .slice(0, clampLimit(limit))
    .map(result => resultRecord(result.record, result.score));
}

export function buildSearchApiPayload({
  query,
  limit = DEFAULT_LIMIT,
  searchIndex,
  generated = new Date().toISOString()
}) {
  const results = rankSearchRecords(searchIndex?.records || [], query, limit);
  return {
    schema_version: SEARCH_API_SCHEMA_VERSION,
    generated,
    query,
    limit: clampLimit(limit),
    result_count: results.length,
    provenance_url: searchIndex?.provenance_url || null,
    source_index_generated: searchIndex?.generated || null,
    source_index_schema_version: searchIndex?.schema_version || null,
    results
  };
}
