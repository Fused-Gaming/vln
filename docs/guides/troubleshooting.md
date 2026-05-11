# MCP & Skill Framework Troubleshooting Guide

Solutions for common issues with VLN's MCP infrastructure and Skill Framework integration.

## Table of Contents

1. [MCP Server Issues](#mcp-server-issues)
2. [Authentication & Authorization](#authentication--authorization)
3. [Skill Execution Problems](#skill-execution-problems)
4. [Agent Orchestration Issues](#agent-orchestration-issues)
5. [Session & State Management](#session--state-management)
6. [Performance Issues](#performance-issues)
7. [Documentation & Integration](#documentation--integration)
8. [Getting Help](#getting-help)

## MCP Server Issues

### MCP Server Not Responding

**Symptoms**
- "Connection refused" errors
- Timeouts when calling MCP tools
- Skills fail to execute

**Solutions**

1. **Check server status**
   ```bash
   pnpm run mcp:health
   ```

2. **Verify configuration**
   ```bash
   cat .mcp/config.json | jq '.mcpServers'
   ```

3. **Check environment variables**
   ```bash
   # Verify all required tokens are set
   env | grep -E "GITHUB_TOKEN|VERCEL_TOKEN|etc"
   ```

4. **Review logs**
   ```bash
   tail -f .mcp/logs/server.log
   ```

5. **Restart MCP servers**
   ```bash
   pnpm run mcp:restart
   ```

### Individual Server Failures

#### GitHub Server
```bash
# Test connection
pnpm run mcp:test github

# Verify token
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user

# Check rate limits
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/rate_limit
```

#### Supabase Server
```bash
# Test connection
pnpm run mcp:test supabase

# Verify credentials
psql "postgresql://user:password@host/database" -c "SELECT 1"

# Check migrations
pnpm run db:migrate --status
```

#### Vercel Server
```bash
# Test connection
pnpm run mcp:test vercel

# Verify token
curl https://api.vercel.com/v2/user -H "Authorization: Bearer $VERCEL_TOKEN"
```

**Common Errors**

| Error | Cause | Solution |
|-------|-------|----------|
| `401 Unauthorized` | Invalid token | Refresh/regenerate token |
| `403 Forbidden` | Insufficient permissions | Add required permissions to token |
| `429 Too Many Requests` | Rate limited | Implement exponential backoff, wait for reset |
| `Connection timeout` | Server unreachable | Check network, verify firewall rules |

## Authentication & Authorization

### Invalid Token Error

**Symptoms**
```
Error: 401 Unauthorized - Invalid authentication token
```

**Solutions**

1. **Verify token format**
   ```bash
   # GitHub token should start with ghp_ or github_pat_
   echo $GITHUB_TOKEN | head -c 10
   
   # Vercel token should be a long alphanumeric string
   echo $VERCEL_TOKEN | wc -c
   ```

2. **Regenerate token**
   - GitHub: Settings → Developer settings → Personal access tokens
   - Vercel: Account settings → Tokens
   - Supabase: Project settings → API Keys

3. **Update environment**
   ```bash
   # Update .mcp/.env.local
   GITHUB_TOKEN=new_token_here
   
   # Reload configuration
   pnpm run mcp:restart
   ```

### Permission Denied Error

**Symptoms**
```
Error: 403 Forbidden - Insufficient permissions for this resource
```

**Solutions**

1. **Check token scopes**
   ```bash
   # For GitHub, verify token has required scopes
   curl -H "Authorization: token $GITHUB_TOKEN" \
        https://api.github.com/user/tokens/current
   ```

2. **Update token permissions**
   - GitHub: Regenerate token with required scopes
   - Vercel: Add permissions to token

3. **Required scopes**

   **GitHub**
   - `repo` - Repository access
   - `workflow` - GitHub Actions
   - `admin:repo_hook` - Webhooks
   - `user` - User information

   **Vercel**
   - deployments (read/write)
   - projects (read)
   - env (read/write)

## Skill Execution Problems

### Skill Not Found

**Symptoms**
```
Error: Skill 'my-skill' not found in registry
```

**Solutions**

1. **Verify skill registration**
   ```bash
   pnpm run mcp:skills:list | grep my-skill
   ```

2. **Check registry file**
   ```bash
   cat .mcp/skills/registry.json | jq '.skills[] | select(.id=="my-skill")'
   ```

3. **Verify file exists**
   ```bash
   ls -la .mcp/skills/my-skill.ts
   ```

4. **Reload registry**
   ```bash
   pnpm run mcp:skills:reload
   ```

### Skill Execution Timeout

**Symptoms**
```
Error: Skill execution timed out after 30000ms
```

**Solutions**

1. **Check skill implementation**
   - Look for infinite loops
   - Verify async/await usage
   - Check MCP server response times

2. **Increase timeout (if appropriate)**
   ```json
   // .mcp/config.json
   {
     "skills": {
       "executionTimeout": 60000
     }
   }
   ```

3. **Profile execution**
   ```bash
   pnpm run mcp:skills:profile my-skill --duration 5m
   ```

4. **Check MCP server delays**
   ```bash
   pnpm run mcp:health --verbose
   ```

### Skill Dependency Error

**Symptoms**
```
Error: Skill dependency 'other-skill' not satisfied
```

**Solutions**

1. **Check dependencies**
   ```bash
   cat .mcp/skills/registry.json | \
     jq '.skills[] | select(.id=="my-skill") | .dependencies'
   ```

2. **Verify dependency skill**
   ```bash
   pnpm run mcp:skills:list | grep other-skill
   ```

3. **Update registration**
   ```json
   // .mcp/skills/registry.json
   {
     "id": "my-skill",
     "dependencies": ["other-skill"],
     // ... other config
   }
   ```

### Skill Memory Error

**Symptoms**
```
Error: JavaScript heap out of memory
```

**Solutions**

1. **Increase Node memory**
   ```bash
   NODE_OPTIONS=--max-old-space-size=4096 pnpm run dev
   ```

2. **Check for memory leaks**
   ```bash
   pnpm run mcp:profile --heap
   ```

3. **Optimize skill**
   - Avoid storing large objects in memory
   - Clean up resources properly
   - Stream large files instead of loading in memory

## Agent Orchestration Issues

### Agents Not Communicating

**Symptoms**
- Agents timeout waiting for responses
- Messages don't reach other agents
- Orchestration stalls

**Solutions**

1. **Check agent health**
   ```bash
   pnpm run mcp:agents:health
   ```

2. **Verify mesh topology**
   ```bash
   pnpm run mcp:agents:topology
   ```

3. **Check message queue**
   ```bash
   pnpm run mcp:agents:queue --status
   ```

4. **Restart agents**
   ```bash
   pnpm run mcp:agents:restart
   ```

### Deadlock in Workflow

**Symptoms**
- Workflow hangs indefinitely
- No progress in task queue
- CPU at 100%

**Solutions**

1. **Identify deadlock**
   ```bash
   pnpm run mcp:orchestration:debug --workflow audit-workflow
   ```

2. **Check circular dependencies**
   ```bash
   pnpm run mcp:orchestration:validate audit-workflow
   ```

3. **Force timeout**
   ```bash
   # Workflow has default 1-hour timeout
   # Can be reduced in config
   ```

4. **Kill stuck workflow**
   ```bash
   pnpm run mcp:orchestration:cancel workflow-id
   ```

### State Sync Issues

**Symptoms**
```
Error: Failed to sync state with agent
```

**Solutions**

1. **Check SyncPulse health**
   ```bash
   pnpm run mcp:syncpulse:health
   ```

2. **Verify session persistence**
   ```bash
   ls -la .mcp/sessions/
   ```

3. **Reset session**
   ```bash
   pnpm run mcp:sessions:clear --id session-id
   ```

4. **Check network connectivity**
   ```bash
   netstat -an | grep ESTABLISHED | wc -l
   ```

## Session & State Management

### Session Not Persisting

**Symptoms**
- Session lost after restart
- State not available in new session
- Previous work not recovered

**Solutions**

1. **Check persistence configuration**
   ```bash
   cat .mcp/config.json | jq '.sessions.persistence'
   ```

2. **Verify storage directory**
   ```bash
   ls -la .mcp/sessions/
   # Should contain .json files
   ```

3. **Check disk space**
   ```bash
   df -h | grep "/"
   ```

4. **Restore from backup**
   ```bash
   pnpm run mcp:sessions:restore --backup backup-id
   ```

### Concurrent Session Conflicts

**Symptoms**
```
Error: Session locked by another process
```

**Solutions**

1. **Check active sessions**
   ```bash
   pnpm run mcp:sessions:list
   ```

2. **Kill stuck session**
   ```bash
   pnpm run mcp:sessions:kill --id session-id --force
   ```

3. **Increase lock timeout**
   ```json
   // .mcp/config.json
   {
     "sessions": {
       "lockTimeout": 10000
     }
   }
   ```

## Performance Issues

### Slow MCP Response Times

**Symptoms**
- 5-10 second delays on MCP calls
- High latency in skill execution
- UI becomes unresponsive

**Solutions**

1. **Profile performance**
   ```bash
   pnpm run mcp:profile --service github
   ```

2. **Check network latency**
   ```bash
   ping api.github.com
   traceroute api.github.com
   ```

3. **Enable caching**
   ```json
   // .mcp/config.json
   {
     "caching": {
       "enabled": true,
       "ttl": 300000
     }
   }
   ```

4. **Optimize queries**
   - Filter results server-side
   - Reduce data payload
   - Use pagination

### High Memory Usage

**Symptoms**
- Process using >1GB RAM
- OOM kills after extended operation
- Gradual memory increase

**Solutions**

1. **Monitor memory**
   ```bash
   pnpm run mcp:monitor --metric memory
   ```

2. **Check for leaks**
   ```bash
   pnpm run mcp:profile --heap-snapshot
   ```

3. **Reduce buffer sizes**
   ```json
   {
     "buffers": {
       "maxSize": 10485760
     }
   }
   ```

4. **Enable garbage collection**
   ```bash
   NODE_OPTIONS=--expose-gc pnpm run dev
   ```

## Documentation & Integration

### Documentation Links Broken

**Symptoms**
- 404 errors when following docs
- Dead links in navigation
- Missing file references

**Solutions**

1. **Validate links**
   ```bash
   pnpm run docs:validate
   ```

2. **Check file structure**
   ```bash
   ls -la docs/
   ```

3. **Update broken links**
   - Search for outdated paths
   - Update to new structure
   - Test navigation

4. **Regenerate index**
   ```bash
   pnpm run docs:index:generate
   ```

### Documentation Out of Sync

**Symptoms**
- Docs don't match current code
- API examples don't work
- Configuration examples outdated

**Solutions**

1. **Run sync tool**
   ```bash
   pnpm run docs:sync
   ```

2. **Manual update**
   - Review changed code
   - Update examples
   - Test in real environment

3. **Set up auto-sync**
   ```bash
   # Enable in GitHub Actions
   # Runs daily at 2 AM UTC
   ```

## Getting Help

### Debugging Steps

1. **Collect information**
   ```bash
   pnpm run mcp:debug --collect
   ```

2. **Generate diagnostic report**
   ```bash
   pnpm run mcp:debug --report
   # Creates debug-report-DATE.zip
   ```

3. **Check logs**
   ```bash
   tail -100 .mcp/logs/*.log
   ```

### Reporting Issues

When filing a GitHub issue, include:

1. **Steps to reproduce**
2. **Expected behavior**
3. **Actual behavior**
4. **Error messages**
5. **Environment info**
   ```bash
   pnpm run mcp:debug --env
   ```
6. **Relevant logs**

### Support Channels

- **Documentation**: See [Integration Guide](./integration-guide.md)
- **Issues**: [GitHub Issues](https://github.com/fused-gaming/vln/issues)
- **Discussions**: [GitHub Discussions](https://github.com/fused-gaming/vln/discussions)
- **Email**: support@vln.gg

---

**Last Updated**: May 11, 2026  
**Version**: 1.0.0
