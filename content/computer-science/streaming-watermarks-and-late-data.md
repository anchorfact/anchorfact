---
id: streaming-watermarks-and-late-data
title: 'Streaming Watermarks and Late Data'
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
  - id: fact-computer-science-streaming-watermarks-and-late-data-1
    statement: >-
      Apache Beam documentation describes watermarks and late data as part of Beam windowing behavior.
    source_title: Apache Beam Basics
    source_url: https://beam.apache.org/documentation/basics/
    confidence: medium
  - id: fact-computer-science-streaming-watermarks-and-late-data-2
    statement: >-
      Kafka Streams documentation says a grace period controls how long Kafka Streams waits for out-of-order data records for a window.
    source_title: Kafka Streams Core Concepts
    source_url: https://kafka.apache.org/30/streams/core-concepts/
    confidence: medium
  - id: fact-computer-science-streaming-watermarks-and-late-data-3
    statement: >-
      Google Cloud Dataflow streaming documentation discusses event time, watermarks, windows, and late data for streaming pipelines.
    source_title: Google Cloud Dataflow Streaming Pipelines
    source_url: https://docs.cloud.google.com/dataflow/docs/concepts/streaming-pipelines
    confidence: medium
completeness: 0.83
known_gaps:
  - Watermark behavior depends on source connectors, clocks, event-time extraction, allowed lateness, and runner implementation.
disputed_statements: []
primary_sources:
  - title: Apache Beam Basics
    type: documentation
    year: 2026
    url: https://beam.apache.org/documentation/basics/
    institution: Apache Beam
  - title: Kafka Streams Core Concepts
    type: documentation
    year: 2026
    url: https://kafka.apache.org/30/streams/core-concepts/
    institution: Apache Kafka
  - title: Google Cloud Dataflow Streaming Pipelines
    type: documentation
    year: 2026
    url: https://docs.cloud.google.com/dataflow/docs/concepts/streaming-pipelines
    institution: Google Cloud
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Watermarks and late-data policies define when a streaming pipeline believes a window is complete, and what happens when older events arrive afterward.

## Core Explanation

Data infrastructure for agents often includes fresh event streams, metrics, logs, and feature updates. Event time and processing time can diverge when devices buffer events, networks delay messages, or backfills replay old data.

Agents querying streaming data need to understand whether a metric is final, provisional, or still accepting late arrivals. Otherwise they may summarize incomplete data as if it were settled truth.

## Source-Mapped Facts

- Apache Beam documentation describes watermarks and late data as part of Beam windowing behavior. ([source](https://beam.apache.org/documentation/basics/))
- Kafka Streams documentation says a grace period controls how long Kafka Streams waits for out-of-order data records for a window. ([source](https://kafka.apache.org/30/streams/core-concepts/))
- Google Cloud Dataflow streaming documentation discusses event time, watermarks, windows, and late data for streaming pipelines. ([source](https://docs.cloud.google.com/dataflow/docs/concepts/streaming-pipelines))

## Further Reading

- [Apache Beam Basics](https://beam.apache.org/documentation/basics/)
- [Kafka Streams Core Concepts](https://kafka.apache.org/30/streams/core-concepts/)
- [Google Cloud Dataflow Streaming Pipelines](https://docs.cloud.google.com/dataflow/docs/concepts/streaming-pipelines)
