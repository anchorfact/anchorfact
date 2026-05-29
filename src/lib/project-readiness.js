function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function ratioFromMapping(mapping = {}) {
  const total = Number(mapping.total || 0);
  const mapped = Number(mapping.mapped || 0);
  if (Number.isFinite(mapping.ratio)) return clamp(Number(mapping.ratio), 0, 1);
  if (total <= 0) return 1;
  return clamp(mapped / total, 0, 1);
}

function gradeForScore(score) {
  if (score >= 95) return 'excellent';
  if (score >= 85) return 'strong';
  if (score >= 70) return 'needs_attention';
  return 'blocked';
}

function nextActionsForFocus(focus) {
  const actions = {
    repair_public_audit: [
      {
        area: 'public_trust',
        action: 'Repair or demote public entries with actionable audit recommendations before expanding the corpus.'
      },
      {
        area: 'verification',
        action: 'Re-run full public audit after each small repair batch and keep production integrity green.'
      }
    ],
    complete_public_source_coverage: [
      {
        area: 'public_source_coverage',
        action: 'Finish source coverage and claim mapping gaps on already-public articles before publishing more drafts.'
      },
      {
        area: 'ai_reliability',
        action: 'Keep representative query evals passing while source coverage changes.'
      }
    ],
    refresh_stale_docs: [
      {
        area: 'documentation',
        action: 'Update stale launch and count references so public docs match signed production artifacts.'
      }
    ],
    prioritize_draft_repair_queue: [
      {
        area: 'draft_asset_pipeline',
        action: 'Repair the next small draft batch from the existing queue, then promote only entries that pass public audit.'
      },
      {
        area: 'measurement',
        action: 'Prefer draft topics that improve representative AI query coverage instead of broad undifferentiated expansion.'
      }
    ],
    raise_public_confidence_selectively: [
      {
        area: 'public_confidence',
        action: 'Improve low-confidence public articles selectively where better sources can raise answer quality.'
      }
    ],
    maintain_and_measure_ai_usage: [
      {
        area: 'measurement',
        action: 'Keep representative AI evals aligned with real usage before broad expansion.'
      }
    ]
  };
  return actions[focus] || actions.maintain_and_measure_ai_usage;
}

export function buildProjectReadiness({
  publicArticles = 0,
  publicAuditActionableCount = 0,
  publicSourceCoverage = {},
  publicClaimMapping = {},
  publicLowConfidenceCount = 0,
  staleDocsCount = 0,
  draftRepairCandidateCount = 0,
  draftRepairExcludedCount = 0
} = {}) {
  const coverage = {
    full: Number(publicSourceCoverage.full || 0),
    partial: Number(publicSourceCoverage.partial || 0),
    zero: Number(publicSourceCoverage.zero || 0)
  };
  const sourceGapArticles = coverage.partial + coverage.zero;
  const claimMappingRatio = ratioFromMapping(publicClaimMapping);
  const lowConfidenceRatio = publicArticles > 0 ? clamp(Number(publicLowConfidenceCount || 0) / publicArticles, 0, 1) : 0;

  const penalties = {
    public_audit_actionable: Math.min(40, Number(publicAuditActionableCount || 0) * 8),
    public_source_coverage_gap: Math.min(25, coverage.zero * 5 + coverage.partial * 2),
    public_claim_mapping_gap: Math.round((1 - claimMappingRatio) * 25),
    stale_docs: Math.min(10, Number(staleDocsCount || 0) * 3),
    public_low_confidence: Math.min(8, Math.round(lowConfidenceRatio * 20)),
    draft_backlog: draftRepairCandidateCount > 0
      ? Math.min(8, 3 + Math.floor(Number(draftRepairCandidateCount || 0) / 100))
      : 0
  };
  const score = clamp(100 - Object.values(penalties).reduce((sum, value) => sum + value, 0), 0, 100);

  const blockers = [];
  if (publicAuditActionableCount > 0) {
    blockers.push({
      id: 'public_audit_actionable',
      count: publicAuditActionableCount,
      severity: 'high'
    });
  }
  if (sourceGapArticles > 0) {
    blockers.push({
      id: 'public_source_coverage_gap',
      count: sourceGapArticles,
      severity: coverage.zero > 0 ? 'high' : 'medium'
    });
  }
  if (claimMappingRatio < 1) {
    blockers.push({
      id: 'public_claim_mapping_gap',
      count: Number(publicClaimMapping.total || 0) - Number(publicClaimMapping.mapped || 0),
      severity: 'medium'
    });
  }
  if (staleDocsCount > 0) {
    blockers.push({
      id: 'stale_docs',
      count: staleDocsCount,
      severity: 'low'
    });
  }

  let nextFocus = 'maintain_and_measure_ai_usage';
  if (publicAuditActionableCount > 0) nextFocus = 'repair_public_audit';
  else if (sourceGapArticles > 0 || claimMappingRatio < 1) nextFocus = 'complete_public_source_coverage';
  else if (staleDocsCount > 0) nextFocus = 'refresh_stale_docs';
  else if (draftRepairCandidateCount > 0) nextFocus = 'prioritize_draft_repair_queue';
  else if (lowConfidenceRatio >= 0.1) nextFocus = 'raise_public_confidence_selectively';

  return {
    score_100: score,
    grade: gradeForScore(score),
    next_focus: nextFocus,
    blockers,
    next_actions: nextActionsForFocus(nextFocus),
    signals: {
      public_audit_actionable_count: Number(publicAuditActionableCount || 0),
      public_source_gap_articles: sourceGapArticles,
      public_claim_mapping_ratio: Number(claimMappingRatio.toFixed(4)),
      public_low_confidence_ratio: Number(lowConfidenceRatio.toFixed(4)),
      stale_docs_count: Number(staleDocsCount || 0),
      draft_repair_candidate_count: Number(draftRepairCandidateCount || 0),
      draft_repair_excluded_count: Number(draftRepairExcludedCount || 0)
    },
    penalties
  };
}
