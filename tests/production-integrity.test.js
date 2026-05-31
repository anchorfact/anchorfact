#!/usr/bin/env node
import {
  DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS,
  DEFAULT_EXPECTED_COUNTS,
  buildIntegrityReport,
  checkProductionEdgeCache,
  renderIntegrityMarkdown,
  runProductionIntegrity
} from '../scripts/production-integrity.js';
import { REQUIRED_SECURITY_HEADERS, evalCallRoutes, exampleWorkflowRoutes, fetchRoute, hasCanonicalSlug, readJsonRoute, repairQueueBatchFailures } from '../src/smoke-production.js';

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
      content_counts: { public: 630, draft: 370, claims: 1933 },
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

function edgeResponse({
  status = 200,
  cacheStatus = 'HIT',
  age = '1',
  cacheControl = 'public, max-age=3600'
} = {}) {
  return {
    status,
    ok: status >= 200 && status < 300,
    url: 'https://anchorfact.org/fixture.json',
    headers: new Map([
      ['cf-cache-status', cacheStatus],
      ['age', age],
      ['cache-control', cacheControl]
    ]),
    async text() {
      return '';
    }
  };
}

console.log('AnchorFact Production Integrity Tests\n');

test('buildIntegrityReport summarizes a passing production check', () => {
  const report = buildIntegrityReport({
    generatedAt: '2026-05-29T00:00:00.000Z',
    baseUrl: 'https://anchorfact.org',
    expectedCounts: DEFAULT_EXPECTED_COUNTS,
    smoke: { ok: true, stdout: 'smoke ok', stderr: '' },
    provenance: provenanceResult(),
    aiEvals: { ok: true, eval_count: 11, passed: 11, failed: 0, failures: [], results: [] },
    edgeCache: { ok: true, failures: [], static_artifacts: [], dynamic_controls: [] }
  });

  assertEq(report.ok, true);
  assertEq(report.failures, []);
  assertEq(report.counts.public, 630);
  assertEq(report.signature.trusted, true);
  assertEq(report.checks.ai_evals, true);
  assertEq(report.checks.edge_cache, true);
  assertEq(report.artifacts.claims_json, 'b'.repeat(64));
  const markdown = renderIntegrityMarkdown(report);
  assert(markdown.includes('AnchorFact Production Integrity - PASS'), 'markdown should show pass');
  assert(markdown.includes('signature: status=signed, ok=true, trusted=true'), 'markdown should include signature status');
  assert(markdown.includes('edge cache: pass'), 'markdown should include edge cache status');
});

test('buildIntegrityReport fails when production smoke fails', () => {
  const report = buildIntegrityReport({
    generatedAt: '2026-05-29T00:00:00.000Z',
    baseUrl: 'https://anchorfact.org',
    expectedCounts: DEFAULT_EXPECTED_COUNTS,
    smoke: { ok: false, stdout: '', stderr: 'smoke failed' },
    provenance: provenanceResult(),
    aiEvals: { ok: true, eval_count: 11, passed: 11, failed: 0, failures: [], results: [] }
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
    aiEvals: { ok: true, eval_count: 11, passed: 11, failed: 0, failures: [], results: [] },
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

test('buildIntegrityReport fails when AI evals fail', () => {
  const report = buildIntegrityReport({
    generatedAt: '2026-05-29T00:00:00.000Z',
    baseUrl: 'https://anchorfact.org',
    expectedCounts: DEFAULT_EXPECTED_COUNTS,
    smoke: { ok: true, stdout: 'smoke ok', stderr: '' },
    aiEvals: {
      ok: false,
      eval_count: 1,
      passed: 0,
      failed: 1,
      failures: [],
      results: [{ id: 'mcp_tool_catalog', ok: false, failures: ['missing tool'] }]
    },
    provenance: provenanceResult()
  });

  assertEq(report.ok, false);
  assert(report.failures.includes('AI evals failed'), 'AI eval failure should be reported');
  assert(report.failures.some(failure => failure.includes('mcp_tool_catalog')), 'AI eval details should be included');
});

test('buildIntegrityReport fails when edge cache check fails', () => {
  const report = buildIntegrityReport({
    generatedAt: '2026-05-29T00:00:00.000Z',
    baseUrl: 'https://anchorfact.org',
    expectedCounts: DEFAULT_EXPECTED_COUNTS,
    smoke: { ok: true, stdout: 'smoke ok', stderr: '' },
    aiEvals: { ok: true, eval_count: 11, passed: 11, failed: 0, failures: [], results: [] },
    provenance: provenanceResult(),
    edgeCache: {
      ok: false,
      failures: ['/graph.json never reached an edge cache hit status'],
      static_artifacts: [],
      dynamic_controls: []
    }
  });

  assertEq(report.ok, false);
  assert(report.failures.includes('Edge cache verification failed'), 'edge cache failure should be reported');
  assert(report.failures.some(failure => failure.includes('/graph.json')), 'edge cache details should be included');
  const markdown = renderIntegrityMarkdown(report);
  assert(markdown.includes('edge cache: fail'), 'markdown should show edge cache failure');
});

test('checkProductionEdgeCache verifies static artifacts warm to cache hits and API stays dynamic', async () => {
  const calls = [];
  const perPathCalls = new Map();
  const result = await checkProductionEdgeCache({
    baseUrl: 'https://anchorfact.org',
    staticArtifacts: ['/graph.json', '/search-index.json'],
    dynamicControls: ['/api/context?q=gaussian&limit=1'],
    fetchImpl: async (url, options = {}) => {
      const parsed = new URL(String(url));
      const path = `${parsed.pathname}${parsed.search}`;
      const count = (perPathCalls.get(path) || 0) + 1;
      perPathCalls.set(path, count);
      calls.push({ path, method: options.method });
      if (path.startsWith('/api/')) return edgeResponse({ cacheStatus: 'DYNAMIC', age: '0', cacheControl: 'public, max-age=0, must-revalidate' });
      return edgeResponse({ cacheStatus: count === 1 ? 'MISS' : 'HIT', age: count === 1 ? '0' : '1' });
    }
  });

  assertEq(result.ok, true);
  assertEq(result.failures, []);
  assertEq(calls.every(call => call.method === 'HEAD'), true);
  assertEq(perPathCalls.get('/graph.json'), 2);
  assertEq(perPathCalls.get('/search-index.json'), 2);
  assertEq(perPathCalls.get('/api/context?q=gaussian&limit=1'), 1);
});

test('checkProductionEdgeCache retries transient dynamic control network failures', async () => {
  let calls = 0;
  const result = await checkProductionEdgeCache({
    baseUrl: 'https://anchorfact.org',
    staticArtifacts: [],
    dynamicControls: ['/api/context?q=gaussian&limit=1'],
    routeRetryDelayMs: 0,
    fetchImpl: async () => {
      calls++;
      if (calls <= 3) throw new Error('temporary edge connection failure');
      return edgeResponse({
        cacheStatus: 'DYNAMIC',
        age: '0',
        cacheControl: 'public, max-age=0, must-revalidate'
      });
    }
  });

  assertEq(result.ok, true);
  assertEq(result.failures, []);
  assertEq(calls, 4);
  assertEq(result.dynamic_controls[0].status, 200);
});

test('checkProductionEdgeCache fails when a static artifact remains dynamic', async () => {
  const result = await checkProductionEdgeCache({
    baseUrl: 'https://anchorfact.org',
    staticArtifacts: ['/graph.json'],
    dynamicControls: ['/api/context?q=gaussian&limit=1'],
    fetchImpl: async (url) => {
      const parsed = new URL(String(url));
      return parsed.pathname.startsWith('/api/')
        ? edgeResponse({ cacheStatus: 'DYNAMIC', age: '0', cacheControl: 'public, max-age=0, must-revalidate' })
        : edgeResponse({ cacheStatus: 'DYNAMIC', age: '0' });
    }
  });

  assertEq(result.ok, false);
  assert(result.failures.some(failure => failure.includes('/graph.json')), 'static cache failure should name the artifact');
  assert(result.static_artifacts[0].attempts.every(attempt => attempt.cf_cache_status === 'DYNAMIC'), 'attempt history should preserve cache statuses');
});

test('checkProductionEdgeCache fails when an API control is edge cached', async () => {
  const result = await checkProductionEdgeCache({
    baseUrl: 'https://anchorfact.org',
    staticArtifacts: ['/graph.json'],
    dynamicControls: ['/api/context?q=gaussian&limit=1'],
    fetchImpl: async (url) => {
      const parsed = new URL(String(url));
      return parsed.pathname.startsWith('/api/')
        ? edgeResponse({ cacheStatus: 'HIT', age: '5', cacheControl: 'public, max-age=0, must-revalidate' })
        : edgeResponse({ cacheStatus: 'HIT', age: '5' });
    }
  });

  assertEq(result.ok, false);
  assert(result.failures.some(failure => failure.includes('/api/context')), 'dynamic control failure should name the API route');
  assertEq(result.dynamic_controls[0].cf_cache_status, 'HIT');
});

test('checkProductionEdgeCache fails when a dynamic control remains client-cacheable', async () => {
  const result = await checkProductionEdgeCache({
    baseUrl: 'https://anchorfact.org',
    staticArtifacts: [],
    dynamicControls: ['/graph.json'],
    fetchImpl: async () => edgeResponse({
      cacheStatus: 'DYNAMIC',
      age: '0',
      cacheControl: 'public, max-age=3600'
    })
  });

  assertEq(result.ok, false);
  assert(result.failures.some(failure => failure.includes('must be revalidated by clients')), 'dynamic cache-control failure should be explicit');
  assertEq(result.dynamic_controls[0].cache_control, 'public, max-age=3600');
});

test('default edge cache controls keep signed provenance dynamic', () => {
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/provenance.json'), 'provenance.json should not be edge cached');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/provenance.sig'), 'provenance.sig should not be edge cached');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/graph.json'), 'signed graph artifact should not be edge cached without versioned URLs');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/search-index.json'), 'signed search artifact should not be edge cached without versioned URLs');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/claims.json'), 'signed claims artifact should not be edge cached without versioned URLs');
});

test('runProductionIntegrity wires smoke and signed verifier dependencies', async () => {
  let smokeCalled = false;
  let evalCalled = false;
  let edgeCacheCalled = false;
  const delays = [];
  let verifierArgs = null;
  const report = await runProductionIntegrity({
    baseUrl: 'https://anchorfact.org',
    publicKeyPath: 'keys/provenance.pub.pem',
    generatedAt: '2026-05-29T00:00:00.000Z',
    sleepImpl: async (ms) => {
      delays.push(ms);
    },
    smokeRunner: ({ expectedCounts }) => {
      smokeCalled = true;
      assertEq(expectedCounts, DEFAULT_EXPECTED_COUNTS);
      return { ok: true, stdout: 'smoke ok', stderr: '' };
    },
    evalRunner: async ({ baseUrl, routeRetries, routeRetryDelayMs, routeIntervalMs }) => {
      evalCalled = true;
      assertEq(baseUrl, 'https://anchorfact.org');
      assert(routeRetries >= 4, 'production integrity evals should use conservative retry count');
      assert(routeRetryDelayMs >= 500, 'production integrity evals should use conservative retry delay');
      assert(routeIntervalMs > 0, 'production integrity evals should pace route calls');
      return { ok: true, eval_count: 11, passed: 11, failed: 0, failures: [], results: [] };
    },
    edgeCacheChecker: async ({ baseUrl }) => {
      edgeCacheCalled = true;
      assertEq(baseUrl, 'https://anchorfact.org');
      return { ok: true, failures: [], static_artifacts: [], dynamic_controls: [] };
    },
    verifier: async (args) => {
      verifierArgs = args;
      return provenanceResult();
    }
  });

  assertEq(report.ok, true);
  assertEq(smokeCalled, true);
  assertEq(evalCalled, true);
  assertEq(edgeCacheCalled, true);
  assert(delays.some(ms => ms > 0), 'production integrity should cool down after smoke before AI evals');
  assertEq(verifierArgs.requireSignature, true);
  assertEq(verifierArgs.requireTrustedSignature, true);
  assert(Array.isArray(verifierArgs.trustedPublicKeys), 'trusted public keys should be loaded');
});

test('runProductionIntegrity retries transient AI eval suite failures once', async () => {
  let evalCalls = 0;
  const delays = [];
  const report = await runProductionIntegrity({
    baseUrl: 'https://anchorfact.org',
    publicKeyPath: 'keys/provenance.pub.pem',
    generatedAt: '2026-05-29T00:00:00.000Z',
    sleepImpl: async (ms) => {
      delays.push(ms);
    },
    smokeRunner: () => ({ ok: true, stdout: 'smoke ok', stderr: '' }),
    evalRunner: async () => {
      evalCalls++;
      if (evalCalls === 1) {
        return {
          ok: false,
          eval_count: 1,
          passed: 0,
          failed: 1,
          failures: [],
          results: [
            {
              id: 'query_routing_http_status_codes',
              ok: false,
              failures: ['/api/evidence?q=HTTP+status+codes&limit=3 status expected 200, got 503']
            }
          ]
        };
      }
      return { ok: true, eval_count: 1, passed: 1, failed: 0, failures: [], results: [] };
    },
    edgeCacheChecker: async () => ({ ok: true, failures: [], static_artifacts: [], dynamic_controls: [] }),
    verifier: async () => provenanceResult()
  });

  assertEq(report.ok, true);
  assertEq(evalCalls, 2);
  assert(delays.length >= 2, 'should wait after smoke and before retrying failed AI evals');
  assertEq(report.ai_evals.attempts, 2);
  assertEq(report.ai_evals.attempt_history.length, 2);
  assertEq(report.ai_evals.attempt_history[0].ok, false);
  assert(report.ai_evals.attempt_history[0].failed_results[0].id === 'query_routing_http_status_codes', 'first attempt should preserve failed eval id');
  assert(report.ai_evals.attempt_history[0].failed_results[0].failures[0].includes('503'), 'first attempt should preserve failed eval reason');
  assertEq(report.ai_evals.attempt_history[1].ok, true);

  const markdown = renderIntegrityMarkdown(report);
  assert(markdown.includes('## AI Eval Attempts'), 'markdown should include attempt history section');
  assert(markdown.includes('attempt 1: fail'), 'markdown should show failed first attempt');
  assert(markdown.includes('query_routing_http_status_codes'), 'markdown should name the failed eval');
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

test('production smoke retries transient route fetch failures', async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async (url) => {
    calls++;
    if (calls <= 3) {
      throw new Error('temporary network failure');
    }
    return {
      status: 200,
      ok: true,
      url: String(url),
      headers: new Map([['content-type', 'text/html; charset=utf-8']]),
      async text() {
        return '<!doctype html><meta name="robots" content="noindex">';
      }
    };
  };

  try {
    const result = await fetchRoute('https://anchorfact.org', '/drafts.html', { routeRetryDelayMs: 0 });
    assertEq(result.status, 200);
    assertEq(calls, 4);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('production smoke retries transient empty JSON route bodies', async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async (url, options = {}) => {
    calls++;
    assert(options.redirect === 'follow', 'retry fetch should keep live fetch options');
    return {
      status: 200,
      ok: true,
      url: String(url),
      headers: new Map([['content-type', 'application/json; charset=utf-8']]),
      async text() {
        return calls === 1 ? '' : '{"ok":true}';
      }
    };
  };

  try {
    const results = {};
    const payload = await readJsonRoute('https://anchorfact.org', '/agent.json', results, { retryDelayMs: 0 });
    assertEq(payload, { ok: true });
    assertEq(calls, 2);
    assertEq(results['/agent.json'].body, '{"ok":true}');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('production smoke retries transient 5xx route responses', async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async (url) => {
    calls++;
    if (calls === 1) {
      return {
        status: 503,
        ok: false,
        url: String(url),
        headers: new Map([['content-type', 'application/json; charset=utf-8']]),
        async text() {
          return '{"error":"temporary edge failure"}';
        }
      };
    }
    return {
      status: 200,
      ok: true,
      url: String(url),
      headers: new Map([['content-type', 'application/json; charset=utf-8']]),
      async text() {
        return '{"schema_version":"anchorfact.evidence-api.v1"}';
      }
    };
  };

  try {
    const result = await fetchRoute('https://anchorfact.org', '/api/evidence?q=gaussian', { routeRetryDelayMs: 0 });
    assertEq(result.status, 200);
    assertEq(calls, 2);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('production smoke applies configured retry count to transient 5xx route responses', async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async (url) => {
    calls++;
    if (calls <= 3) {
      return {
        status: 503,
        ok: false,
        url: String(url),
        headers: new Map([['content-type', 'application/json; charset=utf-8']]),
        async text() {
          return '{"error":"temporary edge failure"}';
        }
      };
    }
    return {
      status: 200,
      ok: true,
      url: String(url),
      headers: new Map([['content-type', 'application/json; charset=utf-8']]),
      async text() {
        return '{"schema_version":"anchorfact.evidence-api.v1"}';
      }
    };
  };

  try {
    const result = await fetchRoute('https://anchorfact.org', '/api/evidence?q=gaussian', {
      routeRetries: 4,
      routeRetryDelayMs: 0
    });
    assertEq(result.status, 200);
    assertEq(calls, 4);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('production smoke requires baseline security response headers', () => {
  assert(REQUIRED_SECURITY_HEADERS.some(header => header.name === 'X-Content-Type-Options' && header.expected === 'nosniff'), 'should require nosniff');
  assert(REQUIRED_SECURITY_HEADERS.some(header => header.name === 'X-Frame-Options' && header.expected === 'DENY'), 'should require frame protection');
  assert(REQUIRED_SECURITY_HEADERS.some(header => header.name === 'Referrer-Policy' && header.expected === 'strict-origin-when-cross-origin'), 'should require referrer policy');
  assert(REQUIRED_SECURITY_HEADERS.some(header => header.name === 'Permissions-Policy' && header.expected === 'camera=()'), 'should require permissions policy');
});

test('production smoke treats missing canonical slug arrays as a failed assertion value', () => {
  assertEq(hasCanonicalSlug(undefined, 'ai/3d-generation-gaussian-splatting'), false);
  assertEq(hasCanonicalSlug({}, 'ai/3d-generation-gaussian-splatting'), false);
  assertEq(hasCanonicalSlug([{ canonical_slug: 'ai/3d-generation-gaussian-splatting' }], 'ai/3d-generation-gaussian-splatting'), true);
});

test('production smoke can extract safe executable example workflow routes', () => {
  const routes = exampleWorkflowRoutes({
    examples: [
      {
        workflow: [
          { call: { method: 'GET', path: '/api/search?q=gaussian&limit=3' } },
          { call: { method: 'GET', path: '/api/search?q=gaussian&limit=3' } },
          { call: { method: 'POST', path: '/api/search?q=ignored' } },
          { call: { method: 'GET', path: 'https://example.com/external' } },
          { call: { method: 'GET', path: '/../unsafe' } },
          { call: { method: 'GET', path: '/examples.json' } }
        ]
      }
    ]
  });

  assertEq(routes, ['/api/search?q=gaussian&limit=3', '/examples.json']);
});

test('production smoke can extract safe executable eval routes', () => {
  const routes = evalCallRoutes({
    evals: [
      { call: { method: 'GET', path: '/api/evidence?q=gaussian&limit=3' } },
      { call: { method: 'GET', path: '/api/evidence?q=gaussian&limit=3' } },
      { call: { method: 'POST', path: '/api/evidence?q=ignored' } },
      { call: { method: 'GET', path: 'https://example.com/external' } },
      { call: { method: 'GET', path: '/../unsafe' } },
      { call: { method: 'GET', path: '/graph.json' } }
    ]
  });

  assertEq(routes, ['/api/evidence?q=gaussian&limit=3', '/graph.json']);
});

test('production smoke validates conservative content-health repair batches', () => {
  assertEq(repairQueueBatchFailures({
    candidate_count: 3,
    next_batch_size: 2,
    next_batch: [{ canonical_slug: 'ai/a' }, { canonical_slug: 'ai/b' }]
  }), []);

  const failures = repairQueueBatchFailures({
    candidate_count: 3,
    next_batch_size: 3,
    next_batch: [{ canonical_slug: 'ai/a' }, { canonical_slug: 'ai/b' }, { canonical_slug: 'ai/c' }]
  });
  assert(failures.some(failure => failure.includes('expected 2')), 'legacy 3+ repair batches should fail smoke');
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
