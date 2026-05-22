---
id:"kb-2026-00167"
title:"CSS Grid"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"CSS Grid Layout Module Level 2 (W3C)"
    type:"standard"
    year:2024
    url:"https://www.w3.org/TR/css-grid-2/"
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

CSS Grid provides two-dimensional layout (rows AND columns). `display: grid` enables grid context. `grid-template-columns/rows` define tracks. `fr` unit distributes remaining space. Grid excels at page-level layouts, dashboards, and any design needing both row and column control.

## Core Explanation

`grid-template-areas` enables named visual areas: `header header; sidebar main; footer footer`. `grid-column/grid-row` span items across tracks. `auto-fill/auto-fit` with `minmax()` creates responsive grids without media queries. Subgrid (Level 2) enables nested grids to align with parent grid tracks. Flexbox vs. Grid: Flexbox for components, Grid for page layout.

## Further Reading

- [CSS Grid Layout Module Level 2 (W3C)](https://www.w3.org/TR/css-grid-2/)
