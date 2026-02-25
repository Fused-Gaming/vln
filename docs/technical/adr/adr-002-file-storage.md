# ADR-002: File Storage Strategy

**Date:** 2026-02-25
**Status:** Accepted
**Context:** VLN needs to store audit contract files, reports, and user uploads securely and scalably.

---

## Problem

Need to store:
- Smart contract files (.sol, .ts, etc)
- User uploads (PDFs, documents)
- Generated reports (PDF, HTML)
- Reasonable access patterns

Options:
- **A:** AWS S3 (industry standard)
- **B:** Vercel Blob (integrated, simple)
- **C:** Local filesystem (not scalable)

---

## Decision

**Selected: Vercel Blob** (Option B) with S3 migration path

### Rationale

| Factor | Vercel Blob | S3 | Local |
|--------|-----------|-----|-------|
| Integration | ✅ Native | No | N/A |
| Cost | Low | Moderate | N/A |
| Complexity | ✅ Simple | Complex | Simple |
| Scalability | ✅ Auto | ✅ Yes | ❌ No |
| Security | ✅ Yes | ✅ Yes | ❌ No |
| Maintenance | ✅ Managed | Manual | Manual |

### Implementation

1. **Phase 1-2:** Vercel Blob
   - Simple API
   - No separate infra
   - Auto-scaling
   - CDN included

2. **Phase 3:** S3 Migration Option
   - If cost becomes concern
   - Direct compatibility layer
   - Minimal code changes

---

## File Categories

### Category 1: Contract Files
- **Type:** Smart contract source code
- **Size:** 1KB - 10MB typical
- **Retention:** Full retention (audit trail)
- **Access:** Private to audit team + client

### Category 2: Reports
- **Type:** PDF, HTML, JSON
- **Size:** 100KB - 50MB
- **Retention:** 7+ years
- **Access:** Client (with token), audit team

### Category 3: Working Files
- **Type:** Analysis, notes, POC
- **Size:** Variable
- **Retention:** Until audit complete
- **Access:** Audit team only

---

## Storage Structure

```
/vln-storage/
├── audits/
│   ├── {auditId}/
│   │   ├── uploads/          # Client uploads
│   │   ├── reports/          # Generated reports
│   │   └── working/          # Team working files
├── invoices/
│   ├── {invoiceId}/pdf
└── temp/                      # Temporary files (auto-cleanup)
```

---

## Security Requirements

- [ ] Encryption at rest (provided by Vercel)
- [ ] Encryption in transit (HTTPS only)
- [ ] Private URLs with tokens
- [ ] Access logging
- [ ] Virus scanning on upload
- [ ] File size limits (100MB max)
- [ ] Type validation (whitelist extensions)

---

## Access Control

```typescript
// Signed URLs with expiration
const url = await blob.download({
  path: `/audits/${auditId}/reports/report.pdf`,
  expiresIn: 3600  // 1 hour
});

// Audit team: full access
// Client: read-only via signed URL
// Public: no access
```

---

## Cleanup Policy

- **Working files:** Delete after audit complete (30 days)
- **Reports:** Keep indefinitely (compliance)
- **Uploads:** Keep with audit data
- **Temp files:** Auto-delete after 24 hours

---

## Bandwidth Costs

Estimate for typical usage:
- 50 audits/month
- 2MB per audit average
- 100GB/month storage
- **Cost:** ~$10/month (Vercel Blob)

S3 equivalent: ~$2-5/month (but higher complexity)

---

## Migration Path

If migrating to S3 in future:
```typescript
// Abstraction layer
interface Storage {
  upload(path, file): Promise<string>
  download(path): Promise<Buffer>
  delete(path): Promise<void>
}

// Implementation can switch without changing app code
```

---

**Related Decisions:**
- ADR-003: Email Service (for report links)
- ADR-001: Auth Strategy (for access tokens)

---

**References:**
- https://vercel.com/docs/storage/vercel-blob
- https://aws.amazon.com/s3/
