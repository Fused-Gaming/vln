# MCP Authentication Guide

Complete guide for authenticating with MCP services and managing credentials securely.

## Authentication Methods

VLN uses two types of authentication:

1. **API Keys / Tokens** – For service-to-service authentication
2. **OAuth 2.0** – For user-specific permissions (Google Calendar, Calendly)

## API Keys & Tokens

### GitHub Token

**How to generate:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token"
3. Select "Personal access tokens (classic)"
4. Set name (e.g., "VLN Development")
5. Grant scopes:
   - `repo` – Full repository access
   - `read:org` – Read organization data
6. Click "Generate token"
7. Copy and store securely

**Environment variable:**
```bash
export GITHUB_TOKEN="ghp_xxxxx..."
```

**Usage in development:**
```bash
# Add to .env.local
GITHUB_TOKEN=ghp_xxxxx...
```

### Supabase API Key

**How to generate:**
1. Go to https://app.supabase.com/
2. Select your project
3. Go to Settings → API
4. Copy `Project API URL` and `API Key (service_role)`
5. Store both securely

**Environment variables:**
```bash
export SUPABASE_API_KEY="sb_xxxxx..."
export SUPABASE_PROJECT_ID="project-id"
```

### Vercel Token

**How to generate:**
1. Go to https://vercel.com/account/tokens
2. Click "Create token"
3. Name: "VLN Development"
4. Scope: Select appropriate project or "All"
5. Expiration: Set to 90 days (auto-rotate)
6. Click "Create"
7. Copy token immediately

**Environment variable:**
```bash
export VERCEL_TOKEN="xxxxx..."
```

### MailerLite API Key

**How to generate:**
1. Go to https://app.mailerlite.com/integrations
2. Navigate to API & Webhooks
3. Create new API key
4. Name: "VLN Development"
5. Copy and store securely

**Environment variable:**
```bash
export MAILERLITE_API_KEY="xxxxx..."
```

### Cloudflare API Token

**How to generate:**
1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use "Edit Cloudflare Workers" template (recommended)
4. Or create custom with scopes:
   - `Workers Scripts – Edit`
   - `Workers KV Storage – Edit`
   - `Workers Tail Consumers – Read`
5. Select appropriate zone/account
6. Click "Create Token"
7. Copy immediately

**Environment variable:**
```bash
export CLOUDFLARE_API_TOKEN="xxxxx..."
```

## OAuth 2.0 Authentication

### Google Calendar

**Setup:**
1. In Claude Code, navigate to Calendar tools
2. Click "Authenticate" button
3. Sign in with Google account
4. Grant "See, create, and modify" permissions
5. Copy callback URL if prompted
6. Token automatically stored in `.claude/auth/`

**Permissions:**
- View calendar events
- Create and modify events
- Change event status (accept/decline/tentative)
- View free/busy information

**Token storage:**
- Stored locally in `.claude/auth/` (NOT in git)
- Auto-refreshed before expiration
- Revoke at https://myaccount.google.com/connections

### Calendly

**Setup:**
1. In Claude Code, click "Connect Calendly"
2. Sign in with Calendly account
3. Authorize "VLN" application
4. Grant requested permissions
5. Token stored automatically

**Permissions:**
- Manage calendar events
- View scheduling links
- Create meeting types

## Development Environment Setup

### Using .env.local

Create `.env.local` in project root (never commit!):

```bash
# GitHub
GITHUB_TOKEN=ghp_xxxxx...

# Supabase
SUPABASE_API_KEY=sb_xxxxx...
SUPABASE_PROJECT_ID=project-xxxxx

# Vercel
VERCEL_TOKEN=vercel_xxxxx...

# MailerLite
MAILERLITE_API_KEY=xxxxx...

# Cloudflare
CLOUDFLARE_API_TOKEN=xxxxx...
```

### Loading Environment Variables

```bash
# Option 1: source before running Claude Code
source .env.local

# Option 2: In Claude Code settings, specify .env.local path
# (automatic in most installations)

# Option 3: Use direnv (optional)
# Create .envrc with: dotenv
```

## Security Best Practices

### ✅ DO

- ✅ Store credentials in `.env.local` (local development)
- ✅ Store secrets in GitHub Secrets (CI/CD)
- ✅ Store OAuth tokens in `.claude/auth/` (auto-managed)
- ✅ Rotate tokens every 90 days
- ✅ Use minimal required scopes
- ✅ Enable token expiration if available
- ✅ Use environment-specific tokens (dev/prod)
- ✅ Audit token usage regularly
- ✅ Revoke unused tokens immediately

### ❌ DON'T

- ❌ Commit `.env` or `.env.local` to git
- ❌ Share tokens in chat, email, or documentation
- ❌ Use overly broad scopes
- ❌ Reuse tokens across environments
- ❌ Grant permanent token expiration
- ❌ Store credentials in code comments
- ❌ Log full credentials in console
- ❌ Use personal account tokens for team access

## Token Rotation

### Manual Rotation

```bash
# 1. Generate new token in service dashboard
# 2. Update .env.local and/or GitHub Secrets
# 3. Verify new token works
# 4. Revoke old token in dashboard
# 5. Document rotation date
```

### Automated Rotation (CI/CD)

In GitHub Actions:
```yaml
- name: Rotate API Key
  run: |
    # Use Actions to rotate keys on schedule
    # Set repository secrets to new values
    # Invalidate old tokens
```

## Troubleshooting

### "Invalid Token" Error

```bash
# Check token is set
echo $GITHUB_TOKEN

# Verify token still valid
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user

# If invalid, regenerate in service dashboard
```

### "Insufficient Permissions"

- Check token has required scopes in dashboard
- GitHub: Ensure `repo` scope is enabled
- Supabase: Ensure service_role key is used (not anon key)
- Vercel: Ensure project access is granted

### "Token Expired"

- For OAuth (Calendar, Calendly): Automatically refreshed
- For API keys: Regenerate and update environment variables
- Check dashboard for token expiration date

### "Credentials Not Found"

```bash
# Verify .env.local exists
ls -la .env.local

# Check environment variable
echo $GITHUB_TOKEN

# Restart Claude Code (environment reload needed)
# If using .env.local, restart shell environment
```

## GitHub Secrets Setup (CI/CD)

For GitHub Actions workflows:

1. Go to repository Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `GITHUB_TOKEN` (usually pre-created)
4. For others:
   - `SUPABASE_API_KEY`
   - `VERCEL_TOKEN`
   - `MAILERLITE_API_KEY`
   - `CLOUDFLARE_API_TOKEN`

Use in workflows:
```yaml
- name: Deploy
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
  run: |
    # Your deployment script
```

## Service-Specific Notes

### GitHub Token Scopes

```
repo                    - Full repository access
read:org               - Read organization data
gist                   - Manage gists
workflow               - Manage workflows
write:packages         - Upload packages
delete:packages        - Delete packages
admin:public_key       - Manage SSH keys
admin:repo_hook        - Manage webhooks
admin:org_hook         - Manage organization webhooks
admin:user_hook        - Manage user webhooks
notification           - Manage notifications
```

### Supabase Keys

- **anon key** – Frontend/public API (limited permissions)
- **service_role key** – Backend/private API (full permissions) ← Use for MCP
- Keep both secure, but service_role needs extra protection

### Vercel Token Scope

- **All** – Access all projects
- **Specific project** – Access only selected project
- Recommended: Create separate tokens for dev/prod

---

For more details, see [Setup Guide](./setup.md).
