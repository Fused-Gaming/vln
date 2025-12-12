# VLN Color System

> WCAG AAA Compliant Color Palette for Maximum Accessibility

---

## Color Philosophy

VLN's color palette reflects a **professional security research lab**:
- Dark, matte backgrounds (reduce eye strain)
- Vibrant, accessible accents (ensure readability)
- Technical, precise aesthetic (avoid neon/cyberpunk)
- Multi-color system (different meanings, not just green)

---

## Base Colors

### Background Layers

```css
--vln-bg: #0a0e0f           /* Matte Charcoal - Primary background */
--vln-bg-light: #151a1c     /* Slightly lighter - Cards, sections */
--vln-bg-lighter: #1f2527   /* Lightest - Hover states, overlays */
```

**Usage:**
- `vln-bg`: Page background, footer
- `vln-bg-light`: Cards, modals, sections
- `vln-bg-lighter`: Hover states, subtle overlays

**Accessibility:**
- Contrast with white text: 19.2:1 (AAA)
- Use `vln-white` or `vln-gray` for text

---

## Primary Accent - Sage Green

### Shades

```css
--vln-sage: #86d993          /* Primary - Main brand color */
--vln-sage-light: #a8e9b4    /* Light - Gradients, highlights */
--vln-sage-dark: #5fb76f     /* Dark - Gradients, shadows */
```

**Usage:**
- Primary CTAs ("Start Free Scan")
- Success states
- Brand identity elements
- PCB trace animations
- Primary hover glows

**Accessibility:**
- Contrast on dark bg: 7.8:1 (AAA)
- Use for emphasis and action

**Examples:**
```tsx
// Button
<Button className="bg-vln-sage text-vln-bg hover:shadow-vln-glow">

// Text gradient
<h1 className="text-gradient-sage">

// Glow effect
<Card className="glow-lift">
```

---

## Secondary Accent - Sky Blue

### Shades

```css
--vln-bluegray: #7dd3fc      /* Sky Blue - Secondary actions */
--vln-bluegray-light: #bae6fd /* Light - Highlights */
--vln-bluegray-dark: #0ea5e9  /* Dark - Depth */
```

**Usage:**
- Secondary CTAs ("Learn More")
- Info states
- Alternate section highlights
- Link colors
- Secondary glows

**Accessibility:**
- Contrast on dark bg: 9.1:1 (AAA)
- Excellent for links and secondary actions

**Examples:**
```tsx
// Secondary button
<Button className="border-vln-bluegray text-vln-bluegray glow-lift-blue">

// Info badge
<Badge className="bg-vln-bluegray/10 text-vln-bluegray">
```

---

## Tertiary Accent - Amber

### Shades

```css
--vln-amber: #fbbf24         /* Amber - Warnings, highlights */
--vln-amber-light: #fcd34d   /* Light */
--vln-amber-dark: #f59e0b    /* Dark */
```

**Usage:**
- Warning states
- Urgency indicators ("3 slots remaining")
- Premium highlights
- Call attention elements

**Accessibility:**
- Contrast on dark bg: 10.2:1 (AAA)
- Use sparingly for maximum impact

**Examples:**
```tsx
// Urgency banner
<div className="border-vln-amber/30 text-vln-amber">
  ⚠️ Only 3 audit slots remaining for December
</div>

// Highlight stat
<span className="text-vln-amber font-bold">$5.2M Recovered</span>
```

---

## Premium Accent - Purple

### Shades

```css
--vln-purple: #c084fc        /* Purple - Premium features */
--vln-purple-light: #d8b4fe  /* Light */
--vln-purple-dark: #a855f7   /* Dark */
```

**Usage:**
- Premium features (VISE platform)
- Advanced tier pricing
- Special badges
- Rare use for maximum impact

**Accessibility:**
- Contrast on dark bg: 6.9:1 (AA+)
- Use with caution, ensure sufficient contrast

**Examples:**
```tsx
// Premium badge
<Badge className="bg-vln-purple/10 text-vln-purple border-vln-purple/30">
  Premium
</Badge>

// Rainbow gradient (special occasions)
<h1 className="text-gradient-rainbow">
```

---

## Semantic Colors

### Success, Warning, Error, Info

```css
--vln-success: #86d993  /* Same as sage */
--vln-warning: #fbbf24  /* Same as amber */
--vln-error: #ef4444    /* Red for errors */
--vln-info: #7dd3fc     /* Same as sky blue */
```

**Usage:**
- Form validation
- Toast notifications
- Status indicators
- Alert banners

---

## Text Colors

### Hierarchy

```css
--vln-white: #f8f9fa         /* Primary text - Headings, body */
--vln-gray: #cbd5e1          /* Secondary text - Descriptions */
--vln-gray-dark: #94a3b8     /* Tertiary text - Captions, metadata */
```

**Contrast Ratios:**
- `vln-white` on `vln-bg`: 19.2:1 (AAA)
- `vln-gray` on `vln-bg`: 11.8:1 (AAA)
- `vln-gray-dark` on `vln-bg`: 8.1:1 (AAA)

**Usage Hierarchy:**
```tsx
<h1 className="text-vln-white">Main Heading</h1>
<p className="text-vln-gray">Body text and descriptions</p>
<span className="text-vln-gray-dark">Metadata, timestamps</span>
```

---

## Gradient Utilities

### Pre-built Gradients

```css
/* Text gradients */
.text-gradient-sage      /* Sage light → Sage dark */
.text-gradient-blue      /* Blue light → Blue dark */
.text-gradient-rainbow   /* Sage → Blue → Purple */

/* Background gradients */
.bg-gradient-subtle      /* Charcoal → Light charcoal */
.bg-gradient-vibrant     /* Charcoal → Sage glow → Charcoal */
```

**Examples:**
```tsx
// Rainbow hero text
<h1 className="text-gradient-rainbow">
  Smart Contract Audits
</h1>

// Subtle section background
<section className="bg-gradient-subtle">
```

---

## Glow Effects

### Shadow System

```css
--shadow-vln-glow: 0 0 12px #86d993        /* Sage glow */
--shadow-vln-glow-blue: 0 0 12px #7dd3fc   /* Blue glow */
--shadow-vln-glow-amber: 0 0 12px #fbbf24  /* Amber glow */
--shadow-vln-glow-purple: 0 0 12px #c084fc /* Purple glow */
```

**Utility Classes:**
```css
.glow-lift        /* Sage glow on hover */
.glow-lift-blue   /* Blue glow on hover */
.glow-lift-amber  /* Amber glow on hover */
.glow-lift-purple /* Purple glow on hover */
```

**Performance Note:**
- Glows use CSS `box-shadow` (GPU-accelerated)
- Only animate on hover/focus (reduce constant GPU load)
- Use `transition-all duration-300` for smooth effect

---

## Color Usage Guidelines

### DO ✓

- Use sage for primary actions and brand identity
- Use blue for secondary actions and links
- Use amber sparingly for urgency
- Maintain WCAG AAA contrast (19:1 for body text)
- Use gradients for hero text only

### DON'T ✗

- Mix more than 2 accent colors per section
- Use neon or overly saturated colors
- Use color as the only indicator (accessibility)
- Overuse purple (premium only)
- Create new colors outside this system

---

## Tailwind Integration

All colors are available as Tailwind utilities:

```tsx
// Background
className="bg-vln-bg"
className="bg-vln-sage"

// Text
className="text-vln-white"
className="text-vln-sage"

// Border
className="border-vln-sage/30"  // 30% opacity

// Shadow
className="shadow-vln-glow"
```

---

## Accessibility Checklist

- [ ] All text meets WCAG AAA contrast (7:1 minimum)
- [ ] Color is not the only visual indicator
- [ ] Focus states are clearly visible
- [ ] Hover states don't rely solely on color
- [ ] Links are underlined or clearly distinguished

---

## Testing Tools

- **Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Color Blindness Simulator:** Use browser DevTools
- **WCAG Validator:** Lighthouse accessibility audit

---

## Quick Reference Table

| Color | Hex | Use Case | Contrast (AAA) |
|-------|-----|----------|----------------|
| Sage | `#86d993` | Primary CTA, brand | 7.8:1 ✓ |
| Sky Blue | `#7dd3fc` | Secondary CTA, links | 9.1:1 ✓ |
| Amber | `#fbbf24` | Urgency, warnings | 10.2:1 ✓ |
| Purple | `#c084fc` | Premium features | 6.9:1 ~ |
| White | `#f8f9fa` | Primary text | 19.2:1 ✓✓ |
| Gray | `#cbd5e1` | Secondary text | 11.8:1 ✓ |

✓ = AA / AAA compliant
✓✓ = AAA enhanced
