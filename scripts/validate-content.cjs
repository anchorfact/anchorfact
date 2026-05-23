#!/usr/bin/env node
/**
 * AnchorFact Content Validator
 * 
 * Validates all Markdown articles in content/ against content standards.
 * Checks: Frontmatter completeness, structure, source validity, confidence rules.
 * 
 * Usage: node scripts/validate-content.cjs [--strict]
 * Exit: 0=pass, 1=warnings, 2=errors
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const STRICT = process.argv.includes('--strict');

const REQUIRED_FIELDS = [
  'id', 'title', 'schema_type', 'category', 'language',
  'confidence', 'last_verified', 'generation_method', 'primary_sources'
];

const VALID_CONFIDENCE = ['high', 'medium', 'low', 'disputed'];
const ID_PATTERN = /^kb-\w{2,6}-\d{3,5}$/;

// ── New: Classification aliases for cross-domain verification ──
const CLASSIFICATION_ALIASES = {
  'computer-science': ['cs', 'computer_science', 'compsci'],
  'game-development': ['gamedev', 'game_dev', 'game'],
  'self-improvement': ['self_improvement', 'selfhelp', 'productivity'],
};

// Banned source patterns (Wikipedia, non-original sources)
const BANNED_SOURCE_PATTERNS = [
  { field: 'url',   pattern: /wikipedia\.org/i, label: 'Wikipedia' },
  { field: 'title', pattern: /wikipedia/i,      label: 'Wikipedia' },
  { field: 'type',  pattern: /^wiki$/i,          label: 'Wiki type' },
];

// Freshness thresholds (months)
const STALE_WARN_MONTHS = 6;
const STALE_ERROR_MONTHS = 12;

const REQUIRED_SECTIONS = [
  { heading: /^##\s*TL[;]?DR/i, name: 'TL;DR' },
  { heading: /^##\s*Core Explanation/i, name: 'Core Explanation' },
  { heading: /^##\s*Detailed Analysis/i, name: 'Detailed Analysis' },
  { heading: /^##\s*Further Reading/i, name: 'Further Reading' },
];

// ─── Helpers ───────────────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return [null, 'No frontmatter found (expecting --- ... ---)'];
  
  // Normalize: fix "key:value" → "key: value" (common YAML formatting issue)
  // Also handles list items: "- key:value" → "- key: value"
  let yamlStr = match[1]
    .replace(/^(\s*[\w_-]+):(\S)/gm, '$1: $2')        // top-level keys
    .replace(/^(\s*-\s+\w[^:]*):(\S)/gm, '$1: $2');   // list item keys
  
  // Deduplicate keys: keep last occurrence (happens in batch-generated files)
  const seenKeys = new Set();
  const lines = yamlStr.split('\n');
  const deduped = [];
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    const keyMatch = line.match(/^(\s*)([\w_-]+):/);
    if (keyMatch) {
      const indent = keyMatch[1].length;
      const key = `${indent}:${keyMatch[2]}`;
      if (seenKeys.has(key)) continue; // skip duplicate
      seenKeys.add(key);
    }
    deduped.unshift(line);
  }
  yamlStr = deduped.join('\n');

  try {
    const fm = yaml.load(yamlStr);
    if (fm === null || typeof fm !== 'object') {
      return [null, 'Frontmatter is empty or not a YAML object'];
    }
    return [fm, null];
  } catch (e) {
    return [null, `YAML parse error: ${e.message}`];
  }
}

function getSources(fm) {
  const sources = fm.primary_sources;
  if (!sources) return [];
  if (!Array.isArray(sources)) return [{ raw: String(sources) }];
  return sources;
}

// ─── State ─────────────────────────────────────────────────────
const results = { errors: 0, warnings: 0, articles: [], byFile: {} };

function add(severity, file, msg) {
  results[severity]++;
  if (!results.byFile[file]) results.byFile[file] = { errors: [], warnings: [] };
  results.byFile[file][severity].push(msg);
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('_')) {
      walk(full);
    } else if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('_')) {
      validate(full);
    }
  }
}

function validate(filepath) {
  const rel = path.relative(CONTENT_DIR, filepath);
  const content = fs.readFileSync(filepath, 'utf-8');
  const [fm, err] = parseFrontmatter(content);

  if (!fm) {
    add('errors', rel, err);
    return;
  }

  // ── Required fields ──
  for (const field of REQUIRED_FIELDS) {
    if (fm[field] === undefined || fm[field] === null) {
      add('errors', rel, `Missing required field: "${field}"`);
    }
  }

  // ── Value validation ──
  if (fm.id && !ID_PATTERN.test(fm.id)) {
    add('errors', rel, `Invalid id: "${fm.id}" (expected kb-YYYY-XXXXX or kb-XX-XXX)`);
  }
  if (fm.confidence && !VALID_CONFIDENCE.includes(fm.confidence)) {
    add('errors', rel, `Invalid confidence: "${fm.confidence}"`);
  }

  // ── Sources ──
  const sources = getSources(fm);
  const minSources = STRICT ? 3 : 1;

  if (sources.length === 0) {
    add('errors', rel, 'No primary_sources');
  } else if (sources.length < minSources) {
    const label = STRICT ? 'golden seed' : 'minimum';
    add('errors', rel, `Only ${sources.length} source(s) (${label}: ${minSources})`);
  }

  for (let i = 0; i < sources.length; i++) {
    const src = sources[i];
    if (typeof src === 'string') continue;
    if (!src.title) add('errors', rel, `Source #${i + 1} missing title`);
    if (!src.url && !src.doi) add('warnings', rel, `Source #${i + 1} ("${src.title || '?'}") missing url/doi`);
  }

  // ── Structure (warnings only — many legacy articles predate standard) ──
  for (const { heading, name } of REQUIRED_SECTIONS) {
    if (!heading.test(content)) {
      add('warnings', rel, `Missing section: ## ${name}`);
    }
  }

  // ── Generation method check ──
  if (fm.generation_method === 'ai_generated') {
    add('errors', rel, 'ai_generated content is NOT allowed for publication');
  }
  if (!fm.generation_method) {
    add('errors', rel, 'generation_method must be explicitly labeled (human_only / ai_assisted / ai_generated_reviewed)');
  }

  // ── NEW: Classification correctness ──
  if (fm.category) {
    const dirName = rel.split(path.sep)[0].toLowerCase();
    const fmCat = fm.category.toLowerCase();
    const aliases = CLASSIFICATION_ALIASES[dirName] || [];
    const isMatch = fmCat === dirName || fmCat.startsWith(dirName + '/') || fmCat.startsWith(dirName + '-') || aliases.includes(fmCat);
    if (!isMatch) {
      add('warnings', rel, `Classification mismatch: category="${fm.category}" but file is under "${dirName}/"`);
    }
  }

  // ── NEW: Banned source detection (Wikipedia) ──
  const allSourcesToCheck = [
    ...(Array.isArray(fm.primary_sources) ? fm.primary_sources : []),
    ...(Array.isArray(fm.secondary_sources) ? fm.secondary_sources : []),
  ];
  for (const src of allSourcesToCheck) {
    if (typeof src !== 'object') continue;
    for (const { field, pattern, label } of BANNED_SOURCE_PATTERNS) {
      const val = src[field];
      if (typeof val === 'string' && pattern.test(val)) {
        add('errors', rel, `Banned source (${label}): "${val.substring(0, 80)}" — use original/primary sources instead`);
      }
    }
  }

  // ── NEW: Freshness check ──
  if (fm.last_verified) {
    const verifiedDate = new Date(fm.last_verified);
    if (!isNaN(verifiedDate.getTime())) {
      const monthsOld = (Date.now() - verifiedDate.getTime()) / (1000 * 60 * 60 * 24 * 30.4375);
      if (monthsOld > STALE_ERROR_MONTHS) {
        add('errors', rel, `Content stale: last_verified is ${monthsOld.toFixed(0)} months ago (threshold: ${STALE_ERROR_MONTHS} months)`);
      } else if (monthsOld > STALE_WARN_MONTHS) {
        add('warnings', rel, `Content aging: last_verified is ${monthsOld.toFixed(0)} months ago (consider reviewing)`);
      }
    }
  }

  // ── NEW: Source verifiability (URL/DOI coverage) ──
  const primaryWithUrl = sources.filter(s => typeof s === 'object' && (s.url || s.doi)).length;
  if (sources.length > 0 && primaryWithUrl === 0) {
    add('errors', rel, 'No primary sources have URL or DOI — source unverifiable');
  } else if (sources.length > 0 && primaryWithUrl < sources.length) {
    add('warnings', rel, `Only ${primaryWithUrl}/${sources.length} primary sources have URL/DOI`);
  }

  results.articles.push({
    file: rel,
    id: fm.id || 'MISSING',
    confidence: fm.confidence || 'MISSING',
    method: fm.generation_method || 'MISSING',
    sources: sources.length,
  });
}

// ── Main ───────────────────────────────────────────────────────
console.log(`AnchorFact Content Validator ${STRICT ? '(strict/golden-seed)' : '(standard)'}\n`);

if (!fs.existsSync(CONTENT_DIR)) {
  console.error(`Content dir not found: ${CONTENT_DIR}`);
  process.exit(2);
}

walk(CONTENT_DIR);
const total = results.articles.length;

console.log(`Scanned: ${total} articles  |  Errors: ${results.errors}  |  Warnings: ${results.warnings}\n`);

// ── Report ──
if (results.errors > 0) {
  console.log('── Errors ──');
  for (const [file, entry] of Object.entries(results.byFile)) {
    if (entry.errors.length === 0) continue;
    console.log(`\n  ${file}`);
    for (const e of entry.errors) console.log(`    ✗ ${e}`);
  }
  console.log('');
}

if (results.warnings > 0) {
  console.log('── Warnings ──');
  for (const [file, entry] of Object.entries(results.byFile)) {
    if (entry.warnings.length === 0) continue;
    console.log(`\n  ${file}`);
    for (const w of entry.warnings) console.log(`    ⚠ ${w}`);
  }
  console.log('');
}

// ── Distribution ──
const conf = {}, gen = {};
for (const a of results.articles) {
  conf[a.confidence] = (conf[a.confidence] || 0) + 1;
  gen[a.method] = (gen[a.method] || 0) + 1;
}
console.log(`Confidence:   ${Object.entries(conf).map(([k,v]) => `${k}:${v}`).join('  ')}`);
console.log(`Gen Method:   ${Object.entries(gen).map(([k,v]) => `${k}:${v}`).join('  ')}\n`);

const passRate = total > 0 ? (total - results.errors) / total : 0;
if (results.errors > 0 && passRate < 0.9) {
  console.log(`FAILED: ${results.errors} error(s), pass rate ${(passRate*100).toFixed(1)}% (< 90%)`);
  process.exit(2);
} else if (results.errors > 0) {
  console.log(`WARNING: ${results.errors} error(s), pass rate ${(passRate*100).toFixed(1)}% (>= 90%) — not blocking`);
  process.exit(1);
} else if (results.warnings > 0) {
  console.log(`PASSED with ${results.warnings} warning(s)`);
  process.exit(0);
} else {
  console.log('ALL CHECKS PASSED');
  process.exit(0);
}
