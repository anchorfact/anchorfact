---
id: agent-benchmarks
title: 'Agent Benchmarks'
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
  - id: fact-ai-agent-benchmarks-1
    statement: >-
      AgentBench presents a multi-dimensional benchmark with eight distinct environments for
      evaluating LLM agents in multi-turn, open-ended settings.
    source_title: AgentBench Evaluating LLMs as Agents
    source_url: https://arxiv.org/abs/2308.03688
    confidence: medium
  - id: fact-ai-agent-benchmarks-2
    statement: >-
      WebArena builds a reproducible web-agent environment with functional websites for
      e-commerce, social forum discussion, collaborative software development, and content
      management tasks.
    source_title: WebArena Realistic Web Environment for Building Autonomous Agents
    source_url: https://arxiv.org/abs/2307.13854
    confidence: medium
  - id: fact-ai-agent-benchmarks-3
    statement: >-
      SWE-bench evaluates language models by asking them to edit codebases to resolve real GitHub
      issues from open-source Python repositories.
    source_title: SWE-bench Can Language Models Resolve Real-World GitHub Issues
    source_url: https://arxiv.org/abs/2310.06770
    confidence: medium
  - id: fact-ai-agent-benchmarks-4
    statement: >-
      SWE-bench problems require models to understand and coordinate changes across functions,
      classes, and files rather than only generate short code snippets.
    source_title: SWE-bench Can Language Models Resolve Real-World GitHub Issues
    source_url: https://arxiv.org/abs/2310.06770
    confidence: medium
completeness: 0.84
known_gaps:
  - Agent benchmark results can depend heavily on scaffolding, tool access, retry budgets, and environment setup.
  - This article does not report current leaderboard standings.
disputed_statements: []
primary_sources:
  - title: AgentBench Evaluating LLMs as Agents
    authors:
      - Xiao Liu
      - Hao Yu
      - Hanchen Zhang
      - Yifan Xu
      - Xuanyu Lei
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2308.03688
    institution: arXiv
  - title: WebArena Realistic Web Environment for Building Autonomous Agents
    authors:
      - Shuyan Zhou
      - Frank F. Xu
      - Hao Zhu
      - Xuhui Zhou
      - Robert Lo
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2307.13854
    institution: arXiv
  - title: SWE-bench Can Language Models Resolve Real-World GitHub Issues
    authors:
      - Carlos E. Jimenez
      - John Yang
      - Alexander Wettig
      - Shunyu Yao
      - Kexin Pei
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2310.06770
    institution: arXiv
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Agent benchmarks evaluate model systems that act over time: they inspect environments, call tools, modify state, and complete tasks under measurable success criteria.

## Core Explanation

Agent evaluation is different from static question answering because the model must make sequential decisions. Benchmarks such as AgentBench, WebArena, and SWE-bench test interaction with environments, web workflows, codebases, and execution feedback.

The unit under test is often the whole scaffold: base model, prompts, tool definitions, retrieval, execution environment, validators, retries, and state management. Reported results should therefore specify the scaffold and constraints, not only the model name.

## Source-Mapped Facts

- AgentBench presents a multi-dimensional benchmark with eight distinct environments for evaluating LLM agents in multi-turn, open-ended settings. ([source](https://arxiv.org/abs/2308.03688))
- WebArena builds a reproducible web-agent environment with functional websites for e-commerce, social forum discussion, collaborative software development, and content management tasks. ([source](https://arxiv.org/abs/2307.13854))
- SWE-bench evaluates language models by asking them to edit codebases to resolve real GitHub issues from open-source Python repositories. ([source](https://arxiv.org/abs/2310.06770))
- SWE-bench problems require models to understand and coordinate changes across functions, classes, and files rather than only generate short code snippets. ([source](https://arxiv.org/abs/2310.06770))

## Further Reading

- [AgentBench](https://arxiv.org/abs/2308.03688)
- [WebArena](https://arxiv.org/abs/2307.13854)
- [SWE-bench](https://arxiv.org/abs/2310.06770)
