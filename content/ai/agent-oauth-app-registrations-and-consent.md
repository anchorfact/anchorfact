---
id: agent-oauth-app-registrations-and-consent
title: 'Agent OAuth App Registrations and Consent'
schema_type: TechArticle
category: ai
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
  - id: fact-ai-agent-oauth-app-registrations-and-consent-1
    statement: >-
      GitHub OAuth app documentation describes redirecting users to GitHub to request their
      GitHub identity.
    source_title: GitHub Authorizing OAuth Apps
    source_url: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
    confidence: medium
  - id: fact-ai-agent-oauth-app-registrations-and-consent-2
    statement: >-
      Google Workspace documentation describes configuring an OAuth consent screen for Google
      Workspace apps.
    source_title: Google Configure OAuth Consent
    source_url: https://developers.google.com/workspace/guides/configure-oauth-consent
    confidence: medium
  - id: fact-ai-agent-oauth-app-registrations-and-consent-3
    statement: >-
      Microsoft Entra documentation describes user and admin consent as part of application access
      to protected resources.
    source_title: Microsoft Entra User and Admin Consent
    source_url: https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/user-admin-consent-overview
    confidence: medium
completeness: 0.83
known_gaps:
  - OAuth behavior depends on tenant policy, app registration type, redirect URIs, requested scopes, verified publisher state, and admin consent rules.
disputed_statements: []
primary_sources:
  - title: GitHub Authorizing OAuth Apps
    type: documentation
    year: 2026
    url: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
    institution: GitHub
  - title: Google Configure OAuth Consent
    type: documentation
    year: 2026
    url: https://developers.google.com/workspace/guides/configure-oauth-consent
    institution: Google for Developers
  - title: Microsoft Entra User and Admin Consent
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/user-admin-consent-overview
    institution: Microsoft
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

OAuth app registration and consent records tell agents why an integration can authenticate but still lack permission to act.

## Core Explanation

Agents troubleshooting OAuth failures need more than a token error string. They should inspect the app registration, redirect URI, requested scopes, consent screen, tenant consent policy, and whether consent was granted by a user or administrator.

This evidence prevents unsafe fixes such as broadening scopes without approval. A least-privilege recommendation should name the app, provider, scope set, consent state, and user or tenant boundary.

## Source-Mapped Facts

- GitHub OAuth app documentation describes redirecting users to GitHub to request their GitHub identity. ([source](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps))
- Google Workspace documentation describes configuring an OAuth consent screen for Google Workspace apps. ([source](https://developers.google.com/workspace/guides/configure-oauth-consent))
- Microsoft Entra documentation describes user and admin consent as part of application access to protected resources. ([source](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/user-admin-consent-overview))

## Further Reading

- [GitHub Authorizing OAuth Apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)
- [Google Configure OAuth Consent](https://developers.google.com/workspace/guides/configure-oauth-consent)
- [Microsoft Entra User and Admin Consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/user-admin-consent-overview)
