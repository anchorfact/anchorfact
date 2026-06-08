---
id: data-dbt-snapshots-and-slowly-changing-dimensions
title: 'Data dbt Snapshots and Slowly Changing Dimensions'
schema_type: TechArticle
category: computer-science
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
  - id: fact-cs-data-dbt-snapshots-and-slowly-changing-dimensions-1
    statement: >-
      dbt documentation says snapshots record changes to a mutable table over
      time.
    source_title: dbt Snapshots
    source_url: https://docs.getdbt.com/docs/build/snapshots
    confidence: medium
  - id: fact-cs-data-dbt-snapshots-and-slowly-changing-dimensions-2
    statement: >-
      dbt documentation says snapshots implement type-2 Slowly Changing
      Dimensions over mutable source tables.
    source_title: dbt Snapshots
    source_url: https://docs.getdbt.com/docs/build/snapshots
    confidence: medium
  - id: fact-cs-data-dbt-snapshots-and-slowly-changing-dimensions-3
    statement: >-
      dbt strategy configuration documentation says snapshot strategy is required
      and can use timestamp or check examples.
    source_title: dbt Snapshot Strategy
    source_url: https://docs.getdbt.com/reference/resource-configs/strategy
    confidence: medium
completeness: 0.82
known_gaps:
  - Snapshot diagnosis depends on unique key stability, timestamp or check strategy, updated_at quality, hard delete handling, target schema, dbt version, warehouse merge semantics, full-refresh history, and whether downstream models expect current rows or historical validity windows.
disputed_statements: []
primary_sources:
  - title: dbt Snapshots
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/docs/build/snapshots
    institution: dbt Labs
  - title: dbt Snapshot Strategy
    type: documentation
    year: 2026
    url: https://docs.getdbt.com/reference/resource-configs/strategy
    institution: dbt Labs
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

dbt snapshots tell agents whether historical row changes are expected, missing, or broken because the snapshot strategy no longer matches the source table.

## Core Explanation

Mutable source tables can overwrite the past. dbt snapshots preserve a history of those changes, which is useful for audits and slowly changing dimensions but creates its own failure modes. A bad unique key, missing `updated_at`, schema drift, or hard delete policy can make history incomplete even when the latest source row looks correct.

Agents should inspect snapshot name, unique key, strategy, updated_at or check columns, target schema, validity columns, hard delete settings, source freshness, dbt run artifacts, and downstream model assumptions before backfilling or rebuilding snapshot tables.

## Source-Mapped Facts

- dbt documentation says snapshots record changes to a mutable table over time. ([source](https://docs.getdbt.com/docs/build/snapshots))
- dbt documentation says snapshots implement type-2 Slowly Changing Dimensions over mutable source tables. ([source](https://docs.getdbt.com/docs/build/snapshots))
- dbt strategy configuration documentation says snapshot strategy is required and can use timestamp or check examples. ([source](https://docs.getdbt.com/reference/resource-configs/strategy))

## Further Reading

- [dbt Snapshots](https://docs.getdbt.com/docs/build/snapshots)
- [dbt Snapshot Strategy](https://docs.getdbt.com/reference/resource-configs/strategy)
