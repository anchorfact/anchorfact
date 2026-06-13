import { createHash } from 'crypto';
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
  PROVENANCE_PATH,
  PROVENANCE_SCHEMA_VERSION,
  SEARCH_INDEX_SCHEMA_VERSION,
  TOPICS_SCHEMA_VERSION,
  publicUrl
} from './build-metadata.js';
import {
  PROVENANCE_SIGNATURE_PATH,
  verifyProvenanceSignature
} from './provenance-signature.js';
import { fetchLiveText } from './live-http.js';

const REQUIRED_ARTIFACTS = ['agent_json', 'openapi_json', 'manifest_json', 'claims_json', 'topics_json', 'capabilities_json', 'content_health_json', 'coverage_json', 'examples_json', 'graph_json', 'evals_json', 'mcp_json', 'artifact_summary_json', 'artifact_shards_json', 'api_readiness_json', 'search_index_json', 'sources_json', 'llms_txt'];
const OFFICIAL_GITHUB_COMMIT_API = 'https://api.github.com/repos/anchorfact/anchorfact/commits/';
const OFFICIAL_GITHUB_COMMIT_PAGE = 'https://github.com/anchorfact/anchorfact/commit/';

export function sha256Text(text) {
  return createHash('sha256').update(Buffer.from(String(text), 'utf8')).digest('hex');
}

function byteLength(text) {
  return Buffer.byteLength(String(text), 'utf8');
}

function normalizeBaseUrl(baseUrl) {
  return String(baseUrl || OFFICIAL_SITE).replace(/\/+$/, '');
}

export function isSafeArtifactPath(path) {
  if (typeof path !== 'string') return false;
  if (!path.startsWith('/') || path.startsWith('//')) return false;
  if (path.includes('\\') || path.includes('\0')) return false;
  return !path.split('/').includes('..');
}

function routeUrl(baseUrl, path) {
  return `${normalizeBaseUrl(baseUrl)}${path}`;
}

function parseJson(text, label, failures) {
  try {
    return JSON.parse(text);
  } catch (error) {
    failures.push(`${label} is not valid JSON: ${error.message}`);
    return null;
  }
}

function countArticles(articles, predicate) {
  return Array.isArray(articles) ? articles.filter(predicate).length : 0;
}

function checkEq(actual, expected, label, failures) {
  if (actual !== expected) {
    failures.push(`${label} expected ${expected}, got ${actual ?? '(missing)'}`);
  }
}

function checkOfficialIdentity(provenance, failures) {
  checkEq(provenance.official_site, OFFICIAL_SITE, 'provenance official_site', failures);
  checkEq(provenance.official_source_repository, OFFICIAL_SOURCE_REPOSITORY, 'provenance official_source_repository', failures);
  checkEq(provenance.build?.canonical_site, OFFICIAL_SITE, 'build canonical_site', failures);
  checkEq(provenance.build?.source_repository, OFFICIAL_SOURCE_REPOSITORY, 'build source_repository', failures);
  checkEq(provenance.build?.official_build, true, 'build official_build', failures);
  checkEq(provenance.build?.branch, 'main', 'build branch', failures);
}

async function verifyCommit(fetchImpl, provenance, failures, githubToken = null) {
  const sha = provenance.build?.commit_sha;
  if (!/^[a-f0-9]{40}$/i.test(String(sha || ''))) {
    failures.push(`build commit_sha is missing or invalid: ${sha || '(missing)'}`);
    return { ok: false, sha: sha || null };
  }

  const response = await fetchLiveText(
    fetchImpl,
    `${OFFICIAL_GITHUB_COMMIT_API}${sha}`,
    githubToken ? { headers: { Authorization: `Bearer ${githubToken}` } } : {}
  );
  if (!response.ok) {
    const fallback = await fetchLiveText(fetchImpl, `${OFFICIAL_GITHUB_COMMIT_PAGE}${sha}`);
    if (fallback.ok && fallback.text.includes(sha)) {
      return { ok: true, sha, method: 'html_fallback' };
    }

    failures.push(`GitHub commit lookup failed for ${sha}: ${fetchFailure(response)}`);
    if (!fallback.ok) {
      failures.push(`GitHub commit page fallback failed for ${sha}: ${fetchFailure(fallback)}`);
    } else {
      failures.push(`GitHub commit page fallback did not confirm ${sha}`);
    }
    return { ok: false, sha };
  }

  const commit = parseJson(response.text, 'GitHub commit response', failures);
  const commitOk = commit?.sha === sha;
  if (!commitOk) {
    failures.push(`GitHub commit response did not confirm ${sha}`);
  }
  return { ok: commitOk, sha, method: 'api' };
}

function fetchFailure(response) {
  return response.error ? `network error: ${response.error}` : `HTTP ${response.status}`;
}

async function verifySignature({
  fetchImpl,
  baseUrl,
  provenanceText,
  provenance,
  trustedPublicKeys,
  requireSignature,
  requireTrustedSignature,
  failures
}) {
  const signed = provenance.signature?.status === 'signed';
  if (!signed && !requireSignature && !requireTrustedSignature) {
    return {
      ok: true,
      trusted: false,
      status: provenance.signature?.status || 'missing',
      skipped: true
    };
  }

  if (!signed) {
    failures.push('provenance signature is required but provenance is unsigned');
    return {
      ok: false,
      trusted: false,
      status: provenance.signature?.status || 'missing'
    };
  }

  const response = await fetchLiveText(fetchImpl, routeUrl(baseUrl, PROVENANCE_SIGNATURE_PATH));
  if (!response.ok) {
    failures.push(`${PROVENANCE_SIGNATURE_PATH} fetch failed: ${fetchFailure(response)}`);
    return {
      ok: false,
      trusted: false,
      status: 'signed'
    };
  }

  const signaturePayload = parseJson(response.text, PROVENANCE_SIGNATURE_PATH, failures);
  const verified = verifyProvenanceSignature(provenanceText, signaturePayload, trustedPublicKeys);
  for (const failure of verified.failures) {
    failures.push(failure);
  }
  if (requireTrustedSignature && !verified.trusted) {
    failures.push('signature is valid but not trusted by a configured public key');
  }

  return {
    ...verified,
    status: 'signed',
    path: PROVENANCE_SIGNATURE_PATH,
    url: routeUrl(baseUrl, PROVENANCE_SIGNATURE_PATH)
  };
}

async function verifyArtifact({ key, artifact, baseUrl, fetchImpl, failures }) {
  if (!artifact || typeof artifact !== 'object') {
    failures.push(`${key} artifact is missing`);
    return { ok: false, key };
  }

  if (!isSafeArtifactPath(artifact.path)) {
    failures.push(`${key} unsafe artifact path: ${artifact.path ?? '(missing)'}`);
    return { ok: false, key, path: artifact.path || null };
  }

  const url = routeUrl(baseUrl, artifact.path);
  const response = await fetchLiveText(fetchImpl, url);
  if (!response.ok) {
    failures.push(`${key} fetch failed for ${artifact.path}: ${fetchFailure(response)}`);
    return { ok: false, key, path: artifact.path, url };
  }

  const actualSha = sha256Text(response.text);
  const actualBytes = byteLength(response.text);
  const ok = actualSha === artifact.sha256 && actualBytes === artifact.bytes;
  if (actualSha !== artifact.sha256) {
    failures.push(`${key} sha256 mismatch for ${artifact.path}`);
  }
  if (actualBytes !== artifact.bytes) {
    failures.push(`${key} byte size mismatch for ${artifact.path}`);
  }

  return {
    ok,
    key,
    path: artifact.path,
    url,
    sha256: actualSha,
    bytes: actualBytes,
    text: response.text
  };
}

function verifyCounts({ provenance, manifest, claims, topics, capabilities, contentHealth, coverage, examples, graph, evals, searchIndex, failures }) {
  const publicArticles = countArticles(
    manifest.articles,
    article => article.status === 'public' && article.is_draft === false
  );
  const draftArticles = countArticles(
    manifest.articles,
    article => article.status === 'draft' || article.is_draft === true
  );
  const claimCount = Array.isArray(claims.claims) ? claims.claims.length : 0;

  checkEq(manifest.public_article_count, publicArticles, 'manifest public article count', failures);
  checkEq(manifest.draft_article_count, draftArticles, 'manifest draft article count', failures);
  checkEq(manifest.claim_count, claimCount, 'manifest claim_count', failures);
  checkEq(provenance.content_counts?.public, manifest.public_article_count, 'provenance public count', failures);
  checkEq(provenance.content_counts?.draft, manifest.draft_article_count, 'provenance draft count', failures);
  checkEq(provenance.content_counts?.claims, claimCount, 'provenance claims count', failures);
  checkEq(topics.public_article_count, manifest.public_article_count, 'topics public_article_count', failures);
  checkEq(topics.public_claim_count, claimCount, 'topics public_claim_count', failures);
  checkEq(topics.topic_count, Array.isArray(topics.topics) ? topics.topics.length : 0, 'topics topic_count', failures);
  checkEq(capabilities.capability_count, Array.isArray(capabilities.capabilities) ? capabilities.capabilities.length : 0, 'capabilities capability_count', failures);
  checkEq(contentHealth.snapshot?.public_articles, manifest.public_article_count, 'content health public_articles', failures);
  checkEq(contentHealth.snapshot?.draft_articles, manifest.draft_article_count, 'content health draft_articles', failures);
  checkEq(contentHealth.snapshot?.public_claims, claimCount, 'content health public_claims', failures);
  checkEq(coverage.coverage_summary?.public_articles, manifest.public_article_count, 'coverage public_articles', failures);
  checkEq(coverage.coverage_summary?.public_claims, claimCount, 'coverage public_claims', failures);
  checkEq(coverage.coverage_summary?.topics, topics.topic_count, 'coverage topics', failures);
  checkEq(Array.isArray(coverage.topic_coverage) ? coverage.topic_coverage.length : 0, topics.topic_count, 'coverage topic_coverage length', failures);
  checkEq(examples.example_count, Array.isArray(examples.examples) ? examples.examples.length : 0, 'examples example_count', failures);
  checkEq(graph.public_article_count, manifest.public_article_count, 'graph public_article_count', failures);
  checkEq(graph.public_claim_count, claimCount, 'graph public_claim_count', failures);
  checkEq(graph.topic_count, topics.topic_count, 'graph topic_count', failures);
  checkEq(graph.node_count, Array.isArray(graph.nodes) ? graph.nodes.length : 0, 'graph node_count', failures);
  checkEq(graph.edge_count, Array.isArray(graph.edges) ? graph.edges.length : 0, 'graph edge_count', failures);
  checkEq(evals.eval_count, Array.isArray(evals.evals) ? evals.evals.length : 0, 'evals eval_count', failures);
  checkEq(searchIndex.article_count, manifest.public_article_count, 'search index article_count', failures);
  checkEq(searchIndex.public_claim_count, claimCount, 'search index public_claim_count', failures);
}

export async function verifyLiveProvenance({
  baseUrl = OFFICIAL_SITE,
  fetchImpl = globalThis.fetch,
  requireOfficial = true,
  verifyCommit: shouldVerifyCommit = true,
  requireSignature = false,
  requireTrustedSignature = false,
  trustedPublicKeys = [],
  githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null
} = {}) {
  if (typeof fetchImpl !== 'function') {
    throw new Error('verifyLiveProvenance requires a fetch implementation.');
  }

  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
  const failures = [];
  const artifacts = {};

  const provenanceResponse = await fetchLiveText(fetchImpl, routeUrl(normalizedBaseUrl, PROVENANCE_PATH));
  if (!provenanceResponse.ok) {
    failures.push(`${PROVENANCE_PATH} fetch failed: ${fetchFailure(provenanceResponse)}`);
  }

  const provenance = parseJson(provenanceResponse.text, PROVENANCE_PATH, failures) || {};
  checkEq(provenance.schema_version, PROVENANCE_SCHEMA_VERSION, 'provenance schema_version', failures);
  if (requireOfficial) {
    checkOfficialIdentity(provenance, failures);
  }

  for (const key of REQUIRED_ARTIFACTS) {
    artifacts[key] = await verifyArtifact({
      key,
      artifact: provenance.artifacts?.[key],
      baseUrl: normalizedBaseUrl,
      fetchImpl,
      failures
    });
  }

  const manifest = artifacts.manifest_json?.text
    ? parseJson(artifacts.manifest_json.text, '/manifest.json', failures) || {}
    : {};
  const openapi = artifacts.openapi_json?.text
    ? parseJson(artifacts.openapi_json.text, '/openapi.json', failures) || {}
    : {};
  const claims = artifacts.claims_json?.text
    ? parseJson(artifacts.claims_json.text, '/claims.json', failures) || {}
    : {};
  const topics = artifacts.topics_json?.text
    ? parseJson(artifacts.topics_json.text, '/topics.json', failures) || {}
    : {};
  const capabilities = artifacts.capabilities_json?.text
    ? parseJson(artifacts.capabilities_json.text, '/capabilities.json', failures) || {}
    : {};
  const contentHealth = artifacts.content_health_json?.text
    ? parseJson(artifacts.content_health_json.text, '/content-health.json', failures) || {}
    : {};
  const coverage = artifacts.coverage_json?.text
    ? parseJson(artifacts.coverage_json.text, '/coverage.json', failures) || {}
    : {};
  const examples = artifacts.examples_json?.text
    ? parseJson(artifacts.examples_json.text, '/examples.json', failures) || {}
    : {};
  const graph = artifacts.graph_json?.text
    ? parseJson(artifacts.graph_json.text, '/graph.json', failures) || {}
    : {};
  const evals = artifacts.evals_json?.text
    ? parseJson(artifacts.evals_json.text, '/evals.json', failures) || {}
    : {};
  const mcp = artifacts.mcp_json?.text
    ? parseJson(artifacts.mcp_json.text, '/mcp.json', failures) || {}
    : {};
  const artifactSummary = artifacts.artifact_summary_json?.text
    ? parseJson(artifacts.artifact_summary_json.text, '/artifact-summary.json', failures) || {}
    : {};
  const artifactShards = artifacts.artifact_shards_json?.text
    ? parseJson(artifacts.artifact_shards_json.text, '/artifact-shards.json', failures) || {}
    : {};
  const apiReadiness = artifacts.api_readiness_json?.text
    ? parseJson(artifacts.api_readiness_json.text, '/api-readiness.json', failures) || {}
    : {};
  const searchIndex = artifacts.search_index_json?.text
    ? parseJson(artifacts.search_index_json.text, '/search-index.json', failures) || {}
    : {};
  checkEq(manifest.schema_version, MANIFEST_SCHEMA_VERSION, 'manifest schema_version', failures);
  checkEq(openapi.openapi, '3.1.0', 'OpenAPI version', failures);
  checkEq(openapi['x-anchorfact-schema-version'], OPENAPI_SCHEMA_VERSION, 'OpenAPI AnchorFact schema version', failures);
  checkEq(openapi['x-provenance-url'], publicUrl(PROVENANCE_PATH, normalizedBaseUrl), 'OpenAPI provenance url', failures);
  checkEq(claims.schema_version, CLAIMS_SCHEMA_VERSION, 'claims schema_version', failures);
  checkEq(topics.schema_version, TOPICS_SCHEMA_VERSION, 'topics schema_version', failures);
  checkEq(capabilities.schema_version, CAPABILITIES_SCHEMA_VERSION, 'capabilities schema_version', failures);
  checkEq(contentHealth.schema_version, CONTENT_HEALTH_SCHEMA_VERSION, 'content health schema_version', failures);
  checkEq(coverage.schema_version, COVERAGE_SCHEMA_VERSION, 'coverage schema_version', failures);
  checkEq(examples.schema_version, EXAMPLES_SCHEMA_VERSION, 'examples schema_version', failures);
  checkEq(graph.schema_version, GRAPH_SCHEMA_VERSION, 'graph schema_version', failures);
  checkEq(evals.schema_version, EVALS_SCHEMA_VERSION, 'evals schema_version', failures);
  checkEq(mcp.schema_version, MCP_SCHEMA_VERSION, 'mcp schema_version', failures);
  checkEq(artifactSummary.schema_version, ARTIFACT_SUMMARY_SCHEMA_VERSION, 'artifact summary schema_version', failures);
  checkEq(artifactShards.schema_version, ARTIFACT_SHARDS_SCHEMA_VERSION, 'artifact shards schema_version', failures);
  checkEq(apiReadiness.schema_version, API_READINESS_SCHEMA_VERSION, 'API readiness schema_version', failures);
  checkEq(searchIndex.schema_version, SEARCH_INDEX_SCHEMA_VERSION, 'search index schema_version', failures);
  checkEq(manifest.provenance_url, publicUrl(PROVENANCE_PATH, normalizedBaseUrl), 'manifest provenance_url', failures);
  checkEq(claims.provenance_url, publicUrl(PROVENANCE_PATH, normalizedBaseUrl), 'claims provenance_url', failures);
  checkEq(topics.provenance_url, publicUrl(PROVENANCE_PATH, normalizedBaseUrl), 'topics provenance_url', failures);
  checkEq(capabilities.provenance_url, publicUrl(PROVENANCE_PATH, normalizedBaseUrl), 'capabilities provenance_url', failures);
  checkEq(contentHealth.provenance_url, publicUrl(PROVENANCE_PATH, normalizedBaseUrl), 'content health provenance_url', failures);
  checkEq(coverage.provenance_url, publicUrl(PROVENANCE_PATH, normalizedBaseUrl), 'coverage provenance_url', failures);
  checkEq(examples.provenance_url, publicUrl(PROVENANCE_PATH, normalizedBaseUrl), 'examples provenance_url', failures);
  checkEq(graph.provenance_url, publicUrl(PROVENANCE_PATH, normalizedBaseUrl), 'graph provenance_url', failures);
  checkEq(evals.provenance_url, publicUrl(PROVENANCE_PATH, normalizedBaseUrl), 'evals provenance_url', failures);
  checkEq(mcp.provenance_url, publicUrl(PROVENANCE_PATH, normalizedBaseUrl), 'mcp provenance_url', failures);
  checkEq(artifactSummary.provenance_url, publicUrl(PROVENANCE_PATH, normalizedBaseUrl), 'artifact summary provenance_url', failures);
  checkEq(artifactShards.provenance_url, publicUrl(PROVENANCE_PATH, normalizedBaseUrl), 'artifact shards provenance_url', failures);
  checkEq(apiReadiness.provenance_url, publicUrl(PROVENANCE_PATH, normalizedBaseUrl), 'API readiness provenance_url', failures);
  checkEq(searchIndex.provenance_url, publicUrl(PROVENANCE_PATH, normalizedBaseUrl), 'search index provenance_url', failures);
  if (!Array.isArray(artifactShards.artifacts) || artifactShards.artifacts.length === 0) {
    failures.push('artifact shards registry has no artifacts');
  }
  if (!Array.isArray(mcp.tools) || mcp.tools.length === 0) {
    failures.push('mcp tools list is empty');
  }
  verifyCounts({ provenance, manifest, claims, topics, capabilities, contentHealth, coverage, examples, graph, evals, searchIndex, failures });

  const signature = await verifySignature({
    fetchImpl,
    baseUrl: normalizedBaseUrl,
    provenanceText: provenanceResponse.text,
    provenance,
    trustedPublicKeys,
    requireSignature,
    requireTrustedSignature,
    failures
  });

  const commit = shouldVerifyCommit && requireOfficial
    ? await verifyCommit(fetchImpl, provenance, failures, githubToken)
    : { ok: true, sha: provenance.build?.commit_sha || null, skipped: true };

  return {
    ok: failures.length === 0,
    baseUrl: normalizedBaseUrl,
    failures,
    provenance,
    artifacts,
    signature,
    commit
  };
}
