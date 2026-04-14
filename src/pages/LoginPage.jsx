import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('consultant');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = login(email, password, role);
      toast.success('Login successful!');
      navigate(role === 'consultant' ? '/dashboard' : '/gc-dashboard');
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">CoverVerifi</h1>
          <p className="text-slate-400">Insurance Compliance Platform</p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 border border-slate-700 rounded-lg shadow-2xl p-8 space-y-6"
        >
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-3">
              I am a:
            </label>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="consultant"
                  checked={role === 'consultant'}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="ml-3 text-slate-300">Insurance Compliance Consultant</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="general_contractor"
                  checked={role === 'general_contractor'}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-4 h-4 text-blue-500"
                />
                <span className="ml-3 text-slate-300">General Contractor</span>
              </label>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'consultant' ? 'dawn@coververifi.com' : 'john@mountainwest.com'}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              required
            />
            <p className="text-xs text-slate-400 mt-1">
              {role === 'consultant' ? 'Demo: dawn@coververifi.com' : 'Demo: john@mountainwest.com'}
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              required
            />
            <p className="text-xs text-slate-400 mt-1">Demo: password123 or gcpass123</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Info Card */}
        <div className="mt-8 bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-slate-200 mb-4">Demo Credentials</h3>
          <div className="space-y-3 text-sm text-slate-400">
            <div>
              <p className="font-medium text-slate-300">Consultant</p>
              <p>Email: dawn@coververifi.com</p>
              <p>Password: password123</p>
            </div>
            <div className="border-t border-slate-700 pt-3">
              <p className="font-medium text-slate-300">General Contractor</p>
              <p>Email: john@mountainwest.com</p>
              <p>Password: gcpass123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
