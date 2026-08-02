'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';
import Link from 'next/link';
import { SuccessStory } from '@/types';
import { fetchSuccessStories } from '@/services/api';
import CaseStudyBlock from '@/components/CaseStudyBlock';

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

      {/* Main Content Area - Stack of Case Studies */}
      <div className="flex-grow bg-white flex flex-col">
        {stories.slice(0, visibleCount).map((story) => (
          <CaseStudyBlock key={story.id} story={story} isFeaturedLabel={story.isFeatured} />
        ))}

        {visibleCount < stories.length && (
          <div className="text-center py-16 bg-[#fcfcfd]">
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-[#5870F7] hover:text-white hover:border-[#5870F7] font-desc-mona text-[16px] font-medium text-[#020202] border border-gray-200 transition-colors shadow-2xs leading-none group"
            >
              <span>Load more case studies</span>
              <svg className="w-4 h-4 text-[#020202] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <Footer />
      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
    </div>
  );
}
