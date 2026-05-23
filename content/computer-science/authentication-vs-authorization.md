---
id: kb-2026-00115
title: Authentication vs Authorization
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
ai_models:
  - claude-opus
derived_from_human_seed: true
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
completeness: 0.88
ai_citations: null
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
secondary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
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
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      Authentication verifies identity (who you are), while authorization determines permissions (what you can do). Authentication factors: something you know (password), have (token), are
      (biometrics). Multi-Factor Authentication (MFA) requires two or more factors. Authorization models: RBAC (Role-Based Access Control), ABAC (Attribute-Based), ReBAC (Re
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-002
    statement: OAuth 2.0 and OpenID Connect (OIDC) are the modern standards for delegated authentication/authorization.
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-003
    statement: "Key principle: never roll your own authentication — use battle-tested libraries and follow current NIST guidelines."
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
---



## TL;DR

Authentication verifies identity (who you are), while authorization determines permissions (what you can do). Authentication factors: something you know (password), have (token), are (biometrics). Multi-Factor Authentication (MFA) requires two or more factors. Authorization models: RBAC (Role-Based Access Control), ABAC (Attribute-Based), ReBAC (Relationship-Based).

## Core Explanation

Session management: after authentication, a session token (cookie, JWT) maintains state across requests. OAuth 2.0 and OpenID Connect (OIDC) are the modern standards for delegated authentication/authorization. Key principle: never roll your own authentication — use battle-tested libraries and follow current NIST guidelines.

## Further Reading

- [undefined](undefined)
