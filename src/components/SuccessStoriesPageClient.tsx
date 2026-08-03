'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';
import { useSearchParams } from 'next/navigation';
import { SuccessStory } from '@/types';

interface SuccessStoriesPageClientProps {
  initialStories: SuccessStory[];
}

export default function SuccessStoriesPageClient({ initialStories }: SuccessStoriesPageClientProps) {
  const [isValuationOpen, setIsValuationOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  const searchParams = useSearchParams();
  const storySlug = searchParams.get('story');
  const detailsRef = useRef<HTMLDivElement>(null);

  // On mount, pick the story from URL param or fallback to featured
  useEffect(() => {
    if (initialStories.length === 0) return;
    if (storySlug) {
      const matched = initialStories.find((s) => s.slug === storySlug || s.id === storySlug);
      if (matched) { setSelectedStory(matched); return; }
    }
    const featured = initialStories.find((s) => s.isFeatured);
    setSelectedStory(featured || initialStories[0]);
  }, [storySlug, initialStories]);

  const handleSelectStory = (story: SuccessStory) => {
    setSelectedStory(story);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/success-stories?story=${story.slug}`);
    }
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const steps = selectedStory
    ? [
        { num: '01', title: 'Define budget, area and goal (lifestyle vs yield)', body: selectedStory.stepBudget },
        { num: '02', title: 'The challenge', body: selectedStory.stepChallenge },
        { num: '03', title: "Amir's approach", body: selectedStory.stepApproach },
        { num: '04', title: 'Research & guidance', body: selectedStory.stepResearch },
        { num: '05', title: 'The outcome', body: selectedStory.stepOutcome },
      ].filter((s) => s.body)
    : [];

  const metrics = selectedStory?.metrics && selectedStory.metrics.length > 0 ? selectedStory.metrics : [];
  const gridColsClass =
    metrics.length === 3 ? 'md:grid-cols-3' : metrics.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1';

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />

      {/* Hero — served in initial HTML for SEO */}
      <section className="relative w-full pt-28 pb-10 sm:pt-36 sm:pb-12 overflow-hidden bg-white border-b border-gray-200/60">
        <div className="absolute inset-0 pointer-events-none hero-grid-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="section-pill mx-auto shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#5870F7]" />
            Success Stories
          </div>
          <h1 className="font-heading-bricolage text-[36px] sm:text-[44px] lg:text-[50px] font-semibold text-[#020202] leading-[1.15] tracking-[-0.01em] max-w-3xl mx-auto">
            Real deals. Real<br className="hidden sm:inline" /> buyers. The full story.
          </h1>
          <p className="font-desc-mona text-[16px] font-normal text-[#6B7280] leading-[1.5] max-w-xl mx-auto">
            Detailed case studies of foreign buyers Amir guided from first<br className="hidden sm:inline" /> contact to a successful purchase.
          </p>
        </div>
      </section>

      {/* Story Grid */}
      <section className="bg-[#fcfcfd] py-12 sm:py-16 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {initialStories.slice(0, visibleCount).map((story) => {
              const isSelected = selectedStory?.id === story.id;
              return (
                <div
                  key={story.id}
                  onClick={() => handleSelectStory(story)}
                  className={`group bg-white rounded-2xl overflow-hidden border cursor-pointer flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                    isSelected ? 'border-[#5870F7] ring-2 ring-[#5870F7]/10' : 'border-gray-200/60 shadow-xs'
                  }`}
                >
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 font-desc-mona text-[15px] font-medium text-[#6B7280] leading-none">
                        <svg className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <span>{story.location} · {story.propertyType}</span>
                        {isSelected && (
                          <span className="ml-auto text-[11px] bg-[#EEF1FF] text-[#5870F7] font-semibold px-2 py-0.5 rounded-full animate-pulse">
                            Viewing
                          </span>
                        )}
                      </div>
                      <h3
                        className={`font-heading-bricolage text-[22px] font-semibold leading-[1.2] tracking-[-0.01em] transition-colors ${
                          isSelected ? 'text-[#5870F7]' : 'text-[#020202] group-hover:text-[#5870F7]'
                        }`}
                        style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                      >
                        {story.title}
                      </h3>
                      <p className="font-desc-mona text-[15px] font-normal text-[#6B7280] leading-[1.4]">
                        {story.subtitle ? story.subtitle.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ') : ''}
                      </p>
                    </div>
                    <div className="pt-2">
                      <span
                        className="font-heading-bricolage text-[17px] font-medium text-[#5870F7] leading-none underline decoration-wavy decoration-[#5870F7] underline-offset-4"
                        style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                      >
                        {story.metricHighlight}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            {visibleCount < initialStories.length ? (
              <button
                onClick={() => setVisibleCount((prev) => prev + 3)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-[#5870F7] hover:text-white hover:border-[#5870F7] font-desc-mona text-[16px] font-medium text-[#020202] border border-gray-200 transition-colors shadow-2xs leading-none group"
              >
                <span>Load more stories</span>
                <svg className="w-4 h-4 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            ) : (
              <button
                disabled
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gray-50 font-desc-mona text-[16px] font-medium text-gray-400 border border-gray-100 shadow-2xs leading-none cursor-not-allowed"
              >
                <span>No more stories</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Case Study Detail */}
      {selectedStory && (
        <div ref={detailsRef} id="details-section" className="bg-white py-12 sm:py-16 border-t border-gray-200/60 scroll-mt-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DFE3EB] font-desc-mona text-[13px] font-medium text-[#5870F7] leading-none shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5870F7]" />
                {selectedStory.isFeatured ? 'Featured case study' : 'Case study'}
              </div>
            </div>

            <h2
              className="font-heading-bricolage text-[36px] sm:text-[46px] font-semibold text-[#020202] leading-[1.15] tracking-[-0.015em] mb-10"
              style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
            >
              {selectedStory.title}
            </h2>

            {selectedStory.image && (
              <div className="w-full rounded-[24px] overflow-hidden mb-12 shadow-xs border border-gray-100">
                <img src={selectedStory.image} alt={selectedStory.title} className="w-full h-72 sm:h-[420px] object-cover" />
              </div>
            )}

            {steps.length > 0 && (
              <div className="space-y-10 mb-12">
                {steps.map((step) => (
                  <div key={step.num} className="flex gap-5 items-start">
                    <div className="shrink-0 w-8 h-8 rounded-full border border-[#D6E0FF] bg-[#EEF1FF] flex items-center justify-center font-desc-mona text-[13px] font-bold text-[#5870F7] leading-none mt-1">
                      {step.num}
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3
                        className="font-heading-bricolage text-[18px] sm:text-[20px] font-semibold text-[#111827] leading-tight tracking-[-0.01em]"
                        style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                      >
                        {step.title}
                      </h3>
                      <p className="font-desc-mona text-[15px] sm:text-[16px] font-normal text-[#4B5563] leading-[1.6]">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {steps.length === 0 && selectedStory.story && (
              <div className="space-y-4 mb-12">
                <h3
                  className="font-heading-bricolage text-[20px] sm:text-[24px] font-semibold text-[#020202] leading-tight tracking-[-0.01em]"
                  style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                >
                  The Case Study
                </h3>
                <div
                  className="font-desc-mona text-[15px] sm:text-[16px] font-normal text-[#4B5563] leading-[1.6] prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedStory.story }}
                />
              </div>
            )}

            {metrics.length > 0 && (
              <div className="rounded-2xl border border-[#D4DEFF] bg-[#EEF1FF] p-6 sm:p-8 mb-12 shadow-2xs">
                <div className={`grid grid-cols-1 ${gridColsClass} gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#D4DEFF]`}>
                  {metrics.map((m) => (
                    <div key={m.label} className="flex flex-col items-center justify-center text-center px-4 py-2 md:py-0">
                      <div
                        className="font-heading-bricolage text-[28px] sm:text-[34px] font-semibold text-[#5870F7] leading-none tracking-[-0.02em] mb-2"
                        style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                      >
                        {m.value}
                      </div>
                      <p className="font-desc-mona text-[13px] sm:text-[14px] font-medium text-[#4B5563] leading-tight">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedStory.stepKeyTakeaways && (
              <div className="flex gap-5 items-start mb-12 pt-4">
                <div className="shrink-0 w-8 h-8 rounded-full border border-[#D6E0FF] bg-[#EEF1FF] flex items-center justify-center font-desc-mona text-[13px] font-bold text-[#5870F7] leading-none mt-1">
                  07
                </div>
                <div className="space-y-2 flex-1">
                  <h3
                    className="font-heading-bricolage text-[18px] sm:text-[20px] font-semibold text-[#111827] leading-tight tracking-[-0.01em]"
                    style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                  >
                    Key takeaways
                  </h3>
                  <p className="font-desc-mona text-[15px] sm:text-[16px] font-normal text-[#4B5563] leading-[1.6]">
                    {selectedStory.stepKeyTakeaways}
                  </p>
                </div>
              </div>
            )}

            {selectedStory.testimonial && (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#F9FAFB] border border-gray-100/80 italic font-desc-mona text-[15px] sm:text-[16px] text-gray-700 relative mb-8 shadow-3xs">
                <span className="text-4xl text-[#5870F7] font-serif absolute top-3 left-4 select-none opacity-20">"</span>
                <div
                  className="pl-6 relative z-10 font-normal leading-relaxed prose max-w-none text-gray-700 font-desc-mona text-[15px] sm:text-[16px]"
                  dangerouslySetInnerHTML={{ __html: selectedStory.testimonial }}
                />
                {(selectedStory.clientName || selectedStory.clientRole) && (
                  <div className="mt-4 pl-6 not-italic flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5870F7]" />
                    <span className="font-semibold text-[13px] sm:text-[14px] text-gray-900">{selectedStory.clientName}</span>
                    {selectedStory.clientRole && (
                      <span className="text-[13px] sm:text-[14px] text-gray-500">· {selectedStory.clientRole}</span>
                    )}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      <Footer />
      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
    </div>
  );
}
