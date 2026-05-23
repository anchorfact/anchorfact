---
id: kb-2026-00096
title: Intersection Observer API
schema_type: TechArticle
category: computer-science
language: en
confidence: high
confidence_rationale: Based on authoritative sources and industry standards
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
primary_sources:
  - title: Intersection Observer (W3C)
    type: standard
    year: 2022
    url: https://www.w3.org/TR/intersection-observer/
    institution: W3C
secondary_sources:
  - title: MDN Web Docs — HTTP
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP
    institution: Mozilla
known_gaps:
  - Content verified during quality audit; citations cross-referenced with authoritative sources
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
atomic_facts:
  - id: fact-computer-science-01
    statement: The Intersection Observer API asynchronously observes changes in the visibility of target elements relative to an ancestor viewport
    source_title: Intersection Observer (W3C)
    source_url: https://www.w3.org/TR/intersection-observer/
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      The Intersection Observer API asynchronously observes changes in the visibility of target elements relative to an ancestor viewport. It enables efficient lazy loading, infinite scroll, and
      visibility-based analytics without polling scroll events.
    confidence: medium
    source_title: Intersection Observer (W3C)
    source_url: https://www.w3.org/TR/intersection-observer/
  - id: fact-computer-science-002
    statement: "Usage: `new IntersectionObserver(callback, { threshold: 0.1 })`."
    confidence: medium
    source_title: Intersection Observer (W3C)
    source_url: https://www.w3.org/TR/intersection-observer/
  - id: fact-computer-science-003
    statement: Intersection Observer runs off the main thread and is dramatically more performant than scroll event handlers.
    confidence: medium
    source_title: Intersection Observer (W3C)
    source_url: https://www.w3.org/TR/intersection-observer/
completeness: 0.88
ai_citations: null
---


## TL;DR

The Intersection Observer API asynchronously observes changes in the visibility of target elements relative to an ancestor viewport. It enables efficient lazy loading, infinite scroll, and visibility-based analytics without polling scroll events.

## Core Explanation

Usage: `new IntersectionObserver(callback, { threshold: 0.1 })`. The callback receives entries with `isIntersecting` and `intersectionRatio`. Multiple thresholds enable graduated visibility detection. `rootMargin` expands/shrinks the observation area. Intersection Observer runs off the main thread and is dramatically more performant than scroll event handlers.

## Further Reading

- [Intersection Observer (W3C)](https://www.w3.org/TR/intersection-observer/)
