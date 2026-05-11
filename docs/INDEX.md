# VLN Ecosystem Documentation Index

Comprehensive documentation hub for VLN and integrated Fused Gaming systems.

**Last Updated**: May 11, 2026

---

## 📚 Documentation Sections

### 1. VLN Core Documentation
Security and smart contract vulnerability lab platform.

- **[Getting Started](/docs/getting-started/)** - Project initialization and setup
- **[Architecture](/docs/architecture/)** - System design and component structure
- **[Technical Documentation](/docs/technical/)** - In-depth technical guides
- **[DevOps & Deployment](/docs/devops/)** - CI/CD, deployment, and infrastructure
- **[Design System](/docs/design/)** - UI components, tokens, and brand guidelines
- **[API Reference](/docs/technical/api/)** - Endpoint documentation and examples

### 2. MCP (Model Context Protocol)
Claude integration and AI development tools.

- **[MCP Setup](/docs/mcp/setup.md)** - Installation and configuration
- **[Available Tools](/docs/mcp/tools.md)** - Complete MCP server reference
- **[Authentication](/docs/mcp/authentication.md)** - API key and OAuth setup
- **[Integration Examples](/docs/mcp/examples.md)** - Real-world usage patterns

### 3. Fused Gaming Skill MCP
Multi-agent orchestration and skill framework.

- **[Overview](/docs/fused-gaming-skill-mcp/01-executive-summary.md)** - Framework introduction
- **[Installation](/docs/fused-gaming-skill-mcp/)** - Package and dependency setup
- **[Agent Development](/docs/fused-gaming-skill-mcp/)** - Building custom agents
- **[Skill Framework API](/docs/fused-gaming-skill-mcp/)** - Complete API reference
- **[Examples & Patterns](/docs/fused-gaming-skill-mcp/examples.md)** - Implementation guides

### 4. ACE Design System (Blackjack-Premium)
Component library and design patterns for gaming interfaces.

- **[Design System Overview](/docs/ace-design-system/overview.md)** - Component introduction
- **[Color Palette & Tokens](/docs/ace-design-system/design-tokens.md)** - Design specifications
- **[Component Library](/docs/ace-design-system/components.md)** - Available components
- **[Implementation Guide](/docs/ace-design-system/getting-started.md)** - Integration steps
- **[API Reference](/docs/ace-design-system/api-reference.md)** - Component APIs

### 5. PeraltaCC Documentation
Enterprise consulting and implementation framework.

- **[Executive Summary](/docs/peraltacc-addendum/01-executive-summary.md)** - Project overview
- **[Scope of Work](/docs/peraltacc-addendum/02-scope-of-work.md)** - Detailed scope
- **[Methodology](/docs/peraltacc-addendum/03-methodology.md)** - Approach and processes
- **[Deliverables](/docs/peraltacc-addendum/04-deliverables.md)** - Expected outputs
- **[Timeline & Pricing](/docs/peraltacc-addendum/05-timeline.md)** - Schedule and costs

### 6. Planning & Roadmap
Project planning and feature roadmaps.

- **[Project Status](/docs/planning/PROJECT_STATUS.md)** - Current status overview
- **[Roadmap](/docs/planning/ROADMAP.md)** - Feature roadmap and milestones
- **[Running Checklists](/docs/planning/RUNNING_CHECKLISTS.md)** - Operational checklists

### 7. Guides & How-Tos
Practical guides for common workflows.

- **[Development Guide](/docs/guides/)** - Development best practices
- **[Deployment Guide](/docs/guides/deployment.md)** - Deployment procedures
- **[Troubleshooting](/docs/guides/troubleshooting.md)** - Common issues and solutions

---

## 🔗 Quick Links

### Essential Setups
- [VLN Getting Started](/docs/getting-started/) - Start here
- [MCP Setup Guide](/docs/mcp/setup.md) - Configure MCP servers
- [Development Environment](/docs/guides/development.md) - Local development setup

### Development
- [Architecture Overview](/docs/architecture/) - System design
- [API Documentation](/docs/technical/api/) - API endpoints
- [Design System](/docs/design/) - UI components

### Operations
- [Deployment Guide](/docs/devops/) - Production deployment
- [Health & Monitoring](/docs/devops/monitoring.md) - System health
- [Troubleshooting](/docs/guides/troubleshooting.md) - Problem solving

### Integration
- [MCP Tools](/docs/mcp/tools.md) - Available integrations
- [Skill Framework](/docs/fused-gaming-skill-mcp/) - Agent framework
- [ACE Components](/docs/ace-design-system/) - UI components

---

## 📖 By Role

### For Developers
- Start: [Getting Started](/docs/getting-started/)
- Learn: [Architecture](/docs/architecture/)
- Build: [Development Guide](/docs/guides/development.md)
- Integrate: [MCP Setup](/docs/mcp/setup.md)

### For DevOps/SRE
- Learn: [DevOps Guide](/docs/devops/)
- Deploy: [Deployment Procedures](/docs/devops/deployment.md)
- Monitor: [Health & Monitoring](/docs/devops/monitoring.md)
- Troubleshoot: [Troubleshooting Guide](/docs/guides/troubleshooting.md)

### For Designers
- Learn: [Design System](/docs/design/)
- Implement: [ACE Components](/docs/ace-design-system/)
- Reference: [Design Tokens](/docs/ace-design-system/design-tokens.md)

### For Project Managers
- Track: [Project Status](/docs/planning/PROJECT_STATUS.md)
- Plan: [Roadmap](/docs/planning/ROADMAP.md)
- Execute: [Checklists](/docs/planning/RUNNING_CHECKLISTS.md)

### For Security Consultants
- Learn: [VLN Platform](/docs/getting-started/)
- Review: [Architecture](/docs/architecture/)
- Integrate: [API Reference](/docs/technical/api/)

---

## 🔐 Security & Access

### Sensitive Documentation
- Deployment credentials → See DevOps team
- API keys → `.mcp/.env.local` (not in version control)
- Security policies → Request from security team

### Documentation Standards
- All code examples are production-ready
- Security best practices are documented
- Sensitive data is never exposed in examples

---

## 📋 Documentation Stats

| Category | Files | Status |
|----------|-------|--------|
| VLN Core | 15+ | Active |
| MCP | 4 | Active |
| Fused Gaming Skill | 8+ | Active |
| ACE Design System | 6+ | Active |
| PeraltaCC | 8 | Synced |
| Planning | 3 | Active |
| Guides | 5+ | Active |
| **Total** | **50+** | **✅ Current** |

---

## 🔄 Documentation Sync

### Automated Syncs
- PeraltaCC docs sync daily at 2 AM UTC
- ACE documentation updates via GitHub Actions
- MCP server updates on deployment

### Manual Sync
To manually update documentation from source repositories:

```bash
npm run docs:sync
# or
pnpm run docs:sync
```

---

## 🔍 Search & Navigation

### Using the Documentation
1. Find your topic in the sections above
2. Use the breadcrumb navigation within docs
3. Search for keywords using Ctrl+F

### Contributing
See [CONTRIBUTING.md](/CONTRIBUTING.md) for documentation contribution guidelines.

---

## 📞 Support

- **Questions?** Check the [Troubleshooting Guide](/docs/guides/troubleshooting.md)
- **Found an issue?** File it on [GitHub Issues](https://github.com/fused-gaming/vln/issues)
- **Documentation feedback?** Submit a PR with improvements

---

## 📄 Document Metadata

- **Project**: VLN – Vulnerability Lab Network
- **Organization**: Fused Gaming
- **Repositories**: 
  - Primary: `fused-gaming/vln`
  - Skill Framework: `fused-gaming/fused-gaming-skill-mcp`
  - Design System: `fused-gaming/blackjack-premium` (ACE)
  - Services: `fused-gaming/peraltacc`

- **Last Verified**: 2026-05-11
- **Next Update**: 2026-05-18

---

Generated: May 11, 2026 | Maintained by: Fused Gaming Dev Team
