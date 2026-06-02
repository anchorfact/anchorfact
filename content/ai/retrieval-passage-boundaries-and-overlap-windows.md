---
id: retrieval-passage-boundaries-and-overlap-windows
title: 'Retrieval Passage Boundaries and Overlap Windows'
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
  - id: fact-ai-retrieval-passage-boundaries-and-overlap-windows-1
    statement: >-
      LangChain documentation describes RecursiveCharacterTextSplitter as trying separators in
      order until chunks are small enough.
    source_title: LangChain Recursive Text Splitter
    source_url: https://docs.langchain.com/oss/python/integrations/splitters/recursive_text_splitter
    confidence: medium
  - id: fact-ai-retrieval-passage-boundaries-and-overlap-windows-2
    statement: >-
      LlamaIndex documentation describes node parsers as tools for parsing documents into Node
      objects.
    source_title: LlamaIndex Node Parser Usage Pattern
    source_url: https://developers.llamaindex.ai/python/framework/module_guides/loading/node_parsers/
    confidence: medium
  - id: fact-ai-retrieval-passage-boundaries-and-overlap-windows-3
    statement: >-
      Haystack DocumentSplitter documentation describes splitting documents by split_by after
      split_length units with an overlap of split_overlap units.
    source_title: Haystack DocumentSplitter
    source_url: https://docs.haystack.deepset.ai/docs/documentsplitter
    confidence: medium
completeness: 0.83
known_gaps:
  - Optimal chunk boundaries depend on document structure, language, tokenizer, retriever, reranker, citation granularity, context window size, and task-specific recall tests.
disputed_statements: []
primary_sources:
  - title: LangChain Recursive Text Splitter
    type: documentation
    year: 2026
    url: https://docs.langchain.com/oss/python/integrations/splitters/recursive_text_splitter
    institution: LangChain
  - title: LlamaIndex Node Parser Usage Pattern
    type: documentation
    year: 2026
    url: https://developers.llamaindex.ai/python/framework/module_guides/loading/node_parsers/
    institution: LlamaIndex
  - title: Haystack DocumentSplitter
    type: documentation
    year: 2026
    url: https://docs.haystack.deepset.ai/docs/documentsplitter
    institution: deepset Haystack
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Passage boundaries and overlap windows determine whether retrieval returns a complete answer span or a fragment split away from its context.

## Core Explanation

RAG systems rarely retrieve whole documents. They index passages, nodes, or chunks, and the split strategy controls the semantic unit visible to the retriever. Overlap can preserve answer context at chunk edges, but it also increases index size, duplicate hits, and citation ambiguity.

Agents should inspect chunk size, overlap, separator order, parent document IDs, start offsets, metadata inheritance, and recall failures before changing embedding models or rerankers.

## Source-Mapped Facts

- LangChain documentation describes RecursiveCharacterTextSplitter as trying separators in order until chunks are small enough. ([source](https://docs.langchain.com/oss/python/integrations/splitters/recursive_text_splitter))
- LlamaIndex documentation describes node parsers as tools for parsing documents into Node objects. ([source](https://developers.llamaindex.ai/python/framework/module_guides/loading/node_parsers/))
- Haystack DocumentSplitter documentation describes splitting documents by split_by after split_length units with an overlap of split_overlap units. ([source](https://docs.haystack.deepset.ai/docs/documentsplitter))

## Further Reading

- [LangChain Recursive Text Splitter](https://docs.langchain.com/oss/python/integrations/splitters/recursive_text_splitter)
- [LlamaIndex Node Parser Usage Pattern](https://developers.llamaindex.ai/python/framework/module_guides/loading/node_parsers/)
- [Haystack DocumentSplitter](https://docs.haystack.deepset.ai/docs/documentsplitter)
