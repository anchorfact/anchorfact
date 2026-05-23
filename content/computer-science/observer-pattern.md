---
id: "kb-2026-00143"


title: "Observer Pattern"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

completeness: 0.88
ai_citations:

primary_sources:
  - title: "ACM Digital Library"
    type: "repository"


    year: 2026
    url: "https://dl.acm.org/"

    institution: "ACM"
secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"


    year: 2026
    url: "https://dl.acm.org/"

    institution: "ACM"
---

## TL;DR

One-to-many dependency — when subject changes, all observers are notified. Foundation of event-driven programming, MVC, React state updates, Redux.

## Core Explanation

Subject maintains observer list and notify(). Push (pass data) vs. pull (observers query). JavaScript: EventEmitter pattern, addEventListener. React: setState triggers re-render (observer pattern with virtual DOM diffing). RxJS: Observable streams with operators (map, filter, debounce).

## Further Reading

- [Design Patterns (Gang of Four)](undefined)
