---
id: agent-message-queue-dead-letter-queues
title: 'Agent Message Queue Dead-Letter Queues'
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
  - id: fact-ai-agent-message-queue-dead-letter-queues-1
    statement: >-
      Amazon SQS documentation describes dead-letter queues as queues that other queues can target for messages that cannot be processed successfully.
    source_title: Amazon SQS Dead-Letter Queues
    source_url: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html
    confidence: medium
  - id: fact-ai-agent-message-queue-dead-letter-queues-2
    statement: >-
      Google Pub/Sub documentation describes dead-letter topics as topics that receive messages Pub/Sub cannot deliver.
    source_title: Google Pub/Sub Dead-Letter Topics
    source_url: https://cloud.google.com/pubsub/docs/dead-letter-topics
    confidence: medium
  - id: fact-ai-agent-message-queue-dead-letter-queues-3
    statement: >-
      RabbitMQ documentation says dead lettering is when messages are republished to another exchange.
    source_title: RabbitMQ Dead Letter Exchanges
    source_url: https://www.rabbitmq.com/docs/dlx
    confidence: medium
completeness: 0.83
known_gaps:
  - Dead-letter handling depends on retry policy, acknowledgement semantics, ordering requirements, poison-message detection, and replay tooling.
disputed_statements: []
primary_sources:
  - title: Amazon SQS Dead-Letter Queues
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html
    institution: Amazon Web Services
  - title: Google Pub/Sub Dead-Letter Topics
    type: documentation
    year: 2026
    url: https://cloud.google.com/pubsub/docs/dead-letter-topics
    institution: Google Cloud
  - title: RabbitMQ Dead Letter Exchanges
    type: documentation
    year: 2026
    url: https://www.rabbitmq.com/docs/dlx
    institution: RabbitMQ
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Dead-letter queues are operational evidence for agents because they collect messages that failed normal delivery or processing.

## Core Explanation

When a pipeline stalls or a worker appears healthy but output is missing, agents should inspect queue depth, retry counts, and dead-letter destinations. The failed messages often reveal bad payloads, schema drift, auth failures, or downstream outages.

Agents should avoid blindly replaying dead-letter messages. Replays can duplicate side effects, violate ordering, or re-trigger a poison-message loop unless idempotency and fixes are confirmed.

## Source-Mapped Facts

- Amazon SQS documentation describes dead-letter queues as queues that other queues can target for messages that cannot be processed successfully. ([source](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html))
- Google Pub/Sub documentation describes dead-letter topics as topics that receive messages Pub/Sub cannot deliver. ([source](https://cloud.google.com/pubsub/docs/dead-letter-topics))
- RabbitMQ documentation says dead lettering is when messages are republished to another exchange. ([source](https://www.rabbitmq.com/docs/dlx))

## Further Reading

- [Amazon SQS Dead-Letter Queues](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html)
- [Google Pub/Sub Dead-Letter Topics](https://cloud.google.com/pubsub/docs/dead-letter-topics)
- [RabbitMQ Dead Letter Exchanges](https://www.rabbitmq.com/docs/dlx)
