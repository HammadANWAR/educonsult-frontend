import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DEMO_ACCOUNTS = [
  { role: 'Student', email: 'ahmed.student@educonsult.edu', password: 'student123' },
  { role: 'Consultant', email: 'ahmed.khan@educonsult.edu', password: 'consult123' },
  { role: 'Admin', email: 'admin@educonsult.edu', password: 'admin123' },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  async function onSubmit(values) {
    setServerError('');
    setLoading(true);
    try {
      const user = await login(values);
      navigate(`/${user.role}`);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function fillDemo(account) {
    setValue('email', account.email);
    setValue('password', account.password);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-ink-600 text-gold-300">
              <GraduationCap size={18} strokeWidth={1.8} />
            </div>
            <span className="font-serif text-lg text-ink-700">EduConsult</span>
          </Link>
        </div>

        <div className="card p-8">
          <h1 className="mb-1 font-serif text-2xl text-ink-700">Welcome back</h1>
          <p className="mb-6 text-sm text-ink-400">Sign in to manage your appointments.</p>

          {serverError && (
            <p className="mb-4 rounded-sm bg-red-50 px-3 py-2 text-sm text-red-600">{serverError}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@educonsult.edu"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-ink-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-ink-600 hover:underline">
              Register as a student
            </Link>
          </p>
        </div>

        <div className="card mt-4 p-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-ink-300">Demo accounts</p>
          <div className="space-y-2">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                onClick={() => fillDemo(acc)}
                className="flex w-full items-center justify-between rounded-sm border border-line px-3 py-2 text-left text-sm hover:border-ink-300 hover:bg-paper"
              >
                <span className="font-medium text-ink-600">{acc.role}</span>
                <span className="text-ink-300">{acc.email}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
