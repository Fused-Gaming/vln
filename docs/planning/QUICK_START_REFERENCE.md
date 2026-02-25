# VLN Phase 1 Quick Start Reference

**One-page guide for parallel development execution**

---

## 🎯 The Mission

Complete Phase 1 (7/25 → 25/25 tasks) + Foundation for Phase 2
**Timeline:** 3 weeks (Track C: 1 week, Track A+B: 2 weeks parallel)

---

## 📊 Branch Map at a Glance

```
integration/vln (primary)
├─ Track C ⚠️ (Infrastructure) — START FIRST
│  └─ claude/infra-planning-izYQc
│     Deliverable: Prisma schema, API spec, email templates
│     Timeline: Days 1-7
│     Status: READY TO LAUNCH
│
├─ Track A (Phase 1 Infra) — START AFTER C MERGES
│  └─ claude/phase1-infra-izYQc
│     Deliverable: Database, monitoring, security scanning
│     Timeline: Days 8-21
│     Status: BLOCKED ON C
│
└─ Track B (Phase 2 Auth) — START AFTER C MERGES
   └─ claude/phase2-auth-izYQc
      Deliverable: Authentication, audit intake form, email
      Timeline: Days 8-21
      Status: BLOCKED ON C
```

---

## 🚀 Quick Launch Commands

### Step 1: Create Track C Branch (Immediate)
```bash
git fetch origin
git checkout -b claude/infra-planning-izYQc origin/integration/vln
```
👉 **Then use PROMPT C** from PHASE_1_DEVELOPMENT_MAP.md

### Step 2: Create Track A Branch (After C merges)
```bash
git fetch origin
git checkout -b claude/phase1-infra-izYQc origin/integration/vln
```
👉 **Then use PROMPT A** from PHASE_1_DEVELOPMENT_MAP.md

### Step 3: Create Track B Branch (After C merges)
```bash
git fetch origin
git checkout -b claude/phase2-auth-izYQc origin/integration/vln
```
👉 **Then use PROMPT B** from PHASE_1_DEVELOPMENT_MAP.md

---

## ⚙️ Merge Commands

**After completing work:**

```bash
# Final checks
pnpm build      # ✅ Must pass
pnpm lint       # ✅ Must pass
pnpm test       # ✅ Must pass (>80% coverage)
npm audit       # ✅ No vulnerabilities

# Push to branch
git push -u origin claude/<track-name>-izYQc

# Create PR on GitHub
# Base: integration/vln
# Title: Conventional commit format
```

---

## 📋 Track C Deliverables (7 days)

| File | Purpose | Status |
|------|---------|--------|
| `prisma/schema.prisma` | Complete DB schema | NEW |
| `docs/technical/api-specification.md` | OpenAPI 3.1 spec | NEW |
| `docs/technical/database-design.md` | Schema documentation | NEW |
| `docs/technical/email-templates.md` | Email types & triggers | NEW |
| `docs/technical/webhook-events.md` | Webhook catalog | NEW |
| `docs/technical/adr/*.md` | Architecture decisions | NEW |
| `lib/api-types.ts` | Shared TypeScript types | NEW |

---

## 📋 Track A Deliverables (14 days)

| Category | Deliverables |
|----------|--------------|
| **Database** | Session middleware, JWT tokens, Prisma migrations |
| **Monitoring** | Sentry integration, analytics setup, dashboards |
| **Security** | npm audit automation, Semgrep SAST, CI/CD pipeline |
| **CDN** | Vercel config, cache strategy, performance baseline |
| **Docs** | Database design, monitoring setup, security procedures |

---

## 📋 Track B Deliverables (14 days)

| Category | Deliverables |
|----------|--------------|
| **Auth** | NextAuth.js, email/password, OAuth, magic links, 2FA |
| **Forms** | Audit intake, scope wizard, file upload, validation |
| **Email** | Transactional service, templates, verification flow |
| **API** | POST /api/audits/intake, POST /api/auth/*, GET endpoints |
| **Dashboard** | Internal audit tracking, status display, prioritization |

---

## ✅ Daily Checklist (Per Track)

```
Morning:
  [ ] git fetch origin
  [ ] git pull origin integration/vln

Work:
  [ ] Complete assigned deliverables
  [ ] Run pnpm test locally
  [ ] Fix any failing tests

Evening:
  [ ] git add .
  [ ] git commit -m "conventional message"
  [ ] git push origin claude/<track>-izYQc
```

---

## 🎯 Success Criteria

**Track C:** ✅ Schema valid, API spec complete, merged
**Track A:** ✅ DB + monitoring running, tests pass, merged
**Track B:** ✅ Auth + forms functional, tests pass, merged

**All tracks:**
- ✅ pnpm build passes
- ✅ pnpm lint passes
- ✅ pnpm test passes (>80%)
- ✅ No security vulnerabilities
- ✅ Conventional commits
- ✅ PRs to integration/vln

---

## 🔗 Key Documents

- **[PHASE_1_DEVELOPMENT_MAP.md](./PHASE_1_DEVELOPMENT_MAP.md)** — Full execution guide with detailed prompts
- **[BRANCH_COORDINATION_GUIDE.md](./BRANCH_COORDINATION_GUIDE.md)** — Daily workflow & merge procedures
- **[PHASE_TRACKING.md](./PHASE_TRACKING.md)** — Phase overview & dependencies
- **[CLAUDE.md](../../CLAUDE.md)** — Project rules & branding

---

## 🚨 Critical Rules

⚠️ **Track C must complete first** — Blocks A & B

✅ **All PRs to integration/vln** — Never push to main

✅ **Conventional commits** — `feat()`, `fix()`, `docs()`, `test()`

✅ **Tests >80% coverage** — No merges below threshold

✅ **Branch format** — Must be: `claude/<name>-izYQc`

---

## 📞 Coordination

**Timeline:**
- **Days 1-7:** Track C (infrastructure planning)
- **Days 8-21:** Tracks A & B in parallel
- **Day 22+:** Merge to integration/vln, begin Phase 2 sprint

**Daily Sync:**
- Track C: % complete, blockers?
- Track A: DB & monitoring progress?
- Track B: Auth & forms status?
- Dependencies: Any integration issues?

---

## 🎬 Start Now

1. ✅ **Read** PHASE_1_DEVELOPMENT_MAP.md (this explains everything)
2. ✅ **Launch Track C** with PROMPT C from that document
3. ⏳ **Wait for Track C to merge** (days 1-7)
4. 🚀 **Launch Tracks A & B** in parallel (days 8+)
5. ✅ **Merge both to integration/vln** (day 22+)

---

**Status:** Ready to execute
**Next Step:** Use PROMPT C from PHASE_1_DEVELOPMENT_MAP.md to start Track C
