# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in AnchorFact, please **do not** open a public issue.

Instead, email the maintainer at:

**security@anchorfact.org**

We take all security reports seriously. You can expect:

- **Acknowledgment** within 48 hours
- **Resolution** within 14 days (for confirmed vulnerabilities)
- **Public disclosure** after the fix is deployed

## Scope

Security vulnerabilities may include:

- Content injection or manipulation
- API abuse or unauthorized access to editorial functions
- Source link poisoning (malicious URLs in citations)
- MCP Server vulnerabilities

## Best Practices

As a static content site:

- No user authentication or database (in Phase 0-1)
- All content is served statically via Cloudflare Pages
- Editorial access is limited to the maintainer
- All external links in citations are validated before merge

## Dependencies

Dependencies are intentionally minimal:

- **Node.js** (`src/compile.js`): Zero external dependencies
- **Python** (`src/mcp_server.py`): Only `mcp` package
- **Cloudflare Pages**: No server-side code

We monitor dependency security advisories and update promptly.
