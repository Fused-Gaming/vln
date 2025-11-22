# VLN Performance Guidelines

> Building Fast, Smooth, Conversion-Focused Experiences

---

## Performance Philosophy

**Every millisecond counts for conversion:**
- 1-second delay = 7% reduction in conversions
- 3-second load time = 40% of users abandon
- Slow animations = unprofessional perception

**Our Standards:**
- Lighthouse Score: **90+**
- LCP (Largest Contentful Paint): **< 2.5s**
- FID (First Input Delay): **< 100ms**
- CLS (Cumulative Layout Shift): **< 0.1**
- Bundle Size: **< 300KB** (initial JS)

---

## Animation Performance

### Rule 1: Prefer CSS Over JavaScript

**DO ✓ Use CSS for Simple Animations:**
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

**DON'T ✗ Use Framer Motion for Simple Fades:**
```tsx
// Adds 50KB to bundle for a simple fade
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
```

**Instead, use CSS:**
```tsx
<div className="animate-fadeIn">
```

---

### Rule 2: Use Framer Motion ONLY for Complex Interactions

**When to Use Framer Motion:**
- Scroll-linked animations (parallax)
- Gesture-based interactions (drag, swipe)
- Coordinated multi-element animations
- Physics-based springs

**When NOT to Use:**
- Simple hover effects → CSS
- Page transitions → CSS or View Transitions API
- Loading spinners → CSS keyframes
- Fade in/out → CSS transitions

---

### Rule 3: Optimize Canvas Animations

**PCB Trace Background - Current Implementation:**
```tsx
// ✓ GOOD: Uses canvas for complex particle systems
const PCBTraceBackground = () => {
  // 8 traces max (not 100+)
  // 12 nodes max (not 50+)
  // requestAnimationFrame with 0.05 fade (creates trails)
}
```

**Performance Checklist:**
- [ ] Limit particle count (< 20 for background effects)
- [ ] Use `requestAnimationFrame` (not `setInterval`)
- [ ] Clear with low opacity fill (creates trails, reduces redraws)
- [ ] Avoid shadows on canvas (very expensive)
- [ ] Use integer coordinates (faster rendering)

---

### Rule 4: Lazy Load Heavy Animations

**DO ✓ Load Animations Below the Fold Lazily:**
```tsx
import dynamic from 'next/dynamic';

// Don't load until user scrolls to it
const HeavyAnimation = dynamic(
  () => import('@/components/vln/heavy-animation'),
  { ssr: false }
);
```

**DO ✓ Use Intersection Observer:**
```tsx
const [shouldAnimate, setShouldAnimate] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      setShouldAnimate(true);
    }
  });
  observer.observe(ref.current);
}, []);
```

---

## Image Optimization

### Rule 5: Use Next.js Image Component

**DO ✓ Always Use `next/image`:**
```tsx
import Image from 'next/image';

<Image
  src="/vln-logo-dark.svg"
  width={164}
  height={40}
  alt="VLN.gg"
  priority // Only for above-the-fold images
/>
```

**Benefits:**
- Automatic WebP/AVIF conversion
- Lazy loading by default
- Responsive srcset generation
- Prevents layout shift

---

### Rule 6: Optimize Image Delivery

**Image Size Guidelines:**
- **Hero images:** < 200KB (WebP)
- **Thumbnails:** < 50KB
- **Icons:** Use SVG (< 5KB) or icon font
- **Logos:** SVG only

**Compression Tools:**
- SVG: SVGO
- PNG/JPG: Squoosh.app
- Batch: sharp (npm package)

---

## Bundle Optimization

### Rule 7: Tree Shake Heavy Libraries

**DO ✓ Import Only What You Need:**
```tsx
// ✓ GOOD: 5KB
import { Search, BarChart3, Zap } from 'lucide-react';

// ✗ BAD: 500KB
import * as Icons from 'lucide-react';
```

**DO ✓ Use Dynamic Imports for Heavy Components:**
```tsx
// Modal only loads when opened
const AuditModal = dynamic(() => import('./audit-modal'));
```

---

### Rule 8: Monitor Bundle Size

**Tools:**
```bash
# Analyze bundle
pnpm build
npx @next/bundle-analyzer

# Set size limits
# next.config.js
module.exports = {
  webpack: (config) => {
    config.performance = {
      maxAssetSize: 300000, // 300KB
      maxEntrypointSize: 300000,
    };
    return config;
  },
};
```

**Budget:**
- **Initial JS:** < 300KB
- **Initial CSS:** < 50KB
- **Total page weight:** < 1MB

---

## Framer Motion Best Practices

### Rule 9: Use Reduced Motion Variants

**DO ✓ Respect User Preferences:**
```tsx
import { useReducedMotion } from 'framer-motion';

const prefersReducedMotion = useReducedMotion();

const variants = {
  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
  visible: { opacity: 1, y: 0 },
};
```

---

### Rule 10: Optimize Re-renders

**DO ✓ Use `whileInView` with `once: true`:**
```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }} // Trigger before visible
  variants={variants}
>
```

**DON'T ✗ Animate Every Scroll Frame:**
```tsx
// ✗ BAD: Re-renders on every scroll pixel
const { scrollY } = useScroll();
const opacity = useTransform(scrollY, [0, 100], [1, 0]);
```

**DO ✓ Use Springs Sparingly:**
```tsx
// Springs are expensive - use for important interactions only
const smoothProgress = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
});
```

---

## CSS Performance

### Rule 11: Use GPU-Accelerated Properties

**GPU-Accelerated (Fast):**
- `transform: translate3d()`
- `transform: scale()`
- `transform: rotate()`
- `opacity`
- `filter` (use sparingly)

**CPU-Only (Slow):**
- `top`, `left`, `right`, `bottom`
- `width`, `height`
- `margin`, `padding`

**Example:**
```css
/* ✗ BAD: Forces layout recalculation */
.slide-in {
  transition: left 300ms;
  left: 0;
}

/* ✓ GOOD: GPU-accelerated */
.slide-in {
  transition: transform 300ms;
  transform: translateX(0);
}
```

---

### Rule 12: Minimize Reflows

**DO ✓ Batch DOM Changes:**
```tsx
// ✗ BAD: 3 reflows
el.style.width = '100px';
el.style.height = '100px';
el.style.padding = '20px';

// ✓ GOOD: 1 reflow
el.className = 'my-class';
```

**DO ✓ Use `will-change` Wisely:**
```css
/* Only for elements that WILL animate */
.glow-lift {
  will-change: box-shadow;
}

/* Remove after animation */
.glow-lift.animating {
  will-change: auto;
}
```

---

## Font Loading

### Rule 13: Optimize Font Delivery

**DO ✓ Use Next.js Font Optimization:**
```tsx
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT
  variable: '--font-inter',
});
```

**Benefits:**
- Self-hosted fonts (no external requests)
- Automatic subsetting
- `font-display: swap` (prevents invisible text)

---

### Rule 14: Preload Critical Fonts

```tsx
// Only for fonts used above the fold
<link
  rel="preload"
  href="/fonts/inter-var.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

---

## Testing & Monitoring

### Rule 15: Test on Real Devices

**Test Matrix:**
- **Mobile:** iPhone SE (slow device)
- **Tablet:** iPad
- **Desktop:** Standard laptop
- **Network:** Slow 3G, Fast 3G, 4G

**Tools:**
- Chrome DevTools Performance tab
- Lighthouse CI
- WebPageTest.org

---

### Rule 16: Set Performance Budgets

**Metrics to Track:**
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
1. Hero section (HTML + CSS inline)
2. Primary CTA visible immediately
3. Trust badges/stats (no JS required)
4. Defer everything else

**DO ✓ Inline Critical CSS:**
```tsx
// app/layout.tsx
<style>{criticalCSS}</style>
```

---

### Rule 18: Optimize for Core Web Vitals

**LCP (Largest Contentful Paint):**
- Hero image < 200KB
- Use `priority` on hero image
- Inline critical CSS

**FID (First Input Delay):**
- Defer non-essential JS
- Use web workers for heavy computation
- Minimize main thread work

**CLS (Cumulative Layout Shift):**
- Always specify image dimensions
- Reserve space for dynamic content
- Avoid injecting content above existing content

---

## Performance Checklist

Before deploying:

- [ ] Lighthouse score > 90
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Bundle size < 300KB
- [ ] All images WebP/AVIF
- [ ] Fonts preloaded
- [ ] Animations use GPU
- [ ] No layout shifts
- [ ] Tested on slow 3G

---

## Quick Wins

**Immediate Improvements:**
1. Replace Framer Motion fades with CSS
2. Lazy load below-fold components
3. Optimize images with Squoosh
4. Add `loading="lazy"` to images
5. Preload hero image
6. Inline critical CSS
7. Defer non-critical JS
8. Use `next/image` everywhere

---

## Resources

- **Next.js Performance:** https://nextjs.org/docs/app/building-your-application/optimizing
- **Web.dev Performance:** https://web.dev/performance/
- **Chrome DevTools:** https://developer.chrome.com/docs/devtools/performance/
- **Lighthouse:** https://developers.google.com/web/tools/lighthouse
