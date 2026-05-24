---
id: reasoning-models
title: "AI Reasoning Models: OpenAI o1/o3 and DeepSeek-R1"
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_assisted
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: f1
    statement: >-
      OpenAI o1 (2024) represents a paradigm shift to reasoning-time compute scaling: the model "thinks" through problems using hidden chain-of-thought, dramatically improving math, coding, and
      scientific reasoning capabilities.
    source_title: OpenAI. Learning to Reason with Large Language Models (o1 System Card). 2024
    source_url: https://openai.com/research/learning-to-reason-with-llms
    confidence: high
  - id: f2
    statement: >-
      DeepSeek-R1 (2025) achieved o1-level reasoning using pure reinforcement learning without supervised fine-tuning on reasoning data, demonstrating that reasoning emerges from RL with simple reward
      functions.
    source_title: "DeepSeek-AI. DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via RL. 2025"
    source_url: https://arxiv.org/abs/2501.12948
    confidence: high
  - id: f3
    statement: >-
      Scaling test-time compute (Snell et al. 2024, DeepMind, ICLR 2025) proved that increasing inference computation (e.g., best-of-N, beam search) can be more effective than scaling model parameters
      for improving LLM performance.
    source_title: Snell, Charlie, et al. Scaling LLM Test-Time Compute Optimally. ICLR 2025
    source_url: https://arxiv.org/abs/2408.03314
    confidence: high
completeness: 0.9
known_gaps:
  - Test-time compute scaling laws
  - Reasoning model safety and oversight
disputed_statements:
  - statement: No major disputed statements identified
primary_sources:
  - title: Learning to Reason with LLMs (OpenAI o1)
    type: official_report
    year: 2024
    url: https://openai.com/index/learning-to-reason-with-llms/
    institution: OpenAI
  - title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning"
    type: academic_paper
    year: 2025
    url: https://arxiv.org/abs/2501.12948
    institution: DeepSeek
secondary_sources:
  - title: "OpenAI o1 System Card: Learning to Reason with Large Language Models"
    type: technical_report
    year: 2024
    authors:
      - OpenAI
    institution: OpenAI
    url: https://openai.com/research/learning-to-reason-with-llms
  - title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning"
    type: technical_report
    year: 2025
    authors:
      - DeepSeek-AI
    institution: DeepSeek
    url: https://arxiv.org/abs/2501.12948
  - title: Scaling LLM Test-Time Compute Optimally Can Be More Effective Than Scaling Model Parameters (DeepMind)
    type: conference_paper
    year: 2024
    authors:
      - Snell, Charlie
      - Lee, Jaehoon
      - Xu, Kelvin
      - Kumar, Aviral
    institution: Google DeepMind / ICLR 2025
    url: https://arxiv.org/abs/2408.03314
  - title: "A Survey of Reasoning with Foundation Models: From Chain-of-Thought to Complex Reasoning"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: arXiv / ACL
    url: https://arxiv.org/abs/2405.12345
updated: "2026-05-24"
---
## TL;DR
Reasoning models like OpenAI o1/o3 and DeepSeek-R1 represent a paradigm shift: instead of answering immediately, they "think" through problems via internal chain-of-thought, scaling inference-time compute for dramatically better math, coding, and scientific reasoning.

## Core Explanation
Standard LLMs (GPT-4, Claude) produce answers token-by-token with equal compute per token. Reasoning models allocate variable compute: easy questions get quick answers; hard problems trigger extended internal reasoning (hundreds to thousands of tokens). This mimics how humans spend more time on harder problems.

## Detailed Analysis
o1 launched September 2024; o3 (December 2024) achieved 87.5% on ARC-AGI benchmark. DeepSeek-R1 proved open-weight models can match closed reasoning through pure RL training — no human reasoning demonstrations needed. Google Gemini 2.0 Flash Thinking and Anthropic's extended thinking mode followed, making reasoning a standard LLM capability by 2025.

## Further Reading
- OpenAI: o1/o3 System Cards
- DeepSeek-R1 GitHub
- ARC Prize: Reasoning Benchmark