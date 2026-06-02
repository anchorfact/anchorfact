---
id: llm-evaluation-assertions-and-test-cases
title: 'LLM Evaluation Assertions and Test Cases'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-03'
created_date: '2026-06-03'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-llm-evaluation-assertions-and-test-cases-1
    statement: >-
      Promptfoo documentation says assertions compare LLM output against expected values or
      conditions.
    source_title: Promptfoo Assertions and Metrics
    source_url: https://www.promptfoo.dev/docs/configuration/expected-outputs/
    confidence: medium
  - id: fact-ai-llm-evaluation-assertions-and-test-cases-2
    statement: >-
      Promptfoo documentation says a test case can include an assert property containing an array
      of assertion objects.
    source_title: Promptfoo Assertions and Metrics
    source_url: https://www.promptfoo.dev/docs/configuration/expected-outputs/
    confidence: medium
  - id: fact-ai-llm-evaluation-assertions-and-test-cases-3
    statement: >-
      Ragas documentation provides available metrics for evaluating LLM and RAG systems.
    source_title: Ragas Available Metrics
    source_url: https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/
    confidence: medium
completeness: 0.8
known_gaps:
  - Eval assertion quality depends on dataset representativeness, rubric drift, judge calibration, deterministic checks, model-assisted scoring, and whether failures are triaged by slice.
disputed_statements: []
primary_sources:
  - title: Promptfoo Assertions and Metrics
    type: documentation
    year: 2026
    url: https://www.promptfoo.dev/docs/configuration/expected-outputs/
    institution: Promptfoo
  - title: Ragas Available Metrics
    type: documentation
    year: 2026
    url: https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/
    institution: Ragas
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

LLM evaluation test cases need explicit inputs, expected behavior, assertions, thresholds, and metrics so failures can be reproduced and repaired.

## Core Explanation

An eval case is more than a prompt. It records the variables, expected output or rubric, assertion type, threshold, metric name, and sometimes a custom scoring function. Deterministic assertions catch schema, substring, regex, refusal, and latency failures; model-assisted metrics can grade relevance, faithfulness, factuality, or trajectory behavior.

Agents should read eval definitions before changing prompts or tools. A failing assertion usually tells which contract broke, while an aggregate score alone often hides the failing behavior.

## Source-Mapped Facts

- Promptfoo documentation says assertions compare LLM output against expected values or conditions. ([source](https://www.promptfoo.dev/docs/configuration/expected-outputs/))
- Promptfoo documentation says a test case can include an assert property containing an array of assertion objects. ([source](https://www.promptfoo.dev/docs/configuration/expected-outputs/))
- Ragas documentation provides available metrics for evaluating LLM and RAG systems. ([source](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/))

## Further Reading

- [Promptfoo Assertions and Metrics](https://www.promptfoo.dev/docs/configuration/expected-outputs/)
- [Ragas Available Metrics](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/)
