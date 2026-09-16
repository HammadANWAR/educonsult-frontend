import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getDb } from '../../services/mockData';

export default function AdminUsers() {
  const [db] = useState(getDb());
  const students = db.users.filter((u) => u.role === 'student');

  return (
    <DashboardLayout title="Students">
      <p className="mb-5 text-sm text-ink-400">{students.length} registered students</p>
      <div className="card overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-paper text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Appointments</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {students.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-3 font-medium text-ink-700">{s.name}</td>
                <td className="px-4 py-3 text-ink-500">{s.email}</td>
                <td className="px-4 py-3 text-ink-500">
                  {db.appointments.filter((a) => a.studentId === s.id).length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
