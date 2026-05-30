---
id: meta-learning
title: 'Meta-Learning: MAML, Reptile, and Prototypical Networks'
schema_type: article
category: ai
language: en
confidence: medium
last_verified: '2026-05-30'
created_date: '2026-05-24'
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.72
atomic_facts:
  - id: af-meta-learning-1
    statement: 'MAML trains model parameters so that a small number of gradient updates on a new task can produce good task-specific performance.'
    source_title: 'Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks'
    source_url: https://arxiv.org/abs/1703.03400
    confidence: medium
  - id: af-meta-learning-2
    statement: 'Reptile is a first-order meta-learning algorithm that repeatedly trains on sampled tasks and moves the initialization toward the task-trained weights.'
    source_title: 'On First-Order Meta-Learning Algorithms'
    source_url: https://arxiv.org/abs/1803.02999
    confidence: medium
  - id: af-meta-learning-3
    statement: 'Prototypical Networks learn an embedding space in which few-shot classification uses distances to class prototypes computed from support examples.'
    source_title: 'Prototypical Networks for Few-shot Learning'
    source_url: https://arxiv.org/abs/1703.05175
    confidence: medium
primary_sources:
  - id: ps-meta-learning-1
    title: 'Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks'
    type: conference_paper
    year: 2017
    institution: ICML
    url: https://arxiv.org/abs/1703.03400
  - id: ps-meta-learning-2
    title: 'On First-Order Meta-Learning Algorithms'
    type: academic_paper
    year: 2018
    institution: arXiv
    url: https://arxiv.org/abs/1803.02999
  - id: ps-meta-learning-3
    title: 'Prototypical Networks for Few-shot Learning'
    type: conference_paper
    year: 2017
    institution: NeurIPS
    url: https://arxiv.org/abs/1703.05175
known_gaps:
  - Meta-learning performance depends strongly on the task distribution used for meta-training.
  - Few-shot benchmark success does not automatically transfer to open-ended deployment tasks.
disputed_statements: []
secondary_sources: []
updated: '2026-05-30'
---

## TL;DR

Meta-learning trains systems so they can adapt quickly to new tasks. MAML and Reptile focus on learning useful initial parameters, while Prototypical Networks learn an embedding space for few-shot classification.

## Core Explanation

The core setup is a distribution of related tasks. A meta-learner sees many training tasks, then is evaluated on new tasks from the same family with only a small support set. This differs from ordinary supervised learning because the objective is fast adaptation, not only high accuracy on one fixed dataset.

Gradient-based methods such as MAML and Reptile optimize an initialization that can move quickly after a few updates. Metric-based methods such as Prototypical Networks instead learn a representation where examples from the same class are close to a class prototype.

## Related Articles

- [Few-Shot Learning: Prototypical Networks, MAML, and In-Context Adaptation](../few-shot-learning.md)
- [Transfer Learning: Fine-Tuning and Feature Reuse](../transfer-learning.md)
- [Reinforcement Learning: Agents, Rewards, and Policies](../reinforcement-learning.md)
