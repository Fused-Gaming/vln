# Getting Started with VLN Documentation System

Learn how to write and contribute documentation to the VLN project using our unified documentation system.

## What is the Documentation System?

The VLN Documentation System is a unified platform that manages all documentation across multiple sites with automatic synchronization and zero content divergence.

## Key Features

- **Single Source of Truth** — Write once, publish everywhere
- **Automatic Sync** — Content automatically synced to design-site and docs-site
- **Zero Divergence** — Validation ensures no content drift
- **Smart Routing** — Adapters route content based on audience
- **Blog Auto-Generation** — Blog posts generated from documentation

## Getting Started

### 1. Create Your Documentation

All documentation lives in `docs/_source/`. Create a new file:

```bash
touch docs/_source/technical/guides/your-guide.md
```

### 2. Write in Markdown

Standard markdown with optional frontmatter:

```markdown
# Your Guide Title

Description of your guide...

## Section 1

Content here...
```

### 3. Push to Your Branch

```bash
git add docs/_source/
git commit -m "docs: add new guide"
git push origin feature/your-guide
```

### 4. Automatic Sync

The documentation bot automatically:
- Reads your source file
- Applies adapter transformations
- Syncs to appropriate sites
- Generates blog entries if applicable
- Creates PR comment with status

## Contributing to Different Sections

### Design Documentation

```
docs/_source/design/
├── tokens/          # Design tokens
├── components/      # UI components
├── pages/          # Page designs
└── ux-flows/       # User flows
```

### Technical Documentation

```
docs/_source/technical/
├── architecture/   # System architecture
├── guides/        # How-to guides
├── devops/        # Deployment & CI/CD
└── getting-started/
```

### API Reference

```
docs/_source/api/
├── endpoints/      # API endpoints
├── authentication/ # Auth docs
├── webhooks/       # Webhook docs
└── errors/        # Error codes
```

### Infrastructure

```
docs/_source/infrastructure/
├── database/       # Database schemas
├── networking/     # Network config
├── caching/        # Cache strategies
└── storage/        # File storage
```

### Security

```
docs/_source/security/
├── threat-modeling/
├── audit-methodology/
└── vulnerability-scoring/
```

### Research

```
docs/_source/research/
├── rng-analysis/
├── smart-contracts/
└── wallet-flows/
```

### Blog Articles

```
docs/_source/blog/
├── articles/       # General articles
├── research/       # Research findings
├── releases/       # Release notes
└── announcements/  # Announcements
```

## Next Steps

- Read the full [Documentation System Guide](/docs/DOCUMENTATION_SYSTEM.md)
- Check out [Writing Conventions](/docs/DOCUMENTATION_SYSTEM.md#writing-conventions)
- Join us in improving VLN documentation!

---

**Learn more:** [VLN Documentation System](/docs/DOCUMENTATION_SYSTEM.md)
