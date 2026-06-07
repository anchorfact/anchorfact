import { createHash } from 'crypto';
import { mkdirSync, statSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import {
  ARTIFACT_SHARDS_SCHEMA_VERSION,
  ARTIFACT_SHARD_SCHEMA_VERSION,
  CLAIMS_SCHEMA_VERSION,
  GRAPH_SCHEMA_VERSION,
  OFFICIAL_SITE,
  PROVENANCE_PATH,
  SEARCH_INDEX_SCHEMA_VERSION,
  publicUrl
} from './build-metadata.js';

export const DEFAULT_SHARD_TARGET_BYTES = 512 * 1024;

const SHARD_COLLECTIONS = [
  {
    id: 'claims',
    sourcePath: '/claims.json',
    sourceSchemaVersion: CLAIMS_SCHEMA_VERSION,
    collection: 'claims',
    itemKind: 'claim',
    itemKey: 'claims',
    recommendedApi: '/api/cite?id={claim_id}',
    items: payload => payload?.claims || []
  },
  {
    id: 'search_index',
    sourcePath: '/search-index.json',
    sourceSchemaVersion: SEARCH_INDEX_SCHEMA_VERSION,
    collection: 'records',
    itemKind: 'search_record',
    itemKey: 'records',
    recommendedApi: '/api/evidence?q={query}',
    items: payload => payload?.records || []
  },
  {
    id: 'graph_nodes',
    sourcePath: '/graph.json',
    sourceSchemaVersion: GRAPH_SCHEMA_VERSION,
    collection: 'nodes',
    itemKind: 'graph_node',
    itemKey: 'nodes',
    recommendedApi: '/api/context?q={query}',
    items: payload => payload?.nodes || []
  },
  {
    id: 'graph_edges',
    sourcePath: '/graph.json',
    sourceSchemaVersion: GRAPH_SCHEMA_VERSION,
    collection: 'edges',
    itemKind: 'graph_edge',
    itemKey: 'edges',
    recommendedApi: '/api/context?q={query}',
    items: payload => payload?.edges || []
  }
];

function sha256Text(text) {
  return createHash('sha256').update(text).digest('hex');
}

function safeVersion(value) {
  const version = String(value || 'local')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return version || 'local';
}

function shardVersion({ generated, build } = {}) {
  return safeVersion(build?.commit_sha || build?.build_id || generated);
}

function chunkItems(items, targetBytes) {
  const chunks = [];
  let current = [];
  let currentBytes = 0;

  for (const item of items || []) {
    const itemBytes = Buffer.byteLength(JSON.stringify(item), 'utf8') + 2;
    if (current.length > 0 && currentBytes + itemBytes > targetBytes) {
      chunks.push(current);
      current = [];
      currentBytes = 0;
    }
    current.push(item);
    currentBytes += itemBytes;
  }

  if (current.length > 0 || chunks.length === 0) chunks.push(current);
  return chunks;
}

function writeShardFile({ distDir, path, payload }) {
  const filePath = join(distDir, ...path.replace(/^\//, '').split('/'));
  mkdirSync(dirname(filePath), { recursive: true });
  const text = JSON.stringify(payload, null, 2);
  writeFileSync(filePath, text);
  return {
    sha256: sha256Text(text),
    bytes: statSync(filePath).size
  };
}

function writeCollection({ distDir, generated, site, version, sourcePayload, collection, targetBytes }) {
  const items = collection.items(sourcePayload);
  const chunks = chunkItems(items, targetBytes);
  const shardCount = chunks.length;
  let offset = 0;
  const shards = chunks.map((chunk, index) => {
    const number = String(index + 1).padStart(4, '0');
    const path = `/artifacts/v1/${version}/${collection.id}/${collection.id}-${number}.json`;
    const payload = {
      schema_version: ARTIFACT_SHARD_SCHEMA_VERSION,
      generated,
      provenance_url: publicUrl(PROVENANCE_PATH, site),
      artifact_id: collection.id,
      source_path: collection.sourcePath,
      source_schema_version: collection.sourceSchemaVersion,
      collection: collection.collection,
      item_kind: collection.itemKind,
      shard_index: index,
      shard_count: shardCount,
      item_offset: offset,
      item_count: chunk.length,
      [collection.itemKey]: chunk
    };
    const info = writeShardFile({ distDir, path, payload });
    const range = {
      start: chunk.length > 0 ? offset : null,
      end: chunk.length > 0 ? offset + chunk.length - 1 : null
    };
    offset += chunk.length;
    return {
      path,
      url: publicUrl(path, site),
      sha256: info.sha256,
      bytes: info.bytes,
      item_count: chunk.length,
      item_range: range
    };
  });

  return {
    id: collection.id,
    source_path: collection.sourcePath,
    source_url: publicUrl(collection.sourcePath, site),
    source_schema_version: collection.sourceSchemaVersion,
    collection: collection.collection,
    item_kind: collection.itemKind,
    item_count: items.length,
    shard_count: shards.length,
    shard_target_bytes: targetBytes,
    recommended_api: collection.recommendedApi,
    shards
  };
}

function llmsCollection(llmsText) {
  return {
    id: 'llms',
    sourcePath: '/llms.txt',
    sourceSchemaVersion: null,
    collection: 'lines',
    itemKind: 'line',
    itemKey: 'lines',
    recommendedApi: '/api/context?q={query}',
    items: () => String(llmsText || '').split(/\r?\n/)
  };
}

export function writeArtifactShardRegistry({
  distDir,
  generated = new Date().toISOString(),
  site = OFFICIAL_SITE,
  build,
  claimsPayload,
  searchIndexPayload,
  graphPayload,
  llmsText,
  targetBytes = DEFAULT_SHARD_TARGET_BYTES
}) {
  const version = shardVersion({ generated, build });
  const artifacts = [
    writeCollection({
      distDir,
      generated,
      site,
      version,
      sourcePayload: claimsPayload,
      collection: SHARD_COLLECTIONS[0],
      targetBytes
    }),
    writeCollection({
      distDir,
      generated,
      site,
      version,
      sourcePayload: searchIndexPayload,
      collection: SHARD_COLLECTIONS[1],
      targetBytes
    }),
    writeCollection({
      distDir,
      generated,
      site,
      version,
      sourcePayload: graphPayload,
      collection: SHARD_COLLECTIONS[2],
      targetBytes
    }),
    writeCollection({
      distDir,
      generated,
      site,
      version,
      sourcePayload: graphPayload,
      collection: SHARD_COLLECTIONS[3],
      targetBytes
    }),
    writeCollection({
      distDir,
      generated,
      site,
      version,
      sourcePayload: {},
      collection: llmsCollection(llmsText),
      targetBytes
    })
  ];

  const registry = {
    schema_version: ARTIFACT_SHARDS_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    version,
    default_for_agents: '/api/context?q={query}',
    compatibility: {
      full_artifacts_remain_available: true,
      full_artifacts_are_canonical: true,
      shard_registry_is_signed_by_provenance: true
    },
    large_artifact_strategy: {
      prefer_query_scoped_apis: true,
      primary_apis: ['/api/context?q={query}', '/api/evidence?q={query}', '/api/cite?id={claim_id}'],
      use_shards_when: [
        'offline indexing needs part of a large artifact',
        'bulk integration wants bounded downloads',
        'audits need stable per-shard checksums'
      ]
    },
    artifacts
  };

  const registryPath = join(distDir, 'artifact-shards.json');
  writeFileSync(registryPath, JSON.stringify(registry, null, 2));
  return registry;
}
