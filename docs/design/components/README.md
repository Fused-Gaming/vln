# VLN Component Library

Comprehensive documentation for all VLN design system components.

## Table of Contents

1. [Layout Components](#layout-components)
2. [UI Components](#ui-components)
3. [VLN Brand Components](#vln-brand-components)
4. [Animation Components](#animation-components)
5. [Utility Components](#utility-components)

---

## Layout Components

### Header
**Location:** `components/layout/header.tsx`

The main navigation header with responsive mobile menu.

**Props:** None

**Features:**
- Responsive hamburger menu for mobile
- Smooth transitions
- Active route highlighting
- VLN logo with link to home

**Usage:**
```tsx
import Header from "@/components/layout/header";

<Header />
```

**ASCII Mockup:**
```
┌─────────────────────────────────────────────────────┐
│ [VLN Logo]              Services  Pricing  Contact │
│                                         [Get Help] │
└─────────────────────────────────────────────────────┘
```

---

### Footer
**Location:** `components/layout/footer.tsx`

Multi-column footer with social links, site navigation, and legal links.

**Props:** None

**Sections:**
- Resources (About, Get Help, FAQ, Blog)
- Services (Audits, Pen Test, Development, Design, University)
- Legal (Terms, Privacy, Refunds)
- Connect (Social media icons)

**Usage:**
```tsx
import Footer from "@/components/layout/footer";

<Footer />
```

**ASCII Mockup:**
```
┌─────────────────────────────────────────────────────┐
│  RESOURCES     SERVICES        LEGAL       CONNECT  │
│  About Us      Audits          Terms       [GitHub] │
│  Get Help      Pen Test        Privacy     [LinkedIn]│
│  FAQ           Development     Refunds     [Twitter]│
│  Blog          Design                      [Discord]│
│                VLN University              [Telegram]│
│                                                      │
│  © 2025 VLN - Fused Gaming                         │
│  Vulnerability Lab Network                          │
└─────────────────────────────────────────────────────┘
```

---

## UI Components

### Button
**Location:** `components/ui/button.tsx`

Primary action button with multiple variants and sizes.

**Props:**
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  className?: string;
  children: React.ReactNode;
}
```

**Variants:**
- `primary`: Sage green with glow effect
- `secondary`: Border outline with hover effects

**Sizes:**
- `sm`: Small (px-4 py-2, text-sm)
- `md`: Medium (px-6 py-2.5, text-base)
- `lg`: Large (px-8 py-3, text-lg)
- `xl`: Extra Large (px-10 py-4, text-xl)

**Usage:**
```tsx
<Button variant="primary" size="lg" href="/contact">
  Get Started
</Button>
```

---

### Scroll to Top
**Location:** `components/ui/scroll-to-top.tsx`

Floating button that appears after scrolling 300px.

**Props:** None

**Features:**
- Auto-hide/show based on scroll position
- Smooth scroll to top
- Fixed positioning (bottom-right)
- Sage green color with hover glow

**Usage:**
```tsx
import ScrollToTop from "@/components/ui/scroll-to-top";

// Add in layout
<ScrollToTop />
```

---

### Cookie Consent Banner
**Location:** `components/ui/cookie-consent.tsx`

GDPR-compliant cookie consent banner.

**Props:** None

**Features:**
- localStorage persistence
- Link to privacy policy
- Dismissible
- Fixed bottom positioning

**Usage:**
```tsx
import CookieConsent from "@/components/ui/cookie-consent";

<CookieConsent />
```

**ASCII Mockup:**
```
┌──────────────────────────────────────────────────────┐
│ 🍪 We use cookies to improve your experience.       │
│    View our Privacy Policy                           │
│                                    [Accept] [Decline]│
└──────────────────────────────────────────────────────┘
```

---

## VLN Brand Components

### IC Board Background
**Location:** `components/vln/ic-board-background.tsx`

Animated integrated circuit board background effect.

**Props:** None

**Features:**
- Canvas-based animation
- Floating IC chips
- Connecting traces
- Performance optimized with requestAnimationFrame
- GPU-accelerated transforms

**Technical Details:**
- 15 animated IC chips
- Sage green (#a6c3a7) color scheme
- Responsive sizing
- Z-index: 0 (background layer)

**Usage:**
```tsx
import ICBoardBackground from "@/components/vln/ic-board-background";

<div className="relative">
  <ICBoardBackground />
  <main className="relative z-10">
    {/* Content */}
  </main>
</div>
```

---

### Stat Card
**Location:** `components/vln/stat-card.tsx`

Display key statistics with icons.

**Props:**
```typescript
interface StatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  color?: 'sage' | 'blue' | 'amber' | 'purple';
}
```

**Features:**
- Consistent height (min-h-[160px] sm:min-h-[180px])
- Color-coded borders and glows
- Icon background
- Responsive typography

**Usage:**
```tsx
<StatCard
  icon={Shield}
  value="47"
  label="Critical Vulnerabilities Found"
  color="sage"
/>
```

**ASCII Mockup:**
```
┌──────────────────┐
│ [Shield Icon]    │
│                  │
│    47            │
│ Critical Vulns   │
│   Found          │
└──────────────────┘
```

---

### Testimonial Card
**Location:** `components/vln/testimonial.tsx`

Client testimonial display with flex layout for equal heights.

**Props:**
```typescript
interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}
```

**Features:**
- Flexbox for consistent heights
- Quote with flex-grow
- Author attribution with mt-auto
- Sage green accent

**Usage:**
```tsx
<Testimonial
  quote="VLN identified a critical reentrancy vulnerability..."
  author="Alex Chen"
  role="CTO"
  company="DefiProtocol"
/>
```

**ASCII Mockup:**
```
┌───────────────────────────────┐
│ "VLN identified a critical    │
│  vulnerability that could     │
│  have cost us millions..."    │
│                               │
│ — Alex Chen                   │
│   CTO, DefiProtocol          │
└───────────────────────────────┘
```

---

## Animation Components

See [animations.md](./animations.md) for detailed animation documentation.

### CSSFade
**Location:** `components/animations/css-fade.tsx`

CSS-based fade-in animation with direction support.

**Props:**
```typescript
interface CSSFadeProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
}
```

**Directions:**
- `up`: Fade in from below (translateY: 30px → 0)
- `down`: Fade in from above (translateY: -30px → 0)
- `left`: Fade in from right (translateX: 30px → 0)
- `right`: Fade in from left (translateX: -30px → 0)
- `none`: Fade in without translation

**Usage:**
```tsx
<CSSFade delay={200} direction="up">
  <h1>Welcome to VLN</h1>
</CSSFade>
```

---

### StaggerFade
**Location:** `components/animations/stagger-fade.tsx`

Staggered animation for lists of elements.

**Props:**
```typescript
interface StaggerFadeProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}
```

**Usage:**
```tsx
<StaggerFade staggerDelay={150} className="grid md:grid-cols-2 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</StaggerFade>
```

---

## Utility Components

### Animation Context
**Location:** `lib/animation-context.tsx`

Global animation state management.

**Features:**
- localStorage persistence
- Toggle animations on/off
- React Context API

**Usage:**
```tsx
import { useAnimations } from "@/lib/animation-context";

const { animationsEnabled, toggleAnimations } = useAnimations();
```

---

## Design Tokens

### Colors

```css
/* Primary Brand Colors */
--vln-bg: #0f0f0f;           /* Matte Charcoal */
--vln-bg-light: #1a1a1a;     /* Lighter background */
--vln-white: #f5f5f5;        /* Soft Glow White */
--vln-gray: #b0b0b0;         /* Medium Gray */
--vln-gray-dark: #808080;    /* Dark Gray */

/* Accent Colors */
--vln-sage: #a6c3a7;         /* Sage Green - Primary Accent */
--vln-bluegray: #aab7c8;     /* Warm Blue-Gray - Secondary Accent */
--vln-amber: #f59e0b;        /* Amber - Warnings/Emergency */
--vln-purple: #a855f7;       /* Purple - Premium/Enterprise */
```

### Border Radius

```css
--vln-radius: 12px;          /* Standard border radius */
```

### Glow Effects

```css
/* Sage Glow */
.glow-lift {
  box-shadow: 0 0 0 0 rgba(166, 195, 167, 0);
  transition: box-shadow 300ms ease-in-out, transform 300ms ease-in-out;
}
.glow-lift:hover {
  box-shadow: 0 0 20px rgba(166, 195, 167, 0.4);
  transform: translateY(-2px);
}

/* Blue Glow */
.glow-lift-blue:hover {
  box-shadow: 0 0 20px rgba(170, 183, 200, 0.4);
}

/* Amber Glow */
.glow-lift-amber:hover {
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.4);
}

/* Purple Glow */
.glow-lift-purple:hover {
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
}
```

### Typography

**Primary Font:** Inter
**Monospace Font:** JetBrains Mono

**Scale:**
- `text-sm`: 14px
- `text-base`: 16px
- `text-lg`: 18px
- `text-xl`: 20px
- `text-2xl`: 24px
- `text-3xl`: 30px
- `text-4xl`: 36px
- `text-5xl`: 48px
- `text-6xl`: 60px
- `text-7xl`: 72px

---

## Responsive Breakpoints

```css
sm: 640px;   /* Tablets portrait */
md: 768px;   /* Tablets landscape */
lg: 1024px;  /* Laptops */
xl: 1280px;  /* Desktops */
2xl: 1536px; /* Large desktops */
```

---

## Accessibility

All components follow WCAG AA standards:

- ✅ Keyboard navigation support
- ✅ ARIA labels on interactive elements
- ✅ Semantic HTML structure
- ✅ Color contrast ratio ≥ 4.5:1
- ✅ Focus indicators
- ✅ Screen reader friendly

---

## Performance

- Components use `React.memo` where appropriate
- CSS animations use GPU-accelerated properties (transform, opacity)
- Images use Next.js Image optimization
- Lazy loading for below-fold content
- Bundle size monitoring

---

## Testing

Components should be tested for:
- Rendering correctness
- Props validation
- User interactions
- Responsive behavior
- Accessibility compliance

---

**Last Updated:** January 2025
**Maintainer:** VLN Development Team
