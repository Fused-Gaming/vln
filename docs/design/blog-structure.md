# VLN Blog Structure & Migration Plan

**Last Updated:** March 12, 2026
**Status:** Active (currently on vln.gg/blog)

---

## Current Blog Architecture

### Location
- **Domain:** vln.gg
- **Path:** `/blog`
- **Type:** App Router with dynamic route segments

### File Structure
```
app/blog/
├── page.tsx                    # Blog listing page (BlogContent.tsx)
├── BlogContent.tsx             # Blog grid + article cards
├── opengraph-image.tsx         # Blog hub OG image
├── [slug]/
│   └── opengraph-image.tsx     # Dynamic per-article OG image
├── top-smart-contract-vulnerabilities-defi/
│   └── page.tsx
├── web3-security-checklist-bay-area-startups/
│   └── page.tsx
├── igaming-platform-security-audit-guide/
│   └── page.tsx
├── rng-manipulation-attacks-casino-platforms/
│   └── page.tsx
└── vln-founder-meetup-oakland/
    └── page.tsx
```

### Current Articles (Updated 2026-03-12)

| Title | Slug | Category | Date | Color | Source |
|-------|------|----------|------|-------|--------|
| iGaming Platform Security: A Complete Audit Guide | `igaming-platform-security-audit-guide` | Platform Security | Mar 10, 2026 | amber | VLN Research |
| RNG Manipulation Attacks: How Casino Platforms Get Exploited | `rng-manipulation-attacks-casino-platforms` | RNG Analysis | Feb 28, 2026 | purple | VLN Research |
| Web3 Security Checklist for Startups in the Bay Area | `web3-security-checklist-bay-area-startups` | Security Guide | Feb 15, 2026 | blue | VLN Research |
| Top Smart Contract Vulnerabilities Found in Bay Area DeFi Projects | `top-smart-contract-vulnerabilities-defi` | Security Research | Feb 1, 2026 | sage | VLN Research |

**Note:** Articles are sorted by date (newest first) in BlogContent.tsx

---

## Adding New Blog Articles

### Step 1: Create Article Page
Create a new directory under `/app/blog/[slug-name]` with `page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ICBoardBackground from "@/components/vln/ic-board-background";
import CSSFade from "@/components/animations/css-fade";
import Button from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Article Title | VLN",
  description: "Article description for SEO",
  alternates: {
    canonical: "https://vln.gg/blog/slug-name",
  },
  openGraph: {
    title: "Article Title | VLN",
    description: "Article description",
    url: "https://vln.gg/blog/slug-name",
    type: "article",
  },
};

export default function ArticlePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Article Title",
    description: "Article description",
    author: {
      "@type": "Organization",
      name: "VLN Security",
      url: "https://vln.gg",
    },
    datePublished: "2026-03-12",
    dateModified: "2026-03-12",
    url: "https://vln.gg/blog/slug-name",
  };

  return (
    <div className="min-h-screen bg-vln-bg text-vln-white overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <ICBoardBackground />
      <Header />
      <main className="relative z-10">
        {/* Article content here */}
      </main>
      <Footer />
    </div>
  );
}
```

### Step 2: Create OG Image (Optional)
Create `/app/blog/[slug-name]/opengraph-image.tsx` for dynamic OG images.

### Step 3: Update BlogContent.tsx
Add entry to `articles` array with:
- `slug`: URL-safe slug
- `title`: Article title (max 60 chars for SEO)
- `excerpt`: Summary (max 160 chars)
- `category`: One of: "Security Research", "Security Guide", "Platform Security", "RNG Analysis"
- `date`: March 12, 2026 format
- `readTime`: "X min read"
- `tags`: 3-5 relevant tags
- `color`: "sage" | "blue" | "amber" | "purple"
- `source`: "VLN Research" or external source name

---

## LinkedIn Article Integration Plan

### Overview
To add LinkedIn articles from https://linkedin.com/in/supitsj:

1. **Manual Collection** (Recommended - LinkedIn blocks automated scraping)
   - Visit LinkedIn profile
   - Extract article titles, descriptions, dates
   - Note: Full articles may require manual writing with VLN cover art

2. **Cover Art Generation**
   - Create VLN-branded OpenGraph images for LinkedIn articles
   - Use design tokens: sage green (#a6c3a7), matte charcoal (#0f0f0f)
   - Include:
     - Article title (max 60 chars)
     - LinkedIn source attribution
     - VLN logo mark (V square)
     - Circuit trace decorations

3. **Article Structure**
   - Source: "LinkedIn" (not "VLN Research")
   - Link strategy: TBD (direct LinkedIn URL vs. local summary)
   - Category: Assign to relevant category
   - Color: Assign unique accent color

### Template for LinkedIn Articles
```typescript
{
  slug: "linkedin-article-slug",
  title: "Article Title from LinkedIn",
  excerpt: "Summary of the LinkedIn article (160 chars max)",
  category: "Security Research" | "Platform Security" | etc,
  date: "Month DD, 2026",
  readTime: "X min read",
  tags: ["Tag1", "Tag2", "Tag3"],
  color: "blue" as const,
  source: "LinkedIn",
}
```

---

## Future: blog.vln.gg Subdomain Migration

### Timeline
- **Phase 1 (Current):** Content lives on vln.gg/blog
- **Phase 2 (Q2 2026):** Prepare blog.vln.gg subdomain infrastructure
- **Phase 3 (Q3 2026):** Migrate to blog.vln.gg with 301 redirects from vln.gg/blog

### Changes Required for Migration

1. **Route Structure**
   ```
   blog/[slug]/page.tsx  →  app/[slug]/page.tsx
   ```

2. **OG Image API Updates**
   - Create `/app/api/og/blog/route.tsx` for blog.vln.gg OG images
   - Update branding to reflect blog subdomain

3. **DNS & Vercel Setup**
   - Add blog.vln.gg DNS A record
   - Configure Vercel project routing for subdomain

4. **Redirects**
   - Add 301 redirects in vercel.json:
   ```json
   {
     "redirects": [
       {
         "source": "/blog/:slug*",
         "destination": "https://blog.vln.gg/:slug*",
         "permanent": true
       }
     ]
   }
   ```

5. **Canonical URLs**
   - Update metadata alternates: canonical → blog.vln.gg
   - Update OpenGraph URLs

### Benefits
- SEO separation (blog content indexed as blog.vln.gg)
- Independent blog analytics
- Subdomain branding consistency with docs.vln.gg, design.vln.gg
- Cleaner vln.gg main site structure

---

## Blog Content Guidelines

### Audience
- Bay Area Web3 developers and founders
- Smart contract auditors and security researchers
- iGaming platform operators
- Enterprise security teams

### Topic Areas
1. **Smart Contract Security** – DeFi vulnerabilities, Solidity patterns
2. **iGaming Security** – RNG integrity, platform auditing, anti-fraud
3. **Blockchain Forensics** – Exploit post-mortems, on-chain analysis
4. **Web3 Best Practices** – Startup security checklists, pre-launch guides
5. **Security Research** – Original vulnerability research, attack vectors

### Formatting Standards
- H1: Article title
- H2: Major sections (numbered or named)
- Code blocks: Syntax highlighting with language specified
- Real-world examples or case studies (anonymized if needed)
- Links to VLN services (audits, forensics, training)
- Footer CTA: Newsletter signup + security audit booking

### SEO Best Practices
- Title tags: 50-60 chars (primary keyword + branding)
- Meta descriptions: 150-160 chars
- Canonical URLs: Always set to article URL
- OpenGraph: Proper image + description
- JSON-LD: Article schema with author, datePublished, dateModified
- Keywords: 5-10 relevant terms in content + metadata

---

## Writing Checklist for New Articles

- [ ] Create page.tsx in `/app/blog/[slug]/`
- [ ] Add Metadata (title, description, canonical, OpenGraph)
- [ ] Add JSON-LD Article schema
- [ ] Structure with Header, ICBoardBackground, Footer
- [ ] Include breadcrumb: `← Blog`
- [ ] Add back-link to `/blog`
- [ ] Update BlogContent.tsx with article entry
- [ ] Test OG image rendering
- [ ] Update blog/opengraph-image.tsx if needed
- [ ] Test mobile responsiveness
- [ ] Verify all links (internal + external)
- [ ] Add related articles or CTA at bottom
- [ ] Validate HTML schema (schema.org)

---

## Testing OG Images

### Local Testing
```bash
pnpm dev
# Visit: http://localhost:3000/blog/[slug]/opengraph-image
```

### Social Validators
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [General OG Testing](https://www.opengraph.xyz/)

---

## Related Documentation
- `/docs/design/og-images.md` – OpenGraph image system
- `/CLAUDE.md` – Project guidelines and structure
- `/docs/design/DESIGN_ASSETS.md` – Brand colors and fonts

