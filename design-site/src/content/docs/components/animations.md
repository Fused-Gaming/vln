---
title: Animation System
description: Performance-optimized animation guidelines for VLN — CSSFade, Counter, StaggerFade, IC Board Background
---

> Performance-Optimized Animation Guidelines

---

## Animation Philosophy

1. **Performance First** — GPU-accelerated, 60fps guaranteed
2. **Subtle & Professional** — No flashy effects, research lab aesthetic
3. **Purpose-Driven** — Every animation serves a UX purpose
4. **Accessibility** — Respect `prefers-reduced-motion`

---

## Animation Types

### 1. CSS-Based Animations (Preferred)

**When to use:** Simple fades, slides, scales, hover effects, transitions under 600ms.

```tsx
import CSSFade from '@/components/animations/css-fade';

<CSSFade direction="up" delay={200}>
  <div>Content fades in from bottom</div>
</CSSFade>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'up' \| 'down' \| 'left' \| 'right' \| 'none'` | `'up'` | Slide direction |
| `delay` | `number` | `0` | Delay in ms |
| `duration` | `number` | `600` | Duration in ms |
| `once` | `boolean` | `true` | Animate once only |

---

### 2. Counter Animations

**When to use:** Trust metrics, numerical achievements, dynamic counts.

```tsx
import Counter from '@/components/animations/counter';

<Counter
  end={47}
  duration={2000}
  decimals={0}
  prefix=""
  suffix=" Vulns"
/>
```

**Performance:** Uses `requestAnimationFrame`, cubic-bezier ease-out, triggers on viewport intersection.

---

### 3. Stagger Animations

**When to use:** Card grids, list items, sequential reveals.

```tsx
import StaggerFade from '@/components/animations/stagger-fade';

<StaggerFade staggerDelay={100}>
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</StaggerFade>
```

---

### 4. Background Animations

**IC Board Background** — Canvas-based circuit board simulation.

```tsx
import ICBoardBackground from '@/components/vln/ic-board-background';

<div className="relative">
  <ICBoardBackground />
  <div className="relative z-10">{/* Content */}</div>
</div>
```

**Features:**
- Horizontal data buses, vertical interconnects, diagonal traces
- IC chips, capacitors, resistors
- 3-color system (sage, blue, purple)
- 20% opacity overlay
- 60fps locked via `requestAnimationFrame`
- CPU/GPU usage < 5%

---

## Performance Guidelines

### Rule 1: Prefer CSS Over JS

```tsx
// GOOD: CSS transition
<div className="transition-all duration-300 hover:scale-105">

// AVOID: Framer Motion for simple effect
<motion.div whileHover={{ scale: 1.05 }}>
```

### Rule 2: GPU-Accelerated Properties Only

| Fast (use these) | Slow (avoid) |
|------------------|--------------|
| `transform: translate3d()` | `top`, `left`, `width`, `height` |
| `transform: scale()` | `margin`, `padding` |
| `transform: rotate()` | Layout properties |
| `opacity` | — |

### Rule 3: Use Intersection Observer

```tsx
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => entry.isIntersecting && setIsVisible(true),
    { threshold: 0.1 }
  );
  observer.observe(ref.current);
}, []);
```

### Rule 4: Respect User Preferences

```tsx
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const variants = {
  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
  visible: { opacity: 1, y: 0 },
};
```

---

## Animation Timings

| Category | Duration | Use Case |
|----------|----------|----------|
| Instant | 100–150ms | Tooltips, dropdowns |
| Quick | 200–300ms | Hovers, highlights |
| Standard | 400–600ms | Fades, slides |
| Slow | 800–1200ms | Page transitions |

**Easing Functions:**
- `ease-out` — Most animations (feels snappy)
- `ease-in-out` — Symmetrical movements
- `cubic-bezier(0.4, 0, 0.2, 1)` — Custom VLN ease

---

## Component Reference

| Component | File | Purpose |
|-----------|------|---------|
| `CSSFade` | `/components/animations/css-fade.tsx` | Lightweight fade with direction |
| `Counter` | `/components/animations/counter.tsx` | Animated number counting |
| `StaggerFade` | `/components/animations/stagger-fade.tsx` | Sequential list animations |
| `ICBoardBackground` | `/components/vln/ic-board-background.tsx` | Futuristic circuit board |

---

## Best Practices

### DO ✓

- Use CSS animations for simple effects
- Trigger animations on scroll (Intersection Observer)
- Keep durations under 600ms
- Test on mobile/slow devices
- Use `will-change` sparingly (only during animation)

### DON'T ✗

- Animate layout properties (width, height, top, left)
- Use Framer Motion for simple fades
- Animate on every scroll pixel
- Nest multiple animated components deeply
- Forget to cleanup (`cancelAnimationFrame`, observers)

---

## Testing Checklist

- [ ] 60fps on desktop (Chrome DevTools Performance)
- [ ] 30fps minimum on mobile (iPhone SE)
- [ ] No layout shifts (Lighthouse CLS < 0.1)
- [ ] Respects `prefers-reduced-motion`
- [ ] No jank on slow 3G network
- [ ] GPU usage < 10% idle

---

## Examples from Homepage

```tsx
// Hero Fade-In
<CSSFade direction="up" delay={0}>
  <h1>Your Contract Has Bugs</h1>
</CSSFade>

// Stats Counter
<Counter end={47} suffix=" Vulns" duration={2000} />

// Service Cards Stagger
<StaggerFade staggerDelay={150}>
  {services.map(service => <ServiceCard {...service} />)}
</StaggerFade>
```
