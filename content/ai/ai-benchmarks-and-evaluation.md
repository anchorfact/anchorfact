---
id: ai-benchmarks-and-evaluation
title: "AI Benchmarks: MMLU, SWE-bench, and How We Measure Intelligence"
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: f1
    statement: HELM (Holistic Evaluation of Language Models, Liang et al. 2023, Stanford CRFM) provides a standardized framework for evaluating LLMs across 42 scenarios covering 7 metric categories.
    source_title: Liang, Percy, et al. Holistic Evaluation of Language Models. NeurIPS 2023
    source_url: https://arxiv.org/abs/2211.09110
    confidence: high
  - id: f2
    statement: >-
      BIG-bench (Srivastava et al. 2023, 450+ authors, Google) is a collaborative benchmark with 204 tasks testing LLM capabilities beyond standard NLP, including reasoning, creativity, and social
      intelligence.
    source_title: "Srivastava, Aarohi, et al. Beyond the Imitation Game: Quantifying LLM Capabilities. NeurIPS 2023"
    source_url: https://arxiv.org/abs/2206.04615
    confidence: high
  - id: f3
    statement: >-
      MMLU (Hendrycks et al. 2021, UC Berkeley) measures massive multitask language understanding across 57 subjects from STEM to humanities, becoming the standard benchmark for LLM knowledge
      evaluation.
    source_title: Hendrycks, Dan, et al. Measuring Massive Multitask Language Understanding. ICLR 2021
    source_url: https://arxiv.org/abs/2009.03300
    confidence: high
completeness: 0.9
primary_sources:
  - title: Measuring Massive Multitask Language Understanding (MMLU)
    type: academic_paper
    year: 2021
    url: https://arxiv.org/abs/2009.03300
    institution: ICLR
  - title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"
    type: academic_paper
    year: 2024
    url: https://arxiv.org/abs/2310.06770
    institution: ICLR
known_gaps:
  - Benchmark saturation and Goodhart's Law
  - Dynamic benchmarks that adapt to model capabilities
disputed_statements:
  - statement: No major disputed statements identified
secondary_sources:
  - title: "Holistic Evaluation of Language Models (HELM): A Comprehensive Benchmarking Framework"
    type: conference_paper
    year: 2023
    authors:
      - Liang, Percy
      - Bommasani, Rishi
      - Lee, Tony
      - et al.
    institution: Stanford CRFM / NeurIPS
    url: https://arxiv.org/abs/2211.09110
  - title: "Beyond the Imitation Game: Quantifying and Extrapolating the Capabilities of Language Models (BIG-bench)"
    type: conference_paper
    year: 2023
    authors:
      - Srivastava, Aarohi
      - Rastogi, Abhinav
      - Rao, Abhishek
      - et al. (450+ authors)
    institution: Google / NeurIPS
    url: https://arxiv.org/abs/2206.04615
  - title: "MMLU: Measuring Massive Multitask Language Understanding"
    type: conference_paper
    year: 2021
    authors:
      - Hendrycks, Dan
      - Burns, Collin
      - Basart, Steven
      - et al.
    institution: UC Berkeley / ICLR
    url: https://arxiv.org/abs/2009.03300
  - title: "A Survey of LLM Evaluation: Benchmarks, Metrics, and Methodologies"
    type: survey_paper
    year: 2024
    authors:
      - multiple
    institution: IEEE Access
    url: https://doi.org/10.1109/ACCESS.2024.3415265
updated: "2026-05-24"
---
## TL;DR
AI benchmarks measure progress but are targets as much as tests. MMLU evaluates knowledge; HumanEval tests coding; SWE-bench measures real engineering; ARC-AGI probes abstraction. As models saturate existing benchmarks, new harder ones emerge (GPQA, Humanity's Last Exam).

## Core Explanation
Knowledge benchmarks: MMLU (57 subjects, multiple choice), MMLU-Pro (harder, 10-choice), GPQA Diamond (PhD-level science, <40% human expert). Coding: HumanEval (function completion), MBPP, LiveCodeBench (competitive programming). Reasoning: MATH, AIME (competition math), ARC-AGI (abstraction puzzles). Agentic: SWE-bench, Terminal-Bench, WebArena.

## Detailed Analysis
Benchmark limitations: training data contamination, prompt sensitivity (scores vary 5-10% with prompt changes), and saturation (when models score >95%). Dynamic benchmarks (LiveBench, Chatbot Arena ELO) update questions regularly. Evaluation taxonomy: zero-shot, few-shot, chain-of-thought, tool-augmented settings.

## Further Reading
- Epoch AI: Benchmarks Dashboard
- Stanford HELM: Holistic Evaluation
- LMSYS Chatbot Arena

## Related Articles

- [AI and Blockchain: Decentralized Intelligence, Smart Contracts, and Crypto-Economic Systems](../ai-blockchain.md)
- [AI for Audio Processing: Sound Event Detection, Acoustic Scene Analysis, and Environmental Intelligence](../ai-for-audio-processing.md)
- [AI for Chip Design: Reinforcement Learning Placement, EDA Automation, and Semiconductor Intelligence](../ai-for-chip-design.md)
