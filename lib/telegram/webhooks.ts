import { telegramClient } from './client';
import { NotificationPayload, TelegramAPIResponse } from './types';

/**
 * Webhook handler utilities for Telegram notifications
 */

interface DeploymentWebhookPayload {
  deployment: {
    environment: string;
    ref: string;
    state?: string;
  };
  deployment_status?: {
    state: string;
    target_url?: string;
  };
  repository: {
    name: string;
    html_url: string;
  };
}

/**
 * Handle GitHub Actions webhook for deployments
 */
export async function handleDeploymentWebhook(
  payload: Record<string, unknown>
): Promise<TelegramAPIResponse> {
  if (!payload.deployment || !payload.repository) {
    return { ok: false, error_code: 400, description: 'Invalid payload structure' };
  }

  const { repository, deployment, deployment_status } = payload as unknown as DeploymentWebhookPayload;
  const status = deployment_status?.state || deployment?.state || 'unknown';

  const title = `Deployment: ${repository.name}`;
  const message = `
<b>Environment:</b> ${deployment.environment}
<b>Status:</b> ${status.toUpperCase()}
<b>Ref:</b> <code>${deployment.ref}</code>
<b>Branch:</b> ${deployment.ref.split('/').pop() || 'unknown'}
  `.trim();

  const url = deployment_status?.target_url || repository.html_url;
  const type = getNotificationType(status);

  const text = telegramClient.formatNotification(title, message, type, url);
  return telegramClient.sendMessage(text);
}

/**
 * Handle custom notification webhook
 */
export async function handleNotificationWebhook(
  payload: NotificationPayload
) {
  if (!payload.title || !payload.message) {
    return { ok: false, error: 'Missing required fields' };
  }

  const text = telegramClient.formatNotification(
    payload.title,
    payload.message,
    payload.type || 'info',
    payload.url
  );

  return telegramClient.sendMessage(text);
}

interface PushWebhookPayload {
  repository: {
    name: string;
    html_url: string;
  };
  pusher: {
    name: string;
  };
  ref: string;
  commits?: Array<{ id: string }>;
}

/**
 * Handle push webhook for code updates
 */
export async function handlePushWebhook(
  payload: Record<string, unknown>
): Promise<TelegramAPIResponse> {
  if (!payload.repository || !payload.pusher) {
    return { ok: false, error_code: 400, description: 'Invalid payload structure' };
  }

  const { repository, pusher, ref, commits } = payload as unknown as PushWebhookPayload;
  const branch = ref.split('/').pop();
  const commitCount = commits?.length || 0;

  const title = `📝 Push to ${repository.name}`;
  const message = `
<b>Branch:</b> <code>${branch}</code>
<b>Committer:</b> ${pusher.name}
<b>Commits:</b> ${commitCount}
  `.trim();

  const text = telegramClient.formatNotification(
    title,
    message,
    'info',
    repository.html_url
  );

  return telegramClient.sendMessage(text);
}

interface PullRequestWebhookPayload {
  pull_request: {
    number: number;
    title: string;
    html_url: string;
    user: {
      login: string;
    };
  };
  repository: {
    name: string;
  };
  action: string;
}

/**
 * Handle pull request webhook
 */
export async function handlePullRequestWebhook(
  payload: Record<string, unknown>
): Promise<TelegramAPIResponse> {
  if (!payload.pull_request || !payload.repository) {
    return { ok: false, error_code: 400, description: 'Invalid payload structure' };
  }

  const { pull_request, repository, action } = payload as unknown as PullRequestWebhookPayload;
  const type = action === 'opened' ? 'info' : 'warning';

  const title = `🔀 PR: ${action.toUpperCase()}`;
  const message = `
<b>Repository:</b> ${repository.name}
<b>PR:</b> #${pull_request.number}
<b>Title:</b> ${pull_request.title}
<b>Author:</b> ${pull_request.user.login}
  `.trim();

  const text = telegramClient.formatNotification(
    title,
    message,
    type,
    pull_request.html_url
  );

  return telegramClient.sendMessage(text);
}

/**
 * Map GitHub status to notification type
 */
function getNotificationType(
  status: string
): 'deployment' | 'error' | 'warning' | 'info' | 'success' {
  switch (status?.toLowerCase()) {
    case 'success':
    case 'completed':
      return 'success';
    case 'failure':
    case 'error':
      return 'error';
    case 'pending':
    case 'in_progress':
      return 'info';
    default:
      return 'warning';
  }
}

/**
 * Validate incoming webhook payload (basic)
 */
export function validateWebhookPayload(
  payload: unknown
): payload is Record<string, unknown> {
  return payload !== null && typeof payload === 'object';
}

/**
 * Get webhook event type from headers
 */
export function getWebhookEventType(
  headers: Record<string, string>
): string | null {
  // GitHub sends event type in X-GitHub-Event header
  return headers['x-github-event'] || headers['x-event-type'] || null;
}
