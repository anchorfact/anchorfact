---
id: llm-evaluation-berkeley-function-calling-leaderboard
title: 'LLM Evaluation Berkeley Function Calling Leaderboard'
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
  - id: fact-ai-llm-evaluation-berkeley-function-calling-leaderboard-1
    statement: >-
      The Berkeley Function Calling Leaderboard README describes BFCL as an
      executable function-call evaluation for assessing LLMs' ability to invoke
      functions.
    source_title: Berkeley Function Calling Leaderboard README
    source_url: https://raw.githubusercontent.com/ShishirPatil/gorilla/main/berkeley-function-call-leaderboard/README.md
    confidence: medium
  - id: fact-ai-llm-evaluation-berkeley-function-calling-leaderboard-2
    statement: >-
      The BFCL README says BFCL accounts for various forms of function calls,
      diverse scenarios, and executability.
    source_title: Berkeley Function Calling Leaderboard README
    source_url: https://raw.githubusercontent.com/ShishirPatil/gorilla/main/berkeley-function-call-leaderboard/README.md
    confidence: medium
  - id: fact-ai-llm-evaluation-berkeley-function-calling-leaderboard-3
    statement: >-
      The Berkeley Function Calling Leaderboard blog describes function calling
      as also being called tool calling.
    source_title: Berkeley Function Calling Leaderboard Blog
    source_url: https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html
    confidence: medium
completeness: 0.82
known_gaps:
  - Function-calling evaluation depends on schema realism, invalid argument handling, parallel calls, multi-turn state, execution environment, API changes, tool availability, and whether the benchmark covers the target agent's actual tools.
disputed_statements: []
primary_sources:
  - title: Berkeley Function Calling Leaderboard README
    type: software_repository
    year: 2026
    url: https://raw.githubusercontent.com/ShishirPatil/gorilla/main/berkeley-function-call-leaderboard/README.md
    institution: UC Berkeley
  - title: Berkeley Function Calling Leaderboard Blog
    type: research_project
    year: 2024
    url: https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html
    institution: UC Berkeley
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

BFCL-style evaluation is useful when agents need evidence about whether a model can select tools and produce executable function-call arguments.

## Core Explanation

General chat benchmarks do not prove tool-use reliability. Function-calling evaluation should inspect the call name, argument structure, schema adherence, execution outcome, multi-call behavior, and whether the model handles missing or ambiguous tool evidence.

Agents should keep tool schemas, prompts, model outputs, parsed calls, execution traces, invalid-call labels, and category metadata separate. Passing a function-calling benchmark is not proof that a production tool workflow is safe, but it is useful evidence for tool-selection and argument-generation regressions.

## Source-Mapped Facts

- The Berkeley Function Calling Leaderboard README describes BFCL as an executable function-call evaluation for assessing LLMs' ability to invoke functions. ([source](https://raw.githubusercontent.com/ShishirPatil/gorilla/main/berkeley-function-call-leaderboard/README.md))
- The BFCL README says BFCL accounts for various forms of function calls, diverse scenarios, and executability. ([source](https://raw.githubusercontent.com/ShishirPatil/gorilla/main/berkeley-function-call-leaderboard/README.md))
- The Berkeley Function Calling Leaderboard blog describes function calling as also being called tool calling. ([source](https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html))

## Further Reading

- [Berkeley Function Calling Leaderboard README](https://raw.githubusercontent.com/ShishirPatil/gorilla/main/berkeley-function-call-leaderboard/README.md)
- [Berkeley Function Calling Leaderboard Blog](https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html)
