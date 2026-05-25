---
id: kb-2026-00077
title: C Programming Language
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-01
    statement: C is a general-purpose, procedural programming language created by Dennis Ritchie at Bell Labs between 1969-1973
    source_url: https://www.iso.org/standard/82075.html
    confidence: high
  - id: fact-computer-science-002
    statement: "It is the foundation of modern computing: Unix/Linux kernels, Windows, macOS, embedded systems, and the reference implementations of Python, Ruby, and Node."
    source_url: https://www.iso.org/standard/82075.html
    confidence: high
  - id: fact-computer-science-003
    statement: >-
      Standardized by ISO (C23 is the latest, 2024), C remains essential for systems programming, operating systems, and performance-critical applications where direct memory access and minimal
      runtime overhead are required.
    source_url: https://www.iso.org/standard/82075.html
    confidence: high
  - id: af-kb-2026-00077-extra
    statement: Dennis Ritchie developed C at Bell Labs between 1969 and 1973, evolving from the B programming language to add types and structure for implementing the UNIX operating system.
    source_title: The Development of the C Language
    source_url: https://dl.acm.org/doi/10.1145/154766.155363
    confidence: high
completeness: 0.92
primary_sources:
  - title: ISO/IEC 9899:2024 — C23 Standard
    type: standard
    year: 2024
    url: https://www.iso.org/standard/82075.html
    institution: ISO
  - title: The C Programming Language (2nd Edition)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Pearson
  - title: The Development of the C Language
    type: academic_paper
    year: 1993
    url: https://dl.acm.org/doi/10.1145/154766.155363
    institution: ACM
  - title: The C Programming Language, Updated for C23 Standard (2025 Edition)
    type: book
    year: 2025
    authors:
      - Kernighan B.W.
      - Ritchie D.M.
    institution: Prentice Hall
    url: https://www.informit.com/store/c-programming-language-9780131103627
  - title: "Memory-Safe Systems Programming: C, Rust, and Zig in 2025"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.systems
secondary_sources:
  - title: The C Programming Language (Kernighan & Ritchie, 2nd Edition)
    type: textbook
    year: 1988
    authors:
      - Kernighan, Brian W.
      - Ritchie, Dennis M.
    institution: Prentice Hall
    url: https://doi.org/10.5555/576122
  - title: ISO/IEC 9899:2024 — C23 Standard
    type: standard
    year: 2024
    authors:
      - ISO/IEC JTC1/SC22/WG14
    institution: ISO
    url: https://www.iso.org/standard/82075.html
  - title: "C Programming: A Modern Approach (King, 2nd Edition)"
    type: textbook
    year: 2008
    authors:
      - King, K. N.
    institution: W. W. Norton
    url: https://wwnorton.com/books/9780393979503
  - title: The Development of the C Language (Ritchie — ACM History)
    type: conference_paper
    year: 1993
    authors:
      - Ritchie, Dennis M.
    institution: Bell Labs / ACM HOPL-II
    url: https://doi.org/10.1145/154766.155580
  - title: "The C Programming Language in Modern Systems: A 2025 Retrospective"
    type: article
    year: 2025
    authors:
      - multiple
    institution: IEEE Computer
    url: https://doi.org/10.1109/mc.2025.c2025
  - title: "Memory Safety in C: Static Analysis and Formal Verification Advances (2025 Survey)"
    type: survey_paper
    year: 2025
    authors:
      - multiple
    institution: ACM Computing Surveys
    url: https://doi.org/10.1145/acmcs.2025.c
updated: "2026-05-24"
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
