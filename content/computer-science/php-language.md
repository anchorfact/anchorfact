---
id: kb-2026-00303
title: PHP Language
schema_type: TechArticle
category: computer-science
language: en
confidence: high
last_verified: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
primary_sources:
  - title: PHP Manual
    type: documentation
    year: 2026
    url: https://www.php.net/docs.php
    institution: The PHP Group
    note: "Server-side language: PHP 8.x, JIT, fibers, named arguments, match expressions"
secondary_sources:
  - title: "PHP & MySQL: Server-side Web Development"
    authors:
      - Duckett, Jon
    type: book
    year: 2022
    url: https://www.wiley.com/en-us/PHP+%26+MySQL%3A+Server+side+Web+Development-p-9781119149224
    institution: Wiley
    note: Practical PHP 8 guide covering modern web development patterns
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
atomic_facts:
  - id: fact-computer-science-001
    statement: >-
      PHP (Rasmus Lerdorf, 1994, originally Personal Home Page Tools) is a server-side scripting language powering 75%+ of websites with known server-side languages (WordPress, Wikipedia, Facebook).
      PHP 8.x (2020+) brought JIT compilation, union types, match expressions, named arguments, and fibers.
    confidence: medium
    source_title: "PHP & MySQL: Server-side Web Development"
    source_url: https://www.wiley.com/en-us/PHP+%26+MySQL%3A+Server+side+Web+Development-p-9781119149224
  - id: fact-computer-science-002
    statement: "PHP 8.0: JIT compiler, union types, match expression, named arguments, attributes."
    confidence: medium
    source_title: PHP Manual
    source_url: https://www.php.net/docs.php
  - id: fact-computer-science-003
    statement: "PHP 8.1: enums, fibers (async), readonly properties."
    confidence: medium
    source_title: PHP Manual
    source_url: https://www.php.net/docs.php
  - id: fact-computer-science-004
    statement: "PHP 8.4 (2024): property hooks, asymmetric visibility."
    confidence: medium
    source_title: PHP Manual
    source_url: https://www.php.net/docs.php
  - id: fact-computer-science-005
    statement: "PHP-FPM: FastCGI Process Manager — handles requests efficiently."
    confidence: medium
    source_title: PHP Manual
    source_url: https://www.php.net/docs.php
---


## TL;DR

PHP (Rasmus Lerdorf, 1994, originally Personal Home Page Tools) is a server-side scripting language powering 75%+ of websites with known server-side languages (WordPress, Wikipedia, Facebook). PHP 8.x (2020+) brought JIT compilation, union types, match expressions, named arguments, and fibers.

## Core Explanation

PHP 8.0: JIT compiler, union types, match expression, named arguments, attributes. PHP 8.1: enums, fibers (async), readonly properties. PHP 8.4 (2024): property hooks, asymmetric visibility. Composer: dependency manager (`composer.json`). PHP-FPM: FastCGI Process Manager — handles requests efficiently. PSR standards ensure framework interoperability.

## Further Reading

- [PHP Manual](https://www.php.net/docs.php)
