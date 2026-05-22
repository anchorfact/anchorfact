---
id: "kb-2026-00085"
title: "IndexedDB"
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
  - title: "IndexedDB API (W3C Recommendation)"
    type: "standard"
    year: 2021
    url: "https://www.w3.org/TR/IndexedDB/"
    institution: "W3C"

completeness: 0.82
ai_citations:
  last_citation_check: "2026-05-22"
---

## TL;DR

IndexedDB is a low-level, asynchronous transactional database API for browsers, supporting structured data storage including objects and binary data. Unlike localStorage's synchronous key-value model, IndexedDB handles large datasets (hundreds of MB) with indexed queries and transactions.

## Core Explanation

IndexedDB uses object stores (not tables) and indexes for efficient queries. Transactions auto-commit, and the API is event-driven (though modern ORMs like Dexie.js provide Promise wrappers). Key features: cursor-based iteration, compound indexes, version-based schema migrations. It operates within the same-origin sandbox and respects the browser's storage quota.

## Further Reading

- [IndexedDB API (W3C Recommendation)](https://www.w3.org/TR/IndexedDB/)
