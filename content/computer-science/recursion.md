---
id: "kb-2026-00137"



title: "Recursion"
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

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

atomic_facts:
  - id: fact-computer-science-01
    statement: Recursion is a technique where a function calls itself to solve smaller instances of the same problem
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

Recursion is a technique where a function calls itself to solve smaller instances of the same problem. It requires a base case (termination) and recursive case (problem reduction). Recursion elegantly models tree traversal, divide-and-conquer, and backtracking.

## Core Explanation

Tail recursion: recursive call is the last operation — compilers can optimize to iteration (no stack growth). JavaScript engines (Safari JSC only) support TCO. Recursion depth limited by call stack (~10K in browsers). Recursion can always be converted to iteration (using explicit stack), and vice versa.

## Further Reading

- [Structure and Interpretation of Computer Programs (SICP)](undefined)
