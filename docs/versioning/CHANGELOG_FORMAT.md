# Changelog Format Guide

**Version:** 1.0.0  
**Status:** Active  
**Last Updated:** 2026-04-28

---

## Overview

VLN uses [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format with Semantic Versioning. Every release must have a corresponding entry in `CHANGELOG.md` at the repository root.

---

## Entry Format

```markdown
## [MAJOR.MINOR.PATCH] - YYYY-MM-DD

### Added
- **Feature Name** — Description of what was added and why

### Changed
- **Component Name** — What changed and the reason

### Fixed
- **Bug Description** — What was broken and how it was resolved

### Removed
- **Item** — What was removed and migration path if applicable

### Security
- **CVE or Advisory** — Description and severity
```

---

## Section Definitions

| Section | Use When |
|---------|----------|
| `Added` | New pages, sections, features, or documents |
| `Changed` | Updates to existing content, restructuring |
| `Fixed` | Corrections to errors, broken links, typos |
| `Removed` | Deleted pages, deprecated content |
| `Security` | Security-relevant changes, dependency upgrades |
| `Deprecated` | Content or APIs that will be removed in future |

---

## Rules

1. **Most recent version at the top** — Newest entries appear first
2. **One entry per version** — Never split a version across multiple entries
3. **Unreleased section** — Work-in-progress goes under `## [Unreleased]`
4. **Dates in ISO 8601** — Format: `YYYY-MM-DD`
5. **Bullet items are complete sentences** — Start with capital letter, no trailing period
6. **Bold the subject** — `**Feature Name** — description`
7. **No "we" or "I"** — Write in third person / passive voice

---

## Version References

At the bottom of `CHANGELOG.md`, maintain a reference block:

```markdown
[Unreleased]: https://github.com/Fused-Gaming/vln/compare/v0.12.0...HEAD
[0.12.0]: https://github.com/Fused-Gaming/vln/compare/v0.11.0...v0.12.0
[0.11.0]: https://github.com/Fused-Gaming/vln/compare/v0.10.0...v0.11.0
```

---

## Documentation-Specific Additions

For documentation-only releases, add a `### Documentation` subsection:

```markdown
### Documentation
- **PeraltaCC Engagement** — Added full proposal package to docs-site at /peralta
- **Versioning System** — Introduced VERSION_MANIFEST.json and versioning spec
```

---

## Commit Message Alignment

Changelog entries should match the conventional commit prefix:

| Commit Prefix | Changelog Section |
|---------------|-----------------|
| `feat(...):`  | Added |
| `fix(...):`   | Fixed |
| `refactor(...)` | Changed |
| `docs(...):`  | Documentation |
| `chore(...):`  | (omit unless significant) |
| `security:` | Security |
