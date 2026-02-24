---
title: Open Graph Image System
description: Dynamic OG images for all VLN subdomains — architecture, wireframes, and design tokens
---

> Dynamic OG images for all VLN subdomains using the full design system

**Last Updated:** February 2026 | **Version:** 1.0 | **Status:** Active

---

## Overview

VLN uses Next.js `ImageResponse` (from `next/og`) to generate dynamic, brand-consistent Open Graph images at build time and on-demand via API routes. Every OG image follows the VLN design system exactly: matte charcoal backgrounds, sage green accents, Inter + JetBrains Mono typography, and the research lab aesthetic.

---

## Architecture

### OG Image Strategy

| Type | Trigger | Use Case |
|------|---------|----------|
| **Convention-based** | Build time | Per-route OG images (`app/*/opengraph-image.tsx`) |
| **API route** | On-demand | Dynamic OG for subdomains and wildcard routes |

### Subdomain OG Coverage

| Subdomain | OG Source | Accent Color | Status |
|-----------|-----------|-------------|--------|
| `vln.gg` | Convention per route | Rainbow/Sage | ✅ Active |
| `design.vln.gg` | `GET /api/og/design` | Purple | ✅ Active |
| `docs.vln.gg` | `GET /api/og/docs` | Blue | ✅ Active |
| `edu.vln.gg` | `GET /api/og?subdomain=edu` | Amber | Planned |
| `blog.vln.gg` | `GET /api/og?subdomain=blog` | Blue | Planned |

---

## Design Tokens (OG Context)

```
Canvas Size:     1200 × 630 px
Background:      #0a0e0f  (vln-bg)
Card Background: #151a1c  (vln-bg-light)
Border Radius:   12px
Border Color:    rgba(134, 217, 147, 0.3)  (sage/30)

Primary Text:    #f8f9fa  (vln-white)    — Inter Bold
Secondary Text:  #cbd5e1  (vln-gray)     — Inter Regular
Technical Text:  #86d993  (vln-sage)     — JetBrains Mono

Accent Colors:
  Sage:    #86d993   Primary brand
  Blue:    #7dd3fc   Secondary / links
  Amber:   #fbbf24   Urgency / warnings
  Purple:  #c084fc   Premium / special

Glow Effect:     0 0 24px rgba(134, 217, 147, 0.4)
```

---

## ASCII Wireframes

### Homepage OG (`vln.gg`)

```
┌─────────────────────────────────────────────────────────────────┐
│  #0a0e0f background                                             │
│  ┌─ Circuit trace (top-left) ─────────────────────────────────┐ │
│  │  ═══╤═══╤═══   sage lines at 10% opacity                   │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│          [VLN LOGO — 164×40, top-center]                        │
│                                                                  │
│     "Your Contract Has Bugs"                                     │
│     Inter Bold 48px · #f8f9fa · "Bugs" in rainbow gradient      │
│                                                                  │
│     "Smart Contract Security Audits & Vulnerability Research"   │
│     Inter 22px · #cbd5e1                                        │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│  │ 🔍 47    │  │ 💰 $5.2M │  │ 🛡️ 0     │  Trust badges       │
│  │ Vulns    │  │ Recovered│  │ Post-Hack│  sage/20 border      │
│  └──────────┘  └──────────┘  └──────────┘                      │
│                                                                  │
│  ┌─ vln.gg ────────────────── Powered by Fused Gaming ────────┐ │
│  │  JetBrains Mono 14px · #94a3b8                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌─ Circuit trace (bottom-right, mirrored) ───────────────────┐ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

### design.vln.gg OG

```
┌─────────────────────────────────────────────────────────────────┐
│  #0a0e0f background                                             │
│                                                                  │
│  ┌─ LEFT PANEL (60%) ──────────┬─ RIGHT PANEL (40%) ──────────┐ │
│  │  [VLN LOGO]                 │  COLOR SWATCHES               │ │
│  │                             │  ┌──────┐ ┌──────┐           │ │
│  │  "VLN Design System"        │  │#86d993│ │#7dd3fc│          │ │
│  │  Inter Bold 42px · #f8f9fa  │  │ Sage  │ │ Blue  │          │ │
│  │                             │  └──────┘ └──────┘           │ │
│  │  "Brand Guidelines,         │  ┌──────┐ ┌──────┐           │ │
│  │   Component Library &       │  │#fbbf24│ │#c084fc│          │ │
│  │   Design Tokens"            │  │ Amber │ │Purple │          │ │
│  │  Inter 20px · #cbd5e1       │  └──────┘ └──────┘           │ │
│  │                             │                               │ │
│  │  design.vln.gg              │  TYPOGRAPHY                   │ │
│  │  JetBrains Mono · #86d993   │  Aa Inter                     │ │
│  │                             │  01 JetBrains Mono            │ │
│  │                             │                               │ │
│  │                             │  RADIUS: 12px                 │ │
│  │                             │  GLOW: 12px                   │ │
│  └─────────────────────────────┴───────────────────────────────┘ │
│  ┌─ Powered by Fused Gaming ── WCAG AAA Compliant ─────────────┐ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

**Accent:** Purple | Split layout: text left, visual tokens right.

---

### Services OG (`vln.gg/services`)

```
┌─────────────────────────────────────────────────────────────────┐
│  [VLN LOGO] top-left                                            │
│                                                                  │
│  "Our Services"   Inter Bold 44px · #f8f9fa                     │
│  "iGaming Security & Smart Contract Intelligence"               │
│  Inter 20px · #cbd5e1                                           │
│                                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │🛡️ Prevent │ │🔍 Forensic│ │🎓 Training│ │📚 VISE   │         │
│  │ #86d993  │ │ #fbbf24  │ │ #7dd3fc  │ │ #c084fc  │         │
│  │ $2K-10K  │ │ $15K-50K │ │ $3.5K/dy │ │ Free+    │         │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│  ┌─ vln.gg/services ─────────────────────────────────────────┐  │
└─────────────────────────────────────────────────────────────────┘
```

---

### Contact OG (`vln.gg/contact`)

```
┌─────────────────────────────────────────────────────────────────┐
│  [VLN LOGO] centered                                            │
│                                                                  │
│  "Get In Touch"   Inter Bold 48px · #f8f9fa                     │
│  "Start your free 30-minute vulnerability scan today"           │
│  Inter 22px · #cbd5e1                                           │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐       │
│  │  [ Start Free 30-Min Scan ]                          │       │
│  │   #86d993 bg · #0a0e0f text · rounded-vln           │       │
│  │   glow: 0 0 24px sage/40                            │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                  │
│  "24/7 Emergency Forensics Available"                            │
│  JetBrains Mono 14px · #fbbf24                                  │
│  ┌─ vln.gg/contact ──────────────────────────────────────────┐  │
└─────────────────────────────────────────────────────────────────┘
```

---

### docs.vln.gg OG

```
┌─────────────────────────────────────────────────────────────────┐
│  [Circuit trace top-right]                                       │
│                                                                  │
│  ┌─ LEFT (56%) ─────────────────┬─ RIGHT (40%) ───────────────┐ │
│  │  [VLN] [DOCS badge]          │  CATEGORIES                  │ │
│  │                              │  ● API Reference             │ │
│  │  Documentation               │  ● Guides                    │ │
│  │  Inter Bold 44px · #f8f9fa   │  ● Security                  │ │
│  │                              │  ● Integrations              │ │
│  │  API Reference, Guides &     │                              │ │
│  │  Integration Docs            │  Latest v0.11.0              │ │
│  │  Inter 20px · #7dd3fc        │  JetBrains Mono              │ │
│  │                              │                              │ │
│  │  docs.vln.gg                 │                              │ │
│  │  Mono 16px · #7dd3fc (blue)  │                              │ │
│  └──────────────────────────────┴──────────────────────────────┘ │
│  ┌─ Powered by Fused Gaming ───────────────── docs.vln.gg ────┐  │
└─────────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
app/
├── opengraph-image.tsx           # Homepage OG
├── services/opengraph-image.tsx  # Services OG
├── contact/opengraph-image.tsx   # Contact OG
├── about/opengraph-image.tsx     # About OG
├── pricing/opengraph-image.tsx   # Pricing OG
├── blog/opengraph-image.tsx      # Blog OG
├── faq/opengraph-image.tsx       # FAQ OG
└── api/og/
    ├── route.tsx                 # Dynamic OG (query params)
    ├── design/route.tsx          # design.vln.gg OG
    └── docs/route.tsx            # docs.vln.gg OG

lib/og/utils.ts                   # Shared utilities, colors, fonts
```

---

## Testing OG Images

```bash
# Local preview
pnpm dev

# Convention-based
http://localhost:3000/opengraph-image

# API-based
http://localhost:3000/api/og?title=Test&subtitle=Hello
http://localhost:3000/api/og/design
http://localhost:3000/api/og/docs
```

**Social preview validators:**
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: https://www.linkedin.com/post-inspector/
- General: https://www.opengraph.xyz/

---

## Quick Reference

| Route | OG Type | Accent | Key Visual |
|-------|---------|--------|------------|
| `/` | Convention | Rainbow | Trust badges |
| `/services` | Convention | Multi | 4 service pillars |
| `/contact` | Convention | Sage | CTA button mockup |
| `/pricing` | Convention | Sage | 3 tier cards |
| `/about` | Convention | Multi | Stats row |
| `/blog` | Convention | Blue | Blog identity |
| `/faq` | Convention | Sage | FAQ identity |
| `/api/og` | API | Dynamic | Configurable |
| `/api/og/design` | API | Purple | Color swatches |
| `/api/og/docs` | API | Blue | Doc categories |
