---
id: agent-observability-and-tracing
title: 'Agent Observability and Tracing'
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
  - id: fact-agent-observability-and-tracing-1
    statement: >-
      OpenAI Agents SDK tracing documentation says tracing collects a record of events during an agent run, including LLM generations, tool calls, handoffs, guardrails, and custom events.
    source_title: Tracing - OpenAI Agents SDK
    source_url: https://openai.github.io/openai-agents-python/tracing/
  - id: fact-agent-observability-and-tracing-2
    statement: >-
      OpenTelemetry describes traces as records of the paths taken by requests as they propagate through multi-service architectures.
    source_title: Traces
    source_url: https://opentelemetry.io/docs/concepts/signals/traces/
  - id: fact-agent-observability-and-tracing-3
    statement: >-
      OpenTelemetry generative AI semantic conventions define span conventions for generative AI client operations.
    source_title: Semantic conventions for generative client AI spans
    source_url: https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/
completeness: 0.84
known_gaps:
  - Provider-specific trace schemas and data-retention defaults can change and require current vendor checks.
disputed_statements: []
primary_sources:
  - title: Tracing - OpenAI Agents SDK
    type: documentation
    year: 2026
    url: https://openai.github.io/openai-agents-python/tracing/
    institution: OpenAI
  - title: Traces
    type: documentation
    year: 2026
    url: https://opentelemetry.io/docs/concepts/signals/traces/
    institution: OpenTelemetry
  - title: Semantic conventions for generative client AI spans
    type: specification
    year: 2026
    url: https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/
    institution: OpenTelemetry
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Agent observability is the practice of recording what an agent did, which model calls it made, which tools it invoked, which guardrails or handoffs ran, and how each step contributed to the final answer.

## Core Explanation

Tracing turns an agent run into a structured execution record. For agent engineering, this is useful for debugging tool failures, measuring latency and cost, reviewing safety decisions, reproducing bad answers, and comparing evaluation runs. OpenTelemetry provides a general trace model, while agent and GenAI conventions add AI-specific span metadata.

## Source-Mapped Facts

- OpenAI Agents SDK tracing documentation says tracing collects a record of events during an agent run, including LLM generations, tool calls, handoffs, guardrails, and custom events. ([source](https://openai.github.io/openai-agents-python/tracing/))
- OpenTelemetry describes traces as records of the paths taken by requests as they propagate through multi-service architectures. ([source](https://opentelemetry.io/docs/concepts/signals/traces/))
- OpenTelemetry generative AI semantic conventions define span conventions for generative AI client operations. ([source](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/))

## Further Reading

- [OpenAI Agents SDK tracing](https://openai.github.io/openai-agents-python/tracing/)
- [OpenTelemetry traces](https://opentelemetry.io/docs/concepts/signals/traces/)
- [OpenTelemetry GenAI spans](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/)
