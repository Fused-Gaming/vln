'use client';

/**
 * Audit Intake Form Component
 * Request form for security audits with scope definition
 * Follows VLN brand design standards
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  Loader2,
  FileUp,
  DollarSign,
  CheckCircle,
} from 'lucide-react';

type ServiceType =
  | 'SMART_CONTRACT_AUDIT'
  | 'PLATFORM_SECURITY_AUDIT'
  | 'RNG_ANALYSIS'
  | 'WALLET_FLOW_RISK_ASSESSMENT'
  | 'API_SECURITY_REVIEW'
  | 'CUSTOM_ASSESSMENT';

type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

const SERVICE_TYPES: { id: ServiceType; label: string; description: string }[] =
  [
    {
      id: 'SMART_CONTRACT_AUDIT',
      label: 'Smart Contract Audit',
      description: 'EVM contract security review',
    },
    {
      id: 'PLATFORM_SECURITY_AUDIT',
      label: 'Platform Security Audit',
      description: 'Comprehensive application security review',
    },
    {
      id: 'RNG_ANALYSIS',
      label: 'RNG Analysis',
      description: 'Random number generation verification',
    },
    {
      id: 'WALLET_FLOW_RISK_ASSESSMENT',
      label: 'Wallet Flow Risk Assessment',
      description: 'Wallet integration security analysis',
    },
    {
      id: 'API_SECURITY_REVIEW',
      label: 'API Security Review',
      description: 'REST/GraphQL API security audit',
    },
    {
      id: 'CUSTOM_ASSESSMENT',
      label: 'Custom Assessment',
      description: 'Tailored security assessment',
    },
  ];

export default function AuditIntakeForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    serviceType: '' as ServiceType,
    priority: 'MEDIUM' as Priority,
    scope: {
      lines_of_code: 0,
      description: '',
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.startsWith('scope_')) {
      const scopeKey = name.replace('scope_', '');
      setFormData((prev) => ({
        ...prev,
        scope: {
          ...prev.scope,
          [scopeKey]:
            scopeKey === 'lines_of_code' ? parseInt(value) || 0 : value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/audits/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to submit audit request');
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/audits/${data.id}`);
      }, 2000);
    } catch (err) {
      setError('An error occurred while submitting the request');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-2xl mx-auto py-12 text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Audit Request Submitted
        </h2>
        <p className="text-slate-400 mb-4">
          Thank you! Our team will review your request and contact you shortly.
        </p>
        <p className="text-sm text-slate-500">Redirecting to audit details...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 ${
                s <= step ? 'bg-green-500' : 'bg-slate-700'
              } ${s < 3 ? 'mr-2' : ''}`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-500">
          <span>Project Info</span>
          <span>Scope</span>
          <span>Review</span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Project Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Project Name *
              </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="e.g., StakingProtocol v2.0"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Project Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project, its purpose, and any specific security concerns..."
                rows={5}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-colors resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Service Type *
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-colors"
                required
              >
                <option value="">Select a service type</option>
                {SERVICE_TYPES.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.label}
                  </option>
                ))}
              </select>
              {formData.serviceType && (
                <p className="text-xs text-slate-400 mt-2">
                  {
                    SERVICE_TYPES.find((s) => s.id === formData.serviceType)
                      ?.description
                  }
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Scope Definition */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Estimated Lines of Code
              </label>
              <input
                type="number"
                name="scope_lines_of_code"
                value={formData.scope.lines_of_code}
                onChange={handleChange}
                placeholder="e.g., 5000"
                min="0"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-colors"
              />
              <p className="text-xs text-slate-400 mt-2">
                Helps us estimate audit scope and timeline
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Scope Description
              </label>
              <textarea
                name="scope_description"
                value={formData.scope.description}
                onChange={handleChange}
                placeholder="Specify which components, modules, or features should be included in the audit..."
                rows={5}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Priority Level
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as Priority[]).map(
                  (priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, priority }))
                      }
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        formData.priority === priority
                          ? 'bg-green-500 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {priority}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-6 bg-slate-700/50 rounded-lg p-6">
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">
                Project Name
              </h3>
              <p className="text-white">{formData.projectName}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">
                Service Type
              </h3>
              <p className="text-white">
                {
                  SERVICE_TYPES.find((s) => s.id === formData.serviceType)
                    ?.label
                }
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">
                Estimated Cost
              </h3>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <p className="text-xl font-bold text-white">
                  ${(5000 * Math.max(1, Math.ceil(formData.scope.lines_of_code / 1000))).toLocaleString()}
                </p>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Estimated based on scope size
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-1">
                Priority
              </h3>
              <p className="text-white font-medium">{formData.priority}</p>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mt-6">
              <p className="text-xs text-blue-300">
                ✓ By submitting this request, our team will review your project
                and provide an accurate quote within 24 hours.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-between pt-6">
          <button
            type="button"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white rounded-lg transition-colors"
          >
            Back
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(Math.min(3, step + 1))}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
