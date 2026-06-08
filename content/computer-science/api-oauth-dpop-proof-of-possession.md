---
id: api-oauth-dpop-proof-of-possession
title: 'API OAuth DPoP Proof of Possession'
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
  - id: fact-cs-api-oauth-dpop-proof-of-possession-1
    statement: >-
      RFC 9449 describes DPoP as an application-level mechanism for
      sender-constraining OAuth access and refresh tokens.
    source_title: RFC 9449 OAuth DPoP
    source_url: https://datatracker.ietf.org/doc/html/rfc9449
    confidence: medium
  - id: fact-cs-api-oauth-dpop-proof-of-possession-2
    statement: >-
      RFC 6750 defines a bearer token as a security token that any party in
      possession of the token can use.
    source_title: RFC 6750 OAuth Bearer Token Usage
    source_url: https://datatracker.ietf.org/doc/html/rfc6750
    confidence: medium
  - id: fact-cs-api-oauth-dpop-proof-of-possession-3
    statement: >-
      RFC 9700 says sender-constrained tokens can use mutual TLS or DPoP to
      prevent misuse of stolen access tokens.
    source_title: RFC 9700 OAuth 2.0 Security Best Current Practice
    source_url: https://datatracker.ietf.org/doc/html/rfc9700
    confidence: medium
completeness: 0.84
known_gaps:
  - DPoP behavior depends on authorization server support, resource server validation, key storage, nonce policy, clock skew, replay cache, token binding metadata, and whether clients can protect private keys.
  - DPoP reduces bearer-token replay risk but does not replace authorization scopes, audience checks, TLS, refresh-token rotation, or client compromise controls.
disputed_statements: []
primary_sources:
  - title: RFC 9449 OAuth DPoP
    type: rfc
    year: 2023
    url: https://datatracker.ietf.org/doc/html/rfc9449
    institution: IETF
  - title: RFC 6750 OAuth Bearer Token Usage
    type: rfc
    year: 2012
    url: https://datatracker.ietf.org/doc/html/rfc6750
    institution: IETF
  - title: RFC 9700 OAuth 2.0 Security Best Current Practice
    type: rfc
    year: 2025
    url: https://datatracker.ietf.org/doc/html/rfc9700
    institution: IETF
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

DPoP lets API agents distinguish ordinary bearer-token failures from proof-of-possession failures involving keys, nonces, replay checks, and token binding.

## Core Explanation

OAuth bearer tokens are easy for clients to present but risky when copied from logs, browser storage, terminals, or traces. DPoP changes the evidence an agent needs: a request is not just an access token plus endpoint. It also depends on the proof JWT, public key thumbprint, HTTP method and URI binding, nonce handling, and replay window.

Useful debugging evidence includes authorization server metadata, token response fields, DPoP header, proof claims, JWK thumbprint, resource server error, clock skew, nonce challenge, and whether the access token's confirmation claim matches the presented key. Agents should redact tokens and private keys while preserving enough metadata to explain the failure.

## Source-Mapped Facts

- RFC 9449 describes DPoP as an application-level mechanism for sender-constraining OAuth access and refresh tokens. ([source](https://datatracker.ietf.org/doc/html/rfc9449))
- RFC 6750 defines a bearer token as a security token that any party in possession of the token can use. ([source](https://datatracker.ietf.org/doc/html/rfc6750))
- RFC 9700 says sender-constrained tokens can use mutual TLS or DPoP to prevent misuse of stolen access tokens. ([source](https://datatracker.ietf.org/doc/html/rfc9700))

## Further Reading

- [RFC 9449 OAuth DPoP](https://datatracker.ietf.org/doc/html/rfc9449)
- [RFC 6750 OAuth Bearer Token Usage](https://datatracker.ietf.org/doc/html/rfc6750)
- [RFC 9700 OAuth 2.0 Security Best Current Practice](https://datatracker.ietf.org/doc/html/rfc9700)
