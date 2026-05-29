#!/usr/bin/env node
import { buildExamplesIndex } from '../src/lib/examples-index.js';

let passed = 0, failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ok ${name}`);
  } catch (e) {
    failed++;
    console.log(`  fail ${name}: ${e.message}`);
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

const searchIndexPayload = {
  records: [
    {
      canonical_slug: 'ai/3d-generation-gaussian-splatting',
      title: 'Gaussian Splatting',
      confidence_level: 'medium',
      claim_count: 2,
      source_count: 2,
      claim_ids: [
        'https://anchorfact.org/fact/f1',
        'https://anchorfact.org/fact/f2'
      ],
      keywords: ['gaussian', 'splatting', 'nerf']
    }
  ]
};

const topicsPayload = {
  topics: [
    { id: 'ai', title: 'AI', article_count: 1 }
  ]
};

const claimsPayload = {
  claims: [
    {
      id: 'https://anchorfact.org/fact/f1',
      canonical_slug: 'ai/3d-generation-gaussian-splatting',
      statement: '3D Gaussian Splatting represents scenes as optimized 3D Gaussian primitives.',
      confidence: 'medium',
      source_url: 'https://arxiv.org/abs/2308.04079',
      source_title: '3D Gaussian Splatting for Real-Time Radiance Field Rendering'
    }
  ]
};

const sourcesPayload = {
  sources: [
    {
      id: 'source:gaussian',
      title: '3D Gaussian Splatting for Real-Time Radiance Field Rendering',
      url: 'https://arxiv.org/abs/2308.04079',
      tier: 'A',
      type: 'academic_paper',
      article_count: 1,
      claim_count: 1
    }
  ]
};

console.log('AnchorFact Examples Index Tests\n');

test('buildExamplesIndex produces executable AI workflow examples', () => {
  const payload = buildExamplesIndex({
    generated: '2026-05-29T00:00:00.000Z',
    topicsPayload,
    searchIndexPayload,
    claimsPayload,
    sourcesPayload
  });

  assertEq(payload.schema_version, 'anchorfact.examples.v1');
  assertEq(payload.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(payload.example_count, 4);
  assertEq(payload.examples.map(example => example.id), [
    'search_to_article_evidence',
    'claim_dereference',
    'source_reuse_lookup',
    'static_fallback'
  ]);

  const searchExample = payload.examples[0];
  assert(searchExample.workflow[1].call.path.includes('/api/search?q=gaussian+splatting&limit=3'), 'search example should include encoded query path');
  assert(searchExample.workflow[2].call.path.includes('/api/article?slug=ai%2F3d-generation-gaussian-splatting'), 'search example should fetch article evidence');
  assertEq(searchExample.expected_anchor.topic, { id: 'ai', title: 'AI', article_count: 1 });
  assertEq(searchExample.expected_anchor.article.canonical_slug, 'ai/3d-generation-gaussian-splatting');

  const claimExample = payload.examples.find(example => example.id === 'claim_dereference');
  assert(claimExample.workflow[0].call.path.includes('/api/claim?id=f1'), 'claim example should use shorthand claim id');
  assertEq(claimExample.expected_anchor.claim.lookup_id, 'f1');

  const sourceExample = payload.examples.find(example => example.id === 'source_reuse_lookup');
  assert(sourceExample.workflow[0].call.path.includes('/api/source?url=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079'), 'source example should use source URL lookup');
  assertEq(sourceExample.expected_anchor.source.id, 'source:gaussian');
});

test('buildExamplesIndex returns an empty contract when no public records exist', () => {
  const payload = buildExamplesIndex({
    generated: '2026-05-29T00:00:00.000Z',
    topicsPayload: { topics: [] },
    searchIndexPayload: { records: [] },
    claimsPayload: { claims: [] },
    sourcesPayload: { sources: [] }
  });

  assertEq(payload.schema_version, 'anchorfact.examples.v1');
  assertEq(payload.example_count, 0);
  assertEq(payload.examples, []);
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
