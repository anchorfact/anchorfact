---
id:"kb-2026-00172"
title:"Responsive Web Design"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Responsive Web Design (Ethan Marcotte)"
    type:"article"
    year:2010
    url:"https://alistapart.com/article/responsive-web-design/"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Responsive Web Design (RWD) creates websites that adapt to any screen size using fluid grids, flexible images, and CSS media queries. Coined by Ethan Marcotte (2010), RWD is now the standard approach for web development.

## Core Explanation

Mobile-first: design for smallest screen first, progressively enhance for larger. Media queries: `@media (min-width: 768px)`. Container queries (2023+): style based on parent container size, not viewport. Fluid typography: `clamp(1rem, 2vw, 2rem)`. Viewport meta tag: `<meta name='viewport' content='width=device-width,initial-scale=1'>`.

## Further Reading

- [Responsive Web Design (Ethan Marcotte)](https://alistapart.com/article/responsive-web-design/)
