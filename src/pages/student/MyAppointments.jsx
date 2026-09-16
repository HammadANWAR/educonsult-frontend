import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import AppointmentRow from '../../components/AppointmentRow';
import { useAuth } from '../../context/AuthContext';
import { getAppointments, cancelAppointment } from '../../services/appointmentService';

const FILTERS = ['All', 'Pending', 'Accepted', 'Completed', 'Cancelled'];

export default function MyAppointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  function load() {
    getAppointments({ studentId: user.id }).then(({ data }) => {
      setAppointments(data);
      setLoading(false);
    });
  }

  useEffect(load, [user.id]);

  async function handleCancel(id) {
    await cancelAppointment(id);
    load();
  }

  const filtered = filter === 'All' ? appointments : appointments.filter((a) => a.status === filter);

  return (
    <DashboardLayout title="My Appointments">
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-sm border px-3 py-1.5 text-sm ${
              filter === f ? 'border-ink-500 bg-ink-50 text-ink-700' : 'border-line text-ink-500 hover:bg-paper'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-ink-300">Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="card p-10 text-center text-ink-400">No appointments in this view.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => (
            <AppointmentRow
              key={a.id}
              appointment={a}
              perspective="student"
              actions={
                ['Pending', 'Accepted'].includes(a.status) && (
                  <button onClick={() => handleCancel(a.id)} className="btn-ghost text-sm">
                    Cancel appointment
                  </button>
                )
              }
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
