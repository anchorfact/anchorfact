---
id: agent-trajectory-evaluation-and-step-level-traces
title: 'Agent Trajectory Evaluation and Step-Level Traces'
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
  - id: fact-ai-agent-trajectory-evaluation-and-step-level-traces-1
    statement: >-
      LangChain documentation says agent evals can assess an execution trajectory, including the
      sequence of messages and tool calls.
    source_title: LangChain Agent Evals
    source_url: https://docs.langchain.com/oss/python/langchain/evals
    confidence: medium
  - id: fact-ai-agent-trajectory-evaluation-and-step-level-traces-2
    statement: >-
      LangSmith documentation describes trajectory evaluation as checking whether an agent took the
      expected path of tool calls to reach an answer.
    source_title: LangSmith Evaluation Approaches
    source_url: https://docs.langchain.com/langsmith/evaluation-approaches
    confidence: medium
  - id: fact-ai-agent-trajectory-evaluation-and-step-level-traces-3
    statement: >-
      OpenTelemetry trace API documentation says each trace contains a root span and optional
      sub-spans for sub-operations.
    source_title: OpenTelemetry Trace API
    source_url: https://opentelemetry.io/docs/specs/otel/trace/api
    confidence: medium
completeness: 0.83
known_gaps:
  - Step-level evaluation depends on trace completeness, tool argument capture, privacy redaction, deterministic replay, reference trajectories, and whether reasoning text is available or intentionally hidden.
disputed_statements: []
primary_sources:
  - title: LangChain Agent Evals
    type: documentation
    year: 2026
    url: https://docs.langchain.com/oss/python/langchain/evals
    institution: LangChain
  - title: LangSmith Evaluation Approaches
    type: documentation
    year: 2026
    url: https://docs.langchain.com/langsmith/evaluation-approaches
    institution: LangChain
  - title: OpenTelemetry Trace API
    type: standard
    year: 2026
    url: https://opentelemetry.io/docs/specs/otel/trace/api
    institution: OpenTelemetry
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Trajectory evaluation checks what an agent did step by step, not only whether the final answer looked correct.

## Core Explanation

Tool-using agents can arrive at a plausible answer through an unsafe or brittle path. Step-level traces expose model messages, tool calls, tool arguments, tool results, retries, and branch decisions so evaluators can detect process regressions.

Trajectory tests are useful when a final-output metric hides failures such as skipped retrieval, wrong tool selection, stale cache use, or unnecessary write actions. Agents should retain trace IDs and source IDs so failed steps can be replayed or inspected.

## Source-Mapped Facts

- LangChain documentation says agent evals can assess an execution trajectory, including the sequence of messages and tool calls. ([source](https://docs.langchain.com/oss/python/langchain/evals))
- LangSmith documentation describes trajectory evaluation as checking whether an agent took the expected path of tool calls to reach an answer. ([source](https://docs.langchain.com/langsmith/evaluation-approaches))
- OpenTelemetry trace API documentation says each trace contains a root span and optional sub-spans for sub-operations. ([source](https://opentelemetry.io/docs/specs/otel/trace/api))

## Further Reading

- [LangChain Agent Evals](https://docs.langchain.com/oss/python/langchain/evals)
- [LangSmith Evaluation Approaches](https://docs.langchain.com/langsmith/evaluation-approaches)
- [OpenTelemetry Trace API](https://opentelemetry.io/docs/specs/otel/trace/api)
