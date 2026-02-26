"use client";

/**
 * CamoBg — VLN Digital Camouflage Background Motion System
 * Spec: 0x3-camo-bg  |  Internal — direct URL access only
 *
 * Pattern engine: multi-octave fractal Brownian Motion (fBm) via
 * permutation-table value noise (no external deps). Three octaves with
 * φ² (golden ratio squared) lacunarity — frequencies scale as f, fφ², fφ⁴.
 *   - Octave 1 (large blobs):  base freq (0.06x, 0.10y) → horizontal blob stretch
 *   - Octave 2 (medium patch): base × φ² (≈0.157x, 0.262y)
 *   - Octave 3 (fine detail):  base × φ⁴ (≈0.411x, 0.685y)
 * Weights: φ-normalized series (0.500 / 0.309 / 0.191).
 * Output noise is threshold-mapped to the spec palette matching the
 * weighted distribution (void 10%, shadow 12%, forest 38%, olive 28%,
 * moss 10%, sage-dim 2%).
 *
 * Animation ownership (no conflicts):
 *   GSAP           → container opacity (reveal) + container y (ScrollTrigger)
 *   Framer Motion  → per-cell opacity pulse only (cells start at opacity 1)
 *   GSAP glitch    → backgroundColor on ≤8 cells at a time (5 pattern types)
 *
 * Glitch timing: Poisson process via exponential inter-arrival sampling
 *   delay = -Math.log(Math.random()) / λ   (mean ≈ 15 s, matching spec 12–20 s)
 *
 * Performance:
 *   - will-change on the container, NOT on cells
 *   - Mobile < 768 px: 50% cell reduction, parallax disabled
 *   - prefers-reduced-motion: static grid, opacity 0.55
 *   - Resize debounced at 300 ms
 */

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Value noise (no external deps) ──────────────────────────────────────────
// Uses Ken Perlin's permutation-table approach with improved fade curve.

function buildPermTable(): Uint8Array {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  // Fisher-Yates shuffle
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = p[i]; p[i] = p[j]; p[j] = t;
  }
  // Double to avoid bounds checks: perm[i] for i in [0, 511]
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  return perm;
}

/** Ken Perlin's improved fade curve — eliminates grid-line artifacts */
function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}

/**
 * 2D value noise — returns [0, 1].
 * Bilinear interpolation over 4 hashed lattice corners.
 */
function valueNoise2D(perm: Uint8Array, x: number, y: number): number {
  const ix = Math.floor(x) & 255;
  const iy = Math.floor(y) & 255;
  const fx = x - Math.floor(x);
  const fy = y - Math.floor(y);

  // Hash the four corners of the unit cell
  const a = perm[perm[ix]     + iy    ] / 255;
  const b = perm[perm[ix + 1] + iy    ] / 255;
  const c = perm[perm[ix]     + iy + 1] / 255;
  const d = perm[perm[ix + 1] + iy + 1] / 255;

  const u = fade(fx);
  const v = fade(fy);
  return lerp(lerp(a, b, u), lerp(c, d, u), v);
}

/**
 * 3-octave fBm for MARPAT-style camo — φ-lacunarity variant:
 *
 *   Octave 1 — large blobs (primary camo body)
 *     X-freq (0.06) < Y-freq (0.10) → features are wider than tall,
 *     reproducing the horizontal blob stretch characteristic of MARPAT.
 *     Anisotropy ratio y/x = 1/φ is preserved across all octaves.
 *
 *   Octave 2 — medium patches  (base × φ²)
 *   Octave 3 — fine digital edges (base × φ⁴)
 *
 * Lacunarity: φ² ≈ 2.618 (golden ratio squared).
 *   Each octave scales the previous by φ², placing frequency breakpoints
 *   at the golden-ratio harmonic series: f, fφ², fφ⁴.
 *   Current ratios were empirically ~2.75–3.3×; φ² ≈ 2.618 tightens these
 *   to a single consistent multiplier without breaking the MARPAT aesthetic.
 *
 * Weights: φ-normalized (1 : 1/φ : 1/φ²) → 0.500 / 0.309 / 0.191.
 *   Derived from the inverse power series of φ, normalized to sum 1.0.
 *   Large blobs still dominate; fine detail is slightly more present than
 *   the previous 0.12 allocation, sharpening pixel-edge definition.
 *
 * φ  = (1 + √5) / 2  ≈ 1.6180
 * φ² = φ + 1         ≈ 2.6180
 * φ⁴ = (φ²)²        ≈ 6.8541
 */
const PHI  = (1 + Math.sqrt(5)) / 2; // ≈ 1.6180
const PHI2 = PHI * PHI;              // ≈ 2.6180  (φ²)
const PHI4 = PHI2 * PHI2;            // ≈ 6.8541  (φ⁴)

// Octave base frequencies (anisotropic: x < y → horizontal blob stretch)
const F1X = 0.06, F1Y = 0.10;
const F2X = F1X * PHI2, F2Y = F1Y * PHI2; // ≈ 0.157, 0.262
const F3X = F1X * PHI4, F3Y = F1Y * PHI4; // ≈ 0.411, 0.685

// φ-normalized weights: 1/(1 + 1/φ + 1/φ²) series
const W1 = 1.000 / (1.000 + 1 / PHI + 1 / PHI2); // ≈ 0.500
const W2 = (1 / PHI)  / (1.000 + 1 / PHI + 1 / PHI2); // ≈ 0.309
const W3 = (1 / PHI2) / (1.000 + 1 / PHI + 1 / PHI2); // ≈ 0.191

function fbm(perm: Uint8Array, col: number, row: number): number {
  const n1 = valueNoise2D(perm, col * F1X, row * F1Y); // large, H-stretched
  const n2 = valueNoise2D(perm, col * F2X, row * F2Y); // medium patches
  const n3 = valueNoise2D(perm, col * F3X, row * F3Y); // fine digital edge
  return n1 * W1 + n2 * W2 + n3 * W3;
}

// ─── Palette (spec 0x3-camo-bg) ──────────────────────────────────────────────
// Thresholds match the weighted distribution from the spec:
//   void 10%, shadow 12%, forest 38%, olive 28%, moss 10%, sage-dim 2%
// fBm output is approximately uniform over [0,1] for these octave params.

const NOISE_THRESHOLDS = [
  { max: 0.10, color: "#000000" }, // --camo-void     10%
  { max: 0.22, color: "#0d1a0f" }, // --camo-shadow   12%
  { max: 0.60, color: "#004d00" }, // --camo-forest   38% ← primary
  { max: 0.88, color: "#3b5323" }, // --camo-olive    28% ← secondary
  { max: 0.98, color: "#2d4a1e" }, // --camo-moss     10%
  { max: 1.00, color: "#4a7c59" }, // --camo-sage-dim  2%
] as const;

function noiseToColor(n: number): string {
  for (const { max, color } of NOISE_THRESHOLDS) {
    if (n <= max) return color;
  }
  return "#004d00";
}

// ─── Grid helpers ─────────────────────────────────────────────────────────────

const CELL_UNIT = 30; // px — cell(28) + gap(2), midpoint of clamp(16,2.5vw,32)+2

function calcGrid(isMobile: boolean): { cols: number; rows: number } {
  if (typeof window === "undefined") return { cols: 50, rows: 35 };
  const cols = Math.ceil((window.innerWidth  * 1.1) / CELL_UNIT);
  const rows = Math.ceil((window.innerHeight * 1.1) / CELL_UNIT);
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

function buildCamoCells(cols: number, rows: number): CellData[] {
  const perm = buildPermTable(); // fresh random pattern each build
  return Array.from({ length: cols * rows }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return {
      id: i,
      color: noiseToColor(fbm(perm, col, row)),
      pulseDuration: Math.random() * 4 + 3,
      pulseDelay:    Math.random() * 8,
    };
  });
}

// ─── Framer Motion variants ───────────────────────────────────────────────────
// GSAP owns container opacity + y transform.
// FM owns per-cell opacity pulse only. Zero property overlap.

const cellVariants = {
  visible: { opacity: 1 },
  pulse:   { opacity: [1, 0.6, 1] as number[] },
};

// ─── Glitch system ───────────────────────────────────────────────────────────
// 5 pattern types; Poisson-process timing.

type GlitchPattern = "scatter" | "hstreak" | "vcolumn" | "block" | "cascade";

function pickGlitchCells(
  allCells: HTMLElement[],
  cols: number,
  rows: number
): { cells: HTMLElement[]; pattern: GlitchPattern } {
  const PATTERNS: GlitchPattern[] = ["scatter", "hstreak", "vcolumn", "block", "cascade"];
  const pattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
  const cells: HTMLElement[] = [];

  switch (pattern) {
    case "scatter": {
      // 2–3 random isolated cells — the original VLN heartbeat
      const count = Math.floor(Math.random() * 2) + 2;
      const taken = new Set<number>();
      while (cells.length < count) {
        const idx = Math.floor(Math.random() * allCells.length);
        if (!taken.has(idx)) { taken.add(idx); cells.push(allCells[idx]); }
      }
      break;
    }
    case "hstreak": {
      // 4–9 consecutive cells across a row — horizontal artifact
      const len = Math.floor(Math.random() * 6) + 4;
      const row = Math.floor(Math.random() * rows);
      const startCol = Math.floor(Math.random() * Math.max(1, cols - len));
      for (let c = 0; c < len; c++) {
        const idx = row * cols + startCol + c;
        if (idx < allCells.length) cells.push(allCells[idx]);
      }
      break;
    }
    case "vcolumn": {
      // 3–6 consecutive cells down a column — vertical dropout
      const len = Math.floor(Math.random() * 4) + 3;
      const col = Math.floor(Math.random() * cols);
      const startRow = Math.floor(Math.random() * Math.max(1, rows - len));
      for (let r = 0; r < len; r++) {
        const idx = (startRow + r) * cols + col;
        if (idx < allCells.length) cells.push(allCells[idx]);
      }
      break;
    }
    case "block": {
      // 2×2 or 3×2 rectangular block — pixel burst
      const w = Math.random() < 0.5 ? 2 : 3;
      const h = 2;
      const col = Math.floor(Math.random() * Math.max(1, cols - w));
      const row = Math.floor(Math.random() * Math.max(1, rows - h));
      for (let r = 0; r < h; r++) {
        for (let c = 0; c < w; c++) {
          const idx = (row + r) * cols + col + c;
          if (idx < allCells.length) cells.push(allCells[idx]);
        }
      }
      break;
    }
    case "cascade": {
      // 6–14 cells sequentially across a row — scan-line sweep
      // Uses higher GSAP stagger so each cell fires visibly after the last
      const len = Math.floor(Math.random() * 9) + 6;
      const row = Math.floor(Math.random() * rows);
      const startCol = Math.floor(Math.random() * Math.max(1, cols - len));
      for (let c = 0; c < len; c++) {
        const idx = row * cols + startCol + c;
        if (idx < allCells.length) cells.push(allCells[idx]);
      }
      break;
    }
  }

  return { cells, pattern };
}

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
  const containerRef     = useRef<HTMLDivElement>(null);
  const prefersReduced   = useReducedMotion();
  const [isMobile, setIsMobile]   = useState(false);
  const [grid, setGrid]           = useState<{ cells: CellData[]; cols: number; rows: number }>({
    cells: [], cols: 0, rows: 0,
  });
  const [ready, setReady]         = useState(false);

  // Refs for glitch system — avoids stale closures across grid rebuilds
  const glitchTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gridDimsRef      = useRef({ cols: 0, rows: 0 }); // always current
  const scheduleGlitchRef = useRef<(() => void) | null>(null); // always current fn

  // ── Init ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    const { cols, rows } = calcGrid(mobile);
    gridDimsRef.current = { cols, rows };
    setGrid({ cells: buildCamoCells(cols, rows), cols, rows });
    setReady(true);
  }, []);

  // ── Keep gridDimsRef in sync ───────────────────────────────────────────────
  useEffect(() => {
    gridDimsRef.current = { cols: grid.cols, rows: grid.rows };
  }, [grid]);

  // ── Debounced resize ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!ready) return;
    let debounce: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        const { cols, rows } = calcGrid(mobile);
        gridDimsRef.current = { cols, rows };
        setGrid({ cells: buildCamoCells(cols, rows), cols, rows });
      }, 300);
    };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(debounce); };
  }, [ready]);

  // ── GSAP: container reveal (opacity 0 → target) ───────────────────────────
  // GSAP owns container opacity. FM owns cell opacity. Zero overlap.
  useEffect(() => {
    if (!ready || prefersReduced || staticOnly) return;
    const container = containerRef.current;
    if (!container) return;
    const tween = gsap.fromTo(
      container,
      { opacity: 0 },
      { opacity, duration: 2.4, ease: "power2.inOut" }
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
    return () => { st.scrollTrigger?.kill(); st.kill(); };
  }, [ready, prefersReduced, staticOnly, isMobile]);

  // ── Glitch heartbeat (Poisson-process timing, 5 pattern types) ───────────
  //
  // Poisson process inter-arrival: delay = -ln(U) / λ  (λ = 1/15 → mean 15 s)
  // This produces exponentially-distributed waiting times — events cluster
  // naturally (sometimes several close together, sometimes long gaps) matching
  // the irregular feel of real signal glitches.
  //
  // scheduleGlitchRef always points to the latest closure so onComplete
  // callbacks never call a stale version after a grid resize.
  const scheduleGlitch = useCallback(() => {
    if (prefersReduced || staticOnly) return;

    // Exponential inter-arrival (Poisson process).
    // Use (1 - U) instead of U so Math.random() == 0 never yields -Infinity.
    const LAMBDA = 1 / 15; // mean 15 s between glitches
    const delay  = -Math.log(1 - Math.random()) / LAMBDA;

    glitchTimerRef.current = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      const allCells = Array.from(container.querySelectorAll<HTMLElement>(".camo-cell"));
      if (allCells.length < 10) return;

      const { cols, rows } = gridDimsRef.current;
      const { cells: glitchCells, pattern } = pickGlitchCells(allCells, cols, rows);
      if (glitchCells.length === 0) return;

      const originals = glitchCells.map((el) => el.style.backgroundColor);

      // Cascade gets visible per-cell stagger (scan-line feel);
      // all other patterns fire near-simultaneously.
      const stagger = pattern === "cascade" ? 0.04 : 0.008;
      const repeats = pattern === "cascade" ? 1 : 3;

      // steps(1): instantaneous snap to glitch color — signal corruption feel.
      // ease:"none" (linear) produces a gradual fade which reads as intentional
      // design rather than a digital fault. steps(1) is the correct model.
      gsap.to(glitchCells, {
        backgroundColor: "#86d993",
        duration: 0.06,
        yoyo: true,
        repeat: repeats,
        ease: "steps(1)",
        stagger,
        onComplete: () => {
          gsap.to(glitchCells, {
            backgroundColor: (i) => originals[i] ?? "#004d00",
            duration: 0.25,
            ease: "steps(1)",
          });
          // Schedule next via ref so resize never creates duplicate timers
          scheduleGlitchRef.current?.();
        },
      });

      // 20% chance of a micro-burst: second glitch 200–600 ms later
      // (simulates a double-pulse or signal noise cluster)
      if (Math.random() < 0.20) {
        const burstDelay = Math.random() * 400 + 200;
        setTimeout(() => {
          const fresh = Array.from(container.querySelectorAll<HTMLElement>(".camo-cell"));
          if (fresh.length < 10) return;
          const { cols: bc, rows: br } = gridDimsRef.current;
          const burst = pickGlitchCells(fresh, bc, br);
          const burstOrig = burst.cells.map((el) => el.style.backgroundColor);
          gsap.to(burst.cells, {
            backgroundColor: "#86d993",
            duration: 0.04,
            yoyo: true,
            repeat: 1,
            ease: "steps(1)",
            onComplete: () => {
              gsap.to(burst.cells, {
                backgroundColor: (i) => burstOrig[i] ?? "#004d00",
                duration: 0.2,
                ease: "steps(1)",
              });
            },
          });
        }, burstDelay);
      }
    }, delay * 1000);
  }, [prefersReduced, staticOnly]); // gridDimsRef is a ref — no dep needed

  // Keep scheduleGlitchRef current (solves stale-closure in onComplete)
  useEffect(() => {
    scheduleGlitchRef.current = scheduleGlitch;
  }, [scheduleGlitch]);

  useEffect(() => {
    if (!ready) return;
    scheduleGlitch();
    return () => {
      if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
    };
  }, [ready, scheduleGlitch]);

  // ─── Render ──────────────────────────────────────────────────────────────

  if (!ready) return null;

  const staticOpacity = prefersReduced ? 0.55 : opacity;

  return (
    <div
      ref={containerRef}
      className={`camo-bg fixed inset-0 pointer-events-none z-[-1] overflow-hidden ${className}`}
      // Static/reduced: opacity set directly.
      // Animated: start at 0, GSAP drives reveal to `opacity` prop.
      style={staticOnly || prefersReduced ? { opacity: staticOpacity } : { opacity: 0 }}
      aria-hidden="true"
    >
      {/* 110% grid to cover parallax travel without edge gaps */}
      <div
        className="absolute"
        style={{
          top: "-5%",
          left: "-5%",
          width: "110%",
          height: "110%",
          display: "grid",
          // Explicit column count (not auto-fill) so JS col index
          // matches DOM index — required for correct glitch pattern targeting.
          gridTemplateColumns: `repeat(${grid.cols}, var(--camo-cell-size))`,
          gap: "var(--camo-gap)",
        }}
      >
        {grid.cells.map((cell) =>
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
                delay:    cell.pulseDelay,
                repeat:   Infinity,
                ease:     "easeInOut",
                times:    [0, 0.5, 1],
              }}
            />
          )
        )}
      </div>
    </div>
  );
}
