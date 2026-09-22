import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, GraduationCap, Search, MessageSquareText, ShieldCheck, ArrowUpRight } from 'lucide-react';

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
            <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-ink-600 text-gold-300">
              <GraduationCap size={20} strokeWidth={1.8} />
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

      <section
        className="relative isolate overflow-hidden bg-ink-700 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(11, 18, 32, .96) 0%, rgba(22, 34, 60, .88) 48%, rgba(22, 34, 60, .35) 100%), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=85')",
        }}
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:py-28">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-gold-300">For the next step</p>
            <h1 className="font-serif text-5xl leading-[1.05] text-white sm:text-6xl">
              Better guidance begins with a conversation.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-100">
              Find the right advisor, see their real availability, and turn a quick meeting into a clearer path
              forward.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/register" className="btn-gold px-6 py-3">
                Book your first appointment <ArrowUpRight size={17} />
              </Link>
              <Link to="/login" className="inline-flex items-center justify-center rounded-sm border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
                I already have an account
              </Link>
            </div>
          </div>

          <div className="hidden justify-self-end lg:block">
            <div className="w-72 border border-white/20 bg-white/95 p-5 shadow-2xl backdrop-blur-sm">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">Your next step</span>
                <CalendarCheck size={19} className="text-gold-600" />
              </div>
              <p className="font-serif text-2xl leading-tight text-ink-700">Make time for the questions that matter.</p>
              <div className="mt-7 border-t border-line pt-4 text-sm text-ink-500">
                <span className="font-medium text-ink-700">1,200+</span> student conversations organized
              </div>
            </div>
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
