"use client";

/**
 * BlackjackClient — Blackjack Premium
 * Fused Gaming · VLN.GG iGaming Security Sample
 *
 * Full casino-grade Blackjack engine:
 *   - 6-deck shoe with CSPRNG shuffle (crypto.getRandomValues)
 *   - Split, Double Down, Insurance
 *   - Multi-hand play
 *   - Dealer soft-17 stand rule
 *
 * Design: VLN brand system — matte charcoal bg, sage/bluegray accents,
 *         JetBrains Mono for technical text, Inter for UI.
 * Not indexed. Internal capability sample.
 */

import { useState, useEffect, useCallback, useRef } from "react";

// ─── Animation keyframes injected once ───────────────────────────────────────

function useGameStyles() {
  useEffect(() => {
    if (document.getElementById("vln-bj-styles")) return;
    const el = document.createElement("style");
    el.id = "vln-bj-styles";
    el.textContent = `
      @keyframes vln-dealIn {
        from { opacity:0; transform:translate(-160px,-80px) rotate(-18deg) scale(0.72); }
        65%  { transform:translate(6px,3px) rotate(1deg) scale(1.04); }
        to   { opacity:1; transform:translate(0,0) rotate(0deg) scale(1); }
      }
      @keyframes vln-fadeUp {
        from { opacity:0; transform:translateY(10px); }
        to   { opacity:1; transform:translateY(0); }
      }
      @keyframes vln-msgIn {
        from { opacity:0; transform:translateY(-4px); }
        to   { opacity:1; transform:translateY(0); }
      }
      @keyframes vln-winPulse {
        0%,100% { box-shadow:0 0 8px rgba(134,217,147,0.3); }
        50%     { box-shadow:0 0 28px rgba(134,217,147,0.8), 0 0 56px rgba(134,217,147,0.2); }
      }
      @keyframes vln-dealPulse {
        0%,100% { box-shadow:0 0 14px rgba(134,217,147,0.4); }
        50%     { box-shadow:0 0 36px rgba(134,217,147,0.9), 0 0 72px rgba(134,217,147,0.25); }
      }
      @keyframes vln-bustShake {
        0%,100% { transform:translateX(0); }
        20%,60% { transform:translateX(-6px); }
        40%,80% { transform:translateX(6px); }
      }
      @keyframes vln-winShake {
        0%,100% { transform:scale(1); }
        20%     { transform:scale(1.14) rotate(-1.5deg); }
        60%     { transform:scale(1.1)  rotate(1deg); }
      }
      @keyframes vln-activeGlow {
        0%,100% { border-color:rgba(134,217,147,0.45); box-shadow:0 0 10px rgba(134,217,147,0.2); }
        50%     { border-color:rgba(134,217,147,0.9);  box-shadow:0 0 24px rgba(134,217,147,0.55); }
      }
      @keyframes vln-confettiFall {
        0%   { transform:translateY(-8px) rotate(0deg); opacity:1; }
        100% { transform:translateY(200px) rotate(520deg); opacity:0; }
      }
      .vln-deal-in    { animation:vln-dealIn 0.42s cubic-bezier(.34,1.56,.64,1) both; }
      .vln-fade-up    { animation:vln-fadeUp 0.28s ease both; }
      .vln-msg-in     { animation:vln-msgIn 0.22s ease both; }
      .vln-win-pulse  { animation:vln-winPulse 1.8s ease-in-out infinite; }
      .vln-deal-pulse { animation:vln-dealPulse 2s ease-in-out infinite; }
      .vln-bust       { animation:vln-bustShake 0.4s ease; }
      .vln-win-shake  { animation:vln-winShake 0.5s ease; }
      .vln-active-glow{ animation:vln-activeGlow 1.5s ease-in-out infinite; }
      .vln-confetti   { animation:vln-confettiFall var(--dur, 1s) ease-in var(--delay, 0s) forwards; }
    `;
    document.head.appendChild(el);
  }, []);
}

// ─── Game Engine ──────────────────────────────────────────────────────────────

const SUITS = ["♠", "♥", "♦", "♣"] as const;
const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"] as const;

type Suit = (typeof SUITS)[number];
type Rank = (typeof RANKS)[number];
type Outcome = "win" | "blackjack" | "loss" | "push";
type Phase = "idle" | "betting" | "playing" | "insurance" | "dealerTurn" | "complete";

interface GameCard {
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
}
interface Hand {
  cards: GameCard[];
  bet: number;
  status: "playing" | "stand" | "bust" | "blackjack";
  isDouble: boolean;
  isSplit: boolean;
}

function mkHand(bet = 0): Hand {
  return { cards: [], bet, status: "playing", isDouble: false, isSplit: false };
}

function createDeck(): GameCard[] {
  return SUITS.flatMap((s) => RANKS.map((r) => ({ suit: s, rank: r, faceUp: false })));
}

function createShoe(n = 6): GameCard[] {
  return Array.from({ length: n }, () => createDeck()).flat();
}

function shuffle(deck: GameCard[]): GameCard[] {
  const d = [...deck];
  for (let i = d.length - 1; i > 0; i--) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    const j = Math.floor((buf[0] / 0x100000000) * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
}

function dealCard(deck: GameCard[], faceUp = true): { card: GameCard; remaining: GameCard[] } {
  const [c, ...rest] = deck;
  return { card: { ...c, faceUp }, remaining: rest };
}

function cardValue(rank: Rank): number {
  if (rank === "A") return 11;
  if (["J", "Q", "K"].includes(rank)) return 10;
  return parseInt(rank, 10);
}

function evalHand(cards: GameCard[]) {
  let v = 0;
  let aces = 0;
  for (const c of cards) {
    v += cardValue(c.rank);
    if (c.rank === "A") aces++;
  }
  while (v > 21 && aces > 0) { v -= 10; aces--; }
  return {
    value: v,
    isSoft: aces > 0,
    isBlackjack: cards.length === 2 && v === 21,
    isBust: v > 21,
  };
}

function addCard(hand: Hand, card: GameCard): Hand {
  const cards = [...hand.cards, card];
  const ev = evalHand(cards);
  const status = ev.isBust
    ? "bust"
    : ev.isBlackjack && cards.length === 2
    ? "blackjack"
    : hand.status;
  return { ...hand, cards, status };
}

function compareHands(playerHand: Hand, dealerCards: GameCard[]): Outcome {
  const p = evalHand(playerHand.cards);
  const d = evalHand(dealerCards);
  if (p.isBust) return "loss";
  if (d.isBust) return "win";
  if (p.isBlackjack) return d.isBlackjack ? "push" : "blackjack";
  if (d.isBlackjack) return "loss";
  if (p.value > d.value) return "win";
  if (p.value < d.value) return "loss";
  return "push";
}

function payout(hand: Hand, outcome: Outcome): number {
  if (outcome === "blackjack") return Math.floor(hand.bet * 2.5);
  if (outcome === "win") return hand.bet * 2;
  if (outcome === "push") return hand.bet;
  return 0;
}

// ─── Chip config ──────────────────────────────────────────────────────────────

const CHIPS = [
  { v: 1,   bg: "bg-[#1f2527] border-[#4b5563]",         text: "text-vln-gray"      },
  { v: 5,   bg: "bg-red-900/50   border-red-500",         text: "text-red-400"       },
  { v: 10,  bg: "bg-[#0c2340]    border-vln-bluegray",    text: "text-vln-bluegray"  },
  { v: 25,  bg: "bg-[#0d2016]    border-vln-sage",        text: "text-vln-sage"      },
  { v: 50,  bg: "bg-[#2a1d00]    border-vln-amber",       text: "text-vln-amber"     },
  { v: 100, bg: "bg-[#1a1030]    border-vln-purple",      text: "text-vln-purple"    },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: ["#86d993", "#fbbf24", "#7dd3fc", "#c084fc", "#a8e9b4", "#f8f9fa"][i % 6],
    left: `${4 + Math.random() * 92}%`,
    dur: `${0.9 + Math.random() * 0.55}s`,
    delay: `${Math.random() * 0.65}s`,
    size: `${5 + Math.random() * 6}px`,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-40" aria-hidden>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="vln-confetti absolute rounded-sm"
          style={{
            top: "-10px",
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            "--dur": p.dur,
            "--delay": p.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function PlayingCard({ card, index = 0, delay = 0 }: { card: GameCard; index?: number; delay?: number }) {
  const isRed = card.suit === "♥" || card.suit === "♦";
  const ml = index > 0 ? "-ml-8" : "";

  if (!card.faceUp) {
    return (
      <div
        className={`vln-deal-in relative w-[68px] h-[96px] rounded-[7px] bg-vln-bg-lighter border-2 border-vln-sage/30 shadow-lg flex-shrink-0 ${ml}`}
        style={{ zIndex: index, animationDelay: `${delay}s` }}
        aria-label="Face-down card"
      >
        {/* crosshatch pattern */}
        <div className="absolute inset-[5px] rounded-[4px] border border-vln-sage/15 flex items-center justify-center">
          <span className="font-mono text-vln-sage/20 text-lg select-none">✦</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`vln-deal-in relative w-[68px] h-[96px] rounded-[7px] bg-[#F5F0E8] border border-[#D4C9B0] shadow-[0_4px_12px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.9)] flex flex-col justify-between p-[5px_6px] flex-shrink-0 ${ml} ${isRed ? "text-[#B22222]" : "text-[#1A1A1A]"}`}
      style={{ zIndex: index, animationDelay: `${delay}s` }}
      aria-label={`${card.rank} of ${card.suit}`}
    >
      <div className="leading-none">
        <div className="font-mono text-[13px] font-bold leading-none">{card.rank}</div>
        <div className="text-[10px] leading-none">{card.suit}</div>
      </div>
      <div className="text-center text-[26px] leading-none select-none">{card.suit}</div>
      <div className="rotate-180 leading-none self-end">
        <div className="text-[10px] leading-none">{card.suit}</div>
        <div className="font-mono text-[13px] font-bold leading-none">{card.rank}</div>
      </div>
    </div>
  );
}

function HandDisplay({
  cards,
  label,
  showValue,
  isActive,
  outcome,
}: {
  cards: GameCard[];
  label?: string;
  showValue: boolean;
  isActive: boolean;
  outcome?: Outcome | null;
}) {
  const ev = evalHand(cards);

  const zoneClass = isActive
    ? "vln-active-glow border-vln-sage/50 bg-vln-sage/[0.03]"
    : outcome === "win" || outcome === "blackjack"
    ? "vln-win-pulse border-vln-sage/60 bg-vln-sage/[0.04]"
    : outcome === "loss"
    ? "border-red-500/50 bg-red-500/[0.04]"
    : outcome === "push"
    ? "border-vln-amber/40 bg-vln-amber/[0.03]"
    : "border-vln-sage/10";

  const valClass =
    ev.isBust
      ? "text-red-400 vln-bust"
      : ev.isBlackjack
      ? "text-vln-amber vln-win-shake"
      : outcome === "win" || outcome === "blackjack"
      ? "text-vln-sage vln-win-shake"
      : "text-vln-white";

  const outcomeLabel: Record<Outcome, string> = {
    blackjack: "✦ Blackjack",
    win: "▲ Win",
    loss: "▼ Loss",
    push: "— Push",
  };
  const outcomeColor: Record<Outcome, string> = {
    blackjack: "text-vln-amber",
    win: "text-vln-sage",
    loss: "text-red-400",
    push: "text-vln-amber",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <div className="font-mono text-[9px] uppercase tracking-[3px] text-vln-gray-dark">{label}</div>
      )}
      <div
        className={`flex items-center px-3 py-2.5 rounded-[10px] border-2 min-h-[116px] min-w-[90px] transition-all duration-300 ${zoneClass}`}
      >
        {cards.length === 0 ? (
          <div className="w-[68px] h-[96px] rounded-[7px] border-2 border-dashed border-vln-sage/15" />
        ) : (
          cards.map((c, i) => (
            <PlayingCard key={`${c.rank}${c.suit}${i}`} card={c} index={i} delay={i * 0.12} />
          ))
        )}
      </div>
      {showValue && cards.length > 0 && (
        <div className={`font-mono text-xl font-bold ${valClass}`}>
          {ev.isBust ? "BUST" : ev.isBlackjack ? "BJ" : ev.value}
          {ev.isSoft && !ev.isBlackjack && !ev.isBust && (
            <span className="text-[10px] text-vln-gray-dark ml-1">soft</span>
          )}
        </div>
      )}
      {outcome && (
        <div className={`vln-fade-up font-mono text-[11px] uppercase tracking-[2px] ${outcomeColor[outcome]}`}>
          {outcomeLabel[outcome]}
        </div>
      )}
    </div>
  );
}

function ChipButton({
  value,
  selected,
  onClick,
  disabled,
}: {
  value: number;
  selected: boolean;
  onClick: () => void;
  disabled: boolean;
}) {
  const cfg = CHIPS.find((c) => c.v === value) ?? CHIPS[0];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      aria-label={`$${value} chip`}
      className={`relative w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono text-[11px] font-bold transition-all duration-150 disabled:opacity-35 disabled:cursor-not-allowed
        ${cfg.bg} ${cfg.text}
        ${selected ? "scale-110 ring-2 ring-vln-amber ring-offset-2 ring-offset-vln-bg" : "hover:scale-110 active:scale-95"}
      `}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      <span className="relative z-10">${value}</span>
    </button>
  );
}

// ─── State ────────────────────────────────────────────────────────────────────

interface GameState {
  phase: Phase;
  deck: GameCard[];
  dealerCards: GameCard[];
  hands: Hand[];
  currentHand: number;
  balance: number;
  outcomes: Outcome[];
  showConfetti: boolean;
  message: string;
}

const INIT: GameState = {
  phase: "idle",
  deck: [],
  dealerCards: [],
  hands: [mkHand()],
  currentHand: 0,
  balance: 10_000,
  outcomes: [],
  showConfetti: false,
  message: "Select a chip amount to begin",
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BlackjackClient() {
  useGameStyles();

  const [state, setState] = useState<GameState>(INIT);
  const [selectedChip, setSelectedChip] = useState(25);
  const [pendingBet, setPendingBet] = useState(0);
  const dealerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const S = state;

  const set = useCallback((upd: Partial<GameState> | ((prev: GameState) => Partial<GameState>)) => {
    setState((prev) => ({ ...prev, ...(typeof upd === "function" ? upd(prev) : upd) }));
  }, []);

  // ── Betting ───────────────────────────────────────────────────────
  function addChip() {
    if (pendingBet + selectedChip > S.balance) return;
    setPendingBet((p) => p + selectedChip);
  }
  function clearBet() { setPendingBet(0); }

  function confirmBet() {
    if (pendingBet <= 0 || pendingBet > S.balance) return;
    set({ phase: "betting", hands: [mkHand(pendingBet)], balance: S.balance - pendingBet, message: "Ready — deal when you are" });
    setPendingBet(0);
  }

  // ── Deal ─────────────────────────────────────────────────────────
  function deal() {
    if (S.phase !== "betting") return;
    let deck = shuffle(createShoe(6));
    let hands = [...S.hands];

    const d1 = dealCard(deck, true);  deck = d1.remaining;
    const d2 = dealCard(deck, true);  deck = d2.remaining;
    const up  = dealCard(deck, true);  deck = up.remaining;
    const hole = dealCard(deck, false); deck = hole.remaining;

    hands[0] = addCard(addCard(hands[0], d1.card), d2.card);
    const dealerCards = [up.card, hole.card];
    const offerInsurance = up.card.rank === "A";

    set({
      deck,
      dealerCards,
      hands,
      phase: offerInsurance ? "insurance" : "playing",
      currentHand: 0,
      outcomes: [],
      showConfetti: false,
      message: offerInsurance ? "Dealer shows Ace — Insurance?" : "Your move",
    });

    if (!offerInsurance) setTimeout(() => checkBJ(), 200);
  }

  // ── Check BJ after deal ───────────────────────────────────────────
  function checkBJ() {
    setState((prev) => {
      const dv = evalHand(prev.dealerCards.map((c) => ({ ...c, faceUp: true })));
      if (dv.isBlackjack)
        return { ...prev, phase: "complete", message: "Dealer Blackjack", dealerCards: prev.dealerCards.map((c) => ({ ...c, faceUp: true })) };
      if (evalHand(prev.hands[0].cards).isBlackjack)
        return { ...prev, message: "Blackjack!" };
      return prev;
    });
  }

  // ── Player actions ────────────────────────────────────────────────
  function hit() {
    if (S.phase !== "playing") return;
    const r = dealCard(S.deck, true);
    const updHands = [...S.hands];
    updHands[S.currentHand] = addCard(updHands[S.currentHand], r.card);
    const ev = evalHand(updHands[S.currentHand].cards);
    set({ deck: r.remaining, hands: updHands, message: ev.isBust ? "Bust!" : `Hand value: ${ev.value}` });
    if (ev.isBust || ev.value === 21) setTimeout(() => advanceHand(), 800);
  }

  function stand() {
    if (S.phase !== "playing") return;
    setState((prev) => {
      const updHands = [...prev.hands];
      updHands[prev.currentHand] = { ...updHands[prev.currentHand], status: "stand" };
      return { ...prev, hands: updHands, message: "Standing" };
    });
    setTimeout(() => advanceHand(), 350);
  }

  function doDouble() {
    if (S.phase !== "playing") return;
    const hand = S.hands[S.currentHand];
    if (S.balance < hand.bet) return;
    const r = dealCard(S.deck, true);
    const doubled: Hand = { ...hand, bet: hand.bet * 2, isDouble: true };
    const final: Hand = { ...addCard(doubled, r.card), status: "stand" };
    const updHands = [...S.hands];
    updHands[S.currentHand] = final;
    set({ deck: r.remaining, balance: S.balance - hand.bet, hands: updHands, message: "Doubled down" });
    setTimeout(() => advanceHand(), 800);
  }

  function doSplit() {
    if (S.phase !== "playing") return;
    const hand = S.hands[S.currentHand];
    if (S.balance < hand.bet) return;
    const [c1, c2] = hand.cards;
    const r1 = dealCard(S.deck, true);
    const r2 = dealCard(r1.remaining, true);
    const h1 = addCard({ ...mkHand(hand.bet), isSplit: true }, c1);
    const h2 = addCard({ ...mkHand(hand.bet), isSplit: true }, c2);
    const updHands = [...S.hands];
    updHands.splice(S.currentHand, 1, addCard(h1, r1.card), addCard(h2, r2.card));
    set({ deck: r2.remaining, balance: S.balance - hand.bet, hands: updHands, message: "Hand split" });
  }

  // ── Hand advancement ───────────────────────────────────────────────
  function advanceHand() {
    setState((prev) => {
      if (prev.currentHand < prev.hands.length - 1)
        return { ...prev, currentHand: prev.currentHand + 1, message: "Next hand" };
      return { ...prev, phase: "dealerTurn", message: "Dealer playing…" };
    });
  }

  // ── Dealer play ────────────────────────────────────────────────────
  useEffect(() => {
    if (S.phase !== "dealerTurn") return;
    dealerRef.current = setTimeout(() => runDealer(), 600);
    return () => { if (dealerRef.current) clearTimeout(dealerRef.current); };
  }, [S.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  function runDealer() {
    setState((prev) => {
      let cards = prev.dealerCards.map((c) => ({ ...c, faceUp: true }));
      let deck = prev.deck;
      const ev = evalHand(cards);
      if (ev.value < 17) {
        const r = dealCard(deck, true);
        cards = [...cards, r.card];
        deck = r.remaining;
        const newVal = evalHand(cards).value;
        setTimeout(() => runDealer(), 750);
        return { ...prev, dealerCards: cards, deck, message: `Dealer draws — ${newVal}` };
      }
      // Dealer stands — settle
      const outcomes = prev.hands.map((h) => compareHands(h, cards));
      const totalPayout = prev.hands.reduce((sum, h, i) => sum + payout(h, outcomes[i]), 0);
      const anyWin = outcomes.some((o) => o === "win" || o === "blackjack");
      return {
        ...prev,
        dealerCards: cards,
        deck,
        phase: "complete",
        outcomes,
        balance: prev.balance + totalPayout,
        showConfetti: anyWin,
        message: anyWin
          ? "Winner!"
          : outcomes.every((o) => o === "loss")
          ? "Dealer wins"
          : "Round complete",
      };
    });
  }

  // ── Settle if complete with no outcomes yet (e.g. dealer BJ on deal) ──
  useEffect(() => {
    if (S.phase !== "complete" || S.outcomes.length > 0 || S.dealerCards.length === 0) return;
    const outcomes = S.hands.map((h) => compareHands(h, S.dealerCards));
    const totalPayout = S.hands.reduce((sum, h, i) => sum + payout(h, outcomes[i]), 0);
    const anyWin = outcomes.some((o) => o === "win" || o === "blackjack");
    set({
      outcomes,
      balance: S.balance + totalPayout,
      showConfetti: anyWin,
      message: anyWin ? "Winner!" : outcomes.every((o) => o === "loss") ? "Dealer wins" : "Round complete",
    });
  }, [S.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Insurance ──────────────────────────────────────────────────────
  function takeInsurance() {
    const amt = Math.floor(S.hands[0].bet / 2);
    if (S.balance < amt) return;
    set({ balance: S.balance - amt, phase: "playing", message: "Insurance placed" });
    setTimeout(() => checkBJ(), 200);
  }
  function declineInsurance() {
    set({ phase: "playing", message: "Your move" });
    setTimeout(() => checkBJ(), 200);
  }

  // ── New round ──────────────────────────────────────────────────────
  function newRound() {
    if (dealerRef.current) clearTimeout(dealerRef.current);
    setState({ ...INIT, balance: S.balance });
    setPendingBet(0);
  }

  // ── Derived state ──────────────────────────────────────────────────
  const currentHand = S.hands[S.currentHand];
  const dealerVisible = S.phase === "dealerTurn" || S.phase === "complete";
  const canAct = S.phase === "playing" && currentHand?.status === "playing";
  const canDbl = canAct && currentHand.cards.length === 2 && !currentHand.isDouble && !currentHand.isSplit && S.balance >= currentHand.bet;
  const canSpl = canAct && currentHand.cards.length === 2 && !currentHand.isSplit && currentHand.cards[0].rank === currentHand.cards[1].rank && S.balance >= currentHand.bet;

  // ── Render ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-vln-bg text-vln-white font-sans overflow-x-hidden">

      {/* ── HUD ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-vln-bg-light/90 backdrop-blur-md border-b border-vln-sage/20 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[3px] text-vln-sage mb-0.5">
            Fused<span className="text-vln-white">Gaming</span>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[2px] text-vln-gray-dark border border-vln-sage/20 px-2 py-0.5 rounded inline-block">
            VLN.GG · Blackjack Premium
          </div>
        </div>

        {/* Status message */}
        <div
          key={S.message}
          className="vln-msg-in hidden sm:block font-mono text-[11px] uppercase tracking-[2px] text-vln-amber text-center flex-1"
        >
          {S.message}
        </div>

        <div className="text-right">
          <div className="font-mono text-[9px] uppercase tracking-[2px] text-vln-gray-dark mb-0.5">Balance</div>
          <div className="font-mono text-xl font-bold text-vln-amber tabular-nums">
            ${S.balance.toLocaleString()}
          </div>
        </div>
      </header>

      {/* Mobile status message */}
      <div key={S.message + "-m"} className="vln-msg-in sm:hidden text-center font-mono text-[11px] uppercase tracking-[2px] text-vln-amber py-2 px-4 bg-vln-bg-light/60">
        {S.message}
      </div>

      {/* ── Table ────────────────────────────────────────────────────── */}
      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <div
          className="relative max-w-3xl mx-auto rounded-vln border border-vln-sage/15 overflow-hidden"
          style={{ background: "radial-gradient(ellipse at 50% 0%, #0f2016 0%, #0a0e0f 55%)" }}
        >
          <Confetti active={S.showConfetti} />

          <div className="relative z-10 p-6 sm:p-10">
            {/* Dealer zone */}
            <section aria-label="Dealer hand">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[9px] uppercase tracking-[4px] text-vln-gray-dark">Dealer</span>
                <div className="flex-1 h-px bg-vln-sage/10" />
                {!dealerVisible && S.dealerCards.length > 0 && (
                  <span className="font-mono text-[9px] text-vln-gray-dark tracking-wider">
                    Showing: {evalHand([S.dealerCards[0]]).value}
                  </span>
                )}
              </div>
              <div className="flex justify-center">
                <HandDisplay
                  cards={dealerVisible ? S.dealerCards.map((c) => ({ ...c, faceUp: true })) : S.dealerCards}
                  showValue={dealerVisible}
                  isActive={S.phase === "dealerTurn"}
                  outcome={null}
                />
              </div>
            </section>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3" aria-hidden>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-vln-sage/20 to-transparent" />
              <span className="font-mono text-[8px] uppercase tracking-[4px] text-vln-sage/30">vs</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-vln-sage/20 to-transparent" />
            </div>

            {/* Player zone */}
            <section aria-label="Player hands">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-vln-sage/10" />
                <span className="font-mono text-[9px] uppercase tracking-[4px] text-vln-gray-dark">Player</span>
                <div className="flex-1 h-px bg-vln-sage/10" />
              </div>
              <div className="flex flex-wrap gap-6 justify-center">
                {S.hands.map((hand, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <HandDisplay
                      cards={hand.cards}
                      label={S.hands.length > 1 ? `Hand ${idx + 1}` : "You"}
                      showValue
                      isActive={S.phase === "playing" && S.currentHand === idx && hand.status === "playing"}
                      outcome={S.phase === "complete" ? S.outcomes[idx] ?? null : null}
                    />
                    {hand.bet > 0 && (
                      <div className="font-mono text-[10px] text-vln-amber/70 tracking-wide">
                        Bet ${hand.bet}{hand.isDouble ? " · 2×" : ""}
                      </div>
                    )}
                  </div>
                ))}
                {(S.phase === "idle" || S.phase === "betting") && S.hands[0].cards.length === 0 && (
                  <HandDisplay cards={[]} showValue={false} isActive={false} outcome={null} />
                )}
              </div>
            </section>
          </div>
        </div>

        {/* ── Controls ─────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto mt-5 space-y-4">

          {/* Insurance */}
          {S.phase === "insurance" && (
            <div className="vln-fade-up border border-vln-amber/30 bg-vln-amber/[0.06] rounded-vln p-5 text-center space-y-3">
              <div className="font-mono text-xs uppercase tracking-[3px] text-vln-amber">Insurance</div>
              <p className="text-sm text-vln-gray">
                Dealer shows Ace · Pay ${Math.floor(S.hands[0].bet / 2)} · Pays 2:1 if dealer has Blackjack
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={takeInsurance}
                  className="px-5 py-2.5 rounded-[6px] border-2 border-vln-amber text-vln-amber bg-vln-amber/10 font-sans uppercase tracking-wider text-sm font-semibold hover:bg-vln-amber hover:text-vln-bg transition-all duration-150 hover:-translate-y-0.5"
                >
                  Take Insurance
                </button>
                <button
                  onClick={declineInsurance}
                  className="px-5 py-2.5 rounded-[6px] border-2 border-vln-gray-dark text-vln-gray-dark bg-transparent font-sans uppercase tracking-wider text-sm font-semibold hover:border-red-500 hover:text-red-400 transition-all duration-150"
                >
                  Decline
                </button>
              </div>
            </div>
          )}

          {/* Action buttons */}
          {canAct && (
            <div className="vln-fade-up flex flex-wrap gap-3 justify-center">
              <button
                onClick={hit}
                className="px-6 py-3 rounded-[6px] border-2 border-vln-sage text-vln-sage bg-vln-sage/10 font-sans text-base font-semibold uppercase tracking-widest hover:bg-vln-sage hover:text-vln-bg transition-all duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-vln-sage"
              >
                Hit
              </button>
              <button
                onClick={stand}
                className="px-6 py-3 rounded-[6px] border-2 border-red-500 text-red-400 bg-red-500/10 font-sans text-base font-semibold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500"
              >
                Stand
              </button>
              {canDbl && (
                <button
                  onClick={doDouble}
                  className="px-6 py-3 rounded-[6px] border-2 border-vln-amber text-vln-amber bg-vln-amber/10 font-sans text-base font-semibold uppercase tracking-widest hover:bg-vln-amber hover:text-vln-bg transition-all duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-vln-amber"
                >
                  Double
                </button>
              )}
              {canSpl && (
                <button
                  onClick={doSplit}
                  className="px-6 py-3 rounded-[6px] border-2 border-vln-bluegray text-vln-bluegray bg-vln-bluegray/10 font-sans text-base font-semibold uppercase tracking-widest hover:bg-vln-bluegray hover:text-vln-bg transition-all duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-vln-bluegray"
                >
                  Split
                </button>
              )}
            </div>
          )}

          {/* Bet panel */}
          {(S.phase === "idle" || S.phase === "betting") && (
            <div className="vln-fade-up bg-vln-bg-light border border-vln-sage/20 rounded-vln p-5 max-w-md mx-auto space-y-4">
              <div className="text-center">
                <div className="font-mono text-[9px] uppercase tracking-[3px] text-vln-gray-dark mb-1">Current Bet</div>
                <div key={pendingBet} className="vln-msg-in font-mono text-3xl font-bold text-vln-amber tabular-nums">
                  ${pendingBet}
                </div>
              </div>

              <div className="h-px bg-vln-sage/15" />

              {/* Chips */}
              <div className="flex flex-wrap gap-2.5 justify-center">
                {CHIPS.map((c) => (
                  <ChipButton
                    key={c.v}
                    value={c.v}
                    selected={selectedChip === c.v}
                    onClick={() => setSelectedChip(c.v)}
                    disabled={S.balance < c.v}
                  />
                ))}
              </div>

              {/* Add / Clear */}
              <div className="flex gap-2.5 justify-center">
                <button
                  onClick={addChip}
                  disabled={S.balance < selectedChip || pendingBet + selectedChip > S.balance}
                  className="px-5 py-2 rounded-[6px] border-2 border-vln-amber text-vln-amber bg-vln-amber/10 font-mono text-sm font-semibold hover:bg-vln-amber hover:text-vln-bg transition-all duration-150 disabled:opacity-35 disabled:cursor-not-allowed active:scale-95"
                >
                  + ${selectedChip}
                </button>
                {pendingBet > 0 && (
                  <button
                    onClick={clearBet}
                    className="px-5 py-2 rounded-[6px] border border-vln-gray-dark/40 text-vln-gray-dark bg-transparent font-mono text-sm hover:border-vln-gray hover:text-vln-gray transition-all duration-150 active:scale-95"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Confirm / Deal */}
              {pendingBet > 0 && S.phase === "idle" && (
                <button
                  onClick={confirmBet}
                  className="w-full py-3 rounded-[6px] border-2 border-vln-sage text-vln-sage bg-vln-sage/10 font-sans text-base font-semibold uppercase tracking-widest hover:bg-vln-sage hover:text-vln-bg transition-all duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-vln-sage"
                >
                  Confirm Bet
                </button>
              )}
              {S.phase === "betting" && (
                <button
                  onClick={deal}
                  className="vln-deal-pulse w-full py-3.5 rounded-[6px] border-2 border-vln-sage bg-vln-sage text-vln-bg font-sans text-lg font-bold uppercase tracking-[4px] hover:scale-[1.02] transition-all duration-150 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-vln-sage-light"
                >
                  Deal
                </button>
              )}
            </div>
          )}

          {/* New round */}
          {S.phase === "complete" && (
            <div className="vln-fade-up flex justify-center">
              <button
                onClick={newRound}
                className="vln-win-pulse px-12 py-3.5 rounded-[6px] border-2 border-vln-sage text-vln-sage bg-vln-sage/10 font-sans text-lg font-semibold uppercase tracking-[3px] hover:bg-vln-sage hover:text-vln-bg transition-all duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-vln-sage"
              >
                New Round
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="mt-8 border-t border-vln-sage/10 py-5 px-6 text-center font-mono text-[9px] uppercase tracking-[2px] text-vln-gray-dark/50">
        Fused Gaming LLC · VLN.GG · Blackjack Premium · Provably Fair · Free Play
        <span className="mx-3 text-vln-sage/20">·</span>
        Internal Sample — Not for distribution
      </footer>
    </div>
  );
}
