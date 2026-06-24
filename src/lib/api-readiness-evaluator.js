import { buildCiteApiPayload } from './cite-api.js';
import { buildContextApiPayload } from './context-api.js';
import { buildEvidenceApiPayload } from './evidence-api.js';
import { API_READINESS_SCHEMA_VERSION } from './api-readiness-renderer.js';
import { OFFICIAL_SITE, PROVENANCE_PATH, publicUrl } from './build-metadata.js';
import {
  API_READINESS_TARGET_RATIO,
  CORE_CORPUS_QUERIES,
  UNSUPPORTED_FALLBACK_QUERY
} from './api-readiness-query-set.js';

const BLOCKED_QUALITY_REASONS = new Set([
  'generic_source_homepage',
  'placeholder_content',
  'broken_atomic_fact',
  'claim_evidence_weak',
  'missing_source_url',
  'missing_atomic_facts'
]);

const HIGH_RISK_UNSUPPORTED_CLAIM_PATTERN = /\b(?:price|pricing|market share|revenue|latest|today|currently|as of|announced|released)\b/i;

function ratio(part, total, digits = 4) {
  if (!total) return 0;
  return Number((Number(part || 0) / Number(total || 0)).toFixed(digits));
}

function optionalFiniteNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function currentPublicAuditActionableCount(artifacts) {
  const contentHealth = artifacts?.contentHealthPayload || {};
  return optionalFiniteNumber(
    contentHealth.public_audit?.actionable_count
      ?? contentHealth.project_readiness?.signals?.public_audit_actionable_count
  );
}

function articleBySlug(manifest, slug) {
  return (manifest?.articles || []).find(article => article?.canonical_slug === slug) || null;
}

function claimsForSlug(claimsPayload, slug) {
  return (claimsPayload?.claims || []).filter(claim => claim?.canonical_slug === slug);
}

function sourcesForSlug(sourcesPayload, slug) {
  return (sourcesPayload?.sources || []).filter(source =>
    (source?.articles || []).some(article => article?.canonical_slug === slug)
  );
}

function queryDefinitions(querySet = CORE_CORPUS_QUERIES) {
  return querySet.map((item, index) => ({
    id: item.id || `query_${String(index + 1).padStart(3, '0')}`,
    category: item.category || 'custom',
    expected_slug: item.expected_slug || item.slug || null,
    query: item.query || item.title || String(item.expected_slug || item.slug || '')
  }));
}

function hasExpectedSlug(payload, expectedSlug) {
  if (!expectedSlug) return true;
  const matchedSlugs = [
    ...(payload?.matched_articles || []).map(article => article?.canonical_slug),
    ...(payload?.evidence_packs || []).map(pack => pack?.canonical_slug),
    ...(payload?.packs || []).map(pack => pack?.canonical_slug)
  ].filter(Boolean);
  return matchedSlugs.includes(expectedSlug);
}

function firstSourceMappedCitationFromEvidence(payload) {
  for (const pack of payload?.packs || []) {
    for (const citation of pack?.citation_exports || []) {
      if (citation?.claim_id && citation?.source_url) return citation;
    }
  }
  return null;
}

function firstSourceMappedCitationFromContext(payload) {
  return (payload?.citation_ready_claims || []).find(citation =>
    citation?.claim_id && citation?.source_url
  ) || null;
}

function summarizeRows(rows) {
  const passed = rows.filter(row => row.ok).length;
  return {
    count: rows.length,
    passed,
    failed: rows.length - passed,
    pass_ratio: ratio(passed, rows.length)
  };
}

export function evaluateCoreCorpus({
  manifest,
  claimsPayload,
  sourcesPayload = null,
  querySet = CORE_CORPUS_QUERIES
} = {}) {
  const rows = queryDefinitions(querySet).map(query => {
    const article = articleBySlug(manifest, query.expected_slug);
    const claims = claimsForSlug(claimsPayload, query.expected_slug);
    const mappedSources = sourcesForSlug(sourcesPayload, query.expected_slug);
    const qualityReasons = article?.quality_reasons || [];
    const blockedReasons = qualityReasons.filter(reason => BLOCKED_QUALITY_REASONS.has(reason));
    const unsupportedClaimFlags = claims.filter(claim =>
      HIGH_RISK_UNSUPPORTED_CLAIM_PATTERN.test(claim?.statement || '')
      && !claim?.source_url
    );
    const verifiedSources = Number(article?.sources_verified ?? mappedSources.length ?? 0);
    const failures = [
      !article ? 'missing_public_article' : null,
      article && article.status !== 'public' ? `status_${article.status || 'unknown'}` : null,
      article && article.is_draft === true ? 'is_draft' : null,
      verifiedSources < 2 ? `verified_sources_${verifiedSources}_below_2` : null,
      claims.length < 3 ? `source_mapped_claims_${claims.length}_below_3` : null,
      blockedReasons.length > 0 ? `blocked_quality_reasons:${blockedReasons.join(',')}` : null,
      unsupportedClaimFlags.length > 0 ? `unsupported_current_or_pricing_claims:${unsupportedClaimFlags.length}` : null
    ].filter(Boolean);

    return {
      id: query.id,
      category: query.category,
      query: query.query,
      expected_slug: query.expected_slug,
      title: article?.title || null,
      ok: failures.length === 0,
      status: article?.status || 'missing',
      verified_sources: verifiedSources,
      source_mapped_claims: claims.length,
      mapped_sources: mappedSources.length,
      failures
    };
  });

  const summary = summarizeRows(rows);
  return {
    ...summary,
    target_ratio: API_READINESS_TARGET_RATIO,
    status: summary.pass_ratio >= API_READINESS_TARGET_RATIO ? 'met' : 'below_target',
    rows,
    failures: rows.filter(row => !row.ok)
  };
}

export function evaluateReadinessQuery({ query, artifacts, generated }) {
  const failures = [];
  const contextResult = buildContextApiPayload({
    query: query.query,
    limit: 3,
    generated,
    ...artifacts
  });
  const contextPayload = contextResult.payload || {};
  const contextCitation = firstSourceMappedCitationFromContext(contextPayload);

  if (!contextResult.ok || contextResult.status !== 200) failures.push('context_non_200');
  if (contextPayload.answer_policy?.can_answer_with_anchorfact !== true) failures.push('context_cannot_answer');
  if (!contextCitation) failures.push('context_missing_source_mapped_citation');
  if (!hasExpectedSlug(contextPayload, query.expected_slug)) failures.push('context_expected_slug_not_matched');

  const evidenceResult = buildEvidenceApiPayload({
    query: query.query,
    limit: 3,
    generated,
    manifest: artifacts.manifest,
    claimsPayload: artifacts.claimsPayload,
    sourcesPayload: artifacts.sourcesPayload,
    searchIndex: artifacts.searchIndex,
    rankedResults: contextPayload.matched_articles || null
  });
  const evidencePayload = evidenceResult.payload || {};
  const evidenceCitation = firstSourceMappedCitationFromEvidence(evidencePayload);
  if (!evidenceResult.ok || evidenceResult.status !== 200) failures.push('evidence_non_200');
  if (!Array.isArray(evidencePayload.packs) || evidencePayload.packs.length === 0) failures.push('evidence_no_packs');
  if (!evidenceCitation) failures.push('evidence_missing_source_mapped_citation');
  if (!hasExpectedSlug(evidencePayload, query.expected_slug)) failures.push('evidence_expected_slug_not_matched');

  const claimId = contextCitation?.claim_id || evidenceCitation?.claim_id || null;
  const citeResult = claimId
    ? buildCiteApiPayload({
        claimId,
        generated,
        manifest: artifacts.manifest,
        claimsPayload: artifacts.claimsPayload,
        sourcesPayload: artifacts.sourcesPayload
      })
    : null;
  const citePayload = citeResult?.payload || {};
  const citeSourceUrl = citePayload.citation_export?.source_url || citePayload.source?.url || null;
  if (!claimId) failures.push('cite_no_claim_id_from_context_or_evidence');
  if (claimId && (!citeResult?.ok || citeResult.status !== 200)) failures.push('cite_non_200');
  if (claimId && !citeSourceUrl) failures.push('cite_missing_source_url');

  return {
    id: query.id,
    category: query.category,
    query: query.query,
    expected_slug: query.expected_slug,
    ok: failures.length === 0,
    context: {
      status: contextResult.status,
      coverage_status: contextPayload.coverage_status || null,
      can_answer_with_anchorfact: contextPayload.answer_policy?.can_answer_with_anchorfact ?? null,
      citation_ready_claims: Array.isArray(contextPayload.citation_ready_claims)
        ? contextPayload.citation_ready_claims.length
        : 0,
      top_slug: contextPayload.matched_articles?.[0]?.canonical_slug || contextPayload.evidence_packs?.[0]?.canonical_slug || null
    },
    evidence: {
      status: evidenceResult.status,
      packs: Array.isArray(evidencePayload.packs) ? evidencePayload.packs.length : 0,
      has_source_mapped_citation: Boolean(evidenceCitation),
      top_slug: evidencePayload.packs?.[0]?.canonical_slug || null
    },
    cite: {
      status: citeResult?.status || null,
      claim_id: claimId,
      has_source_url: Boolean(citeSourceUrl)
    },
    failures
  };
}

export function evaluateUnsupportedFallback({
  artifacts,
  query = UNSUPPORTED_FALLBACK_QUERY,
  generated = new Date().toISOString()
} = {}) {
  const result = buildContextApiPayload({
    query,
    limit: 3,
    generated,
    ...artifacts
  });
  const payload = result.payload || {};
  const canAnswer = payload.answer_policy?.can_answer_with_anchorfact === true;
  const mode = payload.answer_policy?.answer_mode || null;
  const ok = result.status === 200
    && canAnswer === false
    && mode === 'external_sources_required';
  return {
    query,
    ok,
    status: result.status,
    coverage_status: payload.coverage_status || null,
    answer_mode: mode,
    can_answer_with_anchorfact: canAnswer,
    failures: ok ? [] : ['unsupported_query_did_not_require_external_sources']
  };
}

export function evaluateContextReadiness({
  artifacts,
  querySet = CORE_CORPUS_QUERIES,
  generated = new Date().toISOString(),
  targetRatio = API_READINESS_TARGET_RATIO
} = {}) {
  const rows = queryDefinitions(querySet).map(query => evaluateReadinessQuery({
    query,
    artifacts,
    generated
  }));
  const summary = summarizeRows(rows);
  const fallback = evaluateUnsupportedFallback({ artifacts, generated });
  return {
    ...summary,
    target_ratio: targetRatio,
    status: summary.pass_ratio >= targetRatio && fallback.ok ? 'met' : 'below_target',
    rows,
    fallback,
    failures: rows.filter(row => !row.ok)
  };
}

function buildNextActions({
  coreCorpus,
  contextScorecard,
  apiPerformanceReport,
  adoptionScorecard,
  designPartnerSignal,
  targetRatio
}) {
  const actions = [];
  if ((coreCorpus.failures || []).length > 0 || coreCorpus.pass_ratio < targetRatio) {
    actions.push('Repair core corpus rows whose failures mention missing_public_article, low verified_sources, or low source_mapped_claims.');
  }
  if ((contextScorecard.failures || []).length > 0 || contextScorecard.pass_ratio < targetRatio) {
    actions.push('For API rows below target, tune article titles/keywords only after confirming source-mapped claims are correct.');
  }
  if (contextScorecard.fallback?.ok !== true) {
    actions.push('Restore unsupported-query fallback behavior so low-coverage answers require external sources instead of overclaiming AnchorFact coverage.');
  }
  if (apiPerformanceReport && apiPerformanceReport.ok !== true) {
    actions.push('Review API performance failures before broadening API usage or promoting paid-beta commitments.');
  }
  actions.push('Continue production:integrity and evals until the 14-day readiness window has real passing history.');
  actions.push('Continue public audit snapshots until the 14-day zero-actionable window has real passing history.');
  const adoptionReadinessStatus = adoptionScorecard?.readiness_ai_primary_to_discovery_target_status
    || adoptionScorecard?.identified_ai_primary_to_discovery_target_status;
  if (adoptionReadinessStatus !== 'met') {
    const measurementScope = adoptionScorecard?.readiness_ai_adoption_scope;
    actions.push(measurementScope === 'interactive_ai'
      ? 'Measure interactive AI primary/discovery usage for a 7-day window before changing paid-beta scope.'
      : 'Measure AI primary/discovery usage for a 7-day window before changing paid-beta scope.');
  }
  actions.push('Keep the free API and no-key public discovery surface until all readiness gates are met for the defined windows.');
  if (designPartnerSignal?.status !== 'met') {
    actions.push('Start paid beta work only after design partner and paid-intent signals are real, not inferred from crawler traffic.');
  }
  return actions;
}

function readinessBlockers(readinessGates) {
  const automatedGateIds = [];
  const manualGateIds = [];
  for (const gate of readinessGates) {
    if (gate.status === 'met') continue;
    if (gate.id === 'design_partners') manualGateIds.push(gate.id);
    else automatedGateIds.push(gate.id);
  }
  return {
    gate_ids: [...automatedGateIds, ...manualGateIds],
    automated_gate_ids: automatedGateIds,
    manual_gate_ids: manualGateIds
  };
}

export function buildApiReadinessReport({
  artifacts,
  querySet = CORE_CORPUS_QUERIES,
  generatedAt = new Date().toISOString(),
  site = OFFICIAL_SITE,
  apiPerformanceReport = null,
  adoptionScorecard = null,
  productionIntegrity = null,
  designPartnerSignal = null,
  targetRatio = API_READINESS_TARGET_RATIO
} = {}) {
  const coreCorpus = evaluateCoreCorpus({
    manifest: artifacts?.manifest,
    claimsPayload: artifacts?.claimsPayload,
    sourcesPayload: artifacts?.sourcesPayload,
    querySet
  });
  const contextScorecard = evaluateContextReadiness({
    artifacts,
    querySet,
    generated: generatedAt,
    targetRatio
  });
  const localReady = coreCorpus.pass_ratio >= targetRatio
    && contextScorecard.pass_ratio >= targetRatio
    && contextScorecard.fallback.ok === true;
  const performanceOk = apiPerformanceReport ? apiPerformanceReport.ok === true : null;
  const artifactBudgetOk = apiPerformanceReport?.artifact_size_budget
    ? apiPerformanceReport.artifact_size_budget.ok === true
    : null;
  const publicAuditActionableCount = currentPublicAuditActionableCount(artifacts);
  const adoptionReadinessScope = adoptionScorecard?.readiness_ai_adoption_scope || 'identified_ai';
  const adoptionReadinessStatus = adoptionScorecard?.readiness_ai_primary_to_discovery_target_status
    || adoptionScorecard?.identified_ai_primary_to_discovery_target_status
    || 'not_measured_in_this_report';
  const adoptionReadinessRatio = adoptionScorecard?.readiness_ai_primary_to_discovery_current_ratio
    ?? adoptionScorecard?.identified_ai_primary_to_discovery_current_ratio
    ?? null;
  const readinessGates = [
    {
      id: 'production_integrity_14_day',
      target: '14 consecutive days production:integrity passing and AI eval 100%',
      status: productionIntegrity?.status || 'not_measured_in_this_report'
    },
    {
      id: 'public_audit_14_day',
      target: '14 consecutive days with 0 move_to_draft / repair_sources public audit findings',
      status: 'not_measured_in_this_report',
      ...(publicAuditActionableCount === null ? {} : { current_actionable_count: publicAuditActionableCount })
    },
    {
      id: 'core_query_context_ratio',
      target: `>=${targetRatio} /api/context citation-ready coverage`,
      status: contextScorecard.pass_ratio >= targetRatio ? 'met' : 'below_target',
      current_ratio: contextScorecard.pass_ratio
    },
    {
      id: 'ai_primary_discovery_ratio_7_day',
      target: '>=0.2 primary/discovery ratio for 7 consecutive days',
      status: adoptionReadinessStatus,
      measurement_scope: adoptionScorecard ? adoptionReadinessScope : null,
      current_ratio: adoptionReadinessRatio,
      current_identified_ratio: adoptionScorecard?.identified_ai_primary_to_discovery_current_ratio ?? null,
      current_interactive_ratio: adoptionScorecard?.interactive_ai_primary_to_discovery_current_ratio ?? null,
      current_crawler_ratio: adoptionScorecard?.crawler_ai_primary_to_discovery_ratio ?? null
    },
    {
      id: 'design_partners',
      target: '>=3 real external design partners and >=1 paid-intent signal',
      status: designPartnerSignal?.status || 'manual_validation_required',
      ...(designPartnerSignal?.external_design_partner_count === undefined || designPartnerSignal?.external_design_partner_count === null
        ? {}
        : { current_partner_count: designPartnerSignal.external_design_partner_count }),
      ...(designPartnerSignal?.paid_intent_signal_count === undefined || designPartnerSignal?.paid_intent_signal_count === null
        ? {}
        : { current_paid_intent_count: designPartnerSignal.paid_intent_signal_count })
    }
  ];

  return {
    schema_version: API_READINESS_SCHEMA_VERSION,
    generated: generatedAt,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    report_only: true,
    build_should_fail: false,
    target_ratio: targetRatio,
    status: localReady
      ? 'foundation_ready_pending_14_day_and_partner_signals'
      : 'building_foundation',
    subscription_ready: false,
    readiness_gates: readinessGates,
    readiness_blockers: readinessBlockers(readinessGates),
    core_corpus: coreCorpus,
    api_scorecard: contextScorecard,
    api_performance: apiPerformanceReport
      ? {
          ok: apiPerformanceReport.ok,
          case_count: apiPerformanceReport.case_count,
          passed: apiPerformanceReport.passed,
          failed: apiPerformanceReport.failed,
          artifact_size_budget_ok: artifactBudgetOk,
          failures: apiPerformanceReport.failures || []
        }
      : { status: 'not_provided' },
    production_health: productionIntegrity || { status: 'not_provided' },
    adoption_signal: adoptionScorecard || { status: 'not_provided' },
    design_partner_signal: designPartnerSignal || { status: 'not_provided' },
    next_actions: buildNextActions({
      coreCorpus,
      contextScorecard,
      apiPerformanceReport,
      adoptionScorecard,
      designPartnerSignal,
      targetRatio
    })
  };
}
