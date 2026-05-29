---
id: "kb-2026-00187"
title: "SMTP Protocol"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "medium"
last_verified: "2026-05-30"
created_date: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-smtp-1"
    statement: "RFC 5321 defines SMTP as an application-layer mail transfer protocol."
    source_title: "RFC 5321: Simple Mail Transfer Protocol"
    source_url: "https://www.rfc-editor.org/rfc/rfc5321.html"
    confidence: "medium"
  - id: "fact-smtp-2"
    statement: "RFC 5321 describes an SMTP mail transaction as beginning with MAIL, followed by one or more RCPT commands, and then DATA."
    source_title: "RFC 5321: Simple Mail Transfer Protocol"
    source_url: "https://www.rfc-editor.org/rfc/rfc5321.html"
    confidence: "medium"
  - id: "fact-smtp-3"
    statement: "RFC 6409 specifies Message Submission as a protocol profile for introducing mail into a mail transport or delivery system."
    source_title: "RFC 6409: Message Submission for Mail"
    source_url: "https://www.rfc-editor.org/rfc/rfc6409.html"
    confidence: "medium"

completeness: 0.8

known_gaps:
  - "This compact repair focuses on SMTP transfer and submission semantics, not anti-abuse systems such as SPF, DKIM, or DMARC."

disputed_statements: []

primary_sources:
  - title: "RFC 5321: Simple Mail Transfer Protocol"
    authors: ["Klensin, J."]
    type: "rfc"
    year: 2008
    url: "https://www.rfc-editor.org/rfc/rfc5321.html"
    institution: "IETF"
  - title: "RFC 6409: Message Submission for Mail"
    authors: ["Gellens, R.", "Klensin, J."]
    type: "rfc"
    year: 2011
    url: "https://www.rfc-editor.org/rfc/rfc6409.html"
    institution: "IETF"

secondary_sources: []
updated: "2026-05-30"
---

## TL;DR

SMTP is the standard application-layer protocol used to transfer email between mail systems. It is command-oriented: a sender identifies the envelope sender, one or more recipients, and then submits the message data.

## Core Explanation

SMTP separates message transfer from message access. SMTP moves mail into and between mail systems; protocols such as IMAP and POP are used for mailbox access.

Message submission is a related profile used when a mail user agent introduces outgoing mail into the transport system. Keeping transfer and submission separate helps explain why email clients may use a submission service even though SMTP remains the underlying mail protocol family.

## Further Reading

- [RFC 5321: Simple Mail Transfer Protocol](https://www.rfc-editor.org/rfc/rfc5321.html)
- [RFC 6409: Message Submission for Mail](https://www.rfc-editor.org/rfc/rfc6409.html)

## Related Articles

- [Hypertext Transfer Protocol (HTTP)](../http-protocol.md)
- [DNS: Domain Name System](../dns-domain-name-system.md)
- [TCP/IP Protocol Suite](../tcp-ip.md)
