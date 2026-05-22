---
id:"kb-2026-00158"
title:"Nginx"
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
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Nginx is a high-performance web server, reverse proxy, and load balancer created by Igor Sysoev (2004) to solve the C10k problem (10,000 concurrent connections). Its event-driven, asynchronous architecture handles massive concurrency with minimal memory.

## Core Explanation

Serves ~34% of all websites (2025). Key features: reverse proxy with caching, SSL/TLS termination, HTTP/2 and HTTP/3, WebSocket proxying, rate limiting, content compression. Configuration is declarative (nginx.conf). Nginx Unit runs apps in multiple languages. Nginx Plus (commercial) adds health checks, session persistence, and monitoring dashboard.

## Further Reading

- [NGINX Documentation](https://nginx.org/en/docs/)
