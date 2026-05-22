---
id:"kb-2026-00234"
title:"Refactoring"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Refactoring (2nd Ed, Martin Fowler)"
    type:"undefined"
    url:"undefined"
    institution:"Addison-Wesley"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Refactoring (Martin Fowler, 1999) improves code structure without changing external behavior. It's a disciplined technique for cleaning up code, reducing technical debt, and making future changes easier. Refactoring is NOT rewriting — it's a series of small, safe transformations with tests as safety net.

## Core Explanation

Common refactorings: Extract Method (break large function), Rename Variable, Move Method, Replace Conditional with Polymorphism, Introduce Parameter Object. Code smells (indicators): Long Method, Large Class, Duplicate Code, Feature Envy, Primitive Obsession. Refactoring with tests: run tests before and after each small change. IDE refactoring tools: IntelliJ, VS Code, ReSharper.

## Further Reading

- [Refactoring (2nd Ed, Martin Fowler)](undefined)
