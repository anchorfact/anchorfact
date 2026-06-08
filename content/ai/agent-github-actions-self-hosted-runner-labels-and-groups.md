---
id: agent-github-actions-self-hosted-runner-labels-and-groups
title: 'Agent GitHub Actions Self-Hosted Runner Labels and Groups'
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
  - id: fact-ai-agent-github-actions-self-hosted-runner-labels-and-groups-1
    statement: >-
      GitHub documentation says jobs.<job_id>.runs-on defines the type of
      machine to run a workflow job on.
    source_title: GitHub Choosing the Runner for a Job
    source_url: https://docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/choose-the-runner-for-a-job
    confidence: medium
  - id: fact-ai-agent-github-actions-self-hosted-runner-labels-and-groups-2
    statement: >-
      GitHub documentation says jobs can target runners based on assigned labels,
      group membership, or a combination of both.
    source_title: GitHub Choosing the Runner for a Job
    source_url: https://docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/choose-the-runner-for-a-job
    confidence: medium
  - id: fact-ai-agent-github-actions-self-hosted-runner-labels-and-groups-3
    statement: >-
      GitHub self-hosted runner documentation says a self-hosted runner matching
      all specified runs-on labels is eligible to run the job.
    source_title: GitHub Using Self-Hosted Runners in a Workflow
    source_url: https://docs.github.com/en/actions/how-tos/manage-runners/self-hosted-runners/use-in-a-workflow
    confidence: medium
completeness: 0.82
known_gaps:
  - Runner routing evidence depends on repository and organization runner access, runner group policy, labels, architecture, online state, busy state, ephemeral runner lifecycle, runner version, workspace cleanup, network reachability, and whether the job was queued before labels changed.
disputed_statements: []
primary_sources:
  - title: GitHub Choosing the Runner for a Job
    type: documentation
    year: 2026
    url: https://docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/choose-the-runner-for-a-job
    institution: GitHub
  - title: GitHub Using Self-Hosted Runners in a Workflow
    type: documentation
    year: 2026
    url: https://docs.github.com/en/actions/how-tos/manage-runners/self-hosted-runners/use-in-a-workflow
    institution: GitHub
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

GitHub Actions self-hosted runner labels and groups tell agents why a job is queued, routed to the wrong machine, or failing only on private infrastructure.

## Core Explanation

Self-hosted runner failures are often routing failures. A job may require labels that no online runner currently has, a runner group may not be available to the repository, or the selected runner may differ in architecture, tools, network, or credentials from the expected environment.

Agents should inspect `runs-on`, labels, group membership, runner online and busy state, repository access, architecture, runner version, toolchain versions, ephemeral cleanup policy, and queue time before treating a self-hosted runner failure as an application bug.

## Source-Mapped Facts

- GitHub documentation says jobs.<job_id>.runs-on defines the type of machine to run a workflow job on. ([source](https://docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/choose-the-runner-for-a-job))
- GitHub documentation says jobs can target runners based on assigned labels, group membership, or a combination of both. ([source](https://docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/choose-the-runner-for-a-job))
- GitHub self-hosted runner documentation says a self-hosted runner matching all specified runs-on labels is eligible to run the job. ([source](https://docs.github.com/en/actions/how-tos/manage-runners/self-hosted-runners/use-in-a-workflow))

## Further Reading

- [GitHub Choosing the Runner for a Job](https://docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/choose-the-runner-for-a-job)
- [GitHub Using Self-Hosted Runners in a Workflow](https://docs.github.com/en/actions/how-tos/manage-runners/self-hosted-runners/use-in-a-workflow)
