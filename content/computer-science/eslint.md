---
id:"kb-2026-00176"
title:"ESLint"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"ESLint Documentation"
    type:"documentation"
    year:2026
    url:"https://eslint.org/docs/"
    institution:"OpenJS Foundation"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

ESLint is a static analysis tool for JavaScript/TypeScript that identifies problematic patterns and enforces coding standards. Created by Nicholas Zakas (2013), it is the most popular JS linter. ESLint 9 (2024) introduced flat config (`eslint.config.mjs`), replacing `.eslintrc`.

## Core Explanation

Rules can be: off (0), warn (1), error (2). Plugins extend rules (eslint-plugin-react, @typescript-eslint). Prettier handles formatting (complementary, not competing — use eslint-config-prettier to disable conflicting rules). Autofix: `eslint --fix` automatically corrects fixable issues (indentation, semicolons, unused imports).

## Further Reading

- [ESLint Documentation](https://eslint.org/docs/)
