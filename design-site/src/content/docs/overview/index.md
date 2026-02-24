---
title: VLN Design System
description: VLN Design System — Brand Guidelines, Components, Tokens, and UX Documentation
---

> Security & Smart Contract Vulnerability Lab Brand Guidelines

**Last Updated:** February 2026
**Version:** 2.2
**Status:** Active

---

## Overview

The VLN design system provides a comprehensive framework for building conversion-focused, high-performance web experiences that reflect our brand identity as a professional security research lab.

## Core Principles

1. **Trust & Credibility** — Professional, research lab aesthetic
2. **Performance First** — Optimized animations, fast load times
3. **Conversion-Focused** — Clear CTAs, social proof, urgency
4. **Accessibility** — WCAG AAA compliant colors, keyboard navigation
5. **Mobile-First** — Responsive from 320px to 4K displays

---

## Documentation Structure

| Section | Contents |
|---------|----------|
| **Design Tokens** | Colors, Form Tokens |
| **Components** | Animations, Employee Cards |
| **Pages** | Homepage Design Spec |
| **UX Flows** | Homepage, Contact, Services Navigation |
| **Assets & Patterns** | Icons, Gradients, Layout, Patterns |
| **Performance** | 17-rule optimization guide |

---

## Quick Reference

### Brand Colors

| Role | Token | Hex |
|------|-------|-----|
| Background | `--vln-bg` | `#0a0e0f` |
| Primary Accent | `--vln-sage` | `#86d993` |
| Secondary Accent | `--vln-bluegray` | `#7dd3fc` |
| Tertiary Accent | `--vln-amber` | `#fbbf24` |
| Premium | `--vln-purple` | `#c084fc` |

### Typography

- **Primary:** Inter (UI, body text)
- **Technical:** JetBrains Mono (code, technical content)

### Key Metrics

- **Max Container Width:** 1280px
- **Border Radius:** 12px
- **Glow Intensity:** 12px
- **Card Lift:** 4px

---

## Design Philosophy

### Research Lab Aesthetic
- Clean, minimal layouts
- Subtle animations (no flashy effects)
- Technical precision in typography
- Grid-based PCB trace backgrounds

### High-Trust Visual Language
- Consistent color usage
- Clear hierarchy
- Verifiable social proof
- Professional imagery

### Conversion Optimization
- Primary CTA: "Start Free 30-Min Scan"
- Trust signals above the fold
- Multiple contact methods
- Clear pricing transparency

---

## Getting Started

1. **Review Brand Guidelines:** Start with [Color System](/tokens/colors)
2. **Understand Components:** Read [Animation System](/components/animations)
3. **Follow Patterns:** Reference [Homepage Spec](/pages/homepage)
4. **OG Images:** Review [OG Image System](/assets/og-images)
5. **Optimize Performance:** Apply [Performance Guidelines](/performance/guidelines)

---

## Resources

- **Component Library:** `/components/vln/`
- **Example Pages:** `/app/(site)/`
- **Brand Assets:** `/public/`

---

## Changelog

### v2.2 — February 2026
- Dynamic Open Graph image system for all routes and subdomains
- ASCII wireframe documentation for 9 OG variants
- Mermaid architecture diagrams
- Shared OG utility library with full design token support
- `design.vln.gg` dedicated OG endpoint
- Generic dynamic OG API for all planned subdomains

### v2.1 — December 2025
- Added EmployeeCard component for team member profiles
- Implemented expandable bios with social media links
- Created employee cards documentation
- Enhanced About page with "Meet the Team" section

### v2.0 — November 2024
- Added conversion-focused sales page design
- Enhanced performance guidelines
- Expanded social proof components
- Accessibility improvements

### v1.0 — October 2024
- Initial brand identity
- Core component library
- PCB trace animation system
