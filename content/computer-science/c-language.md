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
    source_url: "https://www.iso.org/standard/82075.html"
    confidence: "high"
  - id: "fact-computer-science-002"
    statement: "It is the foundation of modern computing: Unix/Linux kernels, Windows, macOS, embedded systems, and the reference implementations of Python, Ruby, and Node."
    source_url: "https://www.iso.org/standard/82075.html"
    confidence: "high"
  - id: "fact-computer-science-003"
    statement: "Standardized by ISO (C23 is the latest, 2024), C remains essential for systems programming, operating systems, and performance-critical applications where direct memory access and minimal runtime overhead are required."
    source_url: "https://www.iso.org/standard/82075.html"
    confidence: "high"
  - id: "af-kb-2026-00077-extra"
    statement: "Dennis Ritchie developed C at Bell Labs between 1969 and 1973, evolving from the B programming language to add types and structure for implementing the UNIX operating system."
    source_title: "The Development of the C Language"
    source_url: "https://dl.acm.org/doi/10.1145/154766.155363"
    confidence: "high"

completeness: 0.92

primary_sources:
  - title: "ISO/IEC 9899:2024 — C23 Standard"
    type: "standard"
    year: 2024
    url: "https://www.iso.org/standard/82075.html"
    institution: "ISO"
  - title: "The C Programming Language (2nd Edition)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Pearson"
  - title: "The Development of the C Language"
    type: "academic_paper"
    year: 1993
    url: "https://dl.acm.org/doi/10.1145/154766.155363"
    institution: "ACM"

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
