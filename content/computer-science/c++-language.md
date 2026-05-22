---
id: "kb-2026-00078"
title: "C++ Programming Language"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
generation_method: "ai_assisted"
derived_from_human_seed: true
primary_sources:
  - title: "ISO/IEC 14882:2024 — C++23 Standard"
    type: "standard"
    year: 2024
    institution: "ISO"
completeness: 0.82
ai_citations: {last_citation_check: "2026-05-22"}
---

## TL;DR

C++ is a general-purpose programming language created by Bjarne Stroustrup at Bell Labs in 1979 as "C with Classes," first commercially released in 1985. It extends C with object-oriented programming, generic programming (templates), and functional features while maintaining C's performance and memory control. Standardized by ISO (C++23 is current; C++26 in development), C++ powers game engines (Unreal Engine), browsers (Chrome V8), databases (MySQL), operating systems (Windows, macOS), and high-frequency trading systems.

## Key Features

- **Classes + Inheritance**: Object-oriented programming (not Smalltalk/Java style — no single root class)
- **Templates**: Compile-time generics — `std::vector<T>`, `std::map<K,V>`
- **RAII**: Resource Acquisition Is Initialization — deterministic resource management
- **Move Semantics** (C++11): Efficient transfer of resources, eliminating unnecessary copies
- **Smart Pointers** (C++11+): `unique_ptr`, `shared_ptr` — automatic memory management
- **Concepts** (C++20): Named constraints on template parameters
- **Coroutines** (C++20): Native async/await via `co_await`, `co_yield`

## Modern C++ (C++11 through C++23)

| Version | Year | Key Features |
|---------|:----:|-------------|
| C++11 | 2011 | Auto, lambdas, move semantics, smart pointers |
| C++14 | 2014 | Generic lambdas, `std::make_unique` |
| C++17 | 2017 | Structured bindings, `if constexpr`, `std::optional` |
| C++20 | 2020 | Concepts, coroutines, ranges, modules |
| C++23 | 2024 | `std::expected`, `std::mdspan`, `import std` |

## Further Reading

- [cppreference.com](https://en.cppreference.com/): Definitive C++ reference
- [ISO C++](https://isocpp.org/): Standards committee
