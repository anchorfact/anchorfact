# English Content (en)

This directory is the canonical location for English-language articles.

## Migration Note

Articles currently reside in domain-level directories (`content/ai/`, `content/arts/`, etc.)
directly under `content/`. As part of Phase 2 i18n rollout, these will be moved to
`content/en/{domain}/` once tooling supports the new path structure.

The validation pipeline (`quality-score.cjs`, `validate-content.cjs`) already handles
both legacy (flat) and new (lang-nested) layouts transparently.
