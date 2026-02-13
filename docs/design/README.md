# VLN Design System

> Security & Smart Contract Vulnerability Lab Brand Guidelines

**Last Updated:** February 2026
**Version:** 2.2
**Status:** Active

---

## Overview

The VLN design system provides a comprehensive framework for building conversion-focused, high-performance web experiences that reflect our brand identity as a professional security research lab.

## Core Principles

1. **Trust & Credibility** - Professional, research lab aesthetic
2. **Performance First** - Optimized animations, fast load times
3. **Conversion-Focused** - Clear CTAs, social proof, urgency
4. **Accessibility** - WCAG AAA compliant colors, keyboard navigation
5. **Mobile-First** - Responsive from 320px to 4K displays

---

## Documentation Structure

```
docs/design/
├── README.md (this file)
├── ROUTES_AND_ELEMENTS.md - Complete inventory of pages & components
├── DESIGN_ASSETS.md - Reusable patterns, icons, gradients
├── og-images.md - Open Graph image system, wireframes & architecture
├── tokens/
│   └── colors.md - Color palette and usage (WCAG AAA)
├── components/
│   ├── animations.md - Animation system & best practices
│   └── employee-cards.md - Team member card component
├── pages/
│   └── homepage.md - Homepage design spec & wireframes
├── ux-flows/
│   ├── homepage.md - Homepage UX flows & mockups
│   ├── contact-flow.md - Contact form UX flow
│   └── services-navigation.md - Services navigation UX
└── performance/
    └── guidelines.md - Performance optimization (17 rules)
```

---

## Quick Reference

### Brand Colors
- **Background:** Matte Charcoal (`#0a0e0f`)
- **Primary Accent:** Sage Green (`#86d993`)
- **Secondary Accent:** Sky Blue (`#7dd3fc`)
- **Tertiary Accent:** Amber (`#fbbf24`)
- **Premium:** Purple (`#c084fc`)

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

1. **Review Brand Guidelines:** Start with `/tokens/colors.md`
2. **Understand Components:** Read `/components/animations.md`
3. **Follow Patterns:** Reference `/pages/homepage.md`
4. **OG Images:** Review `/og-images.md` for social preview system
5. **Optimize Performance:** Apply `/performance/guidelines.md`

---

## Resources

- **Figma Files:** [Link to design files]
- **Component Library:** `/components/vln/`
- **Example Pages:** `/app/(site)/`
- **Brand Assets:** `/public/`

---

## Changelog

### v2.2 - February 2026
- Dynamic Open Graph image system for all routes and subdomains
- ASCII wireframe documentation for 9 OG variants
- Mermaid architecture diagrams (branching, deployment, validation)
- Shared OG utility library with full design token support
- design.vln.gg dedicated OG endpoint
- Generic dynamic OG API for all planned subdomains

### v2.1 - December 2025
- Added EmployeeCard component for team member profiles
- Implemented expandable bios with social media links
- Created employee cards documentation
- Enhanced About page with "Meet the Team" section

### v2.0 - November 2024
- Added conversion-focused sales page design
- Enhanced performance guidelines
- Expanded social proof components
- Added accessibility improvements

### v1.0 - October 2024
- Initial brand identity
- Core component library
- PCB trace animation system
