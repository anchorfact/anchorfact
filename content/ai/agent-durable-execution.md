---
id: agent-durable-execution
title: 'Agent Durable Execution'
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
  - id: fact-agent-durable-execution-1
    statement: >-
      Temporal workflow documentation describes workflow executions as durable, reliable, and scalable function executions.
    source_title: Temporal Workflow
    source_url: https://docs.temporal.io/workflows
  - id: fact-agent-durable-execution-2
    statement: >-
      LangGraph persistence documentation describes checkpointers that save graph state at every super-step.
    source_title: LangGraph Persistence
    source_url: https://docs.langchain.com/oss/python/langgraph/persistence
  - id: fact-agent-durable-execution-3
    statement: >-
      Azure Durable Functions documentation describes durable orchestrations as stateful workflows that can checkpoint progress and replay from checkpoints.
    source_title: Durable Functions Overview
    source_url: https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview?tabs=python-v2
completeness: 0.83
known_gaps:
  - Durable execution designs differ for stateless chat agents, workflow agents, code agents, and browser agents.
disputed_statements: []
primary_sources:
  - title: Temporal Workflow
    type: documentation
    year: 2026
    url: https://docs.temporal.io/workflows
    institution: Temporal
  - title: LangGraph Persistence
    type: documentation
    year: 2026
    url: https://docs.langchain.com/oss/python/langgraph/persistence
    institution: LangChain
  - title: Durable Functions Overview
    type: documentation
    year: 2026
    url: https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview?tabs=python-v2
    institution: Microsoft
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Agent durable execution keeps a multi-step agent run recoverable across failures, pauses, deploys, retries, and long waits.

## Core Explanation

Agents that use tools often run longer than a single model call. They may wait for human approval, call APIs, branch on results, or resume after a webhook. Durable execution makes those workflows explicit by storing state, event history, pending actions, and checkpoints.

Without durability, a crash can lose the plan, repeat a side effect, or strand a user mid-task. With durability, the runtime can resume from a known state, replay deterministic workflow logic, and keep tool calls and approvals auditable.

## Source-Mapped Facts

- Temporal workflow documentation describes workflow executions as durable, reliable, and scalable function executions. ([source](https://docs.temporal.io/workflows))
- LangGraph persistence documentation describes checkpointers that save graph state at every super-step. ([source](https://docs.langchain.com/oss/python/langgraph/persistence))
- Azure Durable Functions documentation describes durable orchestrations as stateful workflows that can checkpoint progress and replay from checkpoints. ([source](https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview?tabs=python-v2))

## Further Reading

- [Temporal workflows](https://docs.temporal.io/workflows)
- [LangGraph persistence](https://docs.langchain.com/oss/python/langgraph/persistence)
- [Azure Durable Functions overview](https://learn.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview?tabs=python-v2)
