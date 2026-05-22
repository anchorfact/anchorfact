---
id: "kb-2026-00106"
title: "Pointer Lock API"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
confidence_rationale: "Based on authoritative sources and industry standards"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "Pointer Lock (W3C Recommendation)"
    type: "standard"
    year: 2019
    url: "https://www.w3.org/TR/pointerlock/"
    institution: "W3C"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.88
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

The Pointer Lock API (`element.requestPointerLock()`) captures mouse movement for games and 3D applications, hiding the cursor and providing raw movement data (`movementX`, `movementY`) without screen-edge boundaries.

## Core Explanation

`document.pointerLockElement` returns the locked element or null. `pointerlockchange` and `pointerlockerror` events fire on state changes. Mouse movement deltas are unbounded — ideal for first-person camera controls. Escape key exits pointer lock. Typically combined with `document.addEventListener('mousemove', handler)`.

## Further Reading

- [Pointer Lock (W3C Recommendation)](https://www.w3.org/TR/pointerlock/)
