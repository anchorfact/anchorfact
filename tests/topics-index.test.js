#!/usr/bin/env node
import { buildTopicsIndex } from '../src/lib/topics-index.js';

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

const publicResults = [
  {
    headline: 'Transformer Architecture',
    citation: [{ name: 'Attention Is All You Need' }],
    _quality: {
      canonicalSlug: 'ai/transformer-architecture',
      canonicalUrl: 'https://anchorfact.org/ai/transformer-architecture/'
    },
    _confidence: { level: 'high', score: 0.91 }
  },
  {
    headline: 'Gaussian Splatting',
    citation: [{ name: '3D Gaussian Splatting' }],
    _quality: {
      canonicalSlug: 'ai/gaussian-splatting',
      canonicalUrl: 'https://anchorfact.org/ai/gaussian-splatting/'
    },
    _confidence: { level: 'medium', score: 0.82 }
  },
  {
    headline: 'Photosynthesis',
    citation: [{ name: 'Biology Textbook' }],
    _quality: {
      canonicalSlug: 'science/photosynthesis',
      canonicalUrl: 'https://anchorfact.org/science/photosynthesis/'
    },
    _confidence: { level: 'medium', score: 0.76 }
  }
];

const claims = [
  { id: 'c1', canonical_slug: 'ai/transformer-architecture' },
  { id: 'c2', canonical_slug: 'ai/gaussian-splatting' },
  { id: 'c3', canonical_slug: 'ai/gaussian-splatting' },
  { id: 'c4', canonical_slug: 'science/photosynthesis' }
];

const sourcesPayload = {
  sources: [
    { id: 'source:attention', articles: [{ canonical_slug: 'ai/transformer-architecture' }] },
    { id: 'source:gaussian', articles: [{ canonical_slug: 'ai/gaussian-splatting' }] },
    { id: 'source:biology', articles: [{ canonical_slug: 'science/photosynthesis' }] }
  ]
};

console.log('AnchorFact Topics Index Tests\n');

test('buildTopicsIndex summarizes topic coverage and top articles', () => {
  const topics = buildTopicsIndex({
    generated: '2026-05-29T00:00:00.000Z',
    publicResults,
    claims,
    sourcesPayload
  });

  assertEq(topics.schema_version, 'anchorfact.topics.v1');
  assertEq(topics.topic_count, 2);
  assertEq(topics.public_article_count, 3);
  assertEq(topics.public_claim_count, 4);

  const ai = topics.topics.find(topic => topic.id === 'ai');
  assert(ai, 'ai topic missing');
  assertEq(ai.title, 'AI');
  assertEq(ai.article_count, 2);
  assertEq(ai.claim_count, 3);
  assertEq(ai.source_count, 2);
  assertEq(ai.confidence_distribution, { high: 1, medium: 1, low: 0 });
  assertEq(ai.top_articles[0].canonical_slug, 'ai/transformer-architecture');

  const science = topics.topics.find(topic => topic.id === 'science');
  assert(science, 'science topic missing');
  assertEq(science.article_count, 1);
  assertEq(science.top_articles[0].claim_count, 1);
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
