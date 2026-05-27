export function distribution(results) {
  return {
    high: results.filter(result => result._confidence?.level === 'high').length,
    medium: results.filter(result => result._confidence?.level === 'medium').length,
    low: results.filter(result => result._confidence?.level === 'low').length,
    basis: {
      verified: results.filter(result => result._confidence?.inputs?.based_on === 'verified_sources').length,
      estimated: results.filter(result => result._confidence?.inputs?.based_on !== 'verified_sources').length
    }
  };
}

export function manifestArticle(result) {
  return {
    id: result['@id'],
    canonical_slug: result._quality.canonicalSlug,
    canonical_url: result._quality.canonicalUrl,
    title: result.headline,
    status: result._quality.status,
    confidence_level: result._confidence.level,
    confidence_basis: result._confidence.inputs.based_on,
    confidence_score: result._confidence.score,
    sources_verified: result._verificationData?.sources_verified ?? null,
    sources_total: result._verificationData?.sources_total ?? (result.citation || []).length,
    is_draft: result._quality.isDraft,
    quality_reasons: result._quality.qualityReasons
  };
}

export function buildManifest({
  results,
  publicResults,
  draftResults,
  claims,
  generated,
  verificationTimestamp,
  verificationCount
}) {
  return {
    generated,
    article_count: results.length,
    public_article_count: publicResults.length,
    draft_article_count: draftResults.length,
    claim_count: claims.length,
    ids: results.map(result => result['@id']),
    public_ids: publicResults.map(result => result['@id']),
    articles: results.map(manifestArticle),
    confidence_distribution: distribution(results),
    public_confidence_distribution: distribution(publicResults),
    compiler_version: '0.3.0',
    verification_report: verificationTimestamp
      ? { timestamp: verificationTimestamp, articles_verified: verificationCount || 0 }
      : null
  };
}
