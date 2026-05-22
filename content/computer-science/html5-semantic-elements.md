---
id:"kb-2026-00168"
title:"HTML5 Semantic Elements"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"HTML Living Standard"
    type:"standard"
    year:2026
    url:"https://html.spec.whatwg.org/"
    institution:"WHATWG"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

HTML5 (2014) introduced semantic elements that describe their meaning to both browser and developer: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<figure>`, `<time>`. They improve accessibility (screen readers), SEO, and code readability.

## Core Explanation

`<main>` should be used once per page (dominant content). `<article>` for self-contained, independently distributable content. `<section>` for thematic grouping with a heading. `<aside>` for tangentially related content. Semantic HTML provides implicit ARIA roles — `<nav>` = role='navigation', `<main>` = role='main'. Always prefer semantic elements over `<div>`.

## Further Reading

- [HTML Living Standard](https://html.spec.whatwg.org/)
