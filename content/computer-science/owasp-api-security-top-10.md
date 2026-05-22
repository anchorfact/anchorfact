---
id:"kb-2026-00125"
title:"OWASP API Security Top 10"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"undefined"
    type:"undefined"
    url:"undefined"
    institution:"OWASP Foundation"
secondary_sources:
  - title: "RFC 7519 — JSON Web Token (JWT)"
    authors: ["Jones", "Bradley", "Sakimura"]
    type: "standard"
    year: 2015
    url: "https://www.rfc-editor.org/rfc/rfc7519"
    institution: "IETF"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

The OWASP API Security Top 10 is a dedicated list of the most critical API security risks, separate from the general web application Top 10. It addresses API-specific threats: broken object-level authorization, broken authentication, excessive data exposure, lack of rate limiting.

## Core Explanation

API1:2023 Broken Object Level Authorization (BOLA) — user accesses other users' data by modifying ID in URL. API2:2023 Broken Authentication — weak JWT validation, no MFA. API3:2023 Broken Object Property Level Authorization — mass assignment vulnerabilities. API4:2023 Unrestricted Resource Consumption — no rate limiting enables DoS. Every API developer should review this list.

## Further Reading

- [undefined](undefined)
