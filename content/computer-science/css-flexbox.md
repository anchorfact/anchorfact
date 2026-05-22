---
id:"kb-2026-00166"
title:"CSS Flexbox"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"CSS Flexible Box Layout Module Level 1 (W3C)"
    type:"standard"
    year:2018
    url:"https://www.w3.org/TR/css-flexbox-1/"
    institution:"W3C"
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

Flexbox provides one-dimensional layout (row or column), distributing space and aligning items within a container. `display: flex` on parent enables flex context. Key properties: `justify-content` (main axis alignment), `align-items` (cross axis), `flex-grow/shrink/basis` (item sizing).

## Core Explanation

Flex container properties: `flex-direction` (row|column), `flex-wrap` (wrap|nowrap), `gap`. Flex item: `flex: grow shrink basis` shorthand. `align-self` overrides cross-axis alignment per item. `order` changes visual order without HTML changes. Flexbox is ideal for navigation bars, card layouts, centering, and distributing space in one dimension.

## Further Reading

- [CSS Flexible Box Layout Module Level 1 (W3C)](https://www.w3.org/TR/css-flexbox-1/)
