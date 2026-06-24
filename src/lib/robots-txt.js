const DEFAULT_SITE = 'https://anchorfact.org';

function trimTrailingSlash(value) {
  return String(value || '').replace(/\/+$/, '');
}

function publicUrl(path, site = DEFAULT_SITE) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${trimTrailingSlash(site)}${normalizedPath}`;
}

export function buildRobotsTxt(site = DEFAULT_SITE) {
  return `# robots.txt - AnchorFact
User-agent: *
Allow: /

Sitemap: ${publicUrl('/sitemap.xml', site)}
Machine-Index: ${publicUrl('/index.json', site)}
LLMs: ${publicUrl('/llms.txt', site)}
Agent: ${publicUrl('/agent.json', site)}
Well-Known-Agent: ${publicUrl('/.well-known/anchorfact.json', site)}
OpenAPI: ${publicUrl('/openapi.json', site)}
API: ${publicUrl('/api', site)}
API-Access: ${publicUrl('/api-access/', site)}
AI-Context: ${publicUrl('/api/context?q={query}', site)}
AI-Evidence: ${publicUrl('/api/evidence?q={query}', site)}
AI-Cite: ${publicUrl('/api/cite?id={claim_id}', site)}
AI-Plan: ${publicUrl('/api/plan?q={query}', site)}
AI-Plan-Use: coverage_uncertain_only
AI-Next-After-Discovery: ${publicUrl('/api/context?q={query}&limit=3&format=markdown', site)}
AI-Primary-Conversion-Target: 0.2
AI-Minimum-Valid-Context: ${publicUrl('/api/context?q={query}&limit=3&format=markdown', site)}
AI-Minimum-Valid-Evidence: ${publicUrl('/api/evidence?q={query}&limit=3&format=markdown', site)}
AI-Minimum-Valid-Resolve-Batch: ${publicUrl('/api/resolve-batch?ref={claim_id}&ref={source_id}&format=markdown', site)}
AI-Do-Not-Call-Bare: /api/evidence,/api/source,/api/resolve-batch
AI-Recoverable-400-Field: machine_recovery
AI-Recovery-Guide: ${publicUrl('/api', site)}
Large-Artifact-Policy: prefer_api_context_or_evidence
Artifact-Summary: ${publicUrl('/artifact-summary.json', site)}
Artifact-Shards: ${publicUrl('/artifact-shards.json', site)}
API-Readiness: ${publicUrl('/api-readiness.json', site)}
Health: ${publicUrl('/content-health.json', site)}
MCP: ${publicUrl('/mcp.json', site)}
Provenance: ${publicUrl('/provenance.json', site)}
`;
}
