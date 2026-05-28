---
id: kb-2026-00156
title: Load Balancing
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
  - id: fact-computer-science-load-balancing-001
    statement: >-
      A load balancer distributes workloads or incoming traffic across multiple compute resources to improve application
      availability and fault tolerance.
    source_title: What is Elastic Load Balancing? - Elastic Load Balancing
    source_url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html
    confidence: medium
  - id: fact-computer-science-load-balancing-002
    statement: >-
      AWS Elastic Load Balancing uses health checks to monitor registered targets and route traffic only to healthy
      targets.
    source_title: What is Elastic Load Balancing? - Elastic Load Balancing
    source_url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html
    confidence: medium
  - id: fact-computer-science-load-balancing-003
    statement: >-
      NGINX Open Source supports load-balancing methods including round robin, least connections, IP hash, and generic
      hash.
    source_title: HTTP Load Balancing | NGINX Documentation
    source_url: https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/
    confidence: medium
completeness: 0.86
known_gaps:
  - This public sample was manually narrowed to source-backed facts on 2026-05-28.
disputed_statements: []
primary_sources:
  - title: What is Elastic Load Balancing? - Elastic Load Balancing
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html
    institution: Amazon Web Services
  - title: HTTP Load Balancing | NGINX Documentation
    type: documentation
    year: 2026
    url: https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/
    institution: NGINX
  - title: What is load balancing? | How load balancers work
    type: documentation
    year: 2026
    url: https://www.cloudflare.com/learning/performance/what-is-load-balancing/
    institution: Cloudflare
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Load balancing distributes traffic or workload across multiple backends to improve availability, performance, and fault tolerance. This repair removes popularity and vendor-ranking claims and cites vendor documentation directly.

## Core Explanation

Load balancers commonly combine backend pools, routing methods, and health checks. The operational goal is not just spreading traffic, but avoiding unhealthy or overloaded targets while preserving a stable entry point for clients.

## Further Reading

- [What is Elastic Load Balancing? - Elastic Load Balancing](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html)
- [HTTP Load Balancing | NGINX Documentation](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/)
- [What is load balancing? | How load balancers work](https://www.cloudflare.com/learning/performance/what-is-load-balancing/)
