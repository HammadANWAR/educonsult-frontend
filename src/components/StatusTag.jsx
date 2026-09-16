import React from 'react';

const STATUS_STYLES = {
  Pending: { dot: 'bg-gold-400', text: 'text-gold-600' },
  Accepted: { dot: 'bg-ink-400', text: 'text-ink-600' },
  Completed: { dot: 'bg-emerald-500', text: 'text-emerald-700' },
  Cancelled: { dot: 'bg-ink-200', text: 'text-ink-400' },
  Rejected: { dot: 'bg-red-400', text: 'text-red-600' },
  'No Show': { dot: 'bg-red-300', text: 'text-red-500' },
  Rescheduled: { dot: 'bg-gold-400', text: 'text-gold-600' },
};

export default function StatusTag({ status }) {
  const style = STATUS_STYLES[status] || { dot: 'bg-ink-200', text: 'text-ink-400' };
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${style.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}
