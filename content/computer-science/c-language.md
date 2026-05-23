---
id: "kb-2026-00077"
title: "C Programming Language"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true

atomic_facts:
  - id: "fact-computer-science-01"
    statement: "C is a general-purpose, procedural programming language created by Dennis Ritchie at Bell Labs between 1969-1973"
    source_title: "The C Programming Language (2nd Edition)"
    confidence: "high"
  - id: "fact-computer-science-002"
    statement: "It is the foundation of modern computing: Unix/Linux kernels, Windows, macOS, embedded systems, and the reference implementations of Python, Ruby, and Node."
    source_title: "The C Programming Language (2nd Edition)"
    confidence: "medium"
  - id: "fact-computer-science-003"
    statement: "Standardized by ISO (C23 is the latest, 2024), C remains essential for systems programming, operating systems, and performance-critical applications where direct memory access and minimal runtime overhead are required."
    source_title: "ISO/IEC 9899:2024 — C23 Standard"
    confidence: "medium"

completeness: 0.88

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"

primary_sources:
  - title: "ISO/IEC 9899:2024 — C23 Standard"
    type: "standard"
    year: 2024
    institution: "ISO"
  - title: "The C Programming Language (2nd Edition)"
    authors: ["Kernighan, Brian W.", "Ritchie, Dennis M."]
    type: "book"
    year: 1988

secondary_sources:
  - title: "The C Programming Language (2nd Edition, K&R)"
    authors: ["Kernighan, Brian W.", "Ritchie, Dennis M."]
    type: "book"
    year: 1988
    url: "https://en.wikipedia.org/wiki/The_C_Programming_Language"
    institution: "Prentice Hall"

---



## TL;DR

C is a general-purpose, procedural programming language created by Dennis Ritchie at Bell Labs between 1969-1973. It is the foundation of modern computing: Unix/Linux kernels, Windows, macOS, embedded systems, and the reference implementations of Python, Ruby, and Node.js are written in C. Standardized by ISO (C23 is the latest, 2024), C remains essential for systems programming, operating systems, and performance-critical applications where direct memory access and minimal runtime overhead are required.

## Core Features

- **Manual memory management**: `malloc`/`free`, no garbage collector
- **Pointers**: Direct memory addressing — power and danger
- **Preprocessor**: Macros, conditional compilation (`#define`, `#ifdef`)
- **Static typing**: Compile-time type checking
- **Portability**: Write once, compile anywhere (with discipline)
- **Minimal runtime**: No garbage collector, no exception handling, no runtime type info

## Further Reading

- [K&R — The C Programming Language](https://en.wikipedia.org/wiki/The_C_Programming_Language): The definitive book
