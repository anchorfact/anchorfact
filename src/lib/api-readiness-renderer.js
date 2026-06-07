export const API_READINESS_SCHEMA_VERSION = 'anchorfact.api-readiness.v1';

export function renderApiReadinessMarkdown(report) {
  const lines = [];
  lines.push(`# AnchorFact API Readiness Report`);
  lines.push('');
  lines.push(`Generated: ${report.generated}`);
  lines.push(`Schema: ${report.schema_version}`);
  lines.push(`Status: ${report.status}`);
  lines.push(`Report-only: ${report.report_only}`);
  lines.push(`Build should fail: ${report.build_should_fail}`);
  lines.push('');
  lines.push(`## Scorecard`);
  lines.push('');
  lines.push(`- Target ratio: ${report.target_ratio}`);
  lines.push(`- Core corpus: ${report.core_corpus.passed}/${report.core_corpus.count} (${report.core_corpus.pass_ratio})`);
  lines.push(`- API citation readiness: ${report.api_scorecard.passed}/${report.api_scorecard.count} (${report.api_scorecard.pass_ratio})`);
  lines.push(`- Unsupported fallback: ${report.api_scorecard.fallback.ok ? 'pass' : 'fail'} (${report.api_scorecard.fallback.answer_mode || 'unknown'})`);
  lines.push(`- API performance: ${report.api_performance.status || (report.api_performance.ok ? 'pass' : 'fail')}`);
  lines.push(`- Artifact budget: ${report.api_performance.artifact_size_budget_ok ?? 'not_provided'}`);
  lines.push(`- Production health: ${report.production_health.status || 'not_provided'}`);
  lines.push(`- Adoption signal: ${report.adoption_signal.status || report.adoption_signal.identified_ai_primary_to_discovery_target_status || 'not_provided'}`);
  lines.push('');
  lines.push(`## Readiness Gates`);
  lines.push('');
  for (const gate of report.readiness_gates) {
    const current = gate.current_ratio === undefined ? '' : `; current=${gate.current_ratio}`;
    lines.push(`- ${gate.id}: ${gate.status} (${gate.target}${current})`);
  }
  lines.push('');
  lines.push(`## Core Corpus Failures`);
  lines.push('');
  const coreFailures = report.core_corpus.failures.slice(0, 20);
  if (coreFailures.length === 0) {
    lines.push('- None.');
  } else {
    for (const row of coreFailures) {
      lines.push(`- ${row.expected_slug}: ${row.failures.join(', ')}`);
    }
  }
  lines.push('');
  lines.push(`## API Query Failures`);
  lines.push('');
  const apiFailures = report.api_scorecard.failures.slice(0, 20);
  if (apiFailures.length === 0) {
    lines.push('- None.');
  } else {
    for (const row of apiFailures) {
      lines.push(`- ${row.expected_slug}: ${row.failures.join(', ')} (top context=${row.context.top_slug || 'none'}, top evidence=${row.evidence.top_slug || 'none'})`);
    }
  }
  lines.push('');
  lines.push(`## Next Actions`);
  lines.push('');
  for (const action of report.next_actions) lines.push(`- ${action}`);
  lines.push('');
  return `${lines.join('\n')}\n`;
}
