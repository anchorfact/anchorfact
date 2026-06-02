---
id: change-data-capture
title: 'Change Data Capture'
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
  - id: fact-change-data-capture-1
    statement: >-
      Debezium documentation describes Debezium as a distributed platform for change data capture.
    source_title: Debezium documentation
    source_url: https://debezium.io/documentation/reference/stable/index.html
  - id: fact-change-data-capture-2
    statement: >-
      PostgreSQL documentation says logical decoding extracts changes committed to a database table into an easy-to-understand format.
    source_title: PostgreSQL logical decoding
    source_url: https://www.postgresql.org/docs/current/logicaldecoding.html
  - id: fact-change-data-capture-3
    statement: >-
      Confluent documentation describes Kafka Connect as a tool for streaming data between Apache Kafka and other systems.
    source_title: Kafka Connect
    source_url: https://docs.confluent.io/platform/current/connect/index.html
completeness: 0.84
known_gaps:
  - CDC semantics depend on source database logs, connector behavior, schema evolution, snapshot mode, and exactly-once guarantees of the sink.
disputed_statements: []
primary_sources:
  - title: Debezium documentation
    type: documentation
    year: 2026
    url: https://debezium.io/documentation/reference/stable/index.html
    institution: Debezium
  - title: PostgreSQL logical decoding
    type: documentation
    year: 2026
    url: https://www.postgresql.org/docs/current/logicaldecoding.html
    institution: PostgreSQL
  - title: Kafka Connect
    type: documentation
    year: 2026
    url: https://docs.confluent.io/platform/current/connect/index.html
    institution: Confluent
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Change data capture captures committed database changes and streams them to other systems such as search indexes, data warehouses, caches, or event pipelines.

## Core Explanation

CDC is common in data infrastructure because it avoids heavy polling and allows downstream systems to react to changes. Database log decoding, connector frameworks, and streaming platforms form the usual stack. Engineers still need to reason about snapshots, ordering, schema evolution, backfills, and duplicate handling.

## Source-Mapped Facts

- Debezium documentation describes Debezium as a distributed platform for change data capture. ([source](https://debezium.io/documentation/reference/stable/index.html))
- PostgreSQL documentation says logical decoding extracts changes committed to a database table into an easy-to-understand format. ([source](https://www.postgresql.org/docs/current/logicaldecoding.html))
- Confluent documentation describes Kafka Connect as a tool for streaming data between Apache Kafka and other systems. ([source](https://docs.confluent.io/platform/current/connect/index.html))

## Further Reading

- [Debezium documentation](https://debezium.io/documentation/reference/stable/index.html)
- [PostgreSQL logical decoding](https://www.postgresql.org/docs/current/logicaldecoding.html)
- [Kafka Connect](https://docs.confluent.io/platform/current/connect/index.html)
