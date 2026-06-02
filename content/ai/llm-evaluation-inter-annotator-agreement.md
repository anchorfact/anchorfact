---
id: llm-evaluation-inter-annotator-agreement
title: 'LLM Evaluation Inter-Annotator Agreement'
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
  - id: fact-ai-llm-evaluation-inter-annotator-agreement-1
    statement: >-
      Label Studio statistics documentation includes inter-annotator agreement metrics for annotation projects.
    source_title: Label Studio Statistics
    source_url: https://labelstud.io/guide/stats.html
    confidence: medium
  - id: fact-ai-llm-evaluation-inter-annotator-agreement-2
    statement: >-
      Argilla annotation metrics documentation includes Fleiss' kappa and Krippendorff's alpha metrics.
    source_title: Argilla Annotation Metrics
    source_url: https://docs.v1.argilla.io/en/v2.2.0/reference/python/python_annotation_metrics.html
    confidence: medium
  - id: fact-ai-llm-evaluation-inter-annotator-agreement-3
    statement: >-
      Prodigy API documentation includes an inter-annotator agreement component for comparing annotations.
    source_title: Prodigy Inter-Annotator Agreement
    source_url: https://prodi.gy/docs/api-components#iaa
    confidence: medium
completeness: 0.83
known_gaps:
  - Agreement metrics do not prove label correctness; rubric clarity, annotator training, adjudication, and ambiguous examples still matter.
disputed_statements: []
primary_sources:
  - title: Label Studio Statistics
    type: documentation
    year: 2026
    url: https://labelstud.io/guide/stats.html
    institution: HumanSignal
  - title: Argilla Annotation Metrics
    type: documentation
    year: 2026
    url: https://docs.v1.argilla.io/en/v2.2.0/reference/python/python_annotation_metrics.html
    institution: Argilla
  - title: Prodigy Inter-Annotator Agreement
    type: documentation
    year: 2026
    url: https://prodi.gy/docs/api-components#iaa
    institution: Prodigy
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Inter-annotator agreement helps LLM evaluation teams measure whether human graders apply a rubric consistently.

## Core Explanation

Human labels are often treated as gold data, but labels are only useful when annotators understand the task similarly. Agreement metrics can expose ambiguous rubrics, unstable categories, and examples that need adjudication.

Agents should use agreement as a quality signal, not a replacement for expert review. Low agreement suggests the evaluation dataset or rubric needs repair before scores are used for release decisions.

## Source-Mapped Facts

- Label Studio statistics documentation includes inter-annotator agreement metrics for annotation projects. ([source](https://labelstud.io/guide/stats.html))
- Argilla annotation metrics documentation includes Fleiss' kappa and Krippendorff's alpha metrics. ([source](https://docs.v1.argilla.io/en/v2.2.0/reference/python/python_annotation_metrics.html))
- Prodigy API documentation includes an inter-annotator agreement component for comparing annotations. ([source](https://prodi.gy/docs/api-components#iaa))

## Further Reading

- [Label Studio Statistics](https://labelstud.io/guide/stats.html)
- [Argilla Annotation Metrics](https://docs.v1.argilla.io/en/v2.2.0/reference/python/python_annotation_metrics.html)
- [Prodigy Inter-Annotator Agreement](https://prodi.gy/docs/api-components#iaa)
