---
title: Responsive Breakpoints
description: VLN mobile-first responsive breakpoints — Tailwind CSS breakpoint system and usage patterns
---

> Migrated from Fused-Gaming/DevOps design-standards

VLN's responsive design system uses **Tailwind CSS default breakpoints** with a **mobile-first approach**.

---

## Breakpoint Reference

| Token | Width | Device Target |
|-------|-------|--------------|
| *(default)* | 0px | Mobile phones (portrait) |
| `sm:` | 640px | Mobile landscape, small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops, small desktops |
| `xl:` | 1280px | Desktops (VLN max container) |
| `2xl:` | 1536px | Large displays (rarely used at VLN) |

---

## Core Principle: Mobile-First

Write **base styles for small screens**, then use breakpoint prefixes to enhance for larger screens. Never the reverse.

```tsx
// CORRECT: mobile-first
<div className="p-4 md:p-8">
  // p-4 on mobile, p-8 on tablet+

// INCORRECT: desktop-first
<div className="p-8 max-sm:p-4">
  // Avoid this pattern
```

---

## Common Responsive Patterns

### Grids

```tsx
// 1 col → 2 col → 4 col
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

// 1 col → 3 col
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// Stats grid (2×4 → 4×2)
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
```

### Typography

```tsx
// Hero heading
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">

// Section heading
<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">

// Body text
<p className="text-base sm:text-lg">
```

### Spacing

```tsx
// Container padding
<div className="px-4 sm:px-6 lg:px-8">

// Section vertical padding
<section className="py-12 sm:py-16 lg:py-24">

// Gaps
<div className="gap-4 sm:gap-6 lg:gap-8">
```

### Layout (Sidebar Pattern)

```tsx
<div className="flex flex-col md:flex-row">
  <aside className="w-full md:w-64 shrink-0">
    {/* Sidebar */}
  </aside>
  <main className="flex-1 min-w-0">
    {/* Content */}
  </main>
</div>
```

### Buttons

```tsx
// Full-width on mobile, auto on desktop
<Button className="w-full sm:w-auto">
  Get Started
</Button>

// Side-by-side CTAs: stacked on mobile
<div className="flex flex-col sm:flex-row gap-4">
  <Button>Primary</Button>
  <Button variant="secondary">Secondary</Button>
</div>
```

---

## VLN-Specific Responsive Behaviors

| Component | Mobile | Desktop |
|-----------|--------|---------|
| Hero CTAs | Stacked (col) | Side by side (row) |
| Trust badges | 2×2 grid | 3 inline |
| Stats grid | 2 columns | 4 columns |
| Service pillars | 1 column | 4 columns |
| Navigation | Hamburger menu | Horizontal nav |
| Testimonials | Scroll | 3 side by side |
| Comparison table | Horizontal scroll | Full width |
| Pricing tiers | Stacked | Side by side |
| Employee cards | 1 col | 3 col grid |

---

## Touch Targets

All interactive elements must meet minimum **44×44px** touch target on mobile:

```tsx
// Button minimum size
<Button className="min-h-[44px] px-4">

// Icon button with touch target
<button className="p-3 rounded-lg">
  <Icon className="w-5 h-5" />
</button>
// 12px padding × 2 + 20px icon = 44px ✓
```

---

## Testing

### Browser DevTools

`Cmd + Shift + M` (Mac) or `Ctrl + Shift + M` (Windows) in Chrome DevTools opens responsive testing mode.

### Test at These Widths

| Width | Device |
|-------|--------|
| 320px | iPhone SE (smallest common) |
| 375px | iPhone 12/13 |
| 414px | iPhone Plus |
| 768px | iPad portrait |
| 1024px | iPad landscape / laptop |
| 1280px | Desktop |

### Best Practices

- Test on **actual devices** not only browser emulation
- Check both **portrait and landscape** orientation
- Verify **thumb zones** — interactive elements should be reachable with one thumb
- Avoid **hover-only** interactions (mobile has no hover state)
- Use **Next.js Image** with responsive `sizes` attribute
