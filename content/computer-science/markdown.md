---
id: "kb-2026-00071"
title: "Markdown"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-01"
    statement: "Markdown is a lightweight markup language for creating formatted text using a plain-text editor, created by John Gruber in 2004 with significant contributions from Aaron Swartz"
    source_title: "CommonMark Specification (v0.31.2)"
    source_url: "https://spec.commonmark.org/0.31.2/"
    confidence: "medium"
  - id: "fact-computer-science-02"
    statement: "Markdown is the dominant format for documentation , static site generators , note-taking apps , and LLM-optimized content"
    source_title: "CommonMark Specification (v0.31.2)"
    source_url: "https://spec.commonmark.org/0.31.2/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Content verified during quality audit; citations cross-referenced with authoritative sources"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

primary_sources:
  - title: "CommonMark Specification (v0.31.2)"
    type: "standard"
    year: 2024
    url: "https://spec.commonmark.org/0.31.2/"
    institution: "Commonmark"
  - title: "Markdown (Daring Fireball)"
    authors: ["Gruber, John"]
    type: "article"
    year: 2004
    url: "https://daringfireball.net/projects/markdown/"
    institution: "Daringfireball"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"

---


## TL;DR

Markdown is a lightweight markup language for creating formatted text using a plain-text editor, created by John Gruber in 2004 with significant contributions from Aaron Swartz. Its design goal is readability — Markdown source is intended to be as readable as plain text, unlike HTML's angle brackets. Markdown is the dominant format for documentation (README files, GitHub wikis), static site generators (Jekyll, Hugo, Astro), note-taking apps (Obsidian, Notion), and LLM-optimized content (llms.txt). The CommonMark specification (v0.31.2, 2024) provides a rigorous, unambiguous standard.

## Core Syntax

| Element | Markdown |
|---------|----------|
| Heading | `# H1`, `## H2`, ... `###### H6` |
| Bold | `**bold**` |
| Italic | `*italic*` |
| Link | `[text](url)` |
| Image | `![alt](url)` |
| Code | `` `inline` `` |
| Code block | ```` ```lang\ncode\n``` ```` |
| List | `- item` or `1. item` |
| Table | `\| col1 \| col2 \|` with `---|---|` |
| Blockquote | `> quoted text` |

## Dialects

- **CommonMark**: Rigorous specification (2014+)
- **GFM (GitHub Flavored Markdown)** : Adds task lists, tables, strikethrough, autolinks
- **MDX**: Markdown + JSX components (used by Next.js, Astro, Docusaurus)
- **R Markdown**: Markdown + executable R code for data science
- **Obsidian Markdown**: Adds wikilinks (`[[page]]`), callouts, YAML frontmatter

## Further Reading

- [CommonMark Spec](https://spec.commonmark.org/0.31.2/): Rigorous standardization
- [Daring Fireball Markdown](https://daringfireball.net/projects/markdown/): Original 2004 article
