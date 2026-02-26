/**
 * NextAuth.js Configuration
 * Handles authentication, sessions, and OAuth providers
 * Date: 2026-02-25
 * Reference: https://next-auth.js.org/configuration/options
 */

import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Extend NextAuth types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      role: string;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string | null;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Email/Password Authentication
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.passwordHash) {
          throw new Error('User not found or password not set');
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!passwordMatch) {
          throw new Error('Invalid password');
        }

        if (!user.emailVerified) {
          throw new Error('Please verify your email before logging in');
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),

    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),

    // GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = (user.id as unknown as string) || '';
        token.email = (user.email as unknown as string) || '';
        token.role = (user as unknown as Record<string, unknown>).role as string || 'CLIENT';
      }

      if (account) {
        token.accessToken = (account.access_token as unknown as string);
        token.provider = (account.provider as unknown as string);
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as unknown as Record<string, unknown>).id = token.id;
        (session.user as unknown as Record<string, unknown>).role = token.role;
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async signIn({ user, account }) {
      // Log security event
      if (account?.provider === 'credentials') {
        await prisma.activityLog.create({
          data: {
            userId: user.id,
            action: 'LOGIN',
            entity: 'User',
            entityId: user.id,
            ipAddress: 'unknown', // Should be extracted from request
          },
        }).catch((err: unknown) => console.error('Failed to log login:', err));
      } else if (account?.provider) {
        // OAuth login
        await prisma.activityLog.create({
          data: {
            userId: user.id,
            action: 'OAUTH_LOGIN',
            entity: 'User',
            entityId: user.id,
            newValues: { provider: account.provider },
          },
        }).catch((err: unknown) => console.error('Failed to log OAuth login:', err));
      }

      return true;
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  events: {
    async signOut({ token }) {
      // Log sign out
      if (token.id) {
        await prisma.activityLog.create({
          data: {
            userId: token.id as string,
            action: 'LOGOUT',
            entity: 'User',
            entityId: token.id as string,
          },
        }).catch((err: unknown) => console.error('Failed to log logout:', err));
      }
    },
  },

  debug: process.env.NODE_ENV === 'development',
};
