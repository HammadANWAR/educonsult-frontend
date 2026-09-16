import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Briefcase } from 'lucide-react';

export default function ConsultantCard({ consultant }) {
  return (
    <div className="card flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink-50 font-serif text-lg text-ink-600">
          {consultant.name
            .split(' ')
            .map((w) => w[0])
            .slice(0, 2)
            .join('')}
        </div>
        <div className="flex items-center gap-1 text-sm text-ink-500">
          <Star size={14} className="fill-gold-400 text-gold-400" />
          {consultant.rating?.toFixed(1)}
          <span className="text-ink-300">({consultant.reviewCount})</span>
        </div>
      </div>
      <div>
        <h3 className="font-serif text-lg text-ink-700">{consultant.name}</h3>
        <p className="text-sm text-ink-500">{consultant.title}</p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-300">
          <Briefcase size={12} /> {consultant.departmentName} · {consultant.experienceYears} yrs experience
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {consultant.specializations?.slice(0, 3).map((s) => (
          <span key={s} className="rounded-sm bg-paper px-2 py-1 text-xs text-ink-500">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-auto flex gap-2 pt-1">
        <Link to={`/student/consultants/${consultant.id}`} className="btn-ghost flex-1 text-sm">
          View Profile
        </Link>
        <Link to={`/student/book/${consultant.id}`} className="btn-gold flex-1 text-sm">
          Book
        </Link>
      </div>
    </div>
  );
}
