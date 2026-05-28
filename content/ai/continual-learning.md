---
id: continual-learning
title: "Continual Learning and Catastrophic Forgetting: EWC to MESU"
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
  - id: af-ai-continual-learning-1
    statement: >-
      Elastic Weight Consolidation addresses catastrophic forgetting by penalizing changes to
      parameters important for previous tasks.
    source_title: Overcoming catastrophic forgetting in neural networks
    source_url: https://doi.org/10.1073/pnas.1611835114
    confidence: medium
  - id: af-ai-continual-learning-2
    statement: Gradient Episodic Memory constrains gradient updates using stored examples from earlier tasks.
    source_title: Gradient Episodic Memory for Continual Learning
    source_url: https://arxiv.org/abs/1706.08840
    confidence: medium
  - id: af-ai-continual-learning-3
    statement: >-
      Learning without Forgetting trains new tasks while preserving behavior on previous tasks
      through distillation-like objectives.
    source_title: Learning without Forgetting
    source_url: https://arxiv.org/abs/1606.09282
    confidence: medium
primary_sources:
  - id: ps-ai-continual-learning-1
    title: Overcoming catastrophic forgetting in neural networks
    type: academic_paper
    year: 2017
    institution: PNAS
    url: https://doi.org/10.1073/pnas.1611835114
  - id: ps-ai-continual-learning-2
    title: Gradient Episodic Memory for Continual Learning
    type: academic_paper
    year: 2017
    institution: arXiv
    url: https://arxiv.org/abs/1706.08840
  - id: ps-ai-continual-learning-3
    title: Learning without Forgetting
    type: academic_paper
    year: 2016
    institution: arXiv
    url: https://arxiv.org/abs/1606.09282
known_gaps:
  - Task-free continual learning without task boundaries
  - Continual learning for large language models
disputed_statements: []
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
Continual Learning and Catastrophic Forgetting: EWC to MESU: Continual learning studies how models can learn new tasks or data over time without catastrophically forgetting earlier knowledge.

## Core Explanation
Common strategies include regularizing important parameters, replaying or storing examples, and constraining updates so new learning does not erase previous tasks. Evaluation requires sequences of tasks rather than a single static train-test split.

## Further Reading

- [Overcoming catastrophic forgetting in neural networks](https://doi.org/10.1073/pnas.1611835114)
- [Gradient Episodic Memory for Continual Learning](https://arxiv.org/abs/1706.08840)
- [Learning without Forgetting](https://arxiv.org/abs/1606.09282)
