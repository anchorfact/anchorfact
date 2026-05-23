---
id: kb-2026-00273
title: Transfer Learning
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
primary_sources:
  - title: A Survey on Transfer Learning
    authors:
      - Pan, Sinno Jialin
      - Yang, Qiang
    type: academic_paper
    year: 2010
    doi: 10.1109/TKDE.2009.191
    url: https://ieeexplore.ieee.org/document/5288526
    institution: IEEE Transactions on Knowledge and Data Engineering
    note: "The foundational transfer learning survey. 30,000+ citations. Defines the taxonomy: inductive, transductive, and unsupervised transfer learning."
secondary_sources:
  - title: Deep Learning (Goodfellow, Bengio, Courville)
    type: book
    year: 2016
    url: https://www.deeplearningbook.org/
    institution: MIT Press
    note: "Chapter 15: Representation Learning — covers transfer learning and domain adaptation in deep networks"
completeness: 0.88
disputed_statements:
  - statement: The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches
    confidence: medium
known_gaps:
  - Statistics and data cited are from 2016 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
ai_citations:
  - title: How transferable are features in deep neural networks?
    authors:
      - Yosinski, Jason
      - Clune, Jeff
      - Bengio, Yoshua
      - Lipson, Hod
    type: academic_paper
    year: 2014
    doi: 10.48550/arXiv.1411.1792
    url: https://arxiv.org/abs/1411.1792
    institution: Cornell University
  - title: How transferable are features in deep neural networks?
    authors:
      - Yosinski, Jason
      - Clune, Jeff
      - Bengio, Yoshua
      - Lipson, Hod
    type: academic_paper
    year: 2014
    doi: 10.48550/arXiv.1411.1792
    url: https://arxiv.org/abs/1411.1792
    institution: Cornell University
atomic_facts:
  - id: fact-ai-001
    statement: >-
      Transfer learning applies knowledge from a source domain to improve learning in a target domain. In deep learning: pre-train on large generic dataset (ImageNet), fine-tune on specific task with
      small labeled dataset. This is the dominant paradigm in computer vision and NLP — training from scratch is rare.
    confidence: high
    source_title: A Survey on Transfer Learning
    source_url: https://ieeexplore.ieee.org/document/5288526
    source_doi: 10.1109/TKDE.2009.191
  - id: fact-ai-002
    statement: "Few-shot learning: learn from very few examples (5-50 per class)."
    confidence: high
    source_title: A Survey on Transfer Learning
    source_url: https://ieeexplore.ieee.org/document/5288526
    source_doi: 10.1109/TKDE.2009.191
---


## TL;DR

Transfer learning applies knowledge from a source domain to improve learning in a target domain. In deep learning: pre-train on large generic dataset (ImageNet), fine-tune on specific task with small labeled dataset. This is the dominant paradigm in computer vision and NLP — training from scratch is rare.

## Core Explanation

Fine-tuning strategies: freeze early layers (general features), train later layers (task-specific). Full fine-tuning: update all weights. Linear probing: freeze backbone, train only classifier head. Domain adaptation: source and target domains have different distributions. Few-shot learning: learn from very few examples (5-50 per class).

## Further Reading

- [A Survey on Transfer Learning (Pan & Yang, 2010)](https://ieeexplore.ieee.org/document/5288526)
