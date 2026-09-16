import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout({ title, children }) {
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar role={user?.role} />
      <div className="flex flex-1 flex-col">
        <TopBar title={title} />
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
