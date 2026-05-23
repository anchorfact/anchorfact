---
id: "kb-2026-00273"
title: "Transfer Learning"
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
  - id: "fact-ai-001"
    statement: "Transfer learning applies knowledge from a source domain to improve learning in a target domain. In deep learning: pre-train on large generic dataset (ImageNet), fine-tune on specific task with small labeled dataset. This is the dominant paradigm in computer vision and NLP — training from scratch is rare."
    source_title: "A Survey on Transfer Learning"
    source_url: "https://ieeexplore.ieee.org/document/5288526"
    source_doi: "10.1109/TKDE.2009.191"
    confidence: "high"
  - id: "fact-ai-002"
    statement: "Few-shot learning: learn from very few examples (5-50 per class)."
    source_title: "A Survey on Transfer Learning"
    source_url: "https://ieeexplore.ieee.org/document/5288526"
    source_doi: "10.1109/TKDE.2009.191"
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
  - title: "A Survey on Transfer Learning"
    authors: ["Pan, Sinno Jialin", "Yang, Qiang"]
    type: "academic_paper"
    year: 2010
    url: "https://ieeexplore.ieee.org/document/5288526"
    doi: "10.1109/TKDE.2009.191"
    institution: "IEEE Transactions on Knowledge and Data Engineering"

secondary_sources:
  - title: "Deep Learning (Goodfellow, Bengio, Courville)"
    type: "book"
    year: 2016
    url: "https://www.deeplearningbook.org/"
    institution: "MIT Press"
  - title: "How transferable are features in deep neural networks?"
    authors: ["Yosinski", "Clune", "Bengio", "Lipson"]
    type: "academic_paper"
    year: 2014
    url: "https://arxiv.org/abs/1411.1792"
    institution: "NIPS / Cornell"
  - title: "A Closer Look at Few-shot Classification"
    authors: ["Chen", "Liu", "Kira", "Wang", "Huang"]
    type: "academic_paper"
    year: 2019
    url: "https://arxiv.org/abs/1904.04232"
    institution: "ICLR"

---




## TL;DR

Transfer learning applies knowledge from a source domain to improve learning in a target domain. In deep learning: pre-train on large generic dataset (ImageNet), fine-tune on specific task with small labeled dataset. This is the dominant paradigm in computer vision and NLP — training from scratch is rare.

## Core Explanation

Fine-tuning strategies: freeze early layers (general features), train later layers (task-specific). Full fine-tuning: update all weights. Linear probing: freeze backbone, train only classifier head. Domain adaptation: source and target domains have different distributions. Few-shot learning: learn from very few examples (5-50 per class).

## Further Reading

- [A Survey on Transfer Learning (Pan & Yang, 2010)](https://ieeexplore.ieee.org/document/5288526)
