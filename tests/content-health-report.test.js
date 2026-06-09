#!/usr/bin/env node
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { buildContentHealthReport, renderContentHealthReport } from '../scripts/content-health-report.js';

let passed = 0, failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  OK ${name}`);
  } catch (error) {
    failed++;
    console.log(`  FAIL ${name}: ${error.message}`);
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

console.log('AnchorFact Content Health Report Tests\n');

function publicArticle(slug, overrides = {}) {
  return {
    id: `https://anchorfact.org/kb/${slug}`,
    canonical_slug: slug,
    canonical_url: `https://anchorfact.org/${slug}/`,
    title: overrides.title || `Fixture ${slug}`,
    status: 'public',
    confidence_level: overrides.confidence_level || 'medium',
    confidence_basis: 'verified_sources',
    confidence_score: 0.72,
    sources_verified: overrides.sources_verified ?? 2,
    sources_total: overrides.sources_total ?? 2,
    is_draft: false,
    quality_reasons: overrides.quality_reasons || []
  };
}

function draftArticle(slug, overrides = {}) {
  return {
    ...publicArticle(slug, overrides),
    status: 'draft',
    is_draft: true,
    confidence_level: overrides.confidence_level || 'low',
    sources_verified: overrides.sources_verified ?? 0,
    sources_total: overrides.sources_total ?? 2,
    quality_reasons: overrides.quality_reasons || ['no_verified_sources', 'partial_source_verification']
  };
}

function content(category, sourceType = 'academic_paper') {
  return {
    frontmatter: {
      category,
      primary_sources: [
        { title: 'Fixture Source', type: sourceType, year: 2026, url: 'https://example.com/source' }
      ],
      atomic_facts: [
        {
          id: 'fact-1',
          statement: 'A complete fixture claim.',
          source_url: 'https://example.com/source'
        }
      ]
    },
    body: '## TL;DR\nFixture summary.'
  };
}

test('buildContentHealthReport summarizes public and draft health', () => {
  const root = mkdtempSync(join(tmpdir(), 'anchorfact-health-'));
  mkdirSync(join(root, 'docs'), { recursive: true });
  writeFileSync(join(root, 'README.md'), 'EXPECTED_PUBLIC_ARTICLES=554 EXPECTED_DRAFT_ARTICLES=446 EXPECTED_CLAIMS=1603');

  try {
    const manifest = {
      article_count: 8,
      public_article_count: 2,
      draft_article_count: 6,
      claim_count: 2,
      articles: [
        publicArticle('ai/public-a', { confidence_level: 'high' }),
        publicArticle('science/public-b', { sources_verified: 1, sources_total: 2, quality_reasons: ['partial_source_verification'] }),
        draftArticle('ai/draft-a'),
        draftArticle('business/brand-draft', { sources_total: 10 }),
        draftArticle('ai/ai-public-health', { sources_total: 4 }),
        draftArticle('ai/ai-for-fraud-prevention', { title: 'AI for Payment Fraud Prevention' }),
        draftArticle('ai/ai-warehouse-robotics', { title: 'AI for Warehouse Robotics: Autonomous Forklifts' }),
        draftArticle('game-development/encoding-damaged-draft', {
          sources_verified: 1,
          sources_total: 10,
          quality_reasons: ['encoding_mojibake', 'broken_atomic_fact', 'generic_source_homepage']
        })
      ]
    };
    const contentBySlug = new Map([
      ['ai/public-a', content('ai', 'academic_paper')],
      ['science/public-b', content('science', 'government_report')],
      ['ai/draft-a', content('ai', 'blog_post')],
      ['business/brand-draft', content('business', 'blog_post')],
      ['ai/ai-public-health', content('ai', 'government_report')],
      ['ai/ai-for-fraud-prevention', content('ai', 'blog_post')],
      ['ai/ai-warehouse-robotics', content('ai', 'blog_post')],
      ['game-development/encoding-damaged-draft', content('game-development', 'blog_post')]
    ]);
    const report = buildContentHealthReport({
      manifest,
      claimsPayload: { claims: [{ article: 'https://anchorfact.org/ai/public-a/' }] },
      verificationReport: {
        articles: [
          {
            file: 'content/ai/public-a.md',
            sources_total: 2,
            sources_verified: 2,
            verification_results: [
              { all_verified: true, results: [{ verified: true, match: true }] },
              { all_verified: true, results: [{ verified: true, match: true }] }
            ]
          },
          {
            file: 'content/science/public-b.md',
            sources_total: 2,
            sources_verified: 1,
            verification_results: [
              { all_verified: true, results: [{ verified: true, match: true }] },
              { all_verified: false, results: [{ verified: false, match: false }] }
            ]
          }
        ]
      },
      contentBySlug
    }, { root, generatedAt: '2026-05-28T00:00:00.000Z' });

    assertEq(report.snapshot.public, 2);
    assertEq(report.public.source_coverage.full, 1);
    assertEq(report.public.source_coverage.partial, 1);
    assertEq(report.draft.source_coverage.zero, 5);
    assertEq(report.public.source_tiers.A, 2);
    assertEq(report.draft.source_tiers.B, 5);
    assertEq(report.public_audit.rows, 2);
    assert(report.project_readiness, 'should include project readiness guidance');
    assertEq(report.project_readiness.next_focus, 'repair_public_audit');
    assert(report.stale_docs.some(item => item.path === 'README.md'), 'should report stale docs');
    assert(report.draft.repair_candidates.some(item => item.canonical_slug === 'ai/draft-a'), 'should include draft candidate');
    assertEq(report.draft.repair_candidates[0].canonical_slug, 'ai/draft-a');
    assertEq(report.draft.repair_candidates[0].repair_priority_area, 'core_ai');
    assert(report.draft.repair_candidates.findIndex(item => item.canonical_slug === 'ai/draft-a') < report.draft.repair_candidates.findIndex(item => item.canonical_slug === 'business/brand-draft'), 'AI utility draft should outrank a higher-source general draft');
    assert(!report.draft.repair_candidates.some(item => item.canonical_slug === 'ai/ai-public-health'), 'should not recommend high-stakes drafts for automatic repair');
    assert(report.draft.strict_review_candidates.some(item => item.canonical_slug === 'ai/ai-public-health'), 'should route high-stakes drafts to strict review');
    assert(!report.draft.repair_candidates.some(item => item.canonical_slug === 'ai/ai-for-fraud-prevention'), 'should not recommend financial-risk drafts for automatic repair');
    assert(report.draft.strict_review_candidates.some(item => item.canonical_slug === 'ai/ai-for-fraud-prevention'), 'should route financial-risk drafts to strict review');
    assert(!report.draft.repair_candidates.some(item => item.canonical_slug === 'ai/ai-warehouse-robotics'), 'should not recommend physical-safety drafts for automatic repair');
    assert(report.draft.strict_review_candidates.some(item => item.canonical_slug === 'ai/ai-warehouse-robotics'), 'should route physical-safety drafts to strict review');
    assertEq(report.draft.strict_review_candidate_count, 3);
    assert(report.draft.strict_review_reasons.some(item => item.name === 'medical_or_public_health'), 'should summarize strict-review reasons');
    assert(report.draft.strict_review_reasons.some(item => item.name === 'financial_or_insurance'), 'should summarize financial strict-review reasons');
    assert(report.draft.strict_review_reasons.some(item => item.name === 'physical_safety_or_autonomy'), 'should summarize physical-safety strict-review reasons');
    assert(!report.draft.repair_candidates.some(item => item.canonical_slug === 'game-development/encoding-damaged-draft'), 'should not recommend encoding-damaged drafts for automatic repair');
    assertEq(report.draft.repair_excluded_count, 1);
    assert(report.draft.repair_exclusion_reasons.some(item => item.name === 'encoding_mojibake'), 'should summarize encoding-damaged repair exclusions');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('current production counts do not mark docs stale', () => {
  const root = mkdtempSync(join(tmpdir(), 'anchorfact-health-'));
  mkdirSync(join(root, 'docs'), { recursive: true });
  writeFileSync(
    join(root, 'README.md'),
    'EXPECTED_PUBLIC_ARTICLES=1314 EXPECTED_DRAFT_ARTICLES=300 EXPECTED_CLAIMS=4154'
  );
  writeFileSync(
    join(root, 'docs', 'LAUNCH_READINESS.md'),
    'Current trusted counts: 1314 public / 300 draft / 4154 claims.'
  );

  try {
    const report = buildContentHealthReport({
      manifest: {
        article_count: 1,
        public_article_count: 1,
        draft_article_count: 0,
        claim_count: 1,
        articles: [publicArticle('ai/public-a')]
      },
      claimsPayload: { claims: [{ article: 'https://anchorfact.org/ai/public-a/' }] },
      verificationReport: { articles: [] },
      contentBySlug: new Map([['ai/public-a', content('ai')]])
    }, { root, generatedAt: '2026-06-08T00:00:00.000Z' });

    assertEq(report.stale_docs, []);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('renderContentHealthReport uses readable report sections', () => {
  const report = {
    generated: '2026-05-28T00:00:00.000Z',
    snapshot: { public: 1, draft: 0, claims: 1 },
    public_audit: {
      rows: 1,
      recommendations: { keep_public: 1, downgrade_confidence: 0, repair_sources: 0, move_to_draft: 0 },
      actionable_count: 0
    },
    project_readiness: {
      score_100: 100,
      grade: 'excellent',
      next_focus: 'maintain_and_measure_ai_usage',
      blockers: [],
      next_actions: [
        { area: 'measurement', action: 'Keep representative AI evals aligned with real usage before broad expansion.' }
      ],
      signals: {
        public_audit_actionable_count: 0,
        public_source_gap_articles: 0,
        public_claim_mapping_ratio: 1,
        stale_docs_count: 0,
        draft_repair_candidate_count: 0,
        draft_repair_excluded_count: 0
      }
    },
    public: {
      confidence: { medium: 1 },
      source_coverage: { full: 1, partial: 0, zero: 0 },
      source_tiers: { A: 1 },
      atomic_facts: 1,
      mapped_atomic_facts: 1,
      categories: [{ name: 'ai', count: 1 }],
      source_types: [{ name: 'academic_paper', count: 1 }]
    },
    draft: {
      confidence: {},
      source_coverage: { full: 0, partial: 0, zero: 0 },
      source_tiers: {},
      atomic_facts: 0,
      mapped_atomic_facts: 0,
      quality_reasons: [],
      repair_candidates: [],
      strict_review_candidate_count: 0,
      strict_review_candidates: [],
      strict_review_reasons: []
    },
    stale_docs: []
  };
  const text = renderContentHealthReport(report);
  assert(text.includes('## Public Audit'), 'missing public audit section');
  assert(text.includes('## Project Readiness'), 'missing project readiness section');
  assert(text.includes('- score: 100/100 (excellent)'), 'missing readiness score');
  assert(text.includes('Snapshot: 1 public / 0 draft / 1 claims.'), 'missing snapshot');
  assert(text.includes('source coverage: full=1, partial=0, zero=0'), 'missing coverage summary');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
