---
id: data-kafka-connect-error-tolerance-and-dead-letter-queues
title: 'Data Kafka Connect Error Tolerance and Dead Letter Queues'
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
  - id: fact-cs-data-kafka-connect-error-tolerance-and-dead-letter-queues-1
    statement: >-
      Confluent Kafka Connect documentation says an invalid sink record is handled
      based on the connector errors.tolerance configuration property.
    source_title: Confluent Kafka Connect Dead Letter Queue
    source_url: https://docs.confluent.io/platform/current/connect/concepts.html#dead-letter-queue
    confidence: medium
  - id: fact-cs-data-kafka-connect-error-tolerance-and-dead-letter-queues-2
    statement: >-
      Confluent Kafka Connect documentation says errors.tolerance has two valid
      values, none by default and all.
    source_title: Confluent Kafka Connect Dead Letter Queue
    source_url: https://docs.confluent.io/platform/current/connect/concepts.html#dead-letter-queue
    confidence: medium
  - id: fact-cs-data-kafka-connect-error-tolerance-and-dead-letter-queues-3
    statement: >-
      Apache Kafka Connect configuration documentation says
      errors.deadletterqueue.topic.name names the topic used as the dead-letter
      queue for messages that error in a sink connector, transformations, or
      converters.
    source_title: Apache Kafka Connect Configuration
    source_url: https://kafka.apache.org/43/configuration/kafka-connect-configs/
    confidence: medium
completeness: 0.82
known_gaps:
  - DLQ diagnosis depends on connector type, sink versus source behavior, serialization format, converter settings, task logs, topic ACLs, DLQ topic retention, context header settings, reporter configuration, and whether ignored records still affect downstream completeness SLAs.
disputed_statements: []
primary_sources:
  - title: Confluent Kafka Connect Dead Letter Queue
    type: documentation
    year: 2026
    url: https://docs.confluent.io/platform/current/connect/concepts.html#dead-letter-queue
    institution: Confluent
  - title: Apache Kafka Connect Configuration
    type: documentation
    year: 2026
    url: https://kafka.apache.org/43/configuration/kafka-connect-configs/
    institution: Apache Kafka
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Kafka Connect error tolerance and dead-letter queues tell agents whether a pipeline failed fast, skipped bad records, or continued while routing failed records elsewhere.

## Core Explanation

A Kafka Connect connector can look healthy while silently dropping or rerouting records if error tolerance and DLQ settings allow processing to continue. That is useful for availability, but it changes the evidence agents need when investigating missing rows, stale dashboards, or schema-related sink failures.

Agents should collect the connector configuration, `errors.tolerance`, `errors.deadletterqueue.topic.name`, context header settings, converter configuration, failed task traces, DLQ topic offsets, sample failed records, schema IDs, and downstream completeness checks before deciding whether a data incident is resolved.

## Source-Mapped Facts

- Confluent Kafka Connect documentation says an invalid sink record is handled based on the connector errors.tolerance configuration property. ([source](https://docs.confluent.io/platform/current/connect/concepts.html#dead-letter-queue))
- Confluent Kafka Connect documentation says errors.tolerance has two valid values, none by default and all. ([source](https://docs.confluent.io/platform/current/connect/concepts.html#dead-letter-queue))
- Apache Kafka Connect configuration documentation says errors.deadletterqueue.topic.name names the topic used as the dead-letter queue for messages that error in a sink connector, transformations, or converters. ([source](https://kafka.apache.org/43/configuration/kafka-connect-configs/))

## Further Reading

- [Confluent Kafka Connect Dead Letter Queue](https://docs.confluent.io/platform/current/connect/concepts.html#dead-letter-queue)
- [Apache Kafka Connect Configuration](https://kafka.apache.org/43/configuration/kafka-connect-configs/)
