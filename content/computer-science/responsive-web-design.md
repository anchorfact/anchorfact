---
id: kb-2026-00172
title: Responsive Web Design
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
primary_sources:
  - title: Responsive Web Design
    authors:
      - Marcotte, Ethan
    type: article
    year: 2010
    url: https://alistapart.com/article/responsive-web-design/
    institution: A List Apart
    note: "The article that coined RWD: fluid grids, flexible images, media queries"
secondary_sources:
  - title: MDN Web Docs — Responsive Design
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design
    institution: Mozilla
    note: "Modern responsive design: mobile-first, viewport, CSS Grid/Flexbox for responsive layouts"
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
atomic_facts:
  - id: fact-computer-science-01
    statement: Responsive Web Design creates websites that adapt to any screen size using fluid grids, flexible images, and CSS media queries
    source_title: Responsive Web Design
    source_url: https://alistapart.com/article/responsive-web-design/
    confidence: medium
  - id: fact-computer-science-02
    statement: "Mobile-first: design for smallest screen first, progressively enhance for larger"
    source_title: Responsive Web Design
    source_url: https://alistapart.com/article/responsive-web-design/
    confidence: medium
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
---


## TL;DR

Responsive Web Design (RWD) creates websites that adapt to any screen size using fluid grids, flexible images, and CSS media queries. Coined by Ethan Marcotte (2010), RWD is now the standard approach for web development.

## Core Explanation

Mobile-first: design for smallest screen first, progressively enhance for larger. Media queries: `@media (min-width: 768px)`. Container queries (2023+): style based on parent container size, not viewport. Fluid typography: `clamp(1rem, 2vw, 2rem)`. Viewport meta tag: `<meta name='viewport' content='width=device-width,initial-scale=1'>`.

## Further Reading

- [Responsive Web Design (Ethan Marcotte)](https://alistapart.com/article/responsive-web-design/)
