---
id: api-request-signing-and-hmac-authentication
title: 'API Request Signing and HMAC Authentication'
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
  - id: fact-cs-api-request-signing-and-hmac-authentication-1
    statement: >-
      Azure Communication Services documentation says access key authentication uses an HMAC
      signature for each HTTP request.
    source_title: Azure Communication Services Authentication
    source_url: https://learn.microsoft.com/en-us/rest/api/communication/authentication
    confidence: medium
  - id: fact-cs-api-request-signing-and-hmac-authentication-2
    statement: >-
      Microsoft documentation describes computing an HMAC-SHA256 signature for Azure Communication
      Services request authorization.
    source_title: Azure Communication Services HMAC Header Tutorial
    source_url: https://learn.microsoft.com/en-us/azure/communication-services/tutorials/hmac-header-tutorial
    confidence: medium
  - id: fact-cs-api-request-signing-and-hmac-authentication-3
    statement: >-
      GitHub documentation describes validating webhook deliveries by comparing an HMAC hex digest
      with the signature header.
    source_title: GitHub Validating Webhook Deliveries
    source_url: https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
    confidence: medium
completeness: 0.83
known_gaps:
  - Request signing behavior depends on canonicalization rules, clock skew, key rotation, replay windows, covered headers, body hashing, and whether proxies modify signed components.
disputed_statements: []
primary_sources:
  - title: Azure Communication Services Authentication
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/rest/api/communication/authentication
    institution: Microsoft
  - title: Azure Communication Services HMAC Header Tutorial
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/communication-services/tutorials/hmac-header-tutorial
    institution: Microsoft
  - title: GitHub Validating Webhook Deliveries
    type: documentation
    year: 2026
    url: https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
    institution: GitHub
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Signed API requests prove that a caller knew a shared secret or private key when it constructed the HTTP message.

## Core Explanation

Request signing is stricter than bearer-token authentication because the signature is tied to request content. Agents need to know which method, path, query parameters, headers, timestamp, and body hash are included before they can reproduce or debug a signed request.

Common failure modes include signing a different canonical path than the server verifies, omitting a required header, using a stale timestamp, hashing a modified body, or replaying a signature outside its allowed window.

## Source-Mapped Facts

- Azure Communication Services documentation says access key authentication uses an HMAC signature for each HTTP request. ([source](https://learn.microsoft.com/en-us/rest/api/communication/authentication))
- Microsoft documentation describes computing an HMAC-SHA256 signature for Azure Communication Services request authorization. ([source](https://learn.microsoft.com/en-us/azure/communication-services/tutorials/hmac-header-tutorial))
- GitHub documentation describes validating webhook deliveries by comparing an HMAC hex digest with the signature header. ([source](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries))

## Further Reading

- [Azure Communication Services Authentication](https://learn.microsoft.com/en-us/rest/api/communication/authentication)
- [Azure Communication Services HMAC Header Tutorial](https://learn.microsoft.com/en-us/azure/communication-services/tutorials/hmac-header-tutorial)
- [GitHub Validating Webhook Deliveries](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries)
