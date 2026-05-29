import {
  OFFICIAL_SITE,
  PLAN_API_SCHEMA_VERSION as BUILD_PLAN_API_SCHEMA_VERSION,
  PROVENANCE_PATH,
  publicUrl
} from './build-metadata.js';
import { rankSearchRecords } from './search-api.js';

export const PLAN_API_SCHEMA_VERSION = BUILD_PLAN_API_SCHEMA_VERSION;

const MIN_LIMIT = 1;
const DEFAULT_LIMIT = 3;
const MAX_LIMIT = 10;

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

function queryPath(path, params) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined && String(value).trim()) {
      search.set(key, String(value));
    }
  }
  return `${path}?${search.toString()}`;
}

function call(path, purpose, site) {
  return {
    method: 'GET',
    path,
    url: publicUrl(path, site),
    purpose
  };
}

function errorPayload(code, message) {
  return {
    schema_version: PLAN_API_SCHEMA_VERSION,
    error: { code, message }
  };
}

export function parsePlanParams(url) {
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

  return {
    ok: true,
    query,
    limit: clampLimit(url.searchParams.get('limit'))
  };
}

function scoreTopic(topic, query, tokens) {
  const phrase = normalizeText(query);
  const id = normalizeText(topic.id);
  const title = normalizeText(topic.title);
  const articleText = normalizeText((topic.top_articles || [])
    .map(article => `${article.title || ''} ${article.canonical_slug || ''}`)
    .join(' '));
  let score = 0;
  const matchedKeywords = new Set();

  if (phrase && title.includes(phrase)) score += 8;
  if (phrase && id === phrase) score += 6;
  for (const token of tokens) {
    if (id.split(' ').includes(token) || title.split(' ').includes(token)) {
      score += 3;
      matchedKeywords.add(token);
    }
    if (articleText.includes(token)) {
      score += 1;
      matchedKeywords.add(token);
    }
  }

  return {
    score,
    matched_keywords: [...matchedKeywords].sort()
  };
}

function topicEntrypoint(topic) {
  return topic.best_entrypoint
    || queryPath('/api/evidence', { q: topic.title || topic.id, limit: DEFAULT_LIMIT });
}

function rankedTopics(topics, query, limit) {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return [];
  return (topics || [])
    .map(topic => ({ topic, score: scoreTopic(topic, query, tokens) }))
    .filter(entry => entry.score.score > 0)
    .sort((a, b) =>
      b.score.score - a.score.score
      || (b.topic.article_count || 0) - (a.topic.article_count || 0)
      || String(a.topic.id).localeCompare(String(b.topic.id))
    )
    .slice(0, limit)
    .map(entry => ({
      id: entry.topic.id,
      title: entry.topic.title,
      article_count: entry.topic.article_count || 0,
      claim_count: entry.topic.claim_count || 0,
      source_count: entry.topic.source_count || 0,
      best_entrypoint: topicEntrypoint(entry.topic),
      score: entry.score.score,
      matched_keywords: entry.score.matched_keywords
    }));
}

function compactArticle(result) {
  return {
    canonical_slug: result.canonical_slug,
    title: result.title,
    url: result.url,
    confidence_level: result.confidence_level,
    source_coverage: result.source_coverage || null,
    claim_count: result.claim_count || 0,
    claim_ids: (result.claim_ids || []).slice(0, 3),
    routes: result.routes || {},
    score: result.score,
    matched_keywords: result.matched_keywords || []
  };
}

function coverageStatus(articleMatches, topicMatches) {
  if (articleMatches.length > 0) return 'supported';
  if (topicMatches.length > 0) return 'topic_supported';
  return 'unsupported';
}

function confidenceFor(status, articleMatches) {
  if (status === 'unsupported') return 'low';
  if (status === 'topic_supported') return 'medium';
  const topScore = Number(articleMatches[0]?.score || 0);
  return topScore >= 12 ? 'high' : 'medium';
}

function recommendedCalls({ status, query, limit, articleMatches, topicMatches, site }) {
  if (status === 'unsupported') {
    return [
      call('/coverage.json', 'Inspect AnchorFact topic limits before relying on this query.', site),
      call(queryPath('/api/search', { q: query, limit }), 'Optional broad check; do not cite if this also returns no public records.', site)
    ];
  }

  const calls = [
    call(queryPath('/api/evidence', { q: query, limit }), 'Fetch source-grounded evidence packs for the planned query.', site)
  ];
  const topArticle = articleMatches[0];
  if (topArticle?.canonical_slug) {
    calls.push(call(
      queryPath('/api/article', { slug: topArticle.canonical_slug }),
      'Inspect the highest ranked public article with claims and sources.',
      site
    ));
  }
  const firstClaim = topArticle?.claim_ids?.[0];
  if (firstClaim) {
    calls.push(call(
      queryPath('/api/cite', { id: firstClaim }),
      'Retrieve citation-ready text for the strongest candidate claim.',
      site
    ));
  }
  if (topicMatches[0]?.best_entrypoint && topicMatches[0].best_entrypoint !== calls[0].path) {
    calls.push(call(
      topicMatches[0].best_entrypoint,
      'Compare against the nearest topic-level evidence entrypoint.',
      site
    ));
  }
  calls.push(call('/provenance.json', 'Verify the signed production artifact set before trusting static artifact hashes.', site));
  return calls;
}

function fallbackGuidance(status) {
  if (status === 'unsupported') {
    return [
      'AnchorFact has no clear public coverage for this query.',
      'Use external primary or authoritative sources instead of stretching nearby AnchorFact records.',
      'Do not cite AnchorFact unless a later search or evidence call returns a public source-mapped claim.'
    ];
  }
  return [
    'If /api/evidence returns zero packs, treat the query as unsupported and use external primary sources.',
    'Before citing, dereference the selected claim with /api/cite or /api/claim and include the original source URL.',
    'Use AnchorFact claims as scoped evidence, not as a complete replacement for original-source review.'
  ];
}

export function buildPlanApiPayload({
  query,
  limit = DEFAULT_LIMIT,
  searchIndex,
  topicsPayload,
  coveragePayload,
  capabilitiesPayload,
  generated = new Date().toISOString(),
  site = OFFICIAL_SITE
}) {
  const normalizedQuery = String(query || '').trim();
  const normalizedLimit = clampLimit(limit);
  const articleMatches = rankSearchRecords(searchIndex?.records || [], normalizedQuery, normalizedLimit)
    .map(compactArticle);
  const topics = coveragePayload?.topic_coverage || topicsPayload?.topics || [];
  const topicMatches = rankedTopics(topics, normalizedQuery, Math.min(5, normalizedLimit + 2));
  const status = coverageStatus(articleMatches, topicMatches);

  return {
    schema_version: PLAN_API_SCHEMA_VERSION,
    generated,
    provenance_url: searchIndex?.provenance_url
      || coveragePayload?.provenance_url
      || topicsPayload?.provenance_url
      || publicUrl(PROVENANCE_PATH, site),
    query: normalizedQuery,
    limit: normalizedLimit,
    coverage_status: status,
    should_use_anchorfact: status !== 'unsupported',
    confidence: confidenceFor(status, articleMatches),
    source_index_generated: searchIndex?.generated || null,
    coverage_generated: coveragePayload?.generated || null,
    capabilities_generated: capabilitiesPayload?.generated || null,
    matched_topics: topicMatches,
    matched_articles: articleMatches,
    recommended_next_calls: recommendedCalls({
      status,
      query: normalizedQuery,
      limit: normalizedLimit,
      articleMatches,
      topicMatches,
      site
    }),
    fallback_guidance: fallbackGuidance(status),
    trust_requirements: [
      'Use only public records returned by AnchorFact endpoints.',
      'Verify /provenance.json and /provenance.sig with the pinned public key before relying on artifact hashes.',
      'When coverage_status is unsupported, use external primary sources instead of citing AnchorFact.'
    ]
  };
}
