import { existsSync, statSync } from 'fs';
import { join } from 'path';
import {
  ARTIFACT_SUMMARY_SCHEMA_VERSION,
  OFFICIAL_SITE,
  PROVENANCE_PATH,
  publicUrl
} from './build-metadata.js';

export const MAJOR_MACHINE_ARTIFACTS = [
  {
    path: '/agent.json',
    category: 'discovery',
    use_when: 'Discover the recommended AI workflow and endpoint catalog.',
    recommended_alternative: '/api/context?q={query}'
  },
  {
    path: '/openapi.json',
    category: 'schema',
    use_when: 'Integrate with tooling that requires the full OpenAPI contract.',
    recommended_alternative: '/api'
  },
  {
    path: '/artifact-shards.json',
    category: 'shard_registry',
    use_when: 'Discover versioned shards for large static artifacts before bulk or offline downloads.',
    recommended_alternative: '/api/context?q={query}'
  },
  {
    path: '/manifest.json',
    category: 'catalog',
    use_when: 'Inspect every public and draft article record with verification metadata.',
    recommended_alternative: '/api/context?q={query}'
  },
  {
    path: '/claims.json',
    category: 'claims',
    use_when: 'Run offline analysis over all public atomic claims.',
    recommended_alternative: '/api/cite?id={claim_id}'
  },
  {
    path: '/topics.json',
    category: 'coverage',
    use_when: 'Inspect compact topic-level public coverage.',
    recommended_alternative: '/api/context?q={query}'
  },
  {
    path: '/capabilities.json',
    category: 'routing',
    use_when: 'Map an AI task to the smallest trustworthy endpoint.',
    recommended_alternative: '/api/context?q={query}'
  },
  {
    path: '/content-health.json',
    category: 'trust',
    use_when: 'Inspect corpus health, draft risk, and trust boundaries.',
    recommended_alternative: '/api/context?q={query}'
  },
  {
    path: '/coverage.json',
    category: 'coverage',
    use_when: 'Audit known coverage and fallback limits before broad use.',
    recommended_alternative: '/api/plan?q={query}'
  },
  {
    path: '/examples.json',
    category: 'integration',
    use_when: 'Read executable workflow examples for API consumers.',
    recommended_alternative: '/api'
  },
  {
    path: '/graph.json',
    category: 'offline_graph',
    use_when: 'Traverse public topic, article, claim, and source relationships offline.',
    recommended_alternative: '/api/context?q={query}'
  },
  {
    path: '/evals.json',
    category: 'integration',
    use_when: 'Run golden checks against the current AI integration contract.',
    recommended_alternative: '/api'
  },
  {
    path: '/mcp.json',
    category: 'integration',
    use_when: 'Configure local MCP-capable hosts.',
    recommended_alternative: '/api/context?q={query}'
  },
  {
    path: '/search-index.json',
    category: 'offline_search',
    use_when: 'Shortlist public records offline by keywords, claims, and source coverage.',
    recommended_alternative: '/api/evidence?q={query}'
  },
  {
    path: '/sources.json',
    category: 'sources',
    use_when: 'Analyze deduplicated public source reuse and source tiers offline.',
    recommended_alternative: '/api/source?id={source_id}'
  },
  {
    path: '/llms.txt',
    category: 'crawler_index',
    use_when: 'Read crawler-friendly public article and endpoint hints.',
    recommended_alternative: '/api/context?q={query}'
  }
];

export const RECOMMENDED_DEFAULT_CALLS = [
  {
    path: '/api/context?q={query}',
    use_when: 'Default one-call prompt assembly with answer policy, citations, content health, and evidence packs.'
  },
  {
    path: '/api/evidence?q={query}',
    use_when: 'Source-grounded evidence packs when you already have a factual query.'
  },
  {
    path: '/api/cite?id={claim_id}',
    use_when: 'Citation-ready text for a specific public atomic claim.'
  },
  {
    path: '/provenance.json',
    use_when: 'Signed build identity, counts, and artifact hashes.'
  }
];

export const LARGE_ARTIFACT_THRESHOLD_BYTES = 1024 * 1024;
export const SHARDED_ARTIFACT_PATHS = new Set([
  '/claims.json',
  '/search-index.json',
  '/graph.json',
  '/llms.txt'
]);

export const ARTIFACT_GROWTH_BUDGETS = {
  '/graph.json': 5500000,
  '/search-index.json': 3550000,
  '/claims.json': 3150000,
  '/sources.json': 2050000,
  '/manifest.json': 1100000,
  '/llms.txt': 425000,
  '/openapi.json': 100000,
  '/agent.json': 40000,
  '/artifact-summary.json': 60000,
  '/artifact-shards.json': 250000
};

const NEAR_BUDGET_HEADROOM_RATIO = 0.05;
const NEAR_BUDGET_HEADROOM_BYTES = 100000;
const DEFAULT_CACHE_POSTURE = 'public, max-age=0, must-revalidate';

export function bytesToHuman(bytes) {
  const value = Number(bytes || 0);
  if (value >= 1024 * 1024 * 1024) return `${(value / 1024 / 1024 / 1024).toFixed(2)} GB`;
  if (value >= 1024 * 1024) return `${(value / 1024 / 1024).toFixed(2)} MB`;
  if (value >= 1024) return `${(value / 1024).toFixed(2)} KB`;
  return `${value} B`;
}

function filePathForRoute(distDir, routePath) {
  const relative = routePath.replace(/^\/+/, '');
  return join(distDir, ...relative.split('/'));
}

function budgetStatus(bytes, budgetBytes) {
  if (!Number.isFinite(budgetBytes)) return 'unbudgeted';
  if (bytes > budgetBytes) return 'over_budget';
  const headroom = budgetBytes - bytes;
  const nearBudgetThreshold = Math.max(
    Math.ceil(budgetBytes * NEAR_BUDGET_HEADROOM_RATIO),
    NEAR_BUDGET_HEADROOM_BYTES
  );
  return headroom <= nearBudgetThreshold ? 'near_budget' : 'within_budget';
}

function downloadGuidance(artifact, bytes) {
  if (bytes >= LARGE_ARTIFACT_THRESHOLD_BYTES) {
    return `Prefer ${artifact.recommended_alternative} for normal agent calls; download ${artifact.path} only for offline indexing, audits, or bulk integration.`;
  }
  return `Use ${artifact.path} for discovery or integration metadata; prefer ${artifact.recommended_alternative} for normal agent answer paths.`;
}

export function buildArtifactSummary({
  generated = new Date().toISOString(),
  distDir,
  site = OFFICIAL_SITE,
  artifacts = MAJOR_MACHINE_ARTIFACTS
} = {}) {
  if (!distDir) {
    throw new Error('buildArtifactSummary requires distDir.');
  }

  const artifactRows = artifacts
    .map(artifact => {
      const filePath = filePathForRoute(distDir, artifact.path);
      if (!existsSync(filePath)) return null;
      const bytes = statSync(filePath).size;
      const budgetBytes = ARTIFACT_GROWTH_BUDGETS[artifact.path] ?? null;
      return {
        path: artifact.path,
        bytes,
        bytes_human: bytesToHuman(bytes),
        category: artifact.category,
        cache_posture: artifact.cache_posture || DEFAULT_CACHE_POSTURE,
        use_when: artifact.use_when,
        recommended_alternative: artifact.recommended_alternative,
        budget_bytes: budgetBytes,
        budget_headroom_bytes: Number.isFinite(budgetBytes) ? budgetBytes - bytes : null,
        budget_status: budgetStatus(bytes, budgetBytes),
        shard_registry_path: SHARDED_ARTIFACT_PATHS.has(artifact.path) ? '/artifact-shards.json' : null,
        sharded: SHARDED_ARTIFACT_PATHS.has(artifact.path),
        download_guidance: downloadGuidance(artifact, bytes)
      };
    })
    .filter(Boolean);

  return {
    schema_version: ARTIFACT_SUMMARY_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    total_bytes: artifactRows.reduce((total, artifact) => total + artifact.bytes, 0),
    artifact_growth_policy: {
      default_for_agents: '/api/context?q={query}',
      prefer_primary_apis: true,
      large_artifact_threshold_bytes: LARGE_ARTIFACT_THRESHOLD_BYTES,
      near_budget_headroom_ratio: NEAR_BUDGET_HEADROOM_RATIO,
      near_budget_headroom_bytes: NEAR_BUDGET_HEADROOM_BYTES,
      guidance: [
        'Use /api/context or /api/evidence for normal agent answer paths before downloading large JSON artifacts.',
        'Use /artifact-shards.json before bulk reads of /graph.json, /search-index.json, /claims.json, or /llms.txt.',
        'Download /graph.json, /claims.json, /sources.json, /manifest.json, or /llms.txt only for offline indexing, audits, or bulk integration.',
        'Treat artifacts marked near_budget as growth-sensitive and prefer query-scoped APIs when adding agent workflows.'
      ]
    },
    recommended_default_calls: RECOMMENDED_DEFAULT_CALLS,
    artifacts: artifactRows
  };
}
