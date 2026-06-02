---
id: llm-sampling-parameters-in-evaluation
title: 'LLM Sampling Parameters in Evaluation'
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
  - id: fact-ai-llm-sampling-parameters-in-evaluation-1
    statement: >-
      Azure OpenAI reference documentation includes temperature and top_p parameters for chat completion requests.
    source_title: Azure OpenAI REST API Reference
    source_url: https://learn.microsoft.com/en-us/azure/foundry/openai/reference
    confidence: medium
  - id: fact-ai-llm-sampling-parameters-in-evaluation-2
    statement: >-
      Anthropic Messages API documentation includes temperature and top_p request parameters.
    source_title: Anthropic Messages API
    source_url: https://docs.anthropic.com/en/api/messages
    confidence: medium
  - id: fact-ai-llm-sampling-parameters-in-evaluation-3
    statement: >-
      Gemini API text generation documentation describes generation configuration parameters such as temperature, topP, and topK.
    source_title: Gemini API Text Generation
    source_url: https://ai.google.dev/gemini-api/docs/text-generation
    confidence: medium
completeness: 0.83
known_gaps:
  - Evaluation reproducibility also depends on model version, system prompts, tools, seed support, truncation, and backend changes.
disputed_statements: []
primary_sources:
  - title: Azure OpenAI REST API Reference
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/foundry/openai/reference
    institution: Microsoft
  - title: Anthropic Messages API
    type: documentation
    year: 2026
    url: https://docs.anthropic.com/en/api/messages
    institution: Anthropic
  - title: Gemini API Text Generation
    type: documentation
    year: 2026
    url: https://ai.google.dev/gemini-api/docs/text-generation
    institution: Google
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

LLM evaluation runs should record sampling parameters because temperature, nucleus sampling, and related settings can change output diversity and reproducibility.

## Core Explanation

Evaluation results are not only properties of a model name. The request configuration can change the distribution of outputs, which affects exact-match scores, judge ratings, latency, and pass/fail rates.

Agents should log sampling parameters with every evaluation trace. When comparing two prompts or models, they should keep sampling settings fixed unless the experiment is explicitly about decoding behavior.

## Source-Mapped Facts

- Azure OpenAI reference documentation includes temperature and top_p parameters for chat completion requests. ([source](https://learn.microsoft.com/en-us/azure/foundry/openai/reference))
- Anthropic Messages API documentation includes temperature and top_p request parameters. ([source](https://docs.anthropic.com/en/api/messages))
- Gemini API text generation documentation describes generation configuration parameters such as temperature, topP, and topK. ([source](https://ai.google.dev/gemini-api/docs/text-generation))

## Further Reading

- [Azure OpenAI REST API Reference](https://learn.microsoft.com/en-us/azure/foundry/openai/reference)
- [Anthropic Messages API](https://docs.anthropic.com/en/api/messages)
- [Gemini API Text Generation](https://ai.google.dev/gemini-api/docs/text-generation)
