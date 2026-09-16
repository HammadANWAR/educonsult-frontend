import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import ConsultantCard from '../../components/ConsultantCard';
import { getConsultants } from '../../services/consultantService';
import { getDb } from '../../services/mockData';

export default function Consultants() {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const departments = getDb().departments;
  const categories = getDb().categories;

  useEffect(() => {
    setLoading(true);
    getConsultants({ search, departmentId, categoryName }).then(({ data }) => {
      setConsultants(data);
      setLoading(false);
    });
  }, [search, departmentId, categoryName]);

  return (
    <DashboardLayout title="Find a Consultant">
      <div className="card mb-6 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
          <input
            className="input-field pl-9"
            placeholder="Search by name, title, or specialization"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="input-field sm:w-52" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
          <option value="">All departments</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        <select className="input-field sm:w-56" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}>
          <option value="">All consultation types</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-ink-300">Loading consultants…</p>
      ) : consultants.length === 0 ? (
        <div className="card p-10 text-center text-ink-400">No consultants match those filters.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {consultants.map((c) => (
            <ConsultantCard key={c.id} consultant={c} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
