import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import MainLayout from '../components/layout/MainLayout';
import RAGStatusBadge from '../components/RAGStatusBadge';
import { ArrowLeft, Plus } from 'lucide-react';

export default function GCDetailPage() {
  const { gcId } = useParams();
  const navigate = useNavigate();
  const { getGeneralContractor, getGCSubcontractors, getSubPolicies } = useData();

  const gc = useMemo(() => getGeneralContractor(gcId), [gcId, getGeneralContractor]);
  const subs = useMemo(
    () => getGCSubcontractors(gcId),
    [gcId, getGCSubcontractors]
  );

  if (!gc) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-slate-600">Contractor not found</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/gcs')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{gc.companyName}</h2>
            <p className="text-slate-600 mt-1">Manage subcontractors and verify compliance</p>
          </div>
        </div>

        {/* GC Info Card */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Contractor Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-slate-600 mb-1">Contact Email</p>
              <p className="font-medium text-slate-900">{gc.contactEmail}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Contact Phone</p>
              <p className="font-medium text-slate-900">{gc.contactPhone}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">GL Requirement</p>
              <p className="font-medium text-slate-900">${(gc.glRequirement / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>

        {/* Subcontractors Section */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Subcontractors</h3>
            <p className="text-slate-600 text-sm mt-1">{subs.length} total</p>
          </div>
          <button
            onClick={() => navigate('/subs/new')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Add Subcontractor
          </button>
        </div>

        {/* Subcontractors Table */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Company</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Contact</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">W/C Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">GL Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {subs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                      No subcontractors yet. Add one to get started.
                    </td>
                  </tr>
                ) : (
                  subs.map(sub => {
                    const policies = getSubPolicies(sub.id);
                    const wcPolicy = policies.find(p => p.policyType === 'workers_comp');
                    const glPolicy = policies.find(p => p.policyType === 'general_liability');

                    const getRAG = (policy) => {
                      if (!policy) return 'red';
                      const daysLeft = Math.floor((new Date(policy.expirationDate) - new Date()) / (1000 * 60 * 60 * 24));
                      if (daysLeft <= 0) return 'red';
                      if (daysLeft <= 30) return 'yellow';
                      return 'green';
                    };

                    return (
                      <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-900">{sub.companyName}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">{sub.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <RAGStatusBadge status={getRAG(wcPolicy)} size="sm" />
                        </td>
                        <td className="px-6 py-4">
                          <RAGStatusBadge status={getRAG(glPolicy)} size="sm" />
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => navigate(`/subs/${sub.id}`)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
