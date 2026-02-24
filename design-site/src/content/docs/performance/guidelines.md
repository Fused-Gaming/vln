---
title: Performance Guidelines
description: 17-rule performance guide for VLN — animations, images, bundle optimization, and Core Web Vitals
---

> Building Fast, Smooth, Conversion-Focused Experiences

---

## Performance Philosophy

**Every millisecond counts for conversion:**
- 1-second delay = 7% reduction in conversions
- 3-second load time = 40% of users abandon
- Slow animations = unprofessional perception

**Our Standards:**

| Metric | Target |
|--------|--------|
| Lighthouse Score | **90+** |
| LCP (Largest Contentful Paint) | **< 2.5s** |
| FID (First Input Delay) | **< 100ms** |
| CLS (Cumulative Layout Shift) | **< 0.1** |
| Bundle Size (initial JS) | **< 300KB** |

---

## Animation Performance

### Rule 1: Prefer CSS Over JavaScript

```css
/* GPU-accelerated, 60fps guaranteed */
.glow-lift {
  transition: box-shadow 300ms ease-out;
  will-change: box-shadow;
}
.glow-lift:hover {
  box-shadow: 0 0 12px #86d993;
}
```

**Avoid** Framer Motion for simple fades — it adds ~50KB for a trivial animation. Use:

```tsx
<div className="animate-fadeIn"> {/* CSS instead */}
```

---

### Rule 2: Use Framer Motion Only for Complex Interactions

**Use Framer Motion for:**
- Scroll-linked animations (parallax)
- Gesture-based interactions (drag, swipe)
- Coordinated multi-element animations
- Physics-based springs

**Don't use for:** hover effects, page fades, spinners, simple enter/exit.

---

### Rule 3: Optimize Canvas Animations

**PCB Trace Background guidelines:**
- Limit to ≤ 8 traces, ≤ 12 nodes
- Use `requestAnimationFrame` (not `setInterval`)
- Clear with low-opacity fill (creates trails, reduces redraws)
- Avoid shadows on canvas (expensive)
- Use integer coordinates

---

### Rule 4: Lazy Load Heavy Animations

```tsx
import dynamic from 'next/dynamic';

const HeavyAnimation = dynamic(
  () => import('@/components/vln/heavy-animation'),
  { ssr: false }
);
```

Combine with Intersection Observer so animations only start when visible.

---

## Image Optimization

### Rule 5: Always Use `next/image`

```tsx
import Image from 'next/image';

<Image
  src="/vln-logo-dark.svg"
  width={164}
  height={40}
  alt="VLN.gg"
  priority  // Only for above-the-fold images
/>
```

Benefits: automatic WebP/AVIF, lazy loading, responsive srcset, prevents layout shift.

---

### Rule 6: Image Size Guidelines

| Type | Budget | Format |
|------|--------|--------|
| Hero images | < 200KB | WebP |
| Thumbnails | < 50KB | WebP |
| Icons | < 5KB | SVG |
| Logos | Any | SVG |

Compression: SVGO for SVG, Squoosh for raster, `sharp` for batch processing.

---

## Bundle Optimization

### Rule 7: Tree Shake Heavy Libraries

```tsx
// GOOD: 5KB
import { Search, BarChart3, Zap } from 'lucide-react';

// BAD: 500KB
import * as Icons from 'lucide-react';
```

Use dynamic imports for modal or heavy components loaded on user action.

---

### Rule 8: Monitor Bundle Size

**Budgets:**
- Initial JS: < 300KB
- Initial CSS: < 50KB
- Total page weight: < 1MB

```bash
pnpm build
npx @next/bundle-analyzer
```

---

## Framer Motion Best Practices

### Rule 9: Respect `prefers-reduced-motion`

```tsx
import { useReducedMotion } from 'framer-motion';

const prefersReducedMotion = useReducedMotion();

const variants = {
  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
  visible: { opacity: 1, y: 0 },
};
```

---

### Rule 10: Prevent Unnecessary Re-renders

```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={variants}
>
```

Avoid `useTransform` + `useScroll` unless needed for parallax — it fires on every scroll pixel.

---

## CSS Performance

### Rule 11: GPU-Accelerated Properties Only

| Fast (GPU) | Slow (CPU) |
|------------|------------|
| `transform: translate3d()` | `top`, `left`, `right`, `bottom` |
| `transform: scale()` | `width`, `height` |
| `transform: rotate()` | `margin`, `padding` |
| `opacity` | — |

```css
/* BAD: Forces layout recalculation */
.slide-in { transition: left 300ms; left: 0; }

/* GOOD: GPU-accelerated */
.slide-in { transition: transform 300ms; transform: translateX(0); }
```

---

### Rule 12: Minimize Reflows

```tsx
// BAD: 3 reflows
el.style.width = '100px';
el.style.height = '100px';
el.style.padding = '20px';

// GOOD: 1 reflow
el.className = 'my-class';
```

Use `will-change` only on elements that will animate, and remove it after.

---

## Font Loading

### Rule 13: Use Next.js Font Optimization

```tsx
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
```

Self-hosted, auto-subsetted, no layout shift.

---

### Rule 14: Preload Critical Fonts

```tsx
<link
  rel="preload"
  href="/fonts/inter-var.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

Only for fonts used above the fold.

---

## Testing & Monitoring

### Rule 15: Test on Real Devices

**Test matrix:**
- Mobile: iPhone SE (slow device)
- Tablet: iPad
- Desktop: Standard laptop
- Network: Slow 3G, Fast 3G, 4G

Tools: Chrome DevTools Performance tab, Lighthouse CI, WebPageTest.

---

### Rule 16: Performance Budgets (Lighthouse CI)

```json
{
  "budgets": [
    {
      "resourceSizes": [
        { "resourceType": "script", "budget": 300 },
        { "resourceType": "stylesheet", "budget": 50 },
        { "resourceType": "image", "budget": 500 }
      ],
      "timings": [
        { "metric": "interactive", "budget": 3000 },
        { "metric": "first-contentful-paint", "budget": 1500 }
      ]
    }
  ]
}
```

---

## Conversion-Specific Optimizations

### Rule 17: Prioritize Above-the-Fold Content

**Critical Rendering Path:**
1. Hero section (HTML + inline CSS)
2. Primary CTA visible immediately
3. Trust badges/stats (no JS required)
4. Defer everything else

**Core Web Vitals checklist:**

| Vital | Action |
|-------|--------|
| LCP | Hero image < 200KB, use `priority` prop, inline critical CSS |
| FID | Defer non-essential JS, minimize main thread work |
| CLS | Always specify image dimensions, reserve space for dynamic content |

---

## Pre-Deploy Checklist

- [ ] Lighthouse score > 90
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Bundle size < 300KB
- [ ] All images WebP/AVIF
- [ ] Fonts preloaded
- [ ] Animations use GPU-accelerated properties
- [ ] No layout shifts
- [ ] Tested on slow 3G / iPhone SE

---

## Quick Wins

1. Replace Framer Motion fades with CSS
2. Lazy load below-fold components
3. Optimize images with Squoosh
4. Add `loading="lazy"` to non-critical images
5. Preload hero image
6. Inline critical CSS
7. Defer non-critical JS
8. Use `next/image` everywhere
