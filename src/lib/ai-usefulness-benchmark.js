import { buildContextApiPayload } from './context-api.js';
import { QUERY_BENCHMARK_CASES } from './query-benchmark.js';

export const AI_USEFULNESS_BENCHMARK_SCHEMA_VERSION = 'anchorfact.ai-usefulness-benchmark.v1';

const DEFAULT_MIN_CITATION_READY_CLAIMS = 1;
const DEFAULT_MIN_SOURCES_PER_EXPECTED_PACK = 1;
const DEFAULT_MIN_SCORE = 80;
const PREFERRED_CONFIDENCE = new Set(['high', 'medium']);

function round(value) {
  return Math.round(value * 100) / 100;
}

function expectedPack(payload, slug) {
  return (payload?.evidence_packs || []).find(pack => pack?.canonical_slug === slug) || null;
}

function topPack(payload) {
  return payload?.evidence_packs?.[0] || null;
}

function citationReadyClaims(payload) {
  return Array.isArray(payload?.citation_ready_claims) ? payload.citation_ready_claims : [];
}

function caseScore(checks) {
  const weights = {
    top_result_matches_expected: 20,
    can_answer_with_anchorfact: 20,
    expected_pack_present: 15,
    minimum_citation_ready_claims: 15,
    minimum_sources_per_expected_pack: 10,
    citation_ready_claims_have_source_urls: 10,
    preferred_confidence: 5,
    recommended_source_depth: 5
  };
  return Object.entries(weights).reduce((sum, [key, weight]) => sum + (checks[key] ? weight : 0), 0);
}

function improvementSignals({ pack, citations }) {
  const signals = [];
  if (pack?.confidence_level === 'low') signals.push('low_confidence_top_pack');
  if ((pack?.source_count || 0) < 2) signals.push('single_source_expected_pack');
  if (citations.length < 2) signals.push('thin_citation_ready_claims');
  return signals;
}

export function evaluateAiUsefulnessCase({
  benchmarkCase,
  artifacts,
  generated = new Date().toISOString()
}) {
  const context = buildContextApiPayload({
    query: benchmarkCase.query,
    limit: benchmarkCase.limit || 3,
    generated,
    manifest: artifacts.manifest,
    claimsPayload: artifacts.claimsPayload,
    sourcesPayload: artifacts.sourcesPayload,
    searchIndex: artifacts.searchIndex,
    topicsPayload: artifacts.topicsPayload,
    coveragePayload: artifacts.coveragePayload,
    capabilitiesPayload: artifacts.capabilitiesPayload,
    contentHealthPayload: artifacts.contentHealthPayload
  });
  const payload = context.payload || {};
  const expected = expectedPack(payload, benchmarkCase.expected_top_slug);
  const top = topPack(payload);
  const citations = citationReadyClaims(payload);
  const minClaims = benchmarkCase.min_citation_ready_claims ?? DEFAULT_MIN_CITATION_READY_CLAIMS;
  const minSources = benchmarkCase.min_sources_per_expected_pack ?? DEFAULT_MIN_SOURCES_PER_EXPECTED_PACK;
  const claimsWithSourceUrls = citations.filter(claim => claim?.source_url).length;
  const checks = {
    top_result_matches_expected: top?.canonical_slug === benchmarkCase.expected_top_slug,
    can_answer_with_anchorfact: payload?.answer_policy?.can_answer_with_anchorfact === true,
    expected_pack_present: expected !== null,
    minimum_citation_ready_claims: citations.length >= minClaims,
    minimum_sources_per_expected_pack: (expected?.source_count || 0) >= minSources,
    citation_ready_claims_have_source_urls: claimsWithSourceUrls >= Math.min(minClaims, citations.length),
    preferred_confidence: PREFERRED_CONFIDENCE.has(expected?.confidence_level || ''),
    recommended_source_depth: (expected?.source_count || 0) >= 2
  };
  const failures = [];
  if (!checks.top_result_matches_expected) {
    failures.push(`top result expected ${benchmarkCase.expected_top_slug}, got ${top?.canonical_slug || '(missing)'}`);
  }
  if (!checks.can_answer_with_anchorfact) {
    failures.push('answer_policy.can_answer_with_anchorfact should be true');
  }
  if (!checks.expected_pack_present) {
    failures.push(`expected evidence pack ${benchmarkCase.expected_top_slug} is missing`);
  }
  if (!checks.minimum_citation_ready_claims) {
    failures.push(`citation-ready claims expected at least ${minClaims}, got ${citations.length}`);
  }
  if (!checks.minimum_sources_per_expected_pack) {
    failures.push(`expected pack sources expected at least ${minSources}, got ${expected?.source_count || 0}`);
  }
  if (!checks.citation_ready_claims_have_source_urls) {
    failures.push(`citation-ready claims with source_url expected at least ${Math.min(minClaims, citations.length)}, got ${claimsWithSourceUrls}`);
  }

  const signals = improvementSignals({ pack: expected, citations });
  return {
    id: benchmarkCase.id,
    category: benchmarkCase.category || 'uncategorized',
    query: benchmarkCase.query,
    expected_top_slug: benchmarkCase.expected_top_slug,
    top_slug: top?.canonical_slug || null,
    ok: failures.length === 0,
    score_100: caseScore(checks),
    checks,
    failures,
    improvement_signals: signals,
    evidence_pack_count: payload.evidence_pack_count || 0,
    citation_ready_claim_count: citations.length,
    expected_pack: expected ? {
      canonical_slug: expected.canonical_slug,
      confidence_level: expected.confidence_level || null,
      claim_count: expected.claim_count || 0,
      source_count: expected.source_count || 0
    } : null,
    answer_policy: payload.answer_policy ? {
      can_answer_with_anchorfact: payload.answer_policy.can_answer_with_anchorfact === true,
      answer_mode: payload.answer_policy.answer_mode || null
    } : null
  };
}

function nextActions({ failed, improvementCandidates }) {
  if (failed > 0) {
    return [
      {
        area: 'retrieval_reliability',
        action: 'Fix routing, context assembly, or citation export before expanding content.'
      }
    ];
  }
  if (improvementCandidates.length > 0) {
    return [
      {
        area: 'content_selection',
        action: 'Improve benchmark cases with low confidence, single-source support, or thin citation-ready claims before broad draft publication.'
      },
      {
        area: 'measurement',
        action: 'Choose future draft repairs by whether they improve representative AI usefulness signals.'
      }
    ];
  }
  return [
    {
      area: 'maintenance',
      action: 'Keep usefulness benchmark green while making small, measured product or content improvements.'
    }
  ];
}

export function buildAiUsefulnessBenchmarkReport({
  generated = new Date().toISOString(),
  artifacts,
  cases = QUERY_BENCHMARK_CASES,
  minScore = DEFAULT_MIN_SCORE
} = {}) {
  const results = cases.map(benchmarkCase => evaluateAiUsefulnessCase({
    benchmarkCase,
    artifacts,
    generated
  }));
  const failedResults = results.filter(result => !result.ok);
  const score = results.length
    ? round(results.reduce((sum, result) => sum + result.score_100, 0) / results.length)
    : 0;
  const improvementCandidates = results
    .filter(result => result.improvement_signals.length > 0)
    .sort((a, b) => a.score_100 - b.score_100 || a.id.localeCompare(b.id))
    .map(result => ({
      id: result.id,
      category: result.category,
      query: result.query,
      expected_top_slug: result.expected_top_slug,
      score_100: result.score_100,
      signals: result.improvement_signals
    }));
  const failures = [];
  if (score < minScore) failures.push(`average usefulness score expected at least ${minScore}, got ${score}`);

  return {
    schema_version: AI_USEFULNESS_BENCHMARK_SCHEMA_VERSION,
    generated,
    purpose: 'Measure whether representative AI queries produce answer-ready, source-mapped AnchorFact context, not just a reachable endpoint.',
    pass_gate: 'All hard checks must pass and the average score must stay above the configured threshold.',
    min_score: minScore,
    ok: failedResults.length === 0 && failures.length === 0,
    score_100: score,
    case_count: results.length,
    passed: results.length - failedResults.length,
    failed: failedResults.length,
    failures,
    improvement_candidate_count: improvementCandidates.length,
    improvement_candidates: improvementCandidates,
    next_actions: nextActions({ failed: failedResults.length, improvementCandidates }),
    cases: results
  };
}

export function renderAiUsefulnessBenchmarkMarkdown(report) {
  const candidateLines = report.improvement_candidates.length
    ? report.improvement_candidates.map(candidate =>
      `- ${candidate.expected_top_slug}: score=${candidate.score_100}, signals=${candidate.signals.join(', ')}`
    ).join('\n')
    : '- none';
  const caseLines = report.cases.length
    ? report.cases.map(result =>
      `- ${result.id}: ${result.ok ? 'pass' : `fail (${result.failures.join('; ')})`} score=${result.score_100} top=${result.top_slug || '(missing)'}`
    ).join('\n')
    : '- none';
  const failures = report.failures.length
    ? report.failures.map(failure => `- ${failure}`).join('\n')
    : '- none';
  const actions = report.next_actions.length
    ? report.next_actions.map(action => `- ${action.area}: ${action.action}`).join('\n')
    : '- none';

  return `# AnchorFact AI Usefulness Benchmark - ${report.ok ? 'PASS' : 'FAIL'}

Generated: ${report.generated}

## Summary

- status: ${report.ok ? 'pass' : 'fail'}
- score: ${report.score_100}/100
- cases: ${report.case_count}
- passed: ${report.passed}
- failed: ${report.failed}
- improvement candidates: ${report.improvement_candidate_count}

## Cases

${caseLines}

## Improvement Candidates

${candidateLines}

## Next Actions

${actions}

## Failures

${failures}
`;
}
