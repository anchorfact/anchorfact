---
id: "kb-2026-00109"
title: "Navigator API"
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
  - title: "HTML Standard — Navigator"
    type: "standard"
    year: 2026
    url: "https://html.spec.whatwg.org/multipage/system-state.html#the-navigator-object"
    institution: "WHATWG"

completeness: 0.82
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

The Navigator API (`window.navigator` / `navigator`) provides information about the browser and device. Key properties include `userAgent`, `language`, `onLine`, `platform`, `hardwareConcurrency`, and access to various sub-APIs (`geolocation`, `clipboard`, `mediaDevices`).

## Core Explanation

`navigator.userAgent` (becoming less reliable due to freezing), `navigator.language` (user's preferred language), `navigator.onLine` (connectivity status), `navigator.hardwareConcurrency` (logical CPU cores), `navigator.cookieEnabled`, `navigator.platform`. Sub-APIs: `navigator.geolocation`, `navigator.clipboard`, `navigator.mediaDevices`, `navigator.serviceWorker`.

## Further Reading

- [HTML Standard — Navigator](https://html.spec.whatwg.org/multipage/system-state.html#the-navigator-object)
