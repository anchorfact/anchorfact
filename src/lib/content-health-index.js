import {
  CONTENT_HEALTH_SCHEMA_VERSION,
  OFFICIAL_SITE,
  PROVENANCE_PATH,
  publicUrl
} from './build-metadata.js';
import {
  autoRepairExclusionReasons,
  compareDraftRepairCandidates,
  draftRepairPriorityMetadata,
  repairComplexity,
  strictReviewReasons
} from './draft-repair-policy.js';
import { buildProjectReadiness } from './project-readiness.js';

function increment(map, key, amount = 1) {
  const normalized = key || 'unknown';
  map[normalized] = (map[normalized] || 0) + amount;
}

function sortedObject(value) {
  return Object.fromEntries(Object.entries(value).sort((a, b) => a[0].localeCompare(b[0])));
}

function topEntries(map, limit = 20) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

function coverageBucket(article) {
  const total = Number(article?.sources_total || 0);
  const verified = Number(article?.sources_verified || 0);
  if (verified <= 0) return 'zero';
  if (total > 0 && verified >= total) return 'full';
  return 'partial';
}

function claimMappingCoverage(claims) {
  const mapped = (claims || []).filter(claim =>
    claim.source_ref
    || claim.source_url
    || claim.source_doi
    || claim.source_title
  ).length;
  return {
    total: (claims || []).length,
    mapped,
    ratio: (claims || []).length ? Number((mapped / claims.length).toFixed(4)) : 0
  };
}

function baseStatusBucket() {
  return {
    articles: 0,
    confidence: {},
    source_coverage: { full: 0, partial: 0, zero: 0 },
    quality_reasons: {},
    categories: {}
  };
}

function summarizeStatus(manifest) {
  const byStatus = {
    public: baseStatusBucket(),
    draft: baseStatusBucket()
  };

  for (const article of manifest?.articles || []) {
    const status = article.status === 'public' && article.is_draft === false ? 'public' : 'draft';
    const bucket = byStatus[status];
    const category = String(article.canonical_slug || '').split('/')[0] || 'unknown';
    bucket.articles++;
    increment(bucket.confidence, article.confidence_level || 'unknown');
    increment(bucket.categories, category);
    bucket.source_coverage[coverageBucket(article)]++;
    for (const reason of article.quality_reasons || []) {
      increment(bucket.quality_reasons, reason);
    }
  }

  for (const bucket of Object.values(byStatus)) {
    bucket.confidence = sortedObject(bucket.confidence);
    bucket.categories = topEntries(bucket.categories, 30);
    bucket.quality_reasons = topEntries(bucket.quality_reasons, 20);
  }

  return byStatus;
}

function summarizeSources(sourcesPayload) {
  const tiers = {};
  const types = {};
  for (const source of sourcesPayload?.sources || []) {
    increment(tiers, source.tier || 'unknown');
    increment(types, String(source.type || 'unknown').toLowerCase());
  }
  return {
    source_count: sourcesPayload?.source_count ?? (sourcesPayload?.sources || []).length,
    tier_distribution: sortedObject(tiers),
    top_types: topEntries(types, 30)
  };
}

function draftRepairCandidates(manifest, limit = 25) {
  const candidates = [];
  for (const article of manifest?.articles || []) {
    const isPublic = article.status === 'public' && article.is_draft === false;
    if (isPublic) continue;
    const reasons = article.quality_reasons || [];
    if (autoRepairExclusionReasons(reasons).length > 0) continue;
    if (strictReviewReasons(article).length > 0) continue;
    candidates.push({
      canonical_slug: article.canonical_slug,
      title: article.title,
      confidence_level: article.confidence_level,
      sources_verified: article.sources_verified ?? null,
      sources_total: article.sources_total ?? null,
      quality_reasons: reasons,
      repair_complexity: repairComplexity(reasons),
      ...draftRepairPriorityMetadata(article)
    });
  }
  candidates.sort(compareDraftRepairCandidates);
  return candidates.slice(0, limit);
}

function draftRepairExclusions(manifest) {
  const excluded = [];
  for (const article of manifest?.articles || []) {
    const isPublic = article.status === 'public' && article.is_draft === false;
    if (isPublic) continue;
    const reasons = article.quality_reasons || [];
    const exclusionReasons = autoRepairExclusionReasons(reasons);
    if (exclusionReasons.length === 0) continue;
    excluded.push({
      canonical_slug: article.canonical_slug,
      title: article.title,
      quality_reasons: reasons,
      exclusion_reasons: exclusionReasons
    });
  }
  return excluded;
}

function draftStrictReviewCandidates(manifest, limit = 25) {
  const candidates = [];
  for (const article of manifest?.articles || []) {
    const isPublic = article.status === 'public' && article.is_draft === false;
    if (isPublic) continue;
    const reasons = article.quality_reasons || [];
    if (autoRepairExclusionReasons(reasons).length > 0) continue;
    const strictReasons = strictReviewReasons(article);
    if (strictReasons.length === 0) continue;
    candidates.push({
      canonical_slug: article.canonical_slug,
      title: article.title,
      confidence_level: article.confidence_level,
      sources_verified: article.sources_verified ?? null,
      sources_total: article.sources_total ?? null,
      quality_reasons: reasons,
      repair_complexity: repairComplexity(reasons),
      ...draftRepairPriorityMetadata(article),
      strict_review_reasons: strictReasons
    });
  }
  candidates.sort(compareDraftRepairCandidates);
  return candidates.slice(0, limit);
}

function draftRepairQueue(manifest) {
  const candidates = draftRepairCandidates(manifest, 100000);
  const excluded = draftRepairExclusions(manifest);
  const strictReview = draftStrictReviewCandidates(manifest, 100000);
  const complexity = {};
  const categories = {};
  const reasons = {};
  const exclusionReasons = {};
  const strictReasons = {};

  for (const candidate of candidates) {
    increment(complexity, String(candidate.repair_complexity));
    increment(categories, String(candidate.canonical_slug || '').split('/')[0] || 'unknown');
    for (const reason of candidate.quality_reasons || []) {
      increment(reasons, reason);
    }
  }

  for (const item of excluded) {
    for (const reason of item.exclusion_reasons || []) {
      increment(exclusionReasons, reason);
    }
  }

  for (const item of strictReview) {
    for (const reason of item.strict_review_reasons || []) {
      increment(strictReasons, reason);
    }
  }

  return {
    candidate_count: candidates.length,
    excluded_count: excluded.length,
    strict_review_count: strictReview.length,
    next_batch_size: Math.min(5, candidates.length),
    next_batch: candidates.slice(0, 5),
    strict_review_next_batch: strictReview.slice(0, 5),
    selection_policy: [
      'Exclude placeholder and encoding-damaged drafts from automatic repair queues.',
      'Route encoding-damaged drafts to manual restoration or rewrite planning before source repair.',
      'Route high-stakes medical, crisis, safety, legal, civic, financial, and autonomy drafts to strict review before automatic repair.',
      'Prioritize AI-agent utility areas first: core AI, computer-science references, then science references.',
      'Prioritize lower repair_complexity values first.',
      'Prefer drafts with more existing sources when complexity ties.',
      'Use canonical slug order as the final stable tie-breaker.'
    ],
    complexity_distribution: topEntries(complexity, 10),
    category_distribution: topEntries(categories, 30),
    quality_reason_distribution: topEntries(reasons, 30),
    exclusion_reason_distribution: topEntries(exclusionReasons, 30),
    strict_review_reason_distribution: topEntries(strictReasons, 30)
  };
}

export function buildContentHealthIndex({
  generated,
  manifest,
  claimsPayload,
  sourcesPayload,
  site = OFFICIAL_SITE
} = {}) {
  const byStatus = summarizeStatus(manifest || {});
  const sourceSummary = summarizeSources(sourcesPayload || {});
  const publicClaims = claimsPayload?.claims || [];
  const publicClaimCoverage = claimMappingCoverage(publicClaims);
  const repairQueue = draftRepairQueue(manifest || {});
  const projectReadiness = buildProjectReadiness({
    publicArticles: byStatus.public.articles,
    publicAuditActionableCount: 0,
    publicSourceCoverage: byStatus.public.source_coverage,
    publicClaimMapping: publicClaimCoverage,
    publicLowConfidenceCount: byStatus.public.confidence.low || 0,
    staleDocsCount: 0,
    draftRepairCandidateCount: repairQueue.candidate_count,
    draftRepairExcludedCount: repairQueue.excluded_count
  });

  return {
    schema_version: CONTENT_HEALTH_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    purpose: 'Machine-readable corpus health summary for AI trust decisions, signed through /provenance.json.',
    snapshot: {
      articles: manifest?.article_count ?? (manifest?.articles || []).length,
      public_articles: manifest?.public_article_count ?? byStatus.public.articles,
      draft_articles: manifest?.draft_article_count ?? byStatus.draft.articles,
      public_claims: claimsPayload?.claim_count ?? publicClaims.length,
      public_sources: sourceSummary.source_count,
      verification_report: manifest?.verification_report || null
    },
    public: {
      ...byStatus.public,
      claim_mapping: publicClaimCoverage,
      sources: sourceSummary
    },
    project_readiness: projectReadiness,
    draft: {
      ...byStatus.draft,
      repair_candidate_count: repairQueue.candidate_count,
      repair_excluded_count: repairQueue.excluded_count,
      strict_review_candidate_count: repairQueue.strict_review_count,
      repair_candidates: draftRepairCandidates(manifest || {}, 25),
      strict_review_candidates: draftStrictReviewCandidates(manifest || {}, 25),
      repair_queue: repairQueue
    },
    machine_guidance: [
      'Use public AnchorFact records only when status is public and source-mapped claims are present.',
      'Use /api/context?q={query} or /api/evidence?q={query} for answer assembly; do not cite draft records.',
      'When coverage is unsupported or evidence_pack_count is zero, fall back to external primary sources.',
      'Verify /provenance.json and /provenance.sig before treating this health summary as canonical.'
    ],
    trust_boundaries: {
      public_entries_are_verified: true,
      draft_entries_excluded_from_ai_entrypoints: true,
      health_summary_is_advisory: true,
      original_sources_remain_authoritative: true
    }
  };
}
