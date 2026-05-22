---
id:"kb-2026-00178"
title:"Testing Pyramid"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Succeeding with Agile (Mike Cohn)"
    type:"book"
    year:2009
    url:"https://www.mountaingoatsoftware.com/books/succeeding-with-agile"
    institution:"Addison-Wesley"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

The Testing Pyramid (Mike Cohn) describes the optimal distribution of test types: many fast unit tests at the base, fewer integration tests in the middle, few slow E2E tests at the top. The Anti-Pattern: inverted pyramid (ice cream cone) — many E2E tests, few unit tests.

## Core Explanation

Unit tests: test individual functions/components in isolation, milliseconds, run on every commit. Integration tests: test multiple units together (API + DB), seconds. E2E tests: test full user flows through browser (Cypress, Playwright), minutes, run on deploy. Coverage metrics: line, branch, function — 100% coverage ≠ bug-free. Test behavior, not implementation.

## Further Reading

- [Succeeding with Agile (Mike Cohn)](https://www.mountaingoatsoftware.com/books/succeeding-with-agile)
