---
id: "kb-2026-00100"
title: "History API"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
confidence_rationale: "Based on authoritative sources and industry standards"
last_verified: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
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
known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"
completeness: 0.88
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

The History API (`window.history`) enables single-page applications to manipulate the browser session history — adding entries, replacing states, and navigating without full page reloads. It is the foundation of client-side routing in SPAs.

## Core Explanation

`history.pushState(state, title, url)` adds a new entry. `history.replaceState()` modifies the current entry without creating a new one. `popstate` event fires on back/forward navigation. State objects are serialized (structured clone) — up to ~640KB in practice. The URL must be same-origin. Browser history entries are not directly readable — only via `history.length` and `history.state`.

## Further Reading

- [HTML Standard — Session History and Navigation](https://html.spec.whatwg.org/multipage/history.html)
