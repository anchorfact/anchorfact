---
id: api-webhook-retry-policies-and-dead-lettering
title: 'API Webhook Retry Policies and Dead-Lettering'
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
  - id: fact-cs-api-webhook-retry-policies-and-dead-lettering-1
    statement: >-
      Stripe documentation says Stripe attempts to deliver webhook events for up to
      three days with exponential backoff in live mode.
    source_title: Stripe Webhooks
    source_url: https://docs.stripe.com/webhooks
    confidence: medium
  - id: fact-cs-api-webhook-retry-policies-and-dead-lettering-2
    statement: >-
      GitHub documentation says GitHub does not automatically redeliver failed webhook
      deliveries, and documents creating scripts to handle failed deliveries.
    source_title: GitHub Handling Failed Webhook Deliveries
    source_url: https://docs.github.com/en/webhooks/using-webhooks/handling-failed-webhook-deliveries
    confidence: medium
  - id: fact-cs-api-webhook-retry-policies-and-dead-lettering-3
    statement: >-
      Amazon EventBridge documentation says a dead-letter queue can store events that
      could not be delivered to a target so they can be processed later.
    source_title: Amazon EventBridge Dead-Letter Queues
    source_url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-dlq.html
    confidence: medium
completeness: 0.84
known_gaps:
  - Webhook recovery depends on provider retry schedules, idempotency keys, signature verification, event ordering, payload versioning, and replay windows.
  - This article does not specify a universal retry schedule because providers differ substantially.
disputed_statements: []
primary_sources:
  - title: Stripe Webhooks
    type: documentation
    year: 2026
    url: https://docs.stripe.com/webhooks
    institution: Stripe
  - title: GitHub Handling Failed Webhook Deliveries
    type: documentation
    year: 2026
    url: https://docs.github.com/en/webhooks/using-webhooks/handling-failed-webhook-deliveries
    institution: GitHub
  - title: Amazon EventBridge Dead-Letter Queues
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-dlq.html
    institution: Amazon Web Services
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Webhook retry policy tells agents whether a missed event will be retried automatically, must be replayed manually, or needs a dead-letter recovery path.

## Core Explanation

Webhook delivery is not one uniform API behavior. Some providers retry failed deliveries automatically, some expose manual redelivery, and event buses can route failed target invocations to dead-letter queues. An agent that assumes one behavior across providers can double-process events or miss recoverable failures.

For developer infrastructure, the evidence set should include delivery ID, event ID, attempt count, response code, retry schedule, next retry time, signature header, replay window, and whether a failed event landed in a dead-letter target. Idempotency is required because retries and manual replays can deliver the same logical event more than once.

Agents should not treat a successful redelivery as proof that historical damage was repaired. They still need to inspect which events were missed, whether downstream state was reconciled, and whether automatic retries remain active.

## Source-Mapped Facts

- Stripe documentation says Stripe attempts to deliver webhook events for up to three days with exponential backoff in live mode. ([source](https://docs.stripe.com/webhooks))
- GitHub documentation says GitHub does not automatically redeliver failed webhook deliveries, and documents creating scripts to handle failed deliveries. ([source](https://docs.github.com/en/webhooks/using-webhooks/handling-failed-webhook-deliveries))
- Amazon EventBridge documentation says a dead-letter queue can store events that could not be delivered to a target so they can be processed later. ([source](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-dlq.html))

## Further Reading

- [Stripe Webhooks](https://docs.stripe.com/webhooks)
- [GitHub Handling Failed Webhook Deliveries](https://docs.github.com/en/webhooks/using-webhooks/handling-failed-webhook-deliveries)
- [Amazon EventBridge Dead-Letter Queues](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-dlq.html)
