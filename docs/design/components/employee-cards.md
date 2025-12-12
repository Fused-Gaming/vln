# Employee Card Component

**Component:** `EmployeeCard`
**Location:** `/components/vln/employee-card.tsx`
**Status:** Active
**Last Updated:** December 2025

---

## Overview

The EmployeeCard component displays team member information with expandable bios and social media links. Used on the About page to showcase the VLN team with professional credibility.

---

## Features

### Core Functionality
- **Expandable Bio:** Click-to-expand detailed biography
- **Social Media Links:** GitHub, LinkedIn, Email, Telegram
- **Placeholder Avatar:** SVG placeholder for headshots
- **Responsive Design:** Mobile-first with breakpoints

### Visual Design
- VLN-branded color scheme with glow-lift effects
- Color-coded social links (Sage, Blue-Gray, Amber, Purple)
- Smooth expand/collapse animations
- Hover effects on all interactive elements

---

## Props

```tsx
interface EmployeeCardProps {
  name: string;              // Employee full name
  role: string;              // Job title/role
  shortIntro: string;        // Brief one-line description
  fullBio: string;           // Detailed biography (supports \n)
  github?: string;           // GitHub profile URL
  linkedin?: string;         // LinkedIn profile URL (min 30 chars)
  email?: string;            // Email address
  telegram?: string;         // Telegram profile URL
  imageUrl?: string;         // Avatar image (defaults to placeholder)
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
- **Section Title:** "Meet the Team" with sage green accent
- **Grid Layout:**
  - Mobile: 1 column
  - Tablet: 2 columns (md)
  - Desktop: 3 columns (lg)
- **Animation:** StaggerFade with 150ms delay

### Current Team Members
1. **J. Lucus** - Lead Security Researcher
2. **Marc Xavier** - Principal Smart Contract Auditor
3. **Jamie Vargas** - Security Operations & Incident Response

---

## Styling

### Color Scheme
- **Border:** `border-vln-sage/20` → `hover:border-vln-sage/40`
- **GitHub Links:** Sage green (`#86d993`)
- **LinkedIn Links:** Blue-gray (`#7dd3fc`)
- **Email Links:** Amber (`#fbbf24`)
- **Telegram Links:** Purple (`#c084fc`)

### Animations
- **Expand/Collapse:** 300ms transition on max-height
- **Hover Lift:** `-translate-y-1` on card hover
- **Glow Effect:** `glow-lift` utility class
- **Chevron Rotation:** 180° when expanded

---

## Accessibility

### ARIA Labels
- Expand button: `aria-expanded` state
- Social links: Descriptive `aria-label` with name
- Icons: Decorative with text labels

### Keyboard Navigation
- All buttons and links keyboard accessible
- Focus indicators visible
- Logical tab order maintained

---

## Assets

### Placeholder Avatar
**File:** `/public/placeholder-avatar.svg`
**Size:** 200x200 (displays at 80x80 / 96x96)
**Design:** Matte charcoal background with sage green user icon

---

## Performance Considerations

- **Lazy Loading:** Images use Next.js Image component
- **Animation Performance:** CSS transforms (GPU accelerated)
- **Bundle Impact:** ~1.5KB gzipped
- **No External Dependencies:** Uses Lucide icons (already in bundle)

---

## Best Practices

### Content Guidelines
- **Short Intro:** 1-2 sentences, 150-200 characters
- **Full Bio:** 2-3 paragraphs, use `\n\n` for separation
- **Role:** Concise title, avoid overly long descriptions

### Link Validation
- **LinkedIn:** Must be >30 characters to display (validation rule)
- **URLs:** Always use full HTTPS URLs
- **Email:** Use actual email addresses, not mailto: links

---

## Future Enhancements

- [ ] Real headshot photo support
- [ ] Additional social platforms (Twitter/X, Discord)
- [ ] Skills/expertise tags
- [ ] Links to authored blog posts or advisories
- [ ] Certifications/credentials display

---

## Related Components

- `StaggerFade` - Animation wrapper for grid layout
- `CSSFade` - Section title animation
- `Header` / `Footer` - Page layout components

---

## Changelog

### December 2025
- Initial implementation
- Three team members added
- LinkedIn URL validation (>30 chars)
- Placeholder avatar SVG created
- Responsive grid layout implemented
