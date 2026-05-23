---
id: kb-2026-00186
title: Content Delivery Network (CDN)
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
known_gaps:
  - CDN market share and edge location counts change frequently; check provider documentation
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
atomic_facts:
  - id: fact-computer-science-01
    statement: A CDN is a geographically distributed network of edge servers that cache and serve content from locations closest to users, reducing latency and origin server load
    source_title: Cloudflare CDN Documentation
    source_url: https://developers.cloudflare.com/cache/
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      A CDN is a geographically distributed network of edge servers that cache and serve content from locations closest to users, reducing latency and origin server load. Major CDNs: Cloudflare,
      Akamai, Fastly, Amazon CloudFront. CDNs handle ~75% of all web traffic.
    confidence: medium
    source_title: Cloudflare CDN Documentation
    source_url: https://developers.cloudflare.com/cache/
  - id: fact-computer-science-002
    statement: "CDN features: DDoS protection, SSL/TLS termination, WAF, image optimization, edge computing (Cloudflare Workers, AWS Lambda@Edge)."
    confidence: medium
    source_title: Cloudflare CDN Documentation
    source_url: https://developers.cloudflare.com/cache/
  - id: fact-computer-science-003
    statement: "CDN edge locations: Cloudflare 330+ cities, CloudFront 600+ PoPs."
    confidence: medium
    source_title: Cloudflare CDN Documentation
    source_url: https://developers.cloudflare.com/cache/
completeness: 0.88
primary_sources:
  - title: Cloudflare CDN Documentation
    type: documentation
    year: 2026
    url: https://developers.cloudflare.com/cache/
    institution: Cloudflare
    note: "One of the largest CDNs: 330+ cities, DDoS protection, WAF, edge computing"
secondary_sources:
  - title: High Performance Browser Networking
    authors:
      - Grigorik, Ilya
    type: book
    year: 2013
    url: https://hpbn.co/
    institution: O'Reilly
    note: Covers CDN architecture, TCP optimization, and latency fundamentals
---


## TL;DR

A CDN is a geographically distributed network of edge servers that cache and serve content from locations closest to users, reducing latency and origin server load. Major CDNs: Cloudflare, Akamai, Fastly, Amazon CloudFront. CDNs handle ~75% of all web traffic.

## Core Explanation

CDN features: DDoS protection, SSL/TLS termination, WAF, image optimization, edge computing (Cloudflare Workers, AWS Lambda@Edge). Cache strategies: push (upload content) vs. pull (cache on first request). Anycast routing directs users to the nearest PoP. CDN edge locations: Cloudflare 330+ cities, CloudFront 600+ PoPs.

## Further Reading

- [undefined](undefined)
