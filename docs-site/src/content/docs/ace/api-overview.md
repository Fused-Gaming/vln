---
title: Blackjack Premium - Component API
description: React components, hooks, and game engine API for Blackjack Premium
---

# Blackjack Premium Component API

Complete reference for components, hooks, and game engine APIs in Blackjack Premium.

## React Components

### Game Component
Main game container component

```tsx
<Game
  initialBalance={1000}
  minBet={10}
  maxBet={500}
  onGameEnd={(result) => {}}
/>
```

**Props:**
- `initialBalance` (number) - Starting player balance
- `minBet` (number) - Minimum wager
- `maxBet` (number) - Maximum wager  
- `onGameEnd` (function) - Callback when game ends

### Card Component
Individual playing card display with animations

```tsx
<Card
  suit="♠"
  rank="A"
  faceUp={true}
  animated={true}
/>
```

**Props:**
- `suit` (string) - ♠ ♥ ♦ ♣
- `rank` (string) - A, 2-10, J, Q, K
- `faceUp` (boolean) - Show or hide card
- `animated` (boolean) - Play entrance animation

### Hand Component
Display player or dealer hand with value

```tsx
<Hand
  cards={[card1, card2]}
  position="player"
  showValue={true}
/>
```

**Props:**
- `cards` (Card[]) - Array of cards
- `position` ("player" | "dealer") - Hand position
- `showValue` (boolean) - Display total value

### ActionButtons Component
Hit, Stand, Double, Split controls

```tsx
<ActionButtons
  canHit={true}
  canStand={true}
  canDouble={true}
  canSplit={false}
  onHit={() => {}}
  onStand={() => {}}
  onDouble={() => {}}
  onSplit={() => {}}
/>
```

### BetControls Component
Betting interface with chip buttons

```tsx
<BetControls
  balance={1000}
  currentBet={50}
  minBet={10}
  maxBet={500}
  onBetChange={(amount) => {}}
/>
```

## Custom Hooks

### useGame
Main game state hook

```tsx
const game = useGame({
  initialBalance: 1000,
  minBet: 10,
  maxBet: 500
});

// Returns:
// {
//   balance: number
//   currentBet: number
//   dealerHand: Card[]
//   playerHands: Card[][]
//   gamePhase: 'betting' | 'playing' | 'results'
//   deal: () => void
//   hit: () => void
//   stand: () => void
//   double: () => void
//   split: () => void
// }
```

### useHand
Hand evaluation and management

```tsx
const hand = useHand(cards);

// Returns:
// {
//   value: number
//   isBust: boolean
//   isBlackjack: boolean
//   canSplit: boolean
// }
```

### useRNG
Random number generation interface

```tsx
const rng = useRNG();

// Methods:
rng.shuffle(deck) // Shuffle deck
rng.deal()        // Draw random card
rng.verify()      // Verify fairness
```

## Game Engine

### Deck Management

```typescript
const deck = new Deck();
deck.shuffle();        // Randomize deck
const card = deck.deal();  // Get next card
const remaining = deck.remaining();  // Cards left
```

### Hand Evaluation

```typescript
const hand = new Hand([cardA, cardB]);
const value = hand.getValue();     // 21
const isBust = hand.isBust();      // false
const isBlackjack = hand.isBlackjack(); // true
```

### Dealer Logic

```typescript
const dealer = new Dealer(hand);
const shouldHit = dealer.shouldHit();  // boolean
dealer.playHand();  // Execute dealer turn
```

## Type Definitions

```typescript
interface Card {
  suit: 'spades' | 'hearts' | 'diamonds' | 'clubs';
  rank: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
}

interface Hand {
  cards: Card[];
  value: number;
  isBust: boolean;
  isBlackjack: boolean;
}

interface GameState {
  phase: 'betting' | 'playing' | 'results';
  playerBalance: number;
  currentBet: number;
  dealerHand: Card[];
  playerHands: Card[][];
  result: 'win' | 'lose' | 'push' | null;
}
```

## Next Steps

- [Getting Started](/docs/ace/getting-started) - Install and play
- [Game Mechanics](/docs/ace/game-mechanics) - Rules and gameplay
- [Integration Guide](/docs/ace/integration) - Use in your project
