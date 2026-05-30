export const FATAL_DRAFT_REASONS = new Set([
  'broken_atomic_fact',
  'claim_evidence_weak',
  'encoding_mojibake',
  'explicit_draft',
  'estimated_confidence',
  'generic_source_homepage',
  'missing_primary_sources',
  'no_verified_sources',
  'placeholder_content',
  'verification_count_mismatch',
  'yaml_field_damage'
]);

export const AUTO_REPAIR_EXCLUDED_REASONS = new Set([
  'encoding_mojibake',
  'placeholder_content'
]);

const STRICT_REVIEW_RULES = [
  {
    name: 'crisis_or_self_harm',
    pattern: /\b(crisis|hotlines?|suicide|self[-\s]?harm|mental[-\s]?health)\b/i
  },
  {
    name: 'medical_or_public_health',
    pattern: /\b(public[-\s]?health|healthcare|medical|clinical|diagnosis|drug|pharmac|patient|hospital|senior[-\s]?care|ehr|electronic[-\s]?health[-\s]?record)\b/i
  },
  {
    name: 'physical_safety_or_autonomy',
    pattern: /\b(workplace[-\s]?safety|autonomous[-\s]?driving|autonomous[-\s]?vehicle|self[-\s]?driving|safety[-\s]?critical)\b/i
  },
  {
    name: 'legal_or_civic_rights',
    pattern: /\b(predictive[-\s]?policing|surveillance|legal|regtech|compliance|election[-\s]?integrity|civic)\b/i
  },
  {
    name: 'financial_or_insurance',
    pattern: /\b(insurance|insurtech|underwriting|credit|loan|mortgage|payments?|fraud|chargebacks?|merchant[-\s]?risk|algorithmic[-\s]?trading|personal[-\s]?finance|financial|robo[-\s]?advisors?)\b/i
  }
];

const PRIORITY_AREAS = [
  {
    area: 'core_ai',
    priority: 0,
    pattern: /^ai\//
  },
  {
    area: 'technical_reference',
    priority: 1,
    pattern: /^computer-science\//
  },
  {
    area: 'scientific_reference',
    priority: 2,
    pattern: /^science\//
  }
];

function searchableText(article = {}) {
  return [
    article.canonical_slug,
    article.title,
    article.category,
    article.description,
    article.summary
  ]
    .filter(Boolean)
    .join(' ')
    .replace(/[/_]+/g, ' ');
}

export function autoRepairExclusionReasons(reasons = []) {
  return reasons.filter(reason => AUTO_REPAIR_EXCLUDED_REASONS.has(reason));
}

export function repairComplexity(reasons = []) {
  return reasons.filter(reason => FATAL_DRAFT_REASONS.has(reason)).length;
}

export function draftRepairPriorityArea(article = {}) {
  const slug = String(article.canonical_slug || '');
  return PRIORITY_AREAS.find(item => item.pattern.test(slug))?.area || 'general_reference';
}

export function draftRepairPriority(article = {}) {
  const slug = String(article.canonical_slug || '');
  return PRIORITY_AREAS.find(item => item.pattern.test(slug))?.priority ?? 3;
}

export function draftRepairPriorityMetadata(article = {}) {
  return {
    repair_priority_area: draftRepairPriorityArea(article),
    repair_priority: draftRepairPriority(article)
  };
}

export function strictReviewReasons(article = {}) {
  const text = searchableText(article);
  return STRICT_REVIEW_RULES
    .filter(rule => rule.pattern.test(text))
    .map(rule => rule.name);
}

export function compareDraftRepairCandidates(a, b) {
  return draftRepairPriority(a) - draftRepairPriority(b)
    || a.repair_complexity - b.repair_complexity
    || (b.sources_total || 0) - (a.sources_total || 0)
    || String(a.canonical_slug).localeCompare(String(b.canonical_slug));
}
