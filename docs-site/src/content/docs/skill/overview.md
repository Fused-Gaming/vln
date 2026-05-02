---
title: Skill-MCP Overview
description: Fused Gaming MCP - Model Context Protocol server with 19 specialized skills
---

# Skill-MCP (Fused Gaming MCP)

**Skill-MCP** is a production-ready Model Context Protocol server built with TypeScript and Node.js, extending Claude's capabilities through a modular ecosystem of 19 specialized skills for creative, development, and automation workflows.

## What is Skill-MCP?

Skill-MCP provides AI-powered tools for:

- **Creative & Design** - Generative art, UI/UX systems, wireframing
- **Development & Infrastructure** - MCP server scaffolding, deployment validation
- **Content & Narrative** - Character building, world creation, storytelling
- **Automation** - Workflow orchestration, task automation

## Core Technologies

- **Node.js** ≥ 20.0.0
- **TypeScript** 5.3.2+
- **npm** ≥ 8.0.0
- **License:** Apache 2.0

## Skills Catalog (19 Total)

### Published Skills (11 packages)

**Creative & Design:**
- Algorithmic Art - Procedural generation using p5.js
- Canvas Design - Visual design tool
- Theme Factory - Design system generation
- SVG Generation - Vector graphics creation
- Mobile Wireframe - Mobile-first UI prototyping

**Development:**
- MCP Builder - Create custom MCP servers
- Pre-Deployment Validator - Validation before deployment
- Skill Creator - Build new skills framework

**Content:**
- Underworld Writer - Narrative and storytelling
- ASCII Mockup - ASCII art generation
- CLI - Command-line interface tools

### In Development (9+ skills)

- Mermaid Terminal - Diagram generation
- UX Journey Mapping - User experience flows
- Project Management - Task and timeline tracking
- Session Tracking - State management
- Daily Review - Reflection and analysis
- LinkedIn Automation - Social media integration
- And more...

## Installation

### Option 1: Interactive Setup

```bash
npm install -g fused-gaming-mcp
fused-gaming-mcp setup
# Follow guided setup wizard
```

### Option 2: Manual Installation

```bash
# Clone repository
git clone https://github.com/Fused-Gaming/Fused-Gaming-Skill-MCP.git
cd Fused-Gaming-Skill-MCP

# Install dependencies
npm install

# Start MCP server
npm start
```

### Option 3: Install Individual Skills

```bash
# Install from npm scope
npm install @h4shed/mcp-algorithmic-art
npm install @h4shed/mcp-theme-factory
npm install @h4shed/mcp-skill-creator
# ... and more
```

## Quick Start

```bash
# Install
npm install

# Start server
npm start

# Server runs on default port
# Ready to accept MCP connections

# In Claude Code or your MCP client:
# Connect to localhost:<port>
```

## Architecture

```
Skill-MCP Server (Node.js + TypeScript)
├── MCP Protocol Handler
├── Skill Registry
├── Skills (19 total)
│   ├── Creative Skills
│   ├── Development Skills
│   └── Content Skills
├── Authentication
├── State Management
└── API Interface
```

## Available Skills

### Algorithmic Art
Generate procedural artwork using p5.js algorithms

```typescript
const art = await skillMcp.algorithmicArt.generate({
  type: 'fractal',
  complexity: 7,
  palette: 'vibrant'
});
```

### Theme Factory
Create complete design systems automatically

```typescript
const theme = await skillMcp.themeFactory.generate({
  baseColor: '#a6c3a7',
  name: 'sage',
  includeComponents: true
});
```

### MCP Builder
Scaffold and build custom MCP servers

```typescript
const server = await skillMcp.mcpBuilder.scaffold({
  name: 'my-mcp',
  description: 'Custom MCP server',
  skills: ['skill1', 'skill2']
});
```

### Skill Creator
Framework for creating new skills

```typescript
const newSkill = await skillMcp.skillCreator.create({
  name: 'my-skill',
  category: 'custom',
  description: 'My custom skill'
});
```

## Key Features

✅ **19 Specialized Skills** - Growing skill ecosystem  
✅ **Production Ready** - TypeScript, tested, documented  
✅ **Modular Design** - Use individual skills or full server  
✅ **Easy Integration** - Standard MCP protocol  
✅ **Active Development** - New skills constantly added  
✅ **Open Source** - Apache 2.0 licensed  

## Use Cases

### For Designers
- Generate design systems
- Create wireframes
- Build component libraries
- Automate design workflows

### For Developers  
- Scaffold MCP servers
- Validate deployments
- Generate code
- Build custom tools

### For Content Creators
- Character development
- Worldbuilding
- Story generation
- Narrative assistance

### For Automation
- Workflow orchestration
- Process automation
- Social media management
- Project tracking

## Next Steps

- [Getting Started](/docs/skill/getting-started) - Installation guide
- [Skill Reference](/docs/skill/skill-reference) - Complete skills catalog
- [API Reference](/docs/skill/api-reference) - API documentation
- [Integration Guide](/docs/skill/integration-guide) - How to integrate
- [GitHub Repository](https://github.com/Fused-Gaming/Fused-Gaming-Skill-MCP)
