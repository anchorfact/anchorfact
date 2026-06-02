---
id: rag-query-rewriting-and-expansion
title: 'RAG Query Rewriting and Expansion'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-02'
created_date: '2026-06-02'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-rag-query-rewriting-and-expansion-1
    statement: >-
      The Query2doc paper presents query expansion with large language models.
    source_title: Query2doc
    source_url: https://arxiv.org/abs/2303.07678
    confidence: medium
  - id: fact-ai-rag-query-rewriting-and-expansion-2
    statement: >-
      Haystack documentation describes Hypothetical Document Embeddings as creating a
      hypothetical answer that is embedded to search for similar documents.
    source_title: Haystack Hypothetical Document Embeddings
    source_url: https://docs.haystack.deepset.ai/docs/hypothetical-document-embeddings-hyde
    confidence: medium
  - id: fact-ai-rag-query-rewriting-and-expansion-3
    statement: >-
      LlamaIndex documentation provides query transformation examples for transforming a query
      before retrieval.
    source_title: LlamaIndex Query Transformations
    source_url: https://developers.llamaindex.ai/python/examples/query_transformations/query_transform_cookbook/
    confidence: medium
completeness: 0.83
known_gaps:
  - Query rewriting can improve recall but may also drift from user intent, leak forbidden constraints, overfit to benchmark wording, or increase retrieval latency.
disputed_statements: []
primary_sources:
  - title: Query2doc
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2303.07678
    institution: arXiv
  - title: Haystack Hypothetical Document Embeddings
    type: documentation
    year: 2026
    url: https://docs.haystack.deepset.ai/docs/hypothetical-document-embeddings-hyde
    institution: deepset
  - title: LlamaIndex Query Transformations
    type: documentation
    year: 2026
    url: https://developers.llamaindex.ai/python/examples/query_transformations/query_transform_cookbook/
    institution: LlamaIndex
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Query rewriting and expansion give RAG systems more retrieval surface when the user's wording does not match the corpus vocabulary.

## Core Explanation

A RAG retriever can miss relevant documents when a query is terse, ambiguous, uses synonyms, or names an operational symptom instead of the underlying concept. Query expansion, hypothetical-document generation, and query transformation are ways to produce a richer retrieval query before searching.

Agents should log both the original query and transformed query. If the rewrite changes the user's constraint, the retrieval result may look relevant while answering the wrong question. Good systems evaluate rewriting by recall, grounding, latency, and drift.

## Source-Mapped Facts

- The Query2doc paper presents query expansion with large language models. ([source](https://arxiv.org/abs/2303.07678))
- Haystack documentation describes Hypothetical Document Embeddings as creating a hypothetical answer that is embedded to search for similar documents. ([source](https://docs.haystack.deepset.ai/docs/hypothetical-document-embeddings-hyde))
- LlamaIndex documentation provides query transformation examples for transforming a query before retrieval. ([source](https://developers.llamaindex.ai/python/examples/query_transformations/query_transform_cookbook/))

## Further Reading

- [Query2doc](https://arxiv.org/abs/2303.07678)
- [Haystack Hypothetical Document Embeddings](https://docs.haystack.deepset.ai/docs/hypothetical-document-embeddings-hyde)
- [LlamaIndex Query Transformations](https://developers.llamaindex.ai/python/examples/query_transformations/query_transform_cookbook/)
