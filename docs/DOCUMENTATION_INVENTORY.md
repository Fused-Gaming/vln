# Documentation Inventory

Comprehensive tracking of all documentation in the VLN repository.

**Last Updated:** 2026-05-09  
**Status:** Complete (after regression remediation)

---

## Core Documentation Structure

### Marketing & Brand Documentation
- ✅ `/CLAUDE.md` – Project guidelines and standards
- ✅ `docs/design/` – Design system, components, and brand assets
  - README.md – Design overview
  - DESIGN_ASSETS.md – Asset inventory
  - ROUTES_AND_ELEMENTS.md – Page components
  - blog-structure.md – Blog architecture
  - Multiple subdirectories for mockups, flows, tokens

### Getting Started & Onboarding
- ✅ `docs/getting-started/` – Developer onboarding
  - Comprehensive guides for setup and first steps

### Technical Documentation
- ✅ `docs/technical/` – Architecture, specifications, and technical design
  - SITE_ROUTING.md – Route configuration
  - api-specification.md – API contract specification
  - database-design.md – Database schema and relationships
  - email-templates.md – Email template specifications
  - monitoring.md – Monitoring and observability
  - webhook-events.md – Webhook event documentation
  - adr/ – Architecture Decision Records

### Architecture & Security
- ✅ `docs/architecture/` – System architecture and security
  - SECURITY.md – Security implementation guide

### Developer Guides
- ✅ `docs/guides/` – Practical developer guides
  - GITHUB_CLI_AUTH.md – GitHub authentication setup
  - Additional guides for common tasks

### DevOps & Deployment
- ✅ `docs/devops/` – CI/CD, infrastructure, and deployment
  - Comprehensive guides for DevOps workflows

### Planning & Strategy
- ✅ `docs/planning/` – Project planning, roadmaps, and strategy
  - DEVOPS_CONSULTING_SALES_STRATEGY.md
  - BRANCH_COORDINATION_GUIDE.md
  - QUICK_START_REFERENCE.md
  - PHASE_TRACKING.md
  - EXECUTION_STRATEGY.md
  - PHASE_1_DEVELOPMENT_MAP.md
  - And more strategic documents

### Reference & Configuration
- ✅ `docs/prompts/` – Claude prompts and templates
  - Agent prompts for different development tasks

### Blog & Content
- ✅ `docs/_source/blog/` – Blog article sources
  - example-getting-started.md

### System Documentation
- ✅ `docs/BLOG_SYSTEM.md` – Blog infrastructure documentation
- ✅ `docs/DOCUMENTATION_SYSTEM.md` – Documentation architecture
- ✅ `docs/FEATURES.md` – Feature tracking and requirements
- ✅ `docs/IMPLEMENTATION_SUMMARY.md` – Implementation progress
- ✅ `docs/IMPLEMENTATION_SUMMARY_2026-02-25.md` – Historical implementation record
- ✅ `docs/MERGE_CHECKLIST.md` – PR merge validation checklist
- ✅ `docs/OG_IMAGE_AUDIT.md` – Open Graph image audit results

---

## New Documentation (Added 2026-05-09)

### MCP Integration Documentation
- ✅ `docs/mcp/` – Model Context Protocol integration guide
  - README.md – MCP overview and capabilities
  - setup.md – Server configuration guide
  - tools.md – Complete tool reference
  - authentication.md – Security and credential management
  - examples.md – Real-world workflow examples

### PeraltaCC Addendum
- ✅ `docs/peraltacc-addendum/` – External documentation sync target
  - README.md – Sync information and instructions
  - .source-metadata.json – (Auto-populated by GitHub Actions)

### Regression Report
- ✅ `DOCUMENTATION_REGRESSION_REPORT.md` – Detailed analysis of regression and remediation

---

## Documentation Adapters

Configuration files for documentation site integration:

- ✅ `docs/_adapters/docs-site.adapter.json` – Main documentation site configuration
  - Maps content from docs/* to generated documentation site
  - Defines routes, sidebars, and frontmatter rules
  - Supports API reference, infrastructure, security, research sections

- ✅ `docs/_adapters/blog.adapter.json` – Blog site configuration
  - Manages blog article structure and metadata

- ✅ `docs/_adapters/design-site.adapter.json` – Design system site configuration
  - Handles design documentation rendering

---

## Source Documentation

Organized source files for different documentation categories:

- ✅ `docs/_source/blog/` – Blog article sources
  - articles/ – Published blog posts
  - Integrated with blog adapter for publishing

---

## GitHub Actions Workflows

Automation for documentation management:

- ✅ `.github/workflows/deploy-peraltacc-docs.yml` – PeraltaCC documentation sync
  - Triggered: Daily at 2 AM UTC
  - Manual trigger available via workflow_dispatch
  - Source: Fused-Gaming/PeraltaCC docs/addendum-bid/
  - Target: docs/peraltacc-addendum/
  - Includes validation and metadata generation

---

## Documentation Categories Summary

| Category | Files | Status | Last Updated |
|----------|-------|--------|--------------|
| Brand & Design | ~15 files | ✅ Complete | 2026-02-24 |
| Technical | 7 files | ✅ Complete | 2026-02-25 |
| Getting Started | Multiple | ✅ Complete | 2025-12-12 |
| Architecture | 1 file | ✅ Complete | 2026-02-24 |
| DevOps | Multiple | ✅ Complete | 2026-02-25 |
| Planning | 6+ files | ✅ Complete | 2026-02-25 |
| Guides | Multiple | ✅ Complete | 2025-11-24 |
| Prompts | Multiple | ✅ Complete | 2026-02-13 |
| MCP Integration | 5 files | ✅ NEW (2026-05-09) | 2026-05-09 |
| PeraltaCC Sync | 1+ files | ✅ NEW (2026-05-09) | 2026-05-09 |
| Blog | Multiple | ✅ Complete | 2026-03-12 |

---

## Key Files & Their Purpose

### Strategic
- `CLAUDE.md` – Project standards and architecture
- `docs/planning/EXECUTION_STRATEGY.md` – Implementation strategy
- `docs/planning/PHASE_TRACKING.md` – Project phases and progress

### Development
- `docs/technical/api-specification.md` – API contracts
- `docs/technical/database-design.md` – Database schema
- `docs/architecture/SECURITY.md` – Security implementation

### Operations
- `docs/devops/*` – Deployment and infrastructure
- `.github/workflows/deploy-peraltacc-docs.yml` – Documentation automation

### Integration
- `docs/mcp/*` – Claude Code and AI agent integration
- `docs/_adapters/*` – Documentation site configuration

---

## Documentation Maintenance

### Regular Tasks
- [ ] Review and update technical documentation (quarterly)
- [ ] Update planning documents as phases progress (ongoing)
- [ ] Verify external links in documentation (monthly)
- [ ] Check PeraltaCC sync status (if using automated sync)
- [ ] Review MCP documentation for new tool additions

### Before Major Releases
- [ ] Audit all documentation for accuracy
- [ ] Update API specifications
- [ ] Review security documentation
- [ ] Validate deployment procedures

### When Adding New Features
- [ ] Document feature in appropriate section
- [ ] Update API specification if applicable
- [ ] Add to planning/implementation tracking
- [ ] Update FEATURES.md file
- [ ] Create blog post if customer-facing

---

## Access & Permissions

### Public Documentation
- Design system
- Getting started guides
- Architecture overview
- Blog posts

### Internal Documentation
- Technical specifications
- Database design
- Security procedures
- Strategic planning
- DevOps playbooks

---

## Related Resources

- **Repository:** https://github.com/Fused-Gaming/vln
- **Integration Branch:** `integration/vln`
- **Main Branch:** `main`
- **External Sync:** Fused-Gaming/PeraltaCC repository

---

## Document Versioning

Documentation follows semantic versioning for major changes:
- Version tracked in file headers or Git commits
- Historical versions available in Git history
- Implementation summaries dated for reference

---

## Future Documentation Needs

Based on current MVP status:

- [ ] Client portal documentation (Phase 2)
- [ ] Report viewer guide (Phase 2)
- [ ] Retainer billing documentation (Phase 3)
- [ ] Advisory dashboard documentation (Phase 3)
- [ ] Public vulnerability feed documentation (Phase 4)

---

**Next Review Date:** 2026-08-09 (3 months)  
**Last Remediated:** 2026-05-09  
**Remediation Ticket:** Documentation Regression Fix
