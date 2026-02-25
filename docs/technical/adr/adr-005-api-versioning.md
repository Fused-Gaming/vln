# ADR-005: API Versioning Strategy

**Date:** 2026-02-25
**Status:** Accepted
**Context:** VLN API will evolve across phases. Need strategy for backward compatibility and migration.

---

## Decision

**Selected: URL-based versioning with deprecation periods**

### Versioning Scheme

```
/v1/audits          # v1 endpoints (Phase 1-2)
/v2/audits          # v2 endpoints (Phase 3+)
```

### Rationale

| Approach | Pros | Cons |
|----------|------|------|
| **URL-based** ✅ | Clear, explicit, cached | URL duplication |
| **Header-based** | Cleaner URLs | Hard to test, cache issues |
| **Query param** | Flexible | Non-standard, hard to cache |

---

## Versioning Policy

### v1 Endpoints (Current)

**Status:** Active (Phase 1-2)
**Endpoints:** 50+
**Stability:** Stable
**Support:** 24 months minimum

```
GET  /v1/audits
GET  /v1/audits/:id
POST /v1/audits
GET  /v1/reports/:id
POST /v1/payments
```

### v2 Endpoints (Phase 3+)

When v2 introduced (Phase 3):
- v1 continues for 12 months
- Overlapping support period: 12 months
- v2 becomes primary recommendation
- v1 enters "maintenance" mode

### Deprecation Timeline

```
2026-02: v1 released
2026-09: v2 announced (6 months notice)
2027-03: v2 released, v1 deprecated
2028-03: v1 sunset (12 month deprecation period)
```

---

## What Changes Between Versions?

### Allowed (Non-Breaking)
- ✅ New endpoints
- ✅ New optional fields
- ✅ New query parameters
- ✅ New error codes
- ✅ Internal optimizations

### Breaking (Requires New Version)
- ❌ Remove endpoints
- ❌ Remove fields
- ❌ Change field types
- ❌ Change response structure
- ❌ Change HTTP status codes

---

## Deprecation Headers

All responses include:

```
Deprecation: true                    # Mark deprecated
Sunset: Wed, 01 Mar 2028 00:00:00 GMT
Link: <https://api.vln.gg/v2/audits>; rel="successor-version"
X-API-Warn: "v1 is deprecated, migrate to v2"
```

---

## Migration Guide

For each version change:

### 1. Announcement (6 months before)
```
Subject: VLN API v2 Announcement
- Release date: March 1, 2027
- Migration guide: https://docs.vln.gg/migrate-v1-to-v2
- Timeline: 12-month support window
```

### 2. Migration Guide Documentation
```
/docs/migration/v1-to-v2.md

## Overview
v2 introduces [key changes]

## What's Changing
- Endpoint changes
- Response structure changes
- Authentication changes

## Migration Steps
1. Review changes
2. Update client code
3. Test thoroughly
4. Deploy to production

## Support
v1 supported until: March 1, 2028
```

### 3. Interactive Tools
- API explorer (Postman collection)
- Swagger spec for v2
- Code samples (cURL, Node, Python)

---

## Versioning in Code

### Route Organization

```
app/api/
├── v1/
│   ├── audits/
│   │   ├── route.ts        # GET /v1/audits, POST /v1/audits
│   │   └── [id]/
│   │       ├── route.ts    # GET /v1/audits/:id, PATCH, DELETE
│   │       └── reports/
│   │           └── route.ts
│   ├── payments/
│   └── ...
│
├── v2/
│   ├── audits/
│   │   └── ... (v2 changes)
│   └── ...
│
└── _middleware/
    └── validateVersion.ts  # Ensure version support
```

### Version Validation Middleware

```typescript
export async function validateVersion(version: 'v1' | 'v2') {
  const supportedVersions = {
    v1: { supported: true, sunset: new Date('2028-03-01') },
    v2: { supported: true, sunset: null },
  };

  const versionInfo = supportedVersions[version];

  if (!versionInfo.supported) {
    throw new Error(`API version ${version} no longer supported`);
  }

  if (versionInfo.sunset && new Date() > versionInfo.sunset) {
    throw new Error(`API version ${version} sunset date passed`);
  }
}
```

---

## Client SDK Versioning

### JavaScript SDK

```
@vln/sdk@^1.0.0      # v1 compatible
@vln/sdk@^2.0.0      # v2 compatible

npm install @vln/sdk@latest  # Auto-updates
```

### Version Helpers

```typescript
import { VLNClient } from '@vln/sdk';

// Auto-detects version from API
const client = new VLNClient({ apiKey: '...' });

// Explicit version specification
const clientV1 = new VLNClient({ apiKey: '...', version: 'v1' });
const clientV2 = new VLNClient({ apiKey: '...', version: 'v2' });
```

---

## Communication Plan

### For API Consumers

| Timeline | Action |
|----------|--------|
| T-6mo | Announce v2 release date |
| T-3mo | Release v2 beta |
| T-1mo | Final migration guide |
| T+0 | v2 GA, v1 enters deprecation |
| T+12mo | v1 sunset |

### Channels
- Email to API key holders
- In-app notifications
- Blog post
- Migration guide
- Office hours (video session)

---

## Example: Hypothetical v2 Changes

### Breaking Changes
```typescript
// v1
POST /v1/audits
{
  "projectName": "XYZ",
  "scope": { "contracts": [...] }
}

// v2 - Different structure
POST /v2/audits
{
  "project": {
    "name": "XYZ",
    "contractAddresses": [...]
  }
}
```

### Migration
```typescript
// Before (v1)
const audit = await client.post('/v1/audits', {
  projectName: 'XYZ',
  scope: { contracts: [...] }
});

// After (v2)
const audit = await client.post('/v2/audits', {
  project: {
    name: 'XYZ',
    contractAddresses: [...]
  }
});
```

---

## Testing Strategy

### Maintain Both Versions

```bash
# Unit tests run against both v1 and v2
npm run test:v1
npm run test:v2

# Integration tests
npm run test:integration -- --versions v1,v2

# Backward compatibility tests
npm run test:compatibility
```

---

## Monitoring

Track version usage:
```sql
SELECT
  version,
  endpoint,
  count(*) as requests,
  created_at
FROM api_logs
WHERE created_at > NOW() - INTERVAL 30 days
GROUP BY version, endpoint
ORDER BY requests DESC;
```

### Alerts
- If v1 traffic > 80% after deprecation: send reminder
- If v1 traffic < 20%: consider earlier sunset
- If v2 adoption < 50% by T+6mo: extend support

---

## Version Support Matrix

| Version | Released | Deprecated | Sunset |
|---------|----------|-----------|--------|
| v1 | 2026-02 | 2027-03 | 2028-03 |
| v2 | 2027-03 | TBD | TBD |
| v3 | 2029-03 | TBD | TBD |

---

## Related Decisions
- API design in `api-specification.md`
- SDK maintenance strategy

---

**References:**
- https://semver.org/ (semantic versioning)
- https://cloud.google.com/apis/design/versioning
- https://stripe.com/docs/upgrades (example: Stripe versioning)
