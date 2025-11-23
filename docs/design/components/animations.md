# VLN Animation System

> Performance-Optimized Animation Guidelines

---

## Animation Philosophy

**Principles:**
1. **Performance First** - GPU-accelerated, 60fps guaranteed
2. **Subtle & Professional** - No flashy effects, research lab aesthetic
3. **Purpose-Driven** - Every animation serves a UX purpose
4. **Accessibility** - Respect `prefers-reduced-motion`

---

## Animation Types

### 1. CSS-Based Animations (Preferred)

**When to use:**
- Simple fades, slides, scales
- Hover effects
- Loading states
- Transitions under 600ms

**Example:**
```tsx
import CSSFade from '@/components/animations/css-fade';

<CSSFade direction="up" delay={200}>
  <div>Content fades in from bottom</div>
</CSSFade>
```

**Props:**
- `direction`: 'up' | 'down' | 'left' | 'right' | 'none'
- `delay`: number (ms)
- `duration`: number (ms, default 600)
- `once`: boolean (default true)

---

### 2. Counter Animations

**When to use:**
- Trust metrics (stats)
- Numerical achievements
- Dynamic counts

**Example:**
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

**Performance:**
- Uses `requestAnimationFrame`
- Easing: cubic-bezier ease-out
- Triggers on viewport intersection

---

### 3. Stagger Animations

**When to use:**
- Card grids
- List items
- Sequential reveals

**Example:**
```tsx
import StaggerFade from '@/components/animations/stagger-fade';

<StaggerFade staggerDelay={100}>
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</StaggerFade>
```

---

### 4. Background Animations

**IC Board Background:**
- Canvas-based for performance
- Simulates electrical signals on IC pathways
- 3-color system (sage, blue, purple)
- 20% opacity overlay

**Components:**
- Horizontal data buses
- Vertical interconnects
- Diagonal traces
- IC chips, capacitors, resistors

**Performance:**
- 60fps locked
- Low CPU/GPU usage (<5%)
- Uses `requestAnimationFrame`
- Minimal redraws with trail fade

---

## Performance Guidelines

### Rule 1: Prefer CSS Over JS

```tsx
// ✓ GOOD: CSS transition
<div className="transition-all duration-300 hover:scale-105">

// ✗ BAD: Framer Motion for simple effect
<motion.div whileHover={{ scale: 1.05 }}>
```

### Rule 2: GPU-Accelerated Properties Only

**Fast (use these):**
- `transform: translate3d()`
- `transform: scale()`
- `transform: rotate()`
- `opacity`

**Slow (avoid):**
- `top`, `left`, `width`, `height`
- `margin`, `padding`

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

### Durations
- **Instant:** 100-150ms (tooltips, dropdowns)
- **Quick:** 200-300ms (hovers, highlights)
- **Standard:** 400-600ms (fades, slides)
- **Slow:** 800-1200ms (page transitions)

### Easing Functions
- **ease-out:** Most animations (feels snappy)
- **ease-in-out:** Symmetrical movements
- **cubic-bezier(0.4, 0, 0.2, 1):** Custom VLN ease

---

## Component Reference

### CSSFade
**Purpose:** Lightweight fade with optional direction
**File:** `/components/animations/css-fade.tsx`
**Performance:** Intersection Observer + CSS transitions

### Counter
**Purpose:** Animated number counting
**File:** `/components/animations/counter.tsx`
**Performance:** requestAnimationFrame, eased

### StaggerFade
**Purpose:** Sequential fade-in for lists
**File:** `/components/animations/stagger-fade.tsx`
**Performance:** CSS delay-based stagger

### ICBoardBackground
**Purpose:** Futuristic circuit board animation
**File:** `/components/vln/ic-board-background.tsx`
**Performance:** Canvas API, 60fps locked

---

## Best Practices

### DO ✓

- Use CSS animations for simple effects
- Trigger animations on scroll with Intersection Observer
- Keep animation durations under 600ms
- Test on mobile/slow devices
- Use `will-change` sparingly (only during animation)
- Batch DOM changes

### DON'T ✗

- Animate layout properties (width, height, top, left)
- Use Framer Motion for simple fades
- Animate on every scroll pixel
- Nest multiple animated components deeply
- Forget to cleanup (cancelAnimationFrame, observers)
- Use `will-change: auto` on static elements

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

### Hero Fade-In
```tsx
<CSSFade direction="up" delay={0}>
  <h1>Your Contract Has Bugs</h1>
</CSSFade>
```

### Stats Counter
```tsx
<Counter end={47} suffix=" Vulns" duration={2000} />
```

### Service Cards Stagger
```tsx
<StaggerFade staggerDelay={150}>
  {services.map(service => <ServiceCard {...service} />)}
</StaggerFade>
```

---

## Resources

- [CSS Animations MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [GPU-Accelerated Compositing](https://www.chromium.org/developers/design-documents/gpu-accelerated-compositing-in-chrome/)
