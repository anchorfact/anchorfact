---
id: data-sensitive-data-discovery-and-classification
title: 'Data Sensitive Data Discovery and Classification'
schema_type: TechArticle
category: computer-science
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
  - id: fact-data-sensitive-data-discovery-and-classification-1
    statement: >-
      Amazon Macie documentation describes Macie as a data security service that discovers sensitive
      data in Amazon S3.
    source_title: Amazon Macie Overview
    source_url: https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html
    confidence: medium
  - id: fact-data-sensitive-data-discovery-and-classification-2
    statement: >-
      Google Cloud Sensitive Data Protection documentation describes inspection and de-identification
      for sensitive data.
    source_title: Google Cloud Sensitive Data Protection Concepts
    source_url: https://cloud.google.com/sensitive-data-protection/docs/concepts
    confidence: medium
  - id: fact-data-sensitive-data-discovery-and-classification-3
    statement: >-
      Microsoft Purview documentation describes sensitive information types as pattern-based
      classifiers for sensitive information.
    source_title: Microsoft Purview Sensitive Information Types
    source_url: https://learn.microsoft.com/en-us/purview/sit-sensitive-information-type-learn-about
    confidence: medium
completeness: 0.83
known_gaps:
  - Classification accuracy depends on detectors, sampling, file formats, language, encryption, false positives, and governance policy.
disputed_statements: []
primary_sources:
  - title: Amazon Macie Overview
    type: documentation
    year: 2026
    url: https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html
    institution: Amazon Web Services
  - title: Google Cloud Sensitive Data Protection Concepts
    type: documentation
    year: 2026
    url: https://cloud.google.com/sensitive-data-protection/docs/concepts
    institution: Google Cloud
  - title: Microsoft Purview Sensitive Information Types
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/purview/sit-sensitive-information-type-learn-about
    institution: Microsoft Purview
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Sensitive data discovery and classification help agents avoid exposing or moving regulated data without policy context.

## Core Explanation

Data agents often need to inspect datasets, logs, storage buckets, or warehouse tables. Before they summarize, copy, or index that data, they need to know whether it contains credentials, personal data, financial identifiers, health data, or other sensitive classes.

Classification results are evidence, not a guarantee. Agents should cite the detector, data location, sample window, classification label, and confidence or match details before recommending access changes, retention, masking, or deletion.

## Source-Mapped Facts

- Amazon Macie documentation describes Macie as a data security service that discovers sensitive data in Amazon S3. ([source](https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html))
- Google Cloud Sensitive Data Protection documentation describes inspection and de-identification for sensitive data. ([source](https://cloud.google.com/sensitive-data-protection/docs/concepts))
- Microsoft Purview documentation describes sensitive information types as pattern-based classifiers for sensitive information. ([source](https://learn.microsoft.com/en-us/purview/sit-sensitive-information-type-learn-about))

## Further Reading

- [Amazon Macie Overview](https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html)
- [Google Cloud Sensitive Data Protection Concepts](https://cloud.google.com/sensitive-data-protection/docs/concepts)
- [Microsoft Purview Sensitive Information Types](https://learn.microsoft.com/en-us/purview/sit-sensitive-information-type-learn-about)
