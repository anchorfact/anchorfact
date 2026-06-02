---
id: agent-postgresql-pg-stat-activity-and-query-cancellation
title: 'Agent PostgreSQL pg_stat_activity and Query Cancellation'
schema_type: TechArticle
category: ai
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
  - id: fact-ai-agent-postgresql-pg-stat-activity-and-query-cancellation-1
    statement: >-
      PostgreSQL documentation says pg_stat_activity has one row per server
      process and shows information related to current activity.
    source_title: PostgreSQL Monitoring Statistics
    source_url: https://www.postgresql.org/docs/current/monitoring-stats.html
    confidence: medium
  - id: fact-ai-agent-postgresql-pg-stat-activity-and-query-cancellation-2
    statement: >-
      PostgreSQL documentation says pg_stat_activity exposes columns such as
      pid, state, query_start, wait_event_type, wait_event, and query.
    source_title: PostgreSQL Monitoring Statistics
    source_url: https://www.postgresql.org/docs/current/monitoring-stats.html
    confidence: medium
  - id: fact-ai-agent-postgresql-pg-stat-activity-and-query-cancellation-3
    statement: >-
      PostgreSQL documentation describes pg_cancel_backend as canceling the
      current query of a backend process.
    source_title: PostgreSQL Server Signaling Functions
    source_url: https://www.postgresql.org/docs/current/functions-admin.html
    confidence: medium
completeness: 0.82
known_gaps:
  - PostgreSQL activity evidence depends on role privileges, query text visibility, transaction age, wait events, locks, connection pool behavior, statement timeout settings, replicas, and whether canceling a query is safer than terminating a backend.
disputed_statements: []
primary_sources:
  - title: PostgreSQL Monitoring Statistics
    type: documentation
    year: 2026
    url: https://www.postgresql.org/docs/current/monitoring-stats.html
    institution: PostgreSQL
  - title: PostgreSQL Server Signaling Functions
    type: documentation
    year: 2026
    url: https://www.postgresql.org/docs/current/functions-admin.html
    institution: PostgreSQL
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

pg_stat_activity and query-cancel functions help agents distinguish idle sessions, blocked queries, long-running work, and unsafe database interventions.

## Core Explanation

Database incidents often look like generic slowness from the outside. pg_stat_activity gives process-level activity evidence, including query state and wait context, while signaling functions provide controlled ways to cancel active work.

Agents should preserve pid, database, user, application_name, state, wait events, query_start, transaction age, blocking sessions, and application impact before suggesting cancellation or termination.

## Source-Mapped Facts

- PostgreSQL documentation says pg_stat_activity has one row per server process and shows information related to current activity. ([source](https://www.postgresql.org/docs/current/monitoring-stats.html))
- PostgreSQL documentation says pg_stat_activity exposes columns such as pid, state, query_start, wait_event_type, wait_event, and query. ([source](https://www.postgresql.org/docs/current/monitoring-stats.html))
- PostgreSQL documentation describes pg_cancel_backend as canceling the current query of a backend process. ([source](https://www.postgresql.org/docs/current/functions-admin.html))

## Further Reading

- [PostgreSQL Monitoring Statistics](https://www.postgresql.org/docs/current/monitoring-stats.html)
- [PostgreSQL Server Signaling Functions](https://www.postgresql.org/docs/current/functions-admin.html)
