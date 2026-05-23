---
id: kb-2026-00272
title: Reinforcement Learning
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: ai_assisted
ai_models:
  - claude-opus
derived_from_human_seed: true
atomic_facts:
  - id: fact-ai-001
    statement: >-
      Reinforcement Learning (RL) trains agents to make sequential decisions by maximizing cumulative reward through trial-and-error interaction with an environment. Key concepts: Agent, Environment,
      State, Action, Reward, Policy. Famous successes: AlphaGo, Dota 2 (OpenAI Five), robotics.
    confidence: high
    source_url: http://incompleteideas.net/book/the-book-2nd.html
    source_title: "Reinforcement Learning: An Introduction (2nd Ed, Sutton & Barto)"
  - id: fact-ai-002
    statement: "Key concepts: Agent, Environment, State, Action, Reward, Policy."
    confidence: high
    source_url: https://arxiv.org/abs/1707.06347
    source_title: Proximal Policy Optimization Algorithms
  - id: fact-ai-003
    statement: "Famous successes: AlphaGo, Dota 2 (OpenAI Five), robotics."
    confidence: high
    source_url: https://www.nature.com/articles/nature16961
    source_title: Mastering the Game of Go with Deep Neural Networks and Tree Search (AlphaGo)
  - id: fact-ai-004
    statement: "Value functions: V(s) expected return from state, Q(s,a) from state-action pair."
    confidence: high
    source_url: http://incompleteideas.net/book/the-book-2nd.html
    source_title: "Reinforcement Learning: An Introduction (2nd Ed, Sutton & Barto)"
  - id: fact-ai-005
    statement: "Bellman equation: recursive relationship of value functions."
    confidence: high
    source_url: https://www.nature.com/articles/nature16961
    source_title: Mastering the Game of Go with Deep Neural Networks and Tree Search (AlphaGo)
primary_sources:
  - title: "Reinforcement Learning: An Introduction (2nd Ed, Sutton & Barto)"
    type: textbook
    year: 2018
    url: http://incompleteideas.net/book/the-book-2nd.html
    institution: MIT Press
    authors:
      - Sutton
      - Barto
  - title: Mastering the Game of Go with Deep Neural Networks and Tree Search (AlphaGo)
    type: academic_paper
    year: 2016
    url: https://www.nature.com/articles/nature16961
    institution: Nature / DeepMind
    authors:
      - Silver
      - Huang
      - Maddison
      - et al.
secondary_sources:
  - title: Proximal Policy Optimization Algorithms
    type: academic_paper
    year: 2017
    url: https://arxiv.org/abs/1707.06347
    institution: OpenAI
    authors:
      - Schulman
      - Wolski
      - Dhariwal
      - et al.
known_gaps:
  - Statistics and data cited are from 2024 and earlier; more recent developments may have become available since publication
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
disputed_statements:
  - statement: Model-based vs model-free RL remains a fundamental trade-off; model-based approaches offer sample efficiency at the cost of compounding model errors
    context: See Sutton & Barto, Chapter 8-9
completeness: 0.85
---

## TL;DR

Reinforcement Learning (RL) trains agents to make sequential decisions by maximizing cumulative reward through trial-and-error interaction with an environment. Key concepts: Agent, Environment, State, Action, Reward, Policy. Famous successes: AlphaGo, Dota 2 (OpenAI Five), robotics.

## Core Explanation

Markov Decision Process (MDP): formalizes RL as (S, A, P, R, γ). Value functions: V(s) expected return from state, Q(s,a) from state-action pair. Bellman equation: recursive relationship of value functions. Q-learning: model-free, learns optimal policy without environment model. Deep Q-Network (DQN, DeepMind 2013): combines Q-learning with deep neural networks, mastered Atari games from pixels.

## Further Reading

- [Reinforcement Learning: An Introduction (2nd Ed, Sutton & Barto)](http://incompleteideas.net/book/the-book-2nd.html)
