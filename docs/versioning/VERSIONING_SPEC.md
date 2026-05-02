# VLN Documentation Versioning Specification

**Version:** 1.0.0  
**Status:** Active  
**Owner:** Fused Gaming DevOps  
**Last Updated:** 2026-04-28

---

## Overview

This specification defines the documentation versioning model for the VLN platform. It governs how documentation versions are tracked, published, maintained, and retired across all VLN documentation surfaces (`docs.vln.gg`, `design.vln.gg`).

---

## Versioning Model

VLN documentation follows **Semantic Versioning** (`MAJOR.MINOR.PATCH`) aligned with the platform release cycle.

| Segment | When Incremented |
|---------|-----------------|
| `MAJOR` | Breaking architectural changes, full platform redesign |
| `MINOR` | New features, new documentation sections, new service pages |
| `PATCH` | Bug fixes, typo corrections, minor content updates |

### Version Channels

| Channel | Branch | Description |
|---------|--------|-------------|
| `stable` | `main` | Production documentation — fully reviewed |
| `preview` | `integration/vln` | Pre-release staging — integration branch |
| `draft` | `feature/*` | Work-in-progress — feature branches |

---

## File Naming Conventions

### Document Slugs
- All lowercase, hyphen-separated
- No special characters except hyphens
- Max 64 characters

```
correct:   executive-summary.md
correct:   scope-of-work.md
incorrect: Executive_Summary.md
incorrect: scopeOfWork.md
```

### Directory Structure
```
docs-site/src/content/docs/
├── getting-started/        # Onboarding, setup
├── architecture/           # System design
├── design/                 # Design system
├── devops/                 # CI/CD, infrastructure
├── peralta/                # PeraltaCC proposal & engagement
└── [future categories]/
```

---

## Frontmatter Requirements

Every documentation page **must** include the following frontmatter:

```yaml
---
title: "Page Title"
description: "One-sentence description for SEO and navigation"
sidebar:
  order: 10         # Controls sort order within category
  badge:            # Optional status badge
    text: "New"
    variant: "tip"  # tip | note | caution | danger | success | default
lastUpdated: true
---
```

### Extended Versioning Frontmatter (optional)

For formally versioned documents such as proposals and reports:

```yaml
---
title: "Document Title"
description: "Description"
doc_version: "1.0.0"
doc_status: "final"          # draft | review | final | archived
doc_audience: "client"       # client | internal | public
doc_reviewed: "2026-04-28"
doc_reviewer: "VLN Team"
---
```

---

## Changelog Requirements

All changes must be recorded in `CHANGELOG.md` at the repository root. See [CHANGELOG_FORMAT.md](./CHANGELOG_FORMAT.md) for the full specification.

### Minimum entry requirements
1. Version number and release date
2. `### Added` section for new content
3. `### Changed` section for modifications
4. `### Fixed` section for corrections
5. `### Removed` section for deleted content

---

## Release Gates

Before any documentation release (minor or major), the following must pass:

```
[ ] pnpm build passes in docs-site/
[ ] All markdown frontmatter validates (required fields present)
[ ] No broken internal links
[ ] No pages without a title or description
[ ] Sidebar entries verified for all new pages
[ ] VERSION_MANIFEST.json updated with new version
[ ] CHANGELOG.md entry added
[ ] PR title follows conventional commit format: docs(vln): ...
```

---

## Lifecycle Policy

| Status | Support | Retention |
|--------|---------|-----------|
| `active` | Full updates | Indefinite |
| `maintained` | Security/critical fixes | 12 months |
| `eol` | None | Archived, read-only |

Documentation versions enter `eol` status when:
- Two subsequent `MINOR` versions have been released, OR
- The underlying platform version has been superseded by a major release

---

## Version Manifest

The authoritative record of all documentation versions lives at:

```
docs/versioning/VERSION_MANIFEST.json
```

This file must be updated as part of every release. The CI workflow `docs-versioning.yml` validates the manifest on every push to `main` and `integration/vln`.

---

## Automation

| Script | Purpose |
|--------|---------|
| `scripts/version-docs.sh bump minor` | Bump minor version, update manifest |
| `scripts/version-docs.sh bump patch` | Bump patch version |
| `scripts/version-docs.sh validate` | Validate all frontmatter |
| `scripts/version-docs.sh status` | Print current version and channel |

---

## Related Documents

- [RELEASE_PROCESS.md](./RELEASE_PROCESS.md) — Step-by-step release instructions
- [CHANGELOG_FORMAT.md](./CHANGELOG_FORMAT.md) — Changelog writing guide
- [VERSION_MANIFEST.json](./VERSION_MANIFEST.json) — Authoritative version registry
- [.github/workflows/docs-versioning.yml](../../.github/workflows/docs-versioning.yml) — CI automation
