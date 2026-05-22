---
id:"kb-2026-00203"
title:"Regular Expressions"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"undefined"
    type:"undefined"
    url:"undefined"
    institution:"O'Reilly"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Regular expressions (regex) are patterns for matching text, powered by finite automata theory. First introduced by Stephen Kleene (1951), regex is the standard tool for text search, validation, and extraction across programming languages, text editors, and command-line tools.

## Core Explanation

Core syntax: `.` any char, `*` zero or more, `+` one or more, `?` optional, `|` alternation, `[]` character class, `()` capturing group, `\d` digit, `\w` word char. Lookahead `(?=...)` and lookbehind `(?<=...)` assert without consuming. Backtracking can cause catastrophic (exponential) performance on pathological patterns — prefer simple, linear-time patterns.

## Further Reading

- [undefined](undefined)
