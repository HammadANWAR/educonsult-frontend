import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { getConsultantById, updateAvailability } from '../../services/consultantService';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Availability() {
  const { user } = useAuth();
  const [availability, setAvailability] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getConsultantById(user.id).then(({ data }) => setAvailability(data?.availability || {}));
  }, [user.id]);

  if (!availability) {
    return (
      <DashboardLayout title="Availability">
        <p className="text-sm text-ink-300">Loading…</p>
      </DashboardLayout>
    );
  }

  function addRange(day) {
    setAvailability((prev) => ({ ...prev, [day]: [...(prev[day] || []), ['09:00', '10:00']] }));
    setSaved(false);
  }
  function updateRange(day, idx, pos, value) {
    setAvailability((prev) => {
      const ranges = [...(prev[day] || [])];
      const range = [...ranges[idx]];
      range[pos] = value;
      ranges[idx] = range;
      return { ...prev, [day]: ranges };
    });
    setSaved(false);
  }
  function removeRange(day, idx) {
    setAvailability((prev) => ({ ...prev, [day]: prev[day].filter((_, i) => i !== idx) }));
    setSaved(false);
  }

  async function handleSave() {
    await updateAvailability(user.id, availability);
    setSaved(true);
  }

  return (
    <DashboardLayout title="Availability">
      <div className="card max-w-2xl p-6">
        <p className="mb-5 text-sm text-ink-400">
          Set the time ranges you're open for consultations. Students will only see bookable 30-minute slots
          inside these ranges.
        </p>
        <div className="space-y-5">
          {DAYS.map((day) => (
            <div key={day} className="border-b border-line pb-4 last:border-0">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium text-ink-600">{day}</p>
                <button onClick={() => addRange(day)} className="flex items-center gap-1 text-xs text-ink-500 hover:text-ink-700">
                  <Plus size={13} /> Add range
                </button>
              </div>
              {(availability[day] || []).length === 0 ? (
                <p className="text-xs text-ink-300">Not available</p>
              ) : (
                <div className="space-y-2">
                  {availability[day].map((range, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="time"
                        value={range[0]}
                        onChange={(e) => updateRange(day, idx, 0, e.target.value)}
                        className="input-field w-32 text-sm"
                      />
                      <span className="text-ink-300">to</span>
                      <input
                        type="time"
                        value={range[1]}
                        onChange={(e) => updateRange(day, idx, 1, e.target.value)}
                        className="input-field w-32 text-sm"
                      />
                      <button onClick={() => removeRange(day, idx)} className="text-ink-300 hover:text-red-500">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button onClick={handleSave} className="btn-primary flex items-center gap-2">
            <Save size={15} /> Save availability
          </button>
          {saved && <span className="text-sm text-emerald-600">Saved</span>}
        </div>
      </div>
    </DashboardLayout>
  );
}
