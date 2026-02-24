---
title: Employee Card Component
description: EmployeeCard — Team member profiles with expandable bios and social media links
---

**Component:** `EmployeeCard`
**Location:** `/components/vln/employee-card.tsx`
**Status:** Active
**Last Updated:** December 2025

---

## Overview

The `EmployeeCard` component displays team member information with expandable bios and social media links. Used on the About page to showcase the VLN team with professional credibility.

---

## Features

- **Expandable Bio:** Click-to-expand detailed biography
- **Social Media Links:** GitHub, LinkedIn, Email, Telegram
- **Placeholder Avatar:** SVG placeholder for headshots
- **Responsive Design:** Mobile-first with breakpoints
- **Glow-lift effects** matching VLN color system

---

## Props

```tsx
interface EmployeeCardProps {
  name: string;        // Employee full name
  role: string;        // Job title/role
  shortIntro: string;  // Brief one-line description
  fullBio: string;     // Detailed biography (supports \n)
  github?: string;     // GitHub profile URL
  linkedin?: string;   // LinkedIn profile URL (min 30 chars)
  email?: string;      // Email address
  telegram?: string;   // Telegram profile URL
  imageUrl?: string;   // Avatar image (defaults to placeholder)
}
```

---

## Usage Example

```tsx
<EmployeeCard
  name="J. Lucus"
  role="Lead Security Researcher"
  shortIntro="Expert in smart contract security with over 8 years of experience..."
  fullBio="J. Lucus brings deep expertise in smart contract security..."
  github="https://github.com/jlucus"
  linkedin="https://www.linkedin.com/in/supitsj"
  email="j.lucus@vln.gg"
  telegram="https://t.me/supitsj"
/>
```

---

## Implementation on About Page

**Location:** `/app/about/page.tsx`

### Layout

```
Mobile:  1 column
Tablet:  2 columns (md)
Desktop: 3 columns (lg)
```

```tsx
<StaggerFade staggerDelay={150}>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {team.map(member => <EmployeeCard key={member.name} {...member} />)}
  </div>
</StaggerFade>
```

### Current Team Members

1. **J. Lucus** — Lead Security Researcher
2. **Marc Xavier** — Principal Smart Contract Auditor
3. **Jamie Vargas** — Security Operations & Incident Response

---

## Styling

### Color Scheme

| Element | Default | Hover |
|---------|---------|-------|
| Border | `border-vln-sage/20` | `border-vln-sage/40` |
| GitHub link | Sage `#86d993` | — |
| LinkedIn link | Blue-gray `#7dd3fc` | — |
| Email link | Amber `#fbbf24` | — |
| Telegram link | Purple `#c084fc` | — |

### Animations

| Interaction | Effect |
|-------------|--------|
| Card hover | `-translate-y-1` |
| Glow | `.glow-lift` utility |
| Expand/Collapse | 300ms max-height transition |
| Chevron | 180° rotation when expanded |

---

## Accessibility

- **`aria-expanded`** state on expand button
- **`aria-label`** on all social links (includes member name)
- Decorative icons with text labels
- Full keyboard navigation
- Logical tab order maintained
- Visible focus indicators

---

## Assets

### Placeholder Avatar

**File:** `/public/placeholder-avatar.svg`
**Displays at:** 80×80px (mobile), 96×96px (desktop)
**Design:** Matte charcoal background with sage green user icon

---

## Performance Considerations

- **Lazy Loading:** Next.js `Image` component
- **Animation:** CSS transforms (GPU-accelerated)
- **Bundle Impact:** ~1.5KB gzipped
- **No External Dependencies:** Lucide icons (already in bundle)

---

## Content Guidelines

- **Short Intro:** 1–2 sentences, 150–200 characters
- **Full Bio:** 2–3 paragraphs, use `\n\n` for paragraph breaks
- **Role:** Concise title, avoid overly long descriptions
- **LinkedIn:** Must be >30 characters to display (URL validation)
- **URLs:** Always use full HTTPS URLs

---

## Future Enhancements

- [ ] Real headshot photo support
- [ ] Additional social platforms (Twitter/X, Discord)
- [ ] Skills/expertise tags
- [ ] Links to authored blog posts or advisories
- [ ] Certifications/credentials display

---

## Related Components

- `StaggerFade` — Animation wrapper for grid layout
- `CSSFade` — Section title animation
- `Header` / `Footer` — Page layout
