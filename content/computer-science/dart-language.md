---
id:"kb-2026-00306"
title:"Dart Language"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Dart Documentation"
    type:"documentation"
    year:2026
    url:"https://dart.dev/guides"
    institution:"Google"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Dart (Google, 2011) is an object-oriented language optimized for client development — primarily Flutter apps. Dart 3 (2023) introduced 100% sound null safety, records, patterns, and class modifiers. Compiles to native ARM/x86 (AOT) for mobile, and JavaScript for web.

## Core Explanation

Null safety: all types are non-null unless explicitly marked `?`. Async: `Future<T>` and `async/await`. `Stream<T>` for reactive data. `isolate` for concurrent threads (no shared memory). Flutter: UI framework using Dart — single codebase for iOS, Android, Web, Desktop. Dart JIT: hot reload during development; AOT: fast production startup.

## Further Reading

- [Dart Documentation](https://dart.dev/guides)
