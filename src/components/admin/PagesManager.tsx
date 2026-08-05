'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Save, CheckCircle2, AlertCircle, LayoutTemplate } from 'lucide-react';
import { MediaPickerButton } from '@/components/admin/MediaManager';

type TabId = 'insights' | 'listings' | 'successStories' | 'about' | 'workWithMe' | 'contact';

export default function PagesManager() {
  const { settings, updateSiteSettings } = useAdmin();
  const [activeTab, setActiveTab] = useState<TabId>('insights');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // We operate on a local copy of pagesContent for editing
  const [formData, setFormData] = useState(settings.pagesContent || {});

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    try {
      updateSiteSettings({
        pagesContent: formData
      });
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err) {
      console.error('Failed to save pages settings:', err);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNestedChange = (page: keyof typeof formData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [page]: {
        ...(prev[page] || {}),
        [field]: value
      }
    }));
  };

  const renderHeroFields = (pageKey: keyof typeof formData, title: string) => {
    const pageData = formData[pageKey] || {};
    return (
      <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-4 mb-4">{title} Hero</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Pill Badge</label>
            <input
              type="text"
              value={pageData.pill || pageData.heroPill || ''}
              onChange={(e) => handleNestedChange(pageKey, pageKey.endsWith('Page') ? 'heroPill' : 'pill', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] focus:border-[#5870F7] outline-none transition-all"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
            <input
              type="text"
              value={pageData.headline || pageData.heroHeadline || ''}
              onChange={(e) => handleNestedChange(pageKey, pageKey.endsWith('Page') ? 'heroHeadline' : 'headline', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] focus:border-[#5870F7] outline-none transition-all"
              placeholder="Use <br /> for line breaks"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={3}
              value={pageData.description || pageData.heroDescription || ''}
              onChange={(e) => handleNestedChange(pageKey, pageKey.endsWith('Page') ? 'heroDescription' : 'description', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] focus:border-[#5870F7] outline-none transition-all"
            />
          </div>

          {pageKey === 'aboutPage' && (
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
              <div className="flex items-center gap-4">
                {pageData.heroImage && (
                  <img src={pageData.heroImage} alt="Hero" className="h-16 w-16 object-cover rounded-lg border border-gray-200" />
                )}
                <MediaPickerButton 
                  onSelect={(url) => handleNestedChange(pageKey, 'heroImage', url)} 
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderWorkWithMeFields = () => {
    const pageData = formData.workWithMePage || {};
    return (
      <div className="space-y-6">
        {renderHeroFields('workWithMePage', 'Work With Me')}

        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-4 mb-4">Advisor vs Portal Section</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={pageData.advisorSectionTitle || ''}
                onChange={(e) => handleNestedChange('workWithMePage', 'advisorSectionTitle', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] focus:border-[#5870F7] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
              <textarea
                rows={2}
                value={pageData.advisorSectionDescription || ''}
                onChange={(e) => handleNestedChange('workWithMePage', 'advisorSectionDescription', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] focus:border-[#5870F7] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-4 mb-4">Confidence Section</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pill Badge</label>
              <input
                type="text"
                value={pageData.confidenceSectionPill || ''}
                onChange={(e) => handleNestedChange('workWithMePage', 'confidenceSectionPill', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] focus:border-[#5870F7] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
              <input
                type="text"
                value={pageData.confidenceSectionHeadline || ''}
                onChange={(e) => handleNestedChange('workWithMePage', 'confidenceSectionHeadline', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] focus:border-[#5870F7] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Image</label>
              <div className="flex items-center gap-4">
                {pageData.confidenceSectionImage && (
                  <img src={pageData.confidenceSectionImage} alt="Confidence" className="h-16 w-24 object-cover rounded-lg border border-gray-200" />
                )}
                <MediaPickerButton 
                  onSelect={(url) => handleNestedChange('workWithMePage', 'confidenceSectionImage', url)} 
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-4 mb-4">Process Section</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pill Badge</label>
              <input
                type="text"
                value={pageData.processSectionPill || ''}
                onChange={(e) => handleNestedChange('workWithMePage', 'processSectionPill', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] focus:border-[#5870F7] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
              <input
                type="text"
                value={pageData.processSectionHeadline || ''}
                onChange={(e) => handleNestedChange('workWithMePage', 'processSectionHeadline', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] focus:border-[#5870F7] outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tabs: { id: TabId; label: string }[] = [
    { id: 'insights', label: 'Insights (Blog)' },
    { id: 'listings', label: 'Listings (Props)' },
    { id: 'successStories', label: 'Success Stories' },
    { id: 'about', label: 'About Page' },
    { id: 'workWithMe', label: 'Work With Me' },
    { id: 'contact', label: 'Contact Page' },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <LayoutTemplate className="w-6 h-6 text-[#5870F7]" />
            Inner Pages Editor
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage content across all inner pages of the site.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#5870F7] text-white rounded-xl hover:bg-blue-600 transition-colors font-medium disabled:opacity-70"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {saveStatus === 'success' && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl flex items-center gap-3 border border-emerald-100">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <p className="font-medium">Page settings saved successfully.</p>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="font-medium">Failed to save page settings. Please try again.</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-200 hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-5 py-3.5 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'border-[#5870F7] text-[#5870F7]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="py-4">
        {activeTab === 'insights' && renderHeroFields('insightsHero', 'Insights Page')}
        {activeTab === 'listings' && renderHeroFields('listingsHero', 'Listings Page')}
        {activeTab === 'successStories' && renderHeroFields('successStoriesHero', 'Success Stories Page')}
        {activeTab === 'about' && renderHeroFields('aboutPage', 'About Page')}
        {activeTab === 'contact' && renderHeroFields('contactPage', 'Contact Page')}
        {activeTab === 'workWithMe' && renderWorkWithMeFields()}
      </div>
    </div>
  );
}
