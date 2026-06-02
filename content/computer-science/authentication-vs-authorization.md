---
id: kb-2026-00115
title: Authentication vs Authorization
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: '2026-06-02'
created_date: '2026-05-22'
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: 'NIST SP 800-63B defines requirements and recommendations for using authenticators to establish that a claimant controls one or more authenticators associated with a subscriber account.'
    source_title: NIST SP 800-63B
    source_url: https://pages.nist.gov/800-63-4/sp800-63b.html
  - id: fact-computer-science-002
    statement: 'RFC 6749 defines OAuth 2.0 as an authorization framework that lets a third-party application obtain limited access to an HTTP service.'
    source_title: RFC 6749 - The OAuth 2.0 Authorization Framework
    source_url: https://datatracker.ietf.org/doc/html/rfc6749
  - id: fact-computer-science-003
    statement: 'NIST describes role-based access control as controlling access to resources by assigning users to roles and assigning permissions to those roles.'
    source_title: Role Based Access Control | CSRC
    source_url: https://csrc.nist.gov/projects/role-based-access-control
completeness: 0.88
known_gaps: []
disputed_statements: []
primary_sources:
  - title: NIST SP 800-63B
    type: standard
    year: 2025
    url: https://pages.nist.gov/800-63-4/sp800-63b.html
    institution: National Institute of Standards and Technology
  - title: RFC 6749 - The OAuth 2.0 Authorization Framework
    type: standard
    year: 2012
    url: https://datatracker.ietf.org/doc/html/rfc6749
    institution: Internet Engineering Task Force
  - title: Role Based Access Control | CSRC
    type: reference
    year: 2026
    url: https://csrc.nist.gov/projects/role-based-access-control
    institution: National Institute of Standards and Technology
secondary_sources: []
---

## TL;DR

Authentication establishes who or what is making a request. Authorization determines what that authenticated party is allowed to do. Modern identity systems usually combine authenticators, sessions or tokens, and authorization policy checks.

## Core Explanation

NIST authentication guidance focuses on authenticators and assurance levels. OAuth 2.0 is an authorization framework for delegated access to HTTP services, while OpenID Connect layers identity assertions on top of OAuth 2.0. Role-based access control is one common authorization model: users are assigned to roles, and roles carry permissions.

## Further Reading

- [NIST SP 800-63B](https://pages.nist.gov/800-63-4/sp800-63b.html)
- [RFC 6749 - The OAuth 2.0 Authorization Framework](https://datatracker.ietf.org/doc/html/rfc6749)
- [NIST Role Based Access Control](https://csrc.nist.gov/projects/role-based-access-control)

## Related Articles

- [AI for Digital Forensics: Deepfake Provenance, Evidence Authentication, and Digital Crime Investigation](../../ai/ai-digital-forensics.md)
- [AI Identity Verification: Document Authentication, Liveness Detection, and KYC Compliance](../../ai/ai-identity-verification.md)
- [JWT: JSON Web Tokens - Authentication, Claims, and Security](../jwt-json-web-tokens-authentication-claims-and-security.md)
