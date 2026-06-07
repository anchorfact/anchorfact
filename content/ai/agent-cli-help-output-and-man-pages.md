---
id: agent-cli-help-output-and-man-pages
title: 'Agent CLI Help Output and Man Pages'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-07'
created_date: '2026-06-07'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-agent-cli-help-output-and-man-pages-1
    statement: >-
      GNU Coding Standards say the standard --help option should print brief invocation
      documentation to standard output and then exit successfully.
    source_title: GNU Coding Standards --help
    source_url: https://www.gnu.org/prep/standards/html_node/_002d_002dhelp.html
    confidence: medium
  - id: fact-ai-agent-cli-help-output-and-man-pages-2
    statement: >-
      Python argparse documentation says ArgumentParser adds a -h or --help option by default
      that displays the parser help message.
    source_title: Python argparse Documentation
    source_url: https://docs.python.org/3/library/argparse.html
    confidence: medium
  - id: fact-ai-agent-cli-help-output-and-man-pages-3
    statement: >-
      The Linux man manual page describes man as an interface to system reference manuals and
      says manual pages conventionally include sections such as NAME, SYNOPSIS, DESCRIPTION,
      OPTIONS, EXIT STATUS, FILES, and SEE ALSO.
    source_title: man Linux Manual Page
    source_url: https://man7.org/linux/man-pages/man1/man.1.html
    confidence: medium
completeness: 0.82
known_gaps:
  - CLI help output is not always complete, versioned, or synchronized with online documentation.
  - Agents still need to verify the command version, shell, platform, and working directory before acting on help text.
disputed_statements: []
primary_sources:
  - title: GNU Coding Standards --help
    type: documentation
    year: 2026
    url: https://www.gnu.org/prep/standards/html_node/_002d_002dhelp.html
    institution: GNU Project
  - title: Python argparse Documentation
    type: documentation
    year: 2026
    url: https://docs.python.org/3/library/argparse.html
    institution: Python Software Foundation
  - title: man Linux Manual Page
    type: documentation
    year: 2026
    url: https://man7.org/linux/man-pages/man1/man.1.html
    institution: Linux man-pages project
secondary_sources: []
updated: '2026-06-07'
ai_models:
  - gpt-5-codex
---

## TL;DR

CLI help output and manual pages are first-line evidence for agents that need to run commands safely.

## Core Explanation

Agents often need to inspect a command before executing it. The most useful local evidence is the exact tool version plus its `--help`, usage output, manual page, or subcommand help. These surfaces describe flags, positional arguments, exit behavior, environment variables, files, and examples without requiring broad web search.

This evidence is still scoped. Help text can be stale, generated dynamically, localized, or different across package versions. Agents should cite the observed command and version, avoid guessing unsupported flags, and prefer dry-run or read-only modes when the command can change state.

## Source-Mapped Facts

- GNU Coding Standards say the standard --help option should print brief invocation documentation to standard output and then exit successfully. ([source](https://www.gnu.org/prep/standards/html_node/_002d_002dhelp.html))
- Python argparse documentation says ArgumentParser adds a -h or --help option by default that displays the parser help message. ([source](https://docs.python.org/3/library/argparse.html))
- The Linux man manual page describes man as an interface to system reference manuals and says manual pages conventionally include sections such as NAME, SYNOPSIS, DESCRIPTION, OPTIONS, EXIT STATUS, FILES, and SEE ALSO. ([source](https://man7.org/linux/man-pages/man1/man.1.html))

## Further Reading

- [GNU Coding Standards --help](https://www.gnu.org/prep/standards/html_node/_002d_002dhelp.html)
- [Python argparse Documentation](https://docs.python.org/3/library/argparse.html)
- [man Linux Manual Page](https://man7.org/linux/man-pages/man1/man.1.html)
