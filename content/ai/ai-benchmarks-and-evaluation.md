---
id: "ai-benchmarks-and-evaluation"
title: "AI Benchmarks: MMLU, SWE-bench, and How We Measure Intelligence"
schema_type: "TechArticle"
category: "ai"
language: "en"
confidence: "high"
last_verified: "2026-05-24"
created_date: "2026-05-24"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "af-ai-benchmarks-and-evaluation-1"
    statement: "MMLU (Massive Multitask Language Understanding, Hendrycks et al., 2021) tests models on 57 subjects from law to physics. GPT-4 scored 86.4% (2023); Claude 4 Opus reached ~92% (2025); estimated human expert performance is ~89.8%."
    source_title: "Hendrycks et al., ICLR (2021)"
    confidence: "high"
  - id: "af-ai-benchmarks-and-evaluation-2"
    statement: "SWE-bench Verified (2024) tests real-world software engineering: given a GitHub issue, produce a patch that passes all tests. Claude Code (Anthropic, 2025) achieved 77.2% — resolving the majority of real open-source bugs autonomously."
    source_title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues? (2024)"
    confidence: "high"

completeness: 0.9

primary_sources:
  - title: "Measuring Massive Multitask Language Understanding (MMLU)"
    type: "academic_paper"
    year: 2021
    url: "https://arxiv.org/abs/2009.03300"
    institution: "ICLR"
  - title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"
    type: "academic_paper"
    year: 2024
    url: "https://arxiv.org/abs/2310.06770"
    institution: "ICLR"

known_gaps:
  - "Benchmark saturation and Goodhart's Law"
  - "Dynamic benchmarks that adapt to model capabilities"

disputed_statements:
  - statement: "No major disputed statements identified"

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