---
title: Blackjack Premium - FAQ
description: Frequently asked questions about Blackjack Premium
---

# Blackjack Premium FAQ

## General Questions

### What is Blackjack Premium?
A professional-grade blackjack game built with React 18, TypeScript, Vite, Tailwind CSS, and Framer Motion, featuring provably fair gameplay.

### What are the system requirements?
- Node.js 18.0.0+
- npm 8.0.0+
- Modern web browser
- 300MB disk space

### Can I play on mobile?
Yes! The game is fully responsive and works on phone, tablet, and desktop.

### How fair is the RNG?
Blackjack Premium uses a security-grade random number generator that is provably fair. See the RNG verification for details.

## Gameplay

### What's the minimum/maximum bet?
- Minimum: $10
- Maximum: $500 (or limited by your balance)

### What if I run out of money?
The demo resets your balance. In production, you'd have deposit options.

### Can I split my hand?
Yes! If you have two cards of the same rank, you can split them into separate hands.

### What about insurance?
Insurance is available when the dealer shows an Ace. It's a side bet that pays 2:1 if the dealer has blackjack.

## Technical

### Why React 18?
Modern, performant frontend framework with excellent animation support and state management.

### What's the tech stack?
- React 18 (UI)
- TypeScript (type safety)
- Vite (fast builds)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Zustand (state)

### Can I integrate this into my app?
Yes! See the [Integration Guide](/docs/ace/integration).

### Is the source code available?
See [GitHub repo](https://github.com/fused-gaming/blackjack-premium) for details.

## Troubleshooting

### Game won't load
```bash
npm install
npm start
```

### Port 5173 already in use
```bash
npm start -- --port 3000
```

### Animations not working
- Enable JavaScript in browser
- Try different browser
- Check for OS animation settings

[More Help →](/docs/ace/integration)
