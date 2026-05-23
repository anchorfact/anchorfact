---
id:"kb-2026-00236"
title:"Technical Debt"
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

Technical debt (Ward Cunningham, 1992) is the implied cost of future rework caused by choosing an expedient solution now instead of a better approach that would take longer. Like financial debt, it accrues interest — the longer you delay, the more it costs to fix.

## Core Explanation

Types: deliberate (strategic, 'we'll fix later'), accidental (unintentional, poor design), bit rot (code decays over time). Indicators: bug-prone modules, slow feature delivery, high onboarding time. Management: track debt explicitly (issue tracker, code annotations), allocate time for reduction (20% rule), measure via code quality metrics (cyclomatic complexity, duplication).

## Further Reading

- [Managing Technical Debt (Ward Cunningham, 1992)](undefined)
