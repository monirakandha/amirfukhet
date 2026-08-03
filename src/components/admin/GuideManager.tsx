'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Save, Check, LayoutTemplate, ImageIcon, Type } from 'lucide-react';
import { MediaPickerButton } from '@/components/admin/MediaManager';

export const GuideManager: React.FC = () => {
  const { guideContent, updateGuideContent } = useAdmin();
  const [formData, setFormData] = useState(guideContent);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateGuideContent(formData);
    showToast('Guide page content saved successfully!');
  };

  const updateSection = (sectionKey: keyof typeof guideContent, field: string, value: string) => {
    if (sectionKey === 'heroImage') {
      setFormData(prev => ({ ...prev, heroImage: value }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      [sectionKey]: {
        ...(prev[sectionKey as keyof typeof prev] as any),
        [field]: value
      }
    }));
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <LayoutTemplate className="w-6 h-6 text-[#5870F7]" />
            Guide Page Content
          </h2>
          <p className="text-gray-500 mt-1">Manage the dynamic sections on The Complete Phuket Guide page.</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#5870F7] hover:bg-blue-600 text-white rounded-xl font-medium transition-colors shadow-sm shadow-[#5870F7]/20"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {toast && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl flex items-center gap-3 border border-emerald-100 animate-in fade-in slide-in-from-top-4">
          <div className="bg-emerald-100 p-1 rounded-full"><Check className="w-4 h-4" /></div>
          <span className="font-medium text-sm">{toast}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Top Header */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-2 text-slate-700 font-semibold">
            <ImageIcon className="w-5 h-5 text-[#5870F7]" />
            Header & Hero
          </div>
          <div className="p-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Hero Image URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.heroImage}
                  onChange={(e) => updateSection('heroImage', '', e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none"
                />
                <MediaPickerButton onSelect={(url) => updateSection('heroImage', '', url)} />
              </div>
            </div>
          </div>
        </div>

        {/* Section 1 */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-2 text-slate-700 font-semibold">
            <Type className="w-5 h-5 text-[#5870F7]" />
            Section 1: Can foreigners own property?
          </div>
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Heading</label>
              <input
                type="text"
                value={formData.section1.heading}
                onChange={(e) => updateSection('section1', 'heading', e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Paragraph 1</label>
              <textarea
                rows={3}
                value={formData.section1.paragraph1}
                onChange={(e) => updateSection('section1', 'paragraph1', e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Paragraph 2</label>
              <textarea
                rows={3}
                value={formData.section1.paragraph2}
                onChange={(e) => updateSection('section1', 'paragraph2', e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-2 text-slate-700 font-semibold">
            <LayoutTemplate className="w-5 h-5 text-[#5870F7]" />
            Section 2: Freehold vs Leasehold
          </div>
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Heading</label>
              <input
                type="text"
                value={formData.section2.heading}
                onChange={(e) => updateSection('section2', 'heading', e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Description</label>
              <input
                type="text"
                value={formData.section2.description}
                onChange={(e) => updateSection('section2', 'description', e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-gray-900 bg-blue-50 px-3 py-1.5 rounded-md inline-block">Freehold Card</h4>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600">Card Title</label>
                  <input
                    type="text"
                    value={formData.section2.freeholdCardTitle}
                    onChange={(e) => updateSection('section2', 'freeholdCardTitle', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600">Card Description</label>
                  <textarea
                    rows={3}
                    value={formData.section2.freeholdCardDesc}
                    onChange={(e) => updateSection('section2', 'freeholdCardDesc', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-gray-900 bg-blue-50 px-3 py-1.5 rounded-md inline-block">Leasehold Card</h4>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600">Card Title</label>
                  <input
                    type="text"
                    value={formData.section2.leaseholdCardTitle}
                    onChange={(e) => updateSection('section2', 'leaseholdCardTitle', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600">Card Description</label>
                  <textarea
                    rows={3}
                    value={formData.section2.leaseholdCardDesc}
                    onChange={(e) => updateSection('section2', 'leaseholdCardDesc', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-2 text-slate-700 font-semibold">
            <LayoutTemplate className="w-5 h-5 text-[#5870F7]" />
            Section 3: The step-by-step buying process
          </div>
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Heading</label>
              <input
                type="text"
                value={formData.section3.heading}
                onChange={(e) => updateSection('section3', 'heading', e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none"
              />
            </div>
            
            <div className="space-y-4 pt-2">
              {[1, 2, 3, 4].map(num => (
                <div key={num} className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600">Step 0{num}</label>
                  <input
                    type="text"
                    value={formData.section3[`step${num}` as keyof typeof formData.section3]}
                    onChange={(e) => updateSection('section3', `step${num}`, e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Remaining Sections */}
        {[
          { key: 'section4', title: 'Section 4: Taxes & transfer fees' },
          { key: 'section5', title: 'Section 5: Financing options' },
          { key: 'section6', title: 'Section 6: Due diligence checklist' },
          { key: 'section7', title: 'Section 7: The real risks' },
        ].map((sec) => (
          <div key={sec.key} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-2 text-slate-700 font-semibold">
              <Type className="w-5 h-5 text-[#5870F7]" />
              {sec.title}
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Heading</label>
                <input
                  type="text"
                  value={formData[sec.key as keyof typeof formData].heading as string}
                  onChange={(e) => updateSection(sec.key as keyof typeof formData, 'heading', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Content</label>
                <textarea
                  rows={4}
                  value={formData[sec.key as keyof typeof formData].content as string}
                  onChange={(e) => updateSection(sec.key as keyof typeof formData, 'content', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none"
                />
              </div>
            </div>
          </div>
        ))}

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-2 text-slate-700 font-semibold">
            <Type className="w-5 h-5 text-[#5870F7]" />
            Section 8: FAQ Header
          </div>
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Heading</label>
              <input
                type="text"
                value={formData.sectionFaq.heading}
                onChange={(e) => updateSection('sectionFaq', 'heading', e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Description</label>
              <input
                type="text"
                value={formData.sectionFaq.description}
                onChange={(e) => updateSection('sectionFaq', 'description', e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-[#5870F7] focus:ring-1 focus:ring-[#5870F7] outline-none"
              />
            </div>
            <p className="text-xs text-slate-500 italic mt-2">
              Note: The actual questions and answers are managed in the FAQ Manager tab.
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-[#5870F7] hover:bg-blue-600 text-white rounded-xl font-medium transition-colors shadow-md"
          >
            <Save className="w-5 h-5" />
            Save All Changes
          </button>
        </div>

      </form>
    </div>
  );
};
