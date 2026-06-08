---
id: api-oauth-pkce-and-public-clients
title: 'API OAuth PKCE and Public Clients'
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
  - id: fact-cs-api-oauth-pkce-and-public-clients-1
    statement: >-
      RFC 7636 specifies Proof Key for Code Exchange as an OAuth extension for
      public clients.
    source_title: RFC 7636 OAuth PKCE
    source_url: https://datatracker.ietf.org/doc/html/rfc7636
    confidence: medium
  - id: fact-cs-api-oauth-pkce-and-public-clients-2
    statement: >-
      RFC 7636 says clients capable of using S256 must use S256 for the code
      challenge transformation.
    source_title: RFC 7636 OAuth PKCE
    source_url: https://datatracker.ietf.org/doc/html/rfc7636
    confidence: medium
  - id: fact-cs-api-oauth-pkce-and-public-clients-3
    statement: >-
      RFC 9700 says public OAuth clients must use PKCE to prevent authorization
      code injection attacks and misuse of authorization codes.
    source_title: RFC 9700 OAuth 2.0 Security BCP
    source_url: https://datatracker.ietf.org/doc/html/rfc9700
    confidence: medium
completeness: 0.84
known_gaps:
  - PKCE diagnosis also depends on authorization server metadata, redirect URI validation, state or nonce handling, issuer binding, token endpoint enforcement, code lifetime, client type, and whether confidential clients also use PKCE.
  - PKCE does not replace TLS, exact redirect URI validation, token audience checks, refresh-token controls, or resource-server authorization.
disputed_statements: []
primary_sources:
  - title: RFC 7636 OAuth PKCE
    type: rfc
    year: 2015
    url: https://datatracker.ietf.org/doc/html/rfc7636
    institution: IETF
  - title: RFC 9700 OAuth 2.0 Security BCP
    type: rfc
    year: 2025
    url: https://datatracker.ietf.org/doc/html/rfc9700
    institution: IETF
  - title: RFC 8414 OAuth 2.0 Authorization Server Metadata
    type: rfc
    year: 2018
    url: https://datatracker.ietf.org/doc/html/rfc8414
    institution: IETF
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

PKCE evidence helps agents debug OAuth authorization-code flows by tying the authorization request's code challenge to the token request's code verifier, especially for public clients that cannot safely hold a client secret.

## Core Explanation

Agents modifying OAuth flows should preserve the transaction evidence: client type, authorization server metadata, redirect URI, state or nonce, code challenge, challenge method, code verifier, token endpoint request, and exact error. A missing or mismatched verifier is a different failure from a bad redirect URI or invalid client registration.

Public clients need PKCE because an intercepted authorization code should not be redeemable without the verifier. Modern security guidance also recommends PKCE for confidential clients because it adds protection against authorization-code misuse. Agents should not downgrade from S256 to plain, reuse verifiers, or treat PKCE as a substitute for redirect and token validation.

## Source-Mapped Facts

- RFC 7636 specifies Proof Key for Code Exchange as an OAuth extension for public clients. ([source](https://datatracker.ietf.org/doc/html/rfc7636))
- RFC 7636 says clients capable of using S256 must use S256 for the code challenge transformation. ([source](https://datatracker.ietf.org/doc/html/rfc7636))
- RFC 9700 says public OAuth clients must use PKCE to prevent authorization code injection attacks and misuse of authorization codes. ([source](https://datatracker.ietf.org/doc/html/rfc9700))

## Further Reading

- [RFC 7636 OAuth PKCE](https://datatracker.ietf.org/doc/html/rfc7636)
- [RFC 9700 OAuth 2.0 Security BCP](https://datatracker.ietf.org/doc/html/rfc9700)
- [RFC 8414 OAuth 2.0 Authorization Server Metadata](https://datatracker.ietf.org/doc/html/rfc8414)
