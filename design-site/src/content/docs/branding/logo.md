---
title: Logo Standards
description: VLN logo variants, clear space rules, sizing guidelines, and brand compliance
---

> Migrated from Fused-Gaming/DevOps design-standards

---

## Logo Files

| File | Use Case |
|------|----------|
| `/public/vln-logo-dark.svg` | Dark backgrounds (primary) |
| `/public/vln-logo-light.svg` | Light backgrounds |

```tsx
import Image from 'next/image';

// Standard usage
<Image
  src="/vln-logo-dark.svg"
  width={164}
  height={40}
  alt="VLN.gg"
/>

// Small (header, mobile)
<Image
  src="/vln-logo-dark.svg"
  width={120}
  height={30}
  alt="VLN.gg"
/>
```

---

## Logo Variants

| Variant | File | Background | When to Use |
|---------|------|------------|-------------|
| **Dark** (primary) | `vln-logo-dark.svg` | Dark (`#0a0e0f`) | Website, presentations, dark UI |
| **Light** | `vln-logo-light.svg` | Light (`#f8f9fa`) | Light backgrounds, print |

---

## Sizing Guidelines

| Context | Width | Height |
|---------|-------|--------|
| OG images / social | 164px | 40px |
| Header / desktop | 120–164px | 30–40px |
| Header / mobile | 100px | 24px |
| Footer | 100px | 24px |
| Favicon | 32px | 32px |

---

## Clear Space

Always maintain clear space around the logo equal to the height of the "V" letterform (approximately the logo height ÷ 4).

```
          ╔══════╗
          ║      ║  ← clear space on all sides
    ╔═════╬══════╬═════╗
    ║     ║ VLN  ║     ║
    ╚═════╬══════╬═════╝
          ║      ║
          ╚══════╝
```

Never place the logo closer than this distance to any other element, edge, or image boundary.

---

## Color Usage

| Background | Logo Variant | Permitted |
|------------|-------------|-----------|
| `#0a0e0f` (dark) | Dark | ✅ |
| `#151a1c` (dark-light) | Dark | ✅ |
| `#f8f9fa` (white) | Light | ✅ |
| Colored backgrounds | Dark or Light (test contrast) | ⚠️ |

---

## Accessibility

- Always include meaningful `alt` text: `alt="VLN.gg"` or `alt="VLN — Vulnerability Lab Network"`
- Minimum contrast ratio: 4.5:1 against background
- Never use the logo as the only navigation mechanism (pair with text when possible)

---

## What NOT to Do

- Do not stretch, skew, or rotate the logo
- Do not change logo colors outside of approved variants
- Do not add effects (shadows, glows, gradients) to the logo itself
- Do not place the logo on busy backgrounds without sufficient contrast
- Do not recreate the logo with different fonts or proportions
- Do not use at sizes smaller than 80px wide (legibility threshold)

---

## Favicon System

Generated from the primary logo. Files in `/public/`:

```
favicon.ico              (16, 32, 48px multi-size)
favicon-16x16.png
favicon-32x32.png
android-chrome-192x192.png
android-chrome-512x512.png
apple-touch-icon.png     (180×180)
site.webmanifest
```

Generate with:

```bash
pnpm generate:favicons
```
