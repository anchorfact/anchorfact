---
id: kb-2026-00086
title: Service Workers
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
  - id: fact-computer-science-service-workers-001
    statement: >-
      The Service Worker specification describes a worker that wakes to receive events and can serve as an event
      destination when no page context exists.
    source_title: Service Workers Nightly
    source_url: https://w3c.github.io/ServiceWorker/
    confidence: medium
  - id: fact-computer-science-service-workers-002
    statement: MDN describes service workers as proxy servers between web applications, the browser, and the network.
    source_title: Service Worker API - Web APIs | MDN
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
    confidence: medium
  - id: fact-computer-science-service-workers-003
    statement: >-
      MDN documents service-worker use cases including offline functionality, network request interception, push
      notifications, and background sync APIs.
    source_title: Service Worker API - Web APIs | MDN
    source_url: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
    confidence: medium
completeness: 0.86
known_gaps:
  - This public sample was manually narrowed to source-backed facts on 2026-05-28.
disputed_statements: []
primary_sources:
  - title: Service Workers Nightly
    type: standard
    year: 2026
    url: https://w3c.github.io/ServiceWorker/
    institution: W3C
  - title: Service Worker API - Web APIs | MDN
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
    institution: Mozilla
  - title: Using Service Workers - Web APIs | MDN
    type: documentation
    year: 2026
    url: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
    institution: Mozilla
secondary_sources: []
updated: "2026-05-28"
---

## TL;DR

Service workers are event-driven web workers that can mediate between a web app, the browser, and the network. This repair keeps to W3C and MDN statements about events, request interception, offline behavior, push, and background sync.

## Core Explanation

A service worker does not run like page JavaScript. It is registered for an origin, wakes for events such as fetch or push, and can use caches and custom responses to make web apps work better under network changes.

## Further Reading

- [Service Workers Nightly](https://w3c.github.io/ServiceWorker/)
- [Service Worker API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Using Service Workers - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
