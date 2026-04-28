---
title: "Integration Guide"
description: "Step-by-step guide for integrating Skill-MCP with your systems"
---

# Integration Guide

This guide covers integrating Skill-MCP with your applications, systems, and workflows.

## Integration Patterns

### Pattern 1: Direct API Calls

Make synchronous API calls to invoke tools immediately.

**Best for:**
- Single-tool invocations
- Quick automation scripts
- Testing and development
- Real-time operations

**Example:**

```javascript
// Node.js example
const skillMcp = require('@skill-mcp/node');

const client = new skillMcp.Client({
  apiKey: process.env.SKILL_API_KEY
});

async function listPullRequests() {
  const result = await client.invoke('github-list-prs', {
    owner: 'vln',
    repo: 'vln-gg',
    state: 'open'
  });
  
  console.log(`Found ${result.count} open PRs`);
  return result.prs;
}

listPullRequests().catch(console.error);
```

### Pattern 2: Async Job Execution

Queue long-running tools asynchronously.

**Best for:**
- Long-running tools (> 10 seconds)
- Batch operations
- Non-blocking workflows
- Scheduled tasks

**Example:**

```javascript
// Queue tool asynchronously
const execution = await client.invokeAsync('semgrep-scan', {
  path: 'src/',
  rules: 'p/security-audit'
});

console.log(`Scan queued: ${execution.execution_id}`);

// Check status later
const status = await client.getExecutionStatus(execution.execution_id);
console.log(`Status: ${status.status}`);

if (status.status === 'success') {
  console.log(`Found ${status.result.vulnerabilities.length} issues`);
}
```

### Pattern 3: Workflow Chaining

Connect multiple tools in a workflow.

**Best for:**
- Multi-step processes
- Tool orchestration
- Complex automation
- Data transformation

**Example:**

```javascript
// Chain multiple tools
async function runSecurityPipeline(repo) {
  // Step 1: Scan for secrets
  const secrets = await client.invoke('secret-scan', {
    path: repo.path
  });
  
  if (secrets.found.length > 0) {
    console.warn('Secrets found!');
    return { status: 'failed', reason: 'Secrets detected' };
  }
  
  // Step 2: Run SAST scan
  const sast = await client.invoke('semgrep-scan', {
    path: repo.path,
    rules: 'p/security-audit'
  });
  
  // Step 3: Scan dependencies
  const deps = await client.invoke('dependency-check', {
    path: repo.path
  });
  
  // Step 4: Aggregate results
  return {
    status: 'success',
    secrets: secrets.found.length,
    sast_issues: sast.vulnerabilities.length,
    dependency_issues: deps.vulnerabilities.length
  };
}
```

### Pattern 4: Event-Driven Execution

Trigger tools based on events (coming in 2.0).

**Best for:**
- Webhook handlers
- Event-based automation
- Real-time triggers
- Reactive workflows

**Example (Future):**

```javascript
// Register webhook
await client.registerWebhook({
  url: 'https://example.com/webhook',
  events: ['github.push', 'github.pull_request'],
  actions: [{
    tool: 'semgrep-scan',
    input: { path: 'src/' }
  }]
});
```

## Integration Steps

### Step 1: Install Client Library

Choose your language:

#### Node.js
```bash
npm install @skill-mcp/node
```

```javascript
const skillMcp = require('@skill-mcp/node');
const client = new skillMcp.Client({
  apiKey: process.env.SKILL_API_KEY
});
```

#### Python
```bash
pip install skill-mcp
```

```python
from skill_mcp import Client

client = Client(api_key=os.getenv('SKILL_API_KEY'))
```

#### Go
```bash
go get github.com/skill-mcp/go-sdk
```

```go
import "github.com/skill-mcp/go-sdk"

client := skillmcp.NewClient(os.Getenv("SKILL_API_KEY"))
```

#### cURL
No installation needed - use HTTP directly:

```bash
curl -X POST https://api.skill.vln.gg/v1/tools/{tool_id}/invoke \
  -H "Authorization: Bearer $SKILL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

### Step 2: Configure API Key

Store your API key securely:

#### Environment Variable (Recommended)
```bash
export SKILL_API_KEY="sk_vln_xxxxx"
```

#### Configuration File
```yaml
# config.yaml
skill:
  api_key: ${SKILL_API_KEY}
  endpoint: https://api.skill.vln.gg/v1
```

#### Docker Secret
```bash
echo "sk_vln_xxxxx" | docker secret create skill_api_key -
```

**Never:**
- ❌ Hardcode API keys in source code
- ❌ Commit keys to version control
- ❌ Share keys in chat/email
- ❌ Use in client-side code

### Step 3: Initialize Client

Create a client instance:

```javascript
const skillMcp = require('@skill-mcp/node');

const client = new skillMcp.Client({
  apiKey: process.env.SKILL_API_KEY,
  timeout: 30000,        // 30 second timeout
  retryAttempts: 3,      // Retry on failure
  retryDelay: 1000,      // 1 second initial delay
  cacheResults: true,    // Cache identical requests
  cacheTTL: 3600         // 1 hour cache
});
```

### Step 4: List Available Tools

Discover what tools are available:

```javascript
const tools = await client.listTools({
  category: 'security'
});

console.log(`Found ${tools.length} security tools`);
tools.forEach(tool => {
  console.log(`- ${tool.name} (${tool.id})`);
});
```

### Step 5: Invoke a Tool

Execute a tool with the required inputs:

```javascript
try {
  const result = await client.invoke('github-list-prs', {
    owner: 'vln',
    repo: 'vln-gg',
    state: 'open'
  });
  
  console.log(`Found ${result.count} PRs`);
} catch (error) {
  console.error(`Tool error: ${error.message}`);
  
  if (error.retryable) {
    // Retry with exponential backoff
    const retryResult = await client.invokeWithRetry(
      'github-list-prs',
      { owner: 'vln', repo: 'vln-gg', state: 'open' },
      { maxRetries: 3 }
    );
  }
}
```

## Common Integration Scenarios

### Scenario 1: CI/CD Pipeline Integration

Integrate Skill-MCP into your CI/CD workflow:

#### GitHub Actions
```yaml
name: Security Scan
on: [push, pull_request]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Run Skill-MCP Security Scan
        run: |
          npx @skill-mcp/node invoke \
            --tool semgrep-scan \
            --input '{"path":"src/","rules":"p/security-audit"}' \
            --api-key ${{ secrets.SKILL_API_KEY }}
      
      - name: Check Results
        run: |
          if [ $? -ne 0 ]; then
            echo "Security scan failed"
            exit 1
          fi
```

#### GitLab CI
```yaml
security_scan:
  stage: test
  script:
    - npm install @skill-mcp/node
    - npx @skill-mcp/node invoke \
        --tool semgrep-scan \
        --input '{"path":"src/"}' \
        --api-key $SKILL_API_KEY
  artifacts:
    reports:
      sast: skill-mcp-report.json
```

### Scenario 2: Scheduled Monitoring

Schedule regular tool executions:

```javascript
// scheduler.js
const schedule = require('node-schedule');
const skillMcp = require('@skill-mcp/node');

const client = new skillMcp.Client({
  apiKey: process.env.SKILL_API_KEY
});

// Run daily at 2 AM
schedule.scheduleJob('0 2 * * *', async () => {
  console.log('Running scheduled security scan...');
  
  const result = await client.invokeAsync('semgrep-scan', {
    path: 'src/',
    rules: 'p/security-audit'
  });
  
  console.log(`Scan queued: ${result.execution_id}`);
  
  // Check status after 5 minutes
  setTimeout(async () => {
    const status = await client.getExecutionStatus(result.execution_id);
    if (status.status === 'success') {
      console.log(`Scan complete: ${status.result.issues.length} issues`);
    }
  }, 5 * 60 * 1000);
});
```

### Scenario 3: Webhook Handler

Handle incoming webhooks and trigger tools:

```javascript
// webhook-handler.js
const express = require('express');
const skillMcp = require('@skill-mcp/node');

const app = express();
const client = new skillMcp.Client({
  apiKey: process.env.SKILL_API_KEY
});

app.post('/webhook/github', async (req, res) => {
  const event = req.headers['x-github-event'];
  const payload = req.body;
  
  if (event === 'push') {
    // Run security scan on push
    const scan = await client.invokeAsync('semgrep-scan', {
      path: 'src/',
      ref: payload.after
    });
    
    res.json({ status: 'scanning', execution_id: scan.execution_id });
  } else if (event === 'pull_request') {
    // Scan PR changes
    const scan = await client.invokeAsync('semgrep-scan', {
      path: 'src/',
      pr: payload.number
    });
    
    res.json({ status: 'scanning', execution_id: scan.execution_id });
  }
});

app.listen(3000);
```

### Scenario 4: Data Processing Pipeline

Process data through multiple tools:

```javascript
async function processPullRequest(pr) {
  // Get PR details
  const prData = await client.invoke('github-get-pr', {
    owner: 'vln',
    repo: 'vln-gg',
    number: pr
  });
  
  // Scan changed files
  const scan = await client.invoke('semgrep-scan', {
    path: 'src/',
    files: prData.files.map(f => f.filename)
  });
  
  // Get code metrics
  const metrics = await client.invoke('code-quality', {
    files: prData.files.map(f => f.filename)
  });
  
  // Combine results
  return {
    pr_number: pr,
    author: prData.author,
    security_issues: scan.issues.length,
    quality_score: metrics.score,
    recommendation: scan.issues.length > 0 ? 'request_changes' : 'approve'
  };
}

const result = await processPullRequest(123);
console.log(JSON.stringify(result, null, 2));
```

## Error Handling

### Comprehensive Error Handling

```javascript
async function robustToolInvocation() {
  try {
    const result = await client.invoke('github-list-prs', {
      owner: 'vln',
      repo: 'vln-gg'
    });
    
    return result;
  } catch (error) {
    // Handle different error types
    if (error.code === 'UNAUTHORIZED') {
      throw new Error('Invalid API key');
    } else if (error.code === 'RATE_LIMITED') {
      console.warn(`Rate limited, retry in ${error.retry_after}s`);
      await sleep(error.retry_after * 1000);
      return robustToolInvocation(); // Retry
    } else if (error.code === 'TOOL_TIMEOUT') {
      throw new Error('Tool execution timeout - try async mode');
    } else if (error.retryable) {
      // Exponential backoff retry
      for (let i = 0; i < 3; i++) {
        try {
          return await client.invoke(...);
        } catch (e) {
          if (i === 2) throw e;
          await sleep(Math.pow(2, i) * 1000);
        }
      }
    } else {
      throw error;
    }
  }
}
```

## Monitoring and Logging

### Basic Logging

```javascript
const client = new skillMcp.Client({
  apiKey: process.env.SKILL_API_KEY,
  logger: {
    debug: (msg) => console.log(`[DEBUG] ${msg}`),
    info: (msg) => console.log(`[INFO] ${msg}`),
    warn: (msg) => console.warn(`[WARN] ${msg}`),
    error: (msg) => console.error(`[ERROR] ${msg}`)
  }
});
```

### Metrics Collection

```javascript
const metrics = {
  total_calls: 0,
  successful_calls: 0,
  failed_calls: 0,
  total_time: 0
};

const wrappedClient = new Proxy(client, {
  get(target, prop) {
    if (prop === 'invoke') {
      return async function(...args) {
        metrics.total_calls++;
        const start = Date.now();
        try {
          const result = await target.invoke(...args);
          metrics.successful_calls++;
          metrics.total_time += Date.now() - start;
          return result;
        } catch (error) {
          metrics.failed_calls++;
          throw error;
        }
      };
    }
    return target[prop];
  }
});
```

## Testing

### Unit Testing

```javascript
describe('Skill-MCP Integration', () => {
  let client;
  
  beforeEach(() => {
    client = new skillMcp.Client({
      apiKey: 'sk_test_xxxxx' // Use test key
    });
  });
  
  it('should list tools', async () => {
    const tools = await client.listTools();
    expect(tools.length).toBeGreaterThan(0);
  });
  
  it('should invoke a tool', async () => {
    const result = await client.invoke('github-list-prs', {
      owner: 'vln',
      repo: 'vln-gg'
    });
    expect(result).toHaveProperty('prs');
    expect(result).toHaveProperty('count');
  });
  
  it('should handle errors', async () => {
    expect(() => {
      client.invoke('invalid-tool', {});
    }).rejects.toThrow();
  });
});
```

## Best Practices

### Do's
- ✅ Store API keys in environment variables
- ✅ Use async invocation for long-running tools
- ✅ Implement exponential backoff for retries
- ✅ Monitor execution times and errors
- ✅ Cache results when appropriate
- ✅ Validate tool inputs before invocation
- ✅ Log execution details for debugging

### Don'ts
- ❌ Hardcode API keys
- ❌ Synchronously invoke long-running tools
- ❌ Retry immediately without backoff
- ❌ Ignore rate limit headers
- ❌ Use tools in critical paths without fallbacks
- ❌ Store sensitive data in execution results
- ❌ Make unbounded tool calls in loops

---

**Last Updated:** 2026-04-28  
**Status:** Production Ready
