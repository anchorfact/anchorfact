#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { pathToFileURL } from 'url';
import { classifySourceTier } from '../src/lib/confidence.js';
import {
  autoRepairExclusionReasons,
  compareDraftRepairCandidates,
  draftRepairPriorityMetadata,
  repairComplexity,
  strictReviewReasons
} from '../src/lib/draft-repair-policy.js';
import { buildProjectReadiness } from '../src/lib/project-readiness.js';
import { buildAuditRows, loadAuditData } from './audit-public-sample.js';

const DEFAULT_STALE_PATTERNS = [
  /EXPECTED_PUBLIC_ARTICLES=(?!1253\b)\d+/,
  /EXPECTED_DRAFT_ARTICLES=(?!300\b)\d+/,
  /EXPECTED_CLAIMS=(?!3919\b)\d+/,
  /\b(?!1253\b)\d+\s+public\s*\/\s*(?!300\b)\d+\s+draft\s*\/\s*(?!3919\b)\d+\s+claims/i,
  /\b1549 articles\b/i,
  /\b1249 public\b/i,
  /\b3907 claims\b/i,
  /\b3071 public sources\b/i,
  /\b1543 articles\b/i,
  /\b1243 public\b/i,
  /\b3889 claims\b/i,
  /\b3062 public sources\b/i,
  /\b1535 articles\b/i,
  /\b1235 public\b/i,
  /\b3865 claims\b/i,
  /\b3040 public sources\b/i,
  /\b1529 articles\b/i,
  /\b1229 public\b/i,
  /\b3847 claims\b/i,
  /\b3029 public sources\b/i,
  /\b1223 public\b/i,
  /\b3829 claims\b/i,
  /\b1217 public\b/i,
  /\b3811 claims\b/i,
  /\b1202 public\b/i,
  /\b3766 claims\b/i,
  /\b1194 public\b/i,
  /\b3742 claims\b/i,
  /\b690 public\b/i,
  /\b2205 claims\b/i,
  /\b688 public\b/i,
  /\b312 draft\b/i,
  /\b2201 claims\b/i,
  /\b683 public\b/i,
  /\b317 draft\b/i,
  /\b2176 claims\b/i,
  /\b678 public\b/i,
  /\b322 draft\b/i,
  /\b2152 claims\b/i,
  /\b673 public\b/i,
  /\b327 draft\b/i,
  /\b2127 claims\b/i,
  /\b668 public\b/i,
  /\b332 draft\b/i,
  /\b2102 claims\b/i,
  /\b663 public\b/i,
  /\b337 draft\b/i,
  /\b2077 claims\b/i,
  /\b658 public\b/i,
  /\b342 draft\b/i,
  /\b2052 claims\b/i,
  /\b653 public\b/i,
  /\b347 draft\b/i,
  /\b2027 claims\b/i,
  /\b648 public\b/i,
  /\b352 draft\b/i,
  /\b2001 claims\b/i,
  /\b643 public\b/i,
  /\b357 draft\b/i,
  /\b1984 claims\b/i,
  /\b638 public\b/i,
  /\b362 draft\b/i,
  /\b1966 claims\b/i,
  /\b633 public\b/i,
  /\b367 draft\b/i,
  /\b1948 claims\b/i,
  /\b630 public\b/i,
  /\b370 draft\b/i,
  /\b1933 claims\b/i,
  /\b629 public\b/i,
  /\b371 draft\b/i,
  /\b1931 claims\b/i,
  /\b628 public\b/i,
  /\b372 draft\b/i,
  /\b1929 claims\b/i,
  /\b625 public\b/i,
  /\b375 draft\b/i,
  /\b1920 claims\b/i,
  /\b622 public\b/i,
  /\b378 draft\b/i,
  /\b1911 claims\b/i,
  /\b619 public\b/i,
  /\b381 draft\b/i,
  /\b1902 claims\b/i,
  /\b616 public\b/i,
  /\b384 draft\b/i,
  /\b1893 claims\b/i,
  /\b613 public\b/i,
  /\b387 draft\b/i,
  /\b1884 claims\b/i,
  /\b610 public\b/i,
  /\b390 draft\b/i,
  /\b1875 claims\b/i,
  /\b607 public\b/i,
  /\b393 draft\b/i,
  /\b1866 claims\b/i,
  /\b602 public\b/i,
  /\b398 draft\b/i,
  /\b1850 claims\b/i,
  /\b599 public\b/i,
  /\b401 draft\b/i,
  /\b1841 claims\b/i,
  /\b1840 claims\b/i,
  /\b596 public\b/i,
  /\b404 draft\b/i,
  /\b1830 claims\b/i,
  /\b593 public\b/i,
  /\b407 draft\b/i,
  /\b1820 claims\b/i,
  /\b591 public\b/i,
  /\b409 draft\b/i,
  /\b1814 claims\b/i,
  /\b588 public\b/i,
  /\b412 draft\b/i,
  /\b1804 claims\b/i,
  /\b583 public\b/i,
  /\b417 draft\b/i,
  /\b1784 claims\b/i,
  /\b558 public\b/i,
  /\b442 draft\b/i,
  /\b1695 claims\b/i,
  /\b555 public\b/i,
  /\b445 draft\b/i,
  /\b1685 claims\b/i,
  /\b563 public\b/i,
  /\b437 draft\b/i,
  /\b1714 claims\b/i,
  /\b568 public\b/i,
  /\b432 draft\b/i,
  /\b1731 claims\b/i,
  /\b573 public\b/i,
  /\b427 draft\b/i,
  /\b1747 claims\b/i,
  /\b578 public\b/i,
  /\b422 draft\b/i,
  /\b1764 claims\b/i,
  /\b554 public\b/i,
  /\b446 draft\b/i,
  /\b1603 claims\b/i,
  /\b1683 claims\b/i,
  /\b1715 claims\b/i
];

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
  const draftStrictReviewCandidates = [];
  let draftExcludedCount = 0;
  const draftExclusionReasons = {};
  const draftStrictReviewReasons = {};

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

    if (status === 'draft') {
      const exclusionReasons = autoRepairExclusionReasons(reasons);
      if (exclusionReasons.length > 0) {
        draftExcludedCount++;
        for (const reason of exclusionReasons) increment(draftExclusionReasons, reason);
        continue;
      }
      const strictReasons = strictReviewReasons(article);
      const candidate = {
        canonical_slug: article.canonical_slug,
        title: article.title,
        confidence_level: article.confidence_level,
        sources_verified: article.sources_verified,
        sources_total: article.sources_total,
        quality_reasons: reasons,
        repair_complexity: repairComplexity(reasons),
        ...draftRepairPriorityMetadata(article)
      };
      if (strictReasons.length > 0) {
        draftStrictReviewCandidates.push({
          ...candidate,
          strict_review_reasons: strictReasons
        });
        for (const reason of strictReasons) increment(draftStrictReviewReasons, reason);
        continue;
      }
      draftCandidates.push(candidate);
    }
  }

  draftCandidates.sort(compareDraftRepairCandidates);
  draftStrictReviewCandidates.sort(compareDraftRepairCandidates);
  const staleDocs = scanStaleDocs(options.root || process.cwd());
  const publicClaimMapping = {
    total: byStatus.public.atomic_facts,
    mapped: byStatus.public.mapped_atomic_facts,
    ratio: byStatus.public.atomic_facts
      ? Number((byStatus.public.mapped_atomic_facts / byStatus.public.atomic_facts).toFixed(4))
      : 1
  };

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
    project_readiness: buildProjectReadiness({
      publicArticles: byStatus.public.articles,
      publicAuditActionableCount: publicRows.filter(row => row.recommendation !== 'keep_public').length,
      publicSourceCoverage: byStatus.public.source_coverage,
      publicClaimMapping,
      publicLowConfidenceCount: byStatus.public.confidence.low || 0,
      staleDocsCount: staleDocs.length,
      draftRepairCandidateCount: draftCandidates.length,
      draftRepairExcludedCount: draftExcludedCount
    }),
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
      repair_candidate_count: draftCandidates.length,
      repair_excluded_count: draftExcludedCount,
      strict_review_candidate_count: draftStrictReviewCandidates.length,
      repair_exclusion_reasons: topEntries(draftExclusionReasons, 30),
      strict_review_reasons: topEntries(draftStrictReviewReasons, 30),
      repair_candidates: draftCandidates.slice(0, options.candidateLimit || 25),
      strict_review_candidates: draftStrictReviewCandidates.slice(0, options.candidateLimit || 25)
    },
    stale_docs: staleDocs
  };
}

function listEntries(entries) {
  if (!entries || entries.length === 0) return '- none';
  return entries.map(entry => `- ${entry.name}: ${entry.count}`).join('\n');
}

function coverageText(coverage) {
  return `full=${coverage.full}, partial=${coverage.partial}, zero=${coverage.zero}`;
}

function actionList(actions = []) {
  if (actions.length === 0) return '- none';
  return actions.map(action => `- ${action.area}: ${action.action}`).join('\n');
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
  const strictReviewCandidates = (report.draft.strict_review_candidates || []).length
    ? report.draft.strict_review_candidates
      .map(item => `- ${item.canonical_slug}: strict_review=${(item.strict_review_reasons || []).join(', ') || 'unspecified'}, reasons=${item.quality_reasons.join(', ') || 'none'}`)
      .join('\n')
    : '- none';
  const exclusions = (report.draft.repair_exclusion_reasons || []).length
    ? listEntries(report.draft.repair_exclusion_reasons.slice(0, 12))
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

## Project Readiness

- score: ${report.project_readiness.score_100}/100 (${report.project_readiness.grade})
- next_focus: ${report.project_readiness.next_focus}
- blockers: ${report.project_readiness.blockers.length}

Next actions:
${actionList(report.project_readiness.next_actions)}

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
- automatic repair exclusions: ${report.draft.repair_excluded_count || 0}
- strict review candidates: ${report.draft.strict_review_candidate_count || 0}

Top draft reasons:
${listEntries(report.draft.quality_reasons.slice(0, 12))}

Draft repair candidates:
${candidates}

Draft strict-review candidates:
${strictReviewCandidates}

Draft repair exclusions:
${exclusions}

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
