---
id: agent-browser-traces-and-playwright-test-artifacts
title: 'Agent Browser Traces and Playwright Test Artifacts'
schema_type: TechArticle
category: ai
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
  - id: fact-ai-agent-browser-traces-and-playwright-test-artifacts-1
    statement: >-
      Playwright documentation says Trace Viewer helps explore recorded traces after a script has
      run and is useful for debugging failed CI tests.
    source_title: Playwright Trace Viewer
    source_url: https://playwright.dev/docs/trace-viewer
    confidence: medium
  - id: fact-ai-agent-browser-traces-and-playwright-test-artifacts-2
    statement: >-
      Playwright documentation says traces on CI can be recorded on the first retry of a failed
      test with the trace option set to on-first-retry.
    source_title: Playwright Trace Viewer
    source_url: https://playwright.dev/docs/trace-viewer
    confidence: medium
  - id: fact-ai-agent-browser-traces-and-playwright-test-artifacts-3
    statement: >-
      GitHub Actions documentation says workflow artifacts can store and share data produced by
      jobs in a workflow.
    source_title: GitHub Actions Workflow Artifacts
    source_url: https://docs.github.com/en/actions/how-tos/writing-workflows/choosing-what-your-workflow-does/storing-and-sharing-data-from-a-workflow
    confidence: medium
completeness: 0.82
known_gaps:
  - Browser trace usefulness depends on whether screenshots, snapshots, console logs, network logs, videos, and CI artifact retention were enabled for the failing run.
disputed_statements: []
primary_sources:
  - title: Playwright Trace Viewer
    type: documentation
    year: 2026
    url: https://playwright.dev/docs/trace-viewer
    institution: Microsoft
  - title: GitHub Actions Workflow Artifacts
    type: documentation
    year: 2026
    url: https://docs.github.com/en/actions/how-tos/writing-workflows/choosing-what-your-workflow-does/storing-and-sharing-data-from-a-workflow
    institution: GitHub
secondary_sources: []
updated: '2026-06-03'
ai_models:
  - gpt-5-codex
---

## TL;DR

Browser agents should treat traces, HTML reports, screenshots, videos, and workflow artifacts as primary debugging evidence for UI test failures.

## Core Explanation

A failing browser test is often hard to diagnose from a stack trace alone. A Playwright trace can preserve action steps, DOM snapshots, console output, network requests, metadata, and attachments. CI artifacts make those files available after the runner has disappeared.

Agents should first locate the failed test, retry count, trace ZIP, HTML report, screenshot, video, and CI artifact retention window. They should avoid inferring UI state from logs when a trace or screenshot is available.

## Source-Mapped Facts

- Playwright documentation says Trace Viewer helps explore recorded traces after a script has run and is useful for debugging failed CI tests. ([source](https://playwright.dev/docs/trace-viewer))
- Playwright documentation says traces on CI can be recorded on the first retry of a failed test with the trace option set to on-first-retry. ([source](https://playwright.dev/docs/trace-viewer))
- GitHub Actions documentation says workflow artifacts can store and share data produced by jobs in a workflow. ([source](https://docs.github.com/en/actions/how-tos/writing-workflows/choosing-what-your-workflow-does/storing-and-sharing-data-from-a-workflow))

## Further Reading

- [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer)
- [GitHub Actions Workflow Artifacts](https://docs.github.com/en/actions/how-tos/writing-workflows/choosing-what-your-workflow-does/storing-and-sharing-data-from-a-workflow)
