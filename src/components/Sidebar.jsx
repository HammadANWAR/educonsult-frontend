import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserRound,
  CalendarClock,
  ClipboardList,
  Building2,
  BarChart3,
  Search,
  History,
  UserCog,
  StickyNote,
  GraduationCap,
} from 'lucide-react';

const NAV_BY_ROLE = {
  student: [
    { to: '/student', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/student/consultants', label: 'Find a Consultant', icon: Search },
    { to: '/student/appointments', label: 'My Appointments', icon: CalendarClock },
    { to: '/student/profile', label: 'Profile', icon: UserRound },
  ],
  consultant: [
    { to: '/consultant', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/consultant/appointments', label: 'Appointments', icon: ClipboardList },
    { to: '/consultant/availability', label: 'Availability', icon: CalendarClock },
    { to: '/consultant/notes', label: 'Consultation Notes', icon: StickyNote },
  ],
  admin: [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/consultants', label: 'Consultants', icon: Users },
    { to: '/admin/users', label: 'Students', icon: UserCog },
    { to: '/admin/departments', label: 'Departments', icon: Building2 },
    { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
  ],
};

export default function Sidebar({ role }) {
  const items = NAV_BY_ROLE[role] || [];
  return (
    <aside className="hidden w-60 shrink-0 border-r border-line bg-white md:flex md:flex-col">
      <div className="flex h-16 items-center gap-2 border-b border-line px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-ink-600 text-gold-300">
          <GraduationCap size={18} strokeWidth={1.8} />
        </div>
        <span className="font-serif text-lg text-ink-700">EduConsult</span>
      </div>
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors ${
                isActive ? 'bg-ink-50 font-medium text-ink-700' : 'text-ink-500 hover:bg-paper hover:text-ink-700'
              }`
            }
          >
            <Icon size={17} strokeWidth={1.75} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-line px-5 py-4 text-xs text-ink-300">
        Signed in as <span className="font-medium capitalize text-ink-400">{role}</span>
      </div>
    </aside>
  );
}
