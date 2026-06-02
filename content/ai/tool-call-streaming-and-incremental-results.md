---
id: tool-call-streaming-and-incremental-results
title: 'Tool Call Streaming and Incremental Results'
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
  - id: fact-ai-tool-call-streaming-and-incremental-results-1
    statement: >-
      OpenAI streaming documentation says streaming lets applications receive model output as it is
      generated instead of waiting for the complete response.
    source_title: OpenAI Streaming API Responses
    source_url: https://developers.openai.com/api/docs/guides/streaming-responses
    confidence: medium
  - id: fact-ai-tool-call-streaming-and-incremental-results-2
    statement: >-
      Model Context Protocol progress documentation defines progress notifications for long-running
      operations that include a progress token and progress value.
    source_title: MCP Progress
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/progress
    confidence: medium
  - id: fact-ai-tool-call-streaming-and-incremental-results-3
    statement: >-
      Anthropic streaming documentation says message streams include events such as message_start,
      content_block_delta, and message_stop.
    source_title: Anthropic Streaming Messages
    source_url: https://platform.claude.com/docs/en/build-with-claude/streaming
    confidence: medium
completeness: 0.83
known_gaps:
  - Event names, streaming transports, and partial tool-call formats vary by model provider and API version.
disputed_statements: []
primary_sources:
  - title: OpenAI Streaming API Responses
    type: documentation
    year: 2026
    url: https://developers.openai.com/api/docs/guides/streaming-responses
    institution: OpenAI
  - title: MCP Progress
    type: specification
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/progress
    institution: Model Context Protocol
  - title: Anthropic Streaming Messages
    type: documentation
    year: 2026
    url: https://platform.claude.com/docs/en/build-with-claude/streaming
    institution: Anthropic
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Tool-call streaming lets an agent expose partial model output, progress updates, and long-running operation status instead of presenting every task as a silent blocking call.

## Core Explanation

Streaming matters for agent engineering because tool loops often combine model output, retrieval, browser actions, shell commands, and remote APIs. Without incremental state, users and supervising systems cannot distinguish a slow task from a stuck task.

A robust streaming design separates user-visible text deltas from machine-readable events. It also records progress tokens, operation IDs, and terminal states so callers can resume, cancel, audit, or retry work without confusing partial output for final evidence.

## Source-Mapped Facts

- OpenAI streaming documentation says streaming lets applications receive model output as it is generated instead of waiting for the complete response. ([source](https://developers.openai.com/api/docs/guides/streaming-responses))
- Model Context Protocol progress documentation defines progress notifications for long-running operations that include a progress token and progress value. ([source](https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/progress))
- Anthropic streaming documentation says message streams include events such as message_start, content_block_delta, and message_stop. ([source](https://platform.claude.com/docs/en/build-with-claude/streaming))

## Further Reading

- [OpenAI Streaming API Responses](https://developers.openai.com/api/docs/guides/streaming-responses)
- [MCP Progress](https://modelcontextprotocol.io/specification/2025-06-18/basic/utilities/progress)
- [Anthropic Streaming Messages](https://platform.claude.com/docs/en/build-with-claude/streaming)
