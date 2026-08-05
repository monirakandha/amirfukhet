'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Save, Check, LayoutTemplate, Image as ImageIcon } from 'lucide-react';
import { MediaPickerButton } from '@/components/admin/MediaManager';
import { HomepageContent } from '@/types/admin';

export const HomeEditorManager: React.FC = () => {
  const { settings, updateSiteSettings } = useAdmin();
  
  // Need to handle potential undefined if someone has old data
  const initialContent: HomepageContent = settings.homepageContent || {
    statsSection: {
      stat1Value: '', stat1Label: '', stat2Value: '', stat2Label: '', stat3Value: '', stat3Label: '', stat4Value: '', stat4Label: ''
    },
    advisorIntroSection: { pill: '', headline: '', description: '', primaryButtonText: '', primaryButtonLink: '', secondaryButtonText: '', secondaryButtonLink: '' },
    guideBannerSection: { pill: '', headline: '', description: '', primaryButtonText: '', primaryButtonLink: '', secondaryButtonText: '', secondaryButtonLink: '' },
    blogSection: { pill: '', headline: '' },
    categoriesSection: { pill: '', headline: '' },
    researchMetricsSection: { pill: '', headline: '', subheading: '', stat1Value: '', stat1Label: '', stat2Value: '', stat2Label: '', stat3Value: '', stat3Label: '', stat4Value: '', stat4Label: '', buttonText: '', buttonLink: '' },
    meetAdvisorSection: { pill: '', headline: '', description: '', primaryButtonText: '', primaryButtonLink: '', secondaryButtonText: '', secondaryButtonLink: '' },
    featuredPropertiesSection: { pill: '', headline: '' },
    contactCtaSection: { pill: '', headline: '', description: '', buttonText: '', buttonLink: '' },
  };

  const [content, setContent] = useState<HomepageContent>(initialContent);
  const [guideBannerBg, setGuideBannerBg] = useState(settings.homepageImages?.guideBannerBg || '');
  const [advisorImage, setAdvisorImage] = useState(settings.homepageImages?.advisorImage || '');
  const [meetAdvisorImage, setMeetAdvisorImage] = useState(settings.homepageImages?.meetAdvisorImage || '');
  const [readyBannerBg, setReadyBannerBg] = useState(settings.homepageImages?.readyBannerBg || '');
  
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      homepageContent: content,
      homepageImages: {
        ...(settings.homepageImages || { heroBg: '' }),
        guideBannerBg,
        advisorImage,
        meetAdvisorImage,
        readyBannerBg,
      }
    });
    showToast('Home page content saved successfully!');
  };

  const handleChange = (section: keyof HomepageContent, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const renderInput = (section: keyof HomepageContent, field: string, label: string, type = 'text') => {
    return (
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        {type === 'textarea' ? (
          <textarea
            value={(content[section] as any)[field] || ''}
            onChange={(e) => handleChange(section, field, e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5870F7]/50"
            rows={3}
          />
        ) : (
          <input
            type="text"
            value={(content[section] as any)[field] || ''}
            onChange={(e) => handleChange(section, field, e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5870F7]/50"
          />
        )}
      </div>
    );
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 relative">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-500 text-white font-semibold text-sm shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading-bricolage flex items-center gap-3">
            <LayoutTemplate className="w-8 h-8 text-[#5870F7]" />
            Home Page Editor
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage all the text, numbers, and images displayed on the public home page. Use &lt;br /&gt; for line breaks.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5870F7] hover:bg-blue-600 text-white font-semibold text-sm shadow-md shadow-[#5870F7]/20 transition-all self-start"
        >
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-12">
        {/* Advisor Intro Section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
            Advisor Intro Section
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {renderInput('advisorIntroSection', 'pill', 'Pill Text')}
              {renderInput('advisorIntroSection', 'headline', 'Headline', 'textarea')}
              {renderInput('advisorIntroSection', 'description', 'Description', 'textarea')}
              <div className="grid grid-cols-2 gap-4">
                {renderInput('advisorIntroSection', 'primaryButtonText', 'Primary Button Text')}
                {renderInput('advisorIntroSection', 'primaryButtonLink', 'Primary Button Link')}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {renderInput('advisorIntroSection', 'secondaryButtonText', 'Secondary Button Text')}
                {renderInput('advisorIntroSection', 'secondaryButtonLink', 'Secondary Button Link')}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">Advisor Image</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
                {advisorImage ? (
                  <img src={advisorImage} alt="Advisor" className="max-h-48 object-contain mb-4 z-10 relative" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <ImageIcon className="w-8 h-8 text-blue-500" />
                  </div>
                )}
                <MediaPickerButton
                  onSelect={(url) => setAdvisorImage(url)}
                  buttonText={advisorImage ? "Change Image" : "Select Image"}
                  className="z-20 relative"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
            Top Stats Counter Section
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-4">
              {renderInput('statsSection', 'stat1Value', 'Stat 1 Value')}
              {renderInput('statsSection', 'stat1Label', 'Stat 1 Label')}
            </div>
            <div className="space-y-4">
              {renderInput('statsSection', 'stat2Value', 'Stat 2 Value')}
              {renderInput('statsSection', 'stat2Label', 'Stat 2 Label')}
            </div>
            <div className="space-y-4">
              {renderInput('statsSection', 'stat3Value', 'Stat 3 Value')}
              {renderInput('statsSection', 'stat3Label', 'Stat 3 Label')}
            </div>
            <div className="space-y-4">
              {renderInput('statsSection', 'stat4Value', 'Stat 4 Value')}
              {renderInput('statsSection', 'stat4Label', 'Stat 4 Label')}
            </div>
          </div>
        </section>

        {/* Guide Banner Section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
            Guide Banner Section
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {renderInput('guideBannerSection', 'pill', 'Pill Text')}
              {renderInput('guideBannerSection', 'headline', 'Headline', 'textarea')}
              {renderInput('guideBannerSection', 'description', 'Description', 'textarea')}
              <div className="grid grid-cols-2 gap-4">
                {renderInput('guideBannerSection', 'primaryButtonText', 'Primary Button Text')}
                {renderInput('guideBannerSection', 'primaryButtonLink', 'Primary Button Link')}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {renderInput('guideBannerSection', 'secondaryButtonText', 'Secondary Button Text')}
                {renderInput('guideBannerSection', 'secondaryButtonLink', 'Secondary Button Link')}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">Background Image</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
                {guideBannerBg ? (
                  <img src={guideBannerBg} alt="Guide Banner" className="max-h-48 object-cover mb-4 z-10 relative rounded-lg" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <ImageIcon className="w-8 h-8 text-blue-500" />
                  </div>
                )}
                <MediaPickerButton
                  onSelect={(url) => setGuideBannerBg(url)}
                  buttonText={guideBannerBg ? "Change Image" : "Select Image"}
                  className="z-20 relative"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sections Headers */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
            Section Headers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800">Blog / Insights Section</h3>
              {renderInput('blogSection', 'pill', 'Pill Text')}
              {renderInput('blogSection', 'headline', 'Headline', 'textarea')}
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800">Category Topics Grid</h3>
              {renderInput('categoriesSection', 'pill', 'Pill Text')}
              {renderInput('categoriesSection', 'headline', 'Headline', 'textarea')}
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800">Featured Properties</h3>
              {renderInput('featuredPropertiesSection', 'pill', 'Pill Text')}
              {renderInput('featuredPropertiesSection', 'headline', 'Headline', 'textarea')}
            </div>
          </div>
        </section>

        {/* Research Metrics Section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
            Research Depth Metrics Section
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderInput('researchMetricsSection', 'pill', 'Pill Text')}
              {renderInput('researchMetricsSection', 'headline', 'Headline', 'textarea')}
              {renderInput('researchMetricsSection', 'subheading', 'Subheading', 'textarea')}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-slate-100">
              <div className="space-y-4">
                {renderInput('researchMetricsSection', 'stat1Value', 'Metric 1 Value')}
                {renderInput('researchMetricsSection', 'stat1Label', 'Metric 1 Label')}
              </div>
              <div className="space-y-4">
                {renderInput('researchMetricsSection', 'stat2Value', 'Metric 2 Value')}
                {renderInput('researchMetricsSection', 'stat2Label', 'Metric 2 Label')}
              </div>
              <div className="space-y-4">
                {renderInput('researchMetricsSection', 'stat3Value', 'Metric 3 Value')}
                {renderInput('researchMetricsSection', 'stat3Label', 'Metric 3 Label')}
              </div>
              <div className="space-y-4">
                {renderInput('researchMetricsSection', 'stat4Value', 'Metric 4 Value')}
                {renderInput('researchMetricsSection', 'stat4Label', 'Metric 4 Label')}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              {renderInput('researchMetricsSection', 'buttonText', 'Button Text')}
              {renderInput('researchMetricsSection', 'buttonLink', 'Button Link')}
            </div>
          </div>
        </section>

        {/* Meet Advisor Section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
            Meet Your Advisor Section
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {renderInput('meetAdvisorSection', 'pill', 'Pill Text')}
              {renderInput('meetAdvisorSection', 'headline', 'Headline', 'textarea')}
              {renderInput('meetAdvisorSection', 'description', 'Description', 'textarea')}
              <div className="grid grid-cols-2 gap-4">
                {renderInput('meetAdvisorSection', 'primaryButtonText', 'Primary Button Text')}
                {renderInput('meetAdvisorSection', 'primaryButtonLink', 'Primary Button Link')}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {renderInput('meetAdvisorSection', 'secondaryButtonText', 'Secondary Button Text')}
                {renderInput('meetAdvisorSection', 'secondaryButtonLink', 'Secondary Button Link')}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">Profile Image</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
                {meetAdvisorImage ? (
                  <img src={meetAdvisorImage} alt="Advisor Profile" className="max-h-48 object-contain mb-4 z-10 relative rounded-lg" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <ImageIcon className="w-8 h-8 text-blue-500" />
                  </div>
                )}
                <MediaPickerButton
                  onSelect={(url) => setMeetAdvisorImage(url)}
                  buttonText={meetAdvisorImage ? "Change Image" : "Select Image"}
                  className="z-20 relative"
                />
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp CTA Section */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6 pb-3 border-b border-slate-100 flex items-center gap-2">
            Final CTA Section
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {renderInput('contactCtaSection', 'pill', 'Pill Text')}
              {renderInput('contactCtaSection', 'headline', 'Headline', 'textarea')}
              {renderInput('contactCtaSection', 'description', 'Description', 'textarea')}
              <div className="grid grid-cols-2 gap-4">
                {renderInput('contactCtaSection', 'buttonText', 'Button Text')}
                {renderInput('contactCtaSection', 'buttonLink', 'Button Link')}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-2">Background Image</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
                {readyBannerBg ? (
                  <img src={readyBannerBg} alt="CTA Background" className="max-h-48 object-cover mb-4 z-10 relative rounded-lg" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <ImageIcon className="w-8 h-8 text-blue-500" />
                  </div>
                )}
                <MediaPickerButton
                  onSelect={(url) => setReadyBannerBg(url)}
                  buttonText={readyBannerBg ? "Change Image" : "Select Image"}
                  className="z-20 relative"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Save button at bottom */}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5870F7] hover:bg-blue-600 text-white font-semibold text-sm shadow-md shadow-[#5870F7]/20 transition-all"
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
