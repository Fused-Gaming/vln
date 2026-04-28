---
title: Blackjack Premium - Getting Started  
description: Installation, setup, and playing your first game
---

# Getting Started with Blackjack Premium

## Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher  
- Git
- Modern web browser

## Installation

```bash
# Clone repository
git clone https://github.com/fused-gaming/blackjack-premium.git
cd blackjack-premium

# Install dependencies
npm install

# Start development server
npm start

# Open browser to http://localhost:5173/
```

## Playing Your First Game

1. **Place a Bet** - Click chip button to set wager (min $10, max $500)
2. **Click DEAL** - Receive 2 cards, dealer gets 1 up card
3. **Play Your Hand** - Hit, Stand, Double, or Split
4. **See Results** - Win/Lose/Push determined and balance updated
5. **Play Again** - Click New Game to continue

## Game Actions

- **HIT** - Take another card
- **STAND** - Keep your total
- **DOUBLE** - Double bet, get 1 more card  
- **SPLIT** - Separate matching cards into 2 hands
- **INSURANCE** - Bet 50% against dealer blackjack

## Quick Tips

- Blackjack (21) pays 3:2
- Dealer stands on hard 17
- Aces are 1 or 11 (plays as 11, becomes 1 if bust)
- Cards 2-9 are face value, 10/J/Q/K are 10

## Troubleshooting

```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Start fresh
npm start
```

[Full Getting Started Guide →](/docs/ace/getting-started)
