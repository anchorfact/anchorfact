---
id: "kb-2026-00100"
title: "History API"
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
    statement: "The History API (`window.history`) enables single-page applications to manipulate the browser session history — adding entries, replacing states, and navigating without full page reloads. It is the foundation of client-side routing in SPAs."
    source_title: "HTML Standard — Session History and Navigation"
    source_url: "https://html.spec.whatwg.org/multipage/history.html"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "State objects are serialized (structured clone) — up to ~640KB in practice."
    source_title: "HTML Standard — Session History and Navigation"
    source_url: "https://html.spec.whatwg.org/multipage/history.html"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "HTML Standard — Session History and Navigation"
    type: "standard"
    year: 2026
    url: "https://html.spec.whatwg.org/multipage/history.html"
    institution: "WHATWG"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
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

The History API (`window.history`) enables single-page applications to manipulate the browser session history — adding entries, replacing states, and navigating without full page reloads. It is the foundation of client-side routing in SPAs.

## Core Explanation

`history.pushState(state, title, url)` adds a new entry. `history.replaceState()` modifies the current entry without creating a new one. `popstate` event fires on back/forward navigation. State objects are serialized (structured clone) — up to ~640KB in practice. The URL must be same-origin. Browser history entries are not directly readable — only via `history.length` and `history.state`.

## Further Reading

- [HTML Standard — Session History and Navigation](https://html.spec.whatwg.org/multipage/history.html)

## Related Articles

- [Animation History](../../arts/animation-history.md)
- [Architecture History](../../arts/architecture-history.md)
- [Digital Art and New Media Art History](../../arts/digital-art-history.md)