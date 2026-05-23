#!/usr/bin/env node
/**
 * AnchorFact Source URL Validator
 * 
 * Checks that primary_sources URLs are reachable (200 OK).
 * Skips DOI URLs (checked via https://doi.org/).
 * Exit code: 0 = all OK, 1 = some unavailable, 2 = many failures
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const TIMEOUT = 10000; // 10 second timeout
const CONCURRENCY = 5;

function fetchUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: TIMEOUT }, (res) => {
      // Follow redirects (up to 3)
      if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
        const redirect = res.headers.location;
        if (redirect) {
          fetchUrl(redirect).then(resolve);
          return;
        }
      }
      resolve({ url, status: res.statusCode, ok: res.statusCode < 400 });
    });
    req.on('timeout', () => { req.destroy(); resolve({ url, status: 0, ok: false }); });
    req.on('error', () => { resolve({ url, status: 0, ok: false }); });
  });
}

async function checkUrls(urls) {
  const results = [];
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const batch = urls.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map(fetchUrl));
    results.push(...batchResults);
  }
  return results;
}

function extractUrls(fm) {
  const urls = [];
  if (!fm.primary_sources) return urls;
  const sources = Array.isArray(fm.primary_sources) ? fm.primary_sources : [];
  for (const src of sources) {
    if (typeof src === 'string') continue;
    if (src.url) urls.push({ url: src.url, title: src.title || 'unknown' });
    if (src.doi) urls.push({ url: `https://doi.org/${src.doi}`, title: src.title || 'unknown' });
  }
  return urls;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const raw = match[1];
  const parsed = {};
  let currentArray = null;

  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const topKey = trimmed.match(/^(\w[\w_]*):\s*(.*)/);
    if (topKey) {
      const [_, key, val] = topKey;
      const v = val.trim();
      if (v === '') {
        parsed[key] = [];
        currentArray = parsed[key];
      } else if (v === 'true' || v === 'false') {
        parsed[key] = v === 'true';
        currentArray = null;
      } else {
        parsed[key] = v.replace(/^"|"$/g, '');
        currentArray = null;
      }
    }
  }
  return parsed;
}

function walkDir(dir) {
  const articles = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('_')) {
      articles.push(...walkDir(full));
    } else if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('_')) {
      const content = fs.readFileSync(full, 'utf-8');
      const fm = parseFrontmatter(content);
      if (fm && fm.id) {
        articles.push({ file: path.relative(CONTENT_DIR, full), fm, id: fm.id });
      }
    }
  }
  return articles;
}

// ── Execute ──
(async () => {
  console.log('🔗 AnchorFact Source URL Validator\n');
  
  const articles = walkDir(CONTENT_DIR);
  console.log(`Found ${articles.length} articles\n`);

  // Collect all unique URLs
  const allUrls = [];
  const urlMap = {};
  for (const a of articles) {
    const urls = extractUrls(a.fm);
    for (const u of urls) {
      if (!urlMap[u.url]) {
        urlMap[u.url] = [];
        allUrls.push(u.url);
      }
      urlMap[u.url].push(a.id);
    }
  }

  console.log(`Checking ${allUrls.length} unique URLs...\n`);
  const start = Date.now();
  const results = await checkUrls(allUrls);
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  const failed = results.filter(r => !r.ok);

  if (failed.length > 0) {
    console.log(`── Unavailable URLs (${failed.length}/${results.length}) ──────`);
    for (const f of failed) {
      const articleIds = urlMap[f.url] || [];
      console.log(`  ❌ ${f.url}`);
      console.log(`     Status: ${f.status}`);
      console.log(`     Referenced by: ${articleIds.slice(0, 5).join(', ')}${articleIds.length > 5 ? '...' : ''}`);
    }
    console.log('');
  }

  const successRate = ((results.length - failed.length) / results.length * 100).toFixed(1);
  console.log(`📊 Results: ${results.length - failed.length}/${results.length} reachable (${successRate}%) in ${elapsed}s`);

  if (failed.length > results.length * 0.3) {
    console.log('❌ Too many unreachable URLs');
    process.exit(2);
  } else if (failed.length > 0) {
    console.log('⚠️  Some URLs unavailable');
    process.exit(1);
  } else {
    console.log('✅ All URLs reachable');
    process.exit(0);
  }
})();
