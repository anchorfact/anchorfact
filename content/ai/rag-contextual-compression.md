---
id: rag-contextual-compression
title: 'RAG Contextual Compression'
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
  - id: fact-ai-rag-contextual-compression-1
    statement: >-
      LangChain documentation shows a CrossEncoderReranker used with ContextualCompressionRetriever
      to rerank retrieved documents.
    source_title: LangChain Cross Encoder Reranker Integration
    source_url: https://docs.langchain.com/oss/python/integrations/document_transformers/cross_encoder_reranker
    confidence: medium
  - id: fact-ai-rag-contextual-compression-2
    statement: >-
      LlamaIndex documentation says node postprocessors take a set of nodes and apply transformation,
      filtering, or re-ranking logic.
    source_title: LlamaIndex Node Postprocessor
    source_url: https://developers.llamaindex.ai/python/framework/module_guides/querying/node_postprocessors/
    confidence: medium
  - id: fact-ai-rag-contextual-compression-3
    statement: >-
      Cohere reranking documentation describes using a rerank model to return the most relevant
      documents for a query.
    source_title: Reranking with Cohere
    source_url: https://docs.cohere.com/v2/docs/reranking-with-cohere
    confidence: medium
completeness: 0.83
known_gaps:
  - Compression quality depends on retriever recall, reranker choice, query type, and whether important evidence is removed.
disputed_statements: []
primary_sources:
  - title: LangChain Cross Encoder Reranker Integration
    type: documentation
    year: 2026
    url: https://docs.langchain.com/oss/python/integrations/document_transformers/cross_encoder_reranker
    institution: LangChain
  - title: LlamaIndex Node Postprocessor
    type: documentation
    year: 2026
    url: https://developers.llamaindex.ai/python/framework/module_guides/querying/node_postprocessors/
    institution: LlamaIndex
  - title: Reranking with Cohere
    type: documentation
    year: 2026
    url: https://docs.cohere.com/v2/docs/reranking-with-cohere
    institution: Cohere
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

RAG contextual compression narrows retrieved context after initial retrieval so the generator sees fewer, more relevant passages.

## Core Explanation

Naive RAG often sends every top-k chunk to the model. Contextual compression inserts a post-retrieval step that filters, transforms, or reranks retrieved material according to the current query. The goal is to preserve answer-critical evidence while reducing distraction and context-window cost.

This is not a substitute for recall. If the first-stage retriever misses the right document, compression cannot recover it. A good evaluation plan measures both retrieval recall before compression and answer quality after compression.

## Source-Mapped Facts

- LangChain documentation shows a CrossEncoderReranker used with ContextualCompressionRetriever to rerank retrieved documents. ([source](https://docs.langchain.com/oss/python/integrations/document_transformers/cross_encoder_reranker))
- LlamaIndex documentation says node postprocessors take a set of nodes and apply transformation, filtering, or re-ranking logic. ([source](https://developers.llamaindex.ai/python/framework/module_guides/querying/node_postprocessors/))
- Cohere reranking documentation describes using a rerank model to return the most relevant documents for a query. ([source](https://docs.cohere.com/v2/docs/reranking-with-cohere))

## Further Reading

- [LangChain Cross Encoder Reranker Integration](https://docs.langchain.com/oss/python/integrations/document_transformers/cross_encoder_reranker)
- [LlamaIndex Node Postprocessor](https://developers.llamaindex.ai/python/framework/module_guides/querying/node_postprocessors/)
- [Reranking with Cohere](https://docs.cohere.com/v2/docs/reranking-with-cohere)
