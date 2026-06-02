---
id: llm-evaluation-refusal-and-overrefusal-testing
title: 'LLM Evaluation Refusal and Overrefusal Testing'
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
  - id: fact-ai-llm-evaluation-refusal-and-overrefusal-testing-1
    statement: >-
      The OpenAI Model Spec says models should obey user and developer instructions except
      when those instructions fall into categories that require refusal or safe completion.
    source_title: OpenAI Model Spec
    source_url: https://model-spec.openai.com/2025-12-18.html
    confidence: medium
  - id: fact-ai-llm-evaluation-refusal-and-overrefusal-testing-2
    statement: >-
      The XSTest paper presents a test suite for identifying exaggerated safety behaviors in
      large language models.
    source_title: XSTest Paper
    source_url: https://aclanthology.org/2024.naacl-long.301/
    confidence: medium
  - id: fact-ai-llm-evaluation-refusal-and-overrefusal-testing-3
    statement: >-
      The SORRY-Bench paper presents a benchmark for evaluating large language model safety
      refusal behaviors.
    source_title: SORRY-Bench Paper
    source_url: https://arxiv.org/abs/2406.14598
    confidence: medium
completeness: 0.83
known_gaps:
  - Refusal evaluation depends on local policy, prompt framing, benign lookalike cases, grader reliability, and whether safe-completion quality is measured separately from refusal rate.
disputed_statements: []
primary_sources:
  - title: OpenAI Model Spec
    type: standard
    year: 2025
    url: https://model-spec.openai.com/2025-12-18.html
    institution: OpenAI
  - title: XSTest Paper
    type: academic_paper
    year: 2024
    url: https://aclanthology.org/2024.naacl-long.301/
    institution: ACL Anthology
  - title: SORRY-Bench Paper
    type: academic_paper
    year: 2024
    url: https://arxiv.org/abs/2406.14598
    institution: arXiv
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Refusal testing measures whether a model declines harmful requests while avoiding overrefusal of benign requests that only look risky.

## Core Explanation

Safety evaluation is not complete if it only checks whether a model refuses disallowed prompts. A useful evaluation also asks whether the model can comply with benign transformation, education, debugging, or safety-context requests that share surface words with harmful categories.

For agents, refusal and overrefusal tests should be tied to policy labels, tool permissions, and safe-completion expectations. A safe agent may refuse a destructive tool call while still offering benign explanation, diagnosis, or a lower-risk alternative.

## Source-Mapped Facts

- The OpenAI Model Spec says models should obey user and developer instructions except when those instructions fall into categories that require refusal or safe completion. ([source](https://model-spec.openai.com/2025-12-18.html))
- The XSTest paper presents a test suite for identifying exaggerated safety behaviors in large language models. ([source](https://aclanthology.org/2024.naacl-long.301/))
- The SORRY-Bench paper presents a benchmark for evaluating large language model safety refusal behaviors. ([source](https://arxiv.org/abs/2406.14598))

## Further Reading

- [OpenAI Model Spec](https://model-spec.openai.com/2025-12-18.html)
- [XSTest Paper](https://aclanthology.org/2024.naacl-long.301/)
- [SORRY-Bench Paper](https://arxiv.org/abs/2406.14598)
