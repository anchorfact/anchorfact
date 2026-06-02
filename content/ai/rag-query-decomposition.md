---
id: rag-query-decomposition
title: 'RAG Query Decomposition'
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
  - id: fact-ai-rag-query-decomposition-1
    statement: >-
      Azure AI Search documentation says agentic retrieval uses an LLM to break down complex queries
      into smaller focused subqueries.
    source_title: Azure AI Search Agentic Retrieval
    source_url: https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-overview
    confidence: medium
  - id: fact-ai-rag-query-decomposition-2
    statement: >-
      Azure AI Search documentation says agentic retrieval runs subqueries in parallel and
      semantically reranks each subquery.
    source_title: Azure AI Search Agentic Retrieval
    source_url: https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-overview
    confidence: medium
  - id: fact-ai-rag-query-decomposition-3
    statement: >-
      LlamaIndex documentation provides a Sub Question Query Engine example for decomposing a
      question into subquestions over query engine tools.
    source_title: LlamaIndex Sub Question Query Engine
    source_url: https://developers.llamaindex.ai/python/examples/query_engine/sub_question_query_engine/
    confidence: medium
  - id: fact-ai-rag-query-decomposition-4
    statement: >-
      Microsoft documentation provides a guide for creating a knowledge agent for agentic retrieval
      in Azure AI Search.
    source_title: Create a Knowledge Agent in Azure AI Search
    source_url: https://learn.microsoft.com/en-us/azure/search/search-agentic-retrieval-how-to-create
    confidence: medium
completeness: 0.84
known_gaps:
  - Query decomposition can increase latency and cost, and poor decomposition can fragment evidence or miss the user's actual intent.
disputed_statements: []
primary_sources:
  - title: Azure AI Search Agentic Retrieval
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-overview
    institution: Microsoft
  - title: LlamaIndex Sub Question Query Engine
    type: documentation
    year: 2026
    url: https://developers.llamaindex.ai/python/examples/query_engine/sub_question_query_engine/
    institution: LlamaIndex
  - title: Create a Knowledge Agent in Azure AI Search
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/search/search-agentic-retrieval-how-to-create
    institution: Microsoft
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

RAG query decomposition breaks complex questions into smaller retrieval tasks so each subproblem can search for more focused evidence.

## Core Explanation

Single-shot retrieval works well for narrow questions, but compound user requests often contain multiple entities, constraints, or comparisons. Query decomposition lets a RAG system plan subqueries, retrieve evidence for each part, and merge the results before answer generation.

The tradeoff is operational. Decomposition can improve recall on hard questions, but it adds planning latency and creates more places for the system to drift. It should be evaluated with both retrieval metrics and answer-level faithfulness tests.

## Source-Mapped Facts

- Azure AI Search documentation says agentic retrieval uses an LLM to break down complex queries into smaller focused subqueries. ([source](https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-overview))
- Azure AI Search documentation says agentic retrieval runs subqueries in parallel and semantically reranks each subquery. ([source](https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-overview))
- LlamaIndex documentation provides a Sub Question Query Engine example for decomposing a question into subquestions over query engine tools. ([source](https://developers.llamaindex.ai/python/examples/query_engine/sub_question_query_engine/))
- Microsoft documentation provides a guide for creating a knowledge agent for agentic retrieval in Azure AI Search. ([source](https://learn.microsoft.com/en-us/azure/search/search-agentic-retrieval-how-to-create))

## Further Reading

- [Azure AI Search Agentic Retrieval](https://learn.microsoft.com/en-us/azure/search/agentic-retrieval-overview)
- [LlamaIndex Sub Question Query Engine](https://developers.llamaindex.ai/python/examples/query_engine/sub_question_query_engine/)
- [Create a Knowledge Agent in Azure AI Search](https://learn.microsoft.com/en-us/azure/search/search-agentic-retrieval-how-to-create)
