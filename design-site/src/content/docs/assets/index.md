---
title: Design Assets & Patterns
description: Reusable design elements, icons, gradients, layout patterns, and the VLN asset library
---

> Reusable design elements, patterns, and guidelines

---

## Icon System

**Provider:** [Lucide React](https://lucide.dev/icons/) — tree-shakeable, 2–5KB per icon, consistent design language.

```bash
pnpm add lucide-react
```

```tsx
import { Search, ShieldCheck, DollarSign } from 'lucide-react';

<Search className="w-5 h-5 text-vln-sage" />
```

---

## Core Icons Reference

### Navigation & UI

| Icon | Name | Usage |
|------|------|-------|
| ☰ | `Menu` | Mobile navigation toggle |
| × | `X` | Close modals/dialogs |
| ⌄ | `ChevronDown` | Dropdowns, accordions |
| → | `ArrowRight` | CTAs, links, navigation |
| ✓ | `Check` | Checkmarks, completed items |

### Brand & Services

| Icon | Name | Usage | Color |
|------|------|-------|-------|
| 🔍 | `Search` | Vulnerability discovery | Sage |
| 🛡️ | `Shield`, `ShieldCheck` | Prevention, security | Sage/Purple |
| 💰 | `DollarSign` | Funds recovered | Blue |
| 🚨 | `Siren` | Emergency forensics | Amber |
| 🎓 | `GraduationCap` | Training workshops | Blue |
| 📚 | `BookOpen` | Education (VISE) | Purple |
| ⚠️ | `AlertCircle` | Urgency, warnings | Amber |

### Social Proof

| Icon | Name | Usage | Color |
|------|------|-------|-------|
| ⭐ | `Star` | Ratings | Amber (filled) |
| ✓ | `Check` | Verified badges | Sage |
| 👤 | `User` | Testimonial avatars | Gray |

### Technical

| Icon | Name | Usage | Color |
|------|------|-------|-------|
| ⚡ | `Zap` | Performance, speed | Amber |
| 📊 | `BarChart3` | Analytics, metrics | Blue |
| 🔗 | `Link` | External links | Gray |

---

## Color Palette Quick Reference

```tsx
// Tailwind utility classes
className="text-vln-sage"       // #86d993
className="text-vln-bluegray"   // #7dd3fc
className="text-vln-amber"      // #fbbf24
className="text-vln-purple"     // #c084fc

className="bg-vln-bg"           // #0a0e0f
className="bg-vln-bg-light"     // #151a1c
className="bg-vln-bg-lighter"   // #1f2527

className="text-vln-white"      // #f8f9fa
className="text-vln-gray"       // #cbd5e1
className="text-vln-gray-dark"  // #94a3b8
```

---

## Gradient System

### Text Gradients

```tsx
className="text-gradient-sage"    // Sage light → dark
className="text-gradient-blue"    // Blue light → dark
className="text-gradient-rainbow" // Sage → Blue → Purple
```

### Background Gradients

```tsx
className="bg-gradient-subtle"    // Charcoal → Light charcoal
className="bg-gradient-vibrant"   // Charcoal → Sage glow → Charcoal
```

### Custom Gradients

```tsx
// Radial (glow effects)
const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
gradient.addColorStop(0, 'rgba(134, 217, 147, 0.8)');
gradient.addColorStop(1, 'rgba(134, 217, 147, 0)');

// Linear (section backgrounds)
className="bg-gradient-to-br from-vln-bg via-vln-sage/5 to-vln-bg"
```

---

## Shadow / Glow System

```tsx
className="glow-lift"        // Sage glow on hover
className="glow-lift-blue"   // Blue glow on hover
className="glow-lift-amber"  // Amber glow on hover
className="glow-lift-purple" // Purple glow on hover
```

```css
.glow-lift {
  transition: all 300ms ease-out;
  box-shadow: 0 0 0 rgba(134, 217, 147, 0);
}
.glow-lift:hover {
  box-shadow: 0 0 12px #86d993;
}
```

---

## Typography Scale

### Headings

```tsx
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
  // Hero: 28px → 36px → 48px → 56px

<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
  // Section: 24px → 30px → 40px

<h3 className="text-2xl font-bold">
  // Subsection: 20px
```

### Body Text

```tsx
<p className="text-base sm:text-lg">  // 16px → 18px
<p className="text-sm">               // 14px
<p className="text-xs">               // 12px
```

### Font Weights

| Weight | Usage |
|--------|-------|
| Bold | Headings, CTAs, important stats |
| Semibold | Buttons, labels |
| Medium | Body text, descriptions |
| Regular | Paragraphs, tertiary text |

---

## Spacing System

### Padding/Margin Scale

```tsx
p-3   // 12px
p-4   // 16px
p-6   // 24px
p-8   // 32px
p-12  // 48px
p-16  // 64px
p-24  // 96px
```

### Section Spacing

```tsx
className="py-12 sm:py-16 lg:py-24"
// Mobile: 48px | Tablet: 64px | Desktop: 96px
```

---

## Border Radius

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-vln` | 12px | Brand standard |
| `rounded-full` | 9999px | Circles, pills |
| `rounded-md` | 6px | Subtle |
| `rounded-lg` | 8px | Medium |

---

## Button Variants

### Sizes

```tsx
size="sm"  // px-4 py-2 text-sm
size="md"  // px-6 py-3 text-base
size="lg"  // px-8 py-4 text-lg
size="xl"  // px-10 py-5 text-xl  (hero CTAs)
```

### Variants

```tsx
variant="primary"    // Sage background, dark text
variant="secondary"  // Sage border, sage text, transparent
variant="ghost"      // Sage text, transparent, hover bg
variant="danger"     // Red background (use sparingly)
```

### Examples

```tsx
// Primary CTA
<Button variant="primary" size="xl" href="/contact">
  Start Free 30-Min Scan
</Button>

// Secondary CTA
<Button variant="secondary" size="lg" href="/services">
  View All Services
</Button>

// Urgent action
<Button variant="secondary" size="xl"
  className="border-vln-amber text-vln-amber hover:bg-vln-amber/10 glow-lift-amber">
  <Siren className="w-5 h-5" />
  24/7 Emergency Forensics
</Button>
```

---

## Card Patterns

### Basic Card

```tsx
<div className="p-6 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light glow-lift">
  {/* Content */}
</div>
```

### Stat Card

```tsx
<div className="p-6 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light
  transition-all duration-300 hover:-translate-y-1 glow-lift">
  <div className="text-4xl font-bold text-vln-sage">47</div>
  <p className="text-vln-gray">Critical Vulns Discovered</p>
</div>
```

### Service Card

```tsx
<div className="p-8 rounded-vln border-2 border-vln-sage/20 bg-vln-bg-light
  hover:-translate-y-1 glow-lift">
  <ShieldIcon className="w-8 h-8 text-vln-sage mb-4" />
  <h3 className="text-2xl font-bold mb-2">Prevention</h3>
  <p className="text-vln-gray mb-6">Smart Contract Audits</p>
  <Button variant="primary" size="md">Start Free Scan</Button>
</div>
```

---

## Common UI Patterns

### Trust Badge

```tsx
<div className="flex items-center gap-2 p-3 rounded-vln
  bg-vln-bg-light/80 border border-vln-sage/20">
  <Search className="w-5 h-5 text-vln-sage" />
  <span className="text-sm font-medium text-vln-white">
    47 Critical Vulns Found
  </span>
</div>
```

### Verified Badge

```tsx
<span className="inline-flex items-center gap-1 px-2 py-1 rounded-md
  bg-vln-sage/10 text-vln-sage text-xs font-medium">
  ✓ Verified Client
</span>
```

### Rating Stars

```tsx
{Array.from({ length: 5 }).map((_, i) => (
  <Star
    key={i}
    className={cn(
      'w-5 h-5',
      i < rating ? 'fill-vln-amber text-vln-amber' : 'text-vln-gray-dark'
    )}
  />
))}
```

---

## Background Patterns

### IC Board Animation

```tsx
import ICBoardBackground from '@/components/vln/ic-board-background';

<div className="relative">
  <ICBoardBackground />
  <div className="relative z-10">{/* Content */}</div>
</div>
```

**Features:**
- Futuristic circuit traces with animated electrical signals
- 3-color system (sage, blue, purple)
- Horizontal data buses, vertical interconnects, IC components
- 60fps performance, 20% opacity overlay

---

## Responsive Breakpoints

| Breakpoint | Width | Common Use |
|------------|-------|------------|
| `sm:` | 640px | Mobile landscape, small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Wide desktop (max container) |

```tsx
// Grid example
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

// Responsive text
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
```

---

## Layout Containers

```tsx
// Standard (1280px max)
<div className="container mx-auto px-4 sm:px-6">

// Narrow (prose, forms)
<div className="max-w-2xl mx-auto">

// Wide (stats grid, services)
<div className="max-w-7xl mx-auto">
```

---

## Static Asset Inventory

| Asset | Path | Notes |
|-------|------|-------|
| Logo (dark) | `/public/vln-logo-dark.svg` | Primary, dark backgrounds |
| Logo (light) | `/public/vln-logo-light.svg` | Light backgrounds |
| Placeholder avatar | `/public/placeholder-avatar.svg` | Employee cards |
| Hero image | `/public/VLN-Hero.png` | Homepage |
| Circuit board OG | `/public/circuit-board-og.svg` | OG fallback |

---

## Asset Checklist

When creating new assets:

- [ ] Uses VLN color palette
- [ ] Follows 12px border radius
- [ ] Uses Lucide icons (no emojis)
- [ ] Mobile-responsive (320px+)
- [ ] WCAG AAA contrast (19:1)
- [ ] GPU-accelerated animations
- [ ] Documented in this guide

---

## Export Guidelines

### Designers → Developers
1. Use VLN color tokens (not raw hex)
2. Follow 12px border radius (`rounded-vln`)
3. Use Lucide icons (not custom SVGs unless necessary)
4. Maintain 8px spacing grid
5. Test 320px minimum width

### Developers → Assets
1. Extract reusable components
2. Use Tailwind utilities (avoid custom CSS)
3. Document new patterns here
4. Optimize images (WebP, lazy loading)
5. Test Lighthouse > 90

---

## Related Sections

- [Color System](/tokens/colors)
- [Animation System](/components/animations)
- [Performance Guidelines](/performance/guidelines)
