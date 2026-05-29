#!/usr/bin/env node
import { buildEvalsIndex } from '../src/lib/evals-index.js';

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
      claim_count: 1,
      articles: [
        {
          canonical_slug: 'ai/3d-generation-gaussian-splatting',
          title: 'Gaussian Splatting'
        }
      ]
    }
  ]
};

const graphPayload = {
  node_count: 4,
  edge_count: 3,
  edges: [
    {
      type: 'article_has_claim',
      from: 'article:ai/3d-generation-gaussian-splatting',
      to: 'https://anchorfact.org/fact/f1'
    },
    {
      type: 'claim_supported_by_source',
      from: 'https://anchorfact.org/fact/f1',
      to: 'source:gaussian'
    }
  ]
};

console.log('AnchorFact Evals Index Tests\n');

test('buildEvalsIndex produces executable AI integration checks', () => {
  const payload = buildEvalsIndex({
    generated: '2026-05-29T00:00:00.000Z',
    searchIndexPayload,
    claimsPayload,
    sourcesPayload,
    graphPayload
  });

  assertEq(payload.schema_version, 'anchorfact.evals.v1');
  assertEq(payload.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(payload.eval_count, 9);
  assertEq(payload.evals.map(evalCase => evalCase.id), [
    'evidence_pack_json',
    'evidence_pack_markdown',
    'claim_dereference',
    'reference_resolver',
    'batch_reference_resolver',
    'citation_export',
    'source_reuse_lookup',
    'graph_relationships',
    'signed_provenance_static_artifacts'
  ]);

  const evidenceEval = payload.evals[0];
  assert(evidenceEval.call.path.includes('/api/evidence?q=gaussian+splatting&limit=3'), 'evidence eval should include encoded query path');
  assertEq(evidenceEval.expected.schema_version, 'anchorfact.evidence-api.v1');
  assertEq(evidenceEval.expected.contains_canonical_slug, 'ai/3d-generation-gaussian-splatting');

  const markdownEval = payload.evals.find(evalCase => evalCase.id === 'evidence_pack_markdown');
  assert(markdownEval.call.path.includes('format=markdown'), 'markdown eval should request markdown format');
  assert(markdownEval.expected.contains_text.includes('Citation contract:'), 'markdown eval should assert citation contract text');

  const claimEval = payload.evals.find(evalCase => evalCase.id === 'claim_dereference');
  assert(claimEval.call.path.includes('/api/claim?id=f1'), 'claim eval should use shorthand claim id');
  assertEq(claimEval.expected.claim_id, 'https://anchorfact.org/fact/f1');

  const resolverEval = payload.evals.find(evalCase => evalCase.id === 'reference_resolver');
  assert(resolverEval.call.path.includes('/api/resolve?ref=f1'), 'resolver eval should use reference resolver');
  assertEq(resolverEval.expected.schema_version, 'anchorfact.resolve-api.v1');
  assertEq(resolverEval.expected.resolved_type, 'claim');

  const batchResolverEval = payload.evals.find(evalCase => evalCase.id === 'batch_reference_resolver');
  assert(batchResolverEval.call.path.includes('/api/resolve-batch?'), 'batch resolver eval should use batch reference resolver');
  assert(batchResolverEval.call.path.includes('ref=f1'), 'batch resolver eval should include claim shorthand');
  assertEq(batchResolverEval.expected.schema_version, 'anchorfact.resolve-batch-api.v1');
  assertEq(batchResolverEval.expected.reference_count, 2);
  assertEq(batchResolverEval.expected.error_count, 0);

  const citationEval = payload.evals.find(evalCase => evalCase.id === 'citation_export');
  assert(citationEval.call.path.includes('/api/cite?id=f1'), 'citation eval should use citation API shorthand claim id');
  assertEq(citationEval.expected.schema_version, 'anchorfact.cite-api.v1');
  assert(citationEval.expected.citation_export_contains.includes('AnchorFact:'), 'citation eval should assert AnchorFact citation text');

  const sourceEval = payload.evals.find(evalCase => evalCase.id === 'source_reuse_lookup');
  assert(sourceEval.call.path.includes('/api/source?url=https%3A%2F%2Farxiv.org%2Fabs%2F2308.04079'), 'source eval should use source URL lookup');
  assertEq(sourceEval.expected.contains_claim_id, 'https://anchorfact.org/fact/f1');

  const provenanceEval = payload.evals.find(evalCase => evalCase.id === 'signed_provenance_static_artifacts');
  assert(provenanceEval.expected.required_artifacts.includes('evals_json'), 'provenance eval should require evals artifact hash');
  assert(provenanceEval.expected.required_artifacts.includes('capabilities_json'), 'provenance eval should require capabilities artifact hash');
  assert(provenanceEval.expected.required_artifacts.includes('mcp_json'), 'provenance eval should require mcp artifact hash');
});

test('buildEvalsIndex returns an empty contract when no public records exist', () => {
  const payload = buildEvalsIndex({
    generated: '2026-05-29T00:00:00.000Z',
    searchIndexPayload: { records: [] },
    claimsPayload: { claims: [] },
    sourcesPayload: { sources: [] },
    graphPayload: { nodes: [], edges: [] }
  });

  assertEq(payload.schema_version, 'anchorfact.evals.v1');
  assertEq(payload.eval_count, 0);
  assertEq(payload.evals, []);
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
