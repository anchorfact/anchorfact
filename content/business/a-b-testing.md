---
id: kb-2026-00215
title: A/B Testing
schema_type: Article
category: business
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-22'
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-business-a-b-testing-1
    statement: >-
      Kohavi, Longbotham, Sommerfield, and Henne describe controlled web experiments as randomized
      tests that compare variants using user behavior and metrics.
    source_title: 'Controlled Experiments on the Web: Survey and Practical Guide'
    source_url: https://doi.org/10.1007/s10618-008-0114-1
    confidence: medium
  - id: fact-business-a-b-testing-2
    statement: >-
      Trustworthy Online Controlled Experiments recommends defining key metrics and an overall
      evaluation criterion before interpreting experiment results.
    source_title: Trustworthy Online Controlled Experiments
    source_url: >-
      https://www.cambridge.org/core/books/trustworthy-online-controlled-experiments/trustworthy-online-controlled-experiments/BFFD7CC0B7325B5DCEEFFB1DD9401F7E
    confidence: medium
  - id: fact-business-a-b-testing-3
    statement: >-
      The Microsoft Research summary of online experimentation emphasizes that randomized
      experiments are used to evaluate product changes and learn from deployed systems.
    source_title: Online Experimentation at Microsoft
    source_url: https://www.microsoft.com/en-us/research/publication/online-experimentation-at-microsoft/
    confidence: medium
completeness: 0.82
known_gaps:
  - Specialized edge cases and implementation details are outside this source-mapped public slice.
disputed_statements: []
primary_sources:
  - title: 'Controlled Experiments on the Web: Survey and Practical Guide'
    authors:
      - Ron Kohavi
      - Roger Longbotham
      - Dan Sommerfield
      - Randal M. Henne
    type: academic_paper
    year: 2009
    url: https://doi.org/10.1007/s10618-008-0114-1
    institution: Data Mining and Knowledge Discovery
  - title: Trustworthy Online Controlled Experiments
    authors:
      - Ron Kohavi
      - Diane Tang
      - Ya Xu
    type: book
    year: 2020
    url: >-
      https://www.cambridge.org/core/books/trustworthy-online-controlled-experiments/trustworthy-online-controlled-experiments/BFFD7CC0B7325B5DCEEFFB1DD9401F7E
    institution: Cambridge University Press
  - title: Online Experimentation at Microsoft
    authors:
      - Ron Kohavi
      - Alex Deng
      - Brian Frasca
      - Toby Walker
      - Ya Xu
      - Nils Pohlmann
    type: research_page
    year: 2013
    url: https://www.microsoft.com/en-us/research/publication/online-experimentation-at-microsoft/
    institution: Microsoft Research
secondary_sources: []
updated: '2026-05-28'
ai_models:
  - claude-opus
---

## TL;DR

A/B testing uses randomized controlled experiments to compare product or marketing variants against predefined metrics.

## Core Explanation

Reliable A/B testing depends less on a magic p-value and more on randomization, predefined metrics, trustworthy instrumentation, and careful interpretation.

## Source-Mapped Facts

- Kohavi, Longbotham, Sommerfield, and Henne describe controlled web experiments as randomized tests that compare variants using user behavior and metrics. ([source](https://doi.org/10.1007/s10618-008-0114-1))
- Trustworthy Online Controlled Experiments recommends defining key metrics and an overall evaluation criterion before interpreting experiment results. ([source](https://www.cambridge.org/core/books/trustworthy-online-controlled-experiments/trustworthy-online-controlled-experiments/BFFD7CC0B7325B5DCEEFFB1DD9401F7E))
- The Microsoft Research summary of online experimentation emphasizes that randomized experiments are used to evaluate product changes and learn from deployed systems. ([source](https://www.microsoft.com/en-us/research/publication/online-experimentation-at-microsoft/))

## Further Reading

- [Controlled Experiments on the Web: Survey and Practical Guide](https://doi.org/10.1007/s10618-008-0114-1)
- [Trustworthy Online Controlled Experiments](https://www.cambridge.org/core/books/trustworthy-online-controlled-experiments/trustworthy-online-controlled-experiments/BFFD7CC0B7325B5DCEEFFB1DD9401F7E)
- [Online Experimentation at Microsoft](https://www.microsoft.com/en-us/research/publication/online-experimentation-at-microsoft/)
