---
title: ACE Component Library
description: ACE Blackjack Component Previews and Usage Examples
---

## Component Previews

This section showcases the key components of the ACE blackjack game design system with visual examples and implementation notes.

### 1. Player Hand Display

The player's hand is shown as a row of cards with the running total displayed prominently below.

```
┌─────────────┐  ┌─────────────┐
│      ♠      │  │      ♥      │
│             │  │             │
│      K      │  │      5      │
│             │  │             │
│      ♠      │  │      ♥      │
└─────────────┘  └─────────────┘

Total: 15 (Soft: A + 4)
```

**Key Features:**
- Large, readable card values (28-36px)
- Suit symbols in corners
- Running total updated live
- Soft/Hard indicator for Aces
- Animations on card reveal

**Color Scheme:**
- Card background: White (#f5f5f5)
- Card text: Charcoal (#0f0f0f)
- Border: Subtle shadow, no outline

---

### 2. Dealer Hand Display

The dealer's hand shows one card face-up and one face-down until the dealer's turn.

```
┌─────────────┐  ┌─────────────┐
│      ♠      │  │   ? ? ?     │
│             │  │             │
│      K      │  │   ? ? ?     │
│             │  │             │
│      ♠      │  │   ? ? ?     │
└─────────────┘  └─────────────┘

Dealer Up Card: K
Hidden Card: Face Down
```

**States:**
- Face-down card (teal pattern)
- Face-up card (revealed)
- Card flipping animation (300ms)

---

### 3. Betting Interface

Five-step chip placement and bet management system.

```
Chip Selection:
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│      1     │ │      5     │ │     10     │ │     50     │
│   Gold     │ │   Gold     │ │   Gold     │ │   Gold     │
└────────────┘ └────────────┘ └────────────┘ └────────────┘

Betting Area:
┌──────────────────────────────────┐
│  Current Bet: $25               │
│  ┌──────┐  ┌──────┐             │
│  │ $10  │  │ $5 x3│             │
│  └──────┘  └──────┘             │
│  Min: $1 | Max: $1,000          │
└──────────────────────────────────┘
```

**Chip Values:**
- 1, 5, 10, 50, 100, 500, 1000
- Gold color (#d4af37)
- 56x56px touch targets
- Animation on placement

**Quick Buttons:**
- Clear (reset bet)
- Half (divide bet by 2)
- Double (multiply bet by 2)
- Repeat (use previous bet)

---

### 4. Action Buttons

Primary player action buttons positioned below the hand.

```
┌──────────────┬──────────────┬──────────────┐
│              │              │              │
│     HIT      │    STAND     │   DOUBLE     │
│ (Yellow)     │    (Blue)    │   (Purple)   │
│              │              │              │
└──────────────┴──────────────┴──────────────┘
```

**Button States:**
- **Available:** Full color, clickable, glow on hover
- **Disabled:** 50% opacity, not clickable
- **Pressed:** Color deepens, slight press animation
- **Processing:** Spinner icon, disabled

**Color Map:**
| Action | Color | Hex |
|--------|-------|-----|
| Hit | Yellow-Gold | #fbbf24 |
| Stand | Blue | #60a5fa |
| Double Down | Purple | #a855f7 |
| Split | Sage Green | #4ade80 |
| Insurance | Orange | #f97316 |

**Size & Spacing:**
- Height: 48px (mobile), 56px (desktop)
- Min width: 120px
- Gap: 12px

---

### 5. Game Status Panel

Persistent status panel showing balance, bet, round info.

```
┌─────────────────────────────┐
│ BALANCE: $1,250.00          │
├─────────────────────────────┤
│ Current Bet: $25            │
│ Round: 12 / 100             │
│ Time: 2:45 elapsed          │
├─────────────────────────────┤
│ [⚙️ Settings] [❓ Help]     │
└─────────────────────────────┘
```

**Information Hierarchy:**
- Balance (largest, bold)
- Current bet (secondary, 18-20px)
- Round/time metadata (small, 12-14px)
- Settings/help buttons (bottom)

**Update Frequency:**
- Balance: On payout
- Bet: On chip placement
- Round: After hand completes
- Time: Every second (optional)

---

### 6. Results Modal

Post-hand outcome display with animation.

```
╔═══════════════════════════════╗
║  YOU WIN! 🎉                  ║
║                               ║
║  Your Hand: K + 5 = 15        ║
║  Dealer: 12 (Bust)            ║
║                               ║
║  Winnings: +$25.00            ║
║  New Balance: $1,275.00       ║
║                               ║
║        [NEXT ROUND]           ║
╚═══════════════════════════════╝
```

**Variants:**
- **Win:** Green (#4ade80), show winnings
- **Loss:** Red (#ef4444), show loss amount
- **Push:** Neutral (#60a5fa), show tie
- **Blackjack:** Gold (#d4af37), 1.5x highlight
- **Bust:** Red with prominent "BUST" text

**Animation:**
- Entry: Scale from center (250ms)
- Text: Count-up for amounts
- Auto-close after 3-5 seconds (or click)

---

### 7. Card Animation Sequence

Card dealing follows a bouncy arc animation.

```
Step 1: Card at deck
Step 2: Card flying (arc path)
Step 3: Card lands at position
Step 4: Card settles

Duration: 300ms total
Easing: cubic-bezier(0.34, 1.56, 0.64, 1)
```

**Path Definition:**
- Start: Deck position (right side)
- Arc: Bezier curve to hand/dealer area
- End: Final card position
- Z-index layering for overlap

---

### 8. Multiplayer Indicators

Show other players at the table (if applicable).

```
Player Seat Layout (6-player table):

        ┌──────────────────────┐
        │   [Dealer]           │
        └──────────────────────┘
    
┌────────────┐                ┌────────────┐
│ P1: John   │                │ P2: Sarah  │
│ Hand: 18   │                │ Waiting... │
│ Bet: $50   │                │            │
└────────────┘                └────────────┘


┌────────────┐                ┌────────────┐
│ P6: Mike   │                │ P3: Alice  │
│ (Empty)    │                │ Win! +$100 │
└────────────┘                └────────────┘

        ┌────────────────────┐
        │ P4: David  P5: Eve │
        │ Stand: 17    Hit   │
        └────────────────────┘
```

**Player Card Elements:**
- Avatar or initial (40x40px)
- Username (14px)
- Hand status (12px, colored)
- Bet amount (small)
- Seat number

---

### 9. Statistics Panel

Live session statistics display.

```
┌──────────────────────────┐
│  SESSION STATISTICS      │
├──────────────────────────┤
│ Hands Played: 47         │
│ Win Rate: 63.8%          │
│ Avg. Bet: $34.50         │
│ Session Profit: +$426.00 │
│ Time Played: 45 min      │
│ Cards Dealt: 1,247       │
└──────────────────────────┘
```

**Real-Time Updates:**
- Hands played (after each round)
- Win rate (% calculation)
- Average bet (running average)
- Profit/loss (cumulative)
- Time (elapsed)
- Cards dealt (running count)

---

### 10. Mobile Layout

Vertical stack layout optimized for mobile.

```
[Dealer Hand (compact)]
[Dealer Up Card]

─────────────────────

[Player Hand (larger)]
[Hand Value: 15]

─────────────────────

[HIT] [STAND] [DOUBLE]
─────────────────────

[Status Panel]
Balance: $1,250.00
Bet: $25.00
```

**Responsive Changes:**
- Cards: 60x88px (mobile) vs 100x146px (desktop)
- Buttons: Full width or side-by-side
- Status: Top or bottom position
- Vertical stacking on small screens

---

## Design Tokens Reference

### Colors
```css
--ace-felt: #1a4d2e;         /* Felt green */
--ace-gold: #d4af37;         /* Chip gold */
--ace-white: #f5f5f5;        /* Card white */
--ace-navy: #1a2a3a;         /* Dealer navy */

--ace-win: #4ade80;          /* Win green */
--ace-loss: #ef4444;         /* Loss red */
--ace-stand: #60a5fa;        /* Stand blue */
--ace-hit: #fbbf24;          /* Hit yellow */
--ace-double: #a855f7;       /* Double purple */
```

### Typography
```css
/* Card Values */
font-size: 28-36px;
font-weight: 700;
font-family: 'Inter', sans-serif;

/* Button Text */
font-size: 14-16px;
font-weight: 600;
font-family: 'Inter', sans-serif;

/* Monospace (odds, calculations) */
font-family: 'JetBrains Mono', monospace;
font-size: 12px;
```

### Spacing
```css
--card-width: 60px (mobile), 100px (desktop);
--card-height: 88px (mobile), 146px (desktop);
--card-gap: 8-12px;
--button-height: 48px (mobile), 56px (desktop);
--button-gap: 12px;
--padding: 16px (mobile), 24px (desktop);
```

### Animations
```css
/* Card Deal */
animation: deal 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

/* Result Pulse */
animation: resultPulse 0.6s ease-out;

/* Button Hover */
transition: all 0.2s ease-in;
```

---

## Component Checklist

- [x] Player hand display with totals
- [x] Dealer hand with card reveal
- [x] Chip selector and betting area
- [x] Action buttons (Hit, Stand, Double, etc.)
- [x] Game status panel
- [x] Results/outcome modal
- [x] Multiplayer player indicators
- [x] Session statistics
- [x] Mobile responsive layouts
- [x] Card animation system
- [x] Sound cue indicators (optional)
- [x] Settings panel access

---

## Implementation Notes

### Performance
- Card animations: 60fps target (16.67ms frame budget)
- Hand evaluation: <200ms calculation
- Network latency: <500ms acceptable delay
- Rerender optimization: Memoize card components

### Accessibility
- All buttons: Keyboard accessible
- Card values: Readable for colorblind users
- Screen readers: ARIA labels on all states
- High contrast mode: Supported

### Testing
- Unit tests: Hand evaluation logic
- Visual regression: Card animations
- E2E: Full game round workflows
- Accessibility: axe, WAVE, manual testing
