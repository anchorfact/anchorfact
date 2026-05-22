---
id:"kb-2026-00293"
title:"Laravel"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "Laravel Documentation"
    type: "documentation"
    year: 2026
    url: "https://laravel.com/docs/"
    institution: "Laravel"
    note: "PHP web framework: Eloquent ORM, Blade, Artisan, middleware, queues"
secondary_sources:
  - title: "Laravel: Up & Running (3rd Edition)"
    authors: ["Stauffer, Matt"]
    type: "book"
    year: 2023
    url: "https://www.oreilly.com/library/view/laravel-up/9781098153250/"
    institution: "O'Reilly"
    note: "Practical Laravel guide: routing, controllers, Eloquent, testing, deployment"
completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Laravel (Taylor Otwell, 2011) is the most popular PHP web framework, known for elegant syntax and comprehensive ecosystem. Features: Eloquent ORM, Blade templating, Artisan CLI, migrations, queues, broadcasting. Laravel ecosystem includes Forge (server management), Vapor (serverless), Nova (admin panel).

## Core Explanation

Eloquent ORM: `User::where('active', true)->get()` — fluent query building. Blade: `@if`, `@foreach`, `{{ $var }}` (auto-escaped). Artisan: `php artisan make:model`, `migrate`, `queue:work`. Service container and providers for dependency injection. Laravel 11 (2024): slimmer skeleton, SQLite by default, health routing.

## Further Reading

- [Laravel Documentation](https://laravel.com/docs/)
