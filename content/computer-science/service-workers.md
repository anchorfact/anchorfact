---
id: "kb-2026-00086"
title: "Service Workers"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
confidence_rationale: "Based on authoritative sources and industry standards"
last_verified: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Service Workers Nightly (W3C)"
    type: "standard"
    year: 2024
    url: "https://w3c.github.io/ServiceWorker/"
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
known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"
completeness: 0.88
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

Service Workers are programmable network proxies that run in the browser background, intercepting network requests to enable offline functionality, push notifications, and background sync. They are the foundation of Progressive Web Apps (PWAs).

## Core Explanation

Service Workers run on a separate thread, have no DOM access, and are event-driven (`fetch`, `install`, `activate`). They have a finite lifetime — the browser may terminate and restart them. Key capabilities: caching strategies (Cache API), offline fallback, background sync (`sync` event), and push notifications. Service workers require HTTPS (except localhost).

## Further Reading

- [Service Workers Nightly (W3C)](https://w3c.github.io/ServiceWorker/)
