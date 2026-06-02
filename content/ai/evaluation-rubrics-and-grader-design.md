---
id: evaluation-rubrics-and-grader-design
title: 'Evaluation Rubrics and Grader Design'
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
  - id: fact-evaluation-rubrics-and-grader-design-1
    statement: >-
      OpenAI graders documentation says graders compare reference answers to model-generated answers and return a grade in the range from 0 to 1.
    source_title: Graders - OpenAI API
    source_url: https://platform.openai.com/docs/guides/graders/
  - id: fact-evaluation-rubrics-and-grader-design-2
    statement: >-
      LangSmith evaluation documentation says evaluators score application performance and can be attached to tracing projects or datasets.
    source_title: Evaluation concepts - LangSmith
    source_url: https://docs.langchain.com/langsmith/evaluation-concepts
  - id: fact-evaluation-rubrics-and-grader-design-3
    statement: >-
      LangSmith evaluation documentation lists human, code, LLM-as-judge, and pairwise approaches as supported evaluation techniques.
    source_title: Evaluation concepts - LangSmith
    source_url: https://docs.langchain.com/langsmith/evaluation-concepts
completeness: 0.84
known_gaps:
  - Grader reliability depends on rubric specificity, calibration examples, disagreement review, and domain expert validation.
disputed_statements: []
primary_sources:
  - title: Graders - OpenAI API
    type: documentation
    year: 2026
    url: https://platform.openai.com/docs/guides/graders/
    institution: OpenAI
  - title: Evaluation concepts - LangSmith
    type: documentation
    year: 2026
    url: https://docs.langchain.com/langsmith/evaluation-concepts
    institution: LangChain
  - title: Holistic Evaluation of Language Models
    type: benchmark_documentation
    year: 2026
    url: https://crfm.stanford.edu/helm/latest/
    institution: Stanford CRFM
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Evaluation rubrics define what good output means. Grader design turns that rubric into human, code, model-graded, or pairwise measurements that can be run repeatedly.

## Core Explanation

LLM evaluation often fails when the rubric is vague or the grader measures what is easy instead of what matters. Strong rubrics separate factual correctness, task completion, citation quality, safety, formatting, and user-impact criteria. Strong graders include reference examples, deterministic checks where possible, model-graded judgments only where needed, and human review for calibration.

## Source-Mapped Facts

- OpenAI graders documentation says graders compare reference answers to model-generated answers and return a grade in the range from 0 to 1. ([source](https://platform.openai.com/docs/guides/graders/))
- LangSmith evaluation documentation says evaluators score application performance and can be attached to tracing projects or datasets. ([source](https://docs.langchain.com/langsmith/evaluation-concepts))
- LangSmith evaluation documentation lists human, code, LLM-as-judge, and pairwise approaches as supported evaluation techniques. ([source](https://docs.langchain.com/langsmith/evaluation-concepts))

## Further Reading

- [OpenAI graders](https://platform.openai.com/docs/guides/graders/)
- [LangSmith evaluation concepts](https://docs.langchain.com/langsmith/evaluation-concepts)
- [HELM latest results](https://crfm.stanford.edu/helm/latest/)
