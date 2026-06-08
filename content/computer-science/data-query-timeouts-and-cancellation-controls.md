---
id: data-query-timeouts-and-cancellation-controls
title: 'Data Query Timeouts and Cancellation Controls'
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
  - id: fact-cs-data-query-timeouts-and-cancellation-controls-1
    statement: >-
      PostgreSQL documentation describes statement_timeout as a setting that
      aborts statements running longer than the configured duration.
    source_title: PostgreSQL statement_timeout
    source_url: https://www.postgresql.org/docs/current/runtime-config-client.html
    confidence: medium
  - id: fact-cs-data-query-timeouts-and-cancellation-controls-2
    statement: >-
      Snowflake documentation describes SYSTEM$CANCEL_QUERY as a function for
      canceling a running query by query ID.
    source_title: Snowflake SYSTEM$CANCEL_QUERY
    source_url: https://docs.snowflake.com/en/sql-reference/functions/system_cancel_query
    confidence: medium
  - id: fact-cs-data-query-timeouts-and-cancellation-controls-3
    statement: >-
      BigQuery REST documentation defines a jobs.cancel method for canceling a
      specified job.
    source_title: BigQuery jobs.cancel
    source_url: https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/cancel
    confidence: medium
completeness: 0.84
known_gaps:
  - Cancellation behavior depends on warehouse engine, permissions, transaction state, lock handling, queued jobs, retries, client timeout, and whether cancellation stops billing immediately.
  - Killing a query can unblock capacity while also interrupting writes, exports, transformations, or downstream jobs that depend on its result.
disputed_statements: []
primary_sources:
  - title: PostgreSQL statement_timeout
    type: documentation
    year: 2026
    url: https://www.postgresql.org/docs/current/runtime-config-client.html
    institution: PostgreSQL
  - title: Snowflake SYSTEM$CANCEL_QUERY
    type: documentation
    year: 2026
    url: https://docs.snowflake.com/en/sql-reference/functions/system_cancel_query
    institution: Snowflake
  - title: BigQuery jobs.cancel
    type: documentation
    year: 2026
    url: https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/cancel
    institution: Google Cloud
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Timeouts and cancellation controls help data agents stop runaway queries, but they need query IDs, permissions, and transaction context before acting.

## Core Explanation

Long-running queries can consume warehouse capacity, block locks, delay pipelines, or surprise a team with cost. Agents need to know how to inspect and stop a query without guessing from a console message.

Useful evidence includes query ID, user or role, warehouse or database, statement text, start time, wait event, lock state, estimated cost, destination table, transaction state, client timeout, server timeout, and cancellation permission. A timeout configured on the client is different from a server-side statement limit, and canceling a query is different from terminating a session.

Agents should prefer read-only diagnosis before cancellation. When a query is destructive, transactional, or part of a pipeline, cancellation should require explicit owner or operator review.

## Source-Mapped Facts

- PostgreSQL documentation describes statement_timeout as a setting that aborts statements running longer than the configured duration. ([source](https://www.postgresql.org/docs/current/runtime-config-client.html))
- Snowflake documentation describes SYSTEM$CANCEL_QUERY as a function for canceling a running query by query ID. ([source](https://docs.snowflake.com/en/sql-reference/functions/system_cancel_query))
- BigQuery REST documentation defines a jobs.cancel method for canceling a specified job. ([source](https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/cancel))

## Further Reading

- [PostgreSQL statement_timeout](https://www.postgresql.org/docs/current/runtime-config-client.html)
- [Snowflake SYSTEM$CANCEL_QUERY](https://docs.snowflake.com/en/sql-reference/functions/system_cancel_query)
- [BigQuery jobs.cancel](https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/cancel)
