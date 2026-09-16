import React from 'react';
import StatusTag from './StatusTag';
import { Calendar, Clock } from 'lucide-react';

const ACCENT_BY_STATUS = {
  Pending: 'border-l-gold-400',
  Accepted: 'border-l-ink-400',
  Completed: 'border-l-emerald-500',
  Cancelled: 'border-l-ink-200',
  Rejected: 'border-l-red-400',
  'No Show': 'border-l-red-300',
  Rescheduled: 'border-l-gold-400',
};

export default function AppointmentRow({ appointment, perspective = 'student', actions }) {
  const accent = ACCENT_BY_STATUS[appointment.status] || 'border-l-ink-200';
  const counterpartName = perspective === 'student' ? appointment.consultantName : appointment.studentName;
  const counterpartSub = perspective === 'student' ? appointment.consultantTitle : appointment.categoryName;

  return (
    <div className={`card border-l-4 ${accent} p-4`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-medium text-ink-700">{counterpartName}</p>
          {counterpartSub && <p className="text-sm text-ink-400">{counterpartSub}</p>}
        </div>
        <StatusTag status={appointment.status} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-ink-500">
        <span className="flex items-center gap-1.5">
          <Calendar size={14} /> {appointment.date}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={14} /> {appointment.startTime} – {appointment.endTime}
        </span>
        {appointment.categoryName && perspective === 'consultant' && (
          <span className="rounded-sm bg-paper px-2 py-0.5 text-xs">{appointment.categoryName}</span>
        )}
      </div>

      {appointment.reason && <p className="mt-3 text-sm text-ink-500">{appointment.reason}</p>}

      {appointment.notes && (
        <div className="mt-3 rounded-sm bg-paper p-3 text-sm text-ink-500">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-ink-300">Consultation notes</p>
          {appointment.notes}
        </div>
      )}

      {appointment.meetingLink && appointment.status === 'Accepted' && (
        <a
          href={appointment.meetingLink}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost mt-3 inline-flex text-sm"
        >
          Join meeting
        </a>
      )}

      {actions && <div className="mt-3 flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
