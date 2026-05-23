---
id:"kb-2026-00277"
title:"Explainable AI (XAI)"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Interpretable Machine Learning"
    authors: ["Molnar, Christoph"]
    type: "book"
    year: 2023
    url: "https://christophm.github.io/interpretable-ml-book/"
    institution: "Self-published (open access)"
    note: "Comprehensive, freely available guide to ML interpretability: SHAP, LIME, partial dependence, feature importance"
secondary_sources:
  - title: "A Unified Approach to Interpreting Model Predictions (SHAP)"
    authors: ["Lundberg, Scott M.", "Lee, Su-In"]
    type: "academic_paper"
    year: 2017
    url: "https://papers.nips.cc/paper/7062-a-unified-approach-to-interpreting-model-predictions"
    institution: "NeurIPS"
    note: "The SHAP paper — game-theoretic approach to feature importance. 20,000+ citations."
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
  - title: "The Mythos of Model Interpretability"
    authors: ["Lipton, Zachary C."]
    type: "academic_paper"
    year: 2018
    doi: "10.48550/arXiv.1606.03490"
    url: "https://arxiv.org/abs/1606.03490"
    institution: "Carnegie Mellon University"
  - title: "The Mythos of Model Interpretability"
    authors: ["Lipton, Zachary C."]
    type: "academic_paper"
    year: 2018
    doi: "10.48550/arXiv.1606.03490"
    url: "https://arxiv.org/abs/1606.03490"
    institution: "Carnegie Mellon University"
---

## TL;DR

Explainable AI makes model decisions interpretable by humans. As models become more complex (deep NNs, LLMs), understanding WHY a model made a decision becomes critical for trust, debugging, and regulatory compliance (EU AI Act, GDPR). Methods: SHAP (feature importance), LIME (local explanations), attention visualization, saliency maps.

## Core Explanation

SHAP (SHapley Additive exPlanations): game-theoretic approach assigning each feature an importance score. LIME: locally approximate complex model with simple interpretable model. Saliency maps: highlight input pixels most influential for prediction. Limitations: explanations can be misleading, feature correlations complicate attribution. Post-hoc methods explain AFTER prediction; inherently interpretable models explain BY design.

## Further Reading

- [Interpretable Machine Learning (Christoph Molnar)](https://christophm.github.io/interpretable-ml-book/)
