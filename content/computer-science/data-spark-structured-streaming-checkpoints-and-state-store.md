---
id: data-spark-structured-streaming-checkpoints-and-state-store
title: 'Data Spark Structured Streaming Checkpoints and State Store'
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
  - id: fact-cs-data-spark-structured-streaming-checkpoints-and-state-store-1
    statement: >-
      Apache Spark Structured Streaming documentation says checkpointing and
      write-ahead logs can recover previous progress and state after failure or
      intentional shutdown.
    source_title: Spark Structured Streaming Programming Guide
    source_url: https://spark.apache.org/docs/latest/streaming/apis-on-dataframes-and-datasets.html
    confidence: medium
  - id: fact-cs-data-spark-structured-streaming-checkpoints-and-state-store-2
    statement: >-
      Apache Spark documentation says the state store is a versioned key-value
      store used to handle stateful operations across batches.
    source_title: Spark Structured Streaming Programming Guide
    source_url: https://spark.apache.org/docs/latest/streaming/apis-on-dataframes-and-datasets.html
    confidence: medium
  - id: fact-cs-data-spark-structured-streaming-checkpoints-and-state-store-3
    statement: >-
      Apache Spark Structured Streaming additional information says some
      configurations are not modifiable after a query has run and require
      discarding the checkpoint to change them.
    source_title: Spark Structured Streaming Additional Information
    source_url: https://spark.apache.org/docs/latest/streaming/additional-information.html
    confidence: medium
completeness: 0.84
known_gaps:
  - Restart safety depends on Spark version, source type, sink type, output mode, state schema, checkpoint path, trigger interval, shuffle partitions, watermark policy, state store provider, and whether the stream is replaying old input.
  - Deleting or reusing a checkpoint can reset offsets, duplicate outputs, or make stateful operators incompatible with the new query shape.
disputed_statements: []
primary_sources:
  - title: Spark Structured Streaming Programming Guide
    type: documentation
    year: 2026
    url: https://spark.apache.org/docs/latest/streaming/apis-on-dataframes-and-datasets.html
    institution: Apache Spark
  - title: Spark Structured Streaming Additional Information
    type: documentation
    year: 2026
    url: https://spark.apache.org/docs/latest/streaming/additional-information.html
    institution: Apache Spark
  - title: Spark Structured Streaming State Data Source Guide
    type: documentation
    year: 2026
    url: https://spark.apache.org/docs/latest/streaming/structured-streaming-state-data-source.html
    institution: Apache Spark
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Spark Structured Streaming checkpoints and state stores are production evidence: they determine whether a stream can resume safely, whether stateful work is compatible after a code change, and whether a restart risks duplicate or missing data.

## Core Explanation

Agents debugging a Spark stream should collect the checkpoint location, query ID, source offsets, sink, output mode, stateful operators, state store provider, Spark version, and recent restart history before recommending a rerun or checkpoint deletion. A checkpoint is not just a cache; it encodes progress and state.

Stateful operators such as aggregations, deduplication, joins, and mapGroupsWithState can carry large state across micro-batches. Changing partitioning, source shape, state schema, or state store settings can make a restart from the same checkpoint unsafe or undefined. A safe remediation names whether the goal is resume, replay, backfill, or reset.

## Source-Mapped Facts

- Apache Spark Structured Streaming documentation says checkpointing and write-ahead logs can recover previous progress and state after failure or intentional shutdown. ([source](https://spark.apache.org/docs/latest/streaming/apis-on-dataframes-and-datasets.html))
- Apache Spark documentation says the state store is a versioned key-value store used to handle stateful operations across batches. ([source](https://spark.apache.org/docs/latest/streaming/apis-on-dataframes-and-datasets.html))
- Apache Spark Structured Streaming additional information says some configurations are not modifiable after a query has run and require discarding the checkpoint to change them. ([source](https://spark.apache.org/docs/latest/streaming/additional-information.html))

## Further Reading

- [Spark Structured Streaming Programming Guide](https://spark.apache.org/docs/latest/streaming/apis-on-dataframes-and-datasets.html)
- [Spark Structured Streaming Additional Information](https://spark.apache.org/docs/latest/streaming/additional-information.html)
- [Spark Structured Streaming State Data Source Guide](https://spark.apache.org/docs/latest/streaming/structured-streaming-state-data-source.html)
