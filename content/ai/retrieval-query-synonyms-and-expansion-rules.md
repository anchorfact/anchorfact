---
id: retrieval-query-synonyms-and-expansion-rules
title: 'Retrieval Query Synonyms and Expansion Rules'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-09'
created_date: '2026-06-09'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-retrieval-query-synonyms-and-expansion-rules-1
    statement: >-
      Elasticsearch documentation describes a synonym token filter that can
      handle synonym rules during analysis.
    source_title: Elasticsearch Synonym Token Filter
    source_url: https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-synonym-tokenfilter.html
    confidence: medium
  - id: fact-ai-retrieval-query-synonyms-and-expansion-rules-2
    statement: >-
      Azure AI Search documentation describes synonym maps that expand or
      rewrite search queries.
    source_title: Azure AI Search Synonyms
    source_url: https://learn.microsoft.com/en-us/azure/search/search-synonyms
    confidence: medium
  - id: fact-ai-retrieval-query-synonyms-and-expansion-rules-3
    statement: >-
      OpenSearch documentation describes a synonym token filter for matching
      tokens with configured synonyms.
    source_title: OpenSearch Synonym Token Filter
    source_url: https://docs.opensearch.org/latest/analyzers/token-filters/synonym/
    confidence: medium
completeness: 0.84
known_gaps:
  - Synonym behavior depends on analyzer order, equivalent versus explicit mappings, language, stemming, multi-word phrases, index-time versus query-time expansion, and reload behavior.
  - Broad expansion can increase recall while hurting precision, so production RAG systems need labeled relevance checks before changing synonym rules.
disputed_statements: []
primary_sources:
  - title: Elasticsearch Synonym Token Filter
    type: documentation
    year: 2026
    url: https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-synonym-tokenfilter.html
    institution: Elastic
  - title: Azure AI Search Synonyms
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/search/search-synonyms
    institution: Microsoft
  - title: OpenSearch Synonym Token Filter
    type: documentation
    year: 2026
    url: https://docs.opensearch.org/latest/analyzers/token-filters/synonym/
    institution: OpenSearch
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Synonym and query-expansion rules are retrieval configuration, not prompt magic, so agents should inspect analyzer and synonym metadata before blaming the embedding model.

## Core Explanation

RAG systems often miss relevant documents because the query uses different vocabulary from the indexed text. Synonym maps can connect terms such as "SLA" and "service-level agreement" or product names and aliases. They can also create false positives when expansion is too broad.

Agents debugging recall should preserve the raw query, normalized query, analyzer name, synonym map version, equivalent or explicit mapping rule, index-time versus query-time expansion mode, expanded tokens, and top results before and after expansion. This evidence separates a vocabulary mismatch from a ranking, filtering, or chunking problem.

Synonym changes should be evaluated like search relevance changes. A rule that fixes one query can degrade another query family, especially in domains where acronyms have multiple meanings.

## Source-Mapped Facts

- Elasticsearch documentation describes a synonym token filter that can handle synonym rules during analysis. ([source](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-synonym-tokenfilter.html))
- Azure AI Search documentation describes synonym maps that expand or rewrite search queries. ([source](https://learn.microsoft.com/en-us/azure/search/search-synonyms))
- OpenSearch documentation describes a synonym token filter for matching tokens with configured synonyms. ([source](https://docs.opensearch.org/latest/analyzers/token-filters/synonym/))

## Further Reading

- [Elasticsearch Synonym Token Filter](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-synonym-tokenfilter.html)
- [Azure AI Search Synonyms](https://learn.microsoft.com/en-us/azure/search/search-synonyms)
- [OpenSearch Synonym Token Filter](https://docs.opensearch.org/latest/analyzers/token-filters/synonym/)
