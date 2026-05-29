import { createHash } from 'crypto';
import { classifySourceTier } from './confidence.js';
import {
  OFFICIAL_SITE,
  PROVENANCE_PATH,
  SOURCES_SCHEMA_VERSION,
  publicUrl
} from './build-metadata.js';

function normalizedDoi(doi) {
  return String(doi || '').trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').toLowerCase();
}

function normalizedUrl(url) {
  return String(url || '').trim().replace(/\/+$/, '');
}

function sourceHref(source) {
  const doi = normalizedDoi(source.doi);
  if (doi) return `https://doi.org/${doi}`;
  return normalizedUrl(source.url) || null;
}

function sourceIdentity(source) {
  const doi = normalizedDoi(source.doi);
  if (doi) return `doi:${doi}`;
  const url = normalizedUrl(source.url).toLowerCase();
  if (url) return `url:${url}`;
  return `title:${String(source.title || '').trim().toLowerCase()}|${source.year || ''}|${String(source.type || '').trim().toLowerCase()}`;
}

function sourceId(source) {
  return `source:${createHash('sha256').update(sourceIdentity(source)).digest('hex').slice(0, 16)}`;
}

function increment(map, key) {
  const normalized = key || 'unknown';
  map[normalized] = (map[normalized] || 0) + 1;
}

function claimMatchesSource(claim, sourceUrl) {
  if (!sourceUrl || !claim.source_url) return false;
  return normalizedUrl(claim.source_url).toLowerCase() === normalizedUrl(sourceUrl).toLowerCase();
}

export function buildSourceIndex({
  generated,
  publicResults,
  claims,
  verificationTimestamp,
  site = OFFICIAL_SITE
}) {
  const sources = new Map();
  const tierDistribution = {};
  const typeDistribution = {};

  for (const result of publicResults) {
    for (const source of result.citation || []) {
      const href = source.sameAs || null;
      const rawSource = {
        title: source.name,
        authors: source.author ? [String(source.author)] : [],
        url: href && !href.includes('doi.org/') ? href : null,
        doi: href?.includes('doi.org/') ? href : null,
        year: source['anchorfact:year'] || null,
        type: source['anchorfact:sourceType'] || source['@type'] || null
      };
      const id = sourceId(rawSource);
      const tier = source['anchorfact:sourceTier'] || classifySourceTier(rawSource);
      const type = rawSource.type || 'unknown';

      if (!sources.has(id)) {
        sources.set(id, {
          id,
          title: rawSource.title || '(untitled source)',
          type,
          tier,
          year: rawSource.year,
          url: href,
          authors: rawSource.authors,
          article_count: 0,
          claim_count: 0,
          articles: []
        });
        increment(tierDistribution, tier);
        increment(typeDistribution, type);
      }

      const entry = sources.get(id);
      if (!entry.articles.some(article => article.canonical_slug === result._quality.canonicalSlug)) {
        entry.article_count += 1;
        entry.articles.push({
          canonical_slug: result._quality.canonicalSlug,
          title: result.headline,
          url: result._quality.canonicalUrl,
          confidence_level: result._confidence.level
        });
      }
      entry.claim_count += claims.filter(claim =>
        claim.canonical_slug === result._quality.canonicalSlug && claimMatchesSource(claim, href)
      ).length;
    }
  }

  const sortedSources = [...sources.values()].sort((a, b) =>
    b.article_count - a.article_count
    || b.claim_count - a.claim_count
    || a.title.localeCompare(b.title)
  );

  return {
    schema_version: SOURCES_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    source_count: sortedSources.length,
    public_article_count: publicResults.length,
    public_claim_count: claims.length,
    verification_report: verificationTimestamp || null,
    tier_distribution: tierDistribution,
    type_distribution: typeDistribution,
    sources: sortedSources
  };
}
