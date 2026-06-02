---
id: rag-hypothetical-document-embeddings-hyde
title: 'RAG Hypothetical Document Embeddings HyDE'
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
  - id: fact-ai-rag-hypothetical-document-embeddings-hyde-1
    statement: >-
      Gao et al. propose Hypothetical Document Embeddings, or HyDE, for zero-shot
      dense retrieval without relevance labels.
    source_title: Precise Zero-Shot Dense Retrieval without Relevance Labels
    source_url: https://aclanthology.org/2023.acl-long.99/
    confidence: medium
  - id: fact-ai-rag-hypothetical-document-embeddings-hyde-2
    statement: >-
      The HyDE paper says HyDE first uses an instruction-following language model
      to generate a hypothetical document for a query.
    source_title: Precise Zero-Shot Dense Retrieval without Relevance Labels
    source_url: https://aclanthology.org/2023.acl-long.99/
    confidence: medium
  - id: fact-ai-rag-hypothetical-document-embeddings-hyde-3
    statement: >-
      LlamaIndex documentation describes HyDE as generating a hypothetical
      document or answer and using it for embedding lookup instead of the raw query.
    source_title: LlamaIndex Query Transformations
    source_url: https://docs.llamaindex.ai/en/stable/optimizing/advanced_retrieval/query_transformations/
    confidence: medium
completeness: 0.82
known_gaps:
  - HyDE can retrieve useful neighborhoods but can also be affected by hallucinated hypothetical details, embedding model choice, prompt design, and domain mismatch.
disputed_statements: []
primary_sources:
  - title: Precise Zero-Shot Dense Retrieval without Relevance Labels
    type: academic_paper
    year: 2023
    url: https://aclanthology.org/2023.acl-long.99/
    doi: 10.18653/v1/2023.acl-long.99
    institution: Association for Computational Linguistics
  - title: LlamaIndex Query Transformations
    type: documentation
    year: 2026
    url: https://docs.llamaindex.ai/en/stable/optimizing/advanced_retrieval/query_transformations/
    institution: LlamaIndex
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

HyDE improves some RAG retrieval setups by embedding a model-generated hypothetical answer or document instead of embedding the short user query directly.

## Core Explanation

Dense retrieval can fail when the user query is too short, underspecified, or phrased differently from the corpus. HyDE rewrites the retrieval problem by asking a model to produce an answer-like document first, then embedding that generated text for search.

Agents should treat HyDE as a retrieval transformation, not as evidence. The generated document can guide search, but the final answer still needs citations from real retrieved documents.

## Source-Mapped Facts

- Gao et al. propose Hypothetical Document Embeddings, or HyDE, for zero-shot dense retrieval without relevance labels. ([source](https://aclanthology.org/2023.acl-long.99/))
- The HyDE paper says HyDE first uses an instruction-following language model to generate a hypothetical document for a query. ([source](https://aclanthology.org/2023.acl-long.99/))
- LlamaIndex documentation describes HyDE as generating a hypothetical document or answer and using it for embedding lookup instead of the raw query. ([source](https://docs.llamaindex.ai/en/stable/optimizing/advanced_retrieval/query_transformations/))

## Further Reading

- [Precise Zero-Shot Dense Retrieval without Relevance Labels](https://aclanthology.org/2023.acl-long.99/)
- [LlamaIndex Query Transformations](https://docs.llamaindex.ai/en/stable/optimizing/advanced_retrieval/query_transformations/)
