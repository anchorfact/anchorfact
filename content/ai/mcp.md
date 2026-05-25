---
id: kb-2026-00016
title: Model Context Protocol (MCP)
schema_type: TechArticle
category: ai
language: en
confidence: high
last_verified: '2026-05-25'
created_date: '2026-05-22'
generation_method: human_only
ai_models:
  - claude-opus
derived_from_human_seed: true
conflict_of_interest: none_declared
is_live_document: false
data_period: static
atomic_facts:
  - id: fact-ai-01
    statement: The Model Context Protocol is an open standard for connecting AI models to external data sources and tools, introduced by Anthropic on November 25, 2024
    source_title: Introducing the Model Context Protocol
    source_url: https://www.anthropic.com/news/model-context-protocol
    confidence: medium
  - id: fact-ai-001
    statement: A single MCP server can give AI access to Google Drive, GitHub, or a company's internal knowledge base.
    source_title: MCP GitHub Repository
    source_url: https://github.com/modelcontextprotocol/modelcontextprotocol
    confidence: medium
  - id: fact-ai-002
    statement: '- **MCP Clients**: AI applications (Claude Desktop, ChatGPT, VS Code, custom apps) that connect to MCP servers to retrieve context.'
    source_title: Introducing the Model Context Protocol
    source_url: https://www.anthropic.com/news/model-context-protocol
    confidence: medium
  - id: fact-ai-003
    statement: This architecture enables AI models to maintain context across multiple data sources without losing state—a critical capability for complex, multi-step agentic workflows.
    source_title: Introducing the Model Context Protocol
    source_url: https://www.anthropic.com/news/model-context-protocol
    confidence: medium
completeness: 0.92
known_gaps:
  - A2A (Agent-to-Agent) protocol is a separate Google initiative, not covered here
  - MCP specification version referenced is June 2025; the protocol is under active development by AAIF
disputed_statements:
  - statement: The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches
primary_sources:
  - title: Introducing the Model Context Protocol
    authors:
      - Anthropic
    type: announcement
    year: 2024
    url: https://www.anthropic.com/news/model-context-protocol
    institution: Anthropic
  - title: Model Context Protocol Specification (2025-06-18)
    type: standard
    year: 2025
    url: https://modelcontextprotocol.io/specification/2025-06-18
    institution: Linux Foundation / AAIF
  - title: MCP Standardization and Agent Protocol (2026-03-18 analysis)
    type: analysis
    year: 2026
    url: https://oct-rick-brick.com/zh/articles/2026-03-18-mcp-standardization-agent-protocol/
    institution: Oct Rick Brick
  - title: Model Context Protocol Specification (v2025-12)
    type: standard
    year: 2025
    url: https://modelcontextprotocol.io/specification/
    institution: Linux Foundation / AAIF
  - title: Model Context Protocol Specification (v1.0)
    type: standard
    year: 2025
    url: https://spec.modelcontextprotocol.io/
    institution: Anthropic / Linux Foundation
secondary_sources:
  - title: MCP GitHub Repository
    type: repository
    url: https://github.com/modelcontextprotocol/modelcontextprotocol
    institution: GitHub
---





## TL;DR

The Model Context Protocol (MCP) is an open standard for connecting AI models to external data sources and tools, introduced by Anthropic on November 25, 2024. It replaces the fragmented pattern of custom integrations with a unified client-server protocol. As of December 2025, MCP has been adopted by OpenAI, Google, and Microsoft; hosts over 10,000 public servers; sees 97 million SDK downloads per month; and has been donated to the Linux Foundation under the new Agentic AI Foundation (AAIF).

## Core Explanation

Before MCP, every AI application that needed to access external data—files, databases, APIs, business tools—required custom integration code. Each data source had its own API, authentication scheme, and data format. MCP replaces this with a standardized protocol:

- **MCP Servers**: Lightweight programs that expose data sources (files, databases, tools) through a standard interface. A single MCP server can give AI access to Google Drive, GitHub, or a company's internal knowledge base.
- **MCP Clients**: AI applications (Claude Desktop, ChatGPT, VS Code, custom apps) that connect to MCP servers to retrieve context. The client sends tool/resource requests; the server responds with structured data.

This architecture enables AI models to maintain context across multiple data sources without losing state—a critical capability for complex, multi-step agentic workflows.

## Detailed Analysis

### Adoption Timeline

| Date     | Milestone                                                                                     |
| -------- | --------------------------------------------------------------------------------------------- |
| Nov 2024 | Anthropic releases MCP; approximately 100 public servers available                            |
| Mar 2025 | **OpenAI** announces MCP support in ChatGPT and API                                           |
| Apr 2025 | **Google** integrates MCP into Gemini via AI Studio and Vertex AI                             |
| May 2025 | Public MCP servers exceed 4,000                                                               |
| Jun 2025 | Specification update: mandatory PKCE, Resource Indicators, no token passthrough               |
| Nov 2025 | Transport layer upgraded from SSE to Streamable HTTP; specification update                    |
| Dec 2025 | **Donated to Linux Foundation** under AAIF; 10,000+ public servers; 97M monthly SDK downloads |

### Linux Foundation Governance (AAIF)

In December 2025, Anthropic donated MCP to the Linux Foundation's newly established **Agentic AI Foundation (AAIF)** , modeled after CNCF (Kubernetes). This moved MCP from single-company control to community-governed, vendor-neutral stewardship.

**AAIF Joint Founders**: Anthropic (MCP), Block (goose AI Agent framework), OpenAI (AGENTS.md specification)

**AAIF Platinum Members** (governance participants): AWS, Anthropic, Block, Bloomberg, Cloudflare, Google, Microsoft, OpenAI

This is the same governance model that made Kubernetes the de facto standard for container orchestration.

### Protocol Architecture

MCP uses a **client-server model** over Streamable HTTP (originally SSE, upgraded November 2025):

- **Resources**: File-like data that can be read by clients (documents, database records, API responses)
- **Tools**: Functions that can be invoked by AI models (search, calculation, API calls, file operations)
- **Prompts**: Pre-written prompt templates for common tasks
- **Sampling**: Server-initiated requests to the LLM for completions

### Security (2025-06-18 Specification)

- **Mandatory PKCE**: Per OAuth 2.1, prevents authorization code interception and injection attacks
- **Resource Indicators** (RFC 8707): Tokens are scoped to specific MCP servers, preventing cross-server token misuse
- **No Token Passthrough**: MCP servers must reject tokens not explicitly issued for them

### Key Pre-Built Servers

Anthropic ships pre-built MCP servers for: Google Drive, Slack, GitHub, Git, PostgreSQL, Puppeteer (browser automation), Brave Search, and filesystem access. The open-source community has extended this to thousands of additional integrations.

### MCP vs. REST API

| Aspect         | Traditional REST API          | MCP                                   |
| -------------- | ----------------------------- | ------------------------------------- |
| Integration    | Custom code per data source   | Standardized protocol                 |
| Context        | Stateless, request-by-request | Stateful connections maintain context |
| Discovery      | Manual documentation          | Self-describing servers               |
| Authentication | Per-service implementation    | Standardized OAuth 2.1 flow           |
| Tool calls     | Separate API discovery        | Servers expose tools natively         |

### Competition and Ecosystem

Google introduced **A2A (Agent-to-Agent)** as a separate protocol for agent-to-agent communication, which complements rather than competes with MCP (MCP handles tool/data access; A2A handles agent coordination). The coexistence of both standards under Linux Foundation governance suggests a complementary ecosystem rather than a winner-take-all dynamic.

## Further Reading

- [MCP Specification](https://modelcontextprotocol.io/specification/2025-06-18): Official spec
- [Anthropic Announcement](https://www.anthropic.com/news/model-context-protocol): Original November 2024 release
- [MCP GitHub](https://github.com/modelcontextprotocol): Open-source SDK and servers
