---
id: agent-tool-risk-annotations-and-approval-boundaries
title: 'Agent Tool Risk Annotations and Approval Boundaries'
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
  - id: fact-ai-agent-tool-risk-annotations-and-approval-boundaries-1
    statement: >-
      The Model Context Protocol tool specification defines annotations including readOnlyHint,
      destructiveHint, idempotentHint, and openWorldHint.
    source_title: Model Context Protocol Tools Specification
    source_url: https://modelcontextprotocol.io/specification/2025-06-18/server/tools
    confidence: medium
  - id: fact-ai-agent-tool-risk-annotations-and-approval-boundaries-2
    statement: >-
      OpenAI function calling documentation describes tools as functions with names,
      descriptions, and JSON Schema parameters.
    source_title: OpenAI Function Calling Guide
    source_url: https://developers.openai.com/api/docs/guides/function-calling
    confidence: medium
  - id: fact-ai-agent-tool-risk-annotations-and-approval-boundaries-3
    statement: >-
      Anthropic tool use documentation describes tools with a name, description, and input_schema.
    source_title: Anthropic Tool Use Overview
    source_url: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
    confidence: medium
completeness: 0.83
known_gaps:
  - Approval behavior depends on product policy, tenant settings, tool implementation, OAuth scopes, sandboxing, and whether risk annotations are enforced or advisory.
disputed_statements: []
primary_sources:
  - title: Model Context Protocol Tools Specification
    type: standard
    year: 2026
    url: https://modelcontextprotocol.io/specification/2025-06-18/server/tools
    institution: Model Context Protocol
  - title: OpenAI Function Calling Guide
    type: documentation
    year: 2026
    url: https://developers.openai.com/api/docs/guides/function-calling
    institution: OpenAI
  - title: Anthropic Tool Use Overview
    type: documentation
    year: 2026
    url: https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview
    institution: Anthropic
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Tool schemas say what an agent can call; risk annotations and approval boundaries say when that call should be read-only, gated, reversible, or blocked.

## Core Explanation

Agent platforms expose external capabilities through tools. The schema helps the model form valid arguments, but it does not by itself answer whether a call can delete data, spend money, contact an external system, or change production state.

Risk annotations give orchestration layers a machine-readable signal for approval. They should be paired with runtime enforcement: least-privilege credentials, scoped OAuth grants, idempotency controls, audit logs, and human approval for destructive or open-world actions.

## Source-Mapped Facts

- The Model Context Protocol tool specification defines annotations including readOnlyHint, destructiveHint, idempotentHint, and openWorldHint. ([source](https://modelcontextprotocol.io/specification/2025-06-18/server/tools))
- OpenAI function calling documentation describes tools as functions with names, descriptions, and JSON Schema parameters. ([source](https://developers.openai.com/api/docs/guides/function-calling))
- Anthropic tool use documentation describes tools with a name, description, and input_schema. ([source](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview))

## Further Reading

- [Model Context Protocol Tools Specification](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)
- [OpenAI Function Calling Guide](https://developers.openai.com/api/docs/guides/function-calling)
- [Anthropic Tool Use Overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
