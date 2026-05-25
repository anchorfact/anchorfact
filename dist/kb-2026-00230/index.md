---
id: kb-2026-00230
title: Functional Programming
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: ai_structured
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-fp-001
    statement: Lambda calculus (Church 1936) is the mathematical foundation of functional programming.
    source_title: Barendregt, H. The Lambda Calculus (College Publications 2012)
    source_url: https://www.collegepublications.co.uk/logic/mlf/?00006
    confidence: high
  - id: fact-cs-fp-002
    statement: "LISP (McCarthy 1958): first FP language, introduced GC, recursion, symbolic computation."
    source_title: McCarthy, J. Recursive Functions of Symbolic Expressions (CACM 1960)
    source_url: https://doi.org/10.1145/367177.367199
    confidence: high
  - id: fact-cs-fp-003
    statement: "Haskell (1990): purely functional, named after Curry; popularized monads, lazy evaluation."
    source_title: Hudak et al. A History of Haskell (HOPL III, ACM 2007)
    source_url: https://doi.org/10.1145/1238844.1238856
    confidence: high
completeness: 0.88
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The relative merits of functional versus object-oriented programming paradigms are debated: FP proponents emphasize immutability and composability, while OOP proponents value encapsulation and
      intuitive domain modeling
primary_sources:
  - title: ACM Digital Library
    type: reference
    url: https://dl.acm.org/
secondary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: Structure and Interpretation of Computer Programs (2nd ed.)
    authors:
      - Abelson, Harold
      - Sussman, Gerald Jay
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sicp/
    institution: MIT Press
---
## TL;DR

Functional Programming (FP) treats computation as evaluation of mathematical functions, avoiding changing state and mutable data. Core concepts: pure functions (same input → same output, no side effects), immutability, higher-order functions, recursion, function composition. Languages: Haskell, Clojure, Elixir, Scala, JavaScript (FP-style).

## Core Explanation

Pure functions: no side effects → easier to test, reason about, parallelize. Map/Filter/Reduce: transform collections without loops. Currying: f(a,b) → f(a)(b). Monads (Haskell): handle side effects (IO, State, Maybe) in pure FP. FP influences: React (immutable state), Redux (pure reducers), Rust (pattern matching, iterators).

## Further Reading

- [Structure and Interpretation of Computer Programs (SICP)](undefined)
