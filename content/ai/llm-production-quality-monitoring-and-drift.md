---
id: llm-production-quality-monitoring-and-drift
title: 'LLM Production Quality Monitoring and Drift'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-02'
created_date: '2026-06-02'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-llm-production-quality-monitoring-and-drift-1
    statement: >-
      Evidently documentation describes monitoring as tracking data and model quality over time.
    source_title: Evidently Monitoring Overview
    source_url: https://docs.evidentlyai.com/docs/platform/monitoring_overview
    confidence: medium
  - id: fact-ai-llm-production-quality-monitoring-and-drift-2
    statement: >-
      Azure AI Foundry documentation describes monitoring deployed generative AI applications.
    source_title: Azure AI Foundry Monitor Applications
    source_url: https://learn.microsoft.com/en-us/azure/ai-foundry/how-to/online-evaluation
    confidence: medium
  - id: fact-ai-llm-production-quality-monitoring-and-drift-3
    statement: >-
      LangSmith documentation lists online evaluation among evaluation types for LLM applications.
    source_title: LangSmith Evaluation Types
    source_url: https://docs.langchain.com/langsmith/evaluation-types
    confidence: medium
completeness: 0.82
known_gaps:
  - Production quality monitoring depends on sampling policy, privacy filtering, traffic drift, user feedback, and evaluator calibration.
disputed_statements: []
primary_sources:
  - title: Evidently Monitoring Overview
    type: documentation
    year: 2026
    url: https://docs.evidentlyai.com/docs/platform/monitoring_overview
    institution: Evidently AI
  - title: Azure AI Foundry Monitor Applications
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/ai-foundry/how-to/online-evaluation
    institution: Microsoft Azure
  - title: LangSmith Evaluation Types
    type: documentation
    year: 2026
    url: https://docs.langchain.com/langsmith/evaluation-types
    institution: LangSmith
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

LLM production monitoring checks whether quality, safety, latency, and traffic patterns drift after deployment.

## Core Explanation

Offline evals do not cover every production input. Production monitoring adds ongoing checks for distribution changes, quality regressions, safety failures, user feedback, and operational behavior.

Agents should connect a production-quality alert back to examples and traces. A drift alert without sampled inputs, evaluator scores, time windows, and deployment context is not enough to justify a rollback or prompt rewrite.

## Source-Mapped Facts

- Evidently documentation describes monitoring as tracking data and model quality over time. ([source](https://docs.evidentlyai.com/docs/platform/monitoring_overview))
- Azure AI Foundry documentation describes monitoring deployed generative AI applications. ([source](https://learn.microsoft.com/en-us/azure/ai-foundry/how-to/online-evaluation))
- LangSmith documentation lists online evaluation among evaluation types for LLM applications. ([source](https://docs.langchain.com/langsmith/evaluation-types))

## Further Reading

- [Evidently Monitoring Overview](https://docs.evidentlyai.com/docs/platform/monitoring_overview)
- [Azure AI Foundry Monitor Applications](https://learn.microsoft.com/en-us/azure/ai-foundry/how-to/online-evaluation)
- [LangSmith Evaluation Types](https://docs.langchain.com/langsmith/evaluation-types)
