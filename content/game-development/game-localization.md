---
id: kb-gd-016
title: Game Localization and Internationalization
schema_type: TechArticle
category: game-development
language: en
confidence: medium
last_verified: '2026-05-28'
created_date: '2026-04-28'
generation_method: ai_assisted
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-game-localization-1
    statement: >-
      W3C defines localization as adapting product or document content to meet language, cultural,
      and other requirements of a target locale.
    source_title: 'W3C: Localization vs. Internationalization'
    source_url: https://www.w3.org/International/questions/qa-i18n
    confidence: medium
  - id: fact-game-localization-2
    statement: >-
      Unity Localization supports string localization, asset localization, pseudo-localization, and
      import/export workflows.
    source_title: Unity Localization Package Manual
    source_url: https://docs.unity3d.com/Packages/com.unity.localization@1.5/manual/index.html
    confidence: medium
  - id: fact-game-localization-3
    statement: >-
      Unicode UTS #35 describes LDML, an XML format used in CLDR for exchanging structured locale
      data.
    source_title: 'Unicode UTS #35: Locale Data Markup Language'
    source_url: https://www.unicode.org/reports/tr35/
    confidence: medium
completeness: 0.82
known_gaps:
  - This compact article intentionally covers a small, source-mapped slice of a broader topic.
disputed_statements: []
primary_sources:
  - title: 'W3C: Localization vs. Internationalization'
    type: standard
    year: 2026
    url: https://www.w3.org/International/questions/qa-i18n
    institution: W3C Internationalization
  - title: Unity Localization Package Manual
    type: documentation
    year: 2026
    url: https://docs.unity3d.com/Packages/com.unity.localization@1.5/manual/index.html
    institution: Unity Technologies
  - title: 'Unicode UTS #35: Locale Data Markup Language'
    type: standard
    year: 2026
    url: https://www.unicode.org/reports/tr35/
    institution: Unicode Consortium
secondary_sources: []
updated: '2026-05-28'
---

## TL;DR

Game localization adapts text, assets, formatting, and cultural presentation for players in different locales.

## Core Explanation

Localization is broader than translation. Games also need locale-aware formatting, asset variants, pseudo-localization tests, and content structures that keep localizable material separate from code.

## Further Reading

- [W3C: Localization vs. Internationalization](https://www.w3.org/International/questions/qa-i18n)
- [Unity Localization Package Manual](https://docs.unity3d.com/Packages/com.unity.localization@1.5/manual/index.html)
- [Unicode UTS #35: Locale Data Markup Language](https://www.unicode.org/reports/tr35/)
