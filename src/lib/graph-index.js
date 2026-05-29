import {
  GRAPH_SCHEMA_VERSION,
  OFFICIAL_SITE,
  PROVENANCE_PATH,
  publicUrl
} from './build-metadata.js';

function topicIdForSlug(slug) {
  return String(slug || '').split('/')[0] || 'uncategorized';
}

function normalizeUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    parsed.hash = '';
    parsed.search = '';
    return parsed.href.replace(/\/+$/, '').toLowerCase();
  } catch {
    return raw.replace(/\/+$/, '').toLowerCase();
  }
}

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function publicArticles(manifest) {
  return (manifest?.articles || [])
    .filter(article => article?.status === 'public' && article.is_draft === false && article.canonical_slug);
}

function sourceForClaim(claim, sources) {
  const claimUrl = normalizeUrl(claim?.source_url || claim?.citation?.sameAs);
  const claimTitle = normalizeText(claim?.source_title);
  return sources.find(source => {
    const sourceUrl = normalizeUrl(source?.url);
    const sourceTitle = normalizeText(source?.title);
    return (claimUrl && sourceUrl === claimUrl) || (claimTitle && sourceTitle === claimTitle);
  }) || null;
}

function pushEdge(edges, seen, edge) {
  const key = `${edge.type}|${edge.from}|${edge.to}`;
  if (seen.has(key)) return;
  seen.add(key);
  edges.push(edge);
}

function articleNode(article) {
  return {
    id: `article:${article.canonical_slug}`,
    type: 'article',
    canonical_slug: article.canonical_slug,
    title: article.title || article.canonical_slug,
    url: article.canonical_url || null,
    confidence_level: article.confidence_level || null,
    sources_verified: article.sources_verified ?? null,
    sources_total: article.sources_total ?? null
  };
}

function claimNode(claim) {
  return {
    id: claim.id,
    type: 'claim',
    canonical_slug: claim.canonical_slug,
    statement: claim.statement,
    confidence: claim.confidence || null,
    source_url: claim.source_url || null,
    source_title: claim.source_title || null
  };
}

function sourceNode(source) {
  return {
    id: source.id,
    type: 'source',
    title: source.title,
    url: source.url || null,
    tier: source.tier || null,
    source_type: source.type || null,
    article_count: source.article_count || 0,
    claim_count: source.claim_count || 0
  };
}

function topicNode(topic) {
  return {
    id: `topic:${topic.id}`,
    type: 'topic',
    topic: topic.id,
    title: topic.title || topic.id,
    article_count: topic.article_count || 0,
    claim_count: topic.claim_count || 0,
    source_count: topic.source_count || 0
  };
}

export function buildGraphIndex({
  generated,
  manifest,
  claimsPayload,
  sourcesPayload,
  topicsPayload,
  site = OFFICIAL_SITE
}) {
  const articles = publicArticles(manifest);
  const articleIds = new Set(articles.map(article => `article:${article.canonical_slug}`));
  const claims = (claimsPayload?.claims || [])
    .filter(claim => articleIds.has(`article:${claim?.canonical_slug}`));
  const sources = sourcesPayload?.sources || [];
  const topics = topicsPayload?.topics || [];
  const nodes = [
    ...topics.map(topicNode),
    ...articles.map(articleNode),
    ...claims.map(claimNode),
    ...sources.map(sourceNode)
  ].sort((a, b) => a.type.localeCompare(b.type) || String(a.id).localeCompare(String(b.id)));

  const edges = [];
  const seenEdges = new Set();

  for (const article of articles) {
    pushEdge(edges, seenEdges, {
      type: 'topic_contains_article',
      from: `topic:${topicIdForSlug(article.canonical_slug)}`,
      to: `article:${article.canonical_slug}`
    });
  }

  for (const claim of claims) {
    const articleId = `article:${claim.canonical_slug}`;
    if (!articleIds.has(articleId)) continue;
    pushEdge(edges, seenEdges, {
      type: 'article_has_claim',
      from: articleId,
      to: claim.id
    });

    const source = sourceForClaim(claim, sources);
    if (source) {
      pushEdge(edges, seenEdges, {
        type: 'claim_supported_by_source',
        from: claim.id,
        to: source.id
      });
    }
  }

  for (const source of sources) {
    for (const article of source.articles || []) {
      const articleId = `article:${article?.canonical_slug}`;
      if (!articleIds.has(articleId)) continue;
      pushEdge(edges, seenEdges, {
        type: 'source_cited_by_article',
        from: source.id,
        to: articleId
      });
    }
  }

  edges.sort((a, b) =>
    a.type.localeCompare(b.type)
    || String(a.from).localeCompare(String(b.from))
    || String(a.to).localeCompare(String(b.to))
  );

  return {
    schema_version: GRAPH_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    public_article_count: articles.length,
    public_claim_count: claims.length,
    source_count: sources.length,
    topic_count: topics.length,
    node_count: nodes.length,
    edge_count: edges.length,
    nodes,
    edges
  };
}
