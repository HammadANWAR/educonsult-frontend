import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import AppointmentRow from '../../components/AppointmentRow';
import { useAuth } from '../../context/AuthContext';
import {
  getAppointments,
  acceptAppointment,
  rejectAppointment,
  completeAppointment,
} from '../../services/appointmentService';

const FILTERS = ['All', 'Pending', 'Accepted', 'Completed', 'Cancelled', 'No Show'];

export default function ConsultantAppointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('All');
  const [noteDraftId, setNoteDraftId] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [loading, setLoading] = useState(true);

  function load() {
    getAppointments({ consultantId: user.id }).then(({ data }) => {
      setAppointments(data);
      setLoading(false);
    });
  }
  useEffect(load, [user.id]);

  async function handleAccept(id) {
    await acceptAppointment(id, `https://meet.google.com/edu-${id}`);
    load();
  }
  async function handleReject(id) {
    await rejectAppointment(id);
    load();
  }
  async function submitComplete(id) {
    await completeAppointment(id, noteText);
    setNoteDraftId(null);
    setNoteText('');
    load();
  }

  const filtered = filter === 'All' ? appointments : appointments.filter((a) => a.status === filter);

  return (
    <DashboardLayout title="Appointments">
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-sm border px-3 py-1.5 text-sm ${
              filter === f ? 'border-ink-500 bg-ink-50 text-ink-700' : 'border-line text-ink-500 hover:bg-paper'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-ink-300">Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="card p-10 text-center text-ink-400">Nothing here yet.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => (
            <div key={a.id}>
              <AppointmentRow
                appointment={a}
                perspective="consultant"
                actions={
                  <>
                    {a.status === 'Pending' && (
                      <>
                        <button onClick={() => handleAccept(a.id)} className="btn-gold text-sm">
                          Accept
                        </button>
                        <button onClick={() => handleReject(a.id)} className="btn-ghost text-sm">
                          Reject
                        </button>
                      </>
                    )}
                    {a.status === 'Accepted' && noteDraftId !== a.id && (
                      <button onClick={() => setNoteDraftId(a.id)} className="btn-primary text-sm">
                        Mark as completed
                      </button>
                    )}
                  </>
                }
              />
              {noteDraftId === a.id && (
                <div className="card mt-2 border-l-4 border-l-ink-400 p-4">
                  <label className="label">Consultation notes</label>
                  <textarea
                    className="input-field h-24 resize-none"
                    placeholder="Summarize what was discussed and any recommendations."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                  />
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => submitComplete(a.id)} disabled={!noteText.trim()} className="btn-gold text-sm">
                      Save &amp; complete
                    </button>
                    <button onClick={() => setNoteDraftId(null)} className="btn-ghost text-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
