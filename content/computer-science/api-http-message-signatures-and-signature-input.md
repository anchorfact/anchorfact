---
id: api-http-message-signatures-and-signature-input
title: 'API HTTP Message Signatures and Signature-Input'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-03'
created_date: '2026-06-03'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-api-http-message-signatures-and-signature-input-1
    statement: >-
      RFC 9421 is titled HTTP Message Signatures.
    source_title: RFC 9421 HTTP Message Signatures
    source_url: https://datatracker.ietf.org/doc/rfc9421/
    confidence: medium
  - id: fact-cs-api-http-message-signatures-and-signature-input-2
    statement: >-
      RFC 9421 includes Signature-Input and Signature HTTP fields for including
      a message signature in a message.
    source_title: RFC 9421 HTTP Message Signatures
    source_url: https://datatracker.ietf.org/doc/rfc9421/
    confidence: medium
  - id: fact-cs-api-http-message-signatures-and-signature-input-3
    statement: >-
      RFC 9110 is the HTTP Semantics specification.
    source_title: RFC 9110 HTTP Semantics
    source_url: https://datatracker.ietf.org/doc/rfc9110/
    confidence: medium
completeness: 0.82
known_gaps:
  - Message-signature validation depends on canonical component selection, covered headers, derived components, clock skew, key lookup, replay protection, proxy transformations, and whether both client and server implement the same profile.
disputed_statements: []
primary_sources:
  - title: RFC 9421 HTTP Message Signatures
    type: rfc
    year: 2024
    url: https://datatracker.ietf.org/doc/rfc9421/
    institution: IETF
  - title: RFC 9110 HTTP Semantics
    type: rfc
    year: 2022
    url: https://datatracker.ietf.org/doc/rfc9110/
    institution: IETF
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

HTTP Message Signatures give API agents a standards-backed way to reason about signed HTTP components instead of treating request signing as an opaque vendor header.

## Core Explanation

Signed API requests fail for small reasons: a header was omitted from the covered components, a proxy rewrote a field, a timestamp drifted, or the client canonicalized the target URI differently from the server. Signature-Input is part of the evidence that explains what was signed.

Agents should inspect the signature label, covered components, algorithm, key identifier, created and expires parameters, nonce or replay controls, canonical request target, and intermediate gateway behavior before changing signing code.

## Source-Mapped Facts

- RFC 9421 is titled HTTP Message Signatures. ([source](https://datatracker.ietf.org/doc/rfc9421/))
- RFC 9421 includes Signature-Input and Signature HTTP fields for including a message signature in a message. ([source](https://datatracker.ietf.org/doc/rfc9421/))
- RFC 9110 is the HTTP Semantics specification. ([source](https://datatracker.ietf.org/doc/rfc9110/))

## Further Reading

- [RFC 9421 HTTP Message Signatures](https://datatracker.ietf.org/doc/rfc9421/)
- [RFC 9110 HTTP Semantics](https://datatracker.ietf.org/doc/rfc9110/)
