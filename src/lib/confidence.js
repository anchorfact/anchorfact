/**
 * AnchorFact 共享置信度公式模块
 * 
 * compile.js 和 verify-sources.js 共用此公式。
 * 单一真理来源 (Single Source of Truth)。
 */

// ---- Source Tier Classification ----

export function classifySourceTier(source) {
  if (source.doi) return 'S';
  if (source.type === 'standard') return 'S';
  if (source.type === 'patent' || source.type === 'rfc') return 'S';
  if (source.type === 'academic_paper' || source.type === 'course_material') return 'A';
  if (source.type === 'government_report' || source.type === 'industry_whitepaper') return 'A';
  if (source.type === 'blog_post' && source.institution) return 'B';
  if (source.type === 'blog_post') return 'B';
  return 'C';
}

// ---- Freshness Score ----

export function computeFreshnessScore(source) {
  const year = source.year || 0;
  if (!year) return 0.5;
  const ageYears = new Date().getFullYear() - year;
  if (ageYears <= 1) return 1.0;
  if (ageYears <= 3) return 0.9;
  if (ageYears <= 5) return 0.7;
  if (ageYears <= 10) return 0.5;
  return 0.3;
}

/**
 * AnchorFact 公开置信度公式 v1.0
 * 
 * 公式：score = source_tier×0.35 + source_count×0.20 + source_verified×0.25 + freshness×0.10 - decay×0.10
 * 
 * @param {Array} sources - primary_sources 数组 [{ title, type, year, doi, url }]
 * @param {Object} article - frontmatter 对象 { disputed_statements, known_gaps }
 * @param {Object|null} verificationData - 来自 verification-report.json 的验证结果（可选）
 * @returns {{ score: number, level: string, inputs: Object }}
 */
export function computeConfidence(sources, article = {}, verificationData = null) {
  if (!sources || sources.length === 0) {
    return { score: 0, level: 'low', inputs: {} };
  }

  const tierMap = { 'S': 1.0, 'A': 0.9, 'B': 0.6, 'C': 0.3, 'D': 0 };
  const tiers = sources.map(s => tierMap[classifySourceTier(s)] || 0.3);
  const bestTier = Math.max(...tiers);

  const count = sources.length;
  const sourceCountScore = count >= 3 ? 1.0 : count >= 2 ? 0.8 : 0.5;

  // 来源可验证性
  const hasDoi = sources.some(s => s.doi);
  const hasDoiVerified = verificationData?.verification_results?.some(vr =>
    vr.results?.some(r => r.method === 'doi' && r.verified)
  );
  let sourceVerifiedScore;
  let scoreBasis = 'estimated';

  if (verificationData && verificationData.sources_total > 0) {
    const vTotal = verificationData.sources_total;
    const vVerified = verificationData.sources_verified || 0;
    const verifiedRatio = vTotal > 0 ? vVerified / vTotal : 0;
    sourceVerifiedScore = hasDoiVerified ? 1.0
      : verifiedRatio >= 0.75 ? 0.9
      : verifiedRatio >= 0.5 ? 0.7
      : verifiedRatio > 0 ? 0.4
      : 0.2;
    scoreBasis = 'verified_sources';
  } else {
    sourceVerifiedScore = hasDoi ? 1.0 : sources.some(s => s.url) ? 0.7 : 0.4;
  }

  const years = sources.map(s => s.year).filter(Boolean);
  const maxFreshness = years.length > 0 ? computeFreshnessScore({ year: Math.max(...years) }) : 0.5;

  const hasDisputed = article.disputed_statements && article.disputed_statements.length > 0;
  const hasKnownGaps = article.known_gaps && article.known_gaps.length > 0;
  const decayScore = (hasDisputed ? 0.2 : 0) + (hasKnownGaps ? 0.1 : 0);

  const score = parseFloat((
    bestTier * 0.35 +
    sourceCountScore * 0.20 +
    sourceVerifiedScore * 0.25 +
    maxFreshness * 0.10 -
    decayScore * 0.10
  ).toFixed(4));

  let level = score >= 0.85 ? 'high' : score >= 0.60 ? 'medium' : 'low';
  // Hard constraint: estimated basis cannot be 'high'
  if (scoreBasis === 'estimated' && level === 'high') level = 'medium';

  return {
    score,
    level,
    formula_version: 'v1.0',
    inputs: {
      source_tier: bestTier,
      source_count: sourceCountScore,
      source_verified: sourceVerifiedScore,
      freshness: maxFreshness,
      decay: decayScore,
      based_on: scoreBasis
    }
  };
}
