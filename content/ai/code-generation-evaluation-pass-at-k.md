---
id: code-generation-evaluation-pass-at-k
title: 'Code Generation Evaluation with pass@k'
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
  - id: fact-code-generation-evaluation-pass-at-k-1
    statement: >-
      The OpenAI HumanEval evaluation harness reports pass@1, pass@10, and pass@100 values when evaluating generated code samples.
    source_title: HumanEval
    source_url: https://github.com/openai/human-eval
  - id: fact-code-generation-evaluation-pass-at-k-2
    statement: >-
      The Google Research repository includes an MBPP directory for the Mostly Basic Python Problems benchmark.
    source_title: MBPP - Google Research
    source_url: https://github.com/google-research/google-research/tree/master/mbpp
  - id: fact-code-generation-evaluation-pass-at-k-3
    statement: >-
      The EvalPlus repository describes rigorous evaluation of LLM-synthesized code and provides enhanced benchmark test suites.
    source_title: EvalPlus
    source_url: https://github.com/evalplus/evalplus
completeness: 0.83
known_gaps:
  - pass@k does not by itself measure readability, maintainability, security, latency, or multi-file integration quality.
disputed_statements: []
primary_sources:
  - title: HumanEval
    type: code_repository
    year: 2021
    url: https://github.com/openai/human-eval
    institution: OpenAI
  - title: MBPP - Google Research
    type: code_repository
    year: 2021
    url: https://github.com/google-research/google-research/tree/master/mbpp
    institution: Google Research
  - title: EvalPlus
    type: code_repository
    year: 2023
    url: https://github.com/evalplus/evalplus
    institution: EvalPlus
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

pass@k is a code-generation evaluation metric that estimates whether at least one of k sampled solutions passes the benchmark tests.

## Core Explanation

Code-generation evaluation is different from text evaluation because executable tests can check behavioral correctness. Benchmarks such as HumanEval and MBPP provide prompts and tests; a model samples one or more candidate programs, then the evaluator runs those candidates in a sandbox.

pass@k is useful for comparing sampling strategies and model capability, but it can overstate real engineering quality when tests are weak. Stronger evaluation adds hidden tests, mutation-style edge cases, dependency isolation, security checks, and task suites that cover multi-file or repository-level changes.

## Source-Mapped Facts

- The OpenAI HumanEval evaluation harness reports pass@1, pass@10, and pass@100 values when evaluating generated code samples. ([source](https://github.com/openai/human-eval))
- The Google Research repository includes an MBPP directory for the Mostly Basic Python Problems benchmark. ([source](https://github.com/google-research/google-research/tree/master/mbpp))
- The EvalPlus repository describes rigorous evaluation of LLM-synthesized code and provides enhanced benchmark test suites. ([source](https://github.com/evalplus/evalplus))

## Further Reading

- [HumanEval](https://github.com/openai/human-eval)
- [MBPP](https://github.com/google-research/google-research/tree/master/mbpp)
- [EvalPlus](https://github.com/evalplus/evalplus)
