---
id: api-webhook-signature-verification
title: 'API Webhook Signature Verification'
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
  - id: fact-computer-science-api-webhook-signature-verification-1
    statement: >-
      Stripe webhook documentation describes verifying webhook signatures with a signing secret.
    source_title: Stripe Webhook Signature Verification
    source_url: https://docs.stripe.com/webhooks/signature
    confidence: medium
  - id: fact-computer-science-api-webhook-signature-verification-2
    statement: >-
      GitHub webhook documentation describes validating webhook deliveries with a secret token and HMAC signature.
    source_title: GitHub Validating Webhook Deliveries
    source_url: https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
    confidence: medium
  - id: fact-computer-science-api-webhook-signature-verification-3
    statement: >-
      Slack documentation describes verifying requests from Slack with a signing secret and request signature.
    source_title: Slack Verifying Requests
    source_url: https://docs.slack.dev/authentication/verifying-requests-from-slack/
    confidence: medium
completeness: 0.83
known_gaps:
  - Webhook verification also needs raw-body preservation, replay-window checks, secret rotation, idempotency, and provider-specific header parsing.
disputed_statements: []
primary_sources:
  - title: Stripe Webhook Signature Verification
    type: documentation
    year: 2026
    url: https://docs.stripe.com/webhooks/signature
    institution: Stripe
  - title: GitHub Validating Webhook Deliveries
    type: documentation
    year: 2026
    url: https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
    institution: GitHub
  - title: Slack Verifying Requests
    type: documentation
    year: 2026
    url: https://docs.slack.dev/authentication/verifying-requests-from-slack/
    institution: Slack
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Webhook signature verification lets API receivers confirm that an event payload came from the expected provider and was not altered in transit.

## Core Explanation

Agents implementing or debugging webhooks need to preserve the raw request body, read provider-specific headers, compute the documented signature, and reject mismatches before processing side effects.

Verification is only part of webhook safety. Agents should also handle duplicate deliveries, retries, timestamp tolerance, secret rotation, and idempotent event processing.

## Source-Mapped Facts

- Stripe webhook documentation describes verifying webhook signatures with a signing secret. ([source](https://docs.stripe.com/webhooks/signature))
- GitHub webhook documentation describes validating webhook deliveries with a secret token and HMAC signature. ([source](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries))
- Slack documentation describes verifying requests from Slack with a signing secret and request signature. ([source](https://docs.slack.dev/authentication/verifying-requests-from-slack/))

## Further Reading

- [Stripe Webhook Signature Verification](https://docs.stripe.com/webhooks/signature)
- [GitHub Validating Webhook Deliveries](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries)
- [Slack Verifying Requests](https://docs.slack.dev/authentication/verifying-requests-from-slack/)
