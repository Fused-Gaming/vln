"use client";

/**
 * CamoBg — VLN Digital Camouflage Background Motion System
 * Spec: 0x3-camo-bg  |  Internal — direct URL access only
 *
 * Animation ownership (no conflicts):
 *   GSAP      → container opacity (reveal) + container y (ScrollTrigger parallax)
 *   Framer Motion → per-cell opacity pulse only (cells start at opacity 1)
 *   GSAP glitch   → backgroundColor on ≤3 cells (temporary, limited scope)
 *
 * Performance rules:
 *   - will-change on the container, NOT on individual cells
 *   - backgroundColor animated on ≤3 glitch cells at a time
 *   - Mobile < 768 px: 50% cell reduction, no parallax
 *   - prefers-reduced-motion: all animation off, container opacity fixed at 0.55
 */

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Palette ──────────────────────────────────────────────────────────────────

const CAMO_PALETTE = [
  { color: "#000000", weight: 10 }, // --camo-void
  { color: "#0d1a0f", weight: 12 }, // --camo-shadow
  { color: "#004d00", weight: 38 }, // --camo-forest  ← primary
  { color: "#3b5323", weight: 28 }, // --camo-olive   ← secondary
  { color: "#2d4a1e", weight: 10 }, // --camo-moss
  { color: "#4a7c59", weight: 2 },  // --camo-sage-dim
] as const;

const TOTAL_WEIGHT = CAMO_PALETTE.reduce((s, c) => s + c.weight, 0);

function pickColor(): string {
  let rand = Math.random() * TOTAL_WEIGHT;
  for (const entry of CAMO_PALETTE) {
    if ((rand -= entry.weight) < 0) return entry.color;
  }
  return CAMO_PALETTE[2].color;
}

// ─── Cell count ───────────────────────────────────────────────────────────────

function calcCellCount(isMobile: boolean): { cols: number; rows: number } {
  if (typeof window === "undefined") return { cols: 40, rows: 30 };
  const CELL = 28; // midpoint of clamp(16px, 2.5vw, 32px) at ~1440px
  const GAP = 2;
  const unit = CELL + GAP;
  // 110% overflow to cover parallax shift
  const cols = Math.ceil((window.innerWidth * 1.1) / unit);
  const rows = Math.ceil((window.innerHeight * 1.1) / unit);
  return isMobile
    ? { cols: Math.ceil(cols / 2), rows: Math.ceil(rows / 2) }
    : { cols, rows };
}

// ─── Cell data ────────────────────────────────────────────────────────────────

interface CellData {
  id: number;
  color: string;
  pulseDuration: number; // 3–7 s
  pulseDelay: number;    // 0–8 s
}

function buildCells(count: number): CellData[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    color: pickColor(),
    pulseDuration: Math.random() * 4 + 3,
    pulseDelay: Math.random() * 8,
  }));
}

// ─── Framer Motion variants ───────────────────────────────────────────────────
// Cells start at opacity 1 — the container controls overall opacity via GSAP.
// FM owns cell opacity only; GSAP owns container opacity + y. No overlap.

const cellVariants = {
  visible: { opacity: 1 },
  pulse: { opacity: [1, 0.6, 1] as number[] },
};

// ─── Component ────────────────────────────────────────────────────────────────

interface CamoBgProps {
  /** Overall layer opacity after reveal (default 0.72). Use 0.3 for dashboards. */
  opacity?: number;
  /** Disable all animation (doc pages). Renders static grid only. */
  staticOnly?: boolean;
  className?: string;
}

export default function CamoBg({
  opacity = 0.72,
  staticOnly = false,
  className = "",
}: CamoBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [cells, setCells] = useState<CellData[]>([]);
  const [ready, setReady] = useState(false);
  const glitchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Detect mobile & build initial cells ──────────────────────────────────
  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    const { cols, rows } = calcCellCount(mobile);
    setCells(buildCells(cols * rows));
    setReady(true);
  }, []);

  // ── Debounced resize ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;
    let debounce: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        const { cols, rows } = calcCellCount(mobile);
        setCells(buildCells(cols * rows));
      }, 300);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(debounce);
    };
  }, [ready]);

  // ── GSAP: container reveal (opacity 0 → target) ───────────────────────────
  // GSAP owns container opacity. FM owns cell opacity. Zero conflict.
  useEffect(() => {
    if (!ready || prefersReduced || staticOnly) return;
    const container = containerRef.current;
    if (!container) return;

    const tween = gsap.fromTo(
      container,
      { opacity: 0 },
      { opacity: opacity, duration: 2.4, ease: "power2.inOut" }
    );

    return () => { tween.kill(); };
  }, [ready, prefersReduced, staticOnly, opacity]);

  // ── GSAP: ScrollTrigger parallax (desktop only) ───────────────────────────
  useEffect(() => {
    if (!ready || prefersReduced || staticOnly || isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const st = gsap.to(container, {
      y: "-15%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    return () => {
      st.scrollTrigger?.kill();
      st.kill();
    };
  }, [ready, prefersReduced, staticOnly, isMobile]);

  // ── Sage glitch pulse (VLN heartbeat) ────────────────────────────────────
  const scheduleGlitch = useCallback(() => {
    if (prefersReduced || staticOnly) return;
    const delay = Math.random() * 8000 + 12000; // 12–20 s
    glitchTimerRef.current = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      const allCells = Array.from(
        container.querySelectorAll<HTMLElement>(".camo-cell")
      );
      if (allCells.length < 3) return;

      const count = Math.floor(Math.random() * 2) + 2;
      const glitchCells: HTMLElement[] = [];
      const taken = new Set<number>();
      while (glitchCells.length < count) {
        const idx = Math.floor(Math.random() * allCells.length);
        if (!taken.has(idx)) {
          taken.add(idx);
          glitchCells.push(allCells[idx]);
        }
      }

      const originals = glitchCells.map((el) => el.style.backgroundColor);

      gsap.to(glitchCells, {
        backgroundColor: "#86d993",
        duration: 0.08,
        yoyo: true,
        repeat: 3,
        ease: "none",
        stagger: 0.04,
        onComplete: () => {
          gsap.to(glitchCells, {
            backgroundColor: (i) => originals[i] ?? "#004d00",
            duration: 0.3,
          });
          scheduleGlitch();
        },
      });
    }, delay);
  }, [prefersReduced, staticOnly]);

  useEffect(() => {
    if (!ready) return;
    scheduleGlitch();
    return () => {
      if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
    };
  }, [ready, scheduleGlitch]);

  // ─── Render ──────────────────────────────────────────────────────────────

  if (!ready) return null;

  // For static/reduced: container opacity is set directly; no GSAP needed.
  const staticOpacity = prefersReduced ? 0.55 : opacity;

  return (
    <div
      ref={containerRef}
      className={`camo-bg fixed inset-0 pointer-events-none z-[-1] overflow-hidden ${className}`}
      // Only set opacity as static style for static/reduced-motion cases.
      // For animated cases, GSAP starts at 0 and drives the opacity itself.
      style={staticOnly || prefersReduced ? { opacity: staticOpacity } : undefined}
      aria-hidden="true"
    >
      {/* 110% grid to cover parallax travel */}
      <div
        className="absolute"
        style={{
          top: "-5%",
          left: "-5%",
          width: "110%",
          height: "110%",
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, var(--camo-cell-size))`,
          gap: "var(--camo-gap)",
        }}
      >
        {cells.map((cell) =>
          staticOnly || prefersReduced ? (
            <div
              key={cell.id}
              className="camo-cell"
              style={{ backgroundColor: cell.color }}
            />
          ) : (
            // FM owns cell opacity only. Container opacity is owned by GSAP.
            <motion.div
              key={cell.id}
              className="camo-cell"
              style={{ backgroundColor: cell.color }}
              initial="visible"
              animate="pulse"
              variants={cellVariants}
              transition={{
                duration: cell.pulseDuration,
                delay: cell.pulseDelay,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />
          )
        )}
      </div>
    </div>
  );
}
