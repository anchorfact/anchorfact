---
id: agent-parallel-tool-calls-and-dependency-ordering
title: 'Agent Parallel Tool Calls and Dependency Ordering'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-07'
created_date: '2026-06-07'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-agent-parallel-tool-calls-and-dependency-ordering-1
    statement: >-
      OpenAI function calling documentation says model responses can include zero, one, or
      multiple function calls, and applications should handle several tool calls.
    source_title: OpenAI Function Calling
    source_url: https://platform.openai.com/docs/guides/function-calling
    confidence: medium
  - id: fact-ai-agent-parallel-tool-calls-and-dependency-ordering-2
    statement: >-
      OpenAI function calling documentation says setting parallel_tool_calls to false prevents
      multiple tool calls in a single turn.
    source_title: OpenAI Function Calling
    source_url: https://platform.openai.com/docs/guides/function-calling
    confidence: medium
  - id: fact-ai-agent-parallel-tool-calls-and-dependency-ordering-3
    statement: >-
      Anthropic tool-use documentation describes disable_parallel_tool_use as a control for
      preventing parallel tool use under supported tool_choice modes.
    source_title: Anthropic Tool Use
    source_url: https://platform.claude.com/docs/en/agents-and-tools/tool-use/implement-tool-use
    confidence: medium
completeness: 0.82
known_gaps:
  - Provider behavior can vary by model, API mode, tool type, and fine-tuning or reasoning settings.
  - This article does not define a scheduler implementation for arbitrary DAG-shaped tool plans.
disputed_statements: []
primary_sources:
  - title: OpenAI Function Calling
    type: documentation
    year: 2026
    url: https://platform.openai.com/docs/guides/function-calling
    institution: OpenAI
  - title: OpenAI Chat Completions API Reference
    type: documentation
    year: 2026
    url: https://platform.openai.com/docs/api-reference/chat/create
    institution: OpenAI
  - title: Anthropic Tool Use
    type: documentation
    year: 2026
    url: https://platform.claude.com/docs/en/agents-and-tools/tool-use/implement-tool-use
    institution: Anthropic
secondary_sources: []
updated: '2026-06-07'
ai_models:
  - gpt-5-codex
---

## TL;DR

Parallel tool calls are safe only when the calls are independent, their side effects are bounded, and their results can be joined without hidden ordering assumptions.

## Core Explanation

Tool parallelism reduces latency for independent reads such as fetching several documents or checking several status endpoints. It is risky when one call depends on another call's output, mutates shared state, consumes a scarce quota, or changes the world.

Agents should classify each tool call as independent read, dependent read, idempotent write, or non-idempotent write. Independent reads can usually run together; dependent calls need explicit ordering; writes need idempotency, locking, or human approval before parallel execution.

## Source-Mapped Facts

- OpenAI function calling documentation says model responses can include zero, one, or multiple function calls, and applications should handle several tool calls. ([source](https://platform.openai.com/docs/guides/function-calling))
- OpenAI function calling documentation says setting parallel_tool_calls to false prevents multiple tool calls in a single turn. ([source](https://platform.openai.com/docs/guides/function-calling))
- Anthropic tool-use documentation describes disable_parallel_tool_use as a control for preventing parallel tool use under supported tool_choice modes. ([source](https://platform.claude.com/docs/en/agents-and-tools/tool-use/implement-tool-use))

## Further Reading

- [OpenAI Function Calling](https://platform.openai.com/docs/guides/function-calling)
- [OpenAI Chat Completions API Reference](https://platform.openai.com/docs/api-reference/chat/create)
- [Anthropic Tool Use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/implement-tool-use)
