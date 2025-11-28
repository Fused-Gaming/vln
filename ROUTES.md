# VLN.gg Site Routes

This document provides a complete overview of all routes in the VLN website.

## Route Structure

All routes follow Next.js 15 App Router conventions with file-based routing.

### Public Pages

| Route | File | Description | Status |
|-------|------|-------------|--------|
| `/` | `app/page.tsx` | Homepage with hero, stats, services overview | ✅ Complete |
| `/about` | `app/about/page.tsx` | About VLN, mission, story, values, timeline | ✅ Complete |
| `/services` | `app/services/page.tsx` | All services (Audits, Pen Test, Dev, Design, Training) | ✅ Complete |
| `/pricing` | `app/pricing/page.tsx` | Audit tiers, retainers, additional services | ✅ Complete |
| `/contact` | `app/contact/page.tsx` | Contact form and information | ✅ Complete |
| `/faq` | `app/faq/page.tsx` | Frequently asked questions (25+ Q&A) | ✅ Complete |
| `/blog` | `app/blog/page.tsx` | Blog placeholder (future content) | ⚠️ Placeholder |
| `/get-help` | `app/get-help/page.tsx` | Support options, emergency contact | ✅ Complete |

### Legal Pages

| Route | File | Description | Status |
|-------|------|-------------|--------|
| `/terms` | `app/terms/page.tsx` | Terms of Service | ✅ Complete |
| `/privacy` | `app/privacy/page.tsx` | Privacy Policy (GDPR-compliant) | ✅ Complete |
| `/refunds` | `app/refunds/page.tsx` | Refund Policy | ✅ Complete |

### Error Pages

| Route | File | Description | Status |
|-------|------|-------------|--------|
| `404` | `app/not-found.tsx` | Custom 404 error page | ✅ Complete |

## Route Groups & Organization

### Marketing Pages
- `/` (Homepage)
- `/about`
- `/services`
- `/pricing`

### Support & Help
- `/faq`
- `/get-help`
- `/contact`

### Legal & Compliance
- `/terms`
- `/privacy`
- `/refunds`

### Content (Future Expansion)
- `/blog` (currently placeholder)
- `/blog/[slug]` (planned)

## Deep Links & Anchors

### Services Page
- `/services#audits`
- `/services#pentest`
- `/services#development`
- `/services#design`
- `/services#university`

### Contact Page Query Parameters
- `/contact?service=prevention`
- `/contact?service=forensics`
- `/contact?service=audits`
- `/contact?service=pentest`
- `/contact?service=development`
- `/contact?service=design`
- `/contact?service=university`
- `/contact?service=emergency`
- `/contact?type=consultation`

### Pricing Page Query Parameters
- `/contact?service=audit&tier=small-contract`
- `/contact?service=audit&tier=medium-contract`
- `/contact?service=audit&tier=large-contract`
- `/contact?service=retainer&tier=starter`
- `/contact?service=retainer&tier=growth`
- `/contact?service=retainer&tier=enterprise`

## Future Routes (Planned)

### Blog System
- `/blog` - Blog index
- `/blog/[slug]` - Individual blog posts
- `/blog/category/[category]` - Category pages
- `/blog/tag/[tag]` - Tag pages

### Client Portal (Deferred)
- `/portal` - Client dashboard
- `/portal/reports` - Audit reports
- `/portal/reports/[id]` - Individual report view

### Advisory Feed (Planned)
- `/advisories` - Public security advisories
- `/advisories/[cve]` - Individual advisory

## Sitemap

A dynamic sitemap is generated at `/sitemap.xml` via `app/sitemap.ts`.

## Robots.txt

Crawling rules are defined in `app/robots.txt`.

## Navigation Structure

### Header Navigation
- Home → `/`
- Services → `/services`
- Pricing → `/pricing`
- Contact → `/contact`

### Footer Navigation

**Resources**
- About Us → `/about`
- Get Help → `/get-help`
- FAQ → `/faq`
- Blog → `/blog`

**Services**
- Audits → `/services#audits`
- Pen Test → `/services#pentest`
- Development → `/services#development`
- Design → `/services#design`
- VLN University → `/services#university`

**Legal**
- Terms of Service → `/terms`
- Privacy Policy → `/privacy`
- Refund Policy → `/refunds`

**Connect**
- Social media icons (external links)
- Email: info@vln.gg
- Website: vln.gg

## Redirects

Currently no redirects configured. If needed, add to `next.config.ts`:

```typescript
async redirects() {
  return [
    {
      source: '/old-path',
      destination: '/new-path',
      permanent: true,
    },
  ];
}
```

## Route Security

- All routes protected by middleware with CORS enforcement
- Security headers applied to all routes
- CSP (Content Security Policy) enforced
- HSTS enabled with 2-year max-age

## Performance Optimization

- All pages are statically generated where possible
- Dynamic routes use ISR (Incremental Static Regeneration) when needed
- Images optimized via Next.js Image component
- Fonts preloaded from Google Fonts

## Accessibility

- All routes support keyboard navigation
- ARIA labels present on interactive elements
- Semantic HTML structure
- WCAG AA compliant color contrast
- Screen reader friendly

---

**Last Updated:** January 2025
**Total Routes:** 11 public pages + 1 error page = 12 routes
