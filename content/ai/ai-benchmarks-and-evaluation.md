---
id: ai-benchmarks-and-evaluation
title: 'AI Benchmarks: MMLU, SWE-bench, and How We Measure Intelligence'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-24'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: f1
    statement: MMLU evaluates language models across 57 subjects spanning STEM, humanities, social sciences, and other domains.
    source_title: Measuring Massive Multitask Language Understanding
    source_url: https://arxiv.org/abs/2009.03300
    confidence: medium
  - id: f2
    statement: HELM proposes a framework for holistic language-model evaluation across scenarios, metrics, and model families.
    source_title: Holistic Evaluation of Language Models
    source_url: https://arxiv.org/abs/2211.09110
    confidence: medium
  - id: f3
    statement: BIG-bench is a collaborative benchmark suite designed to probe capabilities beyond standard language-model evaluations.
    source_title: 'Beyond the Imitation Game: Quantifying and Extrapolating the Capabilities of Language Models'
    source_url: https://arxiv.org/abs/2206.04615
    confidence: medium
  - id: f4
    statement: SWE-bench evaluates whether language models can resolve real GitHub issues from open-source Python repositories.
    source_title: 'SWE-bench: Can Language Models Resolve Real-World GitHub Issues?'
    source_url: https://arxiv.org/abs/2310.06770
    confidence: medium
primary_sources:
  - title: Measuring Massive Multitask Language Understanding
    type: academic_paper
    year: 2020
    authors:
      - Hendrycks, Dan
      - Burns, Collin
      - Basart, Steven
      - Zou, Andy
      - Mazeika, Mantas
      - Song, Dawn
      - Steinhardt, Jacob
    institution: arXiv / ICLR
    url: https://arxiv.org/abs/2009.03300
  - title: Holistic Evaluation of Language Models
    type: academic_paper
    year: 2022
    authors:
      - Liang, Percy
      - Bommasani, Rishi
      - Lee, Tony
    institution: arXiv
    url: https://arxiv.org/abs/2211.09110
  - title: 'Beyond the Imitation Game: Quantifying and Extrapolating the Capabilities of Language Models'
    type: academic_paper
    year: 2022
    authors:
      - Srivastava, Aarohi
      - Rastogi, Abhinav
      - Rao, Abhishek
    institution: arXiv
    url: https://arxiv.org/abs/2206.04615
  - title: 'SWE-bench: Can Language Models Resolve Real-World GitHub Issues?'
    type: academic_paper
    year: 2023
    authors:
      - Jimenez, Carlos E.
      - Yang, John
      - Wettig, Alexander
      - Yao, Shunyu
    institution: arXiv / ICLR
    url: https://arxiv.org/abs/2310.06770
completeness: 0.84
known_gaps:
  - This entry explains selected benchmark papers and does not rank current models or claim benchmark scores are deployment-quality measures.
---

## TL;DR

AI benchmarks measure different slices of model behavior. MMLU, HELM, BIG-bench, and SWE-bench are distinct evaluation artifacts rather than interchangeable measures of general intelligence.

## Core Explanation

The repaired entry keeps claims close to each benchmark paper's stated scope. It avoids stronger claims about standardization, intelligence, or current leaderboard status unless directly supported by the cited source.

## Further Reading

- [Measuring Massive Multitask Language Understanding](https://arxiv.org/abs/2009.03300)
- [Holistic Evaluation of Language Models](https://arxiv.org/abs/2211.09110)
- [Beyond the Imitation Game](https://arxiv.org/abs/2206.04615)
- [SWE-bench](https://arxiv.org/abs/2310.06770)

## Related Articles

- [AI Evaluation](../model-evaluation.md)
- [Language Models](../large-language-models.md)
- [AI Coding Assistants](../ai-coding-assistants.md)
