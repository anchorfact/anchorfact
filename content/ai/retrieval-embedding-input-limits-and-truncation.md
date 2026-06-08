---
id: retrieval-embedding-input-limits-and-truncation
title: 'Retrieval Embedding Input Limits and Truncation'
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
  - id: fact-ai-retrieval-embedding-input-limits-and-truncation-1
    statement: >-
      Cohere Embed API documentation includes a truncate parameter for handling
      inputs longer than the maximum token length.
    source_title: Cohere Embed API
    source_url: https://docs.cohere.com/v2/reference/embed
    confidence: medium
  - id: fact-ai-retrieval-embedding-input-limits-and-truncation-2
    statement: >-
      Vertex AI text embeddings API documentation includes an autoTruncate
      parameter in the request.
    source_title: Vertex AI Text Embeddings API
    source_url: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings-api
    confidence: medium
  - id: fact-ai-retrieval-embedding-input-limits-and-truncation-3
    statement: >-
      Voyage AI embeddings API documentation describes input token limits and a
      truncation option for embedding requests.
    source_title: Voyage AI Embeddings API
    source_url: https://docs.voyageai.com/reference/embeddings-api
    confidence: medium
completeness: 0.84
known_gaps:
  - Embedding input behavior varies by model, tokenizer, provider, batch size, truncation side, error mode, billing unit, and whether the request embeds queries or documents.
  - Silent truncation can remove the exact evidence an agent later cites, so ingestion pipelines need chunk boundaries and truncation metadata.
disputed_statements: []
primary_sources:
  - title: Cohere Embed API
    type: documentation
    year: 2026
    url: https://docs.cohere.com/v2/reference/embed
    institution: Cohere
  - title: Vertex AI Text Embeddings API
    type: documentation
    year: 2026
    url: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings-api
    institution: Google Cloud
  - title: Voyage AI Embeddings API
    type: documentation
    year: 2026
    url: https://docs.voyageai.com/reference/embeddings-api
    institution: Voyage AI
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Embedding input limits and truncation policies affect what text reaches a vector index, so agents need chunk and truncation metadata before judging retrieval quality.

## Core Explanation

Embedding models do not accept infinite text. Providers define model-specific input limits, batching limits, token accounting, and truncation or error behavior. If an ingestion pipeline silently truncates long chunks, a retrieval result can look relevant while missing the paragraph, table, or legal clause that mattered.

Useful evidence includes embedding model, tokenizer, input type, chunk text length, token count, batch size, truncation setting, truncation side, provider response metadata, chunk ID, source offset, and whether the pipeline failed or shortened over-limit inputs. This evidence helps agents distinguish poor retrieval from text that was never embedded.

Agents should not only ask whether a vector exists. They should ask which source span was embedded, whether any text was dropped, and whether query and document embeddings used compatible limits and input-type settings.

## Source-Mapped Facts

- Cohere Embed API documentation includes a truncate parameter for handling inputs longer than the maximum token length. ([source](https://docs.cohere.com/v2/reference/embed))
- Vertex AI text embeddings API documentation includes an autoTruncate parameter in the request. ([source](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings-api))
- Voyage AI embeddings API documentation describes input token limits and a truncation option for embedding requests. ([source](https://docs.voyageai.com/reference/embeddings-api))

## Further Reading

- [Cohere Embed API](https://docs.cohere.com/v2/reference/embed)
- [Vertex AI Text Embeddings API](https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/text-embeddings-api)
- [Voyage AI Embeddings API](https://docs.voyageai.com/reference/embeddings-api)
