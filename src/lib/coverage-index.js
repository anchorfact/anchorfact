import {
  COVERAGE_SCHEMA_VERSION,
  OFFICIAL_SITE,
  PROVENANCE_PATH,
  publicUrl
} from './build-metadata.js';

const CONFIDENCE_LEVELS = ['high', 'medium', 'low'];

function round3(value) {
  return Math.round(value * 1000) / 1000;
}

function publicArticles(manifest) {
  return (manifest?.articles || []).filter(article => article.status === 'public' && article.is_draft === false);
}

function confidenceDistribution(articles) {
  const distribution = { high: 0, medium: 0, low: 0 };
  for (const article of articles) {
    const level = CONFIDENCE_LEVELS.includes(article.confidence_level) ? article.confidence_level : 'low';
    distribution[level] += 1;
  }
  return distribution;
}

function sourceVerificationDistribution(articles) {
  let full = 0;
  let partial = 0;
  let none = 0;

  for (const article of articles) {
    const verified = Number(article.sources_verified || 0);
    const total = Number(article.sources_total || 0);
    if (total > 0 && verified >= total) {
      full += 1;
    } else if (verified > 0) {
      partial += 1;
    } else {
      none += 1;
    }
  }

  return {
    full,
    partial,
    none,
    full_ratio: articles.length ? round3(full / articles.length) : 0
  };
}

function topEntries(distribution, limit = 12) {
  return Object.entries(distribution || {})
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([type, count]) => ({ type, count }));
}

function topicCoverage(topicsPayload) {
  return (topicsPayload?.topics || [])
    .map(topic => ({
      id: topic.id,
      title: topic.title,
      article_count: topic.article_count || 0,
      claim_count: topic.claim_count || 0,
      source_count: topic.source_count || 0,
      confidence_distribution: topic.confidence_distribution || { high: 0, medium: 0, low: 0 },
      best_entrypoint: `/api/evidence?q=${encodeURIComponent(topic.title || topic.id)}&limit=3`
    }))
    .sort((a, b) => b.article_count - a.article_count || a.id.localeCompare(b.id));
}

export function buildCoverageIndex({
  generated,
  manifest,
  claimsPayload,
  topicsPayload,
  sourcesPayload,
  site = OFFICIAL_SITE
} = {}) {
  const articles = publicArticles(manifest);

  return {
    schema_version: COVERAGE_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    name: 'AnchorFact AI coverage and limits',
    purpose: 'Help AI agents decide whether AnchorFact is a suitable source for a query before retrieving or citing claims.',
    coverage_summary: {
      public_articles: manifest?.public_article_count ?? articles.length,
      draft_articles: manifest?.draft_article_count ?? null,
      public_claims: claimsPayload?.claim_count ?? null,
      topics: topicsPayload?.topic_count ?? (topicsPayload?.topics || []).length,
      unique_sources: sourcesPayload?.source_count ?? null,
      confidence_distribution: confidenceDistribution(articles),
      source_verification: sourceVerificationDistribution(articles),
      source_tier_distribution: sourcesPayload?.tier_distribution || {},
      top_source_types: topEntries(sourcesPayload?.type_distribution)
    },
    topic_coverage: topicCoverage(topicsPayload),
    best_entrypoints: {
      discover_contract: '/agent.json',
      route_task: '/capabilities.json',
      check_coverage: '/coverage.json',
      plan_query: '/api/plan?q={query}&limit=3',
      answer_with_evidence: '/api/evidence?q={query}&limit=3',
      cite_claim: '/api/cite?id={claim_id}',
      verify_official_build: '/provenance.json'
    },
    recommended_decision_flow: [
      {
        step: 1,
        question: 'Ask AnchorFact whether public coverage is plausible and which endpoint should be called next.',
        use: '/api/plan?q={query}&limit=3'
      },
      {
        step: 2,
        question: 'If the plan says coverage is plausible, fetch source-grounded public evidence.',
        use: '/api/evidence?q={query}&limit=3'
      },
      {
        step: 3,
        question: 'Before citing, verify the selected claim and source mapping.',
        use: '/api/cite?id={claim_id}'
      },
      {
        step: 4,
        question: 'If coverage is weak or absent, do not invent AnchorFact support; use external sources instead.',
        use: null
      }
    ],
    coverage_limits: [
      {
        id: 'public_only',
        description: 'Only public records are intended for AI retrieval and citation; drafts are intentionally excluded.'
      },
      {
        id: 'not_general_web_search',
        description: 'AnchorFact is a verified claim registry, not a complete web search engine or encyclopedic replacement.'
      },
      {
        id: 'confidence_is_not_truth',
        description: 'Confidence summarizes source tier, source count, verification coverage, freshness, and editorial caps; it does not replace checking original sources.'
      },
      {
        id: 'partial_coverage_requires_caution',
        description: 'When a query falls outside listed topics or returns no public evidence packs, cite external primary sources instead of stretching AnchorFact coverage.'
      }
    ]
  };
}
