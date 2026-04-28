---
title: ACE Blackjack Design System
description: ACE Blackjack - Game Design System, Component Library, and Visual Standards
---

> Premium Blackjack Game Design System

**Last Updated:** April 2026
**Version:** 1.0
**Status:** Active

---

## ACE Overview

ACE is the flagship iGaming blackjack experience at VLN, built for high-performance, low-latency gameplay with enterprise-grade security and compliance. The design system covers game UI, dealer interface, player communications, and analytics dashboard.

## Core Design Principles

1. **Game-First UX** — Instant feedback, sub-100ms interactions
2. **Trust Through Clarity** — Transparent odds, clear game state
3. **Accessibility Priority** — WCAG AAA compliant, colorblind-friendly
4. **Mobile Excellence** — Touch-optimized controls, portrait/landscape
5. **Compliance Ready** — Audit-trail UI, regulatory reporting

---

## Color Palette

### Primary Game Colors

| Role | Token | Hex | Usage |
|------|-------|-----|-------|
| **Felt Green** | `--ace-felt` | `#1a4d2e` | Game table background |
| **Chip Gold** | `--ace-gold` | `#d4af37` | Betting UI, premium accents |
| **Card White** | `--ace-white` | `#f5f5f5` | Card backgrounds, text |
| **Dealer Navy** | `--ace-navy` | `#1a2a3a` | Dealer panel, status areas |

### Semantic Colors

| State | Token | Hex | Usage |
|-------|-------|-----|-------|
| **Win** | `--ace-win` | `#4ade80` | Win notifications, green chip |
| **Loss** | `--ace-loss` | `#ef4444` | Loss notifications, warning states |
| **Stand** | `--ace-stand` | `#60a5fa` | Stand action, neutral actions |
| **Hit** | `--ace-hit` | `#fbbf24` | Hit action, active attention |
| **Double** | `--ace-double` | `#a855f7` | Double down action |

### VLN Integration Colors

| Element | Token | Hex | Usage |
|---------|-------|-----|-------|
| **Sage Accent** | `--vln-sage` | `#a6c3a7` | Links, secondary actions |
| **Blue-Gray** | `--vln-bluegray` | `#aab7c8` | Muted text, borders |
| **Charcoal** | `--vln-charcoal` | `#0f0f0f` | Overlays, dark backgrounds |

---

## Component Library

### Player Hand Display

**Purpose:** Display the player's cards and current hand value

**States:**
- Initial deal
- Hit pending
- Hand complete
- Bust
- Blackjack (21 on deal)
- Double down

**Design Elements:**
- Card suits with proper spacing
- Running total display with large typography
- Soft/Hard indicator (A=1 or 11)
- Action pending animation (pulsing)

### Dealer Hand Display

**Purpose:** Show dealer's up card and final hand

**States:**
- Hole card hidden
- Dealer hit pending
- Dealer hand complete
- Bust
- Push (tie)

**Design Elements:**
- Single visible card with highlight
- Face-down card animation
- Dealer action status text
- Reveal animation on dealer stand

### Betting Interface

**Purpose:** Place bets before each round

**States:**
- Chip selection (1, 5, 10, 50, 100, 500, 1000)
- Bet placement preview
- Bet locked
- Bet resolution

**Design Elements:**
- Chip button stack (shows denomination)
- Betting area highlight
- Minimum/maximum indicators
- Quick bet buttons (repeat, clear, half)

### Action Buttons

**Purpose:** Execute player decisions

**Buttons:**
1. **Hit** — Take another card (Yellow/Gold)
2. **Stand** — End turn (Blue)
3. **Double Down** — Double bet and one more card (Purple)
4. **Split** — Split paired cards (Sage Green)
5. **Insurance** — Side bet (Orange/Amber)

**States:**
- Available
- Unavailable/Disabled
- Hovering
- Pressed
- Processing

### Game Status Panel

**Purpose:** Display game information and controls

**Sections:**
- Balance display
- Current bet amount
- Round counter
- Time remaining (for multiplayer)
- Rules / Help link
- Settings button

**Typography:**
- Balance: Large, bold (24-32px)
- Bet: Medium (18-20px)
- Metadata: Small (12-14px)

### Results Modal

**Purpose:** Show hand outcome

**Variants:**
- Win (green highlight, win amount displayed)
- Loss (red highlight, amount lost)
- Push/Tie (neutral highlight, no change)
- Blackjack (gold highlight, 1.5x payout)
- Bust (red background, bust message)

**Content:**
- Primary outcome text
- Amount won/lost
- Hand breakdown
- "Next Round" button

### Multiplayer Indicators

**Purpose:** Show other players at table

**Elements:**
- Player avatar or initial
- Username/player ID
- Current hand status (waiting, playing, complete)
- Seat number
- Connection status indicator

### Table Stats Panel

**Purpose:** Display live game statistics

**Metrics:**
- Hands played
- Win rate %
- Average bet
- Session profit/loss
- Time played
- Cards dealt

**Refresh Rate:** Real-time updates on hand completion

---

## Typography System

| Usage | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| **Card Value** | Inter | 28-36px | Bold 700 | 1.2 |
| **Hand Total** | Inter | 20-24px | Bold 700 | 1.2 |
| **Button Text** | Inter | 14-16px | Medium 600 | 1.4 |
| **Game Status** | Inter | 16-18px | Regular 400 | 1.5 |
| **Metadata** | Inter | 12-14px | Regular 400 | 1.6 |
| **Code/Monospace** | JetBrains Mono | 12px | Regular 400 | 1.5 |

---

## Spacing & Layout

### Game Container
- **Max Width:** 1200px on desktop
- **Padding:** 16px mobile, 24px tablet, 32px desktop
- **Gap Between Elements:** 16px (components), 24px (sections)

### Card Spacing
- **Card Width:** 60px (mobile), 80px (tablet), 100px (desktop)
- **Card Height:** 88px (mobile), 117px (tablet), 146px (desktop)
- **Card Gap:** 8px (compact), 12px (relaxed)

### Touch Targets
- **Minimum:** 44x44px (WCAG)
- **Preferred:** 56x56px (buttons, chips)
- **Button Padding:** 12px-16px vertical, 16px-20px horizontal

---

## Animations

### Card Deal
- Duration: 300ms
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` (bounce)
- Movement: Translate from deck to hand area

### Hand Evaluation
- Duration: 200ms
- Easing: ease-in-out
- Effect: Scale 1.0 → 1.05 → 1.0 (pulse)

### Chip Placement
- Duration: 200ms
- Easing: ease-in
- Movement: Scale up + drop to betting area

### Bet Resolution
- Duration: 400ms
- Easing: ease-out
- Effects: Fade chip, slide amount to balance

### Win/Loss Pulse
- Duration: 600ms
- Easing: ease-out
- Effect: Background color flash + scale bounce

---

## Accessibility

### Color Contrast
- Text on felt: WCAG AAA (7:1+)
- Card indicators: Multiple formats (color + number + symbol)
- Buttons: WCAG AA minimum (4.5:1)

### Colorblind Support
- Red/Green states include texture/pattern difference
- Symbols in addition to color (♠ ♥ ♦ ♣)
- High contrast mode available

### Keyboard Navigation
- Tab order: Logical (left to right, top to bottom)
- Enter/Space to activate buttons
- Arrow keys to select chips/actions
- Escape to close modals

### Screen Reader
- ARIA labels on all interactive elements
- Live regions for game status updates
- Descriptive alt text for card images
- Hand structure properly semantic

---

## Responsive Breakpoints

| Device | Width | Card Size | Layout | Touch Targets |
|--------|-------|-----------|--------|----------------|
| **Mobile** | 320-480px | 60x88px | Single column, vertical | 48-56px |
| **Tablet** | 481-1024px | 80x117px | Two column, flexible | 52-60px |
| **Desktop** | 1025px+ | 100x146px | Multi-section layout | 56px+ |

---

## Implementation Guidelines

### Game State Management
- Redux or Zustand for game state
- WebSocket for real-time multiplayer
- Local storage for player preferences
- Session storage for active game

### Performance Targets
- Card interactions: <100ms response time
- Hand evaluation: <200ms calculation
- Network latency: <500ms acceptable delay
- Rerender: 60fps on mobile (16.67ms per frame)

### Testing Requirements
- Unit: Game logic, hand evaluation, payout calculation
- Integration: Game flow, state transitions
- E2E: Full game rounds, multiplayer scenarios
- Accessibility: axe, WAVE, manual testing

---

## Integration with VLN Brand

The ACE design system extends VLN's core brand identity:

- **Primary Colors:** ACE felt green + VLN sage green (secondary actions)
- **Typography:** Inter for UI, JetBrains Mono for odds/calculations
- **Radius:** 12px border-radius consistent with VLN token
- **Shadows:** Subtle glow effects on cards and buttons
- **Motion:** Restraint, purposeful animations (no excess)

---

## Related Documentation

- [VLN Color System](/tokens/colors)
- [VLN Animation System](/components/animations)
- [Responsive Design Patterns](/responsive/layouts)
- [Accessibility Guidelines](/responsive/accessibility)

---

## Changelog

### v1.0 — April 2026
- Initial ACE design system
- 25+ component specifications
- Color palette with game-specific colors
- Typography system
- Animation guidelines
- Accessibility standards
- Responsive design patterns
