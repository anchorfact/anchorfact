# AnchorFact Quality Standard

AnchorFact is a verified claim registry for LLM citations. The public surface should prefer fewer, reviewable entries over larger but weakly sourced output.

## Public Eligibility

An article can be public only when all of these are true:

- It has at least one primary source.
- A verification report exists for the article.
- At least one source is verified.
- Verification source counts match the article source list.
- The article has no placeholder text.
- The article has no severe hygiene issue such as encoding damage or mostly broken atomic facts.
- Confidence is based on `verified_sources`, not an estimated fallback.

Draft articles are still compiled, but they are excluded from the homepage public list, `llms.txt`, `sitemap.xml`, and `claims.json`. Draft HTML is marked `noindex`.

## Confidence

Confidence is computed from source tier, source count, verified source coverage, freshness, and decay factors.

- `estimated` entries cannot be `high`.
- `high` confidence requires verified coverage of at least 50%.
- `high` confidence requires at least 2 verified sources.
- The frontmatter `confidence` field is treated as an editorial upper bound.
- Claims exported from `claims.json` cannot have public confidence above their article confidence.

## Hygiene Flags

These flags should appear in `manifest.json` when detected:

- `encoding_mojibake`: damaged encoding or replacement characters.
- `broken_atomic_fact`: atomic fact text is truncated or contains leaked Markdown structure.
- `generic_source_homepage`: a source points to a homepage instead of a specific evidence page.
- `claim_evidence_weak`: an atomic fact has evidence, but the evidence does not map cleanly to article sources.
- `high_confidence_evidence_gap`: a raw high score was capped because high-confidence evidence requirements were not met.
- `low_verified_coverage`: verified source coverage is below 50%; this is currently an audit marker, not a draft condition.

## Claim Quality

Atomic facts are intended to be short, evidence-linked claims. A fact should have:

- `id`
- `statement`
- one of `source_ref`, `source_url`, or `source_doi`

Broken facts do not enter public `claims.json`. Weakly mapped evidence may remain visible with an audit marker so reviewers can repair it without silently deleting context.

## Manual Review Priorities

Review public content in this order:

1. Public articles with `broken_atomic_fact` or `encoding_mojibake`.
2. High-confidence articles with partial source verification.
3. Public articles with many capped claims.
4. Low-confidence public articles that still export many claims.
5. Drafts that are close to public eligibility.

The next rule-tightening pass should be based on audit evidence, not on bulk rewriting the corpus.
