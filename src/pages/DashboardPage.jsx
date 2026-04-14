import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import MainLayout from '../components/layout/MainLayout';
import RAGStatusBadge from '../components/RAGStatusBadge';
import {
  Building2,
  Users,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { getConsultantGCs, getStats, getActionItems, getGCSubcontractors } = useData();
  const navigate = useNavigate();
  const isConsultant = user?.role === 'consultant';

  const consultantId = user?.id || user?.consultantId;
  const stats = useMemo(() => getStats(consultantId), [consultantId, getStats]);
  const actionItems = useMemo(() => getActionItems(consultantId), [consultantId, getActionItems]);
  const gcs = useMemo(() => getConsultantGCs(consultantId), [consultantId, getConsultantGCs]);

  // Calculate GC stats
  const gcStats = useMemo(() => {
    return gcs.map(gc => {
      const subs = getGCSubcontractors(gc.id);
      let compliant = 0;
      let expiring = 0;
      let expired = 0;

      subs.forEach(sub => {
        // Placeholder - would calculate from policies
      });

      return {
        ...gc,
        subCount: subs.length
      };
    });
  }, [gcs, getGCSubcontractors]);

  const getRedCount = () => actionItems.filter(a => a.rag === 'red').length;
  const getYellowCount = () => actionItems.filter(a => a.rag === 'yellow').length;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* KPI Cards */}
        {isConsultant && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Contractors</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalGCs}</p>
                </div>
                <Building2 className="w-12 h-12 text-blue-500 opacity-10" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Subcontractors</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalSubs}</p>
                </div>
                <Users className="w-12 h-12 text-purple-500 opacity-10" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Compliance Rate</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{stats.compliancePercentage}%</p>
                </div>
                <TrendingUp className="w-12 h-12 text-emerald-500 opacity-10" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Action Items</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{getRedCount() + getYellowCount()}</p>
                  <p className="text-xs text-red-600 mt-1">{getRedCount()} critical</p>
                </div>
                <AlertTriangle className="w-12 h-12 text-amber-500 opacity-10" />
              </div>
            </div>
          </div>
        )}

        <div className={isConsultant ? 'grid grid-cols-1 lg:grid-cols-3 gap-6' : ''}>
          {/* Action Items */}
          {isConsultant && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-900">Action Items</h3>
                  <p className="text-sm text-slate-500">Sorted by severity</p>
                </div>
                <div className="divide-y divide-slate-200 max-h-96 overflow-y-auto">
                  {actionItems.length === 0 ? (
                    <div className="px-6 py-8 text-center text-slate-500">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">All subcontractors compliant!</p>
                    </div>
                  ) : (
                    actionItems.slice(0, 10).map(item => (
                      <div
                        key={item.id}
                        onClick={() => navigate(`/subs/${item.subId}`)}
                        className="px-6 py-4 hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="font-medium text-slate-900 text-sm">{item.subName}</p>
                            <p className="text-xs text-slate-500 mt-1 capitalize">{item.policyType.replace('_', ' ')}</p>
                          </div>
                          <RAGStatusBadge status={item.rag} size="sm" showLabel={false} />
                        </div>
                        <p className={`text-xs font-medium ${
                          item.rag === 'red' ? 'text-red-600' : 'text-amber-600'
                        }`}>
                          {item.daysLeft <= 0 ? 'Expired' : `${item.daysLeft} days left`}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* GC Cards Grid */}
          <div className={isConsultant ? 'lg:col-span-2' : ''}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">
                  {isConsultant ? 'Your Contractors' : 'Dashboard'}
                </h3>
                {isConsultant && (
                  <button
                    onClick={() => navigate('/gcs')}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View All →
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gcStats.map(gc => (
                  <div
                    key={gc.id}
                    onClick={() => navigate(`/gcs/${gc.id}`)}
                    className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 hover:shadow-md hover:border-slate-300 cursor-pointer transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-slate-900">{gc.companyName}</h4>
                        <p className="text-sm text-slate-500 mt-1">{gc.subCount} subcontractors</p>
                      </div>
                      <Building2 className="w-10 h-10 text-blue-500 opacity-20" />
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Contact:</span>
                        <span className="text-slate-900 font-medium">{gc.contactEmail}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Phone:</span>
                        <span className="text-slate-900 font-medium">{gc.contactPhone}</span>
                      </div>
                    </div>

                    <button
                      className="mt-4 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
