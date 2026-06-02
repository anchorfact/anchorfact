---
id: rag-index-evaluation-with-recall-at-k
title: 'RAG Index Evaluation with Recall@k'
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
  - id: fact-ai-rag-index-evaluation-with-recall-at-k-1
    statement: >-
      Ragas context recall documentation says context recall measures how many relevant documents or pieces of information were successfully retrieved.
    source_title: Ragas Context Recall
    source_url: https://docs.ragas.io/en/v0.2.0/concepts/metrics/available_metrics/context_recall/
    confidence: medium
  - id: fact-ai-rag-index-evaluation-with-recall-at-k-2
    statement: >-
      LlamaIndex retrieval evaluation documentation lists hit rate, MRR, precision, recall, AP, and NDCG as retrieval metrics.
    source_title: LlamaIndex Retrieval Evaluation
    source_url: https://docs.llamaindex.ai/en/stable/examples/evaluation/retrieval/retriever_eval/
    confidence: medium
  - id: fact-ai-rag-index-evaluation-with-recall-at-k-3
    statement: >-
      Azure AI Search vector ranking documentation says exhaustive KNN can be used to build a ground-truth nearest-neighbor set for evaluating ANN recall.
    source_title: Azure AI Search Vector Ranking
    source_url: https://learn.microsoft.com/en-us/azure/search/vector-search-ranking
    confidence: medium
completeness: 0.83
known_gaps:
  - Recall@k requires labeled relevant documents or a trusted proxy and does not measure answer faithfulness, latency, or safety by itself.
disputed_statements: []
primary_sources:
  - title: Ragas Context Recall
    type: documentation
    year: 2024
    url: https://docs.ragas.io/en/v0.2.0/concepts/metrics/available_metrics/context_recall/
    institution: Ragas
  - title: LlamaIndex Retrieval Evaluation
    type: documentation
    year: 2026
    url: https://docs.llamaindex.ai/en/stable/examples/evaluation/retrieval/retriever_eval/
    institution: LlamaIndex
  - title: Azure AI Search Vector Ranking
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/search/vector-search-ranking
    institution: Microsoft
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Recall@k evaluates whether a RAG index retrieves the needed evidence within the top k results before the generator tries to answer.

## Core Explanation

RAG quality can fail even when the language model is strong if the retriever never surfaces the right documents. Recall@k focuses on coverage: did the relevant evidence appear in the candidate set at a usable cutoff?

Agents should use recall@k with other signals. A high-recall retriever can still produce poor answers if chunks are noisy, citations are wrong, reranking is weak, or the generator ignores the retrieved evidence.

## Source-Mapped Facts

- Ragas context recall documentation says context recall measures how many relevant documents or pieces of information were successfully retrieved. ([source](https://docs.ragas.io/en/v0.2.0/concepts/metrics/available_metrics/context_recall/))
- LlamaIndex retrieval evaluation documentation lists hit rate, MRR, precision, recall, AP, and NDCG as retrieval metrics. ([source](https://docs.llamaindex.ai/en/stable/examples/evaluation/retrieval/retriever_eval/))
- Azure AI Search vector ranking documentation says exhaustive KNN can be used to build a ground-truth nearest-neighbor set for evaluating ANN recall. ([source](https://learn.microsoft.com/en-us/azure/search/vector-search-ranking))

## Further Reading

- [Ragas Context Recall](https://docs.ragas.io/en/v0.2.0/concepts/metrics/available_metrics/context_recall/)
- [LlamaIndex Retrieval Evaluation](https://docs.llamaindex.ai/en/stable/examples/evaluation/retrieval/retriever_eval/)
- [Azure AI Search Vector Ranking](https://learn.microsoft.com/en-us/azure/search/vector-search-ranking)
