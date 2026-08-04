'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { FAQItem } from '@/types/admin';
import { Plus, Edit, Trash2, Check, X, HelpCircle } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';

export const FaqManager: React.FC = () => {
  const { faqs, addFaq, updateFaq, deleteFaq } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState<FAQItem['category']>('legal');
  const [order, setOrder] = useState(1);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const openAddModal = () => {
    setEditingFaq(null);
    setQuestion('What is a Leasehold vs Freehold structure?');
    setAnswer('Freehold gives permanent outright ownership of the property title. Leasehold grants a secure registered 30-year lease with contractual renewal options typically extending up to 90 years.');
    setCategory('legal');
    setOrder(faqs.length + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (f: FAQItem) => {
    setEditingFaq(f);
    setQuestion(f.question);
    setAnswer(f.answer);
    setCategory(f.category);
    setOrder(f.order);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { question, answer, category, order: Number(order) || 1 };
    if (editingFaq) {
      updateFaq(editingFaq.id, payload);
      showToast('FAQ updated successfully!');
    } else {
      addFaq(payload);
      showToast('New FAQ added successfully!');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, q: string) => {
    if (window.confirm(`Delete FAQ "${q}"?`)) {
      deleteFaq(id);
      showToast('FAQ deleted.');
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
            FAQ Manager
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage common questions and answers displayed in the guide and buyer resource center.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#5870F7] hover:bg-blue-600 text-white font-semibold text-sm shadow-md shadow-[#5870F7]/20 transition-all self-start"
        >
          <Plus className="w-5 h-5" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-xs uppercase tracking-wider font-bold font-heading-bricolage">
                <th className="py-4 px-6 w-16">Ord</th>
                <th className="py-4 px-6">Question & Answer</th>
                <th className="py-4 px-6 w-36">Category</th>
                <th className="py-4 px-6 text-right w-28">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {faqs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500 font-medium">No FAQs added yet.</td>
                </tr>
              ) : (
                faqs.map((f) => (
                  <tr key={f.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-500">#{f.order}</td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-[#5870F7] shrink-0" />
                        <span>{f.question}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-2xl font-medium">{f.answer}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs uppercase font-bold">
                        {f.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(f)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 transition-colors"
                          title="Edit FAQ"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(f.id, f.question)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors"
                          title="Delete FAQ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <h2 className="text-xl font-bold text-gray-900 font-heading-bricolage">
                {editingFaq ? 'Edit FAQ Item' : 'Add New FAQ Item'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Question</label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7] font-medium"
                  >
                    <option value="legal">Legal & Ownership</option>
                    <option value="investment">Investment & ROI</option>
                    <option value="buying-process">Buying Process</option>
                    <option value="general">General Phuket Info</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Display Order #</label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
                  >
                  </input>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Answer</label>
                <div className="border border-slate-300 rounded-xl overflow-hidden [&_.ql-container]:min-h-[120px] [&_.ql-editor]:min-h-[120px]">
                  <RichTextEditor
                    value={answer}
                    onChange={(val) => setAnswer(val)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#5870F7] hover:bg-blue-600 text-white font-semibold text-sm shadow-md shadow-[#5870F7]/20 transition-all"
                >
                  {editingFaq ? 'Save Changes' : 'Add FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
