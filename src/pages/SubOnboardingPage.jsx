import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import MainLayout from '../components/layout/MainLayout';
import { ArrowLeft, Check, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SubOnboardingPage() {
  const navigate = useNavigate();
  const { addSubcontractor, addAgent, addPolicy } = useData();
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    companyName: '',
    phone: '',
    email: '',
    wcAgentName: '',
    wcAgencyName: '',
    wcAgentPhone: '',
    wcAgentEmail: '',
    glAgentName: '',
    glAgencyName: '',
    glAgentPhone: '',
    glAgentEmail: '',
    wcPolicyNumber: '',
    wcCarrier: '',
    wcExpirationDate: '',
    glPolicyNumber: '',
    glCarrier: '',
    glExpirationDate: ''
  });

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.companyName || !formData.email) {
        toast.error('Please fill in company name and email');
        return;
      }
    } else if (step === 2) {
      if (!file) {
        toast.error('Please upload a W-9 form');
        return;
      }
    } else if (step === 3) {
      if (!formData.wcAgentName || !formData.glAgentName) {
        toast.error('Please fill in both WC and GL agent information');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSubmit = () => {
    try {
      // Create subcontractor
      const newSub = addSubcontractor({
        companyName: formData.companyName,
        phone: formData.phone,
        email: formData.email
      });

      // Create agents
      const wcAgent = addAgent({
        agentName: formData.wcAgentName,
        agencyName: formData.wcAgencyName,
        phone: formData.wcAgentPhone,
        email: formData.wcAgentEmail
      });

      const glAgent = addAgent({
        agentName: formData.glAgentName,
        agencyName: formData.glAgencyName,
        phone: formData.glAgentPhone,
        email: formData.glAgentEmail
      });

      // Create policies
      addPolicy({
        subId: newSub.id,
        policyType: 'workers_comp',
        carrier: formData.wcCarrier,
        policyNumber: formData.wcPolicyNumber,
        expirationDate: new Date(formData.wcExpirationDate),
        coverageLimit: 500000,
        agentId: wcAgent.id,
        status: 'pending'
      });

      addPolicy({
        subId: newSub.id,
        policyType: 'general_liability',
        carrier: formData.glCarrier,
        policyNumber: formData.glPolicyNumber,
        expirationDate: new Date(formData.glExpirationDate),
        coverageLimit: 1000000,
        agentId: glAgent.id,
        status: 'pending'
      });

      toast.success('Subcontractor added successfully! Verification emails sent.');
      navigate('/gcs');
    } catch (error) {
      toast.error('Error adding subcontractor');
      console.error(error);
    }
  };

  const steps = ['Company Info', 'W-9 Upload', 'Agent Info', 'Review'];

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Add Subcontractor</h2>
            <p className="text-slate-600 mt-1">Complete this form to onboard a new subcontractor</p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s, idx) => (
              <div key={idx} className="flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      idx + 1 <= step
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {idx + 1 < step ? <Check size={20} /> : idx + 1}
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        idx + 1 < step ? 'bg-blue-600' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>
                <p className="text-sm text-slate-600 mt-2 text-center">{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8">
          {/* Step 1: Company Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Company Information</h3>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., ABC Roofing Services"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="208-555-1234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="contact@company.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: W-9 Upload */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">W-9 Form Upload</h3>

              <div
                className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  setFile(e.dataTransfer.files[0]);
                }}
                onClick={() => document.getElementById('fileInput').click()}
              >
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-900 font-medium mb-1">Drop W-9 PDF here or click to select</p>
                <p className="text-sm text-slate-500">Accepted: PDF, JPG, PNG (max 10MB)</p>
                <input
                  id="fileInput"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />
              </div>

              {file && (
                <div className="bg-slate-50 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{file.name}</p>
                    <p className="text-sm text-slate-600">{(file.size / 1024).toFixed(0)} KB</p>
                  </div>
                  <Check className="text-emerald-600" size={20} />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Agent Info */}
          {step === 3 && (
            <div className="space-y-8">
              <h3 className="text-lg font-semibold text-slate-900">Insurance Agent Information</h3>

              {/* WC Agent */}
              <div className="border-t border-slate-200 pt-6">
                <h4 className="font-semibold text-slate-900 mb-4">Workers' Compensation Agent</h4>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.wcAgentName}
                    onChange={(e) => setFormData({ ...formData, wcAgentName: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Agent Name"
                  />
                  <input
                    type="text"
                    value={formData.wcAgencyName}
                    onChange={(e) => setFormData({ ...formData, wcAgencyName: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Agency Name"
                  />
                  <input
                    type="tel"
                    value={formData.wcAgentPhone}
                    onChange={(e) => setFormData({ ...formData, wcAgentPhone: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone"
                  />
                  <input
                    type="email"
                    value={formData.wcAgentEmail}
                    onChange={(e) => setFormData({ ...formData, wcAgentEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    value={formData.wcCarrier}
                    onChange={(e) => setFormData({ ...formData, wcCarrier: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Carrier"
                  />
                  <input
                    type="text"
                    value={formData.wcPolicyNumber}
                    onChange={(e) => setFormData({ ...formData, wcPolicyNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Policy Number"
                  />
                  <input
                    type="date"
                    value={formData.wcExpirationDate}
                    onChange={(e) => setFormData({ ...formData, wcExpirationDate: e.target.value })}
                    className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* GL Agent */}
              <div className="border-t border-slate-200 pt-6">
                <h4 className="font-semibold text-slate-900 mb-4">General Liability Agent</h4>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.glAgentName}
                    onChange={(e) => setFormData({ ...formData, glAgentName: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Agent Name"
                  />
                  <input
                    type="text"
                    value={formData.glAgencyName}
                    onChange={(e) => setFormData({ ...formData, glAgencyName: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Agency Name"
                  />
                  <input
                    type="tel"
                    value={formData.glAgentPhone}
                    onChange={(e) => setFormData({ ...formData, glAgentPhone: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone"
                  />
                  <input
                    type="email"
                    value={formData.glAgentEmail}
                    onChange={(e) => setFormData({ ...formData, glAgentEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    value={formData.glCarrier}
                    onChange={(e) => setFormData({ ...formData, glCarrier: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Carrier"
                  />
                  <input
                    type="text"
                    value={formData.glPolicyNumber}
                    onChange={(e) => setFormData({ ...formData, glPolicyNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Policy Number"
                  />
                  <input
                    type="date"
                    value={formData.glExpirationDate}
                    onChange={(e) => setFormData({ ...formData, glExpirationDate: e.target.value })}
                    className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-900">Review & Submit</h3>

              <div className="space-y-6">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="font-semibold text-slate-900 mb-3">Company Information</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-slate-600">Name</p>
                      <p className="font-medium text-slate-900">{formData.companyName}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Email</p>
                      <p className="font-medium text-slate-900">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Phone</p>
                      <p className="font-medium text-slate-900">{formData.phone}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">W-9</p>
                      <p className="font-medium text-emerald-600">✓ Uploaded</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Next Step:</strong> Upon submission, verification emails will be sent to both the WC and GL agents requesting current coverage confirmation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-slate-200">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {step < 4 ? (
              <button
                onClick={handleNextStep}
                className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Submit & Send Verification
              </button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
