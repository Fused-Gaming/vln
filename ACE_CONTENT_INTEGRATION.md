# ACE Blackjack Content Integration

This document outlines the ACE content structure for both design and documentation systems.

## Overview

ACE content is integrated across two key platforms:

1. **Design System** - Visual components and design patterns
2. **Documentation** - Technical guides, API reference, and examples

## Design System (design.vln.gg/ace)

**Location:** `/app/internal/ace-design-system/page.tsx`

**URL:** http://localhost:3000/internal/ace-design-system

### Content Sections

1. **Color Palette**
   - VLN core colors (sage green, blue-gray, charcoal, white)
   - ACE game colors (muted gold, table green, red suits, black suits)
   - Visual swatches with hex values
   - Usage guidelines

2. **Design Tokens**
   - Spacing scale (xs, sm, md, lg, xl)
   - Typography (Inter primary, JetBrains Mono secondary)
   - Border radius and effects
   - Animation timings

3. **Component Library**
   - Card component with flip animation
   - Hand display component
   - Action buttons (Hit, Stand, Double Down, Split)
   - Bet controls with chips and presets
   - Game board layout
   - Results modal

4. **Examples & Patterns**
   - Game state examples (playing, betting, resolved)
   - Animation demonstrations
   - Mobile responsive layouts
   - Accessibility features

## Documentation (docs.vln.gg/ace)

**Location:** `/app/docs/ace-blackjack/` with dynamic routing

**Base URL:** /docs/ace-blackjack/

### Navigation Structure

The ACE section in docs contains 6 main pages accessed via `/docs/ace-blackjack/{section}/`:

### 1. Overview (`/docs/ace-blackjack/overview`)
**File:** `/app/docs/ace-blackjack/overview/content.mdx`

Covers:
- Game rules and mechanics
- Card values and win conditions
- Game flow phases
- Player actions (hit, stand, double down, split)
- Payout structure
- House edge and soft hand rules
- Terminology

### 2. Getting Started (`/docs/ace-blackjack/getting-started`)
**File:** `/app/docs/ace-blackjack/getting-started/content.mdx`

Covers:
- Prerequisites
- Installation via npm/pnpm
- Basic initialization
- Configuration options
- Validation and error handling
- Testing setup
- Environment variables
- Common setup issues

### 3. API Reference (`/docs/ace-blackjack/api-reference`)
**File:** `/app/docs/ace-blackjack/api-reference/content.mdx`

Complete API documentation:

**Player API:**
- `initialize()` - Initialize game
- `setPlayerBalance()` - Set player balance
- `getPlayerBalance()` - Get current balance
- `startSession()` - Start new session
- `getPlayer()` - Get player state

**Betting API:**
- `isValidBet()` - Validate bet amount
- `placeBet()` - Place a bet
- `getBetLimits()` - Get table limits

**Game State API:**
- `deal()` - Deal initial cards
- `getGameState()` - Get current state
- `getAvailableActions()` - Get available actions
- `getOutcome()` - Get hand outcome

**Player Actions API:**
- `hit()` - Request additional card
- `stand()` - End player's turn
- `doubleDown()` - Double bet and draw one card
- `split()` - Split a pair

**Event API:**
- `on()` - Register event listener
- `off()` - Unregister event listener

Event types: gameStart, dealCards, playerAction, dealerAction, gameEnd, balanceUpdate, error

**Utility Methods:**
- `setAnimationSpeed()` - Control animation speed
- `getStats()` - Get session statistics
- `endSession()` - End game session

### 4. Integration Guide (`/docs/ace-blackjack/integration-guide`)
**File:** `/app/docs/ace-blackjack/integration-guide/content.mdx`

Covers:
- Component architecture
- Basic component integration
- Game board setup
- State management with React hooks
- Custom hook patterns
- Event handling examples
- Custom UI components
- Responsive layout patterns
- Performance optimization
- Memoization strategies

### 5. Code Examples (`/docs/ace-blackjack/code-examples`)
**File:** `/app/docs/ace-blackjack/code-examples/content.mdx`

Practical examples:
- Complete minimal example
- Advanced game with state management
- Betting integration example
- Event listener patterns
- Performance-optimized rendering
- Testing examples

### 6. FAQ & Troubleshooting (`/docs/ace-blackjack/faq`)
**File:** `/app/docs/ace-blackjack/faq/content.mdx`

Comprehensive Q&A covering:
- Game rules and mechanics questions
- Getting started questions
- Integration and component questions
- Performance and optimization questions
- Betting and balance questions
- Event handling questions

**Troubleshooting sections:**
- Initialization issues
- Betting issues
- Game state issues
- UI and rendering issues
- Event handling issues
- Testing issues

Plus: performance tips, accessibility tips, browser support

## File Structure

```
app/
├── internal/
│   └── ace-design-system/
│       └── page.tsx                    # Design system page (GET /internal/ace-design-system)
│
└── docs/
    └── ace-blackjack/
        ├── overview/
        │   └── content.mdx
        ├── getting-started/
        │   └── content.mdx
        ├── api-reference/
        │   └── content.mdx
        ├── integration-guide/
        │   └── content.mdx
        ├── code-examples/
        │   └── content.mdx
        └── faq/
            └── content.mdx

lib/
└── docs/
    └── sitemap.ts                      # Updated with ace-blackjack section
```

## Access Points

### Design System
- **URL:** `/internal/ace-design-system`
- **Purpose:** Visual reference for ACE design tokens and components
- **Audience:** Designers, frontend developers

### Documentation
- **Base URL:** `/docs/ace-blackjack`
- **Overview:** `/docs/ace-blackjack/overview`
- **Getting Started:** `/docs/ace-blackjack/getting-started`
- **API Reference:** `/docs/ace-blackjack/api-reference`
- **Integration Guide:** `/docs/ace-blackjack/integration-guide`
- **Code Examples:** `/docs/ace-blackjack/code-examples`
- **FAQ:** `/docs/ace-blackjack/faq`

**Purpose:** Technical documentation for developers integrating ACE
**Audience:** Backend developers, integrations engineers

## Sitemap Integration

The ACE blackjack section has been added to `/lib/docs/sitemap.ts` with:
- **Slug:** `ace-blackjack`
- **Title:** ACE Blackjack
- **Icon:** 🃏
- **Order:** 11 (appears after existing 10 sections)
- **Pages:** 6 pages as listed above

This automatically integrates into:
- Sidebar navigation
- Breadcrumb trails
- Next/Previous page navigation
- Search functionality

## Rendering

Both design system and documentation pages render automatically:

1. **Design System:** Static page via `/app/internal/ace-design-system/page.tsx`
2. **Documentation:** Dynamic rendering via `/app/docs/[section]/[page]/page.tsx`
   - The existing doc page renderer displays content from mdx files
   - Content is rendered with prose styling and navigation

## Color System Reference

When creating additional ACE content, use these VLN-approved colors:

**Primary Actions:**
- `bg-vln-sage` / `text-vln-sage` - Sage green (#86d993)

**Secondary Actions:**
- `bg-vln-bluegray` / `text-vln-bluegray` - Blue-gray (#7dd3fc)

**Highlights/Wins:**
- `bg-vln-amber` / `text-vln-amber` - Muted gold (#fbbf24)

**Backgrounds:**
- `bg-vln-bg` - Base charcoal (#0a0e0f)
- `bg-vln-bg-light` - Light charcoal (#151a1c)

**Text:**
- `text-white` - Primary text
- `text-gray-400` - Secondary text
- `text-gray-500` - Tertiary text

**Game-specific:**
- `bg-emerald-900` - Table felt background

## Future Enhancements

Potential additions to ACE content:

1. **Interactive Component Playground** - Live component editor
2. **Animation Showcase** - Interactive animation demonstrations
3. **Accessibility Audit** - WCAG compliance details
4. **Performance Metrics** - Load time and rendering benchmarks
5. **Video Tutorials** - Step-by-step integration videos
6. **Live Examples** - Embedded playable game instances
7. **Storybook Integration** - Component story catalog
8. **Deployment Guides** - Hosting and scaling recommendations

## Content Maintenance

All content files are versioned in git. To update ACE content:

1. Edit the corresponding mdx file in `/app/docs/ace-blackjack/`
2. Or edit the design system page at `/app/internal/ace-design-system/page.tsx`
3. Run `pnpm build` to verify rendering
4. Create a PR against `integration/vln` branch
5. Request review from design and development teams

## Notes

- Design system page is NOT in the documentation sidebar
- All documentation pages ARE in the sidebar under "ACE Blackjack"
- Documentation pages support dynamic params for future expansion
- Sitemap automatically generates navigation UI
- Color tokens are defined in `/tailwind.config.ts`
