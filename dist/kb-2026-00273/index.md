---
id:"kb-2026-00273"
title:"Transfer Learning"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"A Survey on Transfer Learning (Pan & Yang, 2010)"
    type:"paper"
    year:2010
    url:"https://ieeexplore.ieee.org/document/5288526"
    institution:"IEEE"
secondary_sources:
  - title: "A Survey on Transfer Learning"
    authors: ["Pan", "Yang"]
    type: "academic_paper"
    year: 2010
    url: "https://ieeexplore.ieee.org/document/5288526"
    institution: "IEEE"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Transfer learning applies knowledge from a source domain to improve learning in a target domain. In deep learning: pre-train on large generic dataset (ImageNet), fine-tune on specific task with small labeled dataset. This is the dominant paradigm in computer vision and NLP — training from scratch is rare.

## Core Explanation

Fine-tuning strategies: freeze early layers (general features), train later layers (task-specific). Full fine-tuning: update all weights. Linear probing: freeze backbone, train only classifier head. Domain adaptation: source and target domains have different distributions. Few-shot learning: learn from very few examples (5-50 per class).

## Further Reading

- [A Survey on Transfer Learning (Pan & Yang, 2010)](https://ieeexplore.ieee.org/document/5288526)
