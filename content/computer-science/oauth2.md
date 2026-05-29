---
id: kb-2026-00075
title: OAuth 2.0
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-30"
created_date: "2026-05-22"
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.84
atomic_facts:
  - id: fact-computer-science-oauth2-001
    statement: "RFC 6749 defines OAuth 2.0 as an authorization framework that enables a third-party application to obtain limited access to an HTTP service."
    source_title: "RFC 6749: The OAuth 2.0 Authorization Framework"
    source_url: "https://www.rfc-editor.org/rfc/rfc6749.txt"
    confidence: medium
  - id: fact-computer-science-oauth2-002
    statement: "RFC 7636 specifies Proof Key for Code Exchange (PKCE) as an OAuth extension for public clients using the authorization code grant."
    source_title: "RFC 7636: Proof Key for Code Exchange by OAuth Public Clients"
    source_url: "https://www.rfc-editor.org/rfc/rfc7636.txt"
    confidence: medium
  - id: fact-computer-science-oauth2-003
    statement: "RFC 9700 describes best current security practice for OAuth 2.0 and covers threats and lessons learned since the original OAuth 2.0 specifications were published."
    source_title: "RFC 9700: Best Current Practice for OAuth 2.0 Security"
    source_url: "https://www.rfc-editor.org/rfc/rfc9700.txt"
    confidence: medium
known_gaps:
  - "This article focuses on protocol boundaries and security guidance, not provider-specific login button behavior."
  - "OpenID Connect identity-layer details are related but outside this compact OAuth 2.0 entry."
disputed_statements: []
primary_sources:
  - title: "RFC 6749: The OAuth 2.0 Authorization Framework"
    authors:
      - Hardt, D.
    type: rfc
    year: 2012
    url: "https://www.rfc-editor.org/rfc/rfc6749.txt"
    institution: IETF
  - title: "RFC 7636: Proof Key for Code Exchange by OAuth Public Clients"
    authors:
      - Sakimura, N.
      - Bradley, J.
      - Agarwal, N.
    type: rfc
    year: 2015
    url: "https://www.rfc-editor.org/rfc/rfc7636.txt"
    institution: IETF
  - title: "RFC 9700: Best Current Practice for OAuth 2.0 Security"
    authors:
      - Lodderstedt, T.
      - Bradley, J.
      - Labunets, A.
      - Fett, D.
    type: rfc
    year: 2025
    url: "https://www.rfc-editor.org/rfc/rfc9700.txt"
    institution: IETF
secondary_sources: []
---

## TL;DR

OAuth 2.0 is an authorization framework for delegated, limited access to HTTP services. It is not the same thing as authentication by itself; identity flows usually add OpenID Connect on top. For modern deployments, PKCE and the OAuth 2.0 security best current practice are central to using the framework safely.

## Core Explanation

RFC 6749 separates the resource owner, client, authorization server, and resource server. Instead of handing a password to a third-party client, the resource owner authorizes limited access and the client receives an access token for a defined scope or context.

PKCE, standardized in RFC 7636, adds a proof step to the authorization code flow for public clients. The client sends a code challenge during authorization and later proves possession of the original verifier when redeeming the authorization code.

RFC 9700 updates the security posture for OAuth 2.0 deployments. It documents newer attack classes and lessons learned from broad adoption, making clear that real systems must validate redirect behavior, token audience, client assumptions, and authorization server metadata rather than treating OAuth as a single turnkey login feature.

## Further Reading

- [RFC 6749: The OAuth 2.0 Authorization Framework](https://www.rfc-editor.org/rfc/rfc6749.txt)
- [RFC 7636: Proof Key for Code Exchange by OAuth Public Clients](https://www.rfc-editor.org/rfc/rfc7636.txt)
- [RFC 9700: Best Current Practice for OAuth 2.0 Security](https://www.rfc-editor.org/rfc/rfc9700.txt)

## Related Articles

- [OAuth 2.0: Authorization Framework and Security Best Practices](../oauth-2-0-authorization-framework-and-security-best-practices.md)
- [JWT (JSON Web Token)](../jwt.md)
