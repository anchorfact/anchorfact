---
id: "kb-2026-00104"
title: "Performance API"
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
  - title: "Performance Timeline (W3C)"
    type: "standard"
    year: 2023
    url: "https://www.w3.org/TR/performance-timeline/"
    institution: "W3C"

completeness: 0.82
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

The Performance API (`performance.now()`, `performance.getEntries()`) provides high-resolution timing data (microsecond precision) for measuring web application performance. It includes the Navigation Timing, Resource Timing, and User Timing APIs.

## Core Explanation

`performance.now()` returns a DOMHighResTimeStamp relative to `timeOrigin` with 5μs precision. `performance.mark('name')` and `measure()` for custom metrics. `performance.getEntriesByType('resource')` lists all loaded resources with timing breakdowns (DNS, TCP, request, response). Core Web Vitals (LCP, INP, CLS) are exposed via PerformanceObserver.

## Further Reading

- [Performance Timeline (W3C)](https://www.w3.org/TR/performance-timeline/)
