---
id:"kb-2026-00156"
title:"Load Balancing"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"NGINX Documentation"
    type:"documentation"
    year:2026
    url:"https://nginx.org/en/docs/"
    institution:"NGINX Inc."
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

A load balancer distributes incoming traffic across multiple backend servers, improving scalability, reliability (failover), and performance. Types: Layer 4 (TCP, fast, no content inspection), Layer 7 (HTTP, content-based routing, SSL termination).

## Core Explanation

Algorithms: round-robin, least connections, IP hash (session persistence), weighted (unequal server capacity). Health checks probe backend availability. NGINX and HAProxy are the most popular software load balancers. Cloud-native: AWS ALB/NLB, GCP Cloud Load Balancing. Global server load balancing (GSLB) routes traffic across regions via DNS.

## Further Reading

- [NGINX Documentation](https://nginx.org/en/docs/)
