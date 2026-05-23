---
id:"kb-2026-00156"
title:"Load Balancing"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "NGINX Documentation"
    type: "documentation"
    year: 2026
    url: "https://nginx.org/en/docs/"
    institution: "NGINX Inc."
    note: "Reverse proxy and load balancer: round-robin, least-connections, IP hash, health checks, TLS termination"
secondary_sources:
  - title: "Designing Data-Intensive Applications"
    authors: ["Kleppmann, Martin"]
    type: "book"
    year: 2017
    url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/"
    institution: "O'Reilly"
    note: "Chapter on replication and partitioning — covers load distribution strategies in distributed systems"
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
