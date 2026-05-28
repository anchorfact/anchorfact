---
id: robot-manipulation
title: 'Robot Manipulation: Dexterous Grasping, Sim-to-Real Transfer, and Tactile Sensing'
schema_type: article
category: ai
language: en
confidence: medium
last_verified: '2026-05-28'
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
  - id: af-robot-manipulation-1
    statement: OpenAI's dexterous-manipulation work trained a simulated Shadow Hand with domain randomization before transferring the policy to a physical robot hand.
    source_title: Learning Dexterous In-Hand Manipulation
    source_url: https://arxiv.org/abs/1808.00177
    confidence: medium
  - id: af-robot-manipulation-2
    statement: QT-Opt framed vision-based robotic grasping as scalable deep reinforcement learning for closed-loop manipulation.
    source_title: Scalable Deep Reinforcement Learning for Vision-Based Robotic Manipulation
    source_url: https://arxiv.org/abs/1806.10293
    confidence: medium
  - id: af-robot-manipulation-3
    statement: RT-1 trained a transformer policy on a large real-world robot dataset to map language and visual observations to robot actions.
    source_title: 'RT-1: Robotics Transformer for Real-World Control at Scale'
    source_url: https://arxiv.org/abs/2212.06817
    confidence: medium
primary_sources:
  - id: ps-robot-manipulation-1
    title: Learning Dexterous In-Hand Manipulation
    type: academic_paper
    year: 2018
    institution: arXiv
    url: https://arxiv.org/abs/1808.00177
  - id: ps-robot-manipulation-2
    title: Scalable Deep Reinforcement Learning for Vision-Based Robotic Manipulation
    type: academic_paper
    year: 2018
    institution: arXiv
    url: https://arxiv.org/abs/1806.10293
  - id: ps-robot-manipulation-3
    title: 'RT-1: Robotics Transformer for Real-World Control at Scale'
    type: academic_paper
    year: 2022
    institution: arXiv
    url: https://arxiv.org/abs/2212.06817
known_gaps:
  - General-purpose manipulation across unseen household and industrial objects
  - Safe physical interaction under uncertain perception and contact conditions
disputed_statements: []
secondary_sources: []
updated: '2026-05-28'
---
## TL;DR
Robot manipulation studies how machines grasp, move, and use physical objects. Evidence-backed public claims should focus on demonstrated methods such as sim-to-real training, deep reinforcement learning for grasping, and transformer policies trained on robot data.

## Core Explanation
Manipulation sits at the intersection of perception, planning, control, and contact-rich physics. A robot must estimate where objects are, choose a grasp or action, execute under uncertainty, and adapt when contact differs from the model.

## Detailed Analysis
This topic is easy to overstate because laboratory demonstrations do not automatically become general-purpose robots. The repaired claims therefore cite specific research milestones and avoid unsupported success rates, future surveys, or broad product claims.

## Related Articles

- [3D Generation and Gaussian Splatting: From NeRF to Real-Time Rendering](../3d-generation-gaussian-splatting.md)
- [AI for Call Centers: Speech Analytics, Real-Time Agent Assist, and Sentiment Detection](../ai-call-center.md)
- [AI for Augmented Reality: Real-Time Object Detection, Depth Estimation, and Scene Understanding](../ai-for-augmented-reality-real-time-object-detection-depth-estimation-and-scene-understanding.md)
