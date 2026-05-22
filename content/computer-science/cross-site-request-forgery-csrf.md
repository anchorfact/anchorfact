---
id:"kb-2026-00114"
title:"Cross-Site Request Forgery (CSRF)"
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
    institution:"OWASP"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

CSRF forces authenticated users to execute unwanted actions on a web application. The attacker tricks the victim's browser into sending a request that the application treats as legitimate because it carries the user's session cookie. Prevention: anti-CSRF tokens, SameSite cookies, custom headers.

## Core Explanation

SameSite cookie attribute (2020+): `Strict` (never sent cross-site), `Lax` (default since Chrome 80, sent on top-level navigation GET), `None` (always sent, requires Secure). Modern frameworks (Laravel, Django, Rails) include CSRF protection by default. Double-submit cookie pattern: send token in both cookie and request header.

## Further Reading

- [undefined](undefined)
