# Discord Webhook Integration

This document describes the Discord webhook integration for VLN CI/CD notifications.

---

## Overview

VLN uses Discord webhooks to send automated notifications for:
- **CI/CD Pipeline Results** - Build status, test results, and deployment notifications
- **Documentation Updates** - Automated documentation change notifications
- **Security Alerts** - Critical security verification failures

---

## Webhook Configuration

### Discord Server
- **Server**: VLN Security & Development
- **Invite**: [discord.gg/P5XuPyJJRN](https://discord.gg/P5XuPyJJRN)

### Current Webhook URL
```
https://discord.com/api/webhooks/1444218952329859073/vxCLYe1fp5VrNbIbTHh1IjXEIA1UXUB2rRNoajaNh_jCnOU60Hjy4vDeNavi6qC7C82w
```

**Note**: This webhook URL is stored as a GitHub Secret: `DISCORD_WEBHOOK_URL`

---

## Notification Types

### 1. CI/CD Pipeline Notifications
**Workflow**: `.github/workflows/ci.yml`

**Triggers**:
- Push to `main` or `integration/vln`
- Pull requests to `main` or `integration/vln`

**Notification Content**:
- ✅/❌ Overall pipeline status
- Individual job results (Security Audit, Lint, Build & Test)
- Branch and commit information
- Author information
- Link to workflow run

**Color Codes**:
- Green (5814783) - Success
- Red (15548997) - Failure

---

### 2. Documentation Update Notifications
**Workflow**: `.github/workflows/auto-update-docs.yml`

**Triggers**:
- Documentation changes merged to `main` or `integration/vln`

**Notification Content**:
- Branch and commit information
- Update status
- Author information
- Link to changes

---

### 3. Security Alert Notifications
**Workflow**: `.github/workflows/verify-signatures.yml`

**Triggers**:
- Security verification failures
- Invalid commit signatures
- Dependency integrity issues
- Code integrity violations

**Notification Content**:
- 🚨 Critical alert with @everyone mention
- Repository and branch information
- Failed check details
- Link to workflow run for investigation

**Note**: These alerts require immediate attention and will ping the entire team.

---

## GitHub Secret Setup

### Required Secret
To enable Discord notifications, configure the following GitHub Secret:

**Name**: `DISCORD_WEBHOOK_URL`
**Value**: Your Discord webhook URL

### How to Set Up

1. **Get Discord Webhook URL**:
   - Open Discord server settings
   - Go to Integrations → Webhooks
   - Click "New Webhook" or use existing
   - Copy the webhook URL

2. **Add to GitHub**:
   - Go to repository Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `DISCORD_WEBHOOK_URL`
   - Value: Paste the webhook URL
   - Click "Add secret"

---

## Message Format

All Discord notifications use the **Embed** format for rich, structured messages:

```json
{
  "embeds": [{
    "title": "Notification Title",
    "description": "Brief description",
    "color": 5814783,
    "fields": [
      {
        "name": "Field Name",
        "value": "Field Value",
        "inline": true
      }
    ],
    "footer": {
      "text": "VLN Bot Name"
    },
    "timestamp": "2025-11-29T12:00:00.000Z"
  }]
}
```

### Color Codes Used
- **5814783** (Sage Green) - Success, normal operations
- **15548997** (Red) - Failures, critical alerts

---

## Bot Identifiers

Each workflow uses a distinct bot identifier in the footer:

- **VLN CI/CD Bot** - CI/CD pipeline notifications
- **VLN Documentation Bot** - Documentation update notifications
- **VLN Security Bot** - Security alert notifications

This helps quickly identify the source of notifications.

---

## Testing Webhooks

To test the webhook integration:

1. **Manual Trigger**:
   - Go to Actions tab in GitHub
   - Select a workflow (e.g., "VLN CI/CD Pipeline")
   - Click "Run workflow"
   - Select branch and run

2. **Verify Discord**:
   - Check your Discord server
   - Notification should appear within seconds
   - Verify all fields are populated correctly

---

## Troubleshooting

### No Notifications Received

1. **Check GitHub Secret**:
   - Verify `DISCORD_WEBHOOK_URL` is set correctly
   - Ensure no extra spaces or characters

2. **Check Webhook URL**:
   - Test webhook URL using curl:
   ```bash
   curl -H "Content-Type: application/json" \
     -d '{"content": "Test message"}' \
     YOUR_WEBHOOK_URL
   ```

3. **Check Workflow Conditions**:
   - Notifications only trigger for `main` and `integration/vln` branches
   - Check if the workflow step executed (view workflow logs)

### Webhook URL Compromised

If the webhook URL is exposed:

1. **Revoke in Discord**:
   - Go to Server Settings → Integrations → Webhooks
   - Delete the compromised webhook

2. **Create New Webhook**:
   - Create a new webhook in Discord
   - Update GitHub Secret with new URL

3. **Test**:
   - Trigger a workflow to verify new webhook works

---

## Security Best Practices

1. **Never commit webhook URLs** to the repository
2. **Use GitHub Secrets** for all webhook URLs
3. **Rotate webhooks** if exposed or compromised
4. **Limit webhook permissions** to specific channels
5. **Monitor webhook usage** in Discord server settings

---

## Migration from Slack

This setup replaces the previous Slack webhook integration. Changes made:

1. Replaced `SLACK_WEBHOOK_URL` with `DISCORD_WEBHOOK_URL`
2. Replaced `SECURITY_SLACK_WEBHOOK` (merged into single Discord webhook)
3. Updated notification format from Slack blocks to Discord embeds
4. Maintained all notification types and triggers

---

## References

- [Discord Webhook Documentation](https://discord.com/developers/docs/resources/webhook)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Discord Embed Format](https://discord.com/developers/docs/resources/channel#embed-object)

---

**Last Updated**: 2025-11-29
**Maintained By**: VLN DevOps Team
**Contact**: info@vln.gg
