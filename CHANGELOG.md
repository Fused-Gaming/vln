# Changelog

All notable changes to VLN (Vulnerability Lab Network) will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned

- Homepage with hero section and service overview
- Services landing pages for each offering
- Contact and booking interface
- Audit request form
- Technical advisory index
- Client portal (authentication)
- Report delivery system
- Stripe payment integration

---

## [0.1.0] - 2025-11-18

### Added

- **Documentation Framework**
  - Comprehensive README.md with project overview
  - SECURITY.md with vulnerability disclosure policy
  - CONTRIBUTING.md with contribution guidelines
  - CODE_OF_CONDUCT.md for community standards
  - CHANGELOG.md for version tracking
  - VERSION file for semantic versioning

- **Brand Guidelines**
  - BRANDING.md with complete VLN design system
  - Color palette and design tokens
  - Typography specifications
  - Component guidelines
  - Logo usage rules

- **Development Guidelines**
  - CLAUDE.md for AI-assisted development
  - Git workflow documentation
  - Code standards and conventions
  - Architecture overview
  - Tech stack specifications

- **Repository Setup**
  - Apache 2.0 License
  - Git repository initialization
  - Branch structure (integration/vln)
  - Initial commit structure

### Changed

- N/A (Initial release)

### Deprecated

- N/A (Initial release)

### Removed

- N/A (Initial release)

### Fixed

- N/A (Initial release)

### Security

- Established security policy and responsible disclosure process
- Configured security contact: security@vln.gg

---

## [0.0.1] - 2025-11-18

### Added

- Initial repository setup
- LICENSE file (Apache 2.0)
- Basic .gitignore configuration

---

## Version History Summary

| Version | Date | Description |
|---------|------|-------------|
| 0.1.0 | 2025-11-18 | Documentation and branding framework |
| 0.0.1 | 2025-11-18 | Initial repository setup |

---

## Changelog Categories

We use the following categories for organizing changes:

- **Added** — New features or capabilities
- **Changed** — Changes to existing functionality
- **Deprecated** — Features that will be removed in future versions
- **Removed** — Features that have been removed
- **Fixed** — Bug fixes
- **Security** — Security vulnerability fixes and security enhancements

---

## Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat` — New feature (triggers MINOR version bump)
- `fix` — Bug fix (triggers PATCH version bump)
- `docs` — Documentation changes
- `style` — Code style changes (formatting, semicolons, etc.)
- `refactor` — Code refactoring without behavior changes
- `perf` — Performance improvements
- `test` — Adding or updating tests
- `chore` — Build process or tooling changes
- `ci` — CI/CD configuration changes
- `revert` — Reverting previous commits

### Breaking Changes

Breaking changes trigger a MAJOR version bump and should include:

```
feat(api)!: redesign authentication flow

BREAKING CHANGE: Authentication endpoints now require OAuth 2.0
```

---

## Release Process

### Pre-release (0.x.x)

During MVP development:
1. Changes merged to `integration/vln`
2. Version bumped in VERSION file
3. CHANGELOG.md updated
4. Tagged with version number
5. Deployed to staging for testing

### Stable Release (1.0.0+)

Post-MVP workflow:
1. Feature freeze on `integration/vln`
2. Testing and QA phase
3. Release notes drafted
4. Version bump and tag
5. Merge to `main`
6. Deploy to production
7. GitHub release created with notes

---

## Semantic Versioning

VLN follows [Semantic Versioning](https://semver.org/):

**MAJOR.MINOR.PATCH**

- **MAJOR** — Incompatible API changes or breaking changes
- **MINOR** — New features (backwards compatible)
- **PATCH** — Bug fixes (backwards compatible)

### Pre-release Versions

- **0.x.x** — MVP and pre-stable releases
- **x.x.x-alpha.N** — Alpha releases (internal testing)
- **x.x.x-beta.N** — Beta releases (external testing)
- **x.x.x-rc.N** — Release candidates

---

## Migration Guides

When breaking changes are introduced, migration guides will be provided:

- Linked from the CHANGELOG entry
- Located in `docs/migrations/`
- Include before/after code examples
- List all required changes

---

## Security Updates

Security-related changes are marked with **[Security]** tags and follow responsible disclosure:

```markdown
### Security

- [CVE-XXXX-XXXXX] Fixed authentication bypass vulnerability
- Updated dependencies to address known vulnerabilities
```

Critical security updates may be released out-of-band as hotfix releases.

---

## Deprecation Policy

When features are deprecated:

1. **Announcement** — Deprecation notice in CHANGELOG
2. **Warning Period** — Minimum 90 days before removal
3. **Migration Path** — Alternative approach documented
4. **Removal** — Feature removed in next major version

Example:

```markdown
### Deprecated

- [v1.2.0] Legacy API endpoints (will be removed in v2.0.0)
  - Use new GraphQL API instead
  - Migration guide: docs/migrations/api-v1-to-v2.md
```

---

## Unreleased Changes

Track upcoming changes in the `[Unreleased]` section:

- Merged but not yet released
- Helps prepare release notes
- Moved to versioned section on release

---

## Links

- [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
- [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Note:** This changelog is automatically updated with each release. For detailed commit history, see [GitHub commit log](https://github.com/Fused-Gaming/vln/commits).
