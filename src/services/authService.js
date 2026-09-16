import api, { USE_MOCK, mockDelay } from './api';
import { getDb, nextId, persist } from './mockData';

function fakeToken(user) {
  return btoa(JSON.stringify({ sub: user.id, role: user.role, name: user.name }));
}

export async function login({ email, password }) {
  if (USE_MOCK) {
    const db = getDb();
    const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      const err = new Error('Invalid email or password.');
      err.response = { data: { message: 'Invalid email or password.' } };
      throw err;
    }
    const { password: _pw, ...safeUser } = user;
    return mockDelay({ token: fakeToken(user), user: safeUser });
  }
  // Real backend: POST /api/auth/login
  const { data } = await api.post('/auth/login', { email, password });
  return { data };
}

export async function register({ name, email, password, role = 'student' }) {
  if (USE_MOCK) {
    const db = getDb();
    if (db.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      const err = new Error('An account with this email already exists.');
      err.response = { data: { message: 'An account with this email already exists.' } };
      throw err;
    }
    const user = { id: nextId(db.users), name, email, role, password };
    db.users.push(user);
    persist();
    const { password: _pw, ...safeUser } = user;
    return mockDelay({ token: fakeToken(user), user: safeUser });
  }
  // Real backend: POST /api/auth/register
  const { data } = await api.post('/auth/register', { name, email, password, role });
  return { data };
}

export async function getProfile() {
  if (USE_MOCK) {
    const raw = localStorage.getItem('educonsult_user');
    return mockDelay(raw ? JSON.parse(raw) : null, 100);
  }
  // Real backend: GET /api/auth/profile
  const { data } = await api.get('/auth/profile');
  return { data };
}
