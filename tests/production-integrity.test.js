#!/usr/bin/env node
import {
  DEFAULT_EXPECTED_COUNTS,
  buildIntegrityReport,
  renderIntegrityMarkdown,
  runProductionIntegrity
} from '../scripts/production-integrity.js';
import { fetchRoute } from '../src/smoke-production.js';

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

function provenanceResult(overrides = {}) {
  return {
    ok: true,
    failures: [],
    provenance: {
      content_counts: { public: 555, draft: 445, claims: 1685 },
      build: { commit_sha: '00e1bf052adcf0d5b396e0f77be0640810e557d7' },
      signature: {
        key_id: 'ed25519:fixture',
        public_key_sha256: 'f'.repeat(64)
      }
    },
    signature: {
      ok: true,
      trusted: true,
      status: 'signed',
      key_id: 'ed25519:fixture',
      public_key_sha256: 'f'.repeat(64)
    },
    artifacts: {
      manifest_json: { sha256: 'a'.repeat(64) },
      claims_json: { sha256: 'b'.repeat(64) },
      llms_txt: { sha256: 'c'.repeat(64) }
    },
    commit: { ok: true },
    ...overrides
  };
}

console.log('AnchorFact Production Integrity Tests\n');

test('buildIntegrityReport summarizes a passing production check', () => {
  const report = buildIntegrityReport({
    generatedAt: '2026-05-29T00:00:00.000Z',
    baseUrl: 'https://anchorfact.org',
    expectedCounts: DEFAULT_EXPECTED_COUNTS,
    smoke: { ok: true, stdout: 'smoke ok', stderr: '' },
    provenance: provenanceResult()
  });

  assertEq(report.ok, true);
  assertEq(report.failures, []);
  assertEq(report.counts.public, 555);
  assertEq(report.signature.trusted, true);
  assertEq(report.artifacts.claims_json, 'b'.repeat(64));
  const markdown = renderIntegrityMarkdown(report);
  assert(markdown.includes('AnchorFact Production Integrity - PASS'), 'markdown should show pass');
  assert(markdown.includes('signature: status=signed, ok=true, trusted=true'), 'markdown should include signature status');
});

test('buildIntegrityReport fails when production smoke fails', () => {
  const report = buildIntegrityReport({
    generatedAt: '2026-05-29T00:00:00.000Z',
    baseUrl: 'https://anchorfact.org',
    expectedCounts: DEFAULT_EXPECTED_COUNTS,
    smoke: { ok: false, stdout: '', stderr: 'smoke failed' },
    provenance: provenanceResult()
  });

  assertEq(report.ok, false);
  assert(report.failures.includes('Production smoke failed'), 'smoke failure should be reported');
});

test('buildIntegrityReport fails when signed provenance verification fails', () => {
  const report = buildIntegrityReport({
    generatedAt: '2026-05-29T00:00:00.000Z',
    baseUrl: 'https://anchorfact.org',
    expectedCounts: DEFAULT_EXPECTED_COUNTS,
    smoke: { ok: true, stdout: 'smoke ok', stderr: '' },
    provenance: provenanceResult({
      ok: false,
      failures: ['signature is valid but not trusted by a configured public key'],
      signature: { ok: true, trusted: false, status: 'signed' }
    })
  });

  assertEq(report.ok, false);
  assert(report.failures.includes('Signed provenance verification failed'), 'provenance failure should be reported');
  assert(report.failures.some(failure => failure.includes('not trusted')), 'verifier details should be included');
});

test('runProductionIntegrity wires smoke and signed verifier dependencies', async () => {
  let smokeCalled = false;
  let verifierArgs = null;
  const report = await runProductionIntegrity({
    baseUrl: 'https://anchorfact.org',
    publicKeyPath: 'keys/provenance.pub.pem',
    generatedAt: '2026-05-29T00:00:00.000Z',
    smokeRunner: ({ expectedCounts }) => {
      smokeCalled = true;
      assertEq(expectedCounts, DEFAULT_EXPECTED_COUNTS);
      return { ok: true, stdout: 'smoke ok', stderr: '' };
    },
    verifier: async (args) => {
      verifierArgs = args;
      return provenanceResult();
    }
  });

  assertEq(report.ok, true);
  assertEq(smokeCalled, true);
  assertEq(verifierArgs.requireSignature, true);
  assertEq(verifierArgs.requireTrustedSignature, true);
  assert(Array.isArray(verifierArgs.trustedPublicKeys), 'trusted public keys should be loaded');
});

test('production smoke fetches routes with CI-friendly live headers', async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options = {}) => {
    calls.push({ url: String(url), options });
    return {
      status: 200,
      ok: true,
      url: String(url),
      headers: new Map([
        ['content-type', 'application/json; charset=utf-8'],
        ['cache-control', 'max-age=3600']
      ]),
      async text() {
        return '{}';
      }
    };
  };

  try {
    await fetchRoute('https://anchorfact.org', '/provenance.json');
  } finally {
    globalThis.fetch = originalFetch;
  }

  assertEq(calls.length, 1);
  assert(calls[0].options.redirect === 'follow', 'smoke fetch should follow redirects');
  assert(calls[0].options.headers['User-Agent'].includes('Mozilla/5.0'), 'smoke fetch should send a browser-compatible user agent');
  assert(calls[0].options.headers.Accept.includes('application/json'), 'smoke fetch should accept JSON');
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
