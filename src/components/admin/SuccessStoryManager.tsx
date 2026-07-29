'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { SuccessStory } from '@/types';
import { Plus, Edit, Trash2, Check, X, Award, MapPin, TrendingUp } from 'lucide-react';
import { MediaPickerButton } from '@/components/admin/MediaManager';

export const SuccessStoryManager: React.FC = () => {
  const { successStories, addStory, updateStory, deleteStory } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [location, setLocation] = useState('Kamala Beach, Phuket');
  const [propertyType, setPropertyType] = useState('Luxury Villa');
  const [metricHighlight, setMetricHighlight] = useState('11.8% Net Rental Yield');
  const [image, setImage] = useState('/images/villa-hero.png');
  const [clientName, setClientName] = useState('Dr. Marcus Vance');
  const [clientRole, setClientRole] = useState('International Investor from Singapore');
  const [testimonial, setTestimonial] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const openAddModal = () => {
    setEditingStory(null);
    setTitle('Kamala Cliff Villa Acquisition & Turnaround');
    setSubtitle('How we secured an off-market cliff villa at 15% below valuation.');
    setLocation('Kamala, Phuket');
    setPropertyType('Sea-View Villa');
    setMetricHighlight('12.4% Net Yield');
    setImage('/images/villa-hero.png');
    setClientName('Dr. Alexander Sterling');
    setClientRole('Private Equity Partner, UK');
    setTestimonial('Amir navigated the complex offshore structure seamlessly. His local due diligence saved us months of legal friction and delivered a yield outperforming all our expectations.');
    setIsModalOpen(true);
  };

  const openEditModal = (s: SuccessStory) => {
    setEditingStory(s);
    setTitle(s.title);
    setSubtitle(s.subtitle);
    setLocation(s.location);
    setPropertyType(s.propertyType);
    setMetricHighlight(s.metricHighlight);
    setImage(s.image || '/images/villa-hero.png');
    setClientName(s.clientName || 'Valued Client');
    setClientRole(s.clientRole || 'International Buyer');
    setTestimonial(s.testimonial || s.story || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      subtitle,
      location,
      propertyType,
      metricHighlight,
      image: image || '/images/villa-hero.png',
      clientName,
      clientRole,
      testimonial,
      story: testimonial,
      dateClosed: 'Q2 2026',
      highlights: ['Off-market acquisition', 'Flawless due diligence', 'High annual yield'],
    };

    if (editingStory) {
      updateStory(editingStory.id, payload);
      showToast('Success story updated successfully!');
    } else {
      addStory(payload);
      showToast('New success story added successfully!');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete success story "${title}"?`)) {
      deleteStory(id);
      showToast('Story deleted.');
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
            Success Stories Manager
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Showcase client case studies, high-ROI acquisitions, and verified testimonials.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#5870F7] hover:bg-blue-600 text-white font-semibold text-sm shadow-md shadow-[#5870F7]/20 transition-all self-start"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Story</span>
        </button>
      </div>

      {/* Stories Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-xs uppercase tracking-wider font-bold font-heading-bricolage">
                <th className="py-4 px-6">Case Study & Client</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">ROI Highlight</th>
                <th className="py-4 px-6">Testimonial Quote</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {successStories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 font-medium">
                    No success stories created yet.
                  </td>
                </tr>
              ) : (
                successStories.map((s) => (
                  <tr key={s.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={s.image || '/images/villa-hero.png'}
                          alt={s.title}
                          className="w-16 h-12 rounded-xl object-cover border border-slate-200 shrink-0 shadow-2xs"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-gray-900 truncate max-w-xs">{s.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            Client: <span className="text-slate-700 font-bold">{s.clientName || 'Verified Investor'}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-slate-700 font-bold text-xs flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#5870F7]" />
                        <span>{s.location}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 font-medium">{s.propertyType}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono font-bold text-xs inline-flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-600" />
                        {s.metricHighlight}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-xs text-slate-600 line-clamp-2 max-w-xs italic font-medium">
                        "{s.testimonial || s.story || s.subtitle}"
                      </p>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(s)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 transition-colors"
                          title="Edit Story"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id, s.title)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors"
                          title="Delete Story"
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <h2 className="text-xl font-bold text-gray-900 font-heading-bricolage">
                {editingStory ? 'Edit Success Story' : 'Add New Success Story'}
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
                <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Case Study Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Subtitle / Summary</label>
                <input
                  type="text"
                  required
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Location</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-gray-900 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Property Type</label>
                  <input
                    type="text"
                    required
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-gray-900 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">ROI / Yield Highlight</label>
                  <input
                    type="text"
                    required
                    value={metricHighlight}
                    onChange={(e) => setMetricHighlight(e.target.value)}
                    placeholder="12.4% Net Yield"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-gray-900 text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Client Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-gray-900 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Client Role / Profile</label>
                  <input
                    type="text"
                    value={clientRole}
                    onChange={(e) => setClientRole(e.target.value)}
                    placeholder="International Investor"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-gray-900 text-sm"
                  />
                </div>
              </div>

              <MediaPickerButton
                label="Story Image"
                required
                value={image}
                onChange={setImage}
              />

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Testimonial Quote / Story</label>
                <textarea
                  rows={4}
                  required
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-gray-900 text-sm italic focus:outline-none focus:border-[#5870F7]"
                />
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
                  {editingStory ? 'Save Changes' : 'Add Case Study'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
