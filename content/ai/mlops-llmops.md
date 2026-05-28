---
id: mlops-llmops
title: "MLOps and LLMOps: Production AI Engineering, Observability, and Platform Architecture"
schema_type: article
category: ai
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-4.5-sonnet
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
completeness: 0.85
atomic_facts:
  - id: af-ai-mlops-llmops-1
    statement: >-
      Hidden Technical Debt in Machine Learning Systems identifies ML-specific debt from data
      dependencies, configuration, monitoring, and system boundaries.
    source_title: Hidden Technical Debt in Machine Learning Systems
    source_url: >-
      https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html
    confidence: medium
  - id: af-ai-mlops-llmops-2
    statement: >-
      The ML Test Score proposes a rubric for production readiness and technical-debt reduction in
      ML systems.
    source_title: "The ML Test Score: A Rubric for ML Production Readiness and Technical Debt Reduction"
    source_url: >-
      https://research.google/pubs/the-ml-test-score-a-rubric-for-ml-production-readiness-and-technical-debt-reduction/
    confidence: medium
  - id: af-ai-mlops-llmops-3
    statement: The NIST AI Risk Management Framework provides guidance for managing risks in AI systems.
    source_title: AI Risk Management Framework
    source_url: https://www.nist.gov/itl/ai-risk-management-framework
    confidence: medium
primary_sources:
  - id: ps-ai-mlops-llmops-1
    title: Hidden Technical Debt in Machine Learning Systems
    type: academic_paper
    year: 2015
    institution: NeurIPS
    url: >-
      https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html
  - id: ps-ai-mlops-llmops-2
    title: "The ML Test Score: A Rubric for ML Production Readiness and Technical Debt Reduction"
    type: academic_paper
    year: 2017
    institution: Google Research
    url: >-
      https://research.google/pubs/the-ml-test-score-a-rubric-for-ml-production-readiness-and-technical-debt-reduction/
  - id: ps-ai-mlops-llmops-3
    title: AI Risk Management Framework
    type: government_guidance
    year: 2023
    institution: National Institute of Standards and Technology
    url: https://www.nist.gov/itl/ai-risk-management-framework
known_gaps:
  - Standardized cost accounting for LLM API calls across multi-model pipelines
  - Automated root-cause analysis for production AI failures
disputed_statements: []
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
MLOps and LLMOps: Production AI Engineering, Observability, and Platform Architecture: MLOps and LLMOps operationalize machine-learning and language-model systems through testing, deployment, monitoring, evaluation, and governance.

## Core Explanation
Production ML has hidden technical debt because data, models, code, infrastructure, and feedback loops interact. LLMOps adds prompt, retrieval, safety, evaluation, and model-update concerns to the broader MLOps discipline.

## Further Reading

- [Hidden Technical Debt in Machine Learning Systems](https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html)
- [The ML Test Score: A Rubric for ML Production Readiness and Technical Debt Reduction](https://research.google/pubs/the-ml-test-score-a-rubric-for-ml-production-readiness-and-technical-debt-reduction/)
- [AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
