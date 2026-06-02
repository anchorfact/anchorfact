---
id: api-webhook-event-types-and-versioned-payloads
title: 'API Webhook Event Types and Versioned Payloads'
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
  - id: fact-cs-api-webhook-event-types-and-versioned-payloads-1
    statement: >-
      GitHub documentation lists webhook events and payloads for GitHub webhooks.
    source_title: GitHub Webhook Events and Payloads
    source_url: https://docs.github.com/en/webhooks/webhook-events-and-payloads
    confidence: medium
  - id: fact-cs-api-webhook-event-types-and-versioned-payloads-2
    statement: >-
      Stripe documentation lists event types that can be delivered through its Events API and
      webhooks.
    source_title: Stripe Event Types
    source_url: https://docs.stripe.com/api/events/types
    confidence: medium
  - id: fact-cs-api-webhook-event-types-and-versioned-payloads-3
    statement: >-
      Slack documentation describes the Events API as a way for apps to subscribe to events.
    source_title: Slack Events API
    source_url: https://api.slack.com/apis/events-api
    confidence: medium
completeness: 0.83
known_gaps:
  - Webhook consumers also need signature verification, retry handling, idempotency, ordering assumptions, payload versioning, and event deprecation monitoring.
disputed_statements: []
primary_sources:
  - title: GitHub Webhook Events and Payloads
    type: documentation
    year: 2026
    url: https://docs.github.com/en/webhooks/webhook-events-and-payloads
    institution: GitHub
  - title: Stripe Event Types
    type: documentation
    year: 2026
    url: https://docs.stripe.com/api/events/types
    institution: Stripe
  - title: Slack Events API
    type: documentation
    year: 2026
    url: https://api.slack.com/apis/events-api
    institution: Slack
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Webhook event types and payload versions tell agents what happened, which schema to parse, and which handler should run.

## Core Explanation

Webhook delivery is not just an HTTP POST. Consumers need to know the event type, payload schema, API version, delivery ID, timestamp, signature, and retry history. Without event-type discipline, agents can misroute events or treat incompatible payloads as valid.

Versioned payloads also support safe change management. An agent can compare the received event type and schema version against the handler contract before deciding whether to process, park, or reject the event.

## Source-Mapped Facts

- GitHub documentation lists webhook events and payloads for GitHub webhooks. ([source](https://docs.github.com/en/webhooks/webhook-events-and-payloads))
- Stripe documentation lists event types that can be delivered through its Events API and webhooks. ([source](https://docs.stripe.com/api/events/types))
- Slack documentation describes the Events API as a way for apps to subscribe to events. ([source](https://api.slack.com/apis/events-api))

## Further Reading

- [GitHub Webhook Events and Payloads](https://docs.github.com/en/webhooks/webhook-events-and-payloads)
- [Stripe Event Types](https://docs.stripe.com/api/events/types)
- [Slack Events API](https://api.slack.com/apis/events-api)
