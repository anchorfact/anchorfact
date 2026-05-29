#!/usr/bin/env node
import { execFileSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { delimiter, join, resolve } from 'path';
import { fileURLToPath } from 'url';

export const REQUIRED_DIST_FILES = [
  'manifest.json',
  'claims.json',
  'sources.json',
  'search-index.json',
  'coverage.json',
  'topics.json',
  'capabilities.json',
  'content-health.json',
  'mcp.json'
];

export const REQUIRED_MCP_TOOLS = [
  'anchorfact_plan_query',
  'anchorfact_search',
  'anchorfact_context',
  'anchorfact_content_health',
  'anchorfact_get_article',
  'anchorfact_resolve_reference',
  'anchorfact_resolve_references',
  'anchorfact_cite_claim',
  'anchorfact_list_categories'
];

const REQUIRED_PYTHON_PACKAGES = ['mcp', 'fastapi', 'uvicorn'];

function repoRoot() {
  return resolve(fileURLToPath(new URL('..', import.meta.url)));
}

function addFailure(report, message) {
  report.failures.push(message);
}

function status(failures) {
  return failures.length ? 'fail' : 'pass';
}

function readJsonArtifact(report, distDir, file) {
  const path = join(distDir, file);
  if (!existsSync(path)) {
    addFailure(report, `Missing ${file}; run npm run build before npm run mcp:check.`);
    return null;
  }
  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch (error) {
    addFailure(report, `Could not parse ${file}: ${error.message}`);
    return null;
  }
}

function valueLabel(name, actual, expected) {
  return `${name} expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`;
}

function checkEqual(report, failures, name, actual, expected) {
  if (actual !== expected) {
    const message = valueLabel(name, actual, expected);
    failures.push(message);
    addFailure(report, message);
  }
}

export function buildLocalMcpPythonCode(distDir) {
  return `
import importlib.util
import json
from pathlib import Path

dist = Path(${JSON.stringify(distDir)})
dependencies = {name: importlib.util.find_spec(name) is not None for name in ${JSON.stringify(REQUIRED_PYTHON_PACKAGES)}}

from mcp_claims import build_citation_payload
from mcp_context import build_context_payload
from mcp_health import build_health_payload
from mcp_index import list_public_categories, load_public_article_index
from mcp_plan import build_plan_payload
from mcp_resolve import build_reference_batch_payload, build_reference_payload
from mcp_search import BM25Index

def load_json(filename, default):
    try:
        return json.loads((dist / filename).read_text(encoding="utf-8"))
    except Exception:
        return default

def claim_short_id(claim_id):
    if not claim_id:
        return None
    return str(claim_id).rstrip("/").split("/")[-1] or str(claim_id)

articles = load_public_article_index(dist)
record = next((item for item in articles if item.get("canonical_slug") == "ai/3d-generation-gaussian-splatting"), None)
if record is None and articles:
    record = articles[0]

claims = load_json("claims.json", {}).get("claims", [])
claim = None
if record:
    claim = next((item for item in claims if item.get("canonical_slug") == record.get("canonical_slug")), None)
if claim is None and claims:
    claim = claims[0]

query = "gaussian splatting" if record and record.get("canonical_slug") == "ai/3d-generation-gaussian-splatting" else (record or {}).get("title", "")
claim_ref = claim_short_id((claim or {}).get("id"))
index = BM25Index()
index.build(articles)
search_results = index.search(query, confidence_min="low", limit=3) if query else []
plan_status, plan_payload = build_plan_payload(dist, query, 3) if query else (400, {})
context_status, context_payload = build_context_payload(dist, query, 3) if query else (400, {})
health_status, health_payload = build_health_payload(dist)
cite_status, cite_payload = build_citation_payload(dist, claim_ref) if claim_ref else (400, {})
resolve_status, resolve_payload = build_reference_payload(dist, claim_ref or (record or {}).get("canonical_slug"))
batch_refs = [item for item in [claim_ref, (record or {}).get("canonical_slug")] if item]
batch_status, batch_payload = build_reference_batch_payload(dist, batch_refs)
categories = list_public_categories(dist)

print(json.dumps({
    "dependencies": dependencies,
    "article_count": len(articles),
    "category_count": len(categories),
    "query": query,
    "record": {
        "canonical_slug": (record or {}).get("canonical_slug"),
        "title": (record or {}).get("title"),
    },
    "search_result_count": len(search_results),
    "search_top_slug": (search_results[0] if search_results else {}).get("canonical_slug"),
    "plan_status": plan_status,
    "plan_coverage_status": plan_payload.get("coverage_status"),
    "plan_should_use_anchorfact": plan_payload.get("should_use_anchorfact"),
    "context_status": context_status,
    "context_schema_version": context_payload.get("schema_version"),
    "context_evidence_pack_count": context_payload.get("evidence_pack_count"),
    "health_status": health_status,
    "health_schema_version": health_payload.get("schema_version"),
    "health_repair_queue_candidates": (health_payload.get("draft", {}).get("repair_queue", {}) or {}).get("candidate_count"),
    "health_repair_queue_next_batch": len((health_payload.get("draft", {}).get("repair_queue", {}) or {}).get("next_batch") or []),
    "cite_status": cite_status,
    "cite_schema_version": cite_payload.get("schema_version"),
    "resolve_status": resolve_status,
    "resolve_type": resolve_payload.get("resolved_type"),
    "batch_status": batch_status,
    "batch_ok_count": batch_payload.get("ok_count"),
}, ensure_ascii=False))
`;
}

function defaultPythonRunner({ code, rootDir }) {
  const srcPath = join(rootDir, 'src');
  const pythonPath = [srcPath, process.env.PYTHONPATH].filter(Boolean).join(delimiter);
  return execFileSync('python', ['-c', code], {
    cwd: rootDir,
    encoding: 'utf-8',
    env: { ...process.env, PYTHONPATH: pythonPath },
    stdio: ['ignore', 'pipe', 'pipe']
  });
}

function checkPythonSummary(report, summary) {
  const failures = [];
  const missingPackages = Object.entries(summary.dependencies || {})
    .filter(([, present]) => present !== true)
    .map(([name]) => name);
  if (missingPackages.length) {
    const message = `Missing Python MCP dependency packages: ${missingPackages.join(', ')}. Run python -m pip install -r src/requirements-mcp.txt.`;
    failures.push(message);
    addFailure(report, message);
  }
  if ((summary.article_count || 0) < 1) {
    const message = 'Python MCP modules loaded zero public articles.';
    failures.push(message);
    addFailure(report, message);
  }
  if ((summary.search_result_count || 0) < 1) {
    const message = 'Python MCP search returned zero results for the readiness query.';
    failures.push(message);
    addFailure(report, message);
  }
  checkEqual(report, failures, 'plan_status', summary.plan_status, 200);
  checkEqual(report, failures, 'plan_should_use_anchorfact', summary.plan_should_use_anchorfact, true);
  checkEqual(report, failures, 'context_status', summary.context_status, 200);
  checkEqual(report, failures, 'context_schema_version', summary.context_schema_version, 'anchorfact.context-api.v1');
  if ((summary.context_evidence_pack_count || 0) < 1) {
    const message = valueLabel('context_evidence_pack_count', summary.context_evidence_pack_count, '>= 1');
    failures.push(message);
    addFailure(report, message);
  }
  checkEqual(report, failures, 'health_status', summary.health_status, 200);
  checkEqual(report, failures, 'health_schema_version', summary.health_schema_version, 'anchorfact.content-health.v1');
  if (!Number.isFinite(summary.health_repair_queue_candidates ?? null)) {
    const message = valueLabel('health_repair_queue_candidates', summary.health_repair_queue_candidates, 'a number');
    failures.push(message);
    addFailure(report, message);
  }
  if (!Number.isFinite(summary.health_repair_queue_next_batch ?? null)) {
    const message = valueLabel('health_repair_queue_next_batch', summary.health_repair_queue_next_batch, 'a number');
    failures.push(message);
    addFailure(report, message);
  }
  checkEqual(report, failures, 'cite_status', summary.cite_status, 200);
  checkEqual(report, failures, 'resolve_status', summary.resolve_status, 200);
  checkEqual(report, failures, 'batch_status', summary.batch_status, 200);
  if ((summary.batch_ok_count || 0) < 2) {
    const message = valueLabel('batch_ok_count', summary.batch_ok_count, '>= 2');
    failures.push(message);
    addFailure(report, message);
  }
  return {
    status: status(failures),
    exercised_query: summary.query || null,
    top_record: summary.record || null,
    search_result_count: summary.search_result_count || 0,
    plan_coverage_status: summary.plan_coverage_status || null,
    dependencies: summary.dependencies || {},
    category_count: summary.category_count || 0,
    failures
  };
}

export function checkLocalMcp({
  rootDir = repoRoot(),
  distDir = join(rootDir, 'dist'),
  pythonRunner = defaultPythonRunner
} = {}) {
  const report = {
    status: 'pass',
    generated: new Date().toISOString(),
    root: rootDir,
    dist: distDir,
    checks: {},
    failures: []
  };

  const artifacts = Object.fromEntries(
    REQUIRED_DIST_FILES.map(file => [file, readJsonArtifact(report, distDir, file)])
  );
  const missingFiles = REQUIRED_DIST_FILES.filter(file => !artifacts[file]);
  report.checks.dist_artifacts = {
    status: missingFiles.length ? 'fail' : 'pass',
    required_files: REQUIRED_DIST_FILES,
    missing_files: missingFiles
  };

  const mcpProfile = artifacts['mcp.json'] || {};
  const tools = (mcpProfile.tools || []).map(tool => tool?.name).filter(Boolean);
  const missingTools = REQUIRED_MCP_TOOLS.filter(tool => !tools.includes(tool));
  const mcpFailures = [];
  if (mcpProfile.schema_version !== 'anchorfact.mcp.v1') {
    mcpFailures.push(valueLabel('mcp schema_version', mcpProfile.schema_version, 'anchorfact.mcp.v1'));
  }
  if (missingTools.length) {
    mcpFailures.push(`Missing MCP tools: ${missingTools.join(', ')}`);
  }
  if (!(mcpProfile.installation?.requirements || []).includes('npm run mcp:check')) {
    mcpFailures.push('MCP profile installation requirements should include npm run mcp:check.');
  }
  for (const failure of mcpFailures) addFailure(report, failure);
  report.checks.mcp_profile = {
    status: status(mcpFailures),
    tool_count: tools.length,
    required_tools: REQUIRED_MCP_TOOLS,
    missing_tools: missingTools,
    failures: mcpFailures
  };

  const manifest = artifacts['manifest.json'] || {};
  const claims = artifacts['claims.json'] || {};
  const sources = artifacts['sources.json'] || {};
  const searchIndex = artifacts['search-index.json'] || {};
  const snapshot = mcpProfile.current_snapshot || {};
  const countFailures = [];
  checkEqual(report, countFailures, 'mcp current_snapshot.public_articles', snapshot.public_articles, manifest.public_article_count);
  checkEqual(report, countFailures, 'mcp current_snapshot.draft_articles', snapshot.draft_articles, manifest.draft_article_count);
  checkEqual(report, countFailures, 'mcp current_snapshot.public_claims', snapshot.public_claims, claims.claim_count ?? manifest.claim_count);
  checkEqual(report, countFailures, 'mcp current_snapshot.searchable_records', snapshot.searchable_records, searchIndex.article_count);
  checkEqual(report, countFailures, 'mcp current_snapshot.unique_sources', snapshot.unique_sources, sources.source_count);
  report.checks.snapshot_counts = {
    status: status(countFailures),
    manifest_public_articles: manifest.public_article_count ?? null,
    mcp_public_articles: snapshot.public_articles ?? null,
    public_claims: snapshot.public_claims ?? null,
    searchable_records: snapshot.searchable_records ?? null,
    unique_sources: snapshot.unique_sources ?? null,
    failures: countFailures
  };

  if (!missingFiles.length) {
    try {
      const pythonSummary = JSON.parse(pythonRunner({
        code: buildLocalMcpPythonCode(distDir),
        rootDir,
        distDir
      }));
      report.checks.python_modules = checkPythonSummary(report, pythonSummary);
    } catch (error) {
      const stderr = error.stderr ? String(error.stderr).trim() : '';
      const message = `Python MCP readiness check failed: ${stderr || error.message}`;
      addFailure(report, message);
      report.checks.python_modules = { status: 'fail', failures: [message] };
    }
  } else {
    report.checks.python_modules = { status: 'fail', failures: ['Skipped because required dist artifacts are missing.'] };
  }

  report.status = status(report.failures);
  return report;
}

export function renderLocalMcpCheckMarkdown(report) {
  const titleStatus = String(report.status || 'fail').toUpperCase();
  const python = report.checks.python_modules || {};
  const lines = [
    `# AnchorFact Local MCP Check - ${titleStatus}`,
    '',
    `Generated: ${report.generated}`,
    '',
    `Dist: ${report.dist}`,
    '',
    '## Summary',
    '',
    `- status: ${report.status}`,
    `- dist artifacts: ${report.checks.dist_artifacts?.status || 'unknown'}`,
    `- MCP profile: ${report.checks.mcp_profile?.status || 'unknown'}`,
    `- snapshot counts: ${report.checks.snapshot_counts?.status || 'unknown'}`,
    `- Python modules: ${python.status || 'unknown'}`,
    `- exercised query: ${python.exercised_query || 'unavailable'}`,
    '',
    '## MCP Tools',
    '',
    ...(report.checks.mcp_profile?.required_tools || []).map(tool => `- ${tool}`),
    '',
    '## Failures',
    '',
    ...(report.failures.length ? report.failures.map(failure => `- ${failure}`) : ['- none']),
    ''
  ];
  return lines.join('\n');
}

function parseArgs(argv) {
  const args = { format: 'markdown', distDir: null };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--json') {
      args.format = 'json';
    } else if (arg === '--dist') {
      args.distDir = resolve(argv[++i] || '');
    }
  }
  return args;
}

export function main(argv = process.argv.slice(2)) {
  const rootDir = repoRoot();
  const args = parseArgs(argv);
  const report = checkLocalMcp({
    rootDir,
    distDir: args.distDir || join(rootDir, 'dist')
  });
  const output = args.format === 'json'
    ? `${JSON.stringify(report, null, 2)}\n`
    : renderLocalMcpCheckMarkdown(report);
  process.stdout.write(output);
  process.exitCode = report.status === 'pass' ? 0 : 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
