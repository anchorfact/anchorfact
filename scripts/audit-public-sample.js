#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { pathToFileURL } from 'url';
import { load as loadYaml } from 'js-yaml';

const DEFAULT_OUTPUT = 'docs/PUBLIC_CONTENT_AUDIT_2026-05-27.md';
const SAMPLE_SIZE = 20;
const BUCKETS = [
  ['low_verified_coverage', 8],
  ['high_confidence', 4],
  ['medium_capped_claims', 4],
  ['low_confidence_public', 4]
];

function normalizePath(value) {
  return String(value || '').replace(/\\/g, '/');
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function ratioText(verified, total) {
  if (!total) return '0/0 (0.0%)';
  return `${verified}/${total} (${((verified / total) * 100).toFixed(1)}%)`;
}

function clampSlugFromContentPath(path) {
  const normalized = normalizePath(path);
  const contentIndex = normalized.lastIndexOf('content/');
  const fromContent = contentIndex >= 0 ? normalized.slice(contentIndex + 'content/'.length) : normalized;
  return fromContent.replace(/\.md$/i, '').replace(/^\/+|\/+$/g, '');
}

function parseMarkdown(path) {
  const raw = readFileSync(path, 'utf-8');
  if (!raw.startsWith('---')) return { frontmatter: {}, body: raw };
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return { frontmatter: {}, body: raw };
  const yamlText = raw.slice(3, end).trim();
  const body = raw.slice(end + 4);
  return {
    frontmatter: loadYaml(yamlText) || {},
    body
  };
}

function contentPathForArticle(article, contentDir, verificationBySlug) {
  const direct = join(contentDir, `${article.canonical_slug}.md`);
  if (existsSync(direct)) return direct;
  const verification = verificationBySlug.get(article.canonical_slug);
  if (verification?.file && existsSync(verification.file)) return verification.file;
  if (verification?.file && existsSync(resolve(verification.file))) return resolve(verification.file);
  return direct;
}

function buildVerificationIndex(report = {}) {
  const index = new Map();
  for (const entry of report.articles || []) {
    const slug = clampSlugFromContentPath(entry.file || entry.article_id || '');
    if (slug) index.set(slug, entry);
  }
  return index;
}

function buildContentBySlug(manifest, contentDir, verificationReport) {
  const verificationBySlug = buildVerificationIndex(verificationReport);
  const contentBySlug = new Map();
  for (const article of manifest.articles || []) {
    if (!article.canonical_slug) continue;
    const path = contentPathForArticle(article, contentDir, verificationBySlug);
    if (existsSync(path)) contentBySlug.set(article.canonical_slug, parseMarkdown(path));
  }
  return contentBySlug;
}

function buildClaimStats(manifest, claimsPayload) {
  const byUrl = new Map();
  const byId = new Map();
  for (const article of manifest.articles || []) {
    if (article.canonical_url) byUrl.set(article.canonical_url, article.canonical_slug);
    if (article.id) byId.set(article.id, article.canonical_slug);
  }

  const stats = new Map();
  for (const claim of claimsPayload.claims || []) {
    const slug = claim.canonical_slug || byUrl.get(claim.article) || byId.get(claim.article) || '';
    if (!slug) continue;
    const current = stats.get(slug) || { claims: 0, capped: 0, missingEvidence: 0 };
    current.claims++;
    if (claim.declared_confidence && claim.article_confidence) current.capped++;
    if (!claim.source_ref && !claim.source_url && !claim.source_doi && !claim.citation?.sameAs) {
      current.missingEvidence++;
    }
    stats.set(slug, current);
  }
  return stats;
}

function sourceKey(source) {
  return `${String(source.title || '').toLowerCase()}|${String(source.url || source.doi || '').toLowerCase()}`;
}

function isHomepageUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.pathname === '/' || parsed.pathname === '';
  } catch {
    return false;
  }
}

function collectHygieneFlags(content, currentYear = new Date().getFullYear()) {
  const flags = new Set();
  const frontmatter = content?.frontmatter || {};
  const body = content?.body || '';
  const rawText = `${JSON.stringify(frontmatter)}\n${body}`;

  if (/[\uFFFD\u9225\u9983\u9286\u4FD4]/.test(rawText)) flags.add('encoding_mojibake');

  const atomicFacts = Array.isArray(frontmatter.atomic_facts) ? frontmatter.atomic_facts : [];
  if (atomicFacts.some(fact => {
    const statement = String(fact?.statement || '').trim();
    return statement.length < 25 || /[\(:;,]\s*$/.test(statement) || /\barXiv:\d{4}\.\s*$/i.test(statement);
  })) {
    flags.add('broken_atomic_fact');
  }

  const sources = [
    ...(Array.isArray(frontmatter.primary_sources) ? frontmatter.primary_sources : []),
    ...(Array.isArray(frontmatter.secondary_sources) ? frontmatter.secondary_sources : [])
  ];
  const sourceKeys = sources.map(sourceKey).filter(Boolean);
  if (new Set(sourceKeys).size < sourceKeys.length) flags.add('duplicate_sources');
  if (sources.some(source => source.url && isHomepageUrl(source.url) && !source.doi)) flags.add('generic_source_homepage');
  if (sources.some(source => Number(source.year) > currentYear)) flags.add('future_source_year');

  const disputes = Array.isArray(frontmatter.disputed_statements) ? frontmatter.disputed_statements : [];
  if (disputes.some(item => {
    const statement = String(item?.statement || item || '').toLowerCase();
    return !item?.source_url && /subject to ongoing scholarly debate|multiple schools of thought|interpretation and significance|no scientific consensus/.test(statement);
  })) {
    flags.add('generic_dispute_statement');
  }

  if (/\[(?:to be completed|todo|tbd|\u5F85|\u540E\u7EED|\u5F8C\u7E8C|\u88DC\u5145|\u8865\u5145)/i.test(body)) flags.add('placeholder_text');

  return [...flags].sort();
}

function scoreSourceTitleMatch(article, verification) {
  const total = Number(article.sources_total || verification?.sources_total || 0);
  const verified = Number(article.sources_verified || verification?.sources_verified || 0);
  if (total <= 0 || verified <= 0) return 'fail';

  const results = verification?.verification_results || [];
  const matched = results.filter(result => {
    if (!result.all_verified) return false;
    const checks = result.results || [];
    return checks.length === 0 || checks.some(check => check.verified && check.match !== false);
  }).length;

  if (verified === total && (results.length === 0 || matched === total)) return 'pass';
  return 'weak';
}

function scoreClaimEvidence(claimStats, hygieneFlags) {
  if (!claimStats.claims) return 'weak';
  if (claimStats.missingEvidence > 0 || hygieneFlags.includes('broken_atomic_fact')) return 'fail';
  if (hygieneFlags.includes('generic_source_homepage') || claimStats.capped / claimStats.claims > 0.75) return 'weak';
  return 'pass';
}

function scoreTitleSummary(article, content, hygieneFlags) {
  const body = content?.body || '';
  if (!body.trim() || hygieneFlags.includes('placeholder_text') || hygieneFlags.includes('encoding_mojibake')) return 'fail';

  const firstChunk = body.slice(0, 1500).toLowerCase();
  const titleTerms = String(article.title || '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(term => term.length > 3);
  if (titleTerms.length === 0) return 'weak';

  const matched = titleTerms.filter(term => firstChunk.includes(term)).length;
  return matched / titleTerms.length >= 0.4 ? 'pass' : 'weak';
}

function recommendationFor(row) {
  const failCount = [row.source_title_match, row.claim_evidence_match, row.title_summary_accuracy].filter(value => value === 'fail').length;
  if (row.source_title_match === 'fail' || row.title_summary_accuracy === 'fail' || failCount >= 2) return 'move_to_draft';
  if (row.confidence_level === 'high' && (row.source_title_match !== 'pass' || row.verified_ratio < 0.5)) return 'downgrade_confidence';
  if (row.claim_evidence_match !== 'pass' || row.hygiene_flags.length > 0) return 'repair_sources';
  return 'keep_public';
}

export function buildAuditRows({ manifest, claimsPayload, verificationReport, contentBySlug }) {
  const claimStats = buildClaimStats(manifest, claimsPayload);
  const verificationBySlug = buildVerificationIndex(verificationReport);
  const rows = [];

  for (const article of manifest.articles || []) {
    if (article.status !== 'public' || article.is_draft !== false || !article.canonical_slug) continue;
    const verification = verificationBySlug.get(article.canonical_slug);
    const content = contentBySlug?.get ? contentBySlug.get(article.canonical_slug) : contentBySlug?.[article.canonical_slug];
    const stats = claimStats.get(article.canonical_slug) || { claims: 0, capped: 0, missingEvidence: 0 };
    const hygieneFlags = collectHygieneFlags(content);
    const row = {
      ...article,
      verified_ratio: article.sources_total ? article.sources_verified / article.sources_total : 0,
      claim_count: stats.claims,
      capped_claim_count: stats.capped,
      missing_evidence_claim_count: stats.missingEvidence,
      source_title_match: scoreSourceTitleMatch(article, verification),
      claim_evidence_match: scoreClaimEvidence(stats, hygieneFlags),
      title_summary_accuracy: scoreTitleSummary(article, content, hygieneFlags),
      hygiene_flags: hygieneFlags
    };
    row.recommendation = recommendationFor(row);
    rows.push(row);
  }

  return rows;
}

function bucketRows(rows, bucket) {
  const copy = rows.slice();
  if (bucket === 'low_verified_coverage') {
    return copy
      .filter(row => row.quality_reasons?.includes('low_verified_coverage'))
      .sort((a, b) => b.claim_count - a.claim_count || b.capped_claim_count - a.capped_claim_count || a.verified_ratio - b.verified_ratio || a.canonical_slug.localeCompare(b.canonical_slug));
  }
  if (bucket === 'high_confidence') {
    return copy
      .filter(row => row.confidence_level === 'high')
      .sort((a, b) => b.claim_count - a.claim_count || a.source_title_match.localeCompare(b.source_title_match) || a.canonical_slug.localeCompare(b.canonical_slug));
  }
  if (bucket === 'medium_capped_claims') {
    return copy
      .filter(row => row.confidence_level === 'medium' && row.capped_claim_count > 0)
      .sort((a, b) => b.capped_claim_count - a.capped_claim_count || b.claim_count - a.claim_count || a.canonical_slug.localeCompare(b.canonical_slug));
  }
  if (bucket === 'low_confidence_public') {
    return copy
      .filter(row => row.confidence_level === 'low')
      .sort((a, b) => b.claim_count - a.claim_count || b.capped_claim_count - a.capped_claim_count || a.canonical_slug.localeCompare(b.canonical_slug));
  }
  return copy;
}

function pushUnique(target, source, bucket, limit, seen) {
  for (const row of source) {
    if (target.filter(item => item.bucket === bucket).length >= limit) return;
    if (seen.has(row.canonical_slug)) continue;
    target.push({ ...row, bucket });
    seen.add(row.canonical_slug);
  }
}

export function selectAuditSample(rows, sampleSize = SAMPLE_SIZE) {
  const sample = [];
  const seen = new Set();
  for (const [bucket, limit] of BUCKETS) {
    pushUnique(sample, bucketRows(rows, bucket), bucket, limit, seen);
  }

  if (sample.length < sampleSize) {
    const fallback = rows
      .slice()
      .sort((a, b) => {
        const aRisk = (a.quality_reasons?.length || 0) + (a.hygiene_flags?.length || 0) + (a.claim_evidence_match === 'fail' ? 3 : 0);
        const bRisk = (b.quality_reasons?.length || 0) + (b.hygiene_flags?.length || 0) + (b.claim_evidence_match === 'fail' ? 3 : 0);
        return bRisk - aRisk || b.claim_count - a.claim_count || a.canonical_slug.localeCompare(b.canonical_slug);
      });
    for (const row of fallback) {
      if (sample.length >= sampleSize) break;
      if (seen.has(row.canonical_slug)) continue;
      sample.push({ ...row, bucket: 'risk_fallback' });
      seen.add(row.canonical_slug);
    }
  }

  return sample.slice(0, sampleSize);
}

function countRows(sample, predicate) {
  return sample.filter(predicate).length;
}

function rowHasFail(row) {
  return [row.source_title_match, row.claim_evidence_match, row.title_summary_accuracy].includes('fail');
}

function renderEntry(row, index) {
  const reasons = row.quality_reasons?.length ? row.quality_reasons.join(', ') : 'none';
  const flags = row.hygiene_flags?.length ? row.hygiene_flags.join(', ') : 'none';
  return `### ${index + 1}. ${row.title}

- canonical slug: \`${row.canonical_slug}\`
- canonical URL: ${row.canonical_url}
- bucket: \`${row.bucket}\`
- confidence: \`${row.confidence_level}\` (${row.confidence_basis || 'unknown'}, score ${row.confidence_score ?? 'n/a'})
- verified source coverage: ${ratioText(row.sources_verified || 0, row.sources_total || 0)}
- claims: ${row.claim_count} total, ${row.capped_claim_count} capped, ${row.missing_evidence_claim_count} missing evidence
- quality reasons: ${reasons}
- source-title match: \`${row.source_title_match}\`
- claim-evidence match: \`${row.claim_evidence_match}\`
- title-summary accuracy: \`${row.title_summary_accuracy}\`
- hygiene flags: ${flags}
- recommendation: \`${row.recommendation}\`
`;
}

export function renderAuditReport(sample, options = {}) {
  const generatedAt = options.generatedAt || new Date().toISOString();
  const date = generatedAt.slice(0, 10);
  const publicCount = options.publicCount ?? 'unknown';
  const draftCount = options.draftCount ?? 'unknown';
  const claimCount = options.claimCount ?? 'unknown';
  const failedArticles = countRows(sample, rowHasFail);
  const highBad = countRows(sample, row => row.confidence_level === 'high' && (row.source_title_match !== 'pass' || row.claim_evidence_match === 'fail' || row.title_summary_accuracy === 'fail'));
  const claimFailures = countRows(sample, row => row.claim_evidence_match === 'fail');
  const lowCoverageCount = countRows(sample, row => row.quality_reasons?.includes('low_verified_coverage'));

  const ruleAdvice = [
    failedArticles >= 5
      ? '- Upgrade `low_verified_coverage` from audit marker to draft condition in the next rules pass.'
      : '- Keep `low_verified_coverage` as an audit marker until a larger sample confirms the failure rate.',
    highBad >= 2
      ? '- Require `high` confidence to have verified coverage >= 50% and at least 2 verified sources.'
      : '- Keep the current high-confidence rule, while continuing spot checks.',
    claimFailures >= 5
      ? '- Restrict `claims.json` to atomic facts with precise evidence matches.'
      : '- Keep exporting claims with confidence caps, but continue auditing weak evidence.'
  ].join('\n');

  const table = [
    '| # | bucket | slug | confidence | coverage | claims | checks | recommendation |',
    '|---:|---|---|---|---:|---:|---|---|',
    ...sample.map((row, index) => {
      const checks = `source=${row.source_title_match}; claim=${row.claim_evidence_match}; summary=${row.title_summary_accuracy}`;
      return `| ${index + 1} | ${row.bucket} | \`${row.canonical_slug}\` | ${row.confidence_level} | ${ratioText(row.sources_verified || 0, row.sources_total || 0)} | ${row.claim_count} | ${checks} | ${row.recommendation} |`;
    })
  ].join('\n');

  return `# AnchorFact Public Content Audit - ${date}

Generated: ${generatedAt}

Snapshot: ${publicCount} public / ${draftCount} draft / ${claimCount} claims.

## Summary

This is a risk-weighted audit sample of public AnchorFact articles. It is intended to calibrate quality rules before changing publication eligibility.

- Sample size: ${sample.length}
- Low verified coverage samples: ${lowCoverageCount}
- Articles with at least one fail check: ${failedArticles}
- High-confidence samples needing review: ${highBad}
- Claim-evidence failures: ${claimFailures}

## Method

The sample is selected from public manifest entries only. Buckets are fixed at 8 low-coverage public entries, 4 high-confidence entries, 4 medium entries with capped claims, and 4 low-confidence public entries. Entries are de-duplicated by canonical slug.

## Sample Table

${table}

## Article Findings

${sample.map(renderEntry).join('\n')}
## Rule Calibration

${ruleAdvice}

## Next Manual Review

For each article marked \`repair_sources\` or \`move_to_draft\`, manually inspect the linked source pages before changing content. Do not bulk edit unsampled articles from this report alone.
`;
}

function parseArgs(argv) {
  const args = {
    root: process.cwd(),
    dist: 'dist',
    content: 'content',
    verification: 'verification-report.json',
    output: DEFAULT_OUTPUT,
    sampleSize: SAMPLE_SIZE
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--root') args.root = argv[++i];
    else if (arg === '--dist') args.dist = argv[++i];
    else if (arg === '--content') args.content = argv[++i];
    else if (arg === '--verification') args.verification = argv[++i];
    else if (arg === '--output') args.output = argv[++i];
    else if (arg === '--sample-size') args.sampleSize = Number(argv[++i]);
  }
  return args;
}

export function loadAuditData(args = {}) {
  const root = resolve(args.root || process.cwd());
  const distDir = resolve(root, args.dist || 'dist');
  const contentDir = resolve(root, args.content || 'content');
  const verificationPath = resolve(root, args.verification || 'verification-report.json');
  const manifest = readJson(join(distDir, 'manifest.json'));
  const claimsPayload = readJson(join(distDir, 'claims.json'));
  const verificationReport = readJson(verificationPath);
  const contentBySlug = buildContentBySlug(manifest, contentDir, verificationReport);
  return { manifest, claimsPayload, verificationReport, contentBySlug };
}

export function runAudit(args = {}) {
  const data = loadAuditData(args);
  const rows = buildAuditRows(data);
  const sample = selectAuditSample(rows, args.sampleSize || SAMPLE_SIZE);
  const outputPath = resolve(args.root || process.cwd(), args.output || DEFAULT_OUTPUT);
  const report = renderAuditReport(sample, {
    publicCount: data.manifest.public_article_count,
    draftCount: data.manifest.draft_article_count,
    claimCount: data.manifest.claim_count
  });
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, report);
  return { rows, sample, outputPath };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseArgs(process.argv.slice(2));
  const result = runAudit(args);
  const unique = new Set(result.sample.map(row => row.canonical_slug)).size;
  console.log(`Wrote ${result.sample.length} audit entries (${unique} unique slugs) to ${result.outputPath}`);
}
