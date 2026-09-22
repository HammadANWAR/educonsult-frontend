import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  return (
    <DashboardLayout title="Profile">
      <div className="card max-w-lg p-6">
        <div className="mb-6 flex items-center gap-4">
          <img
            src={user.avatar}
            alt={`${user.name} profile`}
            className="h-16 w-16 rounded-full bg-ink-50 object-cover"
          />
          <div>
            <h2 className="font-serif text-xl text-ink-700">{user.name}</h2>
            <p className="text-sm capitalize text-ink-400">{user.role}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="label">Full name</label>
            <input className="input-field" defaultValue={user.name} disabled />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input-field" defaultValue={user.email} disabled />
          </div>
        </div>
        <p className="mt-4 text-xs text-ink-300">
          Profile editing will connect to <code>PUT /api/users/{'{id}'}</code> once the backend is live.
        </p>
      </div>
    </DashboardLayout>
  );
}
