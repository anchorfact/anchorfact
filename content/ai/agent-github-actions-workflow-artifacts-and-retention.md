---
id: agent-github-actions-workflow-artifacts-and-retention
title: 'Agent GitHub Actions Workflow Artifacts and Retention'
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
  - id: fact-ai-agent-github-actions-workflow-artifacts-and-retention-1
    statement: >-
      GitHub Actions documentation says an artifact is a file or collection of
      files produced during a workflow run.
    source_title: GitHub Actions Workflow Artifacts
    source_url: https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts
    confidence: medium
  - id: fact-ai-agent-github-actions-workflow-artifacts-and-retention-2
    statement: >-
      GitHub Actions documentation says artifacts allow data to persist after a
      job completes and be shared with another job in the same workflow.
    source_title: GitHub Actions Workflow Artifacts
    source_url: https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts
    confidence: medium
  - id: fact-ai-agent-github-actions-workflow-artifacts-and-retention-3
    statement: >-
      GitHub Actions documentation says GitHub provides upload-artifact and
      download-artifact actions for uploading and downloading build artifacts.
    source_title: GitHub Actions Workflow Artifacts
    source_url: https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts
    confidence: medium
  - id: fact-ai-agent-github-actions-workflow-artifacts-and-retention-4
    statement: >-
      GitHub Actions documentation says retention-days can set a custom
      retention period for an individual artifact, but the value cannot exceed
      the repository, organization, or enterprise retention limit.
    source_title: GitHub Actions Store and Share Data
    source_url: https://docs.github.com/en/actions/tutorials/store-and-share-data
    confidence: medium
completeness: 0.82
known_gaps:
  - Artifact diagnosis depends on artifact name, retention-days, repository retention policy, upload and download action versions, run attempt, job permissions, cross-workflow token access, artifact size, compression, expiry, and whether the evidence was uploaded before the job failed.
disputed_statements: []
primary_sources:
  - title: GitHub Actions Workflow Artifacts
    type: documentation
    year: 2026
    url: https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts
    institution: GitHub
  - title: GitHub Actions Store and Share Data
    type: documentation
    year: 2026
    url: https://docs.github.com/en/actions/tutorials/store-and-share-data
    institution: GitHub
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

GitHub Actions workflow artifacts tell agents where CI evidence lives after logs are too terse: reports, traces, binaries, screenshots, coverage, and failure bundles.

## Core Explanation

Artifacts are durable evidence produced by a workflow run. They are different from dependency caches because agents usually need artifacts to inspect output, not to speed up a later run. A missing artifact can mean the upload step never ran, the artifact name changed, the retention period expired, or the agent is looking at the wrong workflow run attempt.

Agents should capture artifact names, upload steps, download steps, retention days, action versions, run attempt, job status, permissions, expiry, and links to the artifact before rerunning CI or asking a human to reproduce a failure.

## Source-Mapped Facts

- GitHub Actions documentation says an artifact is a file or collection of files produced during a workflow run. ([source](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts))
- GitHub Actions documentation says artifacts allow data to persist after a job completes and be shared with another job in the same workflow. ([source](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts))
- GitHub Actions documentation says GitHub provides upload-artifact and download-artifact actions for uploading and downloading build artifacts. ([source](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts))
- GitHub Actions documentation says retention-days can set a custom retention period for an individual artifact, but the value cannot exceed the repository, organization, or enterprise retention limit. ([source](https://docs.github.com/en/actions/tutorials/store-and-share-data))

## Further Reading

- [GitHub Actions Workflow Artifacts](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflow-artifacts)
- [GitHub Actions Store and Share Data](https://docs.github.com/en/actions/tutorials/store-and-share-data)
