#!/usr/bin/env node
import { execFileSync } from 'child_process';
import {
  DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS,
  DEFAULT_EXPECTED_COUNTS,
  buildIntegrityReport,
  checkProductionDiscovery,
  checkProductionEdgeCache,
  renderIntegrityMarkdown,
  runProductionIntegrity
} from '../scripts/production-integrity.js';
import { BASE_SMOKE_ROUTES, REQUIRED_SECURITY_HEADERS, evalCallRoutes, exampleWorkflowRoutes, fetchRoute, fetchRoutes, hasCanonicalSlug, headerMaxAgeAtMost, machineNotFoundContractFailures, pagesRoutingGuardFailures, readJsonRoute, readinessDiscoveryFailures, repairQueueBatchFailures } from '../src/smoke-production.js';

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
      content_counts: { public: 1210, draft: 300, claims: 3790 },
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
      artifact_summary_json: { sha256: 'd'.repeat(64) },
      api_readiness_json: { sha256: 'e'.repeat(64) },
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
  cacheControl = 'public, max-age=3600',
  contentType = 'application/json; charset=utf-8',
  body = ''
} = {}) {
  return {
    status,
    ok: status >= 200 && status < 300,
    url: 'https://anchorfact.org/fixture.json',
    headers: new Map([
      ['cf-cache-status', cacheStatus],
      ['age', age],
      ['cache-control', cacheControl],
      ['content-type', contentType]
    ]),
    async text() {
      return body;
    }
  };
}

function discoveryResponse(body, status = 200) {
  return edgeResponse({
    status,
    cacheStatus: 'DYNAMIC',
    age: '0',
    cacheControl: 'public, max-age=0, must-revalidate',
    contentType: 'text/plain; charset=utf-8',
    body
  });
}

console.log('AnchorFact Production Integrity Tests\n');

test('default expected counts match the current trusted compiled corpus', () => {
  assertEq(DEFAULT_EXPECTED_COUNTS, {
    public: 1343,
    draft: 285,
    claims: 4277
  });
});

test('buildIntegrityReport summarizes a passing production check', () => {
  const report = buildIntegrityReport({
    generatedAt: '2026-05-29T00:00:00.000Z',
    baseUrl: 'https://anchorfact.org',
    expectedCounts: DEFAULT_EXPECTED_COUNTS,
    smoke: { ok: true, stdout: 'smoke ok', stderr: '' },
    provenance: provenanceResult(),
    aiEvals: { ok: true, eval_count: 11, passed: 11, failed: 0, failures: [], results: [] },
    edgeCache: { ok: true, failures: [], static_artifacts: [], dynamic_controls: [] },
    discovery: { ok: true, failures: [], checks: [] }
  });

  assertEq(report.ok, true);
  assertEq(report.failures, []);
  assertEq(report.counts.public, 1210);
  assertEq(report.signature.trusted, true);
  assertEq(report.checks.ai_evals, true);
  assertEq(report.checks.edge_cache, true);
  assertEq(report.checks.discovery, true);
  assertEq(report.artifacts.claims_json, 'b'.repeat(64));
  assertEq(report.artifacts.artifact_summary_json, 'd'.repeat(64));
  assertEq(report.artifacts.api_readiness_json, 'e'.repeat(64));
  const markdown = renderIntegrityMarkdown(report);
  assert(markdown.includes('AnchorFact Production Integrity - PASS'), 'markdown should show pass');
  assert(markdown.includes('signature: status=signed, ok=true, trusted=true'), 'markdown should include signature status');
  assert(markdown.includes('edge cache: pass'), 'markdown should include edge cache status');
  assert(markdown.includes('discovery: pass'), 'markdown should include discovery status');
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

test('buildIntegrityReport fails when production deploy commit lags source commit', () => {
  const sourceCommit = '1'.repeat(40);
  const deployedCommit = '2'.repeat(40);
  const report = buildIntegrityReport({
    generatedAt: '2026-05-29T00:00:00.000Z',
    baseUrl: 'https://anchorfact.org',
    expectedCounts: DEFAULT_EXPECTED_COUNTS,
    expectedSourceCommitSha: sourceCommit,
    smoke: { ok: true, stdout: 'smoke ok', stderr: '' },
    provenance: provenanceResult({
      provenance: {
        content_counts: { public: 1210, draft: 300, claims: 3790 },
        build: { commit_sha: deployedCommit },
        signature: {
          key_id: 'ed25519:fixture',
          public_key_sha256: 'f'.repeat(64)
        }
      }
    }),
    aiEvals: { ok: true, eval_count: 11, passed: 11, failed: 0, failures: [], results: [] },
    edgeCache: { ok: true, failures: [], static_artifacts: [], dynamic_controls: [] },
    discovery: { ok: true, failures: [], checks: [] }
  });

  assertEq(report.ok, false);
  assertEq(report.source_commit_sha, sourceCommit);
  assertEq(report.commit_sha, deployedCommit);
  assert(report.failures.some(failure => failure.includes('Production deploy commit is stale')), 'stale deploy commit should fail integrity');
  const markdown = renderIntegrityMarkdown(report);
  assert(markdown.includes(`source commit: ${sourceCommit}`), 'markdown should show the source commit');
  assert(markdown.includes(`deployed commit: ${deployedCommit}`), 'markdown should show the deployed commit');
});

test('renderIntegrityMarkdown includes production smoke failure diagnostics', () => {
  const report = buildIntegrityReport({
    generatedAt: '2026-05-29T00:00:00.000Z',
    baseUrl: 'https://anchorfact.org',
    expectedCounts: DEFAULT_EXPECTED_COUNTS,
    smoke: {
      ok: false,
      stdout: 'smoke stdout',
      stderr: 'received an HTML fallback where root machine JSON alias was expected'
    },
    provenance: provenanceResult(),
    aiEvals: { ok: true, eval_count: 11, passed: 11, failed: 0, failures: [], results: [] },
    edgeCache: { ok: true, failures: [], static_artifacts: [], dynamic_controls: [] },
    discovery: { ok: true, failures: [], checks: [] }
  });

  const markdown = renderIntegrityMarkdown(report);
  assert(markdown.includes('## Smoke Diagnostics'), 'markdown should include smoke diagnostics section');
  assert(markdown.includes('received an HTML fallback'), 'markdown should include smoke stderr details');
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

test('buildIntegrityReport fails when discovery check fails', () => {
  const report = buildIntegrityReport({
    generatedAt: '2026-05-29T00:00:00.000Z',
    baseUrl: 'https://anchorfact.org',
    expectedCounts: DEFAULT_EXPECTED_COUNTS,
    smoke: { ok: true, stdout: 'smoke ok', stderr: '' },
    aiEvals: { ok: true, eval_count: 11, passed: 11, failed: 0, failures: [], results: [] },
    provenance: provenanceResult(),
    edgeCache: { ok: true, failures: [], static_artifacts: [], dynamic_controls: [] },
    discovery: {
      ok: false,
      failures: ['openai_searchbot /robots.txt returned status 522'],
      checks: []
    }
  });

  assertEq(report.ok, false);
  assert(report.failures.includes('AI discovery verification failed'), 'discovery failure should be reported');
  assert(report.failures.some(failure => failure.includes('/robots.txt')), 'discovery details should be included');
  const markdown = renderIntegrityMarkdown(report);
  assert(markdown.includes('discovery: fail'), 'markdown should show discovery failure');
});

test('checkProductionEdgeCache verifies static artifacts warm to cache hits and API GET stays edge-dynamic', async () => {
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
      if (path.startsWith('/api/')) return edgeResponse({ cacheStatus: 'DYNAMIC', age: '0', cacheControl: 'public, max-age=300' });
      return edgeResponse({ cacheStatus: count === 1 ? 'MISS' : 'HIT', age: count === 1 ? '0' : '1' });
    }
  });

  assertEq(result.ok, true);
  assertEq(result.failures, []);
  assertEq(calls.filter(call => call.path.startsWith('/api/')).every(call => call.method === 'GET'), true);
  assertEq(calls.filter(call => !call.path.startsWith('/api/')).every(call => call.method === 'HEAD'), true);
  assertEq(perPathCalls.get('/graph.json'), 2);
  assertEq(perPathCalls.get('/search-index.json'), 2);
  assertEq(perPathCalls.get('/api/context?q=gaussian&limit=1'), 1);
  assertEq(result.dynamic_controls[0].cache_control, 'public, max-age=300');
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
        cacheControl: 'public, max-age=300'
      });
    }
  });

  assertEq(result.ok, true);
  assertEq(result.failures, []);
  assertEq(calls, 4);
  assertEq(result.dynamic_controls[0].status, 200);
});

test('checkProductionEdgeCache limits dynamic control concurrency and preserves result order', async () => {
  let active = 0;
  let maxActive = 0;
  const dynamicControls = ['/first.json', '/second.json', '/third.json', '/fourth.json'];
  const result = await checkProductionEdgeCache({
    baseUrl: 'https://anchorfact.org',
    staticArtifacts: [],
    dynamicControls,
    dynamicConcurrency: 2,
    fetchImpl: async () => {
      active++;
      maxActive = Math.max(maxActive, active);
      await new Promise(resolve => setTimeout(resolve, 5));
      active--;
      return edgeResponse({
        cacheStatus: 'DYNAMIC',
        age: '0',
        cacheControl: 'public, max-age=0, must-revalidate'
      });
    }
  });

  assertEq(result.ok, true);
  assertEq(result.dynamic_controls.map(item => item.path), dynamicControls);
  assertEq(maxActive, 2);
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
        ? edgeResponse({ cacheStatus: 'HIT', age: '5', cacheControl: 'public, max-age=300' })
        : edgeResponse({ cacheStatus: 'HIT', age: '5' });
    }
  });

  assertEq(result.ok, false);
  assert(result.failures.some(failure => failure.includes('/api/context')), 'dynamic control failure should name the API route');
  assertEq(result.dynamic_controls[0].cf_cache_status, 'HIT');
});

test('checkProductionEdgeCache uses HEAD for signed artifact controls and requires revalidation', async () => {
  const calls = [];
  const result = await checkProductionEdgeCache({
    baseUrl: 'https://anchorfact.org',
    staticArtifacts: [],
    dynamicControls: ['/provenance.json'],
    fetchImpl: async (url, options = {}) => {
      calls.push({ url: String(url), method: options.method });
      return edgeResponse({
        cacheStatus: 'DYNAMIC',
        age: '0',
        cacheControl: 'public, max-age=300'
      });
    }
  });

  assertEq(calls[0].method, 'HEAD');
  assertEq(result.dynamic_controls[0].method, 'HEAD');
  assertEq(result.dynamic_controls[0].contract, 'signed_artifact_head');
  assertEq(result.ok, false);
  assert(result.failures.some(failure => failure.includes('must be revalidated by clients')), 'signed artifact cache-control failure should be explicit');
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
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/api'), 'API discovery route should be checked with real GET semantics');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/api/evidence?q=gaussian&limit=1'), 'evidence API route should be checked with real GET semantics');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/api/plan?q=gaussian&limit=1'), 'plan API route should be checked with real GET semantics');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/'), 'root slash machine index alias should not be edge cached without versioned URLs');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/index.json'), 'root machine index should not be edge cached without versioned URLs');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/api-access/'), 'API access policy should not be edge cached without versioned URLs');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/drafts.html'), 'drafts machine index should not be edge cached without versioned URLs');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/dashboard.html'), 'dashboard machine artifact should not be edge cached without versioned URLs');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/provenance.json'), 'provenance.json should not be edge cached');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/provenance.sig'), 'provenance.sig should not be edge cached');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/graph.json'), 'signed graph artifact should not be edge cached without versioned URLs');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/search-index.json'), 'signed search artifact should not be edge cached without versioned URLs');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/claims.json'), 'signed claims artifact should not be edge cached without versioned URLs');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/artifact-summary.json'), 'signed artifact summary should not be edge cached without versioned URLs');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/artifact-shards.json'), 'signed artifact shard registry should not be edge cached without versioned URLs');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/api-readiness.json'), 'signed API readiness artifact should not be edge cached without versioned URLs');
  assert(DEFAULT_EDGE_CACHE_DYNAMIC_CONTROLS.includes('/404.html'), 'machine JSON 404 artifact should not be edge cached without versioned URLs');
});

test('checkProductionDiscovery verifies AI entrypoints with browser and AI user agents', async () => {
  const calls = [];
  const result = await checkProductionDiscovery({
    baseUrl: 'https://anchorfact.org',
    routes: ['/robots.txt', '/llms.txt', '/agent.json', '/api'],
    userAgentProfiles: [
      { name: 'browser_monitor', userAgent: 'Mozilla/5.0 AnchorFact Monitor' },
      { name: 'openai_searchbot', userAgent: 'Mozilla/5.0 AppleWebKit/537.36; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot' }
    ],
    fetchImpl: async (url, options = {}) => {
      const parsed = new URL(String(url));
      calls.push({
        path: parsed.pathname,
        method: options.method,
        userAgent: options.headers?.['User-Agent']
      });
      if (parsed.pathname === '/robots.txt' || parsed.pathname === '/llms.txt') {
        return discoveryResponse('AI-Context: https://anchorfact.org/api/context?q={query}\nAI-Evidence: https://anchorfact.org/api/evidence?q={query}\nAI-Plan: https://anchorfact.org/api/plan?q={query}\n');
      }
      return discoveryResponse('{"schema_version":"anchorfact.fixture"}', 200);
    }
  });

  assertEq(result.ok, true);
  assertEq(result.failures, []);
  assertEq(calls.length, 8);
  assert(calls.every(call => call.method === 'GET'), 'discovery checks should use real GET requests');
  assert(calls.some(call => call.userAgent.includes('OAI-SearchBot')), 'discovery checks should include AI crawler user agent');
  assert(result.checks.some(check => check.route === '/robots.txt' && check.user_agent_profile === 'openai_searchbot'), 'report should include per-route AI UA checks');
});

test('checkProductionDiscovery fails when AI crawler cannot read recommended entrypoints', async () => {
  const result = await checkProductionDiscovery({
    baseUrl: 'https://anchorfact.org',
    routes: ['/robots.txt'],
    userAgentProfiles: [
      { name: 'openai_searchbot', userAgent: 'Mozilla/5.0 AppleWebKit/537.36; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot' }
    ],
    fetchImpl: async () => discoveryResponse('User-agent: *\nAllow: /\n')
  });

  assertEq(result.ok, false);
  assert(result.failures.some(failure => failure.includes('/api/context')), 'discovery failure should name missing recommended entrypoint');
});

test('runProductionIntegrity wires smoke and signed verifier dependencies', async () => {
  let smokeCalled = false;
  let evalCalled = false;
  let edgeCacheCalled = false;
  let discoveryCalled = false;
  const delays = [];
  let verifierArgs = null;
  const report = await runProductionIntegrity({
    baseUrl: 'https://anchorfact.org',
    publicKeyPath: 'keys/provenance.pub.pem',
    generatedAt: '2026-05-29T00:00:00.000Z',
    sourceCommitSha: '00e1bf052adcf0d5b396e0f77be0640810e557d7',
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
    discoveryChecker: async ({ baseUrl }) => {
      discoveryCalled = true;
      assertEq(baseUrl, 'https://anchorfact.org');
      return { ok: true, failures: [], checks: [] };
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
  assertEq(discoveryCalled, true);
  assert(delays.some(ms => ms > 0), 'production integrity should cool down after smoke before AI evals');
  assertEq(verifierArgs.requireSignature, true);
  assertEq(verifierArgs.requireTrustedSignature, true);
  assert(Array.isArray(verifierArgs.trustedPublicKeys), 'trusted public keys should be loaded');
  assertEq(report.source_commit_sha, '00e1bf052adcf0d5b396e0f77be0640810e557d7');
});

test('runProductionIntegrity retries transient AI eval suite failures once', async () => {
  let evalCalls = 0;
  const delays = [];
  const report = await runProductionIntegrity({
    baseUrl: 'https://anchorfact.org',
    publicKeyPath: 'keys/provenance.pub.pem',
    generatedAt: '2026-05-29T00:00:00.000Z',
    sourceCommitSha: '00e1bf052adcf0d5b396e0f77be0640810e557d7',
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
    discoveryChecker: async () => ({ ok: true, failures: [], checks: [] }),
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

test('production smoke fetches route groups with bounded concurrency and stable keys', async () => {
  let active = 0;
  let maxActive = 0;
  const routes = ['/one.json', '/two.json', '/three.json', '/four.json'];
  const results = await fetchRoutes('https://anchorfact.org', routes, {
    routeConcurrency: 2,
    routeRetries: 0,
    fetchImpl: async (url) => {
      active++;
      maxActive = Math.max(maxActive, active);
      await new Promise(resolve => setTimeout(resolve, 5));
      active--;
      return {
        status: 200,
        ok: true,
        url: String(url),
        headers: new Map([['content-type', 'application/json; charset=utf-8']]),
        async text() {
          return '{"ok":true}';
        }
      };
    }
  });

  assertEq(Object.keys(results), routes);
  assertEq(Object.values(results).every(result => result.status === 200), true);
  assertEq(maxActive, 2);
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

test('production smoke reports HTML fallback details for JSON routes', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => ({
    status: 200,
    ok: true,
    url: 'https://anchorfact.org/index.json',
    headers: new Map([['content-type', 'text/html; charset=utf-8']]),
    async text() {
      return '<!DOCTYPE html><title>AnchorFact</title>';
    }
  });

  try {
    const results = {};
    let message = '';
    try {
      await readJsonRoute('https://anchorfact.org', '/index.json', results, { retries: 0 });
    } catch (error) {
      message = error.message;
    }
    assert(message.includes('/index.json returned invalid JSON'), 'error should name the failed JSON route');
    assert(message.includes('status=200'), 'error should include HTTP status');
    assert(message.includes('content-type=text/html; charset=utf-8'), 'error should include content type');
    assert(message.includes('url=https://anchorfact.org/index.json'), 'error should include final URL');
    assert(message.includes('<!DOCTYPE html>'), 'error should include sanitized body prefix');
    assert(message.includes('received an HTML fallback'), 'error should explain the HTML fallback mode');
    assert(message.includes('root index artifact'), 'error should name the missing root index artifact');
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('production smoke validates unknown machine routes return JSON 404', () => {
  const validFailures = pagesRoutingGuardFailures({
    route: '/__anchorfact-routing-guard-check.json',
    status: 404,
    contentType: 'application/json; charset=utf-8',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      schema_version: 'anchorfact.not-found.v1',
      status: 404,
      error: { code: 'not_found' },
      fallback_policy: { no_spa_fallback: true },
      machine_entrypoints: ['/index.json', '/api/context?q={query}']
    })
  });
  assertEq(validFailures, []);

  const htmlFallbackFailures = pagesRoutingGuardFailures({
    route: '/__anchorfact-routing-guard-check.json',
    status: 200,
    contentType: 'text/html; charset=utf-8',
    headers: { 'content-type': 'text/html; charset=utf-8' },
    body: '<!DOCTYPE html><title>AnchorFact</title>'
  });
  assert(htmlFallbackFailures.some(failure => failure.includes('returned 200')), 'status failure should be explicit');
  assert(htmlFallbackFailures.some(failure => failure.includes('content-type')), 'content-type failure should be explicit');
  assert(htmlFallbackFailures.some(failure => failure.includes('valid JSON')), 'HTML fallback should be reported as invalid JSON');
});

test('production smoke covers the direct machine JSON 404 artifact contract', () => {
  assert(BASE_SMOKE_ROUTES.includes('/404.html'), 'base production smoke routes should fetch /404.html directly');

  const validFailures = machineNotFoundContractFailures({
    schema_version: 'anchorfact.not-found.v1',
    status: 404,
    error: { code: 'not_found' },
    fallback_policy: { no_spa_fallback: true },
    machine_entrypoints: ['/index.json', '/api/context?q={query}'],
    official_site: 'https://anchorfact.org'
  }, '/404.html', { expectedOfficialSite: 'https://anchorfact.org' });
  assertEq(validFailures, []);

  const driftFailures = machineNotFoundContractFailures({
    schema_version: 'anchorfact.not-found.v1',
    status: 404,
    error: { code: 'not_found' },
    fallback_policy: { no_spa_fallback: true },
    machine_entrypoints: ['/index.json'],
    official_site: 'https://example.com'
  }, '/404.html', { expectedOfficialSite: 'https://anchorfact.org' });
  assert(driftFailures.some(failure => failure.includes('machine_entrypoints')), 'entrypoint drift should fail');
  assert(driftFailures.some(failure => failure.includes('official_site')), 'official site drift should fail');
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

test('production smoke accepts bounded robots cache max-age values', () => {
  const result = (cacheControl) => ({
    route: '/robots.txt',
    headers: { 'cache-control': cacheControl }
  });

  let failures = [];
  headerMaxAgeAtMost(result('no-store, max-age=0, must-revalidate'), 14400, failures);
  headerMaxAgeAtMost(result('public, max-age=3600, stale-while-revalidate=86400'), 14400, failures);
  headerMaxAgeAtMost(result('public, max-age=14400, stale-while-revalidate=86400'), 14400, failures);
  assertEq(failures, []);

  failures = [];
  headerMaxAgeAtMost(result('public, max-age=86400'), 14400, failures);
  assert(failures.some(failure => failure.includes('expected max-age <= 14400')), 'should reject long browser TTLs');

  failures = [];
  headerMaxAgeAtMost(result('public, stale-while-revalidate=86400'), 14400, failures);
  assert(failures.some(failure => failure.includes('expected max-age <= 14400')), 'should require an explicit max-age');
});

test('production smoke module can be imported from inline module tools', () => {
  const output = execFileSync('node', [
    '--input-type=module',
    '-e',
    "await import('./src/smoke-production.js'); console.log('import ok');"
  ], { encoding: 'utf8' });
  assert(output.includes('import ok'), 'inline module import should complete');
});

test('production smoke validates readiness discovery fields across machine entrypoints', () => {
  const apiReadiness = {
    status: 'foundation_ready_pending_14_day_and_partner_signals',
    subscription_ready: false,
    runtime_signal_contract: {
      static_artifact: true,
      status_when_missing: 'not_provided',
      workflow: '.github/workflows/readiness-scorecard.yml',
      scorecard_command: 'npm run api:readiness -- --adoption-json reports/ai-adoption-scorecard.json',
      runtime_inputs: [
        { id: 'production_integrity' },
        { id: 'ai_adoption', preferred_measurement_scope: 'interactive_ai' },
        { id: 'design_partners' }
      ]
    },
    readiness_blockers: {
      gate_ids: ['production_integrity_14_day', 'design_partners']
    }
  };
  const valid = readinessDiscoveryFailures({
    rootIndex: {
      api_readiness_summary: {
        path: '/api-readiness.json',
        status: apiReadiness.status,
        subscription_ready: false,
        blocker_ids: ['production_integrity_14_day', 'design_partners'],
        runtime_signal_contract: {
          static_artifact: true,
          missing_runtime_status: 'not_provided',
          workflow: '.github/workflows/readiness-scorecard.yml',
          scorecard_command: 'npm run api:readiness -- --adoption-json reports/ai-adoption-scorecard.json',
          runtime_input_ids: ['production_integrity', 'ai_adoption', 'design_partners'],
          preferred_adoption_scope: 'interactive_ai'
        }
      }
    },
    apiReadiness,
    apiAccessPolicy: {
      readiness_policy: {
        status_endpoint: '/api-readiness.json',
        current_mode: 'free_no_key_read_only',
        paid_beta_requires: ['production_integrity_14_day', 'design_partners'],
        runtime_signal_contract: {
          static_artifact: true,
          missing_runtime_status: 'not_provided',
          workflow: '.github/workflows/readiness-scorecard.yml',
          scorecard_command: 'npm run api:readiness -- --adoption-json reports/ai-adoption-scorecard.json',
          runtime_input_ids: ['production_integrity', 'ai_adoption', 'design_partners'],
          preferred_adoption_scope: 'interactive_ai'
        }
      }
    },
    apiIndex: {
      readiness_guidance: {
        status_endpoint: '/api-readiness.json',
        default_access_until_ready: 'free_no_key_read_only',
        subscription_ready_requires: ['production_integrity_14_day', 'design_partners'],
        runtime_signal_contract: {
          static_artifact: true,
          missing_runtime_status: 'not_provided',
          workflow: '.github/workflows/readiness-scorecard.yml',
          scorecard_command: 'npm run api:readiness -- --adoption-json reports/ai-adoption-scorecard.json',
          runtime_input_ids: ['production_integrity', 'ai_adoption', 'design_partners'],
          preferred_adoption_scope: 'interactive_ai'
        }
      }
    },
    openapi: {
      components: {
        schemas: {
          RootIndex: { properties: { api_readiness_summary: { properties: { runtime_signal_contract: {} } } } },
          ApiIndex: { properties: { readiness_guidance: { properties: { runtime_signal_contract: {} } } } },
          ApiAccess: { properties: { readiness_policy: { properties: { runtime_signal_contract: {} } } } }
        }
      }
    }
  });
  assertEq(valid, []);

  const missing = readinessDiscoveryFailures({
    rootIndex: {},
    apiReadiness,
    apiAccessPolicy: {},
    apiIndex: {},
    openapi: { components: { schemas: {} } }
  });
  assert(missing.some(failure => failure.includes('root index readiness summary')), 'missing root readiness summary should fail smoke');
  assert(missing.some(failure => failure.includes('/api-access/ readiness policy')), 'missing API access readiness policy should fail smoke');
  assert(missing.some(failure => failure.includes('/api readiness guidance')), 'missing API readiness guidance should fail smoke');
  assert(missing.some(failure => failure.includes('runtime signal')), 'missing runtime signal summaries should fail smoke');
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
    next_batch: [{ canonical_slug: 'ai/a' }, { canonical_slug: 'ai/b' }],
    source_ready_candidate_count: 1,
    source_ready_next_batch_size: 1,
    source_ready_next_batch: [{ canonical_slug: 'business/source-ready' }],
    source_acquisition_candidate_count: 2,
    source_acquisition_next_batch_size: 2,
    source_acquisition_next_batch: [{ canonical_slug: 'ai/a' }, { canonical_slug: 'ai/b' }]
  }), []);

  const failures = repairQueueBatchFailures({
    candidate_count: 3,
    next_batch_size: 3,
    next_batch: [{ canonical_slug: 'ai/a' }, { canonical_slug: 'ai/b' }, { canonical_slug: 'ai/c' }],
    source_ready_candidate_count: 1,
    source_ready_next_batch_size: 1,
    source_ready_next_batch: [{ canonical_slug: 'business/source-ready' }],
    source_acquisition_candidate_count: 2,
    source_acquisition_next_batch_size: 2,
    source_acquisition_next_batch: [{ canonical_slug: 'ai/a' }, { canonical_slug: 'ai/b' }]
  });
  assert(failures.some(failure => failure.includes('expected 2')), 'legacy 3+ repair batches should fail smoke');

  const sourceReadyFailures = repairQueueBatchFailures({
    candidate_count: 0,
    next_batch_size: 0,
    next_batch: [],
    source_ready_candidate_count: 3,
    source_ready_next_batch_size: 3,
    source_ready_next_batch: [
      { canonical_slug: 'business/a' },
      { canonical_slug: 'business/b' },
      { canonical_slug: 'business/c' }
    ],
    source_acquisition_candidate_count: 0,
    source_acquisition_next_batch_size: 0,
    source_acquisition_next_batch: []
  });
  assert(sourceReadyFailures.some(failure => failure.includes('source-ready repair queue next batch size expected 2')), 'source-ready repair batches should stay conservative');

  const sourceAcquisitionFailures = repairQueueBatchFailures({
    candidate_count: 0,
    next_batch_size: 0,
    next_batch: [],
    source_ready_candidate_count: 0,
    source_ready_next_batch_size: 0,
    source_ready_next_batch: [],
    source_acquisition_candidate_count: 3,
    source_acquisition_next_batch_size: 3,
    source_acquisition_next_batch: [
      { canonical_slug: 'ai/a' },
      { canonical_slug: 'ai/b' },
      { canonical_slug: 'ai/c' }
    ]
  });
  assert(sourceAcquisitionFailures.some(failure => failure.includes('source acquisition repair queue next batch size expected 2')), 'source acquisition repair batches should stay conservative');

  const missingSourceReadyFailures = repairQueueBatchFailures({
    candidate_count: 0,
    next_batch_size: 0,
    next_batch: [],
    source_acquisition_candidate_count: 0,
    source_acquisition_next_batch_size: 0,
    source_acquisition_next_batch: []
  });
  assert(missingSourceReadyFailures.some(failure => failure.includes('source-ready repair queue candidate count is missing')), 'missing source-ready repair fields should fail smoke');

  const missingSourceAcquisitionFailures = repairQueueBatchFailures({
    candidate_count: 0,
    next_batch_size: 0,
    next_batch: [],
    source_ready_candidate_count: 0,
    source_ready_next_batch_size: 0,
    source_ready_next_batch: []
  });
  assert(missingSourceAcquisitionFailures.some(failure => failure.includes('source acquisition repair queue candidate count is missing')), 'missing source acquisition repair fields should fail smoke');
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
