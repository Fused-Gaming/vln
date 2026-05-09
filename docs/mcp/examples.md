# MCP Integration Examples

Real-world examples of MCP workflows in VLN development.

## Example 1: Creating & Merging a Feature PR

**Scenario:** Add new API endpoint with database schema changes

**Workflow using MCP:**

```
1. Claude Code reads schema via Supabase
   - Inspects current database structure
   - Identifies required changes

2. Claude creates feature branch via GitHub
   - Branch: feature/new-endpoint
   - Based on: integration/vln

3. Claude modifies code
   - Updates TypeScript files
   - Creates database migration
   - Adds API endpoint

4. Claude generates migration via Supabase
   - Runs migration locally
   - Validates schema changes

5. Claude commits and pushes via GitHub
   - Commits with conventional message
   - Pushes to feature branch

6. Claude creates PR via GitHub
   - Base: integration/vln
   - Includes description and testing notes

7. Claude watches PR activity via GitHub
   - Monitors CI/CD checks
   - Responds to review comments
   - Makes requested changes

8. Claude merges via GitHub
   - Ensures all checks pass
   - Uses squash merge strategy

9. Claude deploys via Vercel
   - Verifies preview deployment
   - Watches build logs
   - Confirms no regressions
```

## Example 2: Email Campaign Management

**Scenario:** Send newsletter to VLN subscribers with performance tracking

**Workflow using MailerLite:**

```
1. Create campaign
   - Subject: "Monthly Security Report"
   - From: marketing@vln.gg
   - Template: Professional with branding

2. Add content
   - Security insights from month
   - Case studies and wins
   - Call-to-action: Book audit

3. Segment subscribers
   - Target: "Active Clients" segment
   - Exclude: Unsubscribed, bounced

4. Schedule delivery
   - Send: Next Monday 9 AM UTC
   - Timezone-based delivery enabled

5. Monitor campaign
   - Track opens and clicks
   - Identify top-performing sections
   - Note subscriber engagement

6. Follow-up automation
   - Trigger: Users who opened but didn't click
   - Action: Send follow-up email 3 days later
```

## Example 3: Database Migration & Deployment

**Scenario:** Add new features to VLN platform with schema changes

**Workflow using Supabase & Vercel:**

```
1. Inspect current schema
   - List all tables
   - Review foreign keys and constraints
   - Check existing migrations

2. Design new schema
   - Add new tables for feature
   - Update existing tables with new columns
   - Define relationships

3. Create and test migration
   - Generate migration file
   - Test locally with sample data
   - Verify no breaking changes

4. Deploy edge function
   - Write new business logic
   - Handle new table operations
   - Add error handling

5. Deploy to production
   - Push code to main branch via GitHub
   - Vercel auto-deploys
   - Monitor runtime logs
   - Verify database operations

6. Monitor performance
   - Check query performance
   - Review error logs
   - Monitor API response times
```

## Example 4: Scheduling & Meeting Management

**Scenario:** Set up founder meetup scheduling

**Workflow using Google Calendar & Calendly:**

```
1. Create Calendly booking page
   - Event type: "Founder Meetup"
   - Duration: 45 minutes
   - Availability: Tue-Thu, 2-5 PM

2. Check availability
   - Suggest times when Claude AND founder free
   - Use Google Calendar integration
   - Find 3-5 available slots

3. Book confirmed slots
   - Create calendar event
   - Auto-send confirmation email
   - Include Zoom/Meet link

4. Send follow-up
   - Email with agenda 24h before
   - Include calendar link
   - Add preparation notes

5. Track attendance
   - Monitor calendar RSVPs
   - Send reminder 1h before
   - Log outcomes for CRM
```

## Example 5: Infrastructure & Deployment Management

**Scenario:** Deploy new Cloudflare Worker for security checks

**Workflow using Cloudflare & GitHub:**

```
1. Create Worker code
   - Handle request validation
   - Check API authentication
   - Log security events

2. Push to GitHub
   - Create feature branch
   - Commit Worker code
   - Open PR for review

3. Test locally
   - Deploy test version
   - Verify routing and functionality
   - Check performance metrics

4. Deploy to production
   - Merge PR to main
   - GitHub Actions triggers deployment
   - Cloudflare Workers auto-deploys

5. Monitor deployment
   - Check Worker logs
   - Monitor request patterns
   - Alert on errors

6. Manage storage
   - Create KV namespace for caching
   - Store configuration values
   - Monitor namespace usage
```

## Example 6: Code Search & Analysis

**Scenario:** Find all references to deprecated API endpoint

**Workflow using GitHub:**

```
1. Search code across repo
   - Search: "/api/v1/deprecated"
   - Find all usages
   - Identify affected files

2. List affected files
   - Frontend imports
   - API route handlers
   - Tests to update

3. Create migration plan
   - Update each reference
   - Test changes
   - Ensure no broken links

4. Create PRs for fixes
   - One PR per logical change
   - Include clear descriptions
   - Link to deprecation notice

5. Monitor PR status
   - Ensure tests pass
   - Review code changes
   - Merge when approved
```

## Example 7: Performance Monitoring & Debugging

**Scenario:** Investigate API performance degradation

**Workflow using Vercel & Supabase:**

```
1. Check Vercel deployment logs
   - View build logs
   - Check runtime logs
   - Identify error patterns

2. Query Supabase logs
   - Check database query performance
   - Look for slow queries
   - Monitor connection pools

3. Analyze metrics
   - Compare before/after performance
   - Identify bottlenecks
   - Check resource usage

4. Make improvements
   - Optimize slow queries
   - Add caching layer
   - Refactor hot code paths

5. Deploy and verify
   - Push changes to GitHub
   - Verify build succeeds
   - Monitor new performance metrics
   - Confirm improvements
```

## Example 8: Bulk Operations & Automation

**Scenario:** Migrate 1000+ subscribers to new list in MailerLite

**Workflow:**

```
1. Query current list
   - Get all subscribers
   - Filter by criteria
   - Export list

2. Create new list
   - Name: "Enterprise Clients"
   - Add description
   - Set up automations

3. Import subscribers
   - Bulk import to new list
   - Map custom fields
   - Handle duplicates

4. Set up automations
   - Welcome sequence for new list
   - Segment by engagement
   - Schedule follow-ups

5. Monitor migration
   - Track import progress
   - Verify counts match
   - Test automated flows
   - Confirm no data loss
```

## Best Practices from Examples

1. **Test Before Production** – Always verify changes locally first
2. **Use Staging Environments** – Deploy to preview before main
3. **Monitor Continuously** – Watch logs and metrics after changes
4. **Document Changes** – Include clear descriptions in PRs
5. **Segment Carefully** – Always double-check who receives communications
6. **Rollback Ready** – Have plan B if deployment issues occur
7. **Automate Repetitive Tasks** – Use automation for scheduled operations
8. **Track Metrics** – Monitor impact of changes

---

For more details on specific tools, see [Tools Reference](./tools.md) and [Setup Guide](./setup.md).
