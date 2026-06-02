---
id: agent-context-compaction-and-summarization
title: 'Agent Context Compaction and Summarization'
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
  - id: fact-ai-agent-context-compaction-and-summarization-1
    statement: >-
      LangGraph documentation says long conversations can exceed an LLM context window and lists
      summarizing earlier messages as one memory management option.
    source_title: LangGraph Add Memory
    source_url: https://docs.langchain.com/oss/javascript/langgraph/add-memory
    confidence: medium
  - id: fact-ai-agent-context-compaction-and-summarization-2
    statement: >-
      LangChain documentation describes short-term memory as thread-scoped state that can include
      conversation history.
    source_title: LangChain Short-Term Memory
    source_url: https://docs.langchain.com/oss/python/langchain/short-term-memory
    confidence: medium
  - id: fact-ai-agent-context-compaction-and-summarization-3
    statement: >-
      LangMem documentation defines a SummarizationNode for maintaining a running summary.
    source_title: LangMem Short-Term Memory API
    source_url: https://langchain-ai.github.io/langmem/reference/short_term/
    confidence: medium
completeness: 0.83
known_gaps:
  - Context compaction quality depends on what is preserved, what is dropped, whether tool results are summarized safely, and whether the original transcript remains available for audit or replay.
disputed_statements: []
primary_sources:
  - title: LangGraph Add Memory
    type: documentation
    year: 2026
    url: https://docs.langchain.com/oss/javascript/langgraph/add-memory
    institution: LangChain
  - title: LangChain Short-Term Memory
    type: documentation
    year: 2026
    url: https://docs.langchain.com/oss/python/langchain/short-term-memory
    institution: LangChain
  - title: LangMem Short-Term Memory API
    type: documentation
    year: 2026
    url: https://langchain-ai.github.io/langmem/reference/short_term/
    institution: LangChain
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Context compaction lets agents keep long-running sessions usable by replacing older turns with summaries or trimmed state.

## Core Explanation

Agent sessions can outgrow a model context window when they accumulate user turns, tool calls, tool results, plans, and intermediate notes. Compaction is the control layer that decides which state remains verbatim, which state is summarized, and which state should be retrieved from durable memory only when needed.

Good compaction keeps recent instructions, open tasks, constraints, unresolved errors, and source references visible. Agents should preserve raw transcripts or trace IDs outside the prompt so summarized state can be audited later.

## Source-Mapped Facts

- LangGraph documentation says long conversations can exceed an LLM context window and lists summarizing earlier messages as one memory management option. ([source](https://docs.langchain.com/oss/javascript/langgraph/add-memory))
- LangChain documentation describes short-term memory as thread-scoped state that can include conversation history. ([source](https://docs.langchain.com/oss/python/langchain/short-term-memory))
- LangMem documentation defines a SummarizationNode for maintaining a running summary. ([source](https://langchain-ai.github.io/langmem/reference/short_term/))

## Further Reading

- [LangGraph Add Memory](https://docs.langchain.com/oss/javascript/langgraph/add-memory)
- [LangChain Short-Term Memory](https://docs.langchain.com/oss/python/langchain/short-term-memory)
- [LangMem Short-Term Memory API](https://langchain-ai.github.io/langmem/reference/short_term/)
