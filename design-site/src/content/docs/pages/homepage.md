---
title: Homepage Design Specification
description: Conversion-focused sales page design spec for VLN Security — wireframes, sections, and components
---

> Conversion-Focused Sales Page for VLN Security

**Primary Goal:** Convert visitors into qualified leads
**Target Conversion Rate:** 12–15% (free scan requests)
**Target Audience:** Blockchain gaming projects, DeFi protocols, smart contract developers

---

## Page Structure

```
1.  Hero Section         — Free Scan CTA
2.  Trust Stats Dashboard
3.  Service Pillars      — 4 quadrants
4.  Testimonials         — Social Proof
5.  Case Studies
6.  Pricing Transparency
7.  Comparison Table
8.  FAQ                  — Objection Handling
9.  Urgency & Guarantee
10. Final CTA + Footer
```

---

## 1. Hero Section

```
┌──────────────────────────────────────────────────┐
│                                                  │
│         [PCB Trace Background - Subtle]          │
│                                                  │
│     Don't Launch With Vulnerabilities            │
│     Your Contract Has Bugs.                      │
│     Let Us Find Them Before Hackers Do.          │
│                                                  │
│   Advanced security audits and smart contract    │
│   vulnerability research for blockchain gaming   │
│                                                  │
│   [START FREE 30-MIN SCAN] [24/7 FORENSICS]      │
│                                                  │
│   ✓ 47 Critical Vulns Found                      │
│   ✓ $5.2M Recovered                              │
│   ✓ 0 Post-Audit Hacks                           │
│                                                  │
└──────────────────────────────────────────────────┘
```

**H1:** `Your Contract Has Bugs`

**Subheadline:** `Let us find them before hackers do. Professional smart contract audits, forensic investigation, and security training for Web3.`

**Primary CTA:**
```tsx
<Button variant="primary" size="xl" className="glow-lift">
  Start Free 30-Min Scan →
</Button>
```

**Secondary CTA:**
```tsx
<Button variant="secondary" size="xl"
  className="border-vln-amber text-vln-amber hover:bg-vln-amber/10 glow-lift-amber">
  <Siren className="w-5 h-5" />
  24/7 Emergency Forensics
</Button>
```

**Animations:** `CSSFade` staggered at 0ms, 200ms, 400ms, 600ms, 800ms

---

## 2. Stats Grid

**8 metric cards with `StaggerFade` (100ms stagger) + `Counter` animation:**

| # | Metric | Color |
|---|--------|-------|
| 1 | **47** Critical Vulns Discovered | Sage |
| 2 | **$5.2M** Funds Recovered | Blue |
| 3 | **200+** Developers Trained | Amber |
| 4 | **100%** Zero Post-Audit Hacks | Purple |
| 5 | **12** Years Blockchain Experience | Sage |
| 6 | **3** Legal Cases Supported | Blue |
| 7 | **48** Hours Critical Bug Reporting SLA | Amber |
| 8 | **24/7** Forensics Response | Purple |

**Component:** `<StatsGrid />`

---

## 3. Service Pillars

**4 core service cards:**

### Prevention
- Icon: Shield (sage)
- Price: $2K–10K, 3–7 days
- CTA: "Start Free 30-Min Scan"

### Forensics
- Icon: Search (amber)
- Price: $15K–50K, < 24hr response
- CTA: "24/7 Emergency Hotline"

### Training
- Icon: GraduationCap (blue)
- Price: $3.5K/day, 1–2 weeks
- CTA: "Book Workshop"

### Education (VISE)
- Icon: BookOpen (purple)
- Price: Free – $500, Self-paced
- CTA: "Start Free Module"

**Component:** `<ServicePillars />`

---

## 4. Urgency Banner

```
[⚠️] Launch in 30 Days?
We have X audit slots available for [Month Year]
[████████░░] 10 of 13 booked
[Book Your Slot Now]
```

**Component:** `<UrgencyBanner />`

---

## 5. Testimonials Section

**3 testimonials displayed:**

| Client | Role | Impact |
|--------|------|--------|
| Sarah Chen, CTO @ DeFi Gaming Protocol | Prevention Audit | "Saved us $2M" |
| Michael Torres, Legal Counsel @ BlockPlay Studios | Forensics | "Expert testimony was crucial" |
| James Park, VP Engineering @ NFT Gaming Inc | Training | "Training transformed our team" |

**All:** 5 stars, "Verified Client" badge

**CTA:** "View All 47 Reviews"

**Component:** `<TestimonialsSection />`

---

## 6. Comparison Table

**10 features — VLN vs Typical vs Automated:**

| Feature | VLN | Typical | Automated |
|---------|-----|---------|-----------|
| Prevention Audits | ✓ | ✓ | ✓ |
| Post-Exploit Forensics | ✓ | ✗ | ✗ |
| Expert Testimony | ✓ | ✗ | ✗ |
| Team Training | ✓ | ✗ | ✗ |
| On-Chain Certification | ✓ | ✗ | ✗ |
| Gaming Focus | ✓ | ✗ | ✗ |
| 48hr Critical Alerts | ✓ | ✗ | ✓ |
| Human Review | ✓ | ✓ | ✗ |
| Fix Verification | ✓ | Sometimes | ✗ |
| Government Experience | ✓ | ✗ | ✗ |

**Pricing:**
- VLN: $2K–10K, 3–7 days
- Typical: $5K–50K, 2–6 weeks
- Automated: $100–500, Minutes

**Component:** `<ComparisonTable />`

---

## 7. Pricing Section

| Tier | Code Size | Price |
|------|-----------|-------|
| Small | < 500 lines | $2K–4K |
| Medium | 500–2K lines | $5K–8K |
| Large | 2K+ lines | $10K+ |

**Included in All Audits:**
- Comprehensive vulnerability analysis
- CVSS scoring & risk assessment
- Foundry PoC exploits for critical findings
- 30-day fix verification (free)
- Critical bugs flagged within 48 hours

---

## 8. FAQ Section

8 questions displayed (23 total):

1. Why pay when free tools exist?
2. How do I trust you with my code?
3. Can you guarantee 100% security?
4. What if I get exploited after your audit?
5. Do you work with legal/law enforcement?
6. How long does an audit take?
7. What's included in the free scan?
8. Do you offer ongoing support?

**Component:** `<FAQSection />`

---

## 9. Guarantee Section

```
[🛡️ ShieldCheck 8×8]

The VLN Guarantee

✓ If we find zero vulnerabilities, you pay nothing*
✓ 30-day free fix verification on all findings
✓ Critical bugs flagged within 48 hours
✓ Detailed, actionable remediation steps included

*Applies to prevention audits only. Small review fee may apply.

[Start Your Free Scan]
```

**Component:** `<GuaranteeSection />`

---

## 10. Final CTA

```
Don't Launch with Vulnerabilities

Your contract has bugs. Let us find them before hackers do.

[Start Free 30-Min Scan]  [View All Services]

Trusted by blockchain gaming projects, DeFi protocols, and smart contract developers
12 Years Experience • Government Cleared • Expert Testimony
```

---

## Design Components Summary

| Component | File | Purpose |
|-----------|------|---------|
| `CSSFade` | `/components/animations/css-fade.tsx` | Fade with direction |
| `Counter` | `/components/animations/counter.tsx` | Animated number |
| `StaggerFade` | `/components/animations/stagger-fade.tsx` | Sequential list |
| `ICBoardBackground` | `/components/vln/ic-board-background.tsx` | Circuit board bg |
| `StatsGrid` | `/components/vln/stats-grid.tsx` | 8-card metrics |
| `ServicePillars` | `/components/vln/service-pillars.tsx` | 4 services |
| `TestimonialsSection` | `/components/vln/testimonials-section.tsx` | Social proof |
| `ComparisonTable` | `/components/vln/comparison-table.tsx` | Feature compare |
| `GuaranteeSection` | `/components/vln/guarantee-section.tsx` | Risk reversal |
| `UrgencyBanner` | `/components/vln/urgency-banner.tsx` | FOMO banner |
| `FAQSection` | `/components/vln/faq-section.tsx` | Accordion FAQ |

---

## Color Usage by Section

| Section | Primary | Accent |
|---------|---------|--------|
| Hero | Rainbow gradient | Sage (CTA) |
| Stats Grid | Multi-color rotation | All 4 colors |
| Services | Service-specific | Sage/Amber/Blue/Purple |
| Urgency | Amber | Amber border |
| Testimonials | Sage | Star ratings (amber) |
| Comparison | Sage | Blue (table) |
| Guarantee | Sage | ShieldCheck icon |
| Final CTA | Rainbow gradient | Sage (CTA) |

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Homepage Bundle | < 300KB |
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Lighthouse Score | > 90 |
