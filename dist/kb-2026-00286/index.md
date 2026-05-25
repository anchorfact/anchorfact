---
atomic_facts:
  - confidence: high
    id: fact-ai-01
    source_doi: 10.48550/arXiv.1503.02531
    source_title: Distilling the Knowledge in a Neural Network
    source_url: https://arxiv.org/abs/1503.02531
    statement: Knowledge distillation transfers knowledge from a large teacher model to a smaller student model
  - confidence: high
    id: fact-ai-001
    source_doi: 10.48550/arXiv.1503.02531
    source_title: Distilling the Knowledge in a Neural Network
    source_url: https://arxiv.org/abs/1503.02531
    statement: >-
      Knowledge distillation transfers knowledge from a large teacher model to a smaller student model. The student learns to mimic the teacher's softened output probabilities (not just hard labels).
      This enables deploying compact models with near-teacher performance — critical for edge devices and mobile applications.
  - confidence: high
    id: fact-ai-002
    source_doi: 10.48550/arXiv.1503.02531
    source_title: Distilling the Knowledge in a Neural Network
    source_url: https://arxiv.org/abs/1503.02531
    statement: Loss = α * (KL divergence between student and teacher distributions) + (1-α) * (cross-entropy with ground truth).
  - confidence: high
    id: fact-ai-003
    source_doi: 10.48550/arXiv.1503.02531
    source_title: Distilling the Knowledge in a Neural Network
    source_url: https://arxiv.org/abs/1503.02531
    statement: "Applications: DistilBERT (6 layers instead of 12, 97% of BERT's performance), TinyBERT, MobileNet."
category: ai
completeness: 0.88
confidence: high
conflict_of_interest: none_declared
created_date: "2026-05-22"
data_period: static
derived_from_human_seed: true
disputed_statements:
  - statement: The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches
generation_method: ai_structured
id: kb-2026-00286
is_live_document: false
known_gaps:
  - Statistics and data cited are from 2016 and earlier; more recent data may have become available since publication
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
  - Recent developments from 2025-2026 may not be reflected
language: en
last_verified: "2026-05-22"
primary_sources:
  - authors:
      - Hinton, Geoffrey
      - Vinyals, Oriol
      - Dean, Jeff
    institution: Google / NeurIPS Workshop
    title: Distilling the Knowledge in a Neural Network (Hinton, Vinyals, Dean)
    type: workshop
    url: https://arxiv.org/abs/1503.02531
    year: 2015
  - authors:
      - Gou, Jianping
      - Yu, Baosheng
      - Maybank, Stephen J.
      - Tao, Dacheng
    institution: International Journal of Computer Vision (Springer)
    title: "Knowledge Distillation: A Survey (Gou, Yu, Maybank, Tao)"
    type: survey_paper
    url: https://doi.org/10.1007/s11263-021-01453-z
    year: 2021
  - authors:
      - Jiao, Xiaoqi
      - Yin, Yichun
      - Shang, Lifeng
      - et al.
    institution: Huawei Noah's Ark Lab / EMNLP
    title: "TinyBERT: Distilling BERT for Natural Language Understanding"
    type: conference_paper
    url: https://arxiv.org/abs/1909.10351
    year: 2020
schema_type: TechArticle
secondary_sources:
  - institution: MIT Press
    title: Deep Learning (Goodfellow, Bengio, Courville)
    type: book
    url: https://www.deeplearningbook.org/
    year: 2016
title: Knowledge Distillation
updated: "2026-05-24"
---
## TL;DR

Knowledge distillation transfers knowledge from a large teacher model to a smaller student model. The student learns to mimic the teacher's softened output probabilities (not just hard labels). This enables deploying compact models with near-teacher performance — critical for edge devices and mobile applications.

## Core Explanation

Temperature: higher T in softmax softens probability distribution, revealing more information about class relationships. Loss = α * (KL divergence between student and teacher distributions) + (1-α) * (cross-entropy with ground truth). Applications: DistilBERT (6 layers instead of 12, 97% of BERT's performance), TinyBERT, MobileNet. Distillation can transfer knowledge to entirely different architectures.

## Further Reading

- [Distilling the Knowledge in a Neural Network (Hinton, Vinyals, Dean, 2015)](https://arxiv.org/abs/1503.02531)
