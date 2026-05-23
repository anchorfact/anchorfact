---
id:"kb-2026-00202"
title:"Concurrency Models"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
ai_models:["claude-opus"]
derived_from_human_seed:true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
primary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
---

## TL;DR

Concurrency models handle multiple simultaneous computations. Threads (shared memory, mutexes), CSP/Actors (message passing, no shared state), async/await (cooperative multitasking), SIMD/GPU (data-parallel). Key challenges: race conditions, deadlocks, livelocks, starvation. Amdahl's Law limits parallel speedup.

## Core Explanation

Mutex (mutual exclusion): only one thread in critical section. Semaphore: counting mutex. Deadlock: A waits for B, B waits for A — four conditions (mutual exclusion, hold-and-wait, no preemption, circular wait). Actor model (Erlang, Akka): independent actors communicate via messages, no shared state — eliminates data races. Go goroutines + channels implement CSP.

## Further Reading

- [undefined](undefined)
