---
id:"synthetic-data-training"
title:"Synthetic Data in AI Training"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-24"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true

atomic_facts:
  - id:"af-synthetic-data-training-1"
    statement:"Synthetic data — artificially generated training examples from AI models — has become a mainstream training technique, with models like Phi-4 (Microsoft, 2024) trained primarily on synthetic data achieving competitive benchmark scores against models trained on 10x more web data."
    source_title:"Microsoft Phi-4 Technical Report (2024)"
    confidence:"high"
  - id:"af-synthetic-data-training-2"
    statement:"The \"model collapse\" problem (Shumailov et al., Nature, 2024) demonstrates that recursively training on AI-generated data causes models to lose diversity and amplify errors over generations, requiring careful synthetic data curation strategies."
    source_title:"Shumailov et al., Nature (2024)"
    confidence:"high"

completeness:0.9

primary_sources:
  - title:"Phi-4 Technical Report"
    type:"academic_paper"
    year:2024
    url:"https://arxiv.org/abs/2412.08905"
    institution:"Microsoft Research"
  - title:"AI models collapse when trained on recursively generated data"
    type:"academic_paper"
    year:2024
    url:"https://www.nature.com/articles/s41586-024-07566-y"
    institution:"Nature"

known_gaps:
  - "Synthetic data provenance and contamination detection"
  - "Optimal synthetic-to-real data ratios"

disputed_statements:
  - statement:"No major disputed statements identified"

---

## TL;DR
Synthetic data — generating training examples from other AI models — has emerged as both a powerful scaling technique and a fundamental risk. Models like Phi-4 achieve state-of-the-art results primarily from synthetic data, while model collapse threatens recursive use.

## Core Explanation
Synthetic data generation: (1) use a teacher model to generate diverse examples; (2) curriculum learning — progressively harder synthetic problems; (3) self-play — models generate and solve their own problems. Key quality checks: diversity, accuracy, and domain coverage.

## Detailed Analysis
Phi-4 demonstrated synthetic data can compensate for smaller model size — 14B parameters matching 70B. DeepSeek-R1 used synthetic reasoning traces for distillation. Risks: model collapse (recursive training degrades output), hallucination contamination, and benchmark leakage from synthetic data resembling test sets.

## Further Reading
- Microsoft Research: Phi Series
- Nature: AI Model Collapse
- NeurIPS: Synthetic Data Workshop