/**
 * NextAuth.js API Route Handler
 * Handles all authentication endpoints: login, logout, callback, etc.
 * Date: 2026-02-25
 */

import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
