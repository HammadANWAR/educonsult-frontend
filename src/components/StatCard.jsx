import React from 'react';

export default function StatCard({ label, value, icon: Icon, accent = false }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-400">{label}</p>
        {Icon && <Icon size={16} className={accent ? 'text-gold-500' : 'text-ink-300'} strokeWidth={1.75} />}
      </div>
      <p className={`mt-2 font-serif text-3xl ${accent ? 'text-gold-600' : 'text-ink-700'}`}>{value}</p>
    </div>
  );
}
