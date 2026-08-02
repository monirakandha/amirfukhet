'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';
import Link from 'next/link';
import { SuccessStory } from '@/types';
import { fetchSuccessStories } from '@/services/api';
import SuccessStoriesSection from '@/components/SuccessStoriesSection';

export default function SuccessStoriesPage() {
  const [isValuationOpen, setIsValuationOpen] = useState(false);
  const [stories, setStories] = useState<SuccessStory[]>([]);

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
      <div className="flex-grow bg-white">
        <SuccessStoriesSection 
          stories={stories} 
          showHeading={false} 
          showViewAllButton={false} 
          bgColor="bg-white" 
          enableLoadMore={true}
          loadMoreStep={6}
        />
      </div>

      <Footer />
      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
    </div>
  );
}
