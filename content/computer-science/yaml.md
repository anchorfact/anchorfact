---
id: "kb-2026-00079"


title: "YAML (YAML Ain't Markup Language)"
schema_type: "TechArticle"


category: "computer-science"
language: "en"


confidence: "high"
last_verified: "2026-05-22"


generation_method: "human_only"
derived_from_human_seed: true
primary_sources:
  - title: "YAML Specification v1.2.2"
    type: "standard"


    year: 2021
    url: "https://yaml.org/spec/1.2.2/"

    institution: "Yaml"

secondary_sources:
  - title: "MDN Web Docs — HTTP"
    type: "documentation"


    year: 2026
    url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"

    institution: "Mozilla"
  - title: "Pro Git (2nd Ed)"
    authors: ["Chacon", "Straub"]
    type: "book"


    year: 2014
    url: "https://git-scm.com/book/en/v2"

    institution: "Apress"
atomic_facts:
  - id: fact-computer-science-01
    statement: YAML is a human-readable data serialization format created by Clark Evans in 2001
    source_title: YAML Specification v1.2.2
    source_url: https://yaml.org/spec/1.2.2/
    confidence: medium
  - id: fact-computer-science-02
    statement: It uses indentation for structure and is the dominant configuration format for DevOps tools
    source_title: YAML Specification v1.2.2
    source_url: https://yaml.org/spec/1.2.2/
    confidence: medium
  
completeness: 0.80
disputed_statements:
  - statement: "The debate between AI safety accelerationists and decelerationists remains unresolved; there is no scientific consensus on optimal AI governance approaches"
    confidence: "medium"

known_gaps:
  - "This field is under active research and rapid development; some conclusions may evolve with new evidence or technological advances"
  - "Certain sub-topics are covered at a general level; specialized edge cases and nuanced applications may not be fully addressed"
ai_citations: {last_citation_check: "2026-05-22"}
---

## TL;DR

YAML is a human-readable data serialization format created by Clark Evans in 2001. It uses indentation for structure (like Python) and is the dominant configuration format for DevOps tools (Docker Compose, Kubernetes, Ansible, GitHub Actions, CI/CD pipelines). YAML v1.2.2 (2021) is the current specification.

## Key Characteristics

- **Indentation-based**: No braces or brackets — whitespace defines structure
- **Three basic types**: Scalars (strings, numbers, booleans), sequences (`- item`), mappings (`key: value`)
- **Comments**: `#` for inline comments (unlike JSON)
- **Anchors & Aliases**: `&anchor` / `*alias` for reusing values
- **Multi-document**: `---` separates documents, `...` terminates

## Gotchas

- Norway problem: `no` parses as `false` in YAML 1.1; fixed in 1.2
- Indentation must use spaces, not tabs
- Complex YAML degrades readability quickly

## Further Reading

- [YAML Spec v1.2.2](https://yaml.org/spec/1.2.2/): Current specification
- [yaml.org](https://yaml.org/): Official site
