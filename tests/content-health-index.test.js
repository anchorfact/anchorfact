#!/usr/bin/env node
import { buildContentHealthIndex } from '../src/lib/content-health-index.js';

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

console.log('AnchorFact Content Health Index Tests\n');

test('buildContentHealthIndex publishes signed corpus health guidance', () => {
  const payload = buildContentHealthIndex({
    generated: '2026-05-29T00:00:00.000Z',
    manifest: {
      article_count: 4,
      public_article_count: 2,
      draft_article_count: 2,
      claim_count: 2,
      verification_report: '2026-05-28T00:00:00.000Z',
      articles: [
        {
          canonical_slug: 'ai/public-a',
          title: 'Public A',
          status: 'public',
          is_draft: false,
          confidence_level: 'high',
          sources_verified: 2,
          sources_total: 2,
          quality_reasons: []
        },
        {
          canonical_slug: 'science/public-b',
          title: 'Public B',
          status: 'public',
          is_draft: false,
          confidence_level: 'medium',
          sources_verified: 1,
          sources_total: 2,
          quality_reasons: ['partial_source_verification']
        },
        {
          canonical_slug: 'ai/draft-a',
          title: 'Draft A',
          status: 'draft',
          is_draft: true,
          confidence_level: 'low',
          sources_verified: 0,
          sources_total: 2,
          quality_reasons: ['no_verified_sources']
        },
        {
          canonical_slug: 'ai/placeholder-draft',
          title: 'Placeholder Draft',
          status: 'draft',
          is_draft: true,
          confidence_level: 'low',
          sources_verified: 0,
          sources_total: 0,
          quality_reasons: ['placeholder_content']
        }
      ]
    },
    claimsPayload: {
      claim_count: 2,
      claims: [
        { id: 'https://anchorfact.org/fact/f1', source_url: 'https://example.com/a' },
        { id: 'https://anchorfact.org/fact/f2', source_title: 'Source B' }
      ]
    },
    sourcesPayload: {
      source_count: 2,
      sources: [
        { id: 'source:a', tier: 'S', type: 'academic_paper' },
        { id: 'source:b', tier: 'A', type: 'government_report' }
      ]
    }
  });

  assertEq(payload.schema_version, 'anchorfact.content-health.v1');
  assertEq(payload.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(payload.snapshot.public_articles, 2);
  assertEq(payload.snapshot.draft_articles, 2);
  assertEq(payload.public.source_coverage.full, 1);
  assertEq(payload.public.source_coverage.partial, 1);
  assertEq(payload.draft.source_coverage.zero, 2);
  assertEq(payload.public.claim_mapping, { total: 2, mapped: 2, ratio: 1 });
  assertEq(payload.public.sources.tier_distribution, { A: 1, S: 1 });
  assert(payload.public.quality_reasons.some(reason => reason.name === 'partial_source_verification'), 'public health should include quality reasons');
  assert(payload.draft.repair_candidates.some(candidate => candidate.canonical_slug === 'ai/draft-a'), 'draft health should include repair candidates');
  assertEq(payload.draft.repair_queue.candidate_count, 1);
  assertEq(payload.draft.repair_queue.next_batch[0].canonical_slug, 'ai/draft-a');
  assert(!payload.draft.repair_queue.next_batch.some(candidate => candidate.canonical_slug === 'ai/placeholder-draft'), 'placeholder drafts should stay out of automatic repair queues');
  assert(payload.draft.repair_queue.selection_policy.some(item => item.includes('repair_complexity')), 'repair queue should explain priority order');
  assert(payload.draft.repair_queue.quality_reason_distribution.some(reason => reason.name === 'no_verified_sources'), 'repair queue should summarize reasons');
  assert(payload.machine_guidance.some(item => item.includes('/api/context')), 'health guidance should direct agents to context API');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
