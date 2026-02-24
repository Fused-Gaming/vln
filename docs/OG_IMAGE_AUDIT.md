# Open Graph Image Coverage Audit

**Date:** February 24, 2026
**Status:** Discrepancy Found
**Total Pages:** 16
**Pages with OG Images:** 8
**Pages Missing OG Images:** 8
**Coverage:** 50%

---

## Current OG Image Coverage

### ✅ Pages WITH OpenGraph Images

| Route | File | Status | Notes |
|-------|------|--------|-------|
| `/` | `app/opengraph-image.tsx` | ✅ | Homepage |
| `/about` | `app/about/opengraph-image.tsx` | ✅ | About page |
| `/services` | `app/services/opengraph-image.tsx` | ✅ | Main services |
| `/pricing` | `app/pricing/opengraph-image.tsx` | ✅ | Pricing page |
| `/contact` | `app/contact/opengraph-image.tsx` | ✅ | Contact/Booking |
| `/faq` | `app/faq/opengraph-image.tsx` | ✅ | FAQ |
| `/blog` | `app/blog/opengraph-image.tsx` | ✅ | Blog index |
| `/api/og` | `app/api/og/[...slug]/route.ts` | ✅ | Dynamic OG endpoint |

---

## ❌ Pages MISSING OpenGraph Images

### High Priority (Core Pages)

| Route | File | Status | Priority | Notes |
|-------|------|--------|----------|-------|
| `/get-help` | `app/get-help/page.tsx` | ❌ | HIGH | Support/help page - frequently shared |
| `/terms` | `app/terms/page.tsx` | ❌ | MEDIUM | Legal - referenced in footers |
| `/privacy` | `app/privacy/page.tsx` | ❌ | MEDIUM | Legal - referenced in footers |
| `/refunds` | `app/refunds/page.tsx` | ❌ | MEDIUM | Legal - referenced in footers |

### Medium Priority (Feature Pages)

| Route | File | Status | Priority | Notes |
|-------|------|--------|----------|-------|
| `/referrals` | `app/referrals/page.tsx` | ❌ | MEDIUM | Referral program - may be shared |
| `/services/san-francisco` | `app/services/san-francisco/page.tsx` | ❌ | MEDIUM | Local service page |
| `/blog/[slug]` | Dynamic blog posts | ❌ | HIGH | Individual blog posts need unique OG images |

### Low Priority (Planned/Future)

- `/blog/top-smart-contract-vulnerabilities-defi` - Uses parent blog OG image
- `/blog/web3-security-checklist-bay-area-startups` - Uses parent blog OG image

---

## OG Image Implementation Plan

### Phase 1: Add Missing Core Pages (Immediate)

1. **`/get-help`** - Support icon + VLN branding
2. **`/terms`** - Legal document icon + VLN branding
3. **`/privacy`** - Privacy shield icon + VLN branding
4. **`/refunds`** - Refund icon + VLN branding

### Phase 2: Add Regional/Feature Pages (Next Sprint)

5. **`/services/san-francisco`** - Location-specific hero + VLN branding
6. **`/referrals`** - Partnership icon + VLN branding

### Phase 3: Dynamic Blog Post OG Images (Backlog)

7. **`/blog/[slug]`** - Use API endpoint to generate unique images per post
   - Include post title
   - Include category/tag
   - Include VLN branding

---

## OG Image Wildcard Strategy

### Current Setup

```typescript
// app/api/og/[...slug]/route.ts
// Handles dynamic OG generation for unmatched routes
```

### Proposed Enhancement

Add a catch-all OG endpoint that:
1. Returns a generic VLN OG image for any route not covered
2. Includes route path in the image (for debugging)
3. Has fallback branding in case of dynamic generation errors

---

## Metadata Standards

All OG images should follow these standards:

```typescript
export const metadata = {
  openGraph: {
    title: "VLN - [Page Title]",
    description: "[Page Description]",
    type: "website",
    url: "https://vln.gg/[route]",
    images: [
      {
        url: "https://vln.gg/api/og/[route]",
        width: 1200,
        height: 630,
        alt: "VLN - [Page Title]",
        type: "image/png",
      },
    ],
  },
};
```

### Image Specifications

- **Dimensions:** 1200x630px (3:2 ratio - ideal for social media)
- **Format:** PNG (transparent) or JPEG
- **File Size:** < 100KB (for optimal loading)
- **Font:** Inter (VLN brand font)
- **Colors:** VLN color palette
  - Background: `#0a0e0f` (vln-bg)
  - Primary accent: `#86d993` (vln-sage)
  - Secondary accent: `#7dd3fc` (vln-bluegray)

---

## Social Media Preview

### Twitter (X)
- Card type: `summary_large_image`
- Image size: 506x506px (minimum)
- Recommended: 1200x630px

### LinkedIn
- Image size: 1200x627px recommended
- Aspect ratio: 1.91:1

### Facebook
- Image size: 1200x630px optimal
- Aspect ratio: 1.91:1

### Discord
- Image size: 1024x576px recommended
- Aspect ratio: 16:9

---

## Testing Checklist

- [ ] Test each OG image on Twitter Card Validator (cards-dev.twitter.com)
- [ ] Test on Facebook Sharing Debugger (facebook.com/tools/debug)
- [ ] Test on LinkedIn Post Inspector
- [ ] Verify image loading performance (< 500ms)
- [ ] Check mobile preview in different social apps
- [ ] Ensure alt text is descriptive

---

## Implementation Files

### Files to Create/Update

1. `app/get-help/opengraph-image.tsx` - Support page OG
2. `app/terms/opengraph-image.tsx` - Terms page OG
3. `app/privacy/opengraph-image.tsx` - Privacy page OG
4. `app/refunds/opengraph-image.tsx` - Refunds page OG
5. `app/referrals/opengraph-image.tsx` - Referrals page OG
6. `app/services/san-francisco/opengraph-image.tsx` - SF service page OG
7. `app/api/og/[...slug]/route.ts` - Enhance wildcard endpoint

### Template Pattern

Each OG image file should follow this pattern:

```typescript
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "[Page Title]";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return (
    <div style={{
      background: "#0a0e0f",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Inter",
    }}>
      {/* Content */}
    </div>
  );
}
```

---

## Wildcard OG Endpoint Enhancement

### Proposed Route

`app/api/og/[...slug]/route.ts` - Enhanced version

```typescript
// Features:
// 1. Extract route from slug parameter
// 2. Check if specific OG image exists
// 3. Fall back to generic VLN image
// 4. Include route path for debugging
// 5. Cache responses (86400s / 24 hours)
// 6. Handle errors gracefully
```

### Fallback Behavior

```
/api/og/get-help
  ↓
Check: app/get-help/opengraph-image.tsx exists?
  ↓ No
Use: Generic VLN OG + "Get Help" text
  ↓
Cache for 24 hours
```

---

## Next Steps

### Immediate (This Sprint)

1. Create OG images for all HIGH priority missing pages
2. Enhance wildcard OG endpoint with better fallback
3. Update metadata exports on all pages
4. Test all OG images on social platforms

### Follow-up (Next Sprint)

5. Create dynamic blog post OG images
6. Set up monitoring for OG image loading performance
7. Create OG image guidelines document for team

---

## Related Documentation

- [ROUTES.md](./ROUTES.md) - Complete route listing
- [og-images.md](./docs/design/og-images.md) - OG design guidelines
- [Next.js Open Graph Docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)

---

**Last Updated:** February 24, 2026
**Author:** Claude
**Status:** Ready for Implementation
