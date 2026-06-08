---
id: agent-github-check-runs-and-commit-statuses
title: 'Agent GitHub Check Runs and Commit Statuses'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-09'
created_date: '2026-06-09'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-agent-github-check-runs-and-commit-statuses-1
    statement: >-
      GitHub REST check run documentation says the REST API can be used to manage check runs.
    source_title: GitHub REST API Check Runs
    source_url: https://docs.github.com/en/rest/checks/runs?apiVersion=2022-11-28
    confidence: medium
  - id: fact-ai-agent-github-check-runs-and-commit-statuses-2
    statement: >-
      GitHub REST check run documentation says a check run has a current status and a final conclusion when completed.
    source_title: GitHub REST API Check Runs
    source_url: https://docs.github.com/en/rest/checks/runs?apiVersion=2022-11-28
    confidence: medium
  - id: fact-ai-agent-github-check-runs-and-commit-statuses-3
    statement: >-
      GitHub REST check run documentation says check run output can include title, summary, text, and annotations for specific lines of code.
    source_title: GitHub REST API Check Runs
    source_url: https://docs.github.com/en/rest/checks/runs?apiVersion=2022-11-28
    confidence: medium
  - id: fact-ai-agent-github-check-runs-and-commit-statuses-4
    statement: >-
      GitHub REST commit status documentation says statuses can include a context that identifies which service is providing the status.
    source_title: GitHub REST API Commit Statuses
    source_url: https://docs.github.com/en/rest/commits/statuses?apiVersion=2022-11-28
    confidence: medium
completeness: 0.84
known_gaps:
  - Mergeability diagnosis depends on exact head SHA, required-check names, check suite grouping, workflow reruns, skipped jobs, stale statuses, GitHub App permissions, and whether branch protection requires check runs or legacy commit statuses.
disputed_statements: []
primary_sources:
  - title: GitHub REST API Check Runs
    type: documentation
    year: 2026
    url: https://docs.github.com/en/rest/checks/runs?apiVersion=2022-11-28
    institution: GitHub
  - title: GitHub REST API Check Suites
    type: documentation
    year: 2026
    url: https://docs.github.com/en/rest/checks/suites?apiVersion=2022-11-28
    institution: GitHub
  - title: GitHub REST API Commit Statuses
    type: documentation
    year: 2026
    url: https://docs.github.com/en/rest/commits/statuses?apiVersion=2022-11-28
    institution: GitHub
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

GitHub check runs and commit statuses are merge evidence: they tell agents which service reported a result, which SHA it applies to, and where line-level annotations or logs live.

## Core Explanation

When a pull request is blocked, an agent should fetch the exact check runs and commit statuses for the pull request head SHA before rerunning CI or editing code. The same label can refer to a stale run, a skipped workflow, a failed matrix job, a third-party status context, or an annotation attached to a generated file.

Useful evidence includes check run ID, app slug, status, conclusion, started and completed timestamps, output summary, annotation URLs, commit status context, target URL, and whether the required status is missing, pending, failed, stale, or superseded by a rerun.

## Source-Mapped Facts

- GitHub REST check run documentation says the REST API can be used to manage check runs. ([source](https://docs.github.com/en/rest/checks/runs?apiVersion=2022-11-28))
- GitHub REST check run documentation says a check run has a current status and a final conclusion when completed. ([source](https://docs.github.com/en/rest/checks/runs?apiVersion=2022-11-28))
- GitHub REST check run documentation says check run output can include title, summary, text, and annotations for specific lines of code. ([source](https://docs.github.com/en/rest/checks/runs?apiVersion=2022-11-28))
- GitHub REST commit status documentation says statuses can include a context that identifies which service is providing the status. ([source](https://docs.github.com/en/rest/commits/statuses?apiVersion=2022-11-28))

## Further Reading

- [GitHub REST API Check Runs](https://docs.github.com/en/rest/checks/runs?apiVersion=2022-11-28)
- [GitHub REST API Check Suites](https://docs.github.com/en/rest/checks/suites?apiVersion=2022-11-28)
- [GitHub REST API Commit Statuses](https://docs.github.com/en/rest/commits/statuses?apiVersion=2022-11-28)
