# ADR-004: Database Design & ORM Selection

**Date:** 2026-02-25
**Status:** Accepted
**Context:** VLN needs a robust database for audit management, payments, and compliance tracking across three phases.

---

## Decision

**Selected: PostgreSQL + Prisma**

### Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Database** | PostgreSQL | Open-source, ACID, scalable |
| **ORM** | Prisma | Type-safe, migrations, excellent DX |
| **Hosting** | Vercel Postgres | Integrated, managed, auto-scaling |

---

## Why This Stack?

### PostgreSQL Advantages
- **ACID Compliance:** Financial transactions (payments)
- **Advanced Features:** JSON, Full-text search, arrays
- **Reliability:** 30+ years proven
- **Scaling:** Replication, sharding options
- **Security:** Row-level security, encryption

### Prisma Advantages
- **Type Safety:** Generated types from schema
- **Migrations:** Version-controlled schema changes
- **Performance:** Efficient queries via generated client
- **Developer Experience:** Intuitive API
- **Tooling:** Prisma Studio for data inspection

---

## Schema Design Principles

### 1. Normalization
- Third-normal form (3NF)
- Avoid data duplication
- Clear relationships

### 2. Performance
- Strategic indexes on common queries
- Partitioning for large tables (future)
- Connection pooling

### 3. Auditability
- Activity logs for compliance
- Soft deletes where needed
- Timestamp tracking (createdAt, updatedAt)

### 4. Security
- Row-level security via app layer
- Encryption for sensitive data
- No direct SQL queries (always use Prisma)

---

## Core Models (50+ tables)

### Authentication
- User (email, password, role)
- Session (tokens, refresh)
- VerificationToken (email, 2FA)
- OAuthAccount (provider accounts)

### Organization
- Team (groups, billing)
- TeamMember (membership + roles)

### Audits
- AuditRequest (intake + tracking)
- UploadedFile (contract storage metadata)
- Report (security findings)
- Finding (individual vulnerabilities)

### Payments
- Payment (transaction status)
- Invoice (billing documents)
- LineItem (invoice details)

### Operations
- ActivityLog (audit trail)
- Notification (user notifications)
- WebhookEndpoint (external integrations)
- WebhookEvent (delivery log)

---

## Indexing Strategy

### High-Priority Indexes
```sql
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Audits
CREATE INDEX idx_audit_requests_user_id ON audit_requests(user_id);
CREATE INDEX idx_audit_requests_status ON audit_requests(status);
CREATE INDEX idx_audit_requests_created_at ON audit_requests(created_at);

-- Payments
CREATE INDEX idx_payments_audit_id ON payments(audit_id);
CREATE INDEX idx_payments_status ON payments(status);

-- Activity
CREATE INDEX idx_activity_logs_audit_id ON activity_logs(audit_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);
```

---

## Scalability Plan

### Phase 1-2
- Single PostgreSQL instance
- Connection pooling (20 connections)
- Daily backups
- Estimated: 10-100K audits/month

### Phase 3+
If scaling required:
- **Read Replicas:** For reporting queries
- **Partitioning:** Audit tables by date
- **Archival:** Old data → cold storage
- **Sharding:** Multi-database if needed (future)

---

## Migration Strategy

### Version Control
All migrations stored in `prisma/migrations/`:
```bash
# Create migration
npx prisma migrate dev --name add_user_roles

# Deploy migration
npx prisma migrate deploy

# Rollback available via git history
```

### Backup Strategy
- Automatic daily backups (Vercel Postgres)
- Point-in-time recovery enabled
- Test restore monthly
- 30-day retention

### Zero-Downtime Deployments
- Add column as nullable
- Deploy code using new column
- Later make column required
- No downtime

---

## Query Optimization

### Common Query Patterns
```typescript
// User lookup (indexed)
const user = await prisma.user.findUnique({ where: { email } });

// Recent audits (indexed)
const audits = await prisma.auditRequest.findMany({
  where: { userId, status: 'IN_PROGRESS' },
  orderBy: { createdAt: 'desc' },
  take: 10,
});

// Pagination with cursor
const page = await prisma.auditRequest.findMany({
  cursor: { id: lastId },
  skip: 1,
  take: 20,
});
```

### Connection Pooling
```
Development: 5 connections
Production: 20 connections
Max idle: 10 seconds
```

---

## Compliance Considerations

### GDPR
- Right to delete: soft deletes with archive
- Data portability: export APIs
- Audit trail: ActivityLog table

### SOC 2
- Encryption at rest (Vercel handles)
- Encryption in transit (HTTPS)
- Access logging
- Backup verification

---

## Monitoring

```sql
-- Connection usage
SELECT count(*) as active_connections
FROM pg_stat_activity;

-- Slow queries
SELECT query, calls, mean_time
FROM pg_stat_statements
WHERE mean_time > 1000
ORDER BY mean_time DESC;

-- Table sizes
SELECT
  schemaname, tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename))
FROM pg_tables;
```

---

## Cost Projection

| Usage | Vercel Postgres Cost |
|-------|------------------|
| Development | Included (free tier) |
| 10GB data | $50/month |
| 50GB data | $250/month |
| 100GB+ | Custom pricing |

---

## Disaster Recovery

1. **RTO (Recovery Time Objective):** <1 hour
2. **RPO (Recovery Point Objective):** <1 hour
3. **Backup frequency:** Hourly
4. **Restore testing:** Monthly

---

**Related Decisions:**
- ADR-002: File Storage (blob metadata in DB)
- Database design doc: `database-design.md`
- Schema: `prisma/schema.prisma`

---

**References:**
- https://www.postgresql.org/
- https://www.prisma.io/
- https://vercel.com/docs/storage/postgres
