---
id: data-kafka-log-compaction-and-tombstones
title: 'Data Kafka Log Compaction and Tombstones'
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
  - id: fact-cs-data-kafka-log-compaction-and-tombstones-1
    statement: >-
      Apache Kafka documentation describes log compaction as retaining at least
      the last known value for each message key within a topic partition.
    source_title: Apache Kafka Log Compaction
    source_url: https://kafka.apache.org/documentation/#compaction
    confidence: medium
  - id: fact-cs-data-kafka-log-compaction-and-tombstones-2
    statement: >-
      Apache Kafka documentation says log compaction gives finer-grained
      per-record retention rather than coarser time-based retention.
    source_title: Apache Kafka Log Compaction
    source_url: https://kafka.apache.org/documentation/#compaction
    confidence: medium
  - id: fact-cs-data-kafka-log-compaction-and-tombstones-3
    statement: >-
      Apache Kafka documentation describes delete markers for compacted topics
      as records that have a key and a null payload.
    source_title: Apache Kafka Log Compaction Design
    source_url: https://kafka.apache.org/documentation/#design_compactionbasics
    confidence: medium
completeness: 0.82
known_gaps:
  - Compaction diagnosis depends on cleanup policy, segment size, min cleanable dirty ratio, delete retention, key serialization stability, transaction markers, consumer replay horizon, and whether downstream sinks handle tombstones.
disputed_statements: []
primary_sources:
  - title: Apache Kafka Log Compaction
    type: documentation
    year: 2026
    url: https://kafka.apache.org/documentation/#compaction
    institution: Apache Kafka
  - title: Apache Kafka Log Compaction Design
    type: documentation
    year: 2026
    url: https://kafka.apache.org/documentation/#design_compactionbasics
    institution: Apache Kafka
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Kafka log compaction and tombstones tell agents whether a stream can be replayed into current state, why old values remain, and how deletes propagate.

## Core Explanation

Compacted topics behave differently from ordinary time-retained event logs. They are often used for changelog, state, and CDC-like streams where the latest value per key matters. A null payload can be meaningful delete evidence, not just a malformed record.

Agents should inspect cleanup.policy, keys, null values, segment age, compaction lag, delete.retention.ms, consumer replay assumptions, sink delete handling, and schema evolution before concluding that a compacted stream lost data.

## Source-Mapped Facts

- Apache Kafka documentation describes log compaction as retaining at least the last known value for each message key within a topic partition. ([source](https://kafka.apache.org/documentation/#compaction))
- Apache Kafka documentation says log compaction gives finer-grained per-record retention rather than coarser time-based retention. ([source](https://kafka.apache.org/documentation/#compaction))
- Apache Kafka documentation describes delete markers for compacted topics as records that have a key and a null payload. ([source](https://kafka.apache.org/documentation/#design_compactionbasics))

## Further Reading

- [Apache Kafka Log Compaction](https://kafka.apache.org/documentation/#compaction)
- [Apache Kafka Log Compaction Design](https://kafka.apache.org/documentation/#design_compactionbasics)
