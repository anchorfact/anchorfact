---
id: agent-human-in-the-loop-approval
title: 'Agent Human-in-the-Loop Approval'
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
  - id: fact-agent-human-in-the-loop-approval-1
    statement: >-
      LangGraph documentation describes interrupts as a way to pause graph execution, surface information to a user, and later resume execution from saved state.
    source_title: LangGraph Interrupts
    source_url: https://docs.langchain.com/oss/python/langgraph/interrupts
  - id: fact-agent-human-in-the-loop-approval-2
    statement: >-
      The Model Context Protocol elicitation specification defines a client capability that lets servers request additional user information during an interaction.
    source_title: Elicitation - Model Context Protocol
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/client/elicitation
  - id: fact-agent-human-in-the-loop-approval-3
    statement: >-
      OpenAI Agents SDK guardrails documentation describes input and output guardrails that can run checks around agent execution.
    source_title: Guardrails - OpenAI Agents SDK
    source_url: https://openai.github.io/openai-agents-python/guardrails/
completeness: 0.83
known_gaps:
  - Approval UX, audit requirements, and escalation policy depend on the application risk class.
disputed_statements: []
primary_sources:
  - title: LangGraph Interrupts
    type: documentation
    year: 2026
    url: https://docs.langchain.com/oss/python/langgraph/interrupts
    institution: LangChain
  - title: Elicitation - Model Context Protocol
    type: specification
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18/client/elicitation
    institution: Model Context Protocol
  - title: Guardrails - OpenAI Agents SDK
    type: documentation
    year: 2026
    url: https://openai.github.io/openai-agents-python/guardrails/
    institution: OpenAI
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Agent human-in-the-loop approval is the runtime pattern of pausing an automated workflow so a person can review context, provide missing information, or authorize a risky next action.

## Core Explanation

Approval is not just a modal prompt. Production agents need durable pause and resume semantics, enough context for a reviewer to make a decision, clear consequences for each option, and audit records that connect the approval to the subsequent tool call or state transition.

Useful approval boundaries include external side effects, permission escalation, irreversible writes, access to sensitive records, and low-confidence plans. The agent can propose an action, but the runtime owns the checkpoint, authorization, and resume behavior.

## Source-Mapped Facts

- LangGraph documentation describes interrupts as a way to pause graph execution, surface information to a user, and later resume execution from saved state. ([source](https://docs.langchain.com/oss/python/langgraph/interrupts))
- The Model Context Protocol elicitation specification defines a client capability that lets servers request additional user information during an interaction. ([source](https://modelcontextprotocol.io/specification/2025-06-18/client/elicitation))
- OpenAI Agents SDK guardrails documentation describes input and output guardrails that can run checks around agent execution. ([source](https://openai.github.io/openai-agents-python/guardrails/))

## Further Reading

- [LangGraph interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts)
- [MCP elicitation](https://modelcontextprotocol.io/specification/2025-06-18/client/elicitation)
- [OpenAI Agents SDK guardrails](https://openai.github.io/openai-agents-python/guardrails/)
