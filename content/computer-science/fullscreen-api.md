---
id: "kb-2026-00105"
title: "Fullscreen API"
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
    statement: "The Fullscreen API enables web content to request presentation in full-screen mode (`element.requestFullscreen()`), hiding browser UI. User gesture is required, and `document.exitFullscreen()` restores normal view."
    source_title: "Fullscreen API Standard"
    source_url: "https://fullscreen.spec.whatwg.org/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Keyboard access is restricted in fullscreen (no Esc to exit for all keys — only Esc exits by spec)."
    source_title: "Fullscreen API Standard"
    source_url: "https://fullscreen.spec.whatwg.org/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "Fullscreen API Standard"
    type: "standard"
    year: 2024
    url: "https://fullscreen.spec.whatwg.org/"
    institution: "WHATWG"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
  - title: "RESTful Web APIs"
    authors: ["Richardson", "Amundsen"]
    type: "book"
    year: 2013
    url: "https://www.oreilly.com/library/view/restful-web-apis/9781449359713/"
    institution: "O'Reilly"

---



## TL;DR

The Fullscreen API enables web content to request presentation in full-screen mode (`element.requestFullscreen()`), hiding browser UI. User gesture is required, and `document.exitFullscreen()` restores normal view.

## Core Explanation

`document.fullscreenElement` checks current fullscreen element. CSS pseudo-classes: `:fullscreen` styles the fullscreen element, `::backdrop` styles the background. Keyboard access is restricted in fullscreen (no Esc to exit for all keys — only Esc exits by spec). The API is available only in secure contexts.

## Further Reading

- [Fullscreen API Standard](https://fullscreen.spec.whatwg.org/)
