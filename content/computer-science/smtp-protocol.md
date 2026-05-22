---
id:"kb-2026-00187"
title:"SMTP Protocol"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"undefined"
    type:"undefined"
    url:"undefined"
    institution:"IETF"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

SMTP (Simple Mail Transfer Protocol) is the standard for sending email across the Internet. It uses TCP port 25 (or 587 for submission). Email clients submit mail; MTAs relay it between servers. SMTP is text-based and uses `MAIL FROM`, `RCPT TO`, `DATA` commands.

## Core Explanation

SMTP extensions (ESMTP): STARTTLS (encryption), 8BITMIME (non-ASCII), SIZE (message size declaration). SPF, DKIM, DMARC authenticate email origin and content. IMAP/POP3 are for receiving (reading) email — SMTP is send-only. Gmail, Outlook, etc. use SMTP for outgoing, IMAP for incoming.

## Further Reading

- [undefined](undefined)
