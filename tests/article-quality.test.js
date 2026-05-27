#!/usr/bin/env node
import {
  canonicalSlugFor,
  evaluateArticleQuality,
  findDuplicateCanonicalSlugs,
  hasPlaceholderContent
} from '../src/lib/article-quality.js';

let passed = 0, failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    failed++;
    console.log(`  ✗ ${name}: ${e.message}`);
  }
}

function assertEq(actual, expected, ctx = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${ctx} expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

console.log('AnchorFact Article Quality Tests\n');

test('canonical slug uses explicit frontmatter slug first', () => {
  const slug = canonicalSlugFor(
    { slug: 'AI/Transformer Architecture' },
    'content/ai/ignored.md',
    'content'
  );
  assertEq(slug, 'ai/transformer-architecture');
});

test('canonical slug falls back to relative content path', () => {
  const slug = canonicalSlugFor(
    {},
    'content/ai/activation-functions.md',
    'content'
  );
  assertEq(slug, 'ai/activation-functions');
});

test('placeholder content is detected in body and known gaps', () => {
  assertEq(hasPlaceholderContent('## Detailed Analysis\n[待后续补充。]'), true);
  assertEq(hasPlaceholderContent('complete body', { known_gaps: ['内容初稿，待补充详细分析'] }), true);
  assertEq(hasPlaceholderContent('complete body', { known_gaps: ['minor topic gap'] }), false);
});

test('verified non-placeholder article is public eligible', () => {
  const q = evaluateArticleQuality({
    frontmatter: {
      primary_sources: [{ title: 'Paper', doi: '10.1234/test' }]
    },
    body: '## TL;DR\nDone.',
    filePath: 'content/ai/test.md',
    contentDir: 'content',
    verificationData: { sources_total: 1, sources_verified: 1 },
    confidence: { level: 'high', inputs: { based_on: 'verified_sources' } }
  });
  assertEq(q.publicEligible, true);
  assertEq(q.status, 'public');
  assertEq(q.verifiedSourceCoverage.ratio, 1);
});

test('low verified coverage is a non-fatal quality reason', () => {
  const q = evaluateArticleQuality({
    frontmatter: {
      primary_sources: [
        { title: 'Paper A', doi: '10.1234/a' },
        { title: 'Paper B', doi: '10.1234/b' },
        { title: 'Paper C', doi: '10.1234/c' }
      ]
    },
    body: '## TL;DR\nDone.',
    filePath: 'content/ai/test.md',
    contentDir: 'content',
    verificationData: { sources_total: 3, sources_verified: 1 },
    confidence: { level: 'medium', inputs: { based_on: 'verified_sources' } }
  });
  assertEq(q.publicEligible, true);
  assertEq(q.qualityReasons.includes('low_verified_coverage'), true);
  assertEq(q.fatalReasons.includes('low_verified_coverage'), false);
});

test('estimated article is automatically draft', () => {
  const q = evaluateArticleQuality({
    frontmatter: {
      primary_sources: [{ title: 'Paper', url: 'https://example.com' }]
    },
    body: '## TL;DR\nDone.',
    filePath: 'content/ai/test.md',
    contentDir: 'content',
    verificationData: null,
    confidence: { level: 'medium', inputs: { based_on: 'estimated' } }
  });
  assertEq(q.publicEligible, false);
  assertEq(q.isDraft, true);
  assertEq(q.qualityReasons.includes('estimated_confidence'), true);
});

test('missing sources and placeholders make draft without blocking draft builds', () => {
  const q = evaluateArticleQuality({
    frontmatter: {},
    body: '[待后续补充。]',
    filePath: 'content/ai/test.md',
    contentDir: 'content',
    verificationData: null,
    confidence: { level: 'low', inputs: { based_on: 'estimated' } }
  });
  assertEq(q.publicEligible, false);
  assertEq(q.qualityReasons.includes('missing_primary_sources'), true);
  assertEq(q.qualityReasons.includes('placeholder_content'), true);
});

test('duplicate canonical slugs are reported', () => {
  const duplicates = findDuplicateCanonicalSlugs([
    { canonicalSlug: 'ai/test', file: 'a.md' },
    { canonicalSlug: 'ai/other', file: 'b.md' },
    { canonicalSlug: 'ai/test', file: 'c.md' }
  ]);
  assertEq(duplicates.length, 1);
  assertEq(duplicates[0].slug, 'ai/test');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
