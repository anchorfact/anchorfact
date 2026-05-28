---
id: kb-2026-00105
title: Fullscreen API
schema_type: TechArticle
category: computer-science
language: en
confidence: medium
last_verified: "2026-05-28"
created_date: "2026-05-22"
generation_method: human_only
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-computer-science-001
    statement: The Fullscreen API adds methods for presenting a specific element and its descendants in fullscreen mode.
    source_title: Fullscreen API
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
    confidence: medium
  - id: fact-computer-science-002
    statement: MDN documents requestFullscreen() as a method that asks the user agent to place an element into fullscreen mode.
    source_title: "Element: requestFullscreen() method"
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen
    confidence: medium
  - id: fact-computer-science-003
    statement: >-
      document.fullscreenElement returns the element currently displayed in fullscreen mode, or null when none is
      fullscreen.
    source_title: "Document: fullscreenElement property"
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/Document/fullscreenElement
    confidence: medium
completeness: 0.88
known_gaps:
  - Browser-specific behavior around permissions, focus, and keyboard handling
  - Interaction with embedded frames and permissions policy
disputed_statements: []
primary_sources:
  - title: Fullscreen API
    type: documentation
    year: 2026
    institution: MDN Web Docs
    url: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
  - title: "Element: requestFullscreen() method"
    type: documentation
    year: 2026
    institution: MDN Web Docs
    url: https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen
  - title: "Document: fullscreenElement property"
    type: documentation
    year: 2026
    institution: MDN Web Docs
    url: https://developer.mozilla.org/en-US/docs/Web/API/Document/fullscreenElement
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
The Fullscreen API lets web content request fullscreen display for a specific element and lets scripts detect the current fullscreen element. Browsers mediate this behavior to protect user control.

## Core Explanation
The common entry point is element.requestFullscreen(). Scripts can inspect document.fullscreenElement and listen for fullscreen changes. Exiting fullscreen is controlled by browser behavior and the API surface.

## Detailed Analysis
Fullscreen behavior depends on user activation, embedding, permissions policy, and browser UI rules. It is useful for video, games, maps, and focused tools, but it should not be treated as a way to hide browser controls permanently from the user.

## Further Reading
- Fullscreen Standard
- MDN requestFullscreen()
- MDN fullscreenElement

## Related Articles

- [API Gateway](../api-gateway.md)
- [Broadcast Channel API](../broadcast-channel-api.md)
- [Canvas API](../canvas-api.md)
