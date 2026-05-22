---
id:"kb-2026-00143"
title:"Observer Pattern"
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

One-to-many dependency — when subject changes, all observers are notified. Foundation of event-driven programming, MVC, React state updates, Redux.

## Core Explanation

Subject maintains observer list and notify(). Push (pass data) vs. pull (observers query). JavaScript: EventEmitter pattern, addEventListener. React: setState triggers re-render (observer pattern with virtual DOM diffing). RxJS: Observable streams with operators (map, filter, debounce).

## Further Reading

- [Design Patterns (Gang of Four)](undefined)
