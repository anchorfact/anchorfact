---
id: "kb-2026-00159"



title: "API Gateway"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
last_verified: "2026-05-22"



generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Kong Gateway Documentation"
    type: "documentation"



    year: 2026
    url: "https://docs.konghq.com/"


    institution: "Kong Inc."
    note: "Leading open-source API gateway: routing, authentication, rate limiting, plugins"



secondary_sources:
  - title: "RESTful Web APIs"
    authors: ["Richardson, Leonard", "Amundsen, Mike"]
    type: "book"



    year: 2013
    url: "https://www.oreilly.com/library/view/restful-web-apis/9781449359713/"


    institution: "O'Reilly"
    note: "API design patterns complementary to gateway architecture"



completeness: 0.88
known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

ai_citations:
---

## TL;DR

An API Gateway is a single entry point for all client requests to a microservices architecture. It handles cross-cutting concerns: authentication, rate limiting, request routing, protocol translation, caching, logging, and API composition.

## Core Explanation

Popular gateways: Kong (Lua/OpenResty), AWS API Gateway, Azure API Management, Apigee, Envoy (Lyft, graduated CNCF). BFF (Backend for Frontend) pattern: dedicated gateway per client type. API Gateway vs. Service Mesh: gateway handles north-south traffic (client→server); service mesh handles east-west (service→service).

## Further Reading

- [Kong Gateway Documentation](https://docs.konghq.com/)
