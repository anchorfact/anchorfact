---
id: "kb-2026-00171"


title: "Progressive Web Apps (PWA)"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Progressive Web Apps (MDN)"
    type: "documentation"


    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps"

    institution: "Mozilla"
    note: "PWA fundamentals: service workers, Web App Manifest, offline-first, push notifications"


secondary_sources:
  - title: "Service Workers Specification (W3C)"
    type: "standard"


    year: 2024
    url: "https://w3c.github.io/ServiceWorker/"

    institution: "W3C"
    note: "The core PWA technology — service workers enable offline capabilities and background sync"


atomic_facts:
  - id: fact-computer-science-01
    statement: >-
      PWAs are web applications that use modern APIs to deliver app-like experiences: installable , offline-capable , push
      notifications, and background sync
    source_title: Progressive Web Apps (MDN)
    source_url: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
    confidence: medium
  - id: fact-computer-science-02
    statement: "Requirements: HTTPS, Web App Manifest , registered Service Worker with fetch handler"

    source_title: Progressive Web Apps (MDN)
    source_url: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
    confidence: medium
  
completeness: 0.88
known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
ai_citations:
---

## TL;DR

PWAs are web applications that use modern APIs to deliver app-like experiences: installable (manifest.json), offline-capable (Service Workers), push notifications, and background sync. PWAs work across platforms from a single codebase.

## Core Explanation

Requirements: HTTPS, Web App Manifest (name, icons, start_url, display: standalone), registered Service Worker with fetch handler. App shell architecture: cache shell (UI), fetch content dynamically. Workbox (Google) simplifies Service Worker management. PWAs can be distributed via app stores (Trusted Web Activity on Android).

## Further Reading

- [Progressive Web Apps (MDN)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
