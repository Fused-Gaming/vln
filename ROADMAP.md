# VLN Product Roadmap

**Vision:** Become the leading security infrastructure platform for blockchain gaming and DeFi.

**Current Version:** 0.11.0 — Pre-Launch (MVP foundation complete)
**Next Milestone:** v1.0.0 — Production Launch
**Identity:** Security infrastructure for Web3 builders — not just smart contract audits.

---

## Product Strategy Overview

VLN evolves in four phases. Each phase builds on the previous one. Nothing in v2.x functions correctly unless v1.x is structurally sound.

```
Phase 1 — Establish Trust          (v0.11.0 → v1.0.0)
Phase 2 — Operationalize Audits    (v1.1.0 → v1.3.0)
Phase 3 — Productize Security      (v2.0.0 → v2.2.0)
Phase 4 — Platform & Ecosystem     (v3.0.0)
```

---

## Phase 1 — Establish Trust (v0.11.0 → v1.0.0)

**Objective:** Launch a production-ready public platform capable of accepting real client requests and operating securely.

This phase is about credibility, infrastructure, and operational readiness.

---

### v0.11.0 — Brand & Distribution Layer ✅

**Release Date:** 2026-02-13
**Status:** Complete

**Purpose:** Control presentation and link-sharing visibility.

**Delivered:**
- [x] Dynamic Open Graph generation for all VLN routes
- [x] Subdomain OG API (`/api/og/design` for design.vln.gg)
- [x] Generic dynamic OG API (`/api/og`) with configurable params
- [x] Shared OG utility library (`lib/og/utils.ts`) with design tokens
- [x] Design-token-based rendering across all variants
- [x] ASCII wireframe + Mermaid architecture documentation
- [x] Verified build pipeline (pnpm build passes)

**Impact:**
- Professional social presence
- SEO foundation established
- Brand consistency across all link previews
- Technical credibility signaled externally

---

### v1.0.0 — Production Launch

**Status:** In Progress (85% complete)
**Target:** Q1 2026

**What "launch ready" means:**
- Contact intake works end-to-end
- Tickets route correctly to the team
- Infrastructure is stable under load
- Monitoring is live
- Legal and compliance pages exist
- No critical security vulnerabilities

---

#### Pillar 1 — Intake & Pipeline

This establishes a controlled, auditable entry point for revenue.

- [ ] Contact API endpoint
- [ ] Spam protection (rate limiting, honeypot, Cloudflare Turnstile)
- [ ] Auto-response emails (acknowledgment + SLA expectations)
- [ ] CRM integration (HubSpot or equivalent)
- [ ] Service request classification (standard vs. emergency)
- [ ] Ticket creation logic with priority routing

---

#### Pillar 2 — Production Infrastructure

This reduces operational risk and enables the phases above it.

- [ ] PostgreSQL provisioning
- [ ] Redis session layer
- [ ] Cloudflare CDN configuration
- [ ] Uptime monitoring (status.vln.gg)
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (Vercel Analytics)
- [ ] Security scanning (Snyk / npm audit --production)

---

#### Pillar 3 — Documentation & Transparency

This builds client trust before any sales call happens.

- [x] Complete website content and legal pages (Terms, Privacy, Refunds)
- [x] SEO optimization
- [ ] Public API documentation (placeholder acceptable at launch)
- [ ] Security methodology explanation (public-facing)
- [ ] Service scope clarity (what is and is not included)

---

#### Success Criteria

| Metric | Target |
|--------|--------|
| Uptime | 99.9% |
| Avg. response time | < 500ms |
| Lighthouse score | > 90 |
| Critical vulnerabilities | 0 |
| Real inquiries | First 20 |

---

## Phase 2 — Operationalize Audits (v1.1.0 → v1.3.0)

**Objective:** Move from marketing site to security product. Intake is live — now build the pipeline that processes it.

---

### v1.1.0 — Authentication & Audit Requests

**Status:** Planned
**Depends on:** PostgreSQL + Redis from v1.0.0

**Authentication System:**
- [ ] Email/password via NextAuth.js
- [ ] OAuth (Google, GitHub)
- [ ] Magic link sign-in
- [ ] Two-factor authentication (2FA)

**Audit Intake System:**
- [ ] Contract upload (GitHub integration)
- [ ] Scope definition wizard
- [ ] Automated complexity estimation
- [ ] Instant quote generation

**Internal Dashboard:**
- [ ] Request status tracking
- [ ] Team assignment
- [ ] Progress milestones
- [ ] Communication portal

**Email System:**
- [ ] Transactional emails (welcome, confirmations, status updates, report delivery)
- [ ] Email service provider integration (SendGrid or Postmark)

**Impact:** Transforms VLN from a static service site into an interactive security platform.

---

### v1.2.0 — Client Dashboard

**Status:** Planned
**Depends on:** v1.1.0 Auth + Audit system

**Client Portal:**
- [ ] Dashboard homepage (active audits, activity feed, quick actions, notifications)
- [ ] Secure report viewing with PDF export
- [ ] Vulnerability filtering and severity breakdown
- [ ] Multiple project support
- [ ] Role-based access control

**Report Viewer:**
- [ ] Interactive report interface with syntax-highlighted code snippets
- [ ] Inline vulnerability annotations
- [ ] Fix verification status tracking
- [ ] Comments, discussions, and file attachments
- [ ] Real-time notifications (WebSocket)

**Technical Additions:**
- File storage (AWS S3 or Vercel Blob)
- PDF generation library
- Real-time WebSocket infrastructure

**Impact:** Clients stop emailing PDFs. Everything lives in-platform.

---

### v1.3.0 — Payment & Automation

**Status:** Planned
**Depends on:** v1.2.0 Client Dashboard

**Payment System:**
- [ ] Stripe integration (cards, ACH, invoices, subscriptions/retainers)
- [ ] Crypto payments — USDC/USDT, Ethereum, Polygon (optional)
- [ ] Dynamic pricing calculator
- [ ] Custom quote builder (admin)
- [ ] Refund workflow

**Compliance:**
- [ ] PCI DSS alignment
- [ ] Stripe Tax integration
- [ ] Invoice archival

**Impact:** Audit request → Quote → Payment → Execution becomes automated. Revenue scales.

---

## Phase 3 — Productize Security (v2.0.0 → v2.2.0)

**Objective:** Transform VLN from a services company into infrastructure.

---

### v2.0.0 — Public API

**Status:** Planned
**Depends on:** All of Phase 2

**REST API v2:**
- [ ] API key + OAuth authentication
- [ ] Rate limiting
- [ ] Webhook support
- [ ] Interactive API explorer and documentation
- [ ] Code examples in multiple languages

**Developer Tools:**
- [ ] JavaScript/TypeScript SDK
- [ ] Python SDK
- [ ] Go SDK
- [ ] CLI tool
- [ ] GitHub App
- [ ] Hardhat plugin
- [ ] Foundry integration

**Impact:** Projects integrate VLN directly into CI pipelines. Security becomes embedded, not manual.

---

### v2.1.0 — Continuous Security

**Status:** Planned

**Continuous Monitoring:**
- [ ] GitHub repository watching
- [ ] Automatic scan on commit
- [ ] Pull request checks
- [ ] Slack / Discord alert integrations

**Quick Scan Tool:**
- [ ] Free public scanning
- [ ] Common vulnerability detection
- [ ] Best practice checks
- [ ] Educational reporting output

**Analytics & Insights:**
- [ ] Vulnerability trend tracking
- [ ] Risk scoring over time
- [ ] Compliance tracking dashboard

**Impact:** Recurring engagement. Subscription revenue model expansion.

---

### v2.2.0 — Enterprise Layer

**Status:** Planned

**Enterprise Tier:**
- [ ] White-label reports
- [ ] Dedicated security researcher tier
- [ ] Custom SLA agreements
- [ ] SAML SSO
- [ ] Compliance reporting (SOC 2, ISO 27001)
- [ ] Audit trails
- [ ] Executive board reports and presentations

**Impact:** Higher contract value. Long-term enterprise relationships.

---

## Phase 4 — Ecosystem Platform (v3.0.0)

**Status:** Conceptual
**Vision:** VLN becomes a security marketplace and intelligence layer — transitioning from company → platform → protocol-adjacent ecosystem.

**Marketplace:**
- [ ] Third-party auditor network
- [ ] Bug bounty integration
- [ ] Researcher reputation system
- [ ] Tool ecosystem

**AI Features:**
- [ ] AI-assisted vulnerability detection
- [ ] Fix suggestion engine
- [ ] Natural language report generation

**On-Chain Layer:**
- [ ] Audit verification registry
- [ ] NFT certificates
- [ ] Decentralized audit records

---

## Dependency Map

```
Infrastructure → Auth → Audit System → Dashboard → Payments → API → Automation → Enterprise
```

If infrastructure fails, everything above it collapses. Do not skip layers.

---

## Business Blockers (Gating Constraints)

These are not tasks — they are prerequisites for enterprise growth.

- [ ] Legal entity formation
- [ ] Business insurance
- [ ] Payment processor approval
- [ ] Compliance roadmap (SOC 2 pathway)

---

## Backlog — Prioritized by Revenue Impact

### Revenue Acceleration
- Referral program
- Case studies and client testimonials
- CMS for blog content
- Affiliate system

### Retention Drivers
- Multi-language support
- Slack bot
- Discord bot

### Brand Expansion
- Newsletter automation
- Events and hackathon presence
- Podcast integration
- Community forum

---

## Quarterly Targets

| Quarter | Objective |
|---------|-----------|
| Q1 2026 | Launch & First Revenue |
| Q2 2026 | Productized Audit Flow |
| Q3 2026 | Automation & Recurring Revenue |
| Q4 2026 | Enterprise Contracts & Ecosystem Positioning |

---

## Roadmap Changelog

| Date | Change |
|------|--------|
| 2026-02-21 | Full roadmap rewrite — phase structure, vision, dependency map, business blockers, quarterly targets |
| 2026-02-13 | Added v0.11.0 OG Image System milestone |
| 2025-01-24 | Initial roadmap created |

---

**Last Updated:** 2026-02-21
**Version:** 2.0
**Maintainer:** VLN Product Team
