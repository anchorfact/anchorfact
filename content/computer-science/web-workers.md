---
id: "kb-2026-00087"
title: "Web Workers"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-01"
    statement: "Workers have no DOM access but can use fetch, WebSocket, IndexedDB, and most browser APIs"
    source_title: "Web Workers (WHATWG)"
    source_url: "https://html.spec.whatwg.org/multipage/workers.html"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "Web Workers enable JavaScript to run in background threads, parallelizing CPU-intensive tasks without blocking the main UI thread. They communicate with the main thread via message passing (`postMessage`), not shared memory (by default)."
    source_title: "Web Workers (WHATWG)"
    source_url: "https://html.spec.whatwg.org/multipage/workers.html"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "Types: Dedicated Workers (single tab), Shared Workers (multiple tabs/windows), and Service Workers (specialized proxy)."
    source_title: "Web Workers (WHATWG)"
    source_url: "https://html.spec.whatwg.org/multipage/workers.html"
    confidence: "medium"
  - id: "fact-computer-science-003"
    statement: "Workers have no DOM access but can use `fetch`, WebSocket, IndexedDB, and most browser APIs."
    source_title: "Web Workers (WHATWG)"
    source_url: "https://html.spec.whatwg.org/multipage/workers.html"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "Web Workers (WHATWG)"
    type: "standard"
    year: 2026
    url: "https://html.spec.whatwg.org/multipage/workers.html"
    institution: "WHATWG"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

Web Workers enable JavaScript to run in background threads, parallelizing CPU-intensive tasks without blocking the main UI thread. They communicate with the main thread via message passing (`postMessage`), not shared memory (by default).

## Core Explanation

Types: Dedicated Workers (single tab), Shared Workers (multiple tabs/windows), and Service Workers (specialized proxy). Workers have no DOM access but can use `fetch`, WebSocket, IndexedDB, and most browser APIs. Communication uses structured cloning (copy) or Transferable objects (zero-copy with ownership transfer).

## Further Reading

- [Web Workers (WHATWG)](https://html.spec.whatwg.org/multipage/workers.html)

## Related Articles

- [AI for Data Curation: Web-Scale Filtering, Deduplication, and Quality Scoring for LLM Training](../../ai/ai-for-data-curation.md)
- [Semantic Web and Ontologies: Knowledge Representation, OWL Reasoning, and Linked Data](../../ai/semantic-web-ontology.md)
- [Amazon Web Services (AWS)](../amazon-web-services-aws.md)