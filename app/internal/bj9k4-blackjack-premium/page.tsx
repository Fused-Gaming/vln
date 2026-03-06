/**
 * Fused Gaming — Blackjack Premium
 * VLN.GG · iGaming Security & Smart Contract Intelligence
 *
 * Internal sample — demonstrates RNG integrity, wallet-flow logic,
 * and UI capability for iGaming clients. Not indexed.
 *
 * Route: /internal/bj9k4-blackjack-premium
 * Status: hidden sample — no sitemap, no robots indexing
 */

import type { Metadata } from "next";
import BlackjackClient from "./BlackjackClient";

export const metadata: Metadata = {
  title: "Blackjack Premium — Fused Gaming Sample",
  description:
    "Internal capability sample: Blackjack Premium by Fused Gaming. Demonstrates provably-fair RNG, multi-hand logic, and iGaming-grade UI for VLN security consulting clients.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function BlackjackPremiumPage() {
  return <BlackjackClient />;
}
