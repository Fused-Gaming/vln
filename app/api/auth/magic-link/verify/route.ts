/**
 * Magic Link Verification Endpoint
 * POST /api/auth/magic-link/verify
 * Verifies magic link token and creates session
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const verifySchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = verifySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          details: validationResult.error.issues,
        },
        { status: 422 }
      );
    }

    const { token } = validationResult.data;

    // Find verification token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.json(
        {
          error: 'NOT_FOUND',
          message: 'Invalid or expired token',
        },
        { status: 404 }
      );
    }

    // Check if token is expired
    if (verificationToken.expiresAt < new Date()) {
      return NextResponse.json(
        {
          error: 'UNAUTHORIZED',
          message: 'Token has expired',
        },
        { status: 401 }
      );
    }

    // Check if token is already used
    if (verificationToken.usedAt) {
      return NextResponse.json(
        {
          error: 'UNAUTHORIZED',
          message: 'Token has already been used',
        },
        { status: 401 }
      );
    }

    // Mark token as used
    await prisma.verificationToken.update({
      where: { id: verificationToken.id },
      data: { usedAt: new Date() },
    });

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: verificationToken.userId },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: 'NOT_FOUND',
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    // Verify email if not already verified
    if (!user.emailVerified) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    }

    // Create session token
    const sessionToken = crypto
      .getRandomValues(new Uint8Array(32))
      .toString();

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        token: sessionToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    return NextResponse.json(
      {
        token: session.token,
        expiresIn: 30 * 24 * 60 * 60, // 30 days in seconds
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Magic Link Verify Error]', error);
    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: 'Failed to verify magic link',
      },
      { status: 500 }
    );
  }
}
