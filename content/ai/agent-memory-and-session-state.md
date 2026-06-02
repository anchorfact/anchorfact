---
id: agent-memory-and-session-state
title: 'Agent Memory and Session State'
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
  - id: fact-ai-agent-memory-and-session-state-1
    statement: >-
      OpenAI Agents SDK documentation says sessions give the SDK a persistent memory layer and
      allow a runner to fetch previous conversation items before the next turn.
    source_title: OpenAI Agents SDK Sessions
    source_url: https://openai.github.io/openai-agents-js/guides/sessions/
    confidence: medium
  - id: fact-ai-agent-memory-and-session-state-2
    statement: >-
      OpenAI Agents SDK documentation says sessions persist new user input and assistant output
      after each run completes.
    source_title: OpenAI Agents SDK Sessions
    source_url: https://openai.github.io/openai-agents-js/guides/sessions/
    confidence: medium
  - id: fact-ai-agent-memory-and-session-state-3
    statement: >-
      OpenAI Agents SDK documentation says developers can implement the Session interface to back
      memory with storage such as Redis, DynamoDB, SQLite, or another datastore.
    source_title: OpenAI Agents SDK Sessions
    source_url: https://openai.github.io/openai-agents-js/guides/sessions/
    confidence: medium
  - id: fact-ai-agent-memory-and-session-state-4
    statement: >-
      OpenAI sandbox agent memory documentation says memory reads should be treated as guidance and
      the current environment should be trusted when memory is stale.
    source_title: OpenAI Agents SDK Sandbox Memory
    source_url: https://openai.github.io/openai-agents-js/guides/sandbox-agents/memory/
    confidence: medium
completeness: 0.83
known_gaps:
  - This article covers SDK-level memory concepts, not consumer product memory controls or retention policies.
  - Privacy, deletion, tenant isolation, and compliance behavior must be verified for a specific deployed system.
disputed_statements: []
primary_sources:
  - title: OpenAI Agents SDK Sessions
    type: documentation
    year: 2026
    url: https://openai.github.io/openai-agents-js/guides/sessions/
    institution: OpenAI
  - title: OpenAI Agents SDK Sandbox Memory
    type: documentation
    year: 2026
    url: https://openai.github.io/openai-agents-js/guides/sandbox-agents/memory/
    institution: OpenAI
  - title: Model Context Protocol Tools Specification
    type: standard
    year: 2024
    url: https://modelcontextprotocol.io/specification/2024-11-05/server/tools
    institution: Model Context Protocol
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Agent memory is the stored context an agent can reuse across turns or runs; session state is the runtime mechanism that binds a conversation, tool loop, or resumable run to that stored context.

## Core Explanation

Agent memory should be designed as an explicit state contract. A session can replay recent conversation items, persist newly generated items, or resume an interrupted run. Longer-term memory needs stronger governance because it can influence future behavior after the original turn has ended.

The practical boundary is simple: current task context should override stale memory, and storage backends should be chosen deliberately for durability, inspection, deletion, and tenant isolation.

## Source-Mapped Facts

- OpenAI Agents SDK documentation says sessions give the SDK a persistent memory layer and allow a runner to fetch previous conversation items before the next turn. ([source](https://openai.github.io/openai-agents-js/guides/sessions/))
- OpenAI Agents SDK documentation says sessions persist new user input and assistant output after each run completes. ([source](https://openai.github.io/openai-agents-js/guides/sessions/))
- OpenAI Agents SDK documentation says developers can implement the Session interface to back memory with storage such as Redis, DynamoDB, SQLite, or another datastore. ([source](https://openai.github.io/openai-agents-js/guides/sessions/))
- OpenAI sandbox agent memory documentation says memory reads should be treated as guidance and the current environment should be trusted when memory is stale. ([source](https://openai.github.io/openai-agents-js/guides/sandbox-agents/memory/))

## Further Reading

- [OpenAI Agents SDK Sessions](https://openai.github.io/openai-agents-js/guides/sessions/)
- [OpenAI Agents SDK Sandbox Memory](https://openai.github.io/openai-agents-js/guides/sandbox-agents/memory/)
- [Model Context Protocol Tools Specification](https://modelcontextprotocol.io/specification/2024-11-05/server/tools)
