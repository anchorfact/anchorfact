---
id:"kb-2026-00168"
title:"HTML5 Semantic Elements"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "HTML Living Standard"
    type: "standard"
    year: 2026
    url: "https://html.spec.whatwg.org/"
    institution: "WHATWG"
    note: "Living standard: section, article, nav, header, footer, main, aside, figure elements"
secondary_sources:
  - title: "MDN Web Docs — HTML elements reference"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element"
    institution: "Mozilla"
    note: "Comprehensive HTML element reference with browser compatibility and accessibility notes"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

HTML5 (2014) introduced semantic elements that describe their meaning to both browser and developer: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<figure>`, `<time>`. They improve accessibility (screen readers), SEO, and code readability.

## Core Explanation

`<main>` should be used once per page (dominant content). `<article>` for self-contained, independently distributable content. `<section>` for thematic grouping with a heading. `<aside>` for tangentially related content. Semantic HTML provides implicit ARIA roles — `<nav>` = role='navigation', `<main>` = role='main'. Always prefer semantic elements over `<div>`.

## Further Reading

- [HTML Living Standard](https://html.spec.whatwg.org/)
