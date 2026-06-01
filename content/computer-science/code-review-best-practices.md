---
id: "kb-2026-00235"
title: "Code Review Best Practices"
schema_type: "TechArticle"
category: "computer-science"
language: "en"
confidence: "medium"
last_verified: "2026-06-01"
created_date: "2026-05-22"
updated: "2026-06-01"
generation_method: "human_only"
derived_from_human_seed: true
conflict_of_interest: "none_declared"
is_live_document: false
data_period: "static"

atomic_facts:
  - id: "fact-code-review-001"
    statement: "Google's engineering practices say reviewers should generally favor approval once a change definitely improves the overall code health of the system, even if it is not perfect."
    source_title: "The Standard of Code Review"
    source_url: "https://google.github.io/eng-practices/review/reviewer/standard.html"
    confidence: "medium"
  - id: "fact-code-review-002"
    statement: "Google's code review guidance lists design, functionality, complexity, tests, naming, comments, style, consistency, documentation, and every line as review concerns."
    source_title: "What to look for in a code review"
    source_url: "https://google.github.io/eng-practices/review/reviewer/looking-for.html"
    confidence: "medium"
  - id: "fact-code-review-003"
    statement: "Google's code review speed guidance says one business day is the maximum time it should take to respond to a code review request."
    source_title: "Speed of Code Reviews"
    source_url: "https://google.github.io/eng-practices/review/reviewer/speed.html"
    confidence: "medium"
  - id: "fact-code-review-004"
    statement: "Google's comment-writing guidance summarizes code review comments with the instruction to be kind."
    source_title: "How to write code review comments"
    source_url: "https://google.github.io/eng-practices/review/reviewer/comments.html"
    confidence: "medium"
  - id: "fact-code-review-005"
    statement: "GitHub documentation says a pull request reviewer can submit comments, approve the changes, or request changes."
    source_title: "Reviewing proposed changes in a pull request"
    source_url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request"
    confidence: "medium"

completeness: 0.84
known_gaps:
  - "This article covers review discipline and workflow, not empirical defect-density studies or organization-specific review metrics."
  - "Tool-specific policies can differ across GitHub, Gerrit, GitLab, and internal systems."
disputed_statements: []

primary_sources:
  - title: "The Standard of Code Review"
    type: "professional_resource"
    year: 2026
    url: "https://google.github.io/eng-practices/review/reviewer/standard.html"
    institution: "Google"
  - title: "What to look for in a code review"
    type: "professional_resource"
    year: 2026
    url: "https://google.github.io/eng-practices/review/reviewer/looking-for.html"
    institution: "Google"
  - title: "Speed of Code Reviews"
    type: "professional_resource"
    year: 2026
    url: "https://google.github.io/eng-practices/review/reviewer/speed.html"
    institution: "Google"
  - title: "How to write code review comments"
    type: "professional_resource"
    year: 2026
    url: "https://google.github.io/eng-practices/review/reviewer/comments.html"
    institution: "Google"
  - title: "Reviewing proposed changes in a pull request"
    type: "documentation"
    year: 2026
    url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request"
    institution: "GitHub"
secondary_sources: []
---

## TL;DR

Good code review protects code health while keeping useful work moving. Reviewers should check design, behavior, complexity, tests, readability, and documentation, then leave actionable comments that explain the reason for any requested change.

## Core Explanation

The review target is not perfection. The practical standard is whether the change improves the system and does not add unnecessary risk. For AI coding agents, this matters because the reviewer must verify the patch against the project contract rather than trust a plausible explanation from the agent.

Use a compact review order:

- read the goal and affected modules;
- run or inspect relevant tests;
- check design fit before line-level style;
- verify error handling, data boundaries, and migration effects;
- ask for simpler code when complexity is speculative;
- separate blocking issues from optional improvements.

## Source-Mapped Facts

- Google's engineering practices say reviewers should generally favor approval once a change definitely improves the overall code health of the system, even if it is not perfect. ([source](https://google.github.io/eng-practices/review/reviewer/standard.html))
- Google's code review guidance lists design, functionality, complexity, tests, naming, comments, style, consistency, documentation, and every line as review concerns. ([source](https://google.github.io/eng-practices/review/reviewer/looking-for.html))
- Google's code review speed guidance says one business day is the maximum time it should take to respond to a code review request. ([source](https://google.github.io/eng-practices/review/reviewer/speed.html))
- Google's comment-writing guidance summarizes code review comments with the instruction to be kind. ([source](https://google.github.io/eng-practices/review/reviewer/comments.html))
- GitHub documentation says a pull request reviewer can submit comments, approve the changes, or request changes. ([source](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request))

## AI Agent Review Notes

When reviewing agent-generated patches, put extra weight on behavioral contracts. Confirm that the patch did not change unrelated files, generated artifacts, secrets, or deployment configuration. Require source citations when the patch depends on external API behavior, and prefer narrow follow-up patches over broad speculative cleanup.

## Further Reading

- [The Standard of Code Review](https://google.github.io/eng-practices/review/reviewer/standard.html)
- [What to look for in a code review](https://google.github.io/eng-practices/review/reviewer/looking-for.html)
- [Speed of Code Reviews](https://google.github.io/eng-practices/review/reviewer/speed.html)
- [How to write code review comments](https://google.github.io/eng-practices/review/reviewer/comments.html)
- [Reviewing proposed changes in a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request)

## Related Articles

- [AI for Static Analysis: Automated Bug Detection, Code Review, and Vulnerability Scanning](../../ai/ai-static-analysis.md)
- [Docker Security Best Practices](../docker-security-best-practices.md)
- [OAuth 2.0: Authorization Framework and Security Best Practices](../oauth-2-0-authorization-framework-and-security-best-practices.md)
