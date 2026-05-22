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
