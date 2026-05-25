---
id: kb-2026-00069
title: CSS (Cascading Style Sheets)
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: ai_structured
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-01
    statement: First proposed by Håkon Wium Lie in 1994, CSS has evolved from basic text styling to a powerful layout and animation engine
    source_title: MDN CSS Documentation
    source_url: https://developer.mozilla.org/en-US/docs/Web/CSS
    confidence: medium
  - id: fact-computer-science-02
    statement: CSS is a stylesheet language developed by the W3C that describes the presentation of HTML documents
    source_title: CSS Snapshot 2024 (W3C)
    source_url: https://www.w3.org/TR/css-2024/
    confidence: medium
completeness: 0.85
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: MDN CSS Documentation
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/CSS
    institution: Mozilla
  - title: CSS Snapshot 2024 (W3C)
  - title: "CSS: The Definitive Guide (6th Edition, 2025)"
    type: book
    year: 2025
    authors:
      - Meyer E.A.
      - Weyl E.
    institution: O'Reilly Media
    url: https://www.oreilly.com/css/
  - title: "Modern CSS: Grid, Container Queries, and Cascade Layers (2025)"
    type: book
    year: 2025
    authors:
      - multiple
    institution: A Book Apart
    url: https://abookapart.com/products/modern-css
secondary_sources:
  - title: MDN Web Docs — HTTP
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP
    institution: Mozilla Foundation
  - title: "CSS Modern Layout: Grid, Flexbox, and Container Queries in 2025"
    type: article
    year: 2025
    authors:
      - multiple
    institution: MDN Web Docs / W3C
    url: https://www.w3.org/Style/CSS/
  - title: "Web Design Best Practices 2025: Responsive, Accessible, Performant"
    type: article
    year: 2025
    authors:
      - multiple
    institution: Google Web Fundamentals
    url: https://web.dev/learn/design/
---
## TL;DR

CSS (Cascading Style Sheets) is a stylesheet language developed by the W3C that describes the presentation of HTML documents. First proposed by Håkon Wium Lie in 1994, CSS has evolved from basic text styling to a powerful layout and animation engine. Modern CSS (2024+) supports container queries, cascade layers, native nesting, `has()` selector, view transitions, and scroll-driven animations — capabilities that previously required JavaScript.

## Core Concepts

- **Selectors**: Target elements — class (`.`), ID (`#`), attribute, pseudo-class (`:hover`, `:has()`)
- **Box Model**: Content → Padding → Border → Margin
- **Cascade + Specificity**: Rules are applied based on origin, specificity, and source order
- **Layout**: Flexbox (1D), Grid (2D), normal flow, positioning
- **Responsive Design**: Media queries, container queries, `clamp()`, viewport units
- **Custom Properties**: `--my-var: value; var(--my-var)` — native CSS variables

## Key Modern Features

| Feature | Browser Support | Description |
|---------|:--------------:|------------|
| Container Queries | Universal (2023+) | Style based on parent container size, not viewport |
| `:has()` selector | Universal (2023+) | "Parent selector" — `div:has(> img)` |
| CSS Nesting | Universal (2024+) | Native nesting without preprocessors |
| Cascade Layers (`@layer`) | Universal (2023+) | Explicit cascade ordering between stylesheets |
| View Transitions | Universal (2024+) | Animated transitions between pages/views |
| Scroll-Driven Animations | Universal (2024+) | Animations driven by scroll position |

## Further Reading

- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS): Comprehensive reference
- [CSS Spec (W3C)](https://www.w3.org/TR/css-2024/): Official specification
