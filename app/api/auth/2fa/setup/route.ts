/**
 * Two-Factor Authentication Setup Endpoint
 * POST /api/auth/2fa/setup
 * Generates TOTP secret and QR code
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';

// Using speakeasy for TOTP generation
// TODO: Add speakeasy dependency for production

export async function POST(request: NextRequest) {
  try {
    const session = await getAuth();

    if (!session?.user) {
      return NextResponse.json(
        {
          error: 'UNAUTHORIZED',
          message: 'Not authenticated',
        },
        { status: 401 }
      );
    }

    // TODO: Generate TOTP secret using speakeasy
    // const secret = speakeasy.generateSecret({
    //   name: `VLN (${session.user.email})`,
    // });

    // For now, return placeholder
    const secret = 'JBSWY3DPEBLW64TMMQXDOYLEHIXQ';
    const qrCode = 'data:image/png;base64,...';

    return NextResponse.json(
      {
        secret,
        qrCode,
        message: 'Scan QR code with authenticator app',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[2FA Setup Error]', error);
    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: 'Failed to setup 2FA',
      },
      { status: 500 }
    );
  }
}
