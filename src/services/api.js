import axios from 'axios';

// --------------------------------------------------------------------------
// This is the single place the frontend talks to the real backend.
//
// Right now USE_MOCK is true, so every service function in this folder
// resolves against src/services/mockData.js instead of hitting the network.
// That lets the whole UI be demoed and clicked through with zero backend.
//
// When the ASP.NET Core Web API is ready:
//   1. Set VITE_API_URL in a .env file, e.g. VITE_API_URL=https://localhost:5001/api
//   2. Set USE_MOCK to false below.
//   3. Nothing else changes — every service function already calls `api`
//      with the exact endpoint paths from the API plan (section 15).
// --------------------------------------------------------------------------
export const USE_MOCK = true;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:5001/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach the JWT (once ASP.NET Identity/JWT auth is live) to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('educonsult_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized 401 handling: token expired/invalid -> bounce to login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('educonsult_token');
      localStorage.removeItem('educonsult_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Small helper so every mock service function can fake network latency
// consistently, which also makes loading states visible during dev.
export const mockDelay = (data, ms = 350) =>
  new Promise((resolve) => setTimeout(() => resolve({ data }), ms));

export default api;
