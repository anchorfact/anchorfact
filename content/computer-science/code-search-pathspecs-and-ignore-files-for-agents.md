---
id: code-search-pathspecs-and-ignore-files-for-agents
title: 'Code Search Pathspecs and Ignore Files for Agents'
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
  - id: fact-cs-code-search-pathspecs-and-ignore-files-for-agents-1
    statement: >-
      Git gitignore documentation says a gitignore file specifies intentionally untracked files that
      Git should ignore.
    source_title: Git gitignore Documentation
    source_url: https://git-scm.com/docs/gitignore
    confidence: medium
  - id: fact-cs-code-search-pathspecs-and-ignore-files-for-agents-2
    statement: >-
      Git glossary documentation says pathspecs limit the scope of many Git commands to a subset of
      the tree or working tree.
    source_title: Git Glossary Pathspec
    source_url: https://git-scm.com/docs/gitglossary
    confidence: medium
  - id: fact-cs-code-search-pathspecs-and-ignore-files-for-agents-3
    statement: >-
      ripgrep documentation says ripgrep ignores .gitignore, .ignore, and .rgignore globs by default
      during recursive search.
    source_title: ripgrep Guide
    source_url: https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md
    confidence: medium
completeness: 0.82
known_gaps:
  - Search completeness depends on hidden files, binary files, symlinks, generated paths, vendored paths, submodules, case sensitivity, shell expansion, and tool-specific ignore precedence.
disputed_statements: []
primary_sources:
  - title: Git gitignore Documentation
    type: documentation
    year: 2026
    url: https://git-scm.com/docs/gitignore
    institution: Git
  - title: Git Glossary Pathspec
    type: documentation
    year: 2026
    url: https://git-scm.com/docs/gitglossary
    institution: Git
  - title: ripgrep Guide
    type: documentation
    year: 2026
    url: https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md
    institution: ripgrep
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Code agents should treat empty search results as a hypothesis, not proof, until pathspecs and ignore rules are understood.

## Core Explanation

Git and search tools intentionally filter files. That is usually correct, but it can hide generated files, fixtures, vendored code, build output, or logs that matter to a debugging task. Pathspecs narrow Git operations, while ignore files shape what search tools traverse.

Agents should record the command, working directory, pathspecs, glob filters, ignore files, hidden-file flags, binary-file behavior, and whether submodules or symlinks were traversed. When evidence is missing, rerun a bounded search with explicit include and ignore settings before concluding code is absent.

## Source-Mapped Facts

- Git gitignore documentation says a gitignore file specifies intentionally untracked files that Git should ignore. ([source](https://git-scm.com/docs/gitignore))
- Git glossary documentation says pathspecs limit the scope of many Git commands to a subset of the tree or working tree. ([source](https://git-scm.com/docs/gitglossary))
- ripgrep documentation says ripgrep ignores .gitignore, .ignore, and .rgignore globs by default during recursive search. ([source](https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md))

## Further Reading

- [Git gitignore Documentation](https://git-scm.com/docs/gitignore)
- [Git Glossary Pathspec](https://git-scm.com/docs/gitglossary)
- [ripgrep Guide](https://github.com/BurntSushi/ripgrep/blob/master/GUIDE.md)
