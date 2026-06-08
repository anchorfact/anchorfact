---
id: llm-evaluation-evidence-attribution-and-citation-grading
title: 'LLM Evaluation Evidence Attribution and Citation Grading'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-09'
created_date: '2026-06-09'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-llm-evaluation-evidence-attribution-and-citation-grading-1
    statement: >-
      Ragas documentation describes faithfulness as measuring factual consistency between
      a response and the retrieved context.
    source_title: Ragas Faithfulness Metric
    source_url: https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/
    confidence: medium
  - id: fact-ai-llm-evaluation-evidence-attribution-and-citation-grading-2
    statement: >-
      Ragas documentation says context precision evaluates whether relevant chunks are
      ranked higher than irrelevant chunks in retrieved context.
    source_title: Ragas Context Precision Metric
    source_url: https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_precision/
    confidence: medium
  - id: fact-ai-llm-evaluation-evidence-attribution-and-citation-grading-3
    statement: >-
      OpenAI Evals documentation describes Evals as a framework for evaluating LLMs or
      systems built using LLMs, with a registry and custom eval capability.
    source_title: OpenAI Evals
    source_url: https://github.com/openai/evals
    confidence: medium
completeness: 0.84
known_gaps:
  - Citation quality also depends on source access, span boundaries, quote fidelity, retrieval recall, and whether the answer cites enough evidence for every material claim.
  - Model-graded citation metrics require calibration against human review before they are used as release gates.
disputed_statements: []
primary_sources:
  - title: Ragas Faithfulness Metric
    type: documentation
    year: 2026
    url: https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/
    institution: Ragas
  - title: Ragas Context Precision Metric
    type: documentation
    year: 2026
    url: https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_precision/
    institution: Ragas
  - title: OpenAI Evals
    type: software_repository
    year: 2026
    url: https://github.com/openai/evals
    institution: OpenAI
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Evidence attribution grading checks whether an LLM answer cites the right sources, whether its claims are supported, and whether retrieval ranked useful evidence high enough.

## Core Explanation

Generic answer-quality scores are not enough for RAG or source-grounded agents. A fluent answer can still cite the wrong document, omit evidence for a key claim, or use a retrieved chunk that only partially supports the statement.

Citation grading should split the problem into smaller signals: retrieval quality, evidence coverage, claim support, citation span accuracy, and unsupported claim rate. Faithfulness asks whether answer claims follow from retrieved context. Context precision asks whether relevant chunks are high in the retrieved ranking. A custom eval can then combine these signals with task-specific citation rules.

Agents should preserve the question, retrieved context IDs, answer spans, cited source IDs, judge prompt, rubric version, and grader output. Without these artifacts, a passing citation score is hard to reproduce or debug.

## Source-Mapped Facts

- Ragas documentation describes faithfulness as measuring factual consistency between a response and the retrieved context. ([source](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/))
- Ragas documentation says context precision evaluates whether relevant chunks are ranked higher than irrelevant chunks in retrieved context. ([source](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_precision/))
- OpenAI Evals documentation describes Evals as a framework for evaluating LLMs or systems built using LLMs, with a registry and custom eval capability. ([source](https://github.com/openai/evals))

## Further Reading

- [Ragas Faithfulness Metric](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/faithfulness/)
- [Ragas Context Precision Metric](https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/context_precision/)
- [OpenAI Evals](https://github.com/openai/evals)
