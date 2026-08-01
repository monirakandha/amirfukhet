'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';
import { Clock, Calendar, PenTool, Download } from 'lucide-react';

export default function GuidePage() {
  const [isValuationOpen, setIsValuationOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('can-foreigners-own-property');

  const tocItems = [
    { id: 'can-foreigners-own-property', title: 'Can foreigners own property?' },
    { id: 'freehold-vs-leasehold', title: 'Freehold vs leasehold' },
    { id: 'step-by-step-process', title: 'The step-by-step process' },
    { id: 'taxes-and-transfer-fees', title: 'Taxes & transfer fees' },
    { id: 'financing-options', title: 'Financing options' },
    { id: 'due-diligence-checklist', title: 'Due diligence checklist' },
    { id: 'the-real-risks', title: 'The real risks' },
    { id: 'faq', title: 'FAQ' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />

      {/* Guide Hero Area matching Figma mockup */}
      <section className="relative w-full pt-36 pb-20 sm:pt-40 sm:pb-24 overflow-hidden bg-white border-b border-gray-200/60">
        {/* Geometric grid background pattern */}
        <div className="absolute inset-0 pointer-events-none hero-grid-overlay" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Flagship Guide Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-100 text-xs font-semibold text-[#4c70ff] shadow-2xs">
            <span className="text-amber-400 text-sm leading-none">⭐</span>
            Flagship Guide · Free
          </div>

          {/* Main Title */}
          <h1 className="hero-heading max-w-4xl mx-auto">
            The Complete Guide to Buying Property in Phuket as a Foreigner
          </h1>

          {/* Subtitle / Subtext */}
          <p className="hero-description max-w-3xl mx-auto pt-1">
            Everything from ownership structures and the legal process to taxes, financing, due diligence and the real risks – the single resource every foreign buyer should read before sending a message.
          </p>

          {/* Meta Info Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-gray-500 pt-6 font-medium border-t border-gray-200/50 max-w-3xl mx-auto">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>28 min read</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Updated 18 Jun 2026</span>
            </div>

            <div className="flex items-center gap-2">
              <PenTool className="w-4 h-4 text-gray-400" />
              <span>Writer Amir Ahmed Faisal</span>
            </div>

            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-gray-400" />
              <span>2,400+ downloads</span>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Main Body Section with Left Sticky Sidebar & Right Figma Content */}
      <section className="py-16 bg-white flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Sticky Sidebar matching Figma mockup */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-8 self-start">
              {/* Table of Contents */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">On this page</h3>

                <nav className="space-y-1">
                  {tocItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setActiveSection(item.id)}
                        className={`block text-sm font-medium transition-all ${
                          isActive
                            ? 'border-l-4 border-[#4c70ff] bg-blue-50/70 py-2.5 px-4 rounded-r-lg text-[#4c70ff] font-semibold'
                            : 'text-gray-600 hover:text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-50'
                        }`}
                      >
                        {item.title}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Get the PDF Version Widget Box matching Figma mockup */}
              <div className="bg-[#212529] rounded-2xl p-6 text-white border border-gray-800 shadow-xl space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-white">Get the PDF version</h4>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    A clean offline copy + Amir's market updates.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('PDF guide sent to your email!');
                  }}
                  className="space-y-3"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full bg-[#2f343a] border border-gray-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#4c70ff] transition-colors"
                  />

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-full bg-[#4c70ff] hover:bg-blue-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20"
                  >
                    Send me the guide
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </button>
                </form>
              </div>
            </aside>

            {/* Right Guide Content Area matching Figma mockup */}
            <main className="lg:col-span-8 space-y-16">
              {/* Top Luxury Villa Header Image */}
              <div className="relative w-full h-80 sm:h-[420px] rounded-2xl overflow-hidden shadow-sm bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200"
                  alt="Luxury Phuket Hillside Pool Villa"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Section 1: Can foreigners actually own property in Thailand? */}
              <section id="can-foreigners-own-property" className="scroll-mt-28 space-y-6 border-b border-gray-100 pb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                  Can foreigners actually own property in Thailand?
                </h2>

                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Yes – but how you own it matters more than anything else in this guide. Foreigners can freehold-own condominium units within the 49% foreign quota of a building, and can hold land and villas through long leaseholds or properly structured arrangements. Getting this right is the difference between a secure asset and an expensive lesson.
                </p>

                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  The published guide walks through each path in plain language, with worked examples and the questions to ask before you commit to either route.
                </p>

                {/* Callout Box: Not sure which structure fits your situation? */}
                <div className="bg-[#f4f6fa] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-blue-100/60">
                  <div className="flex items-center gap-3.5">
                    <img
                      src="/images/amir.png"
                      alt="Amir Ahmed Faisal"
                      className="w-11 h-11 rounded-full object-cover border border-blue-200 shrink-0 bg-white"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                        Not sure which structure fits your situation?
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Send Amir your details – get a straight answer, no obligation.
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
              </section>

              {/* Section 2: Freehold vs leasehold */}
              <section id="freehold-vs-leasehold" className="scroll-mt-28 space-y-6 border-b border-gray-100 pb-12">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                    Freehold vs leasehold
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    A comparison table, the protections that matter on a lease, and when each route makes sense.
                  </p>
                </div>

                {/* 2 Comparison Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Card 1: Freehold */}
                  <div className="bg-[#f4f6fa] rounded-2xl p-6 border border-gray-200/60 space-y-2">
                    <h3 className="text-[#4c70ff] font-bold text-base">
                      Freehold
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      Outright ownership of a condo unit within the foreign quota. Simplest, most liquid, fully in your name.
                    </p>
                  </div>

                  {/* Card 2: Leasehold */}
                  <div className="bg-[#f4f6fa] rounded-2xl p-6 border border-gray-200/60 space-y-2">
                    <h3 className="text-[#4c70ff] font-bold text-base">
                      Leasehold
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      Typically 30 years + renewals for villas/land. Protection is in the lease terms – this is where guidance pays for itself.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3: The step-by-step buying process */}
              <section id="step-by-step-process" className="scroll-mt-28 space-y-6 border-b border-gray-100 pb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                  The step-by-step buying process
                </h2>

                <div className="space-y-4 pt-2">
                  {/* Step 01 */}
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-[#4c70ff] border border-blue-200 flex items-center justify-center text-xs font-bold shrink-0">
                      01
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Define budget, area and goal (lifestyle vs yield)
                    </span>
                  </div>

                  {/* Step 02 */}
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-[#4c70ff] border border-blue-200 flex items-center justify-center text-xs font-bold shrink-0">
                      02
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Shortlist, view, and verify the developer / title
                    </span>
                  </div>

                  {/* Step 03 */}
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-[#4c70ff] border border-blue-200 flex items-center justify-center text-xs font-bold shrink-0">
                      03
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Legal due diligence & reservation agreement
                    </span>
                  </div>

                  {/* Step 04 */}
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-[#4c70ff] border border-blue-200 flex items-center justify-center text-xs font-bold shrink-0">
                      04
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      Transfer of funds, contract & registration at Land Office
                    </span>
                  </div>
                </div>
              </section>

              {/* Section 4: Taxes & transfer fees */}
              <section id="taxes-and-transfer-fees" className="scroll-mt-28 space-y-4 border-b border-gray-100 pb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Taxes & transfer fees
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Understanding Land Department registration fees (2%), withholding tax, specific business tax (3.3%), and stamp duty (0.5%), and how fees are split between buyer and seller in Phuket transactions.
                </p>
              </section>

              {/* Section 5: Financing options */}
              <section id="financing-options" className="scroll-mt-28 space-y-4 border-b border-gray-100 pb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Financing options
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Financing solutions available for non-resident buyers in Thailand, developer payment plans during construction, and international offshore bank mortgage solutions.
                </p>
              </section>

              {/* Section 6: Due diligence checklist */}
              <section id="due-diligence-checklist" className="scroll-mt-28 space-y-4 border-b border-gray-100 pb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Due diligence checklist
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Title search verification at the Phuket Land Department, environmental impact assessment (EIA) verification, developer track record check, and building permit confirmation.
                </p>
              </section>

              {/* Section 7: The real risks */}
              <section id="the-real-risks" className="scroll-mt-28 space-y-4 border-b border-gray-100 pb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  The real risks
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Unpacking common legal traps, unverified developer promises, non-renewable lease clauses, and illegal Thai nominee company structures to avoid.
                </p>
              </section>

              {/* Section 8: Frequently asked questions */}
              <section id="faq" className="scroll-mt-28 space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                    Frequently asked questions
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Structured with FAQ schema – built to surface in Google snippets and AI search answers.
                  </p>
                </div>

                {/* FAQ Accordion List */}
                <div className="space-y-4 pt-2">
                  {/* FAQ 1 (Expanded in Figma) */}
                  <div className="bg-[#f4f6fa] rounded-2xl p-5 sm:p-6 border border-gray-200/60 space-y-3">
                    <div className="flex items-center justify-between font-bold text-gray-900 text-sm sm:text-base">
                      <span>Can a foreigner own land in Thailand?</span>
                      <span className="text-gray-500 text-lg font-bold">–</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
                      Not freehold in their own name. Foreigners commonly secure villas and land through long leaseholds or properly structured arrangements – which is exactly where advice protects you.
                    </p>
                  </div>

                  {/* FAQ 2 */}
                  <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/70 hover:border-gray-300 transition-colors flex items-center justify-between font-bold text-gray-900 text-sm sm:text-base cursor-pointer">
                    <span>What is the foreign quota on condos?</span>
                    <span className="text-[#4c70ff] text-lg font-bold">+</span>
                  </div>

                  {/* FAQ 3 */}
                  <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/70 hover:border-gray-300 transition-colors flex items-center justify-between font-bold text-gray-900 text-sm sm:text-base cursor-pointer">
                    <span>What taxes and fees apply when buying?</span>
                    <span className="text-[#4c70ff] text-lg font-bold">+</span>
                  </div>

                  {/* FAQ 4 */}
                  <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/70 hover:border-gray-300 transition-colors flex items-center justify-between font-bold text-gray-900 text-sm sm:text-base cursor-pointer">
                    <span>Can foreigners get a mortgage in Thailand?</span>
                    <span className="text-[#4c70ff] text-lg font-bold">+</span>
                  </div>
                </div>
              </section>

            </main>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
    </div>
  );
}
