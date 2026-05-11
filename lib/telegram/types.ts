/**
 * Telegram API Types for message notifications
 */

export interface TelegramUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
}

export interface TelegramChat {
  id: number;
  type: 'private' | 'group' | 'supergroup' | 'channel';
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}

export interface TelegramMessage {
  message_id: number;
  from?: TelegramUser;
  chat: TelegramChat;
  date: number;
  text?: string;
  reply_to_message?: TelegramMessage;
}

export interface TelegramUpdate {
  update_id: number;
  message?: TelegramMessage;
}

export interface TelegramSendMessageRequest {
  chat_id: number | string;
  text: string;
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
  reply_markup?: {
    inline_keyboard?: Array<Array<{ text: string; url: string }>>;
  };
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
}

export interface TelegramAPIResponse<T = Record<string, unknown>> {
  ok: boolean;
  result?: T;
  error_code?: number;
  description?: string;
}

export interface NotificationPayload {
  title: string;
  message: string;
  type: 'deployment' | 'error' | 'warning' | 'info' | 'success';
  url?: string;
  timestamp?: number;
  metadata?: Record<string, string | number | boolean>;
}
