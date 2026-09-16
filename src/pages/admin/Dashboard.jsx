import React, { useEffect, useState } from 'react';
import { Users, UserRound, CalendarClock, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/StatCard';
import { getDb } from '../../services/mockData';

export default function AdminDashboard() {
  const [db] = useState(getDb());

  const students = db.users.filter((u) => u.role === 'student');
  const consultants = db.consultants;
  const today = new Date().toISOString().slice(0, 10);
  const todaysAppointments = db.appointments.filter((a) => a.date === today);
  const completed = db.appointments.filter((a) => a.status === 'Completed');
  const pending = db.appointments.filter((a) => a.status === 'Pending');
  const cancelled = db.appointments.filter((a) => ['Cancelled', 'Rejected'].includes(a.status));

  const byDepartment = db.departments.map((d) => ({
    name: d.name.length > 14 ? d.name.slice(0, 14) + '…' : d.name,
    appointments: db.appointments.filter((a) => {
      const c = db.consultants.find((c) => c.id === a.consultantId);
      return c?.departmentId === d.id;
    }).length,
  }));

  const byCategory = db.categories.map((c) => ({
    name: c.name.length > 14 ? c.name.slice(0, 14) + '…' : c.name,
    count: db.appointments.filter((a) => a.categoryId === c.id).length,
  }));

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total students" value={students.length} icon={UserRound} />
        <StatCard label="Total consultants" value={consultants.length} icon={Users} />
        <StatCard label="Appointments today" value={todaysAppointments.length} icon={CalendarClock} />
        <StatCard label="Completed" value={completed.length} icon={CheckCircle2} />
        <StatCard label="Pending" value={pending.length} accent />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-4 font-serif text-lg text-ink-700">Appointments by department</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byDepartment}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E1D8" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#5E729D' }} axisLine={{ stroke: '#E4E1D8' }} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#5E729D' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ borderRadius: 2, borderColor: '#E4E1D8', fontSize: 13 }} />
              <Bar dataKey="appointments" fill="#1B2A4A" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h2 className="mb-4 font-serif text-lg text-ink-700">Most requested consultation types</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byCategory} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E1D8" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#5E729D' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 12, fill: '#5E729D' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 2, borderColor: '#E4E1D8', fontSize: 13 }} />
              <Bar dataKey="count" fill="#B8863B" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 card p-5">
        <h2 className="mb-3 font-serif text-lg text-ink-700">Consultant ratings</h2>
        <div className="divide-y divide-line">
          {consultants
            .slice()
            .sort((a, b) => b.rating - a.rating)
            .map((c) => (
              <div key={c.id} className="flex items-center justify-between py-2.5 text-sm">
                <div>
                  <p className="font-medium text-ink-700">{c.name}</p>
                  <p className="text-xs text-ink-400">{c.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-ink-700">{c.rating.toFixed(1)} / 5</p>
                  <p className="text-xs text-ink-300">{c.reviewCount} reviews</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-ink-300">
        {cancelled.length} cancelled/rejected appointments this period · reports below have detailed breakdowns.
      </p>
    </DashboardLayout>
  );
}
