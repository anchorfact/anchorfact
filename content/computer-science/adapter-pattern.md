---
id: "kb-2026-00146"


title: "Adapter Pattern"
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

Converts interface of a class into another interface clients expect. Lets incompatible interfaces work together. Object adapter (composition) preferred over class adapter (inheritance).

## Core Explanation

Example: wrapping a third-party logging library behind your application's Logger interface, enabling easy replacement. Adapter vs. Facade: Adapter changes interface; Facade simplifies a complex subsystem with a new unified interface. Bridge pattern separates abstraction from implementation.

## Further Reading

- [Design Patterns (Gang of Four)](undefined)
