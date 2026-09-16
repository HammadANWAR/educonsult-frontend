import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, CheckCircle2, Clock3, Search } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/StatCard';
import AppointmentRow from '../../components/AppointmentRow';
import { useAuth } from '../../context/AuthContext';
import { getAppointments } from '../../services/appointmentService';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAppointments({ studentId: user.id }).then(({ data }) => {
      setAppointments(data);
      setLoading(false);
    });
  }, [user.id]);

  const upcoming = appointments.filter((a) => ['Pending', 'Accepted'].includes(a.status));
  const completed = appointments.filter((a) => a.status === 'Completed');
  const next = upcoming.find((a) => a.status === 'Accepted') || upcoming[0];

  return (
    <DashboardLayout title={`Welcome, ${user.name.split(' ')[0]}`}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Upcoming appointments" value={upcoming.length} icon={CalendarClock} />
        <StatCard label="Completed consultations" value={completed.length} icon={CheckCircle2} />
        <StatCard label="Pending requests" value={appointments.filter((a) => a.status === 'Pending').length} icon={Clock3} accent />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-lg text-ink-700">Upcoming</h2>
            <Link to="/student/appointments" className="text-sm text-ink-500 hover:text-ink-700">
              View all →
            </Link>
          </div>
          {loading ? (
            <p className="text-sm text-ink-300">Loading…</p>
          ) : upcoming.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-ink-500">No upcoming appointments yet.</p>
              <Link to="/student/consultants" className="btn-gold mt-4 inline-flex text-sm">
                Find a consultant
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.slice(0, 3).map((a) => (
                <AppointmentRow key={a.id} appointment={a} perspective="student" />
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-3 font-serif text-lg text-ink-700">Quick actions</h2>
          <div className="card p-5">
            <Link to="/student/consultants" className="flex items-center gap-3 rounded-sm p-2 hover:bg-paper">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-gold-50 text-gold-600">
                <Search size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-ink-700">Find a consultant</p>
                <p className="text-xs text-ink-400">Browse by department or specialization</p>
              </div>
            </Link>
            {next && (
              <div className="mt-3 border-t border-line pt-3">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-ink-300">Next up</p>
                <p className="text-sm font-medium text-ink-700">{next.consultantName}</p>
                <p className="text-xs text-ink-400">
                  {next.date} · {next.startTime}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
