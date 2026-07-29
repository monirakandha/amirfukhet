'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { ContactSubmission } from '@/types/admin';
import { Mail, Phone, Clock, Trash2, Check, CheckCircle2, MessageSquare, Tag } from 'lucide-react';

export const InquiriesManager: React.FC = () => {
  const { contactSubmissions, markContactStatus, deleteContactSubmission } = useAdmin();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete inquiry from "${name}"?`)) {
      deleteContactSubmission(id);
      showToast('Inquiry deleted.');
    }
  };

  const filteredInquiries = contactSubmissions.filter((sub) => {
    if (filterStatus === 'all') return true;
    return sub.status === filterStatus;
  });

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
            Contact Form Submissions
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Review and respond to viewing requests, valuation inquiries, and general consultations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 uppercase font-heading-bricolage">Filter:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] shadow-xs font-medium"
          >
            <option value="all">All Statuses ({contactSubmissions.length})</option>
            <option value="new">New / Unread ({contactSubmissions.filter(s => s.status === 'new').length})</option>
            <option value="read">Reviewed ({contactSubmissions.filter(s => s.status === 'read').length})</option>
            <option value="replied">Replied ({contactSubmissions.filter(s => s.status === 'replied').length})</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500 font-medium shadow-sm">
            No contact inquiries found matching this filter.
          </div>
        ) : (
          filteredInquiries.map((sub) => (
            <div
              key={sub.id}
              className={`p-6 rounded-3xl border transition-all ${
                sub.status === 'new'
                  ? 'bg-white border-[#5870F7] shadow-md shadow-[#5870F7]/10'
                  : 'bg-slate-50/60 border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-3 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-bold text-gray-900 text-lg font-heading-bricolage">{sub.name}</span>
                    <span className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      sub.status === 'new' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      sub.status === 'replied' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {sub.status}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 uppercase font-mono">
                      {sub.type.replace('-', ' ')}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-600 font-medium">
                    <a href={`mailto:${sub.email}`} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                      <Mail className="w-4 h-4 text-[#5870F7]" />
                      <span>{sub.email}</span>
                    </a>
                    {sub.phone && (
                      <a href={`tel:${sub.phone}`} className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors">
                        <Phone className="w-4 h-4 text-emerald-600" />
                        <span>{sub.phone}</span>
                      </a>
                    )}
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span>{sub.submittedAt}</span>
                    </div>
                  </div>

                  {sub.propertyTitle && (
                    <div className="text-xs text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 inline-block font-medium">
                      📍 Property Ref: <span className="font-bold text-gray-900">{sub.propertyTitle}</span>
                    </div>
                  )}

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 text-sm text-gray-800 leading-relaxed italic shadow-2xs">
                    "{sub.message}"
                  </div>
                </div>

                {/* Status Action Buttons */}
                <div className="flex lg:flex-col items-center lg:items-end justify-end gap-2 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-200">
                  <div className="flex items-center gap-2">
                    {sub.status !== 'read' && (
                      <button
                        onClick={() => {
                          markContactStatus(sub.id, 'read');
                          showToast('Marked as reviewed');
                        }}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        <span>Mark Reviewed</span>
                      </button>
                    )}
                    {sub.status !== 'replied' && (
                      <button
                        onClick={() => {
                          markContactStatus(sub.id, 'replied');
                          showToast('Marked as replied');
                        }}
                        className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#5870F7] border border-blue-200 text-xs font-bold transition-colors flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Mark Replied</span>
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(sub.id, sub.name)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors"
                    title="Delete Inquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
