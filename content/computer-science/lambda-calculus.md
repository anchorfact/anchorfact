---
id:"kb-2026-00198"
title:"Lambda Calculus"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"undefined"
    type:"undefined"
    url:"undefined"
    institution:"North-Holland"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Lambda calculus (Alonzo Church, 1936) is a formal system for expressing computation via function abstraction and application. It is Turing-complete and the theoretical foundation of functional programming (Lisp, Haskell, ML, Clojure, JavaScript's arrow functions).

## Core Explanation

Three constructs: variables (x), abstraction (λx.M — function definition), application (M N — function call). Church numerals encode natural numbers: 0 = λf.λx.x, 1 = λf.λx.f x, 2 = λf.λx.f(f x). Y combinator enables recursion in untyped lambda calculus. Church-Turing thesis: lambda calculus and Turing machines are equivalent in computational power.

## Further Reading

- [undefined](undefined)
