---
id: concept-based-explainability
title: "Concept-Based Explainability: TCAV and Concept Bottleneck Models"
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
  - id: af-ai-concept-based-explainability-1
    statement: >-
      TCAV tests a model using concept activation vectors to quantify sensitivity to user-defined
      concepts.
    source_title: >-
      Interpretability Beyond Feature Attribution: Quantitative Testing with Concept Activation
      Vectors
    source_url: https://arxiv.org/abs/1711.11279
    confidence: medium
  - id: af-ai-concept-based-explainability-2
    statement: Concept Bottleneck Models predict intermediate concepts before predicting a final task label.
    source_title: Concept Bottleneck Models
    source_url: https://arxiv.org/abs/2007.04612
    confidence: medium
  - id: af-ai-concept-based-explainability-3
    statement: >-
      ACE proposes automatically discovering concepts for concept-based explanations of
      convolutional neural networks.
    source_title: "ACE: Automatic Concept-based Explanations for CNNs"
    source_url: https://arxiv.org/abs/1902.03129
    confidence: medium
primary_sources:
  - id: ps-ai-concept-based-explainability-1
    title: >-
      Interpretability Beyond Feature Attribution: Quantitative Testing with Concept Activation
      Vectors
    type: academic_paper
    year: 2017
    institution: arXiv
    url: https://arxiv.org/abs/1711.11279
  - id: ps-ai-concept-based-explainability-2
    title: Concept Bottleneck Models
    type: academic_paper
    year: 2020
    institution: arXiv
    url: https://arxiv.org/abs/2007.04612
  - id: ps-ai-concept-based-explainability-3
    title: "ACE: Automatic Concept-based Explanations for CNNs"
    type: academic_paper
    year: 2019
    institution: arXiv
    url: https://arxiv.org/abs/1902.03129
known_gaps:
  - Automatic concept discovery without human labeling
  - Truthfulness and reliability of concept explanations
disputed_statements: []
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
Concept-Based Explainability: TCAV and Concept Bottleneck Models: Concept-based explainability explains model behavior with human-interpretable concepts rather than only raw features or saliency maps.

## Core Explanation
Concept methods can test whether a model is sensitive to a concept, route predictions through concept bottlenecks, or discover visual concepts automatically. Their quality depends on concept definitions, datasets, and evaluation.

## Further Reading

- [Interpretability Beyond Feature Attribution: Quantitative Testing with Concept Activation Vectors](https://arxiv.org/abs/1711.11279)
- [Concept Bottleneck Models](https://arxiv.org/abs/2007.04612)
- [ACE: Automatic Concept-based Explanations for CNNs](https://arxiv.org/abs/1902.03129)
