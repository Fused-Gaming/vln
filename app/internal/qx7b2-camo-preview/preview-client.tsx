"use client";

/**
 * CamoPreviewClient — interactive sample for spec 0x3-camo-bg
 * Internal only — not linked from any public page.
 */

import { useState } from "react";
import CamoBg from "@/components/vln/camo-bg";

type Variant = "full" | "dim" | "static";

const VARIANTS: { id: Variant; label: string; description: string }[] = [
  {
    id: "full",
    label: "Full — Marketing / Hero",
    description:
      "GSAP stagger reveal + ScrollTrigger parallax + Framer Motion per-cell pulse + sage glitch heartbeat. Use on marketing pages and hero sections.",
  },
  {
    id: "dim",
    label: "Dim — Dashboard",
    description:
      "Opacity 0.3, no animation. Keeps texture present without competing with data-dense UI.",
  },
  {
    id: "static",
    label: "Static — Doc Pages",
    description:
      "Grid present, no motion whatsoever. Complies with prefers-reduced-motion regardless of user setting.",
  },
];

const PALETTE = [
  { token: "--camo-void",     hex: "#000000", role: "Darkest block — empty terrain",           weight: "10%" },
  { token: "--camo-deep",     hex: "#0a0e0f", role: "VLN page background (base)",              weight: "—"   },
  { token: "--camo-shadow",   hex: "#0d1a0f", role: "Near-black green, shadow cells",          weight: "12%" },
  { token: "--camo-forest",   hex: "#004d00", role: "Core dark green — primary camo body",     weight: "38%" },
  { token: "--camo-olive",    hex: "#3b5323", role: "Olive drab — mid-tone breakup",           weight: "28%" },
  { token: "--camo-moss",     hex: "#2d4a1e", role: "Moss — transition cells",                 weight: "10%" },
  { token: "--camo-sage-dim", hex: "#4a7c59", role: "Muted sage — highlight cell edges",       weight: "2%"  },
  { token: "--camo-sage",     hex: "#86d993", role: "VLN sage — glitch pulse only (≤1–2%)",   weight: "≤2%" },
];

export default function CamoPreviewClient() {
  const [variant, setVariant] = useState<Variant>("full");

  const opacityMap: Record<Variant, number> = {
    full:   0.72,
    dim:    0.3,
    static: 0.55,
  };

  return (
    <div className="relative min-h-screen bg-[#0a0e0f] text-[#f8f9fa] font-sans overflow-x-hidden">
      {/* ── Background layer ─────────────────────────────────────────── */}
      <CamoBg
        key={variant} // remount on variant change to restart animations
        opacity={opacityMap[variant]}
        staticOnly={variant === "static"}
      />

      {/* ── Semi-transparent overlay so text remains readable ────────── */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,14,15,0.65) 0%, rgba(10,14,15,0.45) 50%, rgba(10,14,15,0.65) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-[#4a7c59]/40 bg-[#0d1a0f]/60 text-xs font-mono text-[#4a7c59] uppercase tracking-widest">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#86d993] animate-pulse" />
            Internal · Spec 0x3-camo-bg · Not indexed
          </div>

          <h1 className="text-4xl font-bold tracking-tight mb-3">
            VLN Digital Camo
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #86d993, #4a7c59)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Background Motion System
            </span>
          </h1>

          <p className="text-[#cbd5e1]/70 max-w-2xl leading-relaxed font-mono text-sm">
            Living texture — tactical precision, alive infrastructure, dark-first immersion.
            Every element grid-locked and structured; pixels shift, fade, and re-emerge like
            a low-power radar screen overlaid with fragmenting digital terrain.
          </p>
        </div>

        {/* Variant selector */}
        <section className="mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#4a7c59] mb-4">
            Variant selector
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {VARIANTS.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariant(v.id)}
                className={[
                  "text-left px-4 py-4 rounded-[12px] border transition-all duration-200",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#86d993]",
                  variant === v.id
                    ? "border-[#86d993]/60 bg-[#004d00]/20 shadow-[0_0_12px_rgba(134,217,147,0.15)]"
                    : "border-[#4a7c59]/25 bg-[#0d1a0f]/40 hover:border-[#4a7c59]/50",
                ].join(" ")}
                aria-pressed={variant === v.id}
              >
                <div className="text-sm font-semibold mb-1">{v.label}</div>
                <div className="text-xs text-[#cbd5e1]/55 leading-relaxed">{v.description}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Spec summary */}
        <section className="mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#4a7c59] mb-4">
            Animation timeline — {variant}
          </h2>
          <div className="border border-[#4a7c59]/20 rounded-[12px] overflow-hidden divide-y divide-[#4a7c59]/20">
            {[
              {
                effect: "Stagger reveal",
                trigger: "Mount",
                detail: "2.4 s · stagger 0.008 s random · power2.inOut",
                active: variant === "full",
              },
              {
                effect: "Parallax drift",
                trigger: "Scroll",
                detail: "y −15% · scrub 1.5 · desktop only",
                active: variant === "full",
              },
              {
                effect: "Cell idle pulse",
                trigger: "Infinite",
                detail: "3–7 s per cell · delay 0–8 s · opacity 0.72 → 0.45 → 0.72",
                active: variant === "full",
              },
              {
                effect: "Sage glitch",
                trigger: "Timer 12–20 s",
                detail: "2–3 cells · 200 ms flash to #86d993 · VLN heartbeat",
                active: variant === "full",
              },
            ].map((row) => (
              <div
                key={row.effect}
                className={[
                  "grid grid-cols-[1fr_auto_2fr] gap-4 items-center px-4 py-3 text-sm",
                  !row.active ? "opacity-30" : "",
                ].join(" ")}
              >
                <span className="font-mono text-[#f8f9fa]/90">{row.effect}</span>
                <span
                  className={[
                    "px-2 py-0.5 rounded text-xs font-mono",
                    row.active
                      ? "bg-[#004d00]/50 text-[#86d993]"
                      : "bg-[#1f2527] text-[#cbd5e1]/40",
                  ].join(" ")}
                >
                  {row.active ? row.trigger : "disabled"}
                </span>
                <span className="text-[#cbd5e1]/55 text-xs font-mono">{row.detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Color palette */}
        <section className="mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#4a7c59] mb-4">
            Camo palette
          </h2>
          <div className="grid gap-2">
            {PALETTE.map((p) => (
              <div
                key={p.token}
                className="flex items-center gap-4 px-4 py-2.5 rounded-[10px] border border-[#4a7c59]/15 bg-[#0d1a0f]/30"
              >
                <div
                  className="w-7 h-7 rounded-[6px] border border-white/10 shrink-0"
                  style={{ backgroundColor: p.hex }}
                />
                <code className="text-xs text-[#86d993] w-36 shrink-0">{p.token}</code>
                <code className="text-xs text-[#cbd5e1]/60 w-20 shrink-0">{p.hex}</code>
                <span className="text-xs text-[#cbd5e1]/55 flex-1">{p.role}</span>
                <span className="text-xs font-mono text-[#4a7c59] w-8 text-right shrink-0">
                  {p.weight}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Performance notes */}
        <section className="mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#4a7c59] mb-4">
            Performance constraints
          </h2>
          <ul className="space-y-2 text-sm text-[#cbd5e1]/70 font-mono">
            {[
              "GPU-composited: only opacity + transform animated on container; will-change set there, not on cells",
              "backgroundColor animated on ≤3 glitch cells at a time — never on the full grid",
              "Mobile < 768 px: 50% cell count reduction, parallax disabled",
              "prefers-reduced-motion: all animation disabled, opacity fixed at 0.55",
              "Resize handler debounced at 300 ms; no re-animation on resize",
            ].map((note) => (
              <li key={note} className="flex gap-2 items-start">
                <span className="text-[#4a7c59] mt-0.5 shrink-0">›</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#4a7c59]/20 pt-6 flex flex-wrap gap-4 items-center justify-between text-xs font-mono text-[#4a7c59]/60">
          <span>VLN.gg — Vulnerability Lab Network</span>
          <span>Spec 0x3-camo-bg · 2026-02-24 · Internal use only</span>
        </footer>
      </div>
    </div>
  );
}
