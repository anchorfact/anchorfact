// Shared utilities — walk, getAllFiles, extractFacts, matchSource
const fs = require('fs'), p = require('path');

/** Recursively collect all .md files in content/ excluding _index and _ prefixed dirs */
function getAllFiles(contentRoot) {
  const files = [];
  function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const fp = p.join(dir, e.name);
      if (e.isDirectory() && !e.name.startsWith('_')) walk(fp);
      else if (e.isFile() && e.name.endsWith('.md') && !e.name.startsWith('_')) files.push(fp);
    }
  }
  walk(contentRoot);
  return files;
}

/** Extract candidate atomic facts from TL;DR and Core Explanation sections */
function extractFacts(bodyText) {
  const facts = [];
  const tldrMatch = bodyText.match(/^##\s*TL;DR\s*\n+\s*(.+?)(?=\n##|\n$)/s);
  if (tldrMatch) {
    const tldr = tldrMatch[1].replace(/\n/g, ' ').trim();
    if (tldr.length > 30 && tldr.length < 500) facts.push(tldr.substring(0, 400));
  }
  const coreMatch = bodyText.match(/^##\s*Core\s+Explanation\s*\n+\s*(.+?)(?=\n##|\n$)/s);
  if (coreMatch) {
    const text = coreMatch[1].replace(/\n+/g, ' ').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
    const sentences = text.split(/(?<=[。.!?])\s*/);
    for (const s of sentences) {
      if (facts.length >= 5) break;
      const clean = s.trim();
      if (clean.length > 35 && clean.length < 400) facts.push(clean);
    }
  }
  if (facts.length < 2) {
    const all = bodyText.replace(/\n+/g, ' ').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').split(/(?<=[。.!?])\s*/);
    for (const s of all) {
      if (facts.length >= 5) break;
      const clean = s.trim();
      if (clean.length > 40 && clean.length < 400 && !clean.startsWith('#') && !clean.startsWith('- ['))
        facts.push(clean);
    }
  }
  return facts.slice(0, 5);
}

/** Match a fact to best source by keyword overlap */
function matchSource(fact, sources) {
  const fw = new Set(fact.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff\s]/g, ' ').split(/\s+/).filter(w => w.length > 1));
  let best = sources[0], bestScore = 0;
  for (const src of sources) {
    if (!src || !src.title) continue;
    const sw = new Set(src.title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff\s]/g, ' ').split(/\s+/).filter(w => w.length > 1));
    let overlap = 0;
    for (const w of fw) { if (sw.has(w)) overlap++; }
    if (overlap > bestScore) { bestScore = overlap; best = src; }
  }
  return best || sources[0];
}

module.exports = { getAllFiles, extractFacts, matchSource };
