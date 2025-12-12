# Changelog

All notable changes to the VLN project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Client dashboard for audit report viewing
- Payment integration (Stripe/crypto)
- Blog content management system
- Real-time status page
- Email notification system

---

## [0.10.0] - 2025-12-12

### Added
- **Referrals page** with comprehensive referral program details and legal terms
- **Partner logos** including Gamba, Stake, FullHouse, Razed, and Thrill
- **VLN report templates** with branded HTML layouts
- **VLN Hero image** for Open Graph and marketing materials
- **Getting Started documentation** for new developers
- **Design System Components documentation** for component library
- **Discord webhooks documentation** for DevOps integration

### Changed
- **CI/CD notifications migrated from Slack to Discord** webhooks
- **Pricing page expanded** with additional legal terms and referral program information
- **FAQ page enhanced** with additional questions and improved organization
- **Chat widget improvements** with better error handling and state management
- **Header navigation** redesigned with integrated chat toggle
- **Sitemap updated** to include new referrals page
- **GitHub workflows** now use Discord for all notifications with secret management

### Removed
- **ChatButton component** (functionality moved to header navigation)
- **Slack webhook references** replaced with Discord webhooks

### Security
- **Discord webhook URLs** now use GitHub secrets instead of hardcoded values
- **CSP updated** to allow Zammad chat widget integration

### DevOps
- **Workflow improvements** with better error handling and conditional checks
- **PR body templates** updated for better documentation
- **Brand documentation** enhanced with partner logos and assets

---

## [0.9.0] - 2025-01-24

### Added
- **Complete MVP website launch**
- Enhanced README with badges, progress bars, and comprehensive documentation
- CHANGELOG.md for version tracking (this file)
- ROADMAP.md with feature timeline and milestones
- Security architecture documentation
- Feature tracking system with completion metrics
- Comprehensive UX flow documentation with ASCII mockups and mermaid diagrams
- Design system component library documentation
- Getting started guide for developers

### Changed
- Updated copyright year to 2025
- Enhanced footer with social media icons and reorganized navigation
- Improved responsive design across all breakpoints
- Optimized IC board animation for better performance

### Fixed
- ESLint errors: unescaped entities in JSX (27 files)
- Unused variable warnings in animation context
- Mobile menu z-index issues
- Stat card and testimonial height inconsistencies

---

## [0.8.0] - 2025-01-23

### Added
- Custom 404 error page with VLN branding
- Scroll-to-top floating button component
- Cookie consent banner (GDPR compliant)
- Cloudflare Web Analytics integration
- CORS middleware with strict origin enforcement
- Comprehensive security headers (HSTS, CSP, XSS protection)

### Changed
- Updated pnpm lockfile to compatible version
- Cleaned up 65 outdated npm packages
- Improved build performance (32.6s compilation)

### Security
- Implemented Content Security Policy (CSP)
- Added HSTS with 2-year max-age
- Configured X-Frame-Options, X-Content-Type-Options
- Set up strict CORS policy for production

---

## [0.7.0] - 2025-01-22

### Added
- **All core pages:**
  - Homepage with hero, stats, services, testimonials
  - Services page with 5 service offerings
  - Pricing page with audit tiers and retainer packages
  - FAQ page with 25+ questions in 6 categories
  - About page with mission, story, values, timeline
  - Contact page with form and alternative contact methods
  - Blog placeholder page
  - Get Help page with support options
  - Privacy Policy (GDPR compliant)
  - Terms of Service
  - Refund Policy

### Changed
- Migrated all pages to Next.js 15 App Router
- Implemented responsive design for mobile, tablet, desktop
- Added comprehensive SEO metadata and Open Graph tags

---

## [0.6.0] - 2025-01-21

### Added
- **VLN Brand Components:**
  - IC Board Background with canvas-based animation
  - Stat Card component with consistent sizing
  - Testimonial Card with equal heights
- **Animation System:**
  - CSSFade component with directional support
  - StaggerFade for list animations
  - Animation context for global state management

### Changed
- Replaced heavy Framer Motion with lightweight CSS animations
- Optimized animations for GPU acceleration
- Reduced JavaScript bundle size by 45KB

### Performance
- Achieved Lighthouse Performance score of 92
- LCP reduced to 1.8s (target < 2.5s)
- CLS improved to 0.02 (target < 0.1)

---

## [0.5.0] - 2025-01-20

### Added
- **Design System Implementation:**
  - VLN color palette (sage, blue-gray, amber, purple)
  - Typography system (Inter + JetBrains Mono)
  - Responsive breakpoints (sm, md, lg, xl, 2xl)
  - Glow effect utilities
  - Border radius tokens
- Header component with responsive navigation
- Footer component with 5-column layout
- Button component with variants and sizes

### Changed
- Migrated from CSS modules to Tailwind CSS
- Implemented mobile-first responsive design
- Added WCAG AA compliant color contrast

---

## [0.4.0] - 2025-01-19

### Added
- Next.js 15.5.6 with App Router configuration
- TypeScript 5.x strict mode
- Tailwind CSS 3.4+ with custom configuration
- ESLint configuration with Next.js rules
- Git hooks for pre-commit checks

### Changed
- Migrated from Pages Router to App Router
- Updated project structure for new architecture
- Configured pnpm as primary package manager

---

## [0.3.0] - 2025-01-18

### Added
- Fused Gaming DevOps integration
- Integration-first branching strategy
- Conventional Commits workflow
- GitHub Actions CI/CD pipeline (planned)
- Vercel deployment configuration

### Changed
- Updated branch strategy documentation
- Added pull request templates
- Implemented semantic versioning

---

## [0.2.0] - 2025-01-17

### Added
- Initial project structure
- Basic Next.js configuration
- VLN branding guidelines (BRANDING.md)
- Claude Code development guidelines (CLAUDE.md)
- README with quick start instructions

### Changed
- Project renamed from "penpot-mcp" to "vln"
- Established VLN as primary brand identity

---

## [0.1.0] - 2025-01-16

### Added
- Initial repository setup
- Next.js 15 installation
- TypeScript configuration
- Git repository initialization
- Basic folder structure

---

## Version Format

Versions follow [Semantic Versioning](https://semver.org/):
- **MAJOR.MINOR.PATCH** (e.g., 1.0.0)

**Version Components:**
- **MAJOR**: Incompatible API changes (breaking changes)
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes (backwards compatible)

**Pre-release tags:**
- `0.x.x`: MVP/Pre-launch (current)
- `1.0.0`: Production launch
- `1.1.0-beta.1`: Beta releases
- `1.2.0-rc.1`: Release candidates

---

## Release Timeline

| Version | Status | Release Date | Milestone |
|---------|--------|--------------|-----------|
| 0.9.0 | ✅ Current | 2025-01-24 | MVP Complete |
| 1.0.0 | ⏳ Planned | 2025-02-01 | Production Launch |
| 1.1.0 | ⏳ Planned | 2025-02-15 | Backend Integration |
| 1.2.0 | ⏳ Planned | 2025-03-01 | Client Dashboard |
| 2.0.0 | ⏳ Planned | 2025-Q2 | API v2 Launch |

---

## Breaking Changes

### From 0.8.x to 0.9.0
- Enhanced README format may break automated parsers
- New documentation structure in docs/

### From 0.7.x to 0.8.0
- CORS configuration may affect local development
- Security headers may impact embedding

### From 0.6.x to 0.7.0
- Removed Framer Motion dependency (breaking for custom animations)
- Animation API changed to CSS-based system

---

## Deprecations

### Deprecated in 0.9.0
- None

### Deprecated in 0.8.0
- Legacy Framer Motion animations (removed in 0.7.0)

### Deprecated in 0.7.0
- Pages Router (migrated to App Router in 0.4.0)

---

## Migration Guides

### Migrating to 1.0.0 (from 0.9.0)
1. Update environment variables for production
2. Review and update API endpoints
3. Test all forms and integrations
4. Verify security headers configuration

### Migrating to 0.9.0 (from 0.8.0)
1. Update documentation links
2. Review new CHANGELOG and ROADMAP
3. Check semantic versioning compliance
4. Update any automated scripts referencing old structure

---

## Support

For questions about releases or version history:
- **Email**: [support@vln.gg](mailto:support@vln.gg)
- **GitHub Issues**: [github.com/Fused-Gaming/vln/issues](https://github.com/Fused-Gaming/vln/issues)
- **Documentation**: [docs.vln.gg](https://docs.vln.gg)

---

**Last Updated:** 2025-01-24
**Maintainer:** VLN Development Team
**License:** Proprietary - © 2025 VLN - Fused Gaming

[Unreleased]: https://github.com/Fused-Gaming/vln/compare/v0.9.0...HEAD
[0.9.0]: https://github.com/Fused-Gaming/vln/releases/tag/v0.9.0
[0.8.0]: https://github.com/Fused-Gaming/vln/releases/tag/v0.8.0
[0.7.0]: https://github.com/Fused-Gaming/vln/releases/tag/v0.7.0
[0.6.0]: https://github.com/Fused-Gaming/vln/releases/tag/v0.6.0
[0.5.0]: https://github.com/Fused-Gaming/vln/releases/tag/v0.5.0
[0.4.0]: https://github.com/Fused-Gaming/vln/releases/tag/v0.4.0
[0.3.0]: https://github.com/Fused-Gaming/vln/releases/tag/v0.3.0
[0.2.0]: https://github.com/Fused-Gaming/vln/releases/tag/v0.2.0
[0.1.0]: https://github.com/Fused-Gaming/vln/releases/tag/v0.1.0
