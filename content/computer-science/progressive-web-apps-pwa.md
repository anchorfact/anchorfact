---
id: kb-2026-00171
title: Progressive Web Apps (PWA)
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-pwa-1
    statement: >-
      MDN describes progressive web apps as web applications that use modern web APIs and
      progressive enhancement to provide app-like capabilities.
    source_title: Progressive Web Apps
    source_url: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
    confidence: medium
  - id: fact-pwa-2
    statement: >-
      The Service Worker API lets a script act as a proxy between a web application, the browser,
      and the network.
    source_title: Service Worker API
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
    confidence: medium
  - id: fact-pwa-3
    statement: >-
      The Web Application Manifest specification defines metadata that can describe a web
      application to user agents.
    source_title: Web Application Manifest
    source_url: https://www.w3.org/TR/appmanifest/
    confidence: medium
completeness: 0.86
known_gaps:
  - This compact repair keeps only source-mapped public claims from the sampled audit entry.
primary_sources:
  - title: Progressive Web Apps
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
    institution: MDN Web Docs
  - title: Service Worker API
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
    institution: MDN Web Docs
  - title: Web Application Manifest
    type: standard
    year: 2026
    url: https://www.w3.org/TR/appmanifest/
    institution: W3C
secondary_sources: []
disputed_statements: []
updated: "2026-05-28"
---

## TL;DR

Progressive web apps use web-platform capabilities such as service workers and web app manifests to make web applications more app-like.

## Core Explanation

This repair removes unsupported future sources and keeps three direct sources: MDN's PWA overview, MDN's Service Worker API reference, and the W3C Web Application Manifest specification.

## Further Reading

- [Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web Application Manifest](https://www.w3.org/TR/appmanifest/)
