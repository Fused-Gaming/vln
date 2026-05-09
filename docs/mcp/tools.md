# Available MCP Tools Reference

This document provides a comprehensive reference of all MCP tools available for VLN development.

## GitHub Tools

### Repository Management
- `list_repos` – List all accessible repositories
- `create_repository` – Create new repository
- `search_repositories` – Search for repositories

### Pull Requests
- `list_pull_requests` – List PRs for a repository
- `create_pull_request` – Create new PR with changes
- `update_pull_request` – Update PR title, description, state
- `merge_pull_request` – Merge PR with specified strategy
- `search_pull_requests` – Search for pull requests

### Code & Issues
- `list_issues` – List issues in repository
- `search_code` – Search code across repositories
- `get_file_contents` – Read file from repository
- `create_or_update_file` – Create or update file
- `delete_file` – Delete file from repository

### Reviews & Comments
- `pull_request_review_write` – Create/submit/delete reviews
- `add_issue_comment` – Comment on issue or PR
- `get_pull_comments` – Get all PR comments

### Branches & Commits
- `create_branch` – Create new branch
- `list_branches` – List branches
- `list_commits` – Get commit history
- `get_commit` – Get commit details

### Workflow & CI
- `subscribe_pr_activity` – Watch PR for activity
- `unsubscribe_pr_activity` – Stop watching PR
- `request_copilot_review` – Request AI review

## Supabase Tools

### Database Management
- `list_tables` – List all tables with optional verbose schema
- `execute_sql` – Run raw SQL queries
- `apply_migration` – Apply DDL migrations

### Type Generation
- `generate_typescript_types` – Generate TypeScript types from schema

### Edge Functions
- `list_edge_functions` – List all deployed functions
- `get_edge_function` – Get function source code
- `deploy_edge_function` – Deploy new/updated function

### Monitoring & Diagnostics
- `get_logs` – Get logs by service (api, postgres, edge-function, auth, storage, realtime)
- `get_advisors` – Get security and performance recommendations

### Project Management
- `list_projects` – List Supabase projects
- `get_project` – Get project details
- `get_project_url` – Get project API URL
- `get_publishable_keys` – Get API keys for client integration

## Vercel Tools

### Deployment Management
- `deploy_to_vercel` – Deploy current project
- `list_deployments` – List all deployments
- `get_deployment` – Get deployment details

### Build & Logs
- `get_deployment_build_logs` – Get build logs for deployment
- `get_runtime_logs` – Get runtime logs with filtering

### Access & Preview
- `get_access_to_vercel_url` – Get shareable preview link
- `web_fetch_vercel_url` – Fetch protected Vercel deployment

## MailerLite Tools

### Campaign Management
- `create_campaign` – Create email campaign
- `update_campaign` – Update campaign details
- `schedule_campaign` – Schedule campaign delivery
- `cancel_campaign` – Cancel scheduled campaign
- `get_campaign` – Get campaign details
- `list_campaigns` – List campaigns with filtering

### Subscribers
- `add_subscriber` – Add new subscriber
- `get_subscriber` – Get subscriber details
- `update_subscriber` – Update subscriber information
- `delete_subscriber` – Remove subscriber
- `list_subscribers` – List all subscribers
- `get_subscriber_activity` – Get subscriber activity history

### Groups & Segmentation
- `create_group` – Create subscriber group
- `delete_group` – Delete group
- `update_group` – Rename group
- `assign_subscriber_to_group` – Add subscriber to group
- `unassign_subscriber_from_group` – Remove from group

### Segments
- `create_segment` – Create audience segment
- `get_segment` – Get segment details
- `update_segment` – Update segment name
- `delete_segment` – Delete segment
- `get_segment_subscribers` – List subscribers in segment
- `list_segments` – List all segments

### Automation
- `create_automation` – Create automation workflow
- `list_automations` – List automations
- `delete_automation` – Delete automation
- `build_custom_automation` – Validate and design automation
- `send_test_automation` – Send test email
- `dry_run_automation` – Simulate automation flow
- `get_automation_activity` – Get automation activity logs

### Forms
- `create_form` – Create signup form
- `get_form` – Get form details
- `update_form` – Update form name
- `delete_form` – Delete form
- `get_form_subscribers` – List subscribers from form
- `list_forms` – List forms by type
- `list_form_templates` – Browse form templates

### Custom Fields
- `create_field` – Create custom field
- `update_field` – Rename field
- `delete_field` – Delete field
- `list_fields` – List all fields

### Webhooks
- `create_webhook` – Create webhook
- `get_webhook` – Get webhook details
- `update_webhook` – Update webhook
- `delete_webhook` – Delete webhook
- `list_webhooks` – List all webhooks

## Cloudflare Tools

### KV Storage
- `kv_namespace_create` – Create KV namespace
- `kv_namespace_get` – Get namespace details
- `kv_namespace_update` – Update namespace name
- `kv_namespace_delete` – Delete namespace
- `kv_namespaces_list` – List all namespaces

### R2 Object Storage
- `r2_bucket_create` – Create R2 bucket
- `r2_bucket_get` – Get bucket details
- `r2_bucket_delete` – Delete bucket
- `r2_buckets_list` – List all buckets

### D1 Database
- `d1_database_create` – Create D1 database
- `d1_database_get` – Get database details
- `d1_database_query` – Execute SQL queries
- `d1_database_delete` – Delete database
- `d1_databases_list` – List all databases

### Hyperdrive
- `hyperdrive_configs_list` – List Hyperdrive configs
- `hyperdrive_config_get` – Get config details
- `hyperdrive_config_edit` – Update Hyperdrive config
- `hyperdrive_config_delete` – Delete config

### Workers
- `workers_list` – List all Workers
- `workers_get_worker` – Get Worker details
- `workers_get_worker_code` – Get Worker source code

### Account Management
- `accounts_list` – List Cloudflare accounts
- `set_active_account` – Set active account for operations

## Google Calendar Tools

### Event Management
- `create_event` – Create calendar event
- `update_event` – Update event details
- `delete_event` – Delete event
- `get_event` – Get event details
- `list_events` – List events with date filtering

### Scheduling & Availability
- `suggest_time` – Find available time slots
- `respond_to_event` – Accept/decline/tentatively accept event

### Calendar Information
- `list_calendars` – List all accessible calendars

## Calendly Tools

### Meeting Scheduling
- *(Requires OAuth authentication)*
- Event availability management
- Booking link creation
- Schedule automation

---

## Tool Categories by Workflow

### Website Development
- GitHub: PRs, code search, commits
- Vercel: Deployments, build logs
- Supabase: Database operations, edge functions
- MailerLite: Email integration (if applicable)

### Database Development
- Supabase: Schema, migrations, queries, functions
- Cloudflare D1: Alternative database operations

### Content & Marketing
- MailerLite: Campaigns, segments, automations
- GitHub: Blog content management

### Infrastructure & DevOps
- Vercel: Deployments and monitoring
- Cloudflare: Workers, KV, R2, D1
- Supabase: Database and function deployment

---

For detailed usage of specific tools, see [Examples](./examples.md) and [Setup Guide](./setup.md).
