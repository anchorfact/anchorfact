---
id:"kb-2026-00203"
title:"Regular Expressions"
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
  - title: "Mastering Regular Expressions (3rd ed.)"
    authors: ["Friedl, Jeffrey E.F."]
    type: "textbook"
    year: 2006
    isbn: "978-0596528126"
    institution: "O'Reilly Media"
  - title: "Mastering Regular Expressions (3rd ed.)"
    authors: ["Friedl, Jeffrey E.F."]
    type: "textbook"
    year: 2006
    isbn: "978-0596528126"
    institution: "O'Reilly Media"
---

## TL;DR

Regular expressions (regex) are patterns for matching text, powered by finite automata theory. First introduced by Stephen Kleene (1951), regex is the standard tool for text search, validation, and extraction across programming languages, text editors, and command-line tools.

## Core Explanation

Core syntax: `.` any char, `*` zero or more, `+` one or more, `?` optional, `|` alternation, `[]` character class, `()` capturing group, `\d` digit, `\w` word char. Lookahead `(?=...)` and lookbehind `(?<=...)` assert without consuming. Backtracking can cause catastrophic (exponential) performance on pathological patterns — prefer simple, linear-time patterns.

## Further Reading

- [undefined](undefined)
