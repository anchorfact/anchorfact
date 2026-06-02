---
id: api-webhook-signature-verification-and-replay-protection
title: 'API Webhook Signature Verification and Replay Protection'
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
  - id: fact-cs-api-webhook-signature-verification-and-replay-protection-1
    statement: >-
      Stripe documentation describes verifying webhook signatures using the Stripe-Signature
      header and the endpoint secret.
    source_title: Stripe Webhook Signature Verification
    source_url: https://docs.stripe.com/webhooks/signature
    confidence: medium
  - id: fact-cs-api-webhook-signature-verification-and-replay-protection-2
    statement: >-
      GitHub documentation describes validating webhook deliveries using a secret token and
      the X-Hub-Signature-256 header.
    source_title: GitHub Webhook Signature Validation
    source_url: https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
    confidence: medium
  - id: fact-cs-api-webhook-signature-verification-and-replay-protection-3
    statement: >-
      Shopify documentation describes verifying webhook deliveries by validating the HMAC
      signature in the X-Shopify-Hmac-SHA256 header.
    source_title: Shopify Verify Webhook Deliveries
    source_url: https://shopify.dev/docs/apps/build/webhooks/verify-deliveries
    confidence: medium
completeness: 0.83
known_gaps:
  - Replay protection depends on timestamp windows, event IDs, idempotent processing, clock skew, raw body handling, secret rotation, and provider-specific retry behavior.
disputed_statements: []
primary_sources:
  - title: Stripe Webhook Signature Verification
    type: documentation
    year: 2026
    url: https://docs.stripe.com/webhooks/signature
    institution: Stripe
  - title: GitHub Webhook Signature Validation
    type: documentation
    year: 2026
    url: https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
    institution: GitHub
  - title: Shopify Verify Webhook Deliveries
    type: documentation
    year: 2026
    url: https://shopify.dev/docs/apps/build/webhooks/verify-deliveries
    institution: Shopify
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Webhook signature verification lets agents decide whether an incoming event is authentic before trusting or replaying it.

## Core Explanation

Agents debugging webhook integrations need to inspect the raw request body, signature header, timestamp, endpoint secret, event ID, and handler idempotency. A valid-looking JSON payload is not enough evidence that the provider sent the event.

Replay protection is a separate concern from signature verification. The receiving system should reject stale timestamps where the provider supports them and process repeated event IDs idempotently, because providers often retry deliveries after failures.

## Source-Mapped Facts

- Stripe documentation describes verifying webhook signatures using the Stripe-Signature header and the endpoint secret. ([source](https://docs.stripe.com/webhooks/signature))
- GitHub documentation describes validating webhook deliveries using a secret token and the X-Hub-Signature-256 header. ([source](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries))
- Shopify documentation describes verifying webhook deliveries by validating the HMAC signature in the X-Shopify-Hmac-SHA256 header. ([source](https://shopify.dev/docs/apps/build/webhooks/verify-deliveries))

## Further Reading

- [Stripe Webhook Signature Verification](https://docs.stripe.com/webhooks/signature)
- [GitHub Webhook Signature Validation](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries)
- [Shopify Verify Webhook Deliveries](https://shopify.dev/docs/apps/build/webhooks/verify-deliveries)
