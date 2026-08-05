'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';
import { useAdmin } from '@/context/AdminContext';

export default function ContactPage() {
  const { settings } = useAdmin();
  const [isValuationOpen, setIsValuationOpen] = useState(false);

  const hero = settings.pagesContent?.workWithMeHero || {
    pill: 'Work with Amir',
    headline: 'An advisor in your corner — from first question to keys in hand',
    description: 'No commission-chasing. No pressure. Just clear, independent guidance so you buy the right property under the right structure.'
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />

      {/* Work With Me Hero Area matching Figma mockup */}
      <section className="relative w-full pt-36 pb-20 sm:pt-40 sm:pb-24 overflow-hidden bg-[#f8fafc] border-b border-gray-200/60">
        {/* Geometric grid background pattern */}
        <div className="absolute inset-0 pointer-events-none hero-grid-overlay" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Work with Amir Pill Badge */}
          <div className="section-pill shadow-2xs mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#5870F7]" />
            {hero.pill}
          </div>

          {/* Main Headline */}
          <h1 
            className="hero-heading max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{ __html: hero.headline || '' }}
          />

          {/* Subtitle / Paragraph */}
          <p className="hero-description max-w-2xl mx-auto pt-1">
            {hero.description}
          </p>

          {/* Primary Action CTA Button */}
          <div className="pt-2">
            <a
              href="#contact-form"
              className="hero-button inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full transition-all shadow-lg shadow-blue-600/25"
            >
              Book a free consultation
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Why work with an advisor, not a portal Section matching Figma mockup */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Why work with an advisor, not a portal
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
              A listing site shows you what's for sale. An advisor tells you what's worth buying — and what to avoid.
            </p>
          </div>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Independent */}
            <div className="bg-[#f8fafc] border border-gray-200/80 rounded-3xl p-8 space-y-4 shadow-2xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-[#4c70ff] shadow-2xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Independent
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                I'm paid to advise you well, not to push one developer's stock. You hear the downsides too.
              </p>
            </div>

            {/* Card 2: Due-diligence first */}
            <div className="bg-[#f8fafc] border border-gray-200/80 rounded-3xl p-8 space-y-4 shadow-2xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-[#4c70ff] shadow-2xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Due-diligence first
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Title checks, developer track record, lease terms — the unglamorous work that protects your money.
              </p>
            </div>

            {/* Card 3: On the ground */}
            <div className="bg-[#f8fafc] border border-gray-200/80 rounded-3xl p-8 space-y-4 shadow-2xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-[#4c70ff] shadow-2xs">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                On the ground
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Based in Phuket. I view the property, meet the people, and represent your interests locally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Everything you need to buy with confidence Section matching Figma mockup */}
      <section className="py-20 bg-[#f8fafc] border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column Content */}
            <div className="lg:col-span-6 space-y-6">
              {/* What you get Pill Badge */}
              <div className="section-pill shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#5870F7]" />
                What you get
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Everything you need to buy with confidence
              </h2>

              {/* 5 Checklist Items */}
              <div className="space-y-4 pt-2">
                {/* Item 1 */}
                <div className="flex items-start gap-3.5 text-xs sm:text-sm text-gray-700 font-medium leading-snug">
                  <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-900 shrink-0 mt-0.5 shadow-2xs">
                    <svg className="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>A clear read on your goals – lifestyle, yield, or both</span>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-3.5 text-xs sm:text-sm text-gray-700 font-medium leading-snug">
                  <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-900 shrink-0 mt-0.5 shadow-2xs">
                    <svg className="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>A shortlist of properties that genuinely fit, with the trade-offs spelled out</span>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-3.5 text-xs sm:text-sm text-gray-700 font-medium leading-snug">
                  <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-900 shrink-0 mt-0.5 shadow-2xs">
                    <svg className="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Due diligence on title, developer and ownership structure</span>
                </div>

                {/* Item 4 */}
                <div className="flex items-start gap-3.5 text-xs sm:text-sm text-gray-700 font-medium leading-snug">
                  <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-900 shrink-0 mt-0.5 shadow-2xs">
                    <svg className="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Guidance through negotiation, contracts and transfer</span>
                </div>

                {/* Item 5 */}
                <div className="flex items-start gap-3.5 text-xs sm:text-sm text-gray-700 font-medium leading-snug">
                  <div className="w-5 h-5 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-900 shrink-0 mt-0.5 shadow-2xs">
                    <svg className="w-3 h-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Introductions to vetted lawyers, and rental management if you need it</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <a
                  href="https://wa.me/8801875189361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#4c70ff] hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm rounded-full transition-all shadow-md shadow-blue-600/25"
                >
                  Ask Amir
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column Villa Image */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-100 h-[380px] sm:h-[460px] w-full">
                <img
                  src="/images/confidence-villa.png"
                  alt="Luxury Villa Pool - Buy with confidence"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* A simple, no-pressure process Section matching Figma mockup */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <div className="section-pill shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#5870F7]" />
              How to get started
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              A simple, no-pressure process
            </h2>
          </div>

          {/* 4 Step Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 01 */}
            <div className="group bg-[#f8fafc] hover:bg-[#4c70ff] border border-gray-200/80 hover:border-[#4c70ff] rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-200 group-hover:border-white text-gray-900 group-hover:text-[#4c70ff] font-bold text-sm flex items-center justify-center shadow-2xs transition-colors">
                01
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
                  Reach out
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 group-hover:text-white/90 leading-relaxed transition-colors">
                  A message on WhatsApp or the form. Tell me what you're considering.
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div className="group bg-[#f8fafc] hover:bg-[#4c70ff] border border-gray-200/80 hover:border-[#4c70ff] rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-200 group-hover:border-white text-gray-900 group-hover:text-[#4c70ff] font-bold text-sm flex items-center justify-center shadow-2xs transition-colors">
                02
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
                  Free consultation
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 group-hover:text-white/90 leading-relaxed transition-colors">
                  We talk through goals, budget and areas. No obligation.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div className="group bg-[#f8fafc] hover:bg-[#4c70ff] border border-gray-200/80 hover:border-[#4c70ff] rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-200 group-hover:border-white text-gray-900 group-hover:text-[#4c70ff] font-bold text-sm flex items-center justify-center shadow-2xs transition-colors">
                03
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
                  Research & shortlist
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 group-hover:text-white/90 leading-relaxed transition-colors">
                  I do the legwork and bring you properties that actually fit.
                </p>
              </div>
            </div>

            {/* Step 04 */}
            <div className="group bg-[#f8fafc] hover:bg-[#4c70ff] border border-gray-200/80 hover:border-[#4c70ff] rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-200 group-hover:border-white text-gray-900 group-hover:text-[#4c70ff] font-bold text-sm flex items-center justify-center shadow-2xs transition-colors">
                04
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
                  Buy with confidence
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 group-hover:text-white/90 leading-relaxed transition-colors">
                  Due diligence, negotiation and transfer – I'm with you throughout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Let's talk about your purchase CTA Section matching Figma mockup */}
      <section className="py-20 bg-[#f8fafc] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1c2024] rounded-[28px] sm:rounded-[32px] p-3 sm:p-4 shadow-2xl w-full">
            <div className="bg-[#FFFFFF0D] border border-[#FFFFFF33] rounded-[20px] py-12 sm:py-16 px-6 sm:px-12 text-center text-white space-y-6 sm:space-y-8 w-full">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Let's talk about your purchase
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
                The first conversation is free, and there's no pressure to go further.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a
                  href="https://wa.me/8801875189361"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#4c70ff] hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm rounded-full transition-all shadow-md shadow-blue-500/20"
                >
                  WhatsApp Amir
                </a>

                <a
                  href="#contact-form"
                  className="group px-6 py-3 bg-white hover:bg-[#5870F7] text-[#020202] hover:text-white font-semibold text-xs sm:text-sm rounded-full transition-all shadow-md"
                >
                  Book a consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>



      <Footer hideCTA />

      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
    </div>
  );
}
