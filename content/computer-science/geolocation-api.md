---
id: kb-2026-00103
title: Geolocation API
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-geolocation-001
    statement: >-
      The W3C Geolocation specification provides access to geographic location information associated with the hosting
      device.
    source_title: Geolocation
    source_url: https://www.w3.org/TR/geolocation/
    confidence: medium
  - id: fact-computer-science-geolocation-002
    statement: >-
      Web content accesses the Geolocation API through the read-only navigator.geolocation property, and browsers
      require a secure context and user permission for location access.
    source_title: "Navigator: geolocation property - Web APIs | MDN"
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation
    confidence: medium
  - id: fact-computer-science-geolocation-003
    statement: The API supports one-shot position requests with getCurrentPosition() and repeated updates with watchPosition().
    source_title: Geolocation
    source_url: https://www.w3.org/TR/geolocation/
    confidence: medium
completeness: 0.86
known_gaps:
  - This public sample was manually narrowed to source-backed facts on 2026-05-28.
disputed_statements: []
primary_sources:
  - title: Geolocation
    type: standard
    year: 2026
    url: https://www.w3.org/TR/geolocation/
    institution: W3C
  - title: Geolocation API - Web APIs | MDN
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
    institution: Mozilla
  - title: "Navigator: geolocation property - Web APIs | MDN"
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation
    institution: Mozilla
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

The Geolocation API lets web applications request location information for the hosting device. This article keeps to the W3C specification and MDN documentation: access starts at `navigator.geolocation`, requires user permission in secure contexts, and supports current-position and watched-position requests.

## Core Explanation

Geolocation is deliberately permission-gated because location data can identify where a person or device is. The API exposes coordinates and related accuracy fields through position objects, while leaving the underlying location source to the browser and device.

## Further Reading

- [Geolocation](https://www.w3.org/TR/geolocation/)
- [Geolocation API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [Navigator: geolocation property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation)
