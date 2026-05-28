#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { pathToFileURL } from 'url';
import { classifySourceTier } from '../src/lib/confidence.js';
import { buildAuditRows, loadAuditData } from './audit-public-sample.js';

const DEFAULT_STALE_PATTERNS = [
  /EXPECTED_PUBLIC_ARTICLES=(?!555\b)\d+/,
  /EXPECTED_DRAFT_ARTICLES=(?!445\b)\d+/,
  /EXPECTED_CLAIMS=(?!1685\b)\d+/,
  /\b(?!555\b)\d+\s+public\s*\/\s*(?!445\b)\d+\s+draft\s*\/\s*(?!1685\b)\d+\s+claims/i,
  /\b573 public\b/i,
  /\b554 public\b/i,
  /\b446 draft\b/i,
  /\b1603 claims\b/i,
  /\b1683 claims\b/i,
  /\b1715 claims\b/i
];

const FATAL_DRAFT_REASONS = new Set([
  'explicit_draft',
  'estimated_confidence',
  'missing_primary_sources',
  'no_verified_sources',
  'placeholder_content',
  'verification_count_mismatch',
  'yaml_field_damage'
]);

function increment(map, key, amount = 1) {
  const normalized = key || 'unknown';
  map[normalized] = (map[normalized] || 0) + amount;
}

function topEntries(map, limit = 20) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
}

function coverageBucket(article) {
  const total = Number(article.sources_total || 0);
  const verified = Number(article.sources_verified || 0);
  if (verified <= 0) return 'zero';
  if (total > 0 && verified >= total) return 'full';
  return 'partial';
}

function sortedObject(value) {
  return Object.fromEntries(Object.entries(value).sort((a, b) => a[0].localeCompare(b[0])));
}

function scanStaleDocs(root, patterns = DEFAULT_STALE_PATTERNS) {
  const targets = ['README.md', 'docs'];
  const stale = [];

  function scanFile(path) {
    if (!existsSync(path) || statSync(path).isDirectory()) return;
    const relativePath = path.replace(root, '').replace(/^[/\\]/, '').replace(/\\/g, '/');
    if (/^docs\/PUBLIC_CONTENT_REPAIR_/.test(relativePath)) return;
    const text = readFileSync(path, 'utf-8');
    const matches = patterns.filter(pattern => pattern.test(text)).map(pattern => pattern.source);
    if (matches.length > 0) {
      stale.push({ path: relativePath, matches });
    }
  }

  function walk(path) {
    if (!existsSync(path)) return;
    const stat = statSync(path);
    if (stat.isDirectory()) {
      for (const entry of readdirSync(path)) walk(join(path, entry));
    } else if (/\.(md|txt|ya?ml|json)$/i.test(path)) {
      scanFile(path);
    }
  }

  for (const target of targets) walk(join(root, target));
  return stale;
}

function publicRecommendationSummary(rows) {
  const recommendations = { keep_public: 0, downgrade_confidence: 0, repair_sources: 0, move_to_draft: 0 };
  for (const row of rows) {
    recommendations[row.recommendation] = (recommendations[row.recommendation] || 0) + 1;
  }
  return recommendations;
}

export function buildContentHealthReport(data, options = {}) {
  const manifest = data.manifest || {};
  const claimsPayload = data.claimsPayload || {};
  const claims = Array.isArray(claimsPayload) ? claimsPayload : (claimsPayload.claims || []);
  const publicRows = buildAuditRows(data);
  const recommendations = publicRecommendationSummary(publicRows);
  const contentBySlug = data.contentBySlug || new Map();
  const byStatus = {
    public: {
      articles: 0,
      confidence: {},
      categories: {},
      source_coverage: { full: 0, partial: 0, zero: 0 },
      source_tiers: {},
      source_types: {},
      quality_reasons: {},
      atomic_facts: 0,
      mapped_atomic_facts: 0
    },
    draft: {
      articles: 0,
      confidence: {},
      categories: {},
      source_coverage: { full: 0, partial: 0, zero: 0 },
      source_tiers: {},
      source_types: {},
      quality_reasons: {},
      atomic_facts: 0,
      mapped_atomic_facts: 0
    }
  };
  const draftCandidates = [];

  for (const article of manifest.articles || []) {
    const status = article.status === 'public' && article.is_draft === false ? 'public' : 'draft';
    const bucket = byStatus[status];
    const content = contentBySlug.get(article.canonical_slug) || { frontmatter: {} };
    const frontmatter = content.frontmatter || {};
    const category = frontmatter.category || String(article.canonical_slug || '').split('/')[0] || 'unknown';
    const reasons = article.quality_reasons || [];
    const facts = frontmatter.atomic_facts || [];
    const sources = frontmatter.primary_sources || [];

    bucket.articles++;
    increment(bucket.confidence, article.confidence_level || 'unknown');
    increment(bucket.categories, category);
    bucket.source_coverage[coverageBucket(article)]++;
    for (const reason of reasons) increment(bucket.quality_reasons, reason);
    for (const source of sources) {
      increment(bucket.source_types, String(source.type || 'missing').toLowerCase());
      increment(bucket.source_tiers, classifySourceTier(source));
    }
    bucket.atomic_facts += facts.length;
    bucket.mapped_atomic_facts += facts.filter(fact => fact.source_ref || fact.source_url || fact.source_doi || fact.source_title).length;

    if (status === 'draft' && !reasons.includes('placeholder_content')) {
      const fatalCount = reasons.filter(reason => FATAL_DRAFT_REASONS.has(reason)).length;
      draftCandidates.push({
        canonical_slug: article.canonical_slug,
        title: article.title,
        confidence_level: article.confidence_level,
        sources_verified: article.sources_verified,
        sources_total: article.sources_total,
        quality_reasons: reasons,
        repair_complexity: fatalCount
      });
    }
  }

  draftCandidates.sort((a, b) =>
    a.repair_complexity - b.repair_complexity ||
    (b.sources_total || 0) - (a.sources_total || 0) ||
    a.canonical_slug.localeCompare(b.canonical_slug)
  );

  return {
    generated: options.generatedAt || new Date().toISOString(),
    snapshot: {
      articles: manifest.article_count || (manifest.articles || []).length,
      public: manifest.public_article_count || byStatus.public.articles,
      draft: manifest.draft_article_count || byStatus.draft.articles,
      claims: manifest.claim_count || claims.length,
      verification_report: manifest.verification_report || null
    },
    public_audit: {
      rows: publicRows.length,
      recommendations,
      actionable_count: publicRows.filter(row => row.recommendation !== 'keep_public').length,
      actionable: publicRows
        .filter(row => row.recommendation !== 'keep_public')
        .map(row => ({ canonical_slug: row.canonical_slug, recommendation: row.recommendation }))
    },
    public: {
      ...byStatus.public,
      confidence: sortedObject(byStatus.public.confidence),
      categories: topEntries(byStatus.public.categories, 30),
      source_tiers: sortedObject(byStatus.public.source_tiers),
      source_types: topEntries(byStatus.public.source_types, 30),
      quality_reasons: topEntries(byStatus.public.quality_reasons, 20)
    },
    draft: {
      ...byStatus.draft,
      confidence: sortedObject(byStatus.draft.confidence),
      categories: topEntries(byStatus.draft.categories, 30),
      source_tiers: sortedObject(byStatus.draft.source_tiers),
      source_types: topEntries(byStatus.draft.source_types, 30),
      quality_reasons: topEntries(byStatus.draft.quality_reasons, 20),
      repair_candidates: draftCandidates.slice(0, options.candidateLimit || 25)
    },
    stale_docs: scanStaleDocs(options.root || process.cwd())
  };
}

function listEntries(entries) {
  if (!entries || entries.length === 0) return '- none';
  return entries.map(entry => `- ${entry.name}: ${entry.count}`).join('\n');
}

function coverageText(coverage) {
  return `full=${coverage.full}, partial=${coverage.partial}, zero=${coverage.zero}`;
}

export function renderContentHealthReport(report) {
  const staleDocs = report.stale_docs.length
    ? report.stale_docs.map(item => `- ${item.path}`).join('\n')
    : '- none';
  const candidates = report.draft.repair_candidates.length
    ? report.draft.repair_candidates
      .map(item => `- ${item.canonical_slug}: ${item.sources_verified || 0}/${item.sources_total || 0} sources, reasons=${item.quality_reasons.join(', ') || 'none'}`)
      .join('\n')
    : '- none';

  return `# AnchorFact Content Health - ${report.generated.slice(0, 10)}

Generated: ${report.generated}

Snapshot: ${report.snapshot.public} public / ${report.snapshot.draft} draft / ${report.snapshot.claims} claims.

## Public Audit

- rows: ${report.public_audit.rows}
- keep_public: ${report.public_audit.recommendations.keep_public || 0}
- downgrade_confidence: ${report.public_audit.recommendations.downgrade_confidence || 0}
- repair_sources: ${report.public_audit.recommendations.repair_sources || 0}
- move_to_draft: ${report.public_audit.recommendations.move_to_draft || 0}
- actionable: ${report.public_audit.actionable_count}

## Public Content

- confidence: ${JSON.stringify(report.public.confidence)}
- source coverage: ${coverageText(report.public.source_coverage)}
- source tiers: ${JSON.stringify(report.public.source_tiers)}
- atomic facts mapped: ${report.public.mapped_atomic_facts}/${report.public.atomic_facts}

Top public categories:
${listEntries(report.public.categories.slice(0, 12))}

Top public source types:
${listEntries(report.public.source_types.slice(0, 12))}

## Draft Content

- confidence: ${JSON.stringify(report.draft.confidence)}
- source coverage: ${coverageText(report.draft.source_coverage)}
- source tiers: ${JSON.stringify(report.draft.source_tiers)}
- atomic facts mapped: ${report.draft.mapped_atomic_facts}/${report.draft.atomic_facts}

Top draft reasons:
${listEntries(report.draft.quality_reasons.slice(0, 12))}

Draft repair candidates:
${candidates}

## Stale Docs

${staleDocs}
`;
}

function parseArgs(argv) {
  const args = { root: process.cwd(), json: false, write: null };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--root') args.root = argv[++i];
    else if (arg === '--json') args.json = true;
    else if (arg === '--write') args.write = argv[++i] || 'docs/CONTENT_HEALTH_REPORT.md';
  }
  return args;
}

export function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const root = resolve(args.root);
  const data = loadAuditData({ root });
  const report = buildContentHealthReport(data, { root });
  const output = args.json ? JSON.stringify(report, null, 2) : renderContentHealthReport(report);

  if (args.write) {
    const outputPath = resolve(root, args.write);
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, output);
    console.log(`Wrote content health report to ${outputPath}`);
  } else {
    console.log(output);
  }

  return report;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
