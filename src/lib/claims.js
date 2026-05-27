const CONFIDENCE_RANK = { low: 1, medium: 2, high: 3 };

export function capClaimConfidence(declaredConfidence, articleConfidence) {
  const declaredRank = CONFIDENCE_RANK[declaredConfidence] || 0;
  const articleRank = CONFIDENCE_RANK[articleConfidence] || 0;
  if (!declaredConfidence || declaredRank === 0 || articleRank === 0) return declaredConfidence || null;
  return declaredRank > articleRank ? articleConfidence : declaredConfidence;
}

export function isClaimPublishable(factJson) {
  return !!(
    factJson.text &&
    !factJson['anchorfact:qualityReasons']?.includes('broken_atomic_fact') &&
    (
      factJson['anchorfact:sourceRef'] ||
      factJson.citation?.sameAs
    )
  );
}

export function publicClaims(publicResults) {
  return publicResults.flatMap(result =>
    result._atomicFacts
      .filter(isClaimPublishable)
      .map(fact => {
        const declaredConfidence = fact['anchorfact:confidence'] || null;
        const articleConfidence = result._confidence.level;
        const confidence = capClaimConfidence(declaredConfidence, articleConfidence);
        const claim = {
          id: fact['@id'],
          article: result._quality.canonicalUrl,
          canonical_slug: result._quality.canonicalSlug,
          title: result.headline,
          statement: fact.text,
          confidence,
          source_ref: fact['anchorfact:sourceRef'],
          source_title: fact['anchorfact:sourceTitle'],
          source_url: fact.citation?.sameAs || null,
          evidence_match: fact['anchorfact:evidenceMatch'] || 'mapped',
          citation: fact.citation || null
        };
        if (declaredConfidence && declaredConfidence !== confidence) {
          claim.declared_confidence = declaredConfidence;
          claim.article_confidence = articleConfidence;
        }
        return claim;
      })
  );
}
