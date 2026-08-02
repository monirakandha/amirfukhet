'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';
import Link from 'next/link';
import { SuccessStory } from '@/types';
import { fetchSuccessStories } from '@/services/api';

export default function SuccessStoriesPage() {
  const [isValuationOpen, setIsValuationOpen] = useState(false);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    async function loadData() {
      const data = await fetchSuccessStories();
      setStories(data);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />

      {/* Hero Header matching design system */}
      <section className="relative w-full pt-36 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-white border-b border-gray-200/60">
        {/* Geometric grid background pattern */}
        <div className="absolute inset-0 pointer-events-none hero-grid-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Pill Badge */}
          <div className="section-pill mx-auto shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#5870F7]" />
            Success Stories
          </div>

          {/* Main Headline */}
          <h1 className="font-heading-bricolage text-[36px] sm:text-[44px] lg:text-[50px] font-semibold text-[#020202] leading-[1.15] tracking-[-0.01em] max-w-3xl mx-auto">
            Client Success Stories & Investment Case Studies
          </h1>

          {/* Description */}
          <p className="font-desc-mona text-[16px] font-normal text-[#6B7280] leading-[1.5] max-w-xl mx-auto">
            Real experiences from foreign buyers and investors who navigated the Phuket property market safely with Amir's independent advisory.
          </p>
        </div>
      </section>

      {/* Main Content Area - Grid of Success Stories */}
      <section className="flex-grow bg-[#fcfcfd] py-16 sm:py-24 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {stories.slice(0, visibleCount).map((story) => (
              <Link
                key={story.id}
                href={`/success-stories/${story.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200/60 shadow-xs flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2.5">
                    {/* Location & Property Type Badge */}
                    <div className="flex items-center gap-1.5 font-desc-mona text-[15px] font-medium text-[#6B7280] leading-none">
                      <svg className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span>{story.location} · {story.propertyType}</span>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-heading-bricolage text-[22px] font-semibold text-[#020202] leading-[1.2] tracking-[-0.01em] group-hover:text-[#5870F7] transition-colors"
                      style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                    >
                      {story.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="font-desc-mona text-[15px] font-normal text-[#6B7280] leading-[1.4]">
                      {story.subtitle}
                    </p>
                  </div>

                  {/* Highlight Wavy Metric Link */}
                  <div className="pt-2">
                    <span
                      className="font-heading-bricolage text-[17px] font-medium text-[#5870F7] leading-none underline decoration-wavy decoration-[#5870F7] underline-offset-4"
                      style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                    >
                      {story.metricHighlight}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < stories.length && (
            <div className="text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 3)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-[#5870F7] hover:text-white hover:border-[#5870F7] font-desc-mona text-[16px] font-medium text-[#020202] border border-gray-200 transition-colors shadow-2xs leading-none group"
              >
                <span>Load more stories</span>
                <svg className="w-4 h-4 text-[#020202] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
    </div>
  );
}

