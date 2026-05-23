---
id: "kb-2026-00187"



title: "SMTP Protocol"
schema_type: "TechArticle"



category: "computer-science"
language: "en"



confidence: "high"
last_verified: "2026-05-22"



generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"
    context: "See primary sources for competing interpretations"

completeness: 0.88
ai_citations:

primary_sources:
  - title: "ACM Digital Library"
    type: "repository"



    year: 2026
    url: "https://dl.acm.org/"


    institution: "ACM"
secondary_sources:
  - title: "ACM Digital Library"
    type: "repository"



    year: 2026
    url: "https://dl.acm.org/"


    institution: "ACM"
---

## TL;DR

SMTP (Simple Mail Transfer Protocol) is the standard for sending email across the Internet. It uses TCP port 25 (or 587 for submission). Email clients submit mail; MTAs relay it between servers. SMTP is text-based and uses `MAIL FROM`, `RCPT TO`, `DATA` commands.

## Core Explanation

SMTP extensions (ESMTP): STARTTLS (encryption), 8BITMIME (non-ASCII), SIZE (message size declaration). SPF, DKIM, DMARC authenticate email origin and content. IMAP/POP3 are for receiving (reading) email — SMTP is send-only. Gmail, Outlook, etc. use SMTP for outgoing, IMAP for incoming.

## Further Reading

- [undefined](undefined)
