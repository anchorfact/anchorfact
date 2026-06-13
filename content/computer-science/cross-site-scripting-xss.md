---
id: kb-2026-00113
title: Cross-Site Scripting (XSS)
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
  - id: fact-computer-science-xss-001
    statement: >-
      OWASP describes Cross-Site Scripting attacks as a type of injection in which
      malicious scripts are injected into otherwise benign and trusted websites.
    source_title: Cross Site Scripting
    source_url: https://owasp.org/www-community/attacks/xss/
    confidence: medium
  - id: fact-computer-science-xss-002
    statement: >-
      OWASP explains that XSS can occur when untrusted data enters a web application
      and is included in dynamic content sent to a user without validation for
      malicious content.
    source_title: Cross Site Scripting
    source_url: https://owasp.org/www-community/attacks/xss/
    confidence: medium
  - id: fact-computer-science-xss-003
    statement: >-
      OWASP's XSS Prevention Cheat Sheet organizes defenses around output encoding,
      HTML sanitization, and safe sinks for browser output contexts.
    source_title: Cross Site Scripting Prevention Cheat Sheet
    source_url: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
    confidence: medium
  - id: fact-computer-science-xss-004
    statement: >-
      MDN documents the Content-Security-Policy response header as a way for site
      administrators to control resources a user agent may load, helping guard
      against cross-site scripting attacks.
    source_title: Content-Security-Policy header
    source_url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy
    confidence: medium
completeness: 0.84
known_gaps:
  - >-
    Coverage is limited to defensive concepts and does not enumerate exploit
    payload construction, bypass techniques, or framework-specific hardening details.
disputed_statements: []
primary_sources:
  - title: Cross Site Scripting
    type: documentation
    year: 2026
    url: https://owasp.org/www-community/attacks/xss/
    institution: OWASP
  - title: Cross Site Scripting Prevention Cheat Sheet
    type: documentation
    year: 2026
    url: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
    institution: OWASP
  - title: Content-Security-Policy header
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy
    institution: Mozilla
secondary_sources: []
updated: '2026-06-13'
---

## TL;DR

Cross-Site Scripting is a content-injection risk where untrusted data reaches
browser-executed output. Defensive coverage should focus on context-aware output
encoding, safe DOM/output sinks, sanitization where HTML is intentionally allowed,
and Content Security Policy as defense in depth.

## Core Explanation

OWASP frames XSS as an injection class: malicious script can be delivered through
otherwise trusted pages when untrusted data is included in dynamic content without
proper validation or encoding. OWASP's prevention guidance emphasizes matching the
defense to the output context, using output encoding, sanitization, and safe sinks.
MDN documents CSP as an additional browser-enforced policy layer that controls
which resources a page may load and can reduce the impact of script injection.

## Further Reading

- [Cross Site Scripting](https://owasp.org/www-community/attacks/xss/)
- [Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Content-Security-Policy header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy)

## Related Articles

- [Cross-Site Request Forgery (CSRF)](cross-site-request-forgery-csrf.md)
- [Content Security Policy (CSP)](content-security-policy-csp.md)
- [Same-Origin Policy](same-origin-policy.md)
