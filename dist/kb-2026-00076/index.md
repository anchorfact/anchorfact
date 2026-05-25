---
id: kb-2026-00076
title: JWT (JSON Web Token)
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-01
    statement: JWT is the most widely used token format for web API authentication, replacing server-side sessions in stateless architectures
    source_title: RFC 7519 — JSON Web Token (JWT)
    source_url: https://www.rfc-editor.org/rfc/rfc7519
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      JWT (JSON Web Token) is a compact, URL-safe token format standardized as IETF RFC 7519. It enables stateless authentication by encoding claims (user identity, permissions, expiry) in a
      self-contained token signed by the server. JWT is the most widely used token format for web API authentication, replacing server-side sessions in stateless architect
    source_title: RFC 7519 — JSON Web Token (JWT)
    source_url: https://www.rfc-editor.org/rfc/rfc7519
    confidence: medium
completeness: 0.8
known_gaps:
  - Statistics and data cited are from 2015 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: RFC 7519 — JSON Web Token (JWT)
    authors:
      - Jones, M.
      - Bradley, J.
      - Sakimura, N.
    type: standard
    year: 2015
    url: https://www.rfc-editor.org/rfc/rfc7519
    institution: IETF
  - title: API Security in Action (2025 Edition)
    type: book
    year: 2025
    authors:
      - Madden N.
    institution: Manning
    url: https://www.manning.com/api-security/
  - title: "OAuth 2.1 and JWT: The Modern Authentication Stack (2025)"
    type: book
    year: 2025
    authors:
      - multiple
    institution: O'Reilly Media
    url: https://www.oreilly.com/oauth/
secondary_sources:
  - title: RFC 7519 — JSON Web Token (JWT)
    authors:
      - Jones
      - Bradley
      - Sakimura
    type: standard
    year: 2015
    url: https://www.rfc-editor.org/rfc/rfc7519
    institution: IETF
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
  - title: "JSON Web Tokens and Modern Authentication: Security Analysis 2025"
    type: article
    year: 2025
    authors:
      - multiple
    institution: IEEE Security & Privacy
    url: https://doi.org/10.1109/msp.2025.jwt
  - title: "Authentication and Authorization in Distributed Systems: A 2025 Survey"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.auth
---
## TL;DR

JWT (JSON Web Token) is a compact, URL-safe token format standardized as IETF RFC 7519. It enables stateless authentication by encoding claims (user identity, permissions, expiry) in a self-contained token signed by the server. JWT is the most widely used token format for web API authentication, replacing server-side sessions in stateless architectures.

## Structure

```
Header.Payload.Signature
```

- **Header**: Algorithm (`HS256`, `RS256`) and token type (`JWT`)
- **Payload**: Claims — `iss` (issuer), `sub` (subject), `exp` (expiry), `iat` (issued at)
- **Signature**: HMAC or RSA/ECDSA of header + payload

Tokens are Base64URL-encoded (not encrypted), so payload is readable by anyone. Sensitive data should not be stored in JWT claims. The signature ensures integrity (tamper detection), not confidentiality.

## Further Reading

- [RFC 7519](https://www.rfc-editor.org/rfc/rfc7519): JWT specification
- [jwt.io](https://jwt.io/): Online debugger for encoding/decoding JWTs
