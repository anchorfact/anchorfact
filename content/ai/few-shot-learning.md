---
id: few-shot-learning
title: "Few-Shot Learning: Prototypical Networks, MAML, and In-Context Adaptation"
schema_type: article
category: ai
language: en
confidence: medium
last_verified: "2026-05-28"
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
  - id: af-ai-few-shot-learning-1
    statement: >-
      Matching Networks learn an attention-based nearest-neighbor style classifier for one-shot
      learning.
    source_title: Matching Networks for One Shot Learning
    source_url: https://arxiv.org/abs/1606.04080
    confidence: medium
  - id: af-ai-few-shot-learning-2
    statement: >-
      Prototypical Networks classify few-shot examples by distances to class prototypes in an
      embedding space.
    source_title: Prototypical Networks for Few-shot Learning
    source_url: https://arxiv.org/abs/1703.05175
    confidence: medium
  - id: af-ai-few-shot-learning-3
    statement: >-
      MAML optimizes model parameters so the model can adapt quickly to new tasks with a small
      number of gradient steps.
    source_title: Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks
    source_url: https://arxiv.org/abs/1703.03400
    confidence: medium
primary_sources:
  - id: ps-ai-few-shot-learning-1
    title: Matching Networks for One Shot Learning
    type: academic_paper
    year: 2016
    institution: arXiv
    url: https://arxiv.org/abs/1606.04080
  - id: ps-ai-few-shot-learning-2
    title: Prototypical Networks for Few-shot Learning
    type: academic_paper
    year: 2017
    institution: arXiv
    url: https://arxiv.org/abs/1703.05175
  - id: ps-ai-few-shot-learning-3
    title: Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks
    type: academic_paper
    year: 2017
    institution: arXiv
    url: https://arxiv.org/abs/1703.03400
known_gaps:
  - Optimal demonstration selection -- which examples maximize in-context learning performance
  - Adapting foundation models to entirely novel domains with no training distribution overlap
disputed_statements: []
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
Few-Shot Learning: Prototypical Networks, MAML, and In-Context Adaptation: Few-shot learning aims to learn new classes or tasks from only a small number of labeled examples.

## Core Explanation
Important approaches include metric learning, prototype-based classification, and meta-learning. These methods are evaluated with episodes that mimic learning from limited support examples.

## Further Reading

- [Matching Networks for One Shot Learning](https://arxiv.org/abs/1606.04080)
- [Prototypical Networks for Few-shot Learning](https://arxiv.org/abs/1703.05175)
- [Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks](https://arxiv.org/abs/1703.03400)
