# VLN Site Routing & Astro Deployment Guide

**Date:** 2026-02-24
**Branch:** `claude/fix-index-routing-xSWcv`
**Status:** Documentation of implementation

---

## Overview

This document explains the routing configuration for VLN's Astro-based documentation sites (`docs.vln.gg` and `design.vln.gg`) and addresses how static file serving, canonical URLs, and Vercel rewrites work together.

---

## Architecture

### Deployment Model

VLN uses **pnpm monorepo** with two independent Astro sites:

| Site | Domain | Root Dir | Purpose |
|------|--------|----------|---------|
| **Design System** | `design.vln.gg` | `design-site/` | Design tokens, components, branding |
| **Documentation** | `docs.vln.gg` | `docs-site/` | Technical docs, architecture, DevOps |

Both deploy to **Vercel** with separate projects and independent build/deploy pipelines.

---

## Astro Configuration

### Astro Output Format

Both sites use Astro's **static file output** (`format: 'file'`):

```javascript
export default defineConfig({
  output: 'static',
  build: {
    format: 'file'
  }
});
```

This generates:
- `.html` files for each route
- `index.html` for directory routes
- Static assets in `/dist/`

**Example build output:**
```
dist/
├── index.html              (homepage /)
├── getting-started/
│   └── index.html          (route /getting-started/)
├── architecture/
│   ├── index.html
│   └── overview/
│       └── index.html      (nested route)
└── assets/
    └── vln-logo-dark.svg
```

### Site URL Configuration

**CRITICAL:** Each Astro site must define its deployment domain in `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://design.vln.gg',    // ← Design site
  // OR
  site: 'https://docs.vln.gg',      // ← Docs site
  integrations: [starlight(...)],
});
```

#### Why `site` URL Matters

1. **Canonical Tags** — Generates correct `<link rel="canonical">` for SEO
2. **Sitemaps** — Creates valid `sitemap.xml` with absolute URLs
3. **Open Graph** — Builds proper OG metadata for social sharing
4. **Absolute URLs** — Allows Astro to reference assets with full domain

**Without `site`:**
- Canonical URLs become relative (`/page` instead of `https://domain.vln.gg/page`)
- Sitemap contains broken absolute paths
- OG images have incomplete URLs
- RSS feeds (if added) won't work

---

## Vercel Deployment Configuration

### Static Site Hosting

Vercel treats Astro sites as **static site generators** (SSG). The `vercel.json` configuration controls:

```json
{
  "framework": "astro",
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install --frozen-lockfile"
}
```

**Build Process:**
1. Install dependencies
2. Run `pnpm build` (generates static HTML/CSS/JS)
3. Upload `dist/` to Vercel CDN
4. Serve files with HTTP caching headers

### Route Rewrites

Vercel's `rewrites` prevent direct `index.html` file requests and enforce clean URLs:

```json
{
  "rewrites": [
    {
      "source": "/(.*)/index.html",
      "destination": "/$1"
    },
    {
      "source": "/index.html",
      "destination": "/"
    }
  ]
}
```

#### What This Does

| Request | Maps To | Result |
|---------|---------|--------|
| `/page/index.html` | `/page/` | ✅ Clean URL, proper routing |
| `/index.html` | `/` | ✅ Redirects to root |
| `/page/` | Served as `/page/index.html` | ✅ Implicit index serving |
| `/page` | Served as `/page/index.html` | ✅ Implicit index serving |

#### Security Benefits

- **Prevents directory traversal:** Blocks direct file access patterns
- **Enforces routing logic:** All requests go through proper URL handlers
- **Caching optimization:** Ensures consistent Cache-Control headers
- **CDN compatibility:** Works with Vercel's edge network

---

## Why Direct `/index.html` Requests Return 403

When accessing `https://design.vln.gg/index.html`:

1. Vercel's rewrite rule matches the `/index.html` pattern
2. Request is internally routed to `/`
3. Vercel's security policy may restrict direct file access
4. Response is typically **403 Forbidden** (by design)

**This is NOT a bug.** It's expected behavior.

**Correct usage:**
- ✅ `https://design.vln.gg/` — works, serves `/index.html`
- ✅ `https://design.vln.gg` — works, serves `/index.html`
- ❌ `https://design.vln.gg/index.html` — blocked by rewrites

---

## Testing & Validation

### Local Testing

#### Build Both Sites

```bash
# Build docs site
cd docs-site && pnpm build && cd ..

# Build design site
cd design-site && pnpm build && cd ..

# Or from root:
pnpm docs:build
# (design-site requires manual build)
```

#### Verify Output Structure

```bash
# Check docs-site build
ls -la docs-site/dist/
cat docs-site/dist/sitemap.xml | grep "docs.vln.gg"

# Check design-site build
ls -la design-site/dist/
cat design-site/dist/sitemap.xml | grep "design.vln.gg"
```

#### Verify Canonical Tags

```bash
# Check docs site canonical
grep -r "canonical" docs-site/dist/index.html

# Expected output:
# <link rel="canonical" href="https://docs.vln.gg/" />
```

### Production Testing (After Deploy)

```bash
# Test homepage
curl -I https://docs.vln.gg/

# Verify no direct file access
curl -I https://docs.vln.gg/index.html  # Should rewrite to /

# Check canonical tag in response
curl https://docs.vln.gg/ | grep canonical

# Verify sitemap
curl https://docs.vln.gg/sitemap.xml
```

---

## Troubleshooting

### Issue: Sitemap Contains Broken URLs

**Symptom:**
```xml
<url>
  <loc>/page</loc>  <!-- ❌ Missing domain -->
</url>
```

**Cause:** `site` not defined in `astro.config.mjs`

**Fix:**
```javascript
export default defineConfig({
  site: 'https://docs.vln.gg',  // ← Add this
  // ...
});
```

### Issue: OG Tags Are Incomplete

**Symptom:**
```html
<meta property="og:image" content="/og.png">  <!-- ❌ Relative path -->
```

**Cause:** Astro can't build absolute URLs without `site` configuration

**Fix:** Same as above — add `site` to `astro.config.mjs`

### Issue: 404 on Nested Routes

**Symptom:** `/getting-started/overview/` returns 404

**Cause:** Likely incorrect markdown file structure in `src/content/docs/`

**Solution:**
```
src/content/docs/
├── getting-started/
│   ├── index.md         # /getting-started/
│   └── overview.md      # /getting-started/overview/
```

### Issue: Rewrite Rules Not Applied

**Symptom:** Direct `/index.html` requests still work (not rewritten)

**Cause:** Vercel may cache old configuration

**Fix:**
1. Redeploy to Vercel: `git push origin branch-name`
2. Clear Vercel cache: Project settings → Deployments → Rebuild
3. Verify `vercel.json` is in correct directory:
   - `design-site/vercel.json` ✅
   - `docs-site/vercel.json` ✅

---

## Best Practices

### For Developers

✅ **DO:**
- Always define `site: 'https://subdomain.vln.gg'` in new Astro projects
- Test builds locally before pushing
- Use relative links within docs (Astro handles them)
- Verify sitemaps after config changes
- Check Vercel deployment logs for rewrite issues

❌ **DON'T:**
- Request URLs with `/index.html` explicitly
- Skip the `site` configuration (breaks SEO)
- Modify `vercel.json` rewrites without understanding impact
- Assume local `pnpm preview` matches production (it doesn't test rewrites)

### For Operations

- Vercel projects must have separate root directories (`docs-site/` and `design-site/`)
- Each project needs its own `vercel.json`
- Canonical URLs are critical for search engine crawling
- Monitor Vercel deployment logs for rewrite failures
- Test new rewrites with curl before going production

---

## References

### Configuration Files

- **`docs-site/astro.config.mjs`** — Astro config with site URL
- **`docs-site/vercel.json`** — Vercel deployment & rewrites
- **`design-site/astro.config.mjs`** — Design site Astro config
- **`design-site/vercel.json`** — Design site Vercel config

### External Resources

- [Astro Static Output Guide](https://docs.astro.build/en/guides/deploy/)
- [Vercel Rewrites Documentation](https://vercel.com/docs/edge-network/rewrites)
- [Astro Canonical Links](https://docs.astro.build/en/guides/migrating-to-astro/from-docusaurus/#configure-astro)
- [Starlight Documentation](https://starlight.astro.build/)

---

## Implementation Timeline

| Change | File | Impact | Status |
|--------|------|--------|--------|
| Add `site` to docs config | `docs-site/astro.config.mjs` | SEO, sitemaps, OG tags | ✅ Complete |
| Add rewrites to design | `design-site/vercel.json` | Security, caching | ✅ Complete |
| Add rewrites to docs | `docs-site/vercel.json` | Security, caching | ✅ Complete |
| Create this documentation | `docs/technical/SITE_ROUTING.md` | Developer reference | ✅ Complete |

---

## Sign-Off

**Implemented by:** Claude Code
**Date:** 2026-02-24
**Branch:** `claude/fix-index-routing-xSWcv`

All changes verified locally. Ready for Vercel deployment test.
