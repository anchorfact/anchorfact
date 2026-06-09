---
id: data-clickhouse-query-log-and-query-thread-log
title: 'Data ClickHouse Query Log and Query Thread Log'
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
  - id: fact-cs-data-clickhouse-query-log-and-query-thread-log-1
    statement: >-
      ClickHouse system.query_log documentation says the table contains
      information about executed queries such as start time, duration, and error
      messages.
    source_title: ClickHouse system.query_log
    source_url: https://clickhouse.com/docs/operations/system-tables/query_log
    confidence: medium
  - id: fact-cs-data-clickhouse-query-log-and-query-thread-log-2
    statement: >-
      ClickHouse system.query_log documentation lists columns including query_id,
      query_duration_ms, read_rows, read_bytes, written_rows, and memory_usage.
    source_title: ClickHouse system.query_log
    source_url: https://clickhouse.com/docs/operations/system-tables/query_log
    confidence: medium
  - id: fact-cs-data-clickhouse-query-log-and-query-thread-log-3
    statement: >-
      ClickHouse system.query_log documentation says data in ClickHouse Cloud is
      held locally on each node and a complete view requires clusterAllReplicas.
    source_title: ClickHouse system.query_log
    source_url: https://clickhouse.com/docs/operations/system-tables/query_log
    confidence: medium
  - id: fact-cs-data-clickhouse-query-log-and-query-thread-log-4
    statement: >-
      ClickHouse system.query_thread_log documentation says the table contains
      information about threads that execute queries, including thread name,
      thread start time, and query processing duration.
    source_title: ClickHouse system.query_thread_log
    source_url: https://clickhouse.com/docs/operations/system-tables/query_thread_log
    confidence: medium
  - id: fact-cs-data-clickhouse-query-log-and-query-thread-log-5
    statement: >-
      ClickHouse system.query_thread_log documentation says query_thread_log
      logging requires configuring query_thread_log parameters and setting
      log_query_threads to 1.
    source_title: ClickHouse system.query_thread_log
    source_url: https://clickhouse.com/docs/operations/system-tables/query_thread_log
    confidence: medium
completeness: 0.82
known_gaps:
  - ClickHouse query-log diagnosis depends on server settings, flush interval, sampling probability, distributed query topology, clusterAllReplicas use, query_id propagation, user permissions, retention policy, and whether logs were flushed before inspection.
disputed_statements: []
primary_sources:
  - title: ClickHouse system.query_log
    type: documentation
    year: 2026
    url: https://clickhouse.com/docs/operations/system-tables/query_log
    institution: ClickHouse
  - title: ClickHouse system.query_thread_log
    type: documentation
    year: 2026
    url: https://clickhouse.com/docs/operations/system-tables/query_thread_log
    institution: ClickHouse
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

ClickHouse query logs give data agents query-level and thread-level evidence for latency, memory, scanned rows, errors, and distributed execution.

## Core Explanation

Analytical incidents often start with a user saying a dashboard or data job is slow. In ClickHouse, `system.query_log` and `system.query_thread_log` provide evidence about what ran, how long it took, how much data it read or wrote, and which threads participated.

Agents should preserve query ID, normalized query hash, user, database, duration, read rows, read bytes, memory usage, exception fields, thread records, and cluster scope. In ClickHouse Cloud, node-local system tables mean a single-node query can miss relevant records unless the inspection uses the cluster-aware path.

## Source-Mapped Facts

- ClickHouse system.query_log documentation says the table contains information about executed queries such as start time, duration, and error messages. ([source](https://clickhouse.com/docs/operations/system-tables/query_log))
- ClickHouse system.query_log documentation lists columns including query_id, query_duration_ms, read_rows, read_bytes, written_rows, and memory_usage. ([source](https://clickhouse.com/docs/operations/system-tables/query_log))
- ClickHouse system.query_log documentation says data in ClickHouse Cloud is held locally on each node and a complete view requires clusterAllReplicas. ([source](https://clickhouse.com/docs/operations/system-tables/query_log))
- ClickHouse system.query_thread_log documentation says the table contains information about threads that execute queries, including thread name, thread start time, and query processing duration. ([source](https://clickhouse.com/docs/operations/system-tables/query_thread_log))
- ClickHouse system.query_thread_log documentation says query_thread_log logging requires configuring query_thread_log parameters and setting log_query_threads to 1. ([source](https://clickhouse.com/docs/operations/system-tables/query_thread_log))

## Further Reading

- [ClickHouse system.query_log](https://clickhouse.com/docs/operations/system-tables/query_log)
- [ClickHouse system.query_thread_log](https://clickhouse.com/docs/operations/system-tables/query_thread_log)
