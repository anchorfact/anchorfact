#!/usr/bin/env node
/**
 * AnchorFact Markdown -> JSON-LD Compiler v0.3
 *
 * Trust-first compiler:
 * - stable path-derived canonical slugs
 * - public vs draft quality model
 * - public-only llms.txt and sitemap.xml
 * - root claims.json for verified public atomic facts
 */

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync
} from 'fs';
import { join } from 'path';
import { computeConfidence } from './lib/confidence.js';
import { evaluateArticleQuality, normalizePath } from './lib/article-quality.js';
import { splitFrontmatter } from './lib/frontmatter.js';
import {
  compileAtomicFacts,
  compileJsonLd,
  compilePlainText,
  compileTurtle
} from './lib/compiler-records.js';
import { compileHtml } from './lib/html.js';
import { writeStaticOutputs } from './lib/compiler-output.js';

let verificationMap = null;
let verificationTimestamp = null;

function loadVerificationReport(reportPath) {
  if (!existsSync(reportPath)) {
    console.warn('verification-report.json not found; all articles will be treated as estimated/draft.');
    verificationMap = new Map();
    return;
  }

  try {
    const report = JSON.parse(readFileSync(reportPath, 'utf-8'));
    verificationMap = new Map();
    for (const article of report.articles || []) {
      verificationMap.set(normalizePath(article.file), article);
    }
    verificationTimestamp = report.summary?.generated || null;
    console.log(`Loaded verification report: ${verificationMap.size} articles`);
  } catch (error) {
    console.warn(`Could not load verification report: ${error.message}`);
    verificationMap = new Map();
  }
}

function lookupVerificationData(filePath) {
  if (!verificationMap) return null;
  return verificationMap.get(normalizePath(filePath)) || null;
}

function compileFile(mdPath, contentDir, distDir) {
  const mdContent = readFileSync(mdPath, 'utf-8');
  const { frontmatter, body } = splitFrontmatter(mdContent);

  if (!frontmatter.id && !frontmatter.title) {
    console.warn(`Skipping ${mdPath}: no frontmatter found`);
    return null;
  }

  const verificationData = lookupVerificationData(mdPath);
  const confidence = computeConfidence(frontmatter.primary_sources || [], frontmatter, verificationData);
  const quality = evaluateArticleQuality({
    frontmatter,
    body,
    filePath: mdPath,
    contentDir,
    verificationData,
    confidence
  });

  const outDir = join(distDir, ...quality.canonicalSlug.split('/'));
  mkdirSync(outDir, { recursive: true });

  const jsonLd = compileJsonLd(frontmatter, body, quality, confidence, verificationData, verificationTimestamp);
  const atomicFacts = compileAtomicFacts(frontmatter, quality);

  writeFileSync(join(outDir, 'index.json'), JSON.stringify(jsonLd, null, 2));
  writeFileSync(join(outDir, 'index.txt'), compilePlainText(frontmatter, body, quality, confidence));
  writeFileSync(join(outDir, 'index.ttl'), compileTurtle(frontmatter, quality, confidence));
  writeFileSync(join(outDir, 'index.md'), mdContent);
  writeFileSync(join(outDir, 'index.html'), compileHtml(frontmatter, body, quality, confidence, jsonLd));
  if (atomicFacts.length > 0) {
    writeFileSync(join(outDir, 'facts.json'), JSON.stringify(atomicFacts, null, 2));
  }

  console.log(`${quality.publicEligible ? 'P' : 'D'} ${mdPath} -> ${quality.canonicalSlug} (${confidence.level}/${confidence.score}, ${confidence.inputs.based_on})`);
  return {
    articleId: quality.canonicalSlug,
    file: normalizePath(mdPath),
    ...jsonLd,
    _quality: quality,
    _confidence: confidence,
    _verificationData: verificationData,
    _atomicFacts: atomicFacts
  };
}

function walkMarkdown(contentDir) {
  const files = [];

  function walk(dir) {
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry);
      if (statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (entry.endsWith('.md') && !entry.startsWith('_')) {
        files.push(fullPath);
      }
    }
  }

  walk(contentDir);
  return files;
}

function compileAll(contentDir, distDir, verificationReportPath) {
  const reportPath = verificationReportPath || join(process.cwd(), 'verification-report.json');
  loadVerificationReport(reportPath);

  if (!existsSync(contentDir)) {
    console.error(`Content directory not found: ${contentDir}`);
    process.exit(1);
  }

  rmSync(distDir, { recursive: true, force: true });
  mkdirSync(distDir, { recursive: true });

  return walkMarkdown(contentDir)
    .map(file => compileFile(file, contentDir, distDir))
    .filter(Boolean);
}

const contentDir = process.argv[2] || join(process.cwd(), 'content');
const distDir = process.argv[3] || join(process.cwd(), 'dist');
const verificationReportPath = process.argv[4] || join(process.cwd(), 'verification-report.json');

console.log('AnchorFact Compiler v0.3.0');
console.log(`  Content: ${contentDir}`);
console.log(`  Output:  ${distDir}`);
console.log(`  Verify:  ${existsSync(verificationReportPath) ? verificationReportPath : '(not found)'}`);

const start = performance.now();
const results = compileAll(contentDir, distDir, verificationReportPath);
writeStaticOutputs(distDir, results, {
  verificationTimestamp,
  verificationCount: verificationMap?.size || 0
});
const elapsed = (performance.now() - start).toFixed(0);

const publicCount = results.filter(result => result._quality.publicEligible).length;
const draftCount = results.length - publicCount;
console.log(`Compiled ${results.length} articles in ${elapsed}ms`);
console.log(`Public=${publicCount} Draft=${draftCount}`);
