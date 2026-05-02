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

// ─── SVG Components for OG Images ──────────────────────────────────────────

/**
 * Circuit trace SVG component
 * Generates a decorative circuit board-like pattern with lines and nodes
 * Used in corner positions (top-left, bottom-right, etc.)
 */
export function CircuitTraceSVG(props: {
  color1?: string;
  color2?: string;
  color3?: string;
  size?: "small" | "medium" | "large";
}): string {
  const { color1 = OG_COLORS.sage, color2 = OG_COLORS.blue, color3 = OG_COLORS.purple, size = "medium" } = props;

  const dimensions = {
    small: { width: 250, height: 150 },
    medium: { width: 350, height: 200 },
    large: { width: 500, height: 280 },
  };

  const { width, height } = dimensions[size];

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <line x1="0" y1="40" x2="240" y2="40" stroke="${color1}" stroke-width="2" />
    <line x1="240" y1="40" x2="240" y2="140" stroke="${color1}" stroke-width="2" />
    <line x1="0" y1="80" x2="160" y2="80" stroke="${color2}" stroke-width="1.5" />
    <line x1="160" y1="80" x2="160" y2="180" stroke="${color2}" stroke-width="1.5" />
    <line x1="0" y1="120" x2="80" y2="120" stroke="${color3}" stroke-width="1" />
    <circle cx="240" cy="40" r="4" fill="${color1}" />
    <circle cx="160" cy="80" r="3" fill="${color2}" />
    <rect x="80" y="30" width="24" height="20" rx="3" fill="none" stroke="${color1}" stroke-width="1.5" />
    <rect x="40" y="112" width="16" height="16" rx="2" fill="none" stroke="${color3}" stroke-width="1" />
  </svg>`;
}

/**
 * Corner circuit trace decorator
 * Returns SVG positioned absolutely in a corner
 */
export function getCornerDecorationStyle(
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right",
  opacity: number = 0.08
): React.CSSProperties {
  const baseStyle: React.CSSProperties = {
    position: "absolute",
    display: "flex",
    opacity,
  };

  const positions = {
    "top-left": { top: 0, left: 0 },
    "top-right": { top: 0, right: 0, transform: "scaleX(-1)" },
    "bottom-left": { bottom: 0, left: 0, transform: "scaleY(-1)" },
    "bottom-right": { bottom: 0, right: 0, transform: "rotate(180deg)" },
  };

  return { ...baseStyle, ...positions[position] };
}
