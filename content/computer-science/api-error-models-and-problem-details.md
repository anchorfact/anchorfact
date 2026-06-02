---
id: api-error-models-and-problem-details
title: 'API Error Models and Problem Details'
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
  - id: fact-api-error-models-and-problem-details-1
    statement: >-
      RFC 9457 defines a problem details format for carrying machine-readable details of errors in HTTP APIs.
    source_title: RFC 9457 - Problem Details for HTTP APIs
    source_url: https://datatracker.ietf.org/doc/html/rfc9457
  - id: fact-api-error-models-and-problem-details-2
    statement: >-
      Google AIP-193 specifies that API errors should use the google.rpc.Status message with a canonical code, message, and details.
    source_title: AIP-193 Errors
    source_url: https://google.aip.dev/193
  - id: fact-api-error-models-and-problem-details-3
    statement: >-
      Stripe API error documentation describes an error object that includes fields such as type, code, message, and param.
    source_title: Errors - Stripe API
    source_url: https://docs.stripe.com/api/errors
completeness: 0.84
known_gaps:
  - Error taxonomies differ across REST, gRPC, GraphQL, SDK exceptions, and webhook delivery systems.
disputed_statements: []
primary_sources:
  - title: RFC 9457 - Problem Details for HTTP APIs
    type: standard
    year: 2023
    url: https://datatracker.ietf.org/doc/html/rfc9457
    institution: IETF
  - title: AIP-193 Errors
    type: design_standard
    year: 2026
    url: https://google.aip.dev/193
    institution: Google
  - title: Errors - Stripe API
    type: documentation
    year: 2026
    url: https://docs.stripe.com/api/errors
    institution: Stripe
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

API error models define stable, machine-readable error payloads so developers and agents can distinguish validation failures, permission errors, rate limits, retries, and permanent faults.

## Core Explanation

Natural-language error messages are useful for humans, but agents need structured fields. A good error model includes a stable code, human message, affected parameter, retry guidance, request identifier, and optional problem-specific details.

For agent-facing APIs, error clarity is part of reliability. The model can recover from a precise validation error, but a vague 500 response often causes unnecessary retries or hallucinated fixes. Consistent error schemas also make SDKs, observability, and support workflows easier to automate.

## Source-Mapped Facts

- RFC 9457 defines a problem details format for carrying machine-readable details of errors in HTTP APIs. ([source](https://datatracker.ietf.org/doc/html/rfc9457))
- Google AIP-193 specifies that API errors should use the google.rpc.Status message with a canonical code, message, and details. ([source](https://google.aip.dev/193))
- Stripe API error documentation describes an error object that includes fields such as type, code, message, and param. ([source](https://docs.stripe.com/api/errors))

## Further Reading

- [RFC 9457](https://datatracker.ietf.org/doc/html/rfc9457)
- [Google AIP-193](https://google.aip.dev/193)
- [Stripe API errors](https://docs.stripe.com/api/errors)
