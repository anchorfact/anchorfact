---
id: llm-evaluation-privacy-and-pii-leakage-tests
title: 'LLM Evaluation Privacy and PII Leakage Tests'
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
  - id: fact-ai-llm-evaluation-privacy-and-pii-leakage-tests-1
    statement: >-
      OWASP's LLM Top 10 lists Sensitive Information Disclosure as a risk for large language
      model applications.
    source_title: OWASP LLM06 Sensitive Information Disclosure
    source_url: https://genai.owasp.org/llmrisk/llm06-sensitive-information-disclosure/
    confidence: medium
  - id: fact-ai-llm-evaluation-privacy-and-pii-leakage-tests-2
    statement: >-
      Microsoft Presidio documentation describes Presidio as an SDK for data protection and
      de-identification.
    source_title: Microsoft Presidio
    source_url: https://microsoft.github.io/presidio/
    confidence: medium
  - id: fact-ai-llm-evaluation-privacy-and-pii-leakage-tests-3
    statement: >-
      NIST SP 800-122 provides guidance for protecting the confidentiality of personally
      identifiable information.
    source_title: NIST SP 800-122
    source_url: https://csrc.nist.gov/pubs/sp/800/122/final
    confidence: medium
completeness: 0.83
known_gaps:
  - Privacy evaluation must be tailored to data classification, jurisdiction, tenant isolation, memorization risk, tool outputs, and logging policies.
disputed_statements: []
primary_sources:
  - title: OWASP LLM06 Sensitive Information Disclosure
    type: standard
    year: 2026
    url: https://genai.owasp.org/llmrisk/llm06-sensitive-information-disclosure/
    institution: OWASP
  - title: Microsoft Presidio
    type: documentation
    year: 2026
    url: https://microsoft.github.io/presidio/
    institution: Microsoft
  - title: NIST SP 800-122
    type: standard
    year: 2010
    url: https://csrc.nist.gov/pubs/sp/800/122/final
    institution: National Institute of Standards and Technology
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Privacy and PII leakage tests check whether an LLM system exposes personal data through prompts, retrieved context, logs, tool calls, or generated answers.

## Core Explanation

LLM privacy evaluation should cover both model behavior and surrounding infrastructure. A model can avoid naming a person while a retrieval tool, trace log, or citation payload still leaks sensitive data.

Agents should test for PII recognition, redaction, tenant boundaries, refusal behavior, audit logging, and safe handling of retrieved documents. The test set should include benign uses of personal data as well as disallowed disclosure attempts.

## Source-Mapped Facts

- OWASP's LLM Top 10 lists Sensitive Information Disclosure as a risk for large language model applications. ([source](https://genai.owasp.org/llmrisk/llm06-sensitive-information-disclosure/))
- Microsoft Presidio documentation describes Presidio as an SDK for data protection and de-identification. ([source](https://microsoft.github.io/presidio/))
- NIST SP 800-122 provides guidance for protecting the confidentiality of personally identifiable information. ([source](https://csrc.nist.gov/pubs/sp/800/122/final))

## Further Reading

- [OWASP LLM06 Sensitive Information Disclosure](https://genai.owasp.org/llmrisk/llm06-sensitive-information-disclosure/)
- [Microsoft Presidio](https://microsoft.github.io/presidio/)
- [NIST SP 800-122](https://csrc.nist.gov/pubs/sp/800/122/final)
