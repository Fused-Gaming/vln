import { TelegramAPIResponse, TelegramSendMessageRequest } from './types';

/**
 * Secure Telegram API client
 * Uses environment variables for token storage
 */
class TelegramClient {
  private token: string | null;
  private apiBase: string = 'https://api.telegram.org';
  private chatId: string | number | null;

  constructor() {
    this.token = process.env.TELEGRAM_BOT_TOKEN || null;
    this.chatId = process.env.TELEGRAM_CHAT_ID || null;
  }

  /**
   * Get the Telegram API URL
   */
  private getUrl(method: string): string {
    return `${this.apiBase}/bot${this.token}/${method}`;
  }

  /**
   * Send a message to the configured chat
   */
  async sendMessage(
    text: string,
    options?: Partial<TelegramSendMessageRequest>
  ): Promise<TelegramAPIResponse> {
    if (!this.token) {
      return {
        ok: false,
        error_code: 503,
        description: 'TELEGRAM_BOT_TOKEN is not configured',
      };
    }

    if (!this.chatId) {
      return {
        ok: false,
        error_code: 503,
        description: 'TELEGRAM_CHAT_ID is not configured',
      };
    }

    const payload: TelegramSendMessageRequest = {
      chat_id: this.chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      ...options,
    };

    try {
      const response = await fetch(this.getUrl('sendMessage'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Telegram API Error:', errorData);
        return {
          ok: false,
          error_code: response.status,
          description: errorData.description || 'Unknown error',
        };
      }

      return await response.json();
    } catch (error) {
      console.error('Telegram send error:', error);
      return {
        ok: false,
        error_code: 500,
        description: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  /**
   * Format a notification message with HTML markup
   */
  formatNotification(
    title: string,
    message: string,
    type: 'deployment' | 'error' | 'warning' | 'info' | 'success',
    url?: string
  ): string {
    const emoji = {
      deployment: '🚀',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
      success: '✅',
    }[type];

    let text = `<b>${emoji} ${title}</b>\n\n${message}`;

    if (url) {
      text += `\n\n<a href="${url}">View Details →</a>`;
    }

    return text;
  }

  /**
   * Verify webhook signature (if needed for security)
   * Currently a placeholder for future implementation
   */
  verifyWebhookSignature(
    signature: string,
    payload: string
  ): boolean {
    // Future: Implement HMAC verification when GitHub webhook secrets are used
    return true;
  }

  /**
   * Get chat ID (useful for testing)
   */
  getChatId(): string | number | null {
    return this.chatId;
  }

  /**
   * Check if client is configured
   */
  isConfigured(): boolean {
    return !!this.token && !!this.chatId;
  }
}

// Export singleton instance
export const telegramClient = new TelegramClient();

export default TelegramClient;
