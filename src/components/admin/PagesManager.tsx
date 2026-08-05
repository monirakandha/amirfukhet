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
  const renderAboutFields = () => {
    const pageData = formData.aboutPage || {};
    return (
      <div className="space-y-6">
        {renderHeroFields('aboutPage', 'About Page')}

        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-4 mb-4">Stats Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stat 1 Value</label>
              <input
                type="text"
                value={pageData.stat1Value || ''}
                onChange={(e) => handleNestedChange('aboutPage', 'stat1Value', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stat 1 Label</label>
              <input
                type="text"
                value={pageData.stat1Label || ''}
                onChange={(e) => handleNestedChange('aboutPage', 'stat1Label', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stat 2 Value</label>
              <input
                type="text"
                value={pageData.stat2Value || ''}
                onChange={(e) => handleNestedChange('aboutPage', 'stat2Value', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stat 2 Label</label>
              <input
                type="text"
                value={pageData.stat2Label || ''}
                onChange={(e) => handleNestedChange('aboutPage', 'stat2Label', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stat 3 Value</label>
              <input
                type="text"
                value={pageData.stat3Value || ''}
                onChange={(e) => handleNestedChange('aboutPage', 'stat3Value', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stat 3 Label</label>
              <input
                type="text"
                value={pageData.stat3Label || ''}
                onChange={(e) => handleNestedChange('aboutPage', 'stat3Label', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-4 mb-4">Content Sections</h3>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-800">My Story</h4>
            <input
              type="text"
              placeholder="Headline"
              value={pageData.storyHeadline || ''}
              onChange={(e) => handleNestedChange('aboutPage', 'storyHeadline', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
            />
            <textarea
              rows={3}
              placeholder="Description"
              value={pageData.storyDescription || ''}
              onChange={(e) => handleNestedChange('aboutPage', 'storyDescription', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h4 className="font-medium text-gray-800">My Approach & Philosophy</h4>
            <input
              type="text"
              placeholder="Headline"
              value={pageData.approachHeadline || ''}
              onChange={(e) => handleNestedChange('aboutPage', 'approachHeadline', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
            />
            <textarea
              rows={3}
              placeholder="Description"
              value={pageData.approachDescription || ''}
              onChange={(e) => handleNestedChange('aboutPage', 'approachDescription', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-4 mb-4">Callout Section</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
              <input
                type="text"
                value={pageData.calloutHeadline || ''}
                onChange={(e) => handleNestedChange('aboutPage', 'calloutHeadline', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subheading</label>
              <input
                type="text"
                value={pageData.calloutSubheading || ''}
                onChange={(e) => handleNestedChange('aboutPage', 'calloutSubheading', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                <input
                  type="text"
                  value={pageData.calloutButtonText || ''}
                  onChange={(e) => handleNestedChange('aboutPage', 'calloutButtonText', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                <input
                  type="text"
                  value={pageData.calloutButtonLink || ''}
                  onChange={(e) => handleNestedChange('aboutPage', 'calloutButtonLink', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Callout Image</label>
              <div className="flex items-center gap-4">
                {pageData.calloutImage && (
                  <img src={pageData.calloutImage} alt="Callout" className="h-16 w-16 object-cover rounded-full border border-gray-200" />
                )}
                <MediaPickerButton 
                  onSelect={(url) => handleNestedChange('aboutPage', 'calloutImage', url)} 
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                />
              </div>
            </div>
          </div>
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
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-4 mb-4">Hero CTA Button</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                value={pageData.heroButtonText || ''}
                onChange={(e) => handleNestedChange('workWithMePage', 'heroButtonText', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
              <input
                type="text"
                value={pageData.heroButtonLink || ''}
                onChange={(e) => handleNestedChange('workWithMePage', 'heroButtonLink', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-4 mb-4">Advisor vs Portal Section</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={pageData.advisorSectionTitle || ''}
                onChange={(e) => handleNestedChange('workWithMePage', 'advisorSectionTitle', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
              <textarea
                rows={2}
                value={pageData.advisorSectionDescription || ''}
                onChange={(e) => handleNestedChange('workWithMePage', 'advisorSectionDescription', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none transition-all"
              />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">Card 1</h4>
                <input type="text" placeholder="Title" value={pageData.advisorCard1Title || ''} onChange={(e) => handleNestedChange('workWithMePage', 'advisorCard1Title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none" />
                <textarea rows={2} placeholder="Description" value={pageData.advisorCard1Desc || ''} onChange={(e) => handleNestedChange('workWithMePage', 'advisorCard1Desc', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none" />
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">Card 2</h4>
                <input type="text" placeholder="Title" value={pageData.advisorCard2Title || ''} onChange={(e) => handleNestedChange('workWithMePage', 'advisorCard2Title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none" />
                <textarea rows={2} placeholder="Description" value={pageData.advisorCard2Desc || ''} onChange={(e) => handleNestedChange('workWithMePage', 'advisorCard2Desc', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none" />
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">Card 3</h4>
                <input type="text" placeholder="Title" value={pageData.advisorCard3Title || ''} onChange={(e) => handleNestedChange('workWithMePage', 'advisorCard3Title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none" />
                <textarea rows={2} placeholder="Description" value={pageData.advisorCard3Desc || ''} onChange={(e) => handleNestedChange('workWithMePage', 'advisorCard3Desc', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-4 mb-4">Confidence Section</h3>
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pill Badge</label>
                <input
                  type="text"
                  value={pageData.confidenceSectionPill || ''}
                  onChange={(e) => handleNestedChange('workWithMePage', 'confidenceSectionPill', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
                <input
                  type="text"
                  value={pageData.confidenceSectionHeadline || ''}
                  onChange={(e) => handleNestedChange('workWithMePage', 'confidenceSectionHeadline', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h4 className="font-medium text-gray-800">Checklist Items</h4>
              {[1, 2, 3, 4, 5].map((i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Item ${i}`}
                  value={(pageData as any)[`confidenceItem${i}`] || ''}
                  onChange={(e) => handleNestedChange('workWithMePage', `confidenceItem${i}`, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
                />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                <input type="text" value={pageData.confidenceButtonText || ''} onChange={(e) => handleNestedChange('workWithMePage', 'confidenceButtonText', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                <input type="text" value={pageData.confidenceButtonLink || ''} onChange={(e) => handleNestedChange('workWithMePage', 'confidenceButtonLink', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none" />
              </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pill Badge</label>
                <input
                  type="text"
                  value={pageData.processSectionPill || ''}
                  onChange={(e) => handleNestedChange('workWithMePage', 'processSectionPill', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
                <input
                  type="text"
                  value={pageData.processSectionHeadline || ''}
                  onChange={(e) => handleNestedChange('workWithMePage', 'processSectionHeadline', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <h4 className="font-medium text-gray-800">Step {i}</h4>
                  <input type="text" placeholder="Title" value={(pageData as any)[`processStep${i}Title`] || ''} onChange={(e) => handleNestedChange('workWithMePage', `processStep${i}Title`, e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none" />
                  <textarea rows={2} placeholder="Description" value={(pageData as any)[`processStep${i}Desc`] || ''} onChange={(e) => handleNestedChange('workWithMePage', `processStep${i}Desc`, e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-4 mb-4">CTA Section</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
              <input
                type="text"
                value={pageData.ctaHeadline || ''}
                onChange={(e) => handleNestedChange('workWithMePage', 'ctaHeadline', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={2}
                value={pageData.ctaDescription || ''}
                onChange={(e) => handleNestedChange('workWithMePage', 'ctaDescription', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">Primary Button</h4>
                <input type="text" placeholder="Text" value={pageData.ctaButton1Text || ''} onChange={(e) => handleNestedChange('workWithMePage', 'ctaButton1Text', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none" />
                <input type="text" placeholder="Link" value={pageData.ctaButton1Link || ''} onChange={(e) => handleNestedChange('workWithMePage', 'ctaButton1Link', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none" />
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">Secondary Button</h4>
                <input type="text" placeholder="Text" value={pageData.ctaButton2Text || ''} onChange={(e) => handleNestedChange('workWithMePage', 'ctaButton2Text', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none" />
                <input type="text" placeholder="Link" value={pageData.ctaButton2Link || ''} onChange={(e) => handleNestedChange('workWithMePage', 'ctaButton2Link', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none" />
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  };

  const renderContactFields = () => {
    const pageData = formData.contactPage || {};
    return (
      <div className="space-y-6">
        {renderHeroFields('contactPage', 'Contact Page')}

        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-4 mb-4">Contact Info Section</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
            <input
              type="text"
              value={pageData.fastestWaysHeadline || ''}
              onChange={(e) => handleNestedChange('contactPage', 'fastestWaysHeadline', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">WhatsApp Card</h4>
              <input type="text" placeholder="Title" value={pageData.whatsappCardTitle || ''} onChange={(e) => handleNestedChange('contactPage', 'whatsappCardTitle', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none" />
              <input type="text" placeholder="Description" value={pageData.whatsappCardDesc || ''} onChange={(e) => handleNestedChange('contactPage', 'whatsappCardDesc', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none" />
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">Email Card</h4>
              <input type="text" placeholder="Title" value={pageData.emailCardTitle || ''} onChange={(e) => handleNestedChange('contactPage', 'emailCardTitle', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none" />
              <input type="text" placeholder="Description" value={pageData.emailCardDesc || ''} onChange={(e) => handleNestedChange('contactPage', 'emailCardDesc', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-4 mb-4">Contact Form</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Form Title</label>
              <input
                type="text"
                value={pageData.formTitle || ''}
                onChange={(e) => handleNestedChange('contactPage', 'formTitle', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Submit Button Text</label>
              <input
                type="text"
                value={pageData.formButtonText || ''}
                onChange={(e) => handleNestedChange('contactPage', 'formButtonText', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5870F7] outline-none"
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
        {activeTab === 'about' && renderAboutFields()}
        {activeTab === 'contact' && renderContactFields()}
        {activeTab === 'workWithMe' && renderWorkWithMeFields()}
      </div>
    </div>
  );
}
