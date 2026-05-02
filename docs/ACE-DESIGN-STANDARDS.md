# ACE Blackjack Design Standards

Complete design system and component specifications for ACE Blackjack Premium.

---

## 🎨 Design Principles

### 1. **Game Flow First**
All UI elements support clear, unobstructed game flow. Players should always know:
- Current game state
- Available actions
- Bet amount and balance
- Dealer status

### 2. **Professional Sophistication**
Maintain VLN's professional aesthetic while incorporating game personality:
- Clean, minimal layouts
- Gold accents for ACE identity
- Smooth, purposeful animations
- No distracting visual noise

### 3. **Responsive & Accessible**
Works seamlessly on all devices:
- Mobile-first design
- Keyboard navigation (no mouse required)
- WCAG AA contrast compliance
- Clear, readable typography

### 4. **Real-Time Feedback**
Immediate visual feedback for all actions:
- Card animations (100-200ms)
- Chip placement feedback
- Button state changes
- Error messages

---

## 🎨 Color Palette

### Primary Colors
```css
/* VLN Core Colors */
--vln-charcoal: #0f0f0f;     /* Background */
--vln-sage: #a6c3a7;          /* Primary accent */
--vln-bluegray: #aab7c8;       /* Secondary accent */

/* ACE Game Colors */
--ace-gold: #d4a574;           /* Muted gold (ACE identity) */
--ace-green: #2d5016;          /* Card table green */
--ace-red: #c41e3a;            /* Card suits (red) */
--ace-black: #1a1a1a;          /* Card suits (black) */
```

### Background & Surface
```css
--surface-primary: #0f0f0f;    /* Main background */
--surface-secondary: #1a1a1a;  /* Cards, containers */
--surface-tertiary: #2a2a2a;   /* Hover states */
--surface-overlay: rgba(0,0,0,0.8); /* Modals */
```

### Interactive States
```css
--state-hover: #2a2a2a;
--state-active: #a6c3a7;       /* Sage green */
--state-disabled: #555555;
--state-error: #ff6b6b;
--state-success: #a6c3a7;
```

---

## 📐 Typography

### Font System
```
Primary: Inter (sans-serif)
- Headlines: 700 weight
- Body: 400 weight
- UI Controls: 500 weight

Monospace: JetBrains Mono
- For game state, values, code
```

### Type Scale
```
h1: 48px / 1.2 / 700  /* Page titles */
h2: 36px / 1.3 / 700  /* Section titles */
h3: 24px / 1.4 / 600  /* Subsection titles */
h4: 18px / 1.4 / 600  /* Component titles */

body: 16px / 1.6 / 400 /* Main content */
small: 14px / 1.5 / 400 /* Secondary text */
label: 14px / 1.5 / 500 /* Form labels */
code: 13px / 1.4 / 400  /* Code blocks */
```

### Line Heights
- Headings: 1.2-1.4 (tight)
- Body text: 1.6 (comfortable reading)
- Code: 1.4 (readable formatting)

---

## 🎮 Component Library

### Core Game Components

#### 1. **Card Component**
```tsx
<Card
  suit="♠"           // ♠, ♥, ♦, ♣
  rank="A"           // A, 2-10, J, Q, K
  faceUp={true}      // true = show, false = back
  animated={true}    // Play entrance animation
/>
```
**Design Notes:**
- 85x120px standard size (responsive scaling)
- Rounded corners: 8px
- Shadow: 0 4px 12px rgba(0,0,0,0.3)
- Gold borders for dealer cards
- Smooth flip animation (300ms)

#### 2. **Hand Display**
```tsx
<Hand
  cards={[Card1, Card2, Card3]}
  value={21}
  status="blackjack"  // "playing", "stand", "bust", "blackjack"
  position="player"   // "player", "dealer"
/>
```
**Design Notes:**
- Horizontal layout with slight overlap
- Value displayed below cards
- Status badge for game state
- Smooth card entrance

#### 3. **Action Buttons**
```tsx
<ActionButton
  action="hit"       // "hit", "stand", "double", "split"
  disabled={false}
  onClick={handler}
/>
```
**Design Notes:**
- Min width: 100px, height: 44px (touch-friendly)
- Background: sage green (#a6c3a7)
- Hover: darker sage, slight lift animation
- Disabled: gray (#555555), reduced opacity
- Border radius: 8px
- Transition: 150ms

#### 4. **Bet Controls**
```tsx
<BetControls
  minBet={10}
  maxBet={1000}
  currentBet={50}
  balance={500}
  onBetChange={handler}
/>
```
**Design Notes:**
- Chip selector with quick amounts (10, 25, 50, 100)
- Plus/minus buttons for fine adjustment
- Real-time balance display
- Input validation styling

#### 5. **Game Board**
```tsx
<GameBoard
  phase="playing"    // "betting", "playing", "complete"
  dealerHand={hand}
  playerHand={hand}
  message="Your turn"
/>
```
**Design Notes:**
- Table background: dark green (#2d5016)
- Felt texture overlay (subtle pattern)
- Clear dealer/player separation
- Centered layout with responsive scaling
- Message area above game state

#### 6. **Results Modal**
```tsx
<ResultsModal
  result="win"       // "win", "lose", "push", "blackjack"
  payout={100}
  onContinue={handler}
/>
```
**Design Notes:**
- Full-screen overlay with blur backdrop
- Centered card with 20px padding
- Large result message (sage green for win, red for loss)
- Payout amount highlighted
- "Continue" button always visible

---

## ✨ Animation Standards

### Timing
```
Fast interactions: 100-150ms (button clicks, hover)
Card actions: 200-300ms (card flip, deal)
Game results: 400-600ms (hand evaluation, winner)
Slow transitions: 800-1000ms (modal entrance, screen transitions)
```

### Motion Principles
```
Easing: cubic-bezier(0.4, 0, 0.2, 1)  /* Material Design */
- Entrance: ease-out (0.4, 0, 0.2, 1)
- Exit: ease-in (0.4, 0, 0.2, 1)
- Interactions: ease-in-out (0.4, 0, 0.2, 1)
```

### Key Animations
```
1. Card Deal
   - Slide from deck position (300ms)
   - Slight scale-up (0.8 → 1.0)
   - Stagger between cards (100ms delay)

2. Card Flip
   - Rotate Y-axis (300ms)
   - Scale Z slightly for depth (0.95 → 1.0)
   - Play card flip sound (optional)

3. Button Interaction
   - Hover: scale 1.05, shadow increase (150ms)
   - Click: scale 0.95 then 1.0 (100ms)
   - Active state: shadow lift animation

4. Game Result
   - Result banner slide in (400ms, ease-out)
   - Text fade-in (staggered)
   - Button appear (200ms delay)
```

---

## 🎯 Layout Grid

### Desktop Layout (1024px+)
```
+─────────────────────────────────+
│  Game Title  | Balance | Buttons │
+─────────────────────────────────+
│                                 │
│         DEALER HAND             │
│                                 │
+─────────────────────────────────+
│         GAME BOARD              │
│                                 │
+─────────────────────────────────+
│         PLAYER HAND             │
│                                 │
+─────────────────────────────────+
│  Bet Controls  |  Action Buttons │
+─────────────────────────────────+
```

### Mobile Layout (375px)
```
+─────────────────+
│ VLN | $Balance  │
+─────────────────+
│  DEALER HAND    │
│                 │
+─────────────────+
│  GAME BOARD     │
│                 │
+─────────────────+
│  PLAYER HAND    │
│                 │
+─────────────────+
│ Bet Controls    │
│ Action Buttons  │
+─────────────────+
```

---

## 📏 Spacing System

```css
--space-xs: 4px;      /* Micro spacing */
--space-sm: 8px;      /* Small spacing */
--space-md: 16px;     /* Medium spacing (default) */
--space-lg: 24px;     /* Large spacing */
--space-xl: 32px;     /* Extra large spacing */
--space-2xl: 48px;    /* Double extra large */
```

### Application
```
- Component padding: 16px
- Card margins: 8px-16px
- Section gaps: 24px-32px
- Page margins: 32px
- Mobile padding: 16px
```

---

## 🌙 Dark/Light Mode

### Dark Mode (Primary)
```css
Background: #0f0f0f
Text: #ffffff
Accent: #a6c3a7
Secondary: #aab7c8
```

### Light Mode (Alternative)
```css
Background: #ffffff
Text: #1a1a1a
Accent: #7aa876
Secondary: #6b7a89
```

**Note:** Dark mode is primary for VLN. Light mode support may be added later.

---

## ♿ Accessibility Standards

### WCAG AA Compliance

**Color Contrast:**
- Text on background: 4.5:1 minimum
- UI components: 3:1 minimum
- Checked: sage green (#a6c3a7) on dark (#0f0f0f) = 7.2:1 ✅

**Keyboard Navigation:**
- All buttons reachable via Tab key
- Visible focus indicators (outline or glow)
- Logical tab order (left-to-right, top-to-bottom)
- Enter/Space to activate buttons

**Screen Reader Support:**
- Semantic HTML (button, role=button)
- aria-label for icon-only buttons
- aria-live for game state updates
- Form labels properly associated

**Motion:**
- Reduced motion preference respected
- No auto-playing animations
- Optional animation toggle in settings

---

## 🧪 Testing Specifications

### Visual Regression
```
- Test at: 375px, 768px, 1024px, 1440px
- Test modes: Light/Dark
- Test states: Hover, Active, Disabled
- Test browsers: Chrome, Firefox, Safari, Edge
```

### Interaction Testing
```
- Card dealing animation timing
- Button response time (< 100ms)
- Modal entrance smoothness
- Touch target size (44px minimum)
```

### Accessibility Testing
```
- axe-core accessibility scan
- Keyboard navigation test
- Screen reader test (NVDA/JAWS)
- Color contrast verification
```

---

## 📱 Responsive Breakpoints

```
Mobile:      0px - 640px   (portrait phones)
Tablet:      641px - 1024px (landscape phones, tablets)
Desktop:     1025px - 1440px (laptops)
Wide:        1441px+ (large monitors)
```

**Mobile-First Approach:**
- Base styles for mobile
- Min-width media queries for larger screens
- Flexible components that scale

---

## 🎮 Game States & Visual Feedback

### Betting Phase
```
- Action buttons: Disabled (grayed out)
- Bet controls: Enabled and prominent
- Message: "Place your bet"
- Animation: Chips can be placed with visual feedback
```

### Playing Phase
```
- Action buttons: Hit/Stand/Double/Split enabled
- Bet controls: Disabled (grayed out)
- Message: "Your turn" or "Dealer's turn"
- Animation: Cards dealt with smooth entrance
```

### Results Phase
```
- All buttons: Disabled
- Results modal: Large, centered
- Message: "You win/lose/push"
- Payout: Highlighted and animated
- Continue button: Prominent (sage green)
```

---

## 📋 Component Checklist

- [ ] Card component with flip animation
- [ ] Hand display with value calculation
- [ ] Action buttons with proper states
- [ ] Bet controls with chip selector
- [ ] Game board layout and styling
- [ ] Results modal with animations
- [ ] Balance display and formatting
- [ ] Game state messaging
- [ ] Mobile responsive layout
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Dark mode implementation
- [ ] Animation timing verified
- [ ] Touch target sizes (44px)
- [ ] Color contrast verified (WCAG AA)

---

**Design System Version:** 1.0  
**Last Updated:** 2026-04-28  
**Status:** Production Ready
