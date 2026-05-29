#!/usr/bin/env node
import { buildMcpProfile } from '../src/lib/mcp-profile.js';

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

console.log('AnchorFact MCP Profile Tests\n');

test('buildMcpProfile publishes local MCP install and tool metadata', () => {
  const profile = buildMcpProfile({
    generated: '2026-05-29T00:00:00.000Z',
    manifest: {
      public_article_count: 555,
      draft_article_count: 445
    },
    claimsPayload: { claim_count: 1685 },
    searchIndexPayload: { article_count: 555 },
    sourcesPayload: { source_count: 1200 }
  });

  assertEq(profile.schema_version, 'anchorfact.mcp.v1');
  assertEq(profile.provenance_url, 'https://anchorfact.org/provenance.json');
  assertEq(profile.name, 'io.github.anchorfact/anchorfact');
  assert(profile.registry_note.includes('not an official MCP Registry'), 'profile should avoid claiming registry submission status');
  assertEq(profile.current_snapshot.public_articles, 555);
  assertEq(profile.installation.stdio.transport, 'stdio');
  assertEq(profile.installation.stdio.config_snippet.mcpServers.anchorfact.command, 'python');
  assertEq(profile.installation.stdio.config_snippet.mcpServers.anchorfact.args, ['src/mcp_server.py']);
  assertEq(profile.installation.local_http_wrapper.base_url, 'http://127.0.0.1:8000');
  assertEq(profile.installation.local_http_wrapper.endpoints.cite, 'http://127.0.0.1:8000/cite?id={claim_id}');
  assertEq(profile.tools.map(tool => tool.name), [
    'anchorfact_search',
    'anchorfact_get_article',
    'anchorfact_cite_claim',
    'anchorfact_list_categories'
  ]);
  assert(profile.related_public_artifacts.includes('/evals.json'), 'profile should point agents to evals');
  assert(profile.related_public_artifacts.includes('/provenance.json'), 'profile should point agents to provenance');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
