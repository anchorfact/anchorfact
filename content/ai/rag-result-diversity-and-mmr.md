---
id: rag-result-diversity-and-mmr
title: 'RAG Result Diversity and MMR'
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
  - id: fact-ai-rag-result-diversity-and-mmr-1
    statement: >-
      Qdrant documentation describes a search relevance API that can improve discovery by balancing
      relevance and diversity.
    source_title: Qdrant Search Relevance
    source_url: https://qdrant.tech/documentation/concepts/search-relevance/
    confidence: medium
  - id: fact-ai-rag-result-diversity-and-mmr-2
    statement: >-
      LangChain documentation for the Weaviate vector store includes maximum marginal relevance as a
      search type option.
    source_title: LangChain Weaviate Vector Store
    source_url: https://docs.langchain.com/oss/python/integrations/vectorstores/weaviate/
    confidence: medium
  - id: fact-ai-rag-result-diversity-and-mmr-3
    statement: >-
      Qdrant search documentation describes vector search as returning points closest to a query
      vector under a specified distance function.
    source_title: Qdrant Search
    source_url: https://qdrant.tech/documentation/concepts/search/
    confidence: medium
completeness: 0.83
known_gaps:
  - Diversity can reduce near-duplicate context, but it may lower recall for tightly scoped questions if tuned poorly.
disputed_statements: []
primary_sources:
  - title: Qdrant Search Relevance
    type: documentation
    year: 2026
    url: https://qdrant.tech/documentation/concepts/search-relevance/
    institution: Qdrant
  - title: LangChain Weaviate Vector Store
    type: documentation
    year: 2026
    url: https://docs.langchain.com/oss/python/integrations/vectorstores/weaviate/
    institution: LangChain
  - title: Qdrant Search
    type: documentation
    year: 2026
    url: https://qdrant.tech/documentation/concepts/search/
    institution: Qdrant
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

RAG result diversity controls whether retrieval returns ten near-duplicates or a broader set of passages that cover distinct evidence.

## Core Explanation

Dense retrieval can over-concentrate on very similar chunks. That is useful when the best evidence is localized, but it can waste context when a question needs multiple angles. Diversity methods such as maximum marginal relevance select results that balance similarity to the query with dissimilarity from already selected results.

Agents should use diversity as a retrieval policy, not an automatic improvement. The right setting depends on whether the user asks for one exact fact, a comparison, a multi-hop answer, or a survey of sources.

## Source-Mapped Facts

- Qdrant documentation describes a search relevance API that can improve discovery by balancing relevance and diversity. ([source](https://qdrant.tech/documentation/concepts/search-relevance/))
- LangChain documentation for the Weaviate vector store includes maximum marginal relevance as a search type option. ([source](https://docs.langchain.com/oss/python/integrations/vectorstores/weaviate/))
- Qdrant search documentation describes vector search as returning points closest to a query vector under a specified distance function. ([source](https://qdrant.tech/documentation/concepts/search/))

## Further Reading

- [Qdrant Search Relevance](https://qdrant.tech/documentation/concepts/search-relevance/)
- [LangChain Weaviate Vector Store](https://docs.langchain.com/oss/python/integrations/vectorstores/weaviate/)
- [Qdrant Search](https://qdrant.tech/documentation/concepts/search/)
