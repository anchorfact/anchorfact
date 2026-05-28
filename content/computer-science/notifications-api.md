---
id: kb-2026-00102
title: Notifications API
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
    statement: The Notifications API lets web pages control the display of system notifications to users.
    source_title: Notifications API
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API
    confidence: medium
  - id: fact-computer-science-002
    statement: Notification.requestPermission() asks the user for permission to display notifications.
    source_title: "Notification: requestPermission() static method"
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission_static
    confidence: medium
  - id: fact-computer-science-003
    statement: ServiceWorkerRegistration.showNotification() displays a notification from a service worker registration.
    source_title: "ServiceWorkerRegistration: showNotification() method"
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
    confidence: medium
completeness: 0.88
known_gaps:
  - Browser-specific permission UI and anti-abuse restrictions
  - Interaction between Notifications API, Push API, and service workers
disputed_statements: []
primary_sources:
  - title: Notifications API
    type: documentation
    year: 2026
    institution: MDN Web Docs
    url: https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API
  - title: "Notification: requestPermission() static method"
    type: documentation
    year: 2026
    institution: MDN Web Docs
    url: https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission_static
  - title: "ServiceWorkerRegistration: showNotification() method"
    type: documentation
    year: 2026
    institution: MDN Web Docs
    url: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
secondary_sources: []
updated: "2026-05-28"
---
## TL;DR
The Notifications API lets web applications ask permission to display system notifications. It is often used together with service workers and the Push API, but local notification display and server push are separate concepts.

## Core Explanation
A site must request permission before showing notifications. Once allowed, a page or service worker can create notifications with a title and options such as body text or icons, subject to browser rules and user settings.

## Detailed Analysis
Notification permission is sensitive because abusive prompts and spam degrade user trust. Good implementations ask at a meaningful moment, explain value before prompting, and respect denial or quiet-permission behavior.

## Further Reading
- Notifications API standard
- MDN requestPermission()
- MDN showNotification()

## Related Articles

- [API Gateway](../api-gateway.md)
- [Broadcast Channel API](../broadcast-channel-api.md)
- [Canvas API](../canvas-api.md)
