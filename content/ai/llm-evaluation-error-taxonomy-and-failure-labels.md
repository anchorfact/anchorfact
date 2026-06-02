---
id: llm-evaluation-error-taxonomy-and-failure-labels
title: 'LLM Evaluation Error Taxonomy and Failure Labels'
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
  - id: fact-ai-llm-evaluation-error-taxonomy-and-failure-labels-1
    statement: >-
      LangSmith documentation describes evaluators as scoring application outputs over datasets.
    source_title: LangSmith Evaluation Concepts
    source_url: https://docs.langchain.com/langsmith/evaluation-concepts
    confidence: medium
  - id: fact-ai-llm-evaluation-error-taxonomy-and-failure-labels-2
    statement: >-
      Ragas documentation describes available metrics for evaluating RAG and LLM applications.
    source_title: Ragas Available Metrics
    source_url: https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/
    confidence: medium
  - id: fact-ai-llm-evaluation-error-taxonomy-and-failure-labels-3
    statement: >-
      Arize AX documentation describes human review workflows for evaluating model outputs.
    source_title: Arize AX Human Review
    source_url: https://arize.com/docs/ax/evaluate
    confidence: medium
completeness: 0.82
known_gaps:
  - Failure labels need task-specific definitions, reviewer calibration, sampling policy, disagreement handling, and versioned mappings to product severity.
disputed_statements: []
primary_sources:
  - title: LangSmith Evaluation Concepts
    type: documentation
    year: 2026
    url: https://docs.langchain.com/langsmith/evaluation-concepts
    institution: LangChain
  - title: Ragas Available Metrics
    type: documentation
    year: 2026
    url: https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/
    institution: Ragas
  - title: Arize AX Human Review
    type: documentation
    year: 2026
    url: https://arize.com/docs/ax/evaluate
    institution: Arize
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

LLM evaluation failure labels turn raw examples into debuggable patterns such as retrieval miss, unsupported claim, unsafe answer, format error, or tool misuse.

## Core Explanation

A pass rate is not enough to improve an LLM system. Teams need an error taxonomy that separates failure types, affected slices, severity, and likely ownership. That lets agents route fixes toward retrieval, prompting, tool schemas, model choice, safety policy, or product requirements.

Agents should preserve example IDs, labels, reviewer notes, evaluator versions, and severity mappings. Without stable labels, a regression dashboard can show that quality dropped without explaining what changed.

## Source-Mapped Facts

- LangSmith documentation describes evaluators as scoring application outputs over datasets. ([source](https://docs.langchain.com/langsmith/evaluation-concepts))
- Ragas documentation describes available metrics for evaluating RAG and LLM applications. ([source](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/))
- Arize AX documentation describes human review workflows for evaluating model outputs. ([source](https://arize.com/docs/ax/evaluate))

## Further Reading

- [LangSmith Evaluation Concepts](https://docs.langchain.com/langsmith/evaluation-concepts)
- [Ragas Available Metrics](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/)
- [Arize AX Human Review](https://arize.com/docs/ax/evaluate)
