---
title: "Quick Start Guide"
description: "Get started with Skill-MCP in 5 minutes"
---

# Quick Start Guide

Get up and running with Skill-MCP in just 5 minutes. This guide walks you through getting an API key, making your first API call, and invoking your first tool.

## Prerequisites

- A Skill-MCP account (sign up free)
- Basic familiarity with APIs and REST calls
- A tool to make HTTP requests (curl, Postman, code)
- 5 minutes of your time

## Step 1: Get Your API Key (1 minute)

### Sign Up
1. Visit [skill.vln.gg](https://skill.vln.gg)
2. Click "Get Started" or "Sign Up"
3. Complete the registration form
4. Verify your email

### Generate API Key
1. Log in to your account
2. Go to **Settings** → **API Keys**
3. Click **"Generate New Key"**
4. Choose key type:
   - **User Key** (for development)
   - **Service Key** (for production)
5. Copy the key and save it securely

```
sk_vln_1a2b3c4d5e6f7g8h9i0j
```

## Step 2: List Available Tools (1 minute)

### Using cURL

```bash
curl https://api.skill.vln.gg/v1/tools \
  -H "Authorization: Bearer sk_vln_xxxxx"
```

### Using JavaScript/Node.js

```javascript
const response = await fetch('https://api.skill.vln.gg/v1/tools', {
  headers: {
    'Authorization': 'Bearer sk_vln_xxxxx'
  }
});

const tools = await response.json();
console.log(tools);
```

### Using Python

```python
import requests

response = requests.get(
    'https://api.skill.vln.gg/v1/tools',
    headers={'Authorization': 'Bearer sk_vln_xxxxx'}
)

tools = response.json()
print(tools)
```

### Response Example

```json
{
  "tools": [
    {
      "id": "github-list-prs",
      "name": "GitHub List PRs",
      "category": "integration",
      "description": "List open pull requests from a GitHub repository",
      "status": "ready",
      "inputs": {
        "owner": "string",
        "repo": "string",
        "state": "string"
      },
      "outputs": {
        "prs": "array",
        "count": "number"
      }
    }
  ],
  "count": 28,
  "version": "1.0"
}
```

## Step 3: Invoke Your First Tool (2 minutes)

### Choose a Simple Tool

Let's start with **GitHub List PRs** - a tool that lists pull requests from a repository.

Tool ID: `github-list-prs`

### Make the Request

#### Using cURL

```bash
curl -X POST https://api.skill.vln.gg/v1/tools/github-list-prs/invoke \
  -H "Authorization: Bearer sk_vln_xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "owner": "vln",
    "repo": "skill-examples",
    "state": "open"
  }'
```

#### Using JavaScript

```javascript
const response = await fetch(
  'https://api.skill.vln.gg/v1/tools/github-list-prs/invoke',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer sk_vln_xxxxx',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      owner: 'vln',
      repo: 'skill-examples',
      state: 'open'
    })
  }
);

const result = await response.json();
console.log(result);
```

#### Using Python

```python
import requests

response = requests.post(
    'https://api.skill.vln.gg/v1/tools/github-list-prs/invoke',
    headers={
        'Authorization': 'Bearer sk_vln_xxxxx',
        'Content-Type': 'application/json'
    },
    json={
        'owner': 'vln',
        'repo': 'skill-examples',
        'state': 'open'
    }
)

result = response.json()
print(result)
```

### Response Example

```json
{
  "status": "success",
  "execution_id": "exec_abcd1234",
  "result": {
    "prs": [
      {
        "id": 123,
        "title": "Add new security scanner",
        "author": "developer1",
        "created_at": "2026-04-20T10:30:00Z",
        "updated_at": "2026-04-28T14:45:00Z",
        "state": "open"
      },
      {
        "id": 124,
        "title": "Update dependencies",
        "author": "developer2",
        "created_at": "2026-04-25T08:15:00Z",
        "updated_at": "2026-04-28T09:20:00Z",
        "state": "open"
      }
    ],
    "count": 2
  },
  "timing": {
    "total_ms": 245,
    "execution_ms": 200,
    "processing_ms": 45
  }
}
```

## Step 4: Check Execution Status (1 minute)

### Async Execution

For long-running tools, check execution status:

```bash
curl https://api.skill.vln.gg/v1/executions/exec_abcd1234 \
  -H "Authorization: Bearer sk_vln_xxxxx"
```

### Status Response

```json
{
  "id": "exec_abcd1234",
  "tool_id": "github-list-prs",
  "status": "success",
  "progress": 100,
  "result": {
    "prs": [...],
    "count": 2
  },
  "started_at": "2026-04-28T14:45:00Z",
  "completed_at": "2026-04-28T14:45:00.245Z"
}
```

## Common Tool Examples

### GitHub Tools
Get PRs, issues, and workflow status:

```bash
# List pull requests
curl -X POST https://api.skill.vln.gg/v1/tools/github-list-prs/invoke \
  -H "Authorization: Bearer sk_vln_xxxxx" \
  -H "Content-Type: application/json" \
  -d '{"owner": "vln", "repo": "vln-gg", "state": "open"}'

# Get workflow status
curl -X POST https://api.skill.vln.gg/v1/tools/github-workflow-status/invoke \
  -H "Authorization: Bearer sk_vln_xxxxx" \
  -H "Content-Type: application/json" \
  -d '{"owner": "vln", "repo": "vln-gg", "workflow": "ci.yml"}'
```

### Docker Tools
Build and push container images:

```bash
# Build Docker image
curl -X POST https://api.skill.vln.gg/v1/tools/docker-build/invoke \
  -H "Authorization: Bearer sk_vln_xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "dockerfile": "Dockerfile",
    "image": "vln/security-scanner",
    "tag": "latest"
  }'
```

### Kubernetes Tools
Deploy and manage Kubernetes resources:

```bash
# Deploy to Kubernetes
curl -X POST https://api.skill.vln.gg/v1/tools/kubectl-apply/invoke \
  -H "Authorization: Bearer sk_vln_xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "manifest": "deployment.yaml",
    "namespace": "default"
  }'
```

### Security Tools
Run security scans and checks:

```bash
# Run SAST scan
curl -X POST https://api.skill.vln.gg/v1/tools/semgrep-scan/invoke \
  -H "Authorization: Bearer sk_vln_xxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "path": "src/",
    "rules": "p/security-audit"
  }'
```

## Error Handling

### Common Errors

#### 401 Unauthorized
Your API key is missing or invalid.

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing API key"
  }
}
```

**Fix:** Ensure your API key is correct and passed in the Authorization header.

#### 400 Bad Request
Your request format or parameters are incorrect.

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Missing required parameter: owner"
  }
}
```

**Fix:** Check the tool's input schema and ensure all required fields are present.

#### 429 Too Many Requests
You've exceeded your rate limit.

```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Try again in 60 seconds.",
    "retry_after": 60
  }
}
```

**Fix:** Wait for the specified time or upgrade your plan.

#### 500 Internal Server Error
Something went wrong on our end.

```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred",
    "support": "contact support@skill.vln.gg"
  }
}
```

**Fix:** Contact support with your execution ID for assistance.

## Next Steps

### 1. Install a Client Library
Use an official SDK for easier development:

- **Node.js:** `npm install @skill-mcp/node`
- **Python:** `pip install skill-mcp`
- **Go:** `go get github.com/skill-mcp/go-sdk`
- **Ruby:** `gem install skill-mcp`

### 2. Read the Full API Reference
Learn about all 28 available tools:

[Go to API Reference](/skill/api-docs)

### 3. Build a Workflow
Connect multiple tools together:

[Go to Workflow Guide](/skill/integration-guides/workflows)

### 4. Set Up Monitoring
Monitor your tool invocations:

[Go to Monitoring Guide](/skill/integration-guides/monitoring)

## Troubleshooting

### I'm getting "Invalid API Key"
1. Copy your API key again from Settings
2. Ensure it's passed in Authorization header
3. Check there are no extra spaces or line breaks
4. Try generating a new key if the issue persists

### My tool is timing out
1. Check the tool timeout setting (default 30s, max 300s)
2. Try simplifying your request
3. Some tools support async mode - check the docs

### I'm hitting rate limits
1. Review your current usage in the dashboard
2. Wait for the rate limit window to reset (usually 60 seconds)
3. Upgrade your plan for higher limits

### I need more help
1. Check the [FAQ](/skill/faq)
2. Browse [Code Examples](/skill/examples)
3. Email [support@skill.vln.gg](mailto:support@skill.vln.gg)

---

**Time to completion:** 5 minutes  
**Next:** [Explore All Tools](/skill/api-docs)
