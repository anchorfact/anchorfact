---
id: "kb-2026-00087"
title: "Web Workers"
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
  - title: "Web Workers (WHATWG)"
    type: "standard"
    year: 2026
    url: "https://html.spec.whatwg.org/multipage/workers.html"
    institution: "WHATWG"

completeness: 0.82
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

Web Workers enable JavaScript to run in background threads, parallelizing CPU-intensive tasks without blocking the main UI thread. They communicate with the main thread via message passing (`postMessage`), not shared memory (by default).

## Core Explanation

Types: Dedicated Workers (single tab), Shared Workers (multiple tabs/windows), and Service Workers (specialized proxy). Workers have no DOM access but can use `fetch`, WebSocket, IndexedDB, and most browser APIs. Communication uses structured cloning (copy) or Transferable objects (zero-copy with ownership transfer).

## Further Reading

- [Web Workers (WHATWG)](https://html.spec.whatwg.org/multipage/workers.html)
