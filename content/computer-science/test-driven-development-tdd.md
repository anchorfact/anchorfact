---
id:"kb-2026-00232"
title:"Test-Driven Development (TDD)"
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

TDD (Kent Beck, 2002) is a development practice: write a failing test → write minimum code to pass → refactor. Red-Green-Refactor cycle. TDD ensures testability, drives design toward small, loosely coupled units, and provides a regression safety net. Not about testing — it's about design.

## Core Explanation

Red: write test, run, see it fail (confirms test catches failures). Green: write minimum code to pass test — no more. Refactor: clean up code while tests stay green. Benefits: 40-80% fewer bugs in production (IBM/Microsoft studies), confidence to refactor, living documentation. Outside-in TDD (mockist/Detroit school) vs. Inside-out TDD (classicist/London school).

## Further Reading

- [Test-Driven Development: By Example (Kent Beck)](undefined)
