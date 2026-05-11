# Fused Gaming Skill MCP Framework

Advanced multi-agent orchestration and skill management system for building intelligent, coordinated AI agents.

## Overview

The Fused Gaming Skill MCP Framework provides:

- **Multi-Agent Orchestration** - Coordinate multiple AI agents with synchronized state
- **Skill Management** - Register, discover, and manage reusable skills
- **SyncPulse Integration** - Real-time synchronization and adaptive coordination
- **Session Persistence** - Maintain agent state across sessions
- **Security & Auth** - Enterprise-grade authentication and authorization

## Quick Start

### Installation

```bash
npm install @h4shed/skill-syncpulse
# or
pnpm add @h4shed/skill-syncpulse
```

### Basic Setup

```typescript
import { SyncPulse, SkillRegistry } from '@h4shed/skill-syncpulse';

// Initialize framework
const syncPulse = new SyncPulse({
  topology: 'mesh',
  coordinationMode: 'adaptive',
});

// Create skill registry
const skills = new SkillRegistry();

// Register a skill
skills.register({
  id: 'my-skill',
  name: 'My Custom Skill',
  handler: async (input) => {
    // Your skill logic
    return { result: 'success' };
  },
});

// Start the framework
await syncPulse.initialize(skills);
```

## Documentation

- **[Installation & Setup](./01-installation.md)** - Get started with the framework
- **[Architecture](./02-architecture.md)** - Framework design and concepts
- **[Agent Development](./03-agent-development.md)** - Build custom agents
- **[Skill Framework](./04-skill-framework.md)** - Create and manage skills
- **[API Reference](./05-api-reference.md)** - Complete API documentation
- **[Examples](./06-examples.md)** - Real-world usage examples
- **[Best Practices](./07-best-practices.md)** - Patterns and best practices
- **[Troubleshooting](./08-troubleshooting.md)** - Common issues and solutions

## Core Concepts

### Agents
Intelligent entities that perform tasks by executing skills and coordinating with other agents.

### Skills
Reusable, composable units of functionality that agents can execute.

### SyncPulse
Coordination engine that synchronizes agent state and enables adaptive behavior.

### Orchestration
Multi-agent coordination framework for complex workflows.

## Features

### 🔄 Multi-Agent Coordination
- Mesh topology for agent-to-agent communication
- Adaptive coordination based on system load
- State synchronization across agents

### 🎯 Skill Management
- Automatic skill discovery
- Skill versioning and dependencies
- Skill health checking and monitoring

### 💾 Session Management
- Persistent session state
- Session recovery and resume
- Multi-session coordination

### 🔐 Security
- Role-based access control
- Token-based authentication
- Audit trail and logging

## Architecture

```
┌─────────────────────────────────────┐
│     Agent Orchestration Layer       │
├─────────────────────────────────────┤
│         SyncPulse Core              │
│  (State, Coordination, Messaging)   │
├─────────────────────────────────────┤
│      Skill Registry & Execution     │
├─────────────────────────────────────┤
│    Transport & Protocol Layer       │
│    (stdio, SSE, WebSocket)          │
├─────────────────────────────────────┤
│        External Systems             │
│  (MCP Servers, APIs, Databases)     │
└─────────────────────────────────────┘
```

## Key Classes

### SyncPulse
Main framework class for agent orchestration.

```typescript
new SyncPulse(options: SyncPulseOptions)
```

### SkillRegistry
Manages skill registration and discovery.

```typescript
new SkillRegistry(options?: RegistryOptions)
```

### Agent
Base class for creating custom agents.

```typescript
class MyAgent extends Agent {
  async execute(input: any) {
    // Implementation
  }
}
```

## Configuration

See [Configuration Guide](./config.md) for detailed configuration options.

## Examples

### Simple Agent

```typescript
import { Agent } from '@h4shed/skill-syncpulse';

class DataProcessingAgent extends Agent {
  async execute(input: string) {
    // Process data
    return { processed: input.toUpperCase() };
  }
}
```

### Multi-Agent System

```typescript
import { SyncPulse } from '@h4shed/skill-syncpulse';

const syncPulse = new SyncPulse({
  agents: [
    new DataCollectorAgent(),
    new ProcessorAgent(),
    new ReporterAgent(),
  ],
});

await syncPulse.run();
```

## Integration with VLN

The VLN project uses Skill MCP for:

- **Audit Workflows** - Multi-step security audit orchestration
- **Report Generation** - Coordinated report creation and formatting
- **Documentation Sync** - Automated documentation updates
- **Monitoring** - Health checks and system monitoring

See [VLN Integration Guide](./vln-integration.md) for details.

## Support

- **Documentation**: See links above
- **Issues**: [GitHub Issues](https://github.com/fused-gaming/fused-gaming-skill-mcp/issues)
- **Discussions**: [GitHub Discussions](https://github.com/fused-gaming/fused-gaming-skill-mcp/discussions)

## License

MIT License - See LICENSE file in repository

## Contributing

See [CONTRIBUTING.md](/CONTRIBUTING.md) for contribution guidelines.

---

**Version**: 0.2.0  
**Last Updated**: May 11, 2026  
**Maintainer**: Fused Gaming Dev Team
