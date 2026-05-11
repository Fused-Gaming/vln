# VLN MCP & Skill Framework Integration Guide

Complete guide to integrating MCP servers, the Fused Gaming Skill Framework, and supporting systems with the VLN platform.

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Getting Started](#getting-started)
4. [MCP Server Integration](#mcp-server-integration)
5. [Skill Framework Integration](#skill-framework-integration)
6. [Building Custom Skills](#building-custom-skills)
7. [Multi-Agent Workflows](#multi-agent-workflows)
8. [Testing & Validation](#testing--validation)
9. [Deployment](#deployment)
10. [Best Practices](#best-practices)

## Overview

VLN uses a comprehensive integration of:

1. **MCP (Model Context Protocol)** - AI agent integration with external systems
2. **Fused Gaming Skill Framework** - Multi-agent orchestration and coordination
3. **SyncPulse** - Real-time state synchronization and adaptive coordination

This enables:
- Automated security audit workflows
- Multi-step report generation
- Documentation synchronization
- System monitoring and health checks
- Intelligent agent-based operations

## Architecture

### System Diagram

```
┌──────────────────────────────────────────────────────┐
│           VLN Platform                               │
├──────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────┐    │
│  │   Fused Gaming Skill Framework              │    │
│  │   (Agent Orchestration & Coordination)      │    │
│  └─────────────────────────────────────────────┘    │
│           ↓ Uses          ↓ Uses                     │
│  ┌──────────────────┐  ┌─────────────────────┐     │
│  │ MCP Servers      │  │ External Systems    │     │
│  ├──────────────────┤  ├─────────────────────┤     │
│  │ GitHub MCP       │  │ Supabase Database   │     │
│  │ Vercel MCP       │  │ Email Service       │     │
│  │ Cloudflare MCP   │  │ File Storage        │     │
│  │ Calendar MCP     │  │ Analytics           │     │
│  └──────────────────┘  └─────────────────────┘     │
└──────────────────────────────────────────────────────┘
```

### Data Flow

```
User Request
    ↓
VLN API/UI
    ↓
Skill Framework (SyncPulse)
    ↓
Agent Execution
    ├─→ MCP Tool Call
    │   ├─→ GitHub (PR, Issues)
    │   ├─→ Supabase (Database)
    │   ├─→ Vercel (Deploy)
    │   └─→ Cloudflare (Storage)
    ↓
Result Aggregation
    ↓
Response to User
```

## Getting Started

### Prerequisites

```bash
# Node.js 18+
node --version

# pnpm (recommended package manager)
npm install -g pnpm

# VLN repository cloned
git clone https://github.com/fused-gaming/vln.git
cd vln
```

### Installation

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Set up MCP environment**
   ```bash
   cp .mcp/.env.example .mcp/.env.local
   # Edit .mcp/.env.local with your API keys
   ```

3. **Validate setup**
   ```bash
   pnpm run mcp:health
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

## MCP Server Integration

### Available MCP Servers

#### GitHub
Operations on repositories, PRs, issues, and code.

```typescript
import { useGitHub } from '@/hooks/useMCP';

async function createAuditPR() {
  const { createPullRequest } = useGitHub();
  
  return await createPullRequest({
    title: 'Security Audit Report',
    body: 'Automated audit findings...',
    head: 'audit/findings-2026-05-11',
    base: 'integration/vln',
  });
}
```

#### Supabase
Database operations, migrations, and queries.

```typescript
import { useSupabase } from '@/hooks/useMCP';

async function getAuditResults(auditId: string) {
  const { executeSQL } = useSupabase();
  
  return await executeSQL(`
    SELECT * FROM audit_results 
    WHERE audit_id = '${auditId}'
  `);
}
```

#### Vercel
Deployment management, logs, and environment variables.

```typescript
import { useVercel } from '@/hooks/useMCP';

async function deployPreview() {
  const { deployToVercel } = useVercel();
  
  return await deployToVercel({
    projectId: 'vln-main',
  });
}
```

#### Others
- **MailerLite** - Email campaigns and automations
- **Cloudflare** - KV storage, R2 buckets, Workers
- **Google Calendar** - Event management
- **Calendly** - Booking and meetings

### Configuring a New MCP Server

1. **Add to `.mcp/config.json`**
   ```json
   {
     "myServer": {
       "name": "My MCP Server",
       "enabled": true,
       "env": {
         "API_KEY": "${MY_API_KEY}"
       },
       "tools": ["tool1", "tool2"]
     }
   }
   ```

2. **Add environment variable**
   ```bash
   # In .mcp/.env.local
   MY_API_KEY=xxxxxxxxxxxxx
   ```

3. **Validate connection**
   ```bash
   pnpm run mcp:health
   ```

## Skill Framework Integration

### Basic Skill Creation

```typescript
// src/skills/my-skill.ts
import { Skill, SkillContext } from '@h4shed/skill-syncpulse';

export class MySkill extends Skill {
  id = 'my-skill';
  name = 'My Custom Skill';
  
  async execute(context: SkillContext) {
    const { input, mcp, logger } = context;
    
    logger.info('Executing my-skill', input);
    
    // Use MCP tools
    const result = await mcp.github.searchCode('my-query');
    
    return { success: true, data: result };
  }
}
```

### Registering a Skill

```typescript
// .mcp/skills/registry.json
{
  "skills": [
    {
      "id": "my-skill",
      "name": "My Custom Skill",
      "path": "./my-skill.ts",
      "enabled": true,
      "triggers": ["manual", "api"]
    }
  ]
}
```

### Using Skills in Agents

```typescript
import { Agent, SkillRegistry } from '@h4shed/skill-syncpulse';

class MyAgent extends Agent {
  constructor(skills: SkillRegistry) {
    super('my-agent', skills);
  }
  
  async execute(input: any) {
    // Execute a registered skill
    const result = await this.executeSkill('my-skill', input);
    return result;
  }
}
```

## Building Custom Skills

### 1. Audit Intake Skill

Handles incoming security audit requests.

```typescript
// skills/audit-intake.ts
import { Skill, SkillContext } from '@h4shed/skill-syncpulse';

export class AuditIntakeSkill extends Skill {
  id = 'audit-intake';
  name = 'Audit Intake';
  
  async execute(context: SkillContext) {
    const { input, mcp } = context;
    const { projectName, scope, deadline } = input;
    
    // Store in database
    const audit = await mcp.supabase.executeSQL(`
      INSERT INTO audits (project_name, scope, deadline)
      VALUES ('${projectName}', '${scope}', '${deadline}')
      RETURNING *
    `);
    
    // Send confirmation email
    await mcp.mailerlite.createCampaign({
      name: `Audit Intake Confirmation`,
      to: input.contactEmail,
    });
    
    return { auditId: audit.id, status: 'intake-received' };
  }
}
```

### 2. Report Generation Skill

Generates audit reports from findings.

```typescript
// skills/report-generator.ts
import { Skill, SkillContext } from '@h4shed/skill-syncpulse';

export class ReportGeneratorSkill extends Skill {
  id = 'report-generator';
  name = 'Report Generator';
  
  async execute(context: SkillContext) {
    const { input, mcp } = context;
    const { auditId } = input;
    
    // Get audit results
    const results = await mcp.supabase.executeSQL(`
      SELECT * FROM audit_results WHERE audit_id = '${auditId}'
    `);
    
    // Generate report
    const report = this.generateReport(results);
    
    // Upload to storage
    await mcp.cloudflare.r2Bucket.upload(`audit-reports/${auditId}.pdf`, report);
    
    return { reportUrl: `s3://.../${auditId}.pdf` };
  }
  
  private generateReport(results: any) {
    // Report generation logic
    return Buffer.from('PDF content');
  }
}
```

### 3. Documentation Sync Skill

Synchronizes documentation from multiple sources.

```typescript
// skills/documentation-sync.ts
import { Skill, SkillContext } from '@h4shed/skill-syncpulse';

export class DocumentationSyncSkill extends Skill {
  id = 'documentation-sync';
  name = 'Documentation Sync';
  
  async execute(context: SkillContext) {
    const { mcp, logger } = context;
    
    const repos = [
      'fused-gaming/vln',
      'fused-gaming/blackjack-premium',
      'fused-gaming/fused-gaming-skill-mcp',
      'fused-gaming/peraltacc',
    ];
    
    for (const repo of repos) {
      logger.info(`Syncing docs from ${repo}`);
      
      // Fetch docs
      const docs = await mcp.github.getFileContents({
        owner: repo.split('/')[0],
        repo: repo.split('/')[1],
        path: 'docs/',
      });
      
      // Process and store
      await this.processDocs(docs, repo);
    }
    
    logger.info('Documentation sync completed');
    return { status: 'completed', timestamp: new Date() };
  }
  
  private async processDocs(docs: any, source: string) {
    // Processing logic
  }
}
```

## Multi-Agent Workflows

### Coordinating Multiple Agents

```typescript
// Create orchestration system
const syncPulse = new SyncPulse({
  agents: [
    new AuditAgent(skills),
    new ReportAgent(skills),
    new NotificationAgent(skills),
  ],
  topology: 'mesh',
  coordinationMode: 'adaptive',
});

// Define workflow
const workflow = {
  steps: [
    { agent: 'audit', skill: 'audit-intake' },
    { agent: 'audit', skill: 'run-security-scan' },
    { agent: 'report', skill: 'generate-report' },
    { agent: 'notification', skill: 'send-results' },
  ],
  parallelization: {
    // Scan can run in parallel
    'run-security-scan': { parallel: true, maxConcurrency: 3 },
  },
};

// Execute workflow
const result = await syncPulse.executeWorkflow(workflow);
```

## Testing & Validation

### Unit Testing a Skill

```typescript
import { describe, it, expect, vi } from 'vitest';
import { AuditIntakeSkill } from '@/skills/audit-intake';

describe('AuditIntakeSkill', () => {
  it('should create an audit record', async () => {
    const skill = new AuditIntakeSkill();
    
    const mockMCP = {
      supabase: { executeSQL: vi.fn().mockResolvedValue({ id: '123' }) },
      mailerlite: { createCampaign: vi.fn().mockResolvedValue({}) },
    };
    
    const result = await skill.execute({
      input: {
        projectName: 'Test Project',
        scope: 'Full Audit',
        deadline: '2026-06-11',
        contactEmail: 'test@example.com',
      },
      mcp: mockMCP,
    });
    
    expect(result.auditId).toBe('123');
    expect(mockMCP.supabase.executeSQL).toHaveBeenCalled();
  });
});
```

### Integration Testing

```typescript
// Test MCP server connectivity
pnpm run mcp:health

// Test skill execution
pnpm run mcp:skills:test my-skill

// Test orchestration
pnpm run mcp:orchestration:test audit-workflow
```

## Deployment

### Production Deployment

1. **Build and validate**
   ```bash
   pnpm build
   pnpm lint
   ```

2. **Deploy to Vercel**
   ```bash
   pnpm deploy
   ```

3. **Update MCP configuration**
   ```bash
   pnpm run mcp:deploy
   ```

4. **Verify health**
   ```bash
   pnpm run mcp:health --prod
   ```

## Best Practices

### 1. Skill Design
- Keep skills focused and single-purpose
- Use clear, descriptive names
- Document inputs and outputs
- Include error handling

### 2. Error Handling
```typescript
async execute(context: SkillContext) {
  try {
    const result = await this.doWork();
    return { success: true, data: result };
  } catch (error) {
    context.logger.error('Skill failed', error);
    return { success: false, error: error.message };
  }
}
```

### 3. Logging
```typescript
context.logger.info('Processing started', { itemCount: items.length });
context.logger.warn('Deprecated API used', { api: 'old-endpoint' });
context.logger.error('Operation failed', error);
```

### 4. State Management
```typescript
// Use SyncPulse for coordinated state
const state = await syncPulse.getSharedState('audit-workflow');
await syncPulse.updateSharedState('audit-workflow', { status: 'processing' });
```

### 5. Testing
- Unit test each skill
- Integration test workflows
- Load test multi-agent systems
- Validate MCP connections

---

## Support

For issues or questions:
1. Check [Troubleshooting Guide](./troubleshooting.md)
2. Review [MCP Documentation](/docs/mcp/)
3. Check [Skill Framework Docs](/docs/fused-gaming-skill-mcp/)
4. File an issue on [GitHub](https://github.com/fused-gaming/vln/issues)

---

**Last Updated**: May 11, 2026  
**Version**: 1.0.0
