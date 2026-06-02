---
id: api-idempotency-keys-and-safe-retries
title: 'API Idempotency Keys and Safe Retries'
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
  - id: fact-cs-api-idempotency-keys-and-safe-retries-1
    statement: >-
      Stripe API documentation says idempotency supports safely retrying requests without
      accidentally performing the same operation twice.
    source_title: Stripe Idempotent Requests
    source_url: https://docs.stripe.com/api/idempotent_requests
    confidence: medium
  - id: fact-cs-api-idempotency-keys-and-safe-retries-2
    statement: >-
      Google AIP-155 states that providing a request ID must guarantee idempotency.
    source_title: Google AIP-155 Request Identification
    source_url: https://google.aip.dev/155
    confidence: medium
  - id: fact-cs-api-idempotency-keys-and-safe-retries-3
    statement: >-
      Amazon EC2 documentation describes optional idempotency for some API actions using a
      client token.
    source_title: Amazon EC2 API Idempotency
    source_url: https://docs.aws.amazon.com/ec2/latest/devguide/ec2-api-idempotency.html
    confidence: medium
completeness: 0.83
known_gaps:
  - Safe retry behavior depends on endpoint semantics, idempotency-key retention windows, parameter mismatch handling, timeout ambiguity, transaction boundaries, and client retry policy.
disputed_statements: []
primary_sources:
  - title: Stripe Idempotent Requests
    type: documentation
    year: 2026
    url: https://docs.stripe.com/api/idempotent_requests
    institution: Stripe
  - title: Google AIP-155 Request Identification
    type: standard
    year: 2019
    url: https://google.aip.dev/155
    institution: Google
  - title: Amazon EC2 API Idempotency
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/ec2/latest/devguide/ec2-api-idempotency.html
    institution: Amazon Web Services
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Idempotency keys and request IDs let agents distinguish safe retries from duplicate mutations.

## Core Explanation

When an API call times out, the client may not know whether the server committed the operation. Retrying without an idempotency key can create duplicate resources, payments, jobs, or messages. Retrying with a documented key lets the server recognize the repeated request.

Agents should inspect whether the operation is idempotent by default, accepts an explicit idempotency key, or requires application-level retry logic. They should also verify whether the same key was reused with the same parameters, because some APIs reject parameter mismatches.

## Source-Mapped Facts

- Stripe API documentation says idempotency supports safely retrying requests without accidentally performing the same operation twice. ([source](https://docs.stripe.com/api/idempotent_requests))
- Google AIP-155 states that providing a request ID must guarantee idempotency. ([source](https://google.aip.dev/155))
- Amazon EC2 documentation describes optional idempotency for some API actions using a client token. ([source](https://docs.aws.amazon.com/ec2/latest/devguide/ec2-api-idempotency.html))

## Further Reading

- [Stripe Idempotent Requests](https://docs.stripe.com/api/idempotent_requests)
- [Google AIP-155 Request Identification](https://google.aip.dev/155)
- [Amazon EC2 API Idempotency](https://docs.aws.amazon.com/ec2/latest/devguide/ec2-api-idempotency.html)
