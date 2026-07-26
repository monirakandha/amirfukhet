'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';

export default function AboutPage() {
  const [isValuationOpen, setIsValuationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />

      {/* About Hero Area matching Figma mockup */}
      <section className="relative w-full pt-36 pb-12 sm:pt-40 sm:pb-16 overflow-hidden bg-[#f8fafc] border-b border-gray-200/60">
        {/* Subtle geometric grid background pattern matching Figma mockup */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Area */}
            <div className="lg:col-span-7 space-y-6">
              {/* About Amir Pill Badge */}
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-blue-100 text-xs font-semibold text-[#4c70ff] shadow-2xs">
                About Amir
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.15] tracking-tight">
                The advisor foreigners trust to buy in Phuket
              </h1>

              {/* Description Paragraph */}
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl">
                I'm Amir Ahmed Faisal. I help international buyers understand the Phuket market and invest in it safely – explaining the structures, flagging the risks, and staying in their corner from first message to handover.
              </p>

              {/* Social Circle Buttons */}
              <div className="flex items-center gap-3 pt-2">
                {/* X (Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-blue-100 bg-white hover:bg-blue-50 text-[#4c70ff] flex items-center justify-center font-bold text-sm shadow-2xs transition-all"
                  aria-label="Twitter / X"
                >
                  𝕏
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-blue-100 bg-white hover:bg-blue-50 text-[#4c70ff] flex items-center justify-center font-bold text-sm shadow-2xs transition-all"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/8801875189361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-blue-100 bg-white hover:bg-blue-50 text-[#4c70ff] flex items-center justify-center font-bold text-sm shadow-2xs transition-all"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.301-.15-1.785-.881-2.062-.982-.276-.101-.477-.15-.678.15-.2.3-.778.982-.954 1.181-.176.2-.351.226-.652.076-.301-.15-1.272-.469-2.424-1.498-.897-.8-1.502-1.788-1.678-2.089-.176-.301-.019-.464.131-.613.136-.134.301-.351.452-.526.15-.176.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.631-.93-2.235-.243-.589-.49-.509-.677-.518-.175-.008-.376-.01-.577-.01-.201 0-.527.075-.804.376-.276.301-1.054 1.03-1.054 2.513 0 1.483 1.079 2.914 1.229 3.115.15.201 2.124 3.243 5.145 4.548.718.311 1.28.497 1.718.636.721.23 1.377.197 1.896.12.578-.087 1.785-.729 2.036-1.432.251-.703.251-1.304.176-1.432-.075-.128-.276-.201-.577-.351z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Portrait Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <img
                src="/images/amir.png"
                alt="Amir Ahmed Faisal - Property Investment Advisor"
                className="max-h-[480px] object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Main Body Section matching Figma mockup */}
      <section className="py-16 bg-white flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Section 1: My story */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              My story
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-3xl">
              Placeholder biography. The published page tells how Amir came to Phuket, the years spent learning the market from the inside, and why he chose to work as an independent advisor rather than an agent.
            </p>
          </div>

          {/* Section 2: My approach & philosophy */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              My approach & philosophy
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-3xl">
              Advisory, not transactional. Honest about risk. Foreigner-focused. The goal is a client who refers their friends – not a quick commission.
            </p>
          </div>

          {/* 3-Stat Highlights Card Container matching Figma mockup */}
          <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-blue-200/60">
              {/* Stat 1 */}
              <div className="pt-4 sm:pt-0 sm:px-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-[#4c70ff]">
                  7+ yrs
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  In the Phuket market
                </div>
              </div>

              {/* Stat 2 */}
              <div className="pt-4 sm:pt-0 sm:px-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-[#4c70ff]">
                  50+
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  Foreign buyers guided
                </div>
              </div>

              {/* Stat 3 */}
              <div className="pt-4 sm:pt-0 sm:px-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-[#4c70ff]">
                  12
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  Nationalities served
                </div>
              </div>
            </div>
          </div>

          {/* Callout Box: Want to work together? */}
          <div className="bg-[#f4f6fa] border border-gray-200/80 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src="/images/amir.png"
                alt="Amir Ahmed Faisal"
                className="w-11 h-11 rounded-full object-cover border border-blue-200 shrink-0 bg-white"
              />
              <div>
                <h4 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                  Want to work together?
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Start with a free, no-pressure conversation.
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/8801875189361"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#4c70ff] hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all shadow-sm shrink-0"
            >
              Ask Amir
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>

          {/* Bottom Dark CTA Card matching Figma mockup */}
          <div className="bg-[#1c2024] rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl border border-gray-800 space-y-6">
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
      </section>

      <Footer />

      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
    </div>
  );
}
