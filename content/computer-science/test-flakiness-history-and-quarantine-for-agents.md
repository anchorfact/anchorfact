---
id: test-flakiness-history-and-quarantine-for-agents
title: 'Test Flakiness History and Quarantine for Agents'
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: '2026-06-09'
created_date: '2026-06-09'
generation_method: ai_structured
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-cs-test-flakiness-history-and-quarantine-for-agents-1
    statement: >-
      Playwright documentation classifies a test that fails initially but passes
      on retry as flaky.
    source_title: Playwright Test Retries
    source_url: https://playwright.dev/docs/test-retries
    confidence: medium
  - id: fact-cs-test-flakiness-history-and-quarantine-for-agents-2
    statement: >-
      GitLab documentation describes quarantining tests that are failing due to
      non-deterministic behavior.
    source_title: GitLab Quarantining Tests
    source_url: https://docs.gitlab.com/development/testing_guide/quarantining_tests/
    confidence: medium
  - id: fact-cs-test-flakiness-history-and-quarantine-for-agents-3
    statement: >-
      pytest documentation describes xfail as marking tests that are expected to
      fail.
    source_title: pytest Skip and xfail
    source_url: https://docs.pytest.org/en/stable/how-to/skipping.html
    confidence: medium
completeness: 0.84
known_gaps:
  - Flakiness evidence depends on retry policy, random seed, runner image, test order, timing, network mocks, browser version, quarantine policy, and whether failures are grouped by test identity across renames.
  - Quarantining a test can protect CI signal quality while also hiding product regressions if ownership, expiry, and repair tracking are weak.
disputed_statements: []
primary_sources:
  - title: Playwright Test Retries
    type: documentation
    year: 2026
    url: https://playwright.dev/docs/test-retries
    institution: Microsoft Playwright
  - title: GitLab Quarantining Tests
    type: documentation
    year: 2026
    url: https://docs.gitlab.com/development/testing_guide/quarantining_tests/
    institution: GitLab
  - title: pytest Skip and xfail
    type: documentation
    year: 2026
    url: https://docs.pytest.org/en/stable/how-to/skipping.html
    institution: pytest
secondary_sources: []
updated: '2026-06-09'
ai_models:
  - gpt-5-codex
---

## TL;DR

Flaky-test history tells agents whether a failing check is a new regression, a known nondeterministic test, or a quarantined signal that should not be ignored forever.

## Core Explanation

CI failures are not all equal. A deterministic failure on the first run may point to a patch regression. A test that fails and then passes on retry may indicate timing, isolation, data, or environment instability. A quarantined or expected-failure test may already be known, but it still needs ownership and an expiry path.

Useful evidence includes test ID, file path, retry count, first-fail timestamp, pass-on-retry status, historical failure rate, runner image, random seed, quarantine marker, xfail reason, linked issue, owner, and last successful non-quarantined run. Without these fields, an agent may either overreact to a known flaky test or dismiss a real regression as "probably flaky."

Agents should avoid using retries as proof of correctness. Retry and quarantine metadata are diagnostic evidence, not a substitute for fixing nondeterminism or preserving meaningful CI gates.

## Source-Mapped Facts

- Playwright documentation classifies a test that fails initially but passes on retry as flaky. ([source](https://playwright.dev/docs/test-retries))
- GitLab documentation describes quarantining tests that are failing due to non-deterministic behavior. ([source](https://docs.gitlab.com/development/testing_guide/quarantining_tests/))
- pytest documentation describes xfail as marking tests that are expected to fail. ([source](https://docs.pytest.org/en/stable/how-to/skipping.html))

## Further Reading

- [Playwright Test Retries](https://playwright.dev/docs/test-retries)
- [GitLab Quarantining Tests](https://docs.gitlab.com/development/testing_guide/quarantining_tests/)
- [pytest Skip and xfail](https://docs.pytest.org/en/stable/how-to/skipping.html)
