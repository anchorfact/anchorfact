---
id: api-oauth-device-authorization-flow
title: 'API OAuth Device Authorization Flow'
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
  - id: fact-computer-science-api-oauth-device-authorization-flow-1
    statement: >-
      RFC 8628 defines a device authorization endpoint that is separate from the OAuth
      authorization endpoint used by a browser user agent.
    source_title: RFC 8628 OAuth 2.0 Device Authorization Grant
    source_url: https://datatracker.ietf.org/doc/html/rfc8628
    confidence: medium
  - id: fact-computer-science-api-oauth-device-authorization-flow-2
    statement: >-
      Google Identity documentation describes an OAuth 2.0 flow for applications on devices
      with limited input capabilities, such as TVs or game consoles.
    source_title: Google OAuth for Limited-Input Devices
    source_url: https://developers.google.com/identity/protocols/oauth2/limited-input-device
    confidence: medium
  - id: fact-computer-science-api-oauth-device-authorization-flow-3
    statement: >-
      GitHub documentation describes a device flow for authorizing OAuth apps on devices or
      command-line tools.
    source_title: GitHub OAuth Device Flow
    source_url: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#device-flow
    confidence: medium
completeness: 0.84
known_gaps:
  - Device flow implementation depends on polling interval, slow_down handling, code expiry, client type, scopes, phishing-resistant UX, and tenant policy.
disputed_statements: []
primary_sources:
  - title: RFC 8628 OAuth 2.0 Device Authorization Grant
    type: standard
    year: 2019
    url: https://datatracker.ietf.org/doc/html/rfc8628
    institution: IETF
  - title: Google OAuth for Limited-Input Devices
    type: documentation
    year: 2026
    url: https://developers.google.com/identity/protocols/oauth2/limited-input-device
    institution: Google
  - title: GitHub OAuth Device Flow
    type: documentation
    year: 2026
    url: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#device-flow
    institution: GitHub
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

The OAuth device authorization flow lets CLIs, TVs, appliances, and other constrained clients obtain authorization through a separate browser-capable device.

## Core Explanation

In a device flow, the client asks the authorization server for a device code and user code, shows the user a verification URI, and polls the token endpoint until the user completes authorization or the code expires.

Agents should inspect client ID, requested scopes, verification URI, user-code expiry, polling interval, device-code status, and tenant restrictions before diagnosing auth failures in command-line or headless tools.

## Source-Mapped Facts

- RFC 8628 defines a device authorization endpoint that is separate from the OAuth authorization endpoint used by a browser user agent. ([source](https://datatracker.ietf.org/doc/html/rfc8628))
- Microsoft identity platform documentation describes the OAuth 2.0 device authorization grant for devices that are input constrained or lack a browser. ([source](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-device-code))
- GitHub documentation describes a device flow for authorizing OAuth apps on devices or command-line tools. ([source](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#device-flow))

## Further Reading

- [RFC 8628 OAuth 2.0 Device Authorization Grant](https://datatracker.ietf.org/doc/html/rfc8628)
- [Google OAuth for Limited-Input Devices](https://developers.google.com/identity/protocols/oauth2/limited-input-device)
- [GitHub OAuth Device Flow](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#device-flow)
