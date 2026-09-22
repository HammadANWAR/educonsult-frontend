import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Briefcase, Calendar } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { getConsultantById } from '../../services/consultantService';
import { getDefaultAvatar } from '../../services/avatar';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function ConsultantDetails() {
  const { id } = useParams();
  const [consultant, setConsultant] = useState(null);

  useEffect(() => {
    getConsultantById(id).then(({ data }) => setConsultant(data));
  }, [id]);

  if (!consultant) {
    return (
      <DashboardLayout title="Consultant Profile">
        <p className="text-sm text-ink-300">Loading…</p>
      </DashboardLayout>
    );
  }

  const avatar = consultant.avatar || getDefaultAvatar(consultant.email || consultant.name || consultant.id);

  return (
    <DashboardLayout title="Consultant Profile">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-start gap-4">
            <img src={avatar} alt={`${consultant.name} profile`} className="h-16 w-16 shrink-0 rounded-full bg-ink-50 object-cover" />
            <div>
              <h1 className="font-serif text-2xl text-ink-700">{consultant.name}</h1>
              <p className="text-ink-500">{consultant.title}</p>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-ink-400">
                <span className="flex items-center gap-1.5">
                  <Star size={14} className="fill-gold-400 text-gold-400" />
                  {consultant.rating?.toFixed(1)} ({consultant.reviewCount} reviews)
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase size={14} /> {consultant.departmentName} · {consultant.experienceYears} yrs
                </span>
              </div>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-ink-500">{consultant.bio}</p>

          <div className="mt-5">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-300">Specializations</p>
            <div className="flex flex-wrap gap-1.5">
              {consultant.specializations.map((s) => (
                <span key={s} className="rounded-sm bg-paper px-2.5 py-1 text-sm text-ink-500">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-line pt-5">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink-300">
              <Calendar size={13} /> Weekly availability
            </p>
            <div className="space-y-1.5">
              {DAYS.map((day) => {
                const ranges = consultant.availability[day] || [];
                return (
                  <div key={day} className="flex items-center justify-between text-sm">
                    <span className="w-28 text-ink-500">{day}</span>
                    <span className={ranges.length ? 'text-ink-700' : 'text-ink-300'}>
                      {ranges.length ? ranges.map((r) => `${r[0]}–${r[1]}`).join(', ') : 'Not available'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="card h-fit p-6">
          <p className="mb-1 text-sm text-ink-400">Ready to talk to {consultant.name.split(' ')[0]}?</p>
          <p className="mb-4 font-serif text-lg text-ink-700">Book an appointment</p>
          <Link to={`/student/book/${consultant.id}`} className="btn-gold w-full">
            Choose a time
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
