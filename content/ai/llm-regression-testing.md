---
id: llm-regression-testing
title: 'LLM Regression Testing'
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
  - id: fact-ai-llm-regression-testing-1
    statement: >-
      LangSmith evaluation documentation says offline evaluation runs on curated datasets during
      development to compare versions, benchmark performance, and catch regressions.
    source_title: LangSmith Evaluation
    source_url: https://docs.langchain.com/langsmith/evaluation
    confidence: medium
  - id: fact-ai-llm-regression-testing-2
    statement: >-
      OpenAI evals documentation describes evals as tasks used to measure model behavior and compare
      performance across models and prompts.
    source_title: OpenAI Evals
    source_url: https://developers.openai.com/api/docs/guides/evals
    confidence: medium
  - id: fact-ai-llm-regression-testing-3
    statement: >-
      Promptfoo documentation describes it as a tool for testing and evaluating LLM outputs.
    source_title: Promptfoo Intro
    source_url: https://www.promptfoo.dev/docs/intro/
    confidence: medium
completeness: 0.83
known_gaps:
  - Regression test pass rates can be brittle when model providers, prompts, tools, retrieval corpora, or graders change.
disputed_statements: []
primary_sources:
  - title: LangSmith Evaluation
    type: documentation
    year: 2026
    url: https://docs.langchain.com/langsmith/evaluation
    institution: LangChain
  - title: OpenAI Evals
    type: documentation
    year: 2026
    url: https://developers.openai.com/api/docs/guides/evals
    institution: OpenAI
  - title: Promptfoo Intro
    type: documentation
    year: 2026
    url: https://www.promptfoo.dev/docs/intro/
    institution: Promptfoo
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

LLM regression testing reruns representative prompts, tool workflows, or RAG questions after a change to catch quality drops before deployment.

## Core Explanation

Traditional unit tests often assert exact values. LLM regression tests usually combine curated datasets, deterministic assertions, rubric-based graders, reference answers, and comparison runs. The intent is to catch a prompt, model, retrieval, or tool change that makes known tasks worse.

Regression testing is most useful when the dataset is specific to the product. A general benchmark can show broad capability, but a release gate should include the organization's own workflows, unsupported cases, policy boundaries, and known historical failures.

## Source-Mapped Facts

- LangSmith evaluation documentation says offline evaluation runs on curated datasets during development to compare versions, benchmark performance, and catch regressions. ([source](https://docs.langchain.com/langsmith/evaluation))
- OpenAI evals documentation describes evals as tasks used to measure model behavior and compare performance across models and prompts. ([source](https://developers.openai.com/api/docs/guides/evals))
- Promptfoo documentation describes it as a tool for testing and evaluating LLM outputs. ([source](https://www.promptfoo.dev/docs/intro/))

## Further Reading

- [LangSmith Evaluation](https://docs.langchain.com/langsmith/evaluation)
- [OpenAI Evals](https://developers.openai.com/api/docs/guides/evals)
- [Promptfoo Intro](https://www.promptfoo.dev/docs/intro/)
