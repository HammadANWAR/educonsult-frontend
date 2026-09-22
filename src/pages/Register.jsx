import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function onSubmit(values) {
    setServerError('');
    setLoading(true);
    try {
      const user = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        role: 'student',
      });
      navigate(`/${user.role}`);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
          <h1 className="mb-1 font-serif text-2xl text-ink-700">Create your account</h1>
          <p className="mb-6 text-sm text-ink-400">
            Registration here creates a student account. Consultant and admin accounts are added by the
            institution.
          </p>

          {serverError && (
            <p className="mb-4 rounded-sm bg-red-50 px-3 py-2 text-sm text-red-600">{serverError}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">Full name</label>
              <input
                className="input-field"
                placeholder="Ahmed Raza"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>
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
                placeholder="At least 6 characters"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Use at least 6 characters' },
                })}
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>
            <div>
              <label className="label">Confirm password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Re-enter password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (v) => v === watch('password') || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-ink-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-ink-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
