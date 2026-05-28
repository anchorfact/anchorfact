#!/usr/bin/env node
import { pathToFileURL } from 'url';
import { buildAuditRows, loadAuditData } from './audit-public-sample.js';

function countByRecommendation(rows) {
  const counts = { keep_public: 0, downgrade_confidence: 0, repair_sources: 0, move_to_draft: 0 };
  for (const row of rows) {
    counts[row.recommendation] = (counts[row.recommendation] || 0) + 1;
  }
  return counts;
}

function parseArgs(argv) {
  const args = { root: process.cwd(), json: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--root') args.root = argv[++i];
    else if (arg === '--json') args.json = true;
  }
  return args;
}

export function runPublicAuditGate(args = {}) {
  const data = loadAuditData(args);
  const rows = buildAuditRows(data);
  const recommendations = countByRecommendation(rows);
  const actionable = rows
    .filter(row => row.recommendation !== 'keep_public')
    .map(row => ({
      canonical_slug: row.canonical_slug,
      recommendation: row.recommendation,
      confidence_level: row.confidence_level,
      verified_ratio: row.verified_ratio,
      checks: {
        source_title_match: row.source_title_match,
        claim_evidence_match: row.claim_evidence_match,
        title_summary_accuracy: row.title_summary_accuracy
      },
      quality_reasons: row.quality_reasons || [],
      hygiene_flags: row.hygiene_flags || []
    }));

  return {
    public_rows: rows.length,
    recommendations,
    actionable_count: actionable.length,
    actionable
  };
}

export function renderPublicAuditGate(summary) {
  const lines = [
    'AnchorFact full public audit gate',
    `  Public rows: ${summary.public_rows}`,
    `  keep_public: ${summary.recommendations.keep_public || 0}`,
    `  downgrade_confidence: ${summary.recommendations.downgrade_confidence || 0}`,
    `  repair_sources: ${summary.recommendations.repair_sources || 0}`,
    `  move_to_draft: ${summary.recommendations.move_to_draft || 0}`
  ];

  if (summary.actionable_count > 0) {
    lines.push('', 'Actionable public rows:');
    for (const row of summary.actionable) {
      lines.push(`- ${row.canonical_slug}: ${row.recommendation}`);
    }
  }

  return lines.join('\n');
}

export function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const summary = runPublicAuditGate(args);
  console.log(args.json ? JSON.stringify(summary, null, 2) : renderPublicAuditGate(summary));
  if (summary.actionable_count > 0) {
    process.exitCode = 1;
  }
  return summary;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
