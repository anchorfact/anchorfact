#!/usr/bin/env node
/**
 * AnchorFact Markdown → JSON-LD Compiler (POC)
 * Zero dependencies. Reads Markdown with YAML frontmatter, outputs 6 formats.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname, basename, extname } from 'path';

// ---- YAML Frontmatter Parser (zero-dep) ----

function splitFrontmatter(mdContent) {
  const lines = mdContent.split('\n');
  if (lines[0]?.trim() !== '---') return { frontmatter: {}, body: mdContent };

  const endIndex = lines.slice(1).findIndex(line => line.trim() === '---');
  if (endIndex === -1) return { frontmatter: {}, body: mdContent };

  const yamlBlock = lines.slice(1, endIndex + 1).join('\n');
  const body = lines.slice(endIndex + 2).join('\n');

  return { frontmatter: parseYamlSubset(yamlBlock), body };
}

function parseYamlSubset(yaml) {
  const result = {};
  const lines = yaml.split('\n');
  let currentKey = null;
  let currentArray = null;
  let currentNested = null;
  let indentLevel = 0;

  for (const line of lines) {
    if (line.trim() === '' || line.trim().startsWith('#')) continue;

    const stripped = line.trimStart();
    const indent = line.length - stripped.length;

    // Nested object under current key
    if (indent > indentLevel && currentKey) {
      const nestedMatch = stripped.match(/^(\w[\w_]*):\s*(.*)/);
      if (nestedMatch) {
        if (!currentNested) {
          currentNested = {};
          if (currentArray) {
            currentArray[currentArray.length - 1] = currentNested;
          } else {
            result[currentKey] = currentNested;
          }
        }
        const v = parseValue(nestedMatch[2]);
        if (v !== '' || nestedMatch[2].trim() === '') {
          currentNested[nestedMatch[1]] = v;
        } else {
          // Start of a list in nested
          currentNested[nestedMatch[1]] = [];
          currentArray = currentNested[nestedMatch[1]];
          currentKey = nestedMatch[1];
          currentNested = null;
        }
        continue;
      }
      // List item in nested
      if (currentArray && stripped.startsWith('- ')) {
        currentArray.push(parseValue(stripped.slice(2)));
        continue;
      }
    }

    // Reset nesting context
    if (indent === 0 || indent <= indentLevel) {
      currentNested = null;
      currentArray = null;
      currentKey = null;
      indentLevel = indent;
    }

    // Top-level key: value
    const kvMatch = stripped.match(/^(\w[\w_]*):\s*(.*)/);
    if (kvMatch) {
      currentKey = kvMatch[1];
      const val = parseValue(kvMatch[2]);
      if (val !== '' || kvMatch[2].trim() === '') {
        result[currentKey] = val;
        currentKey = null;
      } else {
        // This key starts a list
        result[currentKey] = [];
        currentArray = result[currentKey];
      }
      continue;
    }

    // Top-level list item
    const listMatch = stripped.match(/^-\s+(.*)/);
    if (listMatch && currentArray) {
      currentArray.push(parseValue(listMatch[1]));
      continue;
    }
  }

  return result;
}

function parseValue(raw) {
  raw = raw.trim();
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  if (raw === '[]') return [];
  if (raw === '{}') return {};
  if (/^\d+$/.test(raw)) return parseInt(raw);
  if (/^\d+\.\d+$/.test(raw)) return parseFloat(raw);
  // Remove quotes
  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    return raw.slice(1, -1);
  }
  return raw || '';
}

// ---- Compilers ----

function compileJsonLd(frontmatter, body, filePath) {
  const articleId = frontmatter.id || basename(filePath, '.md');
  
  return {
    "@context": "https://schema.org",
    "@type": frontmatter.schema_type || "Article",
    "@id": `https://anchorfact.org/kb/${articleId}`,
    "headline": frontmatter.title,
    "description": extractTldr(body),
    "dateCreated": frontmatter.created || new Date().toISOString(),
    "dateModified": frontmatter.updated || new Date().toISOString(),
    "author": { "@type": "Organization", "name": "AnchorFact" },
    "publisher": { "@type": "Organization", "name": "AnchorFact", "url": "https://anchorfact.org" },
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "anchorfact:confidence": frontmatter.confidence,
    "anchorfact:generationMethod": frontmatter.generation_method,
    "citation": (frontmatter.primary_sources || []).map(s => ({
      "@type": "CreativeWork",
      "name": s.title,
      "author": s.authors?.join(", "),
      "sameAs": s.url || `https://doi.org/${s.doi}`
    }))
  };
}

function compileAtomicFacts(frontmatter) {
  return (frontmatter.atomic_facts || []).map(fact => ({
    "@context": "https://schema.org",
    "@type": "Claim",
    "@id": `https://anchorfact.org/fact/${fact.id}`,
    "text": fact.statement,
    "anchorfact:confidence": fact.confidence,
    "citation": fact.source_doi ? {
      "@type": "CreativeWork",
      "sameAs": `https://doi.org/${fact.source_doi}`
    } : fact.source_url ? {
      "@type": "CreativeWork",
      "sameAs": fact.source_url
    } : undefined
  }));
}

function compilePlainText(frontmatter, body) {
  return `# ${frontmatter.title}
Confidence: ${frontmatter.confidence}
Last verified: ${frontmatter.last_verified}
Generation: ${frontmatter.generation_method}

${body}
`;
}

function compileTurtle(frontmatter, body, filePath) {
  const articleId = frontmatter.id || basename(filePath, '.md');
  const lines = [];
  
  lines.push(`@prefix schema: <https://schema.org/> .`);
  lines.push(`@prefix af: <https://anchorfact.org/ns#> .`);
  lines.push(``);
  lines.push(`<https://anchorfact.org/kb/${articleId}>`);
  lines.push(`  a schema:${frontmatter.schema_type || "Article"} ;`);
  lines.push(`  schema:headline "${escapeTurtle(frontmatter.title)}" ;`);
  lines.push(`  af:confidence "${frontmatter.confidence}" ;`);
  lines.push(`  af:generationMethod "${frontmatter.generation_method}" .`);
  
  if (frontmatter.primary_sources) {
    frontmatter.primary_sources.forEach((s, i) => {
      lines.push(``);
      lines.push(`<https://anchorfact.org/kb/${articleId}>`);
      lines.push(`  schema:citation <${s.url || `https://doi.org/${s.doi}`}> .`);
    });
  }
  
  return lines.join('\n');
}

// ---- Helpers ----

function extractTldr(body) {
  // Find the TL;DR section and return the first substantive line after it
  const tldrSection = body.match(/## TL;DR\s*\n+([^\n]+(?:\n[^\n#]+)*)/);
  if (tldrSection) return tldrSection[1].trim().split('\n')[0];
  // Fallback: first paragraph after the frontmatter
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
  
  // 1. JSON-LD
  const jsonLd = compileJsonLd(frontmatter, body, mdPath);
  writeFileSync(join(outDir, 'index.json'), JSON.stringify(jsonLd, null, 2));
  
  // 2. Atomic Facts (JSON-LD fragments)
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
  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>${frontmatter.title} — AnchorFact</title></head>
<body><article>${body.replace(/\n/g, '<br>\n')}</article></body>
</html>`;
  writeFileSync(join(outDir, 'index.html'), html);
  
  console.log(`✅ Compiled: ${mdPath} → ${outDir}/ (6 formats)`);
  return { articleId, ...jsonLd };
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

console.log(`🔨 AnchorFact Compiler POC`);
console.log(`   Content: ${contentDir}`);
console.log(`   Output:  ${distDir}`);
console.log('');

const start = performance.now();
const results = compileAll(contentDir, distDir);
const elapsed = (performance.now() - start).toFixed(0);

console.log('');
console.log(`📦 Compiled ${results.length} articles in ${elapsed}ms`);

// Emit manifest
const manifest = {
  generated: new Date().toISOString(),
  articles: results.length,
  ids: results.map(r => r['@id']),
  compiler_version: 'poc-0.1.0'
};
writeFileSync(join(distDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

// Generate root index.html
const articleLinks = results.map(r => {
  const id = r['@id'].split('/').pop();
  return `<a href="/${id}/">${r.headline || id}</a> (HTML) · <a href="/${id}/index.json">JSON-LD</a> · <a href="/${id}/index.txt">TXT</a> · <a href="/${id}/index.ttl">TTL</a>`;
}).join('<br>\n    ');

const rootHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AnchorFact — Anchor AI to Facts</title>
  <meta name="description" content="AnchorFact: AI-native knowledge base for LLM citations. Structured, verified, GEO-optimized.">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://anchorfact.org",
    "name": "AnchorFact",
    "url": "https://anchorfact.org",
    "description": "AI-native knowledge base for LLM citations.",
    "publisher": { "@type": "Organization", "name": "AnchorFact" }
  }
  </script>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 680px; margin: 80px auto; padding: 0 20px; color: #1E293B; line-height: 1.6; }
    h1 { color: #2563EB; font-size: 2rem; margin-bottom: 0.25em; }
    p.tagline { color: #64748B; font-size: 1.1rem; margin-bottom: 2em; }
    .link-row { margin: 8px 0; }
    .link-row a { color: #2563EB; text-decoration: none; }
    code { background: #F1F5F9; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
    .card { border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px 20px; margin: 12px 0; }
    .footer { color: #94A3B8; font-size: 0.85rem; margin-top: 3em; }
  </style>
</head>
<body>
  <h1>AnchorFact</h1>
  <p class="tagline">Anchor AI to Facts.</p>
  <p>An <strong>AI-native knowledge base</strong> for LLM citations. Every article is structured, source-verified, and GEO-optimized.</p>
  <div class="card">
    <strong>For AIs</strong><br>
    <a href="/llms.txt">llms.txt</a> — site map for LLM crawlers
  </div>
  <div class="card">
    <strong>Knowledge Base (${results.length} articles)</strong><br>
    ${articleLinks}
  </div>
  <div class="card">
    <strong>Project</strong><br>
    <a href="https://github.com/anchorfact/anchorfact">GitHub</a> ·
    <a href="https://github.com/anchorfact/anchorfact/blob/main/GOVERNANCE.md">Governance</a> ·
    <a href="https://github.com/anchorfact/anchorfact/blob/main/CONTRIBUTING.md">Contribute</a>
  </div>
  <p class="footer">Content: CC-BY 4.0 · Code: MIT · Values: Truthfulness · Fairness · Openness · Impartiality</p>
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

> AnchorFact is an AI-native knowledge base purpose-built for LLM citations. Every article is structured, source-verified, and GEO-optimized. Content is available in multiple formats (Markdown, JSON-LD, plain text, Turtle/RDF) for maximal AI accessibility.

## Knowledge Base (${results.length} articles)

${llmsTxtEntries}

## API

- [Manifest](https://anchorfact.org/manifest.json): Full article index with metadata
- [JSON-LD endpoint](https://anchorfact.org/kb-2026-00001/index.json): Example structured data (Schema.org TechArticle)
- [Turtle endpoint](https://anchorfact.org/kb-2026-00001/index.ttl): Example RDF knowledge graph data

## Optional

- [GitHub Repository](https://github.com/anchorfact/anchorfact): Source code, governance, and contribution guide
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
