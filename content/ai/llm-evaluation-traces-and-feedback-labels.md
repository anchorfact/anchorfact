---
id: llm-evaluation-traces-and-feedback-labels
title: 'LLM Evaluation Traces and Feedback Labels'
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
  - id: fact-ai-llm-evaluation-traces-and-feedback-labels-1
    statement: >-
      OpenTelemetry documentation defines semantic conventions for generative AI operations.
    source_title: OpenTelemetry Generative AI Semantic Conventions
    source_url: https://opentelemetry.io/docs/specs/semconv/gen-ai/
    confidence: medium
  - id: fact-ai-llm-evaluation-traces-and-feedback-labels-2
    statement: >-
      LangSmith documentation describes observability workflows for tracing LLM applications.
    source_title: LangSmith Observability Quickstart
    source_url: https://docs.langchain.com/langsmith/observability-quickstart
    confidence: medium
  - id: fact-ai-llm-evaluation-traces-and-feedback-labels-3
    statement: >-
      Phoenix documentation describes LLM traces as a way to inspect application spans and calls.
    source_title: Phoenix LLM Traces
    source_url: https://arize.com/docs/phoenix/tracing/llm-traces
    confidence: medium
completeness: 0.82
known_gaps:
  - Trace sampling and feedback labels can be biased by traffic mix, privacy filtering, and reviewer instructions.
disputed_statements: []
primary_sources:
  - title: OpenTelemetry Generative AI Semantic Conventions
    type: documentation
    year: 2026
    url: https://opentelemetry.io/docs/specs/semconv/gen-ai/
    institution: OpenTelemetry
  - title: LangSmith Observability Quickstart
    type: documentation
    year: 2026
    url: https://docs.langchain.com/langsmith/observability-quickstart
    institution: LangSmith
  - title: Phoenix LLM Traces
    type: documentation
    year: 2026
    url: https://arize.com/docs/phoenix/tracing/llm-traces
    institution: Arize Phoenix
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

LLM traces and feedback labels connect evaluation results to the exact prompt, tools, retrieved context, and model response that produced them.

## Core Explanation

Aggregate pass rates hide the path a request took through an LLM application. Traces show model calls, tool calls, retrieved documents, latency, token use, and errors. Feedback labels attach human or automated judgments to those traces.

Agents should preserve trace identifiers when summarizing eval failures. Without trace-level evidence, it is hard to know whether a failure came from retrieval, prompt construction, tool execution, model behavior, or a downstream policy check.

## Source-Mapped Facts

- OpenTelemetry documentation defines semantic conventions for generative AI operations. ([source](https://opentelemetry.io/docs/specs/semconv/gen-ai/))
- LangSmith documentation describes observability workflows for tracing LLM applications. ([source](https://docs.langchain.com/langsmith/observability-quickstart))
- Phoenix documentation describes LLM traces as a way to inspect application spans and calls. ([source](https://arize.com/docs/phoenix/tracing/llm-traces))

## Further Reading

- [OpenTelemetry Generative AI Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/)
- [LangSmith Observability Quickstart](https://docs.langchain.com/langsmith/observability-quickstart)
- [Phoenix LLM Traces](https://arize.com/docs/phoenix/tracing/llm-traces)
