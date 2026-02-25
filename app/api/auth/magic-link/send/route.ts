/**
 * Magic Link Email Endpoint
 * POST /api/auth/magic-link/send
 * Sends passwordless login link via email
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const magicLinkSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = magicLinkSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          details: validationResult.error.issues,
        },
        { status: 422 }
      );
    }

    const { email } = validationResult.data;

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Create new user for magic link signup
      user = await prisma.user.create({
        data: {
          email,
          role: 'CLIENT',
        },
      });
    }

    // Create magic link token (15 minute expiry as per api-specification.md)
    const token = await prisma.verificationToken.create({
      data: {
        userId: user.id,
        token: crypto
          .getRandomValues(new Uint8Array(32))
          .toString(),
        type: 'MAGIC_LINK',
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      },
    });

    // TODO: Send magic link email
    // Email: ${process.env.NEXTAUTH_URL}/auth/magic-link/verify?token=${token.token}

    return NextResponse.json(
      {
        message: 'Magic link sent to email',
        expiresIn: 900, // 15 minutes in seconds
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Magic Link Send Error]', error);
    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: 'Failed to send magic link',
      },
      { status: 500 }
    );
  }
}
