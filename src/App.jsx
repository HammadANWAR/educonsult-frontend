import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import StudentDashboard from './pages/student/Dashboard';
import StudentConsultants from './pages/student/Consultants';
import ConsultantDetails from './pages/student/ConsultantDetails';
import BookAppointment from './pages/student/BookAppointment';
import MyAppointments from './pages/student/MyAppointments';
import StudentProfile from './pages/student/Profile';

import ConsultantDashboard from './pages/consultant/Dashboard';
import ConsultantAppointments from './pages/consultant/Appointments';
import Availability from './pages/consultant/Availability';
import ConsultationNotes from './pages/consultant/ConsultationNotes';

import AdminDashboard from './pages/admin/Dashboard';
import AdminConsultants from './pages/admin/Consultants';
import AdminUsers from './pages/admin/Users';
import AdminDepartments from './pages/admin/Departments';
import AdminReports from './pages/admin/Reports';

function RoleRedirect() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={`/${user.role}`} replace />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<RoleRedirect />} />

      {/* Student */}
      <Route path="/student" element={<ProtectedRoute roles={['student']}><StudentDashboard /></ProtectedRoute>} />
      <Route path="/student/consultants" element={<ProtectedRoute roles={['student']}><StudentConsultants /></ProtectedRoute>} />
      <Route path="/student/consultants/:id" element={<ProtectedRoute roles={['student']}><ConsultantDetails /></ProtectedRoute>} />
      <Route path="/student/book/:id" element={<ProtectedRoute roles={['student']}><BookAppointment /></ProtectedRoute>} />
      <Route path="/student/appointments" element={<ProtectedRoute roles={['student']}><MyAppointments /></ProtectedRoute>} />
      <Route path="/student/profile" element={<ProtectedRoute roles={['student']}><StudentProfile /></ProtectedRoute>} />

      {/* Consultant */}
      <Route path="/consultant" element={<ProtectedRoute roles={['consultant']}><ConsultantDashboard /></ProtectedRoute>} />
      <Route path="/consultant/appointments" element={<ProtectedRoute roles={['consultant']}><ConsultantAppointments /></ProtectedRoute>} />
      <Route path="/consultant/availability" element={<ProtectedRoute roles={['consultant']}><Availability /></ProtectedRoute>} />
      <Route path="/consultant/notes" element={<ProtectedRoute roles={['consultant']}><ConsultationNotes /></ProtectedRoute>} />

      {/* Admin */}
      <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/consultants" element={<ProtectedRoute roles={['admin']}><AdminConsultants /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute roles={['admin']}><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/departments" element={<ProtectedRoute roles={['admin']}><AdminDepartments /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute roles={['admin']}><AdminReports /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
