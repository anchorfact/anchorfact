---
id: code-generated-files-and-vendored-code-detection
title: 'Code Generated Files and Vendored Code Detection'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-03'
created_date: '2026-06-03'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-code-generated-files-and-vendored-code-detection-1
    statement: >-
      GitHub documentation says .gitattributes can be used with linguist-generated to mark generated
      files.
    source_title: GitHub Customizing Changed Files
    source_url: https://docs.github.com/en/repositories/working-with-files/managing-files/customizing-how-changed-files-appear-on-github
    confidence: medium
  - id: fact-cs-code-generated-files-and-vendored-code-detection-2
    statement: >-
      GitHub documentation says .gitattributes can be used with linguist-vendored to mark vendored
      files.
    source_title: GitHub Customizing Changed Files
    source_url: https://docs.github.com/en/repositories/working-with-files/managing-files/customizing-how-changed-files-appear-on-github
    confidence: medium
  - id: fact-cs-code-generated-files-and-vendored-code-detection-3
    statement: >-
      Git documentation says gitattributes files define attributes for pathnames.
    source_title: Git gitattributes
    source_url: https://git-scm.com/docs/gitattributes
    confidence: medium
completeness: 0.82
known_gaps:
  - Generated and vendored detection depends on repository conventions, lockfiles, build outputs, minified files, language-specific generators, code owners, license notices, and whether generated files are committed intentionally.
disputed_statements: []
primary_sources:
  - title: GitHub Customizing Changed Files
    type: documentation
    year: 2026
    url: https://docs.github.com/en/repositories/working-with-files/managing-files/customizing-how-changed-files-appear-on-github
    institution: GitHub
  - title: Git gitattributes
    type: documentation
    year: 2026
    url: https://git-scm.com/docs/gitattributes
    institution: Git
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Code agents should identify generated and vendored files before editing, reviewing, blaming, or counting source code.

## Core Explanation

Generated files are usually produced by tools, schemas, compilers, or code generators. Vendored files are copied from another project or dependency. Both can distort search results, ownership signals, coverage reports, license scans, and review diffs.

Agents should inspect `.gitattributes`, repository conventions, lockfiles, build directories, source maps, generator comments, and package metadata before editing these files. If a generated file is wrong, the right fix may be the source schema or generator, not the generated artifact.

## Source-Mapped Facts

- GitHub documentation says .gitattributes can be used with linguist-generated to mark generated files. ([source](https://docs.github.com/en/repositories/working-with-files/managing-files/customizing-how-changed-files-appear-on-github))
- GitHub documentation says .gitattributes can be used with linguist-vendored to mark vendored files. ([source](https://docs.github.com/en/repositories/working-with-files/managing-files/customizing-how-changed-files-appear-on-github))
- Git documentation says gitattributes files define attributes for pathnames. ([source](https://git-scm.com/docs/gitattributes))

## Further Reading

- [GitHub Customizing Changed Files](https://docs.github.com/en/repositories/working-with-files/managing-files/customizing-how-changed-files-appear-on-github)
- [Git gitattributes](https://git-scm.com/docs/gitattributes)
