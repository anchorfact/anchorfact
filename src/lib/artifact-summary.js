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
      return {
        path: artifact.path,
        bytes,
        bytes_human: bytesToHuman(bytes),
        category: artifact.category,
        cache_posture: artifact.cache_posture || DEFAULT_CACHE_POSTURE,
        use_when: artifact.use_when,
        recommended_alternative: artifact.recommended_alternative
      };
    })
    .filter(Boolean);

  return {
    schema_version: ARTIFACT_SUMMARY_SCHEMA_VERSION,
    generated,
    provenance_url: publicUrl(PROVENANCE_PATH, site),
    total_bytes: artifactRows.reduce((total, artifact) => total + artifact.bytes, 0),
    recommended_default_calls: RECOMMENDED_DEFAULT_CALLS,
    artifacts: artifactRows
  };
}
