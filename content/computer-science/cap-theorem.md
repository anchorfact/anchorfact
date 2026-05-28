---
id: kb-2026-00244
title: CAP Theorem
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-22'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-cap-theorem-1
    statement: >-
      Eric Brewer introduced the CAP tradeoff in the PODC keynote Towards Robust Distributed
      Systems.
    source_title: Towards Robust Distributed Systems
    source_url: https://doi.org/10.1145/343477.343502
    confidence: medium
  - id: fact-computer-science-cap-theorem-2
    statement: >-
      Gilbert and Lynch formalized Brewer's conjecture and proved the impossibility result for
      consistent, available, partition-tolerant web services.
    source_title: >-
      Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web
      Services
    source_url: https://doi.org/10.1145/564585.564601
    confidence: medium
  - id: fact-computer-science-cap-theorem-3
    statement: >-
      Brewer later clarified that CAP tradeoffs are most relevant when partitions occur, rather than
      a simple permanent choice of two out of three properties.
    source_title: 'CAP Twelve Years Later: How the Rules Have Changed'
    source_url: https://doi.org/10.1109/MC.2012.37
    confidence: medium
completeness: 0.82
known_gaps:
  - Specialized edge cases and implementation details are outside this source-mapped public slice.
disputed_statements: []
primary_sources:
  - title: Towards Robust Distributed Systems
    authors:
      - Eric Brewer
    type: conference_keynote
    year: 2000
    url: https://doi.org/10.1145/343477.343502
    institution: ACM PODC
  - title: >-
      Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web
      Services
    authors:
      - Seth Gilbert
      - Nancy Lynch
    type: academic_paper
    year: 2002
    url: https://doi.org/10.1145/564585.564601
    institution: ACM SIGACT News
  - title: 'CAP Twelve Years Later: How the Rules Have Changed'
    authors:
      - Eric Brewer
    type: academic_article
    year: 2012
    url: https://doi.org/10.1109/MC.2012.37
    institution: IEEE Computer
secondary_sources: []
updated: '2026-05-28'
ai_models:
  - claude-opus
---

## TL;DR

The CAP theorem describes a limit for distributed services under network partition: strong consistency and availability cannot both be guaranteed.

## Core Explanation

The strongest public treatment starts with Brewer's conjecture, follows the Gilbert-Lynch proof, and includes Brewer's later clarification of common oversimplifications.

## Source-Mapped Facts

- Eric Brewer introduced the CAP tradeoff in the PODC keynote Towards Robust Distributed Systems. ([source](https://doi.org/10.1145/343477.343502))
- Gilbert and Lynch formalized Brewer's conjecture and proved the impossibility result for consistent, available, partition-tolerant web services. ([source](https://doi.org/10.1145/564585.564601))
- Brewer later clarified that CAP tradeoffs are most relevant when partitions occur, rather than a simple permanent choice of two out of three properties. ([source](https://doi.org/10.1109/MC.2012.37))

## Further Reading

- [Towards Robust Distributed Systems](https://doi.org/10.1145/343477.343502)
- [Brewer's Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services](https://doi.org/10.1145/564585.564601)
- [CAP Twelve Years Later: How the Rules Have Changed](https://doi.org/10.1109/MC.2012.37)
