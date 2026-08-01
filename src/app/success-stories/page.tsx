'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';
import Link from 'next/link';

export default function SuccessStoriesPage() {
  const [isValuationOpen, setIsValuationOpen] = useState(false);

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

      {/* Main Content Area */}
      <section className="py-20 bg-white flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Bottom Dark CTA Card matching Figma mockup */}
          <div className="bg-[#1c2024] rounded-[28px] sm:rounded-[32px] p-3 sm:p-4 shadow-2xl w-full">
            <div className="bg-[#FFFFFF0D] border border-[#FFFFFF33] rounded-[20px] py-12 sm:py-16 px-6 sm:px-12 text-center text-white space-y-6 sm:space-y-8 w-full">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Ready to talk through your purchase?
              </h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                Message Amir directly. Honest, advisory, no pressure.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a
                  href="https://wa.me/8801875189361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#4c70ff] hover:bg-blue-600 text-white font-semibold text-sm rounded-full transition-all shadow-md shadow-blue-500/20"
                >
                  Contact Amir on WhatsApp
                </a>

                <Link
                  href="/guide"
                  className="group px-6 py-3 bg-white hover:bg-[#5870F7] text-[#020202] hover:text-white font-semibold text-sm rounded-full transition-all shadow-md"
                >
                  See how I work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
    </div>
  );
}
