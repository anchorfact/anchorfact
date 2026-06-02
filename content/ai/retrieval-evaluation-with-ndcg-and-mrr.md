---
id: retrieval-evaluation-with-ndcg-and-mrr
title: 'Retrieval Evaluation with nDCG and MRR'
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
  - id: fact-ai-retrieval-evaluation-with-ndcg-and-mrr-1
    statement: >-
      scikit-learn documentation describes ndcg_score as computing normalized discounted cumulative
      gain.
    source_title: scikit-learn ndcg_score
    source_url: https://scikit-learn.org/stable/modules/generated/sklearn.metrics.ndcg_score.html
    confidence: medium
  - id: fact-ai-retrieval-evaluation-with-ndcg-and-mrr-2
    statement: >-
      Elasticsearch documentation describes the ranking evaluation API as an API for evaluating
      search quality.
    source_title: Elasticsearch Ranking Evaluation API
    source_url: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-rank-eval.html
    confidence: medium
  - id: fact-ai-retrieval-evaluation-with-ndcg-and-mrr-3
    statement: >-
      TorchMetrics documentation describes RetrievalMRR as computing mean reciprocal rank for
      retrieval tasks.
    source_title: TorchMetrics Retrieval MRR
    source_url: https://torchmetrics.readthedocs.io/en/v0.11.0/retrieval/mrr.html
    confidence: medium
completeness: 0.82
known_gaps:
  - Retrieval metrics require representative queries, judged relevance labels, and separate treatment of graded and binary relevance.
disputed_statements: []
primary_sources:
  - title: scikit-learn ndcg_score
    type: documentation
    year: 2026
    url: https://scikit-learn.org/stable/modules/generated/sklearn.metrics.ndcg_score.html
    institution: scikit-learn
  - title: Elasticsearch Ranking Evaluation API
    type: documentation
    year: 2026
    url: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-rank-eval.html
    institution: Elastic
  - title: TorchMetrics Retrieval MRR
    type: documentation
    year: 2022
    url: https://torchmetrics.readthedocs.io/en/v0.11.0/retrieval/mrr.html
    institution: TorchMetrics
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

nDCG and MRR help agents evaluate whether retrieval ranks useful evidence near the top, not just whether it finds something eventually.

## Core Explanation

RAG quality depends heavily on the rank order of retrieved documents. nDCG handles graded relevance and rewards highly relevant documents near the top. MRR focuses on how early the first relevant result appears.

Agents should not use these metrics without a judged query set. A metric can look good when labels are stale, queries are too narrow, or the evaluation excludes hard failure cases. The evaluation report should include the query set, relevance labels, cutoff depth, and baseline.

## Source-Mapped Facts

- scikit-learn documentation describes ndcg_score as computing normalized discounted cumulative gain. ([source](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.ndcg_score.html))
- Elasticsearch documentation describes the ranking evaluation API as an API for evaluating search quality. ([source](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-rank-eval.html))
- TorchMetrics documentation describes RetrievalMRR as computing mean reciprocal rank for retrieval tasks. ([source](https://torchmetrics.readthedocs.io/en/v0.11.0/retrieval/mrr.html))

## Further Reading

- [scikit-learn ndcg_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.ndcg_score.html)
- [Elasticsearch Ranking Evaluation API](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-rank-eval.html)
- [TorchMetrics Retrieval MRR](https://torchmetrics.readthedocs.io/en/v0.11.0/retrieval/mrr.html)
