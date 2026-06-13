#!/usr/bin/env node
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import {
  REQUIRED_MCP_TOOLS,
  checkLocalMcp,
  renderLocalMcpCheckMarkdown
} from '../scripts/check-mcp-local.js';

let passed = 0, failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ok ${name}`);
  } catch (e) {
    failed++;
    console.log(`  fail ${name}: ${e.message}`);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertEq(actual, expected, ctx = '') {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(`${ctx} expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

console.log('AnchorFact Local MCP Check Tests\n');

const root = resolve('tests/.tmp-mcp-local-check');
const distDir = join(root, 'dist');

function writeJson(path, value) {
  writeFileSync(path, JSON.stringify(value, null, 2));
}

function writeFixture({ omitTool = null, snapshotPublic = 1 } = {}) {
  rmSync(root, { recursive: true, force: true });
  mkdirSync(distDir, { recursive: true });

  writeJson(join(distDir, 'manifest.json'), {
    public_article_count: 1,
    draft_article_count: 0,
    claim_count: 1,
    articles: []
  });
  writeJson(join(distDir, 'claims.json'), { claim_count: 1, claims: [] });
  writeJson(join(distDir, 'sources.json'), { source_count: 1, sources: [] });
  writeJson(join(distDir, 'search-index.json'), { article_count: 1, records: [] });
  writeJson(join(distDir, 'coverage.json'), { topic_coverage: [] });
  writeJson(join(distDir, 'topics.json'), { topics: [] });
  writeJson(join(distDir, 'capabilities.json'), {});
  writeJson(join(distDir, 'content-health.json'), {
    schema_version: 'anchorfact.content-health.v1',
    snapshot: { public_articles: 1, draft_articles: 0, public_claims: 1 },
    draft: {
      repair_queue: {
        candidate_count: 1,
        source_ready_candidate_count: 1,
        excluded_count: 1,
        next_batch: [{ canonical_slug: 'ai/draft-a' }],
        source_ready_next_batch: [{ canonical_slug: 'business/source-ready-draft' }],
        selection_policy: ['Prioritize lower repair_complexity values first.'],
        exclusion_reason_distribution: [{ name: 'placeholder_content', count: 1 }]
      }
    },
    trust_boundaries: { draft_entries_excluded_from_ai_entrypoints: true }
  });
  writeJson(join(distDir, 'mcp.json'), {
    schema_version: 'anchorfact.mcp.v1',
    current_snapshot: {
      public_articles: snapshotPublic,
      draft_articles: 0,
      public_claims: 1,
      searchable_records: 1,
      unique_sources: 1
    },
    installation: {
      requirements: ['npm install', 'npm run build', 'python -m pip install -r src/requirements-mcp.txt', 'npm run mcp:check']
    },
    tools: REQUIRED_MCP_TOOLS
      .filter(name => name !== omitTool)
      .map(name => ({ name }))
  });
}

function passingPythonSummary() {
  return JSON.stringify({
    dependencies: { mcp: true, fastapi: true, uvicorn: true },
    article_count: 1,
    category_count: 1,
    query: 'public fixture',
    record: { canonical_slug: 'ai/public-fixture', title: 'Public Fixture' },
    search_result_count: 1,
    search_top_slug: 'ai/public-fixture',
    plan_status: 200,
    plan_coverage_status: 'supported',
    plan_should_use_anchorfact: true,
    context_status: 200,
    context_schema_version: 'anchorfact.context-api.v1',
    context_evidence_pack_count: 1,
    context_answer_policy_can_answer: true,
    context_citation_ready_claim_count: 1,
    health_status: 200,
    health_schema_version: 'anchorfact.content-health.v1',
    health_repair_queue_candidates: 1,
    health_source_ready_repair_queue_candidates: 1,
    health_repair_queue_excluded_count: 1,
    health_repair_queue_next_batch: 1,
    health_source_ready_repair_queue_next_batch: 1,
    cite_status: 200,
    cite_schema_version: 'anchorfact.cite-api.v1',
    resolve_status: 200,
    resolve_type: 'claim',
    batch_status: 200,
    batch_ok_count: 2
  });
}

test('checkLocalMcp reports a passing local MCP contract', () => {
  writeFixture();
  const report = checkLocalMcp({
    rootDir: root,
    distDir,
    pythonRunner: () => passingPythonSummary()
  });

  assertEq(report.status, 'pass');
  assertEq(report.failures, []);
  assertEq(report.checks.dist_artifacts.status, 'pass');
  assertEq(report.checks.mcp_profile.status, 'pass');
  assertEq(report.checks.snapshot_counts.status, 'pass');
  assertEq(report.checks.python_modules.status, 'pass');
  assertEq(report.checks.python_modules.health_repair_queue_excluded_count, 1);
  assertEq(report.checks.python_modules.health_source_ready_repair_queue_candidates, 1);
  assertEq(report.checks.python_modules.health_source_ready_repair_queue_next_batch, 1);

  const markdown = renderLocalMcpCheckMarkdown(report);
  assert(markdown.includes('# AnchorFact Local MCP Check - PASS'), 'markdown should include pass heading');
  assert(markdown.includes('public fixture'), 'markdown should include exercised query');
  assert(markdown.includes('health repair exclusions: 1'), 'markdown should include health exclusion count');
  assert(markdown.includes('health source-ready repair candidates: 1'), 'markdown should include source-ready repair count');
  assert(markdown.includes('health source-ready next batch: 1'), 'markdown should include source-ready next batch size');
});

test('checkLocalMcp fails on MCP profile drift and Python failures', () => {
  writeFixture({ omitTool: 'anchorfact_cite_claim', snapshotPublic: 2 });
  const report = checkLocalMcp({
    rootDir: root,
    distDir,
    pythonRunner: () => JSON.stringify({
      ...JSON.parse(passingPythonSummary()),
      dependencies: { mcp: false, fastapi: true, uvicorn: true },
      search_result_count: 0,
      context_status: 500,
      context_evidence_pack_count: 0,
      context_answer_policy_can_answer: false,
      context_citation_ready_claim_count: 0,
      health_status: 500,
      health_repair_queue_candidates: 0,
      health_source_ready_repair_queue_candidates: null,
      health_repair_queue_excluded_count: null,
      health_source_ready_repair_queue_next_batch: null,
      cite_status: 404
    })
  });

  assertEq(report.status, 'fail');
  assert(report.failures.some(failure => failure.includes('anchorfact_cite_claim')), 'missing tool should fail');
  assert(report.failures.some(failure => failure.includes('public_articles')), 'count drift should fail');
  assert(report.failures.some(failure => failure.includes('mcp')), 'missing Python dependency should fail');
  assert(report.failures.some(failure => failure.includes('search')), 'search failure should fail');
  assert(report.failures.some(failure => failure.includes('context')), 'context failure should fail');
  assert(report.failures.some(failure => failure.includes('health')), 'health failure should fail');
  assert(report.failures.some(failure => failure.includes('cite')), 'cite failure should fail');
});

rmSync(root, { recursive: true, force: true });

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
