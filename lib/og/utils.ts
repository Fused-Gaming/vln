/**
 * VLN Open Graph Image Utilities
 *
 * Shared design tokens, font loading, and layout primitives
 * for all OG image generation across vln.gg and subdomains.
 */

// ─── Design Tokens (exact match to tailwind.config.ts + globals.css) ──────

export const OG_COLORS = {
  // Backgrounds
  bg: "#0a0e0f",
  bgLight: "#151a1c",
  bgLighter: "#1f2527",

  // Primary accent – Sage Green
  sage: "#86d993",
  sageLight: "#a8e9b4",
  sageDark: "#5fb76f",

  // Secondary accent – Sky Blue
  blue: "#7dd3fc",
  blueLight: "#bae6fd",
  blueDark: "#0ea5e9",

  // Tertiary accent – Amber
  amber: "#fbbf24",
  amberLight: "#fcd34d",
  amberDark: "#f59e0b",

  // Premium – Purple
  purple: "#c084fc",
  purpleLight: "#d8b4fe",
  purpleDark: "#a855f7",

  // Semantic
  error: "#ef4444",

  // Text
  white: "#f8f9fa",
  gray: "#cbd5e1",
  grayDark: "#94a3b8",
} as const;

// ─── Dimensions ────────────────────────────────────────────────────────────

export const OG_SIZE = {
  width: 1200,
  height: 630,
} as const;

// ─── Font Loading ──────────────────────────────────────────────────────────

/**
 * Load Inter font for OG images.
 * Uses Google Fonts CDN (stable, fast, cacheable).
 */
export async function loadInterFont(
  weight: "400" | "600" | "700" = "700"
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&display=swap`;
  const css = await fetch(url).then((res) => res.text());

  const fontUrlMatch = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype|woff2)'\)/
  );
  if (!fontUrlMatch || !fontUrlMatch[1]) {
    throw new Error(`Failed to extract Inter ${weight} font URL`);
  }

  return fetch(fontUrlMatch[1]).then((res) => res.arrayBuffer());
}

/**
 * Load JetBrains Mono font for OG images.
 */
export async function loadJetBrainsFont(
  weight: "400" | "700" = "400"
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@${weight}&display=swap`;
  const css = await fetch(url).then((res) => res.text());

  const fontUrlMatch = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype|woff2)'\)/
  );
  if (!fontUrlMatch || !fontUrlMatch[1]) {
    throw new Error(`Failed to extract JetBrains Mono ${weight} font URL`);
  }

  return fetch(fontUrlMatch[1]).then((res) => res.arrayBuffer());
}

// ─── Accent Color Helpers ──────────────────────────────────────────────────

export type AccentColor = "sage" | "blue" | "amber" | "purple";

export function getAccentHex(accent: AccentColor): string {
  const map: Record<AccentColor, string> = {
    sage: OG_COLORS.sage,
    blue: OG_COLORS.blue,
    amber: OG_COLORS.amber,
    purple: OG_COLORS.purple,
  };
  return map[accent];
}

export function getAccentGlow(accent: AccentColor): string {
  const hex = getAccentHex(accent);
  return `0 0 24px ${hex}66`;
}
