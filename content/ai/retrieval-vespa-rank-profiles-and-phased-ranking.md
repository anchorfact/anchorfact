---
id: retrieval-vespa-rank-profiles-and-phased-ranking
title: 'Retrieval Vespa Rank Profiles and Phased Ranking'
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
  - id: fact-ai-retrieval-vespa-rank-profiles-and-phased-ranking-1
    statement: >-
      Vespa documentation says ranking is specified in rank profiles defined in
      the schema.
    source_title: Vespa Ranking
    source_url: https://docs.vespa.ai/en/basics/ranking.html
    confidence: medium
  - id: fact-ai-retrieval-vespa-rank-profiles-and-phased-ranking-2
    statement: >-
      Vespa documentation says phased ranking allows multiphased retrieval and
      ranking of documents.
    source_title: Vespa Phased Ranking
    source_url: https://docs.vespa.ai/en/ranking/phased-ranking.html
    confidence: medium
  - id: fact-ai-retrieval-vespa-rank-profiles-and-phased-ranking-3
    statement: >-
      Vespa phased ranking documentation says the retrieval part of a phased
      pipeline is expressed through the query API and ranking through the
      rank-profile in the schema.
    source_title: Vespa Phased Ranking
    source_url: https://docs.vespa.ai/en/ranking/phased-ranking.html
    confidence: medium
completeness: 0.82
known_gaps:
  - Vespa ranking evidence depends on schema deployment, rank profile selection, query operators, first-phase and second-phase expressions, global phase configuration, model features, rank feature logging, and whether online traffic uses the same profile as evaluation.
disputed_statements: []
primary_sources:
  - title: Vespa Ranking
    type: documentation
    year: 2026
    url: https://docs.vespa.ai/en/basics/ranking.html
    institution: Vespa
  - title: Vespa Phased Ranking
    type: documentation
    year: 2026
    url: https://docs.vespa.ai/en/ranking/phased-ranking.html
    institution: Vespa
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Vespa rank profiles and phased ranking tell retrieval agents which ranking logic actually ordered the evidence.

## Core Explanation

Retrieval quality is not only about which documents were matched. Ranking profiles define how Vespa scores and reorders candidates, and phased ranking lets cheap retrieval produce candidates before more expensive ranking stages.

Agents should capture the query operators, selected rank profile, first-phase expression, second or global phase, rank features, and evaluation profile before comparing retrieval results or tuning ranking behavior.

## Source-Mapped Facts

- Vespa documentation says ranking is specified in rank profiles defined in the schema. ([source](https://docs.vespa.ai/en/basics/ranking.html))
- Vespa documentation says phased ranking allows multiphased retrieval and ranking of documents. ([source](https://docs.vespa.ai/en/ranking/phased-ranking.html))
- Vespa phased ranking documentation says the retrieval part of a phased pipeline is expressed through the query API and ranking through the rank-profile in the schema. ([source](https://docs.vespa.ai/en/ranking/phased-ranking.html))

## Further Reading

- [Vespa Ranking](https://docs.vespa.ai/en/basics/ranking.html)
- [Vespa Phased Ranking](https://docs.vespa.ai/en/ranking/phased-ranking.html)
