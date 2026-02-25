/**
 * User Registration Endpoint
 * POST /api/auth/register
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(12, 'Password must be at least 12 characters')
    .regex(/[A-Z]/, 'Password must contain uppercase letter')
    .regex(/[a-z]/, 'Password must contain lowercase letter')
    .regex(/[0-9]/, 'Password must contain number')
    .regex(/[!@#$%^&*]/, 'Password must contain special character'),
  name: z.string().min(1, 'Name is required').optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          details: validationResult.error.issues,
        },
        { status: 422 }
      );
    }

    const { email, password, name } = validationResult.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: 'CONFLICT',
          message: 'Email already registered',
        },
        { status: 409 }
      );
    }

    // Hash password (minimum 12 rounds as per ADR-001)
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name: name || undefined,
        passwordHash,
        role: 'CLIENT',
      },
    });

    // Create verification token for email verification
    const verificationToken = await prisma.verificationToken.create({
      data: {
        userId: user.id,
        token: crypto.getRandomValues(new Uint8Array(32)).toString(),
        type: 'EMAIL_VERIFICATION',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    });

    // TODO: Send welcome email with verification link
    // This will be handled by the transactional email service

    return NextResponse.json(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        message: 'Registration successful. Please verify your email.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Register Error]', error);
    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: 'Failed to register user',
      },
      { status: 500 }
    );
  }
}
