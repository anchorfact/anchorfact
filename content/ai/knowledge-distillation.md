---
id:"kb-2026-00286"
title:"Knowledge Distillation"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Distilling the Knowledge in a Neural Network"
    authors: ["Hinton, Geoffrey", "Vinyals, Oriol", "Dean, Jeff"]
    type: "academic_paper"
    year: 2015
    doi: "10.48550/arXiv.1503.02531"
    url: "https://arxiv.org/abs/1503.02531"
    institution: "NeurIPS Workshop"
    note: "The original knowledge distillation paper by Turing Award winner Geoffrey Hinton. 15,000+ citations."
secondary_sources:
  - title: "Deep Learning (Goodfellow, Bengio, Courville)"
    type: "book"
    year: 2016
    url: "https://www.deeplearningbook.org/"
    institution: "MIT Press"
    note: "Covers model compression and knowledge transfer in the context of deep learning"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Knowledge distillation transfers knowledge from a large teacher model to a smaller student model. The student learns to mimic the teacher's softened output probabilities (not just hard labels). This enables deploying compact models with near-teacher performance — critical for edge devices and mobile applications.

## Core Explanation

Temperature: higher T in softmax softens probability distribution, revealing more information about class relationships. Loss = α * (KL divergence between student and teacher distributions) + (1-α) * (cross-entropy with ground truth). Applications: DistilBERT (6 layers instead of 12, 97% of BERT's performance), TinyBERT, MobileNet. Distillation can transfer knowledge to entirely different architectures.

## Further Reading

- [Distilling the Knowledge in a Neural Network (Hinton, Vinyals, Dean, 2015)](https://arxiv.org/abs/1503.02531)
