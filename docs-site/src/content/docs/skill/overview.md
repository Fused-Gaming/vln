---
title: Skill-MCP Tools Documentation
description: Complete guide to Skill-MCP tools, protocol reference, and integration patterns
---

# Skill-MCP Tools Documentation

**Skill-MCP** is VLN's comprehensive implementation of the Model Context Protocol (MCP), providing a standardized framework for AI tool integration, security analysis, and intelligent automation across gaming and blockchain ecosystems.

## What is Skill-MCP?

Skill-MCP extends the Model Context Protocol with:

- **Standardized Tool Interface** - Consistent API for tool definition and execution
- **Security & Sandboxing** - Isolated execution environments
- **AI Integration** - Native support for LLM-powered tools
- **Smart Contract Analysis** - EVM security and vulnerability detection
- **Real-time Data Feeds** - Market, blockchain, and gaming metrics
- **Extensible Architecture** - Easy custom tool development

## Key Features

✅ **MCP Protocol Compliant** - Full MCP v1.0 implementation  
✅ **50+ Built-in Tools** - Security, analytics, blockchain operations  
✅ **Type-Safe Execution** - TypeScript with full type inference  
✅ **Rate Limiting & Quotas** - Usage-based access control  
✅ **Audit Logging** - Complete execution history  
✅ **Hot Reload** - Dynamic tool registration without downtime  

## Quick Start

### Installation & Setup
```bash
# Clone the Skill-MCP repository
git clone https://github.com/Fused-Gaming/skill-mcp.git
cd skill-mcp

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env
# Edit .env with your API keys and settings

# Start the MCP server
pnpm dev
```

### Your First Tool Call
```typescript
// Initialize Skill-MCP client
import { SkillClient } from '@vln/skill-mcp';

const client = new SkillClient({
  apiKey: process.env.SKILL_API_KEY
});

// Execute a tool
const result = await client.executeTool('analyze-contract', {
  contractAddress: '0x...',
  chainId: 1
});

console.log(result.vulnerabilities);
```

## Documentation Map

### 📚 Core Documentation (10 Pages)

1. **[MCP Protocol Overview](/docs/skill/mcp-protocol)** - Protocol fundamentals
2. **[Tool Reference Index](/docs/skill/tools)** - All 50+ tools documented
3. **[Getting Started](/docs/skill/getting-started)** - Installation and setup
4. **[Integration Guide](/docs/skill/integration)** - Framework integration patterns
5. **[API Reference](/docs/skill/api)** - Complete endpoint documentation
6. **[Security & Permissions](/docs/skill/security)** - Access control and sandboxing
7. **[Custom Tools](/docs/skill/custom-tools)** - Building your own tools
8. **[Best Practices](/docs/skill/best-practices)** - Design patterns and performance
9. **[Monitoring & Debugging](/docs/skill/debugging)** - Logging and observability
10. **[FAQ & Troubleshooting](/docs/skill/faq)** - Common issues and solutions

---

## MCP Protocol Overview

### What is MCP?

The Model Context Protocol (MCP) is a standardized interface for AI models to interact with external tools and data sources. Skill-MCP implements MCP with security and performance optimizations.

**Key Concepts:**
- **Tools** - Atomic operations (analyze, fetch, execute)
- **Resources** - Data sources (contracts, markets, reports)
- **Prompts** - Reusable AI instructions
- **Sampling** - Model inference with tool access

[Learn MCP Basics](/docs/skill/mcp-protocol)

---

## Tool Categories

### Security & Analysis (15 tools)
- Smart contract vulnerability scanning
- RNG analysis and validation
- Wallet risk scoring
- Pattern detection
- Compliance checking

### Blockchain Operations (12 tools)
- Contract deployment
- Transaction simulation
- State queries
- Event monitoring
- Gas optimization

### Gaming Analytics (10 tools)
- Player behavior analysis
- Game fairness verification
- Statistical modeling
- Anomaly detection
- Reporting

### Data & Integration (13 tools)
- Market data feeds
- API integration
- Database operations
- File processing
- Transformation pipelines

[View All Tools](/docs/skill/tools)

---

## API Quick Reference

### Core Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/tools/execute` | POST | Execute a tool |
| `/api/tools/list` | GET | List available tools |
| `/api/tools/{id}` | GET | Get tool details |
| `/api/resources` | GET | List available resources |
| `/api/executions` | GET | View execution history |

**Full API Reference**: [API Documentation](/docs/skill/api)

---

## Integration Examples

### Python Integration
```python
from skill_mcp import SkillClient

client = SkillClient(api_key='sk_...')

# Analyze a smart contract
result = client.tools.execute(
    'analyze-contract',
    contractAddress='0x...',
    chainId=1
)

print(f"Found {len(result.vulnerabilities)} issues")
```

### JavaScript/Node.js
```typescript
import { SkillClient } from '@vln/skill-mcp';

const client = new SkillClient({
  apiKey: process.env.SKILL_API_KEY
});

const analysis = await client.tools.execute('analyze-contract', {
  contractAddress: '0x...',
  chainId: 1
});
```

### REST API
```bash
curl -X POST https://skill-mcp.api.vln.gg/api/tools/execute \
  -H "Authorization: Bearer sk_..." \
  -H "Content-Type: application/json" \
  -d '{
    "toolName": "analyze-contract",
    "parameters": {
      "contractAddress": "0x...",
      "chainId": 1
    }
  }'
```

[View Integration Guide](/docs/skill/integration)

---

## Best Practices

### Tool Execution
- **Batch operations** - Group multiple tool calls
- **Caching results** - Avoid redundant analysis
- **Timeout handling** - Set appropriate timeouts
- **Error recovery** - Implement retry logic

### Security
- **API key rotation** - Regular credential updates
- **Rate limiting** - Respect quota limits
- **Audit trails** - Log all tool executions
- **Permissions** - Use least privilege principle

### Performance
- **Connection pooling** - Reuse client instances
- **Async execution** - Non-blocking operations
- **Resource optimization** - Monitor tool costs
- **Monitoring** - Track latency and errors

[Best Practices Guide](/docs/skill/best-practices)

---

## Tool Development

### Creating Custom Tools

```typescript
import { Tool, ToolContext } from '@vln/skill-mcp';

export class MyCustomTool extends Tool {
  name = 'my-custom-tool';
  description = 'Does something useful';

  parameters = {
    input: { type: 'string', required: true }
  };

  async execute(ctx: ToolContext) {
    const result = await myLogic(ctx.parameters.input);
    return { success: true, data: result };
  }
}
```

[Custom Tools Guide](/docs/skill/custom-tools)

---

## Monitoring & Debugging

### View Execution History
```bash
curl https://skill-mcp.api.vln.gg/api/executions \
  -H "Authorization: Bearer sk_..."
```

### Enable Debug Logging
```typescript
const client = new SkillClient({
  apiKey: process.env.SKILL_API_KEY,
  debug: true // Enable verbose logging
});
```

### Performance Monitoring
- Dashboard: https://skill-mcp.vln.gg/dashboard
- Metrics: Latency, throughput, errors
- Alerts: Performance degradation notifications

[Debugging Guide](/docs/skill/debugging)

---

## FAQ & Troubleshooting

### Common Questions

**Q: How many tools can I execute concurrently?**  
A: Up to 100 concurrent executions per API key. See [Rate Limiting](/docs/skill/api#rate-limits)

**Q: Can I create custom tools?**  
A: Yes! See [Custom Tools Guide](/docs/skill/custom-tools)

**Q: What languages are supported?**  
A: Python, JavaScript/Node.js, Go, and REST API. See [Integration Guide](/docs/skill/integration)

[Full FAQ](/docs/skill/faq)

---

## Getting Help

- **Documentation**: You're reading it!
- **Tool Issues**: [Tool Reference](/docs/skill/tools)
- **API Questions**: [API Reference](/docs/skill/api)
- **Technical Support**: [GitHub Issues](https://github.com/Fused-Gaming/vln/issues)
- **Email Support**: security@vln.gg

---

## Next Steps

Choose your starting point:

- **🚀 [Get Started: Installation](/docs/skill/getting-started)** - Set up Skill-MCP
- **📚 [Learn MCP Protocol](/docs/skill/mcp-protocol)** - Protocol fundamentals
- **🔧 [Tool Reference](/docs/skill/tools)** - Explore all tools
- **🔌 [Integrate](/docs/skill/integration)** - Connect to your system

---

*Last Updated: April 2026 | [View Changelog](/docs/skill/changelog)*
