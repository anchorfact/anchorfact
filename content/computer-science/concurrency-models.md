---
id: kb-2026-00202
title: Concurrency Models
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-13'
created_date: '2026-05-22'
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-concurrency-001
    statement: >-
      Oracle's Java concurrency tutorial describes threads as execution units inside a
      process that share process resources, including memory and open files.
    source_title: Processes and Threads
    source_url: https://docs.oracle.com/javase/tutorial/essential/concurrency/procthread.html
    confidence: medium
  - id: fact-computer-science-concurrency-002
    statement: >-
      Python documentation describes asyncio as a library for writing concurrent code
      using async and await syntax.
    source_title: asyncio - Asynchronous I/O
    source_url: https://docs.python.org/3/library/asyncio.html
    confidence: medium
  - id: fact-computer-science-concurrency-003
    statement: >-
      Erlang system documentation describes Erlang processes as lightweight units designed
      for massive concurrency and documents asynchronous signals and message signals between
      Erlang processes.
    source_title: Processes
    source_url: https://www.erlang.org/doc/system/ref_man_processes.html
    confidence: medium
  - id: fact-computer-science-concurrency-004
    statement: >-
      Effective Go describes a goroutine as a function executing concurrently with other
      goroutines in the same address space and recommends passing shared values on channels.
    source_title: Effective Go
    source_url: https://go.dev/doc/effective_go
    confidence: medium
completeness: 0.82
known_gaps:
  - >-
    Coverage is intentionally limited to representative concurrency models and does not
    exhaustively cover GPU programming, transactional memory, or every language runtime.
disputed_statements: []
primary_sources:
  - title: Processes and Threads
    type: documentation
    year: 2024
    url: https://docs.oracle.com/javase/tutorial/essential/concurrency/procthread.html
    institution: Oracle
  - title: asyncio - Asynchronous I/O
    type: documentation
    year: 2026
    url: https://docs.python.org/3/library/asyncio.html
    institution: Python Software Foundation
  - title: Processes
    type: documentation
    year: 2026
    url: https://www.erlang.org/doc/system/ref_man_processes.html
    institution: Erlang/OTP
  - title: Effective Go
    type: documentation
    year: 2026
    url: https://go.dev/doc/effective_go
    institution: Go Project
secondary_sources: []
updated: '2026-06-13'
---

## TL;DR

Concurrency models define how programs structure overlapping work. Shared-memory threads,
async/await event-loop code, Erlang-style lightweight processes, and Go goroutines with
channels are separate approaches with different communication and coordination tradeoffs.

## Core Explanation

The repaired article narrows the topic to source-backed representative models. Java's
concurrency tutorial anchors the shared-memory thread model: threads run inside a process
and share resources such as memory and open files. Python's `asyncio` documentation anchors
the async/await model for concurrent code. Erlang documentation anchors the lightweight
process model and its asynchronous signals and message queues. Effective Go anchors the
goroutine-and-channel model, where concurrent functions communicate through channels instead
of directly sharing mutable values.

## Further Reading

- [Processes and Threads](https://docs.oracle.com/javase/tutorial/essential/concurrency/procthread.html)
- [asyncio - Asynchronous I/O](https://docs.python.org/3/library/asyncio.html)
- [Processes](https://www.erlang.org/doc/system/ref_man_processes.html)
- [Effective Go](https://go.dev/doc/effective_go)

## Related Articles

- [Go Programming Language](go-language.md)
- [The Actor Model: Concurrency Through Message Passing](the-actor-model-concurrency-through-message-passing.md)
- [Operating Systems Concepts](operating-systems-concepts.md)
