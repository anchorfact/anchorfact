---
id:"kb-2026-00141"
title:"Singleton Pattern"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Design Patterns (Gang of Four)"
    type:"undefined"
    url:"undefined"
    institution:"Addison-Wesley"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Ensures a class has only one instance and provides global access. Used for shared resources: database connections, config, logging. Modern criticism: hidden global state, testing difficulty.

## Core Explanation

Implementation: private constructor, static getInstance(). Thread-safe: double-checked locking, static initializer, or enum (Java). In JavaScript: module-level variable (modules are singletons by default). Dependency injection is often preferred over Singleton today.

## Further Reading

- [Design Patterns (Gang of Four)](undefined)
