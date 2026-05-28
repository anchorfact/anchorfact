---
id: operating-systems-concepts
title: "Operating Systems: Processes, Memory, and File Systems"
schema_type: Article
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-24"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: af-computer-science-operating-systems-concepts-1
    statement: OSTEP presents the process as a central operating-system abstraction for a running program.
    source_title: "OSTEP: The Abstraction: The Process"
    source_url: https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf
    confidence: medium
  - id: af-computer-science-operating-systems-concepts-2
    statement: >-
      OSTEP introduces the address space as the operating-system abstraction for virtualizing
      memory.
    source_title: "OSTEP: The Abstraction: Address Spaces"
    source_url: https://pages.cs.wisc.edu/~remzi/OSTEP/vm-intro.pdf
    confidence: medium
  - id: af-computer-science-operating-systems-concepts-3
    statement: >-
      OSTEP describes files and directories as core operating-system abstractions for persistent
      storage.
    source_title: "OSTEP: File and Directories"
    source_url: https://pages.cs.wisc.edu/~remzi/OSTEP/file-intro.pdf
    confidence: medium
completeness: 0.9
primary_sources:
  - id: ps-computer-science-operating-systems-concepts-1
    title: "OSTEP: The Abstraction: The Process"
    type: textbook
    year: 2023
    institution: "Operating Systems: Three Easy Pieces"
    url: https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf
  - id: ps-computer-science-operating-systems-concepts-2
    title: "OSTEP: The Abstraction: Address Spaces"
    type: textbook
    year: 2023
    institution: "Operating Systems: Three Easy Pieces"
    url: https://pages.cs.wisc.edu/~remzi/OSTEP/vm-intro.pdf
  - id: ps-computer-science-operating-systems-concepts-3
    title: "OSTEP: File and Directories"
    type: textbook
    year: 2023
    institution: "Operating Systems: Three Easy Pieces"
    url: https://pages.cs.wisc.edu/~remzi/OSTEP/file-intro.pdf
known_gaps:
  - Container vs hypervisor virtualization
  - Real-time operating systems for embedded systems
disputed_statements: []
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
Operating systems concepts include processes, memory virtualization, concurrency, scheduling, files, directories, persistence, and protection. A useful beginner model is that the OS provides abstractions over CPU, memory, and storage resources.

## Core Explanation
A process is the OS abstraction for a running program. Virtual memory gives each process an address-space abstraction rather than direct unmanaged access to physical memory. File and directory abstractions organize persistent storage so applications can read, write, name, and locate data without controlling raw devices directly.

## Further Reading

- [OSTEP: processes](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf)
- [OSTEP: address spaces](https://pages.cs.wisc.edu/~remzi/OSTEP/vm-intro.pdf)
- [OSTEP: files and directories](https://pages.cs.wisc.edu/~remzi/OSTEP/file-intro.pdf)
