#!/usr/bin/env node
import { buildProjectReadiness } from '../src/lib/project-readiness.js';

let passed = 0, failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ok ${name}`);
  } catch (error) {
    failed++;
    console.log(`  fail ${name}: ${error.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertEq(actual, expected, ctx = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${ctx} expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

console.log('AnchorFact Project Readiness Tests\n');

test('buildProjectReadiness prioritizes public trust blockers first', () => {
  const readiness = buildProjectReadiness({
    publicArticles: 10,
    publicAuditActionableCount: 2,
    publicSourceCoverage: { full: 8, partial: 2, zero: 0 },
    publicClaimMapping: { total: 30, mapped: 28, ratio: 0.9333 },
    staleDocsCount: 1,
    draftRepairCandidateCount: 12,
    draftRepairExcludedCount: 3
  });

  assert(readiness.score_100 < 90, 'public blockers should materially reduce readiness');
  assertEq(readiness.grade, 'needs_attention');
  assertEq(readiness.next_focus, 'repair_public_audit');
  assert(readiness.blockers.some(blocker => blocker.id === 'public_audit_actionable'), 'should expose public audit blocker');
  assert(readiness.next_actions[0].area === 'public_trust', 'first action should protect public trust');
});

test('buildProjectReadiness selects draft repair only after public surface is clean', () => {
  const readiness = buildProjectReadiness({
    publicArticles: 588,
    publicAuditActionableCount: 0,
    publicSourceCoverage: { full: 588, partial: 0, zero: 0 },
    publicClaimMapping: { total: 1804, mapped: 1804, ratio: 1 },
    publicLowConfidenceCount: 45,
    staleDocsCount: 0,
    draftRepairCandidateCount: 231,
    draftRepairExcludedCount: 201
  });

  assertEq(readiness.score_100, 93);
  assertEq(readiness.grade, 'strong');
  assertEq(readiness.next_focus, 'prioritize_draft_repair_queue');
  assertEq(readiness.signals.public_claim_mapping_ratio, 1);
  assert(readiness.next_actions.some(action => action.area === 'draft_asset_pipeline'), 'should recommend measured draft repair');
  assert(readiness.next_actions.some(action => action.action.includes('one or two low-risk drafts')), 'draft repair guidance should stay deliberately small');
});

test('buildProjectReadiness avoids content stacking once the project is excellent', () => {
  const readiness = buildProjectReadiness({
    publicArticles: 690,
    publicAuditActionableCount: 0,
    publicSourceCoverage: { full: 690, partial: 0, zero: 0 },
    publicClaimMapping: { total: 2205, mapped: 2205, ratio: 1 },
    publicLowConfidenceCount: 43,
    staleDocsCount: 0,
    draftRepairCandidateCount: 150,
    draftRepairExcludedCount: 201
  });

  assertEq(readiness.score_100, 95);
  assertEq(readiness.grade, 'excellent');
  assertEq(readiness.next_focus, 'maintain_and_measure_ai_usage');
  assert(readiness.signals.draft_repair_candidate_count > 0, 'draft queue should remain visible');
  assert(readiness.next_actions.some(action => action.area === 'measurement'), 'excellent-state guidance should keep evaluation first');
  assert(!readiness.next_actions.some(action => action.area === 'draft_asset_pipeline'), 'excellent-state guidance should not default to draft expansion');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
