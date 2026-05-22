---
id: "kb-2026-00096"
title: "Intersection Observer API"
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
  - title: "Intersection Observer (W3C)"
    type: "standard"
    year: 2022
    url: "https://www.w3.org/TR/intersection-observer/"
    institution: "W3C"

completeness: 0.82
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

The Intersection Observer API asynchronously observes changes in the visibility of target elements relative to an ancestor viewport. It enables efficient lazy loading, infinite scroll, and visibility-based analytics without polling scroll events.

## Core Explanation

Usage: `new IntersectionObserver(callback, { threshold: 0.1 })`. The callback receives entries with `isIntersecting` and `intersectionRatio`. Multiple thresholds enable graduated visibility detection. `rootMargin` expands/shrinks the observation area. Intersection Observer runs off the main thread and is dramatically more performant than scroll event handlers.

## Further Reading

- [Intersection Observer (W3C)](https://www.w3.org/TR/intersection-observer/)
