import { NextRequest, NextResponse } from 'next/server';

interface DocsWebhookPayload {
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  metadata: {
    version: string;
    component: string;
    github_repo: string;
    github_ref: string;
    docs_path: string;
    target_section: string;
  };
}

/**
 * POST /api/webhooks/docs
 * Receives documentation update notifications and triggers docs rebuild
 */
export async function POST(request: NextRequest) {
  try {
    // Verify API token
    const authHeader = request.headers.get('Authorization');
    const apiToken = process.env.DOCS_WEBHOOK_TOKEN;

    if (!apiToken) {
      return NextResponse.json(
        { error: 'Docs webhook not configured' },
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

    const payload: DocsWebhookPayload = await request.json();

    // Validate required fields
    if (
      !payload.title ||
      !payload.message ||
      !payload.metadata?.version ||
      !payload.metadata?.github_repo ||
      !payload.metadata?.github_ref ||
      !payload.metadata?.docs_path ||
      !payload.metadata?.target_section
    ) {
      return NextResponse.json(
        { error: 'Missing required metadata fields' },
        { status: 400 }
      );
    }

    // Trigger GitHub Actions workflow
    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      return NextResponse.json(
        { error: 'GitHub token not configured' },
        { status: 503 }
      );
    }

    const workflowDispatchResponse = await fetch(
      'https://api.github.com/repos/fused-gaming/vln/actions/workflows/update-docs-section.yml/dispatches',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${githubToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          ref: 'integration/vln',
          inputs: {
            source_repo: payload.metadata.github_repo,
            source_ref: payload.metadata.github_ref,
            source_path: payload.metadata.docs_path,
            target_section: payload.metadata.target_section,
            version: payload.metadata.version,
            component: payload.metadata.component,
          },
        }),
      }
    );

    if (!workflowDispatchResponse.ok) {
      const error = await workflowDispatchResponse.text();
      console.error('Failed to trigger workflow:', error);
      return NextResponse.json(
        { error: 'Failed to trigger docs build' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Docs build triggered',
      version: payload.metadata.version,
      section: payload.metadata.target_section,
      component: payload.metadata.component,
    });
  } catch (error) {
    console.error('Docs webhook error:', error);
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
 * GET /api/webhooks/docs
 * Health check endpoint
 */
export async function GET() {
  const hasToken = !!process.env.DOCS_WEBHOOK_TOKEN;
  const hasGitHubToken = !!process.env.GITHUB_TOKEN;

  return NextResponse.json({
    status: 'ok',
    service: 'docs-webhook',
    configured: hasToken && hasGitHubToken,
    timestamp: new Date().toISOString(),
  });
}
