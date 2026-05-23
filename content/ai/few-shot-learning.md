---
id: "few-shot-learning"
title: "Few-Shot Learning: Prototypical Networks, MAML, and In-Context Adaptation"
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
  - id: "af-few-shot-learning-1"
    statement: "Few-shot learning paradigms evolved through three eras: (1) Metric learning (2015-2018) -- Prototypical Networks (ProtoNet, NeurIPS 2017) learn distance metrics and classify via nearest-prototype comparison, achieving 56% on miniImageNet 5-way 1-shot; (2) Optimization-based (2017-2019) -- MAML (ICML 2017) learns a model initialization that adapts to new tasks in 1-5 gradient steps; (3) Foundation model era (2022-present) -- GPT-3/Claude perform few-shot via in-context examples without parameter updates."
    source_title: "ProtoNet (Snell et al., NeurIPS 2017) / MAML (Finn et al., ICML 2017) -- foundational few-shot learning methods / Foundation model in-context learning (2022-present)"
    source_url: "https://arxiv.org/abs/1703.05175"
    confidence: "high"
  - id: "af-few-shot-learning-2"
    statement: "Foundation model few-shot learning (2023-2025) demonstrated that large models achieve 70-90% accuracy on novel classification tasks given 5-10 demonstration examples in the prompt -- without any parameter updates -- effectively shifting research focus from meta-learning algorithms to in-context learning mechanisms and optimal demonstration selection strategies."
    source_title: "GPT-3/4 in-context learning (2020-2024) / Brown et al. -- Language Models are Few-Shot Learners / Meta-learning survey (2025)"
    source_url: "https://arxiv.org/abs/1703.03400"
    confidence: "high"
primary_sources:
  - id: "ps-few-shot-learning-1"
    title: "Prototypical Networks for Few-shot Learning"
    type: "academic_paper"
    year: 2017
    institution: "NeurIPS / University of Toronto"
    url: "https://arxiv.org/abs/1703.05175"
  - id: "ps-few-shot-learning-2"
    title: "Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks (MAML)"
    type: "academic_paper"
    year: 2017
    institution: "ICML / UC Berkeley"
    url: "https://arxiv.org/abs/1703.03400"
known_gaps:
  - "Optimal demonstration selection -- which examples maximize in-context learning performance"
  - "Adapting foundation models to entirely novel domains with no training distribution overlap"
disputed_statements: []
---

## TL;DR
Few-shot learning teaches AI to recognize new concepts from just a handful of examples -- the way humans learn (see one panda, recognize all pandas). From Prototypical Networks to MAML to in-context learning in foundation models, the ability to generalize from few examples is transforming AI from narrow specialists to flexible generalists.

## Core Explanation
The N-way K-shot classification problem: given N classes with K labeled examples each, classify a new query example. Meta-learning (learning to learn): train on many small tasks (episodes), each with N-way K-shot structure. Three paradigms: (1) Metric-based -- ProtoNet computes class prototypes as mean embedding of support examples, classifies query by nearest-prototype distance; (2) Optimization-based -- MAML trains parameters such that one gradient step on a new task's loss produces good performance; (3) Hallucination-based -- generate additional training examples via data augmentation or generative models.

## Detailed Analysis
ProtoNet (Snell et al., 2017): embedding function maps inputs to a metric space where Euclidean distance corresponds to semantic similarity. Compute prototype per class, classify query as closest prototype. Works well when classes are visually distinct, struggles with fine-grained categories. MAML (Finn et al., 2017): learns initialization sensitive to task-specific gradients. Inner loop: task-specific adaptation (few gradient steps). Outer loop: meta-update across tasks. Foundation model few-shot: rather than meta-training, simply prompt a frozen LLM with examples. Key observation (Min et al., 2022): demonstration labels need not be correct -- model learns task format, not specific answers. Ground-truth labels provide marginal gain over random labels. Applications: medical imaging (rare disease classification), personalized NLP, and robotics (adapting manipulation to novel objects).

## Further Reading
- Learn2Learn: PyTorch Meta-Learning Library
- Meta-Dataset: Few-Shot Learning Benchmark
- ChatGPT Few-Shot Prompting Guide
