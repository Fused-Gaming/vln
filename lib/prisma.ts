/**
 * Prisma Client Singleton
 * Ensures single instance across the application
 * Prevents connection pool exhaustion in serverless environments
 * Prisma 7.x compatible with PostgreSQL adapter
 * Date: 2026-02-25
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import postgres from 'postgres';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create connection pool for postgres
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/vln_dev';
const pool = postgres(connectionString);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaPg(pool),
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
