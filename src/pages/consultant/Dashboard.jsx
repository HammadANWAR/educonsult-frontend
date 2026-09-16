import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, CalendarClock, Clock3 } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/StatCard';
import AppointmentRow from '../../components/AppointmentRow';
import { useAuth } from '../../context/AuthContext';
import { getAppointments, acceptAppointment, rejectAppointment } from '../../services/appointmentService';

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export default function ConsultantDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    getAppointments({ consultantId: user.id }).then(({ data }) => {
      setAppointments(data);
      setLoading(false);
    });
  }

  useEffect(load, [user.id]);

  const today = appointments.filter((a) => a.date === todayKey() && a.status === 'Accepted');
  const pending = appointments.filter((a) => a.status === 'Pending');
  const completedThisMonth = appointments.filter(
    (a) => a.status === 'Completed' && a.date.slice(0, 7) === todayKey().slice(0, 7)
  );

  async function handleAccept(id) {
    const link = `https://meet.google.com/edu-${id}`;
    await acceptAppointment(id, link);
    load();
  }
  async function handleReject(id) {
    await rejectAppointment(id);
    load();
  }

  return (
    <DashboardLayout title={`Welcome, ${user.name}`}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Today's appointments" value={today.length} icon={CalendarClock} />
        <StatCard label="Pending requests" value={pending.length} icon={Clock3} accent />
        <StatCard label="Completed this month" value={completedThisMonth.length} icon={ClipboardList} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 font-serif text-lg text-ink-700">Today's schedule</h2>
          {loading ? (
            <p className="text-sm text-ink-300">Loading…</p>
          ) : today.length === 0 ? (
            <div className="card p-6 text-center text-sm text-ink-400">Nothing scheduled for today.</div>
          ) : (
            <div className="space-y-3">
              {today.map((a) => (
                <AppointmentRow key={a.id} appointment={a} perspective="consultant" />
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-lg text-ink-700">Pending requests</h2>
            <Link to="/consultant/appointments" className="text-sm text-ink-500 hover:text-ink-700">
              View all →
            </Link>
          </div>
          {pending.length === 0 ? (
            <div className="card p-6 text-center text-sm text-ink-400">No pending requests.</div>
          ) : (
            <div className="space-y-3">
              {pending.slice(0, 3).map((a) => (
                <AppointmentRow
                  key={a.id}
                  appointment={a}
                  perspective="consultant"
                  actions={
                    <>
                      <button onClick={() => handleAccept(a.id)} className="btn-gold text-sm">
                        Accept
                      </button>
                      <button onClick={() => handleReject(a.id)} className="btn-ghost text-sm">
                        Reject
                      </button>
                    </>
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
