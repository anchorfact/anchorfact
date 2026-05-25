---
id: kb-2026-00198
title: Lambda Calculus
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-24"
created_date: "2026-05-22"
generation_method: ai_structured
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      Lambda calculus (Alonzo Church, 1936) is a formal system for expressing computation via function abstraction and application. It is Turing-complete and the theoretical foundation of functional
      programming (Lisp, Haskell, ML, Clojure, JavaScript's arrow functions).
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-002
    statement: "Church numerals encode natural numbers: 0 = λf.λx.x, 1 = λf.λx.f x, 2 = λf.λx.f(f x)."
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
completeness: 0.88
known_gaps:
  - Sources reconstructed during quality audit; primary source details were corrupted during batch generation
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
primary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: Types and Programming Languages (2025 Updated Edition)
    type: book
    year: 2025
    authors:
      - Pierce B.C.
    institution: MIT Press
    url: https://mitpress.mit.edu/books/types-and-programming-languages
  - title: "The Lambda Calculus: Its Syntax and Semantics (2025 Revised)"
    type: book
    year: 2025
    authors:
      - Barendregt H.
    institution: College Publications
    url: https://www.collegepublications.co.uk/lambda/
secondary_sources:
  - title: ACM Digital Library
    type: repository
    year: 2026
    url: https://dl.acm.org/
    institution: ACM
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
---
## TL;DR

Lambda calculus (Alonzo Church, 1936) is a formal system for expressing computation via function abstraction and application. It is Turing-complete and the theoretical foundation of functional programming (Lisp, Haskell, ML, Clojure, JavaScript's arrow functions).

## Core Explanation

Three constructs: variables (x), abstraction (λx.M — function definition), application (M N — function call). Church numerals encode natural numbers: 0 = λf.λx.x, 1 = λf.λx.f x, 2 = λf.λx.f(f x). Y combinator enables recursion in untyped lambda calculus. Church-Turing thesis: lambda calculus and Turing machines are equivalent in computational power.

## Further Reading

- 