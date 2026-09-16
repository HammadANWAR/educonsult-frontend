import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { getDb, nextId, persist } from '../../services/mockData';

export default function AdminDepartments() {
  const [db] = useState(getDb());
  const [departments, setDepartments] = useState(db.departments);
  const [name, setName] = useState('');

  function handleAdd(e) {
    e.preventDefault();
    if (!name.trim()) return;
    const dept = { id: nextId(db.departments), name: name.trim() };
    db.departments.push(dept);
    persist();
    setDepartments([...db.departments]);
    setName('');
  }

  return (
    <DashboardLayout title="Departments">
      <form onSubmit={handleAdd} className="card mb-6 flex items-end gap-3 p-5">
        <div className="flex-1">
          <label className="label">New department</label>
          <input className="input-field" placeholder="e.g. Electrical Engineering" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <button type="submit" className="btn-gold flex items-center gap-2">
          <Plus size={15} /> Add
        </button>
      </form>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((d) => {
          const count = db.consultants.filter((c) => c.departmentId === d.id).length;
          return (
            <div key={d.id} className="card p-5">
              <p className="font-serif text-lg text-ink-700">{d.name}</p>
              <p className="mt-1 text-sm text-ink-400">{count} consultant{count === 1 ? '' : 's'}</p>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
