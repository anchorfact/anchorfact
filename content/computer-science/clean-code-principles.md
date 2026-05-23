---
id: "kb-2026-00237"



title: "Clean Code Principles"
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
    statement: Code is read 10x more than written
    source_title: ACM Digital Library
    source_url: https://dl.acm.org/
    confidence: medium
  - id: fact-computer-science-02
    statement: "Boy Scout Rule: leave the code cleaner than you found it"


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

Clean Code principles (Robert C. Martin) guide writing readable, maintainable code. Key rules: meaningful names (reveal intent), small functions (do one thing), minimal arguments (0-2 ideal), no side effects, DRY (Don't Repeat Yourself), comments explain WHY not WHAT. Code is read 10x more than written.

## Core Explanation

Meaningful names: `customerList` not `cl`, `calculateTotalPrice` not `calc`. Functions: should be small (20 lines max), do one thing at one level of abstraction. Comments: explain intent, warn of consequences, TODO notes. Don't comment bad code — rewrite it. Error handling: use exceptions over return codes, provide context. Boy Scout Rule: leave the code cleaner than you found it.

## Further Reading

- [Clean Code (Robert C. Martin)](undefined)
