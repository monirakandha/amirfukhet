'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { SuccessStory, CaseStudyStep } from '@/types';
import { Plus, Edit, Trash2, Check, X, Award, MapPin, TrendingUp, ArrowLeft } from 'lucide-react';
import { MediaPickerButton } from '@/components/admin/MediaManager';
import { RichTextEditor } from './RichTextEditor';

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
  const [steps, setSteps] = useState<CaseStudyStep[]>([]);
  const [metric1Value, setMetric1Value] = useState('');
  const [metric1Label, setMetric1Label] = useState('');
  const [metric2Value, setMetric2Value] = useState('');
  const [metric2Label, setMetric2Label] = useState('');
  const [metric3Value, setMetric3Value] = useState('');
  const [metric3Label, setMetric3Label] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const openAddModal = () => {
    setEditingStory(null);
    setTitle('');
    setSubtitle('');
    setLocation('Phuket');
    setPropertyType('Villa');
    setMetricHighlight('');
    setImage('/images/villa-hero.png');
    setClientName('');
    setClientRole('');
    setTestimonial('');
    setSteps([]);
    setMetric1Value(''); setMetric1Label('');
    setMetric2Value(''); setMetric2Label('');
    setMetric3Value(''); setMetric3Label('');
    setIsFeatured(false);
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
    setClientName(s.clientName || '');
    setClientRole(s.clientRole || '');
    setTestimonial(s.testimonial || s.story || '');
    setSteps(s.steps || []);
    const m = s.metrics || [];
    setMetric1Value(m[0]?.value || ''); setMetric1Label(m[0]?.label || '');
    setMetric2Value(m[1]?.value || ''); setMetric2Label(m[1]?.label || '');
    setMetric3Value(m[2]?.value || ''); setMetric3Label(m[2]?.label || '');
    setIsFeatured(s.isFeatured || false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const metrics = [
      { value: metric1Value, label: metric1Label },
      { value: metric2Value, label: metric2Label },
      { value: metric3Value, label: metric3Label },
    ].filter(m => m.value && m.label);

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
      highlights: [],
      steps,
      metrics,
      isFeatured,
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

  if (isModalOpen) {
    return (
      <div className="p-6 sm:p-8 space-y-6 relative max-w-5xl mx-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-2">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="p-2 -ml-2 rounded-xl hover:bg-slate-200 bg-slate-100 text-slate-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 font-heading-bricolage">
              {editingStory ? 'Edit Success Story' : 'Add New Success Story'}
            </h2>
          </div>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-xl bg-[#5870F7] hover:bg-blue-600 text-white font-semibold text-sm shadow-sm shadow-[#5870F7]/20 transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            {editingStory ? 'Save Changes' : 'Add Case Study'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
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
            <RichTextEditor
              value={subtitle}
              onChange={setSubtitle}
              placeholder="Summary of the success story..."
              className="border border-slate-300 rounded-xl overflow-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
            <RichTextEditor
              value={testimonial}
              onChange={setTestimonial}
              className="border border-slate-300 rounded-xl overflow-hidden [&_.ql-container]:min-h-[120px] [&_.ql-editor]:min-h-[120px]"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-slate-200 pt-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading-bricolage">📋 Case Study Steps (for featured homepage display)</p>
              <button
                type="button"
                onClick={() => setSteps([...steps, { stepNumber: (steps.length + 1).toString().padStart(2, '0'), title: '', body: '' }])}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Step
              </button>
            </div>

            {steps.length === 0 && (
              <div className="text-center py-6 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                <p className="text-sm text-slate-500">No steps added yet.</p>
              </div>
            )}

            {steps.map((step, idx) => (
              <div key={idx} className="space-y-3 mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl relative">
                <div className="absolute top-4 right-4">
                  <button
                    type="button"
                    onClick={() => {
                      const newSteps = [...steps];
                      newSteps.splice(idx, 1);
                      setSteps(newSteps);
                    }}
                    className="p-1.5 rounded-md hover:bg-red-100 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-4 pr-10">
                  <div className="w-24 shrink-0 space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Number</label>
                    <input
                      type="text"
                      value={step.stepNumber || (idx + 1).toString().padStart(2, '0')}
                      onChange={(e) => {
                        const newSteps = [...steps];
                        newSteps[idx].stepNumber = e.target.value;
                        setSteps(newSteps);
                      }}
                      placeholder="e.g. 01"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
                    />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase">Step Title</label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        const newSteps = [...steps];
                        newSteps[idx].title = e.target.value;
                        setSteps(newSteps);
                      }}
                      placeholder="e.g. The Challenge"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">Step {(idx + 1).toString().padStart(2, '0')} Description</label>
                  <div className="border border-slate-300 rounded-xl overflow-hidden [&_.ql-container]:min-h-[80px] [&_.ql-editor]:min-h-[80px]">
                    <RichTextEditor
                      value={step.body}
                      onChange={(val) => {
                        const newSteps = [...steps];
                        newSteps[idx].body = val;
                        setSteps(newSteps);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Metrics Bar */}
          <div className="border-t border-slate-200 pt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 font-heading-bricolage">📊 Metrics Bar (3 stats shown in the case study)</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { valState: metric1Value, valSet: setMetric1Value, lblState: metric1Label, lblSet: setMetric1Label, n: '1' },
                { valState: metric2Value, valSet: setMetric2Value, lblState: metric2Label, lblSet: setMetric2Label, n: '2' },
                { valState: metric3Value, valSet: setMetric3Value, lblState: metric3Label, lblSet: setMetric3Label, n: '3' },
              ].map(({ valState, valSet, lblState, lblSet, n }) => (
                <div key={n} className="space-y-2 bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <p className="text-[11px] font-bold text-slate-500 uppercase">Metric {n}</p>
                  <input
                    type="text"
                    value={valState}
                    onChange={(e) => valSet(e.target.value)}
                    placeholder="e.g. 6.9%"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-gray-900 text-sm font-mono focus:outline-none focus:border-[#5870F7]"
                  />
                  <input
                    type="text"
                    value={lblState}
                    onChange={(e) => lblSet(e.target.value)}
                    placeholder="e.g. Gross rental yield"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="border-t border-slate-200 pt-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setIsFeatured(!isFeatured)}
                className={`w-11 h-6 rounded-full transition-colors relative ${isFeatured ? 'bg-[#5870F7]' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${isFeatured ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
              <span className="font-heading-bricolage text-sm font-bold text-slate-700">
                Feature this story on the homepage
              </span>
            </label>
            <p className="text-xs text-slate-500 mt-1 ml-14">Only one story can be featured at a time. The first featured story found will be displayed.</p>
          </div>

          <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-[#5870F7] hover:bg-blue-600 text-white font-semibold text-sm shadow-md shadow-[#5870F7]/20 transition-all"
            >
              {editingStory ? 'Save Changes' : 'Add Case Study'}
            </button>
          </div>
        </form>
      </div>
    );
  }

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
                      <div 
                        className="text-xs text-slate-600 line-clamp-2 max-w-xs italic font-medium [&_p]:inline [&_br]:hidden"
                        dangerouslySetInnerHTML={{ __html: `"${s.testimonial || s.story || s.subtitle}"` }}
                      />
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

    </div>
  );
};
