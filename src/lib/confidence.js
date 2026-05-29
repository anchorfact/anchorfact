/**
 * AnchorFact 共享置信度公式模块
 * 
 * compile.js 和 verify-sources.js 共用此公式。
 * 单一真理来源 (Single Source of Truth)。
 */

// ---- Source Tier Classification ----

const S_TIER_TYPES = new Set(['standard', 'patent', 'rfc']);
const A_TIER_TYPES = new Set([
  'academic_paper',
  'journal_article',
  'conference_paper',
  'survey_paper',
  'academic_article',
  'government_report',
  'official_report',
  'research_report',
  'technical_report',
  'industry_whitepaper',
  'textbook',
  'open_textbook',
  'course_material'
]);
const B_TIER_TYPES = new Set([
  'blog_post',
  'documentation',
  'government_reference',
  'official_record',
  'reference',
  'rulebook',
  'sports_rulebook',
  'professional_resource',
  'book',
  'book_chapter',
  'textbook_chapter',
  'open_textbook_chapter',
  'literature',
  'museum_archive',
  'software_repository',
  'repository',
  'whitepaper',
  'experience_report',
  'design_reference',
  'government_statement',
  'encyclopedia',
  'article'
]);
const SOURCE_TYPE_ALIASES = new Map([
  ['technical_specification', 'standard'],
  ['specification', 'standard'],
  ['industry_standard', 'standard'],
  ['government_standard', 'standard'],
  ['professional_standard', 'standard'],
  ['standard_resource', 'standard'],
  ['draft_standard', 'standard'],
  ['policy_report', 'government_report'],
  ['scientific_report', 'research_report'],
  ['consensus_report', 'research_report'],
  ['assessment_report', 'research_report'],
  ['scientific_assessment', 'research_report'],
  ['industry_report', 'research_report'],
  ['product_report', 'technical_report'],
  ['regulatory_report', 'government_report'],
  ['research_publication', 'academic_article'],
  ['report', 'research_report'],
  ['dataset_paper', 'academic_paper'],
  ['software_paper', 'academic_paper'],
  ['historical_paper', 'academic_paper'],
  ['organizational_research', 'research_report'],
  ['research_project', 'research_report'],
  ['technical_documentation', 'documentation'],
  ['official_documentation', 'documentation'],
  ['platform_documentation', 'documentation'],
  ['product_documentation', 'documentation'],
  ['developer_documentation', 'documentation'],
  ['seller_documentation', 'documentation'],
  ['pricing_documentation', 'documentation'],
  ['release_notes', 'documentation'],
  ['government_document', 'government_reference'],
  ['government_resource', 'government_reference'],
  ['government_guidance', 'government_reference'],
  ['government_framework', 'government_reference'],
  ['government_guideline', 'government_reference'],
  ['government_database', 'government_reference'],
  ['government_record', 'official_record'],
  ['government_announcement', 'government_statement'],
  ['government_project', 'government_reference'],
  ['government_statistics', 'government_reference'],
  ['government_program', 'government_reference'],
  ['government_data_service', 'government_reference'],
  ['government_article', 'government_reference'],
  ['government_guide', 'government_reference'],
  ['official_guideline', 'professional_resource'],
  ['official_reference', 'reference'],
  ['official_policy', 'government_statement'],
  ['regulatory_guidance', 'government_reference'],
  ['legislation', 'official_record'],
  ['regulation', 'official_record'],
  ['constitution', 'official_record'],
  ['technical_reference', 'reference'],
  ['academic_reference', 'reference'],
  ['industry_reference', 'reference'],
  ['institutional_reference', 'reference'],
  ['educational_reference', 'reference'],
  ['medical_reference', 'reference'],
  ['sports_reference', 'reference'],
  ['reference_article', 'reference'],
  ['encyclopedia_entry', 'encyclopedia'],
  ['design_guideline', 'design_reference'],
  ['technical_article', 'article'],
  ['institutional_article', 'article'],
  ['space_agency_article', 'article'],
  ['management_article', 'article'],
  ['museum_reference', 'museum_archive'],
  ['museum_collection', 'museum_archive'],
  ['museum_record', 'museum_archive'],
  ['museum_essay', 'museum_archive'],
  ['museum_article', 'museum_archive'],
  ['world_heritage_record', 'official_record'],
  ['heritage_record', 'official_record'],
  ['heritage_site', 'official_record'],
  ['primary_document', 'official_record'],
  ['primary_source', 'official_record'],
  ['transparency_report', 'official_report'],
  ['professional_guidance', 'professional_resource'],
  ['medical_guideline', 'professional_resource'],
  ['health_guidance', 'professional_resource'],
  ['accessibility_guideline', 'professional_resource'],
  ['security_guidance', 'professional_resource'],
  ['security_framework', 'professional_resource'],
  ['framework', 'professional_resource'],
  ['program_page', 'reference'],
  ['project_page', 'reference'],
  ['topic_page', 'reference'],
  ['book_page', 'reference'],
  ['methodology_page', 'reference'],
  ['research_page', 'reference'],
  ['research_catalog', 'reference'],
  ['academic_project', 'reference'],
  ['conference_keynote', 'reference'],
  ['book_summary', 'reference'],
  ['database', 'reference'],
  ['dataset', 'reference'],
  ['package_index', 'software_repository'],
  ['software', 'software_repository'],
  ['community_standard', 'official_record'],
  ['marketplace_policy', 'official_record'],
  ['position_stand', 'official_record'],
  ['auction_record', 'official_record'],
  ['press_release', 'article'],
  ['announcement', 'article'],
  ['official_blog', 'blog_post'],
  ['technical_blog', 'blog_post'],
  ['research_blog', 'blog_post'],
  ['explainer', 'article'],
  ['education_resource', 'course_material'],
  ['educational_resource', 'course_material'],
  ['teaching_note', 'course_material'],
  ['business_guide', 'reference'],
  ['guide', 'reference']
]);

function normalizeSourceType(type) {
  const normalized = String(type || '').trim().toLowerCase();
  return SOURCE_TYPE_ALIASES.get(normalized) || normalized;
}

export function classifySourceTier(source) {
  if (source.doi) return 'S';
  const type = normalizeSourceType(source.type);
  if (S_TIER_TYPES.has(type)) return 'S';
  if (A_TIER_TYPES.has(type)) return 'A';
  if (B_TIER_TYPES.has(type)) return 'B';
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
  let verifiedCoverage = null;
  let verifiedSourceCount = 0;

  if (verificationData && verificationData.sources_total > 0) {
    const vTotal = verificationData.sources_total;
    const vVerified = verificationData.sources_verified || 0;
    const verifiedRatio = vTotal > 0 ? vVerified / vTotal : 0;
    verifiedCoverage = verifiedRatio;
    verifiedSourceCount = vVerified;
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

  const rawLevel = score >= 0.85 ? 'high' : score >= 0.60 ? 'medium' : 'low';
  let level = rawLevel;
  const highConfidenceEvidenceGap = scoreBasis === 'verified_sources' &&
    rawLevel === 'high' &&
    (verifiedCoverage === null || verifiedCoverage < 0.5 || verifiedSourceCount < 2);
  // Hard constraint: estimated basis cannot be 'high'
  if (scoreBasis === 'estimated' && level === 'high') level = 'medium';
  // High confidence requires meaningful verified coverage and at least two verified sources.
  if (highConfidenceEvidenceGap) {
    level = 'medium';
  }
  const rank = { low: 1, medium: 2, high: 3 };
  const editorialConfidence = String(article.confidence || '').toLowerCase();
  if (rank[editorialConfidence] && rank[editorialConfidence] < rank[level]) {
    level = editorialConfidence;
  }

  return {
    score,
    level,
    formula_version: 'v1.0',
    inputs: {
      source_tier: bestTier,
      source_count: sourceCountScore,
      source_verified: sourceVerifiedScore,
      verified_coverage: verifiedCoverage,
      verified_source_count: verifiedSourceCount,
      high_confidence_evidence_gap: highConfidenceEvidenceGap,
      editorial_confidence: rank[editorialConfidence] ? editorialConfidence : null,
      freshness: maxFreshness,
      decay: decayScore,
      based_on: scoreBasis
    }
  };
}
