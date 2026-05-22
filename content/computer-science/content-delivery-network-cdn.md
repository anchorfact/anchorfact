---
id:"kb-2026-00186"
title:"Content Delivery Network (CDN)"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"undefined"
    type:"undefined"
    url:"undefined"
    institution:"Cloudflare"
secondary_sources:
  - title: "DNS and BIND (5th Ed)"
    authors: ["Liu", "Albitz"]
    type: "book"
    year: 2006
    url: "https://www.oreilly.com/library/view/dns-and-bind/0596100574/"
    institution: "O'Reilly"
  - title: "RESTful Web APIs"
    authors: ["Richardson", "Amundsen"]
    type: "book"
    year: 2013
    url: "https://www.oreilly.com/library/view/restful-web-apis/9781449359713/"
    institution: "O'Reilly"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

A CDN is a geographically distributed network of edge servers that cache and serve content from locations closest to users, reducing latency and origin server load. Major CDNs: Cloudflare, Akamai, Fastly, Amazon CloudFront. CDNs handle ~75% of all web traffic.

## Core Explanation

CDN features: DDoS protection, SSL/TLS termination, WAF, image optimization, edge computing (Cloudflare Workers, AWS Lambda@Edge). Cache strategies: push (upload content) vs. pull (cache on first request). Anycast routing directs users to the nearest PoP. CDN edge locations: Cloudflare 330+ cities, CloudFront 600+ PoPs.

## Further Reading

- [undefined](undefined)
