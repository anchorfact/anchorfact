import {
  AGENT_PROFILE_SCHEMA_VERSION,
  ARTICLE_API_SCHEMA_VERSION,
  CLAIM_API_SCHEMA_VERSION,
  CLAIMS_SCHEMA_VERSION,
  MANIFEST_SCHEMA_VERSION,
  OFFICIAL_SOURCE_REPOSITORY,
  OFFICIAL_SITE,
  OPENAPI_SCHEMA_VERSION,
  PROVENANCE_SCHEMA_VERSION,
  SEARCH_API_SCHEMA_VERSION,
  SEARCH_INDEX_SCHEMA_VERSION,
  SOURCE_API_SCHEMA_VERSION,
  SOURCES_SCHEMA_VERSION,
  publicUrl
} from './build-metadata.js';

function endpoint(path, description, mediaType = 'application/json') {
  return {
    path,
    url: publicUrl(path),
    media_type: mediaType,
    description
  };
}

export function buildAgentProfile({
  generated,
  manifest,
  claimsPayload,
  searchIndexPayload,
  sourcesPayload,
  publicResults,
  draftResults,
  verificationTimestamp
}) {
  return {
    schema_version: AGENT_PROFILE_SCHEMA_VERSION,
    generated,
    name: 'AnchorFact',
    official_site: OFFICIAL_SITE,
    official_source_repository: OFFICIAL_SOURCE_REPOSITORY,
    purpose: 'Machine-readable verified claims and source-grounded article records for AI citation and retrieval workflows.',
    audience: ['llm', 'agent', 'crawler', 'retrieval_system'],
    trust_contract: {
      public_entries_are_verified: true,
      draft_entries_are_excluded_from_ai_entrypoints: true,
      provenance_is_signed_when_official_key_is_available: true,
      consumers_should_cross_check_original_sources: true
    },
    current_snapshot: {
      public_articles: publicResults.length,
      draft_articles: draftResults.length,
      public_claims: claimsPayload.claim_count,
      searchable_records: searchIndexPayload?.article_count ?? null,
      unique_sources: sourcesPayload?.source_count ?? null,
      verification_report: verificationTimestamp || null,
      build_commit_sha: manifest.build?.commit_sha || null
    },
    schemas: {
      manifest: MANIFEST_SCHEMA_VERSION,
      openapi: OPENAPI_SCHEMA_VERSION,
      article_api: ARTICLE_API_SCHEMA_VERSION,
      claim_api: CLAIM_API_SCHEMA_VERSION,
      source_api: SOURCE_API_SCHEMA_VERSION,
      claims: CLAIMS_SCHEMA_VERSION,
      search_api: SEARCH_API_SCHEMA_VERSION,
      search_index: SEARCH_INDEX_SCHEMA_VERSION,
      sources: SOURCES_SCHEMA_VERSION,
      provenance: PROVENANCE_SCHEMA_VERSION
    },
    recommended_workflow: [
      'Fetch /agent.json to discover the current machine contract.',
      'Fetch /openapi.json when integrating with tools that prefer a standard endpoint contract.',
      'Fetch /provenance.json and /provenance.sig, then verify the pinned public key before trusting counts or hashes.',
      'Use /api/search?q={query} for lightweight public record lookup when a live HTTP call is available.',
      'Use /api/article?slug={canonical_slug} to fetch a public article evidence bundle with claims and sources.',
      'Use /api/claim?id={claim_id} to dereference one public atomic claim with its article and matching source.',
      'Use /api/source?id={source_id} or /api/source?url={source_url} to inspect a public source and mapped claims.',
      'Fetch /search-index.json to shortlist public records by title, keywords, claims, source coverage, and route templates.',
      'Fetch /manifest.json to select public articles by canonical_slug, status, confidence_level, and source coverage.',
      'Fetch /sources.json to inspect source tier, source type, article reuse, and claim reuse.',
      'Fetch /claims.json for atomic public claims with evidence links.',
      'Fetch /{canonical_slug}/index.json for JSON-LD article context before citing a claim.',
      'Do not cite draft entries or entries whose status is not public.'
    ],
    endpoints: {
      agent_profile: endpoint('/agent.json', 'This discovery document for AI agents and crawlers.'),
      well_known_agent_profile: endpoint('/.well-known/anchorfact.json', 'Stable well-known alias for the agent discovery document.'),
      openapi: endpoint('/openapi.json', 'OpenAPI 3.1 description of the static read-only machine contract.'),
      llms_txt: endpoint('/llms.txt', 'Public verified article index optimized for LLM crawlers.', 'text/plain'),
      manifest: endpoint('/manifest.json', 'Full article index with public/draft status, confidence, and verification metadata.'),
      claims: endpoint('/claims.json', 'Public verified atomic claims with evidence links.'),
      search_api: endpoint('/api/search?q={query}', 'Read-only search API backed by the signed static search index.'),
      article_api: endpoint('/api/article?slug={canonical_slug}', 'Read-only public article evidence bundle with claims, sources, and retrieval metadata.'),
      claim_api: endpoint('/api/claim?id={claim_id}', 'Read-only public atomic claim lookup with article and matching source metadata.'),
      source_api: endpoint('/api/source?id={source_id}', 'Read-only public source lookup with reuse and mapped claim metadata.'),
      search_index: endpoint('/search-index.json', 'Compact public retrieval index with keywords, claim ids, source coverage, and article routes.'),
      sources: endpoint('/sources.json', 'Deduplicated public source index with tier, type, article reuse, and claim reuse.'),
      provenance: endpoint('/provenance.json', 'Build identity, official-site metadata, content counts, and artifact checksums.'),
      provenance_signature: endpoint('/provenance.sig', 'Detached Ed25519 signature for /provenance.json.'),
      article_jsonld_template: {
        path_template: '/{canonical_slug}/index.json',
        url_template: `${OFFICIAL_SITE}/{canonical_slug}/index.json`,
        media_type: 'application/ld+json',
        description: 'Per-article JSON-LD with confidence and verification metadata.'
      },
      article_markdown_template: {
        path_template: '/{canonical_slug}/index.md',
        url_template: `${OFFICIAL_SITE}/{canonical_slug}/index.md`,
        media_type: 'text/markdown',
        description: 'Original article Markdown for public and draft records.'
      }
    },
    citation_policy: {
      cite_only_public_records: true,
      prefer_atomic_claims: true,
      include_source_urls_or_dois: true,
      include_confidence_level: true,
      include_provenance_commit_when_available: true
    }
  };
}
