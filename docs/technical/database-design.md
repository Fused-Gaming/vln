# VLN Database Design Documentation

**Version:** 1.0.0
**Date:** 2026-02-25
**Provider:** PostgreSQL
**ORM:** Prisma

---

## Overview

The VLN database supports three phases of development:
- **Phase 1 (v0.11.0):** Brand & Distribution Layer
- **Phase 2 (v1.1.0-1.3.0):** Operationalize Audits
- **Phase 3 (v2.0.0-2.2.0):** Productize Security

The schema is designed with scalability, security, and compliance in mind.

---

## Core Models

### Authentication & User Management

#### User
Central user model for all authentication and profile management.

```prisma
model User {
  id                String          @id @default(cuid())
  email             String          @unique
  emailVerified     DateTime?
  name              String?
  role              UserRole        @default(CLIENT)
  passwordHash      String?
  twoFactorEnabled  Boolean         @default(false)
  twoFactorSecret   String?
  lastLogin         DateTime?
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt
}

enum UserRole {
  ADMIN              # Full system access
  RESEARCHER         # Can perform audits, create reports
  MANAGER            # Can manage team and requests
  CLIENT             # Can request audits, view reports
  GUEST              # Limited read-only access
}
```

**Features:**
- Role-based access control (RBAC)
- Two-factor authentication support
- Email verification workflow
- Last login tracking for security

**Indexes:**
- `email` — for authentication lookups
- `role` — for permission checks
- `createdAt` — for user analytics

#### Session
Manages user authentication sessions with JWT support.

```prisma
model Session {
  id            String   @id @default(cuid())
  userId        String
  token         String   @unique          # JWT or session token
  refreshToken  String?                   # For refresh flow
  expiresAt     DateTime
  ipAddress     String?
  userAgent     String?
  revokedAt     DateTime?
  createdAt     DateTime @default(now())
}
```

**Features:**
- IP tracking for security
- Device identification
- Token revocation support
- Automatic expiration

#### VerificationToken
Handles time-limited tokens for email verification, password reset, and 2FA.

```prisma
model VerificationToken {
  id        String    @id @default(cuid())
  userId    String
  token     String    @unique
  type      TokenType               # EMAIL_VERIFICATION, PASSWORD_RESET, etc
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime  @default(now())
}

enum TokenType {
  EMAIL_VERIFICATION
  PASSWORD_RESET
  TWO_FACTOR
  MAGIC_LINK
}
```

**Features:**
- Type-specific tokens
- Single-use tracking (usedAt)
- Automatic expiration
- Audit trail

#### OAuthAccount
Manages OAuth integrations (Google, GitHub, etc).

```prisma
model OAuthAccount {
  id                String    @id @default(cuid())
  userId            String
  provider          String                 # google, github, etc
  providerAccountId String    @unique
  accessToken       String?
  refreshToken      String?
  expiresAt         DateTime?
  createdAt         DateTime  @default(now())
}
```

**Features:**
- Multiple provider support
- Token refresh handling
- Provider-specific account linking

---

### Team & Organization

#### Team
Represents client organizations or internal teams.

```prisma
model Team {
  id              String        @id @default(cuid())
  name            String
  slug            String        @unique    # URL-friendly identifier
  description     String?
  leadId          String
  lead            User          @relation("team_lead")
  logo            String?
  website         String?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}
```

**Features:**
- Unique slug for branding
- Team lead designation
- Logo support for white-label
- Website URL for client

#### TeamMember
Many-to-many relationship between users and teams with role assignment.

```prisma
model TeamMember {
  id            String    @id @default(cuid())
  teamId        String
  userId        String
  role          TeamRole           # ADMIN, MEMBER, VIEWER
  joinedAt      DateTime  @default(now())
}

enum TeamRole {
  ADMIN              # Full team control
  MEMBER             # Can create audits, view reports
  VIEWER             # Read-only access
}
```

**Features:**
- Granular role-based permissions
- Join tracking
- Unique constraint ensures no duplicate memberships

---

### Audit Requests & Intake

#### AuditRequest
Core model for audit intake and management.

```prisma
model AuditRequest {
  id                  String            @id @default(cuid())
  userId              String
  teamId              String?           # Optional for team-based audits
  projectName         String
  description         String
  serviceType         AuditServiceType
  scope               String            # JSON: contracts, files, etc
  scopeSize           Int               # Lines of code or contract count
  status              AuditStatus       @default(PENDING)
  priority            AuditPriority     @default(MEDIUM)
  assignedTo          String?           # Researcher assigned
  estimatedCost       Decimal           @default(0)
  actualCost          Decimal?
  startDate           DateTime?
  targetDate          DateTime?
  completionDate      DateTime?
  notes               String?
  internalNotes       String?
  createdAt           DateTime          @default(now())
  updatedAt           DateTime          @updatedAt
  deletedAt           DateTime?         # Soft delete support
}

enum AuditStatus {
  PENDING              # Initial submission
  INTAKE               # Under review by team
  APPROVED             # Ready to begin
  IN_PROGRESS          # Audit in progress
  UNDER_REVIEW         # Findings under review
  REPORT_GENERATION    # Report being prepared
  COMPLETED            # Audit complete
  CANCELLED            # Request cancelled
}

enum AuditPriority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum AuditServiceType {
  SMART_CONTRACT_AUDIT
  PLATFORM_SECURITY_AUDIT
  RNG_ANALYSIS
  WALLET_FLOW_RISK_ASSESSMENT
  API_SECURITY_REVIEW
  CUSTOM_ASSESSMENT
}
```

**Features:**
- Full audit lifecycle tracking
- Dynamic cost estimation
- Soft delete for compliance
- Multi-level assignment
- Service type classification

**Indexes:**
- `(userId)` — user's audit lookup
- `(status)` — filter by status
- `(priority)` — prioritization queues
- `(createdAt)` — timeline queries

#### UploadedFile
Manages contract and code file uploads for audits.

```prisma
model UploadedFile {
  id              String        @id @default(cuid())
  auditId         String
  filename        String
  originalName    String
  mimeType        String
  size            Int
  storagePath     String        # S3 or Vercel Blob
  checksum        String        # SHA-256 for integrity
  uploadedBy      String
  uploadedAt      DateTime      @default(now())
  accessedAt      DateTime?
}
```

**Features:**
- Checksum verification
- MIME type validation
- Storage path abstraction (S3 or Blob)
- Access tracking
- Original filename preservation

---

### Reports & Findings

#### Report
Security audit report with versions and approvals.

```prisma
model Report {
  id                String        @id @default(cuid())
  auditId           String        @unique  # One report per audit
  userId            String        # Report author
  title             String
  summary           String
  executive         String?       # Executive summary
  methodology       String?
  scope             String?
  limitations       String?
  status            ReportStatus  @default(DRAFT)
  version           Int           @default(1)
  critical          Int           @default(0)
  high              Int           @default(0)
  medium            Int           @default(0)
  low               Int           @default(0)
  informational     Int           @default(0)
  pdfUrl            String?
  htmlContent       String?       # Interactive view
  signedAt          DateTime?
  reviewedAt        DateTime?
  publishedAt       DateTime?
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt
}

enum ReportStatus {
  DRAFT              # Initial draft
  REVIEW             # Under review
  APPROVED           # Approved for publishing
  PUBLISHED          # Published/delivered
  ARCHIVED           # Old versions archived
}
```

**Features:**
- Severity breakdown pre-computed
- Version tracking
- Signature tracking (signedAt)
- PDF and HTML outputs
- Status workflow

#### Finding
Individual vulnerability or finding in a report.

```prisma
model Finding {
  id                String        @id @default(cuid())
  auditId           String
  reportId          String
  title             String
  description       String
  impact            String?
  remediation       String?
  severity          Severity
  category          VulnerabilityCategory
  cwe               String?       # CWE-1234
  affectedCode      String?       # Line numbers or addresses
  proof             String?       # PoC or evidence
  status            FindingStatus @default(OPEN)
  resolution        String?
  resolvedAt        DateTime?
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt
}

enum Severity {
  CRITICAL           # Exploitable now
  HIGH               # Major risk
  MEDIUM             # Moderate risk
  LOW                # Minor issue
  INFORMATIONAL      # Best practice
}

enum VulnerabilityCategory {
  ACCESS_CONTROL
  ARITHMETIC
  AUTHENTICATION
  CONFIGURATION
  CRYPTOGRAPHY
  DATA_EXPOSURE
  FLOW_CONTROL
  FRONT_RUNNING
  LOGIC_ERROR
  RACE_CONDITION
  REENTRANCY
  TIMESTAMP_DEPENDENCY
  UNCHECKED_CALL
  OTHER
}

enum FindingStatus {
  OPEN               # Not yet addressed
  ACKNOWLEDGED       # Client acknowledged
  REMEDIATED         # Fixed by client
  ACCEPTED_RISK      # Accepted as known risk
  DUPLICATE          # Duplicate finding
  INVALID            # Invalid/not reproducible
}
```

**Features:**
- CWE mapping
- Severity classification
- Resolution tracking
- PoC evidence storage
- Status lifecycle

---

### Payments & Billing

#### Payment
Individual payment for an audit.

```prisma
model Payment {
  id              String          @id @default(cuid())
  auditId         String
  userId          String
  invoiceId       String
  amount          Decimal
  currency        String          @default("USD")
  status          PaymentStatus   @default(PENDING)
  method          PaymentMethod
  stripePaymentId String?         # Stripe integration
  stripeChargeId  String?
  failureReason   String?
  failureCount    Int             @default(0)
  nextRetry       DateTime?
  paidAt          DateTime?
  refundedAt      DateTime?
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
}

enum PaymentStatus {
  PENDING            # Not yet processed
  PROCESSING         # Being processed
  COMPLETED          # Successfully charged
  FAILED             # Payment failed
  REFUNDED           # Payment refunded
  CANCELLED          # Payment cancelled
}

enum PaymentMethod {
  CREDIT_CARD
  ACH_TRANSFER
  WIRE_TRANSFER
  CHECK
  CRYPTO
}
```

**Features:**
- Stripe integration
- Multiple payment methods
- Automatic retry logic
- Refund tracking
- Currency support

#### Invoice
Invoice grouping one or more line items.

```prisma
model Invoice {
  id              String          @id @default(cuid())
  userId          String
  invoiceNumber   String          @unique
  description     String?
  subtotal        Decimal
  tax             Decimal
  total           Decimal
  dueDate         DateTime
  sentAt          DateTime?
  paidAt          DateTime?
  status          InvoiceStatus   @default(DRAFT)
  notes           String?
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
}

enum InvoiceStatus {
  DRAFT              # Not yet sent
  SENT               # Sent to client
  VIEWED             # Opened by client
  PAID               # Payment received
  OVERDUE            # Past due date
  CANCELLED          # Invoice cancelled
}
```

**Features:**
- Invoice numbering
- Tax calculation
- Status workflow
- View tracking

#### LineItem
Individual line item on an invoice.

```prisma
model LineItem {
  id          String    @id @default(cuid())
  invoiceId   String
  description String
  quantity    Int
  unitPrice   Decimal
  total       Decimal
}
```

---

### Notifications & Alerts

#### Notification
User notifications with multi-channel delivery.

```prisma
model Notification {
  id              String            @id @default(cuid())
  userId          String?
  auditId         String?
  type            NotificationType
  title           String
  message         String
  data            Json?
  read            Boolean           @default(false)
  readAt          DateTime?
  sentVia         NotificationChannel[]
  createdAt       DateTime          @default(now())
}

enum NotificationType {
  AUDIT_CREATED
  AUDIT_APPROVED
  AUDIT_STARTED
  AUDIT_COMPLETED
  REPORT_READY
  PAYMENT_RECEIVED
  PAYMENT_FAILED
  INVOICE_SENT
  TEAM_INVITE
  STATUS_UPDATE
  ALERT
}

enum NotificationChannel {
  EMAIL
  SMS
  WEBHOOK
  IN_APP
}
```

**Features:**
- Multi-channel delivery
- Read tracking
- Type-based routing
- Custom data payloads

#### NotificationSettings
Per-user notification preferences.

```prisma
model NotificationSettings {
  id                     String    @id @default(cuid())
  userId                 String    @unique
  emailAuditUpdates      Boolean   @default(true)
  emailPaymentAlerts     Boolean   @default(true)
  emailReportReady       Boolean   @default(true)
  emailTeamInvites       Boolean   @default(true)
  smsAuditUpdates        Boolean   @default(false)
  smsPaymentAlerts       Boolean   @default(true)
  dailyDigest            Boolean   @default(false)
  frequencyPreference    String    @default("immediate")
  createdAt              DateTime  @default(now())
  updatedAt              DateTime  @updatedAt
}
```

---

### Webhooks & Integration

#### WebhookEndpoint
External webhook endpoints for integrations.

```prisma
model WebhookEndpoint {
  id          String    @id @default(cuid())
  userId      String
  url         String
  events      String[]          # array of event types
  secret      String            # for HMAC signing
  active      Boolean   @default(true)
  retryCount  Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

**Features:**
- Event filtering by type
- HMAC signature support
- Activation toggle
- Retry tracking

#### WebhookEvent
Log of webhook events sent.

```prisma
model WebhookEvent {
  id          String    @id @default(cuid())
  type        String
  payload     Json
  sentAt      DateTime
  status      String    @default("pending")
  retries     Int       @default(0)
  lastError   String?
  createdAt   DateTime  @default(now())
}
```

---

### Audit Trail & Activity Logging

#### ActivityLog
Complete audit trail of all system changes.

```prisma
model ActivityLog {
  id          String        @id @default(cuid())
  userId      String?
  auditId     String?
  action      String        # created, updated, deleted, viewed
  entity      String        # User, AuditRequest, Report
  entityId    String
  oldValues   Json?
  newValues   Json?
  ipAddress   String?
  userAgent   String?
  createdAt   DateTime      @default(now())
}
```

**Features:**
- Before/after change tracking
- IP and user agent logging
- Entity type classification
- Queryable audit trail

#### SecurityAuditLog
Specifically for security-related events.

```prisma
model SecurityAuditLog {
  id          String    @id @default(cuid())
  userId      String?
  action      String
  severity    String         # info, warning, critical
  details     String?
  ipAddress   String?
  createdAt   DateTime  @default(now())
}
```

---

### Security & Compliance

#### ApiKey
API keys for programmatic access.

```prisma
model ApiKey {
  id          String    @id @default(cuid())
  userId      String
  name        String
  key         String    @unique         # hashed
  lastUsedAt  DateTime?
  active      Boolean   @default(true)
  createdAt   DateTime  @default(now())
  expiresAt   DateTime?
}
```

**Features:**
- Key hashing (never store plaintext)
- Usage tracking
- Expiration support
- Per-key naming

#### ComplianceRecord
Compliance check results.

```prisma
model ComplianceRecord {
  id          String    @id @default(cuid())
  auditId     String
  type        String              # SOC2, ISO27001, GDPR, PCI-DSS
  status      String              # compliant, non-compliant, under_review
  notes       String?
  checkedAt   DateTime
  createdAt   DateTime  @default(now())
}
```

---

## Performance Optimization

### Indexes
Strategic indexes on common queries:

```
User: email, role, createdAt
Session: userId, token, expiresAt
AuditRequest: userId, teamId, status, priority, createdAt, assignedTo
Report: auditId, userId, status, createdAt
Finding: auditId, reportId, severity, status
Payment: auditId, userId, status, createdAt
ActivityLog: userId, auditId, entity, createdAt
```

### Query Patterns
- User lookup by email (login)
- Recent audits by user
- Audits by status (pipeline)
- Findings by severity (reporting)
- Payments by status (reconciliation)

---

## Scalability Considerations

### Archival Strategy
- AuditRequest has soft delete (deletedAt)
- ActivityLog and WebhookEvent accumulate over time
- Consider partitioning by date for large tables
- Archive old reports to cold storage

### Data Growth Estimates
- Users: ~10K at launch, 100K+ at scale
- AuditRequests: ~100/month at launch
- Reports: ~50/month at launch
- Findings: ~1-10 per report on average
- ActivityLog: 100+ entries per day

### Connection Pooling
Use Prisma's connection pooling with appropriate pool size:
- Development: 5 connections
- Production: 20 connections
- Adjust based on concurrency

---

## Security

### Sensitive Data
- `passwordHash` — never return in API
- `twoFactorSecret` — encrypted at rest
- `refreshToken` — hashed and salted
- `stripeChargeId` — PCI-compliant storage
- `apiKey` — hashed before storage

### Access Control
- Row-level security via Prisma relations
- Team isolation via `teamId`
- User role checks at application layer
- No direct SQL queries (always via Prisma)

### Audit Trail
- All modifications logged in ActivityLog
- Security events in SecurityAuditLog
- Timestamp all sensitive operations
- Track user, IP, and user agent

---

## Migration Strategy

### Initial Migration
```bash
npx prisma migrate dev --name init
```

### Subsequent Migrations
```bash
# After schema changes:
npx prisma migrate dev --name descriptive_name

# Apply migrations to production:
npx prisma migrate deploy
```

### Rollback Procedure
Prisma stores migration history in `_prisma_migrations` table.
To rollback:
```bash
npx prisma migrate resolve --rolled-back migration_name
npx prisma migrate dev
```

---

## Backup & Disaster Recovery

### PostgreSQL Backups
- Daily backups via managed hosting (Vercel Postgres, AWS RDS, etc)
- Point-in-time recovery enabled
- Test restores monthly
- Encrypted backups at rest

### Schema Backup
- Schema changes tracked in git (`prisma/migrations/`)
- All migrations reversible
- Tag releases for version alignment

---

## Monitoring & Maintenance

### Key Metrics
- Connection pool utilization
- Query performance (slow log)
- Table sizes
- Index usage

### Regular Maintenance
```sql
-- Analyze tables for query optimization
ANALYZE;

-- Reindex if fragmented
REINDEX;

-- Vacuum for cleanup
VACUUM;
```

---

## Related Documents

- `lib/api-types.ts` — TypeScript types generated from schema
- `docs/technical/api-specification.md` — API endpoints
- `CLAUDE.md` — Project configuration
- `.env.example` — Required environment variables

---

**Last Updated:** 2026-02-25
**Next Review:** 2026-04-01
