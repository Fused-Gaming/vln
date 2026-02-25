#!/bin/bash
# Post planning context comments to GitHub phase issues
# Usage: ./scripts/post-phase-comments.sh

set -e

REPO="Fused-Gaming/vln"

echo "🚀 Posting phase tracking comments to GitHub issues..."

# Issue #64 - Phase 1
echo "📝 Posting to Issue #64 (Phase 1)..."
gh issue comment 64 --repo $REPO --body "## 📊 Phase 1 Tracking & Execution Strategy

Created comprehensive planning documents to track all 190 issues across three phases:

### 📋 Documents Created
- **PHASE_TRACKING.md** — Full breakdown of all issues by phase
  - Phase 1 (v0.11.0): 25 issues (7 complete, 18 open)
  - Phase 2 (v1.1.0-1.3.0): 32+ issues
  - Phase 3 (v2.0.0-2.2.0): 130+ issues

- **EXECUTION_STRATEGY.md** — Parallel execution plan with mermaid diagrams
  - Track A: Phase 1 Infrastructure completion
  - Track B: Phase 2 v1.1.0 Auth Foundation
  - Track C: Infrastructure Planning (schemas & contracts)
  - 4-week sprint timeline

### 🎯 Phase 1 Focus (Track A)
18 remaining open items to complete v0.11.0:
- PostgreSQL + Prisma schema
- Session management & JWT
- CDN configuration
- Error tracking (Sentry)
- Performance analytics
- Uptime monitoring
- Security scanning automation (npm audit + Semgrep)

📍 See \`/docs/planning/PHASE_TRACKING.md\` and \`/docs/planning/EXECUTION_STRATEGY.md\`

Status: 🚀 Ready for parallel execution"

# Issue #114 - Phase 2
echo "📝 Posting to Issue #114 (Phase 2)..."
gh issue comment 114 --repo $REPO --body "## 📊 Phase 2 v1.1.0 Execution Strategy

Created comprehensive planning & execution strategy:

### 📋 Documents
- **PHASE_TRACKING.md** — Tracks Phase 2: 32+ issues across v1.1.0-v1.3.0
- **EXECUTION_STRATEGY.md** — Track B focuses on v1.1.0 Auth Foundation

### 🎯 Phase 2 v1.1.0 Deliverables (Track B)
Ready for parallel execution:

**Authentication:**
- Email/Password authentication
- OAuth Integration (Google/GitHub via Auth0/NextAuth)
- Magic links & SMS 2FA

**Audit Intake:**
- Audit request form
- Contract upload handler
- Scope definition wizard
- Service classification

**Infrastructure:**
- Transactional email pipeline
- File storage setup (S3/Vercel Blob)
- Real-time notifications
- Internal request dashboard
- Team collaboration features

**v1.2.0 & v1.3.0** follow with client dashboard and payment integration.

📍 See \`/docs/planning/EXECUTION_STRATEGY.md\` for details

Status: 🚀 Ready for parallel launch with Track A & Track C"

# Issue #149 - Phase 3
echo "📝 Posting to Issue #149 (Phase 3)..."
gh issue comment 149 --repo $REPO --body "## 📊 Phase 3 Planning & Infrastructure Strategy

Created phase tracking & execution strategy documents:

### 📋 Documents
- **PHASE_TRACKING.md** — Tracks Phase 3: 130+ issues for v2.0.0-v2.2.0
- **EXECUTION_STRATEGY.md** — Track C prepares infrastructure for Phase 3

### 🎯 Phase 3 Infrastructure Prep (Track C)
Unblocks Phase 3 with:
- Complete Prisma schema design (users, audits, payments, reports)
- API contract specifications (OpenAPI/Swagger)
- Email template registry
- Webhook event catalog
- Rate limiting & quota policies
- RBAC model definition
- Architecture decision records

### 📊 Phase 3 Roadmap

**v2.0.0 - Public API**
- REST API foundation with authentication
- Rate limiting & webhooks
- JavaScript, Python, Go SDKs
- CLI tools, GitHub App, Hardhat/Foundry integrations

**v2.1.0 - Continuous Security**
- Repository watching & auto-scanning
- PR validation & Slack/Teams notifications
- Public free scanning tool
- Analytics dashboard & compliance metrics

**v2.2.0 - Enterprise Layer**
- White-label reporting
- Dedicated security researcher access
- SAML SSO, SOC 2/ISO 27001 compliance
- Audit trails & executive reporting

📍 See \`/docs/planning/EXECUTION_STRATEGY.md\` for details

Status: 📋 Design phase → 🚀 Ready for Track C execution"

echo "✅ All comments posted successfully!"
echo ""
echo "Summary:"
echo "  ✓ Issue #64 (Phase 1) — Context posted"
echo "  ✓ Issue #114 (Phase 2) — Context posted"
echo "  ✓ Issue #149 (Phase 3) — Context posted"
