import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { CheckCircle2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AgentVerificationPage() {
  const { tokenId } = useParams();
  const { policies } = useData();
  const [step, setStep] = useState('form'); // form, submitted
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    wcStatus: 'active',
    glStatus: 'active',
    notes: ''
  });

  // Mock token validation - in production, would verify token against database
  const mockPolicy = useMemo(() => {
    return policies[0]; // For demo, return first policy
  }, [policies]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.wcStatus || !formData.glStatus) {
      toast.error('Please select status for both policies');
      return;
    }

    // Mock submission
    toast.success('Verification submitted successfully');
    setStep('submitted');

    // In production, would POST to backend with verification data
  };

  if (step === 'submitted') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h1>
            <p className="text-slate-600 mb-2">Your verification response has been recorded.</p>
            <p className="text-sm text-slate-500">
              The general contractor will review your response. If you uploaded a certificate, it has been saved to their records.
            </p>
            <div className="mt-6 p-4 bg-slate-50 rounded-lg text-sm text-slate-600">
              <p><strong>Reference ID:</strong> {tokenId}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">CoverVerifi</h1>
          <p className="text-slate-300">Insurance Verification Portal</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Policy Verification Request</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* WC Policy */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Workers' Compensation Policy
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-slate-600">Policy Number</p>
                  <p className="font-medium text-slate-900">WC-123456-RH</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Expiration Date</p>
                  <p className="font-medium text-slate-900">Apr 23, 2026</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Carrier</p>
                  <p className="font-medium text-slate-900">State Farm</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Subcontractor</p>
                  <p className="font-medium text-slate-900">John's Roofing</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900 mb-3">Is this coverage still active?</p>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="wcStatus"
                      value="active"
                      checked={formData.wcStatus === 'active'}
                      onChange={(e) => setFormData({ ...formData, wcStatus: e.target.value })}
                      className="w-4 h-4 text-blue-500"
                    />
                    <span className="ml-3 text-slate-700">Yes, coverage is active</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="wcStatus"
                      value="lapsed"
                      checked={formData.wcStatus === 'lapsed'}
                      onChange={(e) => setFormData({ ...formData, wcStatus: e.target.value })}
                      className="w-4 h-4 text-red-500"
                    />
                    <span className="ml-3 text-slate-700">No, coverage has lapsed or been cancelled</span>
                  </label>
                </div>
              </div>
            </div>

            {/* GL Policy */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                General Liability Policy
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-slate-600">Policy Number</p>
                  <p className="font-medium text-slate-900">GL-123456-RH</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Expiration Date</p>
                  <p className="font-medium text-slate-900">Mar 20, 2026</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Carrier</p>
                  <p className="font-medium text-slate-900">State Farm</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Coverage Limit</p>
                  <p className="font-medium text-slate-900">$1,000,000</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900 mb-3">Is this coverage still active?</p>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="glStatus"
                      value="active"
                      checked={formData.glStatus === 'active'}
                      onChange={(e) => setFormData({ ...formData, glStatus: e.target.value })}
                      className="w-4 h-4 text-blue-500"
                    />
                    <span className="ml-3 text-slate-700">Yes, coverage is active</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="glStatus"
                      value="lapsed"
                      checked={formData.glStatus === 'lapsed'}
                      onChange={(e) => setFormData({ ...formData, glStatus: e.target.value })}
                      className="w-4 h-4 text-red-500"
                    />
                    <span className="ml-3 text-slate-700">No, coverage has lapsed or been cancelled</span>
                  </label>
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Optional: Upload Updated Certificate</h3>
              <div
                className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  setFile(e.dataTransfer.files[0]);
                }}
                onClick={() => document.getElementById('certInput').click()}
              >
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-900 font-medium mb-1">Drop Certificate of Insurance here or click to select</p>
                <p className="text-sm text-slate-500">Accepted: PDF, JPG, PNG (max 10MB)</p>
                <input
                  id="certInput"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />
              </div>

              {file && (
                <div className="bg-emerald-50 rounded-lg p-4 flex items-center justify-between mt-3">
                  <div>
                    <p className="font-medium text-slate-900">{file.name}</p>
                    <p className="text-sm text-slate-600">{(file.size / 1024).toFixed(0)} KB</p>
                  </div>
                  <CheckCircle2 className="text-emerald-600" size={20} />
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Policy renewal is pending, new agent info, etc."
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg"
            >
              Submit Verification
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Important:</strong> Your response is confidential and used solely for compliance verification by the general contractor.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-400 text-sm">
            CoverVerifi • Insurance Compliance Platform
          </p>
          <p className="text-slate-400 text-sm">
            Built by <a href="https://acentralabs.com" className="text-blue-400 hover:text-blue-300">Acentra Labs</a>
          </p>
        </div>
      </div>
    </div>
  );
}
