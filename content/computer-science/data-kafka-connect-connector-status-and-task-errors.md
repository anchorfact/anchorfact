---
id: data-kafka-connect-connector-status-and-task-errors
title: 'Data Kafka Connect Connector Status and Task Errors'
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
  - id: fact-cs-data-kafka-connect-connector-status-and-task-errors-1
    statement: >-
      Apache Kafka Connect administration documentation says the Connect REST API
      includes APIs to view connector configuration and task status.
    source_title: Apache Kafka Connect Administration
    source_url: https://kafka.apache.org/43/kafka-connect/administration/
    confidence: medium
  - id: fact-cs-data-kafka-connect-connector-status-and-task-errors-2
    statement: >-
      Confluent Kafka Connect REST API documentation says GET /connectors/{name}/status
      gets current connector status, including whether it is running, restarting,
      failed, or paused.
    source_title: Confluent Kafka Connect REST API
    source_url: https://docs.confluent.io/platform/current/connect/references/restapi.html
    confidence: medium
  - id: fact-cs-data-kafka-connect-connector-status-and-task-errors-3
    statement: >-
      Confluent Kafka Connect REST API documentation says connector status includes
      error information if it has failed and the state of all its tasks.
    source_title: Confluent Kafka Connect REST API
    source_url: https://docs.confluent.io/platform/current/connect/references/restapi.html
    confidence: medium
completeness: 0.82
known_gaps:
  - Connector diagnosis depends on worker logs, connector plugin version, task assignment, rebalance timing, source offsets, sink commit semantics, retry and dead-letter settings, topic ACLs, schema compatibility, and whether the failed task has already been restarted.
disputed_statements: []
primary_sources:
  - title: Apache Kafka Connect Administration
    type: documentation
    year: 2026
    url: https://kafka.apache.org/43/kafka-connect/administration/
    institution: Apache Kafka
  - title: Confluent Kafka Connect REST API
    type: documentation
    year: 2026
    url: https://docs.confluent.io/platform/current/connect/references/restapi.html
    institution: Confluent
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Kafka Connect connector status and task errors help agents distinguish a broken data pipeline from a paused connector, worker rebalance, failed task, or stale offset problem.

## Core Explanation

Kafka Connect spreads connector work across tasks and workers. A connector-level summary is not enough: one task can fail while another continues, a worker rebalance can temporarily move assignments, and a restart can hide the original error unless the agent captures status and logs first.

Agents troubleshooting data freshness should collect connector name, connector class, worker ID, connector state, every task state, trace or error text, last restart, source offsets, sink topic or table, schema version, dead-letter settings, and whether the REST status came before or after any restart attempt.

## Source-Mapped Facts

- Apache Kafka Connect administration documentation says the Connect REST API includes APIs to view connector configuration and task status. ([source](https://kafka.apache.org/43/kafka-connect/administration/))
- Confluent Kafka Connect REST API documentation says GET /connectors/{name}/status gets current connector status, including whether it is running, restarting, failed, or paused. ([source](https://docs.confluent.io/platform/current/connect/references/restapi.html))
- Confluent Kafka Connect REST API documentation says connector status includes error information if it has failed and the state of all its tasks. ([source](https://docs.confluent.io/platform/current/connect/references/restapi.html))

## Further Reading

- [Apache Kafka Connect Administration](https://kafka.apache.org/43/kafka-connect/administration/)
- [Confluent Kafka Connect REST API](https://docs.confluent.io/platform/current/connect/references/restapi.html)
