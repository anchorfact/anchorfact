import { createHash } from 'crypto';
import { readFileSync, statSync } from 'fs';
import { join } from 'path';

export const COMPILER_VERSION = '0.3.0';
export const MANIFEST_SCHEMA_VERSION = 'anchorfact.manifest.v1';
export const CLAIMS_SCHEMA_VERSION = 'anchorfact.claims.v1';
export const PROVENANCE_SCHEMA_VERSION = 'anchorfact.provenance.v1';
export const AGENT_PROFILE_SCHEMA_VERSION = 'anchorfact.agent.v1';
export const SOURCES_SCHEMA_VERSION = 'anchorfact.sources.v1';
export const SEARCH_INDEX_SCHEMA_VERSION = 'anchorfact.search-index.v1';
export const SEARCH_API_SCHEMA_VERSION = 'anchorfact.search-api.v1';
export const EVIDENCE_API_SCHEMA_VERSION = 'anchorfact.evidence-api.v1';
export const ARTICLE_API_SCHEMA_VERSION = 'anchorfact.article-api.v1';
export const CLAIM_API_SCHEMA_VERSION = 'anchorfact.claim-api.v1';
export const SOURCE_API_SCHEMA_VERSION = 'anchorfact.source-api.v1';
export const TOPICS_SCHEMA_VERSION = 'anchorfact.topics.v1';
export const EXAMPLES_SCHEMA_VERSION = 'anchorfact.examples.v1';
export const GRAPH_SCHEMA_VERSION = 'anchorfact.graph.v1';
export const EVALS_SCHEMA_VERSION = 'anchorfact.evals.v1';
export const OPENAPI_SCHEMA_VERSION = 'anchorfact.openapi.v1';
export const OFFICIAL_SOURCE_REPOSITORY = 'https://github.com/anchorfact/anchorfact';
export const OFFICIAL_SITE = 'https://anchorfact.org';
export const PROVENANCE_PATH = '/provenance.json';

function envBool(value) {
  return ['1', 'true', 'yes', 'on'].includes(String(value || '').trim().toLowerCase());
}

function firstEnv(env, names) {
  for (const name of names) {
    const value = env[name];
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }
  return null;
}

function githubRepositoryUrl(value) {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return trimTrailingSlash(value);
  if (/^[^/\s]+\/[^/\s]+$/.test(value)) return `https://github.com/${value}`;
  return value;
}

function isOfficialCloudflarePagesBuild(env, canonicalSite, sourceRepository, branch) {
  const deploymentUrl = firstEnv(env, ['CF_PAGES_URL']);
  if (
    !envBool(env.CF_PAGES)
    || canonicalSite !== OFFICIAL_SITE
    || sourceRepository !== OFFICIAL_SOURCE_REPOSITORY
    || branch !== 'main'
    || !deploymentUrl
  ) {
    return false;
  }

  try {
    const hostname = new URL(deploymentUrl).hostname.toLowerCase();
    return hostname === 'anchorfact.pages.dev' || hostname.endsWith('.anchorfact.pages.dev');
  } catch {
    return false;
  }
}

function trimTrailingSlash(value) {
  return String(value || '').replace(/\/+$/, '');
}

export function publicUrl(path, site = OFFICIAL_SITE) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${trimTrailingSlash(site)}${normalizedPath}`;
}

export function buildMetadataFromEnv(env = process.env) {
  const sourceRepository = githubRepositoryUrl(
    firstEnv(env, ['ANCHORFACT_SOURCE_REPOSITORY', 'GITHUB_REPOSITORY'])
  ) || OFFICIAL_SOURCE_REPOSITORY;
  const canonicalSite = trimTrailingSlash(
    firstEnv(env, ['ANCHORFACT_CANONICAL_SITE']) || OFFICIAL_SITE
  );
  const declaredOfficial = envBool(env.ANCHORFACT_OFFICIAL_BUILD);
  const branch = firstEnv(env, ['ANCHORFACT_BRANCH', 'CF_PAGES_BRANCH', 'GITHUB_REF_NAME']);

  const builder = firstEnv(env, ['ANCHORFACT_BUILDER'])
    || (envBool(env.CF_PAGES) ? 'cloudflare-pages' : null)
    || (envBool(env.GITHUB_ACTIONS) ? 'github-actions' : null)
    || 'local';

  return {
    builder,
    official_build: (declaredOfficial || isOfficialCloudflarePagesBuild(env, canonicalSite, sourceRepository, branch))
      && sourceRepository === OFFICIAL_SOURCE_REPOSITORY
      && canonicalSite === OFFICIAL_SITE,
    canonical_site: canonicalSite,
    source_repository: sourceRepository,
    commit_sha: firstEnv(env, ['ANCHORFACT_COMMIT_SHA', 'CF_PAGES_COMMIT_SHA', 'GITHUB_SHA']),
    branch,
    build_id: firstEnv(env, ['ANCHORFACT_BUILD_ID', 'CF_PAGES_URL', 'GITHUB_RUN_ID'])
  };
}

export function sha256File(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

export function artifactInfo(distDir, relativePath) {
  const path = join(distDir, ...relativePath.split('/'));
  const stat = statSync(path);
  return {
    path: `/${relativePath}`,
    sha256: sha256File(path),
    bytes: stat.size
  };
}

export function buildProvenance({ manifest, claimsPayload, distDir, generated, build, signature }) {
  return {
    schema_version: PROVENANCE_SCHEMA_VERSION,
    generated,
    official_source_repository: OFFICIAL_SOURCE_REPOSITORY,
    official_site: OFFICIAL_SITE,
    build,
    signature,
    verification_report: manifest.verification_report,
    content_counts: {
      articles: manifest.article_count,
      public: manifest.public_article_count,
      draft: manifest.draft_article_count,
      claims: claimsPayload.claim_count
    },
    artifacts: {
      agent_json: artifactInfo(distDir, 'agent.json'),
      openapi_json: artifactInfo(distDir, 'openapi.json'),
      manifest_json: artifactInfo(distDir, 'manifest.json'),
      claims_json: artifactInfo(distDir, 'claims.json'),
      topics_json: artifactInfo(distDir, 'topics.json'),
      examples_json: artifactInfo(distDir, 'examples.json'),
      graph_json: artifactInfo(distDir, 'graph.json'),
      evals_json: artifactInfo(distDir, 'evals.json'),
      search_index_json: artifactInfo(distDir, 'search-index.json'),
      sources_json: artifactInfo(distDir, 'sources.json'),
      llms_txt: artifactInfo(distDir, 'llms.txt')
    },
    license: {
      code: 'MIT',
      content: 'CC-BY-4.0'
    }
  };
}
