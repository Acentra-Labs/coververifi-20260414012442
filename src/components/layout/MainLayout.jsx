import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, LogOut, LayoutDashboard, Building2, Plus } from 'lucide-react';

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isConsultant = user?.role === 'consultant';
  const isGC = user?.role === 'general_contractor';

  const navItems = isConsultant ? [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Contractors', href: '/gcs', icon: Building2 },
    { label: 'Add Subcontractor', href: '/subs/new', icon: Plus }
  ] : [
    { label: 'My Dashboard', href: '/gc-dashboard', icon: LayoutDashboard }
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">CoverVerifi</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <button
                key={item.href}
                onClick={() => navigate(item.href)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold">{user?.fullName?.[0] || user?.companyName?.[0] || '?'}</span>
            </div>
            {sidebarOpen && (
              <div className="text-sm">
                <p className="font-medium text-white truncate">{user?.fullName || user?.companyName}</p>
                <p className="text-xs text-slate-400 capitalize">{user?.role?.replace('_', ' ')}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors text-sm"
          >
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 shadow-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              {isConsultant ? 'Compliance Dashboard' : 'My Subcontractors'}
            </h2>
            <div className="text-sm text-slate-600">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 px-6 py-4 text-center text-sm text-slate-500">
          <p>CoverVerifi v1.0 • Built by Acentra Labs</p>
        </footer>
      </div>
    </div>
  );
}
