---
id:"kb-2026-00230"
title:"Functional Programming"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Structure and Interpretation of Computer Programs (SICP)"
    type:"undefined"
    url:"undefined"
    institution:"MIT Press"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Functional Programming (FP) treats computation as evaluation of mathematical functions, avoiding changing state and mutable data. Core concepts: pure functions (same input → same output, no side effects), immutability, higher-order functions, recursion, function composition. Languages: Haskell, Clojure, Elixir, Scala, JavaScript (FP-style).

## Core Explanation

Pure functions: no side effects → easier to test, reason about, parallelize. Map/Filter/Reduce: transform collections without loops. Currying: f(a,b) → f(a)(b). Monads (Haskell): handle side effects (IO, State, Maybe) in pure FP. FP influences: React (immutable state), Redux (pure reducers), Rust (pattern matching, iterators).

## Further Reading

- [Structure and Interpretation of Computer Programs (SICP)](undefined)
