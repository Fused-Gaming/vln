---
title: "Best Practices"
description: "Recommended practices for using Skill-MCP effectively and securely"
---

# Best Practices

This guide covers recommended practices for integrating and using Skill-MCP effectively, securely, and at scale.

## API Key Management

### Secure Key Storage

**Do's:**
- ✅ Store keys in environment variables
- ✅ Use secret management services (AWS Secrets Manager, HashiCorp Vault, etc.)
- ✅ Rotate keys periodically (monthly recommended)
- ✅ Use different keys for development, staging, and production
- ✅ Restrict key permissions to necessary scopes
- ✅ Enable API key logging/auditing

**Example - Environment Variables:**
```bash
# .env (local development only)
SKILL_API_KEY_DEV=sk_user_xxxxx
SKILL_API_KEY_PROD=sk_svc_xxxxx

# Never commit .env to version control!
echo ".env" >> .gitignore
```

**Example - Kubernetes Secret:**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: skill-mcp-key
type: Opaque
stringData:
  api-key: sk_svc_xxxxx
---
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
  - name: app
    env:
    - name: SKILL_API_KEY
      valueFrom:
        secretKeyRef:
          name: skill-mcp-key
          key: api-key
```

### Key Rotation

Rotate keys regularly to minimize exposure risk:

```javascript
// Key rotation workflow
// 1. Generate new key
const newKey = await skillMcp.createKey({
  name: 'Production Key (Rotated)',
  type: 'service'
});

// 2. Deploy with new key to staging
deployToStaging({ apiKey: newKey.key });

// 3. Run tests
await runIntegrationTests();

// 4. Deploy to production
deployToProduction({ apiKey: newKey.key });

// 5. Wait 24 hours
// 6. Revoke old key
await skillMcp.revokeKey(oldKey.id);
```

### Key Types and Scopes

Use the most restrictive key type for your needs:

**User Keys** (Development)
- Personal development and testing
- Scoped to your user account
- Revoked immediately when regenerated
- Can be deleted anytime

**Service Keys** (Production)
- Application-to-application
- Specific tool/permission scopes
- Long-lived (recommend rotation every 30 days)
- Audit logged

**Temporary Keys** (Limited Duration)
- Time-limited access (max 24 hours)
- Single-use or limited use
- Auto-expires
- No manual revocation needed

## Error Handling and Resilience

### Implement Comprehensive Error Handling

```javascript
async function invokeTool(toolId, inputs, options = {}) {
  const {
    maxRetries = 3,
    timeout = 30000,
    fallbackValue = null
  } = options;

  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await client.invoke(toolId, inputs, {
        timeout,
        signal: AbortSignal.timeout(timeout)
      });
    } catch (error) {
      lastError = error;

      // Determine if error is retryable
      if (!error.retryable || attempt === maxRetries - 1) {
        // Non-retryable error or last attempt
        if (fallbackValue !== null) {
          console.warn(`Using fallback value for ${toolId}`);
          return fallbackValue;
        }
        throw error;
      }

      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
      console.warn(
        `Tool invocation failed (attempt ${attempt + 1}/${maxRetries}): ${error.message}. ` +
        `Retrying in ${delay}ms...`
      );
      await new Promise(r => setTimeout(r, delay));
    }
  }

  throw lastError;
}
```

### Handle Rate Limiting

```javascript
class RateLimitAwareClient {
  constructor(client) {
    this.client = client;
    this.queue = [];
    this.processing = false;
  }

  async invoke(toolId, inputs) {
    return new Promise((resolve, reject) => {
      this.queue.push({ toolId, inputs, resolve, reject });
      this.process();
    });
  }

  async process() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const { toolId, inputs, resolve, reject } = this.queue.shift();

      try {
        const result = await this.client.invoke(toolId, inputs);
        resolve(result);
      } catch (error) {
        if (error.code === 'RATE_LIMITED') {
          // Put back in queue to retry later
          this.queue.unshift({ toolId, inputs, resolve, reject });
          await new Promise(r => 
            setTimeout(r, (error.retry_after || 60) * 1000)
          );
        } else {
          reject(error);
        }
      }
    }

    this.processing = false;
  }
}

// Usage
const client = new RateLimitAwareClient(skillMcpClient);
await client.invoke('github-list-prs', { owner: 'vln', repo: 'vln-gg' });
```

### Graceful Degradation

```javascript
async function getRepositoryInfo(owner, repo) {
  try {
    // Primary: Get comprehensive info
    return await client.invoke('github-get-repo', { owner, repo });
  } catch (error) {
    console.warn(`Failed to get repo info: ${error.message}`);
    
    // Fallback: Return cached data if available
    const cached = await cache.get(`repo:${owner}/${repo}`);
    if (cached) {
      console.log('Using cached repository info');
      return cached;
    }
    
    // Last resort: Return minimal data
    console.error('No data available');
    return {
      owner,
      repo,
      // ... minimal required fields
    };
  }
}
```

## Performance Optimization

### Caching Strategy

```javascript
const client = new skillMcp.Client({
  apiKey: process.env.SKILL_API_KEY,
  cache: {
    enabled: true,
    ttl: 3600, // 1 hour default
    rules: [
      // Cache tool list for 24 hours
      { pattern: '/tools', ttl: 86400 },
      // Cache read-only operations
      { pattern: '*/get/*', ttl: 3600 },
      // Don't cache mutations
      { pattern: '*/invoke/*', ttl: 0 }
    ]
  }
});

// Or manual caching
const nodeCache = require('node-cache');
const cache = new nodeCache({ stdTTL: 3600 });

async function getToolsWithCache() {
  const cacheKey = 'all-tools';
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const tools = await client.listTools();
  cache.set(cacheKey, tools);
  return tools;
}
```

### Batch Operations

```javascript
// Instead of invoking tools one-by-one
async function slowApproach(repos) {
  const results = [];
  for (const repo of repos) {
    results.push(
      await client.invoke('github-list-prs', {
        owner: 'vln',
        repo: repo
      })
    );
  }
  return results;
}

// Use batch operations when available
async function fastApproach(repos) {
  return await client.invokeBatch(
    'github-list-prs',
    repos.map(repo => ({ owner: 'vln', repo }))
  );
}

// Or use Promise.all for parallel execution
async function parallelApproach(repos) {
  return Promise.all(
    repos.map(repo =>
      client.invoke('github-list-prs', {
        owner: 'vln',
        repo
      })
    )
  );
}
```

### Connection Pooling

```javascript
// Configure connection pooling in HTTP client
const client = new skillMcp.Client({
  apiKey: process.env.SKILL_API_KEY,
  http: {
    // Keep-alive connection pooling
    agent: new http.Agent({
      keepAlive: true,
      keepAliveMsecs: 30000,
      maxSockets: 50,
      maxFreeSockets: 10,
      timeout: 60000,
      freeSocketTimeout: 30000
    })
  }
});
```

## Monitoring and Observability

### Structured Logging

```javascript
const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info'
});

const client = new skillMcp.Client({
  apiKey: process.env.SKILL_API_KEY,
  hooks: {
    beforeInvoke: (toolId, inputs) => {
      logger.info({
        event: 'tool_invoke_start',
        tool_id: toolId,
        timestamp: new Date().toISOString()
      });
    },
    afterInvoke: (toolId, result) => {
      logger.info({
        event: 'tool_invoke_success',
        tool_id: toolId,
        duration_ms: result.timing.total_ms,
        timestamp: new Date().toISOString()
      });
    },
    onError: (toolId, error) => {
      logger.error({
        event: 'tool_invoke_error',
        tool_id: toolId,
        error_code: error.code,
        error_message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
});
```

### Metrics Collection

```javascript
const prometheus = require('prom-client');

const invokeCounter = new prometheus.Counter({
  name: 'skill_invocations_total',
  help: 'Total tool invocations',
  labelNames: ['tool_id', 'status']
});

const invokeDuration = new prometheus.Histogram({
  name: 'skill_invocation_duration_ms',
  help: 'Tool invocation duration',
  labelNames: ['tool_id']
});

async function invokeTool(toolId, inputs) {
  const start = Date.now();
  try {
    const result = await client.invoke(toolId, inputs);
    invokeCounter.inc({ tool_id: toolId, status: 'success' });
    invokeDuration.observe({ tool_id: toolId }, Date.now() - start);
    return result;
  } catch (error) {
    invokeCounter.inc({ tool_id: toolId, status: 'error' });
    throw error;
  }
}
```

### Distributed Tracing

```javascript
const opentelemetry = require('@opentelemetry/api');
const tracer = opentelemetry.trace.getTracer('app');

async function invokeTool(toolId, inputs) {
  const span = tracer.startSpan(`skill.${toolId}`);
  
  try {
    span.setAttributes({
      'tool.id': toolId,
      'tool.input_size': JSON.stringify(inputs).length
    });
    
    const result = await client.invoke(toolId, inputs);
    span.setStatus({ code: opentelemetry.SpanStatusCode.OK });
    return result;
  } catch (error) {
    span.recordException(error);
    span.setStatus({ code: opentelemetry.SpanStatusCode.ERROR });
    throw error;
  } finally {
    span.end();
  }
}
```

## Security Recommendations

### Input Validation

```javascript
async function validateAndInvoke(toolId, inputs) {
  // Get tool schema
  const tool = await client.getTool(toolId);
  
  // Validate inputs against schema
  const schema = Joi.object(
    Object.fromEntries(
      Object.entries(tool.inputs).map(([key, spec]) => [
        key,
        Joi.any()
          .required(spec.required)
          .description(spec.description)
      ])
    )
  );
  
  const { error, value } = schema.validate(inputs);
  if (error) throw new Error(`Invalid inputs: ${error.message}`);
  
  // Sanitize sensitive fields
  const sanitized = {
    ...value,
    api_key: value.api_key ? '***' : undefined,
    password: value.password ? '***' : undefined,
    token: value.token ? '***' : undefined
  };
  
  logger.info({ event: 'tool_invoke', tool_id: toolId, inputs: sanitized });
  
  return client.invoke(toolId, value);
}
```

### Output Sanitization

```javascript
function sanitizeResult(toolId, result) {
  // List of sensitive fields to mask
  const sensitiveFields = [
    'api_key', 'password', 'token', 'secret',
    'private_key', 'access_token', 'refresh_token'
  ];
  
  function sanitize(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    
    if (Array.isArray(obj)) {
      return obj.map(sanitize);
    }
    
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => {
        if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
          return [key, '***'];
        }
        return [key, sanitize(value)];
      })
    );
  }
  
  return sanitize(result);
}
```

### Rate Limiting Awareness

```javascript
class SelfThrottlingClient {
  constructor(client, requestsPerMinute = 100) {
    this.client = client;
    this.requestsPerMinute = requestsPerMinute;
    this.requests = [];
  }

  async invoke(toolId, inputs) {
    // Check rate limit
    const now = Date.now();
    this.requests = this.requests.filter(t => now - t < 60000);
    
    if (this.requests.length >= this.requestsPerMinute) {
      const waitTime = 60000 - (now - this.requests[0]);
      throw new Error(
        `Rate limit: ${this.requestsPerMinute} req/min. ` +
        `Wait ${waitTime}ms or upgrade plan.`
      );
    }
    
    this.requests.push(now);
    return this.client.invoke(toolId, inputs);
  }
}
```

## Testing Best Practices

### Integration Testing

```javascript
describe('Skill-MCP Integration', () => {
  let client;
  
  beforeAll(() => {
    client = new skillMcp.Client({
      apiKey: process.env.SKILL_TEST_KEY
    });
  });
  
  it('should invoke github-list-prs tool', async () => {
    const result = await client.invoke('github-list-prs', {
      owner: 'vln',
      repo: 'vln-gg',
      state: 'open'
    });
    
    expect(result).toBeDefined();
    expect(result).toHaveProperty('prs');
    expect(Array.isArray(result.prs)).toBe(true);
    expect(result).toHaveProperty('count');
    expect(typeof result.count).toBe('number');
  });
  
  it('should handle errors gracefully', async () => {
    expect(() => {
      client.invoke('invalid-tool', {});
    }).rejects.toThrow('Tool not found');
  });
});
```

### Mocking

```javascript
const mockClient = new skillMcp.Client({
  apiKey: 'sk_test_xxxxx',
  baseURL: 'http://localhost:3001' // Local mock server
});

// Or use mocking library
jest.mock('@skill-mcp/node', () => ({
  Client: jest.fn().mockImplementation(() => ({
    invoke: jest.fn().mockResolvedValue({
      prs: [{ id: 1, title: 'Test PR' }],
      count: 1
    })
  }))
}));
```

## Deployment Patterns

### Blue-Green Deployment

```javascript
// 1. Deploy with new API key to green environment
const greenEnv = {
  SKILL_API_KEY: newKey.key,
  VERSION: '2.0'
};
deployToGreen(greenEnv);

// 2. Run smoke tests
await runSmokeTests(greenEnv);

// 3. Switch traffic to green
switchTraffic('green');

// 4. Monitor for errors
monitorErrorRate('green', 5); // 5 minute monitoring

// 5. Clean up old environment
cleanupBlue();
```

### Canary Deployment

```javascript
// Route 10% of traffic to new version
const router = (request) => {
  if (Math.random() < 0.1) {
    // 10% canary
    return forwardTo('v2', request);
  }
  // 90% stable
  return forwardTo('v1', request);
};

// Monitor canary metrics
const canaryMetrics = {
  errorRate: 0,
  avgResponseTime: 0,
  successRate: 100
};

// If canary looks good, increase traffic
if (canaryMetrics.errorRate < 0.01 && canaryMetrics.successRate > 99.9) {
  increaseCanaryTraffic(0.5); // 50%
}
```

## Scaling Strategies

### Horizontal Scaling

```javascript
// Load balance across multiple client instances
const clients = [
  new skillMcp.Client({ apiKey: key1 }),
  new skillMcp.Client({ apiKey: key2 }),
  new skillMcp.Client({ apiKey: key3 })
];

let clientIndex = 0;

async function invoke(toolId, inputs) {
  const client = clients[clientIndex++ % clients.length];
  return client.invoke(toolId, inputs);
}
```

### Queue-Based Processing

```javascript
const Bull = require('bull');

const skillQueue = new Bull('skill-invocations');

skillQueue.process(async (job) => {
  const { toolId, inputs } = job.data;
  return client.invoke(toolId, inputs);
});

// Add jobs
skillQueue.add(
  { toolId: 'github-list-prs', inputs: { owner: 'vln', repo: 'vln-gg' } },
  { attempts: 3, backoff: { type: 'exponential', delay: 2000 } }
);
```

---

**Last Updated:** 2026-04-28  
**Status:** Production Ready
