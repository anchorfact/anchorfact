#!/usr/bin/env node
import {
  CLAIMS_SCHEMA_VERSION,
  MANIFEST_SCHEMA_VERSION,
  OFFICIAL_SITE,
  OFFICIAL_SOURCE_REPOSITORY,
  PROVENANCE_SCHEMA_VERSION
} from '../src/lib/build-metadata.js';
import { sha256Text, verifyLiveProvenance } from '../src/lib/provenance-verify.js';

let passed = 0, failed = 0;
const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertEq(actual, expected, ctx = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${ctx} expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

class FakeResponse {
  constructor(status, body, contentType = 'application/json; charset=utf-8') {
    this.status = status;
    this.ok = status >= 200 && status < 300;
    this.body = body;
    this.headers = new Map([['content-type', contentType]]);
  }

  async text() {
    return this.body;
  }

  async json() {
    return JSON.parse(this.body);
  }
}

function makeFetch(routes) {
  return async (url) => {
    const route = routes[url];
    if (!route) {
      return new FakeResponse(404, JSON.stringify({ error: 'not found', url }));
    }
    if (route instanceof FakeResponse) {
      return route;
    }
    return new FakeResponse(200, route.body, route.contentType);
  };
}

function buildFixture(overrides = {}) {
  const baseUrl = OFFICIAL_SITE;
  const manifest = {
    schema_version: MANIFEST_SCHEMA_VERSION,
    provenance_url: `${baseUrl}/provenance.json`,
    public_article_count: 2,
    draft_article_count: 1,
    claim_count: 3,
    articles: [
      { status: 'public', is_draft: false },
      { status: 'public', is_draft: false },
      { status: 'draft', is_draft: true }
    ]
  };
  const claims = {
    schema_version: CLAIMS_SCHEMA_VERSION,
    provenance_url: `${baseUrl}/provenance.json`,
    claim_count: 3,
    claims: [{ id: 'fact-1' }, { id: 'fact-2' }, { id: 'fact-3' }]
  };
  const llms = '# AnchorFact\n\n- public verified entries\n';
  const manifestText = JSON.stringify(manifest, null, 2);
  const claimsText = JSON.stringify(claims, null, 2);
  const provenance = {
    schema_version: PROVENANCE_SCHEMA_VERSION,
    official_source_repository: OFFICIAL_SOURCE_REPOSITORY,
    official_site: baseUrl,
    build: {
      builder: 'cloudflare-pages',
      official_build: true,
      canonical_site: baseUrl,
      source_repository: OFFICIAL_SOURCE_REPOSITORY,
      commit_sha: '75b8761df7e7a92d63a204d456c2e553d299f48d',
      branch: 'main',
      build_id: 'https://1f96e004.anchorfact.pages.dev'
    },
    content_counts: {
      articles: 3,
      public: 2,
      draft: 1,
      claims: 3
    },
    artifacts: {
      manifest_json: {
        path: '/manifest.json',
        sha256: sha256Text(manifestText),
        bytes: Buffer.byteLength(manifestText, 'utf8')
      },
      claims_json: {
        path: '/claims.json',
        sha256: sha256Text(claimsText),
        bytes: Buffer.byteLength(claimsText, 'utf8')
      },
      llms_txt: {
        path: '/llms.txt',
        sha256: sha256Text(llms),
        bytes: Buffer.byteLength(llms, 'utf8')
      }
    }
  };

  const finalProvenance = {
    ...provenance,
    ...overrides.provenance,
    artifacts: {
      ...provenance.artifacts,
      ...overrides.artifacts
    }
  };

  return {
    baseUrl,
    fetchImpl: makeFetch({
      [`${baseUrl}/provenance.json`]: { body: JSON.stringify(finalProvenance, null, 2) },
      [`${baseUrl}/manifest.json`]: { body: manifestText },
      [`${baseUrl}/claims.json`]: { body: claimsText },
      [`${baseUrl}/llms.txt`]: { body: llms, contentType: 'text/plain; charset=utf-8' },
      'https://api.github.com/repos/anchorfact/anchorfact/commits/75b8761df7e7a92d63a204d456c2e553d299f48d': {
        body: JSON.stringify({ sha: '75b8761df7e7a92d63a204d456c2e553d299f48d' })
      }
    })
  };
}

console.log('AnchorFact Provenance Verification Tests\n');

test('verifyLiveProvenance accepts matching official live artifacts', async () => {
  const fixture = buildFixture();
  const result = await verifyLiveProvenance({
    baseUrl: fixture.baseUrl,
    fetchImpl: fixture.fetchImpl
  });
  assertEq(result.ok, true);
  assertEq(result.failures, []);
  assertEq(result.artifacts.manifest_json.ok, true);
  assertEq(result.commit.ok, true);
});

test('verifyLiveProvenance rejects artifact hash mismatches', async () => {
  const fixture = buildFixture({
    artifacts: {
      claims_json: {
        path: '/claims.json',
        sha256: '0'.repeat(64),
        bytes: 1
      }
    }
  });
  const result = await verifyLiveProvenance({
    baseUrl: fixture.baseUrl,
    fetchImpl: fixture.fetchImpl
  });
  assertEq(result.ok, false);
  assert(result.failures.some(failure => failure.includes('claims_json sha256 mismatch')), 'claims hash mismatch should fail');
});

test('verifyLiveProvenance rejects unsafe artifact paths', async () => {
  const fixture = buildFixture({
    artifacts: {
      manifest_json: {
        path: 'https://example.com/manifest.json',
        sha256: '0'.repeat(64),
        bytes: 1
      }
    }
  });
  const result = await verifyLiveProvenance({
    baseUrl: fixture.baseUrl,
    fetchImpl: fixture.fetchImpl
  });
  assertEq(result.ok, false);
  assert(result.failures.some(failure => failure.includes('unsafe artifact path')), 'unsafe artifact path should fail');
});

for (const { name, fn } of tests) {
  try {
    await fn();
    passed++;
    console.log(`  ok ${name}`);
  } catch (e) {
    failed++;
    console.log(`  fail ${name}: ${e.message}`);
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
