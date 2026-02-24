# VLN Running Checklists & Prerequisites

**Version:** 1.0
**Last Updated:** 2026-02-24
**Maintainer:** VLN Development Team
**Status:** 🟢 ACTIVE - All development must follow these checklists

---

## 📋 Quick Reference

This document is your **single source of truth** for all running checklists. These are **MANDATORY** before each phase of development.

| Phase | Checklist | Prerequisite | Trigger | Location |
|-------|-----------|--------------|---------|----------|
| **1. Local Dev** | Pre-Build | Code committed | Before `pnpm build` | [Below](#1-pre-build-checklist) |
| **2. Feature Branch** | PR Submission | Build passing | Before `git push` | [Below](#2-pull-request-checklist) |
| **3. Code Review** | Merge Gate | PR approved | Before merge button | [Below](#3-merge-gate-checklist) |
| **4. Production** | Deployment | Merged to integration/vln | Before Vercel deploy | [Below](#4-deployment-checklist) |
| **5. Live Release** | Post-Release | Deployed to prod | After going live | [Below](#5-post-release-checklist) |

---

## ⚠️ CRITICAL RULE

**DO NOT PROCEED TO THE NEXT PHASE WITHOUT COMPLETING THE PREVIOUS CHECKLIST.**

If you skip a checklist:
- You accept full responsibility for any bugs, security issues, or deployment failures
- You must document the skip in writing (reason + timestamp)
- You must notify the team immediately
- You waive the right to say "I didn't know" or "I forgot"

---

## 1. Pre-Build Checklist

**When:** Before running `pnpm build` for ANY reason
**Prerequisite:** Code has been modified locally
**Duration:** ~5 minutes
**Owner:** Developer

### Execution Steps

```bash
# Step 1: Verify local state
git status                           # Should be clean or have only expected changes
git log --oneline -5                 # Review recent commits

# Step 2: Run all checks
pnpm build                           # Must pass without errors
pnpm lint                            # Must pass without errors
pnpm test                            # If applicable
pnpm type-check                      # TypeScript check

# Step 3: Manual verification (2-5 minutes)
# Open browser to http://localhost:3000
# Test key features on mobile and desktop
# Check browser console (F12) for errors
```

### Checklist Items

- [ ] **Code Quality**
  - [ ] `pnpm build` passes without errors
  - [ ] `pnpm lint` passes without errors
  - [ ] `pnpm type-check` shows no TypeScript errors
  - [ ] `pnpm test` passes (if applicable)

- [ ] **Browser Testing**
  - [ ] Tested on mobile viewport (< 768px)
  - [ ] Tested on tablet viewport (768px - 1024px)
  - [ ] Tested on desktop viewport (> 1024px)
  - [ ] No console errors (F12 → Console tab)
  - [ ] No console warnings related to app code

- [ ] **Functionality**
  - [ ] Forms submit correctly
  - [ ] Links navigate correctly
  - [ ] Images load without broken links
  - [ ] No 404s in network tab
  - [ ] Animations play smoothly

- [ ] **Accessibility**
  - [ ] Tab navigation works (Tab key)
  - [ ] Keyboard can submit forms (Enter key)
  - [ ] Screen reader friendly (test with NVDA/JAWS if possible)
  - [ ] Color contrast adequate (WCAG AA minimum)

- [ ] **Performance**
  - [ ] Lighthouse Performance > 85
  - [ ] Lighthouse Accessibility = 100
  - [ ] LCP < 2.5s
  - [ ] CLS < 0.1

### ✅ Sign-Off

```bash
# Only proceed if ALL items checked ✅
# If any item fails, DO NOT PROCEED
echo "✅ Pre-Build Checklist PASSED - $(date)"
echo "Developer: $USER"
echo "Branch: $(git branch --show-current)"
echo "Commit: $(git rev-parse --short HEAD)"
```

### ❌ If Checklist Fails

**STOP. Do not proceed.**

1. Fix the failing item(s)
2. Re-run the check
3. Go back to the start of this checklist
4. Document what failed and how you fixed it

---

## 2. Pull Request Checklist

**When:** Before pushing code to GitHub (`git push -u origin <branch>`)
**Prerequisite:** Pre-Build Checklist PASSED
**Duration:** ~10 minutes
**Owner:** Developer

### Pre-Push Steps

```bash
# Step 1: Ensure branch is up-to-date
git fetch origin integration/vln
git merge origin/integration/vln                 # Resolve conflicts if any

# Step 2: Verify all checks still pass
pnpm build                                       # Must pass
pnpm lint                                        # Must pass
pnpm test                                        # If applicable

# Step 3: Review your changes
git diff origin/integration/vln                  # Review all changes
git log --oneline -5 origin/integration/vln..   # Review your commits

# Step 4: Push to remote
git push -u origin $(git branch --show-current)
```

### Checklist Items

- [ ] **Branch Preparation**
  - [ ] Branch name follows pattern: `feature/`, `fix/`, `docs/`, or `chore/`
  - [ ] Base branch is `integration/vln` (NOT `main`)
  - [ ] Branch is up-to-date with `origin/integration/vln`
  - [ ] No merge conflicts

- [ ] **Code Quality**
  - [ ] `pnpm build` passes without errors
  - [ ] `pnpm lint` passes without errors
  - [ ] `pnpm type-check` shows no TypeScript errors
  - [ ] All tests passing
  - [ ] No commented-out code left behind
  - [ ] No `console.log()` statements in production code
  - [ ] No `TODO` or `FIXME` comments without context

- [ ] **Commit Quality**
  - [ ] Follows Conventional Commits format (feat: / fix: / docs: / etc.)
  - [ ] Commit messages are descriptive (not "update" or "fixes")
  - [ ] Related commits are grouped logically
  - [ ] Each commit represents one logical change
  - [ ] Commit history is clean (no merge commits from local rebasing)

- [ ] **Documentation**
  - [ ] README updated (if changing user-facing features)
  - [ ] CHANGELOG entries added (if not auto-generated)
  - [ ] Code comments added (if complex logic)
  - [ ] API docs updated (if adding endpoints)
  - [ ] Type definitions complete (no `any` types without reason)

- [ ] **UI/UX Changes** (if applicable)
  - [ ] Responsive design tested on mobile/tablet/desktop
  - [ ] Screenshots included in PR description
  - [ ] Brand colors correct (sage green, charcoal, etc.)
  - [ ] Typography matches design system
  - [ ] Spacing and alignment consistent
  - [ ] Hover/focus states working

- [ ] **Accessibility** (if applicable)
  - [ ] WCAG AA color contrast verified
  - [ ] Form labels present
  - [ ] ARIA labels added where needed
  - [ ] Keyboard navigation working
  - [ ] No flashing or seizure triggers

- [ ] **Security**
  - [ ] No secrets in code (API keys, tokens, passwords)
  - [ ] No SQL injection vulnerabilities
  - [ ] No XSS vulnerabilities
  - [ ] No hardcoded credentials
  - [ ] Dependencies are safe (no vulnerable packages)

- [ ] **PR Description**
  - [ ] Title is clear and descriptive
  - [ ] Description explains WHAT changed
  - [ ] Description explains WHY it changed
  - [ ] Related issue(s) linked (#123)
  - [ ] Breaking changes documented (if any)
  - [ ] Testing instructions provided
  - [ ] Screenshots/videos included (for UI changes)

### ✅ Sign-Off

```bash
# Ready for GitHub review
git log --oneline origin/integration/vln..HEAD
echo "✅ PR Checklist PASSED - $(date)"
echo "PR Title: [Enter your PR title]"
echo "Ready for review at: https://github.com/Fused-Gaming/vln/pull/new/$(git branch --show-current)"
```

### Next Step: Create PR

1. Go to GitHub: https://github.com/Fused-Gaming/vln/pulls
2. Click "New pull request"
3. Select base: `integration/vln` ← CRITICAL
4. Select compare: your branch
5. Fill in title and description from above
6. Click "Create pull request"

---

## 3. Merge Gate Checklist

**When:** Before clicking "Merge pull request" on GitHub
**Prerequisite:** PR submitted and code review approved
**Duration:** ~3 minutes
**Owner:** Code Reviewer/Maintainer

### Checklist Items

- [ ] **Status Checks**
  - [ ] All GitHub status checks are green (✅)
  - [ ] Build workflow passed
  - [ ] Lint workflow passed
  - [ ] Test workflow passed (if applicable)
  - [ ] Security scan passed
  - [ ] No merge conflicts

- [ ] **Code Review**
  - [ ] At least 1 approval from code review
  - [ ] All requested changes addressed
  - [ ] No blocking comments remaining
  - [ ] Discussion items resolved

- [ ] **Content Review**
  - [ ] CHANGELOG.md updated
  - [ ] No breaking changes without migration guide
  - [ ] Documentation matches code changes
  - [ ] Type definitions complete

- [ ] **Merge Safety**
  - [ ] Base branch is `integration/vln` (NOT `main`)
  - [ ] Branch is up-to-date with integration/vln
  - [ ] No unexpected files changed
  - [ ] Commit count reasonable for PR scope

### ✅ Merge Button Safe to Click

Only click "Merge pull request" if ALL items are checked ✅

```bash
git log --oneline -1 integration/vln
# Verify the merge is what you expect
```

### After Merge

1. ✅ PR is merged to `integration/vln`
2. ✅ Monitor CI/CD pipeline (should trigger automatically)
3. ✅ Watch for deployment errors (check Discord #ci-cd)
4. ✅ If deployment fails, create issue + hotfix PR

---

## 4. Deployment Checklist

**When:** Before deploying to production (Vercel)
**Prerequisite:** Code merged to `integration/vln`, all CI/CD passing
**Duration:** ~15 minutes
**Owner:** DevOps / Tech Lead

### Pre-Deployment Steps

```bash
# Step 1: Verify staging environment
curl -s https://staging.vln.gg/api/health | jq .

# Step 2: Run final security checks
pnpm audit --production
npm audit fix --production (if needed)

# Step 3: Verify Vercel staging build
# Go to: https://vercel.com/fused-gaming/vln
# Check latest staging deployment - should be green ✅

# Step 4: Test in staging
# Visit: https://staging.vln.gg
# Run through critical user flows
```

### Checklist Items

- [ ] **Pre-Deployment**
  - [ ] All code merged to `integration/vln`
  - [ ] Latest commit hash documented
  - [ ] Release notes prepared
  - [ ] Rollback plan documented

- [ ] **Staging Verification**
  - [ ] Staging build passing
  - [ ] All pages loading correctly
  - [ ] Forms working
  - [ ] API endpoints responding
  - [ ] Analytics connected
  - [ ] Error tracking (Sentry) working

- [ ] **Infrastructure**
  - [ ] Database migrations complete (if applicable)
  - [ ] Environment variables set correctly
  - [ ] Secrets management verified
  - [ ] CDN cache invalidation planned

- [ ] **Security**
  - [ ] Security headers verified (`Content-Security-Policy`, `X-Frame-Options`, etc.)
  - [ ] HTTPS enforced
  - [ ] CORS configured correctly
  - [ ] No known vulnerabilities (`pnpm audit`)
  - [ ] Rate limiting active

- [ ] **Monitoring**
  - [ ] Error tracking enabled (Sentry)
  - [ ] Analytics configured (Cloudflare)
  - [ ] Uptime monitoring active
  - [ ] Alerts configured for critical issues
  - [ ] Team notified of deployment window

- [ ] **Performance**
  - [ ] Lighthouse scores > 85
  - [ ] Bundle size within budget
  - [ ] Images optimized
  - [ ] Database queries optimized
  - [ ] No N+1 queries

- [ ] **Testing**
  - [ ] Smoke tests passed on staging
  - [ ] Critical user flows tested
  - [ ] Payment flows tested (if applicable)
  - [ ] Email sending tested
  - [ ] API integrations tested

- [ ] **Documentation**
  - [ ] Release notes written
  - [ ] CHANGELOG updated with new version
  - [ ] README updated (if needed)
  - [ ] API docs updated (if new endpoints)
  - [ ] Deployment notes documented

- [ ] **Communication**
  - [ ] Team informed of deployment
  - [ ] Customers notified (if needed)
  - [ ] Stakeholders briefed
  - [ ] On-call engineer assigned
  - [ ] Discord notifications configured

### ✅ Deployment Safe to Execute

```bash
echo "✅ Deployment Checklist PASSED - $(date)"
echo "Version: [Enter version]"
echo "Deploying to production..."
# Trigger deployment (via Vercel dashboard or CLI)
vercel --prod
```

### During Deployment

- [ ] Monitor Vercel build logs
- [ ] Watch for errors
- [ ] Check CDN propagation
- [ ] Verify DNS resolution

### ✅ Post-Deployment (Immediate)

- [ ] Production site loading
- [ ] All pages accessible
- [ ] Analytics receiving data
- [ ] Error tracking receiving events
- [ ] No critical errors in logs

---

## 5. Post-Release Checklist

**When:** After code deployed to production
**Prerequisite:** Deployment successful, site live
**Duration:** ~30 minutes over first hour + daily for 3 days
**Owner:** DevOps / Tech Lead

### Immediate (First 5 Minutes)

- [ ] **Site Status**
  - [ ] https://vln.gg/ loading
  - [ ] All pages responding
  - [ ] No 500 errors
  - [ ] No 503 errors

- [ ] **Monitor Critical Systems**
  - [ ] Error tracking (Sentry) - check for spikes
  - [ ] Analytics (Cloudflare) - data flowing
  - [ ] Uptime monitoring - green status
  - [ ] Discord alerts - monitor #ci-cd

- [ ] **Quick Smoke Test**
  - [ ] Homepage renders
  - [ ] Services page works
  - [ ] Contact form submits
  - [ ] Navigation functioning
  - [ ] Booking system working

### First Hour

- [ ] **Health Monitoring**
  - [ ] No spike in error rate
  - [ ] Response times normal
  - [ ] Database connections healthy
  - [ ] API endpoints responding
  - [ ] Background jobs running (if applicable)

- [ ] **User Impact**
  - [ ] No customer complaints
  - [ ] Support channels quiet
  - [ ] Slack/Discord quiet (#support, #general)
  - [ ] No emergency calls

- [ ] **Log Review**
  - [ ] Application logs clean
  - [ ] No warnings about configuration
  - [ ] Database logs normal
  - [ ] Security logs normal
  - [ ] API logs normal

### First 24 Hours

- [ ] **Deeper Monitoring**
  - [ ] Performance metrics stable
  - [ ] Memory usage normal
  - [ ] CPU usage normal
  - [ ] Database query performance good
  - [ ] Cache hit rates good

- [ ] **User Testing**
  - [ ] Complete user journey (book consultation)
  - [ ] Form validation working
  - [ ] Email notifications sending
  - [ ] Confirmation emails received
  - [ ] Mobile experience good

- [ ] **Analytics Review**
  - [ ] Page views normal
  - [ ] Bounce rate normal
  - [ ] User flows expected
  - [ ] Conversion rate normal
  - [ ] No unusual patterns

### After 24 Hours

- [ ] **Update Documentation**
  - [ ] CHANGELOG.md finalized
  - [ ] Version tag created: `git tag v0.x.x`
  - [ ] PROJECT_STATUS.md updated
  - [ ] Release notes published
  - [ ] Deployment log saved

- [ ] **Team Communication**
  - [ ] Team notified of successful release
  - [ ] Stakeholders informed
  - [ ] Customers notified (if applicable)
  - [ ] Post-mortem scheduled (if issues)
  - [ ] Celebration message posted 🎉

### After 3 Days

- [ ] **Full Validation**
  - [ ] No critical bugs reported
  - [ ] Performance stable
  - [ ] User adoption healthy
  - [ ] No regressions observed
  - [ ] All features working

- [ ] **Incident Review** (if any issues occurred)
  - [ ] Post-mortem completed
  - [ ] Root cause identified
  - [ ] Hotfixes applied
  - [ ] Preventive measures documented
  - [ ] Team trained on prevention

### ✅ Release Closure

```bash
echo "✅ Release SUCCESSFUL - $(date)"
echo "Version: [v0.x.x]"
echo "Status: HEALTHY"
echo "Next review: [Date]"
```

---

## 🚨 Emergency Procedures

### If a Checklist Item FAILS

**IMMEDIATELY STOP and DO NOT PROCEED to next phase.**

1. **Document the failure:**
   ```
   FAILED ITEM: [Specific checklist item]
   TIME: [Date and time]
   DEVELOPER: [Your name]
   BRANCH: [Branch name or deployed version]
   REASON: [Why it failed]
   ```

2. **Take corrective action:**
   - Fix the issue
   - Re-run the checklist
   - Get approval to proceed

3. **Notify the team:**
   - Post in #development Slack channel
   - Tag relevant team members
   - Include failure details and fix

4. **Document in project:**
   - Add entry to `docs/incident-log.md`
   - Update ROADMAP if process needs change
   - Schedule post-mortem if serious

### If Production Goes Down

1. **DECLARE INCIDENT** - Post in #emergencies
2. **IDENTIFY** - What broke and when?
3. **ROLLBACK** - If safe: `vercel rollback`
4. **PATCH** - Fix the root cause immediately
5. **TEST** - Full checklist before re-deploy
6. **COMMUNICATE** - Update team every 30 mins
7. **POST-MORTEM** - Schedule within 24 hours

---

## 📊 Checklist Metrics

Track weekly in PROJECT_STATUS.md:

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Pre-Build Pass Rate | 100% | - | ⏳ |
| PR Checklist Compliance | 100% | - | ⏳ |
| Merge Gate Pass Rate | 100% | - | ⏳ |
| Deployment Success Rate | 100% | - | ⏳ |
| Post-Release Incident Rate | 0% | - | ⏳ |
| Checklist Skip Rate | < 5% | - | ⏳ |

---

## ✅ Verification

**This document is your source of truth. Before each phase:**

1. Find your phase in the quick reference table above
2. Click the link to the checklist
3. **Complete EVERY item** - checkmarks must be real work, not fake
4. **Do not proceed** until all items are checked
5. **Document your sign-off** with date/time/name

---

## 🎓 Training

All developers must:
- [ ] Read this entire document (first time: ~20 minutes)
- [ ] Complete one full cycle with checklist (onboarding)
- [ ] Get sign-off from tech lead (first PR)
- [ ] Follow checklists for all subsequent work

---

## 📞 Questions?

- **Technical:** Ask in #development
- **Process:** Ask in #devops
- **Urgent:** Ping tech lead
- **Process Change:** Create issue with `[PROCESS]` tag

---

**Status:** 🟢 ACTIVE
**Last Updated:** 2026-02-24
**Version:** 1.0
**Compliance Level:** MANDATORY FOR ALL DEVELOPERS

**Remember: These checklists exist to protect you, the team, and our users. Follow them every time. No exceptions.**
