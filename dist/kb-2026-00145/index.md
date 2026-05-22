---
id:"kb-2026-00145"
title:"Decorator Pattern"
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
secondary_sources:
  - title: "Fluent Python (2nd Ed)"
    authors: ["Ramalho"]
    type: "book"
    year: 2021
    url: "https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/"
    institution: "O'Reilly"
  - title: "React Documentation"
    type: "documentation"
    year: 2026
    url: "https://react.dev/reference/react"
    institution: "Meta"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Attaches additional responsibilities dynamically, providing flexible alternative to subclassing. Decorators conform to the same interface, enabling transparent stacking.

## Core Explanation

Example: `new CompressedStream(new EncryptedStream(new FileStream()))`. Python @decorator syntax. ES7 decorators (Stage 3). React HOC (Higher-Order Components) is a decorator pattern applied to components. Middleware pattern (Express, Koa) is a variant.

## Further Reading

- [Design Patterns (Gang of Four)](undefined)
