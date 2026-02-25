/**
 * Session Validation Endpoint
 * Validates and returns current user session information
 * Used for frontend authentication state management
 * Date: 2026-02-25
 */

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.json(
        {
          error: 'UNAUTHORIZED',
          message: 'No active session',
        },
        { status: 401 }
      );
    }

    const sessionData = {
      user: {
        id: token.sub,
        email: token.email,
        name: token.name,
        role: token.role || 'CLIENT',
      },
      expiresAt: token.exp ? new Date((token.exp as number) * 1000).toISOString() : null,
      issuedAt: token.iat ? new Date((token.iat as number) * 1000).toISOString() : null,
    };

    return NextResponse.json(sessionData, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('[Session Error]', error);

    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: 'Failed to retrieve session',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // POST can be used to refresh session or perform logout
  try {
    const body = await request.json();

    if (body.action === 'refresh') {
      // Trigger session refresh/revalidation
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        return NextResponse.json(
          { error: 'UNAUTHORIZED', message: 'No active session' },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { message: 'Session refreshed', success: true },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'INVALID_REQUEST', message: 'Unknown action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('[Session POST Error]', error);

    return NextResponse.json(
      { error: 'SERVER_ERROR', message: 'Failed to process request' },
      { status: 500 }
    );
  }
}
