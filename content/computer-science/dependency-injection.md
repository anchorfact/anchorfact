---
id:"kb-2026-00149"
title:"Dependency Injection"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
ai_models:["claude-opus"]
derived_from_human_seed:true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
primary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
---

## TL;DR

Dependency Injection (DI) is a technique where objects receive their dependencies from outside rather than creating them internally. It enables loose coupling, testability (mock dependencies), and centralized configuration.

## Core Explanation

Types: constructor injection (preferred — immutable dependencies), setter injection (optional dependencies), interface injection. DI containers: Spring (Java), Angular, NestJS. Inversion of Control (IoC): the framework calls your code, not vice versa. DI is an implementation of IoC.

## Further Reading

- [Inversion of Control Containers and the Dependency Injection pattern (Martin Fowler)](undefined)
