---
id:"kb-2026-00302"
title:"Kotlin"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed:true
primary_sources:
  - title:"Kotlin Documentation"
    type:"documentation"
    year:2026
    url:"https://kotlinlang.org/docs/"
    institution:"JetBrains"
secondary_sources:
  - title: "Kotlin in Action (2nd Ed)"
    authors: ["Jemerov", "Isakova"]
    type: "book"
    year: 2024
    url: "https://www.manning.com/books/kotlin-in-action-second-edition"
    institution: "Manning"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Kotlin (JetBrains, 2011) is a statically-typed JVM language, officially supported for Android since 2017 (Google I/O). Concise syntax, null safety (nullable types `String?`), coroutines for async, 100% Java interoperable. Used by: Google (Android), Pinterest, Uber, Trello.

## Core Explanation

Null safety: `var name: String? = null` — compiler prevents NPEs. Coroutines: `launch { delay(1000) }` — lightweight concurrency. Extension functions: `fun String.isEmail(): Boolean`. Data classes: `data class User(val name: String)`. Kotlin Multiplatform (KMP): share business logic across Android, iOS, Web, Desktop.

## Further Reading

- [Kotlin Documentation](https://kotlinlang.org/docs/)
