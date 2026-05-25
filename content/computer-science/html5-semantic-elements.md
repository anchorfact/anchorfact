---
id: "kb-2026-00168"
title: "HTML5 Semantic Elements"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-001"
    statement: "HTML5 (2014) introduced semantic elements that describe their meaning to both browser and developer: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<figure>`, `<time>`. They improve accessibility (screen readers), SEO, and code readability."
    source_title: "MDN Web Docs — HTML elements reference"
    source_url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "HTML5 (2014) introduced semantic elements that describe their meaning to both browser and developer: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<figure>`, `<time>`. They improve accessibility (screen readers), SEO, and code readability."
    source_title: "MDN Web Docs — HTML elements reference"
    source_url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "HTML Living Standard"
    type: "standard"
    year: 2026
    url: "https://html.spec.whatwg.org/"
    institution: "WHATWG"

secondary_sources:
  - title: "MDN Web Docs — HTML elements reference"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element"
    institution: "Mozilla"
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---





## TL;DR

HTML5 (2014) introduced semantic elements that describe their meaning to both browser and developer: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<figure>`, `<time>`. They improve accessibility (screen readers), SEO, and code readability.

## Core Explanation

`<main>` should be used once per page (dominant content). `<article>` for self-contained, independently distributable content. `<section>` for thematic grouping with a heading. `<aside>` for tangentially related content. Semantic HTML provides implicit ARIA roles — `<nav>` = role='navigation', `<main>` = role='main'. Always prefer semantic elements over `<div>`.

## Further Reading

- [HTML Living Standard](https://html.spec.whatwg.org/)

## Related Articles

- [AI for Search and Recommendation: Semantic Search, Collaborative Filtering, and Personalization Engines](../../ai/ai-search-recommendation.md)
- [Semantic Web and Ontologies: Knowledge Representation, OWL Reasoning, and Linked Data](../../ai/semantic-web-ontology.md)
