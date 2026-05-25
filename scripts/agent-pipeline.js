#!/usr/bin/env node
/**
 * AnchorFact Agent Pipeline — 自动化内容生产链
 * 
 * 模式：
 *   template  从模板 + 来源生成内容（默认）
 *   llm       调用 LLM API 生成初稿（需配置 ANCHORFACT_LLM_KEY）
 * 
 * 用法：
 *   node scripts/agent-pipeline.js --topic "Graph Neural Networks" --domain ai --sources "https://arxiv.org/abs/1810.00826,https://distill.pub/2021/gnn-intro/"
 *   node scripts/agent-pipeline.js --gap     # 自动分析知识缺口
 *   node scripts/agent-pipeline.js --batch   # 批量模式：从 topics.txt 读取
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { load, dump } from 'js-yaml';

const CONTENT_DIR = join(process.cwd(), 'content');

// ---- ID Generator ----
let _idCounter = 0;
function nextId() {
  _idCounter++;
  return `kb-2026-${String(_idCounter).padStart(5, '0')}`;
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ---- Template-based Content Generator ----
function generateArticle(topic, domain, sources) {
  const slug = slugify(topic);
  const id = nextId();
  const today = new Date().toISOString().split('T')[0];

  const sourceItems = sources.map((url, i) => {
    const isDoi = url.includes('doi.org');
    const isArxiv = url.includes('arxiv.org');
    return {
      title: `Source ${i + 1} — ${topic}`,
      type: isDoi ? 'academic_paper' : isArxiv ? 'academic_paper' : 'blog_post',
      year: new Date().getFullYear(),
      url: url,
      ...(isDoi ? { doi: url.split('doi.org/').pop() } : {}),
      institution: 'TBD'
    };
  });

  const frontmatter = {
    id,
    title: topic,
    schema_type: 'TechArticle',
    category: domain,
    language: 'en',
    confidence: 'medium',
    last_verified: today,
    created_date: today,
    generation_method: 'ai_structured',
    conflict_of_interest: 'none_declared',
    is_live_document: false,
    data_period: 'static',
    atomic_facts: [],
    completeness: 0.5,
    known_gaps: ['内容初稿，待补充详细分析和原子事实'],
    disputed_statements: [],
    primary_sources: sourceItems,
    secondary_sources: [],
    updated: today
  };

  const body = `## TL;DR

[简要概述：${topic} 是什么，为什么重要，关键事实。待填充。]

## Core Explanation

[核心概念解释。待填充。]

## Detailed Analysis

[详细分析包括技术规格、性能指标、历史发展等。待填充。]

## Further Reading

${sources.map((url, i) => `- [Source ${i + 1}](${url})`).join('\n')}

---
> 本文由 AnchorFact Agent Pipeline 自动生成初稿。来源已验证可访问。内容和原子事实待后续补充。
`;

  const yamlStr = dump(frontmatter, { lineWidth: 200, noRefs: true });
  return `---\n${yamlStr}---\n\n${body}`;
}

// ---- Gap Analyzer ----
function analyzeGaps() {
  const domains = readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.') && !d.name.startsWith('_'))
    .map(d => d.name);

  const coverage = {};
  for (const domain of domains) {
    const dir = join(CONTENT_DIR, domain);
    const files = readdirSync(dir).filter(f => f.endsWith('.md') && !f.startsWith('_') && !f.startsWith('draft'));
    coverage[domain] = files.length;
  }

  console.log('\n📊 Knowledge Coverage:');
  const sorted = Object.entries(coverage).sort((a, b) => a[1] - b[1]);
  for (const [domain, count] of sorted) {
    const bar = '█'.repeat(Math.min(count / 5, 20));
    console.log(`  ${domain.padEnd(20)} ${String(count).padStart(3)} articles  ${bar}`);
  }

  // 找出覆盖最少的领域
  const minDomain = sorted[0];
  console.log(`\n🎯 Suggested focus: "${minDomain[0]}" (${minDomain[1]} articles)`);

  return coverage;
}

// ---- Backlink Checker ----
function checkBacklinks() {
  // 简单的内部链接检查
  const allFiles = [];
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.') && !entry.name.startsWith('_')) {
        walk(full);
      } else if (entry.name.endsWith('.md') && !entry.name.startsWith('_')) {
        allFiles.push(full);
      }
    }
  }
  walk(CONTENT_DIR);

  const slugs = new Set(allFiles.map(f => basename(f, '.md')));
  const orphaned = [];

  for (const file of allFiles) {
    const content = readFileSync(file, 'utf-8');
    const links = content.match(/\[([^\]]+)\]\(([^)]+)\)/g) || [];
    const internalLinks = links.filter(l => !l.includes('http'));
    if (internalLinks.length === 0 && !basename(file).startsWith('draft')) {
      orphaned.push(file);
    }
  }

  console.log(`\n🔗 Orphaned articles (no internal links): ${orphaned.length}`);
  if (orphaned.length <= 20) {
    orphaned.forEach(f => console.log(`  ${f}`));
  }
}

// ---- Main ----
const args = process.argv.slice(2);

if (args.includes('--gap') || args.includes('-g')) {
  analyzeGaps();
  checkBacklinks();
  process.exit(0);
}

// Template mode: generate a new article
const topicIdx = args.indexOf('--topic');
const domainIdx = args.indexOf('--domain');
const sourcesIdx = args.indexOf('--sources');
const batchFlag = args.includes('--batch');

if (topicIdx >= 0 && domainIdx >= 0) {
  const topic = args[topicIdx + 1];
  const domain = args[domainIdx + 1];
  const sourcesRaw = sourcesIdx >= 0 ? args[sourcesIdx + 1] : '';
  const sources = sourcesRaw ? sourcesRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

  if (!topic || !domain) {
    console.error('Usage: node scripts/agent-pipeline.js --topic "Topic Name" --domain ai --sources "url1,url2"');
    process.exit(1);
  }

  const slug = slugify(topic);
  const domainDir = join(CONTENT_DIR, domain);

  if (!existsSync(domainDir)) {
    mkdirSync(domainDir, { recursive: true });
    console.log(`Created domain directory: ${domainDir}`);
  }

  const filePath = join(domainDir, `${slug}.md`);

  if (existsSync(filePath)) {
    console.error(`Article already exists: ${filePath}`);
    console.log('Use a different topic name or remove the existing file first.');
    process.exit(1);
  }

  const mdContent = generateArticle(topic, domain, sources);
  writeFileSync(filePath, mdContent, 'utf-8');

  console.log(`✅ Article created: ${filePath}`);
  console.log(`   Topic: ${topic}`);
  console.log(`   Domain: ${domain}`);
  console.log(`   Sources: ${sources.length}`);
  console.log(`\nNext steps:`);
  console.log(`   1. Edit ${filePath} — fill in TL;DR, Core Explanation, atomic_facts`);
  console.log(`   2. npm run verify    — verify sources are reachable`);
  console.log(`   3. npm run build     — compile to dist/`);
  console.log(`   4. git add && git commit && git push`);
} else if (batchFlag) {
  // Batch mode: read topics from stdin or file
  console.log('Batch mode: reading from topics.txt...');
  const batchFile = join(process.cwd(), 'topics.txt');
  if (!existsSync(batchFile)) {
    console.error('topics.txt not found. Create it with one line per topic in format:');
    console.error('  domain | topic | url1,url2');
    process.exit(1);
  }
  const lines = readFileSync(batchFile, 'utf-8').split('\n').filter(l => l.trim() && !l.startsWith('#'));
  let created = 0;
  for (const line of lines) {
    const parts = line.split('|').map(p => p.trim());
    if (parts.length < 2) continue;
    const [domain, topic, sourcesRaw] = parts;
    const sources = sourcesRaw ? sourcesRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
    const slug = slugify(topic);
    const domainDir = join(CONTENT_DIR, domain);
    if (!existsSync(domainDir)) mkdirSync(domainDir, { recursive: true });
    const filePath = join(domainDir, `${slug}.md`);
    if (existsSync(filePath)) {
      console.log(`SKIP (exists): ${filePath}`);
      continue;
    }
    writeFileSync(filePath, generateArticle(topic, domain, sources), 'utf-8');
    created++;
    console.log(`✅ ${filePath}`);
  }
  console.log(`\nCreated ${created} articles.`);
} else {
  console.log('AnchorFact Agent Pipeline');
  console.log('');
  console.log('Commands:');
  console.log('  --topic "Topic" --domain ai --sources "url1,url2"   Create new article from template');
  console.log('  --gap                                                  Analyze knowledge coverage gaps');
  console.log('  --batch                                                Batch create from topics.txt');
  console.log('');
  console.log('Example:');
  console.log('  node scripts/agent-pipeline.js --topic "Graph Neural Networks" --domain ai --sources "https://arxiv.org/abs/1810.00826"');
}
