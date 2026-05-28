---
id: kb-2026-00094
title: Cross-Origin Resource Sharing (CORS)
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-01
    statement: CORS uses HTTP headers to tell browsers whether a cross-origin response may be shared with frontend JavaScript.
    source_title: Cross-Origin Resource Sharing (CORS)
    source_url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
    confidence: medium
  - id: fact-computer-science-02
    statement: A CORS preflight request is an OPTIONS request sent before some cross-origin requests.
    source_title: Preflight request
    source_url: https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
    confidence: medium
  - id: fact-computer-science-03
    statement: >-
      The same-origin policy restricts how a document or script loaded from one origin can interact with resources from
      another origin.
    source_title: Same-origin policy
    source_url: https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
    confidence: medium
completeness: 0.88
known_gaps:
  - Browser-specific edge cases and evolving Fetch behavior
  - Security review for credentialed cross-origin requests
disputed_statements: []
primary_sources:
  - title: Cross-Origin Resource Sharing (CORS)
    type: documentation
    year: 2026
    institution: MDN Web Docs
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
  - title: Preflight request
    type: documentation
    year: 2026
    institution: MDN Web Docs
    url: https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request
  - title: Same-origin policy
    type: documentation
    year: 2026
    institution: MDN Web Docs
    url: https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
CORS is the browser protocol that lets servers opt in to sharing selected cross-origin responses with frontend JavaScript. It exists because the same-origin policy restricts scripts from freely reading resources across origins.

## Core Explanation
A server participates in CORS by returning response headers such as Access-Control-Allow-Origin. Some requests require a preflight OPTIONS request so the browser can check whether the actual request is allowed before sending it.

## Detailed Analysis
CORS is enforced by browsers, not by every HTTP client. Credentialed requests have stricter rules and should be configured carefully. A public CORS header can be appropriate for public APIs, but it should not be used as an authentication or authorization mechanism.

## Further Reading
- Fetch Standard CORS protocol
- MDN CORS guide
- MDN same-origin policy

## Related Articles

- [AI for Predictive Policing: Crime Forecasting, Resource Allocation, and Bias Mitigation](../../ai/ai-predictive-policing.md)
- [AI for Team Collaboration: Smart Meetings, Knowledge Sharing, and Collaborative Intelligence](../../ai/ai-team-collaboration.md)
- [Low-Resource NLP: Multilingual Models, Endangered Language Preservation, and Translation](../../ai/low-resource-nlp.md)
