#!/usr/bin/env node
import { generateKeyPairSync } from 'crypto';
import {
  ARTIFACT_SHARDS_SCHEMA_VERSION,
  CLAIMS_SCHEMA_VERSION,
  ARTIFACT_SUMMARY_SCHEMA_VERSION,
  API_READINESS_SCHEMA_VERSION,
  CAPABILITIES_SCHEMA_VERSION,
  CONTENT_HEALTH_SCHEMA_VERSION,
  COVERAGE_SCHEMA_VERSION,
  EVALS_SCHEMA_VERSION,
  EXAMPLES_SCHEMA_VERSION,
  GRAPH_SCHEMA_VERSION,
  MANIFEST_SCHEMA_VERSION,
  MCP_SCHEMA_VERSION,
  OFFICIAL_SITE,
  OFFICIAL_SOURCE_REPOSITORY,
  OPENAPI_SCHEMA_VERSION,
  PROVENANCE_SCHEMA_VERSION,
  SEARCH_INDEX_SCHEMA_VERSION,
  TOPICS_SCHEMA_VERSION
} from '../src/lib/build-metadata.js';
import {
  publicKeyFingerprint,
  publicKeyId,
  signProvenanceText
} from '../src/lib/provenance-signature.js';
import { fetchLiveText } from '../src/lib/live-http.js';
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
  const openapi = {
    openapi: '3.1.0',
    info: { title: 'AnchorFact Machine API', version: '0.3.0' },
    servers: [{ url: baseUrl }],
    'x-anchorfact-schema-version': OPENAPI_SCHEMA_VERSION,
    'x-provenance-url': `${baseUrl}/provenance.json`,
    paths: {
      '/agent.json': {},
      '/claims.json': {},
      '/topics.json': {},
      '/capabilities.json': {},
      '/coverage.json': {},
      '/examples.json': {},
      '/graph.json': {},
      '/evals.json': {},
      '/mcp.json': {},
      '/artifact-summary.json': {},
      '/artifact-shards.json': {},
      '/search-index.json': {},
      '/sources.json': {},
      '/provenance.json': {}
    }
  };
  const sources = {
    schema_version: 'anchorfact.sources.v1',
    generated: '2026-05-29T00:00:00.000Z',
    provenance_url: `${baseUrl}/provenance.json`,
    source_count: 1,
    public_article_count: 2,
    public_claim_count: 3,
    sources: [{ id: 'source:fixture', title: 'Fixture Paper', tier: 'S' }]
  };
  const topics = {
    schema_version: TOPICS_SCHEMA_VERSION,
    generated: '2026-05-29T00:00:00.000Z',
    provenance_url: `${baseUrl}/provenance.json`,
    topic_count: 1,
    public_article_count: 2,
    public_claim_count: 3,
    topics: [{ id: 'fixture', title: 'Fixture', article_count: 2, claim_count: 3, source_count: 1 }]
  };
  const capabilities = {
    schema_version: CAPABILITIES_SCHEMA_VERSION,
    generated: '2026-05-29T00:00:00.000Z',
    provenance_url: `${baseUrl}/provenance.json`,
    capability_count: 1,
    default_sequence: ['verify_official_build'],
    selection_rules: [{ when: 'fixture', use_capability: 'verify_official_build' }],
    capabilities: [{ id: 'verify_official_build' }]
  };
  const coverage = {
    schema_version: COVERAGE_SCHEMA_VERSION,
    generated: '2026-05-29T00:00:00.000Z',
    provenance_url: `${baseUrl}/provenance.json`,
    coverage_summary: {
      public_articles: 2,
      draft_articles: 1,
      public_claims: 3,
      topics: 1,
      unique_sources: 1,
      confidence_distribution: { high: 0, medium: 2, low: 0 },
      source_verification: { full: 2, partial: 0, none: 0, full_ratio: 1 },
      source_tier_distribution: { S: 1 },
      top_source_types: [{ type: 'academic_paper', count: 1 }]
    },
    topic_coverage: [{ id: 'fixture', article_count: 2, claim_count: 3, source_count: 1 }],
    best_entrypoints: { answer_with_evidence: '/api/evidence?q={query}&limit=3' },
    recommended_decision_flow: [],
    coverage_limits: [{ id: 'not_general_web_search' }]
  };
  const search = {
    schema_version: SEARCH_INDEX_SCHEMA_VERSION,
    generated: '2026-05-29T00:00:00.000Z',
    provenance_url: `${baseUrl}/provenance.json`,
    article_count: 2,
    public_claim_count: 3,
    records: [
      {
        canonical_slug: 'fixture',
        title: 'Fixture',
        url: `${baseUrl}/fixture/`,
        claim_count: 3,
        source_count: 1
      }
    ]
  };
  const examples = {
    schema_version: EXAMPLES_SCHEMA_VERSION,
    generated: '2026-05-29T00:00:00.000Z',
    provenance_url: `${baseUrl}/provenance.json`,
    example_count: 1,
    examples: [{ id: 'fixture_example', workflow: [] }]
  };
  const graph = {
    schema_version: GRAPH_SCHEMA_VERSION,
    generated: '2026-05-29T00:00:00.000Z',
    provenance_url: `${baseUrl}/provenance.json`,
    public_article_count: 2,
    public_claim_count: 3,
    source_count: 1,
    topic_count: 1,
    node_count: 7,
    edge_count: 6,
    nodes: [
      { id: 'topic:fixture', type: 'topic' },
      { id: 'article:fixture', type: 'article' },
      { id: 'article:fixture-two', type: 'article' },
      { id: 'https://anchorfact.org/fact/f1', type: 'claim' },
      { id: 'https://anchorfact.org/fact/f2', type: 'claim' },
      { id: 'https://anchorfact.org/fact/f3', type: 'claim' },
      { id: 'source:fixture', type: 'source' }
    ],
    edges: [
      { type: 'topic_contains_article', from: 'topic:fixture', to: 'article:fixture' },
      { type: 'topic_contains_article', from: 'topic:fixture', to: 'article:fixture-two' },
      { type: 'article_has_claim', from: 'article:fixture', to: 'https://anchorfact.org/fact/f1' },
      { type: 'article_has_claim', from: 'article:fixture', to: 'https://anchorfact.org/fact/f2' },
      { type: 'article_has_claim', from: 'article:fixture-two', to: 'https://anchorfact.org/fact/f3' },
      { type: 'claim_supported_by_source', from: 'https://anchorfact.org/fact/f1', to: 'source:fixture' }
    ]
  };
  const evals = {
    schema_version: EVALS_SCHEMA_VERSION,
    generated: '2026-05-29T00:00:00.000Z',
    provenance_url: `${baseUrl}/provenance.json`,
    eval_count: 1,
    evals: [
      {
        id: 'fixture_eval',
        call: { method: 'GET', path: '/provenance.json', url: `${baseUrl}/provenance.json` },
        expected: {
          status: 200,
          required_artifacts: ['evals_json', 'mcp_json']
        }
      }
    ]
  };
  const contentHealth = {
    schema_version: CONTENT_HEALTH_SCHEMA_VERSION,
    generated: '2026-05-29T00:00:00.000Z',
    provenance_url: `${baseUrl}/provenance.json`,
    snapshot: { public_articles: 2, draft_articles: 1, public_claims: 3 },
    public: { source_coverage: { full: 2, partial: 0, zero: 0 } },
    draft: { source_coverage: { full: 0, partial: 0, zero: 1 } },
    machine_guidance: ['Use /api/context?q={query} for prompt assembly.'],
    trust_boundaries: { draft_entries_excluded_from_ai_entrypoints: true }
  };
  const mcp = {
    schema_version: MCP_SCHEMA_VERSION,
    generated: '2026-05-29T00:00:00.000Z',
    provenance_url: `${baseUrl}/provenance.json`,
    name: 'io.github.anchorfact/anchorfact',
    installation: {
      stdio: {
        config_snippet: {
          mcpServers: {
            anchorfact: {
              command: 'python',
              args: ['src/mcp_server.py']
            }
          }
        }
      }
    },
    tools: [{ name: 'anchorfact_search' }]
  };
  const artifactSummary = {
    schema_version: ARTIFACT_SUMMARY_SCHEMA_VERSION,
    generated: '2026-05-29T00:00:00.000Z',
    provenance_url: `${baseUrl}/provenance.json`,
    total_bytes: 1234,
    recommended_default_calls: [{ path: '/api/context?q={query}' }],
    artifacts: [
      {
        path: '/graph.json',
        bytes: 500,
        bytes_human: '500 B',
        category: 'offline_graph',
        cache_posture: 'public, max-age=0, must-revalidate',
        use_when: 'offline traversal',
        recommended_alternative: '/api/context?q={query}'
      }
    ]
  };
  const artifactShards = {
    schema_version: ARTIFACT_SHARDS_SCHEMA_VERSION,
    generated: '2026-05-29T00:00:00.000Z',
    provenance_url: `${baseUrl}/provenance.json`,
    version: '75b8761df7e7a92d63a204d456c2e553d299f48d',
    default_for_agents: '/api/context?q={query}',
    compatibility: {
      full_artifacts_remain_available: true,
      shard_registry_is_signed_by_provenance: true
    },
    large_artifact_strategy: {
      prefer_query_scoped_apis: true,
      primary_apis: ['/api/context?q={query}', '/api/evidence?q={query}']
    },
    artifacts: [
      {
        id: 'claims',
        source_path: '/claims.json',
        collection: 'claims',
        item_kind: 'claim',
        item_count: 3,
        shard_count: 1,
        recommended_api: '/api/cite?id={claim_id}',
        shards: [
          {
            path: '/artifacts/v1/fixture/claims/claims-0001.json',
            sha256: '0'.repeat(64),
            bytes: 100,
            item_count: 3
          }
        ]
      }
    ]
  };
  const apiReadiness = {
    schema_version: API_READINESS_SCHEMA_VERSION,
    generated: '2026-05-29T00:00:00.000Z',
    provenance_url: `${baseUrl}/provenance.json`,
    report_only: true,
    build_should_fail: false,
    target_ratio: 0.9,
    status: 'foundation_ready_pending_14_day_and_partner_signals',
    subscription_ready: false,
    readiness_gates: [{ id: 'core_query_context_ratio', status: 'met' }],
    core_corpus: { count: 1, passed: 1, failed: 0, pass_ratio: 1 },
    api_scorecard: { count: 1, passed: 1, failed: 0, pass_ratio: 1, fallback: { ok: true }, failures: [] },
    next_actions: []
  };
  const manifestText = JSON.stringify(manifest, null, 2);
  const claimsText = JSON.stringify(claims, null, 2);
  const agentText = JSON.stringify(agent, null, 2);
  const openapiText = JSON.stringify(openapi, null, 2);
  const topicsText = JSON.stringify(topics, null, 2);
  const capabilitiesText = JSON.stringify(capabilities, null, 2);
  const contentHealthText = JSON.stringify(contentHealth, null, 2);
  const coverageText = JSON.stringify(coverage, null, 2);
  const examplesText = JSON.stringify(examples, null, 2);
  const graphText = JSON.stringify(graph, null, 2);
  const evalsText = JSON.stringify(evals, null, 2);
  const mcpText = JSON.stringify(mcp, null, 2);
  const artifactSummaryText = JSON.stringify(artifactSummary, null, 2);
  const artifactShardsText = JSON.stringify(artifactShards, null, 2);
  const apiReadinessText = JSON.stringify(apiReadiness, null, 2);
  const searchText = JSON.stringify(search, null, 2);
  const sourcesText = JSON.stringify(sources, null, 2);
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
      openapi_json: {
        path: '/openapi.json',
        sha256: sha256Text(openapiText),
        bytes: Buffer.byteLength(openapiText, 'utf8')
      },
      claims_json: {
        path: '/claims.json',
        sha256: sha256Text(claimsText),
        bytes: Buffer.byteLength(claimsText, 'utf8')
      },
      topics_json: {
        path: '/topics.json',
        sha256: sha256Text(topicsText),
        bytes: Buffer.byteLength(topicsText, 'utf8')
      },
      capabilities_json: {
        path: '/capabilities.json',
        sha256: sha256Text(capabilitiesText),
        bytes: Buffer.byteLength(capabilitiesText, 'utf8')
      },
      content_health_json: {
        path: '/content-health.json',
        sha256: sha256Text(contentHealthText),
        bytes: Buffer.byteLength(contentHealthText, 'utf8')
      },
      coverage_json: {
        path: '/coverage.json',
        sha256: sha256Text(coverageText),
        bytes: Buffer.byteLength(coverageText, 'utf8')
      },
      examples_json: {
        path: '/examples.json',
        sha256: sha256Text(examplesText),
        bytes: Buffer.byteLength(examplesText, 'utf8')
      },
      graph_json: {
        path: '/graph.json',
        sha256: sha256Text(graphText),
        bytes: Buffer.byteLength(graphText, 'utf8')
      },
      evals_json: {
        path: '/evals.json',
        sha256: sha256Text(evalsText),
        bytes: Buffer.byteLength(evalsText, 'utf8')
      },
      mcp_json: {
        path: '/mcp.json',
        sha256: sha256Text(mcpText),
        bytes: Buffer.byteLength(mcpText, 'utf8')
      },
      artifact_summary_json: {
        path: '/artifact-summary.json',
        sha256: sha256Text(artifactSummaryText),
        bytes: Buffer.byteLength(artifactSummaryText, 'utf8')
      },
      artifact_shards_json: {
        path: '/artifact-shards.json',
        sha256: sha256Text(artifactShardsText),
        bytes: Buffer.byteLength(artifactShardsText, 'utf8')
      },
      api_readiness_json: {
        path: '/api-readiness.json',
        sha256: sha256Text(apiReadinessText),
        bytes: Buffer.byteLength(apiReadinessText, 'utf8')
      },
      search_index_json: {
        path: '/search-index.json',
        sha256: sha256Text(searchText),
        bytes: Buffer.byteLength(searchText, 'utf8')
      },
      sources_json: {
        path: '/sources.json',
        sha256: sha256Text(sourcesText),
        bytes: Buffer.byteLength(sourcesText, 'utf8')
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
    [`${baseUrl}/openapi.json`]: { body: openapiText },
    [`${baseUrl}/manifest.json`]: { body: manifestText },
    [`${baseUrl}/claims.json`]: { body: claimsText },
    [`${baseUrl}/topics.json`]: { body: topicsText },
    [`${baseUrl}/capabilities.json`]: { body: capabilitiesText },
    [`${baseUrl}/content-health.json`]: { body: contentHealthText },
    [`${baseUrl}/coverage.json`]: { body: coverageText },
    [`${baseUrl}/examples.json`]: { body: examplesText },
    [`${baseUrl}/graph.json`]: { body: graphText },
    [`${baseUrl}/evals.json`]: { body: evalsText },
    [`${baseUrl}/mcp.json`]: { body: mcpText },
    [`${baseUrl}/artifact-summary.json`]: { body: artifactSummaryText },
    [`${baseUrl}/artifact-shards.json`]: { body: artifactShardsText },
    [`${baseUrl}/api-readiness.json`]: { body: apiReadinessText },
    [`${baseUrl}/search-index.json`]: { body: searchText },
    [`${baseUrl}/sources.json`]: { body: sourcesText },
    [`${baseUrl}/llms.txt`]: { body: llms, contentType: 'text/plain; charset=utf-8' },
    'https://api.github.com/repos/anchorfact/anchorfact/commits/75b8761df7e7a92d63a204d456c2e553d299f48d': {
      body: JSON.stringify({ sha: '75b8761df7e7a92d63a204d456c2e553d299f48d' })
    },
    ...overrides.routes
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
  assertEq(result.artifacts.content_health_json.ok, true);
  assertEq(result.artifacts.artifact_summary_json.ok, true);
  assertEq(result.artifacts.artifact_shards_json.ok, true);
  assertEq(result.artifacts.api_readiness_json.ok, true);
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

test('verifyLiveProvenance can authenticate GitHub commit lookup with a read token', async () => {
  const fixture = buildFixture();
  const result = await verifyLiveProvenance({
    baseUrl: fixture.baseUrl,
    fetchImpl: fixture.fetchImpl,
    githubToken: 'github-token-fixture'
  });
  assertEq(result.ok, true);
  const commitCall = fixture.calls.find(call => call.url.includes('api.github.com/repos/anchorfact/anchorfact/commits/'));
  assert(commitCall, 'commit lookup call should be recorded');
  assertEq(commitCall.options.headers.Authorization, 'Bearer github-token-fixture');
});

test('verifyLiveProvenance falls back to GitHub commit page when API is rate-limited', async () => {
  const sha = '75b8761df7e7a92d63a204d456c2e553d299f48d';
  const fixture = buildFixture({
    routes: {
      [`https://api.github.com/repos/anchorfact/anchorfact/commits/${sha}`]: new FakeResponse(403, JSON.stringify({ message: 'API rate limit exceeded' })),
      [`https://github.com/anchorfact/anchorfact/commit/${sha}`]: {
        body: `<html><body>Commit ${sha}</body></html>`,
        contentType: 'text/html; charset=utf-8'
      }
    }
  });

  const result = await verifyLiveProvenance({
    baseUrl: fixture.baseUrl,
    fetchImpl: fixture.fetchImpl
  });

  assertEq(result.ok, true);
  assertEq(result.commit.ok, true);
  assertEq(result.commit.method, 'html_fallback');
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

test('verifyLiveProvenance rejects API readiness artifact hash mismatches', async () => {
  const fixture = buildFixture({
    artifacts: {
      api_readiness_json: {
        path: '/api-readiness.json',
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
  assert(result.failures.some(failure => failure.includes('api_readiness_json sha256 mismatch')), 'API readiness hash mismatch should fail');
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

test('fetchLiveText retries transient network failures', async () => {
  let calls = 0;
  const result = await fetchLiveText(async () => {
    calls++;
    if (calls === 1) {
      throw new TypeError('fetch failed', { cause: new Error('connect timeout') });
    }
    return new FakeResponse(200, 'ok', 'text/plain; charset=utf-8');
  }, 'https://anchorfact.org/provenance.json', { retryDelayMs: 0 });

  assertEq(calls, 2, 'fetch should retry once before succeeding');
  assertEq(result.ok, true, 'retry result should pass');
  assertEq(result.status, 200, 'retry result status');
  assertEq(result.text, 'ok', 'retry result body');
  assertEq(result.contentType, 'text/plain; charset=utf-8', 'retry result content-type');
});

test('fetchLiveText reports exhausted network failures without throwing', async () => {
  let calls = 0;
  const result = await fetchLiveText(async () => {
    calls++;
    throw new TypeError('fetch failed', { cause: new Error('connect timeout') });
  }, 'https://anchorfact.org/provenance.json', { retries: 1, retryDelayMs: 0 });

  assertEq(calls, 2, 'fetch should respect retry count');
  assertEq(result.ok, false, 'exhausted retry result should fail');
  assertEq(result.status, 0, 'network failure status');
  assert(result.error.includes('connect timeout'), 'network failure should include root cause');
});

test('fetchLiveText aborts stalled route fetches and retries', async () => {
  let calls = 0;
  let aborted = false;
  const result = await fetchLiveText(async (_url, options = {}) => {
    calls++;
    if (calls === 1) {
      if (!options.signal) throw new Error('missing abort signal');
      options.signal.addEventListener('abort', () => {
        aborted = true;
      }, { once: true });
      return new Promise((_resolve, reject) => {
        options.signal.addEventListener('abort', () => {
          reject(new Error('aborted by timeout'));
        }, { once: true });
      });
    }
    return new FakeResponse(200, 'ok', 'text/plain; charset=utf-8');
  }, 'https://anchorfact.org/provenance.json', {
    retries: 1,
    retryDelayMs: 0,
    timeoutMs: 1
  });

  assertEq(calls, 2, 'fetch should retry after aborting the stalled attempt');
  assertEq(aborted, true, 'fetch should abort the stalled attempt');
  assertEq(result.ok, true, 'retry result should pass');
  assertEq(result.text, 'ok', 'retry result body');
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
