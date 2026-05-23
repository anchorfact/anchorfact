---
id: "world-models-video-prediction"
title: "World Models: Video Prediction, Physical Reasoning, and Interactive AI"
schema_type: "article"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: "ai_assisted"
ai_models: ["claude-4.5-sonnet"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"
completeness: 0.85
atomic_facts:
  - id: "af-world-models-video-prediction-1"
    statement: "Sora (OpenAI, 2024) generates 1-minute coherent videos from text prompts by treating video patches as tokens in a diffusion transformer — demonstrating emergent understanding of 3D geometry, object permanence, and basic physics from pure video data, described as a \"world simulator\" by OpenAI researchers."
    source_title: "OpenAI Sora Technical Report (2024)"
    source_url: "https://openai.com/index/video-generation-models-as-world-simulators/"
    confidence: "high"
  - id: "af-world-models-video-prediction-2"
    statement: "UniSim (UC Berkeley, 2024) trains a single world model on diverse internet video (driving, robotics, human activities) using next-token prediction, achieving zero-shot transfer to robot manipulation tasks — the model learns physics by watching videos."
    source_title: "Yang et al., UniSim (UC Berkeley, ICML 2024)"
    source_url: "https://arxiv.org/abs/2312.06114"
    confidence: "high"
primary_sources:
  - id: "ps-world-models-video-prediction-1"
    title: "Video generation models as world simulators (Sora)"
    type: "technical_report"
    year: 2024
    institution: "OpenAI"
    url: "https://openai.com/index/video-generation-models-as-world-simulators/"
  - id: "ps-world-models-video-prediction-2"
    title: "UniSim: Learning Interactive Real-World Simulators"
    type: "academic_paper"
    year: 2024
    institution: "UC Berkeley (ICML)"
    url: "https://arxiv.org/abs/2312.06114"
known_gaps:
  - "Long-term causal reasoning in world models"
  - "World models for scientific simulation"
disputed_statements: []
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
