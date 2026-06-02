---
id: rag-query-routing
title: 'RAG Query Routing'
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
  - id: fact-rag-query-routing-1
    statement: >-
      LlamaIndex router documentation describes routers as modules that route a user query to a set of candidate modules.
    source_title: Routers - LlamaIndex
    source_url: https://docs.llamaindex.ai/en/stable/module_guides/querying/router/
    confidence: medium
  - id: fact-rag-query-routing-2
    statement: >-
      Haystack documentation says ConditionalRouter routes data based on conditions and sends outputs to different pipeline branches.
    source_title: ConditionalRouter - Haystack
    source_url: https://docs.haystack.deepset.ai/docs/conditionalrouter
    confidence: medium
  - id: fact-rag-query-routing-3
    statement: >-
      LangSmith evaluation concepts documentation says datasets contain examples that can be used to test application behavior.
    source_title: Evaluation Concepts - LangSmith
    source_url: https://docs.langchain.com/langsmith/evaluation-concepts
    confidence: medium
completeness: 0.81
known_gaps:
  - Router quality depends on route labels, retrieval coverage, evaluation datasets, fallback behavior, and whether routing decisions are logged for review.
disputed_statements: []
primary_sources:
  - title: Routers - LlamaIndex
    type: documentation
    year: 2026
    url: https://docs.llamaindex.ai/en/stable/module_guides/querying/router/
    institution: LlamaIndex
  - title: ConditionalRouter - Haystack
    type: documentation
    year: 2026
    url: https://docs.haystack.deepset.ai/docs/conditionalrouter
    institution: Haystack
  - title: Evaluation Concepts - LangSmith
    type: documentation
    year: 2026
    url: https://docs.langchain.com/langsmith/evaluation-concepts
    institution: LangChain
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

RAG query routing chooses which retriever, index, tool, or pipeline branch should handle a user query before evidence is assembled.

## Core Explanation

Not every query should hit the same corpus. A support question, code question, policy question, and database question may require different indexes, filters, rerankers, or tools. Query routing encodes that decision before retrieval and can reduce irrelevant context.

For agents, routing should be evaluated like any other model behavior. Route choices need labels, examples, fallback paths, and traces so developers can see whether failures came from routing, retrieval, synthesis, or citation.

## Source-Mapped Facts

- LlamaIndex router documentation describes routers as modules that route a user query to a set of candidate modules. ([source](https://docs.llamaindex.ai/en/stable/module_guides/querying/router/))
- Haystack documentation says ConditionalRouter routes data based on conditions and sends outputs to different pipeline branches. ([source](https://docs.haystack.deepset.ai/docs/conditionalrouter))
- LangSmith evaluation concepts documentation says datasets contain examples that can be used to test application behavior. ([source](https://docs.langchain.com/langsmith/evaluation-concepts))

## Further Reading

- [LlamaIndex routers](https://docs.llamaindex.ai/en/stable/module_guides/querying/router/)
- [Haystack ConditionalRouter](https://docs.haystack.deepset.ai/docs/conditionalrouter)
- [LangSmith evaluation concepts](https://docs.langchain.com/langsmith/evaluation-concepts)
