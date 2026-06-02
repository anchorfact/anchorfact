---
id: agent-terminal-output-and-exit-status
title: 'Agent Terminal Output and Exit Status'
schema_type: TechArticle
category: ai
language: en
confidence: medium
last_verified: '2026-06-02'
created_date: '2026-06-02'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-agent-terminal-output-and-exit-status-1
    statement: >-
      Python subprocess documentation says CompletedProcess contains args, returncode, stdout, and
      stderr attributes.
    source_title: Python subprocess
    source_url: https://docs.python.org/3/library/subprocess.html
    confidence: medium
  - id: fact-ai-agent-terminal-output-and-exit-status-2
    statement: >-
      Node.js child_process documentation says spawned child processes expose stdin, stdout, and
      stderr streams.
    source_title: Node.js child_process
    source_url: https://nodejs.org/api/child_process.html
    confidence: medium
  - id: fact-ai-agent-terminal-output-and-exit-status-3
    statement: >-
      GitHub Actions documentation says exit code 0 indicates success and other exit codes indicate
      failure for actions.
    source_title: GitHub Actions Exit Codes
    source_url: https://docs.github.com/en/actions/how-tos/create-and-publish-actions/set-exit-codes
    confidence: medium
completeness: 0.83
known_gaps:
  - Terminal interpretation depends on shell, encoding, working directory, environment variables, streamed output ordering, truncation, timeout handling, and whether stderr is diagnostic or fatal.
disputed_statements: []
primary_sources:
  - title: Python subprocess
    type: documentation
    year: 2026
    url: https://docs.python.org/3/library/subprocess.html
    institution: Python
  - title: Node.js child_process
    type: documentation
    year: 2026
    url: https://nodejs.org/api/child_process.html
    institution: Node.js
  - title: GitHub Actions Exit Codes
    type: documentation
    year: 2026
    url: https://docs.github.com/en/actions/how-tos/create-and-publish-actions/set-exit-codes
    institution: GitHub
secondary_sources: []
updated: '2026-06-02'
ai_models:
  - gpt-5-codex
---

## TL;DR

Agents should treat terminal output as structured evidence: command, cwd, exit status, stdout, stderr, duration, and timeout all matter.

## Core Explanation

The same text can mean different things depending on whether a command exited successfully, timed out, or wrote only to stderr. Agents should preserve the command line, shell, working directory, environment assumptions, exit code, stdout, stderr, and truncation metadata before deciding whether a build, test, or migration succeeded.

For long-running commands, streamed output should be tied back to the process that emitted it so stale logs do not get mistaken for current state.

## Source-Mapped Facts

- Python subprocess documentation says CompletedProcess contains args, returncode, stdout, and stderr attributes. ([source](https://docs.python.org/3/library/subprocess.html))
- Node.js child_process documentation says spawned child processes expose stdin, stdout, and stderr streams. ([source](https://nodejs.org/api/child_process.html))
- GitHub Actions documentation says exit code 0 indicates success and other exit codes indicate failure for actions. ([source](https://docs.github.com/en/actions/how-tos/create-and-publish-actions/set-exit-codes))

## Further Reading

- [Python subprocess](https://docs.python.org/3/library/subprocess.html)
- [Node.js child_process](https://nodejs.org/api/child_process.html)
- [GitHub Actions Exit Codes](https://docs.github.com/en/actions/how-tos/create-and-publish-actions/set-exit-codes)
