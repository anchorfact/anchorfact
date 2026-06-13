#!/usr/bin/env node
import {
  CITATION_CONTRACT,
  buildClaimCitationExport,
  buildClaimCitationExports
} from '../src/lib/citation-export.js';

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

const article = {
  canonical_slug: 'ai/gaussian-splatting',
  canonical_url: 'https://anchorfact.org/ai/gaussian-splatting/index.json',
  title: '3D Gaussian Splatting',
  confidence_level: 'medium'
};

const claim = {
  id: 'https://anchorfact.org/fact/f1?utm=x#part',
  article: 'https://anchorfact.org/ai/gaussian-splatting/index.json',
  canonical_slug: 'ai/gaussian-splatting',
  title: '3D Gaussian Splatting',
  statement: '3D Gaussian Splatting represents scenes as anisotropic Gaussians.',
  confidence: 'medium',
  source_title: '3D Gaussian Splatting for Real-Time Radiance Field Rendering',
  source_url: 'https://arxiv.org/abs/2308.04079?x=1#section',
  citation: { sameAs: 'https://arxiv.org/abs/2308.04079' }
};

const source = {
  id: 'source:gaussian',
  title: '3D Gaussian Splatting for Real-Time Radiance Field Rendering',
  url: 'https://arxiv.org/abs/2308.04079',
  tier: 'A',
  type: 'academic_paper'
};

console.log('AnchorFact Citation Export Tests\n');

test('citation contract is explicit about AI citation requirements', () => {
  assertEq(CITATION_CONTRACT.cite_only_public_claims, true);
  assertEq(CITATION_CONTRACT.include_original_source_url, true);
  assertEq(CITATION_CONTRACT.include_anchorfact_claim_url, true);
});

test('buildClaimCitationExport returns stable inline and markdown citation text', () => {
  const citation = buildClaimCitationExport({ claim, article, source });

  assertEq(citation.claim_id, 'https://anchorfact.org/fact/f1');
  assertEq(citation.article_url, 'https://anchorfact.org/ai/gaussian-splatting/index.json');
  assertEq(citation.source_url, 'https://arxiv.org/abs/2308.04079');
  assertEq(citation.source_tier, 'A');
  assert(citation.inline.includes('AnchorFact: 3D Gaussian Splatting; medium confidence'), 'inline citation should include article and confidence');
  assert(citation.inline.includes('https://anchorfact.org/fact/f1'), 'inline citation should link to the claim URL');
  assert(citation.markdown.startsWith('- 3D Gaussian Splatting represents scenes'), 'markdown citation should begin with the claim statement');
});

test('buildClaimCitationExports maps claims to matching source metadata', () => {
  const citations = buildClaimCitationExports({
    claims: [claim],
    article,
    sources: [source]
  });

  assertEq(citations.length, 1);
  assertEq(citations[0].source_type, 'academic_paper');
  assert(citations[0].markdown.includes('source:'), 'markdown citation should include source context');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
