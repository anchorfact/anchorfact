#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { pathToFileURL } from 'url';

const CLOUDFLARE_API_BASE = 'https://api.cloudflare.com/client/v4';
const GRAPHQL_ENDPOINT = `${CLOUDFLARE_API_BASE}/graphql`;
const DEFAULT_ZONE_NAME = 'anchorfact.org';
const DEFAULT_LOOKBACK_MINUTES = 23 * 60 + 50;
const DEFAULT_CURRENT_RELIABILITY_MINUTES = 120;
const DEFAULT_DAILY_DAYS = 7;
const MAX_ADAPTIVE_LOOKBACK_MINUTES = 23 * 60 + 50;
export const AI_ADOPTION_TARGET_RATIO = 0.2;

const MACHINE_ARTIFACT_PATHS = new Set([
  '/agent.json',
  '/.well-known/anchorfact.json',
  '/openapi.json',
  '/artifact-summary.json',
  '/manifest.json',
  '/llms.txt',
  '/claims.json',
  '/topics.json',
  '/capabilities.json',
  '/content-health.json',
  '/coverage.json',
  '/examples.json',
  '/graph.json',
  '/evals.json',
  '/mcp.json',
  '/search-index.json',
  '/sources.json',
  '/provenance.json',
  '/provenance.sig'
]);

const DISCOVERY_ENTRYPOINT_PATHS = new Set([
  '/robots.txt',
  '/llms.txt',
  '/api',
  '/agent.json',
  '/.well-known/anchorfact.json',
  '/openapi.json',
  '/artifact-summary.json',
  '/mcp.json'
]);

const PRIMARY_API_PATHS = new Set([
  '/api/context',
  '/api/evidence',
  '/api/plan',
  '/api/cite',
  '/api/resolve',
  '/api/resolve-batch',
  '/api/search',
  '/api/article',
  '/api/claim',
  '/api/source'
]);

const AI_USER_AGENT_RULES = [
  ['openai_gptbot', /GPTBot/i],
  ['openai_chatgpt_user', /ChatGPT-User/i],
  ['openai_searchbot', /OAI-SearchBot/i],
  ['anthropic_claudebot', /ClaudeBot/i],
  ['perplexity_bot', /PerplexityBot/i],
  ['google_vertex_bot', /Google-CloudVertexBot/i]
];

const SEARCH_BOT_RULES = [
  ['googlebot', /Googlebot/i],
  ['googleother', /GoogleOther/i],
  ['applebot', /Applebot/i],
  ['bingbot', /bingbot/i],
  ['baiduspider', /Baiduspider/i],
  ['yandexbot', /YandexBot/i]
];

const SYNTHETIC_MONITOR_RULES = [
  ['anchorfact_monitor', /codex-anchorfact-monitor/i],
  ['anchorfact_cache_check', /Codex AnchorFact Cache/i]
];

const SCANNER_RULES = [
  ['wordpress_probe', /wp-admin|xmlrpc|wordpress/i],
  ['exposure_scan', /\.env|Cortex-Xpanse|visionheight|researchscan|Palo Alto Networks/i]
];

function increment(map, key, amount = 1) {
  const normalized = key || 'unknown';
  map[normalized] = (map[normalized] || 0) + amount;
}

function topEntries(map, limit = 20) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

function ratio(part, total, digits = 4) {
  const numerator = Number(part || 0);
  const denominator = Number(total || 0);
  if (!denominator) return 0;
  return Number((numerator / denominator).toFixed(digits));
}

function adoptionTargetScore(currentRatio, discoveryRequests, targetRatio = AI_ADOPTION_TARGET_RATIO) {
  const current = Number(currentRatio || 0);
  const target = Number(targetRatio || 0);
  return {
    target_ratio: target,
    current_ratio: current,
    gap_to_target: Number(Math.max(0, target - current).toFixed(4)),
    status: Number(discoveryRequests || 0) === 0
      ? 'no_ai_discovery'
      : current >= target
        ? 'met'
        : 'below_target'
  };
}

function sumRows(rows, predicate) {
  return rows.reduce((sum, row) => sum + (predicate(row) ? Number(row.count || 0) : 0), 0);
}

function topObservedPaths(rows, predicate, limit = 10) {
  const counts = {};
  for (const row of rows) {
    if (!predicate(row)) continue;
    increment(counts, row.dimensions?.clientRequestPath || 'unknown', Number(row.count || 0));
  }
  return topEntries(counts, limit).map(item => ({
    path: item.name,
    requests: item.count
  }));
}

function topObservedPathStatuses(rows, predicate, limit = 10) {
  const counts = {};
  for (const row of rows) {
    if (!predicate(row)) continue;
    const path = row.dimensions?.clientRequestPath || 'unknown';
    const status = row.dimensions?.edgeResponseStatus || 'unknown';
    increment(counts, `${path} ${status}`, Number(row.count || 0));
  }
  return topEntries(counts, limit).map(item => {
    const separator = item.name.lastIndexOf(' ');
    return {
      path: item.name.slice(0, separator),
      status: item.name.slice(separator + 1),
      requests: item.count
    };
  });
}

function isSuccessStatus(status) {
  const value = Number(status);
  return value >= 200 && value < 400;
}

function isClientErrorStatus(status) {
  const value = Number(status);
  return value >= 400 && value < 500;
}

function isServerErrorStatus(status) {
  const value = Number(status);
  return value >= 500 || value === 522;
}

function bytesToHuman(bytes) {
  const value = Number(bytes || 0);
  if (value >= 1024 * 1024 * 1024) return `${(value / 1024 / 1024 / 1024).toFixed(2)} GB`;
  if (value >= 1024 * 1024) return `${(value / 1024 / 1024).toFixed(2)} MB`;
  if (value >= 1024) return `${(value / 1024).toFixed(2)} KB`;
  return `${value} B`;
}

export function classifyUserAgent(userAgent = '') {
  const ua = String(userAgent || '');
  for (const [label, pattern] of SYNTHETIC_MONITOR_RULES) {
    if (pattern.test(ua)) return { category: 'synthetic_monitor', label };
  }
  for (const [label, pattern] of AI_USER_AGENT_RULES) {
    if (pattern.test(ua)) return { category: 'ai_bot', label };
  }
  for (const [label, pattern] of SEARCH_BOT_RULES) {
    if (pattern.test(ua)) return { category: 'search_bot', label };
  }
  for (const [label, pattern] of SCANNER_RULES) {
    if (pattern.test(ua)) return { category: 'scanner', label };
  }
  if (/bot|crawler|spider|scan/i.test(ua)) return { category: 'crawler', label: 'generic_crawler' };
  if (/Mozilla\/5\.0/i.test(ua)) return { category: 'browser', label: 'browser_like' };
  if (!ua) return { category: 'unknown', label: 'missing_user_agent' };
  return { category: 'other', label: 'other' };
}

export function classifyPath(path = '') {
  const normalized = String(path || '/');
  if (/\/(?:wp-admin|wp-login|xmlrpc\.php)(?:\/|$)/i.test(normalized)) return 'security_probe';
  if (/\/(?:\.env|\.git|admin|phpmyadmin|config)(?:\/|$|[.?])/i.test(normalized)) return 'security_probe';
  if (normalized.startsWith('/api')) return 'api';
  if (MACHINE_ARTIFACT_PATHS.has(normalized)) return 'machine_artifact';
  if (/\/index\.(?:json|txt|ttl)$/i.test(normalized)) return 'article_artifact';
  if (normalized === '/robots.txt' || normalized === '/sitemap.xml') return 'crawler_control';
  if (normalized === '/' || normalized.endsWith('/') || normalized.endsWith('.html')) return 'human_page';
  return 'other';
}

function isDiscoveryEntrypoint(path = '') {
  return DISCOVERY_ENTRYPOINT_PATHS.has(String(path || '/'));
}

function isPrimaryApiPath(path = '') {
  return PRIMARY_API_PATHS.has(String(path || '/'));
}

function isBotLikeUserAgent(userAgent = '') {
  const category = classifyUserAgent(userAgent).category;
  return category === 'ai_bot' || category === 'search_bot' || category === 'crawler';
}

function decorateHealthWindow(health, window = {}) {
  return {
    ...health,
    lookback_minutes: Number(window.adaptive_lookback_minutes || window.lookback_minutes || 0) || null,
    window: {
      since: window.since || null,
      until: window.until || null
    }
  };
}

function historicalIncidentsFrom(longHealth, currentHealth) {
  const historicalBotRouteErrors = Math.max(
    0,
    Number(longHealth.bot_route_5xx_or_522_requests || 0) - Number(currentHealth.bot_route_5xx_or_522_requests || 0)
  );
  const historicalAiDiscoveryErrors = Math.max(
    0,
    Number(longHealth.ai_discovery_5xx_or_522_requests || 0) - Number(currentHealth.ai_discovery_5xx_or_522_requests || 0)
  );
  return {
    status: historicalBotRouteErrors > 0 || historicalAiDiscoveryErrors > 0 ? 'observed' : 'none',
    bot_route_5xx_or_522_requests: historicalBotRouteErrors,
    ai_discovery_5xx_or_522_requests: historicalAiDiscoveryErrors,
    bot_route_5xx_or_522_paths: historicalBotRouteErrors > 0
      ? longHealth.bot_route_5xx_or_522_paths
      : [],
    note: historicalBotRouteErrors > 0 || historicalAiDiscoveryErrors > 0
      ? 'Long-window failures remain visible for analysis, but current_health is the reliability signal used for alerts.'
      : 'No historical bot-route failures remain after subtracting the current reliability window.'
  };
}

export function withCurrentReliability(report, currentReport) {
  const longHealth = decorateHealthWindow(report.adoption_health, report.window);
  const currentHealth = decorateHealthWindow(
    currentReport?.adoption_health || report.adoption_health,
    currentReport?.window || report.window
  );
  return {
    ...report,
    window: {
      ...report.window,
      current_reliability_since: currentHealth.window.since,
      current_reliability_until: currentHealth.window.until,
      current_reliability_lookback_minutes: currentHealth.lookback_minutes
    },
    adoption_health: longHealth,
    current_health: currentHealth,
    historical_incidents: historicalIncidentsFrom(longHealth, currentHealth)
  };
}

export function buildCloudflareUsageSummary(data, options = {}) {
  const zone = data.zone || {};
  const topPaths = zone.topPaths || [];
  const topUAs = zone.topUAs || [];
  const pathUa = zone.pathUa || [];
  const pathStatus = zone.pathStatus || [];
  const targetedPathUa = zone.targetedPathUa || pathUa;
  const targetedPathStatus = zone.targetedPathStatus || pathStatus;
  const statusCodes = zone.statusCodes || [];
  const methods = zone.methods || [];
  const countries = zone.countries || [];
  const daily = zone.daily || [];
  const totalRequests = Number(zone.totals?.[0]?.count || 0);
  const totalBytes = Number(zone.totals?.[0]?.sum?.edgeResponseBytes || 0);
  const pathCategories = {};
  const userAgentCategories = {};
  const aiAgents = {};
  const searchAgents = {};
  const scannerAgents = {};

  for (const row of topPaths) {
    increment(pathCategories, classifyPath(row.dimensions?.clientRequestPath), row.count);
  }

  for (const row of topUAs) {
    const classified = classifyUserAgent(row.dimensions?.userAgent);
    increment(userAgentCategories, classified.category, row.count);
    if (classified.category === 'ai_bot') increment(aiAgents, classified.label, row.count);
    if (classified.category === 'search_bot') increment(searchAgents, classified.label, row.count);
    if (classified.category === 'scanner') increment(scannerAgents, classified.label, row.count);
  }

  const topApiPaths = topPaths
    .filter(row => classifyPath(row.dimensions?.clientRequestPath) === 'api')
    .slice(0, 12)
    .map(row => ({
      path: row.dimensions.clientRequestPath,
      requests: row.count,
      bytes: row.sum?.edgeResponseBytes || 0
    }));

  const topMachineArtifacts = topPaths
    .filter(row => classifyPath(row.dimensions?.clientRequestPath) === 'machine_artifact')
    .slice(0, 12)
    .map(row => ({
      path: row.dimensions.clientRequestPath,
      requests: row.count,
      bytes: row.sum?.edgeResponseBytes || 0
    }));

  const securityProbePaths = topPaths
    .filter(row => classifyPath(row.dimensions?.clientRequestPath) === 'security_probe')
    .slice(0, 10)
    .map(row => ({
      path: row.dimensions.clientRequestPath,
      requests: row.count,
      bytes: row.sum?.edgeResponseBytes || 0
    }));

  const aiPathEvidence = targetedPathUa
    .filter(row => classifyUserAgent(row.dimensions?.userAgent).category === 'ai_bot')
    .slice(0, 20)
    .map(row => ({
      path: row.dimensions.clientRequestPath,
      method: row.dimensions.clientRequestHTTPMethodName,
      status: row.dimensions.edgeResponseStatus,
      user_agent_label: classifyUserAgent(row.dimensions.userAgent).label,
      requests: row.count,
      bytes: row.sum?.edgeResponseBytes || 0
    }));

  const apiRequests = pathCategories.api || 0;
  const machineArtifactRequests = pathCategories.machine_artifact || 0;
  const articleArtifactRequests = pathCategories.article_artifact || 0;
  const crawlerControlRequests = pathCategories.crawler_control || 0;
  const aiRequests = userAgentCategories.ai_bot || 0;
  const syntheticRequests = userAgentCategories.synthetic_monitor || 0;
  const browserLikeRequests = userAgentCategories.browser || 0;
  const scannerRequests = Math.max(userAgentCategories.scanner || 0, pathCategories.security_probe || 0);
  const discoveryEntrypointRequests = sumRows(topPaths, row => isDiscoveryEntrypoint(row.dimensions?.clientRequestPath));
  const primaryApiRequests = sumRows(topPaths, row => isPrimaryApiPath(row.dimensions?.clientRequestPath));
  const productSurfaceRequests = apiRequests + machineArtifactRequests + articleArtifactRequests + crawlerControlRequests;
  const aiPathRows = targetedPathUa.filter(row => classifyUserAgent(row.dimensions?.userAgent).category === 'ai_bot');
  const observedAiDiscoveryRequests = sumRows(aiPathRows, row => isDiscoveryEntrypoint(row.dimensions?.clientRequestPath));
  const observedAiPrimaryApiRequests = sumRows(aiPathRows, row => isPrimaryApiPath(row.dimensions?.clientRequestPath));
  const observedAiPrimaryToDiscoveryRatio = ratio(observedAiPrimaryApiRequests, observedAiDiscoveryRequests, 2);
  const observedAiPrimaryToDiscoveryTarget = adoptionTargetScore(
    observedAiPrimaryToDiscoveryRatio,
    observedAiDiscoveryRequests
  );
  const observedAiArticleArtifactRequests = sumRows(aiPathRows, row => classifyPath(row.dimensions?.clientRequestPath) === 'article_artifact');
  const primaryApiStatusRows = targetedPathStatus.filter(row => isPrimaryApiPath(row.dimensions?.clientRequestPath));
  const primaryApiStatusRequests = sumRows(primaryApiStatusRows, () => true);
  const primaryApiSuccessRequests = sumRows(primaryApiStatusRows, row => isSuccessStatus(row.dimensions?.edgeResponseStatus));
  const primaryApiClientErrorRequests = sumRows(primaryApiStatusRows, row => isClientErrorStatus(row.dimensions?.edgeResponseStatus));
  const primaryApiServerErrorRequests = sumRows(primaryApiStatusRows, row => isServerErrorStatus(row.dimensions?.edgeResponseStatus));
  const primaryApiAllFailed = primaryApiStatusRequests > 0 && primaryApiSuccessRequests === 0;
  const botRouteErrorRows = targetedPathUa.filter(row => (
    isBotLikeUserAgent(row.dimensions?.userAgent)
    && (isDiscoveryEntrypoint(row.dimensions?.clientRequestPath) || isPrimaryApiPath(row.dimensions?.clientRequestPath))
    && isServerErrorStatus(row.dimensions?.edgeResponseStatus)
  ));
  const aiDiscoveryErrorRows = aiPathRows.filter(row => (
    isDiscoveryEntrypoint(row.dimensions?.clientRequestPath)
    && isServerErrorStatus(row.dimensions?.edgeResponseStatus)
  ));
  const botRouteServerErrorRequests = sumRows(botRouteErrorRows, () => true);
  const aiDiscoveryServerErrorRequests = sumRows(aiDiscoveryErrorRows, () => true);
  const adoptionHealthOk = botRouteServerErrorRequests === 0 && !primaryApiAllFailed;
  const adoptionHealth = decorateHealthWindow({
    ok: adoptionHealthOk,
    status: adoptionHealthOk ? 'pass' : 'fail',
    failure_reasons: [
      botRouteServerErrorRequests > 0 ? 'bot_discovery_or_primary_route_5xx' : null,
      primaryApiAllFailed ? 'primary_api_all_failed' : null
    ].filter(Boolean),
    bot_route_5xx_or_522_requests: botRouteServerErrorRequests,
    ai_discovery_5xx_or_522_requests: aiDiscoveryServerErrorRequests,
    bot_route_5xx_or_522_paths: topObservedPathStatuses(botRouteErrorRows, () => true, 10),
    primary_api_status_requests: primaryApiStatusRequests,
    primary_api_success_requests: primaryApiSuccessRequests,
    primary_api_4xx_requests: primaryApiClientErrorRequests,
    primary_api_5xx_or_522_requests: primaryApiServerErrorRequests,
    primary_api_all_failed: primaryApiAllFailed,
    top_primary_api_statuses: topObservedPathStatuses(primaryApiStatusRows, () => true, 10),
    scanner_or_probe_share: ratio(scannerRequests, totalRequests),
    decision_signal: adoptionHealthOk
      ? 'Measure AI discovery-to-primary adoption before changing product surface.'
      : 'Fix production route reliability before interpreting adoption volume.'
  }, data.window || {});

  const recommendations = [];
  if (apiRequests > 0) {
    recommendations.push('Keep API and MCP answer paths as the primary product surface; /api/evidence and /api/context are already real traffic magnets.');
  }
  if (machineArtifactRequests > 0) {
    recommendations.push('Keep signed machine artifacts observable and integrity-checked; defer durable caching until versioned artifact URLs or deploy-time purging exist.');
  }
  if (aiRequests > 0 && aiRequests < apiRequests) {
    recommendations.push('Treat AI crawler discovery as present but early; improve agent-facing discovery before broad content expansion.');
  }
  if (observedAiDiscoveryRequests > 0) {
    recommendations.push('Track discovery-to-primary-API adoption over 24-48 hour windows before changing the agent entrypoint contract again.');
  }
  if (scannerRequests > 0) {
    recommendations.push('Keep WAF/security hygiene on the roadmap; WordPress/env probes are noise, not product demand.');
  }
  if (syntheticRequests > 0) {
    recommendations.push('Separate synthetic monitor traffic from product usage in future scorecards.');
  }

  return {
    generated: options.generatedAt || new Date().toISOString(),
    window: data.window || {},
    source: {
      provider: 'cloudflare_graphql_analytics',
      zone_name: data.zoneName || DEFAULT_ZONE_NAME,
      zone_id: data.zoneId || null
    },
    totals: {
      requests: totalRequests,
      bytes: totalBytes,
      bytes_human: bytesToHuman(totalBytes)
    },
    usage_scorecard: {
      product_surface_requests: productSurfaceRequests,
      product_surface_share: ratio(productSurfaceRequests, totalRequests),
      api_requests: apiRequests,
      api_share: ratio(apiRequests, totalRequests),
      primary_api_requests: primaryApiRequests,
      discovery_entrypoint_requests: discoveryEntrypointRequests,
      machine_artifact_requests: machineArtifactRequests,
      article_artifact_requests: articleArtifactRequests,
      crawler_control_requests: crawlerControlRequests,
      identified_ai_requests: aiRequests,
      identified_ai_share: ratio(aiRequests, totalRequests),
      synthetic_monitor_requests: syntheticRequests,
      synthetic_monitor_share: ratio(syntheticRequests, totalRequests),
      browser_like_requests: browserLikeRequests,
      browser_like_share: ratio(browserLikeRequests, totalRequests),
      scanner_or_probe_requests: scannerRequests
    },
    adoption_scorecard: {
      discovery_entrypoint_requests: discoveryEntrypointRequests,
      primary_api_requests: primaryApiRequests,
      identified_ai_requests: aiRequests,
      identified_ai_discovery_requests: observedAiDiscoveryRequests,
      identified_ai_primary_api_requests: observedAiPrimaryApiRequests,
      identified_ai_primary_to_discovery_ratio: observedAiPrimaryToDiscoveryRatio,
      identified_ai_primary_to_discovery_target_ratio: observedAiPrimaryToDiscoveryTarget.target_ratio,
      identified_ai_primary_to_discovery_current_ratio: observedAiPrimaryToDiscoveryTarget.current_ratio,
      identified_ai_primary_to_discovery_gap_to_target: observedAiPrimaryToDiscoveryTarget.gap_to_target,
      identified_ai_primary_to_discovery_target_status: observedAiPrimaryToDiscoveryTarget.status,
      identified_ai_primary_to_discovery_target: observedAiPrimaryToDiscoveryTarget,
      bot_route_5xx_or_522_requests: botRouteServerErrorRequests,
      scanner_or_probe_requests: scannerRequests,
      scanner_or_probe_share: ratio(scannerRequests, totalRequests)
    },
    adoption_health: adoptionHealth,
    current_health: adoptionHealth,
    historical_incidents: historicalIncidentsFrom(adoptionHealth, adoptionHealth),
    discovery_adoption: {
      observed_all_discovery_entrypoint_requests: discoveryEntrypointRequests,
      observed_all_primary_api_requests: primaryApiRequests,
      observed_ai_discovery_requests: observedAiDiscoveryRequests,
      observed_ai_primary_api_requests: observedAiPrimaryApiRequests,
      observed_ai_article_artifact_requests: observedAiArticleArtifactRequests,
      observed_ai_primary_to_discovery_ratio: observedAiPrimaryToDiscoveryRatio,
      observed_ai_primary_to_discovery_target: observedAiPrimaryToDiscoveryTarget,
      top_ai_discovery_paths: topObservedPaths(aiPathRows, row => isDiscoveryEntrypoint(row.dimensions?.clientRequestPath), 8),
      top_ai_primary_api_paths: topObservedPaths(aiPathRows, row => isPrimaryApiPath(row.dimensions?.clientRequestPath), 8),
      top_ai_article_artifact_paths: topObservedPaths(aiPathRows, row => classifyPath(row.dimensions?.clientRequestPath) === 'article_artifact', 8)
    },
    observed_top_path_categories: topEntries(pathCategories, 20),
    observed_top_user_agent_categories: topEntries(userAgentCategories, 20),
    ai_agents: topEntries(aiAgents, 20),
    search_agents: topEntries(searchAgents, 20),
    scanner_agents: topEntries(scannerAgents, 20),
    top_api_paths: topApiPaths,
    top_machine_artifacts: topMachineArtifacts,
    security_probe_paths: securityProbePaths,
    ai_path_evidence: aiPathEvidence,
    status_codes: statusCodes.map(row => ({ status: row.dimensions?.edgeResponseStatus, requests: row.count })),
    methods: methods.map(row => ({ method: row.dimensions?.clientRequestHTTPMethodName, requests: row.count })),
    countries: countries.map(row => ({ country: row.dimensions?.clientCountryName, requests: row.count })),
    daily: daily.map(row => ({
      date: row.dimensions?.date,
      requests: row.sum?.requests || 0,
      bytes: row.sum?.bytes || 0,
      cached_requests: row.sum?.cachedRequests || 0,
      cached_bytes: row.sum?.cachedBytes || 0,
      page_views: row.sum?.pageViews || 0,
      threats: row.sum?.threats || 0,
      uniques: row.uniq?.uniques || 0
    })),
    recommendations
  };
}

export function renderCloudflareUsageReport(report) {
  const lines = [];
  const currentHealth = report.current_health || report.adoption_health;
  const historicalIncidents = report.historical_incidents || historicalIncidentsFrom(report.adoption_health, currentHealth);
  lines.push(`# AnchorFact Cloudflare Usage Report`);
  lines.push('');
  lines.push(`Generated: ${report.generated}`);
  lines.push(`Window: ${report.window.since || 'unknown'} to ${report.window.until || 'unknown'}`);
  lines.push(`Zone: ${report.source.zone_name}`);
  lines.push('');
  lines.push(`## Summary`);
  lines.push('');
  lines.push(`- Requests: ${report.totals.requests}`);
  lines.push(`- Transfer: ${report.totals.bytes_human}`);
  lines.push(`- Top path categories: ${report.observed_top_path_categories.map(item => `${item.name}=${item.count}`).join(', ') || 'none'}`);
  lines.push(`- Top UA categories: ${report.observed_top_user_agent_categories.map(item => `${item.name}=${item.count}`).join(', ') || 'none'}`);
  lines.push('');
  lines.push(`## Usage Scorecard`);
  lines.push('');
  lines.push(`- Product-surface requests: ${report.usage_scorecard.product_surface_requests} (${(report.usage_scorecard.product_surface_share * 100).toFixed(1)}%)`);
  lines.push(`- API requests: ${report.usage_scorecard.api_requests}`);
  lines.push(`- Primary API requests: ${report.usage_scorecard.primary_api_requests}`);
  lines.push(`- Discovery entrypoint requests: ${report.usage_scorecard.discovery_entrypoint_requests}`);
  lines.push(`- Identified AI requests: ${report.usage_scorecard.identified_ai_requests} (${(report.usage_scorecard.identified_ai_share * 100).toFixed(1)}%)`);
  lines.push(`- Synthetic monitor requests: ${report.usage_scorecard.synthetic_monitor_requests}`);
  lines.push(`- Browser-like/manual requests: ${report.usage_scorecard.browser_like_requests}`);
  lines.push(`- Scanner/probe requests: ${report.usage_scorecard.scanner_or_probe_requests}`);
  lines.push('');
  lines.push(`## Reliability`);
  lines.push('');
  lines.push(`- Current status: ${currentHealth.status}`);
  lines.push(`- Current window: ${currentHealth.window?.since || 'unknown'} to ${currentHealth.window?.until || 'unknown'} (${currentHealth.lookback_minutes || 'unknown'} minutes)`);
  lines.push(`- Long-window status: ${report.adoption_health.status}`);
  lines.push(`- Historical bot route 5xx/522 requests: ${historicalIncidents.bot_route_5xx_or_522_requests}`);
  lines.push(`- Historical AI discovery 5xx/522 requests: ${historicalIncidents.ai_discovery_5xx_or_522_requests}`);
  lines.push('');
  lines.push(`## Product Signals`);
  lines.push('');
  for (const item of report.top_api_paths.slice(0, 8)) {
    lines.push(`- ${item.path}: ${item.requests} requests, ${bytesToHuman(item.bytes)}`);
  }
  if (report.top_api_paths.length === 0) lines.push('- No API paths observed in the top path sample.');
  lines.push('');
  lines.push(`## Machine Artifacts`);
  lines.push('');
  for (const item of report.top_machine_artifacts.slice(0, 8)) {
    lines.push(`- ${item.path}: ${item.requests} requests, ${bytesToHuman(item.bytes)}`);
  }
  if (report.top_machine_artifacts.length === 0) lines.push('- No machine artifacts observed in the top path sample.');
  lines.push('');
  lines.push(`## Discovery Adoption`);
  lines.push('');
  lines.push(`- All discovery entrypoint requests: ${report.discovery_adoption.observed_all_discovery_entrypoint_requests}`);
  lines.push(`- All primary API requests: ${report.discovery_adoption.observed_all_primary_api_requests}`);
  lines.push(`- Identified AI discovery requests: ${report.discovery_adoption.observed_ai_discovery_requests}`);
  lines.push(`- Identified AI primary API requests: ${report.discovery_adoption.observed_ai_primary_api_requests}`);
  lines.push(`- Identified AI article artifact requests: ${report.discovery_adoption.observed_ai_article_artifact_requests}`);
  lines.push(`- Identified AI primary/discovery ratio: ${report.discovery_adoption.observed_ai_primary_to_discovery_ratio}`);
  lines.push(`- Report-only target ratio: ${report.discovery_adoption.observed_ai_primary_to_discovery_target?.target_ratio ?? 'n/a'}`);
  lines.push(`- Gap to target: ${report.discovery_adoption.observed_ai_primary_to_discovery_target?.gap_to_target ?? 'n/a'}`);
  lines.push(`- Target status: ${report.discovery_adoption.observed_ai_primary_to_discovery_target?.status || 'n/a'}`);
  if (report.discovery_adoption.top_ai_discovery_paths.length > 0) {
    lines.push('');
    lines.push('Top identified AI discovery paths:');
    for (const item of report.discovery_adoption.top_ai_discovery_paths) lines.push(`- ${item.path}: ${item.requests}`);
  }
  if (report.discovery_adoption.top_ai_primary_api_paths.length > 0) {
    lines.push('');
    lines.push('Top identified AI primary API paths:');
    for (const item of report.discovery_adoption.top_ai_primary_api_paths) lines.push(`- ${item.path}: ${item.requests}`);
  }
  lines.push('');
  lines.push(`## AI Discovery`);
  lines.push('');
  if (report.ai_agents.length > 0) {
    for (const item of report.ai_agents) lines.push(`- ${item.name}: ${item.count} requests`);
  } else {
    lines.push('- No AI-specific user agents observed in the top user-agent sample.');
  }
  if (report.ai_path_evidence.length > 0) {
    lines.push('');
    lines.push('Observed AI paths:');
    for (const item of report.ai_path_evidence.slice(0, 8)) {
      lines.push(`- ${item.user_agent_label} ${item.method} ${item.path} -> ${item.status} (${item.requests})`);
    }
  }
  lines.push('');
  lines.push(`## Security Noise`);
  lines.push('');
  for (const item of report.security_probe_paths) {
    lines.push(`- ${item.path}: ${item.requests} requests, ${bytesToHuman(item.bytes)}`);
  }
  if (report.security_probe_paths.length === 0) lines.push('- No obvious security probes observed in the top path sample.');
  lines.push('');
  lines.push(`## Recommendations`);
  lines.push('');
  for (const item of report.recommendations) lines.push(`- ${item}`);
  if (report.recommendations.length === 0) lines.push('- No strong recommendation from this sample.');
  lines.push('');
  return `${lines.join('\n')}\n`;
}

export function renderCloudflareAdoptionScorecard(report) {
  const lines = [];
  const currentHealth = report.current_health || report.adoption_health;
  const historicalIncidents = report.historical_incidents || historicalIncidentsFrom(report.adoption_health, currentHealth);
  lines.push(`# AnchorFact AI Adoption Scorecard - ${currentHealth.ok ? 'PASS' : 'FAIL'}`);
  lines.push('');
  lines.push(`Generated: ${report.generated}`);
  lines.push(`Window: ${report.window.since || 'unknown'} to ${report.window.until || 'unknown'}`);
  lines.push(`Zone: ${report.source.zone_name}`);
  lines.push('');
  lines.push(`## Scorecard`);
  lines.push('');
  lines.push(`- Discovery entrypoint requests: ${report.adoption_scorecard.discovery_entrypoint_requests}`);
  lines.push(`- Primary API requests: ${report.adoption_scorecard.primary_api_requests}`);
  lines.push(`- Identified AI requests: ${report.adoption_scorecard.identified_ai_requests}`);
  lines.push(`- Identified AI discovery requests: ${report.adoption_scorecard.identified_ai_discovery_requests}`);
  lines.push(`- Identified AI primary API requests: ${report.adoption_scorecard.identified_ai_primary_api_requests}`);
  lines.push(`- Identified AI primary/discovery ratio: ${report.adoption_scorecard.identified_ai_primary_to_discovery_ratio}`);
  lines.push(`- Report-only target ratio: ${report.adoption_scorecard.identified_ai_primary_to_discovery_target_ratio}`);
  lines.push(`- Gap to target: ${report.adoption_scorecard.identified_ai_primary_to_discovery_gap_to_target}`);
  lines.push(`- Target status: ${report.adoption_scorecard.identified_ai_primary_to_discovery_target_status}`);
  lines.push(`- Bot route 5xx/522 requests: ${report.adoption_scorecard.bot_route_5xx_or_522_requests}`);
  lines.push(`- Scanner/probe requests: ${report.adoption_scorecard.scanner_or_probe_requests} (${(report.adoption_scorecard.scanner_or_probe_share * 100).toFixed(1)}%)`);
  lines.push('');
  lines.push(`## Reliability`);
  lines.push('');
  lines.push(`- Current status: ${currentHealth.status}`);
  lines.push(`- Current window: ${currentHealth.window?.since || 'unknown'} to ${currentHealth.window?.until || 'unknown'} (${currentHealth.lookback_minutes || 'unknown'} minutes)`);
  lines.push(`- Long-window status: ${report.adoption_health.status}`);
  lines.push(`- Status: ${currentHealth.status}`);
  lines.push(`- Failure reasons: ${currentHealth.failure_reasons.join(', ') || 'none'}`);
  lines.push(`- AI discovery 5xx/522 requests: ${currentHealth.ai_discovery_5xx_or_522_requests}`);
  lines.push(`- Primary API observed status requests: ${currentHealth.primary_api_status_requests}`);
  lines.push(`- Primary API success requests: ${currentHealth.primary_api_success_requests}`);
  lines.push(`- Primary API 4xx requests: ${currentHealth.primary_api_4xx_requests}`);
  lines.push(`- Primary API 5xx/522 requests: ${currentHealth.primary_api_5xx_or_522_requests}`);
  if (currentHealth.bot_route_5xx_or_522_paths.length > 0) {
    lines.push('');
    lines.push('Bot route 5xx/522 paths:');
    for (const item of currentHealth.bot_route_5xx_or_522_paths) {
      lines.push(`- ${item.path} -> ${item.status}: ${item.requests}`);
    }
  }
  if (currentHealth.top_primary_api_statuses.length > 0) {
    lines.push('');
    lines.push('Primary API status sample:');
    for (const item of currentHealth.top_primary_api_statuses) {
      lines.push(`- ${item.path} -> ${item.status}: ${item.requests}`);
    }
  }
  lines.push('');
  lines.push(`## Historical Incidents`);
  lines.push('');
  lines.push(`- Status: ${historicalIncidents.status}`);
  lines.push(`- Historical bot route 5xx/522 requests: ${historicalIncidents.bot_route_5xx_or_522_requests}`);
  lines.push(`- Historical AI discovery 5xx/522 requests: ${historicalIncidents.ai_discovery_5xx_or_522_requests}`);
  if (historicalIncidents.bot_route_5xx_or_522_paths.length > 0) {
    lines.push('');
    lines.push('Long-window bot route 5xx/522 paths:');
    for (const item of historicalIncidents.bot_route_5xx_or_522_paths) {
      lines.push(`- ${item.path} -> ${item.status}: ${item.requests}`);
    }
  }
  lines.push('');
  lines.push(`## Top AI Agents`);
  lines.push('');
  if (report.ai_agents.length > 0) {
    for (const item of report.ai_agents) lines.push(`- ${item.name}: ${item.count} requests`);
  } else {
    lines.push('- No AI-specific user agents observed in the top user-agent sample.');
  }
  lines.push('');
  lines.push(`## Top API Paths`);
  lines.push('');
  for (const item of report.top_api_paths.slice(0, 8)) {
    lines.push(`- ${item.path}: ${item.requests} requests, ${bytesToHuman(item.bytes)}`);
  }
  if (report.top_api_paths.length === 0) lines.push('- No API paths observed in the top path sample.');
  lines.push('');
  lines.push(`## Top Machine Artifacts`);
  lines.push('');
  for (const item of report.top_machine_artifacts.slice(0, 8)) {
    lines.push(`- ${item.path}: ${item.requests} requests, ${bytesToHuman(item.bytes)}`);
  }
  if (report.top_machine_artifacts.length === 0) lines.push('- No machine artifacts observed in the top path sample.');
  lines.push('');
  lines.push(`## Decision Signal`);
  lines.push('');
  lines.push(`- ${currentHealth.decision_signal}`);
  lines.push('');
  return `${lines.join('\n')}\n`;
}

function graphqlUsageQuery() {
  return `query Usage($zoneTag: string, $filter: ZoneHttpRequestsAdaptiveGroupsFilter_InputObject, $targetedRouteFilter: ZoneHttpRequestsAdaptiveGroupsFilter_InputObject, $primaryApiFilter: ZoneHttpRequestsAdaptiveGroupsFilter_InputObject, $dailyFilter: ZoneHttpRequests1dGroupsFilter_InputObject) {
  viewer {
    zones(filter: { zoneTag: $zoneTag }) {
      totals: httpRequestsAdaptiveGroups(limit: 1, filter: $filter) { count sum { edgeResponseBytes } }
      topPaths: httpRequestsAdaptiveGroups(limit: 100, filter: $filter, orderBy: [count_DESC]) { count sum { edgeResponseBytes } dimensions { clientRequestPath } }
      topUAs: httpRequestsAdaptiveGroups(limit: 100, filter: $filter, orderBy: [count_DESC]) { count dimensions { userAgent } }
      pathUa: httpRequestsAdaptiveGroups(limit: 100, filter: $filter, orderBy: [count_DESC]) { count sum { edgeResponseBytes } dimensions { clientRequestPath userAgent edgeResponseStatus clientRequestHTTPMethodName } }
      pathStatus: httpRequestsAdaptiveGroups(limit: 100, filter: $filter, orderBy: [count_DESC]) { count dimensions { clientRequestPath edgeResponseStatus } }
      targetedPathUa: httpRequestsAdaptiveGroups(limit: 1000, filter: $targetedRouteFilter, orderBy: [count_DESC]) { count sum { edgeResponseBytes } dimensions { clientRequestPath userAgent edgeResponseStatus clientRequestHTTPMethodName } }
      targetedPathStatus: httpRequestsAdaptiveGroups(limit: 1000, filter: $primaryApiFilter, orderBy: [count_DESC]) { count dimensions { clientRequestPath edgeResponseStatus } }
      statusCodes: httpRequestsAdaptiveGroups(limit: 20, filter: $filter, orderBy: [count_DESC]) { count dimensions { edgeResponseStatus } }
      methods: httpRequestsAdaptiveGroups(limit: 10, filter: $filter, orderBy: [count_DESC]) { count dimensions { clientRequestHTTPMethodName } }
      countries: httpRequestsAdaptiveGroups(limit: 20, filter: $filter, orderBy: [count_DESC]) { count dimensions { clientCountryName } }
      daily: httpRequests1dGroups(limit: 14, filter: $dailyFilter, orderBy: [date_ASC]) {
        dimensions { date }
        sum { requests bytes cachedRequests cachedBytes pageViews threats }
        uniq { uniques }
      }
    }
  }
}`;
}

async function cloudflareJson(fetchImpl, path, token, init = {}) {
  const response = await fetchImpl(`${CLOUDFLARE_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {})
    }
  });
  const json = await response.json();
  if (!response.ok || json.success === false) {
    const message = json.errors?.map(error => error.message).join('; ') || `Cloudflare request failed with ${response.status}`;
    throw new Error(message);
  }
  return json;
}

async function findZone(fetchImpl, token, zoneName) {
  const json = await cloudflareJson(fetchImpl, `/zones?name=${encodeURIComponent(zoneName)}&per_page=5`, token);
  const zones = json.result || [];
  if (zones.length === 0) throw new Error(`Cloudflare zone not found for ${zoneName}`);
  return zones[0];
}

function buildGraphqlVariables({ zoneId, since, until, dailySince }) {
  return {
    zoneTag: zoneId,
    filter: {
      datetime_geq: since.toISOString(),
      datetime_lt: until.toISOString()
    },
    targetedRouteFilter: {
      datetime_geq: since.toISOString(),
      datetime_lt: until.toISOString(),
      clientRequestPath_in: Array.from(new Set([...DISCOVERY_ENTRYPOINT_PATHS, ...PRIMARY_API_PATHS]))
    },
    primaryApiFilter: {
      datetime_geq: since.toISOString(),
      datetime_lt: until.toISOString(),
      clientRequestPath_in: Array.from(PRIMARY_API_PATHS)
    },
    dailyFilter: {
      date_geq: dailySince.toISOString().slice(0, 10),
      date_leq: until.toISOString().slice(0, 10)
    }
  };
}

async function fetchGraphqlZone(fetchImpl, token, variables, zoneName) {
  const response = await fetchImpl(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: graphqlUsageQuery(), variables })
  });
  const json = await response.json();
  if (!response.ok || json.errors) {
    const message = json.errors?.map(error => error.message).join('; ') || `Cloudflare GraphQL request failed with ${response.status}`;
    throw new Error(message);
  }
  const graphZone = json.data?.viewer?.zones?.[0];
  if (!graphZone) throw new Error(`Cloudflare GraphQL returned no zone data for ${zoneName}`);
  return graphZone;
}

export async function fetchCloudflareUsageReport(options = {}) {
  const token = options.token || process.env.CLOUDFLARE_API_TOKEN || process.env.CF_API_TOKEN;
  if (!token) throw new Error('CLOUDFLARE_API_TOKEN is required');
  const fetchImpl = options.fetchImpl || globalThis.fetch;
  if (!fetchImpl) throw new Error('fetch is required');
  const zoneName = options.zoneName || DEFAULT_ZONE_NAME;
  const zone = options.zoneId ? { id: options.zoneId, name: zoneName } : await findZone(fetchImpl, token, zoneName);
  const lookbackMinutes = Math.min(
    Number(options.lookbackMinutes || DEFAULT_LOOKBACK_MINUTES),
    MAX_ADAPTIVE_LOOKBACK_MINUTES
  );
  const currentReliabilityMinutes = Math.min(
    Math.max(1, Number(options.currentReliabilityMinutes || DEFAULT_CURRENT_RELIABILITY_MINUTES)),
    lookbackMinutes
  );
  const dailyDays = Math.max(1, Number(options.dailyDays || DEFAULT_DAILY_DAYS));
  const until = options.until || new Date();
  const since = new Date(until.getTime() - lookbackMinutes * 60 * 1000);
  const currentSince = new Date(until.getTime() - currentReliabilityMinutes * 60 * 1000);
  const dailySince = new Date(until.getTime() - dailyDays * 24 * 60 * 60 * 1000);
  const variables = buildGraphqlVariables({ zoneId: zone.id, since, until, dailySince });
  const graphZone = await fetchGraphqlZone(fetchImpl, token, variables, zoneName);
  const report = buildCloudflareUsageSummary({
    zone: graphZone,
    zoneId: zone.id,
    zoneName: zone.name || zoneName,
    window: {
      since: variables.filter.datetime_geq,
      until: variables.filter.datetime_lt,
      adaptive_lookback_minutes: lookbackMinutes,
      daily_since: variables.dailyFilter.date_geq,
      daily_until: variables.dailyFilter.date_leq
    }
  }, { generatedAt: options.generatedAt });
  if (currentReliabilityMinutes >= lookbackMinutes) return report;

  const currentVariables = buildGraphqlVariables({
    zoneId: zone.id,
    since: currentSince,
    until,
    dailySince
  });
  const currentGraphZone = await fetchGraphqlZone(fetchImpl, token, currentVariables, zoneName);
  const currentReport = buildCloudflareUsageSummary({
    zone: currentGraphZone,
    zoneId: zone.id,
    zoneName: zone.name || zoneName,
    window: {
      since: currentVariables.filter.datetime_geq,
      until: currentVariables.filter.datetime_lt,
      adaptive_lookback_minutes: currentReliabilityMinutes,
      daily_since: currentVariables.dailyFilter.date_geq,
      daily_until: currentVariables.dailyFilter.date_leq
    }
  }, { generatedAt: options.generatedAt });
  return withCurrentReliability(report, currentReport);
}

function parseArgs(argv) {
  const args = {
    zoneName: DEFAULT_ZONE_NAME,
    json: false
  };
  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === '--json') args.json = true;
    else if (arg === '--adoption-scorecard') args.adoptionScorecard = true;
    else if (arg === '--fail-on-reliability-break') args.failOnReliabilityBreak = true;
    else if (arg === '--zone') args.zoneName = argv[++index];
    else if (arg === '--zone-id') args.zoneId = argv[++index];
    else if (arg === '--lookback-minutes') args.lookbackMinutes = Number(argv[++index]);
    else if (arg === '--current-reliability-minutes') args.currentReliabilityMinutes = Number(argv[++index]);
    else if (arg === '--daily-days') args.dailyDays = Number(argv[++index]);
    else if (arg === '--write') args.write = argv[++index];
    else if (arg === '--write-json') args.writeJson = argv[++index];
    else if (arg === '--help') args.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

function usage() {
  return `Usage: npm run usage:cloudflare -- [--json] [--adoption-scorecard] [--fail-on-reliability-break] [--zone anchorfact.org] [--zone-id id] [--lookback-minutes 1430] [--current-reliability-minutes 120] [--daily-days 7] [--write report.md] [--write-json report.json]

Required environment:
  CLOUDFLARE_API_TOKEN  Cloudflare API token with Zone:Read and Analytics:Read for the target zone.
`;
}

async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  if (args.help) {
    console.log(usage());
    return;
  }
  const report = await fetchCloudflareUsageReport(args);
  const markdown = args.adoptionScorecard
    ? renderCloudflareAdoptionScorecard(report)
    : renderCloudflareUsageReport(report);
  if (args.write) {
    const out = resolve(args.write);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, markdown);
  }
  if (args.writeJson) {
    const out = resolve(args.writeJson);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, `${JSON.stringify(report, null, 2)}\n`);
  }
  process.stdout.write(args.json ? `${JSON.stringify(report, null, 2)}\n` : markdown);
  if (args.failOnReliabilityBreak && !(report.current_health || report.adoption_health).ok) {
    process.exitCode = 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => {
    console.error(`Cloudflare usage report failed: ${error.message}`);
    process.exit(1);
  });
}
