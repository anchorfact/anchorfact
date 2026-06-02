---
id: llm-evaluation-swe-bench-verified-code-agent-benchmarks
title: 'LLM Evaluation SWE-bench Verified Code-Agent Benchmarks'
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
  - id: fact-ai-llm-evaluation-swe-bench-verified-code-agent-benchmarks-1
    statement: >-
      SWE-bench documentation describes a benchmark for evaluating whether
      language models can resolve real-world GitHub issues.
    source_title: SWE-bench Overview
    source_url: https://www.swebench.com/SWE-bench/
    confidence: medium
  - id: fact-ai-llm-evaluation-swe-bench-verified-code-agent-benchmarks-2
    statement: >-
      The SWE-bench Verified page describes SWE-bench Verified as a human-validated
      subset of 500 SWE-bench instances for evaluating coding agents and language models.
    source_title: SWE-bench Verified
    source_url: https://www.swebench.com/verified.html
    confidence: medium
  - id: fact-ai-llm-evaluation-swe-bench-verified-code-agent-benchmarks-3
    statement: >-
      The SWE-bench FAQ says the evaluation process sets up a Docker environment,
      applies a generated patch, runs the repository test suite, and determines
      whether the patch resolves the issue.
    source_title: SWE-bench FAQ
    source_url: https://www.swebench.com/SWE-bench/faq/
    confidence: medium
completeness: 0.82
known_gaps:
  - SWE-bench interpretation depends on dataset split, benchmark version, contamination risk, scaffold, patch format, Docker environment, retries, test reliability, and whether results are pass@1 or multi-attempt.
disputed_statements: []
primary_sources:
  - title: SWE-bench Overview
    type: documentation
    year: 2023
    url: https://www.swebench.com/SWE-bench/
    institution: SWE-bench
  - title: SWE-bench Verified
    type: documentation
    year: 2026
    url: https://www.swebench.com/verified.html
    institution: SWE-bench
  - title: SWE-bench FAQ
    type: documentation
    year: 2026
    url: https://www.swebench.com/SWE-bench/faq/
    institution: SWE-bench
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

SWE-bench Verified helps agents interpret coding-agent benchmark claims in terms of real issue patches, Dockerized evaluation, and verified task subsets.

## Core Explanation

Code-agent evaluation is not just code generation. The system must understand an issue, inspect a repository, edit files, produce a patch, and pass tests in a controlled environment. SWE-bench-style results therefore mix model ability, scaffold design, repository tools, retry policy, and benchmark hygiene.

Agents citing a SWE-bench result should name the split, harness, scaffold, number of attempts, model, Docker setup, patch format, and resolved-instance metric. Without those details, a score is not enough evidence for production coding-agent quality.

## Source-Mapped Facts

- SWE-bench documentation describes a benchmark for evaluating whether language models can resolve real-world GitHub issues. ([source](https://www.swebench.com/SWE-bench/))
- The SWE-bench Verified page describes SWE-bench Verified as a human-validated subset of 500 SWE-bench instances for evaluating coding agents and language models. ([source](https://www.swebench.com/verified.html))
- The SWE-bench FAQ says the evaluation process sets up a Docker environment, applies a generated patch, runs the repository test suite, and determines whether the patch resolves the issue. ([source](https://www.swebench.com/SWE-bench/faq/))

## Further Reading

- [SWE-bench Overview](https://www.swebench.com/SWE-bench/)
- [SWE-bench Verified](https://www.swebench.com/verified.html)
- [SWE-bench FAQ](https://www.swebench.com/SWE-bench/faq/)
