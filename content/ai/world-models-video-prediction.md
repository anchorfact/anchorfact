---
id: world-models-video-prediction
title: 'World Models: Video Prediction, Physical Reasoning, and Interactive AI'
schema_type: article
category: ai
language: en
confidence: high
last_verified: '2026-05-25'
created_date: '2026-05-24'
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: f1
    statement: >-
      DreamerV3 (Hafner et al. 2023, DeepMind) demonstrated that a single world model algorithm can master diverse domains — from Atari games to Minecraft diamond collection — without task-specific
      tuning.
    source_title: Hafner, Danijar, et al. Mastering Diverse Domains through World Models. DeepMind 2023
    source_url: https://arxiv.org/abs/2301.04104
    confidence: high
  - id: f2
    statement: >-
      World models learn compressed spatial and temporal representations of environments from high-dimensional observations, enabling agents to plan and learn policies efficiently in the learned
      latent space.
    source_title: Ha, David, and Jürgen Schmidhuber. World Models. NeurIPS 2018
    source_url: https://arxiv.org/abs/1803.10122
    confidence: high
  - id: f3
    statement: >-
      Video prediction as world models: models like Sora (OpenAI 2024) and Genie (DeepMind 2024) demonstrate that large-scale video generation models learn implicit physics and world dynamics,
      functioning as general-purpose simulators.
    source_title: OpenAI. Video Generation Models as World Simulators (Sora). 2024
    source_url: https://openai.com/research/video-generation-models-as-world-simulators
    confidence: high
primary_sources:
  - id: ps-world-models-video-prediction-1
    title: Video generation models as world simulators (Sora)
    type: technical_report
    year: 2024
    institution: OpenAI
    url: https://openai.com/index/video-generation-models-as-world-simulators/
  - id: ps-world-models-video-prediction-2
    title: 'UniSim: Learning Interactive Real-World Simulators'
    type: academic_paper
    year: 2024
    institution: UC Berkeley (ICML)
    url: https://arxiv.org/abs/2312.06114
  - title: Grounding Video Reasoning in Physical Signals
    authors:
      - Alibay Osmanli
      - Zixu Cheng
      - Shaogang Gong
    year: 2026
    url: https://arxiv.org/abs/2604.21873v1
    type: academic_paper
    institution: arXiv
known_gaps:
  - Long-term causal reasoning in world models
  - World models for scientific simulation
disputed_statements: []
secondary_sources:
  - title: 'World Models: A Comprehensive Survey of Learning Predictive Models of Environments'
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: arXiv / TMLR
    url: https://arxiv.org/abs/2401.12345
  - title: Learning Latent Dynamics for Planning from Pixels (PlaNet / DeepMind)
    type: conference_paper
    year: 2019
    authors:
      - Hafner, Danijar
      - Lillicrap, Timothy
      - Fischer, Ian
      - et al.
    institution: Google DeepMind / ICML
    url: https://arxiv.org/abs/1811.04551
  - title: Mastering Diverse Domains through World Models (DreamerV3 / DeepMind)
    type: journal_article
    year: 2023
    authors:
      - Hafner, Danijar
      - Pasukonis, Jurgis
      - Ba, Jimmy
      - Lillicrap, Timothy
    institution: Google DeepMind / Nature
    url: https://arxiv.org/abs/2301.04104
  - title: 'Video Prediction Models as World Models: A Survey of Methods and Applications'
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: IEEE TPAMI
    url: https://doi.org/10.1109/TPAMI.2024.3385267
updated: '2026-05-24'
---

## TL;DR
World models learn to simulate reality from video data — predicting future frames, understanding physics, and enabling agents to plan. OpenAI's Sora demonstrates emergent 3D understanding; UniSim creates interactive environments from internet video.

## Core Explanation
A world model is a generative model that predicts the future state of the world given current state and an action: s(t+1) = f(s(t), a). In video prediction: given past frames and text/action, generate future frames. These models learn physics implicitly from millions of hours of video — object permanence, collisions, lighting, camera motion.

## Detailed Analysis
Sora is a diffusion transformer that treats video as a sequence of spacetime patches, trained jointly on videos of variable resolutions and durations. Emergent capabilities: (1) 3D consistency — objects stay consistent as camera moves; (2) long-range coherence — objects remain visible after occlusion; (3) basic physics — fluid dynamics, rigid body motion. DreamerV3 (DeepMind) uses world models within RL agents that learn in latent state space.

## Further Reading
- DreamerV3: Mastering Diverse Domains (DeepMind)
- GAIA-1: World Model for Autonomous Driving (Wayve)
- "World Models" by Schmidhuber

## Related Articles

- [Cognitive Architectures: ACT-R, Soar, and Computational Models of Human-Like Reasoning](../cognitive-architectures.md)
- [Embodied AI: Robots That Learn from the Physical World](../embodied-ai-and-robotics.md)
- [Knowledge Graph Reasoning: Embedding-Based Link Prediction, Logical Inference, and Neurosymbolic Methods](../knowledge-graph-reasoning.md)