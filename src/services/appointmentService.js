import api, { USE_MOCK, mockDelay } from './api';
import { getDb, nextId, persist } from './mockData';

function enrich(a) {
  const db = getDb();
  const consultant = db.consultants.find((c) => c.id === a.consultantId);
  const student = db.users.find((u) => u.id === a.studentId);
  const category = db.categories.find((c) => c.id === a.categoryId);
  return {
    ...a,
    consultantName: consultant?.name,
    consultantTitle: consultant?.title,
    studentName: student?.name,
    categoryName: category?.name,
  };
}

export async function getAppointments({ studentId, consultantId, status } = {}) {
  if (USE_MOCK) {
    const db = getDb();
    let list = db.appointments;
    if (studentId) list = list.filter((a) => a.studentId === Number(studentId));
    if (consultantId) list = list.filter((a) => a.consultantId === Number(consultantId));
    if (status) list = list.filter((a) => a.status === status);
    list = [...list].sort((a, b) => `${b.date}${b.startTime}`.localeCompare(`${a.date}${a.startTime}`));
    return mockDelay(list.map(enrich));
  }
  // Real backend: GET /api/appointments
  const { data } = await api.get('/appointments', { params: { studentId, consultantId, status } });
  return { data };
}

export async function createAppointment(payload) {
  if (USE_MOCK) {
    const db = getDb();
    const conflict = db.appointments.find(
      (a) =>
        a.consultantId === payload.consultantId &&
        a.date === payload.date &&
        a.startTime === payload.startTime &&
        !['Cancelled', 'Rejected'].includes(a.status)
    );
    if (conflict) {
      const err = new Error('This slot was just booked by someone else. Please pick another.');
      err.response = { data: { message: err.message } };
      throw err;
    }
    const appointment = {
      id: nextId(db.appointments),
      status: 'Pending',
      meetingLink: null,
      notes: null,
      createdAt: new Date().toISOString(),
      ...payload,
    };
    db.appointments.push(appointment);
    db.notifications.push({
      id: nextId(db.notifications),
      userId: db.consultants.find((c) => c.id === payload.consultantId)?.userId,
      message: `New appointment request from ${db.users.find((u) => u.id === payload.studentId)?.name}.`,
      read: false,
      createdAt: new Date().toISOString(),
    });
    persist();
    return mockDelay(enrich(appointment));
  }
  // Real backend: POST /api/appointments
  const { data } = await api.post('/appointments', payload);
  return { data };
}

async function setStatus(id, status, extra = {}) {
  if (USE_MOCK) {
    const db = getDb();
    const appt = db.appointments.find((a) => a.id === Number(id));
    if (!appt) throw new Error('Appointment not found.');
    Object.assign(appt, { status, ...extra });
    db.notifications.push({
      id: nextId(db.notifications),
      userId: appt.studentId,
      message: `Your appointment with ${db.consultants.find((c) => c.id === appt.consultantId)?.name} is now ${status}.`,
      read: false,
      createdAt: new Date().toISOString(),
    });
    persist();
    return mockDelay(enrich(appt));
  }
  // Real backend: PUT /api/appointments/{id}/{status action}
  const path = { Accepted: 'accept', Rejected: 'reject', Cancelled: 'cancel', Completed: 'complete' }[status];
  const { data } = await api.put(`/appointments/${id}/${path}`, extra);
  return { data };
}

export const acceptAppointment = (id, meetingLink) => setStatus(id, 'Accepted', { meetingLink });
export const rejectAppointment = (id) => setStatus(id, 'Rejected');
export const cancelAppointment = (id) => setStatus(id, 'Cancelled');
export const completeAppointment = (id, notes) => setStatus(id, 'Completed', { notes });

export async function rescheduleAppointment(id, { date, startTime, endTime }) {
  if (USE_MOCK) {
    const db = getDb();
    const appt = db.appointments.find((a) => a.id === Number(id));
    Object.assign(appt, { date, startTime, endTime, status: 'Pending' });
    persist();
    return mockDelay(enrich(appt));
  }
  // Real backend: PUT /api/appointments/{id}/reschedule
  const { data } = await api.put(`/appointments/${id}/reschedule`, { date, startTime, endTime });
  return { data };
}

export async function getNotifications(userId) {
  if (USE_MOCK) {
    const db = getDb();
    return mockDelay(
      db.notifications.filter((n) => n.userId === Number(userId)).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    );
  }
  const { data } = await api.get(`/notifications/${userId}`);
  return { data };
}
