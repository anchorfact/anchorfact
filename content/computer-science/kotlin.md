---
id: kb-2026-00302
title: Kotlin
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
primary_sources:
  - title: Kotlin Documentation
    type: documentation
    year: 2026
    url: https://kotlinlang.org/docs/
    institution: JetBrains
secondary_sources:
  - title: Kotlin in Action (2nd Ed)
    authors:
      - Jemerov
      - Isakova
    type: book
    year: 2024
    url: https://www.manning.com/books/kotlin-in-action-second-edition
    institution: Manning
  - title: The C Programming Language (K&R, 2nd Ed)
    type: textbook
    year: 1988
    url: https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html
    institution: Prentice Hall
  - title: Structure and Interpretation of Computer Programs (SICP)
    type: textbook
    year: 1996
    url: https://mitpress.mit.edu/sites/default/files/sicp/
    institution: MIT Press
atomic_facts:
  - id: fact-computer-science-01
    statement: Kotlin is a statically-typed JVM language, officially supported for Android since 2017
    source_title: Kotlin Documentation
    source_url: https://kotlinlang.org/docs/
    confidence: medium
  - id: fact-computer-science-001
    statement: >-
      Kotlin (JetBrains, 2011) is a statically-typed JVM language, officially supported for Android since 2017 (Google I/O). Concise syntax, null safety (nullable types `String?`), coroutines for
      async, 100% Java interoperable. Used by: Google (Android), Pinterest, Uber, Trello.
    confidence: medium
    source_title: Kotlin Documentation
    source_url: https://kotlinlang.org/docs/
  - id: fact-computer-science-002
    statement: "Coroutines: `launch { delay(1000) }` — lightweight concurrency."
    confidence: medium
    source_title: Kotlin Documentation
    source_url: https://kotlinlang.org/docs/
  - id: fact-computer-science-003
    statement: "Kotlin Multiplatform (KMP): share business logic across Android, iOS, Web, Desktop."
    confidence: medium
    source_title: Kotlin Documentation
    source_url: https://kotlinlang.org/docs/
completeness: 0.88
known_gaps:
  - This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances
  - Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed
disputed_statements:
  - statement: >-
      The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the
      available evidence
    context: See primary sources for competing interpretations
ai_citations: null
---



## TL;DR

Kotlin (JetBrains, 2011) is a statically-typed JVM language, officially supported for Android since 2017 (Google I/O). Concise syntax, null safety (nullable types `String?`), coroutines for async, 100% Java interoperable. Used by: Google (Android), Pinterest, Uber, Trello.

## Core Explanation

Null safety: `var name: String? = null` — compiler prevents NPEs. Coroutines: `launch { delay(1000) }` — lightweight concurrency. Extension functions: `fun String.isEmail(): Boolean`. Data classes: `data class User(val name: String)`. Kotlin Multiplatform (KMP): share business logic across Android, iOS, Web, Desktop.

## Further Reading

- [Kotlin Documentation](https://kotlinlang.org/docs/)
