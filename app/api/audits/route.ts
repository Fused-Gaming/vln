/**
 * Audits List Endpoint
 * GET /api/audits
 * Returns paginated list of audits for authenticated user
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';
import { z } from 'zod';

const querySchema = z.object({
  status: z.string().optional(),
  priority: z.string().optional(),
  limit: z.coerce.number().int().positive().max(100).default(20),
  offset: z.coerce.number().int().nonnegative().default(0),
  sortBy: z.enum(['createdAt', 'updatedAt', 'priority']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getAuth();

    if (!session?.user) {
      return NextResponse.json(
        {
          error: 'UNAUTHORIZED',
          message: 'Must be authenticated',
        },
        { status: 401 }
      );
    }

    // Parse query parameters
    const url = new URL(request.url);
    const queryParams = {
      status: url.searchParams.get('status') || undefined,
      priority: url.searchParams.get('priority') || undefined,
      limit: url.searchParams.get('limit') || '20',
      offset: url.searchParams.get('offset') || '0',
      sortBy: url.searchParams.get('sortBy') || 'createdAt',
      sortOrder: url.searchParams.get('sortOrder') || 'desc',
    };

    const validationResult = querySchema.safeParse(queryParams);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          details: validationResult.error.issues,
        },
        { status: 422 }
      );
    }

    const { status, priority, limit, offset, sortBy, sortOrder } =
      validationResult.data;

    // Build filter
    const where: Record<string, unknown> = {
      userId: (session.user as { id: string }).id,
      deletedAt: null,
    };

    if (status) {
      where.status = status;
    }

    if (priority) {
      where.priority = priority;
    }

    // Fetch audits and total count
    const [audits, total] = await Promise.all([
      prisma.auditRequest.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      prisma.auditRequest.count({ where }),
    ]);

    return NextResponse.json(
      {
        data: audits.map((audit) => ({
          id: audit.id,
          projectName: audit.projectName,
          status: audit.status,
          priority: audit.priority,
          serviceType: audit.serviceType,
          estimatedCost: audit.estimatedCost.toNumber(),
          createdAt: audit.createdAt,
          updatedAt: audit.updatedAt,
        })),
        pagination: {
          limit,
          offset,
          total,
          hasMore: offset + limit < total,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Audits List Error]', error);
    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: 'Failed to fetch audits',
      },
      { status: 500 }
    );
  }
}
