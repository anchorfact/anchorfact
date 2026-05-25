---
id: deep-reinforcement-learning-algorithms
title: "Deep Reinforcement Learning Algorithms: PPO, SAC, Dreamer, and Decision Transformer"
schema_type: article
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-deep-reinforcement-learning-algorithms-1
    statement: >-
      PPO (Proximal Policy Optimization, Schulman et al., 2017) became the default deep RL algorithm — used by OpenAI for Dota 2 and robotics — by constraining policy updates to a "trust region" via
      clipped probability ratios, achieving stability without the complexity of TRPO.
    source_title: Schulman et al., arXiv 1707.06347 (2017) — OpenAI
    source_url: https://arxiv.org/abs/1707.06347
    confidence: high
  - id: af-deep-reinforcement-learning-algorithms-2
    statement: >-
      Dreamer v3 (Hafner et al., 2024) achieves super-human performance on Minecraft diamond collection without human data, learning a world model from pixels and planning via latent imagination —
      demonstrating that model-based RL can solve long-horizon tasks in complex 3D environments.
    source_title: Hafner et al., arXiv 2301.04104 (2024) — DeepMind
    source_url: https://arxiv.org/abs/2301.04104
    confidence: high
primary_sources:
  - id: ps-deep-reinforcement-learning-algorithms-1
    title: Proximal Policy Optimization Algorithms (PPO)
    type: academic_paper
    year: 2017
    institution: OpenAI / arXiv
    url: https://arxiv.org/abs/1707.06347
  - id: ps-deep-reinforcement-learning-algorithms-2
    title: Mastering Diverse Domains through World Models (Dreamer v3)
    type: academic_paper
    year: 2024
    institution: DeepMind / arXiv
    url: https://arxiv.org/abs/2301.04104
known_gaps:
  - Sample-efficient RL in physical environments
  - Safe exploration guarantees for RL agents
disputed_statements: []
secondary_sources:
  - title: Human-Level Control Through Deep Reinforcement Learning (DQN)
    type: journal_article
    year: 2015
    authors:
      - Mnih, Volodymyr
      - Kavukcuoglu, Koray
      - Silver, David
      - et al.
    institution: Nature / DeepMind
    url: https://www.nature.com/articles/nature14236
  - title: "Deep Reinforcement Learning: A Survey"
    type: survey_paper
    year: 2022
    authors:
      - Li, Yuxi
    institution: IEEE Transactions on Neural Networks and Learning Systems
    url: https://doi.org/10.1109/TNNLS.2021.3071272
  - title: Proximal Policy Optimization Algorithms (PPO)
    type: conference_paper
    year: 2017
    authors:
      - Schulman, John
      - Wolski, Filip
      - Dhariwal, Prafulla
      - Radford, Alec
      - Klimov, Oleg
    institution: OpenAI
    url: https://arxiv.org/abs/1707.06347
  - title: "Soft Actor-Critic: Off-Policy Maximum Entropy Deep RL with a Stochastic Actor (SAC)"
    type: conference_paper
    year: 2018
    authors:
      - Haarnoja, Tuomas
      - Zhou, Aurick
      - Abbeel, Pieter
      - Levine, Sergey
    institution: UC Berkeley / ICML
    url: https://arxiv.org/abs/1801.01290
updated: "2026-05-24"
---
## TL;DR
Deep Reinforcement Learning has evolved from simple DQN to sophisticated algorithms: PPO dominates continuous control, SAC excels at sample-efficient exploration, Dreamer learns world models, and Decision Transformer reframes RL as sequence modeling.

## Core Explanation
RL loop: agent observes state s, takes action a, receives reward r, transitions to s'. Goal: maximize cumulative reward. Algorithm families: (1) Value-based (DQN) — learn Q(s,a) values, act greedily; (2) Policy-based (REINFORCE) — directly optimize policy π(a|s); (3) Actor-critic (PPO, SAC) — combine both. PPO uses importance sampling with clipping for stable updates; SAC adds entropy bonus for exploration; Dreamer builds learned world model for planning.

## Detailed Analysis
Offline RL trains from fixed datasets without environment interaction — Decision Transformer treats RL trajectories as sequences and uses causal self-attention: given return-to-go, past states, and past actions, predict next action. CQL (Conservative Q-Learning) prevents overestimation on out-of-distribution actions. Model-based RL (Dreamer, MuZero) learns environment dynamics for planning in latent space, dramatically improving sample efficiency.

## Further Reading
- Spinning Up in Deep RL (OpenAI)
- Stable-Baselines3 Library
- RLHF in Practice

## Related Articles

- [Optimization Algorithms for Deep Learning](../optimization-algorithms.md)
- [AI for Algorithmic Trading: Reinforcement Learning, Market Prediction, and Quantitative Finance](../ai-for-algorithmic-trading.md)
- [AI for Chip Design: Reinforcement Learning Placement, EDA Automation, and Semiconductor Intelligence](../ai-for-chip-design.md)
