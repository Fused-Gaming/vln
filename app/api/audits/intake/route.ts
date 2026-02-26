/**
 * Audit Intake Endpoint
 * Allows authenticated users to submit new audit requests
 * Validates scope and service type
 * Date: 2026-02-25
 */

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';
import type { AuditServiceType, AuditStatus, AuditPriority } from '@prisma/client';

interface AuditIntakeRequest {
  projectName: string;
  description: string;
  serviceType: string;
  scope: {
    contracts?: string[];
    files?: string[];
    lineOfCode?: number;
    customScope?: string;
  };
  teamId?: string;
}

const VALID_SERVICE_TYPES = [
  'SMART_CONTRACT_AUDIT',
  'PLATFORM_SECURITY_AUDIT',
  'RNG_ANALYSIS',
  'WALLET_FLOW_RISK_ASSESSMENT',
  'API_SECURITY_REVIEW',
  'CUSTOM_ASSESSMENT',
];

// Pricing model (can be enhanced with dynamic pricing)
function estimateAuditCost(serviceType: string, scope: Record<string, unknown>): number {
  const basePricing: Record<string, number> = {
    SMART_CONTRACT_AUDIT: 25000,
    PLATFORM_SECURITY_AUDIT: 35000,
    RNG_ANALYSIS: 15000,
    WALLET_FLOW_RISK_ASSESSMENT: 12000,
    API_SECURITY_REVIEW: 20000,
    CUSTOM_ASSESSMENT: 30000,
  };

  let cost = basePricing[serviceType] || 30000;

  // Adjust for scope size
  const lineOfCode = scope.lineOfCode as number | undefined;
  if (lineOfCode && lineOfCode > 10000) {
    cost += Math.ceil((lineOfCode - 10000) / 1000) * 500;
  }

  return cost;
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token || !token.sub) {
      return NextResponse.json(
        { error: 'UNAUTHORIZED', message: 'User not authenticated' },
        { status: 401 }
      );
    }

    const userId = token.sub;

    // Parse request body
    const body: AuditIntakeRequest = await request.json();
    const { projectName, description, serviceType, scope, teamId } = body;

    // Validation
    const errors: string[] = [];

    if (!projectName || projectName.trim().length < 3) {
      errors.push('Project name must be at least 3 characters');
    }

    if (!description || description.trim().length < 10) {
      errors.push('Description must be at least 10 characters');
    }

    if (!VALID_SERVICE_TYPES.includes(serviceType)) {
      errors.push(`Invalid service type. Must be one of: ${VALID_SERVICE_TYPES.join(', ')}`);
    }

    if (!scope || (typeof scope !== 'object')) {
      errors.push('Scope is required and must be an object');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'VALIDATION_ERROR', details: errors },
        { status: 422 }
      );
    }

    // Type-safe cast for validated serviceType
    const validatedServiceType = serviceType as unknown as string;

    // Verify user exists and is CLIENT or MANAGER
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'NOT_FOUND', message: 'User not found' },
        { status: 404 }
      );
    }

    // Verify team access if teamId provided
    if (teamId) {
      const teamMember = await prisma.teamMember.findFirst({
        where: {
          teamId,
          userId,
        },
      });

      if (!teamMember) {
        return NextResponse.json(
          { error: 'FORBIDDEN', message: 'User is not a member of this team' },
          { status: 403 }
        );
      }
    }

    // Estimate cost
    const estimatedCost = estimateAuditCost(validatedServiceType, scope);

    // Calculate scope size
    const lineOfCode = scope.lineOfCode as number | undefined;
    const contracts = scope.contracts as string[] | undefined;
    const files = scope.files as string[] | undefined;
    const scopeSize = lineOfCode || (contracts?.length || 0) + (files?.length || 0);

    // Create audit request
    const auditRequest = await prisma.auditRequest.create({
      data: {
        userId,
        teamId: teamId || null,
        projectName: projectName.trim(),
        description: description.trim(),
        serviceType: validatedServiceType as AuditServiceType,
        scope: JSON.stringify(scope),
        scopeSize: scopeSize || 0,
        status: 'INTAKE' as AuditStatus,
        priority: 'MEDIUM' as AuditPriority,
        estimatedCost: estimatedCost,
      },
    });

    // Create notification
    await prisma.notification.create({
      data: {
        userId,
        auditId: auditRequest.id,
        type: 'AUDIT_CREATED',
        title: 'Audit Request Submitted',
        message: `Your audit request for "${projectName}" has been submitted successfully.`,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId,
        auditId: auditRequest.id,
        action: 'created',
        entity: 'AuditRequest',
        entityId: auditRequest.id,
        newValues: {
          projectName,
          serviceType,
          status: 'INTAKE',
        },
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      },
    });

    return NextResponse.json(
      {
        id: auditRequest.id,
        projectName: auditRequest.projectName,
        status: auditRequest.status,
        priority: auditRequest.priority,
        estimatedCost: estimatedCost,
        createdAt: auditRequest.createdAt,
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
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token || !token.sub) {
      return NextResponse.json(
        { error: 'UNAUTHORIZED', message: 'User not authenticated' },
        { status: 401 }
      );
    }

    const userId = token.sub;

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query
    const where: Record<string, unknown> = { userId };
    if (status) where.status = status;
    if (priority) where.priority = priority;

    // Fetch audit requests
    const auditRequests = await prisma.auditRequest.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    });

    // Count total
    const total = await prisma.auditRequest.count({ where });

    return NextResponse.json({
      data: auditRequests,
      pagination: {
        limit,
        offset,
        total,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error('[Get Audits Error]', error);

    return NextResponse.json(
      {
        error: 'SERVER_ERROR',
        message: 'Failed to fetch audit requests',
      },
      { status: 500 }
    );
  }
}
