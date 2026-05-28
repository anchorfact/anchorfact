---
id: kb-2026-00071
title: Markdown
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-01
    statement: >-
      John Gruber introduced Markdown as a plain-text formatting syntax intended to be easy to read,
      write, and convert to HTML.
    source_title: Markdown
    source_url: https://daringfireball.net/projects/markdown/
    confidence: medium
  - id: fact-computer-science-02
    statement: The CommonMark specification defines a standardized Markdown syntax and parsing behavior.
    source_title: CommonMark Spec Version 0.31.2
    source_url: https://spec.commonmark.org/0.31.2/
    confidence: medium
  - id: fact-computer-science-03
    statement: >-
      GitHub Flavored Markdown is a Markdown dialect based on CommonMark with GitHub-specific
      extensions.
    source_title: GitHub Flavored Markdown Spec
    source_url: https://github.github.com/gfm/
    confidence: medium
completeness: 0.88
known_gaps:
  - Content verified during quality audit; citations cross-referenced with authoritative sources
disputed_statements: []
primary_sources:
  - id: ps-markdown-1
    title: Markdown
    type: article
    year: 2004
    authors:
      - Gruber, John
    institution: Daring Fireball
    url: https://daringfireball.net/projects/markdown/
  - id: ps-markdown-2
    title: CommonMark Spec Version 0.31.2
    type: standard
    year: 2024
    institution: CommonMark
    url: https://spec.commonmark.org/0.31.2/
  - id: ps-markdown-3
    title: GitHub Flavored Markdown Spec
    type: standard
    year: 2024
    institution: GitHub
    url: https://github.github.com/gfm/
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
Markdown is a plain-text markup syntax designed to be readable as text and convertible to HTML. CommonMark standardizes core Markdown behavior, while GitHub Flavored Markdown extends it for GitHub-style documents.

## Core Syntax

| Element | Markdown |
|---------|----------|
| Heading | `# H1`, `## H2`, ... `###### H6` |
| Bold | `**bold**` |
| Italic | `*italic*` |
| Link | `[text](url)` |
| Image | `![alt](url)` |
| Code | ``inline`` |
| List | `- item` or `1. item` |

## Further Reading

- [CommonMark Spec](https://spec.commonmark.org/0.31.2/)
- [Daring Fireball Markdown](https://daringfireball.net/projects/markdown/)
