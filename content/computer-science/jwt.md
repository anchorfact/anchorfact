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
atomic_facts:
  - id: fact-computer-science-01
    statement: >-
      JWT is the most widely used token format for web API authentication, replacing server-side sessions in stateless
      architectures
    source_title: RFC 7519 — JSON Web Token (JWT)
    source_url: https://www.rfc-editor.org/rfc/rfc7519
    confidence: medium
  
completeness: 0.80
known_gaps:
  - "Statistics and data cited are from 2015 and earlier; more recent data may have become available since publication"
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
  - "Recent developments from 2025-2026 may not be reflected"
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
