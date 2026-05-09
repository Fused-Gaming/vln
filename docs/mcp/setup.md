# MCP Server Setup Guide

This guide explains how to set up and configure MCP servers for VLN development.

## Prerequisites

- Node.js 18+
- npm or pnpm
- Claude Code or compatible AI client
- GitHub account (for most integrations)

## Understanding MCP Servers

MCP servers are background processes that:
- Expose tools and capabilities via the MCP protocol
- Handle authentication and API communication
- Provide structured access to external services
- Enable AI clients to execute complex operations safely

## Configuration Location

MCP servers are configured in Claude Code settings:

```
~/.claude/settings.json          # Global configuration
.claude/settings.json            # Project-specific configuration
```

VLN uses project-specific configuration to keep settings with the repository.

## Available Servers

### GitHub Integration
Provides access to repository operations, pull requests, code search, and workflow management.

**Setup:**
- Requires `GITHUB_TOKEN` environment variable
- Token can be created at https://github.com/settings/tokens
- Minimal scopes: `repo`, `read:org`

### Supabase Integration
Database operations, schema inspection, migrations, and edge function deployment.

**Setup:**
- Requires `SUPABASE_API_KEY` and project ID
- Available at https://app.supabase.com/
- Used for development and production databases

### Vercel Integration
Deployment management, build logs, analytics, and preview environments.

**Setup:**
- Requires `VERCEL_TOKEN`
- Create at https://vercel.com/account/tokens
- Used for managing preview and production deployments

### MailerLite Integration
Email campaign management, subscriber operations, and automation workflows.

**Setup:**
- Requires `MAILERLITE_API_KEY`
- Available at https://app.mailerlite.com/integrations
- Used for marketing and transactional emails

### Cloudflare Integration
Infrastructure management including KV storage, R2 buckets, D1 databases, and Workers.

**Setup:**
- Requires `CLOUDFLARE_API_TOKEN`
- Create at https://dash.cloudflare.com/profile/api-tokens
- Scopes: All zones, all services

### Google Calendar Integration
Event scheduling and availability checking.

**Setup:**
- Requires OAuth authentication
- Handled automatically through Claude Code
- Tokens stored in `.claude/auth/` (local only)

### Calendly Integration
Meeting scheduling and booking management.

**Setup:**
- Requires OAuth authentication
- Handled automatically through Claude Code
- Integration enables automated scheduling

## Environment Variables

Set authentication credentials in your shell environment:

```bash
# GitHub
export GITHUB_TOKEN="ghp_..."

# Supabase
export SUPABASE_API_KEY="sb..."
export SUPABASE_PROJECT_ID="project-id"

# Vercel
export VERCEL_TOKEN="..."

# MailerLite
export MAILERLITE_API_KEY="..."

# Cloudflare
export CLOUDFLARE_API_TOKEN="..."
```

For development, use `.env.local`:

```bash
# .env.local (never commit this!)
GITHUB_TOKEN=ghp_...
SUPABASE_API_KEY=sb...
# etc.
```

## OAuth Flows

Services using OAuth (Google Calendar, Calendly):

1. Click "Authenticate" or "Connect" button in Claude Code
2. Authorize in browser window
3. Copy callback URL if requested
4. Tokens automatically stored in `.claude/auth/` (local only)
5. Refresh tokens handled automatically

## Verification

To verify servers are properly configured:

```bash
# Check environment variables
echo $GITHUB_TOKEN
echo $SUPABASE_API_KEY

# Test with Claude Code
# Attempt a simple operation (e.g., list repositories)
# If it succeeds, your configuration is correct
```

## Troubleshooting

### "Token Invalid" Error
- Verify environment variable is set correctly
- Check token hasn't expired
- Ensure minimal required scopes are granted
- Regenerate token if necessary

### "Unauthorized" for Specific Operation
- Verify token has required scopes
- Check project/organization access
- Ensure API key is for correct environment (dev/prod)

### Server Not Found
- Restart Claude Code
- Verify MCP configuration is in `.claude/settings.json`
- Check that required environment variables are set

## Best Practices

1. **Never commit credentials** – Use `.env.local` for development
2. **Rotate tokens regularly** – Security best practice
3. **Use minimal scopes** – Only grant permissions needed
4. **Store secrets in GitHub Secrets** – For CI/CD pipelines
5. **Test in development first** – Before using in production
6. **Monitor API usage** – Prevent accidental overspending

---

See [Authentication Guide](./authentication.md) for detailed security information.
