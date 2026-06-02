---
id: oauth-scopes-for-agent-tools
title: 'OAuth Scopes for Agent Tools'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-02'
created_date: '2026-06-02'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-oauth-scopes-for-agent-tools-1
    statement: >-
      RFC 6749 says the scope attribute is a string containing a space-separated list of scope values.
    source_title: RFC 6749 - OAuth 2.0 Authorization Framework
    source_url: https://datatracker.ietf.org/doc/html/rfc6749#section-3.3
    confidence: medium
  - id: fact-cs-oauth-scopes-for-agent-tools-2
    statement: >-
      GitHub OAuth app documentation says scopes specify the type of access needed and limit access for OAuth tokens.
    source_title: Scopes for OAuth Apps - GitHub Docs
    source_url: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps
    confidence: medium
  - id: fact-cs-oauth-scopes-for-agent-tools-3
    statement: >-
      Google OAuth scope documentation says scopes are requested depending on the level of access needed and that sensitive scopes require review.
    source_title: OAuth 2.0 Scopes for Google APIs
    source_url: https://developers.google.com/identity/protocols/oauth2/scopes
    confidence: medium
completeness: 0.84
known_gaps:
  - OAuth scope models vary by provider, and scopes alone do not express every runtime permission, resource boundary, or approval policy.
disputed_statements: []
primary_sources:
  - title: RFC 6749 - OAuth 2.0 Authorization Framework
    type: standard
    year: 2012
    url: https://datatracker.ietf.org/doc/html/rfc6749#section-3.3
    institution: IETF
  - title: Scopes for OAuth Apps - GitHub Docs
    type: documentation
    year: 2026
    url: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps
    institution: GitHub
  - title: OAuth 2.0 Scopes for Google APIs
    type: documentation
    year: 2026
    url: https://developers.google.com/identity/protocols/oauth2/scopes
    institution: Google
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

OAuth scopes constrain what an agent tool token can access, making permission boundaries visible before the agent performs external actions.

## Core Explanation

Agents should not receive broad tokens when a narrower scope can perform the task. Scope selection matters because a tool that can read calendars, edit files, send email, or delete resources carries different user risk.

A robust agent platform maps user intent to scopes, requests explicit consent, records which tool call used which token, and refuses actions that require scopes the user did not grant.

## Source-Mapped Facts

- RFC 6749 says the scope attribute is a string containing a space-separated list of scope values. ([source](https://datatracker.ietf.org/doc/html/rfc6749#section-3.3))
- GitHub OAuth app documentation says scopes specify the type of access needed and limit access for OAuth tokens. ([source](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps))
- Google OAuth scope documentation says scopes are requested depending on the level of access needed and that sensitive scopes require review. ([source](https://developers.google.com/identity/protocols/oauth2/scopes))

## Further Reading

- [RFC 6749 scope parameter](https://datatracker.ietf.org/doc/html/rfc6749#section-3.3)
- [GitHub OAuth app scopes](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps)
- [Google OAuth scopes](https://developers.google.com/identity/protocols/oauth2/scopes)
