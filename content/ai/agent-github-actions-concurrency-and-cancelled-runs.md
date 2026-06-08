---
id: agent-github-actions-concurrency-and-cancelled-runs
title: 'Agent GitHub Actions Concurrency and Cancelled Runs'
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
  - id: fact-ai-agent-github-actions-concurrency-and-cancelled-runs-1
    statement: >-
      GitHub Actions documentation says jobs.<job_id>.concurrency can ensure
      that only a single job or workflow using the same concurrency group runs
      at a time.
    source_title: GitHub Actions Control Workflow Concurrency
    source_url: https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/control-the-concurrency-of-workflows-and-jobs
    confidence: medium
  - id: fact-ai-agent-github-actions-concurrency-and-cancelled-runs-2
    statement: >-
      GitHub Actions documentation says that, by default, an existing pending job
      or workflow in the same concurrency group is canceled when a new queued job
      or workflow takes its place.
    source_title: GitHub Actions Control Workflow Concurrency
    source_url: https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/control-the-concurrency-of-workflows-and-jobs
    confidence: medium
  - id: fact-ai-agent-github-actions-concurrency-and-cancelled-runs-3
    statement: >-
      GitHub workflow syntax documentation says cancel-in-progress: true also
      cancels a currently running job or workflow in the same concurrency group.
    source_title: GitHub Workflow Syntax Concurrency
    source_url: https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#concurrency
    confidence: medium
completeness: 0.82
known_gaps:
  - Workflow cancellation evidence depends on branch filters, event type, concurrency key expressions, matrix values, queue mode, rerun attempts, environment protection waits, and whether cancellation came from concurrency, a manual action, or a newer deployment.
disputed_statements: []
primary_sources:
  - title: GitHub Actions Control Workflow Concurrency
    type: documentation
    year: 2026
    url: https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/control-the-concurrency-of-workflows-and-jobs
    institution: GitHub
  - title: GitHub Workflow Syntax Concurrency
    type: documentation
    year: 2026
    url: https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#concurrency
    institution: GitHub
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

GitHub Actions concurrency evidence tells agents whether a cancelled CI or deployment run was superseded by a newer run instead of failing because the code or deploy target broke.

## Core Explanation

Workflow queues are operational evidence. A run can be skipped, pending, cancelled, or replaced because its concurrency group is already occupied, because a newer push took the pending slot, or because `cancel-in-progress` terminated an older run.

Agents should inspect workflow-level and job-level `concurrency`, the evaluated group key, event type, branch or PR number, matrix values, run attempt, cancellation actor, queued timestamp, and whether a newer run in the same group reached the deployment or test gate before treating a cancelled run as a regression.

## Source-Mapped Facts

- GitHub Actions documentation says jobs.<job_id>.concurrency can ensure that only a single job or workflow using the same concurrency group runs at a time. ([source](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/control-the-concurrency-of-workflows-and-jobs))
- GitHub Actions documentation says that, by default, an existing pending job or workflow in the same concurrency group is canceled when a new queued job or workflow takes its place. ([source](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/control-the-concurrency-of-workflows-and-jobs))
- GitHub workflow syntax documentation says cancel-in-progress: true also cancels a currently running job or workflow in the same concurrency group. ([source](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#concurrency))

## Further Reading

- [GitHub Actions Control Workflow Concurrency](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/control-the-concurrency-of-workflows-and-jobs)
- [GitHub Workflow Syntax Concurrency](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#concurrency)
