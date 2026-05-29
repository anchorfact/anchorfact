#!/usr/bin/env node
import { generateKeyPairSync } from 'crypto';
import {
  CLAIMS_SCHEMA_VERSION,
  MANIFEST_SCHEMA_VERSION,
  OFFICIAL_SITE,
  OFFICIAL_SOURCE_REPOSITORY,
  PROVENANCE_SCHEMA_VERSION
} from '../src/lib/build-metadata.js';
import {
  publicKeyFingerprint,
  publicKeyId,
  signProvenanceText
} from '../src/lib/provenance-signature.js';
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

function makeFetch(routes, calls = []) {
  return async (url, options = {}) => {
    calls.push({ url, options });
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

function fixtureSigningKey() {
  const { privateKey, publicKey } = generateKeyPairSync('ed25519');
  const privateKeyPem = privateKey.export({ type: 'pkcs8', format: 'pem' }).toString();
  const publicKeyPem = publicKey.export({ type: 'spki', format: 'pem' }).toString();
  return {
    privateKeyPem,
    publicKeyPem,
    keyId: publicKeyId(publicKeyPem),
    publicKeySha256: publicKeyFingerprint(publicKeyPem)
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
  const agent = {
    schema_version: 'anchorfact.agent.v1',
    generated: '2026-05-29T00:00:00.000Z',
    official_site: baseUrl,
    current_snapshot: {
      public_articles: 2,
      draft_articles: 1,
      public_claims: 3
    }
  };
  const manifestText = JSON.stringify(manifest, null, 2);
  const claimsText = JSON.stringify(claims, null, 2);
  const agentText = JSON.stringify(agent, null, 2);
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
    signature: {
      status: 'unsigned',
      reason: 'signing_key_unavailable'
    },
    content_counts: {
      articles: 3,
      public: 2,
      draft: 1,
      claims: 3
    },
    artifacts: {
      agent_json: {
        path: '/agent.json',
        sha256: sha256Text(agentText),
        bytes: Buffer.byteLength(agentText, 'utf8')
      },
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
  if (overrides.signingKey) {
    finalProvenance.signature = {
      status: 'signed',
      algorithm: 'Ed25519',
      key_id: overrides.signingKey.keyId,
      public_key_sha256: overrides.signingKey.publicKeySha256,
      signature_url: `${baseUrl}/provenance.sig`
    };
  }
  const provenanceText = JSON.stringify(finalProvenance, null, 2);
  const signaturePayload = overrides.signingKey
    ? signProvenanceText(provenanceText, overrides.signingKey, '2026-05-29T00:00:00.000Z')
    : null;
  const routes = {
    [`${baseUrl}/provenance.json`]: { body: provenanceText },
    [`${baseUrl}/agent.json`]: { body: agentText },
    [`${baseUrl}/manifest.json`]: { body: manifestText },
    [`${baseUrl}/claims.json`]: { body: claimsText },
    [`${baseUrl}/llms.txt`]: { body: llms, contentType: 'text/plain; charset=utf-8' },
    'https://api.github.com/repos/anchorfact/anchorfact/commits/75b8761df7e7a92d63a204d456c2e553d299f48d': {
      body: JSON.stringify({ sha: '75b8761df7e7a92d63a204d456c2e553d299f48d' })
    }
  };
  if (signaturePayload) {
    routes[`${baseUrl}/provenance.sig`] = { body: JSON.stringify(signaturePayload, null, 2) };
  }

  const calls = [];

  return {
    baseUrl,
    fetchImpl: makeFetch(routes, calls),
    calls,
    signingKey: overrides.signingKey
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
  assertEq(result.signature.skipped, true);
});

test('verifyLiveProvenance sends CI-friendly live fetch headers', async () => {
  const fixture = buildFixture();
  const result = await verifyLiveProvenance({
    baseUrl: fixture.baseUrl,
    fetchImpl: fixture.fetchImpl
  });
  assertEq(result.ok, true);
  assert(fixture.calls.length > 0, 'fetch calls should be recorded');
  for (const call of fixture.calls) {
    assert(call.options.redirect === 'follow', 'live fetch should follow redirects');
    assert(call.options.headers['User-Agent'].includes('Mozilla/5.0'), 'live fetch should send a browser-compatible user agent');
    assert(call.options.headers.Accept.includes('application/json'), 'live fetch should accept JSON');
    assert(call.options.headers['Accept-Language'].includes('en-US'), 'live fetch should send accept language');
  }
});

test('verifyLiveProvenance verifies signed provenance with a trusted public key', async () => {
  const signingKey = fixtureSigningKey();
  const fixture = buildFixture({ signingKey });
  const result = await verifyLiveProvenance({
    baseUrl: fixture.baseUrl,
    fetchImpl: fixture.fetchImpl,
    requireSignature: true,
    requireTrustedSignature: true,
    trustedPublicKeys: [signingKey.publicKeyPem]
  });
  assertEq(result.ok, true);
  assertEq(result.signature.ok, true);
  assertEq(result.signature.trusted, true);
});

test('verifyLiveProvenance rejects unsigned provenance when a signature is required', async () => {
  const fixture = buildFixture();
  const result = await verifyLiveProvenance({
    baseUrl: fixture.baseUrl,
    fetchImpl: fixture.fetchImpl,
    requireSignature: true
  });
  assertEq(result.ok, false);
  assert(result.failures.some(failure => failure.includes('signature is required')), 'missing signature should fail');
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
