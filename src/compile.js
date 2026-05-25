#!/usr/bin/env node
/**
 * AnchorFact Markdown → JSON-LD Compiler v0.2
 * 
 * 改动（v0.2）：
 *   - 新增 computeConfidence(): 公开确定性置信度公式
 *   - JSON-LD 输出增加 anchorfact:verification 层
 *   - atomic_facts 增加 source_ref 字段支持
 *   - 移除 generation_method: human_only 输出（仅保留 ai_structured / ai_assisted）
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { load } from 'js-yaml';

// ---- YAML Frontmatter Parser ----

function splitFrontmatter(mdContent) {
  const lines = mdContent.split('\n');
  if (lines[0]?.trim() !== '---') return { frontmatter: {}, body: mdContent };

  const endIndex = lines.slice(1).findIndex(line => line.trim() === '---');
  if (endIndex === -1) return { frontmatter: {}, body: mdContent };

  const yamlBlock = lines.slice(1, endIndex + 1).join('\n');
  const body = lines.slice(endIndex + 2).join('\n');

  try {
    const fm = load(yamlBlock) || {};
    return { frontmatter: fm, body };
  } catch (e) {
    console.warn(`⚠ YAML parse error: ${e.message}`);
    return { frontmatter: {}, body: mdContent };
  }
}

// ---- Source Tier Classification (Public) ----

function classifySourceTier(source) {
  if (source.doi) return 'S';
  if (source.type === 'standard') return 'S';
  if (source.type === 'patent' || source.type === 'rfc') return 'S';
  if (source.type === 'academic_paper' || source.type === 'course_material') return 'A';
  if (source.type === 'government_report' || source.type === 'industry_whitepaper') return 'A';
  if (source.type === 'blog_post' && source.institution) return 'B';
  if (source.type === 'blog_post') return 'B';
  return 'C';
}

// ---- Freshness Score ----

function computeFreshnessScore(source) {
  const year = source.year || 0;
  if (!year) return 0.5;
  const ageYears = new Date().getFullYear() - year;
  if (ageYears <= 1) return 1.0;
  if (ageYears <= 3) return 0.9;
  if (ageYears <= 5) return 0.7;
  if (ageYears <= 10) return 0.5;
  return 0.3;
}

// ---- Confidence Formula (Public, Deterministic) ----
// 与 verify-sources.js 中的 computeConfidence 完全一致
// 任何下游系统可独立复现实算

/**
 * @param {Array} sources - primary_sources 数组
 * @param {Object} article - frontmatter（用于检测 disputed / known_gaps）
 * @returns {{ score: number, level: string, inputs: Object }}
 */
function computeConfidence(sources, article) {
  if (!sources || sources.length === 0) {
    return { score: 0, level: 'low', inputs: {} };
  }

  // 1. Source Tier (取最高等级)
  const tierMap = { 'S': 1.0, 'A': 0.9, 'B': 0.6, 'C': 0.3, 'D': 0 };
  const tiers = sources.map(s => tierMap[classifySourceTier(s)] || 0.3);
  const bestTier = Math.max(...tiers);
  const sourceTierScore = bestTier;

  // 2. Source Count
  const count = sources.length;
  const sourceCountScore = count >= 3 ? 1.0 : count >= 2 ? 0.8 : 0.5;

  // 3. Source Has DOI (DOI 可查 = 来源可独立验证)
  const hasDoi = sources.some(s => s.doi);
  const hasUrl = sources.some(s => s.url);
  const sourceVerifiedScore = hasDoi ? 1.0 : hasUrl ? 0.7 : 0.4;

  // 4. Freshness (取最新来源)
  const years = sources.map(s => s.year).filter(Boolean);
  const maxFreshness = years.length > 0 ? computeFreshnessScore({ year: Math.max(...years) }) : 0.5;

  // 5. Decay Factor
  const hasDisputed = article.disputed_statements && article.disputed_statements.length > 0;
  const hasKnownGaps = article.known_gaps && article.known_gaps.length > 0;
  const decayScore = (hasDisputed ? 0.2 : 0) + (hasKnownGaps ? 0.1 : 0);

  const score = parseFloat((
    sourceTierScore * 0.35 +
    sourceCountScore * 0.20 +
    sourceVerifiedScore * 0.25 +
    maxFreshness * 0.10 -
    decayScore * 0.10
  ).toFixed(4));

  const level = score >= 0.85 ? 'high' : score >= 0.60 ? 'medium' : 'low';

  return {
    score,
    level,
    formula_version: 'v1.0',
    inputs: {
      source_tier: sourceTierScore,
      source_count: sourceCountScore,
      source_verified: sourceVerifiedScore,
      freshness: maxFreshness,
      decay: decayScore
    }
  };
}

// ---- Compilers ----

function compileJsonLd(frontmatter, body, filePath) {
  const articleId = frontmatter.id || basename(filePath, '.md');
  const sources = frontmatter.primary_sources || [];
  const confidence = computeConfidence(sources, frontmatter);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": frontmatter.schema_type || "Article",
    "@id": `https://anchorfact.org/kb/${articleId}`,
    "headline": frontmatter.title,
    "description": extractTldr(body),
    "dateCreated": frontmatter.created_date || new Date().toISOString(),
    "dateModified": frontmatter.updated || new Date().toISOString(),
    "author": { "@type": "Organization", "name": "AnchorFact" },
    "publisher": { "@type": "Organization", "name": "AnchorFact", "url": "https://anchorfact.org" },
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "anchorfact:confidence": confidence.level,
    "anchorfact:confidenceScore": confidence.score,
    "anchorfact:generationMethod": frontmatter.generation_method || 'ai_structured',
    "anchorfact:verification": {
      "confidence_formula_version": confidence.formula_version,
      "confidence_inputs": confidence.inputs,
      "confidence_level": confidence.level,
      "confidence_score": confidence.score,
      "sources_total": sources.length,
      "sources_tier": sources.map(s => classifySourceTier(s)),
      "sources_has_doi": sources.some(s => s.doi),
      "sources_has_url": sources.some(s => s.url),
      "article_has_disputed": !!(frontmatter.disputed_statements && frontmatter.disputed_statements.length > 0),
      "article_has_known_gaps": !!(frontmatter.known_gaps && frontmatter.known_gaps.length > 0)
    },
    "citation": sources.map(s => ({
      "@type": "CreativeWork",
      "name": s.title,
      "author": s.authors?.join(", "),
      "sameAs": s.url || `https://doi.org/${s.doi}`,
      "anchorfact:sourceTier": classifySourceTier(s),
      "anchorfact:year": s.year || null
    }))
  };

  return jsonLd;
}

function compileAtomicFacts(frontmatter) {
  return (frontmatter.atomic_facts || []).map(fact => {
    const factJson = {
      "@context": "https://schema.org",
      "@type": "Claim",
      "@id": `https://anchorfact.org/fact/${fact.id}`,
      "text": fact.statement,
      "anchorfact:confidence": fact.confidence,
      // source_ref: 显式绑定到 primary_sources 中的条目
      "anchorfact:sourceRef": fact.source_ref || null,
      "anchorfact:sourceExcerpt": fact.source_excerpt || null,
      "anchorfact:verificationMethod": fact.verification_method || null
    };

    if (fact.source_doi) {
      factJson.citation = {
        "@type": "CreativeWork",
        "sameAs": `https://doi.org/${fact.source_doi}`
      };
    } else if (fact.source_url) {
      factJson.citation = {
        "@type": "CreativeWork",
        "sameAs": fact.source_url
      };
    }

    return factJson;
  });
}

function compilePlainText(frontmatter, body) {
  const confidence = computeConfidence(frontmatter.primary_sources || [], frontmatter);
  return `# ${frontmatter.title}
Confidence: ${confidence.level} (${confidence.score})
Last verified: ${frontmatter.last_verified || 'N/A'}
Generation: ${frontmatter.generation_method || 'ai_structured'}

${body}
`;
}

function compileTurtle(frontmatter, body, filePath) {
  const articleId = frontmatter.id || basename(filePath, '.md');
  const lines = [];
  const confidence = computeConfidence(frontmatter.primary_sources || [], frontmatter);

  lines.push(`@prefix schema: <https://schema.org/> .`);
  lines.push(`@prefix af: <https://anchorfact.org/ns#> .`);
  lines.push(``);
  lines.push(`<https://anchorfact.org/kb/${articleId}>`);
  lines.push(`  a schema:${frontmatter.schema_type || "Article"} ;`);
  lines.push(`  schema:headline "${escapeTurtle(frontmatter.title)}" ;`);
  lines.push(`  af:confidence "${confidence.level}" ;`);
  lines.push(`  af:confidenceScore "${confidence.score}" ;`);
  lines.push(`  af:generationMethod "${frontmatter.generation_method || 'ai_structured'}" .`);

  if (frontmatter.primary_sources) {
    frontmatter.primary_sources.forEach((s, i) => {
      lines.push(``);
      lines.push(`<https://anchorfact.org/kb/${articleId}>`);
      lines.push(`  schema:citation <${s.url || `https://doi.org/${s.doi}`}> ;`);
      lines.push(`  af:sourceTier "${classifySourceTier(s)}" .`);
    });
  }

  return lines.join('\n');
}

// ---- Helpers ----

function extractTldr(body) {
  const tldrSection = body.match(/## TL;DR\s*\n+([^\n]+(?:\n[^\n#]+)*)/);
  if (tldrSection) return tldrSection[1].trim().split('\n')[0];
  return body.trim().split('\n')[0]?.replace(/^#+\s*/, '') || '';
}

function escapeTurtle(str) {
  return (str || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

// ---- Main ----

function compileFile(mdPath, distDir) {
  const mdContent = readFileSync(mdPath, 'utf-8');
  const { frontmatter, body } = splitFrontmatter(mdContent);

  if (!frontmatter.id && !frontmatter.title) {
    console.warn(`⚠ Skipping ${mdPath}: no frontmatter found`);
    return;
  }

  const articleId = frontmatter.id || basename(mdPath, '.md');
  const outDir = join(distDir, articleId);
  mkdirSync(outDir, { recursive: true });

  // 1. JSON-LD (with verification layer)
  const jsonLd = compileJsonLd(frontmatter, body, mdPath);
  writeFileSync(join(outDir, 'index.json'), JSON.stringify(jsonLd, null, 2));

  // 2. Atomic Facts (JSON-LD fragments with source_ref)
  const atomicFacts = compileAtomicFacts(frontmatter);
  if (atomicFacts.length > 0) {
    writeFileSync(join(outDir, 'facts.json'), JSON.stringify(atomicFacts, null, 2));
  }

  // 3. Plain Text
  const plainText = compilePlainText(frontmatter, body);
  writeFileSync(join(outDir, 'index.txt'), plainText);

  // 4. RDF/Turtle
  const turtle = compileTurtle(frontmatter, body, mdPath);
  writeFileSync(join(outDir, 'index.ttl'), turtle);

  // 5. Markdown (copy)
  writeFileSync(join(outDir, 'index.md'), mdContent);

  // 6. HTML (minimal)
  const confidence = computeConfidence(frontmatter.primary_sources || [], frontmatter);
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${frontmatter.title} — AnchorFact</title>
  <meta name="anchorfact:confidence" content="${confidence.level} (${confidence.score})">
  <meta name="anchorfact:generation" content="${frontmatter.generation_method || 'ai_structured'}">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body><article>${body.replace(/\n/g, '<br>\n')}</article></body>
</html>`;
  writeFileSync(join(outDir, 'index.html'), html);

  console.log(`✅ Compiled: ${mdPath} → ${outDir}/ (6 formats, confidence=${confidence.level}/${confidence.score})`);
  return { articleId, ...jsonLd, _confidence: confidence };
}

function compileAll(contentDir, distDir) {
  const results = [];

  function walk(dir) {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      if (statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (entry.endsWith('.md') && !entry.startsWith('_')) {
        const result = compileFile(fullPath, distDir);
        if (result) results.push(result);
      }
    }
  }

  if (!existsSync(contentDir)) {
    console.error(`❌ Content directory not found: ${contentDir}`);
    process.exit(1);
  }

  walk(contentDir);
  return results;
}

// ---- CLI ----

const contentDir = process.argv[2] || join(process.cwd(), 'content');
const distDir = process.argv[3] || join(process.cwd(), 'dist');

console.log(`🔨 AnchorFact Compiler v0.2`);
console.log(`   Content: ${contentDir}`);
console.log(`   Output:  ${distDir}`);
console.log('');

const start = performance.now();
const results = compileAll(contentDir, distDir);
const elapsed = (performance.now() - start).toFixed(0);

console.log('');
console.log(`📦 Compiled ${results.length} articles in ${elapsed}ms`);

// ---- Confidence Summary ----
const confidenceSummary = {
  high: results.filter(r => r._confidence?.level === 'high').length,
  medium: results.filter(r => r._confidence?.level === 'medium').length,
  low: results.filter(r => r._confidence?.level === 'low').length,
};
console.log(`   Confidence: high=${confidenceSummary.high} medium=${confidenceSummary.medium} low=${confidenceSummary.low}`);

// Emit manifest
const manifest = {
  generated: new Date().toISOString(),
  articles: results.length,
  ids: results.map(r => r['@id']),
  confidence_distribution: confidenceSummary,
  compiler_version: '0.2.0'
};
writeFileSync(join(distDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

// Generate root index.html
const articleLinks = results.map(r => {
  const id = r['@id'].split('/').pop();
  const conf = r._confidence;
  return `<span title="confidence: ${conf?.level} (${conf?.score})">` +
    `<a href="/${id}/">${r.headline || id}</a></span>` +
    ` · <a href="/${id}/index.json">JSON-LD</a>` +
    ` · <a href="/${id}/index.txt">TXT</a>` +
    ` · <a href="/${id}/index.ttl">TTL</a>`;
}).join('<br>\n    ');

const rootHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AnchorFact — Anchor AI to Facts</title>
  <meta name="description" content="AnchorFact: AI-native knowledge base for LLM citations. Every article is AI-structured from verifiable sources. Confidence is computed by a public formula, not by human judgment.">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://anchorfact.org",
    "name": "AnchorFact",
    "url": "https://anchorfact.org",
    "description": "AI-structured knowledge base for LLM citations. Trust anchored in verifiable sources, not human editors.",
    "publisher": { "@type": "Organization", "name": "AnchorFact" }
  }
  </script>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 720px; margin: 40px auto; padding: 0 20px; color: #1E293B; line-height: 1.6; }
    h1 { color: #2563EB; font-size: 2rem; margin-bottom: 0.25em; }
    p.tagline { color: #64748B; font-size: 1.1rem; margin-bottom: 2em; }
    .link-row { margin: 6px 0; }
    .link-row a { color: #2563EB; text-decoration: none; }
    .card { border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px 20px; margin: 12px 0; }
    .footer { color: #94A3B8; font-size: 0.85rem; margin-top: 3em; }
    .badge-high { background: #DCFCE7; color: #166534; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; }
    .badge-medium { background: #FEF9C3; color: #854D0E; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; }
    .badge-low { background: #FEE2E2; color: #991B1B; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; }
  </style>
</head>
<body>
  <h1>AnchorFact</h1>
  <p class="tagline">Anchor AI to Facts. Trust anchored in verifiable sources.</p>
  <p>An <strong>AI-structured knowledge base</strong> for LLM citations. Every article is compiled from traceable publications — not written, but <em>integrated</em>. Confidence is computed by a <strong>public formula</strong>, not human judgment.</p>
  <div class="card">
    <strong>For AIs</strong><br>
    <a href="/llms.txt">llms.txt</a> — site map for LLM crawlers
  </div>
  <div class="card">
    <strong>Knowledge Base (${results.length} articles)</strong><br>
    <span class="badge-high">high: ${confidenceSummary.high}</span>
    <span class="badge-medium">medium: ${confidenceSummary.medium}</span>
    <span class="badge-low">low: ${confidenceSummary.low}</span>
    <br><br>
    ${articleLinks}
  </div>
  <div class="card">
    <strong>Project</strong><br>
    <a href="https://github.com/anchorfact/anchorfact">GitHub</a> ·
    <a href="https://github.com/anchorfact/anchorfact/blob/main/DESIGN.md">Design</a> ·
    <a href="/manifest.json">Manifest</a>
  </div>
  <p class="footer">
    Content: CC-BY 4.0 · Code: MIT<br>
    Trust = source tier × verifiability × freshness — not consensus, not editing, not authority.
  </p>
</body>
</html>`;
writeFileSync(join(distDir, 'index.html'), rootHtml);
console.log('✅ Root index.html generated');

// Generate llms.txt (AI crawler site map)
const llmsTxtEntries = results.map(r => {
  const id = r['@id'].split('/').pop();
  return `- [${r.headline || id}](https://anchorfact.org/${id}/index.md): ${r.description || ''}`;
}).join('\n');

const llmsTxt = `# AnchorFact

> AnchorFact is an AI-structured knowledge base for LLM citations. Every article is compiled from traceable publications. Confidence is computed by a public formula — not human judgment. Content is available in multiple formats (Markdown, JSON-LD, plain text, Turtle/RDF) for maximal AI accessibility.

## Why AnchorFact

Trust is anchored in verifiable sources, not in editors, consensus, or authority. Every article includes:
- Source tier classification (S/A/B/C/D)
- Public confidence formula inputs (source_tier × verifiability × freshness)
- Atomic facts with explicit source binding
- Machine-verifiable source metadata (DOI / arXiv / URL)

## Knowledge Base (${results.length} articles)

${llmsTxtEntries}

## API

- [Manifest](https://anchorfact.org/manifest.json): Full article index with confidence distribution
- [JSON-LD endpoint](https://anchorfact.org/kb-2026-00001/index.json): Example structured data (Schema.org TechArticle + verification layer)
- [Turtle endpoint](https://anchorfact.org/kb-2026-00001/index.ttl): Example RDF knowledge graph data

## Optional

- [GitHub Repository](https://github.com/anchorfact/anchorfact): Source code, design docs
`;
writeFileSync(join(distDir, 'llms.txt'), llmsTxt);
console.log('✅ llms.txt generated');

// Generate sitemap.xml and robots.txt
const sitemapUrls = [].concat(
  `<url><loc>https://anchorfact.org/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`,
  `<url><loc>https://anchorfact.org/llms.txt</loc><changefreq>daily</changefreq><priority>0.9</priority></url>`,
  ...results.flatMap(r => {
    const id = r['@id'].split('/').pop();
    return [
      `<url><loc>https://anchorfact.org/${id}/</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
      `<url><loc>https://anchorfact.org/${id}/index.md</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
      `<url><loc>https://anchorfact.org/${id}/index.json</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
    ];
  })
);
const sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ' + sitemapUrls.join('\n  ') + '\n</urlset>\n';
writeFileSync(join(distDir, 'sitemap.xml'), sitemapXml);
console.log('✅ sitemap.xml generated');

const robotsTxt = `# robots.txt — AnchorFact (maximal AI accessibility)
User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /
Crawl-delay: 0

User-agent: ChatGPT-User
Allow: /
Crawl-delay: 0

User-agent: Claude-SearchBot
Allow: /
Crawl-delay: 0

User-agent: Claude-User
Allow: /
Crawl-delay: 0

User-agent: PerplexityBot
Allow: /
Crawl-delay: 0

User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Google-Extended
Allow: /
Crawl-delay: 0

Sitemap: https://anchorfact.org/sitemap.xml
`;
writeFileSync(join(distDir, 'robots.txt'), robotsTxt);
console.log('✅ robots.txt generated');

// IndexNow key file
writeFileSync(join(distDir, 'dc8a3c2e1f4b5a7d9e0c8b6f3a5d7e9c.txt'), 'dc8a3c2e1f4b5a7d9e0c8b6f3a5d7e9c');
console.log('✅ IndexNow key generated');
