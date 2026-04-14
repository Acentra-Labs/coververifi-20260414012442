import React, { createContext, useState, useCallback } from 'react';
import { authUsers, consultants, generalContractors } from '../data/mockData';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback((email, password, role) => {
    setLoading(true);
    try {
      // Mock authentication - in production this would call Supabase Auth
      const authUser = authUsers.find(
        u => u.email === email && u.password === password && u.role === role
      );

      if (!authUser) {
        throw new Error('Invalid email or password');
      }

      // Get user details based on role
      let userData = { ...authUser };

      if (authUser.role === 'consultant') {
        const consultant = consultants.find(c => c.id === authUser.consultantId);
        userData = { ...userData, ...consultant };
      } else if (authUser.role === 'general_contractor') {
        const gc = generalContractors.find(c => c.id === authUser.gcId);
        userData = { ...userData, ...gc };
      }

      setUser(userData);
      localStorage.setItem('authUser', JSON.stringify(userData));
      return userData;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('authUser');
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
