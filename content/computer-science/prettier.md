---
id: kb-2026-00177
title: Prettier
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-prettier-001
    statement: >-
      Prettier enforces consistent code style by parsing source code and reprinting the parsed abstract syntax tree with
      its own formatting rules.
    source_title: What is Prettier? - Prettier
    source_url: https://prettier.io/docs/
    confidence: medium
  - id: fact-computer-science-prettier-002
    statement: >-
      Prettier documents printWidth as a preferred line-length target for formatting rather than a hard maximum
      line-length rule.
    source_title: Options - Prettier
    source_url: https://prettier.io/docs/options.html
    confidence: medium
  - id: fact-computer-science-prettier-003
    statement: Prettier configuration files can define formatting options and use overrides for particular file patterns.
    source_title: Configuration File - Prettier
    source_url: https://prettier.io/docs/configuration.html
    confidence: medium
completeness: 0.86
known_gaps:
  - This public sample was manually narrowed to source-backed facts on 2026-05-28.
disputed_statements: []
primary_sources:
  - title: What is Prettier? - Prettier
    type: documentation
    year: 2026
    url: https://prettier.io/docs/
    institution: Prettier
  - title: Options - Prettier
    type: documentation
    year: 2026
    url: https://prettier.io/docs/options.html
    institution: Prettier
  - title: Configuration File - Prettier
    type: documentation
    year: 2026
    url: https://prettier.io/docs/configuration.html
    institution: Prettier
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Prettier is an opinionated formatter that parses code and prints it back in a consistent style. This repair removes review-culture claims and keeps to the formatter, option, and configuration behavior documented by Prettier.

## Core Explanation

The central idea is that Prettier owns formatting output. A project can still set documented options such as print width, and configuration files can apply overrides for specific file patterns.

## Further Reading

- [What is Prettier? - Prettier](https://prettier.io/docs/)
- [Options - Prettier](https://prettier.io/docs/options.html)
- [Configuration File - Prettier](https://prettier.io/docs/configuration.html)
