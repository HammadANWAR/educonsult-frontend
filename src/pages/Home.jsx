import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, Search, MessageSquareText, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: Search,
    title: 'Find the right person',
    body: 'Browse advisors, career counselors, and project supervisors by department or specialization.',
  },
  {
    icon: CalendarCheck,
    title: 'Book real availability',
    body: 'See only the time slots a consultant has actually opened — no double bookings, no back-and-forth email.',
  },
  {
    icon: MessageSquareText,
    title: 'Keep the record',
    body: 'Every consultation leaves a note behind, so guidance from last term is still there next term.',
  },
  {
    icon: ShieldCheck,
    title: 'Built for the institution',
    body: 'Departments, coordinators, and admins get the oversight a school or college actually needs.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-ink-600 font-serif text-sm text-white">
              E
            </div>
            <span className="font-serif text-lg text-ink-700">EduConsult</span>
          </div>
          <nav className="flex items-center gap-3">
            <Link to="/login" className="btn-ghost text-sm">
              Log in
            </Link>
            <Link to="/register" className="btn-gold text-sm">
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-medium text-gold-600">For schools, colleges &amp; universities</p>
          <h1 className="font-serif text-5xl leading-tight text-ink-700">
            Office hours, without the guesswork.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-500">
            EduConsult gives students a clear way to book time with advisors, career counselors, and project
            supervisors — and gives your institution a record of every conversation.
          </p>
          <div className="mt-8 flex gap-3">
            <Link to="/register" className="btn-gold px-6 py-3">
              Book your first appointment
            </Link>
            <Link to="/login" className="btn-ghost px-6 py-3">
              I already have an account
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon size={22} className="mb-3 text-gold-500" strokeWidth={1.75} />
              <h3 className="mb-1.5 font-serif text-lg text-ink-700">{title}</h3>
              <p className="text-sm leading-relaxed text-ink-500">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="card flex flex-col items-start gap-4 p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-ink-700">Ready to see it in action?</h2>
            <p className="mt-1 text-ink-500">Log in with any of the demo accounts on the sign-in page.</p>
          </div>
          <Link to="/login" className="btn-primary shrink-0 px-6 py-3">
            Go to sign in
          </Link>
        </div>
      </section>

      <footer className="border-t border-line px-6 py-8 text-center text-sm text-ink-300">
        EduConsult — Smart Online Appointment &amp; Educational Consultancy Management System
      </footer>
    </div>
  );
}
