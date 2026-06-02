---
id: llm-evaluation-exact-match-fuzzy-match-and-code-graders
title: 'LLM Evaluation Exact Match, Fuzzy Match, and Code Graders'
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
  - id: fact-ai-llm-evaluation-exact-match-fuzzy-match-and-code-graders-1
    statement: >-
      OpenAI graders documentation says graders compare reference answers with
      model-generated answers and return a grade from 0 to 1.
    source_title: OpenAI Graders
    source_url: https://platform.openai.com/docs/guides/graders/
    confidence: medium
  - id: fact-ai-llm-evaluation-exact-match-fuzzy-match-and-code-graders-2
    statement: >-
      OpenAI graders documentation lists grader types including string check,
      text similarity, score model, and Python code execution.
    source_title: OpenAI Graders
    source_url: https://platform.openai.com/docs/guides/graders/
    confidence: medium
  - id: fact-ai-llm-evaluation-exact-match-fuzzy-match-and-code-graders-3
    statement: >-
      The OpenAI Evals template documentation includes basic templates such as
      match, includes, fuzzy match, and JSON match.
    source_title: OpenAI Evals Templates
    source_url: https://github.com/openai/evals/blob/main/docs/eval-templates.md
    confidence: medium
completeness: 0.82
known_gaps:
  - Grader choice depends on task type, normalization rules, acceptable answer variants, structured-output schema, code sandbox policy, hidden tests, and whether fuzzy or model-graded scores correlate with human review.
disputed_statements: []
primary_sources:
  - title: OpenAI Graders
    type: documentation
    year: 2026
    url: https://platform.openai.com/docs/guides/graders/
    institution: OpenAI
  - title: OpenAI Evals Templates
    type: repository_documentation
    year: 2026
    url: https://github.com/openai/evals/blob/main/docs/eval-templates.md
    institution: OpenAI
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

LLM evals need grader types that match the task: exact string checks for narrow answers, fuzzy checks for acceptable variants, and code graders for executable behavior.

## Core Explanation

Evaluation rows often look similar but need different scoring rules. A date, enum, or API field name may require exact or normalized matching. A short free-text answer may need fuzzy matching or text similarity. A generated function may need a code grader that runs tests inside a controlled environment.

Agents should record the grader type, reference answer, normalization rules, threshold, sandbox permissions, expected output schema, and failure examples. A score without grader metadata is hard to reproduce and can hide whether the model failed reasoning, formatting, parsing, or execution.

## Source-Mapped Facts

- OpenAI graders documentation says graders compare reference answers with model-generated answers and return a grade from 0 to 1. ([source](https://platform.openai.com/docs/guides/graders/))
- OpenAI graders documentation lists grader types including string check, text similarity, score model, and Python code execution. ([source](https://platform.openai.com/docs/guides/graders/))
- The OpenAI Evals template documentation includes basic templates such as match, includes, fuzzy match, and JSON match. ([source](https://github.com/openai/evals/blob/main/docs/eval-templates.md))

## Further Reading

- [OpenAI Graders](https://platform.openai.com/docs/guides/graders/)
- [OpenAI Evals Templates](https://github.com/openai/evals/blob/main/docs/eval-templates.md)
