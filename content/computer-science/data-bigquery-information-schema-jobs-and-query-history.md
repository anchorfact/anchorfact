---
id: data-bigquery-information-schema-jobs-and-query-history
title: 'Data BigQuery INFORMATION_SCHEMA Jobs and Query History'
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
  - id: fact-cs-data-bigquery-information-schema-jobs-and-query-history-1
    statement: >-
      BigQuery documentation says INFORMATION_SCHEMA.JOBS contains near
      real-time metadata about all BigQuery jobs in the current project.
    source_title: BigQuery INFORMATION_SCHEMA JOBS View
    source_url: https://cloud.google.com/bigquery/docs/information-schema-jobs
    confidence: medium
  - id: fact-cs-data-bigquery-information-schema-jobs-and-query-history-2
    statement: >-
      BigQuery documentation says the JOBS and JOBS_BY_PROJECT views are
      synonymous.
    source_title: BigQuery INFORMATION_SCHEMA JOBS View
    source_url: https://cloud.google.com/bigquery/docs/information-schema-jobs
    confidence: medium
  - id: fact-cs-data-bigquery-information-schema-jobs-and-query-history-3
    statement: >-
      BigQuery documentation says INFORMATION_SCHEMA.JOBS_TIMELINE contains
      near real-time BigQuery metadata by timeslice for jobs submitted in the
      current project.
    source_title: BigQuery INFORMATION_SCHEMA JOBS_TIMELINE View
    source_url: https://cloud.google.com/bigquery/docs/information-schema-jobs-timeline
    confidence: medium
completeness: 0.82
known_gaps:
  - BigQuery job-history evidence depends on region qualifiers, IAM permissions, retention windows, redacted query text, parent-child jobs, reservations, slot commitments, and whether a job came from scheduled queries, BI tools, or API clients.
disputed_statements: []
primary_sources:
  - title: BigQuery INFORMATION_SCHEMA JOBS View
    type: documentation
    year: 2026
    url: https://cloud.google.com/bigquery/docs/information-schema-jobs
    institution: Google Cloud
  - title: BigQuery INFORMATION_SCHEMA JOBS_TIMELINE View
    type: documentation
    year: 2026
    url: https://cloud.google.com/bigquery/docs/information-schema-jobs-timeline
    institution: Google Cloud
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

BigQuery INFORMATION_SCHEMA job views let agents audit query history, user activity, cost signals, and execution timelines from warehouse metadata.

## Core Explanation

Data agents often need to answer who ran a query, which project or reservation it used, when it ran, and whether it was still executing. INFORMATION_SCHEMA job views provide a queryable metadata surface for that diagnosis.

The most useful evidence includes job ID, creation time, user email, statement type, project, reservation, state, error result, bytes processed, slot milliseconds, referenced tables, destination table, labels, and per-timeslice timeline data. Agents should preserve regional scope and permission context because job history is not a global, permission-free log.

## Source-Mapped Facts

- BigQuery documentation says INFORMATION_SCHEMA.JOBS contains near real-time metadata about all BigQuery jobs in the current project. ([source](https://cloud.google.com/bigquery/docs/information-schema-jobs))
- BigQuery documentation says the JOBS and JOBS_BY_PROJECT views are synonymous. ([source](https://cloud.google.com/bigquery/docs/information-schema-jobs))
- BigQuery documentation says INFORMATION_SCHEMA.JOBS_TIMELINE contains near real-time BigQuery metadata by timeslice for jobs submitted in the current project. ([source](https://cloud.google.com/bigquery/docs/information-schema-jobs-timeline))

## Further Reading

- [BigQuery INFORMATION_SCHEMA JOBS View](https://cloud.google.com/bigquery/docs/information-schema-jobs)
- [BigQuery INFORMATION_SCHEMA JOBS_TIMELINE View](https://cloud.google.com/bigquery/docs/information-schema-jobs-timeline)
