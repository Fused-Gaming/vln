# Cloudflare Web Analytics Configuration

**Last Updated:** 2024-11-21

## Overview

This document maps Cloudflare Web Analytics tokens to VLN subdomains. Each subdomain has a unique analytics property for tracking.

## Token Mapping

| Subdomain | Token | Status | Implementation |
|-----------|-------|--------|----------------|
| **vln.gg** | `565db9149b914dc2aec85b7ac21da3c0` | ✅ Active | `/app/layout.tsx` |
| **design.vln.gg** | `d9446c5be92a459d9d05b7332c5461ac` | ✅ Active | `/design-standards/docusaurus.config.ts` |
| **dev.vln.gg** | `676893dcea2246cbb43f185c173db305` | ✅ Active | `/devops-panel/app/layout.tsx` |
| **preview.vln.gg** | `798e8293f29145c8941a7cc4a4270787` | ✅ Active | `/devops-panel/app/layout.tsx` |
| **docs.vln.gg** | `67599a7223de481189d0e5aeeee3093d` | ⏳ Planned | Not yet implemented |
| **edu.vln.gg** | `eaa8d8257a8b4d05ae22904692680352` | ⏳ Planned | Not yet implemented |
| **help.vln.gg** | `5f60254ed5b24af2b4746cb3c14845c1` | ⏳ Planned | Not yet implemented |
| **blog.vln.gg** | `5bf714a8750c4bec86d278cb1b348e22` | ⏳ Planned | Not yet implemented |

## Implementation Details

### Main Site (vln.gg)

**Repository:** `Fused-Gaming/vln`
**File:** `app/layout.tsx`
**Token:** `565db9149b914dc2aec85b7ac21da3c0`

Cloudflare Web Analytics script is added to the root layout's `<head>` section.

### Design System (design.vln.gg)

**Repository:** `Fused-Gaming/DevOps`
**Path:** `design-standards/`
**File:** `docusaurus.config.ts`
**Token:** `d9446c5be92a459d9d05b7332c5461ac`

Analytics injected via Docusaurus `scripts` configuration.

### DevOps Panel (dev.vln.gg & preview.vln.gg)

**Repository:** `Fused-Gaming/DevOps`
**Path:** `devops-panel/`
**File:** `app/layout.tsx`
**Tokens:**
- `dev.vln.gg`: `676893dcea2246cbb43f185c173db305`
- `preview.vln.gg`: `798e8293f29145c8941a7cc4a4270787`

Environment-based token selection using `NEXT_PUBLIC_SUBDOMAIN` or hostname detection.

## Security Notes

✅ **Cloudflare Web Analytics tokens are PUBLIC and safe to commit**
- These tokens only allow sending analytics data
- They cannot be used to access your Cloudflare account
- They cannot read or modify analytics data
- They are meant to be visible in client-side HTML

## Updating Tokens

To update a token for a specific subdomain:

1. Locate the implementation file from the table above
2. Find the Cloudflare Web Analytics script
3. Replace the `data-cf-beacon` token value
4. Rebuild and redeploy the application

## Cookie Policy

Cloudflare Web Analytics is privacy-focused and:
- ✅ Does NOT use cookies
- ✅ Does NOT track users across sites
- ✅ Does NOT collect personal information
- ✅ Complies with GDPR and privacy regulations

No cookie consent banner is required for Cloudflare Web Analytics.

## Analytics Features

All properties track:
- Page views
- Unique visitors
- Referrers
- Device types
- Geographic location (country-level)
- Browser and OS statistics

## Verification

After deployment, verify analytics are working:

1. Visit the subdomain in a browser
2. Open browser DevTools → Network tab
3. Look for requests to `cloudflareinsights.com`
4. Check Cloudflare Analytics dashboard (24-48 hour delay for initial data)

## Related Documentation

- [Cloudflare Web Analytics Docs](https://developers.cloudflare.com/analytics/web-analytics/)
- [VLN Subdomain Architecture](https://github.com/Fused-Gaming/DevOps/blob/main/docs/SUBDOMAIN-ARCHITECTURE.md)

---

**Maintained By:** Fused Gaming DevOps Team
**Contact:** For token access or analytics dashboard permissions, contact the DevOps lead.
