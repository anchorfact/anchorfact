---
id: agent-message-visibility-timeouts-and-ack-deadlines
title: 'Agent Message Visibility Timeouts and Ack Deadlines'
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
  - id: fact-ai-agent-message-visibility-timeouts-and-ack-deadlines-1
    statement: >-
      Amazon SQS documentation describes the visibility timeout as a period when a received
      message is hidden from other consumers.
    source_title: Amazon SQS Visibility Timeout
    source_url: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html
    confidence: medium
  - id: fact-ai-agent-message-visibility-timeouts-and-ack-deadlines-2
    statement: >-
      Google Pub/Sub documentation describes lease management as extending acknowledgment
      deadlines for messages that need more processing time.
    source_title: Google Pub/Sub Lease Management
    source_url: https://cloud.google.com/pubsub/docs/lease-management
    confidence: medium
  - id: fact-ai-agent-message-visibility-timeouts-and-ack-deadlines-3
    statement: >-
      RabbitMQ documentation describes consumer acknowledgements as a protocol feature that
      lets consumers confirm message processing.
    source_title: RabbitMQ Consumer Acknowledgements
    source_url: https://www.rabbitmq.com/docs/confirms
    confidence: medium
completeness: 0.83
known_gaps:
  - Queue retry behavior depends on ordering, max receive count, redrive policy, idempotent handlers, lease extension, and whether consumers crash after side effects.
disputed_statements: []
primary_sources:
  - title: Amazon SQS Visibility Timeout
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html
    institution: Amazon Web Services
  - title: Google Pub/Sub Lease Management
    type: documentation
    year: 2026
    url: https://cloud.google.com/pubsub/docs/lease-management
    institution: Google Cloud
  - title: RabbitMQ Consumer Acknowledgements
    type: documentation
    year: 2026
    url: https://www.rabbitmq.com/docs/confirms
    institution: RabbitMQ
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Visibility timeouts and acknowledgement deadlines explain why a queued task can be processed twice, disappear temporarily, or return to the queue after a worker crash.

## Core Explanation

Agents investigating queue behavior should collect the message ID, receive count, visibility timeout or ack deadline, consumer logs, handler duration, retry policy, and dead-letter policy. A duplicate message may indicate at-least-once delivery working as designed rather than a broker bug.

The remediation depends on idempotency. Extending visibility can reduce duplicate processing, but it does not make a handler safe if side effects cannot be retried.

## Source-Mapped Facts

- Amazon SQS documentation describes the visibility timeout as a period when a received message is hidden from other consumers. ([source](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html))
- Google Pub/Sub documentation describes lease management as extending acknowledgment deadlines for messages that need more processing time. ([source](https://cloud.google.com/pubsub/docs/lease-management))
- RabbitMQ documentation describes consumer acknowledgements as a protocol feature that lets consumers confirm message processing. ([source](https://www.rabbitmq.com/docs/confirms))

## Further Reading

- [Amazon SQS Visibility Timeout](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html)
- [Google Pub/Sub Lease Management](https://cloud.google.com/pubsub/docs/lease-management)
- [RabbitMQ Consumer Acknowledgements](https://www.rabbitmq.com/docs/confirms)
