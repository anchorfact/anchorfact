---
id: data-kafka-consumer-group-offsets-and-rebalancing
title: 'Data Kafka Consumer Group Offsets and Rebalancing'
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
  - id: fact-cs-data-kafka-consumer-group-offsets-and-rebalancing-1
    statement: >-
      Apache Kafka KafkaConsumer Javadoc says the consumer interacts with the
      broker to allow groups of consumers to load balance consumption using
      consumer groups.
    source_title: Apache Kafka KafkaConsumer Javadoc
    source_url: https://kafka.apache.org/38/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html
    confidence: medium
  - id: fact-cs-data-kafka-consumer-group-offsets-and-rebalancing-2
    statement: >-
      Apache Kafka KafkaConsumer Javadoc says each partition in a subscribed
      topic is assigned to one process in each consumer group.
    source_title: Apache Kafka KafkaConsumer Javadoc
    source_url: https://kafka.apache.org/38/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html
    confidence: medium
  - id: fact-cs-data-kafka-consumer-group-offsets-and-rebalancing-3
    statement: >-
      Apache Kafka documentation has a consumer configuration named group.id
      that identifies the consumer group to which a consumer belongs.
    source_title: Apache Kafka Consumer Configuration
    source_url: https://kafka.apache.org/documentation/#consumerconfigs_group.id
    confidence: medium
completeness: 0.82
known_gaps:
  - Kafka lag diagnosis depends on assignment strategy, static membership, commit mode, max poll interval, cooperative rebalancing, partition count, transactional reads, retention, broker version, and downstream processing time.
disputed_statements: []
primary_sources:
  - title: Apache Kafka KafkaConsumer Javadoc
    type: documentation
    year: 2024
    url: https://kafka.apache.org/38/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html
    institution: Apache Kafka
  - title: Apache Kafka Consumer Configuration
    type: documentation
    year: 2026
    url: https://kafka.apache.org/documentation/#consumerconfigs_group.id
    institution: Apache Kafka
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Kafka consumer group offsets and rebalances explain whether a data pipeline is caught up, stuck, duplicating work, or reprocessing after ownership changes.

## Core Explanation

Agents investigating streaming pipelines need to distinguish producer delay, broker retention, consumer processing time, and consumer-group coordination. Offset movement alone does not prove the pipeline is correct; it must be interpreted with partition assignment and commit behavior.

Useful evidence includes group.id, topic partitions, current and committed offsets, lag, assignment strategy, rebalance events, commit mode, max poll interval, processing duration, consumer errors, and recent deployment or scaling events.

## Source-Mapped Facts

- Apache Kafka KafkaConsumer Javadoc says the consumer interacts with the broker to allow groups of consumers to load balance consumption using consumer groups. ([source](https://kafka.apache.org/38/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html))
- Apache Kafka KafkaConsumer Javadoc says each partition in a subscribed topic is assigned to one process in each consumer group. ([source](https://kafka.apache.org/38/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html))
- Apache Kafka documentation has a consumer configuration named group.id that identifies the consumer group to which a consumer belongs. ([source](https://kafka.apache.org/documentation/#consumerconfigs_group.id))

## Further Reading

- [Apache Kafka KafkaConsumer Javadoc](https://kafka.apache.org/38/javadoc/org/apache/kafka/clients/consumer/KafkaConsumer.html)
- [Apache Kafka Consumer Configuration](https://kafka.apache.org/documentation/#consumerconfigs_group.id)
