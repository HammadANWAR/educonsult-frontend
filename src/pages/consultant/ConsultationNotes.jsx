import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { getAppointments } from '../../services/appointmentService';

export default function ConsultationNotes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getAppointments({ consultantId: user.id, status: 'Completed' }).then(({ data }) =>
      setNotes(data.filter((a) => a.notes))
    );
  }, [user.id]);

  return (
    <DashboardLayout title="Consultation Notes">
      {notes.length === 0 ? (
        <div className="card p-10 text-center text-ink-400">No consultation notes yet.</div>
      ) : (
        <div className="space-y-3">
          {notes.map((n) => (
            <div key={n.id} className="card p-5">
              <div className="flex items-center justify-between">
                <p className="font-medium text-ink-700">{n.studentName}</p>
                <p className="text-xs text-ink-300">{n.date}</p>
              </div>
              <p className="mt-0.5 text-xs uppercase tracking-wide text-ink-300">{n.categoryName}</p>
              <p className="mt-3 rounded-sm bg-paper p-3 text-sm text-ink-500">{n.notes}</p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
