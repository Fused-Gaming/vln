import { NextRequest, NextResponse } from 'next/server';
import {
  getWebhookEventType,
  handleDeploymentWebhook,
  handlePullRequestWebhook,
  handlePushWebhook,
  validateWebhookPayload,
} from '@/lib/telegram';

/**
 * POST /api/webhooks/telegram
 * Receives GitHub webhooks and forwards notifications to Telegram
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret if configured
    const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = request.headers.get('x-hub-signature-256');
      if (!signature) {
        return NextResponse.json(
          { error: 'Missing webhook signature' },
          { status: 401 }
        );
      }
      // TODO: Verify HMAC signature
    }

    const headers = Object.fromEntries(
      Array.from(request.headers.entries())
    );
    const payload = await request.json();

    // Validate payload
    if (!validateWebhookPayload(payload)) {
      return NextResponse.json(
        { error: 'Invalid payload' },
        { status: 400 }
      );
    }

    const eventType = getWebhookEventType(headers, payload);

    if (!eventType) {
      return NextResponse.json(
        { error: 'Unknown event type' },
        { status: 400 }
      );
    }

    let result;

    // Route to appropriate handler
    switch (eventType) {
      case 'deployment':
        result = await handleDeploymentWebhook(payload);
        break;

      case 'deployment_status':
        result = await handleDeploymentWebhook(payload);
        break;

      case 'push':
        result = await handlePushWebhook(payload);
        break;

      case 'pull_request':
        result = await handlePullRequestWebhook(payload);
        break;

      default:
        return NextResponse.json(
          { message: `Webhook received but not handled: ${eventType}` },
          { status: 200 }
        );
    }

    if (!result.ok) {
      console.error('Failed to send notification:', result);
      const errorMsg = 'description' in result ? result.description : 'Failed to send notification';
      return NextResponse.json(
        { error: errorMsg },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Notification sent',
      event: eventType,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/webhooks/telegram
 * Health check endpoint
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ok',
    service: 'telegram-webhook-receiver',
    timestamp: new Date().toISOString(),
  });
}
