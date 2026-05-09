# MCP (Model Context Protocol) Integration

VLN integrates with Claude's Model Context Protocol for enhanced AI agent capabilities, enabling seamless integration with development workflows through Claude Code and other AI clients.

## Quick Start

- **[MCP Server Setup](./setup.md)** – Configure MCP servers for VLN
- **[Available Tools](./tools.md)** – Complete tool reference
- **[Authentication Guide](./authentication.md)** – API keys & OAuth setup
- **[Integration Examples](./examples.md)** – Real-world usage patterns

## What is MCP?

MCP (Model Context Protocol) enables Claude Code and other AI clients to:
- Access codebase context and tools efficiently
- Invoke custom operations and integrations
- Maintain structured, type-safe communication with LLMs
- Build complex multi-step workflows

## VLN MCP Servers

VLN integrates with the following MCP servers:

| Server | Purpose | Auth | Status |
|--------|---------|------|--------|
| **GitHub** | Repository operations, PRs, issues | GitHub Token | ✅ Active |
| **Supabase** | Database operations, migrations | API Key | ✅ Active |
| **Vercel** | Deployment management, logs | Token | ✅ Active |
| **MailerLite** | Email campaigns, automation | API Key | ✅ Active |
| **Cloudflare** | KV, R2, D1, Workers | API Token | ✅ Active |
| **Google Calendar** | Event scheduling, availability | OAuth | ✅ Active |
| **Calendly** | Booking & meeting management | OAuth | ✅ Active |

## Key Capabilities

### Development & Version Control
- Create, review, and merge pull requests
- Manage issues and project tracking
- Search code across the repository
- Analyze commits and branches

### Database & Infrastructure
- Inspect and modify database schema
- Execute migrations and queries
- Deploy and manage edge functions
- Monitor database performance

### Deployment & DevOps
- Manage Vercel deployments
- View build logs and metrics
- Configure preview environments
- Monitor application health

### Communication & Marketing
- Create and send email campaigns
- Manage subscriber lists
- Build automation workflows
- Track campaign performance

### Infrastructure Management
- Manage Cloudflare KV storage
- Operate R2 object storage
- Manage D1 databases
- Deploy Cloudflare Workers

## Common Workflows

### Typical Development Workflow
1. Claude Code accesses GitHub to understand project structure
2. Creates feature branch with implementation
3. Opens pull request for review
4. Deploys preview to Vercel
5. Monitors build logs and testing

### Database Management
1. Inspect current schema via Supabase
2. Design and generate migration
3. Execute migration
4. Verify with queries
5. Deploy edge function updates

### Campaign Management
1. Create email campaign in MailerLite
2. Segment subscribers
3. Schedule or send immediately
4. Monitor opens and clicks

---

For detailed setup and usage, see individual guides starting with [Setup](./setup.md).
