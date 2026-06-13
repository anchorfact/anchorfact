---
id: kb-2026-00114
title: Cross-Site Request Forgery (CSRF)
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-13'
created_date: '2026-05-22'
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-csrf-001
    statement: >-
      OWASP describes Cross-Site Request Forgery as an attack that causes an end
      user to execute unwanted actions on a web application where the user is
      currently authenticated.
    source_title: Cross Site Request Forgery
    source_url: https://owasp.org/www-community/attacks/csrf
    confidence: medium
  - id: fact-computer-science-csrf-002
    statement: >-
      OWASP explains that when a user is authenticated, the target site may be
      unable to distinguish a forged request from a legitimate request because
      authentication material such as cookies is sent by the browser.
    source_title: Cross Site Request Forgery
    source_url: https://owasp.org/www-community/attacks/csrf
    confidence: medium
  - id: fact-computer-science-csrf-003
    statement: >-
      OWASP's CSRF Prevention Cheat Sheet recommends token-based mitigations such
      as the synchronizer token pattern and lists custom request headers and
      SameSite cookies as additional defensive techniques.
    source_title: Cross-Site Request Forgery Prevention Cheat Sheet
    source_url: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
    confidence: medium
  - id: fact-computer-science-csrf-004
    statement: >-
      MDN documents the SameSite cookie attribute as a control for whether cookies
      are sent with cross-site requests, and states that SameSite=None requires
      the Secure attribute.
    source_title: Set-Cookie header
    source_url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie
    confidence: medium
completeness: 0.84
known_gaps:
  - >-
    Coverage is limited to defensive concepts and does not enumerate exploit
    payload construction or framework-specific implementation details.
disputed_statements: []
primary_sources:
  - title: Cross Site Request Forgery
    type: documentation
    year: 2026
    url: https://owasp.org/www-community/attacks/csrf
    institution: OWASP
  - title: Cross-Site Request Forgery Prevention Cheat Sheet
    type: documentation
    year: 2026
    url: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
    institution: OWASP
  - title: Set-Cookie header
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie
    institution: Mozilla
secondary_sources: []
updated: '2026-06-13'
---

## TL;DR

Cross-Site Request Forgery tricks a browser that already has an authenticated
session into sending an unwanted state-changing request. Defensive coverage should
focus on request-specific CSRF tokens, browser cookie controls such as SameSite,
and request validation patterns that make forged cross-site submissions fail.

## Core Explanation

OWASP frames CSRF as a confused-deputy problem around authenticated browsers:
the browser can attach authentication material to a request even when the action
was not intentionally initiated by the user. OWASP's prevention guidance treats
tokens as the primary mitigation pattern for stateful applications and lists
custom request headers and SameSite cookies as complementary defenses. MDN's
Set-Cookie reference documents SameSite as the cookie attribute that controls
cross-site sending behavior and requires `Secure` when `SameSite=None` is used.

## Further Reading

- [Cross Site Request Forgery](https://owasp.org/www-community/attacks/csrf)
- [Cross-Site Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [Set-Cookie header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie)

## Related Articles

- [Cross-Site Scripting (XSS)](cross-site-scripting-xss.md)
- [Same-Origin Policy](same-origin-policy.md)
- [Content Security Policy (CSP)](content-security-policy-csp.md)
