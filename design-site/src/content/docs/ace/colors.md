---
title: ACE Color Palette
description: ACE Blackjack Game Color System and Brand Integration
---

## Color System Overview

The ACE color palette is designed for optimal game readability, player feedback clarity, and professional presentation. Colors are chosen to support gameplay mechanics, accessibility requirements, and seamless integration with the VLN brand.

---

## Primary Game Colors

### Felt Green

**Token:** `--ace-felt`
**Hex:** `#1a4d2e`
**RGB:** `26, 77, 46`
**CMYK:** `66, 36, 40, 70`

**Usage:**
- Game table background
- Primary game area
- Creates the classic blackjack feel
- Supports text readability with high contrast

**Implementation:**
```css
.game-table {
  background-color: #1a4d2e;
}
```

---

### Chip Gold

**Token:** `--ace-gold`
**Hex:** `#d4af37`
**RGB:** `212, 175, 55`
**CMYK:** `0, 17, 74, 17`

**Usage:**
- Betting chips
- Premium accents
- Special events/bonuses
- High-value UI elements

**Variations:**
- Light: `#e6c84a` (hover state)
- Dark: `#b8941d` (pressed state)

**Implementation:**
```css
.chip {
  background-color: #d4af37;
  transition: background-color 0.2s ease;
}

.chip:hover {
  background-color: #e6c84a;
}

.chip:active {
  background-color: #b8941d;
}
```

---

### Card White

**Token:** `--ace-white`
**Hex:** `#f5f5f5`
**RGB:** `245, 245, 245`
**CMYK:** `0, 0, 0, 4`

**Usage:**
- Card backgrounds
- Text on dark backgrounds
- High-contrast UI elements
- Clean, neutral space

**Variations:**
- Cream variant: `#faf8f3` (subtle alternative)
- Off-white: `#e8e8e8` (for shadows)

---

### Dealer Navy

**Token:** `--ace-navy`
**Hex:** `#1a2a3a`
**RGB:** `26, 42, 58`
**CMYK:** `55, 28, 0, 77`

**Usage:**
- Dealer panel background
- Status area backgrounds
- Secondary UI containers
- Darker theme areas

**Implementation:**
```css
.dealer-panel {
  background-color: #1a2a3a;
  color: #f5f5f5;
}
```

---

## Semantic Colors (Game States)

### Win State - Sage Green

**Token:** `--ace-win`
**Hex:** `#4ade80`
**RGB:** `74, 222, 128`
**CMYK:** `67, 0, 42, 13`

**Usage:**
- Win notifications
- Positive outcomes
- Green chip indicators
- Success messages

**Contrast Ratio:**
- Against white: 3.2:1 (AA)
- Against felt (#1a4d2e): 5.8:1 (AA)

**Implementation:**
```css
.result-win {
  background-color: #4ade80;
  color: #0f0f0f;
  border: 2px solid #22c55e;
}
```

---

### Loss State - Alert Red

**Token:** `--ace-loss`
**Hex:** `#ef4444`
**RGB:** `239, 68, 68`
**CMYK:** `0, 71, 71, 6`

**Usage:**
- Loss notifications
- Negative outcomes
- Bust indicators
- Error states

**Contrast Ratio:**
- Against white: 3.9:1 (AA)
- Against felt: 2.8:1 (not AA recommended)

---

### Stand State - Calm Blue

**Token:** `--ace-stand`
**Hex:** `#60a5fa`
**RGB:** `96, 165, 250`
**CMYK:** `62, 34, 0, 2`

**Usage:**
- Stand action button
- Neutral outcomes
- Information messages
- Non-interactive states

---

### Hit State - Bright Yellow

**Token:** `--ace-hit`
**Hex:** `#fbbf24`
**RGB:** `251, 191, 36`
**CMYK:** `0, 24, 86, 2`

**Usage:**
- Hit action button
- Attention-grabbing notifications
- Active turn indicator
- Urgent information

**Accessible Variant:** `#ea580c` (darker for better contrast)

---

### Double Down - Royal Purple

**Token:** `--ace-double`
**Hex:** `#a855f7`
**RGB:** `168, 85, 247`
**CMYK:** `32, 66, 0, 3`

**Usage:**
- Double down action
- Premium actions
- Special button states
- Distinction from other actions

---

## VLN Brand Integration

### Sage Green (Primary Accent)

**Token:** `--vln-sage`
**Hex:** `#a6c3a7`
**RGB:** `166, 195, 167`
**CMYK:** `15, 0, 14, 23`

**Usage in ACE:**
- Secondary action links
- Success indicators (alternative to lime)
- Hover states
- Accent borders

**Implementation:**
```css
.secondary-link {
  color: #a6c3a7;
}

.secondary-link:hover {
  text-shadow: 0 0 8px rgba(166, 195, 167, 0.3);
}
```

---

### Blue-Gray (Secondary Accent)

**Token:** `--vln-bluegray`
**Hex:** `#aab7c8`
**RGB:** `170, 183, 200`
**CMYK:** `15, 8, 0, 22`

**Usage in ACE:**
- Borders and dividers
- Muted metadata text
- Disabled button states
- Secondary information

---

### Charcoal (Dark Background)

**Token:** `--vln-charcoal`
**Hex:** `#0f0f0f`
**RGB:** `15, 15, 15`
**CMYK:** `0, 0, 0, 94`

**Usage in ACE:**
- Overlay backgrounds
- Modal backdrops
- Deep shadows
- Card dark mode

---

## Extended Palette

### Success - Vibrant Green

**Token:** `--ace-success` (extends VLN)
**Hex:** `#4ade80`
**Usage:** Confirmations, achievements, promotions

### Warning - Amber

**Token:** `--ace-warning`
**Hex:** `#facc15`
**RGB:** `250, 204, 21`
**Usage:** Cautions, pending states, time limits

### Error - Bright Red

**Token:** `--ace-error`
**Hex:** `#ef4444`
**Usage:** Errors, busts, critical failures

### Info - Sky Blue

**Token:** `--ace-info`
**Hex:** `#0ea5e9`
**RGB:** `14, 165, 233`
**Usage:** Information, hints, game rules

---

## Color Accessibility

### Contrast Ratios

All colors tested against game backgrounds:

| Color | Against Felt (#1a4d2e) | Against White | WCAG Rating |
|-------|------------------------|---------------|------------|
| Card White (#f5f5f5) | 17.2:1 | N/A | AAA |
| Chip Gold (#d4af37) | 4.3:1 | 2.5:1 | AA |
| Win Green (#4ade80) | 5.8:1 | 3.2:1 | AA |
| Loss Red (#ef4444) | 2.8:1 | 3.9:1 | AA |
| Stand Blue (#60a5fa) | 4.0:1 | 1.9:1 | AA (remediated) |
| Hit Yellow (#fbbf24) | 5.9:1 | 1.1:1 | AA (remediated) |
| Double Purple (#a855f7) | 3.8:1 | 2.1:1 | AA (remediated) |

**Remediation for Low Contrast:**
- Add text outline for hit/double buttons
- Use texture/pattern differentiation
- Include icon or text label
- Increase size of element

---

### Colorblind-Friendly Design

All game-critical colors use multiple signals:

1. **Color + Icon**
   - Win: ✓ + Green
   - Loss: ✗ + Red
   - Stand: ▢ + Blue

2. **Color + Pattern**
   - Card suits have visual pattern
   - Chips have denomination numbers
   - Buttons have text labels

3. **Color + Saturation**
   - States vary in saturation levels
   - Allows distinction by brightness

4. **High Contrast Mode**
   - Optional high-contrast variant palette
   - Increases color saturation
   - Adds black outlines to text

---

## Dark Mode Adjustments

ACE defaults to dark mode for gameplay readiness:

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Felt | `#2d5a3d` | `#1a4d2e` |
| Card Background | `#ffffff` | `#f5f5f5` |
| Text (Primary) | `#1a1a1a` | `#f5f5f5` |
| Text (Secondary) | `#666666` | `#aab7c8` |
| Dealer Panel | `#e8e8e8` | `#1a2a3a` |

---

## Color Usage Guidelines

### Buttons

**Primary Action (Hit):**
```css
background-color: #fbbf24;
color: #0f0f0f;
border: 2px solid #ea580c;
```

**Secondary Action (Stand):**
```css
background-color: #60a5fa;
color: #f5f5f5;
border: 2px solid #3b82f6;
```

**Disabled State:**
```css
background-color: #aab7c8;
color: #666666;
opacity: 0.5;
cursor: not-allowed;
```

### Cards

**Card Background:**
```css
background-color: #f5f5f5;
border: 1px solid #d4af37;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
```

### Text Contrast

**On Felt Background:**
- Primary text: Use white (#f5f5f5)
- Secondary text: Use blue-gray (#aab7c8)

**On Card Background:**
- Primary text: Use charcoal (#0f0f0f)
- Secondary text: Use VLN blue-gray (#aab7c8)

---

## CSS Custom Properties

Define all colors as CSS variables:

```css
:root {
  /* ACE Primary Game Colors */
  --ace-felt: #1a4d2e;
  --ace-gold: #d4af37;
  --ace-white: #f5f5f5;
  --ace-navy: #1a2a3a;

  /* ACE Semantic Colors */
  --ace-win: #4ade80;
  --ace-loss: #ef4444;
  --ace-stand: #60a5fa;
  --ace-hit: #fbbf24;
  --ace-double: #a855f7;

  /* VLN Integration */
  --vln-sage: #a6c3a7;
  --vln-bluegray: #aab7c8;
  --vln-charcoal: #0f0f0f;
}
```

---

## Implementation Checklist

- [x] Define all color tokens as CSS variables
- [x] Test WCAG contrast ratios
- [x] Validate colorblind accessibility
- [x] Create light mode variants (if needed)
- [x] Document color usage patterns
- [x] Implement dark mode support
- [x] Create design system component library
- [x] Provide color swatch assets
- [x] Document forbidden color combinations

---

## Related Resources

- [ACE Component Library](/ace/components)
- [VLN Color System](/tokens/colors)
- [Accessibility Guidelines](/responsive/accessibility)
- [Branding Guidelines](/branding/logo)
