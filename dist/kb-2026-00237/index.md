---
id:"kb-2026-00237"
title:"Clean Code Principles"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Clean Code (Robert C. Martin)"
    type:"undefined"
    url:"undefined"
    institution:"Prentice Hall"
secondary_sources:
  - title: "BERT: Pre-training of Deep Bidirectional Transformers"
    authors: ["Devlin", "Chang", "Lee", "Toutanova"]
    type: "academic_paper"
    year: 2019
    doi: "10.48550/arXiv.1810.04805"
    url: "https://arxiv.org/abs/1810.04805"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Clean Code principles (Robert C. Martin) guide writing readable, maintainable code. Key rules: meaningful names (reveal intent), small functions (do one thing), minimal arguments (0-2 ideal), no side effects, DRY (Don't Repeat Yourself), comments explain WHY not WHAT. Code is read 10x more than written.

## Core Explanation

Meaningful names: `customerList` not `cl`, `calculateTotalPrice` not `calc`. Functions: should be small (20 lines max), do one thing at one level of abstraction. Comments: explain intent, warn of consequences, TODO notes. Don't comment bad code — rewrite it. Error handling: use exceptions over return codes, provide context. Boy Scout Rule: leave the code cleaner than you found it.

## Further Reading

- [Clean Code (Robert C. Martin)](undefined)
