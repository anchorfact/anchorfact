---
id: llm-evaluation-judge-prompt-rubrics-and-scorecards
title: 'LLM Evaluation Judge Prompt Rubrics and Scorecards'
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
  - id: fact-ai-llm-evaluation-judge-prompt-rubrics-and-scorecards-1
    statement: >-
      OpenAI Evals documentation describes testing_criteria as defining how to decide whether
      model output satisfies requirements for each dataset item.
    source_title: OpenAI Working with Evals
    source_url: https://developers.openai.com/api/docs/guides/evals
    confidence: medium
  - id: fact-ai-llm-evaluation-judge-prompt-rubrics-and-scorecards-2
    statement: >-
      OpenAI Graders documentation says score_model graders query a requested model with
      provided prompt messages and sampling parameters.
    source_title: OpenAI Graders
    source_url: https://developers.openai.com/api/docs/guides/graders
    confidence: medium
  - id: fact-ai-llm-evaluation-judge-prompt-rubrics-and-scorecards-3
    statement: >-
      Braintrust documentation describes evaluations as running an AI application against test
      data and scoring the results with scorers.
    source_title: Braintrust Evaluate Systematically
    source_url: https://www.braintrust.dev/docs/evaluate
    confidence: medium
completeness: 0.83
known_gaps:
  - Judge reliability depends on rubric clarity, calibration examples, hidden labels, judge model version, sampling settings, disagreement review, and whether scores predict user-visible quality.
disputed_statements: []
primary_sources:
  - title: OpenAI Working with Evals
    type: documentation
    year: 2026
    url: https://developers.openai.com/api/docs/guides/evals
    institution: OpenAI
  - title: OpenAI Graders
    type: documentation
    year: 2026
    url: https://developers.openai.com/api/docs/guides/graders
    institution: OpenAI
  - title: Braintrust Evaluate Systematically
    type: documentation
    year: 2026
    url: https://www.braintrust.dev/docs/evaluate
    institution: Braintrust
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Judge prompts, rubrics, and scorecards turn subjective LLM quality judgments into repeatable evaluation artifacts that can be reviewed and versioned.

## Core Explanation

An LLM-as-judge setup is only as useful as its rubric. The judge needs explicit criteria, allowed score labels, examples of borderline cases, evidence requirements, and a method for handling invalid or ungrounded responses.

Agents should inspect the judge prompt, dataset rows, grader type, scoring scale, evaluator version, calibration set, disagreement rate, and human override process before treating a scorecard as a production gate.

## Source-Mapped Facts

- OpenAI Evals documentation describes testing_criteria as defining how to decide whether model output satisfies requirements for each dataset item. ([source](https://developers.openai.com/api/docs/guides/evals))
- LangSmith documentation describes evaluation as a way to assess application performance using datasets and evaluators. ([source](https://docs.langchain.com/langsmith/evaluation))
- Braintrust documentation describes evaluations as running an AI application against test data and scoring the results with scorers. ([source](https://www.braintrust.dev/docs/evaluate))

## Further Reading

- [OpenAI Working with Evals](https://developers.openai.com/api/docs/guides/evals)
- [OpenAI Graders](https://developers.openai.com/api/docs/guides/graders)
- [Braintrust Evaluate Systematically](https://www.braintrust.dev/docs/evaluate)
