---
id: agent-database-query-plans-and-slow-query-logs
title: 'Agent Database Query Plans and Slow Query Logs'
schema_type: TechArticle
category: ai
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
  - id: fact-ai-agent-database-query-plans-and-slow-query-logs-1
    statement: >-
      PostgreSQL documentation says EXPLAIN shows the execution plan generated for a supplied
      statement.
    source_title: PostgreSQL Using EXPLAIN
    source_url: https://www.postgresql.org/docs/current/using-explain.html
    confidence: medium
  - id: fact-ai-agent-database-query-plans-and-slow-query-logs-2
    statement: >-
      MySQL documentation says EXPLAIN provides information about how MySQL executes statements.
    source_title: MySQL EXPLAIN Output Format
    source_url: https://dev.mysql.com/doc/refman/8.4/en/explain-output.html
    confidence: medium
  - id: fact-ai-agent-database-query-plans-and-slow-query-logs-3
    statement: >-
      MySQL documentation says the slow query log contains SQL statements that take more than
      long_query_time seconds to execute.
    source_title: MySQL Slow Query Log
    source_url: https://dev.mysql.com/doc/refman/8.4/en/slow-query-log.html
    confidence: medium
completeness: 0.83
known_gaps:
  - Query plan costs, row estimates, lock waits, and slow log settings are engine-specific and need current production context.
disputed_statements: []
primary_sources:
  - title: PostgreSQL Using EXPLAIN
    type: documentation
    year: 2026
    url: https://www.postgresql.org/docs/current/using-explain.html
    institution: PostgreSQL
  - title: MySQL EXPLAIN Output Format
    type: documentation
    year: 2026
    url: https://dev.mysql.com/doc/refman/8.4/en/explain-output.html
    institution: MySQL
  - title: MySQL Slow Query Log
    type: documentation
    year: 2026
    url: https://dev.mysql.com/doc/refman/8.4/en/slow-query-log.html
    institution: MySQL
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Database-aware agents need query plans and slow query logs before they suggest indexes, rewrites, or incident mitigations.

## Core Explanation

Query plans explain how a database intends to access tables, join rows, and apply filters. Slow query logs show statements that actually exceeded configured execution thresholds. Together, they help agents separate a plausible optimization idea from a production-safe recommendation.

Agents should treat plans and logs as evidence, not as automatic permission to mutate schemas. A slow query may be caused by missing indexes, stale statistics, lock contention, parameter skew, or a transient workload spike. Reliable automation should cite the plan, slow log window, affected query shape, and any proposed rollback path.

## Source-Mapped Facts

- PostgreSQL documentation says EXPLAIN shows the execution plan generated for a supplied statement. ([source](https://www.postgresql.org/docs/current/using-explain.html))
- MySQL documentation says EXPLAIN provides information about how MySQL executes statements. ([source](https://dev.mysql.com/doc/refman/8.4/en/explain-output.html))
- MySQL documentation says the slow query log contains SQL statements that take more than long_query_time seconds to execute. ([source](https://dev.mysql.com/doc/refman/8.4/en/slow-query-log.html))

## Further Reading

- [PostgreSQL Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html)
- [MySQL EXPLAIN Output Format](https://dev.mysql.com/doc/refman/8.4/en/explain-output.html)
- [MySQL Slow Query Log](https://dev.mysql.com/doc/refman/8.4/en/slow-query-log.html)
