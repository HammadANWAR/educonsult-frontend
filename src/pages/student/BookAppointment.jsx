import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { getConsultantById, generateSlotsForDay } from '../../services/consultantService';
import { createAppointment, getAppointments } from '../../services/appointmentService';
import { getDb } from '../../services/mockData';
import { useAuth } from '../../context/AuthContext';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function nextNDates(n = 14) {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
}

export default function BookAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [consultant, setConsultant] = useState(null);
  const [existing, setExisting] = useState([]);
  const [step, setStep] = useState(1);
  const [categoryId, setCategoryId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [slot, setSlot] = useState(null);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const categories = getDb().categories;
  const dates = useMemo(() => nextNDates(), []);

  useEffect(() => {
    getConsultantById(id).then(({ data }) => setConsultant(data));
    getAppointments({ consultantId: id }).then(({ data }) => setExisting(data));
  }, [id]);

  if (!consultant) {
    return (
      <DashboardLayout title="Book Appointment">
        <p className="text-sm text-ink-300">Loading…</p>
      </DashboardLayout>
    );
  }

  const dateKey = (d) => d.toISOString().slice(0, 10);
  const bookedTimesFor = (d) =>
    existing
      .filter((a) => a.date === dateKey(d) && !['Cancelled', 'Rejected'].includes(a.status))
      .map((a) => a.startTime);

  const slots = selectedDate
    ? generateSlotsForDay(consultant, DAY_NAMES[selectedDate.getDay()], bookedTimesFor(selectedDate))
    : [];

  async function handleConfirm() {
    setSubmitting(true);
    setError('');
    try {
      const [h, m] = slot.time.split(':').map(Number);
      const endM = m + 30;
      const endTime = `${String(endM >= 60 ? h + 1 : h).padStart(2, '0')}:${String(endM % 60).padStart(2, '0')}`;
      await createAppointment({
        studentId: user.id,
        consultantId: consultant.id,
        categoryId: Number(categoryId),
        date: dateKey(selectedDate),
        startTime: slot.time,
        endTime,
        reason,
      });
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not book that slot. Please try another.');
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <DashboardLayout title="Book Appointment">
        <div className="card mx-auto max-w-lg p-10 text-center">
          <CheckCircle2 size={40} className="mx-auto mb-4 text-emerald-500" />
          <h2 className="font-serif text-xl text-ink-700">Request sent</h2>
          <p className="mt-2 text-sm text-ink-500">
            Your appointment request with {consultant.name} for {dateKey(selectedDate)} at {slot.time} has been
            submitted. You'll be notified once it's accepted.
          </p>
          <button onClick={() => navigate('/student/appointments')} className="btn-primary mt-6">
            View my appointments
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const steps = ['Type', 'Date', 'Time', 'Reason'];

  return (
    <DashboardLayout title={`Book with ${consultant.name}`}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center gap-2">
          {steps.map((label, i) => (
            <React.Fragment key={label}>
              <div className={`flex items-center gap-2 text-sm ${step === i + 1 ? 'text-ink-700' : 'text-ink-300'}`}>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                    step > i + 1 ? 'bg-emerald-500 text-white' : step === i + 1 ? 'bg-ink-600 text-white' : 'bg-ink-100'
                  }`}
                >
                  {step > i + 1 ? '✓' : i + 1}
                </span>
                {label}
              </div>
              {i < steps.length - 1 && <div className="h-px w-6 bg-line" />}
            </React.Fragment>
          ))}
        </div>

        <div className="card p-6">
          {step === 1 && (
            <div>
              <h2 className="mb-4 font-serif text-lg text-ink-700">What's this consultation about?</h2>
              <div className="space-y-2">
                {categories
                  .filter((c) => consultant.specializations.includes(c.name))
                  .map((c) => (
                    <label
                      key={c.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-sm border p-3 text-sm ${
                        categoryId === String(c.id) ? 'border-ink-500 bg-ink-50' : 'border-line hover:bg-paper'
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={c.id}
                        checked={categoryId === String(c.id)}
                        onChange={(e) => setCategoryId(e.target.value)}
                      />
                      {c.name}
                    </label>
                  ))}
              </div>
              <button disabled={!categoryId} onClick={() => setStep(2)} className="btn-primary mt-6">
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="mb-4 font-serif text-lg text-ink-700">Choose a date</h2>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {dates.map((d) => {
                  const dayName = DAY_NAMES[d.getDay()];
                  const available = (consultant.availability[dayName] || []).length > 0;
                  const isSelected = selectedDate && dateKey(selectedDate) === dateKey(d);
                  return (
                    <button
                      key={dateKey(d)}
                      disabled={!available}
                      onClick={() => {
                        setSelectedDate(d);
                        setSlot(null);
                      }}
                      className={`flex flex-col items-center rounded-sm border p-2.5 text-xs ${
                        !available
                          ? 'cursor-not-allowed border-line text-ink-200'
                          : isSelected
                          ? 'border-ink-500 bg-ink-50 text-ink-700'
                          : 'border-line text-ink-500 hover:bg-paper'
                      }`}
                    >
                      <span>{d.toLocaleDateString(undefined, { weekday: 'short' })}</span>
                      <span className="mt-1 font-medium">{d.getDate()}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex gap-2">
                <button onClick={() => setStep(1)} className="btn-ghost">
                  Back
                </button>
                <button disabled={!selectedDate} onClick={() => setStep(3)} className="btn-primary">
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="mb-4 font-serif text-lg text-ink-700">
                Available times · {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
              </h2>
              {slots.length === 0 ? (
                <p className="text-sm text-ink-400">No slots generated for this day.</p>
              ) : (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {slots.map((s) => (
                    <button
                      key={s.time}
                      disabled={s.booked}
                      onClick={() => setSlot(s)}
                      className={`rounded-sm border p-2.5 text-sm ${
                        s.booked
                          ? 'cursor-not-allowed border-line bg-paper text-ink-200 line-through'
                          : slot?.time === s.time
                          ? 'border-ink-500 bg-ink-50 text-ink-700'
                          : 'border-line text-ink-600 hover:bg-paper'
                      }`}
                    >
                      {s.time}
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-6 flex gap-2">
                <button onClick={() => setStep(2)} className="btn-ghost">
                  Back
                </button>
                <button disabled={!slot} onClick={() => setStep(4)} className="btn-primary">
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="mb-4 font-serif text-lg text-ink-700">What would you like to discuss?</h2>
              <textarea
                className="input-field h-28 resize-none"
                placeholder="e.g. I need guidance regarding my Final Year Project topic."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <div className="mt-4 rounded-sm bg-paper p-4 text-sm text-ink-500">
                <p>
                  <span className="text-ink-400">With:</span> {consultant.name}
                </p>
                <p>
                  <span className="text-ink-400">When:</span> {dateKey(selectedDate)} at {slot.time}
                </p>
                <p>
                  <span className="text-ink-400">Type:</span>{' '}
                  {categories.find((c) => String(c.id) === categoryId)?.name}
                </p>
              </div>
              {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
              <div className="mt-6 flex gap-2">
                <button onClick={() => setStep(3)} className="btn-ghost">
                  Back
                </button>
                <button disabled={!reason.trim() || submitting} onClick={handleConfirm} className="btn-gold">
                  {submitting ? 'Booking…' : 'Confirm booking'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
