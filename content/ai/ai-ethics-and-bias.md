---
id: ai-ethics-and-bias
title: AI Ethics and Algorithmic Bias
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-24'
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-ethics-01
    statement: Gender Shades reported intersectional accuracy disparities in commercial gender classification systems, especially for darker-skinned women.
    source_title: Gender Shades - Proceedings of Machine Learning Research
    source_url: https://proceedings.mlr.press/v81/buolamwini18a.html
    confidence: medium
  - id: fact-ai-ethics-02
    statement: Fairness definitions in machine learning include group fairness, individual fairness, and causality-based approaches, and different definitions can conflict in practice.
    source_title: A Survey on Bias and Fairness in Machine Learning
    source_url: https://dl.acm.org/doi/10.1145/3457607
    confidence: medium
  - id: fact-ai-ethics-03
    statement: The EU AI Act is a comprehensive legal framework for AI that applies risk-based rules to AI developers and deployers.
    source_title: AI Act - European Commission
    source_url: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
    confidence: medium
completeness: 0.84
known_gaps:
  - Cultural bias, multilingual evaluation, and deployment-specific harms require separate treatment.
disputed_statements: []
primary_sources:
  - title: Gender Shades - Proceedings of Machine Learning Research
    type: conference_paper
    year: 2018
    authors:
      - Buolamwini, Joy
      - Gebru, Timnit
    url: https://proceedings.mlr.press/v81/buolamwini18a.html
    institution: Proceedings of Machine Learning Research
  - title: A Survey on Bias and Fairness in Machine Learning
    type: survey_paper
    year: 2021
    url: https://dl.acm.org/doi/10.1145/3457607
    institution: ACM Computing Surveys
  - title: AI Act - European Commission
    type: official_policy
    year: 2024
    url: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
    institution: European Commission
secondary_sources:
  - title: Datasheets for Datasets
    type: journal_article
    year: 2021
    url: https://doi.org/10.1145/3458723
    institution: Communications of the ACM
---

## TL;DR

AI ethics and bias work asks whether AI systems distribute errors, benefits, and harms fairly across people and groups.

## Core Explanation

Bias can enter through data collection, labels, model objectives, evaluation choices, and deployment context. Fairness is not a single universal metric; different fairness definitions can emphasize different goals and may conflict.

## Evidence Notes

The previous version mixed official, advocacy, and future-looking sources. This repair keeps the article public but lowers confidence and aligns claims to PMLR, ACM, and European Commission sources.

## Further Reading

- [Gender Shades - PMLR](https://proceedings.mlr.press/v81/buolamwini18a.html)
- [A Survey on Bias and Fairness in Machine Learning](https://dl.acm.org/doi/10.1145/3457607)
- [AI Act - European Commission](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)

## Related Articles

- [AI Governance and Policy](ai-governance-and-policy.md)
- [AI Red Teaming and Safety](ai-red-teaming-and-safety.md)
- [AI Regulation Landscape](ai-regulation-landscape.md)
