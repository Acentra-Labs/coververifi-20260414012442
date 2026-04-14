import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import MainLayout from '../components/layout/MainLayout';
import RAGStatusBadge from '../components/RAGStatusBadge';
import { ArrowLeft, Mail, Phone, FileText, Send } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export default function SubDetailPage() {
  const { subId } = useParams();
  const navigate = useNavigate();
  const { getSubcontractor, getSubPolicies } = useData();
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const sub = useMemo(() => getSubcontractor(subId), [subId, getSubcontractor]);
  const policies = useMemo(() => getSubPolicies(subId), [subId, getSubPolicies]);

  if (!sub) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-slate-600">Subcontractor not found</p>
        </div>
      </MainLayout>
    );
  }

  const handleSendVerification = () => {
    if (!selectedPolicy) {
      toast.error('Please select a policy');
      return;
    }
    toast.success(`Verification request sent to ${selectedPolicy.agent?.agentName}`);
    setShowVerificationModal(false);
    setSelectedPolicy(null);
  };

  const getRAG = (policy) => {
    if (!policy) return 'red';
    const daysLeft = Math.floor((new Date(policy.expirationDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 0) return 'red';
    if (daysLeft <= 30) return 'yellow';
    return 'green';
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{sub.companyName}</h2>
            <p className="text-slate-600 mt-1">View and manage insurance policies</p>
          </div>
        </div>

        {/* Sub Info */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 text-slate-600 mb-2">
                <Mail size={16} />
                <p className="text-sm">Email</p>
              </div>
              <a href={`mailto:${sub.email}`} className="text-blue-600 hover:underline">
                {sub.email}
              </a>
            </div>
            <div>
              <div className="flex items-center gap-2 text-slate-600 mb-2">
                <Phone size={16} />
                <p className="text-sm">Phone</p>
              </div>
              <a href={`tel:${sub.phone}`} className="text-blue-600 hover:underline">
                {sub.phone}
              </a>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-2">Since</p>
              <p className="font-medium text-slate-900">
                {format(new Date(sub.createdAt), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
        </div>

        {/* Policies */}
        <div className="space-y-4">
          {policies.map(policy => {
            const daysLeft = Math.floor((new Date(policy.expirationDate) - new Date()) / (1000 * 60 * 60 * 24));
            const rag = getRAG(policy);

            return (
              <div key={policy.id} className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 capitalize">
                        {policy.policyType.replace('_', ' ')}
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">{policy.carrier}</p>
                    </div>
                    <RAGStatusBadge status={rag} />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Policy Number</p>
                      <p className="font-medium text-slate-900">{policy.policyNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Coverage Limit</p>
                      <p className="font-medium text-slate-900">${(policy.coverageLimit / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Expiration</p>
                      <p className="font-medium text-slate-900">
                        {format(new Date(policy.expirationDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Days Remaining</p>
                      <p className={`font-medium ${
                        rag === 'red' ? 'text-red-600' : rag === 'yellow' ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        {daysLeft <= 0 ? 'EXPIRED' : `${daysLeft} days`}
                      </p>
                    </div>
                  </div>

                  {policy.agent && (
                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                      <p className="text-sm font-semibold text-slate-900 mb-2">Insurance Agent</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-slate-600">Agent</p>
                          <p className="text-sm text-slate-900">{policy.agent.agentName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600">Agency</p>
                          <p className="text-sm text-slate-900">{policy.agent.agencyName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600">Phone</p>
                          <a href={`tel:${policy.agent.phone}`} className="text-sm text-blue-600 hover:underline">
                            {policy.agent.phone}
                          </a>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600">Email</p>
                          <a href={`mailto:${policy.agent.email}`} className="text-sm text-blue-600 hover:underline">
                            {policy.agent.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedPolicy(policy);
                        setShowVerificationModal(true);
                      }}
                      className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      <Send size={16} />
                      Send Verification
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification Modal */}
        {showVerificationModal && selectedPolicy && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Send Verification Request</h3>

              <div className="bg-slate-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-slate-600 mb-2">To:</p>
                <p className="font-medium text-slate-900">{selectedPolicy.agent?.agentName}</p>
                <p className="text-sm text-slate-600">{selectedPolicy.agent?.email}</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-blue-900 mb-3">Email Preview</p>
                <div className="bg-white rounded p-4 text-sm text-slate-700 space-y-2">
                  <p><strong>Subject:</strong> Insurance Verification Required - {sub.companyName}</p>
                  <hr className="my-3 border-slate-200" />
                  <p>Dear {selectedPolicy.agent?.agentName},</p>
                  <p>We are requesting verification of current insurance coverage for {sub.companyName}.</p>
                  <p className="font-semibold mt-3">Policy Details:</p>
                  <p>Type: {selectedPolicy.policyType.replace('_', ' ')}</p>
                  <p>Policy #: {selectedPolicy.policyNumber}</p>
                  <p>Expiration: {format(new Date(selectedPolicy.expirationDate), 'MMM d, yyyy')}</p>
                  <p className="mt-3">Please confirm coverage status or upload updated documentation.</p>
                  <p>Thank you,<br />CoverVerifi Compliance Team</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowVerificationModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendVerification}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Send Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
