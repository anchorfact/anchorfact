---
id: agent-execution-knowledge-sources
title: 'Agent Execution Knowledge Sources: What AI Agents Need to Look Up'
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
  - id: fact-ai-agent-execution-knowledge-sources-1
    statement: >-
      OpenAI Agents SDK documentation says tools let an agent fetch data, call external APIs,
      execute code, or use a computer.
    source_title: OpenAI Agents SDK Tools
    source_url: https://openai.github.io/openai-agents-js/guides/tools/
    confidence: medium
  - id: fact-ai-agent-execution-knowledge-sources-2
    statement: >-
      Model Context Protocol documentation describes MCP as an open-source standard for connecting
      AI applications to external systems, including data sources, tools, and workflows.
    source_title: Model Context Protocol Introduction
    source_url: https://modelcontextprotocol.io/docs/getting-started/intro
    confidence: medium
  - id: fact-ai-agent-execution-knowledge-sources-3
    statement: >-
      AgentBench presents a benchmark with eight distinct environments for evaluating LLM agents'
      reasoning and decision-making abilities.
    source_title: 'AgentBench: Evaluating LLMs as Agents'
    source_url: https://arxiv.org/abs/2308.03688
    confidence: medium
  - id: fact-ai-agent-execution-knowledge-sources-4
    statement: >-
      WebArena builds a realistic web-agent environment around functional websites in e-commerce,
      forum, collaborative software development, and content management domains.
    source_title: 'WebArena: A Realistic Web Environment for Building Autonomous Agents'
    source_url: https://arxiv.org/abs/2307.13854
    confidence: medium
completeness: 0.84
known_gaps:
  - Live vendor-specific feature status, model pricing, and rate limits require separate current-source checks.
disputed_statements: []
primary_sources:
  - title: OpenAI Agents SDK Tools
    type: documentation
    year: 2026
    url: https://openai.github.io/openai-agents-js/guides/tools/
    institution: OpenAI
  - title: Model Context Protocol Introduction
    type: documentation
    year: 2026
    url: https://modelcontextprotocol.io/docs/getting-started/intro
    institution: Model Context Protocol
  - title: 'AgentBench: Evaluating LLMs as Agents'
    authors:
      - Xiao Liu
      - Hao Yu
      - Hanchen Zhang
      - Yifan Xu
      - Xuanyu Lei
      - Hanyu Lai
      - Yu Gu
      - Hangliang Ding
      - Kaiwen Men
      - Kejuan Yang
      - Shudan Zhang
      - Xiang Deng
      - Aohan Zeng
      - Zhengxiao Du
      - Chenhui Zhang
      - Sheng Shen
      - Tianjun Zhang
      - Yu Su
      - Huan Sun
      - Minlie Huang
      - Yuxiao Dong
      - Jie Tang
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2308.03688
    institution: arXiv
  - title: 'WebArena: A Realistic Web Environment for Building Autonomous Agents'
    authors:
      - Shuyan Zhou
      - Frank F. Xu
      - Hao Zhu
      - Xuhui Zhou
      - Robert Lo
      - Abishek Sridhar
      - Xianyi Cheng
      - Tianyue Ou
      - Yonatan Bisk
      - Daniel Fried
      - Uri Alon
      - Graham Neubig
    type: academic_paper
    year: 2023
    url: https://arxiv.org/abs/2307.13854
    institution: arXiv
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Agent-ready content should prioritize the materials an agent needs to select tools, retrieve context, call APIs, inspect code, verify outcomes, and avoid unsupported claims.

## Core Explanation

For AnchorFact, the practical corpus map is sevenfold: official docs and API references, code repository knowledge, tool and integration docs, citation-ready technical facts, troubleshooting and version compatibility, security and governance boundaries, and real workflow/web task context. These map directly onto agent tool surfaces, MCP-connected systems, and benchmark environments that test web, API, shell, database, code, and multi-step decision tasks.

## Source-Mapped Facts

- OpenAI Agents SDK documentation says tools let an agent fetch data, call external APIs, execute code, or use a computer. ([source](https://openai.github.io/openai-agents-js/guides/tools/))
- Model Context Protocol documentation describes MCP as an open-source standard for connecting AI applications to external systems, including data sources, tools, and workflows. ([source](https://modelcontextprotocol.io/docs/getting-started/intro))
- AgentBench presents a benchmark with eight distinct environments for evaluating LLM agents' reasoning and decision-making abilities. ([source](https://arxiv.org/abs/2308.03688))
- WebArena builds a realistic web-agent environment around functional websites in e-commerce, forum, collaborative software development, and content management domains. ([source](https://arxiv.org/abs/2307.13854))

## Further Reading

- [OpenAI Agents SDK Tools](https://openai.github.io/openai-agents-js/guides/tools/)
- [Model Context Protocol Introduction](https://modelcontextprotocol.io/docs/getting-started/intro)
- [AgentBench: Evaluating LLMs as Agents](https://arxiv.org/abs/2308.03688)
- [WebArena: A Realistic Web Environment for Building Autonomous Agents](https://arxiv.org/abs/2307.13854)
