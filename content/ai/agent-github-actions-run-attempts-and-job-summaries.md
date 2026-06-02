---
id: agent-github-actions-run-attempts-and-job-summaries
title: 'Agent GitHub Actions Run Attempts and Job Summaries'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-03'
created_date: '2026-06-03'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-agent-github-actions-run-attempts-and-job-summaries-1
    statement: >-
      GitHub REST documentation for workflow runs includes a run_attempt field
      in workflow run responses.
    source_title: GitHub REST API Workflow Runs
    source_url: https://docs.github.com/rest/actions/workflow-runs/
    confidence: medium
  - id: fact-ai-agent-github-actions-run-attempts-and-job-summaries-2
    statement: >-
      GitHub REST documentation for workflow runs includes jobs_url and logs_url
      fields for a workflow run.
    source_title: GitHub REST API Workflow Runs
    source_url: https://docs.github.com/rest/actions/workflow-runs/
    confidence: medium
  - id: fact-ai-agent-github-actions-run-attempts-and-job-summaries-3
    statement: >-
      GitHub Actions workflow command documentation says job summaries support
      GitHub Flavored Markdown through the GITHUB_STEP_SUMMARY environment file.
    source_title: GitHub Actions Workflow Commands
    source_url: https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions
    confidence: medium
completeness: 0.82
known_gaps:
  - CI diagnosis depends on workflow YAML, run attempt, rerun policy, matrix job identity, annotations, uploaded artifacts, job summary content, log retention, and permissions for fetching private logs.
disputed_statements: []
primary_sources:
  - title: GitHub REST API Workflow Runs
    type: documentation
    year: 2026
    url: https://docs.github.com/rest/actions/workflow-runs/
    institution: GitHub
  - title: GitHub Actions Workflow Commands
    type: documentation
    year: 2026
    url: https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions
    institution: GitHub
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Run attempts, job URLs, logs, and job summaries help agents distinguish a current CI failure from an earlier attempt or stale summary.

## Core Explanation

GitHub Actions troubleshooting is stateful. A run can be rerun, failed jobs can be retried, and summaries can contain the human-readable evidence that never appears in a short status check label. Agents need the workflow run ID, run attempt, job IDs, matrix labels, logs, annotations, and artifacts before modifying code.

Job summaries are especially useful when workflows publish test reports, coverage, deployment URLs, or benchmark tables. Agents should preserve the attempt number in their evidence trail so a fix is tied to the exact failing run rather than a previous or later retry.

## Source-Mapped Facts

- GitHub REST documentation for workflow runs includes a run_attempt field in workflow run responses. ([source](https://docs.github.com/rest/actions/workflow-runs/))
- GitHub REST documentation for workflow runs includes jobs_url and logs_url fields for a workflow run. ([source](https://docs.github.com/rest/actions/workflow-runs/))
- GitHub Actions workflow command documentation says job summaries support GitHub Flavored Markdown through the GITHUB_STEP_SUMMARY environment file. ([source](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions))

## Further Reading

- [GitHub REST API Workflow Runs](https://docs.github.com/rest/actions/workflow-runs/)
- [GitHub Actions Workflow Commands](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions)
