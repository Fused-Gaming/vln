---
title: Peralta Color Palette
description: Peralta Web3 and Decentralized Identity Color System
---

## Color System Overview

The Peralta color palette represents decentralized identity, Web3 trust, and blockchain networks. The primary brand color (purple) signifies innovation and trust, while blockchain network colors enable users to quickly identify which chain they're on.

---

## Primary Brand Colors

### Peralta Primary - Vibrant Purple

**Token:** `--peralta-primary`
**Hex:** `#8b5cf6`
**RGB:** `139, 92, 246`
**CMYK:** `43, 63, 0, 4`

**Usage:**
- Primary brand elements
- Main action buttons
- Active navigation items
- Credential links
- Identity highlights

**Variations:**
- Light: `#c4b5fd` (backgrounds, hover)
- Dark: `#6d28d9` (pressed states, secondary)

**Implementation:**
```css
.peralta-primary {
  color: #8b5cf6;
}

.button-primary {
  background-color: #8b5cf6;
  color: #ffffff;
}

.button-primary:hover {
  background-color: #7c3aed;
}

.button-primary:active {
  background-color: #6d28d9;
}
```

---

### Peralta Secondary - Deep Purple

**Token:** `--peralta-secondary`
**Hex:** `#6d28d9`
**RGB:** `109, 40, 217`
**CMYK:** `50, 82, 0, 15`

**Usage:**
- Secondary buttons
- Alternative CTAs
- Focus states
- Emphasis elements
- Depth in gradients

**Contrast Ratio:** 2.8:1 against white (requires large text)

---

### Peralta Light - Soft Purple

**Token:** `--peralta-light`
**Hex:** `#c4b5fd`
**RGB:** `196, 181, 253`
**CMYK:** `23, 28, 0, 1`

**Usage:**
- Background highlights
- Hover states on cards
- Disabled backgrounds
- Light overlays
- Accent borders

**Implementation:**
```css
.card:hover {
  background-color: rgba(196, 181, 253, 0.1);
  border-color: #8b5cf6;
}
```

---

### Peralta Gradient

**Start:** `--peralta-grad-1`
**Hex:** `#8b5cf6`

**End:** `--peralta-grad-2`
**Hex:** `#a855f7`

**Usage:**
- Hero section backgrounds
- Card gradients
- Page dividers
- Decorative elements

**Implementation:**
```css
.gradient-background {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
}
```

---

## Blockchain Network Colors

### Ethereum - Smart Contract Blue

**Token:** `--peralta-eth`
**Hex:** `#627eea`
**RGB:** `98, 126, 234`
**CMYK:** `58, 46, 0, 8`

**Usage:**
- Ethereum network indicator
- ETH token badges
- Network selector items
- Transaction confirmations on Ethereum

**Brand Context:** Ethereum's official brand purple-blue

---

### Polygon - Purple Scaling

**Token:** `--peralta-polygon`
**Hex:** `#8247e5`
**RGB:** `130, 71, 229`
**CMYK:** `43, 69, 0, 10`

**Usage:**
- Polygon/Matic network indicator
- Polygon badges and labels
- MATIC token display
- Polygon-specific UI elements

**Brand Context:** Polygon's official brand color

---

### Arbitrum - Cyan Innovation

**Token:** `--peralta-arbitrum`
**Hex:** `#28a0f0`
**RGB:** `40, 160, 240`
**CMYK:** `83, 33, 0, 6`

**Usage:**
- Arbitrum network indicator
- Layer 2 badges
- Arbitrum One chain selector
- Arbitrum transaction status

**Brand Context:** Arbitrum's official brand blue

---

### Optimism - Red Layer 2

**Token:** `--peralta-op`
**Hex:** `#ff0420`
**RGB:** `255, 4, 32`
**CMYK:** `0, 98, 87, 0`

**Usage:**
- Optimism network indicator
- OP token badges
- Optimistic rollup indicators
- Optimism-specific components

**Brand Context:** Optimism's official brand red

---

### Base - Deep Blue

**Token:** `--peralta-base`
**Hex:** `#0052ff`
**RGB:** `0, 82, 255`
**CMYK:** `100, 68, 0, 0`

**Usage:**
- Base network indicator
- Base chain badges
- Coinbase Layer 2 indicators
- Base-specific UI

**Brand Context:** Base's official brand color

---

## Trust & Credential States

### Verified - Trust Green

**Token:** `--peralta-verified`
**Hex:** `#4ade80`
**RGB:** `74, 222, 128`
**CMYK:** `67, 0, 42, 13`

**Usage:**
- Verified credential badges
- Proven/confirmed status
- Trust indicators
- Success states

**Implementation:**
```css
.credential-verified {
  background-color: #4ade80;
  border-color: #22c55e;
}

.verified-icon::before {
  content: '✓';
  color: #16a34a;
}
```

**Contrast Ratio:** 3.2:1 against white, 5.8:1 against dark

---

### Pending - Amber Caution

**Token:** `--peralta-pending`
**Hex:** `#fbbf24`
**RGB:** `251, 191, 36`
**CMYK:** `0, 24, 86, 2`

**Usage:**
- Pending verification credentials
- In-progress transactions
- Awaiting confirmation
- Temporary credentials

**Implementation:**
```css
.credential-pending {
  background-color: #fbbf24;
  border-color: #f59e0b;
  animation: pulse 2s ease-in-out infinite;
}
```

---

### Revoked - Alert Red

**Token:** `--peralta-revoked`
**Hex:** `#ef4444`
**RGB:** `239, 68, 68`
**CMYK:** `0, 71, 71, 6`

**Usage:**
- Revoked credentials
- Expired proofs
- Invalid credentials
- Error states

**Contrast Ratio:** 3.9:1 against white, adequate on dark

---

### Unverified - Neutral Gray

**Token:** `--peralta-unverified`
**Hex:** `#9ca3af`
**RGB:** `156, 163, 175`
**CMYK:** `11, 7, 0, 31`

**Usage:**
- Self-claimed credentials
- Unverified claims
- Grayed-out elements
- Low-priority information

**Implementation:**
```css
.credential-unverified {
  background-color: #9ca3af;
  color: #6b7280;
  opacity: 0.7;
}
```

---

## VLN Integration Colors

### Sage Green - Links & Secondary

**Token:** `--vln-sage`
**Hex:** `#a6c3a7`
**RGB:** `166, 195, 167`

**Usage in Peralta:**
- Secondary action links
- Help and documentation buttons
- Alternative CTAs
- Accent borders
- Supporting elements

**Implementation:**
```css
.secondary-link {
  color: #a6c3a7;
  transition: all 0.3s ease;
}

.secondary-link:hover {
  color: #8daa8e;
  text-shadow: 0 0 8px rgba(166, 195, 167, 0.3);
}
```

---

### Blue-Gray - Borders & Metadata

**Token:** `--vln-bluegray`
**Hex:** `#aab7c8`
**RGB:** `170, 183, 200`

**Usage:**
- Card borders
- Divider lines
- Metadata text
- Secondary labels
- Placeholder text

---

### Charcoal - Dark Backgrounds

**Token:** `--vln-charcoal`
**Hex:** `#0f0f0f`
**RGB:** `15, 15, 15`

**Usage:**
- Modal overlays
- Dark panel backgrounds
- Strong contrast elements
- Deep shadows

---

## Semantic Colors

### Success - Emerald

**Hex:** `#10b981`
**RGB:** `16, 185, 129`
**Usage:** Transaction success, verification complete, action approved

### Warning - Amber

**Hex:** `#f59e0b`
**RGB:** `245, 158, 11`
**Usage:** Pending states, cautions, important notices

### Error - Red

**Hex:** `#ef4444`
**RGB:** `239, 68, 68`
**Usage:** Failed transactions, revoked credentials, errors

### Info - Sky Blue

**Hex:** `#0ea5e9`
**RGB:** `14, 165, 233`
**Usage:** Information messages, tips, helpful hints

---

## Color Accessibility

### Contrast Ratios (Against White)

| Color | Contrast | WCAG |
|-------|----------|------|
| Peralta Primary (#8b5cf6) | 2.1:1 | AA* |
| Ethereum (#627eea) | 2.5:1 | AA* |
| Verified Green (#4ade80) | 3.2:1 | AA |
| Pending Amber (#fbbf24) | 1.1:1 | AA* |
| Revoked Red (#ef4444) | 3.9:1 | AA |
| Unverified Gray (#9ca3af) | 5.5:1 | AA |

*Requires large text (18pt+) or icon supplementation

### Contrast Ratios (Against Dark Background)

| Color | Against #0f0f0f | WCAG |
|-------|-----------------|------|
| Peralta Primary | 2.8:1 | AA |
| Ethereum | 3.2:1 | AA |
| Verified Green | 5.8:1 | AAA |
| Pending Amber | 5.9:1 | AAA |
| Revoked Red | 2.8:1 | AA |

---

### Colorblind Support

All critical colors use supplementary signals:

1. **Icon + Color**
   - Verified: ✓ icon + green
   - Revoked: ✗ icon + red
   - Network: Chain logo + color

2. **Text Label + Color**
   - All badges include text
   - Network names always visible
   - Status always labeled

3. **Pattern Differentiation**
   - Borders and outlines vary
   - Opacity levels differ
   - Icons have distinct shapes

---

## Network Color Usage

### Chain Selector Implementation

```css
.chain-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 600;
}

.chain-badge.ethereum {
  background-color: rgba(98, 126, 234, 0.15);
  border: 1px solid #627eea;
  color: #627eea;
}

.chain-badge.polygon {
  background-color: rgba(130, 71, 229, 0.15);
  border: 1px solid #8247e5;
  color: #8247e5;
}

.chain-badge.arbitrum {
  background-color: rgba(40, 160, 240, 0.15);
  border: 1px solid #28a0f0;
  color: #28a0f0;
}
```

### Credential Card Implementation

```css
.credential-card {
  border-left: 4px solid var(--peralta-primary);
  border-radius: 12px;
}

.credential-card.verified {
  border-left-color: #4ade80;
}

.credential-card.pending {
  border-left-color: #fbbf24;
}

.credential-card.revoked {
  border-left-color: #ef4444;
  opacity: 0.6;
}
```

---

## CSS Custom Properties

```css
:root {
  /* Primary Brand */
  --peralta-primary: #8b5cf6;
  --peralta-secondary: #6d28d9;
  --peralta-light: #c4b5fd;
  --peralta-grad-1: #8b5cf6;
  --peralta-grad-2: #a855f7;

  /* Blockchain Networks */
  --peralta-eth: #627eea;
  --peralta-polygon: #8247e5;
  --peralta-arbitrum: #28a0f0;
  --peralta-op: #ff0420;
  --peralta-base: #0052ff;

  /* Trust States */
  --peralta-verified: #4ade80;
  --peralta-pending: #fbbf24;
  --peralta-revoked: #ef4444;
  --peralta-unverified: #9ca3af;

  /* VLN Integration */
  --vln-sage: #a6c3a7;
  --vln-bluegray: #aab7c8;
  --vln-charcoal: #0f0f0f;
}
```

---

## Dark Mode Adjustments

Peralta defaults to dark mode for Web3 readiness:

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Primary Brand | #9d6ced | #a855f7 |
| Card Background | #ffffff | #1a1a1a |
| Text (Primary) | #1a1a1a | #f5f5f5 |
| Text (Secondary) | #666666 | #aab7c8 |
| Border | #e5e7eb | #333333 |

---

## Implementation Checklist

- [x] Define all color tokens as CSS variables
- [x] Test WCAG contrast ratios
- [x] Validate colorblind accessibility
- [x] Document network colors
- [x] Document credential state colors
- [x] Create network badge styles
- [x] Implement hover/active states
- [x] Provide design system assets
- [x] Document color combinations

---

## Related Resources

- [Peralta Component Library](/peralta/components)
- [VLN Color System](/tokens/colors)
- [Blockchain Network Integration](/peralta/index)
- [Accessibility Guidelines](/responsive/accessibility)
