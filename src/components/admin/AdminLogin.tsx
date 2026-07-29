'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { login } = useAdmin();
  const [email, setEmail] = useState('admin@amirphuket.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      if (!success) {
        setError('Invalid credentials. Please use the demo credentials below.');
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50/40 to-white relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5870F7]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/95 border border-slate-200 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#5870F7]/10 border border-[#5870F7]/30 text-[#5870F7] shadow-lg shadow-[#5870F7]/10 mb-2">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-heading-bricolage">
            Amir Phuket OS
          </h1>
          <p className="text-sm text-slate-600">
            Secure Backend Content & Investment Management Suite
          </p>
        </div>

        {/* Demo Badge Helper */}
        <div className="mb-6 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs space-y-1">
          <div className="font-semibold flex items-center gap-1.5 text-blue-700">
            <span className="w-2 h-2 rounded-full bg-[#5870F7] animate-pulse" />
            Demo Admin Credentials Enabled:
          </div>
          <div className="font-mono text-slate-700">Email: <span className="font-bold text-gray-900">admin@amirphuket.com</span></div>
          <div className="font-mono text-slate-700">Password: <span className="font-bold text-gray-900">admin123</span></div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@amirphuket.com"
                className="w-full bg-white border border-slate-300 rounded-xl px-11 py-3 text-gray-900 placeholder-slate-400 focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20 transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-slate-300 rounded-xl px-11 py-3 text-gray-900 placeholder-slate-400 focus:outline-none focus:border-[#5870F7] focus:ring-2 focus:ring-[#5870F7]/20 transition-all text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#5870F7] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-sm shadow-lg shadow-[#5870F7]/25 hover:shadow-[#5870F7]/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Portal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
          <a
            href="/"
            className="text-xs text-slate-600 hover:text-[#5870F7] transition-colors inline-flex items-center gap-1 font-medium"
          >
            ← Return to Live Website
          </a>
        </div>
      </div>
    </div>
  );
};
