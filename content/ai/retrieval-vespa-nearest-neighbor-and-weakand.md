---
id: retrieval-vespa-nearest-neighbor-and-weakand
title: 'Retrieval Vespa nearestNeighbor and weakAnd'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-03'
created_date: '2026-06-03'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-retrieval-vespa-nearest-neighbor-and-weakand-1
    statement: >-
      Vespa documentation describes nearestNeighbor as a YQL query operator for
      retrieving nearest neighbors from a vector field.
    source_title: Vespa YQL Reference
    source_url: https://docs.vespa.ai/en/reference/querying/yql.html
    confidence: medium
  - id: fact-ai-retrieval-vespa-nearest-neighbor-and-weakand-2
    statement: >-
      Vespa documentation says that if an HNSW index is specified on the tensor
      field, approximate nearest neighbors are returned.
    source_title: Vespa YQL Reference
    source_url: https://docs.vespa.ai/en/reference/querying/yql.html
    confidence: medium
  - id: fact-ai-retrieval-vespa-nearest-neighbor-and-weakand-3
    statement: >-
      Vespa documentation says weakAnd is designed for single-valued indexed
      string fields or fieldsets combining indexed string fields.
    source_title: Vespa WAND
    source_url: https://docs.vespa.ai/en/ranking/wand.html
    confidence: medium
completeness: 0.82
known_gaps:
  - Hybrid retrieval quality depends on targetHits, totalTargetHits, tensor schema, HNSW settings, lexical field analysis, weakAnd term weights, ranking profiles, match-phase limits, and reranking depth.
disputed_statements: []
primary_sources:
  - title: Vespa YQL Reference
    type: documentation
    year: 2026
    url: https://docs.vespa.ai/en/reference/querying/yql.html
    institution: Vespa
  - title: Vespa WAND
    type: documentation
    year: 2026
    url: https://docs.vespa.ai/en/ranking/wand.html
    institution: Vespa
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Vespa nearestNeighbor and weakAnd evidence helps retrieval agents reason about hybrid vector and lexical recall before blaming the reranker.

## Core Explanation

Vespa retrieval can combine vector operators with lexical matching and ranking profiles. The agent needs to distinguish vector candidate generation from lexical candidate generation, because target hit counts and match operators determine what can be reranked later.

Useful evidence includes the YQL query, tensor field schema, HNSW index settings, targetHits, totalTargetHits, weakAnd fields, term weights, ranking profile, and second-phase ranking depth. A weak candidate set can make an otherwise good ranker look broken.

## Source-Mapped Facts

- Vespa documentation describes nearestNeighbor as a YQL query operator for retrieving nearest neighbors from a vector field. ([source](https://docs.vespa.ai/en/reference/querying/yql.html))
- Vespa documentation says that if an HNSW index is specified on the tensor field, approximate nearest neighbors are returned. ([source](https://docs.vespa.ai/en/reference/querying/yql.html))
- Vespa documentation says weakAnd is designed for single-valued indexed string fields or fieldsets combining indexed string fields. ([source](https://docs.vespa.ai/en/ranking/wand.html))

## Further Reading

- [Vespa YQL Reference](https://docs.vespa.ai/en/reference/querying/yql.html)
- [Vespa WAND](https://docs.vespa.ai/en/ranking/wand.html)
