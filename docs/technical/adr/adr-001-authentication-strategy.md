# ADR-001: Authentication Strategy

**Date:** 2026-02-25
**Status:** Accepted
**Context:** VLN Phase 2 requires comprehensive authentication supporting multiple user roles and security levels.

---

## Problem

VLN needs to support:
1. Client users requesting audits
2. Researchers managing audits
3. Administrators managing system
4. External API access
5. Security requirements: sessions, 2FA, OAuth

Options:
- **A:** NextAuth.js (open-source, self-managed)
- **B:** Auth0 (fully managed SaaS)
- **C:** Okta (enterprise, expensive)

---

## Decision

**Selected: NextAuth.js** (Option A)

### Rationale

| Factor | NextAuth.js | Auth0 | Okta |
|--------|-----------|-------|------|
| Cost | Free | $500+/month | $1500+/month |
| Control | Full | Limited | Limited |
| Complexity | Medium | Low | Low |
| Scalability | ✅ High | ✅ High | ✅ High |
| Integration | Built for Next.js | Generic | Generic |
| Customization | ✅ Full | Limited | Limited |

### Implementation Approach

1. **Email/Password Auth**
   - Bcrypt password hashing (12 rounds minimum)
   - Secure session storage in PostgreSQL
   - HTTPS-only cookies

2. **OAuth Providers**
   - Google (production ready)
   - GitHub (developer-friendly)
   - Additional providers added per demand

3. **Session Management**
   - JWT-based access tokens (1 hour expiry)
   - Refresh tokens (30 day expiry)
   - Automatic rotation on use

4. **Two-Factor Authentication**
   - TOTP (Time-based One-Time Password)
   - Backup codes generation
   - SMS optional (Phase 3)

5. **API Authentication**
   - API keys for service-to-service
   - Bearer token validation
   - Per-key rate limiting

---

## Consequences

### Positive
- ✅ No external dependency cost
- ✅ Full customization capability
- ✅ Better performance (no external calls)
- ✅ Supports all required flows
- ✅ Extensive Next.js ecosystem

### Negative
- ⚠️ Security maintenance responsibility
- ⚠️ Must implement session security
- ⚠️ No built-in compliance tools (SOC 2, etc)

### Mitigations
- Regular security audits
- Use established libraries (bcrypt, jose)
- Follow OWASP guidelines
- Implement rate limiting
- Monitor security advisories

---

## Security Checklist

- [ ] Passwords: bcrypt with >12 rounds
- [ ] Sessions: HTTP-only, Secure, SameSite cookies
- [ ] HTTPS: Required for all auth endpoints
- [ ] CSRF: Token-based protection
- [ ] Rate limiting: 5 attempts/minute per endpoint
- [ ] Password reset: Secure token, 1-hour expiry
- [ ] 2FA: TOTP required for sensitive operations
- [ ] Audit logging: All auth events logged

---

## Configuration

```env
NEXTAUTH_URL=https://vln.gg
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
DATABASE_URL=postgresql://...

# OAuth Providers
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# Email (for verification links)
EMAIL_FROM=noreply@vln.gg
EMAIL_SERVER=...
```

---

## Implementation Timeline

- **Week 1:** NextAuth setup, email/password flow
- **Week 2:** OAuth integration (Google, GitHub)
- **Week 3:** 2FA implementation
- **Week 4:** Testing and security review

---

## Related Decisions

- ADR-002: File Storage (affects OAuth session storage)
- ADR-003: Email Service (password reset emails)

---

**References:**
- https://next-auth.js.org
- https://owasp.org/www-project-authentication-cheat-sheet/
- https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
