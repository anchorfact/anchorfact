---
id: llm-safety-evaluation-and-policy-test-suites
title: 'LLM Safety Evaluation and Policy Test Suites'
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
  - id: fact-ai-llm-safety-evaluation-and-policy-test-suites-1
    statement: >-
      Azure AI Foundry documentation describes risk and safety evaluators for assessing AI
      application outputs.
    source_title: Azure AI Foundry Risk and Safety Evaluators
    source_url: https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/evaluation-evaluators/risk-safety-evaluators
    confidence: medium
  - id: fact-ai-llm-safety-evaluation-and-policy-test-suites-2
    statement: >-
      OpenAI safety best-practices documentation describes safety work as including evaluations and
      monitoring.
    source_title: OpenAI Safety Best Practices
    source_url: https://platform.openai.com/docs/guides/safety-best-practices
    confidence: medium
  - id: fact-ai-llm-safety-evaluation-and-policy-test-suites-3
    statement: >-
      Promptfoo red-team documentation describes red teaming as testing LLM applications for
      vulnerabilities.
    source_title: Promptfoo Red Teaming
    source_url: https://www.promptfoo.dev/docs/red-team/
    confidence: medium
completeness: 0.82
known_gaps:
  - Safety policies and blocked content categories are application-specific and need human governance review.
disputed_statements: []
primary_sources:
  - title: Azure AI Foundry Risk and Safety Evaluators
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/evaluation-evaluators/risk-safety-evaluators
    institution: Microsoft Azure
  - title: OpenAI Safety Best Practices
    type: documentation
    year: 2026
    url: https://platform.openai.com/docs/guides/safety-best-practices
    institution: OpenAI
  - title: Promptfoo Red Teaming
    type: documentation
    year: 2026
    url: https://www.promptfoo.dev/docs/red-team/
    institution: Promptfoo
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

LLM safety test suites make policy behavior measurable before a model, prompt, or agent workflow reaches production.

## Core Explanation

Safety evaluation is not one prompt that asks whether a system is safe. It is a set of policy-grounded test cases, adversarial probes, monitoring signals, and review workflows tied to the application's risk profile.

Agents should report which policy categories were tested, which evaluators were used, what threshold failed or passed, and which examples require human review. Safety regressions need specific evidence rather than a generic "guardrail passed" claim.

## Source-Mapped Facts

- Azure AI Foundry documentation describes risk and safety evaluators for assessing AI application outputs. ([source](https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/evaluation-evaluators/risk-safety-evaluators))
- OpenAI safety best-practices documentation describes safety work as including evaluations and monitoring. ([source](https://platform.openai.com/docs/guides/safety-best-practices))
- Promptfoo red-team documentation describes red teaming as testing LLM applications for vulnerabilities. ([source](https://www.promptfoo.dev/docs/red-team/))

## Further Reading

- [Azure AI Foundry Risk and Safety Evaluators](https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/evaluation-evaluators/risk-safety-evaluators)
- [OpenAI Safety Best Practices](https://platform.openai.com/docs/guides/safety-best-practices)
- [Promptfoo Red Teaming](https://www.promptfoo.dev/docs/red-team/)
