---
id: agent-api-error-responses-and-error-models
title: 'Agent API Error Responses and Error Models'
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
  - id: fact-ai-agent-api-error-responses-and-error-models-1
    statement: >-
      Stripe documentation describes API errors as returning an error object.
    source_title: Stripe API Errors
    source_url: https://docs.stripe.com/api/errors
    confidence: medium
  - id: fact-ai-agent-api-error-responses-and-error-models-2
    statement: >-
      The JSON:API specification defines an error object as providing additional information
      about problems encountered while performing an operation.
    source_title: JSON:API Error Objects
    source_url: https://jsonapi.org/format/#errors
    confidence: medium
  - id: fact-ai-agent-api-error-responses-and-error-models-3
    statement: >-
      GitHub REST API troubleshooting documentation provides guidance for common HTTP error
      status codes.
    source_title: GitHub REST API Troubleshooting
    source_url: https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api
    confidence: medium
completeness: 0.83
known_gaps:
  - Error handling depends on API style, retry policy, domain-specific error codes, localization, partial failures, correlation IDs, and whether the provider documents recovery steps.
disputed_statements: []
primary_sources:
  - title: Stripe API Errors
    type: documentation
    year: 2026
    url: https://docs.stripe.com/api/errors
    institution: Stripe
  - title: JSON:API Error Objects
    type: standard
    year: 2026
    url: https://jsonapi.org/format/#errors
    institution: JSON:API
  - title: GitHub REST API Troubleshooting
    type: documentation
    year: 2026
    url: https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api
    institution: GitHub
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

API status codes, error objects, and provider error models tell agents whether to retry, ask for new input, fix authentication, or stop.

## Core Explanation

Agents that call APIs should parse error responses as structured evidence. The status code is only the first signal. Error code, message, field path, retryability, quota context, correlation ID, and documentation URL can change the recommended action.

An agent should avoid treating all 4xx responses as user mistakes or all 5xx responses as retryable. Provider-specific error models often encode precondition failures, validation details, permission problems, and safe recovery guidance.

## Source-Mapped Facts

- Stripe documentation describes API errors as returning an error object. ([source](https://docs.stripe.com/api/errors))
- The JSON:API specification defines an error object as providing additional information about problems encountered while performing an operation. ([source](https://jsonapi.org/format/#errors))
- GitHub REST API troubleshooting documentation provides guidance for common HTTP error status codes. ([source](https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api))

## Further Reading

- [Stripe API Errors](https://docs.stripe.com/api/errors)
- [JSON:API Error Objects](https://jsonapi.org/format/#errors)
- [GitHub REST API Troubleshooting](https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api)
