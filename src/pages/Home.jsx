import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarCheck, Check, ClipboardCheck, MessageSquareText, Search, ShieldCheck } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

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
      <header className="sticky top-0 z-30 border-b border-line bg-white/95 shadow-sm backdrop-blur dark:bg-ink-800/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <a href="#home" className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="EduConsult" className="h-10 w-10 rounded-lg shadow-sm" />
            <span className="font-serif text-lg font-semibold tracking-wide text-ink-700">EduConsult</span>
          </a>
          <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
            <a href="#home" className="text-sm font-medium text-ink-600 transition-colors hover:text-gold-600">
              Home
            </a>
            <a href="#about" className="text-sm font-medium text-ink-500 transition-colors hover:text-gold-600">
              About us
            </a>
            <a href="#services" className="text-sm font-medium text-ink-500 transition-colors hover:text-gold-600">
              Services
            </a>
            <a href="#contact" className="text-sm font-medium text-ink-500 transition-colors hover:text-gold-600">
              Contact us
            </a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link to="/login" className="hidden text-sm font-medium text-ink-600 transition-colors hover:text-gold-600 sm:inline-flex">
              Log in
            </Link>
            <Link to="/register" className="btn-gold px-3.5 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-sm">
              Get started
            </Link>
          </div>
        </div>
      </header>

      <section
        id="home"
        className="scroll-mt-24 relative isolate overflow-hidden bg-ink-700 bg-cover bg-center"
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
            <div className="w-72 border border-white/20 bg-white/95 p-5 shadow-2xl backdrop-blur-sm dark:border-white/20 dark:bg-ink-800/95">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400 dark:text-ink-200">Your next step</span>
                <CalendarCheck size={19} className="text-gold-600" />
              </div>
              <p className="font-serif text-2xl leading-tight text-ink-700 dark:text-white">Make time for the questions that matter.</p>
              <div className="mt-7 border-t border-line pt-4 text-sm text-ink-500 dark:border-white/20 dark:text-ink-200">
                <span className="font-medium text-ink-700 dark:text-white">1,200+</span> student conversations organized
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-line px-6 py-7 sm:grid-cols-4">
          {[
            ['1,200+', 'student conversations'],
            ['48', 'active consultants'],
            ['12', 'departments connected'],
            ['98%', 'successful bookings'],
          ].map(([value, label]) => (
            <div key={label} className="px-4 first:pl-0 last:pr-0 sm:px-6">
              <p className="font-serif text-2xl text-ink-700">{value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-ink-300">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="scroll-mt-24 mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1100&q=85"
            alt="Students collaborating in a bright classroom"
            className="h-[380px] w-full object-cover"
          />
          <div className="absolute -bottom-5 right-5 max-w-[230px] bg-gold-500 p-5 text-white shadow-xl">
            <p className="font-serif text-xl leading-tight">A clearer path starts with the right question.</p>
          </div>
        </div>
        <div className="lg:pl-8">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-gold-600">About EduConsult</p>
          <h2 className="max-w-xl font-serif text-4xl leading-tight text-ink-700 sm:text-5xl">
            Guidance that keeps people moving forward.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-500">
            EduConsult brings students, consultants, and academic teams into one dependable place. We make it easier
            to ask the right question, find the right person, and keep progress visible after the meeting ends.
          </p>
          <ul className="mt-7 space-y-3 text-sm text-ink-600">
            {['Availability that reflects real working hours', 'A complete record for every consultation', 'Simple oversight for departments and coordinators'].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                  <Check size={13} strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 border-t border-line bg-white py-16">
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

      <section className="border-y border-line bg-paper py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-gold-600">A simpler way forward</p>
            <h2 className="font-serif text-4xl leading-tight text-ink-700 sm:text-5xl">From question to progress in three clear steps.</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              [Search, 'Find your consultant', 'Browse by department, expertise, or the kind of guidance you need.'],
              [CalendarCheck, 'Choose a time', 'See real availability and request an appointment without the back-and-forth.'],
              [ClipboardCheck, 'Keep moving', 'Return to your appointments and consultation notes whenever the next question arrives.'],
            ].map(([Icon, title, body], index) => (
              <div key={title} className="border-t-2 border-gold-500 pt-5">
                <div className="mb-5 flex items-center justify-between">
                  <Icon size={24} className="text-gold-600" strokeWidth={1.7} />
                  <span className="font-serif text-3xl text-ink-200">0{index + 1}</span>
                </div>
                <h3 className="font-serif text-2xl text-ink-700">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=85"
            alt="A team collaborating around a table"
            className="h-[420px] w-full object-cover"
          />
          <div className="absolute -bottom-5 right-5 max-w-[230px] bg-gold-500 p-5 text-white shadow-xl">
            <p className="font-serif text-xl leading-tight">A clearer path starts with the right question.</p>
          </div>
        </div>
        <div className="lg:pl-8">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-gold-600">One place to move forward</p>
          <h2 className="max-w-xl font-serif text-4xl leading-tight text-ink-700 sm:text-5xl">
            Replace scattered emails with meaningful progress.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-500">
            EduConsult gives every student a dependable way to ask for help, while giving every institution a living
            picture of the support being delivered.
          </p>
          <ul className="mt-7 space-y-3 text-sm text-ink-600">
            {['Availability that reflects real working hours', 'A complete record for every consultation', 'Simple oversight for departments and coordinators'].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                  <Check size={13} strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-gold-600">Built around your day</p>
              <h2 className="font-serif text-4xl text-ink-700">Support that feels human.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-500">Every part of the experience is designed to make the next action obvious.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['Find your person', 'Search by department, expertise, or the kind of guidance you need.', 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85'],
              ['Choose your moment', 'See open slots at a glance and book without the back-and-forth.', 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=900&q=85'],
              ['Keep moving', 'Return to your notes and appointments whenever the next question arrives.', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85'],
            ].map(([title, body, image]) => (
              <article key={title} className="group overflow-hidden bg-white">
                <img src={image} alt="" className="h-48 w-full object-cover grayscale transition duration-500 group-hover:grayscale-0" />
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-ink-700">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 mx-auto max-w-6xl px-6 py-20">
        <div className="relative overflow-hidden bg-ink-700 px-8 py-12 sm:px-12">
          <div className="relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-gold-300">Start with one conversation</p>
              <h2 className="font-serif text-3xl text-white sm:text-4xl">Your next step is closer than you think.</h2>
              <p className="mt-2 text-sm text-ink-100">Log in with a demo account or create your student profile.</p>
            </div>
            <Link to="/login" className="btn-gold shrink-0 px-6 py-3">
              Go to sign in <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="absolute -right-12 -top-24 h-64 w-64 rounded-full border-[32px] border-white/5" />
        </div>
      </section>

      <footer className="border-t border-line px-6 py-8 text-center text-sm text-ink-300">
        EduConsult — Smart Online Appointment &amp; Educational Consultancy Management System
      </footer>
    </div>
  );
}
