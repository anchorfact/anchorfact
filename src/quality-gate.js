#!/usr/bin/env node
/**
 * AnchorFact quality gate.
 *
 * Draft content is allowed to exist. The gate fails only when:
 * - canonical slugs collide
 * - an explicit published article cannot qualify for public entrypoints
 * - confidence logic ever emits high confidence from estimated sources
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';
import { computeConfidence } from './lib/confidence.js';
import {
  evaluateArticleQuality,
  findDuplicateCanonicalSlugs,
  normalizePath
} from './lib/article-quality.js';

function splitFrontmatter(mdContent) {
  const lines = mdContent.split('\n');
  if (lines[0]?.trim() !== '---') return { frontmatter: {}, body: mdContent };

  const endIndex = lines.slice(1).findIndex(line => line.trim() === '---');
  if (endIndex === -1) return { frontmatter: {}, body: mdContent };

  try {
    return {
      frontmatter: load(lines.slice(1, endIndex + 1).join('\n')) || {},
      body: lines.slice(endIndex + 2).join('\n')
    };
  } catch (error) {
    return { frontmatter: { _yaml_error: error.message }, body: mdContent };
  }
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

function loadVerificationMap(reportPath) {
  if (!existsSync(reportPath)) return new Map();
  const report = JSON.parse(readFileSync(reportPath, 'utf-8'));
  const map = new Map();
  for (const article of report.articles || []) {
    map.set(normalizePath(article.file), article);
  }
  return map;
}

function analyze(contentDir, reportPath) {
  const verificationMap = loadVerificationMap(reportPath);
  const records = [];

  for (const filePath of walkMarkdown(contentDir)) {
    const mdContent = readFileSync(filePath, 'utf-8');
    const { frontmatter, body } = splitFrontmatter(mdContent);
    const verificationData = verificationMap.get(normalizePath(filePath)) || null;
    const confidence = computeConfidence(frontmatter.primary_sources || [], frontmatter, verificationData);
    const quality = evaluateArticleQuality({
      frontmatter,
      body,
      filePath,
      contentDir,
      verificationData,
      confidence
    });

    records.push({
      file: normalizePath(filePath),
      frontmatter,
      confidence,
      canonicalSlug: quality.canonicalSlug,
      quality
    });
  }

  return records;
}

function failuresFor(records) {
  const failures = [];
  const duplicates = findDuplicateCanonicalSlugs(records);

  for (const duplicate of duplicates) {
    failures.push(`duplicate canonical slug "${duplicate.slug}": ${duplicate.entries.map(entry => entry.file).join(', ')}`);
  }

  for (const record of records) {
    if (record.confidence.inputs?.based_on === 'estimated' && record.confidence.level === 'high') {
      failures.push(`${record.file}: estimated confidence must not be high`);
    }

    if (record.frontmatter.status === 'published' && !record.quality.publicEligible) {
      failures.push(`${record.file}: status=published but not public eligible (${record.quality.qualityReasons.join(', ')})`);
    }
  }

  return failures;
}

const contentDir = process.argv[2] || join(process.cwd(), 'content');
const reportPath = process.argv[3] || join(process.cwd(), 'verification-report.json');

if (!existsSync(contentDir)) {
  console.error(`Content directory not found: ${contentDir}`);
  process.exit(1);
}

const records = analyze(contentDir, reportPath);
const failures = failuresFor(records);
const publicCount = records.filter(record => record.quality.publicEligible).length;
const draftCount = records.length - publicCount;

console.log(`AnchorFact quality gate`);
console.log(`  Articles: ${records.length}`);
console.log(`  Public eligible: ${publicCount}`);
console.log(`  Draft: ${draftCount}`);
console.log(`  Verification report: ${existsSync(reportPath) ? reportPath : '(not found)'}`);

if (failures.length > 0) {
  console.error('\nQuality gate failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Quality gate passed');
