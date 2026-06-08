---
id: agent-github-actions-reusable-workflows-and-call-chain
title: 'Agent GitHub Actions Reusable Workflows and Call Chain'
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
  - id: fact-ai-agent-github-actions-reusable-workflows-and-call-chain-1
    statement: >-
      GitHub reusable workflow documentation says a workflow must include
      workflow_call in its on values to be reusable.
    source_title: GitHub Reusing Workflows
    source_url: https://docs.github.com/en/actions/sharing-automations/reusing-workflows
    confidence: medium
  - id: fact-ai-agent-github-actions-reusable-workflows-and-call-chain-2
    statement: >-
      GitHub reusable workflow documentation says inputs and secrets can be
      defined in a reusable workflow and passed from the caller workflow to the
      called workflow.
    source_title: GitHub Reusing Workflows
    source_url: https://docs.github.com/en/actions/sharing-automations/reusing-workflows
    confidence: medium
  - id: fact-ai-agent-github-actions-reusable-workflows-and-call-chain-3
    statement: >-
      GitHub workflow syntax documentation includes on.workflow_call inputs,
      outputs, and secrets as reusable workflow syntax.
    source_title: GitHub Workflow Syntax workflow_call
    source_url: https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#onworkflow_call
    confidence: medium
completeness: 0.82
known_gaps:
  - Reusable workflow evidence depends on caller repository, called workflow ref, nested workflow depth, inherited secrets, job permissions, environment protection, OIDC subject claims, and whether a failed job occurred in the caller or called workflow.
disputed_statements: []
primary_sources:
  - title: GitHub Reusing Workflows
    type: documentation
    year: 2026
    url: https://docs.github.com/en/actions/sharing-automations/reusing-workflows
    institution: GitHub
  - title: GitHub Workflow Syntax workflow_call
    type: documentation
    year: 2026
    url: https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#onworkflow_call
    institution: GitHub
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

GitHub Actions reusable workflow evidence tells agents whether a CI or deployment failure comes from the caller workflow, the called workflow, or the contract between them.

## Core Explanation

Reusable workflows turn CI YAML into a call graph. A caller workflow can pass inputs and secrets to a called workflow, while the called workflow defines its accepted contract with `workflow_call`. That boundary matters for agents because a missing secret, permission, input, or workflow ref can look like a generic build failure.

Agents should capture the caller workflow file, called workflow path and ref, `workflow_call` inputs, secrets, job permissions, inherited secrets, run attempt, nested calls, and environment gates before editing either workflow.

## Source-Mapped Facts

- GitHub reusable workflow documentation says a workflow must include workflow_call in its on values to be reusable. ([source](https://docs.github.com/en/actions/sharing-automations/reusing-workflows))
- GitHub reusable workflow documentation says inputs and secrets can be defined in a reusable workflow and passed from the caller workflow to the called workflow. ([source](https://docs.github.com/en/actions/sharing-automations/reusing-workflows))
- GitHub workflow syntax documentation includes on.workflow_call inputs, outputs, and secrets as reusable workflow syntax. ([source](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#onworkflow_call))

## Further Reading

- [GitHub Reusing Workflows](https://docs.github.com/en/actions/sharing-automations/reusing-workflows)
- [GitHub Workflow Syntax workflow_call](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#onworkflow_call)
