import { createHash } from 'crypto';
import {
  CLAIMS_SCHEMA_VERSION,
  MANIFEST_SCHEMA_VERSION,
  OFFICIAL_SITE,
  OFFICIAL_SOURCE_REPOSITORY,
  PROVENANCE_PATH,
  PROVENANCE_SCHEMA_VERSION,
  SEARCH_INDEX_SCHEMA_VERSION,
  publicUrl
} from './build-metadata.js';
import {
  PROVENANCE_SIGNATURE_PATH,
  verifyProvenanceSignature
} from './provenance-signature.js';
import { fetchLiveText } from './live-http.js';

const REQUIRED_ARTIFACTS = ['agent_json', 'manifest_json', 'claims_json', 'search_index_json', 'sources_json', 'llms_txt'];
const OFFICIAL_GITHUB_COMMIT_API = 'https://api.github.com/repos/anchorfact/anchorfact/commits/';

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

async function verifyCommit(fetchImpl, provenance, failures) {
  const sha = provenance.build?.commit_sha;
  if (!/^[a-f0-9]{40}$/i.test(String(sha || ''))) {
    failures.push(`build commit_sha is missing or invalid: ${sha || '(missing)'}`);
    return { ok: false, sha: sha || null };
  }

  const response = await fetchLiveText(fetchImpl, `${OFFICIAL_GITHUB_COMMIT_API}${sha}`);
  if (!response.ok) {
    failures.push(`GitHub commit lookup failed for ${sha}: HTTP ${response.status}`);
    return { ok: false, sha };
  }

  const commit = parseJson(response.text, 'GitHub commit response', failures);
  const commitOk = commit?.sha === sha;
  if (!commitOk) {
    failures.push(`GitHub commit response did not confirm ${sha}`);
  }
  return { ok: commitOk, sha };
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
    failures.push(`${PROVENANCE_SIGNATURE_PATH} fetch failed: HTTP ${response.status}`);
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
    failures.push(`${key} fetch failed for ${artifact.path}: HTTP ${response.status}`);
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

function verifyCounts({ provenance, manifest, claims, searchIndex, failures }) {
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
  trustedPublicKeys = []
} = {}) {
  if (typeof fetchImpl !== 'function') {
    throw new Error('verifyLiveProvenance requires a fetch implementation.');
  }

  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
  const failures = [];
  const artifacts = {};

  const provenanceResponse = await fetchLiveText(fetchImpl, routeUrl(normalizedBaseUrl, PROVENANCE_PATH));
  if (!provenanceResponse.ok) {
    failures.push(`${PROVENANCE_PATH} fetch failed: HTTP ${provenanceResponse.status}`);
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
  const claims = artifacts.claims_json?.text
    ? parseJson(artifacts.claims_json.text, '/claims.json', failures) || {}
    : {};
  const searchIndex = artifacts.search_index_json?.text
    ? parseJson(artifacts.search_index_json.text, '/search-index.json', failures) || {}
    : {};
  checkEq(manifest.schema_version, MANIFEST_SCHEMA_VERSION, 'manifest schema_version', failures);
  checkEq(claims.schema_version, CLAIMS_SCHEMA_VERSION, 'claims schema_version', failures);
  checkEq(searchIndex.schema_version, SEARCH_INDEX_SCHEMA_VERSION, 'search index schema_version', failures);
  checkEq(manifest.provenance_url, publicUrl(PROVENANCE_PATH, normalizedBaseUrl), 'manifest provenance_url', failures);
  checkEq(claims.provenance_url, publicUrl(PROVENANCE_PATH, normalizedBaseUrl), 'claims provenance_url', failures);
  checkEq(searchIndex.provenance_url, publicUrl(PROVENANCE_PATH, normalizedBaseUrl), 'search index provenance_url', failures);
  verifyCounts({ provenance, manifest, claims, searchIndex, failures });

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
    ? await verifyCommit(fetchImpl, provenance, failures)
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
