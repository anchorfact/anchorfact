---
id: kb-2026-00149
title: Dependency Injection
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
ai_models:
  - claude-opus
derived_from_human_seed: true
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
completeness: 0.88
ai_citations: null
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
secondary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      Dependency Injection (DI) is a technique where objects receive their dependencies from outside rather than creating them internally. It enables loose coupling, testability (mock dependencies),
      and centralized configuration.
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
  - id: fact-computer-science-001
    statement: >-
      Dependency Injection (DI) is a technique where objects receive their dependencies from outside rather than creating them internally. It enables loose coupling, testability (mock dependencies),
      and centralized configuration.
    confidence: medium
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
---



## TL;DR

Dependency Injection (DI) is a technique where objects receive their dependencies from outside rather than creating them internally. It enables loose coupling, testability (mock dependencies), and centralized configuration.

## Core Explanation

Types: constructor injection (preferred — immutable dependencies), setter injection (optional dependencies), interface injection. DI containers: Spring (Java), Angular, NestJS. Inversion of Control (IoC): the framework calls your code, not vice versa. DI is an implementation of IoC.

## Further Reading

- [Inversion of Control Containers and the Dependency Injection pattern (Martin Fowler)](undefined)
