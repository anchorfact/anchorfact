#!/usr/bin/env node
/**
 * AnchorFact Source Freshness Monitor
 * 
 * 每周检测所有 primary_sources 的 URL 是否仍然可达。
 * 输出 stale-sources.json — 列出失效链接、重定向、超时的来源。
 * 
 * 用法：node scripts/monitor-sources.js [--summary]
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';

const CONTENT_DIR = 'content';
const OUTPUT_FILE = 'stale-sources.json';
const TIMEOUT_MS = 8000;
const CONCURRENCY = 10;

let checked = 0, stale = 0, total = 0;

async function checkUrl(url) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: { 'User-Agent': 'AnchorFact-Monitor/1.0' },
      redirect: 'follow'
    });
    clearTimeout(timer);
    return {
      url,
      status: res.status,
      ok: res.status >= 200 && res.status < 400,
      redirected: res.redirected ? res.url : null
    };
  } catch (e) {
    return { url, status: 0, ok: false, error: e.message };
  }
}

// Collect all unique URLs
const allUrls = new Map(); // url → { title, file }
function walk(dir) {
  for (const e of readdirSync(dir)) {
    const fp = join(dir, e);
    if (statSync(fp).isDirectory()) { walk(fp); continue }
    if (!e.endsWith('.md') || e.startsWith('_')) continue;
    try {
      const md = readFileSync(fp, 'utf-8');
      const lines = md.split('\n');
      if (lines[0]?.trim() !== '---') continue;
      const ei = lines.slice(1).findIndex(l => l.trim() === '---');
      if (ei === -1) continue;
      const fm = load(lines.slice(1, ei + 1).join('\n')) || {};
      const sources = fm.primary_sources || [];
      for (const s of sources) {
        if (s.url && !s.doi) {
          if (!allUrls.has(s.url)) {
            allUrls.set(s.url, { title: s.title || '', file: fp, year: s.year });
          }
        }
      }
    } catch (e) { /* skip */ }
  }
}

console.log('AnchorFact Source Freshness Monitor\n');
walk(CONTENT_DIR);
total = allUrls.size;
console.log(`Unique URLs to check: ${total}`);
console.log(`Concurrency: ${CONCURRENCY}\n`);

// Check URLs in parallel batches
const urls = [...allUrls.entries()];
const results = [];
const tasks = urls.map(([url, meta]) => async () => {
  const r = await checkUrl(url);
  results.push({ ...r, ...meta });
  checked++;
  if (checked % 50 === 0 || checked === total) {
    const pct = Math.round(checked / total * 100);
    console.log(`[${checked}/${total}] ${pct}% — ${stale} stale found`);
  }
  if (!r.ok) stale++;
  return r;
});

// Batch concurrency
const executing = new Set();
for (const t of tasks) {
  const p = t().then(() => executing.delete(p));
  executing.add(p);
  if (executing.size >= CONCURRENCY) await Promise.race(executing);
}
await Promise.all(executing);

// Generate report
const staleItems = results.filter(r => !r.ok);
const redirectedItems = results.filter(r => r.redirected && r.ok);

const report = {
  generated: new Date().toISOString(),
  summary: {
    total_urls: total,
    checked: results.length,
    ok: results.filter(r => r.ok).length,
    stale: staleItems.length,
    redirected: redirectedItems.length,
    health_pct: total > 0 ? ((total - staleItems.length) / total * 100).toFixed(1) + '%' : 'N/A'
  },
  stale_sources: staleItems.sort((a, b) => a.url.localeCompare(b.url)).map(r => ({
    url: r.url,
    status: r.status,
    error: r.error || '',
    title: r.title,
    file: r.file,
    year: r.year
  })),
  redirected_sources: redirectedItems.sort((a, b) => a.url.localeCompare(b.url)).map(r => ({
    original: r.url,
    redirected_to: r.redirected,
    title: r.title,
    file: r.file
  }))
};

writeFileSync(OUTPUT_FILE, JSON.stringify(report, null, 2));

console.log(`\n📊 Freshness Report: ${OUTPUT_FILE}`);
console.log(`   OK: ${report.summary.ok}/${total} (${report.summary.health_pct})`);
console.log(`   Stale: ${report.summary.stale}`);
console.log(`   Redirected: ${report.summary.redirected}`);

if (process.argv.includes('--summary')) {
  // Brief summary mode
  console.log('\n--- Stale (first 10) ---');
  staleItems.slice(0, 10).forEach(r => {
    console.log(`  ${r.status} ${r.url.slice(0, 70)} ← ${r.file}`);
  });
}
