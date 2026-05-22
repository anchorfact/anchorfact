---
id: "kb-2026-00071"
title: "Markdown"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
confidence_rationale: "Based on CommonMark specification and original Daring Fireball article"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "CommonMark Specification (v0.31.2)"
    type: "standard"
    year: 2024
    url: "https://spec.commonmark.org/0.31.2/"
  - title: "Markdown (Daring Fireball)"
    authors: ["Gruber, John"]
    type: "article"
    year: 2004
    url: "https://daringfireball.net/projects/markdown/"
secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"
    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
    institution: "Mozilla"
completeness: 0.88
ai_citations: {last_citation_check: "2026-05-22"}
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
