#!/usr/bin/env node
import {
  AI_ADOPTION_TARGET_RATIO,
  buildCloudflareUsageSummary,
  classifyPath,
  classifyUserAgent,
  renderCloudflareAdoptionScorecard,
  renderCloudflareUsageReport,
  withCurrentReliability
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

function pathStatusRow(path, status, count) {
  return {
    count,
    dimensions: {
      clientRequestPath: path,
      edgeResponseStatus: status
    }
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
  assertEq(classifyPath('/artifact-summary.json'), 'machine_artifact');
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
        pathRow('/api', 50, 120000),
        pathRow('/llms.txt', 45, 500000),
        pathRow('/robots.txt', 35, 30000),
        pathRow('/agent.json', 25, 120000),
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
        pathUaRow('/robots.txt', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.4; +https://openai.com/gptbot)', 12),
        pathUaRow('/llms.txt', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.4; +https://openai.com/gptbot)', 10),
        pathUaRow('/api/context', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.4; +https://openai.com/gptbot)', 8),
        pathUaRow('/api/evidence', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)', 7),
        pathUaRow('/ai/example/index.ttl', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.4; +https://openai.com/gptbot)', 2)
      ],
      pathStatus: [
        pathStatusRow('/api/evidence', 200, 200),
        pathStatusRow('/api/context', 200, 90),
        pathStatusRow('/api/plan', 404, 5)
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
  assert(!Object.prototype.hasOwnProperty.call(summary, 'summary'), 'JSON report should expose top-level usage fields, not a legacy summary wrapper');
  assertEq(summary.usage_scorecard.product_surface_requests, 535);
  assertEq(summary.usage_scorecard.api_requests, 360);
  assertEq(summary.usage_scorecard.discovery_entrypoint_requests, 155);
  assertEq(summary.usage_scorecard.identified_ai_requests, 60);
  assertEq(summary.usage_scorecard.synthetic_monitor_requests, 70);
  assertEq(summary.usage_scorecard.browser_like_requests, 600);
  assertEq(summary.adoption_scorecard.discovery_entrypoint_requests, 155);
  assertEq(summary.adoption_scorecard.primary_api_requests, 310);
  assertEq(summary.adoption_scorecard.identified_ai_requests, 60);
  assertEq(summary.adoption_scorecard.identified_ai_discovery_requests, 22);
  assertEq(summary.adoption_scorecard.identified_ai_primary_api_requests, 15);
  assertEq(summary.adoption_scorecard.identified_ai_primary_to_discovery_ratio, 0.68);
  assertEq(summary.adoption_scorecard.identified_ai_primary_to_discovery_target_ratio, AI_ADOPTION_TARGET_RATIO);
  assertEq(summary.adoption_scorecard.identified_ai_primary_to_discovery_current_ratio, 0.68);
  assertEq(summary.adoption_scorecard.identified_ai_primary_to_discovery_gap_to_target, 0);
  assertEq(summary.adoption_scorecard.identified_ai_primary_to_discovery_target_status, 'met');
  assertEq(summary.adoption_scorecard.identified_ai_primary_to_discovery_target.status, 'met');
  assertEq(summary.adoption_health.status, 'pass');
  assertEq(summary.adoption_health.primary_api_status_requests, 295);
  assertEq(summary.adoption_health.primary_api_success_requests, 290);
  assertEq(summary.adoption_health.primary_api_4xx_requests, 5);
  assertEq(summary.adoption_health.primary_api_5xx_or_522_requests, 0);
  assertEq(summary.discovery_adoption.observed_ai_discovery_requests, 22);
  assertEq(summary.discovery_adoption.observed_ai_primary_api_requests, 15);
  assertEq(summary.discovery_adoption.observed_ai_article_artifact_requests, 2);
  assert(summary.discovery_adoption.top_ai_discovery_paths.some(item => item.path === '/robots.txt'), 'should report AI discovery paths');
  assert(summary.discovery_adoption.top_ai_primary_api_paths.some(item => item.path === '/api/context'), 'should report AI primary API paths');
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
  assert(markdown.includes('## Usage Scorecard'), 'should render usage scorecard section');
  assert(markdown.includes('## Discovery Adoption'), 'should render discovery adoption section');
  assert(markdown.includes('Primary API requests: 4'), 'should render primary API requests from top-level scorecard');
  assert(markdown.includes('Discovery entrypoint requests: 2'), 'should render discovery entrypoint requests from top-level scorecard');
  assert(markdown.includes('Identified AI requests: 2'), 'should render identified AI requests from top-level scorecard');
  assert(markdown.includes('Identified AI primary/discovery ratio: 0'), 'should render top-level discovery adoption ratio');
  assert(markdown.includes('Report-only target ratio: 0.2'), 'should render report-only adoption target');
  assert(markdown.includes('Target status: no_ai_discovery'), 'should render no discovery target status without failing');
  assert(markdown.includes('/api/context'), 'should render API paths');
  assert(markdown.includes('## AI Discovery'), 'should render AI section');
  assert(markdown.includes('anthropic_claudebot'), 'should render classified AI agents');
});

test('buildCloudflareUsageSummary marks bot route 5xx and primary API all-failed as reliability failures', () => {
  const summary = buildCloudflareUsageSummary({
    zone: {
      totals: [{ count: 30, sum: { edgeResponseBytes: 2048 } }],
      topPaths: [pathRow('/api/context', 10), pathRow('/robots.txt', 10)],
      topUAs: [
        uaRow('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 10)
      ],
      pathUa: [
        pathUaRow('/robots.txt', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 4, 522),
        pathUaRow('/api/context', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 3, 500)
      ],
      pathStatus: [
        pathStatusRow('/api/context', 500, 10),
        pathStatusRow('/api/evidence', 522, 5)
      ]
    },
    window: { since: '2026-05-30T00:00:00.000Z', until: '2026-05-31T00:00:00.000Z' }
  }, { generatedAt: '2026-05-31T00:00:00.000Z' });

  assertEq(summary.adoption_health.ok, false);
  assert(summary.adoption_health.failure_reasons.includes('bot_discovery_or_primary_route_5xx'), 'bot route failure should be reported');
  assert(summary.adoption_health.failure_reasons.includes('primary_api_all_failed'), 'primary API all-failed should be reported');
  assertEq(summary.adoption_health.bot_route_5xx_or_522_requests, 7);
  assertEq(summary.adoption_health.ai_discovery_5xx_or_522_requests, 4);
  assert(summary.adoption_health.bot_route_5xx_or_522_paths.some(item => item.path === '/robots.txt' && item.status === '522'), 'should list failing bot route path');
});

test('buildCloudflareUsageSummary reports below-target AI adoption without failing health', () => {
  const summary = buildCloudflareUsageSummary({
    zone: {
      totals: [{ count: 100, sum: { edgeResponseBytes: 2048 } }],
      topPaths: [pathRow('/api/context', 5), pathRow('/robots.txt', 20)],
      topUAs: [
        uaRow('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 25)
      ],
      pathUa: [
        pathUaRow('/robots.txt', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 20),
        pathUaRow('/api/context', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 1)
      ],
      pathStatus: [pathStatusRow('/api/context', 200, 5)]
    },
    window: { since: '2026-05-30T00:00:00.000Z', until: '2026-05-31T00:00:00.000Z' }
  }, { generatedAt: '2026-05-31T00:00:00.000Z' });

  assertEq(summary.adoption_health.status, 'pass');
  assertEq(summary.adoption_scorecard.identified_ai_primary_to_discovery_ratio, 0.05);
  assertEq(summary.adoption_scorecard.identified_ai_primary_to_discovery_gap_to_target, 0.15);
  assertEq(summary.adoption_scorecard.identified_ai_primary_to_discovery_target_status, 'below_target');
});

test('buildCloudflareUsageSummary prefers targeted route rows for low-frequency reliability signals', () => {
  const summary = buildCloudflareUsageSummary({
    zone: {
      totals: [{ count: 2000, sum: { edgeResponseBytes: 4096 } }],
      topPaths: [pathRow('/api/context', 900), pathRow('/robots.txt', 1)],
      topUAs: [
        uaRow('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 1)
      ],
      pathUa: [],
      pathStatus: [],
      targetedPathUa: [
        pathUaRow('/robots.txt', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 1, 522),
        pathUaRow('/api/context', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 1, 200)
      ],
      targetedPathStatus: [
        pathStatusRow('/api/context', 200, 900)
      ]
    },
    window: { since: '2026-05-30T00:00:00.000Z', until: '2026-05-31T00:00:00.000Z' }
  }, { generatedAt: '2026-05-31T00:00:00.000Z' });

  assertEq(summary.adoption_health.ok, false);
  assertEq(summary.adoption_health.bot_route_5xx_or_522_requests, 1);
  assertEq(summary.adoption_health.primary_api_success_requests, 900);
  assertEq(summary.discovery_adoption.observed_ai_primary_api_requests, 1);
  assert(summary.ai_path_evidence.some(item => item.path === '/robots.txt' && item.status === 522), 'AI path evidence should use targeted route rows');
});

test('withCurrentReliability separates current health from historical incidents', () => {
  const longWindow = buildCloudflareUsageSummary({
    zone: {
      totals: [{ count: 2000, sum: { edgeResponseBytes: 4096 } }],
      topPaths: [pathRow('/api/context', 900), pathRow('/robots.txt', 12)],
      topUAs: [
        uaRow('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 12)
      ],
      targetedPathUa: [
        pathUaRow('/robots.txt', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 4, 522),
        pathUaRow('/robots.txt', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 8, 200)
      ],
      targetedPathStatus: [
        pathStatusRow('/api/context', 200, 900)
      ]
    },
    window: { since: '2026-05-30T00:00:00.000Z', until: '2026-05-31T00:00:00.000Z', adaptive_lookback_minutes: 1430 }
  }, { generatedAt: '2026-05-31T00:00:00.000Z' });
  const currentWindow = buildCloudflareUsageSummary({
    zone: {
      totals: [{ count: 200, sum: { edgeResponseBytes: 1024 } }],
      topPaths: [pathRow('/api/context', 100), pathRow('/robots.txt', 2)],
      topUAs: [
        uaRow('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 2)
      ],
      targetedPathUa: [
        pathUaRow('/robots.txt', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 2, 200)
      ],
      targetedPathStatus: [
        pathStatusRow('/api/context', 200, 100)
      ]
    },
    window: { since: '2026-05-30T22:00:00.000Z', until: '2026-05-31T00:00:00.000Z', adaptive_lookback_minutes: 120 }
  }, { generatedAt: '2026-05-31T00:00:00.000Z' });

  const combined = withCurrentReliability(longWindow, currentWindow);
  assertEq(combined.adoption_health.status, 'fail', 'long-window health should preserve historical failure evidence');
  assertEq(combined.current_health.status, 'pass', 'current health should reflect recent reliability');
  assertEq(combined.current_health.lookback_minutes, 120);
  assertEq(combined.historical_incidents.status, 'observed');
  assertEq(combined.historical_incidents.bot_route_5xx_or_522_requests, 4);
  assert(combined.historical_incidents.bot_route_5xx_or_522_paths.some(item => item.path === '/robots.txt'), 'historical paths should remain visible');
});

test('renderCloudflareAdoptionScorecard emits concise reliability and adoption metrics', () => {
  const report = buildCloudflareUsageSummary({
    zone: {
      totals: [{ count: 10, sum: { edgeResponseBytes: 1024 } }],
      topPaths: [pathRow('/api/context', 4), pathRow('/agent.json', 2)],
      topUAs: [uaRow('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)', 2)],
      pathStatus: [pathStatusRow('/api/context', 200, 4)]
    },
    window: { since: '2026-05-30T00:00:00.000Z', until: '2026-05-31T00:00:00.000Z' }
  }, { generatedAt: '2026-05-31T00:00:00.000Z' });
  const markdown = renderCloudflareAdoptionScorecard(report);

  assert(markdown.includes('AnchorFact AI Adoption Scorecard - PASS'), 'scorecard should show pass');
  assert(markdown.includes('Discovery entrypoint requests: 2'), 'scorecard should include discovery entrypoints');
  assert(markdown.includes('Primary API requests: 4'), 'scorecard should include primary API requests');
  assert(markdown.includes('Identified AI requests: 2'), 'scorecard should include AI requests');
  assert(markdown.includes('Report-only target ratio: 0.2'), 'scorecard should include target ratio');
  assert(markdown.includes('Gap to target: 0.2'), 'scorecard should include target gap');
  assert(markdown.includes('Target status: no_ai_discovery'), 'scorecard should show target status without changing pass status');
  assert(markdown.includes('Bot route 5xx/522 requests: 0'), 'scorecard should include bot route failures');
  assert(markdown.includes('Primary API success requests: 4'), 'scorecard should include primary API success count');
  assert(markdown.includes('anthropic_claudebot'), 'scorecard should include top AI agents');
  assert(markdown.includes('/api/context'), 'scorecard should include top API paths');
});

test('renderCloudflareAdoptionScorecard uses current health while preserving historical incidents', () => {
  const longWindow = buildCloudflareUsageSummary({
    zone: {
      totals: [{ count: 100, sum: { edgeResponseBytes: 1024 } }],
      topPaths: [pathRow('/api/context', 40), pathRow('/robots.txt', 4)],
      topUAs: [uaRow('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 4)],
      targetedPathUa: [pathUaRow('/robots.txt', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 4, 522)],
      targetedPathStatus: [pathStatusRow('/api/context', 200, 40)]
    },
    window: { since: '2026-05-30T00:00:00.000Z', until: '2026-05-31T00:00:00.000Z', adaptive_lookback_minutes: 1430 }
  }, { generatedAt: '2026-05-31T00:00:00.000Z' });
  const currentWindow = buildCloudflareUsageSummary({
    zone: {
      totals: [{ count: 10, sum: { edgeResponseBytes: 512 } }],
      topPaths: [pathRow('/api/context', 4), pathRow('/robots.txt', 2)],
      topUAs: [uaRow('Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 2)],
      targetedPathUa: [pathUaRow('/robots.txt', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 2, 200)],
      targetedPathStatus: [pathStatusRow('/api/context', 200, 4)]
    },
    window: { since: '2026-05-30T22:00:00.000Z', until: '2026-05-31T00:00:00.000Z', adaptive_lookback_minutes: 120 }
  }, { generatedAt: '2026-05-31T00:00:00.000Z' });
  const markdown = renderCloudflareAdoptionScorecard(withCurrentReliability(longWindow, currentWindow));

  assert(markdown.includes('AnchorFact AI Adoption Scorecard - PASS'), 'scorecard heading should use current health');
  assert(markdown.includes('Current status: pass'), 'scorecard should show current reliability');
  assert(markdown.includes('Long-window status: fail'), 'scorecard should preserve historical long-window reliability');
  assert(markdown.includes('Historical bot route 5xx/522 requests: 4'), 'scorecard should summarize historical incidents');
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
