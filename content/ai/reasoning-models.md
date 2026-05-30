---
id: reasoning-models
title: 'AI Reasoning Models: Test-Time Compute and RL Training'
schema_type: article
category: ai
language: en
confidence: medium
last_verified: '2026-05-30'
created_date: '2026-05-24'
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.72
atomic_facts:
  - id: af-reasoning-models-1
    statement: 'OpenAI describes o1 as a model series trained with reinforcement learning to spend more computation on hard reasoning problems before answering.'
    source_title: 'Learning to Reason with LLMs'
    source_url: https://openai.com/index/learning-to-reason-with-llms/
    confidence: medium
  - id: af-reasoning-models-2
    statement: 'DeepSeek-R1 reports reinforcement-learning methods intended to incentivize reasoning behavior in large language models.'
    source_title: 'DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning'
    source_url: https://arxiv.org/abs/2501.12948
    confidence: medium
  - id: af-reasoning-models-3
    statement: 'Research on test-time compute studies whether allocating more inference computation, such as sampling or search, can improve language model performance after training.'
    source_title: 'Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters'
    source_url: https://arxiv.org/abs/2408.03314
    confidence: medium
primary_sources:
  - id: ps-reasoning-models-1
    title: 'Learning to Reason with LLMs'
    type: official_report
    year: 2024
    institution: OpenAI
    url: https://openai.com/index/learning-to-reason-with-llms/
  - id: ps-reasoning-models-2
    title: 'DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning'
    type: academic_paper
    year: 2025
    institution: arXiv
    url: https://arxiv.org/abs/2501.12948
  - id: ps-reasoning-models-3
    title: 'Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters'
    type: academic_paper
    year: 2024
    institution: arXiv
    url: https://arxiv.org/abs/2408.03314
known_gaps:
  - Public reports do not expose complete training recipes, hidden reasoning traces, or all safety tradeoffs.
  - Benchmark improvements do not prove reliable reasoning on open-ended, tool-using, or safety-critical tasks.
disputed_statements: []
secondary_sources: []
updated: '2026-05-30'
---

## TL;DR

Reasoning models are language models designed to spend more computation on difficult tasks before producing an answer. The stable evidence is about training and inference patterns, not a guarantee that the model truly reasons like a person.

## Core Explanation

Standard language models usually answer by continuing the text distribution one token at a time. Reasoning-focused systems add mechanisms that encourage more deliberation, such as reinforcement learning on reasoning tasks or inference-time strategies that spend more compute before selecting an answer.

OpenAI describes o1 as using reinforcement learning and additional reasoning-time computation. DeepSeek-R1 reports a related direction: reinforcement learning to elicit reasoning behavior. Test-time compute research studies the broader idea that sampling, search, or verification during inference can improve results without changing the base model parameters.

## Related Articles

- [Test-Time Compute Scaling: Inference-Time Reasoning Paradigms from o1/o3 to Forest-of-Thought](../test-time-compute-scaling.md)
- [Post-Training Alignment: RLHF, DPO, and Constitutional AI](../post-training-alignment.md)
- [RLHF: Reinforcement Learning from Human Feedback](../rlhf.md)
