/**
 * Audit Intake Endpoint
 * POST /api/audits/intake
 * Accepts new audit requests from users
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';
import { z } from 'zod';

const auditIntakeSchema = z.object({
  projectName: z
    .string()
    .min(3, 'Project name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  serviceType: z.enum([
    'SMART_CONTRACT_AUDIT',
    'PLATFORM_SECURITY_AUDIT',
    'RNG_ANALYSIS',
    'WALLET_FLOW_RISK_ASSESSMENT',
    'API_SECURITY_REVIEW',
    'CUSTOM_ASSESSMENT',
  ]),
  scope: z.object({
    contracts: z.array(z.string()).optional(),
    lines_of_code: z.number().optional(),
    description: z.string().optional(),
  }),
  priority: z
    .enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
    .default('MEDIUM')
    .optional(),
  attachmentUrls: z.array(z.string().url()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getAuth();

    if (!session?.user) {
      return NextResponse.json(
        {
          error: 'UNAUTHORIZED',
          message: 'Must be authenticated to submit audit request',
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate input
    const validationResult = auditIntakeSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          details: validationResult.error.issues,
        },
        { status: 422 }
      );
    }

    const { projectName, description, serviceType, scope, priority } =
      validationResult.data;

    // Estimate cost based on scope (simplified)
    const estimatedCost = calculateEstimatedCost(
      serviceType,
      scope.lines_of_code || 0
    );

    // Create audit request
    const audit = await prisma.auditRequest.create({
      data: {
        userId: (session.user as any).id,
        projectName,
        description,
        serviceType,
        scope: JSON.stringify(scope),
        scopeSize: scope.lines_of_code || 0,
        status: 'PENDING',
        priority: priority || 'MEDIUM',
        estimatedCost,
      },
    });

    // TODO: Create notification for internal team
    // TODO: Send confirmation email to user

    return NextResponse.json(
      {
        id: audit.id,
        projectName: audit.projectName,
        status: audit.status,
        priority: audit.priority,
        estimatedCost: audit.estimatedCost.toNumber(),
        createdAt: audit.createdAt,
        message: 'Audit request submitted successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Audit Intake Error]', error);
    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: 'Failed to submit audit request',
      },
      { status: 500 }
    );
  }
}

/**
 * Calculate estimated cost for audit
 * Based on service type and scope size
 */
function calculateEstimatedCost(
  serviceType: string,
  linesOfCode: number
): number {
  const baseRates: Record<string, number> = {
    SMART_CONTRACT_AUDIT: 5000,
    PLATFORM_SECURITY_AUDIT: 7500,
    RNG_ANALYSIS: 3000,
    WALLET_FLOW_RISK_ASSESSMENT: 2500,
    API_SECURITY_REVIEW: 4000,
    CUSTOM_ASSESSMENT: 5000,
  };

  const baseRate = baseRates[serviceType] || 5000;
  const scopeMultiplier = Math.max(1, Math.ceil(linesOfCode / 1000));

  return baseRate * scopeMultiplier;
}
