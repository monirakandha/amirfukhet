'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Download, Trash2, Check, Users, Mail, Clock, ShieldCheck } from 'lucide-react';

export const NewsletterManager: React.FC = () => {
  const { newsletterSubmissions, deleteNewsletterSubmission } = useAdmin();
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Email or Phone', 'Source', 'Subscribed At', 'Status'];
    const rows = newsletterSubmissions.map((n) => [
      n.id,
      `"${n.emailOrPhone}"`,
      `"${n.source}"`,
      `"${n.subscribedAt}"`,
      n.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `amir_phuket_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Subscribers CSV exported successfully!');
  };

  const handleDelete = (id: string, emailOrPhone: string) => {
    if (window.confirm(`Remove subscriber "${emailOrPhone}"?`)) {
      deleteNewsletterSubmission(id);
      showToast('Subscriber removed.');
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 relative">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-500 text-white font-semibold text-sm shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading-bricolage">
            Newsletter & Lead Magnet Subscribers
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage email subscribers captured from the Free Lead Magnet, Phuket Guide opt-ins, and newsletter forms.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          disabled={newsletterSubmissions.length === 0}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all self-start disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-xs uppercase tracking-wider font-bold font-heading-bricolage">
                <th className="py-4 px-6">Subscriber Contact</th>
                <th className="py-4 px-6">Acquisition Source</th>
                <th className="py-4 px-6">Date Subscribed</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {newsletterSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 font-medium">
                    No newsletter leads collected yet.
                  </td>
                </tr>
              ) : (
                newsletterSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3 font-bold text-gray-900 font-mono">
                        <Mail className="w-4 h-4 text-[#5870F7] shrink-0" />
                        <span>{sub.emailOrPhone}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold">
                        {sub.source}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-medium text-xs">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{sub.subscribedAt}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(sub.id, sub.emailOrPhone)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors"
                        title="Remove Subscriber"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
