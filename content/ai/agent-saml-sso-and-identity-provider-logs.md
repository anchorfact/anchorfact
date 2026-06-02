---
id: agent-saml-sso-and-identity-provider-logs
title: 'Agent SAML SSO and Identity Provider Logs'
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
  - id: fact-ai-agent-saml-sso-and-identity-provider-logs-1
    statement: >-
      Microsoft identity platform documentation describes the SAML single sign-on protocol used for
      single sign-on applications.
    source_title: Microsoft SAML Single Sign-On Protocol
    source_url: https://learn.microsoft.com/en-us/entra/identity-platform/single-sign-on-saml-protocol
    confidence: medium
  - id: fact-ai-agent-saml-sso-and-identity-provider-logs-2
    statement: >-
      Microsoft Entra documentation describes sign-in logs as information about user sign-ins and
      application usage.
    source_title: Microsoft Entra Sign-In Logs
    source_url: https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins
    confidence: medium
  - id: fact-ai-agent-saml-sso-and-identity-provider-logs-3
    statement: >-
      Okta support documentation describes user sign-in and recovery events in the Okta System Log.
    source_title: Okta User Sign-In Events in System Log
    source_url: https://support.okta.com/help/s/article/User-Signin-and-Recovery-Events-in-the-Okta-System-Log?language=en_US
    confidence: medium
completeness: 0.83
known_gaps:
  - SSO diagnosis depends on tenant policy, certificate rotation, assertion attributes, clock skew, service-provider settings, IdP logs, and privacy restrictions on log visibility.
disputed_statements: []
primary_sources:
  - title: Microsoft SAML Single Sign-On Protocol
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/entra/identity-platform/single-sign-on-saml-protocol
    institution: Microsoft
  - title: Microsoft Entra Sign-In Logs
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins
    institution: Microsoft
  - title: Okta User Sign-In Events in System Log
    type: documentation
    year: 2026
    url: https://support.okta.com/help/s/article/User-Signin-and-Recovery-Events-in-the-Okta-System-Log?language=en_US
    institution: Okta
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

SAML SSO and identity-provider logs help agents distinguish authentication failures from application authorization bugs.

## Core Explanation

SSO failures can happen before the application receives a valid identity. Agents should inspect the SAML request and response path, certificate status, audience, reply URL, user assignment, group claim, conditional access, and identity-provider sign-in logs.

This evidence prevents risky repairs such as disabling SSO or widening app access. A useful diagnosis names the IdP, service provider, affected user, timestamp, error code, and assertion or sign-in log evidence.

## Source-Mapped Facts

- Microsoft identity platform documentation describes the SAML single sign-on protocol used for single sign-on applications. ([source](https://learn.microsoft.com/en-us/entra/identity-platform/single-sign-on-saml-protocol))
- Microsoft Entra documentation describes sign-in logs as information about user sign-ins and application usage. ([source](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins))
- Okta support documentation describes user sign-in and recovery events in the Okta System Log. ([source](https://support.okta.com/help/s/article/User-Signin-and-Recovery-Events-in-the-Okta-System-Log?language=en_US))

## Further Reading

- [Microsoft SAML Single Sign-On Protocol](https://learn.microsoft.com/en-us/entra/identity-platform/single-sign-on-saml-protocol)
- [Microsoft Entra Sign-In Logs](https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins)
- [Okta User Sign-In Events in System Log](https://support.okta.com/help/s/article/User-Signin-and-Recovery-Events-in-the-Okta-System-Log?language=en_US)
