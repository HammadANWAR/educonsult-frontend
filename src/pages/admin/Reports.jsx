import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import DashboardLayout from '../../components/DashboardLayout';
import { getDb } from '../../services/mockData';

const STATUS_COLORS = {
  Pending: '#D9A857',
  Accepted: '#1B2A4A',
  Completed: '#10B981',
  Cancelled: '#AEB9D1',
  Rejected: '#F87171',
  'No Show': '#FCA5A5',
};

export default function AdminReports() {
  const [db] = useState(getDb());
  const statusCounts = Object.entries(
    db.appointments.reduce((acc, a) => {
      acc[a.status] = (acc[a.status] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const busiestConsultant = [...db.consultants].sort(
    (a, b) =>
      db.appointments.filter((x) => x.consultantId === b.id).length -
      db.appointments.filter((x) => x.consultantId === a.id).length
  )[0];

  const cancellationRate = db.appointments.length
    ? Math.round(
        (db.appointments.filter((a) => ['Cancelled', 'Rejected', 'No Show'].includes(a.status)).length /
          db.appointments.length) *
          100
      )
    : 0;

  return (
    <DashboardLayout title="Reports">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-4 font-serif text-lg text-ink-700">Appointments by status</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={statusCounts} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                {statusCounts.map((entry) => (
                  <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || '#AEB9D1'} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 2, borderColor: '#E4E1D8', fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <p className="text-sm text-ink-400">Busiest consultant</p>
            <p className="mt-1 font-serif text-xl text-ink-700">{busiestConsultant?.name || '—'}</p>
            <p className="text-sm text-ink-400">
              {db.appointments.filter((a) => a.consultantId === busiestConsultant?.id).length} appointments total
            </p>
          </div>
          <div className="card p-5">
            <p className="text-sm text-ink-400">Cancellation rate</p>
            <p className="mt-1 font-serif text-xl text-ink-700">{cancellationRate}%</p>
            <p className="text-sm text-ink-400">Includes cancelled, rejected, and no-shows</p>
          </div>
          <div className="card p-5">
            <p className="text-sm text-ink-400">Total appointments logged</p>
            <p className="mt-1 font-serif text-xl text-ink-700">{db.appointments.length}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
