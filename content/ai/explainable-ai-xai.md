---
id:"kb-2026-00277"
title:"Explainable AI (XAI)"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Interpretable Machine Learning (Christoph Molnar)"
    type:"book"
    year:2023
    url:"https://christophm.github.io/interpretable-ml-book/"
    institution:"Self-published"
secondary_sources:
  - title: "Neural Machine Translation by Jointly Learning to Align and Translate"
    authors: ["Bahdanau", "Cho", "Bengio"]
    type: "academic_paper"
    year: 2014
    doi: "10.48550/arXiv.1409.0473"
    url: "https://arxiv.org/abs/1409.0473"
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Explainable AI makes model decisions interpretable by humans. As models become more complex (deep NNs, LLMs), understanding WHY a model made a decision becomes critical for trust, debugging, and regulatory compliance (EU AI Act, GDPR). Methods: SHAP (feature importance), LIME (local explanations), attention visualization, saliency maps.

## Core Explanation

SHAP (SHapley Additive exPlanations): game-theoretic approach assigning each feature an importance score. LIME: locally approximate complex model with simple interpretable model. Saliency maps: highlight input pixels most influential for prediction. Limitations: explanations can be misleading, feature correlations complicate attribution. Post-hoc methods explain AFTER prediction; inherently interpretable models explain BY design.

## Further Reading

- [Interpretable Machine Learning (Christoph Molnar)](https://christophm.github.io/interpretable-ml-book/)
