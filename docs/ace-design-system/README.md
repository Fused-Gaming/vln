# ACE Design System

Modern, accessible component library and design framework for gaming interfaces, built for VLN.gg and Blackjack Premium.

## Overview

ACE (Accessible Component Ecosystem) provides enterprise-grade UI components optimized for:

- **Gaming Interfaces** - Blackjack, card games, and interactive experiences
- **Real-Time Updates** - Low-latency, high-frequency state updates
- **Accessibility** - WCAG AAA compliance and keyboard navigation
- **Mobile-First** - Responsive design for all devices
- **Performance** - Optimized animations and rendering

## Quick Start

### Installation

```bash
npm install ace-design-system
# or
pnpm add ace-design-system
```

### Basic Usage

```tsx
import { Card, Button, GameBoard } from 'ace-design-system';

export function BlackjackGame() {
  return (
    <GameBoard>
      <Card rank="A" suit="hearts" />
      <Button variant="primary">Hit</Button>
    </GameBoard>
  );
}
```

## Documentation

- **[Overview](./01-overview.md)** - Introduction and key concepts
- **[Installation Guide](./02-installation.md)** - Setup and configuration
- **[Design Tokens](./03-design-tokens.md)** - Colors, spacing, typography
- **[Components](./04-components.md)** - Component library reference
- **[Patterns & Layouts](./05-patterns.md)** - Common UI patterns
- **[Accessibility](./06-accessibility.md)** - WCAG compliance and best practices
- **[Performance Guide](./07-performance.md)** - Optimization techniques
- **[API Reference](./08-api-reference.md)** - Complete API documentation
- **[Examples](./09-examples.md)** - Real-world usage examples
- **[Troubleshooting](./10-troubleshooting.md)** - Common issues and solutions

## Design System

### Color Palette

**VLN Core Colors**
- Matte Charcoal: `#0f0f0f`
- Sage Green: `#a6c3a7`
- Warm Blue-Gray: `#aab7c8`
- Soft Glow White: `#f5f5f7`

**Game-Specific Colors**
- Table Green: `#1b5c3a`
- Card Red: `#d4372a`
- Card Black: `#1a1a1a`
- Gold Accent: `#c9a961`

### Typography

**Font Stack**
- Primary: Inter (UI text)
- Secondary: JetBrains Mono (code, technical)
- Display: Inter Bold (headings)

**Scales**
- Display: 48px, 36px, 28px
- Heading: 24px, 20px, 18px
- Body: 16px, 14px, 12px

### Spacing

```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

## Component Categories

### Game Components
- `Card` - Playing card with animations
- `Hand` - Hand display for multiple cards
- `GameBoard` - Main game container
- `PlayerArea` - Player information display
- `DealerArea` - Dealer information display

### Interactive Components
- `Button` - Primary, secondary, ghost variants
- `BetControl` - Bet amount selector with presets
- `ChipStack` - Chip display and selection
- `ActionMenu` - Hit, Stand, Double Down, Split controls

### Display Components
- `ResultModal` - Win/loss result display
- `StateIndicator` - Current game state display
- `BalanceDisplay` - Player balance information
- `Scoreboard` - Game statistics and score

### Form Components
- `Input` - Text input with validation
- `Select` - Dropdown selection
- `Toggle` - On/off switch
- `Checkbox` - Multiple selection

## Accessibility

All components include:
- ✅ WCAG AAA contrast ratios
- ✅ Full keyboard navigation
- ✅ ARIA labels and descriptions
- ✅ Screen reader optimization
- ✅ Focus management
- ✅ Semantic HTML

## Performance

Features for optimal performance:
- CSS-in-JS with automatic critical CSS
- GPU-accelerated animations
- React.memo for component optimization
- Lazy loading for non-critical components
- Image optimization and compression

## Integration with VLN

ACE is deeply integrated with VLN for:

- **Branding** - Consistent design tokens and colors
- **Gameplay** - Card games and interactive experiences
- **Reporting** - Result displays and analytics views
- **Mobile** - Fully responsive mobile-first design

See [VLN Integration Guide](./vln-integration.md) for details.

## File Structure

```
ace-design-system/
├── src/
│   ├── components/
│   │   ├── game/
│   │   │   ├── Card.tsx
│   │   │   ├── Hand.tsx
│   │   │   └── GameBoard.tsx
│   │   ├── interactive/
│   │   │   ├── Button.tsx
│   │   │   ├── BetControl.tsx
│   │   │   └── ActionMenu.tsx
│   │   ├── display/
│   │   │   ├── ResultModal.tsx
│   │   │   └── ScoreBoardrd.tsx
│   │   └── index.ts
│   ├── tokens/
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useGameState.ts
│   │   └── useAnimation.ts
│   └── index.ts
├── docs/
├── examples/
└── package.json
```

## Theming

Customize the design system with theme overrides:

```tsx
import { ThemeProvider, createTheme } from 'ace-design-system';

const customTheme = createTheme({
  colors: {
    primary: '#custom-color',
    // ... other overrides
  },
});

export function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

## Contributing

See [CONTRIBUTING.md](/CONTRIBUTING.md) for contribution guidelines.

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android Latest

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## License

MIT License - See LICENSE file

## Support

- **Documentation**: See links above
- **Issues**: [GitHub Issues](https://github.com/fused-gaming/blackjack-premium/issues)
- **Discussions**: [GitHub Discussions](https://github.com/fused-gaming/blackjack-premium/discussions)

---

**Version**: 2.0.0  
**Last Updated**: May 11, 2026  
**Maintainer**: Fused Gaming Design Team
