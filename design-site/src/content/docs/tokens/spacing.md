---
title: Spacing System
description: VLN 8px grid spacing system — tokens, Tailwind classes, and component patterns
---

> Migrated from Fused-Gaming/DevOps design-standards

VLN implements an **8px grid system** for consistent spacing throughout the design system.

---

## Spacing Scale

| Token | Size | Tailwind | Use Case |
|-------|------|----------|----------|
| 3XS | 0px | — | No spacing |
| 2XS | 4px | `p-1`, `m-1` | Tight: icon padding |
| XS | 8px | `p-2`, `m-2` | Small: badge padding |
| SM | 12px | `p-3`, `m-3` | Compact: tight cards |
| MD *(default)* | 16px | `p-4`, `m-4` | Standard: form fields |
| LG | 24px | `p-6`, `m-6` | Cards, sections |
| XL | 32px | `p-8`, `m-8` | Large: card padding on desktop |
| 2XL | 48px | `p-12`, `m-12` | Sections: vertical padding |
| 3XL | 64px | `p-16`, `m-16` | Large sections |

---

## Common Patterns

### Card Padding

```tsx
// Standard card
<div className="p-6">               // 24px all sides
<div className="p-6 sm:p-8">        // 24px mobile, 32px desktop

// Tight card (stats, badges)
<div className="p-3 sm:p-4">        // 12px mobile, 16px desktop

// Large content card
<div className="p-8 sm:p-10 lg:p-12">
```

### Section Spacing

```tsx
// Standard section vertical padding
<section className="py-12 sm:py-16 lg:py-24">
// Mobile: 48px | Tablet: 64px | Desktop: 96px

// Compact section
<section className="py-8 sm:py-12 lg:py-16">

// Hero section
<section className="py-16 sm:py-24 lg:py-32">
```

### Element Gaps (Flex/Grid)

```tsx
// Standard element gap
<div className="flex gap-4">        // 16px
<div className="flex gap-6">        // 24px

// Card grid gap
<div className="grid gap-4 sm:gap-6">   // 16px → 24px

// Tight list items
<ul className="space-y-2">         // 8px between items
<ul className="space-y-4">         // 16px between items
```

### Form Field Spacing

```tsx
// Between form fields
<div className="space-y-4">        // 16px gap
<div className="space-y-6">        // 24px gap

// Label to input
<label className="mb-2 block">

// Input to hint text
<p className="mt-2 text-xs">

// Between form sections
<div className="mt-8">             // 32px gap
```

---

## Container Max Widths

```tsx
// Form containers
<div className="max-w-sm">          // 384px — Narrow (mobile-first forms)
<div className="max-w-md">          // 448px — Contact form
<div className="max-w-lg">          // 512px — Wide form
<div className="max-w-2xl">         // 672px — Rich content
<div className="max-w-4xl">         // 896px — Full-width form
<div className="max-w-6xl">         // 1152px — Content + sidebar
<div className="max-w-7xl">         // 1280px — Max container
```

---

## 8px Grid System

All spacing tokens are multiples of **4px or 8px**:

```
0   → 0px
1   → 4px  (half-unit)
2   → 8px  (base unit)
3   → 12px (1.5×)
4   → 16px (2×)
6   → 24px (3×)
8   → 32px (4×)
10  → 40px (5×)
12  → 48px (6×)
16  → 64px (8×)
20  → 80px (10×)
24  → 96px (12×)
```

---

## Negative Space Guidelines

### DO ✓

- Use spacing scale tokens — never arbitrary values
- Increase spacing at larger breakpoints (responsive)
- Use `gap` for flex/grid (not `margin` between children)
- Give interactive elements generous padding (min 44px touch targets)

### DON'T ✗

- Mix arbitrary px values with tokens
- Use identical spacing for all breakpoints
- Crowd elements — whitespace is a design element
- Use `margin` between grid/flex children (use `gap`)

---

## Responsive Spacing Pattern

```tsx
// The standard VLN responsive spacing pattern:
// → More breathing room at larger screen sizes

// Horizontal container padding
className="px-4 sm:px-6 lg:px-8"
// Mobile: 16px | Tablet: 24px | Desktop: 32px

// Vertical section padding
className="py-12 sm:py-16 lg:py-24"
// Mobile: 48px | Tablet: 64px | Desktop: 96px

// Component gaps in a grid
className="gap-4 sm:gap-6 lg:gap-8"
// Mobile: 16px | Tablet: 24px | Desktop: 32px
```
