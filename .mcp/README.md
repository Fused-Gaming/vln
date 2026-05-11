# VLN MCP Infrastructure

This directory contains the Model Context Protocol (MCP) core infrastructure configuration for VLN.

## Directory Structure

```
.mcp/
├── config.json              # Main MCP server configuration
├── .env.example             # Environment variables template
├── README.md               # This file
├── skills/
│   ├── registry.json       # Skill registry and discovery
│   ├── vln-audit-intake.ts
│   ├── vln-report-generator.ts
│   ├── documentation-sync.ts
│   ├── mcp-validation.ts
│   └── documentation-link-checker.ts
├── servers/                # Server-specific configurations
├── sessions/               # Session persistence storage
├── config/                 # Additional configuration files
└── logs/                   # Server and operation logs
```

## Quick Start

### 1. Environment Setup

Copy the environment template and fill in your credentials:

```bash
cp .mcp/.env.example .mcp/.env.local
# Edit .mcp/.env.local with your API keys
```

### 2. Validate Configuration

```bash
npm run mcp:validate
# or
pnpm run mcp:validate
```

### 3. Start MCP Servers

```bash
npm run mcp:start
# or
pnpm run mcp:start
```

### 4. Check Server Health

```bash
npm run mcp:health
# or
pnpm run mcp:health
```

## Available MCP Servers

### GitHub
- **Status**: Active
- **Tools**: Repository operations, PRs, issues, code search
- **Auth**: GitHub Token (PAT)

### Supabase
- **Status**: Active
- **Tools**: Database operations, migrations, edge functions
- **Auth**: API Key + Project ID

### Vercel
- **Status**: Active
- **Tools**: Deployment management, build logs, runtime logs
- **Auth**: Vercel Token

### MailerLite
- **Status**: Active
- **Tools**: Email campaigns, subscriber management, automations
- **Auth**: API Key

### Cloudflare
- **Status**: Active
- **Tools**: KV storage, R2 buckets, D1 databases, Workers
- **Auth**: API Token + Account ID

### Google Calendar
- **Status**: Active
- **Tools**: Event management, availability checking, scheduling
- **Auth**: OAuth Token

### Calendly
- **Status**: Active
- **Tools**: Booking management, event types, meeting scheduling
- **Auth**: API Token

## Skill Registry

Skills are automatically discovered and registered. View available skills:

```bash
npm run mcp:skills:list
```

## Session Management

Sessions are persisted to `.mcp/sessions/` by default. To reset sessions:

```bash
npm run mcp:sessions:clear
```

## Health Checks

The MCP infrastructure includes automated health checks running every 30 seconds.

View health status:

```bash
npm run mcp:health
```

## Logs

Logs are stored in `.mcp/logs/`:
- `server.log` - Server operations
- `audit.log` - Security and access audit trail
- Individual skill logs

## Troubleshooting

### Server Not Responding

1. Check `.mcp/logs/server.log` for error messages
2. Verify environment variables are set correctly
3. Ensure all required API keys are valid
4. Run health check: `npm run mcp:health`

### Skill Discovery Issues

1. Verify skill files exist in `.mcp/skills/`
2. Check skill registry: `npm run mcp:skills:list`
3. Validate skill syntax and dependencies

### Session Persistence Problems

1. Check `.mcp/sessions/` directory permissions
2. Verify sufficient disk space
3. Clear session cache: `npm run mcp:sessions:clear`

## Configuration Reference

See `config.json` for detailed configuration options including:
- Server endpoints and transport settings
- Security and token management
- Monitoring and health checks
- Session lifecycle management
- Logging and audit trail configuration

## Documentation

MCP documentation is located in `/docs/mcp/`:
- `setup.md` - Detailed setup instructions
- `tools.md` - Complete tool reference
- `authentication.md` - Authentication guides
- `examples.md` - Usage examples and patterns
