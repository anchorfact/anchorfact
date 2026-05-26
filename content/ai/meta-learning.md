---
id: meta-learning
title: "Meta-Learning: Learning to Learn with MAML and Reptile"
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
  - id: af-meta-learning-1
    statement: >-
      MAML (Model-Agnostic Meta-Learning, Finn et al., ICML 2017) trains a model initialization that can adapt to any new task with just a few gradient steps — the inner loop fine-tunes on a specific
      task while the outer loop optimizes the initialization for fast adaptation across tasks.
    source_title: Finn et al., ICML (2017)
    source_url: https://arxiv.org/abs/1703.03400
    confidence: high
  - id: af-meta-learning-2
    statement: >-
      Reptile (Nichol et al., 2018) simplifies MAML by using a first-order approximation — repeatedly sample a task, train on it for k steps, and move the initialization toward the final trained
      weights — achieving comparable performance without requiring second-order derivatives.
    source_title: Nichol et al., arXiv (2018)
    source_url: https://arxiv.org/abs/1803.02999
    confidence: high
primary_sources:
  - id: ps-meta-learning-1
    title: Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks (MAML)
    type: academic_paper
    year: 2017
    institution: ICML
    url: https://arxiv.org/abs/1703.03400
  - id: ps-meta-learning-2
    title: On First-Order Meta-Learning Algorithms (Reptile)
    type: academic_paper
    year: 2018
    institution: OpenAI
    url: https://arxiv.org/abs/1803.02999
known_gaps:
  - Meta-learning for large-scale continual adaptation
  - Cross-domain meta-learning (vision to text)
disputed_statements: []
secondary_sources:
  - title: "Meta-Learning Approaches for Few-Shot Learning: A Survey of Recent Advances"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/3659943
  - title: Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks (MAML)
    type: conference_paper
    year: 2017
    authors:
      - Finn, Chelsea
      - Abbeel, Pieter
      - Levine, Sergey
    institution: UC Berkeley / ICML
    url: https://arxiv.org/abs/1703.03400
  - title: Learning to Learn by Gradient Descent by Gradient Descent
    type: conference_paper
    year: 2016
    authors:
      - Andrychowicz, Marcin
      - Denil, Misha
      - Gomez, Sergio
      - et al.
    institution: Google DeepMind / NeurIPS
    url: https://arxiv.org/abs/1606.04474
  - title: "Meta-Learning for Few-Shot Open Task Recognition: Beyond Fixed-Design Benchmarks"
    type: journal_article
    year: 2025
    authors:
      - multiple
    institution: Nature Scientific Reports
    url: https://doi.org/10.1038/s41598-026-36291-x
updated: "2026-05-24"
---
## TL;DR
Meta-learning trains models to learn efficiently. Given a distribution of tasks, the meta-learner acquires knowledge that accelerates learning on new tasks — the model "learns how to learn." MAML finds optimal initializations; Reptile simplifies the process.

## Core Explanation
Few-shot learning: classify images of a new species from only 5 examples. Meta-learning solution: train on many classification tasks (different species each time) so the model learns a representation and adaptation strategy that generalizes to novel categories. MAML's inner loop (task-specific fine-tuning) and outer loop (meta-optimization across tasks) create a bi-level optimization.

## Detailed Analysis
Beyond MAML: (1) Metric-based meta-learning — Prototypical Networks learn an embedding where each class has a prototype (mean of support examples), classification by nearest prototype; (2) Matching Networks with attention over support set; (3) Meta-RL — RL^2 and PEARL train policies that adapt behavior from trial-and-error in new environments. ANIL shows MAML's power comes from feature reuse, not rapid learning.

## Further Reading
- Chelsea Finn: Meta-Learning Tutorial (ICML)
- learn2learn PyTorch Library
- Few-shot Learning Survey (Wang et al.)

## Related Articles

- [Few-Shot Learning: Prototypical Networks, MAML, and In-Context Adaptation](../few-shot-learning.md)
- [Learning How to Learn](../../self-improvement/learning-how-to-learn.md)
- [Adversarial Machine Learning: Attacks, Defenses, and Robustness Engineering](../adversarial-machine-learning.md)