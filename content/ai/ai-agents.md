---
id: kb-2026-00018
title: 'AI Agents: Tool-Using Model Systems'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-05-22'
generation_method: ai_assisted
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-ai-agents-1
    statement: >-
      LangChain documentation defines an agent as a model calling tools in a loop until a task is
      complete.
    source_title: LangChain Agents Documentation
    source_url: https://docs.langchain.com/oss/python/langchain/agents
    confidence: medium
  - id: fact-ai-ai-agents-2
    statement: >-
      The Model Context Protocol documentation describes MCP as an open-source standard for
      connecting AI applications to external systems, including data sources, tools, and workflows.
    source_title: Model Context Protocol Introduction
    source_url: https://modelcontextprotocol.io/docs/getting-started/intro
    confidence: medium
  - id: fact-ai-ai-agents-3
    statement: >-
      Claude Code documentation describes Claude Code as an agentic coding tool that reads a
      codebase, edits files, runs commands, and integrates with development tools.
    source_title: Claude Code Overview
    source_url: https://code.claude.com/docs/en/overview
    confidence: medium
completeness: 0.82
known_gaps:
  - >-
    Specialized edge cases and platform-specific implementation details are outside this
    source-mapped public slice.
disputed_statements: []
primary_sources:
  - title: LangChain Agents Documentation
    type: documentation
    year: 2026
    url: https://docs.langchain.com/oss/python/langchain/agents
    institution: LangChain
  - title: Model Context Protocol Introduction
    type: documentation
    year: 2026
    url: https://modelcontextprotocol.io/docs/getting-started/intro
    institution: Model Context Protocol
  - title: Claude Code Overview
    type: documentation
    year: 2026
    url: https://code.claude.com/docs/en/overview
    institution: Anthropic
secondary_sources: []
updated: '2026-05-28'
ai_models:
  - claude-opus
---

## TL;DR

AI agents combine a model with tools, context, and a control loop so software can carry out multi-step tasks with external systems.

## Core Explanation

Practical agents are best understood as model calls embedded in a harness: the model reasons over context, calls tools, receives results, and continues until the task is complete.

## Source-Mapped Facts

- LangChain documentation defines an agent as a model calling tools in a loop until a task is complete. ([source](https://docs.langchain.com/oss/python/langchain/agents))
- The Model Context Protocol documentation describes MCP as an open-source standard for connecting AI applications to external systems, including data sources, tools, and workflows. ([source](https://modelcontextprotocol.io/docs/getting-started/intro))
- Claude Code documentation describes Claude Code as an agentic coding tool that reads a codebase, edits files, runs commands, and integrates with development tools. ([source](https://code.claude.com/docs/en/overview))

## Further Reading

- [LangChain Agents Documentation](https://docs.langchain.com/oss/python/langchain/agents)
- [Model Context Protocol Introduction](https://modelcontextprotocol.io/docs/getting-started/intro)
- [Claude Code Overview](https://code.claude.com/docs/en/overview)
