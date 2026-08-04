'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { 
  Save, 
  Check, 
  Image as ImageIcon, 
  Plus, 
  Trash2,
  Monitor
} from 'lucide-react';
import { MediaPickerButton } from '@/components/admin/MediaManager';
import { HeroSlide } from '@/types/admin';
import { RichTextEditor } from './RichTextEditor';

export const HeroSliderManager: React.FC = () => {
  const { settings, updateSiteSettings } = useAdmin();
  
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(settings.heroSlides || []);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      ...settings,
      homepageImages: {
        ...settings.homepageImages,
        heroBg: heroSlides[0]?.image || '/images/hero-bg.jpg', // Keep fallback updated
        guideBannerBg: settings.homepageImages?.guideBannerBg || '/images/skyline-bg.png',
        readyBannerBg: settings.homepageImages?.readyBannerBg || '/images/resort-cta-bg.png',
        advisorImage: settings.homepageImages?.advisorImage || '/images/amir-seated.png',
      },
      heroSlides,
    });
    showToast('Hero Slider updated successfully!');
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
            <Monitor className="w-8 h-8 text-[#5870F7]" />
            Hero Area Slider
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage the dynamic slider at the top of the homepage.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5870F7] hover:bg-blue-600 text-white font-semibold text-sm shadow-md shadow-[#5870F7]/20 transition-all self-start"
        >
          <Save className="w-5 h-5" />
          <span>Save Slider</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <ImageIcon className="w-5 h-5 text-[#5870F7]" />
            <h2 className="text-lg font-bold text-gray-900 font-heading-bricolage">Slides</h2>
          </div>
          <p className="text-sm text-gray-600">The slider automatically rotates through these every 5 seconds.</p>

          <div className="space-y-6">
            {heroSlides.map((slide, index) => (
              <div key={slide.id} className="p-5 border border-slate-200 bg-slate-50 rounded-2xl relative space-y-6">
                <button
                  type="button"
                  onClick={() => {
                    const newSlides = [...heroSlides];
                    newSlides.splice(index, 1);
                    setHeroSlides(newSlides);
                  }}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-4 border-b border-slate-200 pb-4 pr-10">
                  <span className="font-bold text-gray-800 text-lg">Slide {index + 1}</span>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <MediaPickerButton
                      label="Slide Background Image"
                      value={slide.image}
                      onChange={(val) => {
                        const newSlides = [...heroSlides];
                        newSlides[index].image = val;
                        setHeroSlides(newSlides);
                      }}
                    />
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Subtitle</label>
                      <input
                        type="text"
                        value={slide.subtitle}
                        onChange={(e) => {
                          const newSlides = [...heroSlides];
                          newSlides[index].subtitle = e.target.value;
                          setHeroSlides(newSlides);
                        }}
                        placeholder="Welcome Property Investment Advisor Phuket"
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Heading</label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => {
                          const newSlides = [...heroSlides];
                          newSlides[index].title = e.target.value;
                          setHeroSlides(newSlides);
                        }}
                        placeholder="Invest in Phuket Property with Trusted Advisors"
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Description Text</label>
                      <div className="border border-slate-300 rounded-xl overflow-hidden [&_.ql-container]:min-h-[100px] [&_.ql-editor]:min-h-[100px]">
                        <RichTextEditor
                          value={slide.description}
                          onChange={(val) => {
                            const newSlides = [...heroSlides];
                            newSlides[index].description = val;
                            setHeroSlides(newSlides);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-slate-200">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Btn 1 Text</label>
                    <input
                      type="text"
                      value={slide.primaryButtonText}
                      onChange={(e) => {
                        const newSlides = [...heroSlides];
                        newSlides[index].primaryButtonText = e.target.value;
                        setHeroSlides(newSlides);
                      }}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Btn 1 Link</label>
                    <input
                      type="text"
                      value={slide.primaryButtonLink}
                      onChange={(e) => {
                        const newSlides = [...heroSlides];
                        newSlides[index].primaryButtonLink = e.target.value;
                        setHeroSlides(newSlides);
                      }}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Btn 2 Text</label>
                    <input
                      type="text"
                      value={slide.secondaryButtonText}
                      onChange={(e) => {
                        const newSlides = [...heroSlides];
                        newSlides[index].secondaryButtonText = e.target.value;
                        setHeroSlides(newSlides);
                      }}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase font-heading-bricolage">Btn 2 Link</label>
                    <input
                      type="text"
                      value={slide.secondaryButtonLink}
                      onChange={(e) => {
                        const newSlides = [...heroSlides];
                        newSlides[index].secondaryButtonLink = e.target.value;
                        setHeroSlides(newSlides);
                      }}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-[#5870F7]"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                setHeroSlides([...heroSlides, {
                  id: `slide-${Date.now()}`,
                  image: '/images/hero-bg.jpg',
                  subtitle: '',
                  title: '',
                  description: '',
                  primaryButtonText: '',
                  primaryButtonLink: '',
                  secondaryButtonText: '',
                  secondaryButtonLink: '',
                }]);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-600 hover:text-[#5870F7] hover:bg-blue-50 transition-colors text-sm font-bold font-heading-bricolage"
            >
              <Plus className="w-5 h-5" />
              Add Another Slide
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
