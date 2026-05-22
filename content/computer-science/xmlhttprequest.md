---
id: "kb-2026-00082"
title: "XMLHttpRequest"
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
  - title: "XMLHttpRequest Living Standard"
    type: "standard"
    year: 2026
    url: "https://xhr.spec.whatwg.org/"
    institution: "WHATWG"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.88
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

XMLHttpRequest (XHR) is an API for making HTTP requests from JavaScript, first introduced by Microsoft in 1999 for Outlook Web Access. It was the foundation of Ajax and is now largely superseded by the Fetch API, though still used in legacy systems and for upload progress tracking.

## Core Explanation

XHR uses event-based callbacks (`onload`, `onerror`, `onprogress`) rather than Promises. It supports synchronous requests (`xhr.open('GET', url, false)`), though these are deprecated and block the main thread. XHR remains the only standard API that provides upload progress events (`xhr.upload.onprogress`), which Fetch API does not natively support.

## Further Reading

- [XMLHttpRequest Living Standard](https://xhr.spec.whatwg.org/)
