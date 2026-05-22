---
id:"kb-2026-00272"
title:"Reinforcement Learning"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Reinforcement Learning: An Introduction (2nd Edition)"
    authors: ["Sutton, Richard S.", "Barto, Andrew G."]
    type: "book"
    year: 2018
    url: "http://incompleteideas.net/book/the-book-2nd.html"
    institution: "MIT Press"
    note: "The definitive RL textbook — covers MDPs, DP, Monte Carlo, TD learning, policy gradients, and deep RL"
secondary_sources:
  - title: "Human-level control through deep reinforcement learning (DQN)"
    authors: ["Mnih, Volodymyr", "Kavukcuoglu, Koray", "Silver, David", "et al."]
    type: "academic_paper"
    year: 2015
    doi: "10.1038/nature14236"
    url: "https://www.nature.com/articles/nature14236"
    institution: "Nature"
    note: "Published in Nature 2015. DeepMind's DQN mastered Atari games from pixels. 30,000+ citations. Launched the deep RL era."
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Reinforcement Learning (RL) trains agents to make sequential decisions by maximizing cumulative reward through trial-and-error interaction with an environment. Key concepts: Agent, Environment, State, Action, Reward, Policy. Famous successes: AlphaGo, Dota 2 (OpenAI Five), robotics.

## Core Explanation

Markov Decision Process (MDP): formalizes RL as (S, A, P, R, γ). Value functions: V(s) expected return from state, Q(s,a) from state-action pair. Bellman equation: recursive relationship of value functions. Q-learning: model-free, learns optimal policy without environment model. Deep Q-Network (DQN, DeepMind 2013): combines Q-learning with deep neural networks, mastered Atari games from pixels.

## Further Reading

- [Reinforcement Learning: An Introduction (2nd Ed, Sutton & Barto)](http://incompleteideas.net/book/the-book-2nd.html)
