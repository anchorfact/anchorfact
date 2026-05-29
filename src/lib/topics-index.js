import {
  OFFICIAL_SITE,
  PROVENANCE_PATH,
  TOPICS_SCHEMA_VERSION,
  publicUrl
} from './build-metadata.js';

function topicIdForSlug(slug) {
  return String(slug || '').split('/')[0] || 'uncategorized';
}

function titleForTopic(id) {
  return String(id || 'uncategorized')
    .split('-')
    .map(part => {
      if (!part) return '';
      if (part.length <= 3) return part.toUpperCase();
      return `${part[0].toUpperCase()}${part.slice(1)}`;
    })
    .join(' ');
}

function confidenceDistribution() {
  return { high: 0, medium: 0, low: 0 };
}

function increment(map, key) {
  map[key] = (map[key] || 0) + 1;
}

function claimsBySlug(claims) {
  const bySlug = new Map();
  for (const claim of claims || []) {
    if (!bySlug.has(claim.canonical_slug)) bySlug.set(claim.canonical_slug, []);
    bySlug.get(claim.canonical_slug).push(claim);
  }
  return bySlug;
}

function sourceIdsByTopic(sourcesPayload) {
  const byTopic = new Map();
  for (const source of sourcesPayload?.sources || []) {
    for (const article of source.articles || []) {
      const topic = topicIdForSlug(article.canonical_slug);
      if (!byTopic.has(topic)) byTopic.set(topic, new Set());
      byTopic.get(topic).add(source.id);
    }
  }
  return byTopic;
}

function articleSummary(result, articleClaims) {
  const slug = result._quality.canonicalSlug;
  return {
    canonical_slug: slug,
    title: result.headline || slug,
    url: result._quality.canonicalUrl,
    confidence_level: result._confidence.level,
    confidence_score: result._confidence.score,
    claim_count: articleClaims.length,
    source_count: result.citation?.length || 0
  };
}

export function buildTopicsIndex({
  generated,
  publicResults,
  claims,
  sourcesPayload,
  site = OFFICIAL_SITE
}) {
  const claimMap = claimsBySlug(claims);
  const sourceMap = sourceIdsByTopic(sourcesPayload);
  const topics = new Map();

  for (const result of publicResults || []) {
    const slug = result._quality.canonicalSlug;
    const topicId = topicIdForSlug(slug);
    if (!topics.has(topicId)) {
      topics.set(topicId, {
        id: topicId,
        title: titleForTopic(topicId),
        article_count: 0,
        claim_count: 0,
        source_count: 0,
        confidence_distribution: confidenceDistribution(),
        top_articles: []
      });
    }

    const topic = topics.get(topicId);
    const articleClaims = claimMap.get(slug) || [];
    topic.article_count += 1;
    topic.claim_count += articleClaims.length;
    increment(topic.confidence_distribution, result._confidence.level || 'low');
    topic.top_articles.push(articleSummary(result, articleClaims));
  }

  for (const topic of topics.values()) {
    topic.source_count = sourceMap.get(topic.id)?.size || 0;
    topic.top_articles = topic.top_articles
      .sort((a, b) =>
        b.confidence_score - a.confidence_score
        || b.claim_count - a.claim_count
        || a.canonical_slug.localeCompare(b.canonical_slug)
      )
      .slice(0, 8);
  }

  const sortedTopics = [...topics.values()].sort((a, b) =>
    b.article_count - a.article_count
    || b.claim_count - a.claim_count
    || a.id.localeCompare(b.id)
  );

  return {
    schema_version: TOPICS_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    topic_count: sortedTopics.length,
    public_article_count: (publicResults || []).length,
    public_claim_count: (claims || []).length,
    topics: sortedTopics
  };
}
