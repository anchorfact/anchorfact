---
id:"kb-2026-00171"
title:"Progressive Web Apps (PWA)"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Progressive Web Apps (MDN)"
    type:"documentation"
    year:2025
    url:"https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps"
    institution:"Mozilla"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

PWAs are web applications that use modern APIs to deliver app-like experiences: installable (manifest.json), offline-capable (Service Workers), push notifications, and background sync. PWAs work across platforms from a single codebase.

## Core Explanation

Requirements: HTTPS, Web App Manifest (name, icons, start_url, display: standalone), registered Service Worker with fetch handler. App shell architecture: cache shell (UI), fetch content dynamically. Workbox (Google) simplifies Service Worker management. PWAs can be distributed via app stores (Trusted Web Activity on Android).

## Further Reading

- [Progressive Web Apps (MDN)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
