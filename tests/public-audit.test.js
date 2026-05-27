#!/usr/bin/env node
import {
  buildAuditRows,
  renderAuditReport,
  selectAuditSample
} from '../scripts/audit-public-sample.js';

let passed = 0, failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  OK ${name}`);
  } catch (e) {
    failed++;
    console.log(`  FAIL ${name}: ${e.message}`);
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

console.log('AnchorFact Public Audit Tests\n');

function article(slug, overrides = {}) {
  const total = overrides.sources_total ?? 4;
  const verified = overrides.sources_verified ?? 1;
  return {
    id: `https://anchorfact.org/kb/${slug}`,
    canonical_slug: slug,
    canonical_url: `https://anchorfact.org/${slug}/`,
    title: `Fixture ${slug}`,
    status: 'public',
    confidence_level: overrides.confidence_level ?? 'medium',
    confidence_basis: 'verified_sources',
    confidence_score: overrides.confidence_score ?? 0.62,
    sources_verified: verified,
    sources_total: total,
    is_draft: false,
    quality_reasons: overrides.quality_reasons ?? (verified / total < 0.5 ? ['low_verified_coverage'] : [])
  };
}

function claim(slug, i, capped = true) {
  return {
    id: `claim-${slug}-${i}`,
    article: `https://anchorfact.org/${slug}/`,
    title: `Fixture ${slug}`,
    statement: `Claim ${i} for ${slug} has a complete statement.`,
    confidence: capped ? 'medium' : 'high',
    source_title: `Source ${i}`,
    source_url: `https://example.com/${slug}/${i}`,
    ...(capped ? { declared_confidence: 'high', article_confidence: 'medium' } : {})
  };
}

function makeFixture() {
  const articles = [];
  const claims = [];
  const verificationArticles = [];
  const contentBySlug = new Map();

  function add(slug, overrides = {}) {
    const a = article(slug, overrides);
    articles.push(a);
    const claimCount = overrides.claims ?? 3;
    for (let i = 0; i < claimCount; i++) claims.push(claim(slug, i + 1, overrides.capped !== false));
    verificationArticles.push({
      file: `content/${slug}.md`,
      article_id: slug.split('/').pop(),
      sources_total: a.sources_total,
      sources_verified: a.sources_verified,
      verification_results: Array.from({ length: a.sources_total }, (_, index) => ({
        source_title: `Source ${index + 1}`,
        all_verified: index < a.sources_verified,
        results: [{ verified: index < a.sources_verified, match: index < a.sources_verified }]
      }))
    });
    contentBySlug.set(slug, {
      frontmatter: {
        title: a.title,
        atomic_facts: Array.from({ length: claimCount }, (_, index) => ({
          id: `fact-${slug}-${index + 1}`,
          statement: `Claim ${index + 1} for ${slug} has a complete statement.`,
          source_title: `Source ${index + 1}`,
          source_url: `https://example.com/${slug}/${index + 1}`,
          confidence: 'high'
        })),
        primary_sources: [
          { title: 'Source 1', url: `https://example.com/${slug}/source-1`, year: 2026 }
        ],
        disputed_statements: []
      },
      body: `## TL;DR\n${a.title} is a complete fixture summary.\n\n## Detailed Analysis\n${a.title} has enough text for audit.`
    });
    return a;
  }

  for (let i = 1; i <= 9; i++) add(`risk/low-coverage-${i}`, {
    confidence_level: i <= 6 ? 'medium' : 'low',
    sources_verified: 1,
    sources_total: 6 + i,
    claims: 10 - i,
    quality_reasons: ['partial_source_verification', 'low_verified_coverage']
  });
  for (let i = 1; i <= 5; i++) add(`high/high-${i}`, {
    confidence_level: 'high',
    sources_verified: 3 + i,
    sources_total: 4 + i,
    claims: 6 - i,
    capped: false,
    quality_reasons: []
  });
  for (let i = 1; i <= 5; i++) add(`medium/medium-${i}`, {
    confidence_level: 'medium',
    sources_verified: 2,
    sources_total: 3,
    claims: 8 - i,
    quality_reasons: ['partial_source_verification']
  });
  for (let i = 1; i <= 6; i++) add(`low/low-${i}`, {
    confidence_level: 'low',
    sources_verified: 1 + (i % 2),
    sources_total: 2 + (i % 3),
    claims: 7 - i,
    quality_reasons: ['partial_source_verification']
  });
  articles.push({ ...article('draft/not-public'), status: 'draft', is_draft: true });

  return {
    manifest: { articles },
    claimsPayload: { claims },
    verificationReport: { articles: verificationArticles },
    contentBySlug
  };
}

test('selectAuditSample returns 20 unique public articles across fixed buckets', () => {
  const fixture = makeFixture();
  const rows = buildAuditRows(fixture);
  const sample = selectAuditSample(rows, 20);

  assertEq(sample.length, 20);
  assertEq(new Set(sample.map(row => row.canonical_slug)).size, 20);
  assert(sample.every(row => row.status === 'public' && row.is_draft === false), 'sample should be public-only');
  assertEq(sample.filter(row => row.bucket === 'low_verified_coverage').length, 8);
  assertEq(sample.filter(row => row.bucket === 'high_confidence').length, 4);
  assertEq(sample.filter(row => row.bucket === 'medium_capped_claims').length, 4);
  assertEq(sample.filter(row => row.bucket === 'low_confidence_public').length, 4);
});

test('audit rows include field-level scores, hygiene flags, and recommendations', () => {
  const fixture = makeFixture();
  const brokenSlug = 'risk/low-coverage-1';
  const broken = fixture.contentBySlug.get(brokenSlug);
  broken.frontmatter.atomic_facts[0].statement = 'First published in December 2022 (arXiv:2212.';
  broken.frontmatter.primary_sources = [
    { title: 'Harvard Business Review', url: 'https://hbr.org/', year: 2026 },
    { title: 'Harvard Business Review', url: 'https://hbr.org/', year: 2026 }
  ];
  broken.frontmatter.disputed_statements = [
    { statement: 'The interpretation and significance of key findings are subject to ongoing scholarly debate.' }
  ];
  broken.body += '\n\uFFFD broken mojibake marker';

  const rows = buildAuditRows(fixture);
  const row = rows.find(item => item.canonical_slug === brokenSlug);

  assert(row.hygiene_flags.includes('encoding_mojibake'), 'should flag mojibake');
  assert(row.hygiene_flags.includes('broken_atomic_fact'), 'should flag broken atomic facts');
  assert(row.hygiene_flags.includes('generic_source_homepage'), 'should flag generic homepage sources');
  assert(row.hygiene_flags.includes('duplicate_sources'), 'should flag duplicate sources');
  assert(row.hygiene_flags.includes('generic_dispute_statement'), 'should flag generic disputes');
  assert(['repair_sources', 'move_to_draft'].includes(row.recommendation), 'should recommend action');
});

test('renderAuditReport contains the required audit contract and rule calibration', () => {
  const fixture = makeFixture();
  const rows = buildAuditRows(fixture);
  const sample = selectAuditSample(rows, 20);
  const report = renderAuditReport(sample, {
    generatedAt: '2026-05-27T00:00:00.000Z',
    publicCount: 573,
    draftCount: 427,
    claimCount: 1715
  });

  assert(report.includes('# AnchorFact Public Content Audit - 2026-05-27'), 'missing title');
  assert(report.includes('source-title match'), 'missing source-title field');
  assert(report.includes('claim-evidence match'), 'missing claim-evidence field');
  assert(report.includes('title-summary accuracy'), 'missing title-summary field');
  assert(report.includes('## Rule Calibration'), 'missing rule calibration section');
  assert(report.includes('573 public / 427 draft / 1715 claims'), 'missing snapshot counts');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
