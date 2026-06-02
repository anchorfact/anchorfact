---
id: data-bigquery-job-statistics-and-query-plans
title: 'Data BigQuery Job Statistics and Query Plans'
schema_type: TechArticle
category: computer-science
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
  - id: fact-cs-data-bigquery-job-statistics-and-query-plans-1
    statement: >-
      BigQuery documentation says query execution converts SQL into an
      execution graph consisting of stages and steps.
    source_title: BigQuery Query Plan and Timeline
    source_url: https://docs.cloud.google.com/bigquery/docs/query-plan-explanation
    confidence: medium
  - id: fact-cs-data-bigquery-job-statistics-and-query-plans-2
    statement: >-
      BigQuery documentation says top-level job statistics provide query cost
      using totalSlotMs.
    source_title: BigQuery Query Plan and Timeline
    source_url: https://docs.cloud.google.com/bigquery/docs/query-plan-explanation
    confidence: medium
  - id: fact-cs-data-bigquery-job-statistics-and-query-plans-3
    statement: >-
      BigQuery documentation says API query plans are represented as a list of
      query stages with stage statistics, step information, and timing details.
    source_title: BigQuery Query Plan and Timeline
    source_url: https://docs.cloud.google.com/bigquery/docs/query-plan-explanation
    confidence: medium
  - id: fact-cs-data-bigquery-job-statistics-and-query-plans-4
    statement: >-
      BigQuery documentation says the INFORMATION_SCHEMA.JOBS view contains
      metadata about BigQuery jobs.
    source_title: BigQuery INFORMATION_SCHEMA JOBS View
    source_url: https://cloud.google.com/bigquery/docs/information-schema-jobs
    confidence: medium
completeness: 0.82
known_gaps:
  - BigQuery diagnosis depends on query text, referenced views, slot usage, shuffle bytes, spilled bytes, stage skew, partition pruning, clustering, cache behavior, reservation settings, and job priority.
disputed_statements: []
primary_sources:
  - title: BigQuery Query Plan and Timeline
    type: documentation
    year: 2026
    url: https://docs.cloud.google.com/bigquery/docs/query-plan-explanation
    institution: Google Cloud
  - title: BigQuery INFORMATION_SCHEMA JOBS View
    type: documentation
    year: 2026
    url: https://cloud.google.com/bigquery/docs/information-schema-jobs
    institution: Google Cloud
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

BigQuery job statistics and query plans tell agents whether a data issue is a SQL bug, scan-cost problem, shuffle bottleneck, or execution skew.

## Core Explanation

Warehouse agents should not diagnose BigQuery cost or latency from SQL text alone. Completed jobs expose stages, steps, timing, slot usage, and shuffle behavior that explain where work happened.

Useful evidence includes job ID, query text, stage graph, slot milliseconds, bytes processed, shuffle bytes, spilled bytes, wait/read/compute/write timing, referenced tables, and partition or clustering filters. A good recommendation names the stage or step that dominates cost before suggesting SQL rewrites.

## Source-Mapped Facts

- BigQuery documentation says query execution converts SQL into an execution graph consisting of stages and steps. ([source](https://docs.cloud.google.com/bigquery/docs/query-plan-explanation))
- BigQuery documentation says top-level job statistics provide query cost using totalSlotMs. ([source](https://docs.cloud.google.com/bigquery/docs/query-plan-explanation))
- BigQuery documentation says API query plans are represented as a list of query stages with stage statistics, step information, and timing details. ([source](https://docs.cloud.google.com/bigquery/docs/query-plan-explanation))
- BigQuery documentation says the INFORMATION_SCHEMA.JOBS view contains metadata about BigQuery jobs. ([source](https://cloud.google.com/bigquery/docs/information-schema-jobs))

## Further Reading

- [BigQuery Query Plan and Timeline](https://docs.cloud.google.com/bigquery/docs/query-plan-explanation)
- [BigQuery INFORMATION_SCHEMA JOBS View](https://cloud.google.com/bigquery/docs/information-schema-jobs)
