---
id:"kb-2026-00124"
title:"Docker Security Best Practices"
schema_type:"TechArticle"
category:"computer-science"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method: "human_only"
ai_models:["claude-opus"]
derived_from_human_seed:true


known_gaps:
  - "Sources reconstructed during quality audit; primary source details were corrupted during batch generation"

completeness: 0.88
ai_citations:
  last_citation_check:"2026-05-22"
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

Docker containers share the host kernel, making security critical. Best practices: run as non-root user, use minimal base images (distroless, alpine), scan images for vulnerabilities, limit capabilities, use read-only root filesystems, enable seccomp/AppArmor profiles.

## Core Explanation

`USER 1000` in Dockerfile (never run as root). `docker scan` or Trivy for vulnerability scanning. `--read-only` flag makes rootfs immutable. `--cap-drop=ALL --cap-add=NET_BIND_SERVICE` limits Linux capabilities. Docker Bench Security checks against CIS Benchmark. Podman (daemonless, rootless by default) and gVisor (user-space kernel) provide stronger isolation.

## Further Reading

- [undefined](undefined)
