'use client';

/**
 * Audit Dashboard Component
 * Displays and manages audit requests in a data table
 */

import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  AlertCircle,
  Clock,
  CheckCircle,
  Zap,
} from 'lucide-react';

interface AuditData {
  id: string;
  projectName: string;
  clientEmail: string;
  clientName: string | null;
  serviceType: string;
  status: string;
  priority: string;
  estimatedCost: number;
  scopeSize: number;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  audits: AuditData[];
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/30',
  IN_PROGRESS: 'bg-blue-500/10 text-blue-700 border-blue-500/30',
  COMPLETED: 'bg-green-500/10 text-green-700 border-green-500/30',
  ISSUE: 'bg-red-500/10 text-red-700 border-red-500/30',
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  PENDING: <Clock className="w-4 h-4" />,
  IN_PROGRESS: <Zap className="w-4 h-4" />,
  COMPLETED: <CheckCircle className="w-4 h-4" />,
  ISSUE: <AlertCircle className="w-4 h-4" />,
};

const PRIORITY_COLORS: Record<string, string> = {
  LOW: 'text-green-600',
  MEDIUM: 'text-yellow-600',
  HIGH: 'text-orange-600',
  CRITICAL: 'text-red-600',
};

export default function AuditDashboard({ audits }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [sortField, setSortField] = useState<keyof AuditData>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filter and sort audits
  const filteredAudits = useMemo(() => {
    let result = audits;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (audit) =>
          audit.projectName.toLowerCase().includes(term) ||
          audit.clientEmail.toLowerCase().includes(term) ||
          audit.id.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter) {
      result = result.filter((audit) => audit.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter) {
      result = result.filter((audit) => audit.priority === priorityFilter);
    }

    // Sort
    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue);
      }

      return sortOrder === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    return result;
  }, [audits, searchTerm, statusFilter, priorityFilter, sortField, sortOrder]);

  const toggleSort = (field: keyof AuditData) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-4">
        {/* Search */}
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search by project name, client email, or audit ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Filter className="w-4 h-4 inline mr-2" />
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-colors"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="ISSUE">Issue</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Filter className="w-4 h-4 inline mr-2" />
              Priority
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-colors"
            >
              <option value="">All Priorities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-slate-400">
          Showing {filteredAudits.length} of {audits.length} audit requests
        </div>
      </div>

      {/* Table */}
      {filteredAudits.length > 0 ? (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">
                  <button
                    onClick={() => toggleSort('projectName')}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    Project
                    {sortField === 'projectName' && (
                      <ArrowUpDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">
                  <button
                    onClick={() => toggleSort('clientEmail')}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    Client
                    {sortField === 'clientEmail' && (
                      <ArrowUpDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">
                  Service Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">
                  <button
                    onClick={() => toggleSort('status')}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    Status
                    {sortField === 'status' && <ArrowUpDown className="w-4 h-4" />}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">
                  <button
                    onClick={() => toggleSort('priority')}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    Priority
                    {sortField === 'priority' && (
                      <ArrowUpDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">
                  <button
                    onClick={() => toggleSort('estimatedCost')}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    Est. Cost
                    {sortField === 'estimatedCost' && (
                      <ArrowUpDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">
                  <button
                    onClick={() => toggleSort('createdAt')}
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    Submitted
                    {sortField === 'createdAt' && (
                      <ArrowUpDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAudits.map((audit) => (
                <tr
                  key={audit.id}
                  className="border-b border-slate-700 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    {audit.projectName}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    <div>{audit.clientEmail}</div>
                    {audit.clientName && (
                      <div className="text-xs text-slate-500">{audit.clientName}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {audit.serviceType.replace(/_/g, ' ')}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${STATUS_COLORS[audit.status] || STATUS_COLORS.PENDING}`}>
                      {STATUS_ICONS[audit.status]}
                      {audit.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <span className={PRIORITY_COLORS[audit.priority]}>
                      {audit.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    ${audit.estimatedCost.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {new Date(audit.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-12 text-center">
          <p className="text-slate-400">No audit requests found</p>
        </div>
      )}
    </div>
  );
}
