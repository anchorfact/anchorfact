---
id: data-prefect-states-retries-and-flow-run-artifacts
title: 'Data Prefect States, Retries, and Flow Run Artifacts'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-11'
created_date: '2026-06-11'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-data-prefect-states-retries-and-flow-run-artifacts-1
    statement: >-
      Prefect states documentation says states contain information about the
      status of a flow or task run.
    source_title: Prefect States
    source_url: https://docs.prefect.io/v3/concepts/states
    confidence: medium
  - id: fact-cs-data-prefect-states-retries-and-flow-run-artifacts-2
    statement: >-
      Prefect states documentation says a task retry can have the Retrying state
      name and the RUNNING state type.
    source_title: Prefect States
    source_url: https://docs.prefect.io/v3/concepts/states
    confidence: medium
  - id: fact-cs-data-prefect-states-retries-and-flow-run-artifacts-3
    statement: >-
      Prefect states documentation says terminal states include completed,
      failed, and crashed categories.
    source_title: Prefect States
    source_url: https://docs.prefect.io/v3/concepts/states
    confidence: medium
  - id: fact-cs-data-prefect-states-retries-and-flow-run-artifacts-4
    statement: >-
      Prefect tasks documentation describes tasks as functions that represent
      discrete units of work in a workflow.
    source_title: Prefect Tasks
    source_url: https://docs.prefect.io/v3/concepts/tasks
    confidence: medium
  - id: fact-cs-data-prefect-states-retries-and-flow-run-artifacts-5
    statement: >-
      Prefect artifacts documentation describes artifacts as objects that let
      users publish and render information about a flow run.
    source_title: Prefect Artifacts
    source_url: https://docs.prefect.io/v3/concepts/artifacts
    confidence: medium
completeness: 0.82
known_gaps:
  - Prefect run evidence depends on deployment, work pool, worker health, queue, task retries, concurrency limits, state history, logs, result storage, artifact keys, and whether an upstream failed state was intentionally handled by a flow.
disputed_statements: []
primary_sources:
  - title: Prefect States
    type: documentation
    year: 2026
    url: https://docs.prefect.io/v3/concepts/states
    institution: Prefect
  - title: Prefect Tasks
    type: documentation
    year: 2026
    url: https://docs.prefect.io/v3/concepts/tasks
    institution: Prefect
  - title: Prefect Artifacts
    type: documentation
    year: 2026
    url: https://docs.prefect.io/v3/concepts/artifacts
    institution: Prefect
secondary_sources: []
updated: '2026-06-11'
ai_models:
  - gpt-5-codex
---

## TL;DR

Prefect states, task retries, and flow run artifacts help agents explain why a data workflow succeeded, retried, failed, crashed, or published diagnostic output.

## Core Explanation

In a data platform, a failed pipeline is rarely just a failed Python function. Prefect state history can show whether a run was late, pending, running, retrying, failed, crashed, cancelled, or completed. Artifacts can preserve human-readable run outputs such as tables, links, or summaries.

Agents should capture flow run ID, task run ID, state history, retry count, deployment, work pool, worker logs, concurrency limits, artifact keys, and relevant result storage references. That evidence helps distinguish code failure from infrastructure failure, queue starvation, worker unavailability, or an expected retry path.

## Source-Mapped Facts

- Prefect states documentation says states contain information about the status of a flow or task run. ([source](https://docs.prefect.io/v3/concepts/states))
- Prefect states documentation says a task retry can have the Retrying state name and the RUNNING state type. ([source](https://docs.prefect.io/v3/concepts/states))
- Prefect states documentation says terminal states include completed, failed, and crashed categories. ([source](https://docs.prefect.io/v3/concepts/states))
- Prefect tasks documentation describes tasks as functions that represent discrete units of work in a workflow. ([source](https://docs.prefect.io/v3/concepts/tasks))
- Prefect artifacts documentation describes artifacts as objects that let users publish and render information about a flow run. ([source](https://docs.prefect.io/v3/concepts/artifacts))

## Further Reading

- [Prefect States](https://docs.prefect.io/v3/concepts/states)
- [Prefect Tasks](https://docs.prefect.io/v3/concepts/tasks)
- [Prefect Artifacts](https://docs.prefect.io/v3/concepts/artifacts)
