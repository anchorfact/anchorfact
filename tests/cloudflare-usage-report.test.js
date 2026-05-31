#!/usr/bin/env node
import {
  buildCloudflareUsageSummary,
  classifyPath,
  classifyUserAgent,
  renderCloudflareUsageReport
} from '../scripts/cloudflare-usage-report.js';

let passed = 0, failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  OK ${name}`);
  } catch (error) {
    failed++;
    console.log(`  FAIL ${name}: ${error.message}`);
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

function pathRow(path, count, bytes = 1000) {
  return {
    count,
    dimensions: { clientRequestPath: path },
    sum: { edgeResponseBytes: bytes }
  };
}

function uaRow(userAgent, count) {
  return {
    count,
    dimensions: { userAgent }
  };
}

function pathUaRow(path, userAgent, count, status = 200) {
  return {
    count,
    dimensions: {
      clientRequestPath: path,
      userAgent,
      edgeResponseStatus: status,
      clientRequestHTTPMethodName: 'GET'
    },
    sum: { edgeResponseBytes: 1000 }
  };
}

console.log('AnchorFact Cloudflare Usage Report Tests\n');

test('classifyUserAgent separates synthetic monitors, AI bots, search bots, scanners, and browsers', () => {
  assertEq(classifyUserAgent('codex-anchorfact-monitor').category, 'synthetic_monitor');
  assertEq(classifyUserAgent('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.4; +https://openai.com/gptbot)').category, 'ai_bot');
  assertEq(classifyUserAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)').category, 'search_bot');
  assertEq(classifyUserAgent('http://anchorfact.org/wp-admin/install.php?step=1').category, 'scanner');
  assertEq(classifyUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/125.0.0.0 Safari/537.36').category, 'browser');
});

test('classifyPath identifies API, machine artifact, article artifact, and probe surfaces', () => {
  assertEq(classifyPath('/api/evidence'), 'api');
  assertEq(classifyPath('/graph.json'), 'machine_artifact');
  assertEq(classifyPath('/ai/ai-search-recommendation/index.ttl'), 'article_artifact');
  assertEq(classifyPath('/wp-admin/install.php'), 'security_probe');
  assertEq(classifyPath('/.env'), 'security_probe');
  assertEq(classifyPath('/robots.txt'), 'crawler_control');
});

test('buildCloudflareUsageSummary derives product, AI discovery, and security recommendations', () => {
  const summary = buildCloudflareUsageSummary({
    zoneName: 'anchorfact.org',
    zoneId: 'zone-fixture',
    window: { since: '2026-05-30T00:00:00.000Z', until: '2026-05-31T00:00:00.000Z' },
    zone: {
      totals: [{ count: 1000, sum: { edgeResponseBytes: 1024 * 1024 } }],
      topPaths: [
        pathRow('/api/evidence', 220, 900000),
        pathRow('/api/context', 90, 350000),
        pathRow('/graph.json', 40, 10000000),
        pathRow('/search-index.json', 30, 8000000),
        pathRow('/wp-admin/install.php', 25, 100000),
        pathRow('/.env', 3, 1000)
      ],
      topUAs: [
        uaRow('codex-anchorfact-monitor', 70),
        uaRow('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.4; +https://openai.com/gptbot)', 60),
        uaRow('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 20),
        uaRow('http://anchorfact.org/wp-admin/install.php?step=1', 25),
        uaRow('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/125.0.0.0 Safari/537.36', 600)
      ],
      pathUa: [
        pathUaRow('/ai/example/index.ttl', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.4; +https://openai.com/gptbot)', 2)
      ],
      statusCodes: [{ count: 970, dimensions: { edgeResponseStatus: 200 } }],
      methods: [{ count: 1000, dimensions: { clientRequestHTTPMethodName: 'GET' } }],
      countries: [{ count: 500, dimensions: { clientCountryName: 'US' } }],
      daily: [
        {
          dimensions: { date: '2026-05-30' },
          sum: { requests: 1000, bytes: 1024, cachedRequests: 0, cachedBytes: 0, pageViews: 20, threats: 2 },
          uniq: { uniques: 10 }
        }
      ]
    }
  }, { generatedAt: '2026-05-31T00:00:00.000Z' });

  assertEq(summary.totals.requests, 1000);
  assert(summary.top_api_paths.some(item => item.path === '/api/evidence'), 'should report API product signal');
  assert(summary.top_machine_artifacts.some(item => item.path === '/graph.json'), 'should report machine artifact signal');
  assert(summary.security_probe_paths.some(item => item.path === '/wp-admin/install.php'), 'should report security probes');
  assert(summary.ai_agents.some(item => item.name === 'openai_gptbot'), 'should classify OpenAI crawler traffic');
  assert(summary.recommendations.some(item => item.includes('API and MCP')), 'should recommend product-surface focus');
  assert(summary.recommendations.some(item => item.includes('synthetic monitor')), 'should recommend separating monitor traffic');
});

test('renderCloudflareUsageReport emits readable Markdown sections', () => {
  const report = buildCloudflareUsageSummary({
    zone: {
      totals: [{ count: 10, sum: { edgeResponseBytes: 1024 } }],
      topPaths: [pathRow('/api/context', 4), pathRow('/agent.json', 2)],
      topUAs: [uaRow('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)', 2)]
    },
    window: { since: '2026-05-30T00:00:00.000Z', until: '2026-05-31T00:00:00.000Z' }
  }, { generatedAt: '2026-05-31T00:00:00.000Z' });
  const markdown = renderCloudflareUsageReport(report);
  assert(markdown.includes('## Product Signals'), 'should render product section');
  assert(markdown.includes('/api/context'), 'should render API paths');
  assert(markdown.includes('## AI Discovery'), 'should render AI section');
  assert(markdown.includes('anthropic_claudebot'), 'should render classified AI agents');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
