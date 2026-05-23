---
id: "kb-2026-00230"
title: "Functional Programming"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
generation_method: "human_only"

completeness: 0.88
disputed_statements:
  - statement: "The relative merits of functional versus object-oriented programming paradigms are debated: FP proponents emphasize immutability and composability, while OOP proponents value encapsulation and intuitive domain modeling"
    context: "See primary sources for competing interpretations"

known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

primary_sources:
  - title: "ACM Digital Library"

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
  - title: "Structure and Interpretation of Computer Programs (2nd ed.)"
    authors: ["Abelson, Harold", "Sussman, Gerald Jay"]
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sicp/"
    institution: "MIT"

---


## TL;DR

Functional Programming (FP) treats computation as evaluation of mathematical functions, avoiding changing state and mutable data. Core concepts: pure functions (same input → same output, no side effects), immutability, higher-order functions, recursion, function composition. Languages: Haskell, Clojure, Elixir, Scala, JavaScript (FP-style).

## Core Explanation

Pure functions: no side effects → easier to test, reason about, parallelize. Map/Filter/Reduce: transform collections without loops. Currying: f(a,b) → f(a)(b). Monads (Haskell): handle side effects (IO, State, Maybe) in pure FP. FP influences: React (immutable state), Redux (pure reducers), Rust (pattern matching, iterators).

## Further Reading

- [Structure and Interpretation of Computer Programs (SICP)](undefined)
