---
id: "kb-2026-00098"



title: "ResizeObserver"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
confidence_rationale: "Based on authoritative sources and industry standards"



last_verified: "2026-05-22"
generation_method: "human_only"



derived_from_human_seed: true
primary_sources:
  - title: "Resize Observer (W3C)"
    type: "standard"



    year: 2023
    url: "https://www.w3.org/TR/resize-observer-1/"


    institution: "W3C"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"



    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"


    institution: "Mozilla"
known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"
disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

completeness: 0.88
ai_citations:
---

## TL;DR

ResizeObserver reports changes to the dimensions of DOM elements (content-box or border-box), replacing polling-based resize detection and `window.resize`-only approaches. It is essential for responsive components and container queries.

## Core Explanation

`new ResizeObserver(entries => { /* entries[0].contentRect */ })`. Different from `element.onresize` which only works on `window`. Observes actual element size changes including those caused by CSS, layout, or content changes. Runs after layout but before paint. Delivery is batched — multiple changes in the same frame are reported together.

## Further Reading

- [Resize Observer (W3C)](https://www.w3.org/TR/resize-observer-1/)
