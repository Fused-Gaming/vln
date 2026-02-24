---
title: Typography System
description: VLN typography — Inter, JetBrains Mono, type scale, WCAG AAA compliance
---

> Migrated from Fused-Gaming/DevOps design-standards

---

## Typefaces

VLN uses two primary typefaces:

| Font | Role | License |
|------|------|---------|
| **Inter** | UI, headings, body text | SIL Open Font License |
| **JetBrains Mono** | Code, technical content | SIL Open Font License |

Both are loaded from Google Fonts via Next.js font optimization.

---

## Loading Fonts (Next.js)

```tsx
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});
```

---

## Type Scale

### Desktop Scale

| Level | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| H1 | 60px | 1.2 | 700 | Hero headlines |
| H2 | 48px | 1.2 | 700 | Section headings |
| H3 | 36px | 1.3 | 600 | Subsection headings |
| H4 | 24px | 1.4 | 600 | Card headings |
| Body Large | 18px | 1.6 | 400 | Lead paragraphs |
| Body | 16px | 1.6 | 400 | Standard body text |
| Body Small | 14px | 1.5 | 400 | Secondary text |
| Caption | 12px | 1.5 | 400 | Metadata, timestamps |

### Mobile Scale (0.75× desktop)

| Level | Size | Usage |
|-------|------|-------|
| H1 | 36px | Mobile hero |
| H2 | 30px | Mobile sections |
| H3 | 24px | Mobile subsections |
| Body | 16px | Unchanged |

### Tailwind Implementation

```tsx
<h1 className="text-5xl md:text-6xl font-bold">
  Hero Headline
</h1>

<h2 className="text-3xl md:text-4xl md:text-5xl font-bold">
  Section Heading
</h2>

<p className="text-base sm:text-lg leading-relaxed">
  Body paragraph text
</p>
```

---

## Responsive Text Sizing

```tsx
// Hero
className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
// Mobile: 36px | Tablet: 48px | Desktop: 60px | Wide: 72px

// Section heading
className="text-3xl sm:text-4xl md:text-5xl font-bold"
// Mobile: 30px | Tablet: 36px | Desktop: 48px

// Body
className="text-base sm:text-lg"
// Mobile: 16px | Tablet+: 18px
```

---

## Font Weights

| Weight | Class | Usage |
|--------|-------|-------|
| 700 | `font-bold` | Headings, CTAs, key stats |
| 600 | `font-semibold` | Buttons, labels |
| 500 | `font-medium` | Body text, descriptions |
| 400 | `font-normal` | Paragraphs, tertiary text |

---

## Technical Content (JetBrains Mono)

```tsx
// Code blocks
<code className="font-mono text-vln-sage">
  contract.deploy()
</code>

// Technical labels
<span className="font-mono text-sm text-vln-bluegray">
  design.vln.gg
</span>

// Stat values (number emphasis)
<span className="font-mono text-4xl font-bold text-vln-sage">
  47
</span>
```

---

## Accessibility Standards

All text must meet **WCAG AAA** compliance:

| Text Type | Minimum Contrast | VLN Standard |
|-----------|-----------------|--------------|
| Normal text | 7:1 | 19.2:1 ✓ |
| Large text (18px+) | 4.5:1 | All accent colors ≥ 6.9:1 ✓ |

### Contrast Combinations

| Text | Background | Ratio | Level |
|------|------------|-------|-------|
| `#f8f9fa` (white) on `#0a0e0f` | Dark | 19.2:1 | AAA |
| `#86d993` (sage) on `#0a0e0f` | Dark | 7.8:1 | AAA |
| `#7dd3fc` (blue) on `#0a0e0f` | Dark | 9.1:1 | AAA |
| `#fbbf24` (amber) on `#0a0e0f` | Dark | 10.2:1 | AAA |
| `#c084fc` (purple) on `#0a0e0f` | Dark | 6.9:1 | AA+ |

---

## Best Practices

### DO ✓

- Maintain 60–80 character line lengths for readability
- Use Inter for all UI text and body copy
- Use JetBrains Mono only for code and technical identifiers
- Apply responsive sizing (mobile-first)
- Test contrast ratios before shipping

### DON'T ✗

- Use font sizes below 12px
- Mix more than 2 font families
- Use bold for decorative purposes
- Rely on font weight alone to convey meaning
- Skip responsive scaling

---

## Line Length

```tsx
// Optimal reading width: 60-80 characters
<p className="max-w-prose">  // ~65ch
  Body text stays readable at this width.
</p>

// Form fields
<div className="max-w-2xl">  // 672px
<div className="max-w-lg">   // 512px
```
