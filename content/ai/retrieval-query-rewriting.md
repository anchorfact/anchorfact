---
id: retrieval-query-rewriting
title: 'Retrieval Query Rewriting'
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
  - id: fact-retrieval-query-rewriting-1
    statement: >-
      LlamaIndex documentation describes query transformations as modules that convert a query into another query before or during retrieval.
    source_title: Query Transformations - LlamaIndex
    source_url: https://docs.llamaindex.ai/en/stable/optimizing/advanced_retrieval/query_transformations/
  - id: fact-retrieval-query-rewriting-2
    statement: >-
      LlamaIndex documentation lists HyDE as a query transformation that generates a hypothetical document or answer before embedding lookup.
    source_title: Query Transformations - LlamaIndex
    source_url: https://docs.llamaindex.ai/en/stable/optimizing/advanced_retrieval/query_transformations/
  - id: fact-retrieval-query-rewriting-3
    statement: >-
      LangChain retrieval documentation describes retrieval systems as modular pipelines where loaders, splitters, embeddings, and vector stores can be swapped.
    source_title: Retrieval - Docs by LangChain
    source_url: https://docs.langchain.com/oss/python/langchain/retrieval
completeness: 0.82
known_gaps:
  - Query rewriting quality depends on the retriever, corpus metadata, language, conversation state, and failure-mode evals.
disputed_statements: []
primary_sources:
  - title: Query Transformations - LlamaIndex
    type: documentation
    year: 2026
    url: https://docs.llamaindex.ai/en/stable/optimizing/advanced_retrieval/query_transformations/
    institution: LlamaIndex
  - title: Query fusion - LlamaIndex
    type: documentation
    year: 2026
    url: https://docs.llamaindex.ai/en/stable/api_reference/retrievers/query_fusion/
    institution: LlamaIndex
  - title: Retrieval - Docs by LangChain
    type: documentation
    year: 2026
    url: https://docs.langchain.com/oss/python/langchain/retrieval
    institution: LangChain
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Retrieval query rewriting transforms a user question into one or more retriever-friendly queries so the retrieval layer can find answer-bearing evidence that the original wording might miss.

## Core Explanation

Query rewriting is most useful when the user query is conversational, ambiguous, underspecified, multilingual, or phrased differently from the corpus. Common patterns include standalone-question rewriting, hypothetical-document embeddings, decomposition into subquestions, and multi-query fusion. It must be evaluated carefully because a rewritten query can also drift away from the user's intent.

## Source-Mapped Facts

- LlamaIndex documentation describes query transformations as modules that convert a query into another query before or during retrieval. ([source](https://docs.llamaindex.ai/en/stable/optimizing/advanced_retrieval/query_transformations/))
- LlamaIndex documentation lists HyDE as a query transformation that generates a hypothetical document or answer before embedding lookup. ([source](https://docs.llamaindex.ai/en/stable/optimizing/advanced_retrieval/query_transformations/))
- LangChain retrieval documentation describes retrieval systems as modular pipelines where loaders, splitters, embeddings, and vector stores can be swapped. ([source](https://docs.langchain.com/oss/python/langchain/retrieval))

## Further Reading

- [LlamaIndex query transformations](https://docs.llamaindex.ai/en/stable/optimizing/advanced_retrieval/query_transformations/)
- [LlamaIndex query fusion](https://docs.llamaindex.ai/en/stable/api_reference/retrievers/query_fusion/)
- [LangChain retrieval](https://docs.langchain.com/oss/python/langchain/retrieval)
