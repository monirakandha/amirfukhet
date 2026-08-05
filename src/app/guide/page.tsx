'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';
import { Clock, Calendar, PenTool, Download, Plus, Minus } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export default function GuidePage() {
  const [isValuationOpen, setIsValuationOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('can-foreigners-own-property');
  const { faqs, guideContent } = useAdmin();
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

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
            The Complete Guide to<br /> Buying Property in Phuket as a Foreigner
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
              <div className="bg-[#1C2026] rounded-[24px] p-2 sm:p-2.5 shadow-xl">
                <div className="bg-[#2B2D33] border border-white/10 rounded-[18px] p-5 sm:p-6 text-white space-y-5">
                  <div>
                    <h4 
                      className="text-[20px] font-semibold text-white tracking-[-0.01em] font-heading-bricolage"
                      style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                    >
                      Get the PDF version
                    </h4>
                    <p className="text-[14px] text-gray-300 mt-1.5 leading-[1.6] font-desc-mona">
                      A clean offline copy + Amir's market updates.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert('PDF guide sent to your email!');
                    }}
                    className="space-y-4"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      className="w-full bg-[#36383E]/50 border border-white/20 rounded-[16px] px-4 py-3.5 text-[15px] font-desc-mona text-white placeholder-gray-400 focus:outline-none focus:border-[#5870F7] transition-colors"
                    />

                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-full bg-[#5870F7] hover:bg-blue-600 text-white font-medium text-[15px] font-desc-mona transition-colors flex items-center justify-center gap-2"
                    >
                      Send me the guide
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </aside>

            {/* Right Guide Content Area matching Figma mockup */}
            <main className="lg:col-span-8 space-y-10">
              {/* Top Luxury Villa Header Image */}
              <div className="relative w-full h-80 sm:h-[420px] rounded-2xl overflow-hidden shadow-sm bg-gray-100">
                <img
                  src={guideContent.heroImage}
                  alt="Luxury Phuket Hillside Pool Villa"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Section 1: Can foreigners actually own property in Thailand? */}
              <section id="can-foreigners-own-property" className="scroll-mt-28 space-y-4 border-b border-gray-100 pb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                  {guideContent.section1.heading}
                </h2>

                <div 
                  className="text-gray-600 leading-relaxed text-sm sm:text-base prose prose-sm max-w-none [&>p]:mb-4 last:[&>p]:mb-0"
                  dangerouslySetInnerHTML={{ __html: guideContent.section1.paragraph1 }}
                />

                <div 
                  className="text-gray-600 leading-relaxed text-sm sm:text-base prose prose-sm max-w-none [&>p]:mb-4 last:[&>p]:mb-0"
                  dangerouslySetInnerHTML={{ __html: guideContent.section1.paragraph2 }}
                />

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
              <section id="freehold-vs-leasehold" className="scroll-mt-28 space-y-4 border-b border-gray-100 pb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                    {guideContent.section2.heading}
                  </h2>
                  <div 
                    className="text-sm text-gray-500 mt-2 prose prose-sm max-w-none [&>p]:mb-2 last:[&>p]:mb-0"
                    dangerouslySetInnerHTML={{ __html: guideContent.section2.description }}
                  />
                </div>

                {/* 2 Comparison Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Card 1: Freehold */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow h-full flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4c70ff] to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <h3 className="text-[#4c70ff] font-bold text-lg sm:text-xl mb-3 tracking-tight">
                      {guideContent.section2.freeholdCardTitle}
                    </h3>
                    <div 
                      className="text-sm sm:text-base text-gray-600 leading-relaxed break-words [&>p]:mb-3 last:[&>p]:mb-0 flex-grow"
                      dangerouslySetInnerHTML={{ __html: guideContent.section2.freeholdCardDesc }}
                    />
                  </div>

                  {/* Card 2: Leasehold */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow h-full flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4c70ff] to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <h3 className="text-[#4c70ff] font-bold text-lg sm:text-xl mb-3 tracking-tight">
                      {guideContent.section2.leaseholdCardTitle}
                    </h3>
                    <div 
                      className="text-sm sm:text-base text-gray-600 leading-relaxed break-words [&>p]:mb-3 last:[&>p]:mb-0 flex-grow"
                      dangerouslySetInnerHTML={{ __html: guideContent.section2.leaseholdCardDesc }}
                    />
                  </div>
                </div>
              </section>

              {/* Section 3: The step-by-step buying process */}
              <section id="step-by-step-process" className="scroll-mt-28 space-y-4 border-b border-gray-100 pb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                  {guideContent.section3.heading}
                </h2>

                <div className="space-y-4 pt-2">
                  {guideContent.section3.steps?.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-blue-50 text-[#4c70ff] border border-blue-200 flex items-center justify-center text-xs font-bold shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div 
                        className="text-sm font-medium text-gray-700 prose prose-sm max-w-none [&>p]:mb-1 last:[&>p]:mb-0"
                        dangerouslySetInnerHTML={{ __html: step }}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 4: Taxes & transfer fees */}
              <section id="taxes-and-transfer-fees" className="scroll-mt-28 space-y-4 border-b border-gray-100 pb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {guideContent.section4.heading}
                </h2>
                <div 
                  className="text-gray-600 leading-relaxed text-sm sm:text-base prose prose-sm max-w-none [&>p]:mb-4 last:[&>p]:mb-0"
                  dangerouslySetInnerHTML={{ __html: guideContent.section4.content }}
                />
              </section>

              {/* Section 5: Financing options */}
              <section id="financing-options" className="scroll-mt-28 space-y-4 border-b border-gray-100 pb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {guideContent.section5.heading}
                </h2>
                <div 
                  className="text-gray-600 leading-relaxed text-sm sm:text-base prose prose-sm max-w-none [&>p]:mb-4 last:[&>p]:mb-0"
                  dangerouslySetInnerHTML={{ __html: guideContent.section5.content }}
                />
              </section>

              {/* Section 6: Due diligence checklist */}
              <section id="due-diligence-checklist" className="scroll-mt-28 space-y-4 border-b border-gray-100 pb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {guideContent.section6.heading}
                </h2>
                <div 
                  className="text-gray-600 leading-relaxed text-sm sm:text-base prose prose-sm max-w-none [&>p]:mb-4 last:[&>p]:mb-0"
                  dangerouslySetInnerHTML={{ __html: guideContent.section6.content }}
                />
              </section>

              {/* Section 7: The real risks */}
              <section id="the-real-risks" className="scroll-mt-28 space-y-4 border-b border-gray-100 pb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {guideContent.section7.heading}
                </h2>
                <div 
                  className="text-gray-600 leading-relaxed text-sm sm:text-base prose prose-sm max-w-none [&>p]:mb-4 last:[&>p]:mb-0"
                  dangerouslySetInnerHTML={{ __html: guideContent.section7.content }}
                />
              </section>

              {/* Section 8: Frequently asked questions */}
              <section id="faq" className="scroll-mt-28 space-y-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                    {guideContent.sectionFaq.heading}
                  </h2>
                  <div 
                    className="text-sm text-gray-500 mt-1 prose prose-sm max-w-none [&>p]:mb-2 last:[&>p]:mb-0"
                    dangerouslySetInnerHTML={{ __html: guideContent.sectionFaq.description }}
                  />
                </div>

                {/* FAQ Accordion List */}
                <div className="space-y-4 pt-2">
                  {faqs.map((faq) => {
                    const isOpen = openFaq === faq.id;
                    return (
                      <div 
                        key={faq.id}
                        onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                        className={`rounded-2xl p-5 sm:p-6 transition-colors cursor-pointer border ${
                          isOpen ? 'bg-[#f4f6fa] border-gray-200/60' : 'bg-white border-gray-200/70 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-gray-900 text-sm sm:text-base">
                          <span>{faq.question}</span>
                          <span className="text-[#4c70ff]">
                            {isOpen ? <Minus className="w-5 h-5" strokeWidth={1.5} /> : <Plus className="w-5 h-5" strokeWidth={1.5} />}
                          </span>
                        </div>
                        {isOpen && (
                          <div 
                            className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-3 prose prose-sm max-w-none prose-p:my-2 prose-p:first:mt-0 prose-p:last:mb-0"
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* CTA Block (Framed dark style) */}
              <div className="rounded-[24px] bg-[#1C2026] p-4 sm:p-6 shadow-xl w-full mt-16 mb-8">
                <div className="rounded-[20px] border border-white/10 bg-[#2B2D33] py-10 px-8 sm:py-14 sm:px-12 text-center flex flex-col items-center">
                  
                  <div className="text-center space-y-3 mb-10">
                    <h3
                      className="font-heading-bricolage text-[26px] sm:text-[32px] font-semibold text-white leading-tight tracking-[-0.01em]"
                      style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                    >
                      Ready to talk through your purchase?
                    </h3>
                    <p className="font-desc-mona text-[14px] sm:text-[15px] font-medium text-[#9CA3AF] leading-[1.6]">
                      Message Amir directly. Honest, advisory, no pressure.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                    <a
                      href="https://wa.me/8801875189361"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#5870F7] hover:bg-blue-600 font-medium text-[15px] text-white transition-all shadow-sm w-full sm:w-auto"
                    >
                      Contact Amir on WhatsApp
                    </a>
                    <Link
                      href="/the-guide"
                      className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white hover:bg-gray-50 font-medium text-[15px] text-gray-900 transition-all shadow-sm w-full sm:w-auto"
                    >
                      Read the free guide
                    </Link>
                  </div>

                </div>
              </div>

            </main>
          </div>
        </div>
      </section>

      <Footer hideCTA={true} />

      {/* Modals */}
      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
    </div>
  );
}
