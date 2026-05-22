---
id:"kb-2026-00196"
title:"Automata Theory"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
ai_models:["claude-opus"]
derived_from_human_seed:true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
primary_sources:
- title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"
    year: 2026
    url: "https://dl.acm.org/"
    institution: "ACM"
---

## TL;DR

Automata theory studies abstract machines and the problems they can solve. Finite automata (regular languages) → Pushdown automata (context-free) → Turing machines (computable). Powers: regular expressions, parsers, compilers, and the theoretical limits of computation.

## Core Explanation

Chomsky hierarchy: Type 3 (regular, regex, DFA/NFA), Type 2 (context-free, programming language syntax), Type 1 (context-sensitive), Type 0 (recursively enumerable, Turing-complete). Finite automaton: states + transitions + start state + accept states. NFA (nondeterministic) equivalent to DFA (deterministic) — subset construction converts NFA→DFA (exponential blowup possible).

## Further Reading

- [undefined](undefined)
