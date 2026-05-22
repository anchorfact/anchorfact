---
id:"kb-2026-00310"
title:"Haskell Language"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Haskell Documentation"
    type:"documentation"
    year:2026
    url:"https://www.haskell.org/documentation/"
    institution:"Haskell.org"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Haskell (1990, named after Haskell Curry) is a purely functional, lazily evaluated programming language with a powerful static type system. All functions are pure (no side effects by default), and IO is explicitly handled through monads. Used in: finance (Standard Chartered, Barclays), compiler development (GHC).

## Core Explanation

Type system: Hindley-Milner with type classes (like Rust traits). Algebraic data types + pattern matching. Monads (IO, Maybe, Either, State, Reader) structure side effects. `do` notation: imperative-looking syntax for monadic code. Laziness: expressions evaluated only when needed — enables infinite data structures. GHC (Glasgow Haskell Compiler) is the primary implementation.

## Further Reading

- [Haskell Documentation](https://www.haskell.org/documentation/)
