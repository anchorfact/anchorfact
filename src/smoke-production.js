#!/usr/bin/env node
import { createHash } from 'crypto';
import { pathToFileURL } from 'url';
import { liveFetchOptions } from './lib/live-http.js';

const DEFAULT_BASE_URL = 'https://anchorfact.org/';

function readExpectedInt(name) {
  if (!process.env[name]) {
    return null;
  }

  const parsed = Number.parseInt(process.env[name], 10);
  if (!Number.isFinite(parsed)) {
    throw new Error(`${name} must be an integer when set.`);
  }
  return parsed;
}

function countClaims(payload) {
  if (Array.isArray(payload)) {
    return payload.length;
  }
  if (Array.isArray(payload.claims)) {
    return payload.claims.length;
  }
  return 0;
}

function countArticles(articles, predicate) {
  if (!Array.isArray(articles)) {
    return 0;
  }
  return articles.filter(predicate).length;
}

function sha256Text(text) {
  return createHash('sha256').update(Buffer.from(text, 'utf8')).digest('hex');
}

export async function fetchRoute(baseUrl, route) {
  const url = new URL(route, baseUrl);
  const response = await fetch(url, liveFetchOptions());
  const body = await response.text();
  const headers = Object.fromEntries(response.headers.entries());

  return {
    route,
    url: url.href,
    finalUrl: response.url,
    status: response.status,
    contentType: response.headers.get('content-type') || '',
    headers,
    body,
  };
}

function assertOk(condition, message, failures) {
  if (!condition) {
    failures.push(message);
  }
}

function assertExpected(actual, expected, label, failures) {
  if (expected === null) {
    return;
  }
  assertOk(actual === expected, `${label} expected ${expected}, got ${actual}`, failures);
}

function headerIncludes(result, name, expected, failures) {
  const actual = result.headers[name.toLowerCase()] || '';
  assertOk(actual.toLowerCase().includes(expected.toLowerCase()), `${result.route} header ${name} expected to include ${expected}, got ${actual || '(missing)'}`, failures);
}

export async function main() {
  const baseUrl = new URL(process.argv[2] || process.env.ANCHORFACT_BASE_URL || DEFAULT_BASE_URL);
  const failures = [];

  const expectedPublic = readExpectedInt('EXPECTED_PUBLIC_ARTICLES');
  const expectedDraft = readExpectedInt('EXPECTED_DRAFT_ARTICLES');
  const expectedClaims = readExpectedInt('EXPECTED_CLAIMS');

  const routes = ['/', '/manifest.json', '/llms.txt', '/claims.json', '/provenance.json', '/drafts.html'];
  const results = {};

  for (const route of routes) {
    results[route] = await fetchRoute(baseUrl, route);
    assertOk(results[route].status === 200, `${route} returned ${results[route].status}`, failures);
  }

  const manifest = JSON.parse(results['/manifest.json'].body);
  const claims = JSON.parse(results['/claims.json'].body);
  const provenance = JSON.parse(results['/provenance.json'].body);
  const llmsText = results['/llms.txt'].body;
  const draftsHtml = results['/drafts.html'].body;

  const publicArticles = countArticles(
    manifest.articles,
    (article) => article.status === 'public' && article.is_draft === false,
  );
  const draftArticles = countArticles(
    manifest.articles,
    (article) => article.status === 'draft' || article.is_draft === true,
  );
  const claimCount = countClaims(claims);

  assertOk(manifest.public_article_count === publicArticles, `manifest public_article_count ${manifest.public_article_count} does not match articles[] count ${publicArticles}`, failures);
  assertOk(manifest.draft_article_count === draftArticles, `manifest draft_article_count ${manifest.draft_article_count} does not match articles[] count ${draftArticles}`, failures);
  assertOk(manifest.claim_count === claimCount, `manifest claim_count ${manifest.claim_count} does not match claims.json count ${claimCount}`, failures);
  assertOk(manifest.schema_version === 'anchorfact.manifest.v1', `manifest schema_version expected anchorfact.manifest.v1, got ${manifest.schema_version || '(missing)'}`, failures);
  assertOk(manifest.provenance_url === new URL('/provenance.json', baseUrl).href, `manifest provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${manifest.provenance_url || '(missing)'}`, failures);
  assertOk(claims.schema_version === 'anchorfact.claims.v1', `claims schema_version expected anchorfact.claims.v1, got ${claims.schema_version || '(missing)'}`, failures);
  assertOk(claims.provenance_url === new URL('/provenance.json', baseUrl).href, `claims provenance_url expected ${new URL('/provenance.json', baseUrl).href}, got ${claims.provenance_url || '(missing)'}`, failures);
  assertOk(provenance.schema_version === 'anchorfact.provenance.v1', `provenance schema_version expected anchorfact.provenance.v1, got ${provenance.schema_version || '(missing)'}`, failures);
  assertOk(provenance.content_counts?.public === manifest.public_article_count, 'provenance public count does not match manifest', failures);
  assertOk(provenance.content_counts?.draft === manifest.draft_article_count, 'provenance draft count does not match manifest', failures);
  assertOk(provenance.content_counts?.claims === claimCount, 'provenance claim count does not match claims.json', failures);
  assertOk(provenance.artifacts?.manifest_json?.sha256 === sha256Text(results['/manifest.json'].body), 'provenance manifest hash does not match /manifest.json', failures);
  assertOk(provenance.artifacts?.claims_json?.sha256 === sha256Text(results['/claims.json'].body), 'provenance claims hash does not match /claims.json', failures);
  assertOk(provenance.artifacts?.llms_txt?.sha256 === sha256Text(results['/llms.txt'].body), 'provenance llms hash does not match /llms.txt', failures);
  assertOk(['signed', 'unsigned'].includes(provenance.signature?.status), `provenance signature status expected signed or unsigned, got ${provenance.signature?.status || '(missing)'}`, failures);
  assertOk(llmsText.trim().length > 0, '/llms.txt is empty', failures);
  assertOk(/noindex/i.test(draftsHtml), '/drafts.html is missing noindex', failures);
  headerIncludes(results['/'], 'X-Content-Type-Options', 'nosniff', failures);
  headerIncludes(results['/manifest.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/manifest.json'], 'Cache-Control', 'max-age=3600', failures);
  headerIncludes(results['/claims.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/provenance.json'], 'Access-Control-Allow-Origin', '*', failures);
  headerIncludes(results['/provenance.json'], 'Cache-Control', 'max-age=3600', failures);
  headerIncludes(results['/drafts.html'], 'X-Robots-Tag', 'noindex', failures);

  const firstPublicArticle = Array.isArray(manifest.articles)
    ? manifest.articles.find(article => article.status === 'public' && article.is_draft === false && article.canonical_slug)
    : null;
  if (firstPublicArticle) {
    const articleRoute = `/${firstPublicArticle.canonical_slug}/index.json`;
    results[articleRoute] = await fetchRoute(baseUrl, articleRoute);
    assertOk(results[articleRoute].status === 200, `${articleRoute} returned ${results[articleRoute].status}`, failures);
    headerIncludes(results[articleRoute], 'Access-Control-Allow-Origin', '*', failures);
    headerIncludes(results[articleRoute], 'Content-Type', 'application/ld+json', failures);
  }

  assertExpected(manifest.public_article_count, expectedPublic, 'public_article_count', failures);
  assertExpected(manifest.draft_article_count, expectedDraft, 'draft_article_count', failures);
  assertExpected(manifest.claim_count, expectedClaims, 'claim_count', failures);

  console.log(`Production smoke test for ${baseUrl.href}`);
  for (const route of routes) {
    const result = results[route];
    console.log(`${route} ${result.status} ${result.contentType} ${result.finalUrl}`);
  }
  console.log(`public_article_count=${manifest.public_article_count}`);
  console.log(`draft_article_count=${manifest.draft_article_count}`);
  console.log(`claim_count=${manifest.claim_count}`);
  console.log(`provenance_builder=${provenance.build?.builder || 'unknown'}`);
  console.log(`provenance_commit_sha=${provenance.build?.commit_sha || 'unknown'}`);
  console.log(`provenance_signature=${provenance.signature?.status || 'unknown'}`);

  if (failures.length > 0) {
    console.error('Smoke test failed:');
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
