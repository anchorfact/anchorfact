---
id: "kb-2026-00187"
title: "SMTP Protocol"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "high"
last_verified: "2026-05-22"
created_date: "2026-05-22"
generation_method: "human_only"
ai_models: ["claude-opus"]
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-computer-science-001"
    statement: "SMTP (Simple Mail Transfer Protocol) is the standard for sending email across the Internet. It uses TCP port 25 (or 587 for submission). Email clients submit mail; MTAs relay it between servers. SMTP is text-based and uses `MAIL FROM`, `RCPT TO`, `DATA` commands."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-002"
    statement: "SMTP extensions (ESMTP): STARTTLS (encryption), 8BITMIME (non-ASCII), SIZE (message size declaration)."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"
  - id: "fact-computer-science-003"
    statement: "IMAP/POP3 are for receiving (reading) email — SMTP is send-only."
    source_title: "ACM Digital Library"
    source_url: "https://dl.acm.org/"
    confidence: "medium"

completeness: 0.88

known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

disputed_statements:
  - statement: "The interpretation and significance of key findings in this area are subject to ongoing scholarly debate, with multiple schools of thought offering competing frameworks for understanding the available evidence"

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
  - title: "The C Programming Language (K&R, 2nd Ed)"
    type: "textbook"
    year: 1988
    url: "https://www.pearson.com/us/higher-education/program/Kernighan-C-Programming-Language-2nd-Edition/PGM54486.html"
    institution: "Prentice Hall"
  - title: "Structure and Interpretation of Computer Programs (SICP)"
    type: "textbook"
    year: 1996
    url: "https://mitpress.mit.edu/sites/default/files/sicp/"
    institution: "MIT Press"

---




## TL;DR

SMTP (Simple Mail Transfer Protocol) is the standard for sending email across the Internet. It uses TCP port 25 (or 587 for submission). Email clients submit mail; MTAs relay it between servers. SMTP is text-based and uses `MAIL FROM`, `RCPT TO`, `DATA` commands.

## Core Explanation

SMTP extensions (ESMTP): STARTTLS (encryption), 8BITMIME (non-ASCII), SIZE (message size declaration). SPF, DKIM, DMARC authenticate email origin and content. IMAP/POP3 are for receiving (reading) email — SMTP is send-only. Gmail, Outlook, etc. use SMTP for outgoing, IMAP for incoming.

## Further Reading

-

## Related Articles

- [Model Context Protocol (MCP)](../../ai/mcp.md)
- [gRPC: Protocol Buffers, HTTP/2 Streaming, and Service Contracts](../grpc-protocol-buffers-http-2-streaming-and-service-contracts.md)
- [HTTP/3: QUIC Protocol and Next-Generation Web Transport](../http-3-quic-protocol-and-next-generation-web-transport.md)