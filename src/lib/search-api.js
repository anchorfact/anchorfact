export const SEARCH_API_SCHEMA_VERSION = 'anchorfact.search-api.v1';
const MIN_LIMIT = 1;
const DEFAULT_LIMIT = 5;
const MAX_LIMIT = 20;

function normalizeText(value) {
  return String(value || '')
    .replace(/[^a-z0-9]+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function queryTokens(query) {
  return normalizeText(query)
    .split(' ')
    .filter(token => token.length >= 2);
}

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

function occurrenceCount(haystack, needle) {
  if (!needle) return 0;
  let count = 0;
  let position = haystack.indexOf(needle);
  while (position !== -1) {
    count++;
    position = haystack.indexOf(needle, position + needle.length);
  }
  return count;
}

function scoreRecord(record, query, tokens) {
  const title = normalizeText(record.title);
  const description = normalizeText(record.description);
  const text = normalizeText(record.search_text);
  const keywords = new Set((record.keywords || []).map(normalizeText));
  const phrase = normalizeText(query);
  const matchedKeywords = new Set();
  let score = 0;

  if (phrase && title.includes(phrase)) score += 16;
  if (phrase && text.includes(phrase)) score += 8;
  if (phrase && description.includes(phrase)) score += 4;

  for (const token of tokens) {
    if (title.split(' ').includes(token)) {
      score += 8;
      matchedKeywords.add(token);
    }
    if (keywords.has(token)) {
      score += 6;
      matchedKeywords.add(token);
    }
    if (description.includes(token)) {
      score += 2;
      matchedKeywords.add(token);
    }
    const occurrences = occurrenceCount(text, token);
    if (occurrences > 0) {
      score += Math.min(occurrences, 4);
      matchedKeywords.add(token);
    }
  }

  return {
    score,
    matched_keywords: [...matchedKeywords].sort()
  };
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
    .filter(result => result.score.score > 0)
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
    source_index_generated: searchIndex?.generated || null,
    source_index_schema_version: searchIndex?.schema_version || null,
    results
  };
}
