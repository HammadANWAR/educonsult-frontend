import api, { USE_MOCK, mockDelay } from './api';
import { getDb, nextId, persist } from './mockData';

export async function getConsultants({ search = '', departmentId = '', categoryName = '' } = {}) {
  if (USE_MOCK) {
    const db = getDb();
    let list = db.consultants.filter((c) => c.status === 'approved');
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.specializations.some((s) => s.toLowerCase().includes(q))
      );
    }
    if (departmentId) {
      list = list.filter((c) => String(c.departmentId) === String(departmentId));
    }
    if (categoryName) {
      list = list.filter((c) => c.specializations.includes(categoryName));
    }
    return mockDelay(
      list.map((c) => ({ ...c, departmentName: db.departments.find((d) => d.id === c.departmentId)?.name }))
    );
  }
  // Real backend: GET /api/consultants
  const { data } = await api.get('/consultants', { params: { search, departmentId, categoryName } });
  return { data };
}

export async function getConsultantById(id) {
  if (USE_MOCK) {
    const db = getDb();
    const c = db.consultants.find((x) => x.id === Number(id));
    if (!c) return mockDelay(null);
    return mockDelay({ ...c, departmentName: db.departments.find((d) => d.id === c.departmentId)?.name });
  }
  // Real backend: GET /api/consultants/{id}
  const { data } = await api.get(`/consultants/${id}`);
  return { data };
}

export async function updateAvailability(consultantId, availability) {
  if (USE_MOCK) {
    const db = getDb();
    const c = db.consultants.find((x) => x.id === Number(consultantId));
    if (c) {
      c.availability = availability;
      persist();
    }
    return mockDelay(c);
  }
  // Real backend: PUT /api/availability/{id}
  const { data } = await api.put(`/availability/${consultantId}`, { availability });
  return { data };
}

export async function createConsultant(payload) {
  if (USE_MOCK) {
    const db = getDb();
    const consultant = {
      id: nextId(db.consultants),
      userId: null,
      rating: 0,
      reviewCount: 0,
      status: 'approved',
      availability: { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: [] },
      ...payload,
    };
    db.consultants.push(consultant);
    persist();
    return mockDelay(consultant);
  }
  // Real backend: POST /api/consultants
  const { data } = await api.post('/consultants', payload);
  return { data };
}

export async function deleteConsultant(id) {
  if (USE_MOCK) {
    const db = getDb();
    db.consultants = db.consultants.filter((c) => c.id !== Number(id));
    persist();
    return mockDelay({ success: true });
  }
  // Real backend: DELETE /api/consultants/{id}
  const { data } = await api.delete(`/consultants/${id}`);
  return { data };
}

// Generates bookable 30-minute slots for a given day from a consultant's
// availability ranges, minus whatever is already booked that day.
export function generateSlotsForDay(consultant, dayName, bookedTimes = []) {
  const ranges = consultant.availability?.[dayName] || [];
  const slots = [];
  ranges.forEach(([start, end]) => {
    let [h, m] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    while (h < endH || (h === endH && m < endM)) {
      const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      slots.push({ time, booked: bookedTimes.includes(time) });
      m += 30;
      if (m >= 60) {
        m = 0;
        h += 1;
      }
    }
  });
  return slots;
}
