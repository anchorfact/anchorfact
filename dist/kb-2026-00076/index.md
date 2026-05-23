---
id: "kb-2026-00076"
title: "JWT (JSON Web Token)"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "RFC 7519 — JSON Web Token (JWT)"
    authors: ["Jones, M.", "Bradley, J.", "Sakimura, N."]
    type: "standard"
    year: 2015
    url: "https://www.rfc-editor.org/rfc/rfc7519"
    institution: "IETF"
secondary_sources:
  - title: "RFC 7519 — JSON Web Token (JWT)"
    authors: ["Jones", "Bradley", "Sakimura"]
    type: "standard"
    year: 2015
    url: "https://www.rfc-editor.org/rfc/rfc7519"
    institution: "IETF"
completeness: 0.80
ai_citations: {last_citation_check: "2026-05-22"}
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
