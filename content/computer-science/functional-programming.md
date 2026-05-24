---
id: "kb-2026-00230"
title: "Functional Programming"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-001"
    statement: "Functional Programming (FP) treats computation as evaluation of mathematical functions, avoiding changing state and mutable data. Core concepts: pure functions (same input → same output, no side effects), immutability, higher-order functions, recursion, function composition. Languages: Haskell, Clojure, Elixir, Scala, JavaScript (FP-style)."
    source_title: "ACM Digital Library"
    confidence: "medium"
  - id: "fact-computer-science-001"
    statement: "Functional Programming (FP) treats computation as evaluation of mathematical functions, avoiding changing state and mutable data. Core concepts: pure functions (same input → same output, no side effects), immutability, higher-order functions, recursion, function composition. Languages: Haskell, Clojure, Elixir, Scala, JavaScript (FP-style)."
    source_title: "ACM Digital Library"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

disputed_statements:
  - statement: "The relative merits of functional versus object-oriented programming paradigms are debated: FP proponents emphasize immutability and composability, while OOP proponents value encapsulation and intuitive domain modeling"

primary_sources:
  - title: "ACM Digital Library"
    type: "reference"
    url: "https://dl.acm.org/"

secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
  - title: "Structure and Interpretation of Computer Programs (2nd ed.)"
    authors: ["Abelson, Harold", "Sussman, Gerald Jay"]
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sicp/"
    institution: "MIT Press"

---






## TL;DR

Functional Programming (FP) treats computation as evaluation of mathematical functions, avoiding changing state and mutable data. Core concepts: pure functions (same input → same output, no side effects), immutability, higher-order functions, recursion, function composition. Languages: Haskell, Clojure, Elixir, Scala, JavaScript (FP-style).

## Core Explanation

Pure functions: no side effects → easier to test, reason about, parallelize. Map/Filter/Reduce: transform collections without loops. Currying: f(a,b) → f(a)(b). Monads (Haskell): handle side effects (IO, State, Maybe) in pure FP. FP influences: React (immutable state), Redux (pure reducers), Rust (pattern matching, iterators).

## Further Reading

- [Structure and Interpretation of Computer Programs (SICP)](undefined)
