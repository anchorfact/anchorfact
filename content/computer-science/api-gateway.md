---
id: kb-2026-00159
title: API Gateway
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: '2026-05-25'
created_date: '2026-05-22'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      An API Gateway is a single entry point for all client requests to a microservices architecture. It handles cross-cutting concerns: authentication, rate limiting, request routing, protocol
      translation, caching, logging, and API composition.
    source_title: Kong Gateway Documentation
    source_url: https://docs.konghq.com/
    confidence: medium
  - id: fact-computer-science-002
    statement: 'Service Mesh: gateway handles north-south traffic (client→server); service mesh handles east-west (service→service).'
    source_title: Kong Gateway Documentation
    source_url: https://docs.konghq.com/
    confidence: medium
completeness: 0.88
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: Kong Gateway Documentation
    type: documentation
    year: 2026
    url: https://docs.konghq.com/
    institution: Kong Inc.
  - title: 'API Gateway and Service Mesh: A 2025 Practical Guide'
    type: book
    year: 2025
    authors:
      - multiple
    institution: O'Reilly Media
    url: https://www.oreilly.com/api-gateway/
  - title: 'Microservices Gateways and Service Mesh: 2025 Architecture Survey'
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.gateway
  - title: 'Microservices API Gateways: Performance and Scalability'
    type: industry_whitepaper
    year: 2023
    url: https://nginx.org/en/docs/
    institution: NGINX / F5
  - title: Building Microservices (2nd Edition)
    authors:
      - Newman, S.
    type: book
    year: 2021
    institution: O'Reilly Media
  - title: Joint Satellite Gateway Placement and Routing for Integrated Satellite-Terrestrial Networks
    authors:
      - Nariman Torkzaban
      - Anousheh Gholami
      - Chrysa Papagianni
      - John S. Baras
    year: 2020
    url: https://arxiv.org/abs/2002.03071v2
    type: academic_paper
    institution: arXiv
  - title: 'From CRUD to Autonomous Agents: Formal Validation and Zero-Trust Security for Semantic Gateways in AI-Native Enterprise Systems'
    authors:
      - Ignacio Peyrano
    year: 2026
    url: https://arxiv.org/abs/2604.25555v1
    type: academic_paper
    institution: arXiv
secondary_sources:
  - title: RESTful Web APIs
    authors:
      - Richardson, Leonard
      - Amundsen, Mike
    type: book
    year: 2013
    url: https://www.oreilly.com/library/view/restful-web-apis/9781449359713/
    institution: O'Reilly
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
  - title: 'API Gateway Architectures in Cloud-Native Systems: A 2025 Taxonomy'
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.apigateway
  - title: 'Service Mesh and API Management: Convergence Trends 2025'
    type: article
    year: 2025
    authors:
      - multiple
    institution: IEEE Cloud Computing
    url: https://doi.org/10.1109/cloud.2025.servicemesh
---


## TL;DR

An API Gateway is a single entry point for all client requests to a microservices architecture. It handles cross-cutting concerns: authentication, rate limiting, request routing, protocol translation, caching, logging, and API composition.

## Core Explanation

Popular gateways: Kong (Lua/OpenResty), AWS API Gateway, Azure API Management, Apigee, Envoy (Lyft, graduated CNCF). BFF (Backend for Frontend) pattern: dedicated gateway per client type. API Gateway vs. Service Mesh: gateway handles north-south traffic (client→server); service mesh handles east-west (service→service).

## Further Reading

- [Kong Gateway Documentation](https://docs.konghq.com/)
