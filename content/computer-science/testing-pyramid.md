---
id: "kb-2026-00178"
title: "Testing Pyramid"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "medium"
last_verified: "2026-06-01"
created_date: "2026-05-22"
updated: "2026-06-01"
generation_method: "ai_assisted"
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"
atomic_facts:
  - id: "fact-testing-pyramid-001"
    statement: "Martin Fowler describes the test pyramid as a way to balance automated tests with more low-level unit tests than high-level GUI-driven tests."
    source_title: "Test Pyramid"
    source_url: "https://martinfowler.com/bliki/TestPyramid.html"
    confidence: "medium"
  - id: "fact-testing-pyramid-002"
    statement: "The Practical Test Pyramid describes Mike Cohn's original pyramid as three layers: unit tests, service tests, and user interface tests."
    source_title: "The Practical Test Pyramid"
    source_url: "https://martinfowler.com/articles/practical-test-pyramid.html"
    confidence: "medium"
  - id: "fact-testing-pyramid-003"
    statement: "Google Testing Blog recommends a pyramid-shaped first guess of 70% unit tests, 20% integration tests, and 10% end-to-end tests."
    source_title: "Just Say No to More End-to-End Tests"
    source_url: "https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html"
    confidence: "medium"
  - id: "fact-testing-pyramid-004"
    statement: "Playwright best practices recommend web-first assertions because Playwright waits until the expected condition is met."
    source_title: "Best Practices - Playwright"
    source_url: "https://playwright.dev/docs/best-practices"
    confidence: "medium"
completeness: 0.82
known_gaps:
  - "Testing strategy varies by system type; this entry does not prescribe exact ratios for every project."
  - "AI-generated tests still need human review, deterministic fixtures, and failure triage."
disputed_statements: []
primary_sources:
  - title: "Test Pyramid"
    type: "professional_resource"
    year: 2012
    url: "https://martinfowler.com/bliki/TestPyramid.html"
    institution: "Martin Fowler"
  - title: "The Practical Test Pyramid"
    type: "professional_resource"
    year: 2018
    url: "https://martinfowler.com/articles/practical-test-pyramid.html"
    institution: "Martin Fowler"
  - title: "Just Say No to More End-to-End Tests"
    type: "blog_post"
    year: 2015
    url: "https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html"
    institution: "Google Testing Blog"
  - title: "Best Practices - Playwright"
    type: "documentation"
    year: 2026
    url: "https://playwright.dev/docs/best-practices"
    institution: "Microsoft Playwright"
secondary_sources: []
---

## TL;DR

The testing pyramid is a practical rule for AI coding agents: generate many small, fast checks near the code, fewer integration checks, and a small number of end-to-end checks for critical user flows.

## Core Explanation

Agents can quickly overproduce brittle browser tests because they are easy to describe in natural language. A healthier workflow asks the agent to first add or update unit and integration tests that isolate the changed behavior, then reserve browser tests for user-visible flows that need full-system confidence.

## Source-Mapped Facts

- Martin Fowler describes the test pyramid as a way to balance automated tests with more low-level unit tests than high-level GUI-driven tests. ([source](https://martinfowler.com/bliki/TestPyramid.html))
- The Practical Test Pyramid describes Mike Cohn's original pyramid as three layers: unit tests, service tests, and user interface tests. ([source](https://martinfowler.com/articles/practical-test-pyramid.html))
- Google Testing Blog recommends a pyramid-shaped first guess of 70% unit tests, 20% integration tests, and 10% end-to-end tests. ([source](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html))
- Playwright best practices recommend web-first assertions because Playwright waits until the expected condition is met. ([source](https://playwright.dev/docs/best-practices))

## Operational Notes for AI Coding Agents

Ask the agent to state the intended test layer before writing tests. For implementation changes, prefer a failing unit or integration test first. For browser automation, require stable locators, web-first assertions, and a clear reason why lower-level tests are insufficient.

## Further Reading

- [Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html)
- [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [Just Say No to More End-to-End Tests](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
