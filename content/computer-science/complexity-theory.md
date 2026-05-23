---
id: "kb-2026-00197"


title: "Complexity Theory"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

atomic_facts:
  - id: fact-computer-science-01
    statement: Most computer scientists believe P ≠ NP
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  
completeness: 0.88
ai_citations:

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

Computational complexity classifies problems by the resources (time, memory) required to solve them. P: solvable in polynomial time by deterministic Turing machine. NP: verifiable in polynomial time. NP-complete: hardest problems in NP (SAT, TSP, knapsack). P vs NP: the greatest open problem in computer science.

## Core Explanation

P ⊆ NP ⊆ PSPACE ⊆ EXPTIME. NP-complete problems: if you can solve one efficiently, you can solve all (polynomial-time reduction). Cook-Levin Theorem: SAT is NP-complete. Consequences of P=NP: cryptography would break (factoring in P), optimization becomes easy. Most computer scientists believe P ≠ NP (though unproven).

## Further Reading

- [undefined](undefined)
