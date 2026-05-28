---
id: kb-2026-00093
title: Content Security Policy (CSP)
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-22'
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      MDN describes Content Security Policy as a way to control which resources a browser is allowed
      to load for a page.
    source_title: Content Security Policy (CSP) - HTTP | MDN
    source_url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP
    confidence: medium
  - id: fact-computer-science-002
    statement: >-
      The W3C CSP Level 3 specification defines the Content-Security-Policy response header and
      policy directives.
    source_title: Content Security Policy Level 3
    source_url: https://www.w3.org/TR/CSP3/
    confidence: medium
  - id: fact-computer-science-003
    statement: >-
      OWASP presents CSP as a defense-in-depth mechanism that helps reduce the impact of content
      injection flaws.
    source_title: Content Security Policy Cheat Sheet
    source_url: https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html
    confidence: medium
completeness: 0.88
known_gaps:
  - >-
    Coverage intentionally narrowed to directly sourced public evidence; adjacent subtopics are not
    exhaustively covered.
disputed_statements: []
primary_sources:
  - title: Content Security Policy (CSP) - HTTP | MDN
    type: documentation
    year: 2025
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP
    institution: Mozilla
  - title: Content Security Policy Level 3
    type: standard
    year: 2025
    url: https://www.w3.org/TR/CSP3/
    institution: W3C
  - title: Content Security Policy Cheat Sheet
    type: security_guidance
    year: 2026
    url: https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html
    institution: OWASP
secondary_sources: []
updated: '2026-05-28'
---
## TL;DR

Content Security Policy is a browser security mechanism for restricting which resources a page may load or execute. The repaired article focuses on CSP purpose, delivery, and directive semantics from MDN, W3C, and OWASP sources.

## Core Explanation

CSP is best described as defense-in-depth for web applications. Policies can be sent with the Content-Security-Policy response header, directives such as default-src and script-src constrain resource sources, and OWASP frames CSP as a mitigation that complements secure coding rather than replacing it.

## Further Reading

- [Content Security Policy (CSP) - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
- [Content Security Policy Level 3](https://www.w3.org/TR/CSP3/)
- [Content Security Policy Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)

## Related Articles

- [AI Content Moderation Platforms: Large-Scale Safety Systems, Policy Engines, and Multilingual Review](../../ai/ai-content-moderation-platforms.md)
- [AI Content Authenticity: Watermarking and Detection](../../ai/ai-content-authenticity.md)
- [AI for Content Creation: Generative Writing, Video Production, and Automated Media Generation](../../ai/ai-content-creation.md)
