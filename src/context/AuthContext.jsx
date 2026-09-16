import React, { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem('educonsult_user');
    if (raw) setUser(JSON.parse(raw));
    setLoading(false);
  }, []);

  async function login(credentials) {
    const { data } = await authService.login(credentials);
    localStorage.setItem('educonsult_token', data.token);
    localStorage.setItem('educonsult_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }

  async function register(payload) {
    const { data } = await authService.register(payload);
    localStorage.setItem('educonsult_token', data.token);
    localStorage.setItem('educonsult_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }

  function logout() {
    localStorage.removeItem('educonsult_token');
    localStorage.removeItem('educonsult_user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
