---
id: world-models-video-prediction
title: "World Models: Video Prediction, Physical Reasoning, and Interactive AI"
schema_type: article
category: ai
language: en
confidence: high
last_verified: "2026-05-28"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.84
atomic_facts:
  - id: fact-world-models-1
    statement: >-
      World Models proposed learning a compact model of an environment from observations so an agent can learn
      policies in a latent space.
    source_title: World Models
    source_url: https://arxiv.org/abs/1803.10122
    confidence: medium
  - id: fact-world-models-2
    statement: >-
      DreamerV3 reported strong performance across diverse domains using a single world-model algorithm
      without per-domain tuning.
    source_title: Mastering Diverse Domains through World Models
    source_url: https://arxiv.org/abs/2301.04104
    confidence: medium
  - id: fact-world-models-3
    statement: >-
      OpenAI described Sora as a video generation model that can be viewed as a world simulator trained on
      visual data with varied durations and resolutions.
    source_title: Video generation models as world simulators
    source_url: https://openai.com/index/video-generation-models-as-world-simulators/
    confidence: medium
primary_sources:
  - title: World Models
    type: conference_paper
    year: 2018
    url: https://arxiv.org/abs/1803.10122
    institution: NeurIPS / arXiv
    authors:
      - David Ha
      - Jurgen Schmidhuber
  - title: Mastering Diverse Domains through World Models
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2301.04104
    institution: DeepMind / arXiv
    authors:
      - Danijar Hafner
      - Jurgis Pasukonis
      - Jimmy Ba
      - Timothy Lillicrap
  - title: Video generation models as world simulators
    type: technical_report
    year: 2024
    url: https://openai.com/index/video-generation-models-as-world-simulators/
    institution: OpenAI
known_gaps:
  - Claims about physical reasoning in video models should be revisited as independent evaluations mature.
disputed_statements: []
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

World models learn predictive representations of environments for planning, reinforcement learning, and video generation. This repair removes a 2026 future source and anchors the article to World Models, DreamerV3, and OpenAI's Sora report.

## Core Explanation

The public claims now separate reinforcement-learning world models from video generation used as a simulator-like model. Broad claims about general physical reasoning are kept cautious because evaluation standards are still evolving.

## Further Reading

- [World Models](https://arxiv.org/abs/1803.10122)
- [DreamerV3](https://arxiv.org/abs/2301.04104)
- [Video generation models as world simulators](https://openai.com/index/video-generation-models-as-world-simulators/)

## Related Articles

- [Embodied AI and Robotics](../embodied-ai-and-robotics.md)
- [Reinforcement Learning](../reinforcement-learning.md)
