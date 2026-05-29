const OFFICIAL_SITE = 'https://anchorfact.org';

export const CITATION_CONTRACT = {
  cite_only_public_claims: true,
  prefer_claim_level_citations: true,
  include_confidence: true,
  include_original_source_url: true,
  include_anchorfact_claim_url: true
};

function cleanText(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    parsed.hash = '';
    parsed.search = '';
    return parsed.href.replace(/\/+$/, '');
  } catch {
    return raw;
  }
}

function articleUrlFor(claim, article) {
  return normalizeUrl(article?.canonical_url || claim?.article)
    || (claim?.canonical_slug ? `${OFFICIAL_SITE}/${claim.canonical_slug}/` : null);
}

function matchingSource(claim, sources = []) {
  const claimUrl = normalizeUrl(claim?.source_url || claim?.citation?.sameAs);
  const claimTitle = cleanText(claim?.source_title).toLowerCase();
  return sources.find(source => {
    const sourceUrl = normalizeUrl(source?.url);
    const sourceTitle = cleanText(source?.title).toLowerCase();
    return (claimUrl && sourceUrl === claimUrl) || (claimTitle && sourceTitle === claimTitle);
  }) || null;
}

function sourceLabel({ sourceTitle, sourceUrl }) {
  if (sourceTitle && sourceUrl) return `${sourceTitle} (${sourceUrl})`;
  return sourceTitle || sourceUrl || 'source unavailable';
}

export function buildClaimCitationExport({ claim, article, source = null }) {
  const articleTitle = cleanText(article?.title || claim?.title || claim?.canonical_slug);
  const statement = cleanText(claim?.statement);
  const confidence = claim?.confidence || article?.confidence_level || null;
  const claimUrl = normalizeUrl(claim?.id);
  const articleUrl = articleUrlFor(claim, article);
  const sourceTitle = cleanText(source?.title || claim?.source_title) || null;
  const sourceUrl = normalizeUrl(source?.url || claim?.source_url || claim?.citation?.sameAs);
  const sourceTier = source?.tier || null;
  const sourceType = source?.type || null;
  const targetUrl = claimUrl || articleUrl || OFFICIAL_SITE;
  const inline = `[AnchorFact: ${articleTitle}; ${confidence || 'unknown'} confidence; source: ${sourceLabel({ sourceTitle, sourceUrl })}](${targetUrl})`;

  return {
    claim_id: claimUrl,
    statement,
    confidence,
    article_title: articleTitle,
    article_url: articleUrl,
    source_title: sourceTitle,
    source_url: sourceUrl,
    source_tier: sourceTier,
    source_type: sourceType,
    anchorfact_url: targetUrl,
    inline,
    markdown: `- ${statement} ${inline}`
  };
}

export function buildClaimCitationExports({ claims = [], article, sources = [] }) {
  return claims.map(claim => buildClaimCitationExport({
    claim,
    article,
    source: matchingSource(claim, sources)
  }));
}
