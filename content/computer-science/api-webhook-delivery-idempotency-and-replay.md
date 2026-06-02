---
id: api-webhook-delivery-idempotency-and-replay
title: 'API Webhook Delivery Idempotency and Replay'
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
  - id: fact-computer-science-api-webhook-delivery-idempotency-and-replay-1
    statement: >-
      GitHub documentation describes redelivering failed webhook deliveries.
    source_title: GitHub Handling Failed Webhook Deliveries
    source_url: https://docs.github.com/en/webhooks/using-webhooks/handling-failed-webhook-deliveries
    confidence: medium
  - id: fact-computer-science-api-webhook-delivery-idempotency-and-replay-2
    statement: >-
      Stripe documentation describes processing webhook events that were not successfully delivered.
    source_title: Stripe Process Undelivered Webhook Events
    source_url: https://docs.stripe.com/webhooks/process-undelivered-events
    confidence: medium
  - id: fact-computer-science-api-webhook-delivery-idempotency-and-replay-3
    statement: >-
      Stripe webhook documentation recommends logging processed event IDs to handle duplicate
      events.
    source_title: Stripe Webhook Duplicate Events
    source_url: https://docs.stripe.com/webhooks#handle-duplicate-events
    confidence: medium
completeness: 0.83
known_gaps:
  - Replay safety depends on event identity, deduplication storage, side-effect boundaries, retention windows, ordering expectations, and provider retry policy.
disputed_statements: []
primary_sources:
  - title: GitHub Handling Failed Webhook Deliveries
    type: documentation
    year: 2026
    url: https://docs.github.com/en/webhooks/using-webhooks/handling-failed-webhook-deliveries
    institution: GitHub
  - title: Stripe Process Undelivered Webhook Events
    type: documentation
    year: 2026
    url: https://docs.stripe.com/webhooks/process-undelivered-events
    institution: Stripe
  - title: Stripe Webhook Duplicate Events
    type: documentation
    year: 2026
    url: https://docs.stripe.com/webhooks#handle-duplicate-events
    institution: Stripe
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Webhook replay is only safe when receivers make event handling idempotent and preserve delivery evidence.

## Core Explanation

APIs often deliver the same webhook more than once or let operators replay failed deliveries. That is operationally useful, but it can double-charge, double-provision, or double-notify if the receiver treats each callback as unique work.

Agents implementing webhook consumers should store provider event IDs, make side effects idempotent, and document how replay is triggered. A replay recommendation should name the provider, event ID, endpoint, and deduplication policy.

## Source-Mapped Facts

- GitHub documentation describes redelivering failed webhook deliveries. ([source](https://docs.github.com/en/webhooks/using-webhooks/handling-failed-webhook-deliveries))
- Stripe documentation describes processing webhook events that were not successfully delivered. ([source](https://docs.stripe.com/webhooks/process-undelivered-events))
- Stripe webhook documentation recommends logging processed event IDs to handle duplicate events. ([source](https://docs.stripe.com/webhooks#handle-duplicate-events))

## Further Reading

- [GitHub Handling Failed Webhook Deliveries](https://docs.github.com/en/webhooks/using-webhooks/handling-failed-webhook-deliveries)
- [Stripe Process Undelivered Webhook Events](https://docs.stripe.com/webhooks/process-undelivered-events)
- [Stripe Webhook Duplicate Events](https://docs.stripe.com/webhooks#handle-duplicate-events)
