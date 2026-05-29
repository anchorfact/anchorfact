#!/usr/bin/env node
import { buildGraphIndex } from '../src/lib/graph-index.js';

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

const manifest = {
  schema_version: 'anchorfact.manifest.v1',
  generated: '2026-05-29T00:00:00.000Z',
  provenance_url: 'https://anchorfact.org/provenance.json',
  articles: [
    {
      canonical_slug: 'ai/gaussian-splatting',
      canonical_url: 'https://anchorfact.org/ai/gaussian-splatting/',
      title: '3D Gaussian Splatting',
      status: 'public',
      is_draft: false,
      confidence_level: 'medium',
      sources_verified: 2,
      sources_total: 2
    },
    {
      canonical_slug: 'ai/draft-only',
      canonical_url: 'https://anchorfact.org/ai/draft-only/',
      title: 'Draft Only',
      status: 'draft',
      is_draft: true
    }
  ]
};

const claimsPayload = {
  claims: [
    {
      id: 'https://anchorfact.org/fact/f1',
      canonical_slug: 'ai/gaussian-splatting',
      statement: '3D Gaussian Splatting represents scenes as anisotropic Gaussians.',
      confidence: 'medium',
      source_title: '3D Gaussian Splatting for Real-Time Radiance Field Rendering',
      source_url: 'https://arxiv.org/abs/2308.04079'
    },
    {
      id: 'https://anchorfact.org/fact/draft',
      canonical_slug: 'ai/draft-only',
      statement: 'Draft claims must not appear in graph edges.',
      confidence: 'low',
      source_url: 'https://example.com/draft'
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
      claim_count: 1,
      articles: [
        {
          canonical_slug: 'ai/gaussian-splatting',
          title: '3D Gaussian Splatting',
          url: 'https://anchorfact.org/ai/gaussian-splatting/'
        }
      ]
    }
  ]
};

const topicsPayload = {
  topics: [
    { id: 'ai', title: 'AI', article_count: 1, claim_count: 1, source_count: 1 }
  ]
};

console.log('AnchorFact Graph Index Tests\n');

test('buildGraphIndex emits public topic, article, claim, and source nodes', () => {
  const graph = buildGraphIndex({
    generated: '2026-05-29T00:00:00.000Z',
    manifest,
    claimsPayload,
    sourcesPayload,
    topicsPayload
  });

  assertEq(graph.schema_version, 'anchorfact.graph.v1');
  assertEq(graph.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(graph.public_article_count, 1);
  assertEq(graph.public_claim_count, 1);
  assertEq(graph.source_count, 1);
  assert(graph.nodes.some(node => node.id === 'topic:ai' && node.type === 'topic'), 'graph should include topic node');
  assert(graph.nodes.some(node => node.id === 'article:ai/gaussian-splatting' && node.type === 'article'), 'graph should include public article node');
  assert(graph.nodes.some(node => node.id === 'https://anchorfact.org/fact/f1' && node.type === 'claim'), 'graph should include claim node');
  assert(!graph.nodes.some(node => node.id === 'https://anchorfact.org/fact/draft'), 'graph should not include draft claim nodes');
  assert(!graph.nodes.some(node => node.id === 'article:ai/draft-only'), 'graph should not include draft article nodes');
});

test('buildGraphIndex links graph edges without draft article leakage', () => {
  const graph = buildGraphIndex({
    generated: '2026-05-29T00:00:00.000Z',
    manifest,
    claimsPayload,
    sourcesPayload,
    topicsPayload
  });

  assert(graph.edges.some(edge =>
    edge.type === 'topic_contains_article'
    && edge.from === 'topic:ai'
    && edge.to === 'article:ai/gaussian-splatting'
  ), 'graph should link topic to public article');
  assert(graph.edges.some(edge =>
    edge.type === 'article_has_claim'
    && edge.from === 'article:ai/gaussian-splatting'
    && edge.to === 'https://anchorfact.org/fact/f1'
  ), 'graph should link article to claim');
  assert(graph.edges.some(edge =>
    edge.type === 'claim_supported_by_source'
    && edge.from === 'https://anchorfact.org/fact/f1'
    && edge.to === 'source:gaussian'
  ), 'graph should link claim to source');
  assert(!graph.edges.some(edge => String(edge.from).includes('draft') || String(edge.to).includes('draft')), 'graph edges should not reference draft article claims');
  assertEq(graph.edge_count, graph.edges.length);
  assertEq(graph.node_count, graph.nodes.length);
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
