---
id: "kb-2026-00286"
title: "Knowledge Distillation"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-ai-01"
    statement: "Knowledge distillation transfers knowledge from a large teacher model to a smaller student model"
    source_title: "Distilling the Knowledge in a Neural Network"
    source_url: "https://arxiv.org/abs/1503.02531"
    source_doi: "10.48550/arXiv.1503.02531"
    confidence: "high"
  - id: "fact-ai-001"
    statement: "Knowledge distillation transfers knowledge from a large teacher model to a smaller student model. The student learns to mimic the teacher's softened output probabilities (not just hard labels). This enables deploying compact models with near-teacher performance — critical for edge devices and mobile applications."
    source_title: "Distilling the Knowledge in a Neural Network"
    source_url: "https://arxiv.org/abs/1503.02531"
    source_doi: "10.48550/arXiv.1503.02531"
    confidence: "high"
  - id: "fact-ai-002"
    statement: "Loss = α * (KL divergence between student and teacher distributions) + (1-α) * (cross-entropy with ground truth)."
    source_title: "Distilling the Knowledge in a Neural Network"
    source_url: "https://arxiv.org/abs/1503.02531"
    source_doi: "10.48550/arXiv.1503.02531"
    confidence: "high"
  - id: "fact-ai-003"
    statement: "Applications: DistilBERT (6 layers instead of 12, 97% of BERT's performance), TinyBERT, MobileNet."
    source_title: "Distilling the Knowledge in a Neural Network"
    source_url: "https://arxiv.org/abs/1503.02531"
    source_doi: "10.48550/arXiv.1503.02531"
    confidence: "high"

completeness: 0.88

known_gaps:
  - "Statistics and data cited are from 2016 and earlier; more recent data may have become available since publication"
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
  - "Recent developments from 2025-2026 may not be reflected"

disputed_statements:
  - statement: "The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches"

primary_sources:
  - title: "Distilling the Knowledge in a Neural Network"
    authors: ["Hinton, Geoffrey", "Vinyals, Oriol", "Dean, Jeff"]
    type: "academic_paper"
    year: 2015
    url: "https://arxiv.org/abs/1503.02531"
    doi: "10.48550/arXiv.1503.02531"
    institution: "NeurIPS Workshop"

secondary_sources:
  - title: "Deep Learning (Goodfellow, Bengio, Courville)"
    type: "book"
    year: 2016
    url: "https://www.deeplearningbook.org/"
    institution: "MIT Press"

---



## TL;DR

Knowledge distillation transfers knowledge from a large teacher model to a smaller student model. The student learns to mimic the teacher's softened output probabilities (not just hard labels). This enables deploying compact models with near-teacher performance — critical for edge devices and mobile applications.

## Core Explanation

Temperature: higher T in softmax softens probability distribution, revealing more information about class relationships. Loss = α * (KL divergence between student and teacher distributions) + (1-α) * (cross-entropy with ground truth). Applications: DistilBERT (6 layers instead of 12, 97% of BERT's performance), TinyBERT, MobileNet. Distillation can transfer knowledge to entirely different architectures.

## Further Reading

- [Distilling the Knowledge in a Neural Network (Hinton, Vinyals, Dean, 2015)](https://arxiv.org/abs/1503.02531)
