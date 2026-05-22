---
id:"kb-2026-00115"
title:"Authentication vs Authorization"
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
    institution:"NIST"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Authentication verifies identity (who you are), while authorization determines permissions (what you can do). Authentication factors: something you know (password), have (token), are (biometrics). Multi-Factor Authentication (MFA) requires two or more factors. Authorization models: RBAC (Role-Based Access Control), ABAC (Attribute-Based), ReBAC (Relationship-Based).

## Core Explanation

Session management: after authentication, a session token (cookie, JWT) maintains state across requests. OAuth 2.0 and OpenID Connect (OIDC) are the modern standards for delegated authentication/authorization. Key principle: never roll your own authentication — use battle-tested libraries and follow current NIST guidelines.

## Further Reading

- [undefined](undefined)
