# Telegram Webhook Notifications Setup Guide

This guide walks through setting up Telegram notifications for VLN deployments and events.

## Overview

The Telegram notification system provides:
- **Real-time deployment updates** via GitHub webhooks
- **Custom API endpoint** for sending notifications
- **Secure token-based authentication**
- **HTML-formatted messages** with emojis and links

## Prerequisites

- A Telegram account
- A private Telegram chat or channel to receive notifications
- GitHub Actions access to configure secrets

## Step 1: Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/start` and follow the prompts
3. Send `/newbot`
4. Choose a bot name (e.g., "VLN Notifications Bot")
5. Copy the **Bot Token** (e.g., `123456789:ABCDefghijklmnopQRSTuvWXYZ-AbCdEFgh`)

## Step 2: Get Your Chat ID

### For Private Chat (Recommended)
1. Open Telegram and start a direct message with your bot
2. Send any message
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Replace `<YOUR_BOT_TOKEN>` with your actual token
4. Look for `"chat"."id"` in the JSON response
5. Save this as your **Chat ID** (e.g., `123456789`)

### For Group Chat
1. Add your bot to the group
2. Send a message mentioning your bot: `@YourBotName`
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Find the group's Chat ID (negative number like `-1001234567890`)

### For Channel
1. Add your bot as an admin in the channel
2. Send a message in the channel
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Find the channel's Chat ID (negative number)

## Step 3: Configure Environment Variables

### Local Development (`.env.local`)

```bash
# Copy from .env.example
cp .env.example .env.local

# Edit and fill in:
TELEGRAM_BOT_TOKEN=123456789:ABCDefghijklmnopQRSTuvWXYZ-AbCdEFgh
TELEGRAM_CHAT_ID=123456789
TELEGRAM_API_TOKEN=$(openssl rand -base64 32)
PERALTA_GITHUB_WEBHOOK_SECRET=$(openssl rand -base64 32)
```

### Production (GitHub Secrets)

Configure these secrets in your GitHub repository:

1. Go to **Settings → Secrets and variables → Actions**
2. Add these secrets:

| Secret Name | Value |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Your Telegram bot token |
| `TELEGRAM_CHAT_ID` | Your Telegram chat ID |
| `TELEGRAM_API_TOKEN` | Generated with `openssl rand -base64 32` |
| `TELEGRAM_WEBHOOK_URL` | `https://yourdomain.com/api/webhooks/telegram` |
| `TELEGRAM_NOTIFICATION_API_URL` | `https://yourdomain.com/api/notifications/telegram` |
| `PERALTA_GITHUB_WEBHOOK_SECRET` | Generated with `openssl rand -base64 32` |

## Step 4: Set Up GitHub Webhook

### Method 1: GitHub Actions (Recommended)

The `notify-telegram.yml` workflow triggers automatically on:
- Push to `main` or `integration/vln`
- Pull requests (opened, closed, synchronized)
- Deployment status changes

### Method 2: GitHub Repository Webhook

1. Go to **Settings → Webhooks → Add webhook**
2. Configure:
   - **Payload URL**: `https://yourdomain.com/api/webhooks/telegram`
   - **Content type**: `application/json`
   - **Secret**: Your `GITHUB_WEBHOOK_SECRET`
   - **Events**: Select:
     - `Deployments`
     - `Pushes`
     - `Pull requests`
3. Click **Add webhook**

## Step 5: Test the Setup

### Test 1: Direct Telegram API
```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{
    "chat_id": "<YOUR_CHAT_ID>",
    "text": "<b>Test Notification</b>\n\nVLN Telegram integration is working!",
    "parse_mode": "HTML"
  }'
```

### Test 2: VLN Webhook Receiver
```bash
curl -X POST "http://localhost:3000/api/webhooks/telegram" \
  -H "Content-Type: application/json" \
  -H "X-GitHub-Event: push" \
  -d '{
    "repository": {
      "name": "vln",
      "html_url": "https://github.com/fused-gaming/vln"
    },
    "pusher": {
      "name": "Test User"
    },
    "ref": "refs/heads/main",
    "commits": [{"id": "abc123"}]
  }'
```

### Test 3: Notification API
```bash
curl -X POST "http://localhost:3000/api/notifications/telegram" \
  -H "Authorization: Bearer YOUR_TELEGRAM_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Notification",
    "message": "This is a test message from VLN",
    "type": "info",
    "url": "https://vln.gg"
  }'
```

## Usage Examples

### Sending Custom Notifications

```bash
# From CI/CD pipeline or external service
curl -X POST "https://yourdomain.com/api/notifications/telegram" \
  -H "Authorization: Bearer $TELEGRAM_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Audit Complete",
    "message": "Smart contract audit for client XYZ completed successfully",
    "type": "success",
    "url": "https://vln.gg/reports/xyz",
    "metadata": {
      "client": "XYZ",
      "auditor": "Security Team"
    }
  }'
```

### Notification Types
- `success` - ✅ Green indicator for successful operations
- `error` - ❌ Red indicator for failures
- `warning` - ⚠️ Yellow indicator for warnings
- `info` - ℹ️ Blue indicator for informational messages
- `deployment` - 🚀 Purple indicator for deployments

## Troubleshooting

### Bot Doesn't Send Messages
1. Verify Chat ID is correct: `https://api.telegram.org/bot<TOKEN>/getUpdates`
2. Ensure bot is added to the chat/channel
3. Check bot permissions in the chat
4. Verify `TELEGRAM_BOT_TOKEN` is set correctly

### Webhook Not Triggering
1. Check GitHub Actions logs: **Actions → notify-telegram**
2. Verify secrets are set in GitHub repository
3. Test webhook manually with curl
4. Check VLN application logs: `pnpm dev` or deployment logs

### Message Formatting Issues
- HTML parsing is enabled by default
- Allowed tags: `<b>`, `<i>`, `<u>`, `<code>`, `<a>`
- Use `&` instead of `&` for special characters

## Security Best Practices

1. **Never commit secrets** to git
2. **Use GitHub Secrets** for production environment variables
3. **Rotate API tokens** regularly
4. **Verify webhook signatures** when using `GITHUB_WEBHOOK_SECRET`
5. **Limit webhook URLs** to trusted domains
6. **Monitor logs** for failed notification attempts

## Advanced Configuration

### Custom Message Formatting

Edit `lib/telegram/client.ts` to customize emoji and format:

```typescript
const emoji = {
  deployment: '🚀',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
  success: '✅',
}[type];
```

### Adding New Webhook Handlers

Add handlers in `lib/telegram/webhooks.ts` and route in `app/api/webhooks/telegram/route.ts`:

```typescript
case 'your_event_type':
  result = await handleYourEventWebhook(payload);
  break;
```

## Support

For issues or questions:
1. Check logs: `docker logs vln` or GitHub Actions
2. Verify webhook URL is accessible
3. Test with curl commands above
4. Review Telegram Bot API docs: https://core.telegram.org/bots/api
