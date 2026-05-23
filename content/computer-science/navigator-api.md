---
id: "kb-2026-00109"


title: "Navigator API"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
confidence_rationale: "Based on authoritative sources and industry standards"


last_verified: "2026-05-22"
generation_method: "human_only"


derived_from_human_seed: true
primary_sources:
  - title: "HTML Standard — Navigator"
    type: "standard"


    year: 2026
    url: "https://html.spec.whatwg.org/multipage/system-state.html#the-navigator-object"

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
---

## TL;DR

The Navigator API (`window.navigator` / `navigator`) provides information about the browser and device. Key properties include `userAgent`, `language`, `onLine`, `platform`, `hardwareConcurrency`, and access to various sub-APIs (`geolocation`, `clipboard`, `mediaDevices`).

## Core Explanation

`navigator.userAgent` (becoming less reliable due to freezing), `navigator.language` (user's preferred language), `navigator.onLine` (connectivity status), `navigator.hardwareConcurrency` (logical CPU cores), `navigator.cookieEnabled`, `navigator.platform`. Sub-APIs: `navigator.geolocation`, `navigator.clipboard`, `navigator.mediaDevices`, `navigator.serviceWorker`.

## Further Reading

- [HTML Standard — Navigator](https://html.spec.whatwg.org/multipage/system-state.html#the-navigator-object)
