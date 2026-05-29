import {
  OFFICIAL_SITE,
  PROVENANCE_PATH,
  SEARCH_INDEX_SCHEMA_VERSION,
  publicUrl
} from './build-metadata.js';

const STOPWORDS = new Set([
  'about',
  'after',
  'also',
  'and',
  'are',
  'because',
  'between',
  'both',
  'can',
  'for',
  'from',
  'has',
  'have',
  'how',
  'into',
  'its',
  'more',
  'not',
  'of',
  'on',
  'or',
  'that',
  'the',
  'their',
  'this',
  'through',
  'to',
  'with'
]);

function normalizeText(parts) {
  return parts
    .filter(value => value !== null && value !== undefined && String(value).trim())
    .join(' ')
    .replace(/[^a-z0-9]+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function sourceCoverage(result) {
  const total = result._verificationData?.sources_total ?? result.citation?.length ?? 0;
  const verified = result._verificationData?.sources_verified ?? 0;
  return {
    verified,
    total,
    ratio: total > 0 ? Number((verified / total).toFixed(3)) : 0
  };
}

function keywordsFor(text, limit = 24) {
  const counts = new Map();
  for (const token of text.split(' ')) {
    if (token.length < 3 || STOPWORDS.has(token)) continue;
    counts.set(token, (counts.get(token) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([token]) => token);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function routeSet(slug, site) {
  return {
    html: publicUrl(`/${slug}/`, site),
    markdown: publicUrl(`/${slug}/index.md`, site),
    jsonld: publicUrl(`/${slug}/index.json`, site),
    text: publicUrl(`/${slug}/index.txt`, site),
    turtle: publicUrl(`/${slug}/index.ttl`, site)
  };
}

export function buildSearchIndex({
  generated,
  publicResults,
  claims,
  verificationTimestamp,
  site = OFFICIAL_SITE
}) {
  const claimsBySlug = new Map();
  for (const claim of claims) {
    if (!claimsBySlug.has(claim.canonical_slug)) claimsBySlug.set(claim.canonical_slug, []);
    claimsBySlug.get(claim.canonical_slug).push(claim);
  }

  const records = publicResults
    .map(result => {
      const slug = result._quality.canonicalSlug;
      const articleClaims = claimsBySlug.get(slug) || [];
      const sourceTitles = unique((result.citation || []).map(source => source.name));
      const sourceTiers = unique((result.citation || []).map(source => source['anchorfact:sourceTier'])).sort();
      const searchText = normalizeText([
        slug.replace(/\//g, ' '),
        result.headline,
        result.description,
        sourceTitles.join(' '),
        ...articleClaims.map(claim => claim.statement)
      ]);

      return {
        canonical_slug: slug,
        title: result.headline,
        url: result._quality.canonicalUrl,
        description: result.description || '',
        confidence_level: result._confidence.level,
        confidence_score: result._confidence.score,
        source_coverage: sourceCoverage(result),
        source_count: result.citation?.length || 0,
        source_tiers: sourceTiers,
        source_titles: sourceTitles,
        claim_count: articleClaims.length,
        claim_ids: articleClaims.map(claim => claim.id),
        keywords: keywordsFor(searchText),
        search_text: searchText,
        routes: routeSet(slug, site)
      };
    })
    .sort((a, b) => a.canonical_slug.localeCompare(b.canonical_slug));

  return {
    schema_version: SEARCH_INDEX_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    article_count: records.length,
    public_claim_count: claims.length,
    verification_report: verificationTimestamp || null,
    records
  };
}
