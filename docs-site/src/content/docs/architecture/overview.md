---
title: Architecture Overview
description: VLN System Architecture and Design Patterns
---

VLN is built on a modern, scalable architecture designed for enterprise security consulting with high availability and performance requirements.

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript 5.x (strict mode)
- **Styling:** Tailwind CSS + Shadcn/UI
- **Database:** PostgreSQL via Prisma (planned)
- **Authentication:** NextAuth.js (planned)
- **Deployment:** Vercel (primary), GitHub Actions (CI/CD)

## Architecture Layers

1. **Presentation Layer** — Next.js pages, React components, Tailwind styling
2. **Application Layer** — API routes, business logic, validation
3. **Data Layer** — Prisma ORM, PostgreSQL, caching
4. **Infrastructure Layer** — Vercel hosting, Cloudflare CDN, monitoring

## Key Documents

- [Security Model](/docs-site/src/content/docs/architecture/security.md)
- [Infrastructure](/docs-site/src/content/docs/architecture/infrastructure.md)
- [Compliance](/docs-site/src/content/docs/architecture/compliance.md)

*Additional architecture documentation is being migrated from the DevOps repository.*
