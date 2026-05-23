---
id: kb-2026-00167
title: CSS Grid
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
primary_sources:
  - title: CSS Grid Layout Module Level 2 (W3C Candidate Recommendation)
    type: standard
    year: 2024
    url: https://www.w3.org/TR/css-grid-2/
    institution: W3C
    note: "CSS Grid specification: grid-template, grid-auto-flow, subgrid, named grid lines, gap property"
secondary_sources:
  - title: MDN Web Docs — CSS Grid Layout
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout
    institution: Mozilla
    note: Practical developer guide with interactive examples, common patterns (Holy Grail layout, etc.)
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
completeness: 0.88
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
ai_citations: null
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      CSS Grid provides two-dimensional layout (rows AND columns). `display: grid` enables grid context. `grid-template-columns/rows` define tracks. `fr` unit distributes remaining space. Grid excels
      at page-level layouts, dashboards, and any design needing both row and column control.
    confidence: medium
    source_title: CSS Grid Layout Module Level 2 (W3C Candidate Recommendation)
    source_url: https://www.w3.org/TR/css-grid-2/
  - id: fact-computer-science-002
    statement: "`auto-fill/auto-fit` with `minmax()` creates responsive grids without media queries."
    confidence: medium
    source_title: CSS Grid Layout Module Level 2 (W3C Candidate Recommendation)
    source_url: https://www.w3.org/TR/css-grid-2/
  - id: fact-computer-science-003
    statement: Subgrid (Level 2) enables nested grids to align with parent grid tracks.
    confidence: medium
    source_title: CSS Grid Layout Module Level 2 (W3C Candidate Recommendation)
    source_url: https://www.w3.org/TR/css-grid-2/
---



## TL;DR

CSS Grid provides two-dimensional layout (rows AND columns). `display: grid` enables grid context. `grid-template-columns/rows` define tracks. `fr` unit distributes remaining space. Grid excels at page-level layouts, dashboards, and any design needing both row and column control.

## Core Explanation

`grid-template-areas` enables named visual areas: `header header; sidebar main; footer footer`. `grid-column/grid-row` span items across tracks. `auto-fill/auto-fit` with `minmax()` creates responsive grids without media queries. Subgrid (Level 2) enables nested grids to align with parent grid tracks. Flexbox vs. Grid: Flexbox for components, Grid for page layout.

## Further Reading

- [CSS Grid Layout Module Level 2 (W3C)](https://www.w3.org/TR/css-grid-2/)
