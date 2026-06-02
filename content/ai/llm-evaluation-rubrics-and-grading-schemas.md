---
id: llm-evaluation-rubrics-and-grading-schemas
title: 'LLM Evaluation Rubrics and Grading Schemas'
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
  - id: fact-ai-llm-evaluation-rubrics-and-grading-schemas-1
    statement: >-
      Google Vertex AI documentation describes adaptive and static rubric metrics for Gen AI
      evaluation.
    source_title: Vertex AI Define Evaluation Metrics
    source_url: https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/determine-eval
    confidence: medium
  - id: fact-ai-llm-evaluation-rubrics-and-grading-schemas-2
    statement: >-
      Google Vertex AI documentation describes model-based metric prompt templates that use
      criteria, score rubrics, and instructions.
    source_title: Vertex AI Metric Prompt Templates
    source_url: https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/metrics-templates
    confidence: medium
  - id: fact-ai-llm-evaluation-rubrics-and-grading-schemas-3
    statement: >-
      OpenAI documentation describes evals as tests for model outputs against style and content
      criteria that users specify.
    source_title: OpenAI Evals Guide
    source_url: https://developers.openai.com/api/docs/guides/evals
    confidence: medium
completeness: 0.83
known_gaps:
  - Rubric reliability depends on calibration data, judge model variance, inter-rater agreement, hidden examples, prompt sensitivity, and whether the score schema captures task-specific failure modes.
disputed_statements: []
primary_sources:
  - title: Vertex AI Define Evaluation Metrics
    type: documentation
    year: 2026
    url: https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/determine-eval
    institution: Google Cloud
  - title: Vertex AI Metric Prompt Templates
    type: documentation
    year: 2026
    url: https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/metrics-templates
    institution: Google Cloud
  - title: OpenAI Evals Guide
    type: documentation
    year: 2026
    url: https://developers.openai.com/api/docs/guides/evals
    institution: OpenAI
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Rubrics and grading schemas turn vague LLM quality goals into repeatable evaluation fields, criteria, and scores.

## Core Explanation

An evaluation result is only useful if the grader knows what to judge and how to encode the judgment. Rubrics define criteria such as correctness, groundedness, instruction following, safety, concision, and tool-use quality. A grading schema defines the output format, score scale, labels, and rationale fields.

Agents should treat rubric design as part of the system contract. When the rubric changes, historical scores may no longer be comparable. When the schema is too vague, the judge can return plausible but inconsistent evaluations.

## Source-Mapped Facts

- Google Vertex AI documentation describes adaptive and static rubric metrics for Gen AI evaluation. ([source](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/determine-eval))
- Google Vertex AI documentation describes model-based metric prompt templates that use criteria, score rubrics, and instructions. ([source](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/metrics-templates))
- OpenAI documentation describes evals as tests for model outputs against style and content criteria that users specify. ([source](https://developers.openai.com/api/docs/guides/evals))

## Further Reading

- [Vertex AI Define Evaluation Metrics](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/determine-eval)
- [Vertex AI Metric Prompt Templates](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/metrics-templates)
- [OpenAI Evals Guide](https://developers.openai.com/api/docs/guides/evals)
