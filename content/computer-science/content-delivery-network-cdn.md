---
id: kb-2026-00186
title: Content Delivery Network (CDN)
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
  - id: fact-computer-science-001
    statement: >-
      Cloudflare describes a CDN as a geographically distributed group of servers that caches
      content close to end users.
    source_title: What is a content delivery network (CDN)?
    source_url: https://www.cloudflare.com/learning/cdn/what-is-a-cdn/
    confidence: medium
  - id: fact-computer-science-002
    statement: >-
      RFC 9111 defines HTTP caching semantics for reusing stored responses to satisfy later
      requests.
    source_title: HTTP Caching
    source_url: https://www.rfc-editor.org/rfc/rfc9111.html
    confidence: medium
  - id: fact-computer-science-003
    statement: >-
      MDN documents Cache-Control as the HTTP header used to send caching directives for browser and
      shared caches.
    source_title: Cache-Control header
    source_url: https://developer.mozilla.org/docs/Web/HTTP/Reference/Headers/Cache-Control
    confidence: medium
completeness: 0.88
known_gaps:
  - CDN market share and edge location counts change frequently; check provider documentation
disputed_statements: []
primary_sources:
  - id: ps-content-delivery-network-cdn-1
    title: What is a content delivery network (CDN)?
    type: documentation
    year: 2026
    institution: Cloudflare Learning Center
    url: https://www.cloudflare.com/learning/cdn/what-is-a-cdn/
  - id: ps-content-delivery-network-cdn-2
    title: HTTP Caching
    type: standard
    year: 2022
    institution: RFC Editor
    url: https://www.rfc-editor.org/rfc/rfc9111.html
  - id: ps-content-delivery-network-cdn-3
    title: Cache-Control header
    type: documentation
    year: 2026
    institution: MDN Web Docs
    url: https://developer.mozilla.org/docs/Web/HTTP/Reference/Headers/Cache-Control
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
A content delivery network caches and serves web content from distributed edge locations. Reliable public claims should focus on caching, geographic distribution, and HTTP cache directives.

## Core Explanation
CDNs reduce origin load and can improve latency by serving cached assets from infrastructure closer to users. HTTP caching rules, including Cache-Control directives, determine when stored responses can be reused or must be revalidated.

## Related Articles

- [HTTP](../http.md)
- [Amazon Web Services (AWS)](../amazon-web-services-aws.md)
- [Web Performance Optimization](../web-performance-optimization.md)
