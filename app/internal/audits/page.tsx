/**
 * Internal Audit Dashboard
 * /app/internal/audits
 * View and manage all submitted audit requests
 */

import { redirect } from 'next/navigation';
import { getAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AuditDashboard from '@/components/internal/AuditDashboard';

export const metadata = {
  title: 'Audit Dashboard — VLN.gg',
  description: 'Manage audit requests and assignments',
};

export default async function InternalAuditDashboardPage() {
  const session = await getAuth();

  // Redirect if not authenticated or not admin
  if (!session?.user) {
    redirect('/auth/login');
  }

  // TODO: Implement role-based access control
  // Only admins and team members should access this

  // Fetch all audits with user information
  const audits = await prisma.auditRequest.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Transform data for component
  const auditData = audits.map((audit: typeof audits[number]) => ({
    id: audit.id,
    projectName: audit.projectName,
    clientEmail: audit.user.email,
    clientName: audit.user.name,
    serviceType: audit.serviceType,
    status: audit.status,
    priority: audit.priority,
    estimatedCost: audit.estimatedCost.toNumber(),
    scopeSize: audit.scopeSize,
    createdAt: audit.createdAt.toISOString(),
    updatedAt: audit.updatedAt.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Audit Requests</h1>
          <p className="text-slate-400">
            Manage and track all submitted audit requests
          </p>
        </div>

        {/* Dashboard Component */}
        <AuditDashboard audits={auditData} />
      </div>
    </div>
  );
}
