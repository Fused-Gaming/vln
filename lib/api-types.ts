/**
 * VLN API Type Definitions
 * Shared types across client and server
 * Generated/manually maintained from Prisma schema
 * Date: 2026-02-25
 */

// ============================================================================
// Authentication Types
// ============================================================================

export type UserRole = 'ADMIN' | 'RESEARCHER' | 'MANAGER' | 'CLIENT' | 'GUEST';

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokens {
  token: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface MagicLinkRequest {
  email: string;
}

export interface TwoFactorSetupResponse {
  secret: string;
  qrCode: string;
}

export interface TwoFactorVerifyRequest {
  code: string;
}

// ============================================================================
// Audit Types
// ============================================================================

export type AuditStatus =
  | 'PENDING'
  | 'INTAKE'
  | 'APPROVED'
  | 'IN_PROGRESS'
  | 'UNDER_REVIEW'
  | 'REPORT_GENERATION'
  | 'COMPLETED'
  | 'CANCELLED';

export type AuditPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type AuditServiceType =
  | 'SMART_CONTRACT_AUDIT'
  | 'PLATFORM_SECURITY_AUDIT'
  | 'RNG_ANALYSIS'
  | 'WALLET_FLOW_RISK_ASSESSMENT'
  | 'API_SECURITY_REVIEW'
  | 'CUSTOM_ASSESSMENT';

export interface AuditScope {
  contracts?: string[];
  files?: string[];
  lineOfCode?: number;
  customScope?: string;
}

export interface AuditRequest {
  id: string;
  userId: string;
  teamId?: string;
  projectName: string;
  description: string;
  serviceType: AuditServiceType;
  scope: AuditScope;
  status: AuditStatus;
  priority: AuditPriority;
  assignedTo?: string;
  estimatedCost: number;
  actualCost?: number;
  startDate?: Date;
  targetDate?: Date;
  completionDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAuditRequest {
  projectName: string;
  description: string;
  serviceType: AuditServiceType;
  scope: AuditScope;
}

export interface UpdateAuditRequest {
  description?: string;
  scope?: AuditScope;
  priority?: AuditPriority;
}

export interface AuditListParams {
  status?: AuditStatus;
  priority?: AuditPriority;
  limit?: number;
  offset?: number;
  sortBy?: 'createdAt' | 'priority';
  sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// File Upload Types
// ============================================================================

export interface UploadedFile {
  id: string;
  auditId: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  storagePath: string;
  checksum: string;
  uploadedAt: Date;
  accessedAt?: Date;
}

export interface FileUploadResponse {
  id: string;
  filename: string;
  size: number;
  uploadedAt: Date;
}

// ============================================================================
// Report & Finding Types
// ============================================================================

export type ReportStatus = 'DRAFT' | 'REVIEW' | 'APPROVED' | 'PUBLISHED' | 'ARCHIVED';

export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL';

export type VulnerabilityCategory =
  | 'ACCESS_CONTROL'
  | 'ARITHMETIC'
  | 'AUTHENTICATION'
  | 'CONFIGURATION'
  | 'CRYPTOGRAPHY'
  | 'DATA_EXPOSURE'
  | 'FLOW_CONTROL'
  | 'FRONT_RUNNING'
  | 'LOGIC_ERROR'
  | 'RACE_CONDITION'
  | 'REENTRANCY'
  | 'TIMESTAMP_DEPENDENCY'
  | 'UNCHECKED_CALL'
  | 'OTHER';

export type FindingStatus = 'OPEN' | 'ACKNOWLEDGED' | 'REMEDIATED' | 'ACCEPTED_RISK' | 'DUPLICATE' | 'INVALID';

export interface SeverityBreakdown {
  critical: number;
  high: number;
  medium: number;
  low: number;
  informational: number;
}

export interface Report {
  id: string;
  auditId: string;
  userId: string;
  title: string;
  summary: string;
  executive?: string;
  methodology?: string;
  status: ReportStatus;
  version: number;
  severityBreakdown: SeverityBreakdown;
  pdfUrl?: string;
  htmlContent?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Finding {
  id: string;
  auditId: string;
  reportId: string;
  title: string;
  description: string;
  impact?: string;
  remediation?: string;
  severity: Severity;
  category: VulnerabilityCategory;
  cwe?: string;
  affectedCode?: string;
  proof?: string;
  status: FindingStatus;
  createdAt: Date;
}

export interface FindingListParams {
  severity?: Severity[];
  status?: FindingStatus;
  category?: VulnerabilityCategory;
  limit?: number;
  offset?: number;
}

// ============================================================================
// Payment Types
// ============================================================================

export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'CANCELLED';

export type PaymentMethod = 'CREDIT_CARD' | 'ACH_TRANSFER' | 'WIRE_TRANSFER' | 'CHECK' | 'CRYPTO';

export interface Payment {
  id: string;
  auditId: string;
  userId: string;
  invoiceId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  stripePaymentId?: string;
  paidAt?: Date;
  refundedAt?: Date;
  createdAt: Date;
}

export interface PaymentIntentRequest {
  auditId: string;
  amount: number;
  currency?: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentId: string;
  status: PaymentStatus;
}

export interface PaymentConfirmRequest {
  paymentId: string;
  paymentMethodId: string;
}

// ============================================================================
// Invoice Types
// ============================================================================

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'VIEWED' | 'PAID' | 'OVERDUE' | 'CANCELLED';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  userId: string;
  invoiceNumber: string;
  description?: string;
  subtotal: number;
  tax: number;
  total: number;
  dueDate: Date;
  status: InvoiceStatus;
  lineItems: LineItem[];
  sentAt?: Date;
  paidAt?: Date;
  createdAt: Date;
}

// ============================================================================
// Notification Types
// ============================================================================

export type NotificationType =
  | 'AUDIT_CREATED'
  | 'AUDIT_APPROVED'
  | 'AUDIT_STARTED'
  | 'AUDIT_COMPLETED'
  | 'REPORT_READY'
  | 'PAYMENT_RECEIVED'
  | 'PAYMENT_FAILED'
  | 'INVOICE_SENT'
  | 'TEAM_INVITE'
  | 'STATUS_UPDATE'
  | 'ALERT';

export interface Notification {
  id: string;
  userId?: string;
  auditId?: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface NotificationSettings {
  emailAuditUpdates: boolean;
  emailPaymentAlerts: boolean;
  emailReportReady: boolean;
  emailTeamInvites: boolean;
  smsAuditUpdates: boolean;
  smsPaymentAlerts: boolean;
  dailyDigest: boolean;
}

// ============================================================================
// Team Types
// ============================================================================

export type TeamRole = 'ADMIN' | 'MEMBER' | 'VIEWER';

export interface Team {
  id: string;
  name: string;
  slug: string;
  description?: string;
  leadId: string;
  logo?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: TeamRole;
  joinedAt: Date;
}

export interface CreateTeamRequest {
  name: string;
  slug: string;
  description?: string;
}

export interface InviteTeamMemberRequest {
  email: string;
  role: TeamRole;
}

// ============================================================================
// Webhook Types
// ============================================================================

export type WebhookEventType =
  | 'audit.created'
  | 'audit.approved'
  | 'audit.started'
  | 'audit.completed'
  | 'report.ready'
  | 'report.published'
  | 'finding.created'
  | 'payment.completed'
  | 'payment.failed'
  | 'invoice.sent'
  | 'team.member_invited'
  | 'team.member_added';

export interface WebhookEvent<T = any> {
  id: string;
  type: WebhookEventType;
  timestamp: Date;
  attempt: number;
  data: T;
}

export interface CreateWebhookRequest {
  url: string;
  events: WebhookEventType[];
}

export interface WebhookEndpoint {
  id: string;
  url: string;
  events: WebhookEventType[];
  active: boolean;
  createdAt: Date;
}

// ============================================================================
// Pagination Types
// ============================================================================

export interface PaginationParams {
  limit?: number;
  offset?: number;
  cursor?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
    hasMore: boolean;
  };
}

// ============================================================================
// Error Types
// ============================================================================

export type ErrorCode =
  | 'INVALID_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'VALIDATION_ERROR'
  | 'RATE_LIMITED'
  | 'SERVER_ERROR';

export interface ErrorResponse {
  error: {
    code: ErrorCode;
    message: string;
    details?: Record<string, any>;
  };
}

// ============================================================================
// Quote Types
// ============================================================================

export interface QuoteRequest {
  auditId: string;
}

export interface Quote {
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  breakdown: {
    baseAudit: number;
    rushFee?: number;
    [key: string]: number | undefined;
  };
}

// ============================================================================
// API Response Wrappers
// ============================================================================

export interface ApiResponse<T> {
  data: T;
  meta?: {
    timestamp: Date;
    version: string;
  };
}

export interface ApiListResponse<T> {
  data: T[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
    hasMore: boolean;
  };
}

// ============================================================================
// Utility Types
// ============================================================================

export type WithId<T> = T & { id: string };
export type WithTimestamps<T> = T & { createdAt: Date; updatedAt: Date };
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Type guard for checking if response is an error
 */
export function isErrorResponse(response: any): response is ErrorResponse {
  return response?.error?.code !== undefined;
}

/**
 * Type guard for checking if response has pagination
 */
export function isPaginatedResponse<T>(response: any): response is ApiListResponse<T> {
  return Array.isArray(response?.data) && response?.pagination !== undefined;
}

// ============================================================================
// Exports for convenience
// ============================================================================

export type {
  User as UserType,
  AuditRequest as AuditRequestType,
  Report as ReportType,
  Finding as FindingType,
  Payment as PaymentType,
  Invoice as InvoiceType,
};
