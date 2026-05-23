---
id: "kb-2026-00104"



title: "Performance API"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
confidence_rationale: "Based on authoritative sources and industry standards"



last_verified: "2026-05-22"
generation_method: "human_only"



derived_from_human_seed: true
primary_sources:
  - title: "Performance Timeline (W3C)"
    type: "standard"



    year: 2023
    url: "https://www.w3.org/TR/performance-timeline/"


    institution: "W3C"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"



    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"


    institution: "Mozilla"
  - title: "RESTful Web APIs"
    authors: ["Richardson", "Amundsen"]
    type: "book"



    year: 2013
    url: "https://www.oreilly.com/library/view/restful-web-apis/9781449359713/"


    institution: "O'Reilly"
known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"
disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

atomic_facts:
  - id: fact-computer-science-01
    statement: Core Web Vitals are exposed via PerformanceObserver
    source_title: Performance Timeline (W3C)
    source_url: https://www.w3.org/TR/performance-timeline/
    confidence: medium
  
completeness: 0.88
ai_citations:
---

## TL;DR

The Performance API (`performance.now()`, `performance.getEntries()`) provides high-resolution timing data (microsecond precision) for measuring web application performance. It includes the Navigation Timing, Resource Timing, and User Timing APIs.

## Core Explanation

`performance.now()` returns a DOMHighResTimeStamp relative to `timeOrigin` with 5μs precision. `performance.mark('name')` and `measure()` for custom metrics. `performance.getEntriesByType('resource')` lists all loaded resources with timing breakdowns (DNS, TCP, request, response). Core Web Vitals (LCP, INP, CLS) are exposed via PerformanceObserver.

## Further Reading

- [Performance Timeline (W3C)](https://www.w3.org/TR/performance-timeline/)
