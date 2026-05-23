---
id: "kb-2026-00018"


title: "AI Agents (2025-2026)"
schema_type: "TechArticle"


category: "ai"
language: "en"


confidence: "high"
confidence_rationale: "Based on the comprehensive 2025 Agent Technology Report (zaobi.tech) and the State of AI Agents Report (rivista.ai), cross-validated with arXiv paper 2601.01743"


last_verified: "2026-05-22"
generation_method: "human_only"


ai_models: ["claude-opus"]
derived_from_human_seed: true
primary_sources:
  - title: "2025-2026 Agent Technology Progress Report"
    type: "report"


    year: 2026
    url: "https://zaobi.tech/pages/ai-tech/agent-tech-report-2025/index.html"

    institution: "Zaobi Tech"
  - title: "AI Agent Systems: Architectures, Applications, and Evaluation (arXiv 2601.01743)"
    authors: ["Multiple"]
    type: "academic_paper"


    year: 2026
    url: "https://arxiv.org/html/2601.01743v1"

    institution: "arXiv"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"


    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"

    institution: "Mozilla"
atomic_facts:
  - id: fact-ai-01
    statement: >-
      2025 was widely called the "Year of the Agent" across the AI industry, marking a transition from passive
      conversational AI to autonomous systems capable of multi-step reasoning, tool use, and independent action
    source_title: "AI Agent Systems: Architectures, Applications, and Evaluation (arXiv 2601.01743)"

    source_url: https://arxiv.org/html/2601.01743v1
    confidence: high
  - id: fact-ai-02
    statement: >-
      By 2026, AI agents are deployed across software engineering , general task automation , and enterprise workflow
      automation
    source_title: 2025-2026 Agent Technology Progress Report
    source_url: https://zaobi.tech/pages/ai-tech/agent-tech-report-2025/index.html
    confidence: medium
  - id: fact-ai-03
    statement: >-
      An AI agent is an autonomous system that combines a foundation model with reasoning, planning, memory, and tool-use
      capabilities to accomplish goals without continuous human supervision
    source_title: "AI Agent Systems: Architectures, Applications, and Evaluation (arXiv 2601.01743)"

    source_url: https://arxiv.org/html/2601.01743v1
    confidence: high
  
completeness: 0.88
disputed_statements:
  - statement: "The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches"
    confidence: "medium"

known_gaps:
  - "Market size projections vary by analyst; specific figures not included pending Gartner/McKinsey consensus data"
related_entities:
  - "entity:large-language-models"
  - "entity:model-context-protocol"
ai_citations:
---

## TL;DR

2025 was widely called the "Year of the Agent" across the AI industry, marking a transition from passive conversational AI to autonomous systems capable of multi-step reasoning, tool use, and independent action. Key developments included the emergence of MCP as an industry-standard integration protocol (December 2025, donated to the Linux Foundation's AAIF), the rise of Computer Use agents that directly manipulate desktop/browser interfaces, and the maturation of multi-agent orchestration frameworks. By 2026, AI agents are deployed across software engineering (Devin, $10.2B valuation), general task automation (Manus, acquired by Meta), and enterprise workflow automation (n8n, Dify, Coze).

## Core Explanation

An AI agent is an autonomous system that combines a foundation model (LLM) with reasoning, planning, memory, and tool-use capabilities to accomplish goals without continuous human supervision. Unlike chatbots, agents maintain state across multiple steps, decompose complex goals into sub-tasks, execute actions through tools and APIs, and evaluate outcomes to adapt their approach.

The standard agent architecture includes:

1. **Perception**: Multi-modal input processing (text, vision, audio)
2. **Reasoning + Planning**: Chain-of-thought, tree-of-thought, multi-step plan decomposition
3. **Memory**: Short-term (conversation context) and long-term (vector stores, knowledge graphs)
4. **Tool Use**: API calls, database queries, code execution, browser/desktop manipulation
5. **Action + Feedback**: Execution of plans, result evaluation, iterative refinement

## Detailed Analysis

### 2025 Timeline: From Labs to Production

| Date     | Milestone                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------------- |
| Jan 2025 | **OpenAI Operator** released — browser automation agent using CUA (Computer-Using Agent) model           |
| Mar 2025 | **Manus** launched — described as "the GPT moment for Agents"; later acquired by Meta                    |
| Apr 2025 | **Devin 2.0** — AI software engineer; Sep 2025 valuation reaches $10.2B (up from $4B in Mar)             |
| May 2025 | **Claude Computer Use** in production — pixel-level screen understanding and manipulation                |
| Jul 2025 | **LangGraph 1.0** released (Oct 2025) — production-grade stateful Agent orchestration framework          |
| Sep 2025 | Tool Calling evolution: from structured JSON to **Freeform** — models generate Python/SQL directly       |
| Oct 2025 | **AutoGen** merges with Microsoft Semantic Kernel — event-driven, cross-language agent framework         |
| Dec 2025 | **MCP donated to Linux Foundation AAIF** — becomes de facto industry standard for Agent-tool integration |
| Jan 2026 | **Clawdbot/Moltbot** — fully local agent, 29,000+ GitHub stars in 24 hours                               |

### Key Architectural Components

| Component                     | Description                                                                                                                     | Representative Systems                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Tool Calling**              | LLMs invoke external functions/APIs. Evolved from JSON structured output to Freeform code generation (Python/SQL) in late 2025. | GPT-5 Freeform, Claude Advanced Tool Use, Gemini Multi-tool    |
| **MCP Protocol**              | The "USB-C for AI" — standardized client-server protocol for AI-tool integration. Solves the N×M integration problem.           | Anthropic (origin), OpenAI, Google, Microsoft (adopters)       |
| **Human-in-the-Loop**         | Global or node-level human approval/intervention checkpoints. Essential for enterprise deployment.                              | LangGraph, CrewAI, n8n approval nodes                          |
| **Memory**                    | Short-term conversation context + long-term persistent storage (vector DBs, knowledge graphs).                                  | LangGraph memory management, Manus/Devin long-task persistence |
| **Multi-Agent Orchestration** | Supervisor pattern, Swarm intelligence, role-based collaboration among specialized sub-agents.                                  | LangGraph Swarm/Supervisor, CrewAI roles, AutoGen multi-agent  |
| **Computer Use**              | Vision-model-based direct manipulation of desktop/browser UIs.                                                                  | OpenAI CUA, Claude Computer Use, Google Mariner                |
| **Agent Plan**                | Autonomous decomposition of high-level goals into executable multi-step plans.                                                  | Coze Agent Plan, Manus/Devin task decomposition                |

### Major Platforms

**Low-Code/No-Code Builders**: n8n (open-source workflow automation with native MCP and HITL), Dify (500+ plugins, visual orchestration), Coze 2.0 (ByteDance, Agent Skills Store)

**Open-Source Frameworks**: LangGraph 1.0 (LangChain ecosystem, stateful orchestration), AutoGen (Microsoft, event-driven, cross-language), CrewAI 1.1.0 (role-based multi-agent collaboration)

**Production Agent Products**: OpenAI Operator, Claude Code, Devin 2.0 ($10.2B valuation), Manus (Meta), Google Project Mariner, Clawdbot/Moltbot

### Enterprise Adoption

According to the 2026 State of AI Agents Report (Rivista.ai, December 2025), 81% of enterprises plan to deploy agents for complex use cases in 2026, with 39% targeting multi-step process automation and 29% deploying cross-functional agent projects. Multi-agent system inquiries surged 1,445% in 2025 (Fungies.io, 2026).

## Further Reading

- [2025-2026 Agent Technology Report](https://zaobi.tech/pages/ai-tech/agent-tech-report-2025/index.html): Comprehensive Chinese-language analysis
- [AI Agent Systems Survey (arXiv 2601.01743)](https://arxiv.org/html/2601.01743v1): Academic survey of architectures and evaluation
- [MCP Specification](https://modelcontextprotocol.io/): Standard agent-tool integration protocol
