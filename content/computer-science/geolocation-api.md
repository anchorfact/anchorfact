---
id: "kb-2026-00103"
title: "Geolocation API"
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
  - title: "Geolocation API (W3C Recommendation)"
    type: "standard"
    year: 2022
    url: "https://www.w3.org/TR/geolocation/"
    institution: "W3C"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
  - title: "Pro Git (2nd Ed)"
    authors: ["Chacon", "Straub"]
    type: "book"
    year: 2014
    url: "https://git-scm.com/book/en/v2"
    institution: "Apress"
completeness: 0.88
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

The Geolocation API (`navigator.geolocation`) provides device location (latitude, longitude, altitude, accuracy) to web applications with user consent. It uses GPS, WiFi, cell tower triangulation, or IP-based location depending on available hardware.

## Core Explanation

`navigator.geolocation.getCurrentPosition(success, error, options)`. `watchPosition()` for continuous tracking. Options include `enableHighAccuracy`, `timeout`, `maximumAge`. The API is asynchronous and can take seconds to resolve. HTTPS is required. Accuracy varies: GPS ~5m, WiFi ~50m, IP ~city-level.

## Further Reading

- [Geolocation API (W3C Recommendation)](https://www.w3.org/TR/geolocation/)
