---
id: data-cdc-lag-and-replication-slots
title: 'Data CDC Lag and Replication Slots'
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
  - id: fact-cs-data-cdc-lag-and-replication-slots-1
    statement: >-
      Debezium documentation describes monitoring metrics for connectors and tasks through
      JMX MBeans.
    source_title: Debezium Monitoring
    source_url: https://debezium.io/documentation/reference/stable/operations/monitoring.html
    confidence: medium
  - id: fact-cs-data-cdc-lag-and-replication-slots-2
    statement: >-
      PostgreSQL documentation describes pg_replication_slots as a view that lists replication
      slots and their state.
    source_title: PostgreSQL pg_replication_slots
    source_url: https://www.postgresql.org/docs/current/view-pg-replication-slots.html
    confidence: medium
  - id: fact-cs-data-cdc-lag-and-replication-slots-3
    statement: >-
      MySQL documentation describes SHOW REPLICA STATUS as a statement that provides status
      information about replica threads.
    source_title: MySQL SHOW REPLICA STATUS
    source_url: https://dev.mysql.com/doc/refman/8.4/en/show-replica-status.html
    confidence: medium
completeness: 0.83
known_gaps:
  - CDC lag diagnosis depends on source commit rate, connector offsets, replication slot retention, downstream backpressure, schema changes, and broker availability.
disputed_statements: []
primary_sources:
  - title: Debezium Monitoring
    type: documentation
    year: 2026
    url: https://debezium.io/documentation/reference/stable/operations/monitoring.html
    institution: Debezium
  - title: PostgreSQL pg_replication_slots
    type: documentation
    year: 2026
    url: https://www.postgresql.org/docs/current/view-pg-replication-slots.html
    institution: PostgreSQL
  - title: MySQL SHOW REPLICA STATUS
    type: documentation
    year: 2026
    url: https://dev.mysql.com/doc/refman/8.4/en/show-replica-status.html
    institution: Oracle MySQL
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

CDC lag and replication slots tell agents whether downstream data is fresh, stalled, or at risk of retaining too much source log history.

## Core Explanation

Change data capture pipelines depend on a continuous path from source commits to connector offsets and downstream consumers. A healthy source database can still produce stale analytics if the CDC connector is lagging or a replication slot stops advancing.

Agents should inspect slot state, retained log position, connector offsets, source lag metrics, downstream consumer lag, schema-change errors, and recent restarts before recommending a resync or backfill.

## Source-Mapped Facts

- Debezium documentation describes monitoring metrics for connectors and tasks through JMX MBeans. ([source](https://debezium.io/documentation/reference/stable/operations/monitoring.html))
- PostgreSQL documentation describes pg_replication_slots as a view that lists replication slots and their state. ([source](https://www.postgresql.org/docs/current/view-pg-replication-slots.html))
- MySQL documentation describes SHOW REPLICA STATUS as a statement that provides status information about replica threads. ([source](https://dev.mysql.com/doc/refman/8.4/en/show-replica-status.html))

## Further Reading

- [Debezium Monitoring](https://debezium.io/documentation/reference/stable/operations/monitoring.html)
- [PostgreSQL pg_replication_slots](https://www.postgresql.org/docs/current/view-pg-replication-slots.html)
- [MySQL SHOW REPLICA STATUS](https://dev.mysql.com/doc/refman/8.4/en/show-replica-status.html)
