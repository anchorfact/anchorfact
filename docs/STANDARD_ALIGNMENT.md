# Standard Alignment

This document maps the written quality standard to the code that enforces it.

| Standard Area | Code Path | Current Enforcement |
| --- | --- | --- |
| Stable routing | `src/lib/article-quality.js` | `canonicalSlugFor` derives unique public paths from `slug` or content path. |
| Duplicate routes | `src/quality-gate.js` | Duplicate canonical slugs fail the quality gate. |
| Source verification | `src/verify-sources.js` and `src/lib/article-quality.js` | Public entries require real verification data and at least one verified source. |
| Confidence formula | `src/lib/confidence.js` | Computes score and level; estimated high is capped; high needs coverage >= 50% and at least 2 verified sources. |
| Editorial confidence cap | `src/lib/confidence.js` | Frontmatter `confidence` can lower the computed level. |
| Public/draft split | `src/lib/article-quality.js` and `src/compile.js` | Public entrypoints include only `publicEligible` articles. |
| Hygiene checks | `src/lib/content-hygiene.js` | Flags mojibake, broken atomic facts, generic homepages, weak claim evidence, placeholders, and generic disputes. |
| Claims export | `src/lib/claims.js` | Exports only public article claims with evidence and caps claim confidence to article confidence. |
| Audit sampling | `scripts/audit-public-sample.js` | Builds a 20-article risk-weighted public sample from manifest, claims, verification, and content. |
| MCP/API contract | `src/mcp_index.py`, `src/mcp_server.py`, `src/mcp_http.py` | Reads public articles through `dist/manifest.json` instead of raw path scanning. |

## Intentional Gaps

- `low_verified_coverage` is still an audit marker, not a draft condition.
- Weak claim-source mapping is visible as an audit signal; it does not delete claims by itself.
- The quality gate blocks explicit `status: published` articles that cannot qualify, but ordinary draft content is allowed to remain.
- Full URL/source verification remains in GitHub Actions, not Cloudflare Pages.

## Next Calibration Rules

Use the public audit report before tightening further:

- If at least 5 of 20 sampled public articles fail source-title or claim-evidence review, consider making `low_verified_coverage` fatal.
- If at least 2 high-confidence samples fail review, require high confidence to have stronger source-title matching or full source verification.
- If claim-evidence failures are common, export only claims whose evidence maps exactly to article sources.
