/**
 * Audit Request Page
 * /app/audits/request
 * Submit new audit request
 */

import { redirect } from 'next/navigation';
import { getAuth } from '@/lib/auth';
import AuditIntakeForm from '@/components/audits/AuditIntakeForm';

export const metadata = {
  title: 'Request Audit — VLN.gg',
  description: 'Submit your project for security auditing',
};

export default async function AuditRequestPage() {
  const session = await getAuth();

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Request an Audit
          </h1>
          <p className="text-lg text-slate-400">
            Tell us about your project and we&apos;ll provide a comprehensive
            security assessment.
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <AuditIntakeForm />
        </div>

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800/30 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-2">Quick Response</h3>
            <p className="text-sm text-slate-400">
              Our team reviews requests within 24 hours and provides detailed
              quotes.
            </p>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-2">Expert Review</h3>
            <p className="text-sm text-slate-400">
              Elite security researchers with years of experience in gaming and
              blockchain.
            </p>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-2">Detailed Report</h3>
            <p className="text-sm text-slate-400">
              Comprehensive findings with actionable recommendations and risk
              assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
