---
id: data-warehouse-query-history-and-job-metadata
title: 'Data Warehouse Query History and Job Metadata'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-02'
created_date: '2026-06-02'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-data-warehouse-query-history-and-job-metadata-1
    statement: >-
      BigQuery documentation describes INFORMATION_SCHEMA.JOBS views as containing metadata about
      BigQuery jobs.
    source_title: BigQuery INFORMATION_SCHEMA JOBS
    source_url: https://cloud.google.com/bigquery/docs/information-schema-jobs
    confidence: medium
  - id: fact-data-warehouse-query-history-and-job-metadata-2
    statement: >-
      Snowflake documentation describes QUERY_HISTORY as an Account Usage view for query history.
    source_title: Snowflake QUERY_HISTORY
    source_url: https://docs.snowflake.com/en/sql-reference/account-usage/query_history
    confidence: medium
  - id: fact-data-warehouse-query-history-and-job-metadata-3
    statement: >-
      Amazon Athena documentation describes viewing recent queries in query history.
    source_title: Amazon Athena Query History
    source_url: https://docs.aws.amazon.com/athena/latest/ug/querying-query-history.html
    confidence: medium
completeness: 0.83
known_gaps:
  - Query history availability depends on retention windows, permissions, warehouse edition, region, and audit logging configuration.
disputed_statements: []
primary_sources:
  - title: BigQuery INFORMATION_SCHEMA JOBS
    type: documentation
    year: 2026
    url: https://cloud.google.com/bigquery/docs/information-schema-jobs
    institution: Google Cloud
  - title: Snowflake QUERY_HISTORY
    type: documentation
    year: 2026
    url: https://docs.snowflake.com/en/sql-reference/account-usage/query_history
    institution: Snowflake
  - title: Amazon Athena Query History
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/athena/latest/ug/querying-query-history.html
    institution: Amazon Web Services
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Query history and job metadata let agents explain warehouse cost, latency, failures, and data access without guessing.

## Core Explanation

Data warehouses expose operational metadata about submitted jobs, executed queries, users, timestamps, bytes scanned, durations, and errors. Agents can use that evidence to identify expensive queries, failed jobs, stale dashboards, and unexpected access patterns.

Agents should treat query history as sensitive operational data. A useful answer cites the warehouse, job ID, time window, user or service account, and query text handling policy. It should not expose private query text unless the workflow explicitly permits it.

## Source-Mapped Facts

- BigQuery documentation describes INFORMATION_SCHEMA.JOBS views as containing metadata about BigQuery jobs. ([source](https://cloud.google.com/bigquery/docs/information-schema-jobs))
- Snowflake documentation describes QUERY_HISTORY as an Account Usage view for query history. ([source](https://docs.snowflake.com/en/sql-reference/account-usage/query_history))
- Amazon Athena documentation describes viewing recent queries in query history. ([source](https://docs.aws.amazon.com/athena/latest/ug/querying-query-history.html))

## Further Reading

- [BigQuery INFORMATION_SCHEMA JOBS](https://cloud.google.com/bigquery/docs/information-schema-jobs)
- [Snowflake QUERY_HISTORY](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)
- [Amazon Athena Query History](https://docs.aws.amazon.com/athena/latest/ug/querying-query-history.html)
