import React, { useEffect, useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { getConsultants, createConsultant, deleteConsultant } from '../../services/consultantService';
import { getDb } from '../../services/mockData';

const emptyForm = { name: '', title: '', departmentId: '', experienceYears: '', specializations: '', bio: '' };

export default function AdminConsultants() {
  const [consultants, setConsultants] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const departments = getDb().departments;

  function load() {
    getConsultants().then(({ data }) => setConsultants(data));
  }
  useEffect(load, []);

  async function handleAdd(e) {
    e.preventDefault();
    await createConsultant({
      name: form.name,
      title: form.title,
      departmentId: Number(form.departmentId),
      experienceYears: Number(form.experienceYears) || 0,
      specializations: form.specializations.split(',').map((s) => s.trim()).filter(Boolean),
      bio: form.bio,
    });
    setForm(emptyForm);
    setShowForm(false);
    load();
  }

  async function handleDelete(id) {
    await deleteConsultant(id);
    load();
  }

  return (
    <DashboardLayout title="Consultants">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-ink-400">{consultants.length} approved consultants</p>
        <button onClick={() => setShowForm((v) => !v)} className="btn-gold flex items-center gap-2 text-sm">
          {showForm ? <X size={15} /> : <Plus size={15} />}
          {showForm ? 'Close' : 'Add consultant'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="card mb-6 grid grid-cols-1 gap-3 p-5 sm:grid-cols-2">
          <div>
            <label className="label">Full name</label>
            <input required className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="label">Title</label>
            <input required className="input-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <label className="label">Department</label>
            <select required className="input-field" value={form.departmentId} onChange={(e) => setForm({ ...form, departmentId: e.target.value })}>
              <option value="">Select department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Years of experience</label>
            <input type="number" min="0" className="input-field" value={form.experienceYears} onChange={(e) => setForm({ ...form, experienceYears: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Specializations (comma-separated)</label>
            <input className="input-field" placeholder="Academic Guidance, Career Counseling" value={form.specializations} onChange={(e) => setForm({ ...form, specializations: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Bio</label>
            <textarea className="input-field h-20 resize-none" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary">
              Save consultant
            </button>
          </div>
        </form>
      )}

      <div className="card overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-paper text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Specializations</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {consultants.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-ink-700">{c.name}</p>
                  <p className="text-xs text-ink-400">{c.title}</p>
                </td>
                <td className="px-4 py-3 text-ink-500">{c.departmentName}</td>
                <td className="px-4 py-3 text-ink-500">{c.specializations.join(', ')}</td>
                <td className="px-4 py-3 text-ink-500">{c.rating ? c.rating.toFixed(1) : '—'}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleDelete(c.id)} className="text-ink-300 hover:text-red-500">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
