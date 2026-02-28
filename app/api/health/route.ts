/**
 * Health Check Endpoint
 * Returns system status and version information
 * Used for monitoring and uptime checks
 * Date: 2026-02-25
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const now = new Date();
    const requestId = request.headers.get('x-request-id') || 'unknown';

    const healthStatus = {
      status: 'healthy',
      timestamp: now.toISOString(),
      version: '0.11.0',
      environment: process.env.NODE_ENV || 'production',
      uptime: process.uptime(),
      requestId,
      checks: {
        database: 'ok', // Will be enhanced when DB is connected
        api: 'ok',
      },
    };

    return NextResponse.json(healthStatus, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Request-ID': requestId,
      },
    });
  } catch (error) {
    console.error('[Health Check Error]', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}

export async function HEAD(request: NextRequest) {
  // Support HEAD requests for monitoring tools
  const response = await GET(request);
  return new NextResponse(null, { status: response.status, headers: response.headers });
}
