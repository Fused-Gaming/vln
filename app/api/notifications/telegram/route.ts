import { NextRequest, NextResponse } from 'next/server';
import { telegramClient } from '@/lib/telegram';
import type { NotificationPayload } from '@/lib/telegram/types';

/**
 * POST /api/notifications/telegram
 * Send a custom notification to Telegram
 * Requires TELEGRAM_API_TOKEN in Authorization header
 */
export async function POST(request: NextRequest) {
  try {
    // Verify API token
    const authHeader = request.headers.get('Authorization');
    const apiToken = process.env.TELEGRAM_API_TOKEN;

    if (!apiToken) {
      return NextResponse.json(
        { error: 'API not configured' },
        { status: 503 }
      );
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid Authorization header' },
        { status: 401 }
      );
    }

    const token = authHeader.slice(7);
    if (token !== apiToken) {
      return NextResponse.json(
        { error: 'Invalid API token' },
        { status: 403 }
      );
    }

    const payload: NotificationPayload = await request.json();

    // Validate required fields
    if (!payload.title || !payload.message) {
      return NextResponse.json(
        { error: 'Missing required fields: title, message' },
        { status: 400 }
      );
    }

    // Validate type
    const validTypes = ['deployment', 'error', 'warning', 'info', 'success'];
    if (payload.type && !validTypes.includes(payload.type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Send notification
    const text = telegramClient.formatNotification(
      payload.title,
      payload.message,
      payload.type || 'info',
      payload.url
    );

    const result = await telegramClient.sendMessage(text);

    if (!result.ok) {
      console.error('Failed to send notification:', result);
      return NextResponse.json(
        { error: result.description || 'Failed to send notification' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Notification sent',
      messageId: result.result?.message_id,
    });
  } catch (error) {
    console.error('Notification error:', error);
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
 * GET /api/notifications/telegram
 * Health check endpoint
 */
export async function GET() {
  const hasBotToken = !!process.env.TELEGRAM_BOT_TOKEN;
  const hasChatId = !!process.env.TELEGRAM_CHAT_ID;

  return NextResponse.json({
    status: 'ok',
    service: 'telegram-notification',
    configured: hasBotToken && hasChatId,
    timestamp: new Date().toISOString(),
  });
}
