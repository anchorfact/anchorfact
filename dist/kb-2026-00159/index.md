---
id:"kb-2026-00159"
title:"API Gateway"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Kong Gateway Documentation"
    type:"documentation"
    year:2026
    url:"https://docs.konghq.com/"
    institution:"Kong Inc."
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
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

An API Gateway is a single entry point for all client requests to a microservices architecture. It handles cross-cutting concerns: authentication, rate limiting, request routing, protocol translation, caching, logging, and API composition.

## Core Explanation

Popular gateways: Kong (Lua/OpenResty), AWS API Gateway, Azure API Management, Apigee, Envoy (Lyft, graduated CNCF). BFF (Backend for Frontend) pattern: dedicated gateway per client type. API Gateway vs. Service Mesh: gateway handles north-south traffic (client→server); service mesh handles east-west (service→service).

## Further Reading

- [Kong Gateway Documentation](https://docs.konghq.com/)
