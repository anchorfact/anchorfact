---
id:"ai-ethics-and-bias"
title:"AI Ethics and Algorithmic Bias"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-24"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true

atomic_facts:
  - id:"af-ai-ethics-and-bias-1"
    statement:"ProPublica's 2016 investigation of COMPAS recidivism algorithm found that Black defendants were 2x more likely to be incorrectly classified as high-risk than white defendants, while white defendants were 2x more likely to be incorrectly classified as low-risk."
    source_title:"Angwin et al., ProPublica (2016)"
    confidence:"high"
  - id:"af-ai-ethics-and-bias-2"
    statement:"The EU AI Act (2024) classifies AI systems into four risk tiers — unacceptable (banned), high (strict regulation), limited (transparency), minimal (no regulation) — establishing the world's first comprehensive AI regulatory framework."
    source_title:"European Commission: AI Act (2024)"
    confidence:"high"

completeness:0.9

primary_sources:
  - title:"Weapons of Math Destruction (O'Neil)"
    type:"textbook"
    year:2016
    url:"https://www.penguinrandomhouse.com/books/316277/weapons-of-math-destruction-by-cathy-oneil/"
    institution:"Crown"
  - title:"EU AI Act"
    type:"standard"
    year:2024
    url:"https://artificialintelligenceact.eu/"
    institution:"European Commission"

known_gaps:
  - "Fairness-accuracy trade-off formal characterization"
  - "Cultural bias in multilingual models"

disputed_statements:
  - statement:"No major disputed statements identified"

---

## TL;DR
AI systems can amplify societal biases present in training data. Fairness is not a single metric — it requires choosing between competing mathematical definitions that may be mutually exclusive.

## Core Explanation
Fairness definitions: demographic parity (equal positive rates across groups), equalized odds (equal TPR and FPR across groups), individual fairness (similar individuals treated similarly). These cannot all be simultaneously satisfied (Kleinberg et al., 2017 impossibility theorem).

## Detailed Analysis
Bias mitigation strategies span the ML pipeline: pre-processing (reweighting/resampling training data), in-processing (fairness constraints in training objective), post-processing (calibrating decision thresholds per group). Model cards (Google, 2019) and datasheets (Gebru et al., 2018) document model characteristics and limitations.

## Further Reading
- ACM FAccT Conference
- AI Now Institute
- Partnership on AI